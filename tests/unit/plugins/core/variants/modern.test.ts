/**
 * Tests for Modern CSS Variants Plugin
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { modernVariantsPlugin } from '../../../../../src/plugins/core/variants/modern'
import { coralPreset } from '../../../../../src/presets/coral'
import type { Coral } from '../../../../../src/types'

describe('Modern Variants Plugin', () => {
  let coral: Coral

  beforeEach(() => {
    coral = createCoral()
    coralPreset().forEach((p) => coral.use(p))
    coral.use(modernVariantsPlugin())
  })

  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = modernVariantsPlugin()
      expect(plugin.name).toBe('modern-variants')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Container Query Variants', () => {
    it('should generate @sm container query', () => {
      const css = coral.generate(['@sm:bg-red-500'])
      expect(css).toContain('@container')
      expect(css).toContain('min-width')
    })

    it('should generate @md container query', () => {
      const css = coral.generate(['@md:bg-blue-500'])
      expect(css).toContain('@container')
      expect(css).toContain('min-width')
    })

    it('should generate @lg container query', () => {
      const css = coral.generate(['@lg:p-4'])
      expect(css).toContain('@container')
    })

    it('should generate @xl container query', () => {
      const css = coral.generate(['@xl:text-xl'])
      expect(css).toContain('@container')
    })

    it('should generate @2xl container query', () => {
      const css = coral.generate(['@2xl:text-2xl'])
      expect(css).toContain('@container')
    })

    it('should generate unnamed @container query', () => {
      const css = coral.generate(['@container:flex'])
      expect(css).toContain('@container')
    })
  })

  describe(':has() Selector Variants', () => {
    it('should generate has-checked variant', () => {
      const css = coral.generate(['has-checked:bg-green-500'])
      expect(css).toContain(':has(:checked)')
    })

    it('should generate has-focus variant', () => {
      const css = coral.generate(['has-focus:ring-2'])
      expect(css).toContain(':has(:focus)')
    })

    it('should generate has-focus-visible variant', () => {
      const css = coral.generate(['has-focus-visible:outline-2'])
      expect(css).toContain(':has(:focus-visible)')
    })

    it('should generate has-hover variant', () => {
      const css = coral.generate(['has-hover:bg-gray-100'])
      expect(css).toContain(':has(:hover)')
    })

    it('should generate has-active variant', () => {
      const css = coral.generate(['has-active:scale-95'])
      expect(css).toContain(':has(:active)')
    })
  })

  describe('@supports Query Variants', () => {
    it('should generate supports-grid variant', () => {
      const css = coral.generate(['supports-grid:grid'])
      expect(css).toContain('@supports')
      expect(css).toContain('display: grid')
    })

    it('should generate supports-flex variant', () => {
      const css = coral.generate(['supports-flex:flex'])
      expect(css).toContain('@supports')
      expect(css).toContain('display: flex')
    })

    it('should generate supports-backdrop variant', () => {
      const css = coral.generate(['supports-backdrop:backdrop-blur-sm'])
      expect(css).toContain('@supports')
      expect(css).toContain('backdrop-filter')
    })

    it('should generate supports-scroll-snap variant', () => {
      const css = coral.generate(['supports-scroll-snap:snap-x'])
      expect(css).toContain('@supports')
      expect(css).toContain('scroll-snap-type')
    })

    it('should generate supports-container variant', () => {
      const css = coral.generate(['supports-container:@container'])
      expect(css).toContain('@supports')
      expect(css).toContain('container-type')
    })

    it('should generate supports-anchor variant', () => {
      const css = coral.generate(['supports-anchor:relative'])
      expect(css).toContain('@supports')
      expect(css).toContain('anchor-name')
    })

    it('should generate supports-has variant', () => {
      const css = coral.generate(['supports-has:hidden'])
      expect(css).toContain('@supports')
      expect(css).toContain('selector(:has(*))')
    })
  })

  describe('Specificity Control Variants', () => {
    it('should generate where variant', () => {
      const css = coral.generate(['where:bg-red-500'])
      expect(css).toContain('.where')
      expect(css).toContain('background-color')
    })

    it('should generate is variant', () => {
      const css = coral.generate(['is:text-white'])
      expect(css).toContain('.is')
      expect(css).toContain('color')
    })

    it('should generate not variant', () => {
      const css = coral.generate(['not:hidden'])
      expect(css).toContain('.not')
      expect(css).toContain('display: none')
    })
  })

  describe('RTL/LTR Variants', () => {
    it('should generate rtl variant', () => {
      const css = coral.generate(['rtl:text-right'])
      expect(css).toContain('[dir="rtl"]')
    })

    it('should generate ltr variant', () => {
      const css = coral.generate(['ltr:text-left'])
      expect(css).toContain('[dir="ltr"]')
    })
  })

  describe('Data Attribute Variants', () => {
    it('should generate data-loading variant', () => {
      const css = coral.generate(['data-loading:opacity-50'])
      expect(css).toContain('[data-loading]')
    })

    it('should generate data-active variant', () => {
      const css = coral.generate(['data-active:bg-blue-500'])
      // coralPreset uses [data-state="active"] instead of [data-active]
      expect(css).toContain('[data-state="active"]')
    })

    it('should generate data-selected variant', () => {
      const css = coral.generate(['data-selected:ring-2'])
      expect(css).toContain('[data-selected]')
    })

    it('should generate data-disabled variant', () => {
      const css = coral.generate(['data-disabled:opacity-25'])
      expect(css).toContain('[data-disabled]')
    })

    it('should generate data-open variant', () => {
      const css = coral.generate(['data-open:rotate-180'])
      // coralPreset uses [data-state="open"] instead of [data-open]
      expect(css).toContain('[data-state="open"]')
    })

    it('should generate data-closed variant', () => {
      const css = coral.generate(['data-closed:hidden'])
      // coralPreset uses [data-state="closed"] instead of [data-closed]
      expect(css).toContain('[data-state="closed"]')
    })
  })

  describe('ARIA State Variants', () => {
    it('should generate aria-busy variant', () => {
      const css = coral.generate(['aria-busy:animate-pulse'])
      expect(css).toContain('[aria-busy="true"]')
    })

    it('should generate aria-checked variant', () => {
      const css = coral.generate(['aria-checked:bg-blue-500'])
      expect(css).toContain('[aria-checked="true"]')
    })

    it('should generate aria-disabled variant', () => {
      const css = coral.generate(['aria-disabled:opacity-50'])
      expect(css).toContain('[aria-disabled="true"]')
    })

    it('should generate aria-expanded variant', () => {
      const css = coral.generate(['aria-expanded:rotate-180'])
      expect(css).toContain('[aria-expanded="true"]')
    })

    it('should generate aria-hidden variant', () => {
      const css = coral.generate(['aria-hidden:hidden'])
      expect(css).toContain('[aria-hidden="true"]')
    })

    it('should generate aria-pressed variant', () => {
      const css = coral.generate(['aria-pressed:bg-gray-700'])
      expect(css).toContain('[aria-pressed="true"]')
    })

    it('should generate aria-readonly variant', () => {
      const css = coral.generate(['aria-readonly:bg-gray-100'])
      expect(css).toContain('[aria-readonly="true"]')
    })

    it('should generate aria-required variant', () => {
      const css = coral.generate(['aria-required:border-red-500'])
      expect(css).toContain('[aria-required="true"]')
    })

    it('should generate aria-selected variant', () => {
      const css = coral.generate(['aria-selected:bg-indigo-500'])
      expect(css).toContain('[aria-selected="true"]')
    })
  })

  describe('Combined Variants', () => {
    it('should combine container query with other variants', () => {
      const css = coral.generate(['@md:hover:bg-blue-600'])
      expect(css).toContain('@container')
    })

    it('should combine rtl with other variants', () => {
      const css = coral.generate(['rtl:hover:mr-4'])
      expect(css).toContain('[dir="rtl"]')
    })

    it('should combine data attribute with other variants', () => {
      const css = coral.generate(['data-active:hover:bg-blue-600'])
      // coralPreset uses [data-state="active"]
      expect(css).toContain('[data-state="active"]')
    })

    it('should combine aria with other variants', () => {
      const css = coral.generate(['aria-expanded:group-hover:rotate-180'])
      expect(css).toContain('[aria-expanded="true"]')
    })

    it('should combine supports with responsive', () => {
      const css = coral.generate(['md:supports-grid:grid-cols-2'])
      expect(css).toBeDefined()
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/variants/modern'
      )
      expect(defaultExport).toBe(modernVariantsPlugin)
    })
  })

  describe('Direct Plugin Handlers (without coralPreset interference)', () => {
    let directCoral: Coral

    beforeEach(() => {
      directCoral = createCoral()
      // Add a minimal utility plugin for testing
      directCoral.use({
        name: 'test-utils',
        version: '1.0.0',
        install(ctx) {
          ctx.addRule({
            name: 'bg-test',
            pattern: /^bg-test$/,
            generate: () => ({ 'background-color': 'red' }),
          })
          ctx.addRule({
            name: 'text-test',
            pattern: /^text-test$/,
            generate: () => ({ color: 'blue' }),
          })
          ctx.addRule({
            name: 'flex-test',
            pattern: /^flex-test$/,
            generate: () => ({ display: 'flex' }),
          })
        },
      })
      directCoral.use(modernVariantsPlugin())
    })

    describe('Container Query Handlers', () => {
      it('should apply @sm container query wrapper', () => {
        const css = directCoral.generate(['@sm:bg-test'])
        expect(css).toContain('@container (min-width:')
        expect(css).toContain('background-color')
      })

      it('should apply @md container query wrapper', () => {
        const css = directCoral.generate(['@md:bg-test'])
        expect(css).toContain('@container (min-width:')
      })

      it('should apply @lg container query wrapper', () => {
        const css = directCoral.generate(['@lg:bg-test'])
        expect(css).toContain('@container (min-width:')
      })

      it('should apply @xl container query wrapper', () => {
        const css = directCoral.generate(['@xl:bg-test'])
        expect(css).toContain('@container (min-width:')
      })

      it('should apply @2xl container query wrapper', () => {
        const css = directCoral.generate(['@2xl:bg-test'])
        expect(css).toContain('@container (min-width:')
      })

      it('should apply unnamed @container wrapper', () => {
        const css = directCoral.generate(['@container:bg-test'])
        expect(css).toContain('@container {')
      })
    })

    describe(':has() Selector Handlers', () => {
      it('should apply has-checked handler', () => {
        const css = directCoral.generate(['has-checked:bg-test'])
        expect(css).toContain(':has(:checked)')
      })

      it('should apply has-focus handler', () => {
        const css = directCoral.generate(['has-focus:bg-test'])
        expect(css).toContain(':has(:focus)')
      })

      it('should apply has-focus-visible handler', () => {
        const css = directCoral.generate(['has-focus-visible:bg-test'])
        expect(css).toContain(':has(:focus-visible)')
      })

      it('should apply has-hover handler', () => {
        const css = directCoral.generate(['has-hover:bg-test'])
        expect(css).toContain(':has(:hover)')
      })

      it('should apply has-active handler', () => {
        const css = directCoral.generate(['has-active:bg-test'])
        expect(css).toContain(':has(:active)')
      })
    })

    describe('@supports Query Handlers', () => {
      it('should apply supports-grid wrapper', () => {
        const css = directCoral.generate(['supports-grid:bg-test'])
        expect(css).toContain('@supports (display: grid)')
      })

      it('should apply supports-flex wrapper', () => {
        const css = directCoral.generate(['supports-flex:bg-test'])
        expect(css).toContain('@supports (display: flex)')
      })

      it('should apply supports-backdrop wrapper', () => {
        const css = directCoral.generate(['supports-backdrop:bg-test'])
        expect(css).toContain('@supports (backdrop-filter: blur(1px))')
      })

      it('should apply supports-scroll-snap wrapper', () => {
        const css = directCoral.generate(['supports-scroll-snap:bg-test'])
        expect(css).toContain('@supports (scroll-snap-type: x mandatory)')
      })

      it('should apply supports-container wrapper', () => {
        const css = directCoral.generate(['supports-container:bg-test'])
        expect(css).toContain('@supports (container-type: inline-size)')
      })

      it('should apply supports-anchor wrapper', () => {
        const css = directCoral.generate(['supports-anchor:bg-test'])
        expect(css).toContain('@supports (anchor-name: --a)')
      })

      it('should apply supports-has wrapper', () => {
        const css = directCoral.generate(['supports-has:bg-test'])
        expect(css).toContain('@supports selector(:has(*))')
      })
    })

    describe('Specificity Control Handlers', () => {
      it('should apply where handler', () => {
        const css = directCoral.generate(['where:bg-test'])
        expect(css).toContain(':where(')
      })

      it('should apply is handler', () => {
        const css = directCoral.generate(['is:bg-test'])
        expect(css).toContain(':is(')
      })

      it('should apply not handler', () => {
        const css = directCoral.generate(['not:bg-test'])
        expect(css).toContain(':not(')
      })
    })

    describe('RTL/LTR Handlers', () => {
      it('should apply rtl handler', () => {
        const css = directCoral.generate(['rtl:bg-test'])
        expect(css).toContain('[dir="rtl"]')
      })

      it('should apply ltr handler', () => {
        const css = directCoral.generate(['ltr:bg-test'])
        expect(css).toContain('[dir="ltr"]')
      })
    })

    describe('Data Attribute Handlers', () => {
      it('should apply data-loading handler', () => {
        const css = directCoral.generate(['data-loading:bg-test'])
        expect(css).toContain('[data-loading]')
      })

      it('should apply data-active handler', () => {
        const css = directCoral.generate(['data-active:bg-test'])
        expect(css).toContain('[data-active]')
      })

      it('should apply data-selected handler', () => {
        const css = directCoral.generate(['data-selected:bg-test'])
        expect(css).toContain('[data-selected]')
      })

      it('should apply data-disabled handler', () => {
        const css = directCoral.generate(['data-disabled:bg-test'])
        expect(css).toContain('[data-disabled]')
      })

      it('should apply data-open handler', () => {
        const css = directCoral.generate(['data-open:bg-test'])
        expect(css).toContain('[data-open]')
      })

      it('should apply data-closed handler', () => {
        const css = directCoral.generate(['data-closed:bg-test'])
        expect(css).toContain('[data-closed]')
      })
    })

    describe('ARIA State Handlers', () => {
      it('should apply aria-busy handler', () => {
        const css = directCoral.generate(['aria-busy:bg-test'])
        expect(css).toContain('[aria-busy="true"]')
      })

      it('should apply aria-checked handler', () => {
        const css = directCoral.generate(['aria-checked:bg-test'])
        expect(css).toContain('[aria-checked="true"]')
      })

      it('should apply aria-disabled handler', () => {
        const css = directCoral.generate(['aria-disabled:bg-test'])
        expect(css).toContain('[aria-disabled="true"]')
      })

      it('should apply aria-expanded handler', () => {
        const css = directCoral.generate(['aria-expanded:bg-test'])
        expect(css).toContain('[aria-expanded="true"]')
      })

      it('should apply aria-hidden handler', () => {
        const css = directCoral.generate(['aria-hidden:bg-test'])
        expect(css).toContain('[aria-hidden="true"]')
      })

      it('should apply aria-pressed handler', () => {
        const css = directCoral.generate(['aria-pressed:bg-test'])
        expect(css).toContain('[aria-pressed="true"]')
      })

      it('should apply aria-readonly handler', () => {
        const css = directCoral.generate(['aria-readonly:bg-test'])
        expect(css).toContain('[aria-readonly="true"]')
      })

      it('should apply aria-required handler', () => {
        const css = directCoral.generate(['aria-required:bg-test'])
        expect(css).toContain('[aria-required="true"]')
      })

      it('should apply aria-selected handler', () => {
        const css = directCoral.generate(['aria-selected:bg-test'])
        expect(css).toContain('[aria-selected="true"]')
      })
    })

    describe('Tailwind 4.1 Modern Variants', () => {
      it('should apply user-valid handler', () => {
        const css = directCoral.generate(['user-valid:bg-test'])
        expect(css).toContain(':user-valid')
      })

      it('should apply user-invalid handler', () => {
        const css = directCoral.generate(['user-invalid:bg-test'])
        expect(css).toContain(':user-invalid')
      })

      it('should apply user-error handler (alias for user-invalid)', () => {
        const css = directCoral.generate(['user-error:bg-test'])
        expect(css).toContain(':user-invalid')
      })

      it('should apply pointer-fine handler', () => {
        const css = directCoral.generate(['pointer-fine:bg-test'])
        expect(css).toContain('@media (pointer: fine)')
      })

      it('should apply pointer-coarse handler', () => {
        const css = directCoral.generate(['pointer-coarse:bg-test'])
        expect(css).toContain('@media (pointer: coarse)')
      })

      it('should apply any-pointer-fine handler', () => {
        const css = directCoral.generate(['any-pointer-fine:bg-test'])
        expect(css).toContain('@media (any-pointer: fine)')
      })

      it('should apply any-pointer-coarse handler', () => {
        const css = directCoral.generate(['any-pointer-coarse:bg-test'])
        expect(css).toContain('@media (any-pointer: coarse)')
      })

      it('should apply inverted-colors handler', () => {
        const css = directCoral.generate(['inverted-colors:bg-test'])
        expect(css).toContain('@media (inverted-colors: inverted)')
      })

      it('should apply noscript handler', () => {
        const css = directCoral.generate(['noscript:bg-test'])
        expect(css).toContain('@supports not (selector(:where(noscript)))')
      })

      it('should apply details-content handler', () => {
        const css = directCoral.generate(['details-content:bg-test'])
        expect(css).toContain('::details-content')
      })

      it('should apply details-marker handler', () => {
        const css = directCoral.generate(['details-marker:bg-test'])
        expect(css).toContain('summary')
        expect(css).toContain('::marker')
      })

      it('should apply details-open handler', () => {
        const css = directCoral.generate(['details-open:bg-test'])
        expect(css).toContain('details[open] > summary')
      })
    })

    describe('Container Queries Plus Variants', () => {
      it('should apply container-style-grid handler', () => {
        const css = directCoral.generate(['container-style-grid:bg-test'])
        expect(css).toContain('@container style(display: grid)')
      })

      it('should apply container-style-flex handler', () => {
        const css = directCoral.generate(['container-style-flex:bg-test'])
        expect(css).toContain('@container style(display: flex)')
      })

      it('should apply container-style-block handler', () => {
        const css = directCoral.generate(['container-style-block:bg-test'])
        expect(css).toContain('@container style(display: block)')
      })

      it('should apply container-style-inline handler', () => {
        const css = directCoral.generate(['container-style-inline:bg-test'])
        expect(css).toContain('@container style(display: inline)')
      })

      it('should apply container-hovered handler', () => {
        const css = directCoral.generate(['container-hovered:bg-test'])
        expect(css).toContain('@container state(:hover)')
      })

      it('should apply container-focused handler', () => {
        const css = directCoral.generate(['container-focused:bg-test'])
        expect(css).toContain('@container state(:focus-within)')
      })

      it('should apply container-active handler', () => {
        const css = directCoral.generate(['container-active:bg-test'])
        expect(css).toContain('@container state(:active)')
      })

      it('should apply container-checked handler', () => {
        const css = directCoral.generate(['container-checked:bg-test'])
        expect(css).toContain('@container state(:checked)')
      })

      it('should apply container-disabled handler', () => {
        const css = directCoral.generate(['container-disabled:bg-test'])
        expect(css).toContain('@container state(:disabled)')
      })

      it('should apply container-portrait handler', () => {
        const css = directCoral.generate(['container-portrait:bg-test'])
        expect(css).toContain('@container (orientation: portrait)')
      })

      it('should apply container-landscape handler', () => {
        const css = directCoral.generate(['container-landscape:bg-test'])
        expect(css).toContain('@container (orientation: landscape)')
      })
    })
  })
})
