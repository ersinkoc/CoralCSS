/**
 * Tests for Extended Modern CSS Variants
 * Testing new Tailwind 4.1+ compatible variants
 *
 * @module tests/unit/plugins/core/variants/modern-extended
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { modernVariantsPlugin } from '../../../../../src/plugins/core/variants/modern'
import { colorsPlugin } from '../../../../../src/plugins/core/utilities/colors'
import { createCoral } from '../../../../../src/kernel'
import type { Coral } from '../../../../../src/types'

describe('Extended Modern CSS Variants', () => {
  let coral: Coral

  beforeEach(() => {
    coral = createCoral()
    coral.use(modernVariantsPlugin())
    coral.use(colorsPlugin())
  })

  describe('not-* variants (Tailwind 4.1)', () => {
    it('should generate not-hover variant', () => {
      const css = coral.generate(['not-hover:bg-red-500'])
      expect(css).toContain(':not(:hover)')
    })

    it('should generate not-focus variant', () => {
      const css = coral.generate(['not-focus:bg-blue-500'])
      expect(css).toContain(':not(:focus)')
    })

    it('should generate not-focus-visible variant', () => {
      const css = coral.generate(['not-focus-visible:bg-green-500'])
      expect(css).toContain(':not(:focus-visible)')
    })

    it('should generate not-active variant', () => {
      const css = coral.generate(['not-active:bg-yellow-500'])
      expect(css).toContain(':not(:active)')
    })

    it('should generate not-disabled variant', () => {
      const css = coral.generate(['not-disabled:bg-purple-500'])
      expect(css).toContain(':not(:disabled)')
    })

    it('should generate not-checked variant', () => {
      const css = coral.generate(['not-checked:bg-pink-500'])
      expect(css).toContain(':not(:checked)')
    })

    it('should generate not-first variant', () => {
      const css = coral.generate(['not-first:bg-indigo-500'])
      expect(css).toContain(':not(:first-child)')
    })

    it('should generate not-last variant', () => {
      const css = coral.generate(['not-last:bg-teal-500'])
      expect(css).toContain(':not(:last-child)')
    })

    it('should generate not-only variant', () => {
      const css = coral.generate(['not-only:bg-orange-500'])
      expect(css).toContain(':not(:only-child)')
    })

    it('should generate not-empty variant', () => {
      const css = coral.generate(['not-empty:bg-gray-500'])
      expect(css).toContain(':not(:empty)')
    })

    it('should generate not-open variant', () => {
      const css = coral.generate(['not-open:bg-slate-500'])
      expect(css).toContain(':not([open])')
    })
  })

  describe('descendant variants (Tailwind 4.1)', () => {
    it('should generate * (direct children) variant', () => {
      const css = coral.generate(['*:bg-red-500'])
      expect(css).toContain(' > *')
    })

    it('should generate descendant variant', () => {
      const css = coral.generate(['descendant:bg-blue-500'])
      expect(css).toContain(' *')
    })

    it('should generate children variant', () => {
      const css = coral.generate(['children:bg-green-500'])
      expect(css).toContain(' > *')
    })

    it('should generate direct variant', () => {
      const css = coral.generate(['direct:bg-yellow-500'])
      expect(css).toContain(' > *')
    })

    it('should generate descendant-p variant', () => {
      const css = coral.generate(['descendant-p:bg-purple-500'])
      expect(css).toContain(' p')
    })

    it('should generate descendant-a variant', () => {
      const css = coral.generate(['descendant-a:bg-pink-500'])
      expect(css).toContain(' a')
    })

    it('should generate descendant-li variant', () => {
      const css = coral.generate(['descendant-li:bg-indigo-500'])
      expect(css).toContain(' li')
    })

    it('should generate descendant-img variant', () => {
      const css = coral.generate(['descendant-img:bg-teal-500'])
      expect(css).toContain(' img')
    })

    it('should generate descendant-svg variant', () => {
      const css = coral.generate(['descendant-svg:bg-orange-500'])
      expect(css).toContain(' svg')
    })

    it('should generate descendant-h1 variant', () => {
      const css = coral.generate(['descendant-h1:bg-gray-500'])
      expect(css).toContain(' h1')
    })

    it('should generate descendant-h2 variant', () => {
      const css = coral.generate(['descendant-h2:bg-slate-500'])
      expect(css).toContain(' h2')
    })

    it('should generate descendant-h3 variant', () => {
      const css = coral.generate(['descendant-h3:bg-zinc-500'])
      expect(css).toContain(' h3')
    })
  })

  describe('@starting-style variants', () => {
    it('should generate starting variant with @starting-style wrapper', () => {
      const css = coral.generate(['starting:bg-red-500'])
      expect(css).toContain('@starting-style')
    })

    it('should generate enter variant with @starting-style wrapper', () => {
      const css = coral.generate(['enter:bg-blue-500'])
      expect(css).toContain('@starting-style')
    })
  })

  describe('inert variants', () => {
    it('should generate inert variant', () => {
      const css = coral.generate(['inert:bg-red-500'])
      expect(css).toContain('[inert]')
    })

    it('should generate group-inert variant', () => {
      const css = coral.generate(['group-inert:bg-blue-500'])
      expect(css).toContain('.group[inert]')
    })

    it('should generate peer-inert variant', () => {
      const css = coral.generate(['peer-inert:bg-green-500'])
      expect(css).toContain('.peer[inert]')
    })
  })

  describe('popover variants', () => {
    it('should generate popover-open variant', () => {
      const css = coral.generate(['popover-open:bg-red-500'])
      expect(css).toContain(':popover-open')
    })
  })

  describe('dialog variants', () => {
    it('should generate dialog-open variant', () => {
      const css = coral.generate(['dialog-open:bg-red-500'])
      expect(css).toContain('dialog[open]')
    })

    it('should generate modal variant', () => {
      const css = coral.generate(['modal:bg-blue-500'])
      expect(css).toContain('::backdrop')
    })
  })

  describe('fullscreen variant', () => {
    it('should generate fullscreen variant', () => {
      const css = coral.generate(['fullscreen:bg-red-500'])
      expect(css).toContain(':fullscreen')
    })
  })

  describe('picture-in-picture variant', () => {
    it('should generate pip variant', () => {
      const css = coral.generate(['pip:bg-red-500'])
      expect(css).toContain(':picture-in-picture')
    })
  })

  describe('scroll state variants (experimental)', () => {
    it('should generate stuck variant', () => {
      const css = coral.generate(['stuck:bg-red-500'])
      expect(css).toContain('scroll-state(stuck')
    })

    it('should generate stuck-top variant', () => {
      const css = coral.generate(['stuck-top:bg-blue-500'])
      expect(css).toContain('scroll-state(stuck: top)')
    })

    it('should generate stuck-bottom variant', () => {
      const css = coral.generate(['stuck-bottom:bg-green-500'])
      expect(css).toContain('scroll-state(stuck: bottom)')
    })

    it('should generate snapped variant', () => {
      const css = coral.generate(['snapped:bg-yellow-500'])
      expect(css).toContain('scroll-state(snapped')
    })

    it('should generate snapped-x variant', () => {
      const css = coral.generate(['snapped-x:bg-purple-500'])
      expect(css).toContain('scroll-state(snapped: x)')
    })

    it('should generate snapped-y variant', () => {
      const css = coral.generate(['snapped-y:bg-pink-500'])
      expect(css).toContain('scroll-state(snapped: y)')
    })
  })

  describe('user validation variants', () => {
    it('should generate user-valid variant', () => {
      const css = coral.generate(['user-valid:bg-green-500'])
      expect(css).toContain(':user-valid')
    })

    it('should generate user-invalid variant', () => {
      const css = coral.generate(['user-invalid:bg-red-500'])
      expect(css).toContain(':user-invalid')
    })

    it('should generate user-error variant', () => {
      const css = coral.generate(['user-error:bg-red-500'])
      expect(css).toContain(':user-invalid')
    })
  })

  describe('pointer variants', () => {
    it('should generate pointer-fine variant', () => {
      const css = coral.generate(['pointer-fine:bg-blue-500'])
      expect(css).toContain('@media (pointer: fine)')
    })

    it('should generate pointer-coarse variant', () => {
      const css = coral.generate(['pointer-coarse:bg-blue-500'])
      expect(css).toContain('@media (pointer: coarse)')
    })

    it('should generate any-pointer-fine variant', () => {
      const css = coral.generate(['any-pointer-fine:bg-green-500'])
      expect(css).toContain('@media (any-pointer: fine)')
    })

    it('should generate any-pointer-coarse variant', () => {
      const css = coral.generate(['any-pointer-coarse:bg-green-500'])
      expect(css).toContain('@media (any-pointer: coarse)')
    })

    it('should generate hover-pointer variant', () => {
      const css = coral.generate(['hover-pointer:bg-red-500'])
      expect(css).toContain(':hover')
      expect(css).toContain('@media (pointer: fine)')
    })
  })

  describe('inverted-colors variant', () => {
    it('should generate inverted-colors variant', () => {
      const css = coral.generate(['inverted-colors:bg-white'])
      expect(css).toContain('@media (inverted-colors: inverted)')
    })
  })

  describe('details variants', () => {
    it('should generate details-content variant', () => {
      const css = coral.generate(['details-content:bg-gray-100'])
      expect(css).toContain('::details-content')
    })

    it('should generate details-marker variant', () => {
      const css = coral.generate(['details-marker:bg-blue-500'])
      expect(css).toContain('::marker')
    })

    it('should generate details-open variant', () => {
      const css = coral.generate(['details-open:bg-green-500'])
      expect(css).toContain('details[open]')
    })
  })

  describe('container style queries', () => {
    it('should generate container-style-grid variant', () => {
      const css = coral.generate(['container-style-grid:bg-blue-500'])
      expect(css).toContain('@container style(display: grid)')
    })

    it('should generate container-style-flex variant', () => {
      const css = coral.generate(['container-style-flex:bg-green-500'])
      expect(css).toContain('@container style(display: flex)')
    })

    it('should generate container-style-block variant', () => {
      const css = coral.generate(['container-style-block:bg-yellow-500'])
      expect(css).toContain('@container style(display: block)')
    })

    it('should generate container-style-inline variant', () => {
      const css = coral.generate(['container-style-inline:bg-purple-500'])
      expect(css).toContain('@container style(display: inline)')
    })
  })

  describe('container state queries', () => {
    it('should generate container-hovered variant', () => {
      const css = coral.generate(['container-hovered:bg-red-500'])
      expect(css).toContain('@container state(:hover)')
    })

    it('should generate container-focused variant', () => {
      const css = coral.generate(['container-focused:bg-blue-500'])
      expect(css).toContain('@container state(:focus-within)')
    })

    it('should generate container-active variant', () => {
      const css = coral.generate(['container-active:bg-green-500'])
      expect(css).toContain('@container state(:active)')
    })

    it('should generate container-checked variant', () => {
      const css = coral.generate(['container-checked:bg-yellow-500'])
      expect(css).toContain('@container state(:checked)')
    })

    it('should generate container-disabled variant', () => {
      const css = coral.generate(['container-disabled:bg-gray-500'])
      expect(css).toContain('@container state(:disabled)')
    })
  })

  describe('container orientation queries', () => {
    it('should generate container-portrait variant', () => {
      const css = coral.generate(['container-portrait:bg-blue-500'])
      expect(css).toContain('@container (orientation: portrait)')
    })

    it('should generate container-landscape variant', () => {
      const css = coral.generate(['container-landscape:bg-green-500'])
      expect(css).toContain('@container (orientation: landscape)')
    })
  })
})
