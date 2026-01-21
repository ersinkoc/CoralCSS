/**
 * Tests for Popover API Plugin
 *
 * @module tests/unit/plugins/optional/popover-api
 */

import { describe, it, expect, beforeEach } from 'vitest'
import {
  popoverAPIPlugin,
  generatePopoverAnimationsCSS,
  generateAnchorPositioningCSS,
  generatePopoverAPICSS,
} from '../../../../src/plugins/optional/popover-api'
import type { Rule, PluginContext } from '../../../../src/types'

describe('Popover API Plugin', () => {
  let rules: Rule[]
  let ctx: PluginContext

  beforeEach(() => {
    rules = []
    ctx = {
      addRule: (rule: Rule) => {
        rules.push(rule)
      },
      addVariant: () => {},
      addUtility: () => {},
      theme: () => ({}),
    } as unknown as PluginContext
  })

  describe('Plugin Installation', () => {
    it('should install with default options', () => {
      const plugin = popoverAPIPlugin()
      plugin.install(ctx)
      expect(rules.length).toBeGreaterThan(0)
    })

    it('should have correct plugin name', () => {
      const plugin = popoverAPIPlugin()
      expect(plugin.name).toBe('popover-api')
    })

    it('should have version', () => {
      const plugin = popoverAPIPlugin()
      expect(plugin.version).toBe('1.0.0')
    })

    it('should install with all options disabled', () => {
      const plugin = popoverAPIPlugin({
        display: false,
        anchor: false,
        animations: false,
        backdrop: false,
        states: false,
      })
      plugin.install(ctx)
      // Should still have common patterns
      expect(rules.length).toBeGreaterThan(0)
    })
  })

  describe('Popover Display Utilities', () => {
    beforeEach(() => {
      const plugin = popoverAPIPlugin({ display: true })
      plugin.install(ctx)
    })

    it('should generate popover-auto utility', () => {
      const rule = rules.find((r) => r.pattern === 'popover-auto')
      expect(rule).toBeDefined()
      expect(rule?.properties?.['popover']).toBe('auto')
    })

    it('should generate popover-manual utility', () => {
      const rule = rules.find((r) => r.pattern === 'popover-manual')
      expect(rule).toBeDefined()
      expect(rule?.properties?.['popover']).toBe('manual')
    })

    it('should generate popover-hint utility', () => {
      const rule = rules.find((r) => r.pattern === 'popover-hint')
      expect(rule).toBeDefined()
      expect(rule?.properties?.['popover']).toBe('hint')
    })

    it('should generate popover-base utility', () => {
      const rule = rules.find((r) => r.pattern === 'popover-base')
      expect(rule).toBeDefined()
      expect(rule?.properties?.['position']).toBe('fixed')
      expect(rule?.properties?.['border-radius']).toBe('var(--radius)')
    })

    it('should generate popover size variants', () => {
      expect(rules.find((r) => r.pattern === 'popover-sm')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'popover-lg')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'popover-xl')).toBeDefined()
    })

    it('should generate popover width utilities', () => {
      expect(rules.find((r) => r.pattern === 'popover-w-auto')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'popover-w-48')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'popover-w-64')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'popover-w-80')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'popover-w-96')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'popover-w-full')).toBeDefined()
    })

    it('should generate arbitrary popover width', () => {
      const rule = rules.find((r) => r.pattern instanceof RegExp && r.pattern.toString().includes('popover-w'))
      expect(rule).toBeDefined()
    })

    it('should handle arbitrary popover width handler', () => {
      const rule = rules.find((r) => r.pattern instanceof RegExp && r.pattern.toString().includes('popover-w'))
      expect(rule?.handler).toBeDefined()
      const result = rule?.handler?.(['popover-w-[300px]', '300px'] as RegExpExecArray)
      expect(result?.properties?.['width']).toBe('300px')
      // Test with empty match
      const emptyResult = rule?.handler?.(['popover-w-[]', ''] as RegExpExecArray)
      expect(emptyResult).toBeNull()
    })
  })

  describe('Anchor Positioning Utilities', () => {
    beforeEach(() => {
      const plugin = popoverAPIPlugin({ anchor: true })
      plugin.install(ctx)
    })

    it('should generate inset-area position utilities', () => {
      expect(rules.find((r) => r.pattern === 'inset-area-top')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'inset-area-bottom')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'inset-area-left')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'inset-area-right')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'inset-area-center')).toBeDefined()
    })

    it('should generate compound position utilities', () => {
      expect(rules.find((r) => r.pattern === 'inset-area-top-left')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'inset-area-top-right')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'inset-area-bottom-left')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'inset-area-bottom-right')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'inset-area-top-center')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'inset-area-bottom-center')).toBeDefined()
    })

    it('should generate position-try utilities', () => {
      expect(rules.find((r) => r.pattern === 'position-try-flip-block')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'position-try-flip-inline')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'position-try-flip-both')).toBeDefined()
    })

    it('should generate position-try-order utilities', () => {
      expect(rules.find((r) => r.pattern === 'position-try-order-normal')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'position-try-order-most-width')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'position-try-order-most-height')).toBeDefined()
    })

    it('should generate position-visibility utilities', () => {
      expect(rules.find((r) => r.pattern === 'position-visibility-always')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'position-visibility-anchors-visible')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'position-visibility-no-overflow')).toBeDefined()
    })

    it('should generate anchor offset utilities', () => {
      expect(rules.find((r) => r.pattern === 'anchor-offset-0')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'anchor-offset-4')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'anchor-offset-8')).toBeDefined()
    })

    it('should generate arbitrary anchor-name', () => {
      const rule = rules.find((r) => r.pattern instanceof RegExp && r.pattern.toString().includes('anchor-name'))
      expect(rule).toBeDefined()
    })

    it('should generate arbitrary position-anchor', () => {
      const rule = rules.find((r) => r.pattern instanceof RegExp && r.pattern.toString().includes('position-anchor'))
      expect(rule).toBeDefined()
    })

    it('should generate arbitrary inset-area', () => {
      const rule = rules.find((r) => r.pattern instanceof RegExp && r.pattern.toString().includes('inset-area-\\['))
      expect(rule).toBeDefined()
    })

    it('should handle arbitrary anchor-name handler', () => {
      const rule = rules.find((r) => r.pattern instanceof RegExp && r.pattern.toString().includes('anchor-name'))
      expect(rule?.handler).toBeDefined()
      // Test with valid match
      const result = rule?.handler?.(['anchor-name-[my-anchor]', 'my-anchor'] as RegExpExecArray)
      expect(result?.properties?.['anchor-name']).toBe('--my-anchor')
      // Test with empty match
      const emptyResult = rule?.handler?.(['anchor-name-[]', ''] as RegExpExecArray)
      expect(emptyResult).toBeNull()
    })

    it('should handle arbitrary position-anchor handler', () => {
      const rule = rules.find((r) => r.pattern instanceof RegExp && r.pattern.toString().includes('position-anchor'))
      expect(rule?.handler).toBeDefined()
      const result = rule?.handler?.(['position-anchor-[my-anchor]', 'my-anchor'] as RegExpExecArray)
      expect(result?.properties?.['position-anchor']).toBe('--my-anchor')
      // Test with empty match
      const emptyResult = rule?.handler?.(['position-anchor-[]', ''] as RegExpExecArray)
      expect(emptyResult).toBeNull()
    })

    it('should handle arbitrary inset-area handler', () => {
      const rule = rules.find((r) => r.pattern instanceof RegExp && r.pattern.toString().includes('inset-area-\\['))
      expect(rule?.handler).toBeDefined()
      const result = rule?.handler?.(['inset-area-[top_left]', 'top_left'] as RegExpExecArray)
      expect(result?.properties?.['inset-area']).toBe('top left')
      // Test with empty match
      const emptyResult = rule?.handler?.(['inset-area-[]', ''] as RegExpExecArray)
      expect(emptyResult).toBeNull()
    })

    it('should handle arbitrary anchor-offset handler', () => {
      const rule = rules.find((r) => r.pattern instanceof RegExp && r.pattern.toString().includes('anchor-offset'))
      expect(rule?.handler).toBeDefined()
      const result = rule?.handler?.(['anchor-offset-[0.5rem]', '0.5rem'] as RegExpExecArray)
      expect(result?.properties?.['margin']).toBe('0.5rem')
      // Test with empty match
      const emptyResult = rule?.handler?.(['anchor-offset-[]', ''] as RegExpExecArray)
      expect(emptyResult).toBeNull()
    })
  })

  describe('Popover Animation Utilities', () => {
    beforeEach(() => {
      const plugin = popoverAPIPlugin({ animations: true })
      plugin.install(ctx)
    })

    it('should generate popover-animate-fade utility', () => {
      const rule = rules.find((r) => r.pattern === 'popover-animate-fade')
      expect(rule).toBeDefined()
      expect(rule?.properties?.['opacity']).toBe('0')
      expect(rule?.properties?.['transition']).toContain('allow-discrete')
    })

    it('should generate popover-animate-scale utility', () => {
      const rule = rules.find((r) => r.pattern === 'popover-animate-scale')
      expect(rule).toBeDefined()
      expect(rule?.properties?.['transform']).toBe('scale(0.95)')
    })

    it('should generate slide animation utilities', () => {
      expect(rules.find((r) => r.pattern === 'popover-animate-slide-up')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'popover-animate-slide-down')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'popover-animate-slide-left')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'popover-animate-slide-right')).toBeDefined()
    })

    it('should generate popover-open-visible utility', () => {
      const rule = rules.find((r) => r.pattern === 'popover-open-visible')
      expect(rule).toBeDefined()
      expect(rule?.properties?.['opacity']).toBe('1')
    })

    it('should generate popover-starting-hidden utility', () => {
      const rule = rules.find((r) => r.pattern === 'popover-starting-hidden')
      expect(rule).toBeDefined()
      expect(rule?.properties?.['opacity']).toBe('0')
    })
  })

  describe('Backdrop Utilities', () => {
    beforeEach(() => {
      const plugin = popoverAPIPlugin({ backdrop: true })
      plugin.install(ctx)
    })

    it('should generate popover-backdrop-none utility', () => {
      const rule = rules.find((r) => r.pattern === 'popover-backdrop-none')
      expect(rule).toBeDefined()
      expect(rule?.properties?.['background']).toBe('transparent')
    })

    it('should generate popover-backdrop-dim utility', () => {
      const rule = rules.find((r) => r.pattern === 'popover-backdrop-dim')
      expect(rule).toBeDefined()
    })

    it('should generate popover-backdrop-dark utility', () => {
      const rule = rules.find((r) => r.pattern === 'popover-backdrop-dark')
      expect(rule).toBeDefined()
    })

    it('should generate popover-backdrop-blur utility', () => {
      const rule = rules.find((r) => r.pattern === 'popover-backdrop-blur')
      expect(rule).toBeDefined()
      expect(rule?.properties?.['backdrop-filter']).toContain('blur')
    })

    it('should generate popover-backdrop-blur-heavy utility', () => {
      const rule = rules.find((r) => r.pattern === 'popover-backdrop-blur-heavy')
      expect(rule).toBeDefined()
    })

    it('should generate backdrop animation utilities', () => {
      expect(rules.find((r) => r.pattern === 'popover-backdrop-animate')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'popover-backdrop-open')).toBeDefined()
    })

    it('should generate arbitrary backdrop', () => {
      const rule = rules.find((r) => r.pattern instanceof RegExp && r.pattern.toString().includes('popover-backdrop-\\['))
      expect(rule).toBeDefined()
    })

    it('should handle arbitrary backdrop handler', () => {
      const rule = rules.find((r) => r.pattern instanceof RegExp && r.pattern.toString().includes('popover-backdrop-\\['))
      expect(rule?.handler).toBeDefined()
      const result = rule?.handler?.(['popover-backdrop-[rgb(0_0_0_/_0.5)]', 'rgb(0_0_0_/_0.5)'] as RegExpExecArray)
      expect(result?.properties?.['background']).toBe('rgb(0 0 0 / 0.5)')
      // Test with empty match
      const emptyResult = rule?.handler?.(['popover-backdrop-[]', ''] as RegExpExecArray)
      expect(emptyResult).toBeNull()
    })
  })

  describe('State Utilities', () => {
    beforeEach(() => {
      const plugin = popoverAPIPlugin({ states: true })
      plugin.install(ctx)
    })

    it('should generate overlay utilities', () => {
      expect(rules.find((r) => r.pattern === 'overlay-auto')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'overlay-none')).toBeDefined()
    })

    it('should generate popover target utilities', () => {
      expect(rules.find((r) => r.pattern === 'popover-target-toggle')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'popover-target-show')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'popover-target-hide')).toBeDefined()
    })

    it('should generate popover-focus-trap utility', () => {
      const rule = rules.find((r) => r.pattern === 'popover-focus-trap')
      expect(rule).toBeDefined()
    })

    it('should generate popover-dismissible utility', () => {
      const rule = rules.find((r) => r.pattern === 'popover-dismissible')
      expect(rule).toBeDefined()
    })
  })

  describe('Common Popover Patterns', () => {
    beforeEach(() => {
      const plugin = popoverAPIPlugin()
      plugin.install(ctx)
    })

    it('should generate popover-tooltip utility', () => {
      const rule = rules.find((r) => r.pattern === 'popover-tooltip')
      expect(rule).toBeDefined()
      expect(rule?.properties?.['white-space']).toBe('nowrap')
    })

    it('should generate popover-dropdown utility', () => {
      const rule = rules.find((r) => r.pattern === 'popover-dropdown')
      expect(rule).toBeDefined()
      expect(rule?.properties?.['min-width']).toBe('12rem')
    })

    it('should generate popover-dialog utility', () => {
      const rule = rules.find((r) => r.pattern === 'popover-dialog')
      expect(rule).toBeDefined()
      expect(rule?.properties?.['min-width']).toBe('20rem')
      expect(rule?.properties?.['max-width']).toBe('32rem')
    })

    it('should generate popover-sheet utilities', () => {
      expect(rules.find((r) => r.pattern === 'popover-sheet-bottom')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'popover-sheet-top')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'popover-sheet-left')).toBeDefined()
      expect(rules.find((r) => r.pattern === 'popover-sheet-right')).toBeDefined()
    })

    it('should have correct sheet-bottom properties', () => {
      const rule = rules.find((r) => r.pattern === 'popover-sheet-bottom')
      expect(rule?.properties?.['bottom']).toBe('0')
      expect(rule?.properties?.['left']).toBe('0')
      expect(rule?.properties?.['right']).toBe('0')
    })

    it('should have correct sheet-right properties', () => {
      const rule = rules.find((r) => r.pattern === 'popover-sheet-right')
      expect(rule?.properties?.['right']).toBe('0')
      expect(rule?.properties?.['top']).toBe('0')
      expect(rule?.properties?.['bottom']).toBe('0')
    })
  })

  describe('Custom Options', () => {
    it('should accept custom animation duration', () => {
      const plugin = popoverAPIPlugin({ animationDuration: '300ms' })
      plugin.install(ctx)

      const fadeRule = rules.find((r) => r.pattern === 'popover-animate-fade')
      expect(fadeRule?.properties?.['transition']).toContain('300ms')
    })
  })

  describe('CSS Generation Functions', () => {
    it('should generate popover animations CSS', () => {
      const css = generatePopoverAnimationsCSS()
      expect(css).toContain('[popover]')
      expect(css).toContain(':popover-open')
      expect(css).toContain('@starting-style')
      expect(css).toContain('::backdrop')
      expect(css).toContain('prefers-reduced-motion')
    })

    it('should generate animations with custom duration', () => {
      const css = generatePopoverAnimationsCSS('500ms')
      expect(css).toContain('500ms')
    })

    it('should generate anchor positioning CSS', () => {
      const css = generateAnchorPositioningCSS()
      expect(css).toContain('.anchor-top')
      expect(css).toContain('.anchor-bottom')
      expect(css).toContain('.anchor-left')
      expect(css).toContain('.anchor-right')
      expect(css).toContain('@position-try')
      expect(css).toContain('position-anchor')
      expect(css).toContain('inset-area')
    })

    it('should generate complete popover API CSS', () => {
      const css = generatePopoverAPICSS()
      expect(css).toContain('[popover]')
      expect(css).toContain('.anchor-top')
      expect(css).toContain('@starting-style')
      expect(css).toContain('@position-try')
    })

    it('should include sheet animations in CSS', () => {
      const css = generatePopoverAnimationsCSS()
      expect(css).toContain('.popover-sheet-bottom')
      expect(css).toContain('.popover-sheet-top')
      expect(css).toContain('.popover-sheet-left')
      expect(css).toContain('.popover-sheet-right')
    })
  })
})
