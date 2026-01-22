/**
 * Style Dictionary Integration
 *
 * Generates design tokens in multiple formats using Style Dictionary patterns.
 *
 * @module design-system/style-dictionary
 */

import type {
  StyleDictionaryConfig,
  StyleDictionaryToken,
  TokenGroup,
  DesignTokenFile,
  PlatformConfig,
  ProcessedToken,
  TokenDictionary,
  PlatformTarget,
  BuildOptions,
} from './types'

import { coralTokens, primitiveTokens, semanticTokens, componentTokens } from './coral-tokens'
import { transforms, transformGroups } from './token-transforms'
import { platformConfigs } from './platforms'

/**
 * Create Style Dictionary configuration for CoralCSS
 */
export function createStyleDictionaryConfig(
  options: BuildOptions = {}
): StyleDictionaryConfig {
  const {
    platforms = ['web', 'web-scss', 'web-js'],
    outputDir = 'dist/tokens',
    prefix = 'coral',
  } = options

  const platformConfig: Record<string, PlatformConfig> = {}

  for (const platform of platforms) {
    const config = platformConfigs[platform]
    if (config) {
      platformConfig[platform] = {
        ...config,
        buildPath: `${outputDir}/${config.buildPath}`,
        prefix,
      }
    }
  }

  return {
    source: ['tokens/**/*.json'],
    platforms: platformConfig,
    hooks: {
      transformGroups,
      transforms,
    },
  }
}

/**
 * Convert CoralCSS tokens to Style Dictionary format (DTCG compliant)
 */
export function toStyleDictionary(
  tokens: Record<string, unknown>,
  options: { prefix?: string; includeMetadata?: boolean } = {}
): DesignTokenFile {
  const { prefix = 'coral', includeMetadata = true } = options

  const result: DesignTokenFile = {
    $name: 'CoralCSS Design Tokens',
    $description: 'Design tokens for CoralCSS framework',
    $version: '1.1.0',
  }

  // Convert colors
  if (tokens.colors) {
    result.color = convertColorsToStyleDictionary(tokens.colors as Record<string, unknown>)
  }

  // Convert spacing
  if (tokens.spacing) {
    result.spacing = convertSpacingToStyleDictionary(tokens.spacing as Record<string, unknown>)
  }

  // Convert sizing
  if (tokens.sizing) {
    result.sizing = convertSizingToStyleDictionary(tokens.sizing as Record<string, unknown>)
  }

  // Convert typography
  if (tokens.typography) {
    result.typography = convertTypographyToStyleDictionary(tokens.typography as Record<string, unknown>)
  }

  // Convert borders
  if (tokens.borders) {
    result.border = convertBordersToStyleDictionary(tokens.borders as Record<string, unknown>)
  }

  // Convert shadows
  if (tokens.shadows) {
    result.shadow = convertShadowsToStyleDictionary(tokens.shadows as Record<string, unknown>)
  }

  // Convert motion
  if (tokens.durations || tokens.easings) {
    const motion: TokenGroup = {}
    if (tokens.durations) {
      motion.duration = convertToStyleDictionary(tokens.durations as Record<string, unknown>, 'duration')
    }
    if (tokens.easings) {
      motion.easing = convertToStyleDictionary(tokens.easings as Record<string, unknown>, 'cubicBezier')
    }
    result.motion = motion
  }

  // Convert opacity
  if (tokens.opacity) {
    result.opacity = convertToStyleDictionary(tokens.opacity as Record<string, unknown>, 'opacity')
  }

  // Convert z-index
  if (tokens.zIndex) {
    result.zIndex = convertToStyleDictionary(tokens.zIndex as Record<string, unknown>, 'number')
  }

  return result
}

/**
 * Convert colors to Style Dictionary format
 */
function convertColorsToStyleDictionary(colors: Record<string, unknown>): TokenGroup {
  const result: TokenGroup = {}

  for (const [key, value] of Object.entries(colors)) {
    if (typeof value === 'string') {
      result[key] = {
        $value: value,
        $type: 'color',
        $extensions: {
          'com.coralcss': {
            utility: `text-${key}, bg-${key}, border-${key}`,
            variants: ['hover', 'focus', 'active'],
          },
        },
      }
    } else if (typeof value === 'object' && value !== null) {
      // Nested color scale (e.g., coral.50, coral.100)
      result[key] = convertColorsToStyleDictionary(value as Record<string, unknown>)
    }
  }

  return result
}

/**
 * Convert spacing to Style Dictionary format
 */
function convertSpacingToStyleDictionary(spacing: Record<string, unknown>): TokenGroup {
  const result: TokenGroup = {}

  for (const [key, value] of Object.entries(spacing)) {
    if (typeof value === 'string' || typeof value === 'number') {
      result[key] = {
        $value: typeof value === 'number' ? `${value}rem` : value,
        $type: 'spacing',
        $extensions: {
          'com.coralcss': {
            utility: `p-${key}, m-${key}, gap-${key}`,
            responsive: true,
          },
          'com.figma': {
            scopes: ['GAP', 'WIDTH_HEIGHT'],
          },
        },
      }
    }
  }

  return result
}

/**
 * Convert sizing to Style Dictionary format
 */
function convertSizingToStyleDictionary(sizing: Record<string, unknown>): TokenGroup {
  const result: TokenGroup = {}

  for (const [key, value] of Object.entries(sizing)) {
    if (typeof value === 'string' || typeof value === 'number') {
      result[key] = {
        $value: typeof value === 'number' ? `${value}rem` : value,
        $type: 'sizing',
        $extensions: {
          'com.coralcss': {
            utility: `w-${key}, h-${key}, size-${key}`,
            responsive: true,
          },
          'com.figma': {
            scopes: ['WIDTH_HEIGHT'],
          },
        },
      }
    }
  }

  return result
}

/**
 * Convert typography to Style Dictionary format
 */
function convertTypographyToStyleDictionary(typography: Record<string, unknown>): TokenGroup {
  const result: TokenGroup = {}

  // Font families
  if (typography.fontFamily) {
    result.fontFamily = {}
    for (const [key, value] of Object.entries(typography.fontFamily as Record<string, unknown>)) {
      const fontValue = Array.isArray(value) ? value.join(', ') : value
      ;(result.fontFamily as TokenGroup)[key] = {
        $value: fontValue as string,
        $type: 'fontFamily',
        $extensions: {
          'com.coralcss': {
            utility: `font-${key}`,
          },
        },
      }
    }
  }

  // Font sizes
  if (typography.fontSize) {
    result.fontSize = {}
    for (const [key, value] of Object.entries(typography.fontSize as Record<string, unknown>)) {
      let fontSize: string
      let lineHeight: string | undefined

      if (Array.isArray(value)) {
        fontSize = value[0] as string
        lineHeight = (value[1] as Record<string, string>)?.lineHeight
      } else {
        fontSize = value as string
      }

      ;(result.fontSize as TokenGroup)[key] = {
        $value: fontSize,
        $type: 'dimension',
        $extensions: {
          'com.coralcss': {
            utility: `text-${key}`,
            cssProperty: ['font-size', lineHeight ? 'line-height' : ''].filter(Boolean),
          },
        },
      }
    }
  }

  // Font weights
  if (typography.fontWeight) {
    result.fontWeight = {}
    for (const [key, value] of Object.entries(typography.fontWeight as Record<string, unknown>)) {
      ;(result.fontWeight as TokenGroup)[key] = {
        $value: value as number,
        $type: 'fontWeight',
        $extensions: {
          'com.coralcss': {
            utility: `font-${key}`,
          },
        },
      }
    }
  }

  // Line heights
  if (typography.lineHeight) {
    result.lineHeight = {}
    for (const [key, value] of Object.entries(typography.lineHeight as Record<string, unknown>)) {
      ;(result.lineHeight as TokenGroup)[key] = {
        $value: value as string | number,
        $type: 'number',
        $extensions: {
          'com.coralcss': {
            utility: `leading-${key}`,
          },
        },
      }
    }
  }

  // Letter spacing
  if (typography.letterSpacing) {
    result.letterSpacing = {}
    for (const [key, value] of Object.entries(typography.letterSpacing as Record<string, unknown>)) {
      ;(result.letterSpacing as TokenGroup)[key] = {
        $value: value as string,
        $type: 'dimension',
        $extensions: {
          'com.coralcss': {
            utility: `tracking-${key}`,
          },
        },
      }
    }
  }

  return result
}

/**
 * Convert borders to Style Dictionary format
 */
function convertBordersToStyleDictionary(borders: Record<string, unknown>): TokenGroup {
  const result: TokenGroup = {}

  // Border widths
  if (borders.width) {
    result.width = {}
    for (const [key, value] of Object.entries(borders.width as Record<string, unknown>)) {
      ;(result.width as TokenGroup)[key] = {
        $value: value as string,
        $type: 'dimension',
        $extensions: {
          'com.coralcss': {
            utility: `border-${key}`,
          },
        },
      }
    }
  }

  // Border radius
  if (borders.radius) {
    result.radius = {}
    for (const [key, value] of Object.entries(borders.radius as Record<string, unknown>)) {
      ;(result.radius as TokenGroup)[key] = {
        $value: value as string,
        $type: 'borderRadius',
        $extensions: {
          'com.coralcss': {
            utility: `rounded-${key}`,
          },
          'com.figma': {
            scopes: ['CORNER_RADIUS'],
          },
        },
      }
    }
  }

  return result
}

/**
 * Convert shadows to Style Dictionary format
 */
function convertShadowsToStyleDictionary(shadows: Record<string, unknown>): TokenGroup {
  const result: TokenGroup = {}

  for (const [key, value] of Object.entries(shadows)) {
    if (typeof value === 'string') {
      result[key] = {
        $value: value,
        $type: 'shadow',
        $extensions: {
          'com.coralcss': {
            utility: `shadow-${key}`,
          },
        },
      }
    }
  }

  return result
}

/**
 * Generic converter to Style Dictionary format
 */
function convertToStyleDictionary(
  tokens: Record<string, unknown>,
  type: string
): TokenGroup {
  const result: TokenGroup = {}

  for (const [key, value] of Object.entries(tokens)) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      result[key] = convertToStyleDictionary(value as Record<string, unknown>, type)
    } else {
      result[key] = {
        $value: value as string | number,
        $type: type as StyleDictionaryToken['$type'],
      }
    }
  }

  return result
}

/**
 * Build tokens using Style Dictionary patterns
 */
export function buildTokens(
  tokens: DesignTokenFile,
  options: BuildOptions = {}
): Map<string, string> {
  const outputs = new Map<string, string>()
  const config = createStyleDictionaryConfig(options)

  // Process each platform
  for (const [platformName, platformConfig] of Object.entries(config.platforms)) {
    const processedTokens = processTokens(tokens, platformConfig, config)

    for (const file of platformConfig.files) {
      const content = formatTokens(processedTokens, file.format, platformConfig)
      const filePath = `${platformConfig.buildPath}${file.destination}`
      outputs.set(filePath, content)
    }
  }

  return outputs
}

/**
 * Process tokens with transforms
 */
function processTokens(
  tokens: DesignTokenFile,
  platform: PlatformConfig,
  config: StyleDictionaryConfig
): TokenDictionary {
  const allTokens: ProcessedToken[] = []
  const tokenMap: Record<string, ProcessedToken> = {}

  function processNode(node: TokenGroup | StyleDictionaryToken, path: string[]) {
    if ('$value' in node) {
      // It's a token
      const token = node as StyleDictionaryToken
      const processed: ProcessedToken = {
        name: path.join('-'),
        value: token.$value,
        original: token,
        path,
        attributes: {},
      }

      // Apply transforms
      const transformNames = platform.transforms || []
      for (const transformName of transformNames) {
        const transform = config.hooks?.transforms?.[transformName]
        if (transform && transform.transform) {
          const result = transform.transform(processed, platform)
          if (transform.type === 'name') {
            processed.name = result as string
          } else if (transform.type === 'value') {
            processed.value = result as string
          } else if (transform.type === 'attribute') {
            processed.attributes = { ...processed.attributes, ...result as Record<string, string> }
          }
        }
      }

      allTokens.push(processed)
      tokenMap[path.join('.')] = processed
    } else {
      // It's a group
      for (const [key, value] of Object.entries(node)) {
        if (key.startsWith('$')) {continue}
        processNode(value as TokenGroup | StyleDictionaryToken, [...path, key])
      }
    }
  }

  for (const [key, value] of Object.entries(tokens)) {
    if (key.startsWith('$')) {continue}
    processNode(value as TokenGroup | StyleDictionaryToken, [key])
  }

  return {
    tokens: tokenMap,
    allTokens,
    unfilteredTokens: allTokens,
    usesReference: (value: string) => value.includes('{'),
    getReferences: () => [],
  }
}

/**
 * Format tokens to output string
 */
function formatTokens(
  dictionary: TokenDictionary,
  format: string,
  platform: PlatformConfig
): string {
  switch (format) {
    case 'css/variables':
      return formatCSSVariables(dictionary, platform)
    case 'scss/variables':
      return formatSCSSVariables(dictionary, platform)
    case 'javascript/es6':
      return formatJavaScriptES6(dictionary, platform)
    case 'typescript/es6-declarations':
      return formatTypeScriptDeclarations(dictionary, platform)
    case 'json/flat':
      return formatJSONFlat(dictionary)
    case 'json/nested':
      return formatJSONNested(dictionary)
    case 'ios/swift':
      return formatSwift(dictionary, platform)
    case 'android/compose':
      return formatKotlinCompose(dictionary, platform)
    default:
      return formatJSONNested(dictionary)
  }
}

/**
 * Format as CSS custom properties
 */
function formatCSSVariables(dictionary: TokenDictionary, platform: PlatformConfig): string {
  const prefix = platform.prefix || ''
  const lines = [
    '/**',
    ' * CoralCSS Design Tokens',
    ' * Generated by CoralCSS Design System',
    ' */',
    '',
    ':root {',
  ]

  let currentCategory = ''
  for (const token of dictionary.allTokens) {
    const category = token.path[0] || ''
    if (category !== currentCategory) {
      if (currentCategory) {lines.push('')}
      lines.push(`  /* ${category} */`)
      currentCategory = category
    }

    const varName = prefix ? `--${prefix}-${token.name}` : `--${token.name}`
    lines.push(`  ${varName}: ${token.value};`)
  }

  lines.push('}')
  return lines.join('\n')
}

/**
 * Format as SCSS variables
 */
function formatSCSSVariables(dictionary: TokenDictionary, platform: PlatformConfig): string {
  const prefix = platform.prefix || ''
  const lines = [
    '// CoralCSS Design Tokens',
    '// Generated by CoralCSS Design System',
    '',
  ]

  let currentCategory = ''
  for (const token of dictionary.allTokens) {
    const category = token.path[0] || ''
    if (category !== currentCategory) {
      if (currentCategory) {lines.push('')}
      lines.push(`// ${category}`)
      currentCategory = category
    }

    const varName = prefix ? `$${prefix}-${token.name}` : `$${token.name}`
    lines.push(`${varName}: ${token.value};`)
  }

  return lines.join('\n')
}

/**
 * Format as JavaScript ES6 module
 */
function formatJavaScriptES6(dictionary: TokenDictionary, platform: PlatformConfig): string {
  const lines = [
    '/**',
    ' * CoralCSS Design Tokens',
    ' * Generated by CoralCSS Design System',
    ' */',
    '',
    'export const tokens = {',
  ]

  const grouped = groupByCategory(dictionary.allTokens)

  for (const [category, tokens] of Object.entries(grouped)) {
    lines.push(`  ${category}: {`)
    for (const token of tokens) {
      const key = token.path.slice(1).join('_').replace(/-/g, '_')
      const value = typeof token.value === 'string' ? `'${token.value}'` : token.value
      lines.push(`    ${key}: ${value},`)
    }
    lines.push('  },')
  }

  lines.push('};')
  lines.push('')
  lines.push('export default tokens;')

  return lines.join('\n')
}

/**
 * Format as TypeScript declarations
 */
function formatTypeScriptDeclarations(dictionary: TokenDictionary, platform: PlatformConfig): string {
  const lines = [
    '/**',
    ' * CoralCSS Design Tokens Type Declarations',
    ' * Generated by CoralCSS Design System',
    ' */',
    '',
    'export interface CoralTokens {',
  ]

  const grouped = groupByCategory(dictionary.allTokens)

  for (const [category, tokens] of Object.entries(grouped)) {
    lines.push(`  ${category}: {`)
    for (const token of tokens) {
      const key = token.path.slice(1).join('_').replace(/-/g, '_')
      const type = typeof token.value === 'number' ? 'number' : 'string'
      lines.push(`    ${key}: ${type};`)
    }
    lines.push('  };')
  }

  lines.push('}')
  lines.push('')
  lines.push('export declare const tokens: CoralTokens;')
  lines.push('export default tokens;')

  return lines.join('\n')
}

/**
 * Format as flat JSON
 */
function formatJSONFlat(dictionary: TokenDictionary): string {
  const obj: Record<string, unknown> = {}
  for (const token of dictionary.allTokens) {
    obj[token.name] = token.value
  }
  return JSON.stringify(obj, null, 2)
}

/**
 * Format as nested JSON
 */
function formatJSONNested(dictionary: TokenDictionary): string {
  const obj: Record<string, unknown> = {}

  for (const token of dictionary.allTokens) {
    let current = obj
    for (let i = 0; i < token.path.length - 1; i++) {
      const key = token.path[i] as string
      if (!current[key]) {current[key] = {}}
      current = current[key] as Record<string, unknown>
    }
    current[token.path[token.path.length - 1] as string] = token.value
  }

  return JSON.stringify(obj, null, 2)
}

/**
 * Format as Swift code (iOS)
 */
function formatSwift(dictionary: TokenDictionary, platform: PlatformConfig): string {
  const prefix = platform.prefix || 'Coral'
  const lines = [
    '// CoralCSS Design Tokens',
    '// Generated by CoralCSS Design System',
    '',
    'import SwiftUI',
    '',
    `public enum ${prefix}Tokens {`,
  ]

  const grouped = groupByCategory(dictionary.allTokens)

  for (const [category, tokens] of Object.entries(grouped)) {
    const enumName = capitalize(category)
    lines.push(`  public enum ${enumName} {`)

    for (const token of tokens) {
      const name = camelCase(token.path.slice(1).join('-'))
      const type = token.original.$type

      if (type === 'color') {
        lines.push(`    public static let ${name} = Color(hex: "${token.value}")`)
      } else if (type === 'dimension' || type === 'spacing' || type === 'sizing') {
        const numericValue = parseFloat(String(token.value))
        lines.push(`    public static let ${name}: CGFloat = ${numericValue}`)
      } else {
        lines.push(`    public static let ${name} = "${token.value}"`)
      }
    }

    lines.push('  }')
    lines.push('')
  }

  lines.push('}')
  return lines.join('\n')
}

/**
 * Format as Kotlin Compose (Android)
 */
function formatKotlinCompose(dictionary: TokenDictionary, platform: PlatformConfig): string {
  const prefix = platform.prefix || 'Coral'
  const lines = [
    '// CoralCSS Design Tokens',
    '// Generated by CoralCSS Design System',
    '',
    'package com.coralcss.tokens',
    '',
    'import androidx.compose.ui.graphics.Color',
    'import androidx.compose.ui.unit.dp',
    'import androidx.compose.ui.unit.sp',
    '',
    `object ${prefix}Tokens {`,
  ]

  const grouped = groupByCategory(dictionary.allTokens)

  for (const [category, tokens] of Object.entries(grouped)) {
    const objName = capitalize(category)
    lines.push(`  object ${objName} {`)

    for (const token of tokens) {
      const name = camelCase(token.path.slice(1).join('-'))
      const type = token.original.$type

      if (type === 'color') {
        const hex = String(token.value).replace('#', '')
        lines.push(`    val ${name} = Color(0xFF${hex.toUpperCase()})`)
      } else if (type === 'spacing' || type === 'sizing' || type === 'borderRadius') {
        const numericValue = parseFloat(String(token.value))
        lines.push(`    val ${name} = ${numericValue}.dp`)
      } else if (type === 'dimension' && String(token.value).includes('rem')) {
        const numericValue = parseFloat(String(token.value)) * 16
        lines.push(`    val ${name} = ${numericValue}.sp`)
      } else {
        lines.push(`    val ${name} = "${token.value}"`)
      }
    }

    lines.push('  }')
    lines.push('')
  }

  lines.push('}')
  return lines.join('\n')
}

/**
 * Group tokens by category
 */
function groupByCategory(tokens: ProcessedToken[]): Record<string, ProcessedToken[]> {
  const grouped: Record<string, ProcessedToken[]> = {}

  for (const token of tokens) {
    const category = token.path[0] || 'other'
    if (!grouped[category]) {grouped[category] = []}
    grouped[category].push(token)
  }

  return grouped
}

/**
 * Capitalize first letter
 */
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Convert to camelCase
 */
function camelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
}

/**
 * Export default tokens in Style Dictionary format
 */
export function getDefaultTokens(): DesignTokenFile {
  return coralTokens
}
