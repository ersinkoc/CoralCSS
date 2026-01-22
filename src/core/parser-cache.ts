/**
 * Parser Regex Cache
 *
 * Caches frequently used RegExp patterns to avoid recreating them.
 * Uses an LRU-style eviction policy with a maximum size limit.
 * @module core/parser-cache
 */

/**
 * Maximum number of dynamic regex patterns to cache
 * Static patterns (defined below) don't count toward this limit
 */
const MAX_DYNAMIC_CACHE_SIZE = 500

/**
 * Set of static pattern keys that should never be evicted
 */
const staticPatternKeys = new Set<string>()

/**
 * LRU cache entry wrapper
 */
interface LRUCacheEntry {
  regex: RegExp
  isStatic: boolean
}

/**
 * LRU cache using Map - re-inserting on access moves to end (most recently used)
 * First entry is least recently used, last entry is most recently used
 */
const lruCache = new Map<string, LRUCacheEntry>()

/**
 * Get number of dynamic patterns in cache
 */
function getDynamicCount(): number {
  return lruCache.size - staticPatternKeys.size
}

/**
 * Evict oldest dynamic entries if cache exceeds max size
 */
function evictIfNeeded(): void {
  const dynamicCount = getDynamicCount()

  if (dynamicCount > MAX_DYNAMIC_CACHE_SIZE) {
    // Evict oldest 10% of dynamic entries
    const toEvict = Math.ceil(MAX_DYNAMIC_CACHE_SIZE * 0.1)

    for (let i = 0; i < toEvict && lruCache.size > 0; i++) {
      // First entry is least recently used
      const firstEntry = lruCache.entries().next().value
      if (firstEntry) {
        const [firstKey, entry] = firstEntry
        if (!entry.isStatic) {
          lruCache.delete(firstKey)
        }
      }
    }
  }
}

/**
 * Get or create a cached RegExp
 *
 * Uses Map-based LRU cache for O(1) access and recency updates
 *
 * @example
 * ```typescript
 * getCachedRegex('opacity-with-bracket', /\/(\d+|[\d.]+%?|\[[^\]]+\])$/)
 * // Returns cached regex for opacity matching
 * ```
 */
export function getCachedRegex(key: string, pattern: string | RegExp, flags?: string): RegExp {
  const cacheKey = `${key}:${flags || ''}`

  const existing = lruCache.get(cacheKey)
  if (existing) {
    // Move to end as most recently used (delete and re-insert)
    lruCache.delete(cacheKey)
    lruCache.set(cacheKey, existing)
    return existing.regex
  }

  // Evict old entries before adding new one
  evictIfNeeded()

  const regex = typeof pattern === 'string' ? new RegExp(pattern, flags) : pattern
  lruCache.set(cacheKey, { regex, isStatic: false })
  return regex
}

/**
 * Register a static regex pattern that should never be evicted
 * Used internally for pre-defined patterns
 */
function registerStaticPattern(key: string, pattern: string | RegExp, flags?: string): RegExp {
  const cacheKey = `${key}:${flags || ''}`
  const regex = typeof pattern === 'string' ? new RegExp(pattern, flags) : pattern
  lruCache.set(cacheKey, { regex, isStatic: true })
  staticPatternKeys.add(cacheKey)
  return regex
}

/**
 * Clear the regex cache (useful for testing or memory management)
 * By default clears everything. Pass preserveStatic=true to only clear dynamic patterns.
 */
export function clearRegexCache(preserveStatic = false): void {
  if (preserveStatic) {
    // Only clear dynamic patterns, keep static ones
    for (const [key, entry] of lruCache.entries()) {
      if (!entry.isStatic) {
        lruCache.delete(key)
      }
    }
  } else {
    // Clear everything (backward compatible default)
    lruCache.clear()
    staticPatternKeys.clear()
  }
}

/**
 * Get cache size (for debugging)
 */
export function getCacheSize(): number {
  return lruCache.size
}

/**
 * Get number of dynamic patterns in cache
 */
export function getDynamicCacheSize(): number {
  return getDynamicCount()
}

// ============================================================================
// Pre-defined cached regex patterns for parser operations
// These are static patterns that will never be evicted from cache
// ============================================================================

/**
 * Pattern for matching opacity modifier with optional bracket value
 * Matches: /50, /50%, /[0.5]
 */
export const OPACITY_PATTERN = registerStaticPattern(
  'opacity',
  /\/(\d+|[\d.]+%?|\[[^\]]+\])$/
)

/**
 * Pattern for matching opacity modifier (without bracket support)
 * Matches: /50, /50%
 */
export const OPACITY_SIMPLE_PATTERN = registerStaticPattern(
  'opacity-simple',
  /\/(\d+|[\d.]+%?)$/
)

/**
 * Pattern for matching arbitrary values in brackets
 * Matches: [anything]
 */
export const ARBITRARY_PATTERN = registerStaticPattern(
  'arbitrary',
  /\[([^\]]+)\]/
)

/**
 * Pattern for variant group matching
 * Matches: hover:(, dark:sm:(, etc.
 */
export const VARIANT_GROUP_PREFIX_PATTERN = registerStaticPattern(
  'variant-group-prefix',
  /^([a-z0-9-]+(?::[a-z0-9-]+)*):\(/
)

/**
 * Pattern for whitespace matching
 */
export const WHITESPACE_PATTERN = registerStaticPattern(
  'whitespace',
  /\s/
)

/**
 * Pattern for matching arbitrary value with type hint
 * Matches: [color:red], [#ff0000], etc.
 */
export const ARBITRARY_WITH_TYPE_PATTERN = registerStaticPattern(
  'arbitrary-with-type',
  /^\[(?:([a-z-]+):)?(.+)\]$/i
)

/**
 * Pattern for simple bracket content
 */
export const BRACKET_CONTENT_PATTERN = registerStaticPattern(
  'bracket-content',
  /^\[(.+)\]$/
)

/**
 * Pattern for checking if string has brackets
 */
export const HAS_BRACKETS_PATTERN = registerStaticPattern(
  'has-brackets',
  /\[[^\]]+\]/
)

/**
 * Pattern for matching important prefix
 */
export const IMPORTANT_PREFIX_PATTERN = registerStaticPattern(
  'important-prefix',
  /^!/
)

/**
 * Pattern for matching negative prefix (excluding CSS vars)
 */
export const NEGATIVE_PREFIX_PATTERN = registerStaticPattern(
  'negative-prefix',
  /^-(?!--)/
)

/**
 * Pattern for double dash (CSS variable prefix check)
 */
export const DOUBLE_DASH_PATTERN = registerStaticPattern(
  'double-dash',
  /^--/
)

/**
 * Pattern for colon in class names (variant separator)
 */
export const COLON_PATTERN = registerStaticPattern(
  'colon',
  /:/
)

/**
 * Pattern for numeric values in spacing
 */
export const NUMERIC_VALUE_PATTERN = registerStaticPattern(
  'numeric-value',
  /^-?\d+(\.\d+)?$/
)

/**
 * Pattern for percentage values
 */
export const PERCENTAGE_PATTERN = registerStaticPattern(
  'percentage',
  /^\d+(\.\d+)?%$/
)

/**
 * Pattern for length values with units
 */
export const LENGTH_VALUE_PATTERN = registerStaticPattern(
  'length-value',
  /^-?\d+(\.\d+)?(px|em|rem|%|vw|vh|ch|ex|in|cm|mm|pt|pc|vmin|vmax)?$/i
)

/**
 * Pattern for color values (hex, rgb, hsl, named)
 */
export const COLOR_VALUE_PATTERN = registerStaticPattern(
  'color-value',
  /^(#([0-9a-f]{3,8}|[0-9a-f]{4})|rgb\(.*?\)|hsl\(.*?\)|[a-z]+)$/i
)

/**
 * Pattern for angle values
 */
export const ANGLE_VALUE_PATTERN = registerStaticPattern(
  'angle-value',
  /^-?\d+(\.\d+)?(deg|rad|grad|turn)?$/i
)

/**
 * Pattern for time values
 */
export const TIME_VALUE_PATTERN = registerStaticPattern(
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
