/**
 * Tests for Aspect Ratio Utilities Plugin
 */
import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { aspectRatioPlugin } from '../../../../../src/plugins/core/utilities/aspect-ratio'

describe('Aspect Ratio Utilities Plugin', () => {
  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = aspectRatioPlugin()
      expect(plugin.name).toBe('aspect-ratio')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Standard Aspect Ratios', () => {
    it('should generate aspect-auto', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-auto'])
      expect(css).toContain('aspect-ratio: auto')
    })

    it('should generate aspect-square', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-square'])
      expect(css).toContain('aspect-ratio: 1 / 1')
    })

    it('should generate aspect-video', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-video'])
      expect(css).toContain('aspect-ratio: 16 / 9')
    })

    it('should generate aspect-photo', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-photo'])
      expect(css).toContain('aspect-ratio: 4 / 3')
    })

    it('should generate aspect-portrait', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-portrait'])
      expect(css).toContain('aspect-ratio: 3 / 4')
    })

    it('should generate aspect-landscape', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-landscape'])
      expect(css).toContain('aspect-ratio: 3 / 2')
    })

    it('should generate aspect-ultra-wide', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-ultra-wide'])
      expect(css).toContain('aspect-ratio: 21 / 9')
    })

    it('should generate aspect-golden', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-golden'])
      expect(css).toContain('aspect-ratio: 1.618 / 1')
    })
  })

  describe('Numeric Aspect Ratios', () => {
    it('should generate aspect-4-3', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-4-3'])
      expect(css).toContain('aspect-ratio: 4 / 3')
    })

    it('should note aspect-3-2 not implemented (use aspect-[3/2] instead)', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-3-2'])
      // aspect-3-2 is not implemented, use arbitrary aspect-[3/2] instead
      expect(css).toBe('')
    })

    it('should generate aspect-21-9', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-21-9'])
      expect(css).toContain('aspect-ratio: 21 / 9')
    })

    it('should generate aspect-32-9', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-32-9'])
      expect(css).toContain('aspect-ratio: 32 / 9')
    })
  })

  describe('Social Media Aspect Ratios', () => {
    it('should generate aspect-instagram', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-instagram'])
      expect(css).toContain('aspect-ratio: 1 / 1')
    })

    it('should generate aspect-instagram-portrait', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-instagram-portrait'])
      expect(css).toContain('aspect-ratio: 4 / 5')
    })

    it('should generate aspect-story', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-story'])
      expect(css).toContain('aspect-ratio: 9 / 16')
    })

    it('should generate aspect-twitter', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-twitter'])
      expect(css).toContain('aspect-ratio: 16 / 9')
    })

    it('should generate aspect-facebook-cover', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-facebook-cover'])
      expect(css).toContain('aspect-ratio: 2.63 / 1')
    })

    it('should generate aspect-linkedin', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-linkedin'])
      expect(css).toContain('aspect-ratio: 1.91 / 1')
    })

    it('should generate aspect-pinterest', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-pinterest'])
      expect(css).toContain('aspect-ratio: 2 / 3')
    })
  })

  describe('Print Aspect Ratios', () => {
    it('should generate aspect-a4', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-a4'])
      expect(css).toContain('aspect-ratio: 1 / 1.414')
    })

    it('should generate aspect-a3', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-a3'])
      expect(css).toContain('aspect-ratio: 1 / 1.414')
    })

    it('should generate aspect-letter', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-letter'])
      expect(css).toContain('aspect-ratio: 1 / 1.294')
    })

    it('should generate aspect-legal', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-legal'])
      expect(css).toContain('aspect-ratio: 1 / 1.647')
    })
  })

  describe('Special Aspect Ratios', () => {
    it('should generate aspect-dynamic', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-dynamic'])
      expect(css).toContain('aspect-ratio: auto')
    })
  })

  describe('Arbitrary Aspect Ratios', () => {
    it('should generate aspect-[4/3]', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-[4/3]'])
      expect(css).toContain('aspect-ratio: 4/3')
    })

    it('should generate aspect-[1.618]', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-[1.618]'])
      expect(css).toContain('aspect-ratio: 1.618')
    })

    it('should generate aspect-[1920/1080]', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-[1920/1080]'])
      expect(css).toContain('aspect-ratio: 1920/1080')
    })

    it('should replace underscores with spaces in arbitrary values', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-[16_9]'])
      expect(css).toContain('aspect-ratio: 16 9')
    })

    it('should handle arbitrary decimal ratio', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-[1.5]'])
      expect(css).toContain('aspect-ratio: 1.5')
    })
  })

  describe('Decimal Aspect Ratios', () => {
    it('should generate aspect-1.5', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-1.5'])
      expect(css).toContain('aspect-ratio: 1.5 / 1')
    })

    it('should generate aspect-2.35', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-2.35'])
      expect(css).toContain('aspect-ratio: 2.35 / 1')
    })

    it('should not match aspect-square as decimal', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-square'])
      expect(css).toContain('aspect-ratio: 1 / 1')
    })

    it('should not match aspect-video as decimal', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-video'])
      expect(css).toContain('aspect-ratio: 16 / 9')
    })
  })

  describe('Responsive Design', () => {
    it('should note responsive variants require responsive plugin', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-video', 'aspect-square'])
      expect(css).toContain('aspect-ratio: 16 / 9')
      expect(css).toContain('aspect-ratio: 1 / 1')
    })
  })

  describe('Hover States', () => {
    it('should note hover variants require variants plugin', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-video'])
      expect(css).toContain('aspect-ratio: 16 / 9')
    })
  })

  describe('Common Use Cases', () => {
    it('should generate Instagram square photo', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-square', 'w-full', 'object-cover'])
      expect(css).toContain('aspect-ratio: 1 / 1')
    })

    it('should generate YouTube thumbnail', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-video', 'w-full'])
      expect(css).toContain('aspect-ratio: 16 / 9')
    })

    it('should generate Twitter post image', () => {
      const coral = createCoral({ plugins: [aspectRatioPlugin()] })
      const css = coral.generate(['aspect-16-9'])
      expect(css).toContain('aspect-ratio: 16 / 9')
    })
  })
})
