/**
 * Tests for Tailwind 4.1+ Compatibility Plugin
 *
 * @module tests/unit/plugins/core/utilities/tailwind4-compat
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { tailwind4CompatPlugin } from '../../../../../src/plugins/core/utilities/tailwind4-compat'
import { createCoral } from '../../../../../src/kernel'
import type { Coral } from '../../../../../src/types'

describe('Tailwind 4.1+ Compatibility Plugin', () => {
  let coral: Coral

  beforeEach(() => {
    coral = createCoral()
    coral.use(tailwind4CompatPlugin())
  })

  describe('color-scheme utilities', () => {
    it('should generate color-scheme-light', () => {
      const css = coral.generate(['color-scheme-light'])
      expect(css).toContain('color-scheme: light')
    })

    it('should generate color-scheme-dark', () => {
      const css = coral.generate(['color-scheme-dark'])
      expect(css).toContain('color-scheme: dark')
    })

    it('should generate color-scheme-light-dark', () => {
      const css = coral.generate(['color-scheme-light-dark'])
      expect(css).toContain('color-scheme: light dark')
    })

    it('should generate color-scheme-normal', () => {
      const css = coral.generate(['color-scheme-normal'])
      expect(css).toContain('color-scheme: normal')
    })

    it('should generate color-scheme-only-light', () => {
      const css = coral.generate(['color-scheme-only-light'])
      expect(css).toContain('color-scheme: only light')
    })

    it('should generate color-scheme-only-dark', () => {
      const css = coral.generate(['color-scheme-only-dark'])
      expect(css).toContain('color-scheme: only dark')
    })
  })

  describe('overflow-wrap utilities', () => {
    it('should generate overflow-wrap-normal', () => {
      const css = coral.generate(['overflow-wrap-normal'])
      expect(css).toContain('overflow-wrap: normal')
    })

    it('should generate overflow-wrap-anywhere', () => {
      const css = coral.generate(['overflow-wrap-anywhere'])
      expect(css).toContain('overflow-wrap: anywhere')
    })

    it('should generate overflow-wrap-break-word', () => {
      const css = coral.generate(['overflow-wrap-break-word'])
      expect(css).toContain('overflow-wrap: break-word')
    })

    it('should generate wrap-normal shorthand', () => {
      const css = coral.generate(['wrap-normal'])
      expect(css).toContain('overflow-wrap: normal')
    })

    it('should generate wrap-anywhere shorthand', () => {
      const css = coral.generate(['wrap-anywhere'])
      expect(css).toContain('overflow-wrap: anywhere')
    })

    it('should generate wrap-break-word shorthand', () => {
      const css = coral.generate(['wrap-break-word'])
      expect(css).toContain('overflow-wrap: break-word')
    })
  })

  describe('word-break utilities', () => {
    it('should generate word-break-normal', () => {
      const css = coral.generate(['word-break-normal'])
      expect(css).toContain('word-break: normal')
    })

    it('should generate word-break-all', () => {
      const css = coral.generate(['word-break-all'])
      expect(css).toContain('word-break: break-all')
    })

    it('should generate word-break-keep', () => {
      const css = coral.generate(['word-break-keep'])
      expect(css).toContain('word-break: keep-all')
    })

    it('should generate word-break-auto-phrase', () => {
      const css = coral.generate(['word-break-auto-phrase'])
      expect(css).toContain('word-break: auto-phrase')
    })
  })

  describe('inert utilities', () => {
    it('should generate inert-default', () => {
      const css = coral.generate(['inert-default'])
      expect(css).toContain('pointer-events: none')
      expect(css).toContain('user-select: none')
    })

    it('should generate inert-fade', () => {
      const css = coral.generate(['inert-fade'])
      expect(css).toContain('pointer-events: none')
      expect(css).toContain('opacity: 0.5')
    })

    it('should generate inert-grayscale', () => {
      const css = coral.generate(['inert-grayscale'])
      expect(css).toContain('filter: grayscale(100%)')
    })

    it('should generate inert-blur', () => {
      const css = coral.generate(['inert-blur'])
      expect(css).toContain('filter: blur(2px)')
    })
  })

  describe('text-shadow utilities', () => {
    it('should generate text-shadow-sm', () => {
      const css = coral.generate(['text-shadow-sm'])
      expect(css).toContain('text-shadow')
    })

    it('should generate text-shadow (default)', () => {
      const css = coral.generate(['text-shadow'])
      expect(css).toContain('text-shadow')
    })

    it('should generate text-shadow-md', () => {
      const css = coral.generate(['text-shadow-md'])
      expect(css).toContain('text-shadow')
    })

    it('should generate text-shadow-lg', () => {
      const css = coral.generate(['text-shadow-lg'])
      expect(css).toContain('text-shadow')
    })

    it('should generate text-shadow-xl', () => {
      const css = coral.generate(['text-shadow-xl'])
      expect(css).toContain('text-shadow')
    })

    it('should generate text-shadow-2xl', () => {
      const css = coral.generate(['text-shadow-2xl'])
      expect(css).toContain('text-shadow')
    })

    it('should generate text-shadow-none', () => {
      const css = coral.generate(['text-shadow-none'])
      expect(css).toContain('text-shadow: none')
    })

    it('should generate colored text-shadow', () => {
      const css = coral.generate(['text-shadow-red-500'])
      expect(css).toContain('--coral-text-shadow-color')
    })

    it('should generate text-shadow-blue-600', () => {
      const css = coral.generate(['text-shadow-blue-600'])
      expect(css).toContain('--coral-text-shadow-color')
    })

    it('should generate text-shadow-coral-500', () => {
      const css = coral.generate(['text-shadow-coral-500'])
      expect(css).toContain('--coral-text-shadow-color')
    })
  })

  describe('drop-shadow utilities', () => {
    it('should generate colored drop-shadow-red-500', () => {
      const css = coral.generate(['drop-shadow-red-500'])
      expect(css).toContain('filter')
      expect(css).toContain('drop-shadow')
    })

    it('should generate glow drop-shadow', () => {
      const css = coral.generate(['drop-shadow-blue-500-glow'])
      expect(css).toContain('filter')
      expect(css).toContain('drop-shadow')
    })

    it('should generate drop-shadow-indigo-600', () => {
      const css = coral.generate(['drop-shadow-indigo-600'])
      expect(css).toContain('drop-shadow')
    })
  })

  describe('carousel utilities', () => {
    it('should generate scroll-marker-group-before', () => {
      const css = coral.generate(['scroll-marker-group-before'])
      expect(css).toContain('scroll-marker-group: before')
    })

    it('should generate scroll-marker-group-after', () => {
      const css = coral.generate(['scroll-marker-group-after'])
      expect(css).toContain('scroll-marker-group: after')
    })

    it('should generate carousel-marker', () => {
      const css = coral.generate(['carousel-marker'])
      expect(css).toContain('--coral-carousel-marker-size')
    })

    it('should generate carousel-marker-sm', () => {
      const css = coral.generate(['carousel-marker-sm'])
      expect(css).toContain('--coral-carousel-marker-size: 6px')
    })

    it('should generate carousel-marker-lg', () => {
      const css = coral.generate(['carousel-marker-lg'])
      expect(css).toContain('--coral-carousel-marker-size: 12px')
    })

    it('should generate carousel-buttons', () => {
      const css = coral.generate(['carousel-buttons'])
      expect(css).toContain('--coral-carousel-button-size')
    })
  })

  describe('scroll state utilities', () => {
    it('should generate scroll-state-stuck', () => {
      const css = coral.generate(['scroll-state-stuck'])
      expect(css).toContain('--coral-scroll-state: stuck')
    })

    it('should generate scroll-state-snapped', () => {
      const css = coral.generate(['scroll-state-snapped'])
      expect(css).toContain('--coral-scroll-state: snapped')
    })

    it('should generate scroll-state-overflowing', () => {
      const css = coral.generate(['scroll-state-overflowing'])
      expect(css).toContain('--coral-scroll-state: overflowing')
    })

    it('should generate sticky-header', () => {
      const css = coral.generate(['sticky-header'])
      expect(css).toContain('position: sticky')
      expect(css).toContain('top: 0')
    })

    it('should generate sticky-footer', () => {
      const css = coral.generate(['sticky-footer'])
      expect(css).toContain('position: sticky')
      expect(css).toContain('bottom: 0')
    })

    it('should generate sticky-sidebar', () => {
      const css = coral.generate(['sticky-sidebar'])
      expect(css).toContain('position: sticky')
    })
  })

  describe('shadow utilities', () => {
    it('should generate shadow-inner-sm', () => {
      const css = coral.generate(['shadow-inner-sm'])
      expect(css).toContain('box-shadow')
      expect(css).toContain('inset')
    })

    it('should generate shadow-inner-md', () => {
      const css = coral.generate(['shadow-inner-md'])
      expect(css).toContain('box-shadow')
      expect(css).toContain('inset')
    })

    it('should generate shadow-inner-lg', () => {
      const css = coral.generate(['shadow-inner-lg'])
      expect(css).toContain('box-shadow')
      expect(css).toContain('inset')
    })

    it('should generate shadow-depth', () => {
      const css = coral.generate(['shadow-depth'])
      expect(css).toContain('box-shadow')
    })

    it('should generate shadow-depth-sm', () => {
      const css = coral.generate(['shadow-depth-sm'])
      expect(css).toContain('box-shadow')
    })

    it('should generate shadow-depth-lg', () => {
      const css = coral.generate(['shadow-depth-lg'])
      expect(css).toContain('box-shadow')
    })

    it('should generate elevation-1', () => {
      const css = coral.generate(['elevation-1'])
      expect(css).toContain('box-shadow')
    })

    it('should generate elevation-4', () => {
      const css = coral.generate(['elevation-4'])
      expect(css).toContain('box-shadow')
    })

    it('should generate elevation-12', () => {
      const css = coral.generate(['elevation-12'])
      expect(css).toContain('box-shadow')
    })

    it('should generate elevation-24', () => {
      const css = coral.generate(['elevation-24'])
      expect(css).toContain('box-shadow')
    })
  })

  describe('forced-color-adjust utilities', () => {
    it('should generate forced-color-adjust-auto', () => {
      const css = coral.generate(['forced-color-adjust-auto'])
      expect(css).toContain('forced-color-adjust: auto')
    })

    it('should generate forced-color-adjust-none', () => {
      const css = coral.generate(['forced-color-adjust-none'])
      expect(css).toContain('forced-color-adjust: none')
    })
  })

  describe('accent-color utilities', () => {
    it('should generate accent-auto', () => {
      const css = coral.generate(['accent-auto'])
      expect(css).toContain('accent-color: auto')
    })

    it('should generate accent-current', () => {
      const css = coral.generate(['accent-current'])
      expect(css).toContain('accent-color: currentColor')
    })

    it('should generate accent-inherit', () => {
      const css = coral.generate(['accent-inherit'])
      expect(css).toContain('accent-color: inherit')
    })

    it('should generate accent-red-500', () => {
      const css = coral.generate(['accent-red-500'])
      expect(css).toContain('accent-color')
    })

    it('should generate accent-blue-600', () => {
      const css = coral.generate(['accent-blue-600'])
      expect(css).toContain('accent-color')
    })
  })

  describe('caret-color utilities', () => {
    it('should generate caret-auto', () => {
      const css = coral.generate(['caret-auto'])
      expect(css).toContain('caret-color: auto')
    })

    it('should generate caret-current', () => {
      const css = coral.generate(['caret-current'])
      expect(css).toContain('caret-color: currentColor')
    })

    it('should generate caret-transparent', () => {
      const css = coral.generate(['caret-transparent'])
      expect(css).toContain('caret-color: transparent')
    })

    it('should generate caret-red-500', () => {
      const css = coral.generate(['caret-red-500'])
      expect(css).toContain('caret-color')
    })
  })

  describe('scroll-margin utilities', () => {
    it('should generate scroll-m-0', () => {
      const css = coral.generate(['scroll-m-0'])
      expect(css).toContain('scroll-margin: 0px')
    })

    it('should generate scroll-m-4', () => {
      const css = coral.generate(['scroll-m-4'])
      expect(css).toContain('scroll-margin: 1rem')
    })

    it('should generate scroll-mx-4', () => {
      const css = coral.generate(['scroll-mx-4'])
      expect(css).toContain('scroll-margin-inline: 1rem')
    })

    it('should generate scroll-my-4', () => {
      const css = coral.generate(['scroll-my-4'])
      expect(css).toContain('scroll-margin-block: 1rem')
    })

    it('should generate scroll-mt-4', () => {
      const css = coral.generate(['scroll-mt-4'])
      expect(css).toContain('scroll-margin-top: 1rem')
    })

    it('should generate scroll-mr-4', () => {
      const css = coral.generate(['scroll-mr-4'])
      expect(css).toContain('scroll-margin-right: 1rem')
    })

    it('should generate scroll-mb-4', () => {
      const css = coral.generate(['scroll-mb-4'])
      expect(css).toContain('scroll-margin-bottom: 1rem')
    })

    it('should generate scroll-ml-4', () => {
      const css = coral.generate(['scroll-ml-4'])
      expect(css).toContain('scroll-margin-left: 1rem')
    })
  })

  describe('scroll-padding utilities', () => {
    it('should generate scroll-p-0', () => {
      const css = coral.generate(['scroll-p-0'])
      expect(css).toContain('scroll-padding: 0px')
    })

    it('should generate scroll-p-4', () => {
      const css = coral.generate(['scroll-p-4'])
      expect(css).toContain('scroll-padding: 1rem')
    })

    it('should generate scroll-px-4', () => {
      const css = coral.generate(['scroll-px-4'])
      expect(css).toContain('scroll-padding-inline: 1rem')
    })

    it('should generate scroll-py-4', () => {
      const css = coral.generate(['scroll-py-4'])
      expect(css).toContain('scroll-padding-block: 1rem')
    })

    it('should generate scroll-pt-4', () => {
      const css = coral.generate(['scroll-pt-4'])
      expect(css).toContain('scroll-padding-top: 1rem')
    })
  })

  describe('touch-action utilities', () => {
    it('should generate touch-auto', () => {
      const css = coral.generate(['touch-auto'])
      expect(css).toContain('touch-action: auto')
    })

    it('should generate touch-none', () => {
      const css = coral.generate(['touch-none'])
      expect(css).toContain('touch-action: none')
    })

    it('should generate touch-pan-x', () => {
      const css = coral.generate(['touch-pan-x'])
      expect(css).toContain('touch-action: pan-x')
    })

    it('should generate touch-pan-y', () => {
      const css = coral.generate(['touch-pan-y'])
      expect(css).toContain('touch-action: pan-y')
    })

    it('should generate touch-pan-left', () => {
      const css = coral.generate(['touch-pan-left'])
      expect(css).toContain('touch-action: pan-left')
    })

    it('should generate touch-pan-right', () => {
      const css = coral.generate(['touch-pan-right'])
      expect(css).toContain('touch-action: pan-right')
    })

    it('should generate touch-pan-up', () => {
      const css = coral.generate(['touch-pan-up'])
      expect(css).toContain('touch-action: pan-up')
    })

    it('should generate touch-pan-down', () => {
      const css = coral.generate(['touch-pan-down'])
      expect(css).toContain('touch-action: pan-down')
    })

    it('should generate touch-pinch-zoom', () => {
      const css = coral.generate(['touch-pinch-zoom'])
      expect(css).toContain('touch-action: pinch-zoom')
    })

    it('should generate touch-manipulation', () => {
      const css = coral.generate(['touch-manipulation'])
      expect(css).toContain('touch-action: manipulation')
    })
  })

  describe('will-change utilities', () => {
    it('should generate will-change-auto', () => {
      const css = coral.generate(['will-change-auto'])
      expect(css).toContain('will-change: auto')
    })

    it('should generate will-change-scroll', () => {
      const css = coral.generate(['will-change-scroll'])
      expect(css).toContain('will-change: scroll-position')
    })

    it('should generate will-change-contents', () => {
      const css = coral.generate(['will-change-contents'])
      expect(css).toContain('will-change: contents')
    })

    it('should generate will-change-transform', () => {
      const css = coral.generate(['will-change-transform'])
      expect(css).toContain('will-change: transform')
    })

    it('should generate will-change-opacity', () => {
      const css = coral.generate(['will-change-opacity'])
      expect(css).toContain('will-change: opacity')
    })

    it('should generate will-change-filter', () => {
      const css = coral.generate(['will-change-filter'])
      expect(css).toContain('will-change: filter')
    })
  })
})
