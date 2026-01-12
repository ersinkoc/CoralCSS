/**
 * Tests for Gradients Utilities Plugin
 */
import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { gradientsPlugin } from '../../../../../src/plugins/core/utilities/gradients'

describe('Gradients Utilities Plugin', () => {
  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = gradientsPlugin()
      expect(plugin.name).toBe('gradients')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Linear Background Gradients', () => {
    it('should generate bg-gradient-b-primary-to-secondary', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['bg-gradient-b-primary-to-secondary'])
      expect(css).toContain('background:')
      expect(css).toContain('linear-gradient(')
      expect(css).toContain('to bottom')
    })

    it('should generate bg-gradient-r-primary-to-accent', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['bg-gradient-r-primary-to-accent'])
      expect(css).toContain('linear-gradient(')
      expect(css).toContain('to right')
    })

    it('should generate bg-gradient-tl-secondary-to-primary', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['bg-gradient-tl-secondary-to-primary'])
      expect(css).toContain('to top left')
    })

    it('should generate bg-gradient-tr-accent-to-secondary', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['bg-gradient-tr-accent-to-secondary'])
      expect(css).toContain('to top right')
    })
  })

  describe('Three-Color Gradients', () => {
    it('should generate bg-gradient-b-primary-3', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['bg-gradient-b-primary-3'])
      expect(css).toContain('background:')
      expect(css).toContain('linear-gradient(')
      expect(css).toContain('-400')
      expect(css).toContain('-500')
      expect(css).toContain('-600')
    })

    it('should generate bg-gradient-r-coral-3', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['bg-gradient-r-coral-3'])
      expect(css).toContain('coral-400')
      expect(css).toContain('coral-500')
      expect(css).toContain('coral-600')
    })
  })

  describe('Radial Gradients', () => {
    it('should generate bg-gradient-radial-coral', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['bg-gradient-radial-coral'])
      expect(css).toContain('background:')
      expect(css).toContain('radial-gradient(circle')
    })

    it('should generate bg-gradient-radial-primary-fade', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['bg-gradient-radial-primary-fade'])
      expect(css).toContain('radial-gradient(circle at center')
      expect(css).toContain('transparent 70%')
    })
  })

  describe('Conic Gradients', () => {
    it('should generate bg-gradient-conic-primary', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['bg-gradient-conic-primary'])
      expect(css).toContain('background:')
      expect(css).toContain('conic-gradient(from 0deg')
    })

    it('should generate bg-gradient-conic-coral', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['bg-gradient-conic-coral'])
      expect(css).toContain('conic-gradient(')
      expect(css).toContain('coral-400')
      expect(css).toContain('coral-500')
      expect(css).toContain('coral-600')
    })

    it('should generate bg-gradient-conic-rainbow', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['bg-gradient-conic-rainbow'])
      expect(css).toContain('conic-gradient(from 0deg')
      expect(css).toContain('#ef4444')
      expect(css).toContain('#f97316')
      expect(css).toContain('#8b5cf6')
    })
  })

  describe('Text Gradients', () => {
    it('should generate text-gradient-r-coral', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['text-gradient-r-coral'])
      expect(css).toContain('background:')
      expect(css).toContain('-webkit-background-clip: text')
      expect(css).toContain('-webkit-text-fill-color: transparent')
      expect(css).toContain('background-clip: text')
    })

    it('should generate text-gradient-b-primary', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['text-gradient-b-primary'])
      expect(css).toContain('linear-gradient(')
      expect(css).toContain('-webkit-background-clip')
      expect(css).toContain('-webkit-text-fill-color')
    })

    it('should generate text-gradient-r-rainbow', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['text-gradient-r-rainbow'])
      expect(css).toContain('linear-gradient(to right')
      expect(css).toContain('#ef4444')
      expect(css).toContain('#f97316')
      expect(css).toContain('#3b82f6')
      expect(css).toContain('-webkit-text-fill-color: transparent')
    })

    it('should generate text-gradient-tl-rainbow', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['text-gradient-tl-rainbow'])
      expect(css).toContain('background: linear-gradient(')
      expect(css).toContain('-webkit-text-fill-color: transparent')
    })
  })

  describe('Animated Gradient Backgrounds', () => {
    it('should generate animate-gradient-x with keyframes', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['animate-gradient-x'])
      expect(css).toContain('background-size: 200% 200%')
      expect(css).toContain('animation: gradient-x 3s ease infinite')
      expect(css).toContain('@keyframes gradient-x')
    })

    it('should generate animate-gradient-y with keyframes', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['animate-gradient-y'])
      expect(css).toContain('background-size: 200% 200%')
      expect(css).toContain('animation: gradient-y 3s ease infinite')
      expect(css).toContain('@keyframes gradient-y')
    })

    it('should generate animate-gradient-xy with keyframes', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['animate-gradient-xy'])
      expect(css).toContain('background-size: 400% 400%')
      expect(css).toContain('animation: gradient-xy 15s ease infinite')
      expect(css).toContain('@keyframes gradient-xy')
    })
  })

  describe('Mesh Gradients', () => {
    it('should generate bg-gradient-mesh-coral', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['bg-gradient-mesh-coral'])
      expect(css).toContain('background-color:')
      expect(css).toContain('background-image:')
      expect(css).toContain('radial-gradient(at 40% 20%')
      expect(css).toContain('coral-400')
      expect(css).toContain('coral-800')
    })

    it('should generate bg-gradient-mesh-primary', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['bg-gradient-mesh-primary'])
      expect(css).toContain('radial-gradient(at')
      expect(css).toContain('primary-400')
    })

    it('should generate bg-gradient-mesh-purple', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['bg-gradient-mesh-purple'])
      expect(css).toContain('purple-400')
      expect(css).toContain('purple-800')
    })

    it('should generate bg-gradient-mesh-blue', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['bg-gradient-mesh-blue'])
      expect(css).toContain('blue-400')
      expect(css).toContain('blue-800')
    })
  })

  describe('Special Effects', () => {
    it('should generate bg-gradient-glass with backdrop-filter', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['bg-gradient-glass'])
      expect(css).toContain('background: linear-gradient(135deg, rgba(255,255,255,0.1)')
      expect(css).toContain('backdrop-filter: blur(10px)')
      expect(css).toContain('-webkit-backdrop-filter: blur(10px)')
    })

    it('should generate animate-shimmer with keyframes', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['animate-shimmer'])
      expect(css).toContain('background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)')
      expect(css).toContain('background-size: 200% 100%')
      expect(css).toContain('animation: shimmer 2s infinite')
      expect(css).toContain('@keyframes shimmer')
      expect(css).toContain('background-position: 200% 0')
      expect(css).toContain('background-position: -200% 0')
    })

    it('should generate bg-gradient-aurora with keyframes', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['bg-gradient-aurora'])
      expect(css).toContain('background: linear-gradient(135deg, #a855f7 0%, #6366f1 25%')
      expect(css).toContain('#3b82f6 50%')
      expect(css).toContain('#06b6d4 75%')
      expect(css).toContain('#10b981 100%')
      expect(css).toContain('background-size: 200% 200%')
      expect(css).toContain('animation: aurora 8s ease infinite')
      expect(css).toContain('@keyframes aurora')
    })
  })

  describe('Combined Gradient Utilities', () => {
    it('should generate multiple background gradients', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['bg-gradient-b-coral-to-slate', 'bg-gradient-glass'])
      expect(css).toContain('linear-gradient(')
      expect(css).toContain('backdrop-filter:')
    })

    it('should combine text gradient with animation', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['text-gradient-r-coral', 'animate-gradient-x'])
      expect(css).toContain('-webkit-background-clip: text')
      expect(css).toContain('animation:')
    })
  })

  describe('Edge Cases', () => {
    it('should handle gradient with multiple color stops', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['bg-gradient-conic-rainbow'])
      expect(css).toContain('#ef4444')
      expect(css).toContain('#f43f5e')
    })

    it('should handle mesh gradient with multiple radial gradients', () => {
      const coral = createCoral({
        plugins: [gradientsPlugin()]
      })
      const css = coral.generate(['bg-gradient-mesh-coral'])
      expect(css).toContain('radial-gradient(at 40% 20%')
      expect(css).toContain('radial-gradient(at 80% 0%')
      expect(css).toContain('radial-gradient(at 0% 50%')
      expect(css).toContain('radial-gradient(at 80% 50%')
      expect(css).toContain('radial-gradient(at 0% 100%')
      expect(css).toContain('radial-gradient(at 80% 100%')
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/utilities/gradients'
      )
      expect(defaultExport).toBe(gradientsPlugin)
    })
  })
})
