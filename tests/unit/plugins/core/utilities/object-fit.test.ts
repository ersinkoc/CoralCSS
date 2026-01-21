/**
 * Tests for Object Fit Utilities Plugin
 */
import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { objectFitPlugin } from '../../../../../src/plugins/core/utilities/object-fit'

describe('Object Fit Utilities Plugin', () => {
  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      const coral = createCoral({ plugins: [objectFitPlugin()] })
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = objectFitPlugin()
      expect(plugin.name).toBe('object-fit')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Object Fit Values', () => {
    it('should generate object-contain', () => {
      const coral = createCoral({ plugins: [objectFitPlugin()] })
      const css = coral.generate(['object-contain'])
      expect(css).toContain('object-fit: contain')
    })

    it('should generate object-cover', () => {
      const coral = createCoral({ plugins: [objectFitPlugin()] })
      const css = coral.generate(['object-cover'])
      expect(css).toContain('object-fit: cover')
    })

    it('should generate object-fill', () => {
      const coral = createCoral({ plugins: [objectFitPlugin()] })
      const css = coral.generate(['object-fill'])
      expect(css).toContain('object-fit: fill')
    })

    it('should generate object-none', () => {
      const coral = createCoral({ plugins: [objectFitPlugin()] })
      const css = coral.generate(['object-none'])
      expect(css).toContain('object-fit: none')
    })

    it('should generate object-scale-down', () => {
      const coral = createCoral({ plugins: [objectFitPlugin()] })
      const css = coral.generate(['object-scale-down'])
      expect(css).toContain('object-fit: scale-down')
    })
  })

  describe('Object Position Values', () => {
    it('should generate object-bottom', () => {
      const coral = createCoral({ plugins: [objectFitPlugin()] })
      const css = coral.generate(['object-bottom'])
      expect(css).toContain('object-position: bottom')
    })

    it('should generate object-center', () => {
      const coral = createCoral({ plugins: [objectFitPlugin()] })
      const css = coral.generate(['object-center'])
      expect(css).toContain('object-position: center')
    })

    it('should generate object-left', () => {
      const coral = createCoral({ plugins: [objectFitPlugin()] })
      const css = coral.generate(['object-left'])
      expect(css).toContain('object-position: left')
    })

    it('should note object-left-bottom not implemented (use arbitrary value instead)', () => {
      const coral = createCoral({ plugins: [objectFitPlugin()] })
      const css = coral.generate(['object-left-bottom'])
      // object-left-bottom not implemented, use object-[left_bottom] or separate utilities
      expect(css).toBe('')
    })

    it('should generate object-right', () => {
      const coral = createCoral({ plugins: [objectFitPlugin()] })
      const css = coral.generate(['object-right'])
      expect(css).toContain('object-position: right')
    })

    it('should note object-right-top not implemented (use arbitrary value instead)', () => {
      const coral = createCoral({ plugins: [objectFitPlugin()] })
      const css = coral.generate(['object-right-top'])
      // object-right-top not implemented, use object-[right_top] or separate utilities
      expect(css).toBe('')
    })

    it('should generate object-top', () => {
      const coral = createCoral({ plugins: [objectFitPlugin()] })
      const css = coral.generate(['object-top'])
      expect(css).toContain('object-position: top')
    })
  })

  describe('Responsive Design', () => {
    it('should note responsive variants require responsive plugin', () => {
      const coral = createCoral({
        plugins: [objectFitPlugin()],
        theme: { breakpoints: { sm: '640px', md: '768px' } }
      })
      const css = coral.generate(['md:object-cover', 'lg:object-contain'])
      // Responsive plugin not loaded, so classes are generated without @media
      expect(css).toContain('object-fit: cover')
      expect(css).toContain('object-fit: contain')
    })
  })

  describe('Two-Value Object Position', () => {
    it('should generate object-top-left', () => {
      const coral = createCoral({ plugins: [objectFitPlugin()] })
      const css = coral.generate(['object-top-left'])
      expect(css).toContain('object-position: top left')
    })

    it('should generate object-top-right', () => {
      const coral = createCoral({ plugins: [objectFitPlugin()] })
      const css = coral.generate(['object-top-right'])
      expect(css).toContain('object-position: top right')
    })

    it('should generate object-bottom-left', () => {
      const coral = createCoral({ plugins: [objectFitPlugin()] })
      const css = coral.generate(['object-bottom-left'])
      expect(css).toContain('object-position: bottom left')
    })

    it('should generate object-bottom-right', () => {
      const coral = createCoral({ plugins: [objectFitPlugin()] })
      const css = coral.generate(['object-bottom-right'])
      expect(css).toContain('object-position: bottom right')
    })
  })

  describe('Percentage Object Positions', () => {
    it('should generate object-position-0-0', () => {
      const coral = createCoral({ plugins: [objectFitPlugin()] })
      const css = coral.generate(['object-position-0-0'])
      expect(css).toContain('object-position')
      expect(css).toContain('0% 0%')
    })

    it('should generate object-position-50-50', () => {
      const coral = createCoral({ plugins: [objectFitPlugin()] })
      const css = coral.generate(['object-position-50-50'])
      expect(css).toContain('object-position')
      expect(css).toContain('50% 50%')
    })

    it('should generate object-position-100-100', () => {
      const coral = createCoral({ plugins: [objectFitPlugin()] })
      const css = coral.generate(['object-position-100-100'])
      expect(css).toContain('object-position')
      expect(css).toContain('100% 100%')
    })

    it('should generate object-position-25-75', () => {
      const coral = createCoral({ plugins: [objectFitPlugin()] })
      const css = coral.generate(['object-position-25-75'])
      expect(css).toContain('object-position')
      expect(css).toContain('25% 75%')
    })

    it('should generate object-position-75-25', () => {
      const coral = createCoral({ plugins: [objectFitPlugin()] })
      const css = coral.generate(['object-position-75-25'])
      expect(css).toContain('object-position')
      expect(css).toContain('75% 25%')
    })
  })

  describe('Arbitrary Object Position', () => {
    it('should generate object-position-[30%_70%]', () => {
      const coral = createCoral({ plugins: [objectFitPlugin()] })
      const css = coral.generate(['object-position-[30%_70%]'])
      expect(css).toContain('object-position')
      expect(css).toContain('30% 70%')
    })

    it('should replace underscores with spaces', () => {
      const coral = createCoral({ plugins: [objectFitPlugin()] })
      const css = coral.generate(['object-position-[left_bottom]'])
      expect(css).toContain('object-position')
      expect(css).toContain('left bottom')
    })

    it('should return null for empty object-position-[]', () => {
      const coral = createCoral({ plugins: [objectFitPlugin()] })
      const css = coral.generate(['object-position-[]'])
      expect(css).toBe('')
    })
  })

  describe('Common Use Cases', () => {
    it('should generate responsive image card', () => {
      const coral = createCoral({ plugins: [objectFitPlugin()] })
      const css = coral.generate(['w-full', 'h-64', 'object-cover', 'object-center'])
      expect(css).toContain('object-fit: cover')
      expect(css).toContain('object-position: center')
    })

    it('should generate avatar image', () => {
      const coral = createCoral({ plugins: [objectFitPlugin()] })
      const css = coral.generate(['w-12', 'h-12', 'rounded-full', 'object-cover'])
      expect(css).toContain('object-fit: cover')
    })

    it('should generate thumbnail gallery', () => {
      const coral = createCoral({ plugins: [objectFitPlugin()] })
      const css = coral.generate(['w-24', 'h-24', 'object-cover', 'object-center'])
      expect(css).toContain('object-fit: cover')
      expect(css).toContain('object-position: center')
    })
  })
})
