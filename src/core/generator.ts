/**
 * CSS Generator
 *
 * Generates CSS from matched rules.
 * @module core/generator
 */

import type {
  Rule,
  Variant,
  Theme,
  CSSProperties,
  GeneratedCSS,
  ParsedClass,
  MatchResult,
} from '../types'
import { escapeSelector } from '../utils/string'
import { formatRule } from '../utils/css'
import { CSSCache, type CacheOptions } from './cache'

/**
 * CSSGenerator options
 */
export interface CSSGeneratorOptions {
  /** Enable caching for generated CSS */
  cache?: boolean
  /** Cache configuration options */
  cacheOptions?: CacheOptions
}

/**
 * Convert hex color to rgb values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result || !result[1] || !result[2] || !result[3]) { return null }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

/**
 * Variant wrapper type - can be string, CSS transformer, or match-based factory
 */
type VariantWrapper =
  | string
  | ((css: string) => string)
  | ((matches: RegExpMatchArray | null) => string)

/**
 * Resolve a variant wrapper to just the wrapper string (for simple use cases)
 * Used by CSSGenerator which needs the raw wrapper string
 */
function resolveWrapperString(
  wrapper: VariantWrapper,
  matches: RegExpMatchArray | null
): string | null {
  if (typeof wrapper === 'string') {
    return wrapper
  }

  if (typeof wrapper === 'function') {
    try {
      const result = wrapper(matches as never)
      if (typeof result === 'string' && (result.startsWith('@') || result.startsWith(':'))) {
        return result
      }
    } catch {
      // If calling fails, wrapper is likely expecting CSS string, not matches
      return null
    }
  }

  return null
}

/**
 * Resolve a variant wrapper into a standard wrapper function
 * Handles the three possible wrapper types in a type-safe manner
 */
function resolveWrapperFunction(
  wrapper: VariantWrapper,
  matches: RegExpMatchArray | null
): ((css: string) => string) | null {
  if (typeof wrapper === 'string') {
    // Simple string wrapper
    return (cssStr: string) => `${wrapper} {\n${cssStr}\n}`
  }

  if (typeof wrapper === 'function') {
    // Try calling with matches to see if it's a factory function
    // Factory functions return a string (the wrapper), not wrapped CSS
    try {
      const result = wrapper(matches as never) // Use 'never' to allow both signatures

      if (typeof result === 'string') {
        // Check if result looks like a wrapper string (starts with @) or wrapped CSS
        // Factory functions return things like '@media (min-width: 768px)'
        // CSS transformer functions return actual CSS with selectors and properties
        const isWrapperString = result.startsWith('@') || result.startsWith(':')
        if (isWrapperString) {
          // It's a factory function that returned a wrapper string
          return (cssStr: string) => `${result} {\n${cssStr}\n}`
        }
        // It seems to be a CSS transformer that already wrapped the CSS
        // This shouldn't happen for wrappers, but handle it gracefully
        return () => result
      }
    } catch {
      // If calling with matches fails, it might be expecting CSS string
      // Return the wrapper as-is to be called later with CSS
      return wrapper as (css: string) => string
    }
  }

  return null
}

/**
 * Flatten nested CSS properties into an array of [key, value] pairs
 * Handles nested objects like { padding: { top: '1rem', bottom: '2rem' } }
 * by converting them to flat properties like 'padding-top', 'padding-bottom'
 */
function flattenProperties(properties: CSSProperties, prefix = ''): Array<[string, string | number]> {
  const result: Array<[string, string | number]> = []

  for (const [key, value] of Object.entries(properties)) {
    const fullKey = prefix ? `${prefix}-${key}` : key

    if (typeof value === 'string' || typeof value === 'number') {
      result.push([fullKey, value])
    } else if (typeof value === 'object' && value !== null) {
      // Recursively flatten nested objects
      result.push(...flattenProperties(value as CSSProperties, fullKey))
    }
  }

  return result
}

/**
 * Recursively apply !important to all CSS property values, including nested objects
 */
function applyImportantRecursive(properties: CSSProperties): CSSProperties {
  const result: CSSProperties = {}

  for (const [key, value] of Object.entries(properties)) {
    if (typeof value === 'string') {
      // Avoid double !important
      result[key] = value.includes('!important') ? value : `${value} !important`
    } else if (typeof value === 'number') {
      result[key] = `${value} !important`
    } else if (typeof value === 'object' && value !== null) {
      // Recursively handle nested objects
      result[key] = applyImportantRecursive(value as CSSProperties)
    } else {
      result[key] = value
    }
  }

  return result
}

/**
 * Apply opacity to a color value
 */
function applyOpacityToColor(color: string, opacity: number): string {
  // Handle hex colors
  if (color.startsWith('#')) {
    const rgb = hexToRgb(color)
    if (rgb) {
      return `rgb(${rgb.r} ${rgb.g} ${rgb.b} / ${opacity})`
    }
  }
  // Handle existing rgb/rgba
  if (color.startsWith('rgb(')) {
    // rgb(r g b) or rgb(r, g, b)
    const match = color.match(/rgb\(([^)]+)\)/)
    if (match && match[1]) {
      const values = match[1].replace(/,/g, ' ').trim()
      return `rgb(${values} / ${opacity})`
    }
  }
  if (color.startsWith('rgba(')) {
    // Replace existing alpha
    const match = color.match(/rgba\(([^,]+),\s*([^,]+),\s*([^,]+),\s*[^)]+\)/)
    if (match) {
      return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${opacity})`
    }
  }
  // Handle hsl
  if (color.startsWith('hsl(')) {
    const match = color.match(/hsl\(([^)]+)\)/)
    if (match && match[1]) {
      const values = match[1].replace(/,/g, ' ').trim()
      return `hsl(${values} / ${opacity})`
    }
  }
  // Fallback: return color with opacity as CSS variable
  return color
}

/**
 * Generator options
 */
export interface GeneratorOptions {
  /** CSS class prefix */
  prefix?: string
}

/**
 * CSS Generator class
 *
 * @example
 * ```typescript
 * const generator = new Generator(theme, variants)
 * const css = generator.generateClass('p-4', rule, match)
 * ```
 */
export class Generator {
  private theme: Theme
  private variants: Map<string, Variant>
  private prefix: string

  constructor(
    theme: Theme,
    variants: Map<string, Variant>,
    options: GeneratorOptions = {}
  ) {
    this.theme = theme
    this.variants = variants
    this.prefix = options.prefix ?? ''
  }

  /**
   * Generate CSS for a single class
   *
   * @example
   * ```typescript
   * const css = generator.generateClass('p-4', rule, ['p-4', '4'])
   * // { selector: '.p-4', properties: { padding: '1rem' }, ... }
   * ```
   */
  generateClass(
    className: string,
    rule: Rule,
    match: RegExpMatchArray
  ): GeneratedCSS | null {
    // Generate CSS properties from rule using generate, handler, or properties
    let properties: CSSProperties | null = null

    if (rule.generate) {
      properties = rule.generate(match, this.theme)
    } else if (rule.handler) {
      const result = rule.handler(match, this.theme)
      if (result) {
        // Check if result has a 'properties' key with object value
        if (typeof result === 'object' && 'properties' in result && typeof result.properties === 'object') {
          properties = result.properties as CSSProperties
        } else {
          properties = result as CSSProperties
        }
      }
    } else if (rule.properties) {
      properties = rule.properties
    }

    if (!properties) {
      return null
    }

    // Create selector
    const escapedClass = escapeSelector(className)
    const selector = this.prefix ? `.${this.prefix}${escapedClass}` : `.${escapedClass}`

    return {
      selector,
      properties,
      layer: rule.layer ?? 'utilities',
      priority: rule.priority ?? 0,
      className,
      variants: [],
    }
  }

  /**
   * Generate CSS for a parsed class with variants
   *
   * @example
   * ```typescript
   * const parsed = parse('hover:dark:bg-red-500')
   * const matchResult = matcher.match('bg-red-500')
   * const css = generator.generateWithVariants(parsed, matchResult)
   * ```
   */
  generateWithVariants(
    parsed: ParsedClass,
    matchResult: MatchResult
  ): GeneratedCSS | null {
    // Generate base CSS
    const baseCSS = this.generateClass(
      parsed.original,
      matchResult.rule,
      matchResult.match
    )

    if (!baseCSS) {
      return null
    }

    // Apply variants
    baseCSS.variants = parsed.variants

    // Handle important modifier - recursively apply to all values including nested objects
    if (parsed.important) {
      baseCSS.properties = applyImportantRecursive(baseCSS.properties)
    }

    // Handle opacity modifier
    if (parsed.opacity) {
      const opacityValue = parsed.opacity.startsWith('[')
        ? parseFloat(parsed.opacity.slice(1, -1))
        : parseInt(parsed.opacity, 10) / 100

      // Apply opacity to color properties by converting to rgba
      const colorProps = ['color', 'backgroundColor', 'borderColor', 'background-color', 'border-color', 'outline-color', 'fill', 'stroke']
      for (const key of colorProps) {
        const value = baseCSS.properties[key]
        if (typeof value === 'string') {
          baseCSS.properties[key] = applyOpacityToColor(value, opacityValue)
        }
      }
    }

    return baseCSS
  }

  /**
   * Find a variant by name, supporting pattern matching for dynamic variants
   * @returns The variant and optional regex match array
   */
  private findVariant(variantName: string): { variant: Variant; matches: RegExpMatchArray | null } | null {
    // First try exact match
    const exactMatch = this.variants.get(variantName)
    if (exactMatch) {
      return { variant: exactMatch, matches: null }
    }

    // Try pattern matching for dynamic variants (e.g., has-[.foo], data-[state=open])
    for (const [, variant] of this.variants) {
      if (variant.match instanceof RegExp) {
        const matches = variantName.match(variant.match)
        if (matches) {
          return { variant, matches }
        }
      }
    }

    return null
  }

  /**
   * Apply variants to generated CSS and produce final CSS string
   *
   * @example
   * ```typescript
   * const cssString = generator.applyVariants(generatedCSS)
   * // '@media (min-width: 768px) { .md\\:hover\\:bg-red-500:hover { background-color: red; } }'
   * ```
   */
  applyVariants(css: GeneratedCSS): string {
    let selector = css.selector
    let cssString = formatRule(selector, css.properties)
    const appliedVariants = [...css.variants].reverse() // Apply in reverse order
    const wrappers: ((css: string) => string)[] = []

    for (const variantName of appliedVariants) {
      const result = this.findVariant(variantName)
      if (!result) {
        // Unknown variant, skip
        continue
      }

      const { variant, matches } = result

      // Use transform if available, otherwise construct from handler
      if (variant.transform) {
        cssString = variant.transform(selector, cssString)
      } else if (variant.handler) {
        // Pass matches to handler for dynamic variants
        const newSelector = variant.handler(selector, matches)
        cssString = cssString.replace(selector, newSelector)
        selector = newSelector
      }

      // Collect wrappers (for at-rules like media queries)
      if (variant.wrapper) {
        const wrapperFn = resolveWrapperFunction(variant.wrapper, matches)
        if (wrapperFn) {
          wrappers.push(wrapperFn)
        }
      }
    }

    // Apply wrappers from outer to inner
    for (const wrapper of wrappers.reverse()) {
      cssString = wrapper(cssString)
    }

    return cssString
  }

  /**
   * Generate CSS string from GeneratedCSS object
   */
  toCSS(css: GeneratedCSS): string {
    if (css.variants.length === 0) {
      return formatRule(css.selector, css.properties)
    }
    return this.applyVariants(css)
  }

  /**
   * Generate CSS for multiple classes
   *
   * @example
   * ```typescript
   * const cssStrings = generator.generateMany(parsedClasses, matchResults)
   * const fullCSS = cssStrings.join('\n')
   * ```
   */
  generateMany(
    parsedClasses: ParsedClass[],
    getMatchResult: (utility: string) => MatchResult | null
  ): string[] {
    const results: string[] = []

    for (const parsed of parsedClasses) {
      const matchResult = getMatchResult(parsed.utility)
      if (!matchResult) {
        continue
      }

      const css = this.generateWithVariants(parsed, matchResult)
      if (css) {
        results.push(this.toCSS(css))
      }
    }

    return results
  }

  /**
   * Update theme
   */
  setTheme(theme: Theme): void {
    this.theme = theme
  }

  /**
   * Update variants
   */
  setVariants(variants: Map<string, Variant>): void {
    this.variants = variants
  }

  /**
   * Update prefix
   */
  setPrefix(prefix: string): void {
    this.prefix = prefix
  }
}

/**
 * Create a new generator instance
 */
export function createGenerator(
  theme: Theme,
  variants: Map<string, Variant>,
  options?: GeneratorOptions
): Generator {
  return new Generator(theme, variants, options)
}

/**
 * Generate CSS properties for negative values
 *
 * @example
 * ```typescript
 * const props = generateNegative({ marginTop: '1rem' })
 * // { marginTop: '-1rem' }
 * ```
 */
export function generateNegative(properties: CSSProperties): CSSProperties {
  const result: CSSProperties = {}

  for (const [key, value] of Object.entries(properties)) {
    if (typeof value === 'string' && /^[0-9]/.test(value)) {
      result[key] = `-${value}`
    } else if (typeof value === 'number' && value > 0) {
      result[key] = -value
    } else {
      result[key] = value
    }
  }

  return result
}

/**
 * Merge CSS properties, later values override earlier
 */
export function mergeProperties(...propsList: CSSProperties[]): CSSProperties {
  return Object.assign({}, ...propsList)
}

/**
 * Sort generated CSS by layer and priority
 */
export function sortGeneratedCSS(cssItems: GeneratedCSS[]): GeneratedCSS[] {
  const layerOrder: Record<string, number> = {
    base: 0,
    components: 1,
    utilities: 2,
  }

  return [...cssItems].sort((a, b) => {
    // First sort by layer
    const layerA = layerOrder[a.layer] ?? 2
    const layerB = layerOrder[b.layer] ?? 2
    const layerDiff = layerA - layerB
    if (layerDiff !== 0) {
      return layerDiff
    }

    // Then by priority within layer
    return a.priority - b.priority
  })
}

/**
 * Deduplicate CSS items by selector
 */
export function dedupeGeneratedCSS(cssItems: GeneratedCSS[]): GeneratedCSS[] {
  const seen = new Map<string, GeneratedCSS>()

  for (const item of cssItems) {
    const key = `${item.selector}:${item.variants.join(':')}`
    // Later items override earlier
    seen.set(key, item)
  }

  return Array.from(seen.values())
}

/**
 * CSSGenerator - Simplified generator that wraps matcher
 *
 * Provides a simpler API for generating CSS from class names.
 *
 * @example
 * ```typescript
 * const matcher = new RuleMatcher()
 * const generator = new CSSGenerator(matcher)
 *
 * matcher.addRule({
 *   pattern: 'block',
 *   properties: { display: 'block' }
 * })
 *
 * const css = generator.generateClass('block')
 * // '.block { display: block; }'
 * ```
 */
export class CSSGenerator {
  private matcher: { match: (utility: string) => MatchResult | null }
  private variants: Map<string, Variant>
  private theme: Theme
  private cache: CSSCache | null

  constructor(
    matcher: { match: (utility: string) => MatchResult | null },
    theme?: Theme,
    options: CSSGeneratorOptions = {}
  ) {
    this.matcher = matcher
    this.variants = new Map()
    this.theme = theme ?? ({} as Theme)

    // Initialize cache if enabled (default: enabled)
    const cacheEnabled = options.cache !== false
    this.cache = cacheEnabled ? new CSSCache(options.cacheOptions) : null
  }

  /**
   * Add a variant
   */
  addVariant(variant: Variant): void {
    this.variants.set(variant.name, variant)
  }

  /**
   * Find a variant by name, supporting pattern matching for dynamic variants
   */
  private findVariant(variantName: string): { variant: Variant; matches: RegExpMatchArray | null } | null {
    // First try exact match
    const exactMatch = this.variants.get(variantName)
    if (exactMatch) {
      return { variant: exactMatch, matches: null }
    }

    // Try pattern matching for dynamic variants
    for (const [, variant] of this.variants) {
      if (variant.match instanceof RegExp) {
        const matches = variantName.match(variant.match)
        if (matches) {
          return { variant, matches }
        }
      }
    }

    return null
  }

  /**
   * Generate CSS for a single class
   */
  generateClass(className: string): string {
    // Check cache first
    if (this.cache) {
      const cached = this.cache.get(className)
      if (cached !== undefined) {
        return cached
      }
    }

    // Handle important prefix
    const isImportant = className.startsWith('!')
    const cleanClassName = isImportant ? className.slice(1) : className

    // Parse variants
    const parts = cleanClassName.split(':')
    const utility = parts.pop() ?? cleanClassName
    const variantNames = parts

    // Match the utility
    const matchResult = this.matcher.match(utility)
    if (!matchResult) {
      return ''
    }

    // Generate properties
    const rule = matchResult.rule
    const match = matchResult.match
    let properties: CSSProperties | null = null

    if (rule.generate) {
      properties = rule.generate(match, this.theme)
    } else if (rule.handler) {
      const result = rule.handler(match, this.theme)
      if (result) {
        if (typeof result === 'object' && 'properties' in result && typeof result.properties === 'object') {
          properties = result.properties as CSSProperties
        } else {
          properties = result as CSSProperties
        }
      }
    } else if (rule.properties) {
      properties = rule.properties
    }

    if (!properties) {
      return ''
    }

    // Create selector
    const escapedClass = escapeSelector(className)
    let selector = `.${escapedClass}`
    const wrappers: string[] = []

    // Apply variants to selector
    for (const variantName of variantNames.reverse()) {
      const result = this.findVariant(variantName)
      if (!result) { continue }

      const { variant, matches } = result

      if (variant.handler) {
        selector = variant.handler(selector, matches)
      }

      // Collect wrappers for at-rules
      if (variant.wrapper) {
        const wrapperStr = resolveWrapperString(variant.wrapper, matches)
        if (wrapperStr) {
          wrappers.push(wrapperStr)
        }
      }
    }

    // Apply !important if needed (recursively for nested properties)
    const finalProps = isImportant ? applyImportantRecursive(properties) : properties

    // Format properties (handles nested objects via flattenProperties)
    const propsString = flattenProperties(finalProps)
      .map(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
        return `${cssKey}: ${value}`
      })
      .join('; ')

    let cssOutput = `${selector} { ${propsString}; }`

    // Apply wrappers (reverse order - inner to outer)
    for (const wrapper of wrappers.reverse()) {
      cssOutput = `${wrapper} {\n${cssOutput}\n}`
    }

    // Cache the result
    if (this.cache) {
      this.cache.set(className, cssOutput)
    }

    return cssOutput
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { hits: number; misses: number; size: number; hitRate: number } | null {
    if (!this.cache) {
      return null
    }
    return this.cache.stats()
  }

  /**
   * Clear the cache
   */
  clearCache(): void {
    if (this.cache) {
      this.cache.clear()
    }
  }

  /**
   * Check if caching is enabled
   */
  isCacheEnabled(): boolean {
    return this.cache !== null
  }

  /**
   * Generate CSS for multiple classes
   */
  generateMultiple(classNames: string[]): string {
    const seen = new Set<string>()
    const results: string[] = []

    for (const className of classNames) {
      if (seen.has(className)) {continue}
      seen.add(className)

      const css = this.generateClass(className)
      if (css) {
        results.push(css)
      }
    }

    return results.join('\n')
  }

  /**
   * Set theme
   * Note: Clears cache since theme changes may affect CSS output
   */
  setTheme(theme: Theme): void {
    this.theme = theme
    // Clear cache when theme changes since CSS output may differ
    if (this.cache) {
      this.cache.clear()
    }
  }
}
