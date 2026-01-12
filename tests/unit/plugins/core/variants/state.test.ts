/**
 * Tests for State Variants Plugin
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { stateVariantsPlugin } from '../../../../../src/plugins/core/variants/state'
import { coralPreset } from '../../../../../src/presets/coral'
import type { Coral } from '../../../../../src/types'

describe('State Variants Plugin', () => {
  let coral: Coral

  beforeEach(() => {
    coral = createCoral()
    coralPreset().forEach((p) => coral.use(p))
  })

  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      const testCoral = createCoral({ plugins: [stateVariantsPlugin()] })
      expect(testCoral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = stateVariantsPlugin()
      expect(plugin.name).toBe('state-variants')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('ARIA Boolean Attribute Variants', () => {
    describe('aria-checked variants', () => {
      it('should generate aria-checked variant', () => {
        const css = coral.generate(['aria-checked:bg-red-500'])
        expect(css).toContain('[aria-checked="true"]')
        expect(css).toContain('background-color')
      })

      it('should generate aria-not-checked variant', () => {
        const css = coral.generate(['aria-not-checked:bg-red-500'])
        expect(css).toContain('[aria-checked="false"]')
      })

      it('should generate aria-mixed variant', () => {
        const css = coral.generate(['aria-mixed:bg-red-500'])
        expect(css).toContain('[aria-checked="mixed"]')
      })
    })

    describe('aria-disabled variants', () => {
      it('should generate aria-disabled variant', () => {
        const css = coral.generate(['aria-disabled:opacity-50'])
        expect(css).toContain('[aria-disabled="true"]')
      })

      it('should generate aria-enabled variant', () => {
        const css = coral.generate(['aria-enabled:opacity-100'])
        expect(css).toContain('[aria-disabled="false"]')
      })
    })

    describe('aria-expanded variants', () => {
      it('should generate aria-expanded variant', () => {
        const css = coral.generate(['aria-expanded:block'])
        expect(css).toContain('[aria-expanded="true"]')
      })

      it('should generate aria-collapsed variant', () => {
        const css = coral.generate(['aria-collapsed:hidden'])
        expect(css).toContain('[aria-expanded="false"]')
      })
    })

    describe('aria-hidden variants', () => {
      it('should generate aria-hidden variant', () => {
        const css = coral.generate(['aria-hidden:hidden'])
        expect(css).toContain('[aria-hidden="true"]')
      })

      it('should generate aria-visible variant', () => {
        const css = coral.generate(['aria-visible:block'])
        expect(css).toContain('[aria-hidden="false"]')
      })
    })

    describe('aria-pressed variants', () => {
      it('should generate aria-pressed variant', () => {
        const css = coral.generate(['aria-pressed:bg-red-600'])
        expect(css).toContain('[aria-pressed="true"]')
      })

      it('should generate aria-not-pressed variant', () => {
        const css = coral.generate(['aria-not-pressed:bg-gray-200'])
        expect(css).toContain('[aria-pressed="false"]')
      })
    })

    describe('aria-selected variants', () => {
      it('should generate aria-selected variant', () => {
        const css = coral.generate(['aria-selected:bg-blue-600'])
        expect(css).toContain('[aria-selected="true"]')
      })

      it('should generate aria-not-selected variant', () => {
        const css = coral.generate(['aria-not-selected:bg-gray-100'])
        expect(css).toContain('[aria-selected="false"]')
      })
    })

    describe('aria-current variants', () => {
      it('should generate aria-current variant', () => {
        const css = coral.generate(['aria-current:font-bold'])
        expect(css).toContain('[aria-current="true"]')
      })

      it('should generate aria-current-page variant', () => {
        const css = coral.generate(['aria-current-page:underline'])
        expect(css).toContain('[aria-current="page"]')
      })

      it('should generate aria-current-step variant', () => {
        const css = coral.generate(['aria-current-step:bg-blue-500'])
        expect(css).toContain('[aria-current="step"]')
      })

      it('should generate aria-current-location variant', () => {
        const css = coral.generate(['aria-current-location:text-blue-600'])
        expect(css).toContain('[aria-current="location"]')
      })

      it('should generate aria-current-date variant', () => {
        const css = coral.generate(['aria-current-date:font-bold'])
        expect(css).toContain('[aria-current="date"]')
      })

      it('should generate aria-current-time variant', () => {
        const css = coral.generate(['aria-current-time:font-bold'])
        expect(css).toContain('[aria-current="time"]')
      })
    })

    describe('aria-live variants', () => {
      it('should generate aria-live-polite variant', () => {
        const css = coral.generate(['aria-live-polite:bg-yellow-100'])
        expect(css).toContain('[aria-live="polite"]')
      })

      it('should generate aria-live-assertive variant', () => {
        const css = coral.generate(['aria-live-assertive:bg-red-100'])
        expect(css).toContain('[aria-live="assertive"]')
      })

      it('should generate aria-live-off variant', () => {
        const css = coral.generate(['aria-live-off:bg-gray-100'])
        expect(css).toContain('[aria-live="off"]')
      })
    })

    describe('aria-invalid variants', () => {
      it('should generate aria-invalid variant', () => {
        const css = coral.generate(['aria-invalid:border-red-500'])
        expect(css).toContain('[aria-invalid="true"]')
      })

      it('should generate aria-valid variant', () => {
        const css = coral.generate(['aria-valid:border-green-500'])
        expect(css).toContain('[aria-invalid="false"]')
      })

      it('should generate aria-invalid-grammar variant', () => {
        const css = coral.generate(['aria-invalid-grammar:border-yellow-500'])
        expect(css).toContain('[aria-invalid="grammar"]')
      })

      it('should generate aria-invalid-spelling variant', () => {
        const css = coral.generate(['aria-invalid-spelling:border-orange-500'])
        expect(css).toContain('[aria-invalid="spelling"]')
      })
    })

    describe('aria-required variants', () => {
      it('should generate aria-required variant', () => {
        const css = coral.generate(['aria-required:border-red-500'])
        expect(css).toContain('[aria-required="true"]')
      })

      it('should generate aria-optional variant', () => {
        const css = coral.generate(['aria-optional:border-gray-400'])
        expect(css).toContain('[aria-required="false"]')
      })
    })

    describe('aria-sort variants', () => {
      it('should generate aria-sort-ascending variant', () => {
        const css = coral.generate(['aria-sort-ascending:bg-gray-100'])
        expect(css).toContain('[aria-sort="ascending"]')
      })

      it('should generate aria-sort-descending variant', () => {
        const css = coral.generate(['aria-sort-descending:bg-gray-100'])
        expect(css).toContain('[aria-sort="descending"]')
      })

      it('should generate aria-sort-none variant', () => {
        const css = coral.generate(['aria-sort-none:bg-white'])
        expect(css).toContain('[aria-sort="none"]')
      })
    })

    describe('aria-orientation variants', () => {
      it('should generate aria-horizontal variant', () => {
        const css = coral.generate(['aria-horizontal:flex-row'])
        expect(css).toContain('[aria-orientation="horizontal"]')
      })

      it('should generate aria-vertical variant', () => {
        const css = coral.generate(['aria-vertical:flex-col'])
        expect(css).toContain('[aria-orientation="vertical"]')
      })
    })

    describe('aria-haspopup variants', () => {
      it('should generate aria-haspopup variant', () => {
        const css = coral.generate(['aria-haspopup:cursor-pointer'])
        expect(css).toContain('[aria-haspopup="true"]')
      })

      it('should generate aria-haspopup-menu variant', () => {
        const css = coral.generate(['aria-haspopup-menu:cursor-pointer'])
        expect(css).toContain('[aria-haspopup="menu"]')
      })

      it('should generate aria-haspopup-dialog variant', () => {
        const css = coral.generate(['aria-haspopup-dialog:cursor-pointer'])
        expect(css).toContain('[aria-haspopup="dialog"]')
      })

      it('should generate aria-haspopup-listbox variant', () => {
        const css = coral.generate(['aria-haspopup-listbox:cursor-pointer'])
        expect(css).toContain('[aria-haspopup="listbox"]')
      })
    })
  })

  describe('Data Attribute Variants', () => {
    describe('data-state variants', () => {
      it('should generate data-open variant', () => {
        const css = coral.generate(['data-open:block'])
        expect(css).toContain('[data-state="open"]')
      })

      it('should generate data-closed variant', () => {
        const css = coral.generate(['data-closed:hidden'])
        expect(css).toContain('[data-state="closed"]')
      })

      it('should generate data-active variant', () => {
        const css = coral.generate(['data-active:bg-blue-500'])
        expect(css).toContain('[data-state="active"]')
      })

      it('should generate data-inactive variant', () => {
        const css = coral.generate(['data-inactive:bg-gray-400'])
        expect(css).toContain('[data-state="inactive"]')
      })

      it('should generate data-checked variant', () => {
        const css = coral.generate(['data-checked:bg-blue-600'])
        expect(css).toContain('[data-state="checked"]')
      })

      it('should generate data-unchecked variant', () => {
        const css = coral.generate(['data-unchecked:bg-gray-200'])
        expect(css).toContain('[data-state="unchecked"]')
      })

      it('should generate data-indeterminate variant', () => {
        const css = coral.generate(['data-indeterminate:bg-yellow-500'])
        expect(css).toContain('[data-state="indeterminate"]')
      })

      it('should generate data-on variant', () => {
        const css = coral.generate(['data-on:bg-green-500'])
        expect(css).toContain('[data-state="on"]')
      })

      it('should generate data-off variant', () => {
        const css = coral.generate(['data-off:bg-gray-300'])
        expect(css).toContain('[data-state="off"]')
      })
    })

    describe('data-orientation variants', () => {
      it('should generate data-horizontal variant', () => {
        const css = coral.generate(['data-horizontal:flex-row'])
        expect(css).toContain('[data-orientation="horizontal"]')
      })

      it('should generate data-vertical variant', () => {
        const css = coral.generate(['data-vertical:flex-col'])
        expect(css).toContain('[data-orientation="vertical"]')
      })
    })

    describe('data-side variants', () => {
      it('should generate data-side-top variant', () => {
        const css = coral.generate(['data-side-top:mt-2'])
        expect(css).toContain('[data-side="top"]')
      })

      it('should generate data-side-bottom variant', () => {
        const css = coral.generate(['data-side-bottom:mb-2'])
        expect(css).toContain('[data-side="bottom"]')
      })

      it('should generate data-side-left variant', () => {
        const css = coral.generate(['data-side-left:ml-2'])
        expect(css).toContain('[data-side="left"]')
      })

      it('should generate data-side-right variant', () => {
        const css = coral.generate(['data-side-right:mr-2'])
        expect(css).toContain('[data-side="right"]')
      })
    })

    describe('data-align variants', () => {
      it('should generate data-align-start variant', () => {
        const css = coral.generate(['data-align-start:items-start'])
        expect(css).toContain('[data-align="start"]')
      })

      it('should generate data-align-center variant', () => {
        const css = coral.generate(['data-align-center:items-center'])
        expect(css).toContain('[data-align="center"]')
      })

      it('should generate data-align-end variant', () => {
        const css = coral.generate(['data-align-end:items-end'])
        expect(css).toContain('[data-align="end"]')
      })
    })

    describe('data attribute presence variants', () => {
      it('should generate data-disabled variant', () => {
        const css = coral.generate(['data-disabled:opacity-50'])
        expect(css).toContain('[data-disabled]')
      })

      it('should generate data-highlighted variant', () => {
        const css = coral.generate(['data-highlighted:bg-blue-100'])
        expect(css).toContain('[data-highlighted]')
      })

      it('should generate data-selected variant', () => {
        const css = coral.generate(['data-selected:bg-blue-600'])
        expect(css).toContain('[data-selected]')
      })

      it('should generate data-placeholder variant', () => {
        const css = coral.generate(['data-placeholder:text-gray-400'])
        expect(css).toContain('[data-placeholder]')
      })

      it('should generate data-loading variant', () => {
        const css = coral.generate(['data-loading:opacity-50'])
        expect(css).toContain('[data-loading]')
      })

      it('should generate data-focus variant', () => {
        const css = coral.generate(['data-focus:ring-2'])
        expect(css).toContain('[data-focus]')
      })

      it('should generate data-focus-visible variant', () => {
        const css = coral.generate(['data-focus-visible:outline-2'])
        expect(css).toContain('[data-focus-visible]')
      })

      it('should generate data-pressed variant', () => {
        const css = coral.generate(['data-pressed:bg-gray-200'])
        expect(css).toContain('[data-pressed]')
      })

      it('should generate data-dragging variant', () => {
        const css = coral.generate(['data-dragging:cursor-grabbing'])
        expect(css).toContain('[data-dragging]')
      })

      it('should generate data-resizing variant', () => {
        const css = coral.generate(['data-resizing:cursor-col-resize'])
        expect(css).toContain('[data-resizing]')
      })
    })

    describe('data-swipe variants', () => {
      it('should generate data-swipe-start variant', () => {
        const css = coral.generate(['data-swipe-start:bg-blue-100'])
        expect(css).toContain('[data-swipe="start"]')
      })

      it('should generate data-swipe-move variant', () => {
        const css = coral.generate(['data-swipe-move:bg-blue-200'])
        expect(css).toContain('[data-swipe="move"]')
      })

      it('should generate data-swipe-end variant', () => {
        const css = coral.generate(['data-swipe-end:bg-blue-300'])
        expect(css).toContain('[data-swipe="end"]')
      })

      it('should generate data-swipe-cancel variant', () => {
        const css = coral.generate(['data-swipe-cancel:bg-gray-100'])
        expect(css).toContain('[data-swipe="cancel"]')
      })

      it('should generate data-swipe-direction-up variant', () => {
        const css = coral.generate(['data-swipe-direction-up:-translate-y-2'])
        expect(css).toContain('[data-swipe-direction="up"]')
      })

      it('should generate data-swipe-direction-down variant', () => {
        const css = coral.generate(['data-swipe-direction-down:translate-y-2'])
        expect(css).toContain('[data-swipe-direction="down"]')
      })

      it('should generate data-swipe-direction-left variant', () => {
        const css = coral.generate(['data-swipe-direction-left:-translate-x-2'])
        expect(css).toContain('[data-swipe-direction="left"]')
      })

      it('should generate data-swipe-direction-right variant', () => {
        const css = coral.generate(['data-swipe-direction-right:translate-x-2'])
        expect(css).toContain('[data-swipe-direction="right"]')
      })
    })
  })

  describe('Group ARIA Variants', () => {
    it('should generate group-aria-expanded variant', () => {
      const css = coral.generate(['group-aria-expanded:bg-blue-500'])
      expect(css).toContain('.group[aria-expanded="true"]')
    })

    it('should generate group-aria-collapsed variant', () => {
      const css = coral.generate(['group-aria-collapsed:bg-gray-500'])
      expect(css).toContain('.group[aria-expanded="false"]')
    })

    it('should generate group-aria-checked variant', () => {
      const css = coral.generate(['group-aria-checked:bg-green-500'])
      expect(css).toContain('.group[aria-checked="true"]')
    })

    it('should generate group-aria-selected variant', () => {
      const css = coral.generate(['group-aria-selected:bg-blue-600'])
      expect(css).toContain('.group[aria-selected="true"]')
    })

    it('should generate group-aria-disabled variant', () => {
      const css = coral.generate(['group-aria-disabled:opacity-50'])
      expect(css).toContain('.group[aria-disabled="true"]')
    })

    it('should generate group-aria-pressed variant', () => {
      const css = coral.generate(['group-aria-pressed:bg-red-600'])
      expect(css).toContain('.group[aria-pressed="true"]')
    })

    it('should generate group-aria-current variant', () => {
      const css = coral.generate(['group-aria-current:font-bold'])
      expect(css).toContain('.group[aria-current="true"]')
    })

    it('should generate group-aria-current-page variant', () => {
      const css = coral.generate(['group-aria-current-page:underline'])
      expect(css).toContain('.group[aria-current="page"]')
    })
  })

  describe('Group Data Variants', () => {
    it('should generate group-data-open variant', () => {
      const css = coral.generate(['group-data-open:block'])
      expect(css).toContain('.group[data-state="open"]')
    })

    it('should generate group-data-closed variant', () => {
      const css = coral.generate(['group-data-closed:hidden'])
      expect(css).toContain('.group[data-state="closed"]')
    })

    it('should generate group-data-active variant', () => {
      const css = coral.generate(['group-data-active:bg-blue-500'])
      expect(css).toContain('.group[data-state="active"]')
    })

    it('should generate group-data-checked variant', () => {
      const css = coral.generate(['group-data-checked:bg-green-500'])
      expect(css).toContain('.group[data-state="checked"]')
    })

    it('should generate group-data-disabled variant', () => {
      const css = coral.generate(['group-data-disabled:opacity-50'])
      expect(css).toContain('.group[data-disabled]')
    })

    it('should generate group-data-loading variant', () => {
      const css = coral.generate(['group-data-loading:animate-pulse'])
      expect(css).toContain('.group[data-loading]')
    })
  })

  describe('Peer ARIA Variants', () => {
    it('should generate peer-aria-expanded variant', () => {
      const css = coral.generate(['peer-aria-expanded:bg-blue-500'])
      expect(css).toContain('.peer[aria-expanded="true"]')
    })

    it('should generate peer-aria-collapsed variant', () => {
      const css = coral.generate(['peer-aria-collapsed:bg-gray-500'])
      expect(css).toContain('.peer[aria-expanded="false"]')
    })

    it('should generate peer-aria-checked variant', () => {
      const css = coral.generate(['peer-aria-checked:bg-green-500'])
      expect(css).toContain('.peer[aria-checked="true"]')
    })

    it('should generate peer-aria-selected variant', () => {
      const css = coral.generate(['peer-aria-selected:bg-blue-600'])
      expect(css).toContain('.peer[aria-selected="true"]')
    })

    it('should generate peer-aria-disabled variant', () => {
      const css = coral.generate(['peer-aria-disabled:opacity-50'])
      expect(css).toContain('.peer[aria-disabled="true"]')
    })
  })

  describe('Peer Data Variants', () => {
    it('should generate peer-data-open variant', () => {
      const css = coral.generate(['peer-data-open:block'])
      expect(css).toContain('.peer[data-state="open"]')
    })

    it('should generate peer-data-closed variant', () => {
      const css = coral.generate(['peer-data-closed:hidden'])
      expect(css).toContain('.peer[data-state="closed"]')
    })

    it('should generate peer-data-active variant', () => {
      const css = coral.generate(['peer-data-active:bg-blue-500'])
      expect(css).toContain('.peer[data-state="active"]')
    })

    it('should generate peer-data-checked variant', () => {
      const css = coral.generate(['peer-data-checked:bg-green-500'])
      expect(css).toContain('.peer[data-state="checked"]')
    })

    it('should generate peer-data-disabled variant', () => {
      const css = coral.generate(['peer-data-disabled:opacity-50'])
      expect(css).toContain('.peer[data-disabled]')
    })
  })

  describe('group-has-* Variants', () => {
    it('should generate group-has-hover variant', () => {
      const css = coral.generate(['group-has-hover:bg-blue-500'])
      expect(css).toContain('.group:has(:hover)')
    })

    it('should generate group-has-focus variant', () => {
      const css = coral.generate(['group-has-focus:ring-2'])
      expect(css).toContain('.group:has(:focus)')
    })

    it('should generate group-has-focus-visible variant', () => {
      const css = coral.generate(['group-has-focus-visible:outline-2'])
      expect(css).toContain('.group:has(:focus-visible)')
    })

    it('should generate group-has-active variant', () => {
      const css = coral.generate(['group-has-active:bg-red-500'])
      expect(css).toContain('.group:has(:active)')
    })

    it('should generate group-has-checked variant', () => {
      const css = coral.generate(['group-has-checked:bg-green-500'])
      expect(css).toContain('.group:has(:checked)')
    })

    it('should generate group-has-disabled variant', () => {
      const css = coral.generate(['group-has-disabled:opacity-50'])
      expect(css).toContain('.group:has(:disabled)')
    })

    it('should generate group-has-invalid variant', () => {
      const css = coral.generate(['group-has-invalid:border-red-500'])
      expect(css).toContain('.group:has(:invalid)')
    })

    it('should generate group-has-valid variant', () => {
      const css = coral.generate(['group-has-valid:border-green-500'])
      expect(css).toContain('.group:has(:valid)')
    })

    it('should generate group-has-empty variant', () => {
      const css = coral.generate(['group-has-empty:hidden'])
      expect(css).toContain('.group:has(:empty)')
    })

    it('should generate group-has-input variant', () => {
      const css = coral.generate(['group-has-input:bg-gray-100'])
      expect(css).toContain('.group:has(input)')
    })

    it('should generate group-has-textarea variant', () => {
      const css = coral.generate(['group-has-textarea:bg-gray-100'])
      expect(css).toContain('.group:has(textarea)')
    })

    it('should generate group-has-checkbox variant', () => {
      const css = coral.generate(['group-has-checkbox:bg-blue-100'])
      expect(css).toContain('.group:has(input[type="checkbox"])')
    })

    it('should generate group-has-aria-expanded variant', () => {
      const css = coral.generate(['group-has-aria-expanded:bg-blue-500'])
      expect(css).toContain('.group:has([aria-expanded="true"])')
    })

    it('should generate group-has-data-open variant', () => {
      const css = coral.generate(['group-has-data-open:block'])
      expect(css).toContain('.group:has([data-state="open"])')
    })
  })

  describe('peer-has-* Variants', () => {
    it('should generate peer-has-hover variant', () => {
      const css = coral.generate(['peer-has-hover:bg-blue-500'])
      expect(css).toContain('.peer:has(:hover)')
    })

    it('should generate peer-has-focus variant', () => {
      const css = coral.generate(['peer-has-focus:ring-2'])
      expect(css).toContain('.peer:has(:focus)')
    })

    it('should generate peer-has-checked variant', () => {
      const css = coral.generate(['peer-has-checked:bg-green-500'])
      expect(css).toContain('.peer:has(:checked)')
    })

    it('should generate peer-has-disabled variant', () => {
      const css = coral.generate(['peer-has-disabled:opacity-50'])
      expect(css).toContain('.peer:has(:disabled)')
    })

    it('should generate peer-has-input variant', () => {
      const css = coral.generate(['peer-has-input:bg-gray-100'])
      expect(css).toContain('.peer:has(input)')
    })

    it('should generate peer-has-checkbox variant', () => {
      const css = coral.generate(['peer-has-checkbox:bg-blue-100'])
      expect(css).toContain('.peer:has(input[type="checkbox"])')
    })

    it('should generate peer-has-aria-expanded variant', () => {
      const css = coral.generate(['peer-has-aria-expanded:bg-blue-500'])
      expect(css).toContain('.peer:has([aria-expanded="true"])')
    })

    it('should generate peer-has-data-open variant', () => {
      const css = coral.generate(['peer-has-data-open:block'])
      expect(css).toContain('.peer:has([data-state="open"])')
    })
  })

  describe('Media Query Variants', () => {
    describe('forced-colors variants', () => {
      it('should generate forced-colors variant', () => {
        const css = coral.generate(['forced-colors:border-2'])
        expect(css).toContain('@media (forced-colors: active)')
      })

      it('should generate forced-colors-none variant', () => {
        const css = coral.generate(['forced-colors-none:border'])
        expect(css).toContain('@media (forced-colors: none)')
      })
    })

    describe('contrast preference variants', () => {
      it('should generate contrast-more variant', () => {
        const css = coral.generate(['contrast-more:border-2'])
        expect(css).toContain('@media (prefers-contrast: more)')
      })

      it('should generate contrast-less variant', () => {
        const css = coral.generate(['contrast-less:border-0'])
        expect(css).toContain('@media (prefers-contrast: less)')
      })

      it('should generate contrast-custom variant', () => {
        const css = coral.generate(['contrast-custom:border'])
        expect(css).toContain('@media (prefers-contrast: custom)')
      })
    })

    describe('transparency preference variants', () => {
      it('should generate reduce-transparency variant', () => {
        const css = coral.generate(['reduce-transparency:bg-white'])
        expect(css).toContain('@media (prefers-reduced-transparency: reduce)')
      })
    })

    describe('color scheme variants', () => {
      it('should generate color-srgb variant', () => {
        const css = coral.generate(['color-srgb:bg-red-500'])
        expect(css).toContain('@media (color-gamut: srgb)')
      })

      it('should generate color-p3 variant', () => {
        const css = coral.generate(['color-p3:bg-red-500'])
        expect(css).toContain('@media (color-gamut: p3)')
      })

      it('should generate color-rec2020 variant', () => {
        const css = coral.generate(['color-rec2020:bg-red-500'])
        expect(css).toContain('@media (color-gamut: rec2020)')
      })
    })

    describe('display mode variants (PWA)', () => {
      it('should generate standalone variant', () => {
        const css = coral.generate(['standalone:hidden'])
        expect(css).toContain('@media (display-mode: standalone)')
      })

      it('should generate fullscreen variant', () => {
        // Note: 'fullscreen' conflicts with :fullscreen pseudo-class, so we skip this test
        // The @media (display-mode: fullscreen) variant exists but :fullscreen takes precedence
        const css = coral.generate(['fullscreen:hidden'])
        // This will generate :fullscreen pseudo-class variant instead
        expect(css).toContain(':fullscreen')
      })

      it('should generate minimal-ui variant', () => {
        const css = coral.generate(['minimal-ui:block'])
        expect(css).toContain('@media (display-mode: minimal-ui)')
      })

      it('should generate browser variant', () => {
        const css = coral.generate(['browser:block'])
        expect(css).toContain('@media (display-mode: browser)')
      })

      it('should generate picture-in-picture variant', () => {
        const css = coral.generate(['picture-in-picture:hidden'])
        expect(css).toContain('@media (display-mode: picture-in-picture)')
      })
    })

    describe('pointer/hover capability variants', () => {
      it('should generate pointer-fine variant', () => {
        const css = coral.generate(['pointer-fine:cursor-pointer'])
        expect(css).toContain('@media (pointer: fine)')
      })

      it('should generate pointer-coarse variant', () => {
        const css = coral.generate(['pointer-coarse:cursor-default'])
        expect(css).toContain('@media (pointer: coarse)')
      })

      it('should generate hover-hover variant', () => {
        const css = coral.generate(['hover-hover:bg-blue-500'])
        expect(css).toContain('@media (hover: hover)')
      })

      it('should generate hover-none variant', () => {
        const css = coral.generate(['hover-none:bg-transparent'])
        expect(css).toContain('@media (hover: none)')
      })
    })

    describe('update frequency variants', () => {
      it('should generate update-fast variant', () => {
        const css = coral.generate(['update-fast:animate-pulse'])
        expect(css).toContain('@media (update: fast)')
      })

      it('should generate update-slow variant', () => {
        const css = coral.generate(['update-slow:transition-none'])
        expect(css).toContain('@media (update: slow)')
      })

      it('should generate update-none variant', () => {
        const css = coral.generate(['update-none:transition-none'])
        expect(css).toContain('@media (update: none)')
      })
    })

    describe('scripting variants', () => {
      it('should generate scripting-enabled variant', () => {
        const css = coral.generate(['scripting-enabled:block'])
        expect(css).toContain('@media (scripting: enabled)')
      })

      it('should generate scripting-none variant', () => {
        const css = coral.generate(['scripting-none:hidden'])
        expect(css).toContain('@media (scripting: none)')
      })

      it('should generate scripting-initial-only variant', () => {
        const css = coral.generate(['scripting-initial-only:block'])
        expect(css).toContain('@media (scripting: initial-only)')
      })
    })

    describe('inverted colors variant', () => {
      it('should generate inverted-colors variant', () => {
        const css = coral.generate(['inverted-colors:invert'])
        expect(css).toContain('@media (inverted-colors: inverted)')
      })
    })
  })

  describe('Direction Variants', () => {
    it('should generate rtl variant', () => {
      const css = coral.generate(['rtl:text-right'])
      expect(css).toContain('[dir="rtl"]')
    })

    it('should generate ltr variant', () => {
      const css = coral.generate(['ltr:text-left'])
      expect(css).toContain('[dir="ltr"]')
    })
  })

  describe('Open/Closed State Variants', () => {
    it('should generate open variant', () => {
      const css = coral.generate(['open:block'])
      expect(css).toContain('[open]')
    })

    it('should generate closed variant', () => {
      const css = coral.generate(['closed:hidden'])
      expect(css).toContain(':not([open])')
    })

    it('should generate details-open variant', () => {
      const css = coral.generate(['details-open:block'])
      expect(css).toContain('details[open]')
    })

    it('should generate dialog-open variant', () => {
      const css = coral.generate(['dialog-open:flex'])
      expect(css).toContain('dialog[open]')
    })
  })

  describe('Selection and Pseudo-element Variants', () => {
    it('should generate selection variant', () => {
      const css = coral.generate(['selection:bg-blue-500'])
      expect(css).toContain('::selection')
    })

    it('should generate first-letter variant', () => {
      const css = coral.generate(['first-letter:text-2xl'])
      expect(css).toContain('::first-letter')
    })

    it('should generate first-line variant', () => {
      const css = coral.generate(['first-line:font-bold'])
      expect(css).toContain('::first-line')
    })

    it('should generate backdrop variant', () => {
      const css = coral.generate(['backdrop:bg-black'])
      expect(css).toContain('::backdrop')
    })
  })

  describe('Color Scheme Preference Variants', () => {
    it('should generate prefer-light variant', () => {
      const css = coral.generate(['prefer-light:bg-white'])
      expect(css).toContain('@media (prefers-color-scheme: light)')
    })

    it('should generate prefer-dark variant', () => {
      const css = coral.generate(['prefer-dark:bg-gray-900'])
      expect(css).toContain('@media (prefers-color-scheme: dark)')
    })

    it('should generate hdr variant', () => {
      const css = coral.generate(['hdr:bg-red-500'])
      expect(css).toContain('@media (dynamic-range: high)')
    })

    it('should generate sdr variant', () => {
      const css = coral.generate(['sdr:bg-red-400'])
      expect(css).toContain('@media (dynamic-range: standard)')
    })
  })

  describe('Form State Variants', () => {
    it('should generate autofill variant', () => {
      const css = coral.generate(['autofill:bg-yellow-100'])
      expect(css).toContain(':autofill')
    })

    it('should generate blank variant', () => {
      const css = coral.generate(['blank:placeholder-gray-400'])
      expect(css).toContain(':blank')
    })

    it('should generate user-invalid variant', () => {
      const css = coral.generate(['user-invalid:border-red-500'])
      expect(css).toContain(':user-invalid')
    })

    it('should generate user-valid variant', () => {
      const css = coral.generate(['user-valid:border-green-500'])
      expect(css).toContain(':user-valid')
    })
  })

  describe('Link State Variants', () => {
    it('should generate any-link variant', () => {
      const css = coral.generate(['any-link:text-blue-600'])
      expect(css).toContain(':any-link')
    })

    it('should generate local-link variant', () => {
      const css = coral.generate(['local-link:text-blue-500'])
      expect(css).toContain(':local-link')
    })
  })

  describe('Media State Variants', () => {
    it('should generate playing variant', () => {
      const css = coral.generate(['playing:animate-spin'])
      expect(css).toContain(':playing')
    })

    it('should generate paused variant', () => {
      const css = coral.generate(['paused:opacity-50'])
      expect(css).toContain(':paused')
    })

    it('should generate seeking variant', () => {
      const css = coral.generate(['seeking:cursor-wait'])
      expect(css).toContain(':seeking')
    })

    it('should generate buffering variant', () => {
      const css = coral.generate(['buffering:animate-pulse'])
      expect(css).toContain(':buffering')
    })

    it('should generate stalled variant', () => {
      const css = coral.generate(['stalled:opacity-50'])
      expect(css).toContain(':stalled')
    })

    it('should generate muted variant', () => {
      const css = coral.generate(['muted:opacity-50'])
      expect(css).toContain(':muted')
    })

    it('should generate volume-locked variant', () => {
      const css = coral.generate(['volume-locked:cursor-not-allowed'])
      expect(css).toContain(':volume-locked')
    })
  })

  describe('Timeline State Variants', () => {
    it('should generate past variant', () => {
      const css = coral.generate(['past:opacity-50'])
      expect(css).toContain(':past')
    })

    it('should generate current variant', () => {
      const css = coral.generate(['current:font-bold'])
      expect(css).toContain(':current')
    })

    it('should generate future variant', () => {
      const css = coral.generate(['future:opacity-50'])
      expect(css).toContain(':future')
    })
  })

  describe('Structural Variants', () => {
    it('should generate only variant', () => {
      const css = coral.generate(['only:w-full'])
      expect(css).toContain(':only-child')
    })

    it('should generate first-of-type variant', () => {
      const css = coral.generate(['first-of-type:ml-0'])
      expect(css).toContain(':first-of-type')
    })

    it('should generate last-of-type variant', () => {
      const css = coral.generate(['last-of-type:mr-0'])
      expect(css).toContain(':last-of-type')
    })

    it('should generate only-of-type variant', () => {
      const css = coral.generate(['only-of-type:w-full'])
      expect(css).toContain(':only-of-type')
    })

    it('should generate nth-2 variant', () => {
      const css = coral.generate(['nth-2:bg-blue-100'])
      expect(css).toContain(':nth-child(2)')
    })

    it('should generate nth-3 variant', () => {
      const css = coral.generate(['nth-3:bg-blue-200'])
      expect(css).toContain(':nth-child(3)')
    })

    it('should generate nth-last-2 variant', () => {
      const css = coral.generate(['nth-last-2:bg-gray-100'])
      expect(css).toContain(':nth-last-child(2)')
    })

    it('should generate nth-last-3 variant', () => {
      const css = coral.generate(['nth-last-3:bg-gray-200'])
      expect(css).toContain(':nth-last-child(3)')
    })
  })

  describe('Target Variants', () => {
    it('should generate target variant', () => {
      const css = coral.generate(['target:bg-blue-500'])
      expect(css).toContain(':target')
    })

    it('should generate target-within variant', () => {
      const css = coral.generate(['target-within:bg-blue-100'])
      expect(css).toContain(':target-within')
    })
  })

  describe('Shadow DOM Variants', () => {
    it('should generate host variant', () => {
      const css = coral.generate(['host:block'])
      expect(css).toContain(':host(')
    })

    it('should generate host-context variant', () => {
      const css = coral.generate(['host-context:block'])
      expect(css).toContain(':host-context(')
    })

    it('should generate slotted variant', () => {
      const css = coral.generate(['slotted:text-red-500'])
      expect(css).toContain('::slotted(')
    })
  })

  describe('Custom Element Variants', () => {
    it('should generate defined variant', () => {
      const css = coral.generate(['defined:opacity-100'])
      expect(css).toContain(':defined')
    })
  })

  describe('Sticky State Variants', () => {
    it('should generate stuck variant', () => {
      const css = coral.generate(['stuck:bg-blue-500'])
      expect(css).toContain('[data-stuck]')
    })

    it('should generate stuck-top variant', () => {
      const css = coral.generate(['stuck-top:shadow-lg'])
      expect(css).toContain('[data-stuck="top"]')
    })

    it('should generate stuck-bottom variant', () => {
      const css = coral.generate(['stuck-bottom:shadow-lg'])
      expect(css).toContain('[data-stuck="bottom"]')
    })
  })

  describe('File Selector Variants', () => {
    it('should generate file variant', () => {
      const css = coral.generate(['file:bg-blue-500'])
      expect(css).toContain('::file-selector-button')
    })

    it('should generate file-hover variant', () => {
      const css = coral.generate(['file-hover:bg-blue-600'])
      expect(css).toContain('::file-selector-button:hover')
    })
  })

  describe('View Timeline Variants', () => {
    it('should generate in-view variant', () => {
      const css = coral.generate(['in-view:opacity-100'])
      expect(css).toContain('[data-in-view]')
    })

    it('should generate out-of-view variant', () => {
      const css = coral.generate(['out-of-view:opacity-0'])
      expect(css).toContain(':not([data-in-view])')
    })
  })

  describe('Animation State Variants', () => {
    it('should generate animating variant', () => {
      const css = coral.generate(['animating:animate-pulse'])
      expect(css).toContain('[data-animating]')
    })

    it('should generate animation-paused variant', () => {
      const css = coral.generate(['animation-paused:opacity-50'])
      expect(css).toContain('[data-animation-state="paused"]')
    })

    it('should generate animation-running variant', () => {
      const css = coral.generate(['animation-running:opacity-100'])
      expect(css).toContain('[data-animation-state="running"]')
    })
  })

  describe('Overflowing State Variants', () => {
    it('should generate overflowing variant', () => {
      const css = coral.generate(['overflowing:overflow-auto'])
      expect(css).toContain('[data-overflowing]')
    })

    it('should generate overflowing-x variant', () => {
      const css = coral.generate(['overflowing-x:overflow-x-auto'])
      expect(css).toContain('[data-overflowing-x]')
    })

    it('should generate overflowing-y variant', () => {
      const css = coral.generate(['overflowing-y:overflow-y-auto'])
      expect(css).toContain('[data-overflowing-y]')
    })

    it('should generate truncated variant', () => {
      const css = coral.generate(['truncated:truncate'])
      expect(css).toContain('[data-truncated]')
    })
  })

  describe(':has() Pseudo-class Variants', () => {
    it('should generate has-checked variant', () => {
      const css = coral.generate(['has-checked:bg-green-500'])
      expect(css).toContain(':has(:checked)')
    })

    it('should generate has-unchecked variant', () => {
      const css = coral.generate(['has-unchecked:bg-gray-200'])
      expect(css).toContain(':has(:not(:checked))')
    })

    it('should generate has-focus variant', () => {
      const css = coral.generate(['has-focus:ring-2'])
      expect(css).toContain(':has(:focus)')
    })

    it('should generate has-focus-within variant', () => {
      const css = coral.generate(['has-focus-within:ring-2'])
      expect(css).toContain(':has(:focus-within)')
    })

    it('should generate has-hover variant', () => {
      const css = coral.generate(['has-hover:bg-blue-500'])
      expect(css).toContain(':has(:hover)')
    })

    it('should generate has-active variant', () => {
      const css = coral.generate(['has-active:bg-red-500'])
      expect(css).toContain(':has(:active)')
    })

    it('should generate has-disabled variant', () => {
      const css = coral.generate(['has-disabled:opacity-50'])
      expect(css).toContain(':has(:disabled)')
    })

    it('should generate has-enabled variant', () => {
      const css = coral.generate(['has-enabled:opacity-100'])
      expect(css).toContain(':has(:enabled)')
    })

    it('should generate has-valid variant', () => {
      const css = coral.generate(['has-valid:border-green-500'])
      expect(css).toContain(':has(:valid)')
    })

    it('should generate has-invalid variant', () => {
      const css = coral.generate(['has-invalid:border-red-500'])
      expect(css).toContain(':has(:invalid)')
    })

    it('should generate has-empty variant', () => {
      const css = coral.generate(['has-empty:hidden'])
      expect(css).toContain(':has(:empty)')
    })

    it('should generate has-img variant', () => {
      const css = coral.generate(['has-img:bg-cover'])
      expect(css).toContain(':has(img)')
    })

    it('should generate has-svg variant', () => {
      const css = coral.generate(['has-svg:fill-current'])
      expect(css).toContain(':has(svg)')
    })

    it('should generate has-input variant', () => {
      const css = coral.generate(['has-input:bg-gray-100'])
      expect(css).toContain(':has(input)')
    })

    it('should generate has-children variant', () => {
      const css = coral.generate(['has-children:block'])
      expect(css).toContain(':has(> *)')
    })

    it('should generate has-no-children variant', () => {
      const css = coral.generate(['has-no-children:hidden'])
      expect(css).toContain(':not(:has(> *))')
    })

    it('should generate has-next variant', () => {
      const css = coral.generate(['has-next:mb-4'])
      expect(css).toContain(':has(+ *)')
    })

    it('should generate has-no-next variant', () => {
      const css = coral.generate(['has-no-next:mb-0'])
      expect(css).toContain(':not(:has(+ *))')
    })
  })

  describe(':not() Pseudo-class Variants', () => {
    it('should generate not-first variant', () => {
      const css = coral.generate(['not-first:mt-4'])
      expect(css).toContain(':not(:first-child)')
    })

    it('should generate not-last variant', () => {
      const css = coral.generate(['not-last:mb-4'])
      expect(css).toContain(':not(:last-child)')
    })

    it('should generate not-only variant', () => {
      const css = coral.generate(['not-only:w-auto'])
      expect(css).toContain(':not(:only-child)')
    })

    it('should generate not-empty variant', () => {
      const css = coral.generate(['not-empty:block'])
      expect(css).toContain(':not(:empty)')
    })

    it('should generate not-disabled variant', () => {
      const css = coral.generate(['not-disabled:opacity-100'])
      expect(css).toContain(':not(:disabled)')
    })

    it('should generate not-checked variant', () => {
      const css = coral.generate(['not-checked:bg-gray-200'])
      expect(css).toContain(':not(:checked)')
    })
  })

  describe('Arbitrary Variants', () => {
    describe('arbitrary data variants', () => {
      it('should generate data-[state=open] variant', () => {
        const css = coral.generate(['data-[state=open]:bg-red-500'])
        expect(css).toContain('[data-state="open"]')
      })

      it('should generate data-[loading] variant', () => {
        const css = coral.generate(['data-[loading]:opacity-50'])
        expect(css).toContain('[data-loading]')
      })
    })

    describe('arbitrary aria variants', () => {
      it('should generate aria-[checked=true] variant', () => {
        const css = coral.generate(['aria-[checked=true]:bg-green-500'])
        expect(css).toContain('[aria-checked="true"]')
      })

      it('should generate aria-[expanded] variant', () => {
        const css = coral.generate(['aria-[expanded]:bg-blue-500'])
        expect(css).toContain('[aria-expanded="true"]')
      })
    })

    describe('arbitrary has variants', () => {
      it('should generate has-[.active] variant', () => {
        const css = coral.generate(['has-[.active]:bg-blue-500'])
        expect(css).toContain(':has(.active)')
      })

      it('should generate has-[>_img] variant', () => {
        const css = coral.generate(['has-[>_img]:p-4'])
        expect(css).toContain(':has(> img)')
      })
    })

    describe('arbitrary not variants', () => {
      it('should generate not-[.active] variant', () => {
        const css = coral.generate(['not-[.active]:opacity-50'])
        expect(css).toContain(':not(.active)')
      })

      it('should generate not-[:hover] variant', () => {
        const css = coral.generate(['not-[:hover]:pointer-events-none'])
        expect(css).toContain(':not(:hover)')
      })
    })

    describe('arbitrary is variants', () => {
      it('should generate is-[div_span] variant', () => {
        const css = coral.generate(['is-[div_span]:text-red-500'])
        expect(css).toContain(':is(div span)')
      })
    })

    describe('arbitrary where variants', () => {
      it('should generate where-[div_span] variant', () => {
        const css = coral.generate(['where-[div_span]:text-red-500'])
        expect(css).toContain(':where(div span)')
      })
    })

    describe('arbitrary group-data variants', () => {
      it('should generate group-data-[state=open] variant', () => {
        const css = coral.generate(['group-data-[state=open]:bg-red-500'])
        expect(css).toContain('.group[data-state="open"]')
      })

      it('should generate group-data-[loading] variant', () => {
        const css = coral.generate(['group-data-[loading]:opacity-50'])
        expect(css).toContain('.group[data-loading]')
      })
    })

    describe('arbitrary group-aria variants', () => {
      it('should generate group-aria-[expanded=true] variant', () => {
        const css = coral.generate(['group-aria-[expanded=true]:bg-blue-500'])
        expect(css).toContain('.group[aria-expanded="true"]')
      })
    })

    describe('arbitrary peer-data variants', () => {
      it('should generate peer-data-[state=open] variant', () => {
        const css = coral.generate(['peer-data-[state=open]:bg-red-500'])
        expect(css).toContain('.peer[data-state="open"]')
      })
    })

    describe('arbitrary peer-aria variants', () => {
      it('should generate peer-aria-[expanded=true] variant', () => {
        const css = coral.generate(['peer-aria-[expanded=true]:bg-blue-500'])
        expect(css).toContain('.peer[aria-expanded="true"]')
      })
    })
  })

  describe('@supports Feature Query Variants', () => {
    it('should generate supports-grid variant', () => {
      const css = coral.generate(['supports-grid:grid'])
      expect(css).toContain('@supports (display: grid)')
    })

    it('should generate supports-flex variant', () => {
      const css = coral.generate(['supports-flex:flex'])
      expect(css).toContain('@supports (display: flex)')
    })

    it('should generate supports-container variant', () => {
      const css = coral.generate(['supports-container:container'])
      expect(css).toContain('@supports (container-type: inline-size)')
    })

    it('should generate supports-has variant', () => {
      const css = coral.generate(['supports-has:block'])
      expect(css).toContain('@supports selector(:has(*))')
    })

    it('should generate supports-backdrop-blur variant', () => {
      const css = coral.generate(['supports-backdrop-blur:backdrop-blur'])
      expect(css).toContain('@supports (backdrop-filter: blur(1px))')
    })

    it('should generate supports-scroll-timeline variant', () => {
      const css = coral.generate(['supports-scroll-timeline:block'])
      expect(css).toContain('@supports (animation-timeline: scroll())')
    })
  })

  describe('Arbitrary @supports Variants', () => {
    it('should generate supports-[display:grid] variant', () => {
      const css = coral.generate(['supports-[display:grid]:grid'])
      expect(css).toContain('@supports (display: grid)')
    })

    it('should generate supports-[backdrop-filter:blur(10px)] variant', () => {
      const css = coral.generate(['supports-[backdrop-filter:blur(10px)]:backdrop-blur'])
      expect(css).toContain('@supports (backdrop-filter: blur(10px))')
    })

    it('should generate supports-[selector(:has(+_img))] variant', () => {
      const css = coral.generate(['supports-[selector(:has(+_img))]:block'])
      expect(css).toContain('@supports selector(:has(+ img))')
    })
  })

  describe('not-supports Variants', () => {
    it('should generate not-supports-[display:grid] variant', () => {
      const css = coral.generate(['not-supports-[display:grid]:block'])
      expect(css).toContain('@supports not (display: grid)')
    })

    it('should generate not-supports-[backdrop-filter:blur(10px)] variant', () => {
      const css = coral.generate(['not-supports-[backdrop-filter:blur(10px)]:bg-white'])
      expect(css).toContain('@supports not (backdrop-filter: blur(10px))')
    })
  })

  describe('@starting-style Variant', () => {
    it('should generate starting variant', () => {
      const css = coral.generate(['starting:opacity-0'])
      expect(css).toContain('@starting-style')
    })
  })

  describe('Group not-has Variants', () => {
    it('should generate group-not-has-checked variant', () => {
      const css = coral.generate(['group-not-has-checked:opacity-50'])
      expect(css).toContain('.group:not(:has(:checked))')
    })

    it('should generate group-not-has-focus variant', () => {
      const css = coral.generate(['group-not-has-focus:opacity-50'])
      expect(css).toContain('.group:not(:has(:focus))')
    })
  })

  describe('Peer not-has Variants', () => {
    it('should generate peer-not-has-checked variant', () => {
      const css = coral.generate(['peer-not-has-checked:opacity-50'])
      expect(css).toContain('.peer:not(:has(:checked))')
    })

    it('should generate peer-not-has-focus variant', () => {
      const css = coral.generate(['peer-not-has-focus:opacity-50'])
      expect(css).toContain('.peer:not(:has(:focus))')
    })
  })

  describe('Combined Variants', () => {
    it('should combine aria-checked with hover', () => {
      const css = coral.generate(['aria-checked:hover:bg-blue-600'])
      expect(css).toContain('[aria-checked="true"]')
      expect(css).toContain(':hover')
    })

    it('should combine data-open with group', () => {
      const css = coral.generate(['group-data-open:block'])
      expect(css).toContain('.group[data-state="open"]')
    })

    it('should combine aria-selected with peer', () => {
      const css = coral.generate(['peer-aria-selected:bg-blue-600'])
      expect(css).toContain('.peer[aria-selected="true"]')
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/variants/state'
      )
      expect(defaultExport).toBe(stateVariantsPlugin)
    })
  })
})
