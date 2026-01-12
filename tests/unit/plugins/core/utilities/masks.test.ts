/**
 * Tests for Mask & Clip-Path Utilities Plugin
 */
import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { masksPlugin } from '../../../../../src/plugins/core/utilities/masks'

describe('Masks Utilities Plugin', () => {
  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = masksPlugin()
      expect(plugin.name).toBe('masks')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Clip-Path Basic Shapes', () => {
    it('should generate clip-none', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['clip-none'])
      expect(css).toContain('clip-path: none')
    })

    it('should generate clip-circle', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['clip-circle'])
      expect(css).toContain('clip-path: circle(50%)')
    })

    it('should generate clip-circle-sm', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['clip-circle-sm'])
      expect(css).toContain('clip-path: circle(40%)')
    })

    it('should generate clip-circle-lg', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['clip-circle-lg'])
      expect(css).toContain('clip-path: circle(60%)')
    })

    it('should generate clip-ellipse', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['clip-ellipse'])
      expect(css).toContain('clip-path: ellipse(50% 40% at 50% 50%)')
    })

    it('should generate clip-inset', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['clip-inset'])
      expect(css).toContain('clip-path: inset(10%)')
    })
  })

  describe('Clip-Path Polygons', () => {
    it('should generate clip-triangle', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['clip-triangle'])
      expect(css).toContain('clip-path: polygon(50% 0%, 0% 100%, 100% 100%)')
    })

    it('should generate clip-triangle-down', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['clip-triangle-down'])
      expect(css).toContain('clip-path: polygon(0% 0%, 100% 0%, 50% 100%)')
    })

    it('should generate clip-rhombus', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['clip-rhombus'])
      expect(css).toContain('clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)')
    })

    it('should generate clip-pentagon', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['clip-pentagon'])
      expect(css).toContain('clip-path: polygon(50% 0%, 100% 38%')
    })

    it('should generate clip-hexagon', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['clip-hexagon'])
      expect(css).toContain('clip-path: polygon(25% 0%, 75% 0%, 100% 50%')
    })

    it('should generate clip-octagon', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['clip-octagon'])
      expect(css).toContain('clip-path: polygon(30% 0%, 70% 0%, 100% 30%')
    })
  })

  describe('Clip-Path Arrows & Chevrons', () => {
    it('should generate clip-arrow-right', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['clip-arrow-right'])
      expect(css).toContain('clip-path: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%')
    })

    it('should generate clip-arrow-left', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['clip-arrow-left'])
      expect(css).toContain('clip-path: polygon(40% 0%, 40% 20%')
    })

    it('should generate clip-chevron-right', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['clip-chevron-right'])
      expect(css).toContain('clip-path: polygon(75% 0%, 100% 50%, 75% 100%')
    })
  })

  describe('Clip-Path Stars', () => {
    it('should generate clip-star-4', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['clip-star-4'])
      expect(css).toContain('clip-path: polygon(50% 0%, 61% 35%')
    })

    it('should generate clip-star-5', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['clip-star-5'])
      expect(css).toContain('clip-path: polygon(50% 0%, 61% 35%')
    })

    it('should generate clip-star-6', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['clip-star-6'])
      expect(css).toContain('clip-path: polygon(50% 0%, 60% 30%')
    })
  })

  describe('Clip-Path Special Shapes', () => {
    it('should generate clip-cross', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['clip-cross'])
      expect(css).toContain('clip-path: polygon(35% 0%, 65% 0%')
    })

    it('should generate clip-corner-tr', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['clip-corner-tr'])
      expect(css).toContain('clip-path: polygon(0% 0%, 100% 0%')
    })

    it('should generate clip-notch-all', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['clip-notch-all'])
      expect(css).toContain('clip-path: polygon(10% 0%, 90% 0%')
    })

    it('should generate clip-wave-top', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['clip-wave-top'])
      expect(css).toContain('clip-path: polygon(0% 10%, 5% 15%')
    })
  })

  describe('Mask Image Utilities', () => {
    it('should generate mask-none', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['mask-none'])
      expect(css).toContain('mask-image: none')
      expect(css).toContain('-webkit-mask-image: none')
    })

    it('should generate mask-linear', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['mask-linear'])
      expect(css).toContain('mask-image: linear-gradient(to bottom, black, transparent)')
      expect(css).toContain('-webkit-mask-image: linear-gradient(to bottom, black, transparent)')
    })

    it('should generate mask-linear-t', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['mask-linear-t'])
      expect(css).toContain('mask-image: linear-gradient(to top, black, transparent)')
    })

    it('should generate mask-radial', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['mask-radial'])
      expect(css).toContain('mask-image: radial-gradient(circle, black, transparent)')
      expect(css).toContain('-webkit-mask-image: radial-gradient(circle, black, transparent)')
    })

    it('should generate mask-radial-sm', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['mask-radial-sm'])
      expect(css).toContain('mask-image: radial-gradient(circle at center, black 30%, transparent 70%)')
    })

    it('should generate mask-fade-y', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['mask-fade-y'])
      expect(css).toContain('mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)')
    })

    it('should generate mask-fade-x', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['mask-fade-x'])
      expect(css).toContain('mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent)')
    })

    it('should generate mask-fade-all', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['mask-fade-all'])
      expect(css).toContain('mask-image: radial-gradient(ellipse at center, black 50%, transparent 100%)')
    })
  })

  describe('Mask Size Utilities', () => {
    it('should generate mask-auto', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['mask-auto'])
      expect(css).toContain('mask-size: auto')
      expect(css).toContain('-webkit-mask-size: auto')
    })

    it('should generate mask-cover', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['mask-cover'])
      expect(css).toContain('mask-size: cover')
      expect(css).toContain('-webkit-mask-size: cover')
    })

    it('should generate mask-contain', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['mask-contain'])
      expect(css).toContain('mask-size: contain')
    })
  })

  describe('Mask Repeat Utilities', () => {
    it('should generate mask-repeat', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['mask-repeat'])
      expect(css).toContain('mask-repeat: repeat')
      expect(css).toContain('-webkit-mask-repeat: repeat')
    })

    it('should generate mask-no-repeat', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['mask-no-repeat'])
      expect(css).toContain('mask-repeat: no-repeat')
    })

    it('should generate mask-repeat-x', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['mask-repeat-x'])
      expect(css).toContain('mask-repeat: repeat-x')
    })

    it('should generate mask-repeat-space', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['mask-repeat-space'])
      expect(css).toContain('mask-repeat: space')
    })
  })

  describe('Mask Position Utilities', () => {
    it('should generate mask-center', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['mask-center'])
      expect(css).toContain('mask-position: center')
    })

    it('should generate mask-top-left', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['mask-top-left'])
      expect(css).toContain('mask-position: top left')
    })

    it('should generate mask-bottom-right', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['mask-bottom-right'])
      expect(css).toContain('mask-position: bottom right')
    })
  })

  describe('Mask Composite Utilities', () => {
    it('should generate mask-composite-add', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['mask-composite-add'])
      expect(css).toContain('mask-composite: add')
      expect(css).toContain('-webkit-mask-composite: source-over')
    })

    it('should generate mask-composite-subtract', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['mask-composite-subtract'])
      expect(css).toContain('mask-composite: subtract')
      expect(css).toContain('-webkit-mask-composite: source-out')
    })

    it('should generate mask-composite-intersect', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['mask-composite-intersect'])
      expect(css).toContain('mask-composite: intersect')
    })
  })

  describe('Mask Mode Utilities', () => {
    it('should generate mask-mode-alpha', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['mask-mode-alpha'])
      expect(css).toContain('mask-mode: alpha')
    })

    it('should generate mask-mode-luminance', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['mask-mode-luminance'])
      expect(css).toContain('mask-mode: luminance')
    })
  })

  describe('Mask Origin & Clip', () => {
    it('should generate mask-origin-border', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['mask-origin-border'])
      expect(css).toContain('mask-origin: border-box')
    })

    it('should generate mask-clip-content', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['mask-clip-content'])
      expect(css).toContain('mask-clip: content-box')
    })
  })

  describe('Shape Outside Utilities', () => {
    it('should generate shape-none', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['shape-none'])
      expect(css).toContain('shape-outside: none')
    })

    it('should generate shape-circle', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['shape-circle'])
      expect(css).toContain('shape-outside: circle(50%)')
    })

    it('should generate shape-ellipse', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['shape-ellipse'])
      expect(css).toContain('shape-outside: ellipse(50% 40%)')
    })

    it('should generate shape-inset', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['shape-inset'])
      expect(css).toContain('shape-outside: inset(10%)')
    })
  })

  describe('Shape Margin Utilities', () => {
    it('should generate shape-margin-0', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['shape-margin-0'])
      expect(css).toContain('shape-margin: 0')
    })

    it('should generate shape-margin-4', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['shape-margin-4'])
      expect(css).toContain('shape-margin: 1rem')
    })

    it('should generate shape-margin-8', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['shape-margin-8'])
      expect(css).toContain('shape-margin: 2rem')
    })
  })

  describe('Shape Image Threshold', () => {
    it('should generate shape-image-threshold-0', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['shape-image-threshold-0'])
      expect(css).toContain('shape-image-threshold: 0')
    })

    it('should generate shape-image-threshold-50', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['shape-image-threshold-50'])
      expect(css).toContain('shape-image-threshold: 0.5')
    })

    it('should generate shape-image-threshold-100', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['shape-image-threshold-100'])
      expect(css).toContain('shape-image-threshold: 1')
    })
  })

  describe('Arbitrary Values', () => {
    it('should generate clip-[polygon(50%_0%,_100%_50%,_50%_100%,_0%_50%)]', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['clip-[polygon(50%_0%,_100%_50%,_50%_100%,_0%_50%)]'])
      expect(css).toContain('clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)')
    })

    it('should generate mask-[url(#mask)]', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['mask-[url(#mask)]'])
      expect(css).toContain('mask-image: url(#mask)')
      expect(css).toContain('-webkit-mask-image: url(#mask)')
    })

    it('should generate mask-size-[50%_50%]', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['mask-size-[50%_50%]'])
      expect(css).toContain('mask-size: 50% 50%')
    })

    it('should generate shape-[circle(40%)]', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['shape-[circle(40%)]'])
      expect(css).toContain('shape-outside: circle(40%)')
    })

    it('should generate shape-margin-[10px]', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['shape-margin-[10px]'])
      expect(css).toContain('shape-margin: 10px')
    })
  })

  describe('Combined Mask Utilities', () => {
    it('should generate mask with size and position', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['mask-linear', 'mask-cover', 'mask-center'])
      expect(css).toContain('mask-image:')
      expect(css).toContain('mask-size: cover')
      expect(css).toContain('mask-position: center')
    })

    it('should generate clip-path with shape outside', () => {
      const coral = createCoral({ plugins: [masksPlugin()] })
      const css = coral.generate(['clip-circle', 'shape-circle'])
      expect(css).toContain('clip-path:')
      expect(css).toContain('shape-outside:')
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/utilities/masks'
      )
      expect(defaultExport).toBe(masksPlugin)
    })
  })
})
