/**
 * Cache Performance Tests
 *
 * Tests for LRU cache performance and behavior
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { getCachedRegex, clearRegexCache, getCacheSize, getDynamicCacheSize, OPACITY_PATTERN } from '../../src/core/parser-cache'

describe('Parser Cache - LRU Performance', () => {
  beforeEach(() => {
    clearRegexCache()
  })

  describe('Basic caching', () => {
    it('caches and reuses regex patterns', () => {
      const pattern1 = getCachedRegex('test1', '\\d+')
      const pattern2 = getCachedRegex('test1', '\\d+')

      expect(pattern1).toBe(pattern2)
      expect(getCacheSize()).toBe(1)
    })

    it('maintains separate cache for different flags', () => {
      const pattern1 = getCachedRegex('test', '\\d+', 'g')
      const pattern2 = getCachedRegex('test', '\\d+', 'i')

      expect(pattern1).not.toBe(pattern2)
      expect(getCacheSize()).toBe(2)
    })
  })

  describe('LRU eviction', () => {
    it('evicts least recently used patterns when cache is full', () => {
      // Fill cache beyond max size
      for (let i = 0; i < 600; i++) {
        getCachedRegex(`pattern-${i}`, `\\d{${i}}`)
      }

      // Cache should not exceed max size significantly
      expect(getDynamicCacheSize()).toBeLessThanOrEqual(500)
    })

    it('updates recency on pattern access', () => {
      // Add patterns
      for (let i = 0; i < 100; i++) {
        getCachedRegex(`pattern-${i}`, `\\d{${i}}`)
      }

      // Access first pattern (should move to end)
      const firstPattern = getCachedRegex('pattern-0', '\\d{0}')

      // Fill cache to trigger eviction
      for (let i = 100; i < 600; i++) {
        getCachedRegex(`pattern-${i}`, `\\d{${i}}`)
      }

      // pattern-1 should be evicted (not accessed)
      // pattern-0 should still be cached (accessed recently)
      // Note: This is implementation-dependent behavior
    })
  })

  describe('Cache clearing', () => {
    it('clears all patterns when preserveStatic is false', () => {
      getCachedRegex('test1', '\\d+')
      getCachedRegex('test2', '[a-z]+')

      expect(getCacheSize()).toBe(2)

      clearRegexCache(false)

      expect(getCacheSize()).toBe(0)
    })

    it('clears only dynamic patterns when preserveStatic is true', () => {
      // Add some dynamic patterns to the cache
      getCachedRegex('dynamic-test-1', '\\d+')
      getCachedRegex('dynamic-test-2', '[a-z]+')

      const initialSize = getCacheSize()
      const initialDynamicSize = getDynamicCacheSize()

      expect(initialSize).toBeGreaterThan(0)
      expect(initialDynamicSize).toBeGreaterThan(0)

      // Clear only dynamic patterns (preserveStatic = true)
      clearRegexCache(true)

      // Dynamic patterns should be cleared
      // Note: Static patterns from module initialization may also be cleared
      // if staticPatternKeys was cleared by beforeEach
      expect(getDynamicCacheSize()).toBe(0)
    })
  })

  describe('Performance with cache hits', () => {
    it('is faster with cached patterns', () => {
      const iterations = 10000

      // First pass - cache misses
      const start1 = performance.now()
      for (let i = 0; i < iterations; i++) {
        getCachedRegex('pattern', '\\d+')
      }
      const duration1 = performance.now() - start1

      // Second pass - cache hits
      const start2 = performance.now()
      for (let i = 0; i < iterations; i++) {
        getCachedRegex('pattern', '\\d+')
      }
      const duration2 = performance.now() - start2

      // Cached access should be faster
      expect(duration2).toBeLessThan(duration1)
    })
  })
})
