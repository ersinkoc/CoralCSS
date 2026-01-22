/**
 * CSS Configuration Parser
 *
 * Parses @coral directives from CSS files for CSS-first configuration.
 * This allows configuring CoralCSS using CSS instead of JavaScript.
 *
 * @module config/css-parser
 */

import type { CoralOptions, DeepPartial, Theme } from '../types'

/**
 * Plugin option value types
 */
export type PluginOptionValue = string | number | boolean

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
  pluginOptions?: Record<string, Record<string, PluginOptionValue>>
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
    if (!source) {continue}

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
    if (!plugin) {continue}

    config.plugins = config.plugins || []
    config.disabledPlugins = config.disabledPlugins || []

    if (plugin.startsWith('no ')) {
      const disabledPlugin = plugin.slice(3).trim()
      config.disabledPlugins.push(disabledPlugin)
    } else {
      // Check for plugin options
      const optionMatch = plugin.match(/^(\w+)\s+(.+)$/)
      if (optionMatch && optionMatch[1] && optionMatch[2]) {
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
    if (!presetLine) {continue}

    // Check if preset has extension
    const extendMatch = presetLine.match(/^(\w+)\s*\{([^}]+)\}/)
    if (extendMatch && extendMatch[1] && extendMatch[2]) {
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
    if (name && value) {
      variables[name] = value
    }
  }

  return variables
}

/**
 * Parse plugin options from CSS syntax
 */
function parsePluginOptions(options: string): Record<string, PluginOptionValue> {
  const parsed: Record<string, PluginOptionValue> = {}

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
 * Extended config type to include plugin options from CSS config
 * Note: This doesn't extend Partial<CoralOptions> because CSS config
 * stores preset names as strings (for later resolution) while
 * CoralOptions expects full Preset objects
 */
interface MergedConfig {
  theme?: DeepPartial<Theme>
  content?: string[]
  safelist?: Array<string | RegExp | { pattern: RegExp; variants?: string[] }>
  blocklist?: Array<string | RegExp>
  pluginOptions?: Record<string, Record<string, PluginOptionValue>>
  // Presets stored as string names for later resolution by preset loader
  presets?: string[]
  [key: string]: unknown
}

/**
 * Merge CSS config with JS config
 * CSS config takes precedence for overlapping values
 */
export function mergeConfigs(
  jsConfig: Partial<CoralOptions>,
  cssConfig: ParsedCSSConfig
): Partial<CoralOptions> {
  // Extract pluginOptions from jsConfig if present (extended config type)
  const jsPluginOptions = (jsConfig as { pluginOptions?: Record<string, Record<string, PluginOptionValue>> }).pluginOptions

  const merged: MergedConfig = {
    theme: jsConfig.theme,
    content: Array.isArray(jsConfig.content) ? jsConfig.content : jsConfig.content ? [jsConfig.content] : undefined,
    safelist: jsConfig.safelist,
    blocklist: jsConfig.blocklist,
    pluginOptions: jsPluginOptions,
  }

  // Merge theme - CSS variables become theme values
  if (cssConfig.theme) {
    merged.theme = {
      ...jsConfig.theme,
      ...cssConfig.theme,
    } as unknown as DeepPartial<Theme>
  }

  // Merge source/content paths
  if (cssConfig.source || cssConfig.sourceNot) {
    const existingContent = merged.content || []
    const content = Array.isArray(existingContent) ? existingContent : [existingContent]

    merged.content = [
      ...content,
      ...(cssConfig.source || []),
      ...(cssConfig.sourceNot?.map(s => `!${s}`) || []),
    ]
  }

  // Merge safelist - handle both string and array from JS config
  if (cssConfig.safelist) {
    const existingSafelist = merged.safelist
    const safelist: string[] = Array.isArray(existingSafelist)
      ? (existingSafelist as string[])
      : existingSafelist
        ? [existingSafelist as unknown as string]
        : []

    merged.safelist = [
      ...safelist,
      ...cssConfig.safelist,
    ]
  }

  // Merge blocklist - handle both string and array from JS config
  if (cssConfig.blocklist) {
    const existingBlocklist = merged.blocklist
    const blocklist: string[] = Array.isArray(existingBlocklist)
      ? (existingBlocklist as string[])
      : existingBlocklist
        ? [existingBlocklist as unknown as string]
        : []

    merged.blocklist = [
      ...blocklist,
      ...cssConfig.blocklist,
    ]
  }

  // Store presets - as string array for later resolution by preset loader
  if (cssConfig.presets) {
    // Store preset names directly on the config
    // Note: These are string names, not full Preset objects
    (merged as MergedConfig).presets = cssConfig.presets as unknown as typeof merged.presets
  }

  // Merge plugin options
  if (cssConfig.pluginOptions) {
    merged.pluginOptions = {
      ...merged.pluginOptions,
      ...cssConfig.pluginOptions,
    }
  }

  // Cast to Partial<CoralOptions> - preset string names will be resolved later
  return merged as unknown as Partial<CoralOptions>
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
