/**
 * CSS Cache Tests
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { CSSCache, createCache } from '../../../src/core/cache'

describe('CSSCache', () => {
  let cache: CSSCache

  beforeEach(() => {
    cache = new CSSCache()
  })

  describe('initialization', () => {
    it('should create empty cache', () => {
      expect(cache.size).toBe(0)
    })

    it('should create cache via factory function', () => {
      const c = createCache()
      expect(c).toBeInstanceOf(CSSCache)
      expect(c.size).toBe(0)
    })

    it('should have zero hits and misses initially', () => {
      const stats = cache.stats()
      expect(stats.hits).toBe(0)
      expect(stats.misses).toBe(0)
    })
  })

  describe('set', () => {
    it('should store CSS for a class name', () => {
      cache.set('p-4', '.p-4 { padding: 1rem; }')
      expect(cache.has('p-4')).toBe(true)
    })

    it('should overwrite existing entry', () => {
      cache.set('p-4', '.p-4 { padding: 1rem; }')
      cache.set('p-4', '.p-4 { padding: 16px; }')
      expect(cache.get('p-4')).toBe('.p-4 { padding: 16px; }')
    })
  })

  describe('get', () => {
    it('should return cached CSS', () => {
      cache.set('p-4', '.p-4 { padding: 1rem; }')
      expect(cache.get('p-4')).toBe('.p-4 { padding: 1rem; }')
    })

    it('should return undefined for missing entry', () => {
      expect(cache.get('missing')).toBeUndefined()
    })

    it('should increment hits on cache hit', () => {
      cache.set('p-4', '.p-4 {}')
      cache.get('p-4')
      cache.get('p-4')
      expect(cache.stats().hits).toBe(2)
    })

    it('should increment misses on cache miss', () => {
      cache.get('missing')
      cache.get('also-missing')
      expect(cache.stats().misses).toBe(2)
    })
  })

  describe('has', () => {
    it('should return true for existing entry', () => {
      cache.set('p-4', '.p-4 {}')
      expect(cache.has('p-4')).toBe(true)
    })

    it('should return false for missing entry', () => {
      expect(cache.has('missing')).toBe(false)
    })
  })

  describe('delete', () => {
    it('should remove entry from cache', () => {
      cache.set('p-4', '.p-4 {}')
      expect(cache.has('p-4')).toBe(true)

      const result = cache.delete('p-4')
      expect(result).toBe(true)
      expect(cache.has('p-4')).toBe(false)
    })

    it('should return false when deleting non-existent entry', () => {
      const result = cache.delete('missing')
      expect(result).toBe(false)
    })
  })

  describe('clear', () => {
    it('should remove all entries', () => {
      cache.set('p-4', '.p-4 {}')
      cache.set('m-4', '.m-4 {}')
      cache.set('w-full', '.w-full {}')

      cache.clear()

      expect(cache.size).toBe(0)
    })

    it('should reset hits and misses', () => {
      cache.set('p-4', '.p-4 {}')
      cache.get('p-4')
      cache.get('missing')

      cache.clear()

      const stats = cache.stats()
      expect(stats.hits).toBe(0)
      expect(stats.misses).toBe(0)
    })
  })

  describe('stats', () => {
    it('should return correct stats', () => {
      cache.set('p-4', '.p-4 {}')
      cache.set('m-4', '.m-4 {}')
      cache.get('p-4') // hit
      cache.get('missing') // miss

      const stats = cache.stats()
      expect(stats.hits).toBe(1)
      expect(stats.misses).toBe(1)
      expect(stats.size).toBe(2)
    })
  })

  describe('entries', () => {
    it('should return iterator of all entries', () => {
      cache.set('p-4', '.p-4 {}')
      cache.set('m-4', '.m-4 {}')

      const entries = Array.from(cache.entries())
      expect(entries).toHaveLength(2)
      expect(entries).toContainEqual(['p-4', '.p-4 {}'])
      expect(entries).toContainEqual(['m-4', '.m-4 {}'])
    })

    it('should return empty iterator for empty cache', () => {
      const entries = Array.from(cache.entries())
      expect(entries).toHaveLength(0)
    })
  })

  describe('keys', () => {
    it('should return iterator of all keys', () => {
      cache.set('p-4', '.p-4 {}')
      cache.set('m-4', '.m-4 {}')

      const keys = Array.from(cache.keys())
      expect(keys).toHaveLength(2)
      expect(keys).toContain('p-4')
      expect(keys).toContain('m-4')
    })
  })

  describe('values', () => {
    it('should return iterator of all values', () => {
      cache.set('p-4', '.p-4 { padding: 1rem; }')
      cache.set('m-4', '.m-4 { margin: 1rem; }')

      const values = Array.from(cache.values())
      expect(values).toHaveLength(2)
      expect(values).toContain('.p-4 { padding: 1rem; }')
      expect(values).toContain('.m-4 { margin: 1rem; }')
    })
  })

  describe('size', () => {
    it('should return number of entries', () => {
      expect(cache.size).toBe(0)

      cache.set('p-4', '.p-4 {}')
      expect(cache.size).toBe(1)

      cache.set('m-4', '.m-4 {}')
      expect(cache.size).toBe(2)

      cache.delete('p-4')
      expect(cache.size).toBe(1)
    })
  })

  describe('getMany', () => {
    it('should return map of cached values', () => {
      cache.set('p-4', '.p-4 {}')
      cache.set('m-4', '.m-4 {}')

      const result = cache.getMany(['p-4', 'm-4', 'missing'])

      expect(result.size).toBe(2)
      expect(result.get('p-4')).toBe('.p-4 {}')
      expect(result.get('m-4')).toBe('.m-4 {}')
      expect(result.has('missing')).toBe(false)
    })

    it('should update hit/miss stats', () => {
      cache.set('p-4', '.p-4 {}')
      cache.getMany(['p-4', 'missing'])

      const stats = cache.stats()
      expect(stats.hits).toBe(1)
      expect(stats.misses).toBe(1)
    })

    it('should return empty map for empty input', () => {
      const result = cache.getMany([])
      expect(result.size).toBe(0)
    })
  })

  describe('setMany', () => {
    it('should set multiple entries from Map', () => {
      const entries = new Map([
        ['p-4', '.p-4 {}'],
        ['m-4', '.m-4 {}'],
      ])

      cache.setMany(entries)

      expect(cache.get('p-4')).toBe('.p-4 {}')
      expect(cache.get('m-4')).toBe('.m-4 {}')
    })

    it('should set multiple entries from array', () => {
      const entries: Array<[string, string]> = [
        ['p-4', '.p-4 {}'],
        ['m-4', '.m-4 {}'],
      ]

      cache.setMany(entries)

      expect(cache.get('p-4')).toBe('.p-4 {}')
      expect(cache.get('m-4')).toBe('.m-4 {}')
    })
  })

  describe('getHitRate', () => {
    it('should return 0 when no operations', () => {
      expect(cache.getHitRate()).toBe(0)
    })

    it('should return correct hit rate', () => {
      cache.set('p-4', '.p-4 {}')
      cache.get('p-4') // hit
      cache.get('missing') // miss

      expect(cache.getHitRate()).toBe(50)
    })

    it('should return 100 for all hits', () => {
      cache.set('p-4', '.p-4 {}')
      cache.get('p-4')
      cache.get('p-4')
      cache.get('p-4')

      expect(cache.getHitRate()).toBe(100)
    })

    it('should return 0 for all misses', () => {
      cache.get('missing1')
      cache.get('missing2')

      expect(cache.getHitRate()).toBe(0)
    })
  })
})
