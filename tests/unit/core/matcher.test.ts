/**
 * Matcher Tests
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { Matcher, createMatcher } from '../../../src/core/matcher'

describe('Matcher', () => {
  let matcher: Matcher

  beforeEach(() => {
    matcher = new Matcher()
  })

  describe('constructor', () => {
    it('should create a matcher instance', () => {
      expect(matcher).toBeDefined()
      expect(matcher).toBeInstanceOf(Matcher)
    })
  })

  describe('addRule', () => {
    it('should add a rule with RegExp pattern', () => {
      matcher.addRule({
        name: 'padding',
        pattern: /^p-(\d+)$/,
        generate: (match) => ({ padding: `${match[1]}px` }),
      })
      expect(matcher.hasRule('padding')).toBe(true)
    })

    it('should add a rule with string pattern', () => {
      matcher.addRule({
        name: 'flex',
        pattern: 'flex',
        generate: () => ({ display: 'flex' }),
      })
      expect(matcher.hasRule('flex')).toBe(true)
    })

    it('should generate name for anonymous rule', () => {
      matcher.addRule({
        pattern: /^bg-/,
        generate: () => ({}),
      })
      expect(matcher.getRules().length).toBe(1)
    })

    it('should set default priority', () => {
      matcher.addRule({
        name: 'test',
        pattern: /^test$/,
        generate: () => ({}),
      })
      const rule = matcher.getRule('test')
      expect(rule?.priority).toBe(0)
    })

    it('should set default layer', () => {
      matcher.addRule({
        name: 'test',
        pattern: /^test$/,
        generate: () => ({}),
      })
      const rule = matcher.getRule('test')
      expect(rule?.layer).toBe('utilities')
    })

    it('should respect custom priority', () => {
      matcher.addRule({
        name: 'important',
        pattern: /^important$/,
        generate: () => ({}),
        priority: 100,
      })
      const rule = matcher.getRule('important')
      expect(rule?.priority).toBe(100)
    })
  })

  describe('addRules', () => {
    it('should add multiple rules', () => {
      matcher.addRules([
        { name: 'rule1', pattern: /^rule1$/, generate: () => ({}) },
        { name: 'rule2', pattern: /^rule2$/, generate: () => ({}) },
      ])
      expect(matcher.hasRule('rule1')).toBe(true)
      expect(matcher.hasRule('rule2')).toBe(true)
    })
  })

  describe('removeRule', () => {
    it('should remove an existing rule', () => {
      matcher.addRule({ name: 'test', pattern: /^test$/, generate: () => ({}) })
      expect(matcher.hasRule('test')).toBe(true)
      const removed = matcher.removeRule('test')
      expect(removed).toBe(true)
      expect(matcher.hasRule('test')).toBe(false)
    })

    it('should return false for non-existent rule', () => {
      const removed = matcher.removeRule('nonexistent')
      expect(removed).toBe(false)
    })

    it('should invalidate cache when rule is removed', () => {
      // Add a rule and match against it (using pattern that includes exact match)
      matcher.addRule({ name: 'cache-test', pattern: /^cachetest$/, generate: () => ({ color: 'red' }) })
      const match1 = matcher.match('cachetest')
      expect(match1).not.toBeNull()

      // Remove the rule
      matcher.removeRule('cache-test')

      // Match should now return null since cache is invalidated and rule is gone
      const match2 = matcher.match('cachetest')
      expect(match2).toBeNull()
    })
  })

  describe('getRule', () => {
    it('should get a rule by name', () => {
      matcher.addRule({ name: 'padding', pattern: /^p-/, generate: () => ({}) })
      const rule = matcher.getRule('padding')
      expect(rule).toBeDefined()
      expect(rule?.name).toBe('padding')
    })

    it('should return undefined for non-existent rule', () => {
      const rule = matcher.getRule('nonexistent')
      expect(rule).toBeUndefined()
    })
  })

  describe('hasRule', () => {
    it('should return true for existing rule', () => {
      matcher.addRule({ name: 'test', pattern: /^test$/, generate: () => ({}) })
      expect(matcher.hasRule('test')).toBe(true)
    })

    it('should return false for non-existent rule', () => {
      expect(matcher.hasRule('nonexistent')).toBe(false)
    })
  })

  describe('getRules', () => {
    it('should return all rules', () => {
      matcher.addRule({ name: 'rule1', pattern: /^rule1$/, generate: () => ({}) })
      matcher.addRule({ name: 'rule2', pattern: /^rule2$/, generate: () => ({}) })
      const rules = matcher.getRules()
      expect(rules).toHaveLength(2)
    })

    it('should return empty array when no rules', () => {
      const rules = matcher.getRules()
      expect(rules).toEqual([])
    })
  })

  describe('match', () => {
    beforeEach(() => {
      matcher.addRule({
        name: 'padding',
        pattern: /^p-(\d+)$/,
        generate: (match) => ({ padding: `${match[1]}px` }),
      })
      matcher.addRule({
        name: 'margin',
        pattern: /^m-(\d+)$/,
        generate: (match) => ({ margin: `${match[1]}px` }),
      })
    })

    it('should match a utility', () => {
      const result = matcher.match('p-4')
      expect(result).not.toBeNull()
      expect(result?.rule.name).toBe('padding')
      expect(result?.match[1]).toBe('4')
    })

    it('should return null for no match', () => {
      const result = matcher.match('unknown-class')
      expect(result).toBeNull()
    })

    it('should cache match results', () => {
      // First match
      const result1 = matcher.match('p-4')
      // Second match should use cache
      const result2 = matcher.match('p-4')
      expect(result1).toEqual(result2)
    })

    it('should match with highest priority first', () => {
      matcher.addRule({
        name: 'priority-high',
        pattern: /^p-\d+$/,
        generate: () => ({}),
        priority: 100,
      })
      const result = matcher.match('p-4')
      expect(result?.rule.name).toBe('priority-high')
    })

    it('should handle match with no rules', () => {
      const emptyMatcher = new Matcher()
      const result = emptyMatcher.match('anything')
      expect(result).toBeNull()
    })
  })

  describe('matchAll', () => {
    beforeEach(() => {
      matcher.addRule({
        name: 'padding',
        pattern: /^p-(\d+)$/,
        generate: (match) => ({ padding: `${match[1]}px` }),
      })
    })

    it('should return map of results for multiple utilities', () => {
      const results = matcher.matchAll(['p-4', 'm-4'])
      expect(results).toBeInstanceOf(Map)
      expect(results.size).toBe(2)
      expect(results.get('p-4')).not.toBeNull()
      expect(results.get('m-4')).toBeNull() // no margin rule
    })

    it('should return empty map for empty array', () => {
      const results = matcher.matchAll([])
      expect(results.size).toBe(0)
    })
  })

  describe('clear', () => {
    it('should clear all rules', () => {
      matcher.addRule({ name: 'test', pattern: /^test$/, generate: () => ({}) })
      matcher.clear()
      expect(matcher.getRules()).toEqual([])
    })

    it('should invalidate cache after clearing', () => {
      matcher.addRule({ name: 'test', pattern: /^test$/, generate: () => ({ color: 'red' }) })
      const match1 = matcher.match('test')
      expect(match1).not.toBeNull()

      matcher.clear()
      const match2 = matcher.match('test')
      expect(match2).toBeNull()
    })

    it('should clear match cache', () => {
      matcher.addRule({ name: 'test', pattern: /^test$/, generate: () => ({ color: 'red' }) })
      matcher.match('test')
      expect(matcher.size).toBe(1)

      matcher.clear()
      expect(matcher.size).toBe(0)
    })
  })

  describe('size', () => {
    it('should return number of rules', () => {
      expect(matcher.size).toBe(0)
      matcher.addRule({ name: 'test', pattern: /^test$/, generate: () => ({}) })
      expect(matcher.size).toBe(1)
    })

    it('should return 0 for new matcher', () => {
      const newMatcher = new Matcher()
      expect(newMatcher.size).toBe(0)
    })
  })
})

describe('createMatcher', () => {
  it('should create a matcher instance', () => {
    const matcher = createMatcher()
    expect(matcher).toBeInstanceOf(Matcher)
  })

  it('should create a matcher with no rules', () => {
    const matcher = createMatcher()
    expect(matcher.size).toBe(0)
    expect(matcher.getRules()).toEqual([])
  })

  it('should be equivalent to new Matcher()', () => {
    const matcher1 = createMatcher()
    const matcher2 = new Matcher()
    expect(matcher1.size).toBe(matcher2.size)
  })

  it('should create a fresh matcher each time', () => {
    const matcher1 = createMatcher()
    const matcher2 = createMatcher()
    // They should be different instances
    expect(matcher1).not.toBe(matcher2)
  })

  it('should have same methods as new Matcher()', () => {
    const matcher = createMatcher()
    expect(typeof matcher.addRule).toBe('function')
    expect(typeof matcher.match).toBe('function')
    expect(typeof matcher.matchAll).toBe('function')
    expect(typeof matcher.removeRule).toBe('function')
    expect(typeof matcher.clear).toBe('function')
  })

  it('should work with addRule', () => {
    const matcher = createMatcher()
    matcher.addRule({ name: 'test', pattern: /^test$/, generate: () => ({ display: 'block' }) })
    expect(matcher.size).toBe(1)
  })

  it('should work with match', () => {
    const matcher = createMatcher()
    matcher.addRule({ name: 'flex', pattern: /^flex$/, generate: () => ({ display: 'flex' }) })
    const result = matcher.match('flex')
    expect(result).not.toBeNull()
  })

  it('should work with clear', () => {
    const matcher = createMatcher()
    matcher.addRule({ name: 'test', pattern: /^test$/, generate: () => ({}) })
    expect(matcher.size).toBe(1)
    matcher.clear()
    expect(matcher.size).toBe(0)
  })

  it('should work with removeRule', () => {
    const matcher = createMatcher()
    matcher.addRule({ name: 'test', pattern: /^test$/, generate: () => ({}) })
    expect(matcher.size).toBe(1)
    const removed = matcher.removeRule('test')
    expect(removed).toBe(true)
    expect(matcher.size).toBe(0)
  })
})

describe('Edge Cases', () => {
  it('should handle clear when no rules exist', () => {
    const newMatcher = new Matcher()
    expect(() => newMatcher.clear()).not.toThrow()
    expect(newMatcher.size).toBe(0)
  })
})
