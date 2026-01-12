/**
 * Tests for CSS Columns Utilities Plugin
 */
import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { columnsPlugin } from '../../../../../src/plugins/core/utilities/columns'

describe('Columns Utilities Plugin', () => {
  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = columnsPlugin()
      expect(plugin.name).toBe('columns')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Column Count', () => {
    it('should generate columns-1', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['columns-1'])
      expect(css).toContain('column-count: 1')
    })

    it('should generate columns-2', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['columns-2'])
      expect(css).toContain('column-count: 2')
    })

    it('should generate columns-3', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['columns-3'])
      expect(css).toContain('column-count: 3')
    })

    it('should generate columns-12', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['columns-12'])
      expect(css).toContain('column-count: 12')
    })

    it('should generate columns-auto', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['columns-auto'])
      expect(css).toContain('column-count: auto')
    })
  })

  describe('Column Width', () => {
    it('should generate col-w-auto', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-w-auto'])
      expect(css).toContain('column-width: auto')
    })

    it('should generate col-w-sm', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-w-sm'])
      expect(css).toContain('column-width: 24rem')
    })

    it('should generate col-w-md', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-w-md'])
      expect(css).toContain('column-width: 28rem')
    })

    it('should generate col-w-lg', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-w-lg'])
      expect(css).toContain('column-width: 32rem')
    })

    it('should generate col-w-2xl', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-w-2xl'])
      expect(css).toContain('column-width: 42rem')
    })

    it('should generate col-w-7xl', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-w-7xl'])
      expect(css).toContain('column-width: 80rem')
    })
  })

  describe('Column Gap', () => {
    it('should generate col-gap-0', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-gap-0'])
      expect(css).toContain('column-gap: 0')
    })

    it('should generate col-gap-px', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-gap-px'])
      expect(css).toContain('column-gap: 1px')
    })

    it('should generate col-gap-1', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-gap-1'])
      expect(css).toContain('column-gap: 0.25rem')
    })

    it('should generate col-gap-4', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-gap-4'])
      expect(css).toContain('column-gap: 1rem')
    })

    it('should generate col-gap-8', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-gap-8'])
      expect(css).toContain('column-gap: 2rem')
    })

    it('should generate col-gap-normal', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-gap-normal'])
      expect(css).toContain('column-gap: normal')
    })
  })

  describe('Column Rule Width', () => {
    it('should generate col-rule-0', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-rule-0'])
      expect(css).toContain('column-rule-width: 0')
    })

    it('should generate col-rule', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-rule'])
      expect(css).toContain('column-rule-width: 1px')
    })

    it('should generate col-rule-2', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-rule-2'])
      expect(css).toContain('column-rule-width: 2px')
    })

    it('should generate col-rule-8', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-rule-8'])
      expect(css).toContain('column-rule-width: 8px')
    })
  })

  describe('Column Rule Style', () => {
    it('should generate col-rule-none', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-rule-none'])
      expect(css).toContain('column-rule-style: none')
    })

    it('should generate col-rule-solid', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-rule-solid'])
      expect(css).toContain('column-rule-style: solid')
    })

    it('should generate col-rule-dashed', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-rule-dashed'])
      expect(css).toContain('column-rule-style: dashed')
    })

    it('should generate col-rule-dotted', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-rule-dotted'])
      expect(css).toContain('column-rule-style: dotted')
    })

    it('should generate col-rule-double', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-rule-double'])
      expect(css).toContain('column-rule-style: double')
    })

    it('should generate col-rule-groove', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-rule-groove'])
      expect(css).toContain('column-rule-style: groove')
    })

    it('should generate col-rule-ridge', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-rule-ridge'])
      expect(css).toContain('column-rule-style: ridge')
    })

    it('should generate col-rule-inset', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-rule-inset'])
      expect(css).toContain('column-rule-style: inset')
    })

    it('should generate col-rule-outset', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-rule-outset'])
      expect(css).toContain('column-rule-style: outset')
    })

    it('should generate col-rule-hidden', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-rule-hidden'])
      expect(css).toContain('column-rule-style: hidden')
    })
  })

  describe('Column Rule Color', () => {
    it('should generate col-rule-transparent', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-rule-transparent'])
      expect(css).toContain('column-rule-color: transparent')
    })

    it('should generate col-rule-current', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-rule-current'])
      expect(css).toContain('column-rule-color: currentColor')
    })

    it('should generate col-rule-black', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-rule-black'])
      expect(css).toContain('column-rule-color: #000000')
    })

    it('should generate col-rule-white', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-rule-white'])
      expect(css).toContain('column-rule-color: #ffffff')
    })

    it('should generate col-rule-gray-500', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-rule-gray-500'])
      expect(css).toContain('column-rule-color: #6b7280')
    })

    it('should generate col-rule-coral', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-rule-coral'])
      expect(css).toContain('column-rule-color: var(--coral-primary')
    })

    it('should generate col-rule-primary', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-rule-primary'])
      expect(css).toContain('column-rule-color: var(--coral-primary')
    })
  })

  describe('Column Span', () => {
    it('should generate col-span-none', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-span-none'])
      expect(css).toContain('column-span: none')
    })

    it('should generate col-span-all', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-span-all'])
      expect(css).toContain('column-span: all')
    })
  })

  describe('Column Fill', () => {
    it('should generate col-fill-auto', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-fill-auto'])
      expect(css).toContain('column-fill: auto')
    })

    it('should generate col-fill-balance', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-fill-balance'])
      expect(css).toContain('column-fill: balance')
    })

    it('should generate col-fill-balance-all', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-fill-balance-all'])
      expect(css).toContain('column-fill: balance-all')
    })
  })

  describe('Shorthand Columns', () => {
    it('should generate columns-2xs', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['columns-2xs'])
      expect(css).toContain('columns: 2 16rem')
    })

    it('should generate columns-xs', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['columns-xs'])
      expect(css).toContain('columns: 2 20rem')
    })

    it('should generate columns-sm', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['columns-sm'])
      expect(css).toContain('columns: 3 24rem')
    })

    it('should generate columns-md', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['columns-md'])
      expect(css).toContain('columns: 3 28rem')
    })

    it('should generate columns-lg', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['columns-lg'])
      expect(css).toContain('columns: 4 32rem')
    })

    it('should generate columns-xl', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['columns-xl'])
      expect(css).toContain('columns: 4 36rem')
    })

    it('should generate columns-2xl', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['columns-2xl'])
      expect(css).toContain('columns: 5 42rem')
    })

    it('should generate columns-3xl', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['columns-3xl'])
      expect(css).toContain('columns: 6 48rem')
    })
  })

  describe('Common Column Patterns', () => {
    it('should generate columns-newspaper', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['columns-newspaper'])
      expect(css).toContain('column-count: 3')
      expect(css).toContain('column-gap: 2rem')
      expect(css).toContain('column-rule: 1px solid #e5e7eb')
    })

    it('should generate columns-magazine', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['columns-magazine'])
      expect(css).toContain('column-count: 2')
      expect(css).toContain('column-gap: 3rem')
      expect(css).toContain('column-rule: none')
    })

    it('should generate columns-masonry', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['columns-masonry'])
      expect(css).toContain('column-count: 3')
      expect(css).toContain('column-gap: 1rem')
      expect(css).toContain('column-fill: balance')
    })
  })

  describe('Arbitrary Values', () => {
    it('should generate columns-[5]', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['columns-[5]'])
      expect(css).toContain('column-count: 5')
    })

    it('should generate columns-[250px]', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['columns-[250px]'])
      expect(css).toContain('column-width: 250px')
    })

    it('should generate col-w-[15rem]', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-w-[15rem]'])
      expect(css).toContain('column-width: 15rem')
    })

    it('should generate col-gap-[1.5rem]', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-gap-[1.5rem]'])
      expect(css).toContain('column-gap: 1.5rem')
    })

    it('should generate col-rule-[3px]', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-rule-[3px]'])
      expect(css).toContain('column-rule-width: 3px')
    })

    it('should generate col-rule-color-[#ff0000]', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-rule-color-[#ff0000]'])
      expect(css).toContain('column-rule-color: #ff0000')
    })
  })

  describe('Combined Column Utilities', () => {
    it('should generate multiple column properties', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['columns-3', 'col-gap-4', 'col-rule'])
      expect(css).toContain('column-count: 3')
      expect(css).toContain('column-gap: 1rem')
      expect(css).toContain('column-rule-width: 1px')
    })

    it('should combine column width with gap', () => {
      const coral = createCoral({ plugins: [columnsPlugin()] })
      const css = coral.generate(['col-w-md', 'col-gap-6'])
      expect(css).toContain('column-width: 28rem')
      expect(css).toContain('column-gap: 1.5rem')
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/utilities/columns'
      )
      expect(defaultExport).toBe(columnsPlugin)
    })
  })
})
