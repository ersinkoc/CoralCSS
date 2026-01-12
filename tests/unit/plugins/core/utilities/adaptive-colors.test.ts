/**
 * Adaptive Colors Utilities Plugin Tests
 *
 * Tests for adaptive color utilities including perceptual colors,
 * ambient light detection, high contrast mode, and color scheme adaptation.
 * @module tests/unit/plugins/core/utilities/adaptive-colors
 */

import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { adaptiveColorsPlugin } from '../../../../../src/plugins/core/utilities/adaptive-colors'

describe('Adaptive Colors Utilities Plugin', () => {
  describe('Perceptual Colors', () => {
    it('should generate text-perceptual', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['text-perceptual'])
      expect(css).toContain('color: color-mix(in oklch, canvasText 85%, currentColor)')
    })

    it('should generate text-perceptual-dim', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['text-perceptual-dim'])
      expect(css).toContain('color: color-mix(in oklch, canvasText 65%, currentColor)')
    })

    it('should generate text-perceptual-bright', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['text-perceptual-bright'])
      expect(css).toContain('color: color-mix(in oklch, canvasText 95%, currentColor)')
    })

    it('should generate bg-perceptual', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['bg-perceptual'])
      expect(css).toContain('background-color: color-mix(in oklch, canvas 85%, currentColor)')
    })

    it('should generate bg-perceptual-dim', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['bg-perceptual-dim'])
      expect(css).toContain('background-color: color-mix(in oklch, canvas 70%, currentColor)')
    })

    it('should generate bg-perceptual-bright', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['bg-perceptual-bright'])
      expect(css).toContain('background-color: color-mix(in oklch, canvas 95%, currentColor)')
    })
  })

  describe('Adaptive Colors', () => {
    it('should generate text-adaptive', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['text-adaptive'])
      expect(css).toContain('color: color-mix(in oklch, currentColor, canvasText)')
    })

    it('should generate bg-adaptive', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['bg-adaptive'])
      expect(css).toContain('background-color: color-mix(in oklch, currentColor, canvas)')
    })

    it('should generate border-adaptive', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['border-adaptive'])
      expect(css).toContain('border-color: color-mix(in oklch, currentColor, canvasText 30%)')
    })
  })

  describe('Ambient Light Detection', () => {
    it('should generate contrast-high', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['contrast-high'])
      expect(css).toContain('color: canvasText')
      expect(css).toContain('background-color: canvas')
    })

    it('should generate contrast-soft', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['contrast-soft'])
      expect(css).toContain('filter: contrast(0.9)')
    })
  })

  describe('Color Scheme Adaptation', () => {
    it('should generate color-scheme-auto', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['color-scheme-auto'])
      expect(css).toContain('color-scheme: light dark')
    })

    it('should generate color-scheme-light', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['color-scheme-light'])
      expect(css).toContain('color-scheme: light')
    })

    it('should generate color-scheme-dark', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['color-scheme-dark'])
      expect(css).toContain('color-scheme: dark')
    })

    it('should generate color-scheme-only-light', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['color-scheme-only-light'])
      expect(css).toContain('color-scheme: light')
    })

    it('should generate color-scheme-only-dark', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['color-scheme-only-dark'])
      expect(css).toContain('color-scheme: dark')
    })
  })

  describe('Semantic Color Adaptation', () => {
    it('should generate text-system', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['text-system'])
      expect(css).toContain('color: CanvasText')
    })

    it('should generate bg-system', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['bg-system'])
      expect(css).toContain('background-color: Canvas')
    })

    it('should generate accent-system', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['accent-system'])
      expect(css).toContain('color: Highlight')
    })
  })

  describe('Accessibility Colors', () => {
    it('should generate focus-ring-system', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['focus-ring-system'])
      expect(css).toContain('outline: 2px solid Highlight')
      expect(css).toContain('outline-offset: 2px')
    })

    it('should generate link-adaptive', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['link-adaptive'])
      expect(css).toContain('color: color-mix(in oklch, LinkText, currentColor)')
    })

    it('should generate visited-adaptive', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['visited-adaptive'])
      expect(css).toContain('color: color-mix(in oklch, VisitedText, currentColor)')
    })
  })

  describe('Luminance-Based Colors', () => {
    it('should generate text-luminant', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['text-luminant'])
      expect(css).toContain('color: oklch(from currentColor calc(l + 0.2) c h)')
    })

    it('should generate text-subtle', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['text-subtle'])
      expect(css).toContain('color: oklch(from currentColor calc(l - 0.2) c h)')
    })

    it('should generate bg-luminant', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['bg-luminant'])
      expect(css).toContain('background-color: oklch(from currentColor calc(l + 0.3) c h)')
    })
  })

  describe('Color Blindness Support', () => {
    it('should generate color-enhance-protan', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['color-enhance-protan'])
      expect(css).toContain("filter: url(#protan-filter)")
    })

    it('should generate color-enhance-deutan', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['color-enhance-deutan'])
      expect(css).toContain("filter: url(#deutan-filter)")
    })

    it('should generate forced-colors-auto', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['forced-colors-auto'])
      expect(css).toContain('forced-color-adjust: auto')
    })

    it('should generate forced-colors-none', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['forced-colors-none'])
      expect(css).toContain('forced-color-adjust: none')
    })
  })

  describe('Dynamic Color Mixing', () => {
    it('should generate text-blend-canvas', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['text-blend-canvas'])
      expect(css).toContain('color: color-mix(in oklch, currentColor 50%, CanvasText)')
    })

    it('should generate bg-blend-canvas', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['bg-blend-canvas'])
      expect(css).toContain('background-color: color-mix(in oklch, currentColor 50%, Canvas)')
    })

    it('should generate text-blend-accent', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['text-blend-accent'])
      expect(css).toContain('color: color-mix(in oklch, currentColor 70%, Highlight 30%)')
    })
  })

  describe('Print Adaptation', () => {
    it('should generate print-optimize', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['print-optimize'])
      expect(css).toContain('-webkit-print-color-adjust: exact')
      expect(css).toContain('print-color-adjust: exact')
    })

    it('should generate print-ink-save', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate(['print-ink-save'])
      expect(css).toContain('-webkit-print-color-adjust: economy')
      expect(css).toContain('print-color-adjust: economy')
    })
  })

  describe('Combined Utilities', () => {
    it('should generate multiple adaptive color utilities together', () => {
      const coral = createCoral({
        plugins: [adaptiveColorsPlugin()]
      })

      const css = coral.generate([
        'text-perceptual',
        'bg-perceptual',
        'color-scheme-auto'
      ])
      expect(css).toContain('color:')
      expect(css).toContain('background-color:')
      expect(css).toContain('color-scheme:')
    })
  })
})
