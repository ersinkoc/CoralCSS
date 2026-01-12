/**
 * Tests for Performance Utilities Plugin
 */
import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { performancePlugin } from '../../../../../src/plugins/core/utilities/performance'

describe('Performance Utilities Plugin', () => {
  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = performancePlugin()
      expect(plugin.name).toBe('performance')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Will-Change Utilities', () => {
    it('should generate will-change-auto', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['will-change-auto'])
      expect(css).toContain('will-change: auto')
    })

    it('should generate will-change-scroll', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['will-change-scroll'])
      expect(css).toContain('will-change: scroll-position')
    })

    it('should generate will-change-contents', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['will-change-contents'])
      expect(css).toContain('will-change: contents')
    })

    it('should generate will-change-transform', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['will-change-transform'])
      expect(css).toContain('will-change: transform')
    })

    it('should generate will-change-opacity', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['will-change-opacity'])
      expect(css).toContain('will-change: opacity')
    })

    it('should generate will-change-filter', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['will-change-filter'])
      expect(css).toContain('will-change: filter')
    })

    it('should generate will-change-backdrop', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['will-change-backdrop'])
      expect(css).toContain('will-change: backdrop-filter')
    })

    it('should generate will-change-all', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['will-change-all'])
      expect(css).toContain('will-change: transform, opacity')
    })

    it('should generate will-change-animation', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['will-change-animation'])
      expect(css).toContain('will-change: transform, opacity, filter')
    })

    it('should generate will-change-position', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['will-change-position'])
      expect(css).toContain('will-change: top, left, right, bottom')
    })

    it('should generate will-change-size', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['will-change-size'])
      expect(css).toContain('will-change: width, height')
    })
  })

  describe('Backface Visibility', () => {
    it('should generate backface-visible', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['backface-visible'])
      expect(css).toContain('backface-visibility: visible')
    })

    it('should generate backface-hidden', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['backface-hidden'])
      expect(css).toContain('backface-visibility: hidden')
    })
  })

  describe('Content Visibility', () => {
    it('should generate content-visibility-auto', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['content-visibility-auto'])
      expect(css).toContain('content-visibility: auto')
    })

    it('should generate content-visibility-hidden', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['content-visibility-hidden'])
      expect(css).toContain('content-visibility: hidden')
    })

    it('should generate content-visibility-visible', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['content-visibility-visible'])
      expect(css).toContain('content-visibility: visible')
    })
  })

  describe('Contain Intrinsic Size', () => {
    it('should generate contain-intrinsic-none', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['contain-intrinsic-none'])
      expect(css).toContain('contain-intrinsic-size: none')
    })

    it('should generate contain-intrinsic-auto', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['contain-intrinsic-auto'])
      expect(css).toContain('contain-intrinsic-size: auto')
    })

    it('should generate contain-intrinsic-sm', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['contain-intrinsic-sm'])
      expect(css).toContain('contain-intrinsic-size: auto 200px')
    })

    it('should generate contain-intrinsic-md', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['contain-intrinsic-md'])
      expect(css).toContain('contain-intrinsic-size: auto 300px')
    })

    it('should generate contain-intrinsic-lg', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['contain-intrinsic-lg'])
      expect(css).toContain('contain-intrinsic-size: auto 500px')
    })

    it('should generate contain-intrinsic-xl', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['contain-intrinsic-xl'])
      expect(css).toContain('contain-intrinsic-size: auto 800px')
    })

    it('should generate contain-intrinsic-2xl', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['contain-intrinsic-2xl'])
      expect(css).toContain('contain-intrinsic-size: auto 1200px')
    })

    it('should generate contain-intrinsic-w-auto', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['contain-intrinsic-w-auto'])
      expect(css).toContain('contain-intrinsic-width: auto')
    })

    it('should generate contain-intrinsic-h-auto', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['contain-intrinsic-h-auto'])
      expect(css).toContain('contain-intrinsic-height: auto')
    })
  })

  describe('CSS Contain', () => {
    it('should generate contain-none', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['contain-none'])
      expect(css).toContain('contain: none')
    })

    it('should generate contain-strict', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['contain-strict'])
      expect(css).toContain('contain: strict')
    })

    it('should generate contain-content', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['contain-content'])
      expect(css).toContain('contain: content')
    })

    it('should generate contain-size', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['contain-size'])
      expect(css).toContain('contain: size')
    })

    it('should generate contain-layout', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['contain-layout'])
      expect(css).toContain('contain: layout')
    })

    it('should generate contain-style', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['contain-style'])
      expect(css).toContain('contain: style')
    })

    it('should generate contain-paint', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['contain-paint'])
      expect(css).toContain('contain: paint')
    })

    it('should generate contain-layout-paint', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['contain-layout-paint'])
      expect(css).toContain('contain: layout paint')
    })

    it('should generate contain-size-layout-paint', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['contain-size-layout-paint'])
      expect(css).toContain('contain: size layout paint')
    })
  })

  describe('Isolation', () => {
    it('should generate isolate', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['isolate'])
      expect(css).toContain('isolation: isolate')
    })

    it('should generate isolation-auto', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['isolation-auto'])
      expect(css).toContain('isolation: auto')
    })
  })

  describe('Paint Order', () => {
    it('should generate paint-order-normal', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['paint-order-normal'])
      expect(css).toContain('paint-order: normal')
    })

    it('should generate paint-order-stroke', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['paint-order-stroke'])
      expect(css).toContain('paint-order: stroke')
    })

    it('should generate paint-order-fill', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['paint-order-fill'])
      expect(css).toContain('paint-order: fill')
    })

    it('should generate paint-order-markers', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['paint-order-markers'])
      expect(css).toContain('paint-order: markers')
    })

    it('should generate paint-order-stroke-fill', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['paint-order-stroke-fill'])
      expect(css).toContain('paint-order: stroke fill')
    })

    it('should generate paint-order-fill-stroke', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['paint-order-fill-stroke'])
      expect(css).toContain('paint-order: fill stroke')
    })
  })

  describe('Image Rendering', () => {
    it('should generate image-render-auto', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['image-render-auto'])
      expect(css).toContain('image-rendering: auto')
    })

    it('should generate image-render-crisp', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['image-render-crisp'])
      expect(css).toContain('image-rendering: crisp-edges')
    })

    it('should generate image-render-pixelated', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['image-render-pixelated'])
      expect(css).toContain('image-rendering: pixelated')
    })

    it('should generate image-render-smooth', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['image-render-smooth'])
      expect(css).toContain('image-rendering: smooth')
    })

    it('should generate image-render-high-quality', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['image-render-high-quality'])
      expect(css).toContain('image-rendering: high-quality')
    })
  })

  describe('Text Rendering', () => {
    it('should generate text-render-auto', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['text-render-auto'])
      expect(css).toContain('text-rendering: auto')
    })

    it('should generate text-render-speed', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['text-render-speed'])
      expect(css).toContain('text-rendering: optimizeSpeed')
    })

    it('should generate text-render-legibility', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['text-render-legibility'])
      expect(css).toContain('text-rendering: optimizeLegibility')
    })

    it('should generate text-render-precision', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['text-render-precision'])
      expect(css).toContain('text-rendering: geometricPrecision')
    })
  })

  describe('Shape Rendering', () => {
    it('should generate shape-render-auto', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['shape-render-auto'])
      expect(css).toContain('shape-rendering: auto')
    })

    it('should generate shape-render-speed', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['shape-render-speed'])
      expect(css).toContain('shape-rendering: optimizeSpeed')
    })

    it('should generate shape-render-crisp', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['shape-render-crisp'])
      expect(css).toContain('shape-rendering: crispEdges')
    })

    it('should generate shape-render-precision', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['shape-render-precision'])
      expect(css).toContain('shape-rendering: geometricPrecision')
    })
  })

  describe('Color Rendering', () => {
    it('should generate color-render-auto', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['color-render-auto'])
      expect(css).toContain('color-rendering: auto')
    })

    it('should generate color-render-speed', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['color-render-speed'])
      expect(css).toContain('color-rendering: optimizeSpeed')
    })

    it('should generate color-render-quality', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['color-render-quality'])
      expect(css).toContain('color-rendering: optimizeQuality')
    })
  })

  describe('Font Smoothing', () => {
    it('should generate antialiased', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['antialiased'])
      expect(css).toContain('-webkit-font-smoothing: antialiased')
      expect(css).toContain('-moz-osx-font-smoothing: grayscale')
    })

    it('should generate subpixel-antialiased', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['subpixel-antialiased'])
      expect(css).toContain('-webkit-font-smoothing: auto')
      expect(css).toContain('-moz-osx-font-smoothing: auto')
    })
  })

  describe('GPU Acceleration Hints', () => {
    it('should generate gpu-layer', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['gpu-layer'])
      expect(css).toContain('transform: translateZ(0)')
      expect(css).toContain('will-change: transform')
    })

    it('should generate composited', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['composited'])
      expect(css).toContain('transform: translate3d(0, 0, 0)')
    })
  })

  describe('Virtual Scrolling Optimization', () => {
    it('should generate virtual-scroll-item', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['virtual-scroll-item'])
      expect(css).toContain('content-visibility: auto')
      expect(css).toContain('contain-intrinsic-size: auto 50px')
      expect(css).toContain('contain: layout style paint')
    })

    it('should generate virtual-scroll-row', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['virtual-scroll-row'])
      expect(css).toContain('content-visibility: auto')
      expect(css).toContain('contain-intrinsic-size: auto 40px')
      expect(css).toContain('contain: layout style paint')
    })

    it('should generate virtual-scroll-card', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['virtual-scroll-card'])
      expect(css).toContain('content-visibility: auto')
      expect(css).toContain('contain-intrinsic-size: 200px 300px')
      expect(css).toContain('contain: layout style paint')
    })
  })

  describe('Lazy Loading Optimization', () => {
    it('should generate lazy-content', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['lazy-content'])
      expect(css).toContain('content-visibility: auto')
      expect(css).toContain('contain-intrinsic-size: auto 500px')
    })

    it('should generate lazy-section', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['lazy-section'])
      expect(css).toContain('content-visibility: auto')
      expect(css).toContain('contain-intrinsic-size: auto 800px')
    })
  })

  describe('Arbitrary Values', () => {
    it('should generate will-change-[transform_opacity]', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['will-change-[transform_opacity]'])
      expect(css).toContain('will-change: transform opacity')
    })

    it('should generate contain-intrinsic-[auto_400px]', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['contain-intrinsic-[auto_400px]'])
      expect(css).toContain('contain-intrinsic-size: auto 400px')
    })

    it('should generate contain-[layout_paint]', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['contain-[layout_paint]'])
      expect(css).toContain('contain: layout paint')
    })
  })

  describe('Combined Performance Utilities', () => {
    it('should generate multiple will-change properties', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['will-change-transform', 'will-change-opacity'])
      expect(css).toContain('will-change: transform')
      expect(css).toContain('will-change: opacity')
    })

    it('should combine content-visibility with contain', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['content-visibility-auto', 'contain-layout-paint'])
      expect(css).toContain('content-visibility: auto')
      expect(css).toContain('contain: layout paint')
    })

    it('should combine GPU hints with will-change', () => {
      const coral = createCoral({ plugins: [performancePlugin()] })
      const css = coral.generate(['gpu-layer'])
      expect(css).toContain('transform: translateZ(0)')
      expect(css).toContain('will-change: transform')
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/utilities/performance'
      )
      expect(defaultExport).toBe(performancePlugin)
    })
  })
})
