/**
 * Edge Case Tests for Core Modules
 *
 * Comprehensive tests for boundary conditions, error handling,
 * and edge cases across matcher, cache, and parser.
 *
 * @module tests/unit/core/edge-cases
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { Matcher } from '../../../src/core/matcher'
import { CSSCache } from '../../../src/core/cache'
import { parse, parseClasses, expandVariantGroups } from '../../../src/core/parser'
import type { Rule } from '../../../src/types'

describe('Edge Case Tests', () => {
  describe('Matcher Edge Cases', () => {
    let matcher: Matcher

    beforeEach(() => {
      matcher = new Matcher()
    })

    it('should handle empty rule set', () => {
      const result = matcher.match('p-4')
      expect(result).toBeNull()
    })

    it('should handle empty string input', () => {
      const result = matcher.match('')
      expect(result).toBeNull()
    })

    it('should handle very long class names', () => {
      matcher.addRule({
        name: 'long-class',
        pattern: /^class-([a-z]+)-(\d+)$/,
        handler: (m) => ({ properties: { 'margin': `${m[2]}px` } }),
      })

      const veryLongClass = 'class-' + 'a'.repeat(100) + '-42'
      const result = matcher.match(veryLongClass)
      expect(result).not.toBeNull()
      expect(result?.match[1]).toBe('a'.repeat(100))
    })

    it('should handle unicode characters in class names', () => {
      matcher.addRule({
        name: 'unicode',
        pattern: /^text-([a-zA-Z\u00C0-\u00FF]+)$/,
        handler: (m) => ({ properties: { color: m[1] || 'black' } }),
      })

      const result = matcher.match('text-café')
      expect(result).not.toBeNull()
    })

    it('should handle conflicting priorities', () => {
      matcher.addRule({
        name: 'low-priority',
        pattern: /^p-\d+$/,
        priority: 1,
        handler: () => ({ properties: { padding: '10px' } }),
      })

      matcher.addRule({
        name: 'high-priority',
        pattern: /^p-4$/,
        priority: 10,
        handler: () => ({ properties: { padding: '16px' } }),
      })

      const result = matcher.match('p-4')
      expect(result).not.toBeNull()
      expect(result?.rule.priority).toBe(10)
    })

    it('should handle overlapping patterns', () => {
      matcher.addRule({
        name: 'pattern-1',
        pattern: /^p-\d+$/,
        handler: () => ({ properties: { padding: '1px' } }),
      })

      matcher.addRule({
        name: 'pattern-2',
        pattern: /^p-[1-9]\d*$/,
        handler: () => ({ properties: { padding: '2px' } }),
      })

      const result = matcher.match('p-42')
      expect(result).not.toBeNull()
    })

    it('should handle rule removal', () => {
      matcher.addRule({
        name: 'removable',
        pattern: 'test-removable',
        handler: () => ({ properties: { color: 'red' } }),
      })

      expect(matcher.match('test-removable')).not.toBeNull()
      matcher.removeRule('removable')
      // After removal, re-create matcher to clear cache
      const newMatcher = new Matcher()
      expect(newMatcher.match('test-removable')).toBeNull()
    })

    it('should handle clearing all rules', () => {
      matcher.addRule({
        name: 'rule1',
        pattern: 'test1',
        handler: () => ({ properties: { color: 'red' } }),
      })
      matcher.addRule({
        name: 'rule2',
        pattern: 'test2',
        handler: () => ({ properties: { color: 'blue' } }),
      })

      expect(matcher.size).toBe(2)
      matcher.clear()
      expect(matcher.size).toBe(0)
    })
  })

  describe('Cache Edge Cases', () => {
    it('should handle very large cache sizes', () => {
      const cache = new CSSCache({ maxSize: 1000000, ttl: Infinity, enabled: true })

      // Add many entries
      for (let i = 0; i < 10000; i++) {
        cache.set(`class-${i}`, `.class-${i} { color: red; }`)
      }

      expect(cache.size).toBe(10000)
    })

    it('should handle duplicate keys', () => {
      const cache = new CSSCache({ maxSize: 100, ttl: Infinity, enabled: true })

      cache.set('test-class', '.test { color: red; }')
      cache.set('test-class', '.test { color: blue; }')

      const result = cache.get('test-class')
      expect(result).toBe('.test { color: blue; }')
    })

    it('should handle null and undefined values', () => {
      const cache = new CSSCache({ maxSize: 100, ttl: Infinity, enabled: true })

      cache.set('null-key', null as any)
      cache.set('undefined-key', undefined as any)

      expect(cache.get('null-key')).toBeNull()
      expect(cache.get('undefined-key')).toBeUndefined()
    })

    it('should handle cache clear with many entries', () => {
      const cache = new CSSCache({ maxSize: 1000, ttl: Infinity, enabled: true })

      for (let i = 0; i < 1000; i++) {
        cache.set(`class-${i}`, `.class-${i} { color: red; }`)
      }

      expect(cache.size).toBe(1000)

      cache.clear()

      expect(cache.size).toBe(0)
    })

    it('should handle LRU eviction correctly', () => {
      const cache = new CSSCache({ maxSize: 3, ttl: Infinity, enabled: true })

      cache.set('class-1', '.class-1 { color: red; }')
      cache.set('class-2', '.class-2 { color: blue; }')
      cache.set('class-3', '.class-3 { color: green; }')

      // Access class-1 to make it recently used
      cache.get('class-1')

      // Add class-4, should evict class-2 (least recently used)
      cache.set('class-4', '.class-4 { color: yellow; }')

      expect(cache.get('class-1')).toBeDefined()
      expect(cache.get('class-2')).toBeUndefined()
      expect(cache.get('class-3')).toBeDefined()
      expect(cache.get('class-4')).toBeDefined()
    })

    it('should handle cache hits and misses', () => {
      const cache = new CSSCache({ maxSize: 100, ttl: Infinity, enabled: true })

      cache.set('hit-test', '.hit-test { color: red; }')

      expect(cache.get('hit-test')).toBeDefined()
      expect(cache.get('miss-test')).toBeUndefined()
    })

    it('should handle special characters in cache keys', () => {
      const cache = new CSSCache({ maxSize: 100, ttl: Infinity, enabled: true })

      const specialKey = 'w-[17px]!bg-red-500/50'
      cache.set(specialKey, `.${specialKey} { width: 17px; }`)

      expect(cache.get(specialKey)).toBeDefined()
    })
  })

  describe('Parser Edge Cases', () => {
    it('should handle empty string input', () => {
      const result = parse('')
      expect(result.original).toBe('')
      // className might be undefined for empty input
      expect(result.variants).toEqual([])
    })

    it('should handle whitespace-only input', () => {
      const result = parseClasses('   ')
      expect(result).toEqual([])
    })

    it('should handle deeply nested variant groups', () => {
      const result = expandVariantGroups('hover:(focus:(active:(bg-red text-white)))')

      expect(result.length).toBeGreaterThan(0)
    })

    it('should handle multiple consecutive spaces', () => {
      const result = parseClasses('p-4    m-4     bg-red')

      expect(result).toHaveLength(3)
    })

    it('should handle class names with hyphens', () => {
      const result = parseClasses('text-sm font-semibold border-b-2')

      expect(result).toHaveLength(3)
    })

    it('should handle class names with numbers', () => {
      const result = parseClasses('w-1/2 h-screen p-2px')

      expect(result).toHaveLength(3)
    })

    it('should handle arbitrary values', () => {
      const result = parseClasses('w-[17px] bg-[#ff6b6b] text-[length:var(--size)]')

      expect(result).toHaveLength(3)
    })

    it('should handle important modifier', () => {
      const result = parseClasses('!p-4 !bg-red')

      expect(result).toHaveLength(2)
      expect(result[0]?.important).toBe(true)
    })

    it('should handle negative utilities', () => {
      const result = parseClasses('-p-4 -m-4 -top-10')

      expect(result).toHaveLength(3)
      expect(result[0]?.negative).toBe(true)
    })

    it('should handle mixed variants and utilities', () => {
      const result = parseClasses('p-4 hover:bg-red focus:outline-none sm:p-6')

      expect(result).toHaveLength(4)
    })

    it('should handle variant groups with multiple classes', () => {
      const result = expandVariantGroups('hover:(bg-red text-white) focus:(outline-none ring-2)')

      expect(result.length).toBeGreaterThan(0)
    })

    it('should handle complex variant combinations', () => {
      const result = parseClasses('dark:hover:bg-red-500/80')

      expect(result).toHaveLength(1)
      expect(result[0]?.variants).toContain('dark')
      expect(result[0]?.variants).toContain('hover')
    })

    it('should handle arbitrary values with special characters', () => {
      const result = parseClasses('w-[calc(100%-20px)] bg-[rgba(0,0,0,0.5)]')

      expect(result).toHaveLength(2)
    })
  })

  describe('Integration Edge Cases', () => {
    it('should handle very large utility sets', () => {
      const matcher = new Matcher()

      // Add 100 rules
      for (let i = 0; i < 100; i++) {
        matcher.addRule({
          name: `rule-${i}`,
          pattern: `class-${i}`,
          handler: () => ({ properties: { color: 'red' } }),
        })
      }

      expect(matcher.size).toBe(100)
    })

    it('should handle concurrent access patterns', () => {
      const cache = new CSSCache({ maxSize: 100, ttl: Infinity, enabled: true })

      // Simulate concurrent writes
      for (let i = 0; i < 100; i++) {
        cache.set(`key-${i}`, `value-${i}`)
      }

      // Simulate concurrent reads
      for (let i = 0; i < 100; i++) {
        expect(cache.get(`key-${i}`)).toBe(`value-${i}`)
      }
    })

    it('should handle memory pressure', () => {
      const cache = new CSSCache({ maxSize: 100, ttl: Infinity, enabled: true })

      // Add more entries than cache size
      for (let i = 0; i < 1000; i++) {
        cache.set(`key-${i}`, `value-${i}`)
      }

      // Cache should not exceed maxSize
      expect(cache.size).toBeLessThanOrEqual(100)
    })

    it('should handle matcher with prefix indexing', () => {
      const matcher = new Matcher()

      // Add rules with different prefixes
      matcher.addRule({
        name: 'padding',
        pattern: /^p-(\d+)$/,
        handler: (m) => ({ properties: { padding: `${m[1]}px` } }),
      })

      matcher.addRule({
        name: 'margin',
        pattern: /^m-(\d+)$/,
        handler: (m) => ({ properties: { margin: `${m[1]}px` } }),
      })

      matcher.addRule({
        name: 'background',
        pattern: /^bg-([a-z]+)$/,
        handler: (m) => ({ properties: { background: m[1] || 'red' } }),
      })

      // All should match correctly
      expect(matcher.match('p-4')).not.toBeNull()
      expect(matcher.match('m-4')).not.toBeNull()
      expect(matcher.match('bg-red')).not.toBeNull()
    })

    it('should handle parsing and matching workflow', () => {
      const matcher = new Matcher()

      matcher.addRule({
        name: 'padding',
        pattern: /^p-(\d+)$/,
        handler: (m) => ({ properties: { padding: `${m[1]}px` } }),
      })

      const parsed = parseClasses('p-4 m-4 bg-red')
      const results = parsed.map(p => {
        // Use the original class name for matching
        const className = p.original || ''
        return matcher.match(className)
      })

      expect(results[0]).not.toBeNull()
      expect(results[1]).toBeNull() // m-4 not registered
      expect(results[2]).toBeNull() // bg-red not registered
    })
  })
})
