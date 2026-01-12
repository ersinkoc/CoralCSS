/**
 * Tests for Spacing Utilities Plugin
 */
import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { spacingPlugin } from '../../../../../src/plugins/core/utilities/spacing'

describe('Spacing Utilities Plugin', () => {
  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = spacingPlugin()
      expect(plugin.name).toBe('spacing')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Padding Utilities', () => {
    it('should generate p-0', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['p-0'])
      expect(css).toContain('padding: 0px')
    })

    it('should generate p-4', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['p-4'])
      expect(css).toContain('padding:')
    })

    it('should generate px-4', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['px-4'])
      expect(css).toContain('padding-left:')
      expect(css).toContain('padding-right:')
    })

    it('should generate py-4', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['py-4'])
      expect(css).toContain('padding-top:')
      expect(css).toContain('padding-bottom:')
    })

    it('should generate pt-4', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['pt-4'])
      expect(css).toContain('padding-top:')
    })

    it('should generate pr-4', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['pr-4'])
      expect(css).toContain('padding-right:')
    })

    it('should generate pb-4', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['pb-4'])
      expect(css).toContain('padding-bottom:')
    })

    it('should generate pl-4', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['pl-4'])
      expect(css).toContain('padding-left:')
    })
  })

  describe('Logical Padding Properties', () => {
    it('should generate ps-4 (padding-inline-start)', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['ps-4'])
      expect(css).toContain('padding-inline-start:')
    })

    it('should generate pe-4 (padding-inline-end)', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['pe-4'])
      expect(css).toContain('padding-inline-end:')
    })

    it('should generate pbs-4 (padding-block-start)', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['pbs-4'])
      expect(css).toContain('padding-block-start:')
    })

    it('should generate pbe-4 (padding-block-end)', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['pbe-4'])
      expect(css).toContain('padding-block-end:')
    })

    it('should generate pli-4 (padding-inline)', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['pli-4'])
      expect(css).toContain('padding-inline:')
    })

    it('should generate plb-4 (padding-block)', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['plb-4'])
      expect(css).toContain('padding-block:')
    })
  })

  describe('Margin Utilities', () => {
    it('should generate m-0', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['m-0'])
      expect(css).toContain('margin: 0px')
    })

    it('should generate m-4', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['m-4'])
      expect(css).toContain('margin:')
    })

    it('should generate mx-4', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['mx-4'])
      expect(css).toContain('margin-left:')
      expect(css).toContain('margin-right:')
    })

    it('should generate my-4', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['my-4'])
      expect(css).toContain('margin-top:')
      expect(css).toContain('margin-bottom:')
    })

    it('should generate mt-4', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['mt-4'])
      expect(css).toContain('margin-top:')
    })

    it('should generate mr-4', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['mr-4'])
      expect(css).toContain('margin-right:')
    })

    it('should generate mb-4', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['mb-4'])
      expect(css).toContain('margin-bottom:')
    })

    it('should generate ml-4', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['ml-4'])
      expect(css).toContain('margin-left:')
    })
  })

  describe('Logical Margin Properties', () => {
    it('should generate ms-4 (margin-inline-start)', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['ms-4'])
      expect(css).toContain('margin-inline-start:')
    })

    it('should generate me-4 (margin-inline-end)', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['me-4'])
      expect(css).toContain('margin-inline-end:')
    })

    it('should generate mbs-4 (margin-block-start)', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['mbs-4'])
      expect(css).toContain('margin-block-start:')
    })

    it('should generate mbe-4 (margin-block-end)', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['mbe-4'])
      expect(css).toContain('margin-block-end:')
    })

    it('should generate mli-4 (margin-inline)', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['mli-4'])
      expect(css).toContain('margin-inline:')
    })

    it('should generate mlb-4 (margin-block)', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['mlb-4'])
      expect(css).toContain('margin-block:')
    })
  })

  describe('Negative Margins', () => {
    it('should generate -m-4', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['-m-4'])
      expect(css).toContain('margin:')
    })

    it('should generate -mt-4', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['-mt-4'])
      expect(css).toContain('margin-top:')
    })

    it('should generate -mx-4', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['-mx-4'])
      expect(css).toContain('margin-left:')
      expect(css).toContain('margin-right:')
    })
  })

  describe('Auto Margins', () => {
    it('should generate m-auto', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['m-auto'])
      expect(css).toContain('margin: auto')
    })

    it('should generate mx-auto', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['mx-auto'])
      expect(css).toContain('margin-left: auto')
      expect(css).toContain('margin-right: auto')
    })

    it('should generate my-auto', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['my-auto'])
      expect(css).toContain('margin-top: auto')
      expect(css).toContain('margin-bottom: auto')
    })

    it('should generate mt-auto', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['mt-auto'])
      expect(css).toContain('margin-top: auto')
    })

    it('should generate ms-auto', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['ms-auto'])
      expect(css).toContain('margin-inline-start: auto')
    })

    it('should generate me-auto', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['me-auto'])
      expect(css).toContain('margin-inline-end: auto')
    })

    it('should generate mbs-auto', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['mbs-auto'])
      expect(css).toContain('margin-block-start: auto')
    })

    it('should generate mbe-auto', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['mbe-auto'])
      expect(css).toContain('margin-block-end: auto')
    })

    it('should generate mli-auto', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['mli-auto'])
      expect(css).toContain('margin-inline: auto')
    })

    it('should generate mlb-auto', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['mlb-auto'])
      expect(css).toContain('margin-block: auto')
    })
  })

  describe('Gap Utilities', () => {
    it('should generate gap-0', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['gap-0'])
      expect(css).toContain('gap: 0px')
    })

    it('should generate gap-4', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['gap-4'])
      expect(css).toContain('gap:')
    })

    it('should generate gap-x-4', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['gap-x-4'])
      expect(css).toContain('column-gap:')
    })

    it('should generate gap-y-4', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['gap-y-4'])
      expect(css).toContain('row-gap:')
    })
  })

  describe('Space Between Utilities', () => {
    it('should generate space-x-4 with child selector', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['space-x-4'])
      expect(css).toContain('margin-left:')
    })

    it('should generate space-y-4 with child selector', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['space-y-4'])
      expect(css).toContain('margin-top:')
    })

    it('should generate space-x-reverse with CSS variables', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['space-x-reverse'])
      expect(css).toContain('--coral-space-x-reverse: 1')
      expect(css).toContain('margin-right:')
      expect(css).toContain('margin-left:')
    })

    it('should generate space-y-reverse with CSS variables', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['space-y-reverse'])
      expect(css).toContain('--coral-space-y-reverse: 1')
      expect(css).toContain('margin-bottom:')
      expect(css).toContain('margin-top:')
    })
  })

  describe('Arbitrary Values', () => {
    it('should generate p-[17px]', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['p-[17px]'])
      expect(css).toContain('padding: 17px')
    })

    it('should generate m-[3.5rem]', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['m-[3.5rem]'])
      expect(css).toContain('margin: 3.5rem')
    })

    it('should generate gap-[10px]', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['gap-[10px]'])
      expect(css).toContain('gap: 10px')
    })

    it('should generate space-x-[25px]', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['space-x-[25px]'])
      expect(css).toContain('margin-left: 25px')
    })

    it('should generate space-y-[15px]', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['space-y-[15px]'])
      expect(css).toContain('margin-top: 15px')
    })
  })

  describe('Combined Spacing Utilities', () => {
    it('should generate multiple padding utilities', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['p-4', 'px-8'])
      expect(css).toContain('padding:')
      expect(css).toContain('padding-left:')
      expect(css).toContain('padding-right:')
    })

    it('should generate multiple margin utilities', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['m-4', 'mx-auto'])
      expect(css).toContain('margin:')
      expect(css).toContain('margin-left: auto')
      expect(css).toContain('margin-right: auto')
    })

    it('should generate spacing with gap utilities', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['p-4', 'gap-4'])
      expect(css).toContain('padding:')
      expect(css).toContain('gap:')
    })
  })

  describe('Edge Cases', () => {
    it('should handle p-px (pixel spacing)', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['p-px'])
      expect(css).toContain('padding:')
    })

    it('should handle m-px (pixel margin)', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['m-px'])
      expect(css).toContain('margin:')
    })

    it('should handle arbitrary value with units', () => {
      const coral = createCoral({ plugins: [spacingPlugin()] })
      const css = coral.generate(['p-[100%]'])
      expect(css).toContain('padding: 100%')
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/utilities/spacing'
      )
      expect(defaultExport).toBe(spacingPlugin)
    })
  })
})
