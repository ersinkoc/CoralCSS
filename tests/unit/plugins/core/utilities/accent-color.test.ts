/**
 * Tests for Accent Color Utilities Plugin
 */
import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { accentColorPlugin } from '../../../../../src/plugins/core/utilities/accent-color'

describe('Accent Color Utilities Plugin', () => {
  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = accentColorPlugin()
      expect(plugin.name).toBe('accent-color')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Accent Color Values', () => {
    it('should generate accent-coral-500', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      const css = coral.generate(['accent-coral-500'])
      expect(css).toContain('accent-color: var(--color-coral-500)')
    })

    it('should generate accent-blue-500', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      const css = coral.generate(['accent-blue-500'])
      expect(css).toContain('accent-color: var(--color-blue-500)')
    })

    it('should generate accent-red-500', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      const css = coral.generate(['accent-red-500'])
      expect(css).toContain('accent-color: var(--color-red-500)')
    })

    it('should generate accent-green-500', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      const css = coral.generate(['accent-green-500'])
      expect(css).toContain('accent-color: var(--color-green-500)')
    })

    it('should generate accent-purple-500', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      const css = coral.generate(['accent-purple-500'])
      expect(css).toContain('accent-color: var(--color-purple-500)')
    })
  })

  describe('Accent Color Keywords', () => {
    it('should generate accent-auto', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      const css = coral.generate(['accent-auto'])
      expect(css).toContain('accent-color: auto')
    })

    it('should generate accent-current', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      const css = coral.generate(['accent-current'])
      expect(css).toContain('accent-color: currentColor')
    })

    it('should generate accent-transparent', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      const css = coral.generate(['accent-transparent'])
      expect(css).toContain('accent-color: transparent')
    })

    it('should generate accent-white', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      const css = coral.generate(['accent-white'])
      expect(css).toContain('accent-color: #ffffff')
    })

    it('should generate accent-black', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      const css = coral.generate(['accent-black'])
      expect(css).toContain('accent-color: #000000')
    })
  })

  describe('Different Color Shades', () => {
    it('should generate accent-coral-100', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      const css = coral.generate(['accent-coral-100'])
      expect(css).toContain('accent-color: var(--color-coral-100)')
    })

    it('should generate accent-coral-300', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      const css = coral.generate(['accent-coral-300'])
      expect(css).toContain('accent-color: var(--color-coral-300)')
    })

    it('should generate accent-coral-600', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      const css = coral.generate(['accent-coral-600'])
      expect(css).toContain('accent-color: var(--color-coral-600)')
    })

    it('should generate accent-coral-900', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      const css = coral.generate(['accent-coral-900'])
      expect(css).toContain('accent-color: var(--color-coral-900)')
    })
  })

  describe('Common Use Cases', () => {
    it('should generate custom checkbox accent', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      const css = coral.generate(['accent-coral-500'])
      expect(css).toContain('accent-color: var(--color-coral-500)')
    })

    it('should generate custom radio accent', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      const css = coral.generate(['accent-blue-600'])
      expect(css).toContain('accent-color: var(--color-blue-600)')
    })

    it('should generate custom progress bar accent', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      const css = coral.generate(['accent-green-500'])
      expect(css).toContain('accent-color: var(--color-green-500)')
    })

    it('should generate custom range slider accent', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      const css = coral.generate(['accent-purple-500'])
      expect(css).toContain('accent-color: var(--color-purple-500)')
    })
  })

  describe('Form Elements', () => {
    it('should style checkbox with accent color', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      const css = coral.generate(['accent-coral-500', 'w-5', 'h-5'])
      expect(css).toContain('accent-color: var(--color-coral-500)')
    })

    it('should style radio with accent color', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      const css = coral.generate(['accent-blue-600', 'w-5', 'h-5'])
      expect(css).toContain('accent-color: var(--color-blue-600)')
    })

    it('should style range input with accent color', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      const css = coral.generate(['accent-green-500', 'w-full'])
      expect(css).toContain('accent-color: var(--color-green-500)')
    })

    it('should style progress element with accent color', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      const css = coral.generate(['accent-purple-500', 'w-full'])
      expect(css).toContain('accent-color: var(--color-purple-500)')
    })
  })

  describe('Responsive Design', () => {
    it('should work with responsive variants (when responsive plugin is used)', () => {
      const coral = createCoral({
        plugins: [accentColorPlugin()],
      })
      const css = coral.generate(['accent-coral-500', 'accent-blue-500'])
      expect(css).toContain('accent-color: var(--color-coral-500)')
      expect(css).toContain('accent-color: var(--color-blue-500)')
    })
  })

  describe('Dark Mode', () => {
    it('should work with dark mode variants (when dark mode plugin is used)', () => {
      const coral = createCoral({
        plugins: [accentColorPlugin()],
      })
      const css = coral.generate(['accent-coral-500'])
      expect(css).toContain('accent-color: var(--color-coral-500)')
    })
  })

  describe('Arbitrary Accent Colors', () => {
    it('should generate arbitrary accent-[#ff0000]', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      const css = coral.generate(['accent-[#ff0000]'])
      expect(css).toContain('accent-color: #ff0000')
    })

    it('should generate arbitrary accent-[rgb(255,0,0)]', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      const css = coral.generate(['accent-[rgb(255,0,0)]'])
      expect(css).toContain('accent-color: rgb(255,0,0)')
    })

    it('should generate arbitrary accent-[hsl(0,100%,50%)]', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      const css = coral.generate(['accent-[hsl(0,100%,50%)]'])
      expect(css).toContain('accent-color: hsl(0,100%,50%)')
    })

    it('should replace underscores with spaces in arbitrary values', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      const css = coral.generate(['accent-[rgb(255,_0,_0)]'])
      expect(css).toContain('accent-color: rgb(255, 0, 0)')
    })

    it('should replace multiple underscores with spaces', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      const css = coral.generate(['accent-[1rem_2rem_3px]'])
      expect(css).toContain('accent-color: 1rem 2rem 3px')
    })

    it('should handle empty arbitrary accent-[]', () => {
      const coral = createCoral({ plugins: [accentColorPlugin()] })
      const css = coral.generate(['accent-[]'])
      expect(css).toBe('')
    })
  })

  describe('All Color Palettes', () => {
    const colors = [
      'coral', 'slate', 'gray', 'zinc', 'neutral', 'stone',
      'red', 'orange', 'amber', 'yellow', 'lime', 'green',
      'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo',
      'violet', 'purple', 'fuchsia', 'pink', 'rose',
    ]

    colors.forEach((color) => {
      it(`should generate accent-${color}-500`, () => {
        const coral = createCoral({ plugins: [accentColorPlugin()] })
        const css = coral.generate([`accent-${color}-500`])
        expect(css).toContain(`accent-color: var(--color-${color}-500)`)
      })
    })
  })

  describe('All Shades', () => {
    const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']

    shades.forEach((shade) => {
      it(`should generate accent-coral-${shade}`, () => {
        const coral = createCoral({ plugins: [accentColorPlugin()] })
        const css = coral.generate([`accent-coral-${shade}`])
        expect(css).toContain(`accent-color: var(--color-coral-${shade})`)
      })
    })
  })
})
