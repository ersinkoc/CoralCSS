/**
 * Core Index Tests
 *
 * Tests for core module exports.
 */
import { describe, it, expect } from 'vitest'
import {
  // Cache
  CSSCache,
  createCache,
  // Parser exports
  parse,
  parseClasses,
  expandVariantGroups,
  hasVariants,
  isNegative,
  hasArbitrary,
  extractUtility,
  extractVariants,
  combineWithVariants,
  normalizeArbitraryValue,
  parseArbitraryValue,
  createClassName,
  // Matcher
  Matcher,
  createMatcher,
  // Generator
  Generator,
  createGenerator,
  generateNegative,
  mergeProperties,
  sortGeneratedCSS,
  dedupeGeneratedCSS,
  // Transformer
  Transformer,
  createTransformer,
  transformToCSS,
  groupBySelector,
  mergeSameSelector,
  createPreflight,
  // Extractor
  Extractor,
  createExtractor,
  extractFromHTML,
  extractClasses,
  // Aliases
  RuleMatcher,
  CSSGenerator,
  CSSTransformer,
  ClassExtractor,
  ClassNameParser,
} from '../../../src/core'

describe('Core Index Exports', () => {
  describe('Cache exports', () => {
    it('should export CSSCache', () => {
      expect(CSSCache).toBeDefined()
    })

    it('should export createCache', () => {
      expect(createCache).toBeDefined()
      expect(typeof createCache).toBe('function')
    })
  })

  describe('Parser exports', () => {
    it('should export parse', () => {
      expect(parse).toBeDefined()
      expect(typeof parse).toBe('function')
    })

    it('should export parseClasses', () => {
      expect(parseClasses).toBeDefined()
    })

    it('should export expandVariantGroups', () => {
      expect(expandVariantGroups).toBeDefined()
    })

    it('should export hasVariants', () => {
      expect(hasVariants).toBeDefined()
    })

    it('should export isNegative', () => {
      expect(isNegative).toBeDefined()
    })

    it('should export hasArbitrary', () => {
      expect(hasArbitrary).toBeDefined()
    })

    it('should export extractUtility', () => {
      expect(extractUtility).toBeDefined()
    })

    it('should export extractVariants', () => {
      expect(extractVariants).toBeDefined()
    })

    it('should export combineWithVariants', () => {
      expect(combineWithVariants).toBeDefined()
    })

    it('should export normalizeArbitraryValue', () => {
      expect(normalizeArbitraryValue).toBeDefined()
    })

    it('should export parseArbitraryValue', () => {
      expect(parseArbitraryValue).toBeDefined()
    })

    it('should export createClassName', () => {
      expect(createClassName).toBeDefined()
    })
  })

  describe('Matcher exports', () => {
    it('should export Matcher', () => {
      expect(Matcher).toBeDefined()
    })

    it('should export createMatcher', () => {
      expect(createMatcher).toBeDefined()
    })
  })

  describe('Generator exports', () => {
    it('should export Generator', () => {
      expect(Generator).toBeDefined()
    })

    it('should export createGenerator', () => {
      expect(createGenerator).toBeDefined()
    })

    it('should export generateNegative', () => {
      expect(generateNegative).toBeDefined()
    })

    it('should export mergeProperties', () => {
      expect(mergeProperties).toBeDefined()
    })

    it('should export sortGeneratedCSS', () => {
      expect(sortGeneratedCSS).toBeDefined()
    })

    it('should export dedupeGeneratedCSS', () => {
      expect(dedupeGeneratedCSS).toBeDefined()
    })
  })

  describe('Transformer exports', () => {
    it('should export Transformer', () => {
      expect(Transformer).toBeDefined()
    })

    it('should export createTransformer', () => {
      expect(createTransformer).toBeDefined()
    })

    it('should export transformToCSS', () => {
      expect(transformToCSS).toBeDefined()
    })

    it('should export groupBySelector', () => {
      expect(groupBySelector).toBeDefined()
    })

    it('should export mergeSameSelector', () => {
      expect(mergeSameSelector).toBeDefined()
    })

    it('should export createPreflight', () => {
      expect(createPreflight).toBeDefined()
    })
  })

  describe('Extractor exports', () => {
    it('should export Extractor', () => {
      expect(Extractor).toBeDefined()
    })

    it('should export createExtractor', () => {
      expect(createExtractor).toBeDefined()
    })

    it('should export extractFromHTML', () => {
      expect(extractFromHTML).toBeDefined()
    })

    it('should export extractClasses', () => {
      expect(extractClasses).toBeDefined()
    })
  })

  describe('Aliases', () => {
    it('should export RuleMatcher as alias for Matcher', () => {
      expect(RuleMatcher).toBe(Matcher)
    })

    it('should export CSSGenerator as its own class', () => {
      // CSSGenerator is now a separate class with built-in caching support
      expect(CSSGenerator).toBeDefined()
      expect(CSSGenerator).not.toBe(Generator)
    })

    it('should export CSSTransformer as alias for Transformer', () => {
      expect(CSSTransformer).toBe(Transformer)
    })

    it('should export ClassExtractor as alias for Extractor', () => {
      expect(ClassExtractor).toBe(Extractor)
    })
  })

  describe('ClassNameParser', () => {
    it('should be a class', () => {
      expect(ClassNameParser).toBeDefined()
      expect(typeof ClassNameParser).toBe('function')
    })

    it('should have parse method', () => {
      const parser = new ClassNameParser()
      expect(typeof parser.parse).toBe('function')
    })

    it('should have parseClasses method', () => {
      const parser = new ClassNameParser()
      expect(typeof parser.parseClasses).toBe('function')
    })

    it('should have expandVariantGroups method', () => {
      const parser = new ClassNameParser()
      expect(typeof parser.expandVariantGroups).toBe('function')
    })

    it('should parse class names correctly', () => {
      const parser = new ClassNameParser()
      const result = parser.parse('hover:bg-red-500')
      expect(result.variants).toEqual(['hover'])
      expect(result.utility).toBe('bg-red-500')
    })

    it('should parse multiple classes correctly', () => {
      const parser = new ClassNameParser()
      const results = parser.parseClasses('p-4 m-2')
      expect(results).toHaveLength(2)
    })

    it('should expand variant groups correctly', () => {
      const parser = new ClassNameParser()
      const results = parser.expandVariantGroups('hover:(bg-red text-white)')
      expect(results).toEqual(['hover:bg-red', 'hover:text-white'])
    })
  })
})
