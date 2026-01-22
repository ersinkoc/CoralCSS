/**
 * Migration Analyzer
 *
 * Analyzes source files for migration compatibility.
 * @module migration/analyzer
 */

import type {
  MigrationOptions,
  MigrationReport,
  FileAnalysis,
  FileType,
  ConfigMigration,
  BuildToolMigration,
} from './types'
import {
  extractClasses,
  analyzeClassCompatibility,
  generateMigrationSuggestions,
} from './class-mapper'

/**
 * File patterns for different file types
 */
const FILE_TYPE_PATTERNS: Record<FileType, RegExp> = {
  html: /\.html?$/,
  jsx: /\.jsx$/,
  tsx: /\.tsx$/,
  vue: /\.vue$/,
  svelte: /\.svelte$/,
  config: /\.(config|rc)\.(js|ts|mjs|cjs)$/,
  css: /\.css$/,
  postcss: /\.pcss$/,
}

/**
 * Detect file type from path
 */
export function detectFileType(filePath: string): FileType | null {
  for (const [type, pattern] of Object.entries(FILE_TYPE_PATTERNS)) {
    if (pattern.test(filePath)) {
      return type as FileType
    }
  }
  return null
}

/**
 * Extract class attribute values from HTML/JSX/Vue content
 */
export function extractClassAttributes(content: string, fileType: FileType): string[] {
  const classes: string[] = []

  // Different patterns for different file types
  const patterns: RegExp[] = []

  switch (fileType) {
    case 'html':
      patterns.push(
        /class\s*=\s*"([^"]*)"/g,
        /class\s*=\s*'([^']*)'/g,
      )
      break

    case 'jsx':
    case 'tsx':
      patterns.push(
        /className\s*=\s*"([^"]*)"/g,
        /className\s*=\s*'([^']*)'/g,
        /className\s*=\s*{`([^`]*)`}/g,
        /className\s*=\s*{\s*["']([^"']*)["']\s*}/g,
        // clsx/classnames patterns
        /(?:clsx|classnames|cn)\s*\(\s*["']([^"']*)["']/g,
        // Tailwind merge patterns
        /twMerge\s*\(\s*["']([^"']*)["']/g,
      )
      break

    case 'vue':
      patterns.push(
        /class\s*=\s*"([^"]*)"/g,
        /class\s*=\s*'([^']*)'/g,
        /:class\s*=\s*"([^"]*)"/g,
        /:class\s*=\s*'([^']*)'/g,
        /:class\s*=\s*"\{([^}]*)\}"/g,
      )
      break

    case 'svelte':
      patterns.push(
        /class\s*=\s*"([^"]*)"/g,
        /class\s*=\s*'([^']*)'/g,
        /class:\s*([a-zA-Z0-9_-]+)/g,
      )
      break

    case 'css':
    case 'postcss':
      // Extract @apply directives
      patterns.push(
        /@apply\s+([^;]+);/g,
      )
      break

    default:
      patterns.push(
        /class\s*=\s*"([^"]*)"/g,
        /className\s*=\s*"([^"]*)"/g,
      )
  }

  for (const pattern of patterns) {
    let match
    while ((match = pattern.exec(content)) !== null) {
      const classString = match[1]
      if (classString) {
        const extracted = extractClasses(classString)
        classes.push(...extracted)
      }
    }
  }

  return Array.from(new Set(classes)) // Remove duplicates
}

/**
 * Analyze a single file
 */
export function analyzeFile(filePath: string, content: string): FileAnalysis {
  const fileType = detectFileType(filePath)

  if (!fileType) {
    return {
      filePath,
      fileType: 'html', // Default
      totalClasses: 0,
      compatibleClasses: 0,
      incompatibleClasses: [],
      deprecatedClasses: [],
      warnings: [],
      suggestions: [],
    }
  }

  const classes = extractClassAttributes(content, fileType)
  const analysis = analyzeClassCompatibility(classes)
  const suggestions = generateMigrationSuggestions([
    ...analysis.incompatible,
    ...analysis.deprecated,
    ...analysis.warnings,
  ])

  return {
    filePath,
    fileType,
    totalClasses: analysis.total,
    compatibleClasses: analysis.compatible,
    incompatibleClasses: analysis.incompatible,
    deprecatedClasses: analysis.deprecated,
    warnings: analysis.warnings.map(w => w.warning || ''),
    suggestions,
  }
}

/**
 * Analyze Tailwind config file
 */
export function analyzeTailwindConfig(content: string): ConfigMigration | null {
  // Parse config content
  const transformations: ConfigMigration['transformations'] = []

  // Check for darkMode configuration
  const darkModeMatch = content.match(/darkMode:\s*['"]?(class|media)['"]?/)
  if (darkModeMatch) {
    transformations.push({
      path: 'darkMode',
      original: darkModeMatch[1],
      transformed: darkModeMatch[1], // Same in CoralCSS
      type: 'rename',
      notes: 'darkMode works the same in CoralCSS',
    })
  }

  // Check for content paths
  const contentMatch = content.match(/content:\s*\[([^\]]+)\]/)
  if (contentMatch) {
    transformations.push({
      path: 'content',
      original: contentMatch[1],
      transformed: contentMatch[1], // Same format
      type: 'rename',
      notes: 'content paths work the same',
    })
  }

  // Check for theme.extend
  if (content.includes('theme:') && content.includes('extend:')) {
    transformations.push({
      path: 'theme.extend',
      original: 'theme.extend',
      transformed: 'theme',
      type: 'restructure',
      notes: 'CoralCSS uses flat theme structure, extend values are merged directly',
    })
  }

  // Check for plugins
  const pluginMatch = content.match(/plugins:\s*\[([^\]]+)\]/)
  if (pluginMatch) {
    transformations.push({
      path: 'plugins',
      original: pluginMatch[1],
      transformed: '// CoralCSS uses different plugin format',
      type: 'restructure',
      notes: 'Plugins need to be converted to CoralCSS format',
    })
  }

  // Check for prefix
  const prefixMatch = content.match(/prefix:\s*['"]([^'"]+)['"]/)
  if (prefixMatch) {
    transformations.push({
      path: 'prefix',
      original: prefixMatch[1],
      transformed: prefixMatch[1],
      type: 'rename',
      notes: 'Prefix option works the same',
    })
  }

  // Generate new config
  const generatedConfig = generateCoralConfig(content, transformations)

  return {
    originalFile: 'tailwind.config.js',
    newFile: 'coral.config.js',
    transformations,
    generatedConfig,
  }
}

/**
 * Generate CoralCSS config from Tailwind config
 */
function generateCoralConfig(
  originalContent: string,
  _transformations: ConfigMigration['transformations']
): string {
  // Extract values from original
  const darkModeMatch = originalContent.match(/darkMode:\s*['"]?(class|media)['"]?/)
  const darkMode = darkModeMatch ? darkModeMatch[1] : 'class'

  const contentMatch = originalContent.match(/content:\s*\[([^\]]+)\]/)
  const content = contentMatch ? contentMatch[1] : "'./src/**/*.{html,js,jsx,ts,tsx}'"

  // Check for theme colors
  const colorsMatch = originalContent.match(/colors:\s*\{([^}]+)\}/)
  const hasCustomColors = colorsMatch !== null

  // Check for custom screens
  const screensMatch = originalContent.match(/screens:\s*\{([^}]+)\}/)
  const hasCustomScreens = screensMatch !== null

  let config = `/**
 * CoralCSS Configuration
 *
 * Migrated from Tailwind CSS
 */

import { createCoral, coralPreset } from '@coral-css/core'

export default createCoral({
  // Use coral preset for full feature set
  // Use windPreset() instead for maximum Tailwind compatibility
  plugins: coralPreset({
    darkMode: '${darkMode}',
  }),

  // Content paths for class extraction
  content: [${content}],
`

  if (hasCustomColors || hasCustomScreens) {
    config += `
  // Custom theme overrides
  theme: {`

    if (hasCustomColors && colorsMatch) {
      config += `
    colors: {${colorsMatch[1]}},`
    }

    if (hasCustomScreens && screensMatch) {
      config += `
    screens: {${screensMatch[1]}},`
    }

    config += `
  },`
  }

  config += `
})
`

  return config
}

/**
 * Analyze build tool configuration
 */
export function analyzeBuildTool(
  configFiles: { path: string; content: string }[]
): BuildToolMigration | null {
  // Check for Vite
  const viteConfig = configFiles.find(f =>
    f.path.includes('vite.config')
  )

  if (viteConfig) {
    const hasTailwind = viteConfig.content.includes('@tailwindcss/vite') ||
                        viteConfig.content.includes('tailwindcss')

    if (hasTailwind) {
      return {
        tool: 'vite',
        originalConfig: viteConfig.content,
        newConfig: generateViteConfig(),
        changes: [
          "Replace '@tailwindcss/vite' with '@coral-css/core/vite'",
          'Update plugin import and configuration',
        ],
      }
    }
  }

  // Check for PostCSS
  const postcssConfig = configFiles.find(f =>
    f.path.includes('postcss.config')
  )

  if (postcssConfig) {
    const hasTailwind = postcssConfig.content.includes('tailwindcss') ||
                        postcssConfig.content.includes('@tailwindcss')

    if (hasTailwind) {
      return {
        tool: 'postcss',
        originalConfig: postcssConfig.content,
        newConfig: generatePostCSSConfig(),
        changes: [
          "Replace 'tailwindcss' or '@tailwindcss/postcss' with '@coral-css/postcss'",
          'Update plugin configuration if needed',
        ],
      }
    }
  }

  return null
}

/**
 * Generate Vite config for CoralCSS
 */
function generateViteConfig(): string {
  return `import { defineConfig } from 'vite'
import coral from '@coral-css/core/vite'

export default defineConfig({
  plugins: [
    coral({
      darkMode: 'class',
    }),
    // Add other plugins here
  ],
})
`
}

/**
 * Generate PostCSS config for CoralCSS
 */
function generatePostCSSConfig(): string {
  return `module.exports = {
  plugins: {
    '@coral-css/postcss': {
      content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    },
    autoprefixer: {},
  },
}
`
}

/**
 * Generate full migration report
 */
export function generateMigrationReport(
  fileAnalyses: FileAnalysis[],
  configMigration: ConfigMigration | null,
  buildToolMigration: BuildToolMigration | null,
  options: MigrationOptions
): MigrationReport {
  const totalClasses = fileAnalyses.reduce((sum, f) => sum + f.totalClasses, 0)
  const compatibleClasses = fileAnalyses.reduce((sum, f) => sum + f.compatibleClasses, 0)
  const filesWithChanges = fileAnalyses.filter(f =>
    f.incompatibleClasses.length > 0 || f.deprecatedClasses.length > 0
  ).length

  const compatibilityRate = totalClasses > 0
    ? Math.round((compatibleClasses / totalClasses) * 100)
    : 100

  // Calculate effort score (1-10)
  let effort = 1
  if (filesWithChanges > 0) {effort += 1}
  if (filesWithChanges > 10) {effort += 1}
  if (filesWithChanges > 50) {effort += 2}
  if (configMigration) {effort += 1}
  if (buildToolMigration) {effort += 1}
  if (compatibilityRate < 90) {effort += 1}
  if (compatibilityRate < 70) {effort += 2}

  const suggestions: string[] = []

  if (compatibilityRate === 100) {
    suggestions.push('Your project is 100% compatible! Migration should be straightforward.')
  } else if (compatibilityRate >= 90) {
    suggestions.push('High compatibility! Only minor adjustments needed.')
  } else if (compatibilityRate >= 70) {
    suggestions.push('Good compatibility, but some classes need attention.')
  } else {
    suggestions.push('Several classes need to be updated. Consider using the Wind preset for easier migration.')
  }

  if (configMigration) {
    suggestions.push('Configuration file needs to be converted.')
    suggestions.push('   Run: coral migrate --config')
  }

  if (buildToolMigration) {
    suggestions.push(`${buildToolMigration.tool} configuration needs updating.`)
  }

  suggestions.push('')
  suggestions.push('Tips for smooth migration:')
  suggestions.push('   1. Use windPreset() for maximum Tailwind compatibility')
  suggestions.push('   2. Run migration with --dry-run first to preview changes')
  suggestions.push('   3. Update deprecated classes before switching build tools')
  suggestions.push('   4. Test dark mode and responsive behavior after migration')

  return {
    source: options.source,
    totalFiles: fileAnalyses.length,
    filesWithChanges,
    totalClasses,
    compatibilityRate,
    files: fileAnalyses,
    configMigration,
    buildToolMigration,
    suggestions,
    effort: Math.min(effort, 10),
  }
}

/**
 * Format migration report as text
 */
export function formatMigrationReport(report: MigrationReport): string {
  const lines: string[] = []

  lines.push('===============================================================')
  lines.push('                    CoralCSS Migration Report                    ')
  lines.push('===============================================================')
  lines.push('')
  lines.push(`Source Framework:      ${report.source}`)
  lines.push(`Total Files Analyzed:  ${report.totalFiles}`)
  lines.push(`Files Needing Changes: ${report.filesWithChanges}`)
  lines.push(`Total Classes Found:   ${report.totalClasses}`)
  lines.push(`Compatibility Rate:    ${report.compatibilityRate}%`)
  lines.push(`Estimated Effort:      ${report.effort}/10`)
  lines.push('')

  // Compatibility visualization
  const barLength = 40
  const filledLength = Math.round((report.compatibilityRate / 100) * barLength)
  const bar = '#'.repeat(filledLength) + '-'.repeat(barLength - filledLength)
  lines.push(`Compatibility: [${bar}] ${report.compatibilityRate}%`)
  lines.push('')

  // Config migration
  if (report.configMigration) {
    lines.push('---------------------------------------------------------------')
    lines.push('Configuration Migration')
    lines.push('---------------------------------------------------------------')
    lines.push(`  ${report.configMigration.originalFile} -> ${report.configMigration.newFile}`)
    lines.push('')
    lines.push('  Changes needed:')
    for (const t of report.configMigration.transformations) {
      lines.push(`    - ${t.path}: ${t.type}${t.notes ? ` (${t.notes})` : ''}`)
    }
    lines.push('')
  }

  // Build tool migration
  if (report.buildToolMigration) {
    lines.push('---------------------------------------------------------------')
    lines.push('Build Tool Migration')
    lines.push('---------------------------------------------------------------')
    lines.push(`  Tool: ${report.buildToolMigration.tool}`)
    lines.push('  Changes:')
    for (const change of report.buildToolMigration.changes) {
      lines.push(`    - ${change}`)
    }
    lines.push('')
  }

  // Files with issues
  const filesWithIssues = report.files.filter(f =>
    f.incompatibleClasses.length > 0 || f.deprecatedClasses.length > 0
  )

  if (filesWithIssues.length > 0) {
    lines.push('---------------------------------------------------------------')
    lines.push('Files Requiring Attention')
    lines.push('---------------------------------------------------------------')

    for (const file of filesWithIssues.slice(0, 10)) {
      lines.push(`  ${file.filePath}`)
      if (file.incompatibleClasses.length > 0) {
        lines.push(`     Incompatible: ${file.incompatibleClasses.map(c => c.original).join(', ')}`)
      }
      if (file.deprecatedClasses.length > 0) {
        lines.push(`     Deprecated: ${file.deprecatedClasses.map(c => c.original).join(', ')}`)
      }
    }

    if (filesWithIssues.length > 10) {
      lines.push(`  ... and ${filesWithIssues.length - 10} more files`)
    }
    lines.push('')
  }

  // Suggestions
  lines.push('---------------------------------------------------------------')
  lines.push('Recommendations')
  lines.push('---------------------------------------------------------------')
  for (const suggestion of report.suggestions) {
    lines.push(`  ${suggestion}`)
  }
  lines.push('')

  lines.push('===============================================================')

  return lines.join('\n')
}
