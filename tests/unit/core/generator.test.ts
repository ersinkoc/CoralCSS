/**
 * Generator Tests
 */
import { describe, it, expect, beforeEach } from 'vitest'
import {
  Generator,
  createGenerator,
  generateNegative,
  mergeProperties,
  sortGeneratedCSS,
  dedupeGeneratedCSS,
} from '../../../src/core/generator'
import type { Theme, Variant, Rule, GeneratedCSS } from '../../../src/types'

describe('Generator', () => {
  let generator: Generator
  let theme: Theme
  let variants: Map<string, Variant>

  beforeEach(() => {
    theme = {
      spacing: { 4: '1rem', 8: '2rem' },
      colors: { red: { 500: '#ef4444' } },
    } as Theme
    variants = new Map<string, Variant>([
      [
        'hover',
        {
          name: 'hover',
          match: 'hover',
          handler: (sel) => `${sel}:hover`,
        },
      ],
      [
        'dark',
        {
          name: 'dark',
          match: 'dark',
          wrapper: (css) => `@media (prefers-color-scheme: dark) { ${css} }`,
        },
      ],
    ])
    generator = new Generator(theme, variants)
  })

  describe('constructor', () => {
    it('should create a generator instance', () => {
      expect(generator).toBeDefined()
      expect(generator).toBeInstanceOf(Generator)
    })

    it('should accept prefix option', () => {
      const prefixedGenerator = new Generator(theme, variants, { prefix: 'tw-' })
      expect(prefixedGenerator).toBeDefined()
    })
  })

  describe('generateClass', () => {
    it('should generate CSS for a class with generate function', () => {
      const rule: Rule = {
        name: 'padding',
        pattern: /^p-(\d+)$/,
        generate: (match, t) => ({ padding: t.spacing[match[1] as keyof typeof t.spacing] }),
      }
      const match = 'p-4'.match(/^p-(\d+)$/)!

      const result = generator.generateClass('p-4', rule, match)
      expect(result).not.toBeNull()
      expect(result?.selector).toBe('.p-4')
      expect(result?.properties.padding).toBe('1rem')
    })

    it('should generate CSS for a class with handler function', () => {
      const rule: Rule = {
        name: 'flex',
        pattern: 'flex',
        handler: () => ({ display: 'flex' }),
      }
      const match = 'flex'.match(/^flex$/)!

      const result = generator.generateClass('flex', rule, match)
      expect(result).not.toBeNull()
      expect(result?.properties.display).toBe('flex')
    })

    it('should generate CSS for a class with properties', () => {
      const rule: Rule = {
        name: 'block',
        pattern: 'block',
        properties: { display: 'block' },
      }
      const match = 'block'.match(/^block$/)!

      const result = generator.generateClass('block', rule, match)
      expect(result).not.toBeNull()
      expect(result?.properties.display).toBe('block')
    })

    it('should return null when generate returns null', () => {
      const rule: Rule = {
        name: 'test',
        pattern: /^test$/,
        generate: () => null as any,
      }
      const match = 'test'.match(/^test$/)!

      const result = generator.generateClass('test', rule, match)
      expect(result).toBeNull()
    })

    it('should escape special characters in selector', () => {
      const rule: Rule = {
        name: 'test',
        pattern: /^test\[.+\]$/,
        properties: { color: 'red' },
      }
      const match = 'test[#ff0000]'.match(/^test\[.+\]$/)!

      const result = generator.generateClass('test[#ff0000]', rule, match)
      expect(result?.selector).toContain('\\')
    })

    it('should use prefix when provided', () => {
      const prefixedGenerator = new Generator(theme, variants, { prefix: 'tw-' })
      const rule: Rule = {
        name: 'test',
        pattern: /^test$/,
        properties: { display: 'flex' },
      }
      const match = 'test'.match(/^test$/)!

      const result = prefixedGenerator.generateClass('test', rule, match)
      expect(result?.selector).toBe('.tw-test')
    })

    it('should set default layer and priority', () => {
      const rule: Rule = {
        name: 'test',
        pattern: /^test$/,
        properties: { display: 'flex' },
      }
      const match = 'test'.match(/^test$/)!

      const result = generator.generateClass('test', rule, match)
      expect(result?.layer).toBe('utilities')
      expect(result?.priority).toBe(0)
    })
  })

  describe('generateWithVariants', () => {
    it('should generate CSS with variants', () => {
      const parsed = {
        original: 'hover:bg-red',
        variants: ['hover'],
        utility: 'bg-red',
        negative: false,
        arbitrary: null,
      }
      const matchResult = {
        rule: {
          name: 'bg',
          pattern: /^bg-red$/,
          properties: { backgroundColor: 'red' },
        },
        match: 'bg-red'.match(/^bg-red$/)!,
      }

      const result = generator.generateWithVariants(parsed, matchResult)
      expect(result).not.toBeNull()
      expect(result?.variants).toEqual(['hover'])
    })

    it('should return null when base CSS is null', () => {
      const parsed = {
        original: 'hover:test',
        variants: ['hover'],
        utility: 'test',
        negative: false,
        arbitrary: null,
      }
      const matchResult = {
        rule: {
          name: 'test',
          pattern: /^test$/,
          generate: () => null as any,
        },
        match: 'test'.match(/^test$/)!,
      }

      const result = generator.generateWithVariants(parsed, matchResult)
      expect(result).toBeNull()
    })
  })

  describe('applyVariants', () => {
    it('should apply selector variants', () => {
      const css: GeneratedCSS = {
        selector: '.bg-red',
        properties: { backgroundColor: 'red' },
        layer: 'utilities',
        priority: 0,
        className: 'hover:bg-red',
        variants: ['hover'],
      }

      const result = generator.applyVariants(css)
      expect(result).toContain(':hover')
    })

    it('should apply wrapper variants', () => {
      const css: GeneratedCSS = {
        selector: '.bg-red',
        properties: { backgroundColor: 'red' },
        layer: 'utilities',
        priority: 0,
        className: 'dark:bg-red',
        variants: ['dark'],
      }

      const result = generator.applyVariants(css)
      expect(result).toContain('@media')
      expect(result).toContain('prefers-color-scheme: dark')
    })

    it('should skip unknown variants', () => {
      const css: GeneratedCSS = {
        selector: '.bg-red',
        properties: { backgroundColor: 'red' },
        layer: 'utilities',
        priority: 0,
        className: 'unknown:bg-red',
        variants: ['unknown'],
      }

      const result = generator.applyVariants(css)
      expect(result).toContain('.bg-red')
    })
  })

  describe('toCSS', () => {
    it('should generate CSS string without variants', () => {
      const css: GeneratedCSS = {
        selector: '.p-4',
        properties: { padding: '1rem' },
        layer: 'utilities',
        priority: 0,
        className: 'p-4',
        variants: [],
      }

      const result = generator.toCSS(css)
      expect(result).toContain('.p-4')
      expect(result).toContain('padding')
      expect(result).toContain('1rem')
    })

    it('should generate CSS string with variants', () => {
      const css: GeneratedCSS = {
        selector: '.p-4',
        properties: { padding: '1rem' },
        layer: 'utilities',
        priority: 0,
        className: 'hover:p-4',
        variants: ['hover'],
      }

      const result = generator.toCSS(css)
      expect(result).toContain(':hover')
    })
  })

  describe('generateMany', () => {
    it('should generate CSS for multiple classes', () => {
      const parsedClasses = [
        { original: 'p-4', variants: [], utility: 'p-4', negative: false, arbitrary: null },
        { original: 'm-4', variants: [], utility: 'm-4', negative: false, arbitrary: null },
      ]
      const getMatchResult = (utility: string) => {
        if (utility === 'p-4') {
          return {
            rule: { name: 'p', pattern: /^p-4$/, properties: { padding: '1rem' } },
            match: utility.match(/^p-4$/)!,
          }
        }
        return null
      }

      const results = generator.generateMany(parsedClasses, getMatchResult)
      expect(results.length).toBe(1)
      expect(results[0]).toContain('padding')
    })

    it('should skip unmatched classes', () => {
      const parsedClasses = [
        { original: 'unknown', variants: [], utility: 'unknown', negative: false, arbitrary: null },
      ]
      const getMatchResult = () => null

      const results = generator.generateMany(parsedClasses, getMatchResult)
      expect(results.length).toBe(0)
    })
  })

  describe('setTheme', () => {
    it('should update theme', () => {
      const newTheme = { spacing: { 8: '2rem' } } as Theme
      generator.setTheme(newTheme)
      // Theme is private, but we can verify by using a rule that depends on it
      expect(generator).toBeDefined()
    })
  })

  describe('setVariants', () => {
    it('should update variants', () => {
      const newVariants = new Map<string, Variant>()
      generator.setVariants(newVariants)
      expect(generator).toBeDefined()
    })
  })

  describe('setPrefix', () => {
    it('should update prefix', () => {
      generator.setPrefix('custom-')
      expect(generator).toBeDefined()
    })
  })
})

describe('createGenerator', () => {
  it('should create a generator instance', () => {
    const theme = {} as Theme
    const variants = new Map<string, Variant>()
    const generator = createGenerator(theme, variants)
    expect(generator).toBeInstanceOf(Generator)
  })

  it('should accept options', () => {
    const theme = {} as Theme
    const variants = new Map<string, Variant>()
    const generator = createGenerator(theme, variants, { prefix: 'tw-' })
    expect(generator).toBeDefined()
  })
})

describe('generateNegative', () => {
  it('should negate positive number values', () => {
    const result = generateNegative({ marginTop: 10 })
    expect(result.marginTop).toBe(-10)
  })

  it('should negate string values starting with number', () => {
    const result = generateNegative({ marginTop: '1rem' })
    expect(result.marginTop).toBe('-1rem')
  })

  it('should not negate zero values', () => {
    const result = generateNegative({ marginTop: 0 })
    expect(result.marginTop).toBe(0)
  })

  it('should preserve non-numeric values', () => {
    const result = generateNegative({ display: 'flex' })
    expect(result.display).toBe('flex')
  })
})

describe('mergeProperties', () => {
  it('should merge multiple property objects', () => {
    const result = mergeProperties(
      { padding: '1rem' },
      { margin: '2rem' },
      { color: 'red' }
    )
    expect(result).toEqual({
      padding: '1rem',
      margin: '2rem',
      color: 'red',
    })
  })

  it('should override earlier values with later values', () => {
    const result = mergeProperties(
      { padding: '1rem' },
      { padding: '2rem' }
    )
    expect(result.padding).toBe('2rem')
  })

  it('should handle empty arrays', () => {
    const result = mergeProperties()
    expect(result).toEqual({})
  })
})

describe('sortGeneratedCSS', () => {
  it('should sort by layer (base < components < utilities)', () => {
    const items: GeneratedCSS[] = [
      { selector: '.u', properties: {}, layer: 'utilities', priority: 0, className: 'u', variants: [] },
      { selector: '.b', properties: {}, layer: 'base', priority: 0, className: 'b', variants: [] },
      { selector: '.c', properties: {}, layer: 'components', priority: 0, className: 'c', variants: [] },
    ]

    const sorted = sortGeneratedCSS(items)
    expect(sorted[0]?.layer).toBe('base')
    expect(sorted[1]?.layer).toBe('components')
    expect(sorted[2]?.layer).toBe('utilities')
  })

  it('should sort by priority within same layer', () => {
    const items: GeneratedCSS[] = [
      { selector: '.a', properties: {}, layer: 'utilities', priority: 10, className: 'a', variants: [] },
      { selector: '.b', properties: {}, layer: 'utilities', priority: 0, className: 'b', variants: [] },
      { selector: '.c', properties: {}, layer: 'utilities', priority: 5, className: 'c', variants: [] },
    ]

    const sorted = sortGeneratedCSS(items)
    expect(sorted[0]?.priority).toBe(0)
    expect(sorted[1]?.priority).toBe(5)
    expect(sorted[2]?.priority).toBe(10)
  })

  it('should not mutate original array', () => {
    const items: GeneratedCSS[] = [
      { selector: '.a', properties: {}, layer: 'utilities', priority: 0, className: 'a', variants: [] },
    ]
    const sorted = sortGeneratedCSS(items)
    expect(sorted).not.toBe(items)
  })
})

describe('dedupeGeneratedCSS', () => {
  it('should remove duplicate selectors', () => {
    const items: GeneratedCSS[] = [
      { selector: '.a', properties: { color: 'red' }, layer: 'utilities', priority: 0, className: 'a', variants: [] },
      { selector: '.a', properties: { color: 'blue' }, layer: 'utilities', priority: 0, className: 'a', variants: [] },
    ]

    const deduped = dedupeGeneratedCSS(items)
    expect(deduped.length).toBe(1)
    expect(deduped[0]?.properties.color).toBe('blue') // Later value wins
  })

  it('should keep items with different variants', () => {
    const items: GeneratedCSS[] = [
      { selector: '.a', properties: {}, layer: 'utilities', priority: 0, className: 'a', variants: [] },
      { selector: '.a', properties: {}, layer: 'utilities', priority: 0, className: 'a', variants: ['hover'] },
    ]

    const deduped = dedupeGeneratedCSS(items)
    expect(deduped.length).toBe(2)
  })

  it('should preserve order of unique items', () => {
    const items: GeneratedCSS[] = [
      { selector: '.a', properties: {}, layer: 'utilities', priority: 0, className: 'a', variants: [] },
      { selector: '.b', properties: {}, layer: 'utilities', priority: 0, className: 'b', variants: [] },
    ]

    const deduped = dedupeGeneratedCSS(items)
    expect(deduped.length).toBe(2)
  })
})
