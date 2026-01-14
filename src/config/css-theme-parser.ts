/**
 * CSS Theme Parser - CSS-first Configuration
 *
 * Parse @theme directive from CSS and convert to Coral config.
 * Supports Tailwind 4.1 compatible CSS-first configuration.
 *
 * @module config/css-theme-parser
 */

import type { CoralOptions, Theme, ThemeColors, DeepPartial } from '../types'

/**
 * Plugin directive from CSS @plugin
 */
export interface PluginDirective {
  name: string
}

/**
 * Output from CSS theme parser
 */
export interface CSSThemeConfig {
  theme?: DeepPartial<Theme>
  pluginDirectives?: PluginDirective[]
}

/**
 * CSS Variable definition
 */
interface CSSVariable {
  name: string
  value: string
  category: 'color' | 'spacing' | 'font-family' | 'font-size' | 'border-radius' | 'breakpoint' | 'other'
}

/**
 * Parsed CSS theme
 */
interface ParsedTheme {
  variables: Map<string, CSSVariable>
  imports: string[]
}

/**
 * Parse CSS @theme directive
 *
 * @example
 * ```css
 * @import "coralcss";
 *
 * @theme {
 *   --color-primary: #3b82f6;
 *   --font-sans: "Inter", sans-serif;
 *   --breakpoint-sm: 40rem;
 * }
 * ```
 */
export function parseCSSTheme(cssContent: string): CSSThemeConfig {
  const parsed = parseCSSVariables(cssContent)
  const theme = buildThemeFromVariables(parsed)
  const pluginDirectives = extractPluginDirectives(cssContent)

  return {
    theme,
    pluginDirectives,
  }
}

/**
 * Parse CSS variables from content
 */
function parseCSSVariables(cssContent: string): ParsedTheme {
  const variables = new Map<string, CSSVariable>()
  const imports: string[] = []

  // Extract @import statements
  const importRegex = /@import\s+['"]([^'"]+)['"];/g
  let match
  while ((match = importRegex.exec(cssContent)) !== null) {
    imports.push(match[1]!)
  }

  // Extract @theme block
  const themeMatch = cssContent.match(/@theme\s*{([^}]+)}/s)
  const themeContent = themeMatch?.[1] ?? cssContent

  // Extract CSS variables
  const varRegex = /--([a-zA-Z0-9-]+)\s*:\s*([^;]+);/g
  while ((match = varRegex.exec(themeContent)) !== null) {
    const name = match[1]!
    const value = match[2]!.trim()
    const category = categorizeVariable(name, value)

    variables.set(name, { name, value, category })
  }

  return { variables, imports }
}

/**
 * Categorize CSS variable by name pattern
 */
function categorizeVariable(name: string, value: string): CSSVariable['category'] {
  // Color variables
  if (name.startsWith('color-') ||
      /^#[0-9a-fA-F]{3,8}$/.test(value) ||
      value.startsWith('oklab(') ||
      value.startsWith('oklch(') ||
      value.startsWith('rgb(') ||
      value.startsWith('hsl(') ||
      value.startsWith('hwb(')) {
    return 'color'
  }

  // Spacing variables
  if (name.startsWith('spacing-') ||
      name.startsWith('gap-') ||
      /^[0-9.]+(px|rem|em|ch|vh|vw|%)?$/.test(value)) {
    return 'spacing'
  }

  // Font family
  if (name.startsWith('font-') && value.includes(',')) {
    return 'font-family'
  }

  // Font size
  if (name.startsWith('text-') || name.startsWith('font-size-')) {
    return 'font-size'
  }

  // Border radius
  if (name.startsWith('radius-') || name.startsWith('rounded-')) {
    return 'border-radius'
  }

  // Breakpoint
  if (name.startsWith('breakpoint-')) {
    return 'breakpoint'
  }

  return 'other'
}

/**
 * Build Coral theme from parsed CSS variables
 */
function buildThemeFromVariables(parsed: ParsedTheme): Partial<Theme> {
  const theme: Partial<Theme> = {
    colors: {},
    spacing: {},
    fontSizes: {},
    borderRadius: {},
    fonts: { sans: [], serif: [], mono: [] },
    screens: {},
  }

  for (const [name, variable] of parsed.variables) {
    switch (variable.category) {
      case 'color':
        theme.colors![name.replace('color-', '')] = variable.value
        break
      case 'spacing':
        theme.spacing![name.replace(/^(spacing-|gap-)/, '')] = variable.value
        break
      case 'font-size':
        theme.fontSizes![name.replace(/^(text-|font-size-)/, '')] = { fontSize: variable.value, lineHeight: '1.5' }
        break
      case 'font-family':
        // Parse font family string to array
        const fontKey = name.replace('font-', '')
        if (fontKey === 'sans' || fontKey === 'serif' || fontKey === 'mono') {
          theme.fonts![fontKey] = variable.value.split(',').map(f => f.trim())
        }
        break
      case 'border-radius':
        theme.borderRadius![name.replace(/^(radius-|rounded-)/, '')] = variable.value
        break
      case 'breakpoint':
        theme.screens![name.replace('breakpoint-', '')] = variable.value
        break
      case 'other':
        // Skip extend - not supported in Theme type
        break
    }
  }

  // Add default color palette if none defined
  if (Object.keys(theme.colors!).length === 0) {
    theme.colors = getDefaultColorPalette()
  }

  return theme
}

/**
 * Extract plugin directives from CSS
 */
function extractPluginDirectives(cssContent: string): PluginDirective[] {
  const plugins: PluginDirective[] = []

  // @plugin directive
  const pluginRegex = /@plugin\s+['"]([^'"]+)['"];/g
  let match
  while ((match = pluginRegex.exec(cssContent)) !== null) {
    const pluginName = match[1]
    if (pluginName) {
      plugins.push({ name: pluginName })
    }
  }

  return plugins
}

/**
 * Get default color palette (Tailwind compatible)
 */
function getDefaultColorPalette(): ThemeColors {
  return {
    // Coral brand colors
    coral: {
      50: '#fff1f0',
      100: '#ffddd8',
      200: '#ffb8ad',
      300: '#ff9282',
      400: '#ff6b5c',
      500: '#ff453a',
      600: '#f63021',
      700: '#cd1c12',
      800: '#a5150e',
      900: '#84100c',
      950: '#450504',
    },
    // Slate
    slate: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    },
    // Additional colors...
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',
    current: 'currentColor',
  }
}

/**
 * Generate CSS from Coral theme (reverse operation)
 *
 * @example
 * ```typescript
 * const css = generateCSSTheme({
 *   colors: { primary: '#3b82f6' },
 *   spacing: { '128': '32rem' }
 * })
 * // Returns: "@theme { --color-primary: #3b82f6; --spacing-128: 32rem; }"
 * ```
 */
export function generateCSSTheme(theme: Partial<Theme>): string {
  const lines: string[] = ['@theme {']

  // Colors
  if (theme.colors) {
    for (const [name, value] of Object.entries(theme.colors)) {
      if (typeof value === 'object') {
        // Nested color palette (e.g., coral: { 50: '#fff' })
        for (const [shade, shadeValue] of Object.entries(value)) {
          lines.push(`  --color-${name}-${shade}: ${shadeValue};`)
        }
      } else {
        lines.push(`  --color-${name}: ${value};`)
      }
    }
  }

  // Spacing
  if (theme.spacing) {
    for (const [name, value] of Object.entries(theme.spacing)) {
      lines.push(`  --spacing-${name}: ${value};`)
    }
  }

  // Font sizes
  if (theme.fontSizes) {
    for (const [name, value] of Object.entries(theme.fontSizes)) {
      const fontSize = Array.isArray(value) ? value[0] : value
      lines.push(`  --text-${name}: ${fontSize};`)
    }
  }

  // Border radius
  if (theme.borderRadius) {
    for (const [name, value] of Object.entries(theme.borderRadius)) {
      lines.push(`  --radius-${name}: ${value};`)
    }
  }

  // Breakpoints
  if (theme.screens) {
    for (const [name, value] of Object.entries(theme.screens)) {
      lines.push(`  --breakpoint-${name}: ${value};`)
    }
  }

  // Font families
  if (theme.fonts) {
    for (const [name, value] of Object.entries(theme.fonts)) {
      const fontValue = Array.isArray(value) ? value.join(', ') : value
      lines.push(`  --font-${name}: ${fontValue};`)
    }
  }

  lines.push('}')

  return lines.join('\n')
}

/**
 * Validate CSS theme syntax
 *
 * @returns { valid: boolean, errors: string[] }
 */
export function validateCSSTheme(cssContent: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // Check for @theme directive
  if (!cssContent.includes('@theme')) {
    errors.push('Missing @theme directive')
  }

  // Check for valid CSS variables
  const varRegex = /--([a-zA-Z0-9-]+)\s*:\s*([^;]+);/g
  let match
  let varCount = 0
  while ((match = varRegex.exec(cssContent)) !== null) {
    varCount++
  }

  if (varCount === 0) {
    errors.push('No CSS variables defined in @theme block')
  }

  // Check for unclosed braces
  const openBraces = (cssContent.match(/{/g) || []).length
  const closeBraces = (cssContent.match(/}/g) || []).length
  if (openBraces !== closeBraces) {
    errors.push('Unclosed braces detected')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Get theme value by CSS variable name
 *
 * @example
 * ```typescript
 * const theme = parseCSSTheme(css)
 * const primaryColor = getThemeValue(theme, '--color-primary')
 * // Returns: '#3b82f6'
 * ```
 */
export function getThemeValue(options: CoralOptions, varName: string): string | undefined {
  if (!options.theme) {
    return undefined
  }

  // Remove leading '--'
  const cleanName = varName.replace(/^--/, '')

  // Check if it's a color variable
  if (cleanName.startsWith('color-') && options.theme.colors) {
    const colorName = cleanName.replace('color-', '')
    return options.theme.colors[colorName] as string | undefined
  }

  // Check other categories
  // ... (similar logic for spacing, fontSize, etc.)

  return undefined
}

/**
 * Merge multiple CSS themes
 *
 * @example
 * ```typescript
 * const merged = mergeCSSThemes([baseTheme, customTheme, userTheme])
 * ```
 */
export function mergeCSSThemes(themes: string[]): string {
  const allVariables = new Map<string, string>()

  for (const theme of themes) {
    const parsed = parseCSSVariables(theme)
    for (const [name, variable] of parsed.variables) {
      allVariables.set(`--${name}`, variable.value)
    }
  }

  const lines: string[] = ['@theme {']
  for (const [name, value] of allVariables.entries()) {
    lines.push(`  ${name}: ${value};`)
  }
  lines.push('}')

  return lines.join('\n')
}

/**
 * Create a CSS theme preset
 *
 * @example
 * ```typescript
 * const darkTheme = createCSSThemePreset({
 *   colors: { primary: '#60a5fa' },
 *   darkMode: true
 * })
 * ```
 */
export function createCSSThemePreset(config: {
  colors?: Record<string, string>
  spacing?: Record<string, string>
  darkMode?: boolean
  name?: string
}): string {
  const lines: string[] = []

  if (config.name) {
    lines.push(`/* ${config.name} */`)
  }

  lines.push('@theme {')

  if (config.colors) {
    for (const [name, value] of Object.entries(config.colors)) {
      lines.push(`  --color-${name}: ${value};`)
    }
  }

  if (config.spacing) {
    for (const [name, value] of Object.entries(config.spacing)) {
      lines.push(`  --spacing-${name}: ${value};`)
    }
  }

  if (config.darkMode) {
    lines.push('  /* Dark mode theme */')
    lines.push('  @media (prefers-color-scheme: dark) {')
    lines.push('    --color-background: #0f172a;')
    lines.push('    --color-foreground: #f8fafc;')
    lines.push('  }')
  }

  lines.push('}')

  return lines.join('\n')
}

export default {
  parseCSSTheme,
  generateCSSTheme,
  validateCSSTheme,
  getThemeValue,
  mergeCSSThemes,
  createCSSThemePreset,
}
