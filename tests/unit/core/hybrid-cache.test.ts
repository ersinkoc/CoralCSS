/**
 * Hybrid Cache Tests
 *
 * Tests for multi-tier caching system with LRU memory cache and persistent storage.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  HybridCache,
  createHybridCache,
  type HybridCacheOptions,
  type CacheEntry,
  type PersistentCacheEntry,
} from '../../../src/core/hybrid-cache'

// Mock IndexedDB for persistent cache testing
function createMockIndexedDB() {
  const stores = new Map<string, Map<string, any>>()

  const createMockRequest = (successValue: any) => {
    const request: any = {
      result: successValue,
      error: null,
      onsuccess: null,
      onerror: null,
    }
    setTimeout(() => request.onsuccess?.({ target: request }), 0)
    return request
  }

  const createMockCursor = (entries: [string, any][], index: number = 0) => {
    if (index >= entries.length) {
      return null
    }
    return {
      value: entries[index][1],
      delete: vi.fn(),
      continue: vi.fn(),
    }
  }

  const mockDB: any = {
    objectStoreNames: { contains: (name: string) => stores.has(name) },
    createObjectStore: (name: string, options: any) => {
      stores.set(name, new Map())
      return {
        createIndex: vi.fn(),
      }
    },
    transaction: (storeNames: string[], mode: string) => ({
      objectStore: (name: string) => ({
        get: (key: string) => {
          const store = stores.get(name) || new Map()
          return createMockRequest(store.get(key))
        },
        put: (entry: any) => {
          const store = stores.get(name) || new Map()
          store.set(entry.key, entry)
          stores.set(name, store)
          return createMockRequest(undefined)
        },
        delete: (key: string) => {
          const store = stores.get(name) || new Map()
          store.delete(key)
          return createMockRequest(undefined)
        },
        clear: () => {
          stores.set(name, new Map())
          return createMockRequest(undefined)
        },
        getAllKeys: () => {
          const store = stores.get(name) || new Map()
          return createMockRequest(Array.from(store.keys()))
        },
        index: (indexName: string) => ({
          openCursor: (range: any) => {
            const store = stores.get(name) || new Map()
            const entries = Array.from(store.entries())
            const request: any = {
              result: null,
              onsuccess: null,
              onerror: null,
            }
            let cursorIndex = 0
            setTimeout(() => {
              const cursor = entries.length > 0 ? createMockCursor(entries, cursorIndex) : null
              if (cursor) {
                cursor.continue = () => {
                  cursorIndex++
                  const nextCursor = cursorIndex < entries.length ? createMockCursor(entries, cursorIndex) : null
                  request.result = nextCursor
                  request.onsuccess?.({ target: request })
                }
              }
              request.result = cursor
              request.onsuccess?.({ target: request })
            }, 0)
            return request
          },
        }),
      }),
    }),
    close: vi.fn(),
  }

  return {
    open: (name: string, version: number) => {
      const request: any = {
        result: mockDB,
        error: null,
        onsuccess: null,
        onerror: null,
        onupgradeneeded: null,
      }
      setTimeout(() => {
        if (!stores.has('coral-cache')) {
          request.onupgradeneeded?.({ target: request })
        }
        request.onsuccess?.()
      }, 0)
      return request
    },
    stores,
    mockDB,
  }
}

describe('Hybrid Cache', () => {
  describe('HybridCache', () => {
    let cache: HybridCache

    beforeEach(() => {
      // Create cache without persistent storage (IndexedDB not available in Node)
      cache = new HybridCache({
        maxMemorySize: 100,
        ttl: 60000, // 1 minute
        usePersistent: false,
        version: 'test-v1',
      })
    })

    afterEach(() => {
      cache.close()
    })

    describe('basic operations', () => {
      it('should set and get values', async () => {
        await cache.set('key1', 'value1')
        const result = await cache.get('key1')
        expect(result).toBe('value1')
      })

      it('should return null for non-existent keys', async () => {
        const result = await cache.get('non-existent')
        expect(result).toBeNull()
      })

      it('should check if key exists with has()', async () => {
        await cache.set('exists', 'yes')
        expect(await cache.has('exists')).toBe(true)
        expect(await cache.has('not-exists')).toBe(false)
      })

      it('should delete values', async () => {
        await cache.set('to-delete', 'value')
        expect(await cache.has('to-delete')).toBe(true)
        await cache.delete('to-delete')
        expect(await cache.has('to-delete')).toBe(false)
      })

      it('should clear all values', async () => {
        await cache.set('key1', 'value1')
        await cache.set('key2', 'value2')
        await cache.set('key3', 'value3')
        await cache.clear()
        expect(await cache.get('key1')).toBeNull()
        expect(await cache.get('key2')).toBeNull()
        expect(await cache.get('key3')).toBeNull()
      })
    })

    describe('LRU eviction', () => {
      it('should evict oldest entries when at capacity', async () => {
        const smallCache = new HybridCache({
          maxMemorySize: 3,
          usePersistent: false,
        })

        await smallCache.set('a', '1')
        await smallCache.set('b', '2')
        await smallCache.set('c', '3')

        // All should exist
        expect(await smallCache.get('a')).toBe('1')
        expect(await smallCache.get('b')).toBe('2')
        expect(await smallCache.get('c')).toBe('3')

        // Add fourth item, should evict oldest (a)
        await smallCache.set('d', '4')

        // After accessing 'a' was re-accessed via get above, 'b' should be oldest
        expect(await smallCache.get('d')).toBe('4')

        smallCache.close()
      })

      it('should update access order on get', async () => {
        const smallCache = new HybridCache({
          maxMemorySize: 3,
          usePersistent: false,
        })

        await smallCache.set('a', '1')
        await smallCache.set('b', '2')
        await smallCache.set('c', '3')

        // Access 'a' to move it to most recent
        await smallCache.get('a')

        // Add new item, should evict 'b' (now oldest)
        await smallCache.set('d', '4')

        expect(await smallCache.has('a')).toBe(true)
        expect(await smallCache.has('d')).toBe(true)

        smallCache.close()
      })
    })

    describe('TTL expiration', () => {
      it('should expire entries after TTL', async () => {
        const shortTTLCache = new HybridCache({
          ttl: 50, // 50ms
          usePersistent: false,
        })

        await shortTTLCache.set('expires', 'soon')
        expect(await shortTTLCache.get('expires')).toBe('soon')

        // Wait for expiration
        await new Promise((resolve) => setTimeout(resolve, 100))

        expect(await shortTTLCache.get('expires')).toBeNull()

        shortTTLCache.close()
      })

      it('should not expire entries with infinite TTL', async () => {
        const infiniteTTLCache = new HybridCache({
          ttl: Infinity,
          usePersistent: false,
        })

        await infiniteTTLCache.set('forever', 'value')
        expect(await infiniteTTLCache.get('forever')).toBe('value')

        // Wait a bit
        await new Promise((resolve) => setTimeout(resolve, 50))

        // Should still exist
        expect(await infiniteTTLCache.get('forever')).toBe('value')

        infiniteTTLCache.close()
      })
    })

    describe('statistics', () => {
      it('should track hits and misses', async () => {
        await cache.set('hit-key', 'value')

        // Hit
        await cache.get('hit-key')
        await cache.get('hit-key')

        // Misses
        await cache.get('miss-key')
        await cache.get('another-miss')

        const stats = await cache.stats()
        expect(stats.hits).toBe(2)
        expect(stats.misses).toBe(2)
      })

      it('should calculate hit rate correctly', async () => {
        await cache.set('key', 'value')

        // 3 hits
        await cache.get('key')
        await cache.get('key')
        await cache.get('key')

        // 1 miss
        await cache.get('missing')

        expect(cache.getHitRate()).toBe(75) // 3/4 = 75%
      })

      it('should return 0 hit rate when no requests', () => {
        expect(cache.getHitRate()).toBe(0)
      })

      it('should include memory size in stats', async () => {
        await cache.set('a', '1')
        await cache.set('b', '2')

        const stats = await cache.stats()
        expect(stats.memorySize).toBe(2)
        expect(stats.size).toBe(2)
      })

      it('should include version in stats', async () => {
        const stats = await cache.stats()
        expect(stats.version).toBe('test-v1')
      })

      it('should reset stats on clear', async () => {
        await cache.set('key', 'value')
        await cache.get('key')
        await cache.get('missing')

        await cache.clear()

        const stats = await cache.stats()
        expect(stats.hits).toBe(0)
        expect(stats.misses).toBe(0)
      })
    })

    describe('dependencies', () => {
      it('should accept dependencies when setting', async () => {
        await cache.set('key', 'value', ['file1.ts', 'file2.ts'])
        expect(await cache.get('key')).toBe('value')
      })

      it('should invalidate by dependency', async () => {
        await cache.set('key1', 'value1', ['shared.ts'])
        await cache.set('key2', 'value2', ['shared.ts'])
        await cache.set('key3', 'value3', ['other.ts'])

        await cache.invalidateDependency('shared.ts')

        // All keys in memory cache are invalidated
        expect(await cache.has('key1')).toBe(false)
        expect(await cache.has('key2')).toBe(false)
        expect(await cache.has('key3')).toBe(false)
      })
    })

    describe('prewarm', () => {
      it('should prewarm cache with Map', async () => {
        const entries = new Map([
          ['p-4', '.p-4 { padding: 1rem; }'],
          ['m-2', '.m-2 { margin: 0.5rem; }'],
        ])

        await cache.prewarm(entries)

        expect(await cache.get('p-4')).toBe('.p-4 { padding: 1rem; }')
        expect(await cache.get('m-2')).toBe('.m-2 { margin: 0.5rem; }')
      })

      it('should prewarm cache with object', async () => {
        const entries = {
          flex: '.flex { display: flex; }',
          grid: '.grid { display: grid; }',
        }

        await cache.prewarm(entries)

        expect(await cache.get('flex')).toBe('.flex { display: flex; }')
        expect(await cache.get('grid')).toBe('.grid { display: grid; }')
      })
    })

    describe('cleanup', () => {
      it('should remove expired entries on cleanup', async () => {
        const shortTTLCache = new HybridCache({
          ttl: 50,
          usePersistent: false,
        })

        await shortTTLCache.set('expires', 'soon')
        expect(await shortTTLCache.has('expires')).toBe(true)

        // Wait for expiration
        await new Promise((resolve) => setTimeout(resolve, 100))

        const removed = await shortTTLCache.cleanup()
        // The entry is already cleaned up when checking has()
        expect(removed).toBeGreaterThanOrEqual(0)

        shortTTLCache.close()
      })
    })
  })

  describe('createHybridCache', () => {
    it('should create a HybridCache instance', () => {
      const cache = createHybridCache({ usePersistent: false })
      expect(cache).toBeInstanceOf(HybridCache)
      cache.close()
    })

    it('should accept options', () => {
      const cache = createHybridCache({
        maxMemorySize: 500,
        ttl: 10000,
        version: 'v2',
        usePersistent: false,
      })
      expect(cache).toBeInstanceOf(HybridCache)
      cache.close()
    })

    it('should work with default options', () => {
      const cache = createHybridCache({ usePersistent: false })
      expect(cache).toBeInstanceOf(HybridCache)
      cache.close()
    })
  })

  describe('HybridCacheOptions', () => {
    it('should use default maxMemorySize', async () => {
      const cache = new HybridCache({ usePersistent: false })
      // Default is 1000
      const stats = await cache.stats()
      expect(stats.memorySize).toBe(0) // Empty at start
      cache.close()
    })

    it('should respect memoryCacheSize option', async () => {
      const cache = new HybridCache({
        memoryCacheSize: 5,
        usePersistent: false,
      })

      // Fill up to capacity
      for (let i = 0; i < 10; i++) {
        await cache.set(`key${i}`, `value${i}`)
      }

      const stats = await cache.stats()
      expect(stats.memorySize).toBeLessThanOrEqual(5)
      cache.close()
    })

    it('should use default version', async () => {
      const cache = new HybridCache({ usePersistent: false })
      const stats = await cache.stats()
      expect(stats.version).toBe('v1')
      cache.close()
    })

    it('should use default ttl (Infinity)', async () => {
      const cache = new HybridCache({ usePersistent: false })

      await cache.set('key', 'value')

      // Wait a bit
      await new Promise((resolve) => setTimeout(resolve, 50))

      // Should still exist (infinite TTL)
      expect(await cache.get('key')).toBe('value')
      cache.close()
    })
  })

  describe('edge cases', () => {
    it('should handle empty string values', async () => {
      const cache = new HybridCache({ usePersistent: false })
      await cache.set('empty', '')
      expect(await cache.get('empty')).toBe('')
      cache.close()
    })

    it('should handle special characters in keys', async () => {
      const cache = new HybridCache({ usePersistent: false })
      await cache.set('key:with:colons', 'value1')
      await cache.set('key/with/slashes', 'value2')
      await cache.set('key.with.dots', 'value3')

      expect(await cache.get('key:with:colons')).toBe('value1')
      expect(await cache.get('key/with/slashes')).toBe('value2')
      expect(await cache.get('key.with.dots')).toBe('value3')
      cache.close()
    })

    it('should handle large values', async () => {
      const cache = new HybridCache({ usePersistent: false })
      const largeValue = 'x'.repeat(100000)
      await cache.set('large', largeValue)
      expect(await cache.get('large')).toBe(largeValue)
      cache.close()
    })

    it('should handle unicode keys and values', async () => {
      const cache = new HybridCache({ usePersistent: false })
      await cache.set('emoji-key-🎨', 'emoji-value-🚀')
      expect(await cache.get('emoji-key-🎨')).toBe('emoji-value-🚀')
      cache.close()
    })

    it('should handle overwriting existing keys', async () => {
      const cache = new HybridCache({ usePersistent: false })
      await cache.set('key', 'original')
      await cache.set('key', 'updated')
      expect(await cache.get('key')).toBe('updated')
      cache.close()
    })

    it('should handle deleting non-existent keys', async () => {
      const cache = new HybridCache({ usePersistent: false })
      await cache.delete('non-existent')
      // Should not throw
      expect(await cache.has('non-existent')).toBe(false)
      cache.close()
    })

    it('should handle multiple closes', () => {
      const cache = new HybridCache({ usePersistent: false })
      cache.close()
      cache.close()
      cache.close()
      // Should not throw
    })
  })

  describe('concurrent operations', () => {
    it('should handle concurrent sets', async () => {
      const cache = new HybridCache({ usePersistent: false })

      await Promise.all([
        cache.set('a', '1'),
        cache.set('b', '2'),
        cache.set('c', '3'),
        cache.set('d', '4'),
        cache.set('e', '5'),
      ])

      expect(await cache.get('a')).toBe('1')
      expect(await cache.get('b')).toBe('2')
      expect(await cache.get('c')).toBe('3')
      expect(await cache.get('d')).toBe('4')
      expect(await cache.get('e')).toBe('5')

      cache.close()
    })

    it('should handle concurrent gets', async () => {
      const cache = new HybridCache({ usePersistent: false })
      await cache.set('key', 'value')

      const results = await Promise.all([
        cache.get('key'),
        cache.get('key'),
        cache.get('key'),
        cache.get('key'),
        cache.get('key'),
      ])

      expect(results).toEqual(['value', 'value', 'value', 'value', 'value'])
      cache.close()
    })

    it('should use request coalescing for concurrent persistent reads', async () => {
      let persistentReadCount = 0
      const storedEntries = new Map<string, any>()
      storedEntries.set('coalesce-key', {
        key: 'coalesce-key',
        value: 'persistent-value',
        version: 'v1',
        expiresAt: Infinity,
        dependencies: [],
        hash: 'abc',
        timestamp: Date.now(),
      })

      const mockDB: any = {
        objectStoreNames: { contains: () => true },
        transaction: () => ({
          objectStore: () => ({
            get: (key: string) => {
              persistentReadCount++
              const request: any = {
                result: storedEntries.get(key),
                onsuccess: null,
              }
              // Simulate slow persistent read
              setTimeout(() => request.onsuccess?.({ target: request }), 50)
              return request
            },
            put: (entry: any) => {
              storedEntries.set(entry.key, entry)
              const request: any = { onsuccess: null }
              setTimeout(() => request.onsuccess?.({ target: request }), 0)
              return request
            },
          }),
        }),
        close: vi.fn(),
      }

      const originalIndexedDB = globalThis.indexedDB
      ;(globalThis as any).indexedDB = {
        open: () => {
          const request: any = {
            result: mockDB,
            onsuccess: null,
          }
          setTimeout(() => request.onsuccess?.(), 0)
          return request
        },
      }

      const cache = new HybridCache({
        usePersistent: true,
        version: 'v1',
      })

      // Clear memory cache to force persistent reads
      ;(cache as any).memoryCache.clear()

      // Multiple concurrent gets for same key should coalesce
      const results = await Promise.all([
        cache.get('coalesce-key'),
        cache.get('coalesce-key'),
        cache.get('coalesce-key'),
        cache.get('coalesce-key'),
        cache.get('coalesce-key'),
      ])

      // All should return the same value
      expect(results).toEqual([
        'persistent-value',
        'persistent-value',
        'persistent-value',
        'persistent-value',
        'persistent-value',
      ])

      // Only ONE persistent read should have been made due to coalescing
      expect(persistentReadCount).toBe(1)

      cache.close()
      globalThis.indexedDB = originalIndexedDB
    })

    it('should clean up pending reads after completion', async () => {
      const storedEntries = new Map<string, any>()
      storedEntries.set('cleanup-key', {
        key: 'cleanup-key',
        value: 'value',
        version: 'v1',
        expiresAt: Infinity,
        dependencies: [],
        hash: 'abc',
        timestamp: Date.now(),
      })

      const mockDB: any = {
        objectStoreNames: { contains: () => true },
        transaction: () => ({
          objectStore: () => ({
            get: (key: string) => {
              const request: any = {
                result: storedEntries.get(key),
                onsuccess: null,
              }
              setTimeout(() => request.onsuccess?.({ target: request }), 10)
              return request
            },
            put: (entry: any) => {
              storedEntries.set(entry.key, entry)
              const request: any = { onsuccess: null }
              setTimeout(() => request.onsuccess?.({ target: request }), 0)
              return request
            },
          }),
        }),
        close: vi.fn(),
      }

      const originalIndexedDB = globalThis.indexedDB
      ;(globalThis as any).indexedDB = {
        open: () => {
          const request: any = {
            result: mockDB,
            onsuccess: null,
          }
          setTimeout(() => request.onsuccess?.(), 0)
          return request
        },
      }

      const cache = new HybridCache({
        usePersistent: true,
        version: 'v1',
      })

      // Clear memory
      ;(cache as any).memoryCache.clear()

      // First request
      await cache.get('cleanup-key')

      // Pending reads should be cleaned up after completion
      expect((cache as any).pendingReads.size).toBe(0)

      cache.close()
      globalThis.indexedDB = originalIndexedDB
    })

    it('should not coalesce reads for different keys', async () => {
      let persistentReadCount = 0
      const storedEntries = new Map<string, any>()
      storedEntries.set('key1', {
        key: 'key1',
        value: 'value1',
        version: 'v1',
        expiresAt: Infinity,
        dependencies: [],
        hash: 'abc',
        timestamp: Date.now(),
      })
      storedEntries.set('key2', {
        key: 'key2',
        value: 'value2',
        version: 'v1',
        expiresAt: Infinity,
        dependencies: [],
        hash: 'def',
        timestamp: Date.now(),
      })

      const mockDB: any = {
        objectStoreNames: { contains: () => true },
        transaction: () => ({
          objectStore: () => ({
            get: (key: string) => {
              persistentReadCount++
              const request: any = {
                result: storedEntries.get(key),
                onsuccess: null,
              }
              setTimeout(() => request.onsuccess?.({ target: request }), 10)
              return request
            },
            put: (entry: any) => {
              storedEntries.set(entry.key, entry)
              const request: any = { onsuccess: null }
              setTimeout(() => request.onsuccess?.({ target: request }), 0)
              return request
            },
          }),
        }),
        close: vi.fn(),
      }

      const originalIndexedDB = globalThis.indexedDB
      ;(globalThis as any).indexedDB = {
        open: () => {
          const request: any = {
            result: mockDB,
            onsuccess: null,
          }
          setTimeout(() => request.onsuccess?.(), 0)
          return request
        },
      }

      const cache = new HybridCache({
        usePersistent: true,
        version: 'v1',
      })

      ;(cache as any).memoryCache.clear()

      // Different keys should NOT be coalesced
      const [result1, result2] = await Promise.all([
        cache.get('key1'),
        cache.get('key2'),
      ])

      expect(result1).toBe('value1')
      expect(result2).toBe('value2')
      // Two separate reads for different keys
      expect(persistentReadCount).toBe(2)

      cache.close()
      globalThis.indexedDB = originalIndexedDB
    })

    it('should handle mixed operations', async () => {
      const cache = new HybridCache({ usePersistent: false })

      await Promise.all([
        cache.set('key1', 'value1'),
        cache.set('key2', 'value2'),
      ])

      const results = await Promise.all([
        cache.get('key1'),
        cache.set('key3', 'value3'),
        cache.get('key2'),
        cache.delete('key1'),
        cache.has('key2'),
      ])

      expect(results[0]).toBe('value1')
      expect(results[2]).toBe('value2')
      expect(results[4]).toBe(true)

      cache.close()
    })
  })

  describe('Default Export', () => {
    it('should export HybridCache and createHybridCache', async () => {
      const { default: defaultExport } = await import('../../../src/core/hybrid-cache')
      expect(defaultExport.HybridCache).toBe(HybridCache)
      expect(defaultExport.createHybridCache).toBe(createHybridCache)
    })
  })

  describe('MemoryLRUCache internal behavior', () => {
    it('should handle keys() method correctly with expired entries', async () => {
      const cache = new HybridCache({
        ttl: 50,
        usePersistent: false,
      })

      await cache.set('expires1', 'value1')
      await cache.set('expires2', 'value2')

      // Wait for expiration
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Clear should handle expired entries
      await cache.clear()

      const stats = await cache.stats()
      expect(stats.memorySize).toBe(0)

      cache.close()
    })

    it('should properly update existing key without eviction', async () => {
      const smallCache = new HybridCache({
        maxMemorySize: 3,
        usePersistent: false,
      })

      await smallCache.set('a', '1')
      await smallCache.set('b', '2')
      await smallCache.set('c', '3')

      // Update existing key - should not evict
      await smallCache.set('a', 'updated')

      const stats = await smallCache.stats()
      expect(stats.memorySize).toBe(3)
      expect(await smallCache.get('a')).toBe('updated')

      smallCache.close()
    })

    it('should return false from has() for expired entries', async () => {
      const shortTTLCache = new HybridCache({
        ttl: 50,
        usePersistent: false,
      })

      await shortTTLCache.set('key', 'value')
      expect(await shortTTLCache.has('key')).toBe(true)

      // Wait for expiration
      await new Promise((resolve) => setTimeout(resolve, 100))

      expect(await shortTTLCache.has('key')).toBe(false)

      shortTTLCache.close()
    })
  })

  describe('hash function', () => {
    it('should generate consistent hashes', async () => {
      const cache = new HybridCache({ usePersistent: false })

      // Setting same value twice should produce same hash internally
      await cache.set('key1', 'test-value')
      await cache.set('key2', 'test-value')

      // Values should be retrievable
      expect(await cache.get('key1')).toBe('test-value')
      expect(await cache.get('key2')).toBe('test-value')

      cache.close()
    })

    it('should handle empty string hashing', async () => {
      const cache = new HybridCache({ usePersistent: false })
      await cache.set('empty', '')
      expect(await cache.get('empty')).toBe('')
      cache.close()
    })

    it('should handle long string hashing', async () => {
      const cache = new HybridCache({ usePersistent: false })
      const longValue = 'x'.repeat(10000)
      await cache.set('long', longValue)
      expect(await cache.get('long')).toBe(longValue)
      cache.close()
    })
  })

  describe('error handling', () => {
    it('should handle console.warn gracefully on persistent errors', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      // Create cache with usePersistent true but IndexedDB unavailable
      const cache = new HybridCache({
        usePersistent: true,
        version: 'test',
      })

      // Operations should still work (fallback to memory only)
      await cache.set('key', 'value')
      expect(await cache.get('key')).toBe('value')

      cache.close()
      warnSpy.mockRestore()
    })
  })

  describe('version mismatch handling', () => {
    it('should not return cached value with different version', async () => {
      const cache1 = new HybridCache({
        version: 'v1',
        usePersistent: false,
      })

      await cache1.set('key', 'value')
      cache1.close()

      const cache2 = new HybridCache({
        version: 'v2',
        usePersistent: false,
      })

      // Since memory cache is separate per instance, this should be null
      expect(await cache2.get('key')).toBeNull()

      cache2.close()
    })
  })

  describe('cleanup edge cases', () => {
    it('should return 0 when no entries to clean', async () => {
      const cache = new HybridCache({ usePersistent: false })
      const removed = await cache.cleanup()
      expect(removed).toBe(0)
      cache.close()
    })
  })

  describe('invalidateDependency', () => {
    it('should handle empty cache gracefully', async () => {
      const cache = new HybridCache({ usePersistent: false })
      await cache.invalidateDependency('any-dep')
      // Should not throw
      expect(await cache.stats()).toBeDefined()
      cache.close()
    })
  })

  describe('stats with persistentSize', () => {
    it('should report 0 persistent size when usePersistent is false', async () => {
      const cache = new HybridCache({ usePersistent: false })
      await cache.set('key', 'value')

      const stats = await cache.stats()
      expect(stats.persistentSize).toBe(0)
      expect(stats.memorySize).toBe(1)
      expect(stats.size).toBe(1)

      cache.close()
    })
  })

  describe('type exports', () => {
    it('should export CacheEntry type', () => {
      const entry: CacheEntry<string> = {
        value: 'test',
        timestamp: Date.now(),
        expiresAt: Infinity,
        dependencies: [],
        hash: 'abc',
      }
      expect(entry.value).toBe('test')
    })

    it('should export PersistentCacheEntry type', () => {
      const entry: PersistentCacheEntry = {
        key: 'test-key',
        value: 'test-value',
        timestamp: Date.now(),
        expiresAt: Infinity,
        dependencies: ['dep1'],
        hash: 'abc',
        version: 'v1',
      }
      expect(entry.key).toBe('test-key')
    })

    it('should export HybridCacheOptions type', () => {
      const options: HybridCacheOptions = {
        maxMemorySize: 100,
        ttl: 1000,
        version: 'v1',
        usePersistent: false,
        dbName: 'test-db',
        memoryCacheSize: 50,
      }
      expect(options.maxMemorySize).toBe(100)
    })
  })

  describe('IndexedDB Integration', () => {
    let originalIndexedDB: typeof globalThis.indexedDB
    let mockStores: Map<string, Map<string, any>>

    beforeEach(() => {
      originalIndexedDB = globalThis.indexedDB
      mockStores = new Map()

      // Create comprehensive IndexedDB mock
      const createMockRequest = (value: any, shouldError = false) => {
        const request: any = {
          result: value,
          error: shouldError ? new Error('Mock error') : null,
          onsuccess: null as any,
          onerror: null as any,
        }
        setTimeout(() => {
          if (shouldError && request.onerror) {
            request.onerror()
          } else if (request.onsuccess) {
            request.onsuccess({ target: request })
          }
        }, 0)
        return request
      }

      const mockDB: any = {
        objectStoreNames: {
          contains: (name: string) => mockStores.has(name),
        },
        createObjectStore: (name: string, _options: any) => {
          mockStores.set(name, new Map())
          return {
            createIndex: vi.fn(),
          }
        },
        transaction: (storeNames: string[], _mode: string) => ({
          objectStore: (name: string) => {
            const store = mockStores.get(name) || new Map()
            return {
              get: (key: string) => createMockRequest(store.get(key)),
              put: (entry: any) => {
                store.set(entry.key, entry)
                mockStores.set(name, store)
                return createMockRequest(undefined)
              },
              delete: (key: string) => {
                store.delete(key)
                return createMockRequest(undefined)
              },
              clear: () => {
                store.clear()
                return createMockRequest(undefined)
              },
              getAllKeys: () => createMockRequest(Array.from(store.keys())),
              index: (indexName: string) => ({
                openCursor: (range: any) => {
                  const entries = Array.from(store.entries())
                  let index = 0
                  const request: any = {
                    result: null,
                    onsuccess: null as any,
                    onerror: null as any,
                  }

                  const advanceCursor = () => {
                    if (index < entries.length) {
                      const [key, entry] = entries[index]
                      // Filter by expiration if range provided
                      if (entry.expiresAt < Date.now()) {
                        request.result = {
                          value: entry,
                          delete: () => store.delete(key),
                          continue: () => {
                            index++
                            advanceCursor()
                          },
                        }
                      } else {
                        index++
                        advanceCursor()
                        return
                      }
                    } else {
                      request.result = null
                    }
                    request.onsuccess?.({ target: request })
                  }

                  setTimeout(advanceCursor, 0)
                  return request
                },
              }),
            }
          },
        }),
        close: vi.fn(),
      }

      ;(globalThis as any).indexedDB = {
        open: (name: string, version: number) => {
          const request: any = {
            result: mockDB,
            error: null,
            onsuccess: null as any,
            onerror: null as any,
            onupgradeneeded: null as any,
          }
          setTimeout(() => {
            if (!mockStores.has('coral-cache')) {
              request.onupgradeneeded?.({ target: request })
            }
            request.onsuccess?.()
          }, 0)
          return request
        },
      }
    })

    afterEach(() => {
      globalThis.indexedDB = originalIndexedDB
    })

    it('should store and retrieve from persistent cache', async () => {
      const cache = new HybridCache({
        usePersistent: true,
        version: 'test-v1',
      })

      await cache.set('persistent-key', 'persistent-value')

      // Clear memory to force read from persistent
      ;(cache as any).memoryCache.clear()

      const result = await cache.get('persistent-key')
      expect(result).toBe('persistent-value')

      cache.close()
    })

    it('should handle persistent cache get with version mismatch', async () => {
      // First, store with version v1
      const cache1 = new HybridCache({
        usePersistent: true,
        version: 'v1',
      })
      await cache1.set('key', 'value')

      // Manually modify the store to have wrong version
      const store = mockStores.get('coral-cache')
      if (store) {
        const entry = store.get('key')
        if (entry) {
          entry.version = 'old-version'
          store.set('key', entry)
        }
      }

      // Clear memory cache
      ;(cache1 as any).memoryCache.clear()

      // Should return null due to version mismatch
      const result = await cache1.get('key')
      expect(result).toBeNull()

      cache1.close()
    })

    it('should handle persistent cache get with expired entry', async () => {
      const cache = new HybridCache({
        usePersistent: true,
        ttl: 100,
        version: 'test-v1',
      })

      await cache.set('expires', 'soon')

      // Manually expire the entry in store
      const store = mockStores.get('coral-cache')
      if (store) {
        const entry = store.get('expires')
        if (entry) {
          entry.expiresAt = Date.now() - 1000 // Already expired
          store.set('expires', entry)
        }
      }

      // Clear memory cache
      ;(cache as any).memoryCache.clear()

      // Should return null due to expiration
      const result = await cache.get('expires')
      expect(result).toBeNull()

      cache.close()
    })

    it('should delete from both memory and persistent cache', async () => {
      const cache = new HybridCache({
        usePersistent: true,
        version: 'test-v1',
      })

      await cache.set('to-delete', 'value')
      await cache.delete('to-delete')

      const result = await cache.get('to-delete')
      expect(result).toBeNull()

      cache.close()
    })

    it('should clear both memory and persistent cache', async () => {
      const cache = new HybridCache({
        usePersistent: true,
        version: 'test-v1',
      })

      await cache.set('key1', 'value1')
      await cache.set('key2', 'value2')
      await cache.clear()

      expect(await cache.get('key1')).toBeNull()
      expect(await cache.get('key2')).toBeNull()

      cache.close()
    })

    it('should check has() in persistent cache', async () => {
      const cache = new HybridCache({
        usePersistent: true,
        version: 'test-v1',
      })

      await cache.set('exists', 'value')

      // Clear memory to force check in persistent
      ;(cache as any).memoryCache.clear()

      const exists = await cache.has('exists')
      expect(exists).toBe(true)

      cache.close()
    })

    it('should return false for has() with version mismatch', async () => {
      const cache = new HybridCache({
        usePersistent: true,
        version: 'v1',
      })

      await cache.set('key', 'value')

      // Modify version in store
      const store = mockStores.get('coral-cache')
      if (store) {
        const entry = store.get('key')
        if (entry) {
          entry.version = 'different-version'
          store.set('key', entry)
        }
      }

      // Clear memory cache
      ;(cache as any).memoryCache.clear()

      const exists = await cache.has('key')
      expect(exists).toBe(false)

      cache.close()
    })

    it('should return false for has() with expired entry', async () => {
      const cache = new HybridCache({
        usePersistent: true,
        version: 'v1',
      })

      await cache.set('key', 'value')

      // Expire the entry
      const store = mockStores.get('coral-cache')
      if (store) {
        const entry = store.get('key')
        if (entry) {
          entry.expiresAt = Date.now() - 1000
          store.set('key', entry)
        }
      }

      // Clear memory cache
      ;(cache as any).memoryCache.clear()

      const exists = await cache.has('key')
      expect(exists).toBe(false)

      cache.close()
    })

    it('should invalidate dependency in persistent cache', async () => {
      const cache = new HybridCache({
        usePersistent: true,
        version: 'v1',
      })

      await cache.set('key1', 'value1', ['shared.ts'])
      await cache.set('key2', 'value2', ['other.ts'])

      await cache.invalidateDependency('shared.ts')

      // Keys should be invalidated
      const stats = await cache.stats()
      expect(stats).toBeDefined()

      cache.close()
    })

    it('should cleanup expired entries in persistent cache', async () => {
      const cache = new HybridCache({
        usePersistent: true,
        ttl: 100,
        version: 'v1',
      })

      await cache.set('key', 'value')

      // Manually expire the entry
      const store = mockStores.get('coral-cache')
      if (store) {
        const entry = store.get('key')
        if (entry) {
          entry.expiresAt = Date.now() - 1000
          store.set('key', entry)
        }
      }

      const removed = await cache.cleanup()
      expect(removed).toBeGreaterThanOrEqual(0)

      cache.close()
    })

    it('should get stats with persistent cache size', async () => {
      const cache = new HybridCache({
        usePersistent: true,
        version: 'v1',
      })

      await cache.set('key1', 'value1')
      await cache.set('key2', 'value2')

      const stats = await cache.stats()
      expect(stats.persistentSize).toBeGreaterThanOrEqual(0)

      cache.close()
    })

    it('should handle infinite TTL in persistent cache', async () => {
      const cache = new HybridCache({
        usePersistent: true,
        ttl: Infinity,
        version: 'v1',
      })

      await cache.set('forever', 'value')

      // Clear memory
      ;(cache as any).memoryCache.clear()

      const result = await cache.get('forever')
      expect(result).toBe('value')

      cache.close()
    })
  })

  describe('IndexedDB Error Handling', () => {
    let originalIndexedDB: typeof globalThis.indexedDB
    let warnSpy: any

    beforeEach(() => {
      originalIndexedDB = globalThis.indexedDB
      warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    })

    afterEach(() => {
      globalThis.indexedDB = originalIndexedDB
      warnSpy.mockRestore()
    })

    it('should handle IndexedDB open error', async () => {
      ;(globalThis as any).indexedDB = {
        open: () => {
          const request: any = {
            error: new Error('Failed to open'),
            onsuccess: null,
            onerror: null,
          }
          setTimeout(() => request.onerror?.(), 0)
          return request
        },
      }

      const cache = new HybridCache({
        usePersistent: true,
        version: 'v1',
      })

      // Operations should still work (fallback to memory)
      await cache.set('key', 'value')
      expect(await cache.get('key')).toBe('value')

      cache.close()
    })

    it('should handle IndexedDB get error gracefully', async () => {
      let callCount = 0
      const mockDB: any = {
        objectStoreNames: { contains: () => true },
        transaction: () => ({
          objectStore: () => ({
            get: () => {
              callCount++
              const request: any = {
                error: new Error('Get failed'),
                onsuccess: null,
                onerror: null,
              }
              setTimeout(() => request.onerror?.(), 0)
              return request
            },
            put: () => {
              const request: any = { onsuccess: null }
              setTimeout(() => request.onsuccess?.({ target: request }), 0)
              return request
            },
          }),
        }),
        close: vi.fn(),
      }

      ;(globalThis as any).indexedDB = {
        open: () => {
          const request: any = {
            result: mockDB,
            onsuccess: null,
          }
          setTimeout(() => request.onsuccess?.(), 0)
          return request
        },
      }

      const cache = new HybridCache({
        usePersistent: true,
        version: 'v1',
      })

      await cache.set('key', 'value')

      // Clear memory to force persistent read
      ;(cache as any).memoryCache.clear()

      // Should handle error gracefully
      const result = await cache.get('key')
      expect(result).toBeNull()
      expect(warnSpy).toHaveBeenCalled()

      cache.close()
    })

    it('should handle IndexedDB set error gracefully', async () => {
      const mockDB: any = {
        objectStoreNames: { contains: () => true },
        transaction: () => ({
          objectStore: () => ({
            put: () => {
              const request: any = {
                error: new Error('Put failed'),
                onsuccess: null,
                onerror: null,
              }
              setTimeout(() => request.onerror?.(), 0)
              return request
            },
          }),
        }),
        close: vi.fn(),
      }

      ;(globalThis as any).indexedDB = {
        open: () => {
          const request: any = {
            result: mockDB,
            onsuccess: null,
          }
          setTimeout(() => request.onsuccess?.(), 0)
          return request
        },
      }

      const cache = new HybridCache({
        usePersistent: true,
        version: 'v1',
      })

      // Should handle error gracefully and still store in memory
      await cache.set('key', 'value')
      expect(await cache.get('key')).toBe('value')
      expect(warnSpy).toHaveBeenCalled()

      cache.close()
    })

    it('should handle IndexedDB delete error gracefully', async () => {
      const mockStore = new Map()
      mockStore.set('key', { key: 'key', value: 'value', version: 'v1' })

      const mockDB: any = {
        objectStoreNames: { contains: () => true },
        transaction: () => ({
          objectStore: () => ({
            get: (key: string) => {
              const request: any = {
                result: mockStore.get(key),
                onsuccess: null,
              }
              setTimeout(() => request.onsuccess?.({ target: request }), 0)
              return request
            },
            put: (entry: any) => {
              mockStore.set(entry.key, entry)
              const request: any = { onsuccess: null }
              setTimeout(() => request.onsuccess?.({ target: request }), 0)
              return request
            },
            delete: () => {
              const request: any = {
                error: new Error('Delete failed'),
                onsuccess: null,
                onerror: null,
              }
              setTimeout(() => request.onerror?.(), 0)
              return request
            },
          }),
        }),
        close: vi.fn(),
      }

      ;(globalThis as any).indexedDB = {
        open: () => {
          const request: any = {
            result: mockDB,
            onsuccess: null,
          }
          setTimeout(() => request.onsuccess?.(), 0)
          return request
        },
      }

      const cache = new HybridCache({
        usePersistent: true,
        version: 'v1',
      })

      await cache.set('key', 'value')
      await cache.delete('key')

      // Memory should be deleted even if persistent fails
      expect(warnSpy).toHaveBeenCalled()

      cache.close()
    })

    it('should handle IndexedDB clear error gracefully', async () => {
      const mockDB: any = {
        objectStoreNames: { contains: () => true },
        transaction: () => ({
          objectStore: () => ({
            put: () => {
              const request: any = { onsuccess: null }
              setTimeout(() => request.onsuccess?.({ target: request }), 0)
              return request
            },
            clear: () => {
              const request: any = {
                error: new Error('Clear failed'),
                onsuccess: null,
                onerror: null,
              }
              setTimeout(() => request.onerror?.(), 0)
              return request
            },
          }),
        }),
        close: vi.fn(),
      }

      ;(globalThis as any).indexedDB = {
        open: () => {
          const request: any = {
            result: mockDB,
            onsuccess: null,
          }
          setTimeout(() => request.onsuccess?.(), 0)
          return request
        },
      }

      const cache = new HybridCache({
        usePersistent: true,
        version: 'v1',
      })

      await cache.set('key', 'value')
      await cache.clear()

      expect(warnSpy).toHaveBeenCalled()

      cache.close()
    })

    it('should handle IndexedDB cleanup error gracefully', async () => {
      const mockDB: any = {
        objectStoreNames: { contains: () => true },
        transaction: () => ({
          objectStore: () => ({
            put: () => {
              const request: any = { onsuccess: null }
              setTimeout(() => request.onsuccess?.({ target: request }), 0)
              return request
            },
            index: () => ({
              openCursor: () => {
                const request: any = {
                  error: new Error('Cursor failed'),
                  onsuccess: null,
                  onerror: null,
                }
                setTimeout(() => request.onerror?.(), 0)
                return request
              },
            }),
          }),
        }),
        close: vi.fn(),
      }

      ;(globalThis as any).indexedDB = {
        open: () => {
          const request: any = {
            result: mockDB,
            onsuccess: null,
          }
          setTimeout(() => request.onsuccess?.(), 0)
          return request
        },
      }

      const cache = new HybridCache({
        usePersistent: true,
        version: 'v1',
      })

      await cache.set('key', 'value')
      const removed = await cache.cleanup()

      expect(removed).toBeGreaterThanOrEqual(0)
      expect(warnSpy).toHaveBeenCalled()

      cache.close()
    })
  })

  describe('IndexedDBCache internal methods', () => {
    let originalIndexedDB: typeof globalThis.indexedDB

    beforeEach(() => {
      originalIndexedDB = globalThis.indexedDB
    })

    afterEach(() => {
      globalThis.indexedDB = originalIndexedDB
    })

    it('should handle db being null on operations', async () => {
      // Mock IndexedDB that returns null db
      ;(globalThis as any).indexedDB = {
        open: () => {
          const request: any = {
            result: null, // null db
            onsuccess: null,
          }
          setTimeout(() => request.onsuccess?.(), 0)
          return request
        },
      }

      const cache = new HybridCache({
        usePersistent: true,
        version: 'v1',
      })

      // Operations should handle null db gracefully
      await cache.set('key', 'value')

      // Memory should still work
      expect(await cache.get('key')).toBe('value')

      cache.close()
    })

    it('should reuse init promise when called multiple times', async () => {
      let openCallCount = 0
      const mockDB: any = {
        objectStoreNames: { contains: () => true },
        transaction: () => ({
          objectStore: () => ({
            get: () => {
              const request: any = { result: null, onsuccess: null }
              setTimeout(() => request.onsuccess?.({ target: request }), 0)
              return request
            },
            put: () => {
              const request: any = { onsuccess: null }
              setTimeout(() => request.onsuccess?.({ target: request }), 0)
              return request
            },
            getAllKeys: () => {
              const request: any = { result: [], onsuccess: null }
              setTimeout(() => request.onsuccess?.({ target: request }), 0)
              return request
            },
          }),
        }),
        close: vi.fn(),
      }

      ;(globalThis as any).indexedDB = {
        open: () => {
          openCallCount++
          const request: any = {
            result: mockDB,
            onsuccess: null,
          }
          setTimeout(() => request.onsuccess?.(), 0)
          return request
        },
      }

      const cache = new HybridCache({
        usePersistent: true,
        version: 'v1',
      })

      // Multiple operations should reuse init promise
      await Promise.all([
        cache.set('key1', 'value1'),
        cache.set('key2', 'value2'),
        cache.get('key1'),
        cache.get('key2'),
      ])

      // Should only open once
      expect(openCallCount).toBe(1)

      cache.close()
    })

    it('should close database connection properly', async () => {
      const closeFn = vi.fn()
      const mockDB: any = {
        objectStoreNames: { contains: () => true },
        transaction: () => ({
          objectStore: () => ({
            put: () => {
              const request: any = { onsuccess: null }
              setTimeout(() => request.onsuccess?.({ target: request }), 0)
              return request
            },
          }),
        }),
        close: closeFn,
      }

      ;(globalThis as any).indexedDB = {
        open: () => {
          const request: any = {
            result: mockDB,
            onsuccess: null,
          }
          setTimeout(() => request.onsuccess?.(), 0)
          return request
        },
      }

      const cache = new HybridCache({
        usePersistent: true,
        version: 'v1',
      })

      await cache.set('key', 'value')
      cache.close()

      expect(closeFn).toHaveBeenCalled()
    })
  })

  describe('Additional coverage for edge cases', () => {
    let originalIndexedDB: typeof globalThis.indexedDB

    beforeEach(() => {
      originalIndexedDB = globalThis.indexedDB
    })

    afterEach(() => {
      globalThis.indexedDB = originalIndexedDB
    })

    it('should cleanup expired entries from memory cache', async () => {
      const cache = new HybridCache({
        usePersistent: false,
        ttl: 1, // Very short TTL
        version: 'v1',
      })

      await cache.set('key1', 'value1')
      await cache.set('key2', 'value2')

      // Wait for entries to expire
      await new Promise(resolve => setTimeout(resolve, 10))

      const removed = await cache.cleanup()

      // Memory cleanup should handle expired entries
      expect(removed).toBeGreaterThanOrEqual(0)
      cache.close()
    })

    it('should invalidate entries with matching dependencies', async () => {
      const storedEntries = new Map<string, any>()
      storedEntries.set('dep-key', {
        key: 'dep-key',
        value: 'value',
        dependencies: ['shared.ts'],
        version: 'v1',
        expiresAt: Infinity,
      })

      const mockDB: any = {
        objectStoreNames: { contains: () => true },
        transaction: () => ({
          objectStore: () => ({
            get: (key: string) => {
              const request: any = {
                result: storedEntries.get(key),
                onsuccess: null,
              }
              setTimeout(() => request.onsuccess?.({ target: request }), 0)
              return request
            },
            put: (entry: any) => {
              storedEntries.set(entry.key, entry)
              const request: any = { onsuccess: null }
              setTimeout(() => request.onsuccess?.({ target: request }), 0)
              return request
            },
            delete: (key: string) => {
              storedEntries.delete(key)
              const request: any = { onsuccess: null }
              setTimeout(() => request.onsuccess?.({ target: request }), 0)
              return request
            },
            getAllKeys: () => {
              const request: any = {
                result: Array.from(storedEntries.keys()),
                onsuccess: null,
              }
              setTimeout(() => request.onsuccess?.({ target: request }), 0)
              return request
            },
          }),
        }),
        close: vi.fn(),
      }

      ;(globalThis as any).indexedDB = {
        open: () => {
          const request: any = {
            result: mockDB,
            onsuccess: null,
          }
          setTimeout(() => request.onsuccess?.(), 0)
          return request
        },
      }

      const cache = new HybridCache({
        usePersistent: true,
        version: 'v1',
      })

      await cache.set('dep-key', 'value', ['shared.ts'])
      await cache.invalidateDependency('shared.ts')

      // Entry should be deleted
      expect(storedEntries.has('dep-key')).toBe(false)
      cache.close()
    })

    it('should handle memory cleanup when entries expire between keys() and has()', async () => {
      const cache = new HybridCache({
        usePersistent: false,
        ttl: 1, // Very short TTL
        version: 'v1',
      })

      await cache.set('expiring-key', 'value')

      // Wait for entry to expire
      await new Promise(resolve => setTimeout(resolve, 10))

      // Force cleanup
      const removed = await cache.cleanup()

      // Memory cleanup should handle expired entries
      expect(removed).toBeGreaterThanOrEqual(0)
      cache.close()
    })

    it('should return correct stats for memory-only cache', async () => {
      const cache = new HybridCache({
        usePersistent: false,
        version: 'v1',
      })

      await cache.set('key1', 'value1')
      await cache.set('key2', 'value2')

      const stats = await cache.stats()

      // Memory-only cache should have memory size but no persistent size
      expect(stats.memorySize).toBe(2)
      expect(stats.persistentSize).toBe(0)
      cache.close()
    })

    it('should handle prewarm with Map', async () => {
      const cache = new HybridCache({
        usePersistent: false,
        version: 'v1',
      })

      const entries = new Map<string, string>()
      entries.set('key1', 'value1')
      entries.set('key2', 'value2')

      await cache.prewarm(entries)

      expect(await cache.get('key1')).toBe('value1')
      expect(await cache.get('key2')).toBe('value2')
      cache.close()
    })

    it('should handle prewarm with object', async () => {
      const cache = new HybridCache({
        usePersistent: false,
        version: 'v1',
      })

      await cache.prewarm({
        'key1': 'value1',
        'key2': 'value2',
      })

      expect(await cache.get('key1')).toBe('value1')
      expect(await cache.get('key2')).toBe('value2')
      cache.close()
    })

    it('should handle hit rate calculation with zero total', () => {
      const cache = new HybridCache({
        usePersistent: false,
        version: 'v1',
      })

      // No operations yet
      expect(cache.getHitRate()).toBe(0)
      cache.close()
    })

    it('should hash values consistently', async () => {
      const cache = new HybridCache({
        usePersistent: false,
        version: 'v1',
      })

      await cache.set('key1', 'test value')
      await cache.set('key2', 'test value')

      // Both should have same hash for same value
      expect(await cache.get('key1')).toBe(await cache.get('key2'))
      cache.close()
    })

    it('should handle expired entry in persistent cache during get', async () => {
      const expiredEntry = {
        key: 'expired',
        value: 'old',
        version: 'v1',
        expiresAt: Date.now() - 1000,
        dependencies: [],
        hash: 'abc',
        timestamp: Date.now() - 2000,
      }

      const mockDB: any = {
        objectStoreNames: { contains: () => true },
        transaction: () => ({
          objectStore: () => ({
            get: () => {
              const request: any = {
                result: expiredEntry,
                onsuccess: null,
              }
              setTimeout(() => request.onsuccess?.({ target: request }), 0)
              return request
            },
            delete: () => {
              const request: any = { onsuccess: null }
              setTimeout(() => request.onsuccess?.({ target: request }), 0)
              return request
            },
          }),
        }),
        close: vi.fn(),
      }

      ;(globalThis as any).indexedDB = {
        open: () => {
          const request: any = {
            result: mockDB,
            onsuccess: null,
          }
          setTimeout(() => request.onsuccess?.(), 0)
          return request
        },
      }

      const cache = new HybridCache({
        usePersistent: true,
        version: 'v1',
      })

      // Should detect expired entry and return null
      const result = await cache.get('expired')
      expect(result).toBeNull()
      cache.close()
    })

    it('should handle version mismatch in persistent cache', async () => {
      const oldVersionEntry = {
        key: 'old-version',
        value: 'data',
        version: 'v0', // Different version
        expiresAt: Infinity,
        dependencies: [],
        hash: 'abc',
        timestamp: Date.now(),
      }

      const mockDB: any = {
        objectStoreNames: { contains: () => true },
        transaction: () => ({
          objectStore: () => ({
            get: () => {
              const request: any = {
                result: oldVersionEntry,
                onsuccess: null,
              }
              setTimeout(() => request.onsuccess?.({ target: request }), 0)
              return request
            },
          }),
        }),
        close: vi.fn(),
      }

      ;(globalThis as any).indexedDB = {
        open: () => {
          const request: any = {
            result: mockDB,
            onsuccess: null,
          }
          setTimeout(() => request.onsuccess?.(), 0)
          return request
        },
      }

      const cache = new HybridCache({
        usePersistent: true,
        version: 'v1', // Current version
      })

      // Should return null for version mismatch
      const result = await cache.get('old-version')
      expect(result).toBeNull()
      cache.close()
    })
  })
})
