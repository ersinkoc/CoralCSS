/**
 * Tests for Print Utilities Plugin
 */
import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { printPlugin } from '../../../../../src/plugins/core/utilities/print'

describe('Print Utilities Plugin', () => {
  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = printPlugin()
      expect(plugin.name).toBe('print')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Break Before Utilities', () => {
    it('should generate break-before-auto', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['break-before-auto'])
      expect(css).toContain('break-before: auto')
    })

    it('should generate break-before-avoid', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['break-before-avoid'])
      expect(css).toContain('break-before: avoid')
    })

    it('should generate break-before-page', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['break-before-page'])
      expect(css).toContain('break-before: page')
    })

    it('should generate break-before-left', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['break-before-left'])
      expect(css).toContain('break-before: left')
    })

    it('should generate break-before-right', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['break-before-right'])
      expect(css).toContain('break-before: right')
    })

    it('should generate break-before-column', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['break-before-column'])
      expect(css).toContain('break-before: column')
    })

    it('should generate break-before-avoid-column', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['break-before-avoid-column'])
      expect(css).toContain('break-before: avoid-column')
    })

    it('should generate break-before-region', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['break-before-region'])
      expect(css).toContain('break-before: region')
    })
  })

  describe('Break After Utilities', () => {
    it('should generate break-after-auto', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['break-after-auto'])
      expect(css).toContain('break-after: auto')
    })

    it('should generate break-after-avoid', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['break-after-avoid'])
      expect(css).toContain('break-after: avoid')
    })

    it('should generate break-after-page', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['break-after-page'])
      expect(css).toContain('break-after: page')
    })

    it('should generate break-after-avoid-page', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['break-after-avoid-page'])
      expect(css).toContain('break-after: avoid-page')
    })

    it('should generate break-after-column', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['break-after-column'])
      expect(css).toContain('break-after: column')
    })

    it('should generate break-after-region', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['break-after-region'])
      expect(css).toContain('break-after: region')
    })
  })

  describe('Break Inside Utilities', () => {
    it('should generate break-inside-auto', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['break-inside-auto'])
      expect(css).toContain('break-inside: auto')
    })

    it('should generate break-inside-avoid', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['break-inside-avoid'])
      expect(css).toContain('break-inside: avoid')
    })

    it('should generate break-inside-avoid-page', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['break-inside-avoid-page'])
      expect(css).toContain('break-inside: avoid-page')
    })

    it('should generate break-inside-avoid-column', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['break-inside-avoid-column'])
      expect(css).toContain('break-inside: avoid-column')
    })

    it('should generate break-inside-avoid-region', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['break-inside-avoid-region'])
      expect(css).toContain('break-inside: avoid-region')
    })
  })

  describe('Page Size Utilities', () => {
    it('should generate page-auto', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['page-auto'])
      expect(css).toContain('page: auto')
    })

    it('should generate page-a3', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['page-a3'])
      expect(css).toContain('size: A3')
    })

    it('should generate page-a4', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['page-a4'])
      expect(css).toContain('size: A4')
    })

    it('should generate page-a5', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['page-a5'])
      expect(css).toContain('size: A5')
    })

    it('should generate page-b4', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['page-b4'])
      expect(css).toContain('size: B4')
    })

    it('should generate page-letter', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['page-letter'])
      expect(css).toContain('size: letter')
    })

    it('should generate page-legal', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['page-legal'])
      expect(css).toContain('size: legal')
    })

    it('should generate page-ledger', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['page-ledger'])
      expect(css).toContain('size: ledger')
    })
  })

  describe('Page Orientation', () => {
    it('should generate page-portrait', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['page-portrait'])
      expect(css).toContain('size: portrait')
    })

    it('should generate page-landscape', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['page-landscape'])
      expect(css).toContain('size: landscape')
    })
  })

  describe('Print Color Adjust', () => {
    it('should generate print-color-adjust-exact', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['print-color-adjust-exact'])
      expect(css).toContain('print-color-adjust: exact')
      expect(css).toContain('-webkit-print-color-adjust: exact')
    })

    it('should generate print-color-adjust-economy', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['print-color-adjust-economy'])
      expect(css).toContain('print-color-adjust: economy')
      expect(css).toContain('-webkit-print-color-adjust: economy')
    })

    it('should generate forced-color-adjust-auto', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['forced-color-adjust-auto'])
      expect(css).toContain('forced-color-adjust: auto')
    })

    it('should generate forced-color-adjust-none', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['forced-color-adjust-none'])
      expect(css).toContain('forced-color-adjust: none')
    })
  })

  describe('Print Visibility Utilities', () => {
    it('should generate print-block', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['print-block'])
      expect(css).toContain('display: block')
    })

    it('should generate print-inline', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['print-inline'])
      expect(css).toContain('display: inline')
    })

    it('should generate print-inline-block', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['print-inline-block'])
      expect(css).toContain('display: inline-block')
    })

    it('should generate print-flex', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['print-flex'])
      expect(css).toContain('display: flex')
    })

    it('should generate print-grid', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['print-grid'])
      expect(css).toContain('display: grid')
    })

    it('should generate print-table', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['print-table'])
      expect(css).toContain('display: table')
    })

    it('should generate print-hidden', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['print-hidden'])
      expect(css).toContain('display: none')
    })
  })

  describe('Print Optimized Utilities', () => {
    it('should generate print-text-black', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['print-text-black'])
      expect(css).toContain('color: #000000')
    })

    it('should generate print-text-gray', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['print-text-gray'])
      expect(css).toContain('color: #333333')
    })

    it('should generate print-bg-transparent', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['print-bg-transparent'])
      expect(css).toContain('background-color: transparent')
    })

    it('should generate print-bg-white', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['print-bg-white'])
      expect(css).toContain('background-color: #ffffff')
    })

    it('should generate print-border-none', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['print-border-none'])
      expect(css).toContain('border-width: 0')
    })

    it('should generate print-border-black', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['print-border-black'])
      expect(css).toContain('border-color: #000000')
    })

    it('should generate print-shadow-none', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['print-shadow-none'])
      expect(css).toContain('box-shadow: none')
    })

    it('should generate print-w-full', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['print-w-full'])
      expect(css).toContain('width: 100%')
    })

    it('should generate print-max-w-none', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['print-max-w-none'])
      expect(css).toContain('max-width: none')
    })
  })

  describe('Link Styling for Print', () => {
    it('should generate print-link-url', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['print-link-url'])
      expect(css).toContain('content: " (" attr(href) ")"')
    })

    it('should generate print-link-no-url', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['print-link-no-url'])
      expect(css).toContain('content: none')
    })
  })

  describe('Widows & Orphans', () => {
    it('should generate widows-1', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['widows-1'])
      expect(css).toContain('widows: 1')
    })

    it('should generate widows-3', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['widows-3'])
      expect(css).toContain('widows: 3')
    })

    it('should generate widows-5', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['widows-5'])
      expect(css).toContain('widows: 5')
    })

    it('should generate orphans-1', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['orphans-1'])
      expect(css).toContain('orphans: 1')
    })

    it('should generate orphans-3', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['orphans-3'])
      expect(css).toContain('orphans: 3')
    })

    it('should generate orphans-5', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['orphans-5'])
      expect(css).toContain('orphans: 5')
    })

    it('should generate widows-[4]', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['widows-[4]'])
      expect(css).toContain('widows: 4')
    })

    it('should generate orphans-[2]', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['orphans-[2]'])
      expect(css).toContain('orphans: 2')
    })
  })

  describe('Box Decoration Break', () => {
    it('should generate box-decoration-clone', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['box-decoration-clone'])
      expect(css).toContain('box-decoration-break: clone')
      expect(css).toContain('-webkit-box-decoration-break: clone')
    })

    it('should generate box-decoration-slice', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['box-decoration-slice'])
      expect(css).toContain('box-decoration-break: slice')
      expect(css).toContain('-webkit-box-decoration-break: slice')
    })
  })

  describe('Combined Print Utilities', () => {
    it('should generate multiple break utilities', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['break-before-page', 'break-after-avoid'])
      expect(css).toContain('break-before: page')
      expect(css).toContain('break-after: avoid')
    })

    it('should combine print visibility with color utilities', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['print-block', 'print-text-black'])
      expect(css).toContain('display: block')
      expect(css).toContain('color: #000000')
    })

    it('should combine print optimized utilities', () => {
      const coral = createCoral({ plugins: [printPlugin()] })
      const css = coral.generate(['print-bg-white', 'print-border-none', 'print-shadow-none'])
      expect(css).toContain('background-color: #ffffff')
      expect(css).toContain('border-width: 0')
      expect(css).toContain('box-shadow: none')
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/utilities/print'
      )
      expect(defaultExport).toBe(printPlugin)
    })
  })
})
