/**
 * Figma Tokens Integration
 *
 * Import/export design tokens to/from Figma Tokens Studio plugin format.
 *
 * @module design-system/figma-tokens
 */

import type {
  FigmaTokenFile,
  FigmaToken,
  FigmaTokenType,
  FigmaTokenCollection,
  DesignTokenFile,
  StyleDictionaryToken,
  TokenGroup,
} from './types'

/**
 * Figma Token Sync Options
 */
export interface FigmaSyncOptions {
  /** Include primitive color scales */
  includePrimitives?: boolean
  /** Include semantic tokens */
  includeSemantics?: boolean
  /** Include component tokens */
  includeComponents?: boolean
  /** Custom prefix for token names */
  prefix?: string
  /** File path for Figma tokens JSON */
  outputPath?: string
}

/**
 * Convert CoralCSS tokens to Figma Tokens Studio format
 */
export function toFigmaTokens(
  tokens: DesignTokenFile,
  options: FigmaSyncOptions = {}
): FigmaTokenFile {
  const {
    includePrimitives = true,
    includeSemantics = true,
    includeComponents = true,
  } = options

  const result: FigmaTokenFile = {}

  // Core tokens (always included)
  result['core'] = {}

  // Process colors
  if (tokens.color) {
    result['core'].color = convertToFigmaCollection(tokens.color as TokenGroup, 'color')
  }

  // Process spacing
  if (tokens.spacing) {
    result['core'].spacing = convertToFigmaCollection(tokens.spacing as TokenGroup, 'spacing')
  }

  // Process sizing
  if (tokens.sizing) {
    result['core'].sizing = convertToFigmaCollection(tokens.sizing as TokenGroup, 'sizing')
  }

  // Process typography
  if (tokens.typography) {
    const typography = tokens.typography as TokenGroup

    if (typography.fontFamily) {
      result['core'].fontFamilies = convertToFigmaCollection(typography.fontFamily as TokenGroup, 'fontFamilies')
    }
    if (typography.fontSize) {
      result['core'].fontSizes = convertToFigmaCollection(typography.fontSize as TokenGroup, 'fontSizes')
    }
    if (typography.fontWeight) {
      result['core'].fontWeights = convertToFigmaCollection(typography.fontWeight as TokenGroup, 'fontWeights')
    }
    if (typography.lineHeight) {
      result['core'].lineHeights = convertToFigmaCollection(typography.lineHeight as TokenGroup, 'lineHeights')
    }
    if (typography.letterSpacing) {
      result['core'].letterSpacing = convertToFigmaCollection(typography.letterSpacing as TokenGroup, 'letterSpacing')
    }
  }

  // Process borders
  if (tokens.border) {
    const border = tokens.border as TokenGroup

    if (border.radius) {
      result['core'].borderRadius = convertToFigmaCollection(border.radius as TokenGroup, 'borderRadius')
    }
    if (border.width) {
      result['core'].borderWidth = convertToFigmaCollection(border.width as TokenGroup, 'borderWidth')
    }
  }

  // Process shadows
  if (tokens.shadow) {
    result['core'].boxShadow = convertShadowsToFigma(tokens.shadow as TokenGroup)
  }

  // Process opacity
  if (tokens.opacity) {
    result['core'].opacity = convertToFigmaCollection(tokens.opacity as TokenGroup, 'opacity')
  }

  // Semantic tokens (theme-aware)
  if (includeSemantics) {
    // Light theme semantics
    result['semantic/light'] = createSemanticTokens('light')

    // Dark theme semantics
    result['semantic/dark'] = createSemanticTokens('dark')
  }

  // Component tokens
  if (includeComponents) {
    result['components'] = createComponentTokens()
  }

  return result
}

/**
 * Convert a token group to Figma collection format
 */
function convertToFigmaCollection(
  group: TokenGroup,
  type: FigmaTokenType
): FigmaTokenCollection {
  const result: FigmaTokenCollection = {}

  for (const [key, value] of Object.entries(group)) {
    if (key.startsWith('$')) {continue}

    if ('$value' in value) {
      // It's a token
      const token = value as StyleDictionaryToken
      result[key] = {
        value: token.$value as string | number,
        type,
        description: token.$description,
      }
    } else {
      // It's a nested group
      result[key] = convertToFigmaCollection(value as TokenGroup, type)
    }
  }

  return result
}

/**
 * Convert shadow tokens to Figma format
 */
function convertShadowsToFigma(shadows: TokenGroup): FigmaTokenCollection {
  const result: FigmaTokenCollection = {}

  for (const [key, value] of Object.entries(shadows)) {
    if (key.startsWith('$')) {continue}

    if ('$value' in value) {
      const shadowValue = (value as StyleDictionaryToken).$value

      // Parse CSS shadow string into Figma shadow object
      if (typeof shadowValue === 'string') {
        const parsed = parseCSSBoxShadow(shadowValue)
        result[key] = {
          value: parsed as unknown as Record<string, unknown>,
          type: 'boxShadow',
        }
      }
    }
  }

  return result
}

/**
 * Parse CSS box-shadow to Figma shadow object
 */
function parseCSSBoxShadow(shadow: string): FigmaShadowValue | FigmaShadowValue[] {
  if (shadow === 'none') {
    return { x: 0, y: 0, blur: 0, spread: 0, color: 'transparent', type: 'dropShadow' }
  }

  const shadows = shadow.split(/,(?![^(]*\))/).map(s => s.trim())

  const parsed = shadows.map(s => {
    const inset = s.includes('inset')
    const cleaned = s.replace('inset', '').trim()

    // Extract values using regex
    const values = cleaned.match(/(-?\d*\.?\d+px|-?\d*\.?\d+rem|rgba?\([^)]+\)|hsla?\([^)]+\)|#[a-fA-F0-9]{3,8}|\w+)/g) || []

    let x = 0, y = 0, blur = 0, spread = 0, color = 'rgba(0,0,0,0.1)'

    // Parse numeric values
    const numericValues: number[] = []
    for (const val of values) {
      if (val.includes('px')) {
        numericValues.push(parseFloat(val))
      } else if (val.includes('rem')) {
        numericValues.push(parseFloat(val) * 16)
      } else if (val.startsWith('rgb') || val.startsWith('hsl') || val.startsWith('#')) {
        color = val
      }
    }

    if (numericValues.length >= 2) {
      x = numericValues[0] || 0
      y = numericValues[1] || 0
      blur = numericValues[2] || 0
      spread = numericValues[3] || 0
    }

    return {
      x,
      y,
      blur,
      spread,
      color,
      type: inset ? 'innerShadow' : 'dropShadow',
    } as FigmaShadowValue
  })

  return parsed.length === 1 ? parsed[0] as FigmaShadowValue : parsed
}

/**
 * Figma Shadow Value
 */
interface FigmaShadowValue {
  x: number
  y: number
  blur: number
  spread: number
  color: string
  type: 'dropShadow' | 'innerShadow'
}

/**
 * Create semantic tokens for a theme
 */
function createSemanticTokens(theme: 'light' | 'dark'): FigmaTokenCollection {
  const isLight = theme === 'light'

  return {
    background: {
      default: {
        value: isLight ? '{color.white}' : '{color.slate.950}',
        type: 'color',
        description: 'Default background color',
      },
      subtle: {
        value: isLight ? '{color.slate.50}' : '{color.slate.900}',
        type: 'color',
        description: 'Subtle background for sections',
      },
      muted: {
        value: isLight ? '{color.slate.100}' : '{color.slate.800}',
        type: 'color',
        description: 'Muted background for cards',
      },
      emphasis: {
        value: isLight ? '{color.slate.200}' : '{color.slate.700}',
        type: 'color',
        description: 'Emphasized background',
      },
    },
    foreground: {
      default: {
        value: isLight ? '{color.slate.900}' : '{color.slate.50}',
        type: 'color',
        description: 'Default text color',
      },
      muted: {
        value: isLight ? '{color.slate.600}' : '{color.slate.400}',
        type: 'color',
        description: 'Muted text for secondary content',
      },
      subtle: {
        value: isLight ? '{color.slate.500}' : '{color.slate.500}',
        type: 'color',
        description: 'Subtle text for placeholders',
      },
    },
    primary: {
      default: {
        value: '{color.coral.500}',
        type: 'color',
        description: 'Primary brand color',
      },
      hover: {
        value: '{color.coral.600}',
        type: 'color',
        description: 'Primary color on hover',
      },
      active: {
        value: '{color.coral.700}',
        type: 'color',
        description: 'Primary color when active',
      },
      foreground: {
        value: '{color.white}',
        type: 'color',
        description: 'Text on primary background',
      },
    },
    border: {
      default: {
        value: isLight ? '{color.slate.200}' : '{color.slate.700}',
        type: 'color',
        description: 'Default border color',
      },
      muted: {
        value: isLight ? '{color.slate.100}' : '{color.slate.800}',
        type: 'color',
        description: 'Muted border color',
      },
      emphasis: {
        value: isLight ? '{color.slate.300}' : '{color.slate.600}',
        type: 'color',
        description: 'Emphasized border color',
      },
    },
    status: {
      success: {
        value: '{color.green.500}',
        type: 'color',
        description: 'Success status color',
      },
      warning: {
        value: '{color.yellow.500}',
        type: 'color',
        description: 'Warning status color',
      },
      error: {
        value: '{color.red.500}',
        type: 'color',
        description: 'Error status color',
      },
      info: {
        value: '{color.blue.500}',
        type: 'color',
        description: 'Info status color',
      },
    },
  }
}

/**
 * Create component tokens
 */
function createComponentTokens(): FigmaTokenCollection {
  return {
    button: {
      padding: {
        x: {
          sm: { value: '{spacing.3}', type: 'spacing' },
          md: { value: '{spacing.4}', type: 'spacing' },
          lg: { value: '{spacing.6}', type: 'spacing' },
        },
        y: {
          sm: { value: '{spacing.1.5}', type: 'spacing' },
          md: { value: '{spacing.2}', type: 'spacing' },
          lg: { value: '{spacing.3}', type: 'spacing' },
        },
      },
      borderRadius: {
        value: '{borderRadius.lg}',
        type: 'borderRadius',
      },
      fontSize: {
        sm: { value: '{fontSizes.sm}', type: 'fontSizes' },
        md: { value: '{fontSizes.base}', type: 'fontSizes' },
        lg: { value: '{fontSizes.lg}', type: 'fontSizes' },
      },
    },
    input: {
      padding: {
        x: { value: '{spacing.3}', type: 'spacing' },
        y: { value: '{spacing.2}', type: 'spacing' },
      },
      borderRadius: {
        value: '{borderRadius.md}',
        type: 'borderRadius',
      },
      borderWidth: {
        value: '{borderWidth.DEFAULT}',
        type: 'borderWidth',
      },
    },
    card: {
      padding: { value: '{spacing.6}', type: 'spacing' },
      borderRadius: { value: '{borderRadius.xl}', type: 'borderRadius' },
      shadow: { value: '{boxShadow.md}', type: 'boxShadow' },
    },
    modal: {
      padding: { value: '{spacing.8}', type: 'spacing' },
      borderRadius: { value: '{borderRadius.2xl}', type: 'borderRadius' },
      shadow: { value: '{boxShadow.2xl}', type: 'boxShadow' },
    },
    avatar: {
      size: {
        xs: { value: '{sizing.6}', type: 'sizing' },
        sm: { value: '{sizing.8}', type: 'sizing' },
        md: { value: '{sizing.10}', type: 'sizing' },
        lg: { value: '{sizing.12}', type: 'sizing' },
        xl: { value: '{sizing.16}', type: 'sizing' },
      },
      borderRadius: {
        value: '{borderRadius.full}',
        type: 'borderRadius',
      },
    },
    badge: {
      padding: {
        x: { value: '{spacing.2}', type: 'spacing' },
        y: { value: '{spacing.0.5}', type: 'spacing' },
      },
      borderRadius: { value: '{borderRadius.full}', type: 'borderRadius' },
      fontSize: { value: '{fontSizes.xs}', type: 'fontSizes' },
    },
  }
}

/**
 * Import Figma tokens and convert to CoralCSS format
 */
export function fromFigmaTokens(figmaTokens: FigmaTokenFile): DesignTokenFile {
  const result: DesignTokenFile = {
    $name: 'Imported from Figma',
    $description: 'Design tokens imported from Figma Tokens Studio',
  }

  // Process each collection
  for (const [collectionName, collection] of Object.entries(figmaTokens)) {
    if (collectionName.startsWith('$')) {continue}

    // Map Figma token types to Style Dictionary structure
    for (const [key, value] of Object.entries(collection)) {
      if (key.startsWith('$')) {continue}

      const category = mapFigmaTypeToCategory(key)
      if (!result[category]) {
        result[category] = {}
      }

      if (typeof value === 'object' && value !== null) {
        if ('value' in value && 'type' in value) {
          // Single token
          (result[category] as TokenGroup)[key] = convertFigmaToken(value as FigmaToken)
        } else {
          // Nested tokens
          (result[category] as TokenGroup)[key] = convertFigmaGroup(value as FigmaTokenCollection)
        }
      }
    }
  }

  return result
}

/**
 * Map Figma token type to category
 */
function mapFigmaTypeToCategory(type: string): string {
  const mapping: Record<string, string> = {
    color: 'color',
    spacing: 'spacing',
    sizing: 'sizing',
    borderRadius: 'border',
    borderWidth: 'border',
    fontFamilies: 'typography',
    fontSizes: 'typography',
    fontWeights: 'typography',
    lineHeights: 'typography',
    letterSpacing: 'typography',
    boxShadow: 'shadow',
    opacity: 'opacity',
  }
  return mapping[type] || type
}

/**
 * Convert single Figma token to Style Dictionary format
 */
function convertFigmaToken(token: FigmaToken): StyleDictionaryToken {
  return {
    $value: resolveTokenValue(token.value),
    $type: mapFigmaTypeToStyleDictionary(token.type),
    $description: token.description,
  }
}

/**
 * Convert Figma token group
 */
function convertFigmaGroup(group: FigmaTokenCollection): TokenGroup {
  const result: TokenGroup = {}

  for (const [key, value] of Object.entries(group)) {
    if (key.startsWith('$')) {continue}

    if ('value' in value && 'type' in value) {
      result[key] = convertFigmaToken(value as FigmaToken)
    } else {
      result[key] = convertFigmaGroup(value as FigmaTokenCollection)
    }
  }

  return result
}

/**
 * Resolve token value (convert references)
 */
function resolveTokenValue(value: FigmaToken['value']): string | number | Record<string, unknown> {
  if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
    // It's a reference - convert to DTCG reference format
    const refPath = value.slice(1, -1)
    return `{${refPath.replace(/\./g, '.')}}`
  }
  return value as string | number | Record<string, unknown>
}

/**
 * Map Figma type to Style Dictionary type
 */
function mapFigmaTypeToStyleDictionary(type: FigmaTokenType): StyleDictionaryToken['$type'] {
  const mapping: Record<FigmaTokenType, StyleDictionaryToken['$type']> = {
    color: 'color',
    borderRadius: 'borderRadius',
    borderWidth: 'dimension',
    sizing: 'sizing',
    spacing: 'spacing',
    opacity: 'opacity',
    fontFamilies: 'fontFamily',
    fontWeights: 'fontWeight',
    fontSizes: 'dimension',
    lineHeights: 'number',
    letterSpacing: 'dimension',
    paragraphSpacing: 'dimension',
    textCase: 'fontStyle',
    textDecoration: 'fontStyle',
    typography: 'typography',
    boxShadow: 'shadow',
    composition: 'typography',
    dimension: 'dimension',
    other: undefined,
  }
  return mapping[type]
}

/**
 * Generate Figma Variables format (new Figma Variables API)
 */
export function toFigmaVariables(tokens: DesignTokenFile): FigmaVariablesExport {
  const collections: FigmaVariableCollection[] = []

  // Create color collection
  if (tokens.color) {
    collections.push({
      name: 'Colors',
      modes: ['Light', 'Dark'],
      variables: createColorVariables(tokens.color as TokenGroup),
    })
  }

  // Create spacing collection
  if (tokens.spacing) {
    collections.push({
      name: 'Spacing',
      modes: ['Default'],
      variables: createSpacingVariables(tokens.spacing as TokenGroup),
    })
  }

  // Create typography collection
  if (tokens.typography) {
    collections.push({
      name: 'Typography',
      modes: ['Default'],
      variables: createTypographyVariables(tokens.typography as TokenGroup),
    })
  }

  return { collections }
}

/**
 * Figma Variables Export Format
 */
export interface FigmaVariablesExport {
  collections: FigmaVariableCollection[]
}

/**
 * Figma Variable Collection
 */
export interface FigmaVariableCollection {
  name: string
  modes: string[]
  variables: FigmaVariable[]
}

/**
 * Figma Variable
 */
export interface FigmaVariable {
  name: string
  type: 'COLOR' | 'FLOAT' | 'STRING' | 'BOOLEAN'
  values: Record<string, unknown>
  scopes?: string[]
}

/**
 * Create color variables for Figma
 */
function createColorVariables(colors: TokenGroup): FigmaVariable[] {
  const variables: FigmaVariable[] = []

  function processColorGroup(group: TokenGroup, prefix: string) {
    for (const [key, value] of Object.entries(group)) {
      if (key.startsWith('$')) {continue}

      const name = prefix ? `${prefix}/${key}` : key

      if ('$value' in value) {
        const token = value as StyleDictionaryToken
        variables.push({
          name,
          type: 'COLOR',
          values: {
            Light: token.$value,
            Dark: token.$value, // Can be overridden by semantic tokens
          },
          scopes: ['ALL_FILLS', 'STROKE_COLOR'],
        })
      } else {
        processColorGroup(value as TokenGroup, name)
      }
    }
  }

  processColorGroup(colors, '')
  return variables
}

/**
 * Create spacing variables for Figma
 */
function createSpacingVariables(spacing: TokenGroup): FigmaVariable[] {
  const variables: FigmaVariable[] = []

  for (const [key, value] of Object.entries(spacing)) {
    if (key.startsWith('$')) {continue}

    if ('$value' in value) {
      const token = value as StyleDictionaryToken
      const numericValue = parseFloat(String(token.$value))
      variables.push({
        name: `spacing/${key}`,
        type: 'FLOAT',
        values: { Default: numericValue },
        scopes: ['GAP', 'WIDTH_HEIGHT'],
      })
    }
  }

  return variables
}

/**
 * Create typography variables for Figma
 */
function createTypographyVariables(typography: TokenGroup): FigmaVariable[] {
  const variables: FigmaVariable[] = []

  // Font sizes
  if (typography.fontSize) {
    for (const [key, value] of Object.entries(typography.fontSize as TokenGroup)) {
      if (key.startsWith('$')) {continue}
      if ('$value' in value) {
        const token = value as StyleDictionaryToken
        const numericValue = parseFloat(String(token.$value))
        variables.push({
          name: `fontSize/${key}`,
          type: 'FLOAT',
          values: { Default: numericValue },
        })
      }
    }
  }

  return variables
}

/**
 * Sync tokens with Figma (placeholder for API integration)
 */
export async function syncWithFigma(
  tokens: DesignTokenFile,
  options: {
    accessToken: string
    fileKey: string
    mode: 'push' | 'pull' | 'sync'
  }
): Promise<{ success: boolean; message: string }> {
  // This is a placeholder for actual Figma API integration
  // In production, this would use the Figma REST API or Plugin API

  const { accessToken, fileKey, mode } = options

  console.log(`Syncing tokens with Figma file ${fileKey} in ${mode} mode...`)

  // Validate access token
  if (!accessToken || accessToken.length < 10) {
    return {
      success: false,
      message: 'Invalid Figma access token',
    }
  }

  // Validate file key
  if (!fileKey || fileKey.length < 10) {
    return {
      success: false,
      message: 'Invalid Figma file key',
    }
  }

  // In a real implementation:
  // 1. For 'push': Upload tokens to Figma using Variables API
  // 2. For 'pull': Download tokens from Figma Variables
  // 3. For 'sync': Bidirectional sync with conflict resolution

  return {
    success: true,
    message: `Tokens ${mode === 'push' ? 'pushed to' : mode === 'pull' ? 'pulled from' : 'synced with'} Figma successfully`,
  }
}
