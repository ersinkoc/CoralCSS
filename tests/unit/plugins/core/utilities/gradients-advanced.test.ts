/**
 * Tests for Advanced Gradients Utilities Plugin
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { advancedGradientsPlugin } from '../../../../../src/plugins/core/utilities/gradients-advanced'

describe('Advanced Gradients Utilities Plugin', () => {
  let coral: ReturnType<typeof createCoral>

  beforeEach(() => {
    coral = createCoral()
    coral.use(advancedGradientsPlugin())
  })

  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = advancedGradientsPlugin()
      expect(plugin.name).toBe('gradients-advanced')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Mesh Gradients', () => {
    it('should generate bg-mesh-gradient-sm', () => {
      const css = coral.generate(['bg-mesh-gradient-sm'])
      expect(css).toContain('background')
      expect(css).toContain('radial-gradient')
      expect(css).toContain('400% 400%')
    })

    it('should generate bg-mesh-gradient-md', () => {
      const css = coral.generate(['bg-mesh-gradient-md'])
      expect(css).toContain('background')
      expect(css).toContain('200% 200%')
    })

    it('should generate bg-mesh-gradient-lg', () => {
      const css = coral.generate(['bg-mesh-gradient-lg'])
      expect(css).toContain('background')
      expect(css).toContain('150% 150%')
    })

    it('should generate bg-mesh-gradient-xl', () => {
      const css = coral.generate(['bg-mesh-gradient-xl'])
      expect(css).toContain('background')
      expect(css).toContain('100% 100%')
    })

    it('should generate bg-mesh-gradient-animated', () => {
      const css = coral.generate(['bg-mesh-gradient-animated'])
      expect(css).toContain('background')
      expect(css).toContain('animation')
      expect(css).toContain('mesh-gradient')
    })
  })

  describe('Noise Textures', () => {
    it('should generate bg-gradient-noise-light', () => {
      const css = coral.generate(['bg-gradient-noise-light'])
      expect(css).toContain('background-image')
      expect(css).toContain('data:image/svg+xml')
    })

    it('should generate bg-gradient-noise-medium', () => {
      const css = coral.generate(['bg-gradient-noise-medium'])
      expect(css).toContain('background-image')
      expect(css).toContain('data:image/svg+xml')
    })

    it('should generate bg-gradient-noise-heavy', () => {
      const css = coral.generate(['bg-gradient-noise-heavy'])
      expect(css).toContain('background-image')
      expect(css).toContain('data:image/svg+xml')
    })

    it('should generate bg-gradient-noise-grain', () => {
      const css = coral.generate(['bg-gradient-noise-grain'])
      expect(css).toContain('background-image')
      expect(css).toContain('data:image/svg+xml')
      expect(css).toContain('200px 200px')
    })
  })

  describe('Conic Gradients', () => {
    it('should generate bg-conic-gradient', () => {
      const css = coral.generate(['bg-conic-gradient'])
      expect(css).toContain('conic-gradient(from 0deg')
      expect(css).toContain('#3b82f6')
      expect(css).toContain('#8b5cf6')
    })

    it('should generate bg-conic-gradient-2', () => {
      const css = coral.generate(['bg-conic-gradient-2'])
      expect(css).toContain('conic-gradient(from 0deg at 50% 50%')
    })

    it('should generate bg-conic-gradient-tri', () => {
      const css = coral.generate(['bg-conic-gradient-tri'])
      expect(css).toContain('conic-gradient(from 0deg at 50% 50%')
      expect(css).toContain('120deg')
      expect(css).toContain('240deg')
    })

    it('should generate bg-conic-gradient-square', () => {
      const css = coral.generate(['bg-conic-gradient-square'])
      expect(css).toContain('conic-gradient(from 45deg at 50% 50%')
      expect(css).toContain('90deg')
      expect(css).toContain('180deg')
      expect(css).toContain('270deg')
    })

    it('should generate bg-conic-gradient-from-top', () => {
      const css = coral.generate(['bg-conic-gradient-from-top'])
      expect(css).toContain('conic-gradient(from 0deg at 50% 0%')
    })

    it('should generate bg-conic-gradient-from-bottom', () => {
      const css = coral.generate(['bg-conic-gradient-from-bottom'])
      expect(css).toContain('conic-gradient(from 180deg at 50% 100%')
    })
  })

  describe('Radial Gradients', () => {
    it('should generate bg-radial-gradient-ellipse', () => {
      const css = coral.generate(['bg-radial-gradient-ellipse'])
      expect(css).toContain('radial-gradient(ellipse at center')
    })

    it('should generate bg-radial-gradient-circle', () => {
      const css = coral.generate(['bg-radial-gradient-circle'])
      expect(css).toContain('radial-gradient(circle at center')
      expect(css).toContain('transparent 70%')
    })

    it('should generate bg-radial-gradient-top-right', () => {
      const css = coral.generate(['bg-radial-gradient-top-right'])
      expect(css).toContain('radial-gradient(circle at top right')
      expect(css).toContain('transparent 50%')
    })

    it('should generate bg-radial-gradient-multi', () => {
      const css = coral.generate(['bg-radial-gradient-multi'])
      expect(css).toContain('radial-gradient(circle at center')
      expect(css).toContain('0%, #8b5cf6 25%, #ec4899 50%')
    })
  })

  describe('Gradient Overlays', () => {
    it('should generate bg-gradient-overlay', () => {
      const css = coral.generate(['bg-gradient-overlay'])
      expect(css).toContain('linear-gradient(to bottom')
      expect(css).toContain('rgba(0,0,0,0)')
    })

    it('should generate bg-gradient-vignette', () => {
      const css = coral.generate(['bg-gradient-vignette'])
      expect(css).toContain('radial-gradient(circle at center')
      expect(css).toContain('transparent')
      expect(css).toContain('rgba(0,0,0,0.5)')
    })

    it('should generate bg-gradient-shimmer', () => {
      const css = coral.generate(['bg-gradient-shimmer'])
      expect(css).toContain('linear-gradient(90deg')
      expect(css).toContain('rgba(255,255,255,0.2)')
      expect(css).toContain('200% 100%')
    })
  })

  describe('Gradient Blends', () => {
    it('should generate bg-gradient-blend-screen', () => {
      const css = coral.generate(['bg-gradient-blend-screen'])
      expect(css).toContain('linear-gradient(to right, #3b82f6)')
      expect(css).toContain('background-blend-mode')
      expect(css).toContain('screen')
    })

    it('should generate bg-gradient-blend-multiply', () => {
      const css = coral.generate(['bg-gradient-blend-multiply'])
      expect(css).toContain('background-blend-mode')
      expect(css).toContain('multiply')
    })

    it('should generate bg-gradient-blend-overlay', () => {
      const css = coral.generate(['bg-gradient-blend-overlay'])
      expect(css).toContain('background-blend-mode')
      expect(css).toContain('overlay')
    })
  })

  describe('Gradient Patterns', () => {
    it('should generate bg-gradient-checkerboard', () => {
      const css = coral.generate(['bg-gradient-checkerboard'])
      expect(css).toContain('background-image')
      expect(css).toContain('linear-gradient(45deg')
      expect(css).toContain('20px 20px')
    })

    it('should generate bg-gradient-stripes', () => {
      const css = coral.generate(['bg-gradient-stripes'])
      expect(css).toContain('background-image')
      expect(css).toContain('20px 20px')
    })

    it('should generate bg-gradient-dots', () => {
      const css = coral.generate(['bg-gradient-dots'])
      expect(css).toContain('background-image')
      expect(css).toContain('radial-gradient(#3b82f6 1px')
      expect(css).toContain('20px 20px')
    })

    it('should generate bg-gradient-polka', () => {
      const css = coral.generate(['bg-gradient-polka'])
      expect(css).toContain('background-image')
      expect(css).toContain('radial-gradient(#ec4899 20%')
      expect(css).toContain('20px 20px')
    })
  })

  describe('Aurora Gradients', () => {
    it('should generate bg-aurora-gradient', () => {
      const css = coral.generate(['bg-aurora-gradient'])
      expect(css).toContain('linear-gradient(135deg')
      expect(css).toContain('rgba(99, 102, 241, 0.4)')
      expect(css).toContain('blur(40px)')
    })

    it('should generate bg-aurora-gradient-animated', () => {
      const css = coral.generate(['bg-aurora-gradient-animated'])
      expect(css).toContain('animation')
      expect(css).toContain('aurora 10s ease infinite')
    })
  })

  describe('Metallic Gradients', () => {
    it('should generate bg-gradient-gold', () => {
      const css = coral.generate(['bg-gradient-gold'])
      expect(css).toContain('linear-gradient(135deg')
      expect(css).toContain('#fcd34d')
      expect(css).toContain('#f59e0b')
      expect(css).toContain('#d97706')
    })

    it('should generate bg-gradient-silver', () => {
      const css = coral.generate(['bg-gradient-silver'])
      expect(css).toContain('linear-gradient(135deg')
      expect(css).toContain('#e5e7eb')
      expect(css).toContain('#9ca3af')
    })

    it('should generate bg-gradient-bronze', () => {
      const css = coral.generate(['bg-gradient-bronze'])
      expect(css).toContain('linear-gradient(135deg')
      expect(css).toContain('#d97706')
      expect(css).toContain('#b45309')
      expect(css).toContain('#92400e')
    })
  })

  describe('Glassmorphism Gradients', () => {
    it('should generate bg-glass-gradient', () => {
      const css = coral.generate(['bg-glass-gradient'])
      expect(css).toContain('linear-gradient(135deg')
      expect(css).toContain('rgba(255, 255, 255, 0.1)')
      expect(css).toContain('backdrop-filter: blur(10px)')
    })

    it('should generate bg-glass-frosted', () => {
      const css = coral.generate(['bg-glass-frosted'])
      expect(css).toContain('linear-gradient(135deg')
      expect(css).toContain('rgba(255, 255, 255, 0.3)')
      expect(css).toContain('backdrop-filter: blur(20px) saturate(180%)')
    })
  })

  describe('Arbitrary Gradients', () => {
    it('should generate arbitrary bg-conic-[from_0deg_at_50%_50%]', () => {
      const css = coral.generate(['bg-conic-[from_0deg_at_50%_50%]'])
      expect(css).toContain('conic-gradient(from 0deg at 50% 50%)')
    })

    it('should return null for empty bg-conic-[]', () => {
      const css = coral.generate(['bg-conic-[]'])
      expect(css).toBe('')
    })

    it('should replace underscores with spaces in conic', () => {
      const css = coral.generate(['bg-conic-[from_90deg,_red_0deg,_blue_180deg]'])
      expect(css).toContain('conic-gradient(from 90deg, red 0deg, blue 180deg)')
    })

    it('should generate arbitrary bg-radial-[circle_at_center]', () => {
      const css = coral.generate(['bg-radial-[circle_at_center]'])
      expect(css).toContain('radial-gradient(circle at center)')
    })

    it('should return null for empty bg-radial-[]', () => {
      const css = coral.generate(['bg-radial-[]'])
      expect(css).toBe('')
    })

    it('should replace underscores with spaces in radial', () => {
      const css = coral.generate(['bg-radial-[ellipse_at_top_left,_#000_0%,_#fff_100%]'])
      expect(css).toContain('radial-gradient(ellipse at top left, #000 0%, #fff 100%)')
    })

    it('should generate arbitrary bg-overlay-[to_bottom,_rgba(0,0,0,0.5)]', () => {
      const css = coral.generate(['bg-overlay-[to_bottom,_rgba(0,0,0,0.5)]'])
      expect(css).toContain('linear-gradient(to bottom, rgba(0,0,0,0.5))')
      expect(css).toContain('background-blend-mode: overlay')
    })

    it('should return null for empty bg-overlay-[]', () => {
      const css = coral.generate(['bg-overlay-[]'])
      expect(css).toBe('')
    })

    it('should replace underscores in overlay gradient', () => {
      const css = coral.generate(['bg-overlay-[to_right,_red_0%,_blue_100%]'])
      expect(css).toContain('linear-gradient(to right, red 0%, blue 100%)')
    })
  })
})
