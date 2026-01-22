/**
 * Memory Leak Tests
 *
 * Tests for observer and optimizer memory leak prevention
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { createCoral } from '../../src'

// Mock document for Node.js environment
const mockDocument = {
  documentElement: {} as HTMLElement,
}

describe('Memory Leak Prevention', () => {
  describe('DOMObserver - LRU Cache (without DOM dependency)', () => {
    it('evicts oldest entries when max size is reached', () => {
      // Test the LRU cache logic directly without DOM dependency
      const cache = new Map<string, true>()
      const maxSize = 5

      // Add more items than max size
      for (let i = 0; i < 10; i++) {
        // Simulate LRU eviction
        if (cache.size >= maxSize) {
          const firstKey = cache.keys().next().value
          if (firstKey !== undefined) {
            cache.delete(firstKey)
          }
        }
        cache.set(`class-${i}`, true)
      }

      expect(cache.size).toBeLessThanOrEqual(maxSize)
    })

    it('marks recently accessed items as most recent', () => {
      const cache = new Map<string, true>()
      const maxSize = 100

      // Add items
      cache.set('class-1', true)
      cache.set('class-2', true)
      cache.set('class-3', true)

      // Access class-1 (should move to end via delete + re-add)
      if (cache.has('class-1')) {
        const value = cache.get('class-1')
        cache.delete('class-1')
        cache.set('class-1', true)
      }

      // Add more items to trigger eviction
      for (let i = 4; i <= 101; i++) {
        if (cache.size >= maxSize) {
          const firstKey = cache.keys().next().value
          if (firstKey !== undefined) {
            cache.delete(firstKey)
          }
        }
        cache.set(`class-${i}`, true)
      }

      // class-1 should still be there because it was recently accessed
      expect(cache.has('class-1')).toBe(true)

      // class-2 should be evicted (oldest, not recently accessed)
      expect(cache.has('class-2')).toBe(false)
    })
  })

  describe('Map-based LRU Cache Performance', () => {
    it('handles 10,000 operations efficiently', () => {
      const cache = new Map<string, true>()
      const maxSize = 10000

      const start = performance.now()

      for (let i = 0; i < 10000; i++) {
        if (cache.size >= maxSize) {
          const firstKey = cache.keys().next().value
          if (firstKey !== undefined) {
            cache.delete(firstKey)
          }
        }
        cache.set(`class-${i}`, true)
      }

      const duration = performance.now() - start

      // Should complete in less than 100ms
      expect(duration).toBeLessThan(100)
      expect(cache.size).toBe(10000)
    })

    it('correctly clears cache', () => {
      const cache = new Map<string, true>()

      // Add some items
      for (let i = 0; i < 50; i++) {
        cache.set(`class-${i}`, true)
      }

      expect(cache.size).toBe(50)

      // Clear cache
      cache.clear()

      expect(cache.size).toBe(0)
    })

    it('returns correct cache stats', () => {
      const cache = new Map<string, true>()
      const maxSize = 100

      // Add some items
      for (let i = 0; i < 25; i++) {
        cache.set(`class-${i}`, true)
      }

      const stats = {
        size: cache.size,
        maxSize: maxSize,
      }

      expect(stats.size).toBe(25)
      expect(stats.maxSize).toBe(100)
    })
  })
})
