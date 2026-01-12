/**
 * Tests for Pattern Utilities Plugin
 */
import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { patternsPlugin } from '../../../../../src/plugins/core/utilities/patterns'

describe('Pattern Utilities Plugin', () => {
  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = patternsPlugin()
      expect(plugin.name).toBe('patterns')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Dot Patterns', () => {
    it('should generate bg-pattern-dot-sm', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-dot-sm'])
      expect(css).toContain('background-image:')
      expect(css).toContain('radial-gradient(circle, currentColor 1px')
      expect(css).toContain('background-size:')
    })

    it('should generate bg-pattern-dot-md', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-dot-md'])
      expect(css).toContain('radial-gradient(circle, currentColor 1px')
      expect(css).toContain('background-size: 16px 16px')
    })

    it('should generate bg-pattern-dot-lg', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-dot-lg'])
      expect(css).toContain('radial-gradient(circle, currentColor 1px')
      expect(css).toContain('background-size: 24px 24px')
    })
  })

  describe('Grid Patterns', () => {
    it('should generate bg-pattern-grid-sm', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-grid-sm'])
      expect(css).toContain('background-image:')
      expect(css).toContain('linear-gradient(to right')
      expect(css).toContain('linear-gradient(to bottom')
      expect(css).toContain('background-size: 20px 20px')
    })

    it('should generate bg-pattern-grid-md', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-grid-md'])
      expect(css).toContain('background-size: 40px 40px')
    })

    it('should generate bg-pattern-grid-lg', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-grid-lg'])
      expect(css).toContain('background-size: 60px 60px')
    })
  })

  describe('Checkerboard Patterns', () => {
    it('should generate bg-pattern-checkerboard-sm', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-checkerboard-sm'])
      expect(css).toContain('background-image:')
      expect(css).toContain('conic-gradient(')
      expect(css).toContain('background-size: 10px 10px')
    })

    it('should generate bg-pattern-checkerboard-md', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-checkerboard-md'])
      expect(css).toContain('background-size: 20px 20px')
    })

    it('should generate bg-pattern-checkerboard-lg', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-checkerboard-lg'])
      expect(css).toContain('background-size: 40px 40px')
    })
  })

  describe('Diagonal Stripe Patterns', () => {
    it('should generate bg-pattern-stripe-diagonal-sm', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-stripe-diagonal-sm'])
      expect(css).toContain('background-image:')
      expect(css).toContain('repeating-linear-gradient(45deg')
      expect(css).toContain('background-size:')
    })

    it('should generate bg-pattern-stripe-diagonal-md', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-stripe-diagonal-md'])
      expect(css).toContain('repeating-linear-gradient(45deg')
      expect(css).toContain('currentColor 4px')
    })

    it('should generate bg-pattern-stripe-diagonal-lg', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-stripe-diagonal-lg'])
      expect(css).toContain('repeating-linear-gradient(45deg')
      expect(css).toContain('currentColor 8px')
    })
  })

  describe('Horizontal Stripe Patterns', () => {
    it('should generate bg-pattern-stripe-sm', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-stripe-sm'])
      expect(css).toContain('background-image:')
      expect(css).toContain('repeating-linear-gradient(0deg')
    })

    it('should generate bg-pattern-stripe-md', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-stripe-md'])
      expect(css).toContain('repeating-linear-gradient(0deg')
      expect(css).toContain('currentColor 4px')
    })

    it('should generate bg-pattern-stripe-lg', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-stripe-lg'])
      expect(css).toContain('repeating-linear-gradient(0deg')
      expect(css).toContain('currentColor 8px')
    })
  })

  describe('Zigzag Pattern', () => {
    it('should generate bg-pattern-zigzag', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-zigzag'])
      expect(css).toContain('background:')
      expect(css).toContain('linear-gradient(135deg')
      expect(css).toContain('linear-gradient(225deg')
      expect(css).toContain('linear-gradient(315deg')
      expect(css).toContain('linear-gradient(45deg')
      expect(css).toContain('background-size: 100px 50px')
    })
  })

  describe('Polka Dot Patterns', () => {
    it('should generate bg-pattern-polka-sm', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-polka-sm'])
      expect(css).toContain('background-image:')
      expect(css).toContain('radial-gradient(currentColor 4px')
      expect(css).toContain('background-size: 16px 16px')
    })

    it('should generate bg-pattern-polka-md', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-polka-md'])
      expect(css).toContain('radial-gradient(currentColor 8px')
      expect(css).toContain('background-size: 24px 24px')
    })

    it('should generate bg-pattern-polka-lg', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-polka-lg'])
      expect(css).toContain('radial-gradient(currentColor 12px')
      expect(css).toContain('background-size: 32px 32px')
    })
  })

  describe('Waves Pattern', () => {
    it('should generate bg-pattern-waves', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-waves'])
      expect(css).toContain('background:')
      expect(css).toContain('radial-gradient(circle at 100% 50%')
      expect(css).toContain('radial-gradient(circle at 0% 50%')
      expect(css).toContain('background-size: 100px 100px')
    })
  })

  describe('Circles Patterns', () => {
    it('should generate bg-pattern-circles-sm', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-circles-sm'])
      expect(css).toContain('background-image:')
      expect(css).toContain('radial-gradient(circle, currentColor 1px')
      expect(css).toContain('background-size: 10px 10px')
      expect(css).toContain('background-position:')
    })

    it('should generate bg-pattern-circles-md', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-circles-md'])
      expect(css).toContain('background-size: 20px 20px')
      expect(css).toContain('background-position: 0 0, 40px 0')
    })

    it('should generate bg-pattern-circles-lg', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-circles-lg'])
      expect(css).toContain('background-size: 40px 40px')
      expect(css).toContain('background-position: 0 0, 80px 0')
    })
  })

  describe('Crosshatch Patterns', () => {
    it('should generate bg-pattern-crosshatch-sm', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-crosshatch-sm'])
      expect(css).toContain('background-image:')
      expect(css).toContain('linear-gradient(to right, currentColor 1px')
      expect(css).toContain('linear-gradient(to bottom, currentColor 1px')
      expect(css).toContain('background-size: 8px 8px')
    })

    it('should generate bg-pattern-crosshatch-md', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-crosshatch-md'])
      expect(css).toContain('background-size: 16px 16px')
    })

    it('should generate bg-pattern-crosshatch-lg', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-crosshatch-lg'])
      expect(css).toContain('background-size: 24px 24px')
    })
  })

  describe('Stars Patterns', () => {
    it('should generate bg-pattern-stars-sparse', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-stars-sparse'])
      expect(css).toContain('background-image:')
      expect(css).toContain('radial-gradient(1px 1px at 50% 50%')
      expect(css).toContain('background-size: 40pxpx')
    })

    it('should generate bg-pattern-stars-dense', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-stars-dense'])
      expect(css).toContain('background-size: 20pxpx')
    })
  })

  describe('Triangles Pattern', () => {
    it('should generate bg-pattern-triangles', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-triangles'])
      expect(css).toContain('background-image:')
      expect(css).toContain('linear-gradient(45deg')
      expect(css).toContain('linear-gradient(-45deg')
      expect(css).toContain('background-size: 20px 20px')
    })
  })

  describe('Diamonds Patterns', () => {
    it('should generate bg-pattern-diamonds-sm', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-diamonds-sm'])
      expect(css).toContain('background-image:')
      expect(css).toContain('radial-gradient(circle at 50% 50%')
      expect(css).toContain('background-size: 10px 10px')
    })

    it('should generate bg-pattern-diamonds-md', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-diamonds-md'])
      expect(css).toContain('background-size: 20px 20px')
    })

    it('should generate bg-pattern-diamonds-lg', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-diamonds-lg'])
      expect(css).toContain('background-size: 30px 30px')
    })
  })

  describe('Hexagons Pattern', () => {
    it('should generate bg-pattern-hexagons', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-hexagons'])
      expect(css).toContain('background:')
      expect(css).toContain("data:image/svg+xml")
      expect(css).toContain('background-size: 56px 98px')
    })
  })

  describe('Animated Patterns', () => {
    it('should generate animate-pattern-scroll with keyframes', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['animate-pattern-scroll'])
      expect(css).toContain('animation: pattern-scroll 20s linear infinite')
      expect(css).toContain('@keyframes pattern-scroll')
      expect(css).toContain('background-position: 0 0')
      expect(css).toContain('background-position: 100px 100px')
    })
  })

  describe('Pattern Overlays', () => {
    it('should generate pattern-overlay-dots', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['pattern-overlay-dots'])
      expect(css).toContain('background-image:')
      expect(css).toContain('radial-gradient(circle, rgba(99, 102, 241, 0.1) 1px')
      expect(css).toContain('background-size: 20px 20px')
    })

    it('should generate pattern-overlay-lines', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['pattern-overlay-lines'])
      expect(css).toContain('background-image:')
      expect(css).toContain('linear-gradient(to right, rgba(99, 102, 241, 0.05) 1px')
      expect(css).toContain('background-size: 40px 100%')
    })
  })

  describe('Combined Pattern Utilities', () => {
    it('should generate multiple pattern utilities', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-dot-md', 'bg-pattern-grid-sm'])
      expect(css).toContain('background-image:')
      expect(css).toContain('radial-gradient(circle, currentColor')
      expect(css).toContain('linear-gradient')
    })

    it('should combine pattern with animation', () => {
      const coral = createCoral({
        plugins: [patternsPlugin()]
      })
      const css = coral.generate(['bg-pattern-stripe-md', 'animate-pattern-scroll'])
      expect(css).toContain('background-image:')
      expect(css).toContain('animation:')
      expect(css).toContain('@keyframes pattern-scroll')
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/utilities/patterns'
      )
      expect(defaultExport).toBe(patternsPlugin)
    })
  })
})
