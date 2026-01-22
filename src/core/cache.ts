/**
 * CSS Cache
 *
 * Caches generated CSS for performance with LRU eviction and TTL support.
 * Includes theme version tracking for automatic cache invalidation on theme changes.
 * @module core/cache
 */

import type { CacheStats } from '../types'

/**
 * Cache configuration options
 */
export interface CacheOptions {
  /** Maximum number of entries before eviction (default: 1000) */
  maxSize?: number
  /** Time-to-live in milliseconds before entries expire (default: Infinity) */
  ttl?: number
  /** Whether caching is enabled (default: true) */
  enabled?: boolean
}

/**
 * Internal cache entry with timestamp and theme version
 */
interface CacheEntry {
  value: string
  timestamp: number
  themeVersion: string
}

/**
 * Fast hash function for theme versioning
 * Uses a simple but effective DJB2-style hash
 */
export function hashTheme(theme: Record<string, unknown>): string {
  let hash = 5381
  const str = JSON.stringify(theme, (_key, value) => {
    // Sort object keys for consistent hashing
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const sorted = Object.keys(value).sort().reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = (value as Record<string, unknown>)[key]
        return acc
      }, {})
      return sorted
    }
    return value
  })

  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) >>> 0 // >>> 0 for unsigned 32-bit
  }

  return hash.toString(36)
}

/**
 * CSS Cache for storing generated CSS with LRU eviction and TTL support
 *
 * Uses Map's natural insertion order for O(1) LRU operations.
 * When an entry is accessed, it's deleted and re-inserted to move it to the end.
 *
 * @example
 * ```typescript
 * const cache = new CSSCache({ maxSize: 500, ttl: 60000 })
 * cache.set('p-4', '.p-4 { padding: 1rem; }')
 * const css = cache.get('p-4') // '.p-4 { padding: 1rem; }'
 * ```
 */
export class CSSCache {
  private cache: Map<string, CacheEntry>
  private hits: number
  private misses: number
  private maxSize: number
  private ttl: number
  private enabled: boolean
  private themeVersion: string

  constructor(options: CacheOptions = {}) {
    this.cache = new Map()
    this.hits = 0
    this.misses = 0
    this.maxSize = options.maxSize ?? 1000
    this.ttl = options.ttl ?? Infinity
    this.enabled = options.enabled ?? true
    this.themeVersion = 'default'
  }

  /**
   * Get cached CSS for a class name
   * Returns undefined if not cached, expired, or caching is disabled
   *
   * @example
   * ```typescript
   * const css = cache.get('p-4')
   * if (css) {
   *   // Use cached value
   * }
   * ```
   */
  get(className: string): string | undefined {
    if (!this.enabled) {
      return undefined
    }

    const entry = this.cache.get(className)
    if (entry === undefined) {
      this.misses++
      return undefined
    }

    // Check theme version - invalidate if theme has changed
    if (entry.themeVersion !== this.themeVersion) {
      this.cache.delete(className)
      this.misses++
      return undefined
    }

    // Check TTL
    if (this.ttl !== Infinity && Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(className)
      this.misses++
      return undefined
    }

    // Update access order for LRU - O(1) operation
    // Delete and re-insert to move to end of Map's iteration order
    this.cache.delete(className)
    this.cache.set(className, entry)

    this.hits++
    return entry.value
  }

  /**
   * Store CSS for a class name
   * Evicts oldest entry if at max capacity (O(1) operation)
   *
   * @example
   * ```typescript
   * cache.set('p-4', '.p-4 { padding: 1rem; }')
   * ```
   */
  set(className: string, css: string): void {
    if (!this.enabled) {
      return
    }

    // If key exists, delete it first to update its position
    if (this.cache.has(className)) {
      this.cache.delete(className)
    }
    // Evict oldest (first item in Map iteration order) if at capacity
    else if (this.cache.size >= this.maxSize) {
      // Map.keys().next() is O(1) - gets first key
      const oldestKey = this.cache.keys().next().value
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey)
      }
    }

    this.cache.set(className, {
      value: css,
      timestamp: Date.now(),
      themeVersion: this.themeVersion
    })
  }

  /**
   * Check if a class name is cached (and not expired)
   *
   * @example
   * ```typescript
   * if (cache.has('p-4')) {
   *   // Already cached
   * }
   * ```
   */
  has(className: string): boolean {
    if (!this.enabled) {
      return false
    }

    const entry = this.cache.get(className)
    if (entry === undefined) {
      return false
    }

    // Check theme version - invalidate if theme has changed
    if (entry.themeVersion !== this.themeVersion) {
      this.cache.delete(className)
      return false
    }

    // Check TTL
    if (this.ttl !== Infinity && Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(className)
      return false
    }

    return true
  }

  /**
   * Update the theme version, invalidating all existing cache entries
   * Call this when the theme configuration changes
   *
   * @example
   * ```typescript
   * cache.setThemeVersion(hashTheme(newTheme))
   * ```
   */
  setThemeVersion(version: string): void {
    if (version !== this.themeVersion) {
      this.themeVersion = version
      // Note: We don't clear the cache here - entries will be invalidated on access
      // This is more efficient than clearing all entries immediately
    }
  }

  /**
   * Get the current theme version
   */
  getThemeVersion(): string {
    return this.themeVersion
  }

  /**
   * Delete a cached entry
   */
  delete(className: string): boolean {
    return this.cache.delete(className)
  }

  /**
   * Clear all cached entries
   *
   * @example
   * ```typescript
   * cache.clear() // Reset cache
   * ```
   */
  clear(): void {
    this.cache.clear()
    this.hits = 0
    this.misses = 0
    this.themeVersion = 'default'
  }

  /**
   * Clear all cached entries and set new theme version
   *
   * @example
   * ```typescript
   * cache.clearWithVersion('new-theme-hash')
   * ```
   */
  clearWithVersion(version: string): void {
    this.cache.clear()
    this.hits = 0
    this.misses = 0
    this.themeVersion = version
  }

  /**
   * Get cache statistics
   *
   * @example
   * ```typescript
   * const stats = cache.stats()
   * console.log(`Hit rate: ${stats.hitRate}%`)
   * ```
   */
  stats(): CacheStats & { hitRate: number; maxSize: number; ttl: number; themeVersion: string } {
    return {
      hits: this.hits,
      misses: this.misses,
      size: this.cache.size,
      hitRate: this.getHitRate(),
      maxSize: this.maxSize,
      ttl: this.ttl === Infinity ? -1 : this.ttl,
      themeVersion: this.themeVersion
    }
  }

  /**
   * Get all cached entries (excluding expired and wrong theme version)
   */
  entries(): IterableIterator<[string, string]> {
    if (!this.enabled) {
      return (function* () {})()
    }

    const now = Date.now()
    const validEntries: Array<[string, string]> = []

    for (const [key, entry] of this.cache.entries()) {
      // Skip entries with wrong theme version
      if (entry.themeVersion !== this.themeVersion) {
        continue
      }
      // Skip expired entries
      if (this.ttl !== Infinity && now - entry.timestamp > this.ttl) {
        continue
      }
      validEntries.push([key, entry.value])
    }

    return validEntries[Symbol.iterator]() as IterableIterator<[string, string]>
  }

  /**
   * Get all cached class names
   */
  keys(): IterableIterator<string> {
    if (!this.enabled) {
      return (function* () {})()
    }

    const now = Date.now()
    const validKeys: string[] = []

    for (const [key, entry] of this.cache.entries()) {
      // Check theme version
      if (entry.themeVersion !== this.themeVersion) {
        continue
      }
      if (this.ttl !== Infinity && now - entry.timestamp > this.ttl) {
        continue
      }
      validKeys.push(key)
    }

    return validKeys[Symbol.iterator]() as IterableIterator<string>
  }

  /**
   * Get all cached CSS values
   */
  values(): IterableIterator<string> {
    if (!this.enabled) {
      return (function* () {})()
    }

    const now = Date.now()
    const validValues: string[] = []

    for (const [key, entry] of this.cache.entries()) {
      // Check theme version
      if (entry.themeVersion !== this.themeVersion) {
        continue
      }
      if (this.ttl !== Infinity && now - entry.timestamp > this.ttl) {
        continue
      }
      validValues.push(entry.value)
    }

    return validValues[Symbol.iterator]() as IterableIterator<string>
  }

  /**
   * Get the number of cached entries
   */
  get size(): number {
    return this.cache.size
  }

  /**
   * Get multiple cached values
   */
  getMany(classNames: string[]): Map<string, string> {
    const result = new Map<string, string>()
    for (const className of classNames) {
      const css = this.get(className)
      if (css !== undefined) {
        result.set(className, css)
      }
    }
    return result
  }

  /**
   * Set multiple cached values
   */
  setMany(entries: Map<string, string> | Array<[string, string]>): void {
    const iterable = entries instanceof Map ? entries.entries() : entries
    for (const [className, css] of iterable) {
      this.set(className, css)
    }
  }

  /**
   * Get hit rate percentage
   */
  getHitRate(): number {
    const total = this.hits + this.misses
    if (total === 0) {
      return 0
    }
    return (this.hits / total) * 100
  }

  /**
   * Clean up expired and invalid theme version entries
   */
  cleanup(): number {
    const now = Date.now()
    let removed = 0

    for (const [key, entry] of this.cache.entries()) {
      // Remove entries with wrong theme version
      if (entry.themeVersion !== this.themeVersion) {
        this.cache.delete(key)
        removed++
        continue
      }
      // Remove expired entries
      if (this.ttl !== Infinity && now - entry.timestamp > this.ttl) {
        this.cache.delete(key)
        removed++
      }
    }

    return removed
  }
}

/**
 * Create a new CSS cache instance
 *
 * @example
 * ```typescript
 * const cache = createCache({ maxSize: 500, ttl: 60000 })
 * ```
 */
export function createCache(options?: CacheOptions): CSSCache {
  return new CSSCache(options)
}
