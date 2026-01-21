/**
 * Tests for Interactive Utilities Plugin
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { interactiveUtilitiesPlugin } from '../../../../../src/plugins/core/utilities/interactive'

describe('Interactive Utilities Plugin', () => {
  let coral: ReturnType<typeof createCoral>

  beforeEach(() => {
    coral = createCoral()
    coral.use(interactiveUtilitiesPlugin())
  })

  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = interactiveUtilitiesPlugin()
      expect(plugin.name).toBe('interactive-utilities')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Cursor Utilities', () => {
    it('should generate cursor-auto', () => {
      const css = coral.generate(['cursor-auto'])
      expect(css).toContain('cursor')
      expect(css).toContain('auto')
    })

    it('should generate cursor-pointer', () => {
      const css = coral.generate(['cursor-pointer'])
      expect(css).toContain('cursor')
      expect(css).toContain('pointer')
    })

    it('should generate cursor-not-allowed', () => {
      const css = coral.generate(['cursor-not-allowed'])
      expect(css).toContain('cursor')
      expect(css).toContain('not-allowed')
    })

    it('should generate cursor-grab', () => {
      const css = coral.generate(['cursor-grab'])
      expect(css).toContain('cursor')
      expect(css).toContain('grab')
    })

    it('should generate cursor-grabbing', () => {
      const css = coral.generate(['cursor-grabbing'])
      expect(css).toContain('cursor')
      expect(css).toContain('grabbing')
    })

    it('should generate cursor-zoom-in', () => {
      const css = coral.generate(['cursor-zoom-in'])
      expect(css).toContain('cursor')
      expect(css).toContain('zoom-in')
    })

    it('should generate cursor-zoom-out', () => {
      const css = coral.generate(['cursor-zoom-out'])
      expect(css).toContain('cursor')
      expect(css).toContain('zoom-out')
    })

    it('should generate cursor-crosshair', () => {
      const css = coral.generate(['cursor-crosshair'])
      expect(css).toContain('cursor')
      expect(css).toContain('crosshair')
    })

    it('should generate custom cursor-url', () => {
      const css = coral.generate(['cursor-[url(cursor.png)]'])
      expect(css).toContain('cursor')
      expect(css).toContain('url(cursor.png)')
    })

    it('should return null for empty cursor-url', () => {
      const css = coral.generate(['cursor-[url()]'])
      expect(css).toBe('')
    })
  })

  describe('Selection Utilities', () => {
    it('should generate selection-primary', () => {
      const css = coral.generate(['selection-primary'])
      expect(css).toContain('.selection-primary')
      expect(css).toContain('background-color')
    })

    it('should generate selection-text-primary', () => {
      const css = coral.generate(['selection-text-primary'])
      expect(css).toContain('.selection-text-primary')
      expect(css).toContain('color')
    })

    it('should generate selection-red-500', () => {
      const css = coral.generate(['selection-red-500'])
      expect(css).toContain('.selection-red-500')
      expect(css).toContain('#ef4444')
    })

    it('should generate selection-blue-500', () => {
      const css = coral.generate(['selection-blue-500'])
      expect(css).toContain('.selection-blue-500')
      expect(css).toContain('#3b82f6')
    })

    it('should generate selection-green-500', () => {
      const css = coral.generate(['selection-green-500'])
      expect(css).toContain('.selection-green-500')
      expect(css).toContain('#22c55e')
    })

    it('should generate selection-inherit', () => {
      const css = coral.generate(['selection-inherit'])
      expect(css).toContain('.selection-inherit')
      expect(css).toContain('inherit')
    })

    it('should generate selection-transparent', () => {
      const css = coral.generate(['selection-transparent'])
      expect(css).toContain('.selection-transparent')
      expect(css).toContain('transparent')
    })

    it('should generate select-none', () => {
      const css = coral.generate(['select-none'])
      expect(css).toContain('user-select')
      expect(css).toContain('none')
    })

    it('should generate select-text', () => {
      const css = coral.generate(['select-text'])
      expect(css).toContain('user-select')
      expect(css).toContain('text')
    })

    it('should generate select-all', () => {
      const css = coral.generate(['select-all'])
      expect(css).toContain('user-select')
      expect(css).toContain('all')
    })

    it('should generate select-auto', () => {
      const css = coral.generate(['select-auto'])
      expect(css).toContain('user-select')
      expect(css).toContain('auto')
    })

    it('should generate select-contain', () => {
      const css = coral.generate(['select-contain'])
      expect(css).toContain('user-select')
      expect(css).toContain('contain')
    })
  })

  describe('Caret Color Utilities', () => {
    it('should generate caret-primary', () => {
      const css = coral.generate(['caret-primary'])
      expect(css).toContain('caret-color')
      expect(css).toContain('var(--coral-primary')
    })

    it('should generate caret-red-500', () => {
      const css = coral.generate(['caret-red-500'])
      expect(css).toContain('caret-color')
      expect(css).toContain('#ef4444')
    })

    it('should generate caret-blue-500', () => {
      const css = coral.generate(['caret-blue-500'])
      expect(css).toContain('caret-color')
      expect(css).toContain('#3b82f6')
    })

    it('should generate caret-green-500', () => {
      const css = coral.generate(['caret-green-500'])
      expect(css).toContain('caret-color')
      expect(css).toContain('#22c55e')
    })

    it('should generate caret-inherit', () => {
      const css = coral.generate(['caret-inherit'])
      expect(css).toContain('caret-color')
      expect(css).toContain('inherit')
    })

    it('should generate caret-current', () => {
      const css = coral.generate(['caret-current'])
      expect(css).toContain('caret-color')
      expect(css).toContain('currentColor')
    })

    it('should generate caret-transparent', () => {
      const css = coral.generate(['caret-transparent'])
      expect(css).toContain('caret-color')
      expect(css).toContain('transparent')
    })

    it('should generate arbitrary caret-[#ff0000]', () => {
      const css = coral.generate(['caret-[#ff0000]'])
      expect(css).toContain('caret-color')
      expect(css).toContain('#ff0000')
    })

    it('should return null for caret-[]', () => {
      const css = coral.generate(['caret-[]'])
      expect(css).toBe('')
    })
  })

  describe('Accent Color Utilities', () => {
    it('should generate accent-primary', () => {
      const css = coral.generate(['accent-primary'])
      expect(css).toContain('accent-color')
      expect(css).toContain('var(--coral-primary')
    })

    it('should generate accent-secondary', () => {
      const css = coral.generate(['accent-secondary'])
      expect(css).toContain('accent-color')
      expect(css).toContain('var(--coral-secondary')
    })

    it('should generate accent-red-500', () => {
      const css = coral.generate(['accent-red-500'])
      expect(css).toContain('accent-color')
      expect(css).toContain('#ef4444')
    })

    it('should generate accent-blue-500', () => {
      const css = coral.generate(['accent-blue-500'])
      expect(css).toContain('accent-color')
      expect(css).toContain('#3b82f6')
    })

    it('should generate accent-green-500', () => {
      const css = coral.generate(['accent-green-500'])
      expect(css).toContain('accent-color')
      expect(css).toContain('#22c55e')
    })

    it('should generate accent-inherit', () => {
      const css = coral.generate(['accent-inherit'])
      expect(css).toContain('accent-color')
      expect(css).toContain('inherit')
    })

    it('should generate accent-current', () => {
      const css = coral.generate(['accent-current'])
      expect(css).toContain('accent-color')
      expect(css).toContain('currentColor')
    })

    it('should generate accent-transparent', () => {
      const css = coral.generate(['accent-transparent'])
      expect(css).toContain('accent-color')
      expect(css).toContain('transparent')
    })

    it('should generate accent-auto', () => {
      const css = coral.generate(['accent-auto'])
      expect(css).toContain('accent-color')
      expect(css).toContain('auto')
    })

    it('should generate arbitrary accent-[#ff0000]', () => {
      const css = coral.generate(['accent-[#ff0000]'])
      expect(css).toContain('accent-color')
      expect(css).toContain('#ff0000')
    })

    it('should return null for accent-[]', () => {
      const css = coral.generate(['accent-[]'])
      expect(css).toBe('')
    })
  })

  describe('Touch Action Utilities', () => {
    it('should generate touch-auto', () => {
      const css = coral.generate(['touch-auto'])
      expect(css).toContain('touch-action')
      expect(css).toContain('auto')
    })

    it('should generate touch-none', () => {
      const css = coral.generate(['touch-none'])
      expect(css).toContain('touch-action')
      expect(css).toContain('none')
    })

    it('should generate touch-pan-x', () => {
      const css = coral.generate(['touch-pan-x'])
      expect(css).toContain('touch-action')
      expect(css).toContain('pan-x')
    })

    it('should generate touch-pan-y', () => {
      const css = coral.generate(['touch-pan-y'])
      expect(css).toContain('touch-action')
      expect(css).toContain('pan-y')
    })

    it('should generate touch-pinch-zoom', () => {
      const css = coral.generate(['touch-pinch-zoom'])
      expect(css).toContain('touch-action')
      expect(css).toContain('pinch-zoom')
    })

    it('should generate touch-manipulation', () => {
      const css = coral.generate(['touch-manipulation'])
      expect(css).toContain('touch-action')
      expect(css).toContain('manipulation')
    })

    it('should generate touch-pan-x-pan-y', () => {
      const css = coral.generate(['touch-pan-x-pan-y'])
      expect(css).toContain('touch-action')
      expect(css).toContain('pan-x pan-y')
    })

    it('should generate touch-pan-x-pinch-zoom', () => {
      const css = coral.generate(['touch-pan-x-pinch-zoom'])
      expect(css).toContain('touch-action')
      expect(css).toContain('pan-x pinch-zoom')
    })

    it('should generate touch-pan-y-pinch-zoom', () => {
      const css = coral.generate(['touch-pan-y-pinch-zoom'])
      expect(css).toContain('touch-action')
      expect(css).toContain('pan-y pinch-zoom')
    })
  })

  describe('Pointer Events Utilities', () => {
    it('should generate pointer-events-none', () => {
      const css = coral.generate(['pointer-events-none'])
      expect(css).toContain('pointer-events')
      expect(css).toContain('none')
    })

    it('should generate pointer-events-auto', () => {
      const css = coral.generate(['pointer-events-auto'])
      expect(css).toContain('pointer-events')
      expect(css).toContain('auto')
    })

    it('should generate pointer-events-all', () => {
      const css = coral.generate(['pointer-events-all'])
      expect(css).toContain('pointer-events')
      expect(css).toContain('all')
    })

    it('should generate pointer-events-visible', () => {
      const css = coral.generate(['pointer-events-visible'])
      expect(css).toContain('pointer-events')
      expect(css).toContain('visible')
    })

    it('should generate pointer-events-painted', () => {
      const css = coral.generate(['pointer-events-painted'])
      expect(css).toContain('pointer-events')
      expect(css).toContain('painted')
    })

    it('should generate pointer-events-fill', () => {
      const css = coral.generate(['pointer-events-fill'])
      expect(css).toContain('pointer-events')
      expect(css).toContain('fill')
    })

    it('should generate pointer-events-stroke', () => {
      const css = coral.generate(['pointer-events-stroke'])
      expect(css).toContain('pointer-events')
      expect(css).toContain('stroke')
    })
  })

  describe('Scroll Behavior Utilities', () => {
    it('should generate scroll-smooth', () => {
      const css = coral.generate(['scroll-smooth'])
      expect(css).toContain('scroll-behavior')
      expect(css).toContain('smooth')
    })

    it('should generate scroll-auto', () => {
      const css = coral.generate(['scroll-auto'])
      expect(css).toContain('scroll-behavior')
      expect(css).toContain('auto')
    })
  })

  describe('Overscroll Behavior Utilities', () => {
    it('should generate overscroll-auto', () => {
      const css = coral.generate(['overscroll-auto'])
      expect(css).toContain('overscroll-behavior')
      expect(css).toContain('auto')
    })

    it('should generate overscroll-contain', () => {
      const css = coral.generate(['overscroll-contain'])
      expect(css).toContain('overscroll-behavior')
      expect(css).toContain('contain')
    })

    it('should generate overscroll-none', () => {
      const css = coral.generate(['overscroll-none'])
      expect(css).toContain('overscroll-behavior')
      expect(css).toContain('none')
    })

    it('should generate overscroll-x-auto', () => {
      const css = coral.generate(['overscroll-x-auto'])
      expect(css).toContain('overscroll-behavior-x')
      expect(css).toContain('auto')
    })

    it('should generate overscroll-y-none', () => {
      const css = coral.generate(['overscroll-y-none'])
      expect(css).toContain('overscroll-behavior-y')
      expect(css).toContain('none')
    })
  })

  describe('Will Change Utilities', () => {
    it('should generate will-change-auto', () => {
      const css = coral.generate(['will-change-auto'])
      expect(css).toContain('will-change')
      expect(css).toContain('auto')
    })

    it('should generate will-change-scroll', () => {
      const css = coral.generate(['will-change-scroll'])
      expect(css).toContain('will-change')
      expect(css).toContain('scroll-position')
    })

    it('should generate will-change-contents', () => {
      const css = coral.generate(['will-change-contents'])
      expect(css).toContain('will-change')
      expect(css).toContain('contents')
    })

    it('should generate will-change-transform', () => {
      const css = coral.generate(['will-change-transform'])
      expect(css).toContain('will-change')
      expect(css).toContain('transform')
    })

    it('should generate will-change-opacity', () => {
      const css = coral.generate(['will-change-opacity'])
      expect(css).toContain('will-change')
      expect(css).toContain('opacity')
    })
  })

  describe('Contain Utilities', () => {
    it('should generate contain-none', () => {
      const css = coral.generate(['contain-none'])
      expect(css).toContain('contain')
      expect(css).toContain('none')
    })

    it('should generate contain-strict', () => {
      const css = coral.generate(['contain-strict'])
      expect(css).toContain('contain')
      expect(css).toContain('strict')
    })

    it('should generate contain-content', () => {
      const css = coral.generate(['contain-content'])
      expect(css).toContain('contain')
      expect(css).toContain('content')
    })

    it('should generate contain-layout', () => {
      const css = coral.generate(['contain-layout'])
      expect(css).toContain('contain')
      expect(css).toContain('layout')
    })

    it('should generate contain-layout-paint', () => {
      const css = coral.generate(['contain-layout-paint'])
      expect(css).toContain('contain')
      expect(css).toContain('layout paint')
    })

    it('should generate contain-size-layout-paint', () => {
      const css = coral.generate(['contain-size-layout-paint'])
      expect(css).toContain('contain')
      expect(css).toContain('size layout paint')
    })
  })

  describe('Content Visibility Utilities', () => {
    it('should generate content-visibility-visible', () => {
      const css = coral.generate(['content-visibility-visible'])
      expect(css).toContain('content-visibility')
      expect(css).toContain('visible')
    })

    it('should generate content-visibility-hidden', () => {
      const css = coral.generate(['content-visibility-hidden'])
      expect(css).toContain('content-visibility')
      expect(css).toContain('hidden')
    })

    it('should generate content-visibility-auto', () => {
      const css = coral.generate(['content-visibility-auto'])
      expect(css).toContain('content-visibility')
      expect(css).toContain('auto')
    })
  })

  describe('Color Scheme Utilities', () => {
    it('should generate color-scheme-normal', () => {
      const css = coral.generate(['color-scheme-normal'])
      expect(css).toContain('color-scheme')
      expect(css).toContain('normal')
    })

    it('should generate color-scheme-light', () => {
      const css = coral.generate(['color-scheme-light'])
      expect(css).toContain('color-scheme')
      expect(css).toContain('light')
    })

    it('should generate color-scheme-dark', () => {
      const css = coral.generate(['color-scheme-dark'])
      expect(css).toContain('color-scheme')
      expect(css).toContain('dark')
    })

    it('should generate color-scheme-light-dark', () => {
      const css = coral.generate(['color-scheme-light-dark'])
      expect(css).toContain('color-scheme')
      expect(css).toContain('light dark')
    })

    it('should generate color-scheme-only-light', () => {
      const css = coral.generate(['color-scheme-only-light'])
      expect(css).toContain('color-scheme')
      expect(css).toContain('only light')
    })

    it('should generate color-scheme-only-dark', () => {
      const css = coral.generate(['color-scheme-only-dark'])
      expect(css).toContain('color-scheme')
      expect(css).toContain('only dark')
    })
  })

  describe('Backdrop Utilities', () => {
    it('should generate backdrop-blur-sm', () => {
      const css = coral.generate(['backdrop-blur-sm'])
      expect(css).toContain('.backdrop-blur-sm')
      expect(css).toContain('blur(4px)')
    })

    it('should generate backdrop-blur', () => {
      const css = coral.generate(['backdrop-blur'])
      expect(css).toContain('.backdrop-blur')
      expect(css).toContain('blur(8px)')
    })

    it('should generate backdrop-blur-lg', () => {
      const css = coral.generate(['backdrop-blur-lg'])
      expect(css).toContain('.backdrop-blur-lg')
      expect(css).toContain('blur(16px)')
    })

    it('should generate backdrop-dark', () => {
      const css = coral.generate(['backdrop-dark'])
      expect(css).toContain('.backdrop-dark')
      expect(css).toContain('rgba(0, 0, 0, 0.5)')
    })

    it('should generate backdrop-darker', () => {
      const css = coral.generate(['backdrop-darker'])
      expect(css).toContain('.backdrop-darker')
      expect(css).toContain('rgba(0, 0, 0, 0.75)')
    })

    it('should generate backdrop-light', () => {
      const css = coral.generate(['backdrop-light'])
      expect(css).toContain('.backdrop-light')
      expect(css).toContain('rgba(255, 255, 255, 0.5)')
    })
  })

  describe('Highlight Utilities', () => {
    it('should generate highlight-yellow', () => {
      const css = coral.generate(['highlight-yellow'])
      expect(css).toContain('.highlight-yellow')
      expect(css).toContain('#fef08a')
    })

    it('should generate highlight-green', () => {
      const css = coral.generate(['highlight-green'])
      expect(css).toContain('.highlight-green')
      expect(css).toContain('#bbf7d0')
    })

    it('should generate highlight-blue', () => {
      const css = coral.generate(['highlight-blue'])
      expect(css).toContain('.highlight-blue')
      expect(css).toContain('#bfdbfe')
    })

    it('should generate highlight-pink', () => {
      const css = coral.generate(['highlight-pink'])
      expect(css).toContain('.highlight-pink')
      expect(css).toContain('#fbcfe8')
    })
  })

  describe('Scrollbar Gutter Utilities', () => {
    it('should generate scrollbar-gutter-auto', () => {
      const css = coral.generate(['scrollbar-gutter-auto'])
      expect(css).toContain('scrollbar-gutter')
      expect(css).toContain('auto')
    })

    it('should generate scrollbar-gutter-stable', () => {
      const css = coral.generate(['scrollbar-gutter-stable'])
      expect(css).toContain('scrollbar-gutter')
      expect(css).toContain('stable')
    })

    it('should generate scrollbar-gutter-stable-both', () => {
      const css = coral.generate(['scrollbar-gutter-stable-both'])
      expect(css).toContain('scrollbar-gutter')
      expect(css).toContain('stable both-edges')
    })
  })

  describe('Input Security Utilities', () => {
    it('should generate input-security-none', () => {
      const css = coral.generate(['input-security-none'])
      expect(css).toContain('input-security')
      expect(css).toContain('none')
    })

    it('should generate input-security-auto', () => {
      const css = coral.generate(['input-security-auto'])
      expect(css).toContain('input-security')
      expect(css).toContain('auto')
    })
  })

  describe('Field Sizing Utilities', () => {
    it('should generate field-sizing-fixed', () => {
      const css = coral.generate(['field-sizing-fixed'])
      expect(css).toContain('field-sizing')
      expect(css).toContain('fixed')
    })

    it('should generate field-sizing-content', () => {
      const css = coral.generate(['field-sizing-content'])
      expect(css).toContain('field-sizing')
      expect(css).toContain('content')
    })
  })

  describe('Interpolate Size Utilities', () => {
    it('should generate interpolate-size-numeric-only', () => {
      const css = coral.generate(['interpolate-size-numeric-only'])
      expect(css).toContain('interpolate-size')
      expect(css).toContain('numeric-only')
    })

    it('should generate interpolate-size-allow-keywords', () => {
      const css = coral.generate(['interpolate-size-allow-keywords'])
      expect(css).toContain('interpolate-size')
      expect(css).toContain('allow-keywords')
    })
  })

  describe('Snap Utilities', () => {
    it('should generate snap-normal', () => {
      const css = coral.generate(['snap-normal'])
      expect(css).toContain('scroll-snap-stop')
      expect(css).toContain('normal')
    })

    it('should generate snap-always', () => {
      const css = coral.generate(['snap-always'])
      expect(css).toContain('scroll-snap-stop')
      expect(css).toContain('always')
    })
  })
})
