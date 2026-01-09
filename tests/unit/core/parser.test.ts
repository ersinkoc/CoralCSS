/**
 * Parser Tests
 */
import { describe, it, expect } from 'vitest'
import {
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
} from '../../../src/core/parser'

describe('Parser', () => {
  describe('parse', () => {
    it('should parse simple utility', () => {
      const result = parse('bg-red-500')
      expect(result.original).toBe('bg-red-500')
      expect(result.variants).toEqual([])
      expect(result.utility).toBe('bg-red-500')
      expect(result.negative).toBe(false)
      expect(result.arbitrary).toBeNull()
    })

    it('should parse utility with single variant', () => {
      const result = parse('hover:bg-red-500')
      expect(result.original).toBe('hover:bg-red-500')
      expect(result.variants).toEqual(['hover'])
      expect(result.utility).toBe('bg-red-500')
      expect(result.negative).toBe(false)
    })

    it('should parse utility with multiple variants', () => {
      const result = parse('dark:hover:bg-red-500')
      expect(result.variants).toEqual(['dark', 'hover'])
      expect(result.utility).toBe('bg-red-500')
    })

    it('should parse negative utility', () => {
      const result = parse('-mt-4')
      expect(result.utility).toBe('mt-4')
      expect(result.negative).toBe(true)
    })

    it('should parse utility with arbitrary value', () => {
      const result = parse('bg-[#ff0000]')
      expect(result.utility).toBe('bg-[#ff0000]')
      expect(result.arbitrary).toBe('#ff0000')
    })

    it('should parse negative utility with variant', () => {
      const result = parse('hover:-translate-x-2')
      expect(result.variants).toEqual(['hover'])
      expect(result.utility).toBe('translate-x-2')
      expect(result.negative).toBe(true)
    })

    it('should parse complex arbitrary values', () => {
      const result = parse('grid-cols-[1fr_2fr_1fr]')
      expect(result.arbitrary).toBe('1fr_2fr_1fr')
    })

    it('should handle CSS custom properties as negative', () => {
      const result = parse('--my-custom-prop')
      // parse() treats -- prefix as negative
      expect(result.negative).toBe(true)
      expect(result.utility).toBe('-my-custom-prop')
    })
  })

  describe('parseClasses', () => {
    it('should parse multiple classes', () => {
      const results = parseClasses('p-4 bg-red-500 text-white')
      expect(results).toHaveLength(3)
      expect(results[0]?.utility).toBe('p-4')
      expect(results[1]?.utility).toBe('bg-red-500')
      expect(results[2]?.utility).toBe('text-white')
    })

    it('should parse classes with variants', () => {
      const results = parseClasses('hover:bg-red-500 dark:text-white')
      expect(results).toHaveLength(2)
      expect(results[0]?.variants).toEqual(['hover'])
      expect(results[1]?.variants).toEqual(['dark'])
    })

    it('should expand variant groups', () => {
      const results = parseClasses('hover:(bg-red-500 text-white)')
      expect(results).toHaveLength(2)
      expect(results[0]?.original).toBe('hover:bg-red-500')
      expect(results[1]?.original).toBe('hover:text-white')
    })

    it('should handle empty string', () => {
      const results = parseClasses('')
      expect(results).toHaveLength(0)
    })

    it('should handle extra whitespace', () => {
      const results = parseClasses('  p-4   m-2  ')
      expect(results).toHaveLength(2)
    })
  })

  describe('expandVariantGroups', () => {
    it('should expand single variant group', () => {
      const result = expandVariantGroups('hover:(bg-red-500 text-white)')
      expect(result).toEqual(['hover:bg-red-500', 'hover:text-white'])
    })

    it('should expand nested variant groups', () => {
      const result = expandVariantGroups('dark:hover:(bg-gray-800 text-white)')
      expect(result).toEqual(['dark:hover:bg-gray-800', 'dark:hover:text-white'])
    })

    it('should handle mixed regular and grouped classes', () => {
      const result = expandVariantGroups('p-4 hover:(bg-red text-white) m-2')
      expect(result).toEqual(['p-4', 'hover:bg-red', 'hover:text-white', 'm-2'])
    })

    it('should handle empty group', () => {
      const result = expandVariantGroups('hover:()')
      expect(result).toEqual([])
    })

    it('should handle malformed group', () => {
      const result = expandVariantGroups('hover:(bg-red')
      expect(result.length).toBeGreaterThan(0)
    })

    it('should handle regular classes without groups', () => {
      const result = expandVariantGroups('p-4 m-2 bg-red-500')
      expect(result).toEqual(['p-4', 'm-2', 'bg-red-500'])
    })
  })

  describe('hasVariants', () => {
    it('should return true for class with variants', () => {
      expect(hasVariants('hover:bg-red-500')).toBe(true)
    })

    it('should return false for class without variants', () => {
      expect(hasVariants('bg-red-500')).toBe(false)
    })

    it('should return false for arbitrary value starting with [', () => {
      expect(hasVariants('[color:red]')).toBe(false)
    })

    it('should return true for multiple variants', () => {
      expect(hasVariants('dark:hover:focus:bg-red-500')).toBe(true)
    })
  })

  describe('isNegative', () => {
    it('should return true for negative class', () => {
      expect(isNegative('-mt-4')).toBe(true)
    })

    it('should return false for positive class', () => {
      expect(isNegative('mt-4')).toBe(false)
    })

    it('should return false for CSS custom properties', () => {
      // isNegative helper correctly handles CSS custom properties
      expect(isNegative('--my-var')).toBe(false)
    })
  })

  describe('hasArbitrary', () => {
    it('should return true for arbitrary value', () => {
      expect(hasArbitrary('bg-[#ff0000]')).toBe(true)
    })

    it('should return false for regular value', () => {
      expect(hasArbitrary('bg-red-500')).toBe(false)
    })

    it('should return true for arbitrary with type hint', () => {
      expect(hasArbitrary('bg-[color:red]')).toBe(true)
    })
  })

  describe('extractUtility', () => {
    it('should extract utility from class with variants', () => {
      expect(extractUtility('hover:bg-red-500')).toBe('bg-red-500')
    })

    it('should return utility for class without variants', () => {
      expect(extractUtility('bg-red-500')).toBe('bg-red-500')
    })

    it('should handle multiple variants', () => {
      expect(extractUtility('dark:hover:focus:bg-red-500')).toBe('bg-red-500')
    })
  })

  describe('extractVariants', () => {
    it('should extract single variant', () => {
      expect(extractVariants('hover:bg-red-500')).toEqual(['hover'])
    })

    it('should extract multiple variants', () => {
      expect(extractVariants('dark:hover:bg-red-500')).toEqual(['dark', 'hover'])
    })

    it('should return empty array for no variants', () => {
      expect(extractVariants('bg-red-500')).toEqual([])
    })
  })

  describe('combineWithVariants', () => {
    it('should combine utility with variants', () => {
      expect(combineWithVariants('bg-red-500', ['hover'])).toBe('hover:bg-red-500')
    })

    it('should combine utility with multiple variants', () => {
      expect(combineWithVariants('bg-red-500', ['dark', 'hover'])).toBe('dark:hover:bg-red-500')
    })

    it('should return utility when no variants', () => {
      expect(combineWithVariants('bg-red-500', [])).toBe('bg-red-500')
    })
  })

  describe('normalizeArbitraryValue', () => {
    it('should replace underscores with spaces', () => {
      expect(normalizeArbitraryValue('1fr_2fr_1fr')).toBe('1fr 2fr 1fr')
    })

    it('should not replace escaped underscores', () => {
      expect(normalizeArbitraryValue('keep\\_this')).toBe('keep\\_this')
    })

    it('should handle no underscores', () => {
      expect(normalizeArbitraryValue('#ff0000')).toBe('#ff0000')
    })
  })

  describe('parseArbitraryValue', () => {
    it('should parse arbitrary value with type hint', () => {
      const result = parseArbitraryValue('[color:red]')
      expect(result).toEqual({ type: 'color', value: 'red' })
    })

    it('should parse arbitrary value without type hint', () => {
      const result = parseArbitraryValue('[#ff0000]')
      expect(result).toEqual({ type: null, value: '#ff0000' })
    })

    it('should return null for invalid format', () => {
      expect(parseArbitraryValue('not-arbitrary')).toBeNull()
    })

    it('should normalize underscores in value', () => {
      const result = parseArbitraryValue('[1fr_2fr]')
      expect(result?.value).toBe('1fr 2fr')
    })

    it('should handle length type hint', () => {
      const result = parseArbitraryValue('[length:100px]')
      expect(result).toEqual({ type: 'length', value: '100px' })
    })
  })

  describe('createClassName', () => {
    it('should create simple class name', () => {
      expect(createClassName('bg-red-500')).toBe('bg-red-500')
    })

    it('should create class name with variants', () => {
      expect(createClassName('bg-red-500', { variants: ['hover'] })).toBe('hover:bg-red-500')
    })

    it('should create negative class name', () => {
      expect(createClassName('mt-4', { negative: true })).toBe('-mt-4')
    })

    it('should create class name with variants and negative', () => {
      expect(createClassName('mt-4', { variants: ['hover'], negative: true })).toBe('hover:-mt-4')
    })

    it('should handle empty options', () => {
      expect(createClassName('p-4', {})).toBe('p-4')
    })
  })
})
