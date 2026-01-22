/**
 * Migration Transformer
 *
 * Applies migration transformations to source files.
 * @module migration/transformer
 */

import type {
  MigrationOptions,
  MigrationResult,
  MigrationError,
  FileAnalysis,
} from './types'
import {
  analyzeFile,
  analyzeTailwindConfig,
  analyzeBuildTool,
  generateMigrationReport,
  formatMigrationReport,
} from './analyzer'
import { mapClass, extractClasses } from './class-mapper'

/**
 * Transform file content
 */
export function transformFileContent(
  content: string,
  filePath: string,
  options: MigrationOptions
): { content: string; changes: number } {
  let transformedContent = content
  let changes = 0

  // Transform class attributes
  const classPatterns = [
    { pattern: /class\s*=\s*"([^"]*)"/g, prefix: 'class="', suffix: '"' },
    { pattern: /class\s*=\s*'([^']*)'/g, prefix: "class='", suffix: "'" },
    { pattern: /className\s*=\s*"([^"]*)"/g, prefix: 'className="', suffix: '"' },
    { pattern: /className\s*=\s*'([^']*)'/g, prefix: "className='", suffix: "'" },
  ]

  for (const { pattern, prefix, suffix } of classPatterns) {
    transformedContent = transformedContent.replace(pattern, (match, classString) => {
      const classes = extractClasses(classString)
      const transformedClasses: string[] = []
      let hasChanges = false

      for (const cls of classes) {
        const mapping = mapClass(cls, options.customMappings)

        if (mapping.mapped && mapping.mapped !== cls) {
          transformedClasses.push(mapping.mapped)
          hasChanges = true
          changes++
        } else {
          transformedClasses.push(cls)
        }
      }

      if (hasChanges) {
        return `${prefix}${transformedClasses.join(' ')}${suffix}`
      }
      return match
    })
  }

  // Transform @tailwind directives
  transformedContent = transformedContent.replace(
    /@tailwind\s+(base|components|utilities)/g,
    (match, directive) => {
      changes++
      return `@coral ${directive}`
    }
  )

  // Transform @apply directives (mostly compatible)
  // No changes needed for @apply

  return { content: transformedContent, changes }
}

/**
 * Transform CSS content
 */
export function transformCSSContent(
  content: string,
  _options: MigrationOptions
): { content: string; changes: number } {
  let transformedContent = content
  let changes = 0

  // Replace @tailwind with @coral
  transformedContent = transformedContent.replace(
    /@tailwind\s+(base|components|utilities)/g,
    (_match, directive) => {
      changes++
      return `@coral ${directive}`
    }
  )

  // Transform theme() function calls (if any incompatible ones)
  // theme() function works the same way

  // Transform screen() function calls
  // screen() function works the same way

  return { content: transformedContent, changes }
}

/**
 * Transform config file
 */
export function transformConfigFile(
  content: string,
  _options: MigrationOptions
): { content: string; changes: number } {
  const configMigration = analyzeTailwindConfig(content)

  if (!configMigration) {
    return { content, changes: 0 }
  }

  return {
    content: configMigration.generatedConfig,
    changes: configMigration.transformations.length,
  }
}

/**
 * Generate migration diff
 */
export function generateDiff(
  original: string,
  transformed: string,
  filePath: string
): string {
  const originalLines = original.split('\n')
  const transformedLines = transformed.split('\n')

  const diff: string[] = []
  diff.push(`--- ${filePath}`)
  diff.push(`+++ ${filePath}`)

  for (let i = 0; i < Math.max(originalLines.length, transformedLines.length); i++) {
    const originalLine = originalLines[i]
    const transformedLine = transformedLines[i]

    if (originalLine !== transformedLine) {
      if (originalLine !== undefined) {
        diff.push(`- ${originalLine}`)
      }
      if (transformedLine !== undefined) {
        diff.push(`+ ${transformedLine}`)
      }
    }
  }

  return diff.join('\n')
}

/**
 * Run migration (main entry point)
 */
export function runMigration(
  files: { path: string; content: string }[],
  options: MigrationOptions
): MigrationResult {
  const errors: MigrationError[] = []
  const modifiedFiles: string[] = []
  const backupFiles: string[] = []
  const fileAnalyses: FileAnalysis[] = []

  // Analyze all files first
  for (const file of files) {
    try {
      const analysis = analyzeFile(file.path, file.content)
      fileAnalyses.push(analysis)
    } catch (error) {
      errors.push({
        type: 'parse',
        filePath: file.path,
        message: error instanceof Error ? error.message : String(error),
      })
    }
  }

  // Analyze config files
  const configFiles = files.filter(f =>
    f.path.includes('tailwind.config') ||
    f.path.includes('postcss.config') ||
    f.path.includes('vite.config')
  )

  const tailwindConfig = files.find(f => f.path.includes('tailwind.config'))
  const configMigration = tailwindConfig
    ? analyzeTailwindConfig(tailwindConfig.content)
    : null

  const buildToolMigration = analyzeBuildTool(configFiles)

  // Generate report
  const report = generateMigrationReport(
    fileAnalyses,
    configMigration,
    buildToolMigration,
    options
  )

  // If dry-run, just return the report
  if (options.mode === 'dry-run') {
    console.log(formatMigrationReport(report))

    return {
      success: true,
      report,
      modifiedFiles: [],
      backupFiles: [],
      errors,
    }
  }

  // Apply transformations
  if (options.mode === 'apply') {
    for (const file of files) {
      try {
        // Skip config files (handled separately)
        if (file.path.includes('tailwind.config')) {continue}

        const isCSSFile = file.path.endsWith('.css') || file.path.endsWith('.pcss')
        const isConfigFile = file.path.includes('.config.')

        let result
        if (isConfigFile) {
          result = transformConfigFile(file.content, options)
        } else if (isCSSFile) {
          result = transformCSSContent(file.content, options)
        } else {
          result = transformFileContent(file.content, file.path, options)
        }

        if (result.changes > 0) {
          modifiedFiles.push(file.path)

          // In real implementation, would write to file here
          if (options.verbose) {
            console.log(`Modified: ${file.path} (${result.changes} changes)`)
          }
        }
      } catch (error) {
        errors.push({
          type: 'transform',
          filePath: file.path,
          message: error instanceof Error ? error.message : String(error),
        })
      }
    }

    // Transform tailwind config to coral config
    if (configMigration && tailwindConfig) {
      modifiedFiles.push(configMigration.newFile)

      if (options.verbose) {
        console.log(`Created: ${configMigration.newFile}`)
        console.log(`  (migrated from ${configMigration.originalFile})`)
      }
    }
  }

  return {
    success: errors.length === 0,
    report,
    modifiedFiles,
    backupFiles,
    errors,
  }
}

/**
 * Quick migration check (returns compatibility score)
 */
export function checkMigrationCompatibility(
  files: { path: string; content: string }[]
): { score: number; issues: string[] } {
  const issues: string[] = []
  let totalClasses = 0
  let compatibleClasses = 0

  for (const file of files) {
    const analysis = analyzeFile(file.path, file.content)
    totalClasses += analysis.totalClasses
    compatibleClasses += analysis.compatibleClasses

    if (analysis.incompatibleClasses.length > 0) {
      issues.push(
        `${file.path}: ${analysis.incompatibleClasses.length} incompatible classes`
      )
    }
  }

  const score = totalClasses > 0
    ? Math.round((compatibleClasses / totalClasses) * 100)
    : 100

  return { score, issues }
}

/**
 * Get migration summary
 */
export function getMigrationSummary(
  files: { path: string; content: string }[]
): string {
  const { score, issues } = checkMigrationCompatibility(files)

  const lines: string[] = []
  lines.push('CoralCSS Migration Compatibility Check')
  lines.push('=====================================')
  lines.push('')
  lines.push(`Compatibility Score: ${score}%`)
  lines.push('')

  if (score === 100) {
    lines.push('Your project is fully compatible with CoralCSS!')
    lines.push('Run `coral migrate --apply` to convert your project.')
  } else if (score >= 90) {
    lines.push('Your project has high compatibility with CoralCSS.')
    lines.push('Minor adjustments may be needed.')
  } else if (score >= 70) {
    lines.push('Your project has good compatibility with CoralCSS.')
    lines.push('Some classes will need to be updated.')
  } else {
    lines.push('Your project needs some updates for CoralCSS compatibility.')
    lines.push('Consider using the Wind preset for easier migration.')
  }

  if (issues.length > 0) {
    lines.push('')
    lines.push('Issues found:')
    for (const issue of issues.slice(0, 10)) {
      lines.push(`  - ${issue}`)
    }
    if (issues.length > 10) {
      lines.push(`  ... and ${issues.length - 10} more`)
    }
  }

  return lines.join('\n')
}
