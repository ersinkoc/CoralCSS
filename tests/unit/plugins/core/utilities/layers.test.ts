/**
 * Tests for CSS Cascade Layers Plugin
 */
import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import {
  layersPlugin,
  generateLayerDeclaration,
  generateBaseResetLayer,
  generateBaseLayer,
  generateLayerSystem,
} from '../../../../../src/plugins/core/utilities/layers'

describe('Layers Utilities Plugin', () => {
  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      const coral = createCoral({ plugins: [layersPlugin()] })
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = layersPlugin()
      expect(plugin.name).toBe('layers')
      expect(plugin.version).toBe('1.0.0')
    })

    it('should accept custom layer order', () => {
      const plugin = layersPlugin({
        order: ['custom', 'base', 'utilities']
      })
      expect(plugin.name).toBe('layers')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Layer Declaration', () => {
    it('should generate @layer-declaration', () => {
      const coral = createCoral({ plugins: [layersPlugin()] })
      const css = coral.generate(['@layer-declaration'])
      expect(css).toContain('--coral-layers:')
    })

    it('should include all default layers in declaration', () => {
      const coral = createCoral({ plugins: [layersPlugin()] })
      const css = coral.generate(['@layer-declaration'])
      expect(css).toContain('reset')
      expect(css).toContain('base')
      expect(css).toContain('components')
      expect(css).toContain('utilities')
      expect(css).toContain('variants')
      expect(css).toContain('overrides')
    })

    it('should include custom layers in declaration', () => {
      const coral = createCoral({
        plugins: [layersPlugin({ order: ['custom', 'base', 'utilities'] })]
      })
      const css = coral.generate(['@layer-declaration'])
      expect(css).toContain('custom')
      expect(css).toContain('base')
      expect(css).toContain('utilities')
    })
  })

  describe('In-Layer Utilities', () => {
    it('should generate in-layer-reset', () => {
      const coral = createCoral({ plugins: [layersPlugin()] })
      const css = coral.generate(['in-layer-reset'])
      expect(css).toContain('--coral-current-layer: reset')
    })

    it('should generate in-layer-base', () => {
      const coral = createCoral({ plugins: [layersPlugin()] })
      const css = coral.generate(['in-layer-base'])
      expect(css).toContain('--coral-current-layer: base')
    })

    it('should generate in-layer-components', () => {
      const coral = createCoral({ plugins: [layersPlugin()] })
      const css = coral.generate(['in-layer-components'])
      expect(css).toContain('--coral-current-layer: components')
    })

    it('should generate in-layer-utilities', () => {
      const coral = createCoral({ plugins: [layersPlugin()] })
      const css = coral.generate(['in-layer-utilities'])
      expect(css).toContain('--coral-current-layer: utilities')
    })

    it('should generate in-layer-variants', () => {
      const coral = createCoral({ plugins: [layersPlugin()] })
      const css = coral.generate(['in-layer-variants'])
      expect(css).toContain('--coral-current-layer: variants')
    })

    it('should generate in-layer-overrides', () => {
      const coral = createCoral({ plugins: [layersPlugin()] })
      const css = coral.generate(['in-layer-overrides'])
      expect(css).toContain('--coral-current-layer: overrides')
    })

    it('should generate in-layer-[custom]', () => {
      const coral = createCoral({ plugins: [layersPlugin()] })
      const css = coral.generate(['in-layer-[custom]'])
      expect(css).toContain('--coral-current-layer: custom')
    })

    it('should generate in-layer-[theme-dark]', () => {
      const coral = createCoral({ plugins: [layersPlugin()] })
      const css = coral.generate(['in-layer-[theme-dark]'])
      expect(css).toContain('--coral-current-layer: theme-dark')
    })
  })

  describe('Layer Assignment with Custom Order', () => {
    it('should respect custom layer order for in-layer utilities', () => {
      const coral = createCoral({
        plugins: [layersPlugin({ order: ['theme', 'base', 'components'] })]
      })
      const css = coral.generate(['in-layer-theme'])
      expect(css).toContain('--coral-current-layer: theme')
    })
  })

  describe('Helper Functions', () => {
    describe('generateLayerDeclaration', () => {
      it('should generate default layer declaration', () => {
        const result = generateLayerDeclaration()
        expect(result).toBe('@layer reset, base, components, utilities, variants, overrides;')
      })

      it('should generate custom layer declaration', () => {
        const result = generateLayerDeclaration(['theme', 'base', 'utilities'])
        expect(result).toBe('@layer theme, base, utilities;')
      })

      it('should handle single layer', () => {
        const result = generateLayerDeclaration(['base'])
        expect(result).toBe('@layer base;')
      })
    })

    describe('generateBaseResetLayer', () => {
      it('should generate box-sizing reset', () => {
        const result = generateBaseResetLayer()
        expect(result).toContain('@layer reset')
        expect(result).toContain('box-sizing: border-box')
      })

      it('should generate margin/padding reset', () => {
        const result = generateBaseResetLayer()
        expect(result).toContain('margin: 0')
        expect(result).toContain('padding: 0')
      })

      it('should generate html line-height', () => {
        const result = generateBaseResetLayer()
        expect(result).toContain('line-height: 1.5')
      })

      it('should generate body font-family', () => {
        const result = generateBaseResetLayer()
        expect(result).toContain('font-family: system-ui')
      })

      it('should generate image display rules', () => {
        const result = generateBaseResetLayer()
        expect(result).toContain('img, picture, video, canvas, svg')
        expect(result).toContain('display: block')
      })
    })

    describe('generateBaseLayer', () => {
      it('should generate @layer base', () => {
        const result = generateBaseLayer()
        expect(result).toContain('@layer base')
      })

      it('should generate CSS custom properties', () => {
        const result = generateBaseLayer()
        expect(result).toContain('--coral-font-sans:')
        expect(result).toContain('--coral-font-serif:')
        expect(result).toContain('--coral-font-mono:')
      })

      it('should generate color-scheme', () => {
        const result = generateBaseLayer()
        expect(result).toContain('color-scheme: light dark')
      })

      it('should generate body styles', () => {
        const result = generateBaseLayer()
        expect(result).toContain('color: var(--coral-color-foreground')
        expect(result).toContain('background-color: var(--coral-color-background')
      })

      it('should generate ::selection styles', () => {
        const result = generateBaseLayer()
        expect(result).toContain('::selection')
        expect(result).toContain('background-color: var(--coral-color-accent')
      })

      it('should generate :focus-visible styles', () => {
        const result = generateBaseLayer()
        expect(result).toContain(':focus-visible')
        expect(result).toContain('outline: 2px solid')
        expect(result).toContain('outline-offset: 2px')
      })
    })

    describe('generateLayerSystem', () => {
      it('should generate full layer system with defaults', () => {
        const result = generateLayerSystem()
        expect(result).toContain('@layer reset, base, components, utilities, variants, overrides;')
        expect(result).toContain('@layer reset')
        expect(result).toContain('@layer base')
      })

      it('should generate without reset when disabled', () => {
        const result = generateLayerSystem({ includeReset: false })
        expect(result).toContain('@layer reset, base')
        expect(result).not.toContain('@layer reset {')
      })

      it('should generate without base when disabled', () => {
        const result = generateLayerSystem({ includeBase: false })
        expect(result).toContain('@layer reset, base')
        // Reset should still be included
        expect(result).toContain('@layer reset {')
      })

      it('should generate with custom layers', () => {
        const result = generateLayerSystem({
          layers: ['theme', 'components', 'utilities']
        })
        expect(result).toContain('@layer theme, components, utilities;')
      })

      it('should combine all options correctly', () => {
        const result = generateLayerSystem({
          includeReset: true,
          includeBase: true,
          layers: ['reset', 'base', 'utilities']
        })
        expect(result).toContain('@layer reset, base, utilities;')
        expect(result).toContain('@layer reset {')
        expect(result).toContain('@layer base {')
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty custom layer order', () => {
      const plugin = layersPlugin({ order: [] })
      expect(plugin).toBeDefined()
    })

    it('should handle arbitrary layer with special characters', () => {
      const coral = createCoral({ plugins: [layersPlugin()] })
      const css = coral.generate(['in-layer-[my-custom_layer]'])
      expect(css).toContain('--coral-current-layer: my-custom_layer')
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/utilities/layers'
      )
      expect(defaultExport).toBe(layersPlugin)
    })
  })

  describe('Combined Layer Utilities', () => {
    it('should generate multiple in-layer utilities', () => {
      const coral = createCoral({ plugins: [layersPlugin()] })
      const css = coral.generate(['in-layer-reset', 'in-layer-base'])
      expect(css).toContain('--coral-current-layer: reset')
      expect(css).toContain('--coral-current-layer: base')
    })

    it('should generate layer declaration with in-layer utilities', () => {
      const coral = createCoral({ plugins: [layersPlugin()] })
      const css = coral.generate(['@layer-declaration', 'in-layer-utilities'])
      expect(css).toContain('--coral-layers:')
      expect(css).toContain('--coral-current-layer: utilities')
    })
  })
})
