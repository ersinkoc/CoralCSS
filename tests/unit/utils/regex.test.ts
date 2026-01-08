/**
 * Regex Utilities Tests
 */
import { describe, it, expect } from 'vitest'
import {
  escapeRegex,
  createPattern,
  anchorPattern,
  createUtilityPattern,
  createColorPattern,
  createSpacingPattern,
  createArbitraryPattern,
  extractArbitraryValue,
  hasArbitraryValue,
  VARIANT_PREFIX_PATTERN,
  VARIANT_GROUP_PATTERN,
  NEGATIVE_PATTERN,
  CLASS_ATTR_PATTERN,
  TEMPLATE_CLASS_PATTERN,
  DATA_ATTR_PATTERN,
  ARIA_PATTERN,
  RESPONSIVE_PATTERN,
  CONTAINER_QUERY_PATTERN,
} from '../../../src/utils/regex'

describe('Regex Utilities', () => {
  describe('escapeRegex', () => {
    it('should escape brackets', () => {
      expect(escapeRegex('p-[4px]')).toBe('p-\\[4px\\]')
    })

    it('should escape dots', () => {
      expect(escapeRegex('text.lg')).toBe('text\\.lg')
    })

    it('should escape forward slashes', () => {
      // Note: forward slash is not a special regex character
      expect(escapeRegex('1/2')).toBe('1/2')
    })

    it('should escape asterisks', () => {
      expect(escapeRegex('*')).toBe('\\*')
    })

    it('should escape plus', () => {
      expect(escapeRegex('a+b')).toBe('a\\+b')
    })

    it('should escape question marks', () => {
      expect(escapeRegex('a?b')).toBe('a\\?b')
    })

    it('should escape parentheses', () => {
      expect(escapeRegex('calc(100%)')).toBe('calc\\(100%\\)')
    })

    it('should escape pipe', () => {
      expect(escapeRegex('a|b')).toBe('a\\|b')
    })

    it('should escape curly braces', () => {
      expect(escapeRegex('a{2}')).toBe('a\\{2\\}')
    })

    it('should escape caret and dollar', () => {
      expect(escapeRegex('^start$')).toBe('\\^start\\$')
    })
  })

  describe('createPattern', () => {
    it('should create anchored pattern', () => {
      const pattern = createPattern('p-4')
      expect(pattern.test('p-4')).toBe(true)
      expect(pattern.test('ap-4')).toBe(false)
      expect(pattern.test('p-4b')).toBe(false)
    })

    it('should support wildcards', () => {
      const pattern = createPattern('bg-*')
      expect(pattern.test('bg-red')).toBe(true)
      expect(pattern.test('bg-red-500')).toBe(true)
      expect(pattern.test('bg-')).toBe(true)
    })

    it('should escape special characters', () => {
      const pattern = createPattern('bg-[#ff0000]')
      expect(pattern.test('bg-[#ff0000]')).toBe(true)
      expect(pattern.test('bg-#ff0000')).toBe(false)
    })

    it('should support flags', () => {
      const pattern = createPattern('test', 'i')
      expect(pattern.test('TEST')).toBe(true)
      expect(pattern.test('test')).toBe(true)
    })
  })

  describe('anchorPattern', () => {
    it('should anchor string pattern', () => {
      const pattern = anchorPattern('p-\\d+')
      expect(pattern.test('p-4')).toBe(true)
      expect(pattern.test('ap-4')).toBe(false)
    })

    it('should anchor RegExp without anchors', () => {
      const pattern = anchorPattern(/p-\d+/)
      expect(pattern.test('p-4')).toBe(true)
      expect(pattern.test('ap-4')).toBe(false)
    })

    it('should not double-anchor already anchored pattern', () => {
      const original = /^p-\d+$/
      const anchored = anchorPattern(original)
      expect(anchored.source).toBe(original.source)
    })

    it('should preserve flags', () => {
      const pattern = anchorPattern(/test/i)
      expect(pattern.test('TEST')).toBe(true)
    })

    it('should handle pattern with only start anchor', () => {
      const pattern = anchorPattern(/^p-\d+/)
      expect(pattern.source).toBe('^p-\\d+$')
    })

    it('should handle pattern with only end anchor', () => {
      const pattern = anchorPattern(/p-\d+$/)
      expect(pattern.source).toBe('^p-\\d+$')
    })
  })

  describe('createUtilityPattern', () => {
    it('should create pattern with sides', () => {
      const pattern = createUtilityPattern('p', ['t', 'r', 'b', 'l', 'x', 'y'], '\\d+')

      expect(pattern.test('p-4')).toBe(true)
      expect(pattern.test('pt-4')).toBe(true)
      expect(pattern.test('pr-4')).toBe(true)
      expect(pattern.test('pb-4')).toBe(true)
      expect(pattern.test('pl-4')).toBe(true)
      expect(pattern.test('px-4')).toBe(true)
      expect(pattern.test('py-4')).toBe(true)
    })

    it('should create pattern without sides', () => {
      const pattern = createUtilityPattern('opacity', null, '\\d+')

      expect(pattern.test('opacity-50')).toBe(true)
      expect(pattern.test('opacityt-50')).toBe(false)
    })

    it('should create pattern with empty sides array', () => {
      const pattern = createUtilityPattern('w', [], '\\d+')

      expect(pattern.test('w-4')).toBe(true)
    })
  })

  describe('createColorPattern', () => {
    it('should match color with shade', () => {
      const pattern = createColorPattern('bg')

      expect(pattern.test('bg-red-500')).toBe(true)
      expect(pattern.test('bg-blue-100')).toBe(true)
    })

    it('should match arbitrary color', () => {
      const pattern = createColorPattern('text')

      expect(pattern.test('text-[#ff0000]')).toBe(true)
      expect(pattern.test('text-[rgb(255,0,0)]')).toBe(true)
    })

    it('should match special color values', () => {
      const pattern = createColorPattern('border')

      expect(pattern.test('border-inherit')).toBe(true)
      expect(pattern.test('border-current')).toBe(true)
      expect(pattern.test('border-transparent')).toBe(true)
      expect(pattern.test('border-black')).toBe(true)
      expect(pattern.test('border-white')).toBe(true)
    })
  })

  describe('createSpacingPattern', () => {
    it('should match numeric spacing', () => {
      const pattern = createSpacingPattern('p', ['t', 'r', 'b', 'l', 'x', 'y'])

      expect(pattern.test('p-4')).toBe(true)
      expect(pattern.test('pt-4')).toBe(true)
      expect(pattern.test('p-0.5')).toBe(true)
    })

    it('should match special values', () => {
      const pattern = createSpacingPattern('m', ['t', 'r', 'b', 'l', 'x', 'y'])

      expect(pattern.test('m-px')).toBe(true)
      expect(pattern.test('m-auto')).toBe(true)
      expect(pattern.test('m-full')).toBe(true)
    })

    it('should match arbitrary values', () => {
      const pattern = createSpacingPattern('gap', [])

      expect(pattern.test('gap-[20px]')).toBe(true)
      expect(pattern.test('gap-[calc(100%-20px)]')).toBe(true)
    })
  })

  describe('createArbitraryPattern', () => {
    it('should match arbitrary values', () => {
      const pattern = createArbitraryPattern('bg')

      expect(pattern.test('bg-[#ff0000]')).toBe(true)
      expect(pattern.test('bg-[rgb(255,0,0)]')).toBe(true)
    })

    it('should not match non-arbitrary values', () => {
      const pattern = createArbitraryPattern('bg')

      expect(pattern.test('bg-red-500')).toBe(false)
    })
  })

  describe('extractArbitraryValue', () => {
    it('should extract hex color', () => {
      expect(extractArbitraryValue('bg-[#ff0000]')).toBe('#ff0000')
    })

    it('should extract calc value', () => {
      expect(extractArbitraryValue('w-[calc(100%-20px)]')).toBe('calc(100%-20px)')
    })

    it('should extract rgb value', () => {
      expect(extractArbitraryValue('text-[rgb(255,0,0)]')).toBe('rgb(255,0,0)')
    })

    it('should return null for non-arbitrary value', () => {
      expect(extractArbitraryValue('bg-red-500')).toBeNull()
    })
  })

  describe('hasArbitraryValue', () => {
    it('should return true for arbitrary value', () => {
      expect(hasArbitraryValue('bg-[#ff0000]')).toBe(true)
      expect(hasArbitraryValue('w-[calc(100%)]')).toBe(true)
    })

    it('should return false for non-arbitrary value', () => {
      expect(hasArbitraryValue('bg-red-500')).toBe(false)
      expect(hasArbitraryValue('p-4')).toBe(false)
    })
  })

  describe('Patterns', () => {
    describe('VARIANT_PREFIX_PATTERN', () => {
      it('should match variant prefix', () => {
        expect('hover:bg-red-500'.match(VARIANT_PREFIX_PATTERN)?.[1]).toBe('hover')
        expect('focus-visible:bg-red-500'.match(VARIANT_PREFIX_PATTERN)?.[1]).toBe('focus-visible')
      })
    })

    describe('VARIANT_GROUP_PATTERN', () => {
      it('should match variant groups', () => {
        const str = 'hover:(bg-red-500 text-white)'
        const matches = [...str.matchAll(VARIANT_GROUP_PATTERN)]
        expect(matches.length).toBe(1)
        expect(matches[0]?.[1]).toBe('hover')
        expect(matches[0]?.[2]).toBe('bg-red-500 text-white')
      })
    })

    describe('NEGATIVE_PATTERN', () => {
      it('should match negative utilities', () => {
        expect('-mt-4'.match(NEGATIVE_PATTERN)?.[1]).toBe('mt-4')
        expect('-translate-x-4'.match(NEGATIVE_PATTERN)?.[1]).toBe('translate-x-4')
      })

      it('should not match non-negative utilities', () => {
        expect('mt-4'.match(NEGATIVE_PATTERN)).toBeNull()
      })
    })

    describe('CLASS_ATTR_PATTERN', () => {
      it('should match class attribute', () => {
        const html = 'class="p-4 bg-red-500"'
        const matches = [...html.matchAll(CLASS_ATTR_PATTERN)]
        expect(matches[0]?.[1]).toBe('p-4 bg-red-500')
      })

      it('should match className attribute', () => {
        const jsx = 'className="p-4 bg-red-500"'
        const matches = [...jsx.matchAll(CLASS_ATTR_PATTERN)]
        expect(matches[0]?.[1]).toBe('p-4 bg-red-500')
      })
    })

    describe('TEMPLATE_CLASS_PATTERN', () => {
      it('should match template literal class', () => {
        const jsx = "className={`p-4 bg-red-500`}"
        const matches = [...jsx.matchAll(TEMPLATE_CLASS_PATTERN)]
        expect(matches[0]?.[1]).toBe('p-4 bg-red-500')
      })
    })

    describe('DATA_ATTR_PATTERN', () => {
      it('should match data attribute', () => {
        expect('data-[state]'.match(DATA_ATTR_PATTERN)?.[1]).toBe('state')
      })
    })

    describe('ARIA_PATTERN', () => {
      it('should match aria attribute', () => {
        expect('aria-expanded'.match(ARIA_PATTERN)?.[1]).toBe('expanded')
        expect('aria-hidden'.match(ARIA_PATTERN)?.[1]).toBe('hidden')
      })
    })

    describe('RESPONSIVE_PATTERN', () => {
      it('should match responsive variants', () => {
        expect(RESPONSIVE_PATTERN.test('sm')).toBe(true)
        expect(RESPONSIVE_PATTERN.test('md')).toBe(true)
        expect(RESPONSIVE_PATTERN.test('lg')).toBe(true)
        expect(RESPONSIVE_PATTERN.test('xl')).toBe(true)
        expect(RESPONSIVE_PATTERN.test('2xl')).toBe(true)
      })

      it('should match max variants', () => {
        expect(RESPONSIVE_PATTERN.test('max-sm')).toBe(true)
        expect(RESPONSIVE_PATTERN.test('max-md')).toBe(true)
      })

      it('should not match invalid variants', () => {
        expect(RESPONSIVE_PATTERN.test('3xl')).toBe(false)
        expect(RESPONSIVE_PATTERN.test('hover')).toBe(false)
      })
    })

    describe('CONTAINER_QUERY_PATTERN', () => {
      it('should match container query variants', () => {
        expect(CONTAINER_QUERY_PATTERN.test('@sm')).toBe(true)
        expect(CONTAINER_QUERY_PATTERN.test('@md')).toBe(true)
        expect(CONTAINER_QUERY_PATTERN.test('@lg')).toBe(true)
        expect(CONTAINER_QUERY_PATTERN.test('@xl')).toBe(true)
        expect(CONTAINER_QUERY_PATTERN.test('@2xl')).toBe(true)
        expect(CONTAINER_QUERY_PATTERN.test('@7xl')).toBe(true)
      })

      it('should not match invalid patterns', () => {
        expect(CONTAINER_QUERY_PATTERN.test('sm')).toBe(false)
        expect(CONTAINER_QUERY_PATTERN.test('@invalid')).toBe(false)
      })
    })
  })
})
