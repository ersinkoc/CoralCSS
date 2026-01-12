/**
 * CSS Configuration Parser
 *
 * Parses @coral directives from CSS files for CSS-first configuration.
 * This allows configuring CoralCSS using CSS instead of JavaScript.
 *
 * @module config/css-parser
 */

import type { CoralOptions } from '../types'

/**
 * Parsed CSS configuration
 */
export interface ParsedCSSConfig {
  theme?: Record<string, string>
  source?: string[]
  sourceNot?: string[]
  safelist?: string[]
  blocklist?: string[]
  plugins?: string[]
  disabledPlugins?: string[]
  pluginOptions?: Record<string, any>
  presets?: string[]
  extends?: string[]
}

/**
 * Parse CSS configuration from CSS content
 *
 * Parses @coral directives like theme, source, plugin, and preset from CSS files.
 *
 * @param cssContent - The CSS content containing @coral directives
 * @returns Parsed configuration object
 *
 * @example
 * const css = `
 *   @coral theme {
 *     --color-primary: #3b82f6;
 *   }
 *   @coral source "./src/index.html";
 * `
 * const config = parseCSSConfig(css)
 * // config.theme = { '--color-primary': '#3b82f6' }
 */
export function parseCSSConfig(cssContent: string): ParsedCSSConfig {
  const config: ParsedCSSConfig = {}

  // Parse @coral theme
  const themeMatches = cssContent.matchAll(/@coral\s+theme\s*\{([^}]+)\}/gs)
  for (const match of themeMatches) {
    if (match[1]) {
      config.theme = parseCSSVariables(match[1])
    }
  }

  // Parse @coral source
  const sourceMatches = cssContent.matchAll(/@coral\s+source\s+([^;]+);/g)
  for (const match of sourceMatches) {
    const source = match[1]?.trim()
    if (!source) continue

    if (source.startsWith('not ')) {
      config.sourceNot = config.sourceNot || []
      config.sourceNot.push(source.slice(4).replace(/['"]/g, '').trim())
    } else if (source.includes('inline(')) {
      const inlineMatch = source.match(/inline\(\s*["']([^"']+)["']\s*\)/)
      if (inlineMatch?.[1]) {
        config.safelist = config.safelist || []
        config.safelist.push(inlineMatch[1])
      }
    } else {
      config.source = config.source || []
      config.source.push(source.replace(/['"]/g, '').trim())
    }
  }

  // Parse @coral plugin
  const pluginMatches = cssContent.matchAll(/@coral\s+plugin\s+([^;]+);/g)
  for (const match of pluginMatches) {
    const plugin = match[1]?.trim()
    if (!plugin) continue

    config.plugins = config.plugins || []
    config.disabledPlugins = config.disabledPlugins || []

    if (plugin.startsWith('no ')) {
      const disabledPlugin = plugin.slice(3).trim()
      config.disabledPlugins.push(disabledPlugin)
    } else {
      // Check for plugin options
      const optionMatch = plugin.match(/^(\w+)\s+(.+)$/)
      if (optionMatch) {
        const pluginName = optionMatch[1]
        const options = optionMatch[2]
        config.plugins.push(pluginName)
        config.pluginOptions = config.pluginOptions || {}
        config.pluginOptions[pluginName] = parsePluginOptions(options)
      } else {
        config.plugins.push(plugin)
      }
    }
  }

  // Parse @coral preset
  const presetMatches = cssContent.matchAll(/@coral\s+preset\s+([^;]+);?/g)
  for (const match of presetMatches) {
    const presetLine = match[1]?.trim()
    if (!presetLine) continue

    // Check if preset has extension
    const extendMatch = presetLine.match(/^(\w+)\s*\{([^}]+)\}/)
    if (extendMatch) {
      const presetName = extendMatch[1]
      const extension = parseCSSVariables(extendMatch[2])
      config.presets = config.presets || []
      config.presets.push(presetName)
      config.theme = { ...config.theme, ...extension }
    } else {
      const presets = presetLine.split(',').map(p => p.trim())
      config.presets = config.presets || []
      config.presets.push(...presets)
    }
  }

  return config
}

/**
 * Parse CSS variables from a CSS block
 */
function parseCSSVariables(css: string): Record<string, string> {
  const variables: Record<string, string> = {}

  // Match CSS variables with proper handling of complex values
  const regex = /--([\w-]+):\s*([^;]+);/g
  let match

  while ((match = regex.exec(css)) !== null) {
    const name = match[1]
    const value = match[2]?.trim()
    if (value) {
      variables[name] = value
    }
  }

  return variables
}

/**
 * Parse plugin options from CSS syntax
 */
function parsePluginOptions(options: string): Record<string, any> {
  const parsed: Record<string, any> = {}

  // Parse key: value pairs
  const pairs = options.split(/\s+/).filter(Boolean)
  for (const pair of pairs) {
    const [key, ...valueParts] = pair.split(':')
    const value = valueParts.join(':').trim().replace(/[;'"]/g, '')

    if (key && value) {
      // Convert numeric values
      if (/^\d+$/.test(value)) {
        parsed[key] = parseInt(value, 10)
      } else if (/^\d+\.\d+$/.test(value)) {
        parsed[key] = parseFloat(value)
      } else if (value === 'true') {
        parsed[key] = true
      } else if (value === 'false') {
        parsed[key] = false
      } else {
        parsed[key] = value
      }
    }
  }

  return parsed
}

/**
 * Merge CSS config with JS config
 * CSS config takes precedence for overlapping values
 */
export function mergeConfigs(
  jsConfig: Partial<CoralOptions>,
  cssConfig: ParsedCSSConfig
): Partial<CoralOptions> {
  const merged: Partial<CoralOptions> = { ...jsConfig }

  // Merge theme
  if (cssConfig.theme) {
    merged.theme = {
      ...jsConfig.theme,
      ...cssConfig.theme,
    } as any
  }

  // Merge source/content paths
  if (cssConfig.source || cssConfig.sourceNot) {
    const existingContent = merged.content || []
    const content = Array.isArray(existingContent) ? existingContent : [existingContent]

    merged.content = [
      ...content,
      ...(cssConfig.source || []),
      ...(cssConfig.sourceNot?.map(s => `!${s}`) || []),
    ] as any
  }

  // Merge safelist
  if (cssConfig.safelist) {
    const existingSafelist = merged.safelist || []
    const safelist = Array.isArray(existingSafelist) ? existingSafelist : [existingSafelist]

    merged.safelist = [
      ...safelist,
      ...cssConfig.safelist,
    ] as any
  }

  // Merge blocklist
  if (cssConfig.blocklist) {
    const existingBlocklist = merged.blocklist || []
    const blocklist = Array.isArray(existingBlocklist) ? existingBlocklist : [existingBlocklist]

    merged.blocklist = [
      ...blocklist,
      ...cssConfig.blocklist,
    ] as any
  }

  // Merge presets
  if (cssConfig.presets) {
    merged.presets = cssConfig.presets as any
  }

  // Merge plugin options
  if (cssConfig.pluginOptions) {
    merged.plugins = merged.plugins || {}
    merged.plugins = {
      ...merged.plugins,
      ...cssConfig.pluginOptions,
    } as any
  }

  return merged
}

/**
 * Extract @coral directives from a CSS file
 */
export function extractCoralDirectives(cssContent: string): string[] {
  const directives: string[] = []

  // Find all @coral directives
  const regex = /@coral\s+[^\n]+/g
  let match

  while ((match = regex.exec(cssContent)) !== null) {
    directives.push(match[0])
  }

  return directives
}

/**
 * Validate CSS config syntax
 */
export function validateCSSConfig(cssContent: string): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  // Check for unmatched braces
  const openBraces = (cssContent.match(/\{/g) || []).length
  const closeBraces = (cssContent.match(/\}/g) || []).length
  if (openBraces !== closeBraces) {
    errors.push('Unmatched braces in CSS config')
  }

  // Check for malformed @coral directives
  const coralDirectives = cssContent.match(/@coral\s+[^\n]+/g) || []
  for (const directive of coralDirectives) {
    if (directive.includes('{') && !directive.includes('}')) {
      errors.push(`Malformed directive: ${directive}`)
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

export default parseCSSConfig
