/**
 * Tests for Text Decoration Utilities Plugin
 */
import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { textDecorationPlugin } from '../../../../../src/plugins/core/utilities/text-decoration'

describe('Text Decoration Utilities Plugin', () => {
  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = textDecorationPlugin()
      expect(plugin.name).toBe('text-decoration')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Text Decoration Line', () => {
    it('should generate underline', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['underline'])
      expect(css).toContain('text-decoration-line: underline')
    })

    it('should generate line-through', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['line-through'])
      expect(css).toContain('text-decoration-line: line-through')
    })

    it('should generate no-underline', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['no-underline'])
      expect(css).toContain('text-decoration-line: none')
    })
  })

  describe('Text Decoration Style', () => {
    it('should generate decoration-solid', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['decoration-solid'])
      expect(css).toContain('text-decoration-style: solid')
    })

    it('should generate decoration-double', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['decoration-double'])
      expect(css).toContain('text-decoration-style: double')
    })

    it('should generate decoration-dotted', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['decoration-dotted'])
      expect(css).toContain('text-decoration-style: dotted')
    })

    it('should generate decoration-dashed', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['decoration-dashed'])
      expect(css).toContain('text-decoration-style: dashed')
    })

    it('should generate decoration-wavy', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['decoration-wavy'])
      expect(css).toContain('text-decoration-style: wavy')
    })
  })

  describe('Text Decoration Thickness', () => {
    it('should generate decoration-auto', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['decoration-auto'])
      expect(css).toContain('text-decoration-thickness: auto')
    })

    it('should generate decoration-from-font', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['decoration-from-font'])
      expect(css).toContain('text-decoration-thickness: from-font')
    })

    it('should generate decoration-0', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['decoration-0'])
      expect(css).toContain('text-decoration-thickness: 0px')
    })

    it('should generate decoration-1', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['decoration-1'])
      expect(css).toContain('text-decoration-thickness: 1px')
    })

    it('should generate decoration-2', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['decoration-2'])
      expect(css).toContain('text-decoration-thickness: 2px')
    })

    it('should generate decoration-4', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['decoration-4'])
      expect(css).toContain('text-decoration-thickness: 4px')
    })

    it('should generate decoration-8', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['decoration-8'])
      expect(css).toContain('text-decoration-thickness: 8px')
    })
  })

  describe('Underline Offset', () => {
    it('should generate underline-offset-auto', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['underline-offset-auto'])
      expect(css).toContain('text-underline-offset: auto')
    })

    it('should generate underline-offset-0', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['underline-offset-0'])
      expect(css).toContain('text-underline-offset: 0px')
    })

    it('should generate underline-offset-1', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['underline-offset-1'])
      expect(css).toContain('text-underline-offset: 1px')
    })

    it('should generate underline-offset-2', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['underline-offset-2'])
      expect(css).toContain('text-underline-offset: 2px')
    })

    it('should generate underline-offset-4', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['underline-offset-4'])
      expect(css).toContain('text-underline-offset: 4px')
    })

    it('should generate underline-offset-8', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['underline-offset-8'])
      expect(css).toContain('text-underline-offset: 8px')
    })
  })

  describe('Text Decoration Color', () => {
    it('should generate decoration-coral-500 with CSS variable', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['decoration-coral-500'])
      expect(css).toContain('text-decoration-color: var(--color-coral-500)')
    })

    it('should generate decoration-blue-500', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['decoration-blue-500'])
      expect(css).toContain('text-decoration-color: var(--color-blue-500)')
    })

    it('should generate decoration-red-500', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['decoration-red-500'])
      expect(css).toContain('text-decoration-color: var(--color-red-500)')
    })

    it('should generate decoration-green-500', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['decoration-green-500'])
      expect(css).toContain('text-decoration-color: var(--color-green-500)')
    })

    it('should generate decoration-purple-500', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['decoration-purple-500'])
      expect(css).toContain('text-decoration-color: var(--color-purple-500)')
    })

    it('should generate decoration-white-50 (white with shade)', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['decoration-white-50'])
      expect(css).toContain('text-decoration-color: var(--color-white-50)')
    })

    it('should generate decoration-black-500 (black with shade)', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['decoration-black-500'])
      expect(css).toContain('text-decoration-color: var(--color-black-500)')
    })
  })

  describe('Text Emphasis', () => {
    it('should generate emphasis-dot', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['emphasis-dot'])
      expect(css).toContain('text-emphasis-style: dot')
      expect(css).toContain('text-emphasis-position: under')
    })

    it('should generate emphasis-circle', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['emphasis-circle'])
      expect(css).toContain('text-emphasis-style: circle')
      expect(css).toContain('text-emphasis-position: under')
    })

    it('should generate emphasis-double-circle', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['emphasis-double-circle'])
      expect(css).toContain('text-emphasis-style: double-circle')
      expect(css).toContain('text-emphasis-position: under')
    })

    it('should generate emphasis-triangle', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['emphasis-triangle'])
      expect(css).toContain('text-emphasis-style: triangle')
      expect(css).toContain('text-emphasis-position: under')
    })

    it('should generate emphasis-sesame', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['emphasis-sesame'])
      expect(css).toContain('text-emphasis-style: sesame')
      expect(css).toContain('text-emphasis-position: under')
    })

    it('should generate emphasis-none', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['emphasis-none'])
      expect(css).toContain('text-emphasis: none')
    })
  })

  describe('Combined Utilities', () => {
    it('should combine underline with wavy style', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['underline', 'decoration-wavy'])
      expect(css).toContain('text-decoration-line: underline')
      expect(css).toContain('text-decoration-style: wavy')
    })

    it('should combine underline with decoration color', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['underline', 'decoration-red-500'])
      expect(css).toContain('text-decoration-line: underline')
      expect(css).toContain('text-decoration-color: var(--color-red-500)')
    })

    it('should combine all decoration properties', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['underline', 'decoration-wavy', 'decoration-2', 'decoration-blue-500', 'underline-offset-4'])
      expect(css).toContain('text-decoration-line: underline')
      expect(css).toContain('text-decoration-style: wavy')
      expect(css).toContain('text-decoration-thickness: 2px')
      expect(css).toContain('text-decoration-color: var(--color-blue-500)')
      expect(css).toContain('text-underline-offset: 4px')
    })
  })

  describe('Common Use Cases', () => {
    it('should generate wavy underline', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['underline', 'decoration-wavy', 'decoration-coral-500'])
      expect(css).toContain('text-decoration-line: underline')
      expect(css).toContain('text-decoration-style: wavy')
      expect(css).toContain('text-decoration-color: var(--color-coral-500)')
    })

    it('should generate double underline', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['underline', 'decoration-double', 'decoration-2'])
      expect(css).toContain('text-decoration-line: underline')
      expect(css).toContain('text-decoration-style: double')
      expect(css).toContain('text-decoration-thickness: 2px')
    })

    it('should generate strikethrough text', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['line-through', 'decoration-red-500'])
      expect(css).toContain('text-decoration-line: line-through')
      expect(css).toContain('text-decoration-color: var(--color-red-500)')
    })
  })

  describe('Responsive Design', () => {
    it('should note responsive variants require responsive plugin', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['no-underline', 'underline'])
      expect(css).toContain('text-decoration-line: none')
      expect(css).toContain('text-decoration-line: underline')
    })
  })

  describe('Hover States', () => {
    it('should note hover variants require variants plugin', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['underline', 'decoration-coral-500'])
      expect(css).toContain('text-decoration-line: underline')
      expect(css).toContain('text-decoration-color: var(--color-coral-500)')
    })
  })

  describe('Arbitrary Values', () => {
    it('should generate arbitrary decoration-[3px]', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['decoration-[3px]'])
      expect(css).toContain('text-decoration-thickness: 3px')
    })

    it('should generate arbitrary decoration-[0.5em]', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['decoration-[0.5em]'])
      expect(css).toContain('text-decoration-thickness: 0.5em')
    })

    it('should return null for empty decoration-[]', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['decoration-[]'])
      expect(css).toBe('')
    })

    it('should generate arbitrary underline-offset-[6px]', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['underline-offset-[6px]'])
      expect(css).toContain('text-underline-offset: 6px')
    })

    it('should generate arbitrary underline-offset-[0.3em]', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['underline-offset-[0.3em]'])
      expect(css).toContain('text-underline-offset: 0.3em')
    })

    it('should return null for empty underline-offset-[]', () => {
      const coral = createCoral({ plugins: [textDecorationPlugin()] })
      const css = coral.generate(['underline-offset-[]'])
      expect(css).toBe('')
    })
  })
})
