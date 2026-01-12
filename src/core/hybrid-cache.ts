/**
 * Hybrid Cache - Memory + Persistent Storage
 *
 * Multi-tier caching system with LRU memory cache and persistent IndexedDB storage.
 * Provides fast lookups with durable storage for improved incremental builds.
 *
 * @module core/hybrid-cache
 */

import type { CacheStats } from '../types'

/**
 * Cache entry with metadata
 */
interface CacheEntry<T = string> {
  value: T
  timestamp: number
  expiresAt: number
  dependencies: string[]
  hash: string
}

/**
 * Persistent cache entry (for IndexedDB)
 */
interface PersistentCacheEntry {
  key: string
  value: string
  timestamp: number
  expiresAt: number
  dependencies: string[]
  hash: string
  version: string
}

/**
 * IndexedDB schema
 */
interface DBSchema {
  'coral-cache': {
    key: string
    value: PersistentCacheEntry
  }
}

/**
 * Hybrid cache options
 */
export interface HybridCacheOptions {
  /** Maximum memory cache size */
  maxMemorySize?: number
  /** Time-to-live in milliseconds */
  ttl?: number
  /** Cache version for invalidation */
  version?: string
  /** Whether to use persistent storage */
  usePersistent?: boolean
  /** IndexedDB database name */
  dbName?: string
  /** Memory cache size */
  memoryCacheSize?: number
}

/**
 * IndexedDB cache wrapper
 */
class IndexedDBCache {
  private db: IDBDatabase | null = null
  private dbName: string
  private storeName = 'coral-cache'
  private initPromise: Promise<void> | null = null

  constructor(dbName: string = 'coral-cache') {
    this.dbName = dbName
  }

  /**
   * Initialize IndexedDB
   */
  async init(): Promise<void> {
    if (this.initPromise) {
      return this.initPromise
    }

    this.initPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'key' })
          store.createIndex('timestamp', 'timestamp', { unique: false })
          store.createIndex('expiresAt', 'expiresAt', { unique: false })
        }
      }
    })

    return this.initPromise
  }

  /**
   * Get entry from IndexedDB
   */
  async get(key: string): Promise<PersistentCacheEntry | null> {
    await this.init()

    if (!this.db) {
      return null
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly')
      const store = transaction.objectStore(this.storeName)
      const request = store.get(key)

      request.onsuccess = () => {
        const result = request.result as PersistentCacheEntry | undefined
        resolve(result || null)
      }

      request.onerror = () => reject(request.error)
    })
  }

  /**
   * Set entry in IndexedDB
   */
  async set(entry: PersistentCacheEntry): Promise<void> {
    await this.init()

    if (!this.db) {
      return
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      const request = store.put(entry)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  /**
   * Delete entry from IndexedDB
   */
  async delete(key: string): Promise<void> {
    await this.init()

    if (!this.db) {
      return
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      const request = store.delete(key)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  /**
   * Clear all entries
   */
  async clear(): Promise<void> {
    await this.init()

    if (!this.db) {
      return
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      const request = store.clear()

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  /**
   * Clean up expired entries
   */
  async cleanup(): Promise<number> {
    await this.init()

    if (!this.db) {
      return 0
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      const index = store.index('expiresAt')
      const request = index.openCursor(IDBKeyRange.upperBound(Date.now()))
      let removed = 0

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result
        if (cursor) {
          cursor.delete()
          removed++
          cursor.continue()
        } else {
          resolve(removed)
        }
      }

      request.onerror = () => reject(request.error)
    })
  }

  /**
   * Get all keys
   */
  async keys(): Promise<string[]> {
    await this.init()

    if (!this.db) {
      return []
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly')
      const store = transaction.objectStore(this.storeName)
      const request = store.getAllKeys()

      request.onsuccess = () => resolve(request.result as string[])
      request.onerror = () => reject(request.error)
    })
  }

  /**
   * Close database connection
   */
  close(): void {
    if (this.db) {
      this.db.close()
      this.db = null
    }
    this.initPromise = null
  }
}

/**
 * Simple in-memory LRU cache
 */
class MemoryLRUCache<T = string> {
  private cache: Map<string, CacheEntry<T>>
  private maxSize: number
  private accessOrder: string[]

  constructor(maxSize: number = 1000) {
    this.cache = new Map()
    this.maxSize = maxSize
    this.accessOrder = []
  }

  get(key: string): T | undefined {
    const entry = this.cache.get(key)
    if (!entry) {
      return undefined
    }

    // Check expiration
    if (entry.expiresAt < Date.now()) {
      this.delete(key)
      return undefined
    }

    // Update access order
    this.updateAccessOrder(key)
    return entry.value
  }

  set(key: string, value: T, ttl: number = Infinity): void {
    // Evict oldest if at capacity
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      const oldestKey = this.accessOrder.shift()
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey)
      }
    }

    const now = Date.now()
    this.cache.set(key, {
      value,
      timestamp: now,
      expiresAt: ttl === Infinity ? Infinity : now + ttl,
      dependencies: [],
      hash: ''
    })

    this.updateAccessOrder(key)
  }

  has(key: string): boolean {
    const entry = this.cache.get(key)
    if (!entry) {
      return false
    }

    if (entry.expiresAt < Date.now()) {
      this.delete(key)
      return false
    }

    return true
  }

  delete(key: string): boolean {
    this.removeFromAccessOrder(key)
    return this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
    this.accessOrder = []
  }

  size(): number {
    return this.cache.size
  }

  keys(): string[] {
    const now = Date.now()
    const validKeys: string[] = []

    for (const [key, entry] of this.cache.entries()) {
      if (entry.expiresAt === Infinity || entry.expiresAt > now) {
        validKeys.push(key)
      }
    }

    return validKeys
  }

  private updateAccessOrder(key: string): void {
    this.removeFromAccessOrder(key)
    this.accessOrder.push(key)
  }

  private removeFromAccessOrder(key: string): void {
    const index = this.accessOrder.indexOf(key)
    if (index > -1) {
      this.accessOrder.splice(index, 1)
    }
  }
}

/**
 * Hybrid Cache - Memory + Persistent Storage
 *
 * Two-tier caching system with fast LRU memory cache and durable IndexedDB storage.
 *
 * @example
 * ```typescript
 * const cache = new HybridCache({
 *   maxMemorySize: 1000,
 *   ttl: 3600000,
 *   usePersistent: true
 * })
 *
 * // Set value (stored in both memory and persistent)
 * await cache.set('p-4', '.p-4 { padding: 1rem; }')
 *
 * // Get value (from memory if available, otherwise from persistent)
 * const css = await cache.get('p-4')
 * ```
 */
export class HybridCache {
  private memoryCache: MemoryLRUCache
  private persistentCache: IndexedDBCache | null = null
  private hits: number = 0
  private misses: number = 0
  private ttl: number
  private version: string
  private usePersistent: boolean

  constructor(options: HybridCacheOptions = {}) {
    this.memoryCache = new MemoryLRUCache(options.maxMemorySize ?? options.memoryCacheSize ?? 1000)
    this.ttl = options.ttl ?? Infinity
    this.version = options.version ?? 'v1'
    this.usePersistent = options.usePersistent ?? true

    if (this.usePersistent && typeof indexedDB !== 'undefined') {
      this.persistentCache = new IndexedDBCache(options.dbName ?? 'coral-cache')
    }
  }

  /**
   * Get cached value
   * Checks memory first, then persistent storage
   */
  async get(key: string): Promise<string | null> {
    // Check memory first (fastest)
    const memResult = this.memoryCache.get(key)
    if (memResult !== undefined) {
      this.hits++
      return memResult
    }

    // Check persistent cache
    if (this.persistentCache) {
      try {
        const entry = await this.persistentCache.get(key)
        if (entry && entry.version === this.version) {
          // Check expiration
          if (entry.expiresAt === Infinity || entry.expiresAt > Date.now()) {
            // Populate memory cache
            this.memoryCache.set(key, entry.value, this.ttl)
            this.hits++
            return entry.value
          } else {
            // Remove expired entry
            await this.persistentCache.delete(key)
          }
        }
      } catch (error) {
        console.warn('Failed to read from persistent cache:', error)
      }
    }

    this.misses++
    return null
  }

  /**
   * Set cached value
   * Stores in both memory and persistent storage
   */
  async set(key: string, value: string, dependencies: string[] = []): Promise<void> {
    // Store in memory
    this.memoryCache.set(key, value, this.ttl)

    // Store in persistent cache
    if (this.persistentCache) {
      try {
        const now = Date.now()
        await this.persistentCache.set({
          key,
          value,
          timestamp: now,
          expiresAt: this.ttl === Infinity ? Infinity : now + this.ttl,
          dependencies,
          hash: this.hash(value),
          version: this.version
        })
      } catch (error) {
        console.warn('Failed to write to persistent cache:', error)
      }
    }
  }

  /**
   * Check if key exists (and not expired)
   */
  async has(key: string): Promise<boolean> {
    // Check memory
    if (this.memoryCache.has(key)) {
      return true
    }

    // Check persistent
    if (this.persistentCache) {
      const entry = await this.persistentCache.get(key)
      return entry !== null && entry.version === this.version &&
        (entry.expiresAt === Infinity || entry.expiresAt > Date.now())
    }

    return false
  }

  /**
   * Delete cached value
   */
  async delete(key: string): Promise<void> {
    this.memoryCache.delete(key)

    if (this.persistentCache) {
      try {
        await this.persistentCache.delete(key)
      } catch (error) {
        console.warn('Failed to delete from persistent cache:', error)
      }
    }
  }

  /**
   * Clear all cached values
   */
  async clear(): Promise<void> {
    this.memoryCache.clear()
    this.hits = 0
    this.misses = 0

    if (this.persistentCache) {
      try {
        await this.persistentCache.clear()
      } catch (error) {
        console.warn('Failed to clear persistent cache:', error)
      }
    }
  }

  /**
   * Invalidate cache by dependency
   * Removes all entries that depend on the given file/key
   */
  async invalidateDependency(dependency: string): Promise<void> {
    const memoryKeys = this.memoryCache.keys()
    const persistentKeys = this.persistentCache ? await this.persistentCache.keys() : []

    // Invalidate from memory
    for (const key of memoryKeys) {
      await this.delete(key)
    }

    // Invalidate from persistent (entries with this dependency)
    if (this.persistentCache) {
      for (const key of persistentKeys) {
        const entry = await this.persistentCache.get(key)
        if (entry && entry.dependencies.includes(dependency)) {
          await this.delete(key)
        }
      }
    }
  }

  /**
   * Clean up expired entries
   */
  async cleanup(): Promise<number> {
    let removed = 0

    // Clean memory cache
    const memoryKeys = this.memoryCache.keys()
    for (const key of memoryKeys) {
      if (!this.memoryCache.has(key)) {
        this.memoryCache.delete(key)
        removed++
      }
    }

    // Clean persistent cache
    if (this.persistentCache) {
      try {
        removed += await this.persistentCache.cleanup()
      } catch (error) {
        console.warn('Failed to cleanup persistent cache:', error)
      }
    }

    return removed
  }

  /**
   * Get cache statistics
   */
  async stats(): Promise<CacheStats & {
    hitRate: number
    memorySize: number
    persistentSize: number
    version: string
  }> {
    const persistentSize = this.persistentCache
      ? (await this.persistentCache.keys()).length
      : 0

    return {
      hits: this.hits,
      misses: this.misses,
      size: this.memoryCache.size() + persistentSize,
      hitRate: this.getHitRate(),
      memorySize: this.memoryCache.size(),
      persistentSize,
      version: this.version
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
   * Hash a value for cache key
   */
  private hash(value: string): string {
    let hash = 0
    for (let i = 0; i < value.length; i++) {
      const char = value.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return hash.toString(36)
  }

  /**
   * Pre-warm cache with values
   */
  async prewarm(entries: Map<string, string> | Record<string, string>): Promise<void> {
    const iterable = entries instanceof Map ? entries.entries() : Object.entries(entries)

    for (const [key, value] of iterable) {
      await this.set(key, value)
    }
  }

  /**
   * Close cache and clean up resources
   */
  close(): void {
    this.memoryCache.clear()
    if (this.persistentCache) {
      this.persistentCache.close()
    }
  }
}

/**
 * Create a new hybrid cache instance
 *
 * @example
 * ```typescript
 * const cache = createHybridCache({
 *   maxMemorySize: 1000,
 *   ttl: 3600000,
 *   usePersistent: true
 * })
 * ```
 */
export function createHybridCache(options?: HybridCacheOptions): HybridCache {
  return new HybridCache(options)
}

export default {
  HybridCache,
  createHybridCache
}
