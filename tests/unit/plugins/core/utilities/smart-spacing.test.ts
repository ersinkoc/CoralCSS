/**
 * Smart Spacing Utilities Plugin Tests
 *
 * Tests for smart spacing utilities including fluid padding, margins,
 * gaps, container-aware spacing, and content-aware spacing.
 * @module tests/unit/plugins/core/utilities/smart-spacing
 */

import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { smartSpacingPlugin } from '../../../../../src/plugins/core/utilities/smart-spacing'

describe('Smart Spacing Utilities Plugin', () => {
  describe('Smart Padding', () => {
    it('should generate p-smart', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['p-smart'])
      expect(css).toContain('padding: clamp(1rem, 2.5vw, 1.5rem)')
    })

    it('should generate p-smart-sm', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['p-smart-sm'])
      expect(css).toContain('padding: clamp(0.5rem, 1.5vw, 1rem)')
    })

    it('should generate p-smart-md', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['p-smart-md'])
      expect(css).toContain('padding: clamp(1rem, 2.5vw, 1.5rem)')
    })

    it('should generate p-smart-lg', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['p-smart-lg'])
      expect(css).toContain('padding: clamp(1.5rem, 4vw, 2.5rem)')
    })

    it('should generate p-smart-xl', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['p-smart-xl'])
      expect(css).toContain('padding: clamp(2rem, 5vw, 4rem)')
    })

    it('should generate px-smart', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['px-smart'])
      expect(css).toContain('padding-left: clamp(1rem, 2.5vw, 1.5rem)')
      expect(css).toContain('padding-right: clamp(1rem, 2.5vw, 1.5rem)')
    })

    it('should generate py-smart', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['py-smart'])
      expect(css).toContain('padding-top: clamp(1rem, 2.5vw, 1.5rem)')
      expect(css).toContain('padding-bottom: clamp(1rem, 2.5vw, 1.5rem)')
    })
  })

  describe('Smart Margins', () => {
    it('should generate m-smart', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['m-smart'])
      expect(css).toContain('margin: clamp(0.5rem, 2vw, 1rem)')
    })

    it('should generate m-smart-sm', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['m-smart-sm'])
      expect(css).toContain('margin: clamp(0.25rem, 1vw, 0.5rem)')
    })

    it('should generate m-smart-md', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['m-smart-md'])
      expect(css).toContain('margin: clamp(0.5rem, 2vw, 1rem)')
    })

    it('should generate m-smart-lg', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['m-smart-lg'])
      expect(css).toContain('margin: clamp(1rem, 3vw, 2rem)')
    })
  })

  describe('Smart Gaps', () => {
    it('should generate gap-smart', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['gap-smart'])
      expect(css).toContain('gap: clamp(0.5rem, 1.5vw, 1rem)')
    })

    it('should generate gap-smart-sm', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['gap-smart-sm'])
      expect(css).toContain('gap: clamp(0.25rem, 1vw, 0.5rem)')
    })

    it('should generate gap-smart-md', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['gap-smart-md'])
      expect(css).toContain('gap: clamp(0.5rem, 1.5vw, 1rem)')
    })

    it('should generate gap-smart-lg', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['gap-smart-lg'])
      expect(css).toContain('gap: clamp(1rem, 2.5vw, 1.5rem)')
    })

    it('should generate gap-x-smart', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['gap-x-smart'])
      expect(css).toContain('column-gap: clamp(0.5rem, 1.5vw, 1rem)')
    })

    it('should generate gap-y-smart', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['gap-y-smart'])
      expect(css).toContain('row-gap: clamp(0.5rem, 1.5vw, 1rem)')
    })
  })

  describe('Smart Space Between (for flex children)', () => {
    it('should generate space-smart', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['space-smart'])
      expect(css).toContain('--smart-spacing: clamp(0.5rem, 1.5vw, 1rem)')
    })

    it('should generate space-x-smart', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['space-x-smart'])
      expect(css).toContain('--smart-spacing-x: clamp(0.5rem, 1.5vw, 1rem)')
    })

    it('should generate space-y-smart', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['space-y-smart'])
      expect(css).toContain('--smart-spacing-y: clamp(0.5rem, 1.5vw, 1rem)')
    })
  })

  describe('Container-Aware Spacing', () => {
    it('should generate p-container', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['p-container'])
      expect(css).toContain('padding: clamp(1rem, 5cqi, 3rem)')
    })

    it('should generate p-container-sm', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['p-container-sm'])
      expect(css).toContain('padding: clamp(0.5rem, 3cqi, 1.5rem)')
    })

    it('should generate p-container-lg', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['p-container-lg'])
      expect(css).toContain('padding: clamp(1.5rem, 7cqi, 4rem)')
    })

    it('should generate gap-container', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['gap-container'])
      expect(css).toContain('gap: clamp(0.5rem, 3cqi, 1.5rem)')
    })
  })

  describe('Content-Aware Spacing', () => {
    it('should generate p-prose', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['p-prose'])
      expect(css).toContain('padding: clamp(1em, 2.5em, 2em)')
    })

    it('should generate p-prose-sm', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['p-prose-sm'])
      expect(css).toContain('padding: clamp(0.75em, 1.5em, 1.25em)')
    })

    it('should generate p-prose-lg', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['p-prose-lg'])
      expect(css).toContain('padding: clamp(1.25em, 3em, 2.5em)')
    })

    it('should generate gap-leading', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['gap-leading'])
      expect(css).toContain('gap: calc(1em * 0.5)')
    })

    it('should generate gap-leading-lg', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['gap-leading-lg'])
      expect(css).toContain('gap: calc(1em * 1)')
    })
  })

  describe('Responsive Spacing with Min/Max', () => {
    it('should generate p-min-fluid', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['p-min-fluid'])
      expect(css).toContain('padding: max(1rem, 2vw)')
    })

    it('should generate p-max-fluid', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['p-max-fluid'])
      expect(css).toContain('padding: min(2rem, 5vw)')
    })

    it('should generate gap-bounded', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['gap-bounded'])
      expect(css).toContain('gap: clamp(0.5rem, 2vw, 2rem)')
    })

    it('should generate gap-bounded-sm', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['gap-bounded-sm'])
      expect(css).toContain('gap: clamp(0.25rem, 1.5vw, 1rem)')
    })

    it('should generate gap-bounded-lg', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['gap-bounded-lg'])
      expect(css).toContain('gap: clamp(1rem, 3vw, 3rem)')
    })
  })

  describe('Safe Spacing', () => {
    it('should generate p-safe', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['p-safe'])
      expect(css).toContain('padding: clamp(0.5rem, 2vw, 1rem)')
    })

    it('should generate m-safe', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate(['m-safe'])
      expect(css).toContain('margin: clamp(0.25rem, 1.5vw, 0.75rem)')
    })
  })

  describe('Combined Utilities', () => {
    it('should generate multiple smart spacing utilities together', () => {
      const coral = createCoral({
        plugins: [smartSpacingPlugin()]
      })

      const css = coral.generate([
        'p-smart',
        'gap-smart',
        'm-smart'
      ])
      expect(css).toContain('padding:')
      expect(css).toContain('gap:')
      expect(css).toContain('margin:')
    })
  })
})
