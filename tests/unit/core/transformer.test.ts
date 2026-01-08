/**
 * CSS Transformer Tests
 */
import { describe, it, expect } from 'vitest'
import {
  Transformer,
  createTransformer,
  transformToCSS,
  groupBySelector,
  mergeSameSelector,
  createPreflight,
} from '../../../src/core/transformer'
import type { GeneratedCSS } from '../../../src/types'

describe('Transformer', () => {
  // Helper to create GeneratedCSS items
  const createItem = (
    className: string,
    props: Record<string, string>,
    options: Partial<Omit<GeneratedCSS, 'className' | 'properties'>> = {}
  ): GeneratedCSS => ({
    className,
    selector: `.${className}`,
    properties: props,
    layer: 'utilities',
    priority: 100,
    variants: [],
    ...options,
  })

  describe('initialization', () => {
    it('should create transformer with default options', () => {
      const transformer = new Transformer()
      const options = transformer.getOptions()

      expect(options.minify).toBe(false)
      expect(options.useLayers).toBe(false)
      expect(options.pretty).toBe(true)
      expect(options.indent).toBe(2)
    })

    it('should create transformer with custom options', () => {
      const transformer = new Transformer({
        minify: true,
        useLayers: true,
        pretty: false,
        indent: 4,
      })
      const options = transformer.getOptions()

      expect(options.minify).toBe(true)
      expect(options.useLayers).toBe(true)
      expect(options.pretty).toBe(false)
      expect(options.indent).toBe(4)
    })

    it('should create transformer via factory function', () => {
      const transformer = createTransformer({ minify: true })

      expect(transformer).toBeInstanceOf(Transformer)
      expect(transformer.getOptions().minify).toBe(true)
    })
  })

  describe('transform', () => {
    it('should return empty string for empty array', () => {
      const transformer = new Transformer()
      const result = transformer.transform([])

      expect(result).toBe('')
    })

    it('should transform single item', () => {
      const transformer = new Transformer({ pretty: false })
      const items = [createItem('p-4', { padding: '1rem' })]

      const result = transformer.transform(items)

      expect(result).toContain('.p-4')
      expect(result).toContain('padding: 1rem')
    })

    it('should transform multiple items', () => {
      const transformer = new Transformer({ pretty: false })
      const items = [
        createItem('p-4', { padding: '1rem' }),
        createItem('m-2', { margin: '0.5rem' }),
      ]

      const result = transformer.transform(items)

      expect(result).toContain('.p-4')
      expect(result).toContain('.m-2')
    })

    it('should convert camelCase properties to kebab-case', () => {
      const transformer = new Transformer({ pretty: false })
      const items = [createItem('bg-red', { backgroundColor: 'red' })]

      const result = transformer.transform(items)

      expect(result).toContain('background-color: red')
    })

    it('should handle multiple properties per item', () => {
      const transformer = new Transformer({ pretty: false })
      const items = [
        createItem('text-center', {
          textAlign: 'center',
          display: 'block',
        }),
      ]

      const result = transformer.transform(items)

      expect(result).toContain('text-align: center')
      expect(result).toContain('display: block')
    })
  })

  describe('transform with layers', () => {
    it('should add layer order declaration', () => {
      const transformer = new Transformer({ useLayers: true, pretty: false })
      const items = [createItem('p-4', { padding: '1rem' })]

      const result = transformer.transform(items)

      expect(result).toContain('@layer base, components, utilities;')
    })

    it('should wrap utilities in @layer utilities', () => {
      const transformer = new Transformer({ useLayers: true, pretty: false })
      const items = [createItem('p-4', { padding: '1rem' }, { layer: 'utilities' })]

      const result = transformer.transform(items)

      expect(result).toContain('@layer utilities')
    })

    it('should wrap components in @layer components', () => {
      const transformer = new Transformer({ useLayers: true, pretty: false })
      const items = [createItem('btn', { display: 'inline-flex' }, { layer: 'components' })]

      const result = transformer.transform(items)

      expect(result).toContain('@layer components')
    })

    it('should wrap base in @layer base', () => {
      const transformer = new Transformer({ useLayers: true, pretty: false })
      const items = [createItem('html', { lineHeight: '1.5' }, { layer: 'base', selector: 'html' })]

      const result = transformer.transform(items)

      expect(result).toContain('@layer base')
    })

    it('should group items by layer', () => {
      const transformer = new Transformer({ useLayers: true, pretty: false })
      const items = [
        createItem('p-4', { padding: '1rem' }, { layer: 'utilities' }),
        createItem('btn', { display: 'flex' }, { layer: 'components' }),
        createItem('base', { margin: '0' }, { layer: 'base' }),
      ]

      const result = transformer.transform(items)

      // All layers should be present
      expect(result).toContain('@layer base')
      expect(result).toContain('@layer components')
      expect(result).toContain('@layer utilities')
    })
  })

  describe('sort', () => {
    it('should sort by layer: base < components < utilities', () => {
      const transformer = new Transformer()
      const items = [
        createItem('p-4', { padding: '1rem' }, { layer: 'utilities' }),
        createItem('btn', { display: 'flex' }, { layer: 'components' }),
        createItem('base', { margin: '0' }, { layer: 'base' }),
      ]

      const sorted = transformer.sort(items)

      expect(sorted[0]?.layer).toBe('base')
      expect(sorted[1]?.layer).toBe('components')
      expect(sorted[2]?.layer).toBe('utilities')
    })

    it('should sort by priority within same layer', () => {
      const transformer = new Transformer()
      const items = [
        createItem('mt-4', { marginTop: '1rem' }, { priority: 200 }),
        createItem('p-4', { padding: '1rem' }, { priority: 100 }),
        createItem('m-4', { margin: '1rem' }, { priority: 150 }),
      ]

      const sorted = transformer.sort(items)

      expect(sorted[0]?.className).toBe('p-4')
      expect(sorted[1]?.className).toBe('m-4')
      expect(sorted[2]?.className).toBe('mt-4')
    })

    it('should not modify original array', () => {
      const transformer = new Transformer()
      const items = [
        createItem('mt-4', { marginTop: '1rem' }, { priority: 200 }),
        createItem('p-4', { padding: '1rem' }, { priority: 100 }),
      ]

      const sorted = transformer.sort(items)

      expect(items[0]?.className).toBe('mt-4') // Original unchanged
      expect(sorted[0]?.className).toBe('p-4') // Sorted is different
    })
  })

  describe('format', () => {
    it('should minify when minify option is true', () => {
      const transformer = new Transformer({ minify: true })
      const css = `.test { padding: 1rem; margin: 0.5rem; }`

      const result = transformer.format(css)

      expect(result).not.toContain('\n')
      expect(result).toBe('.test{padding:1rem;margin:0.5rem}')
    })

    it('should format pretty when pretty option is true', () => {
      const transformer = new Transformer({ pretty: true, minify: false })
      const css = `.test { padding: 1rem; }`

      const result = transformer.format(css)

      expect(result).toContain('\n')
    })

    it('should use custom indent', () => {
      const transformer = new Transformer({ pretty: true, indent: 4, minify: false })
      const css = `.test { padding: 1rem; }`

      const result = transformer.format(css)

      expect(result).toContain('    padding') // 4 spaces
    })

    it('should return raw CSS when neither minify nor pretty', () => {
      const transformer = new Transformer({ pretty: false, minify: false })
      const css = `.test { padding: 1rem; }`

      const result = transformer.format(css)

      expect(result).toBe(css)
    })
  })

  describe('setOptions', () => {
    it('should update options', () => {
      const transformer = new Transformer({ minify: false })

      transformer.setOptions({ minify: true })

      expect(transformer.getOptions().minify).toBe(true)
    })

    it('should merge with existing options', () => {
      const transformer = new Transformer({ minify: false, useLayers: true })

      transformer.setOptions({ minify: true })

      expect(transformer.getOptions().minify).toBe(true)
      expect(transformer.getOptions().useLayers).toBe(true) // unchanged
    })
  })

  describe('getOptions', () => {
    it('should return copy of options', () => {
      const transformer = new Transformer({ minify: true })
      const options = transformer.getOptions()

      options.minify = false // Modify returned object

      expect(transformer.getOptions().minify).toBe(true) // Original unchanged
    })
  })
})

describe('transformToCSS', () => {
  const createItem = (
    className: string,
    props: Record<string, string>
  ): GeneratedCSS => ({
    className,
    selector: `.${className}`,
    properties: props,
    layer: 'utilities',
    priority: 100,
    variants: [],
  })

  it('should transform items to CSS string', () => {
    const items = [createItem('p-4', { padding: '1rem' })]
    const result = transformToCSS(items, { pretty: false })

    expect(result).toContain('.p-4')
    expect(result).toContain('padding: 1rem')
  })

  it('should accept options', () => {
    const items = [createItem('p-4', { padding: '1rem' })]
    const result = transformToCSS(items, { minify: true })

    expect(result).not.toContain('\n')
  })
})

describe('groupBySelector', () => {
  const createItem = (
    className: string,
    selector: string,
    props: Record<string, string>
  ): GeneratedCSS => ({
    className,
    selector,
    properties: props,
    layer: 'utilities',
    priority: 100,
    variants: [],
  })

  it('should group items by selector', () => {
    const items = [
      createItem('p-4', '.p-4', { padding: '1rem' }),
      createItem('p-4', '.p-4', { paddingTop: '1rem' }),
      createItem('m-4', '.m-4', { margin: '1rem' }),
    ]

    const groups = groupBySelector(items)

    expect(groups.size).toBe(2)
    expect(groups.get('.p-4')?.length).toBe(2)
    expect(groups.get('.m-4')?.length).toBe(1)
  })

  it('should handle empty array', () => {
    const groups = groupBySelector([])

    expect(groups.size).toBe(0)
  })

  it('should handle single item', () => {
    const items = [createItem('p-4', '.p-4', { padding: '1rem' })]

    const groups = groupBySelector(items)

    expect(groups.size).toBe(1)
  })
})

describe('mergeSameSelector', () => {
  const createItem = (
    className: string,
    selector: string,
    props: Record<string, string>,
    priority = 100
  ): GeneratedCSS => ({
    className,
    selector,
    properties: props,
    layer: 'utilities',
    priority,
    variants: [],
  })

  it('should merge items with same selector', () => {
    const items = [
      createItem('p-4', '.p-4', { padding: '1rem' }),
      createItem('p-4', '.p-4', { paddingTop: '2rem' }),
    ]

    const merged = mergeSameSelector(items)

    expect(merged.length).toBe(1)
    expect(merged[0]?.properties.padding).toBe('1rem')
    expect(merged[0]?.properties.paddingTop).toBe('2rem')
  })

  it('should keep highest priority when merging', () => {
    const items = [
      createItem('p-4', '.p-4', { padding: '1rem' }, 100),
      createItem('p-4', '.p-4', { paddingTop: '2rem' }, 200),
    ]

    const merged = mergeSameSelector(items)

    expect(merged[0]?.priority).toBe(200)
  })

  it('should not merge items with different selectors', () => {
    const items = [
      createItem('p-4', '.p-4', { padding: '1rem' }),
      createItem('m-4', '.m-4', { margin: '1rem' }),
    ]

    const merged = mergeSameSelector(items)

    expect(merged.length).toBe(2)
  })

  it('should handle single item', () => {
    const items = [createItem('p-4', '.p-4', { padding: '1rem' })]

    const merged = mergeSameSelector(items)

    expect(merged.length).toBe(1)
    expect(merged[0]).toBe(items[0]) // Same reference
  })

  it('should handle empty array', () => {
    const merged = mergeSameSelector([])

    expect(merged.length).toBe(0)
  })
})

describe('createPreflight', () => {
  it('should return preflight CSS', () => {
    const preflight = createPreflight()

    expect(preflight).toContain('box-sizing: border-box')
    expect(preflight).toContain('margin: 0')
    expect(preflight).toContain('line-height: 1.5')
  })

  it('should include universal selector reset', () => {
    const preflight = createPreflight()

    expect(preflight).toContain('*, *::before, *::after')
  })

  it('should include html settings', () => {
    const preflight = createPreflight()

    expect(preflight).toContain('html')
    expect(preflight).toContain('-webkit-text-size-adjust: 100%')
    expect(preflight).toContain('tab-size: 4')
  })

  it('should include body settings', () => {
    const preflight = createPreflight()

    expect(preflight).toContain('body')
    expect(preflight).toContain('-webkit-font-smoothing: antialiased')
  })

  it('should include media element resets', () => {
    const preflight = createPreflight()

    expect(preflight).toContain('img, picture, video, canvas, svg')
    expect(preflight).toContain('display: block')
    expect(preflight).toContain('max-width: 100%')
  })

  it('should include form element resets', () => {
    const preflight = createPreflight()

    expect(preflight).toContain('input, button, textarea, select')
    expect(preflight).toContain('font: inherit')
  })

  it('should include typography resets', () => {
    const preflight = createPreflight()

    expect(preflight).toContain('p, h1, h2, h3, h4, h5, h6')
    expect(preflight).toContain('overflow-wrap: break-word')
  })

  it('should include root isolation', () => {
    const preflight = createPreflight()

    expect(preflight).toContain('#root, #__next')
    expect(preflight).toContain('isolation: isolate')
  })
})
