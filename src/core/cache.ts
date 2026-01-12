/**
 * CSS Cache
 *
 * Caches generated CSS for performance with LRU eviction and TTL support.
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
 * Internal cache entry with timestamp
 */
interface CacheEntry {
  value: string
  timestamp: number
}

/**
 * CSS Cache for storing generated CSS with LRU eviction and TTL support
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
  private accessOrder: string[] // Track access order for LRU

  constructor(options: CacheOptions = {}) {
    this.cache = new Map()
    this.hits = 0
    this.misses = 0
    this.maxSize = options.maxSize ?? 1000
    this.ttl = options.ttl ?? Infinity
    this.enabled = options.enabled ?? true
    this.accessOrder = []
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

    // Check TTL
    if (this.ttl !== Infinity && Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(className)
      this.removeFromAccessOrder(className)
      this.misses++
      return undefined
    }

    // Update access order for LRU
    this.updateAccessOrder(className)

    this.hits++
    return entry.value
  }

  /**
   * Store CSS for a class name
   * Evicts oldest entry if at max capacity
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

    // Evict oldest if at capacity
    if (this.cache.size >= this.maxSize && !this.cache.has(className)) {
      const oldestKey = this.accessOrder.shift()
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey)
      }
    }

    this.cache.set(className, {
      value: css,
      timestamp: Date.now()
    })

    this.updateAccessOrder(className)
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

    // Check TTL
    if (this.ttl !== Infinity && Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(className)
      this.removeFromAccessOrder(className)
      return false
    }

    return true
  }

  /**
   * Delete a cached entry
   */
  delete(className: string): boolean {
    const deleted = this.cache.delete(className)
    if (deleted) {
      this.removeFromAccessOrder(className)
    }
    return deleted
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
    this.accessOrder = []
    this.hits = 0
    this.misses = 0
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
  stats(): CacheStats & { hitRate: number; maxSize: number; ttl: number } {
    return {
      hits: this.hits,
      misses: this.misses,
      size: this.cache.size,
      hitRate: this.getHitRate(),
      maxSize: this.maxSize,
      ttl: this.ttl === Infinity ? -1 : this.ttl
    }
  }

  /**
   * Get all cached entries (excluding expired)
   */
  entries(): IterableIterator<[string, string]> {
    if (!this.enabled) {
      return (function* () {})()
    }

    const now = Date.now()
    const validEntries: Array<[string, string]> = []

    for (const [key, entry] of this.cache.entries()) {
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
   * Clean up expired entries
   */
  cleanup(): number {
    if (this.ttl === Infinity) {
      return 0
    }

    const now = Date.now()
    let removed = 0

    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.ttl) {
        this.cache.delete(key)
        this.removeFromAccessOrder(key)
        removed++
      }
    }

    return removed
  }

  /**
   * Update access order for LRU (move to end)
   */
  private updateAccessOrder(className: string): void {
    this.removeFromAccessOrder(className)
    this.accessOrder.push(className)
  }

  /**
   * Remove from access order
   */
  private removeFromAccessOrder(className: string): void {
    const index = this.accessOrder.indexOf(className)
    if (index > -1) {
      this.accessOrder.splice(index, 1)
    }
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
