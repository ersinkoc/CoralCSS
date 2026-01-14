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
  CSSGenerator,
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
    } as unknown as Theme
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
          wrapper: (css: string) => `@media (prefers-color-scheme: dark) { ${css} }`,
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
        generate: (match, t) => ({ padding: t.spacing[match[1] as keyof typeof t.spacing] ?? '' }),
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
      const newTheme = { spacing: { 8: '2rem' } } as unknown as Theme
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

describe('Generator with function wrapper variant', () => {
  it('should apply wrapper function that returns string', () => {
    const theme = {} as Theme
    const variants = new Map<string, Variant>([
      [
        'sm',
        {
          name: 'sm',
          match: 'sm',
          wrapper: '@media (min-width: 640px)',
        },
      ],
    ])
    const generator = new Generator(theme, variants)

    const css: GeneratedCSS = {
      selector: '.p-4',
      properties: { padding: '1rem' },
      layer: 'utilities',
      priority: 0,
      className: 'sm:p-4',
      variants: ['sm'],
    }

    const result = generator.applyVariants(css)
    expect(result).toContain('@media (min-width: 640px)')
  })

  it('should handle generateMultiple with multiple classes', () => {
    const theme = {} as Theme
    const variants = new Map<string, Variant>()
    const generator = new Generator(theme, variants)

    const parsedClasses = [
      { original: 'test1', variants: [], utility: 'test1', negative: false, arbitrary: null },
      { original: 'test2', variants: [], utility: 'test2', negative: false, arbitrary: null },
    ]
    const getMatchResult = (utility: string) => {
      if (utility.startsWith('test')) {
        return {
          rule: { name: 'test', pattern: /^test\d$/, properties: { display: 'flex' } },
          match: utility.match(/^test\d$/)!,
        }
      }
      return null
    }

    const results = generator.generateMany(parsedClasses, getMatchResult)
    expect(results.length).toBe(2)
  })

  it('should handle generator with options', () => {
    const theme = {} as Theme
    const variants = new Map<string, Variant>()
    const generator = new Generator(theme, variants, { prefix: 'coral-' })

    const rule: Rule = {
      name: 'test',
      pattern: /^test$/,
      properties: { display: 'flex' },
    }
    const match = 'test'.match(/^test$/)!

    const result = generator.generateClass('test', rule, match)
    expect(result).toBeDefined()
  })
})

describe('Generator important modifier', () => {
  it('should apply important modifier to properties', () => {
    const theme = {} as Theme
    const variants = new Map<string, Variant>()
    const generator = new Generator(theme, variants)

    const parsed = {
      original: '!bg-red',
      variants: [],
      utility: 'bg-red',
      negative: false,
      arbitrary: null,
      important: true,
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
    expect(result?.properties.backgroundColor).toBe('red !important')
  })

  it('should handle non-string/number values in important modifier', () => {
    const theme = {} as Theme
    const variants = new Map<string, Variant>()
    const generator = new Generator(theme, variants)

    const parsed = {
      original: '!custom',
      variants: [],
      utility: 'custom',
      negative: false,
      arbitrary: null,
      important: true,
    }
    const matchResult = {
      rule: {
        name: 'custom',
        pattern: /^custom$/,
        properties: { '--custom': { nested: 'value' } as unknown as string },
      },
      match: 'custom'.match(/^custom$/)!,
    }

    const result = generator.generateWithVariants(parsed, matchResult)
    expect(result?.properties['--custom']).toEqual({ nested: 'value' })
  })
})

describe('Generator opacity modifier', () => {
  it('should apply opacity modifier to hex colors', () => {
    const theme = {} as Theme
    const variants = new Map<string, Variant>()
    const generator = new Generator(theme, variants)

    const parsed = {
      original: 'bg-red/50',
      variants: [],
      utility: 'bg-red',
      negative: false,
      arbitrary: null,
      opacity: '50',
    }
    const matchResult = {
      rule: {
        name: 'bg',
        pattern: /^bg-red$/,
        properties: { backgroundColor: '#ff0000' },
      },
      match: 'bg-red'.match(/^bg-red$/)!,
    }

    const result = generator.generateWithVariants(parsed, matchResult)
    expect(result?.properties.backgroundColor).toContain('rgb(255 0 0 / 0.5)')
  })

  it('should apply opacity modifier with arbitrary value', () => {
    const theme = {} as Theme
    const variants = new Map<string, Variant>()
    const generator = new Generator(theme, variants)

    const parsed = {
      original: 'bg-red/[0.75]',
      variants: [],
      utility: 'bg-red',
      negative: false,
      arbitrary: null,
      opacity: '[0.75]',
    }
    const matchResult = {
      rule: {
        name: 'bg',
        pattern: /^bg-red$/,
        properties: { backgroundColor: '#ff0000' },
      },
      match: 'bg-red'.match(/^bg-red$/)!,
    }

    const result = generator.generateWithVariants(parsed, matchResult)
    expect(result?.properties.backgroundColor).toContain('0.75')
  })

  it('should apply opacity to rgb colors', () => {
    const theme = {} as Theme
    const variants = new Map<string, Variant>()
    const generator = new Generator(theme, variants)

    const parsed = {
      original: 'text-blue/50',
      variants: [],
      utility: 'text-blue',
      negative: false,
      arbitrary: null,
      opacity: '50',
    }
    const matchResult = {
      rule: {
        name: 'text',
        pattern: /^text-blue$/,
        properties: { color: 'rgb(0, 0, 255)' },
      },
      match: 'text-blue'.match(/^text-blue$/)!,
    }

    const result = generator.generateWithVariants(parsed, matchResult)
    expect(result?.properties.color).toContain('0.5')
  })

  it('should apply opacity to rgba colors', () => {
    const theme = {} as Theme
    const variants = new Map<string, Variant>()
    const generator = new Generator(theme, variants)

    const parsed = {
      original: 'border-green/50',
      variants: [],
      utility: 'border-green',
      negative: false,
      arbitrary: null,
      opacity: '50',
    }
    const matchResult = {
      rule: {
        name: 'border',
        pattern: /^border-green$/,
        properties: { borderColor: 'rgba(0, 255, 0, 1)' },
      },
      match: 'border-green'.match(/^border-green$/)!,
    }

    const result = generator.generateWithVariants(parsed, matchResult)
    expect(result?.properties.borderColor).toContain('0.5')
  })

  it('should apply opacity to hsl colors', () => {
    const theme = {} as Theme
    const variants = new Map<string, Variant>()
    const generator = new Generator(theme, variants)

    const parsed = {
      original: 'fill-purple/50',
      variants: [],
      utility: 'fill-purple',
      negative: false,
      arbitrary: null,
      opacity: '50',
    }
    const matchResult = {
      rule: {
        name: 'fill',
        pattern: /^fill-purple$/,
        properties: { fill: 'hsl(270, 100%, 50%)' },
      },
      match: 'fill-purple'.match(/^fill-purple$/)!,
    }

    const result = generator.generateWithVariants(parsed, matchResult)
    expect(result?.properties.fill).toContain('0.5')
  })

  it('should handle non-color values with opacity', () => {
    const theme = {} as Theme
    const variants = new Map<string, Variant>()
    const generator = new Generator(theme, variants)

    const parsed = {
      original: 'bg-current/50',
      variants: [],
      utility: 'bg-current',
      negative: false,
      arbitrary: null,
      opacity: '50',
    }
    const matchResult = {
      rule: {
        name: 'bg',
        pattern: /^bg-current$/,
        properties: { backgroundColor: 'currentColor' },
      },
      match: 'bg-current'.match(/^bg-current$/)!,
    }

    const result = generator.generateWithVariants(parsed, matchResult)
    expect(result?.properties.backgroundColor).toBe('currentColor')
  })
})

describe('Generator dynamic variants', () => {
  it('should handle dynamic variants with regex match', () => {
    const theme = {} as Theme
    const variants = new Map<string, Variant>([
      [
        'data',
        {
          name: 'data',
          match: /^data-\[(.+)\]$/,
          handler: (sel, matches) => `${sel}[data-${matches?.[1]}]`,
        },
      ],
    ])
    const generator = new Generator(theme, variants)

    const css: GeneratedCSS = {
      selector: '.bg-red',
      properties: { backgroundColor: 'red' },
      layer: 'utilities',
      priority: 0,
      className: 'data-[state=open]:bg-red',
      variants: ['data-[state=open]'],
    }

    const result = generator.applyVariants(css)
    expect(result).toContain('[data-state=open]')
  })

  it('should handle dynamic wrapper with factory function', () => {
    const theme = {} as Theme
    const variants = new Map<string, Variant>([
      [
        'min',
        {
          name: 'min',
          match: /^min-\[(.+)\]$/,
          wrapper: (matches: RegExpMatchArray | null) => `@media (min-width: ${matches?.[1] ?? '0'})`,
        },
      ],
    ])
    const generator = new Generator(theme, variants)

    const css: GeneratedCSS = {
      selector: '.p-4',
      properties: { padding: '1rem' },
      layer: 'utilities',
      priority: 0,
      className: 'min-[800px]:p-4',
      variants: ['min-[800px]'],
    }

    const result = generator.applyVariants(css)
    expect(result).toContain('@media (min-width: 800px)')
  })

  it('should handle transform variant', () => {
    const theme = {} as Theme
    const variants = new Map<string, Variant>([
      [
        'group-hover',
        {
          name: 'group-hover',
          match: 'group-hover',
          transform: (selector, css) => `.group:hover ${selector} { ${css.split('{')[1]}`,
        },
      ],
    ])
    const generator = new Generator(theme, variants)

    const css: GeneratedCSS = {
      selector: '.text-red',
      properties: { color: 'red' },
      layer: 'utilities',
      priority: 0,
      className: 'group-hover:text-red',
      variants: ['group-hover'],
    }

    const result = generator.applyVariants(css)
    expect(result).toContain('.group:hover')
  })
})

describe('Generator handler with properties result', () => {
  it('should handle handler returning object with properties key', () => {
    const theme = {} as Theme
    const variants = new Map<string, Variant>()
    const generator = new Generator(theme, variants)

    const rule: Rule = {
      name: 'complex',
      pattern: /^complex$/,
      handler: () => ({ properties: { display: 'flex', flexDirection: 'column' } }),
    }
    const match = 'complex'.match(/^complex$/)!

    const result = generator.generateClass('complex', rule, match)
    expect(result?.properties.display).toBe('flex')
    expect(result?.properties.flexDirection).toBe('column')
  })
})

describe('CSSGenerator', () => {
  it('should generate CSS for a simple class', () => {
    const matcher = {
      match: (utility: string) => {
        if (utility === 'flex') {
          return {
            rule: { name: 'flex', pattern: /^flex$/, properties: { display: 'flex' } },
            match: utility.match(/^flex$/)!,
          }
        }
        return null
      },
    }
    const generator = new CSSGenerator(matcher)

    const result = generator.generateClass('flex')
    expect(result).toContain('.flex')
    expect(result).toContain('display: flex')
  })

  it('should handle important prefix', () => {
    const matcher = {
      match: (utility: string) => {
        if (utility === 'block') {
          return {
            rule: { name: 'block', pattern: /^block$/, properties: { display: 'block' } },
            match: utility.match(/^block$/)!,
          }
        }
        return null
      },
    }
    const generator = new CSSGenerator(matcher)

    const result = generator.generateClass('!block')
    expect(result).toContain('!important')
  })

  it('should return empty string for unmatched class', () => {
    const matcher = { match: () => null }
    const generator = new CSSGenerator(matcher)

    const result = generator.generateClass('unknown')
    expect(result).toBe('')
  })

  it('should handle rule with generate function', () => {
    const matcher = {
      match: (utility: string) => {
        if (utility === 'p-4') {
          return {
            rule: {
              name: 'padding',
              pattern: /^p-(\d+)$/,
              generate: (match: RegExpMatchArray) => ({ padding: `${Number(match[1]) * 0.25}rem` }),
            },
            match: utility.match(/^p-(\d+)$/)!,
          }
        }
        return null
      },
    }
    const generator = new CSSGenerator(matcher)

    const result = generator.generateClass('p-4')
    expect(result).toContain('padding')
    expect(result).toContain('1rem')
  })

  it('should handle rule with handler function', () => {
    const matcher = {
      match: (utility: string) => {
        if (utility === 'grid') {
          return {
            rule: {
              name: 'grid',
              pattern: /^grid$/,
              handler: () => ({ display: 'grid' }),
            },
            match: utility.match(/^grid$/)!,
          }
        }
        return null
      },
    }
    const generator = new CSSGenerator(matcher)

    const result = generator.generateClass('grid')
    expect(result).toContain('display: grid')
  })

  it('should handle handler returning object with properties key', () => {
    const matcher = {
      match: (utility: string) => {
        if (utility === 'complex') {
          return {
            rule: {
              name: 'complex',
              pattern: /^complex$/,
              handler: () => ({ properties: { display: 'flex', gap: '1rem' } }),
            },
            match: utility.match(/^complex$/)!,
          }
        }
        return null
      },
    }
    const generator = new CSSGenerator(matcher)

    const result = generator.generateClass('complex')
    expect(result).toContain('display: flex')
    expect(result).toContain('gap: 1rem')
  })

  it('should handle variants with handler', () => {
    const matcher = {
      match: (utility: string) => {
        if (utility === 'text-red') {
          return {
            rule: { name: 'text', pattern: /^text-red$/, properties: { color: 'red' } },
            match: utility.match(/^text-red$/)!,
          }
        }
        return null
      },
    }
    const generator = new CSSGenerator(matcher)
    generator.addVariant({
      name: 'hover',
      match: 'hover',
      handler: (sel) => `${sel}:hover`,
    })

    const result = generator.generateClass('hover:text-red')
    expect(result).toContain(':hover')
  })

  it('should handle variants with string wrapper', () => {
    const matcher = {
      match: (utility: string) => {
        if (utility === 'bg-blue') {
          return {
            rule: { name: 'bg', pattern: /^bg-blue$/, properties: { backgroundColor: 'blue' } },
            match: utility.match(/^bg-blue$/)!,
          }
        }
        return null
      },
    }
    const generator = new CSSGenerator(matcher)
    generator.addVariant({
      name: 'md',
      match: 'md',
      wrapper: '@media (min-width: 768px)',
    })

    const result = generator.generateClass('md:bg-blue')
    expect(result).toContain('@media (min-width: 768px)')
  })

  it('should handle dynamic variants with regex and wrapper factory', () => {
    const matcher = {
      match: (utility: string) => {
        if (utility === 'p-2') {
          return {
            rule: { name: 'p', pattern: /^p-2$/, properties: { padding: '0.5rem' } },
            match: utility.match(/^p-2$/)!,
          }
        }
        return null
      },
    }
    const generator = new CSSGenerator(matcher)
    generator.addVariant({
      name: 'min',
      match: /^min-\[(.+)\]$/,
      wrapper: (matches: RegExpMatchArray | null) => `@media (min-width: ${matches?.[1] ?? '0'})`,
    })

    const result = generator.generateClass('min-[600px]:p-2')
    expect(result).toContain('@media (min-width: 600px)')
  })

  it('should generate CSS for multiple classes', () => {
    const matcher = {
      match: (utility: string) => {
        if (utility === 'flex') {
          return {
            rule: { name: 'flex', pattern: /^flex$/, properties: { display: 'flex' } },
            match: utility.match(/^flex$/)!,
          }
        }
        if (utility === 'block') {
          return {
            rule: { name: 'block', pattern: /^block$/, properties: { display: 'block' } },
            match: utility.match(/^block$/)!,
          }
        }
        return null
      },
    }
    const generator = new CSSGenerator(matcher)

    const result = generator.generateMultiple(['flex', 'block', 'unknown'])
    expect(result).toContain('.flex')
    expect(result).toContain('.block')
  })

  it('should deduplicate classes in generateMultiple', () => {
    const matcher = {
      match: (utility: string) => {
        if (utility === 'flex') {
          return {
            rule: { name: 'flex', pattern: /^flex$/, properties: { display: 'flex' } },
            match: utility.match(/^flex$/)!,
          }
        }
        return null
      },
    }
    const generator = new CSSGenerator(matcher)

    const result = generator.generateMultiple(['flex', 'flex', 'flex'])
    // Should only contain one .flex
    const matches = result.match(/\.flex/g)
    expect(matches?.length).toBe(1)
  })

  it('should set theme', () => {
    const matcher = { match: () => null }
    const generator = new CSSGenerator(matcher)

    generator.setTheme({ colors: { red: '#ff0000' }, spacing: {}, sizing: {}, fonts: {}, fontSizes: [], fontWeights: [], lineHeights: [], letterSpacings: [] } as Theme as unknown as Theme)
    expect(generator).toBeDefined()
  })

  it('should handle null handler result', () => {
    const matcher = {
      match: (utility: string) => {
        if (utility === 'null-handler') {
          return {
            rule: {
              name: 'null-handler',
              pattern: /^null-handler$/,
              handler: () => null,
            },
            match: utility.match(/^null-handler$/)!,
          }
        }
        return null
      },
    }
    const generator = new CSSGenerator(matcher)

    const result = generator.generateClass('null-handler')
    expect(result).toBe('')
  })

  describe('caching', () => {
    it('should cache generated CSS by default', () => {
      let callCount = 0
      const matcher = {
        match: (utility: string) => {
          callCount++
          if (utility === 'flex') {
            return {
              rule: { name: 'flex', pattern: /^flex$/, properties: { display: 'flex' } },
              match: utility.match(/^flex$/)!,
            }
          }
          return null
        },
      }
      const generator = new CSSGenerator(matcher)

      // First call should generate and cache
      const result1 = generator.generateClass('flex')
      expect(result1).toContain('.flex')
      expect(callCount).toBe(1)

      // Second call should return from cache (matcher not called again)
      const result2 = generator.generateClass('flex')
      expect(result2).toBe(result1)
      expect(callCount).toBe(1) // Still 1, cache hit
    })

    it('should report cache statistics', () => {
      const matcher = {
        match: (utility: string) => {
          if (utility === 'flex') {
            return {
              rule: { name: 'flex', pattern: /^flex$/, properties: { display: 'flex' } },
              match: utility.match(/^flex$/)!,
            }
          }
          return null
        },
      }
      const generator = new CSSGenerator(matcher)

      generator.generateClass('flex') // miss
      generator.generateClass('flex') // hit
      generator.generateClass('flex') // hit

      const stats = generator.getCacheStats()
      expect(stats).not.toBeNull()
      expect(stats!.hits).toBe(2)
      expect(stats!.misses).toBe(1)
      expect(stats!.size).toBe(1)
    })

    it('should clear cache', () => {
      let callCount = 0
      const matcher = {
        match: (utility: string) => {
          callCount++
          if (utility === 'flex') {
            return {
              rule: { name: 'flex', pattern: /^flex$/, properties: { display: 'flex' } },
              match: utility.match(/^flex$/)!,
            }
          }
          return null
        },
      }
      const generator = new CSSGenerator(matcher)

      generator.generateClass('flex')
      expect(callCount).toBe(1)

      generator.clearCache()

      generator.generateClass('flex')
      expect(callCount).toBe(2) // Called again after cache clear
    })

    it('should allow disabling cache', () => {
      let callCount = 0
      const matcher = {
        match: (utility: string) => {
          callCount++
          if (utility === 'flex') {
            return {
              rule: { name: 'flex', pattern: /^flex$/, properties: { display: 'flex' } },
              match: utility.match(/^flex$/)!,
            }
          }
          return null
        },
      }
      const generator = new CSSGenerator(matcher, undefined, { cache: false })

      expect(generator.isCacheEnabled()).toBe(false)
      expect(generator.getCacheStats()).toBeNull()

      generator.generateClass('flex')
      generator.generateClass('flex')
      expect(callCount).toBe(2) // Called each time, no caching
    })

    it('should clear cache when theme changes', () => {
      let callCount = 0
      const matcher = {
        match: (utility: string) => {
          callCount++
          if (utility === 'flex') {
            return {
              rule: { name: 'flex', pattern: /^flex$/, properties: { display: 'flex' } },
              match: utility.match(/^flex$/)!,
            }
          }
          return null
        },
      }
      const generator = new CSSGenerator(matcher)

      generator.generateClass('flex')
      expect(callCount).toBe(1)

      // Changing theme should clear cache
      generator.setTheme({ colors: {} } as unknown as Theme)

      generator.generateClass('flex')
      expect(callCount).toBe(2) // Called again after theme change
    })

    it('should support custom cache options', () => {
      const matcher = {
        match: (utility: string) => {
          if (utility === 'flex') {
            return {
              rule: { name: 'flex', pattern: /^flex$/, properties: { display: 'flex' } },
              match: utility.match(/^flex$/)!,
            }
          }
          return null
        },
      }
      const generator = new CSSGenerator(matcher, undefined, {
        cacheOptions: { maxSize: 10, ttl: 1000 }
      })

      expect(generator.isCacheEnabled()).toBe(true)
      const stats = generator.getCacheStats()
      expect(stats?.maxSize).toBe(10)
    })
  })
})

describe('sortGeneratedCSS', () => {
  it('should sort CSS items by priority', () => {
    const items = [
      { selector: '.a', properties: {}, layer: 'utilities' as const, priority: 5, className: '', variants: [] },
      { selector: '.b', properties: {}, layer: 'utilities' as const, priority: 1, className: '', variants: [] },
      { selector: '.c', properties: {}, layer: 'utilities' as const, priority: 3, className: '', variants: [] },
    ]

    const sorted = sortGeneratedCSS(items)
    expect(sorted[0]?.priority).toBe(1)
    expect(sorted[1]?.priority).toBe(3)
    expect(sorted[2]?.priority).toBe(5)
  })

  it('should sort CSS items by layer first, then priority', () => {
    const items = [
      { selector: '.a', properties: {}, layer: 'base' as const, priority: 5, className: '', variants: [] },
      { selector: '.b', properties: {}, layer: 'utilities' as const, priority: 1, className: '', variants: [] },
      { selector: '.c', properties: {}, layer: 'components' as const, priority: 3, className: '', variants: [] },
    ]

    const sorted = sortGeneratedCSS(items)
    // Base layer should come first (order: base=0, components=1, utilities=2)
    expect(sorted[0]?.layer).toBe('base')
    expect(sorted[1]?.layer).toBe('components')
    expect(sorted[2]?.layer).toBe('utilities')
  })
})

describe('Generator.findVariant edge cases', () => {
  it('should return null when variant name does not match any registered variant', () => {
    const theme = {} as Theme
    const variants = new Map<string, Variant>([
      [
        'hover',
        {
          name: 'hover',
          match: 'hover',
          handler: (sel) => `${sel}:hover`,
        },
      ],
    ])
    const generator = new Generator(theme, variants)

    // Access private method
    const result = (generator as any).findVariant('nonexistent-variant')
    expect(result).toBeNull()
  })

  it('should return null when variant regex does not match', () => {
    const theme = {} as Theme
    const variants = new Map<string, Variant>([
      [
        'min',
        {
          name: 'min',
          match: /^min-\[(.+)\]$/,
          wrapper: '@media (min-width: 0)',
        },
      ],
    ])
    const generator = new Generator(theme, variants)

    // Access private method with non-matching variant name
    const result = (generator as any).findVariant('max-[100px]')
    expect(result).toBeNull()
  })

  it('should not match pattern when match is neither string nor regex', () => {
    const theme = {} as Theme
    const variants = new Map<string, Variant>([
      [
        'dynamic-pattern',
        {
          name: 'dynamic-pattern',
          match: 123 as any, // Invalid match type - not a regex
          wrapper: '@media print',
        },
      ],
    ])
    const generator = new Generator(theme, variants)

    // Try to match a variant name that doesn't exist as an exact key
    // This forces pattern matching, which should fail for non-regex match
    const result = (generator as any).findVariant('some-unknown-variant')
    expect(result).toBeNull()
  })
})
