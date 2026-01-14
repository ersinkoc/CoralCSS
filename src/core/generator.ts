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

    // Handle important modifier
    if (parsed.important) {
      const importantProps: CSSProperties = {}
      for (const [key, value] of Object.entries(baseCSS.properties)) {
        if (typeof value === 'string' || typeof value === 'number') {
          importantProps[key] = `${value} !important`
        } else {
          importantProps[key] = value
        }
      }
      baseCSS.properties = importantProps
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
        // Convert string wrapper to function, supporting dynamic wrappers
        let wrapperFn: (css: string) => string
        if (typeof variant.wrapper === 'string') {
          wrapperFn = (cssStr: string) => `${variant.wrapper} {\n${cssStr}\n}`
        } else if (typeof variant.wrapper === 'function') {
          // Check if wrapper is a factory function that takes matches
          const wrapperResult = (variant.wrapper as unknown as (m: RegExpMatchArray | null) => string)(matches)
          if (typeof wrapperResult === 'string') {
            // It's a factory function that returns wrapper string
            wrapperFn = (cssStr: string) => `${wrapperResult} {\n${cssStr}\n}`
          } else {
            // It's a regular wrapper function
            wrapperFn = variant.wrapper as (css: string) => string
          }
        } else {
          continue
        }
        wrappers.push(wrapperFn)
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
        if (typeof variant.wrapper === 'string') {
          wrappers.push(variant.wrapper)
        } else if (typeof variant.wrapper === 'function') {
          const wrapperResult = (variant.wrapper as unknown as (m: RegExpMatchArray | null) => string)(matches)
          if (typeof wrapperResult === 'string') {
            wrappers.push(wrapperResult)
          }
        }
      }
    }

    // Format properties
    const propsString = Object.entries(properties)
      .map(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
        const cssValue = isImportant ? `${value} !important` : value
        return `${cssKey}: ${cssValue}`
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
