/**
 * Parser Regex Cache
 *
 * Caches frequently used RegExp patterns to avoid recreating them.
 * @module core/parser-cache
 */

/**
 * RegExp cache Map
 */
const regexCache = new Map<string, RegExp>()

/**
 * Get or create a cached RegExp
 *
 * @example
 * ```typescript
 * getCachedRegex('opacity-with-bracket', /\/(\d+|[\d.]+%?|\[[^\]]+\])$/)
 * // Returns cached regex for opacity matching
 * ```
 */
export function getCachedRegex(key: string, pattern: string | RegExp, flags?: string): RegExp {
  const cacheKey = `${key}:${flags || ''}`

  if (regexCache.has(cacheKey)) {
    return regexCache.get(cacheKey)!
  }

  const regex = typeof pattern === 'string' ? new RegExp(pattern, flags) : pattern
  regexCache.set(cacheKey, regex)
  return regex
}

/**
 * Clear the regex cache (useful for testing or memory management)
 */
export function clearRegexCache(): void {
  regexCache.clear()
}

/**
 * Get cache size (for debugging)
 */
export function getCacheSize(): number {
  return regexCache.size
}

// ============================================================================
// Pre-defined cached regex patterns for parser operations
// ============================================================================

/**
 * Pattern for matching opacity modifier with optional bracket value
 * Matches: /50, /50%, /[0.5]
 */
export const OPACITY_PATTERN = getCachedRegex(
  'opacity',
  /\/(\d+|[\d.]+%?|\[[^\]]+\])$/
)

/**
 * Pattern for matching opacity modifier (without bracket support)
 * Matches: /50, /50%
 */
export const OPACITY_SIMPLE_PATTERN = getCachedRegex(
  'opacity-simple',
  /\/(\d+|[\d.]+%?)$/
)

/**
 * Pattern for matching arbitrary values in brackets
 * Matches: [anything]
 */
export const ARBITRARY_PATTERN = getCachedRegex(
  'arbitrary',
  /\[([^\]]+)\]/
)

/**
 * Pattern for variant group matching
 * Matches: hover:(, dark:sm:(, etc.
 */
export const VARIANT_GROUP_PREFIX_PATTERN = getCachedRegex(
  'variant-group-prefix',
  /^([a-z0-9-]+(?::[a-z0-9-]+)*):\(/
)

/**
 * Pattern for whitespace matching
 */
export const WHITESPACE_PATTERN = getCachedRegex(
  'whitespace',
  /\s/
)

/**
 * Pattern for matching arbitrary value with type hint
 * Matches: [color:red], [#ff0000], etc.
 */
export const ARBITRARY_WITH_TYPE_PATTERN = getCachedRegex(
  'arbitrary-with-type',
  /^\[(?:([a-z-]+):)?(.+)\]$/i
)

/**
 * Pattern for simple bracket content
 */
export const BRACKET_CONTENT_PATTERN = getCachedRegex(
  'bracket-content',
  /^\[(.+)\]$/
)

/**
 * Pattern for checking if string has brackets
 */
export const HAS_BRACKETS_PATTERN = getCachedRegex(
  'has-brackets',
  /\[[^\]]+\]/
)

/**
 * Pattern for matching important prefix
 */
export const IMPORTANT_PREFIX_PATTERN = getCachedRegex(
  'important-prefix',
  /^!/
)

/**
 * Pattern for matching negative prefix (excluding CSS vars)
 */
export const NEGATIVE_PREFIX_PATTERN = getCachedRegex(
  'negative-prefix',
  /^-(?!--)/
)

/**
 * Pattern for double dash (CSS variable prefix check)
 */
export const DOUBLE_DASH_PATTERN = getCachedRegex(
  'double-dash',
  /^--/
)

/**
 * Pattern for colon in class names (variant separator)
 */
export const COLON_PATTERN = getCachedRegex(
  'colon',
  /:/
)

/**
 * Pattern for numeric values in spacing
 */
export const NUMERIC_VALUE_PATTERN = getCachedRegex(
  'numeric-value',
  /^-?\d+(\.\d+)?$/
)

/**
 * Pattern for percentage values
 */
export const PERCENTAGE_PATTERN = getCachedRegex(
  'percentage',
  /^\d+(\.\d+)?%$/
)

/**
 * Pattern for length values with units
 */
export const LENGTH_VALUE_PATTERN = getCachedRegex(
  'length-value',
  /^-?\d+(\.\d+)?(px|em|rem|%|vw|vh|ch|ex|in|cm|mm|pt|pc|vmin|vmax)?$/i
)

/**
 * Pattern for color values (hex, rgb, hsl, named)
 */
export const COLOR_VALUE_PATTERN = getCachedRegex(
  'color-value',
  /^(#([0-9a-f]{3,8}|[0-9a-f]{4})|rgb\(.*?\)|hsl\(.*?\)|[a-z]+)$/i
)

/**
 * Pattern for angle values
 */
export const ANGLE_VALUE_PATTERN = getCachedRegex(
  'angle-value',
  /^-?\d+(\.\d+)?(deg|rad|grad|turn)?$/i
)

/**
 * Pattern for time values
 */
export const TIME_VALUE_PATTERN = getCachedRegex(
  'time-value',
  /^\d+(\.\d+)?(ms|s)?$/
)

/**
 * Lazy regex compilation for dynamic patterns
 *
 * Use this when you need to create patterns dynamically based on input.
 * The cache ensures patterns with the same key are reused.
 *
 * @example
 * ```typescript
 * const regex = lazyRegex('custom-pattern', `^prefix-${input}$`, 'i')
 * ```
 */
export function lazyRegex(key: string, pattern: string, flags?: string): RegExp {
  return getCachedRegex(`lazy:${key}`, pattern, flags)
}

/**
 * Create a cached matcher function for a specific pattern
 *
 * @example
 * ```typescript
 * const hasPrefix = createCachedMatcher('has-prefix', /^prefix-/)
 * hasPrefix('prefix-test') // true
 * ```
 */
export function createCachedMatcher(
  key: string,
  pattern: string | RegExp,
  flags?: string
): (str: string) => boolean {
  const regex = getCachedRegex(`matcher:${key}`, pattern, flags)
  return (str: string) => regex.test(str)
}

/**
 * Create a cached extractor function for a specific pattern
 *
 * @example
 * ```typescript
 * const extractValue = createCachedExtractor('extract-value', /value-(\d+)/)
 * extractValue('value-42') // '42'
 * ```
 */
export function createCachedExtractor(
  key: string,
  pattern: string | RegExp,
  flags?: string
): (str: string) => string | null {
  const regex = getCachedRegex(`extractor:${key}`, pattern, flags)
  return (str: string) => {
    const match = str.match(regex)
    return match?.[1] ?? null
  }
}
