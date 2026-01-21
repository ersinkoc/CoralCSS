/**
 * Tests for Spring Animations Plugin
 *
 * @module tests/unit/plugins/optional/spring-animations
 */

import { describe, it, expect, beforeEach } from 'vitest'
import {
  springAnimationsPlugin,
  springPresets,
  springToCubicBezier,
  getSpringKeyframes,
  getViewTransitionCSS,
  generateSpringAnimationsCSS,
} from '../../../../src/plugins/optional/spring-animations'
import type { Rule, PluginContext } from '../../../../src/types'

describe('Spring Animations Plugin', () => {
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
      const plugin = springAnimationsPlugin()
      plugin.install(ctx)
      expect(rules.length).toBeGreaterThan(0)
    })

    it('should have correct plugin name', () => {
      const plugin = springAnimationsPlugin()
      expect(plugin.name).toBe('spring-animations')
    })

    it('should have version', () => {
      const plugin = springAnimationsPlugin()
      expect(plugin.version).toBe('1.0.0')
    })

    it('should install with all options disabled', () => {
      const plugin = springAnimationsPlugin({
        presets: false,
        gestures: false,
        viewTransitions: false,
        motionPreferences: false,
      })
      plugin.install(ctx)
      expect(rules.length).toBeGreaterThan(0)
    })
  })

  describe('Spring Timing Presets', () => {
    beforeEach(() => {
      const plugin = springAnimationsPlugin({ presets: true })
      plugin.install(ctx)
    })

    it('should generate spring-default utility', () => {
      const rule = rules.find((r) => r.pattern === 'spring-default')
      expect(rule).toBeDefined()
      expect(rule?.properties).toHaveProperty('--spring-timing')
    })

    it('should generate spring-bouncy utility', () => {
      const rule = rules.find((r) => r.pattern === 'spring-bouncy')
      expect(rule).toBeDefined()
    })

    it('should generate spring-gentle utility', () => {
      const rule = rules.find((r) => r.pattern === 'spring-gentle')
      expect(rule).toBeDefined()
    })

    it('should generate spring-stiff utility', () => {
      const rule = rules.find((r) => r.pattern === 'spring-stiff')
      expect(rule).toBeDefined()
    })

    it('should generate spring-wobbly utility', () => {
      const rule = rules.find((r) => r.pattern === 'spring-wobbly')
      expect(rule).toBeDefined()
    })

    it('should generate spring-snappy utility', () => {
      const rule = rules.find((r) => r.pattern === 'spring-snappy')
      expect(rule).toBeDefined()
    })

    it('should generate spring-ios utility', () => {
      const rule = rules.find((r) => r.pattern === 'spring-ios')
      expect(rule).toBeDefined()
    })

    it('should generate spring-android utility', () => {
      const rule = rules.find((r) => r.pattern === 'spring-android')
      expect(rule).toBeDefined()
    })

    it('should generate transition-spring utilities', () => {
      const rule = rules.find((r) => r.pattern === 'transition-spring-default')
      expect(rule).toBeDefined()
      expect(rule?.properties).toHaveProperty('transition-timing-function')
    })

    it('should generate animate-spring utilities', () => {
      const rule = rules.find((r) => r.pattern === 'animate-spring-default')
      expect(rule).toBeDefined()
      expect(rule?.properties).toHaveProperty('animation-timing-function')
    })
  })

  describe('Spring Duration Utilities', () => {
    beforeEach(() => {
      const plugin = springAnimationsPlugin({ presets: true })
      plugin.install(ctx)
    })

    it('should generate spring-duration-fast', () => {
      const rule = rules.find((r) => r.pattern === 'spring-duration-fast')
      expect(rule).toBeDefined()
      expect(rule?.properties?.['--spring-duration']).toBe('200ms')
    })

    it('should generate spring-duration-normal', () => {
      const rule = rules.find((r) => r.pattern === 'spring-duration-normal')
      expect(rule).toBeDefined()
      expect(rule?.properties?.['--spring-duration']).toBe('400ms')
    })

    it('should generate spring-duration-slow', () => {
      const rule = rules.find((r) => r.pattern === 'spring-duration-slow')
      expect(rule).toBeDefined()
      expect(rule?.properties?.['--spring-duration']).toBe('600ms')
    })

    it('should generate arbitrary spring duration', () => {
      const rule = rules.find((r) => r.pattern instanceof RegExp && r.pattern.toString().includes('spring-duration'))
      expect(rule).toBeDefined()
    })
  })

  describe('Spring Animations', () => {
    beforeEach(() => {
      const plugin = springAnimationsPlugin()
      plugin.install(ctx)
    })

    it('should generate spring-scale-in', () => {
      const rule = rules.find((r) => r.pattern === 'spring-scale-in')
      expect(rule).toBeDefined()
      expect(rule?.properties?.animation).toContain('springScaleIn')
    })

    it('should generate spring-scale-out', () => {
      const rule = rules.find((r) => r.pattern === 'spring-scale-out')
      expect(rule).toBeDefined()
    })

    it('should generate spring-slide-up', () => {
      const rule = rules.find((r) => r.pattern === 'spring-slide-up')
      expect(rule).toBeDefined()
    })

    it('should generate spring-slide-down', () => {
      const rule = rules.find((r) => r.pattern === 'spring-slide-down')
      expect(rule).toBeDefined()
    })

    it('should generate spring-slide-left', () => {
      const rule = rules.find((r) => r.pattern === 'spring-slide-left')
      expect(rule).toBeDefined()
    })

    it('should generate spring-slide-right', () => {
      const rule = rules.find((r) => r.pattern === 'spring-slide-right')
      expect(rule).toBeDefined()
    })

    it('should generate spring-pop', () => {
      const rule = rules.find((r) => r.pattern === 'spring-pop')
      expect(rule).toBeDefined()
    })

    it('should generate spring-bounce', () => {
      const rule = rules.find((r) => r.pattern === 'spring-bounce')
      expect(rule).toBeDefined()
    })

    it('should generate spring-wiggle', () => {
      const rule = rules.find((r) => r.pattern === 'spring-wiggle')
      expect(rule).toBeDefined()
    })

    it('should generate spring-shake', () => {
      const rule = rules.find((r) => r.pattern === 'spring-shake')
      expect(rule).toBeDefined()
    })
  })

  describe('Gesture Animations', () => {
    beforeEach(() => {
      const plugin = springAnimationsPlugin({ gestures: true })
      plugin.install(ctx)
    })

    it('should generate draggable utility', () => {
      const rule = rules.find((r) => r.pattern === 'draggable')
      expect(rule).toBeDefined()
      expect(rule?.properties?.cursor).toBe('grab')
    })

    it('should generate dragging utility', () => {
      const rule = rules.find((r) => r.pattern === 'dragging')
      expect(rule).toBeDefined()
      expect(rule?.properties?.cursor).toBe('grabbing')
    })

    it('should generate swipeable utility', () => {
      const rule = rules.find((r) => r.pattern === 'swipeable')
      expect(rule).toBeDefined()
      expect(rule?.properties?.['touch-action']).toBe('pan-x')
    })

    it('should generate swipeable-y utility', () => {
      const rule = rules.find((r) => r.pattern === 'swipeable-y')
      expect(rule).toBeDefined()
      expect(rule?.properties?.['touch-action']).toBe('pan-y')
    })

    it('should generate pinchable utility', () => {
      const rule = rules.find((r) => r.pattern === 'pinchable')
      expect(rule).toBeDefined()
    })

    it('should generate press-scale utility', () => {
      const rule = rules.find((r) => r.pattern === 'press-scale')
      expect(rule).toBeDefined()
    })

    it('should generate hover-lift utility', () => {
      const rule = rules.find((r) => r.pattern === 'hover-lift')
      expect(rule).toBeDefined()
    })

    it('should generate hover-tilt utility', () => {
      const rule = rules.find((r) => r.pattern === 'hover-tilt')
      expect(rule).toBeDefined()
    })

    it('should generate magnetic utility', () => {
      const rule = rules.find((r) => r.pattern === 'magnetic')
      expect(rule).toBeDefined()
      expect(rule?.properties?.['--magnetic-strength']).toBeDefined()
    })

    it('should generate rubber-band utility', () => {
      const rule = rules.find((r) => r.pattern === 'rubber-band')
      expect(rule).toBeDefined()
    })

    it('should generate inertia-scroll utility', () => {
      const rule = rules.find((r) => r.pattern === 'inertia-scroll')
      expect(rule).toBeDefined()
    })
  })

  describe('View Transitions', () => {
    beforeEach(() => {
      const plugin = springAnimationsPlugin({ viewTransitions: true })
      plugin.install(ctx)
    })

    it('should generate view-transition-none', () => {
      const rule = rules.find((r) => r.pattern === 'view-transition-none')
      expect(rule).toBeDefined()
      expect(rule?.properties?.['view-transition-name']).toBe('none')
    })

    it('should generate view-transition-header', () => {
      const rule = rules.find((r) => r.pattern === 'view-transition-header')
      expect(rule).toBeDefined()
    })

    it('should generate view-transition-main', () => {
      const rule = rules.find((r) => r.pattern === 'view-transition-main')
      expect(rule).toBeDefined()
    })

    it('should generate arbitrary view transition', () => {
      const rule = rules.find((r) => r.pattern instanceof RegExp && r.pattern.toString().includes('view-transition'))
      expect(rule).toBeDefined()
    })

    it('should generate vt-fade', () => {
      const rule = rules.find((r) => r.pattern === 'vt-fade')
      expect(rule).toBeDefined()
    })

    it('should generate vt-slide', () => {
      const rule = rules.find((r) => r.pattern === 'vt-slide')
      expect(rule).toBeDefined()
    })

    it('should generate vt-scale', () => {
      const rule = rules.find((r) => r.pattern === 'vt-scale')
      expect(rule).toBeDefined()
    })

    it('should generate vt-spring', () => {
      const rule = rules.find((r) => r.pattern === 'vt-spring')
      expect(rule).toBeDefined()
    })
  })

  describe('Motion Preferences', () => {
    beforeEach(() => {
      const plugin = springAnimationsPlugin({ motionPreferences: true })
      plugin.install(ctx)
    })

    it('should generate motion-safe utility', () => {
      const rule = rules.find((r) => r.pattern === 'motion-safe')
      expect(rule).toBeDefined()
    })

    it('should generate motion-reduce utility', () => {
      const rule = rules.find((r) => r.pattern === 'motion-reduce')
      expect(rule).toBeDefined()
    })

    it('should generate motion-reduce-all', () => {
      const rule = rules.find((r) => r.pattern === 'motion-reduce-all')
      expect(rule).toBeDefined()
      expect(rule?.properties?.animation).toBe('none')
    })

    it('should generate motion-reduce-safe', () => {
      const rule = rules.find((r) => r.pattern === 'motion-reduce-safe')
      expect(rule).toBeDefined()
    })

    it('should generate motion-subtle', () => {
      const rule = rules.find((r) => r.pattern === 'motion-subtle')
      expect(rule).toBeDefined()
    })

    it('should generate motion-moderate', () => {
      const rule = rules.find((r) => r.pattern === 'motion-moderate')
      expect(rule).toBeDefined()
    })

    it('should generate motion-expressive', () => {
      const rule = rules.find((r) => r.pattern === 'motion-expressive')
      expect(rule).toBeDefined()
    })
  })

  describe('Interactive State Utilities', () => {
    beforeEach(() => {
      const plugin = springAnimationsPlugin()
      plugin.install(ctx)
    })

    it('should generate hover-spring-scale', () => {
      const rule = rules.find((r) => r.pattern === 'hover-spring-scale')
      expect(rule).toBeDefined()
    })

    it('should generate active-spring-press', () => {
      const rule = rules.find((r) => r.pattern === 'active-spring-press')
      expect(rule).toBeDefined()
    })

    it('should generate focus-spring-ring', () => {
      const rule = rules.find((r) => r.pattern === 'focus-spring-ring')
      expect(rule).toBeDefined()
    })
  })

  describe('Custom Springs', () => {
    it('should accept custom spring configurations', () => {
      const plugin = springAnimationsPlugin({
        customSprings: {
          custom: { stiffness: 200, damping: 15, mass: 1 },
        },
      })
      plugin.install(ctx)

      const rule = rules.find((r) => r.pattern === 'spring-custom')
      expect(rule).toBeDefined()
    })
  })

  describe('Spring Presets Export', () => {
    it('should export default preset', () => {
      expect(springPresets.default).toBeDefined()
      expect(springPresets.default.stiffness).toBe(100)
    })

    it('should export gentle preset', () => {
      expect(springPresets.gentle).toBeDefined()
    })

    it('should export bouncy preset', () => {
      expect(springPresets.bouncy).toBeDefined()
    })

    it('should export stiff preset', () => {
      expect(springPresets.stiff).toBeDefined()
    })

    it('should export ios preset', () => {
      expect(springPresets.ios).toBeDefined()
    })

    it('should export android preset', () => {
      expect(springPresets.android).toBeDefined()
    })
  })

  describe('springToCubicBezier', () => {
    it('should convert critically damped spring', () => {
      const bezier = springToCubicBezier({ stiffness: 100, damping: 20, mass: 1 })
      expect(bezier).toContain('cubic-bezier')
    })

    it('should convert underdamped spring', () => {
      const bezier = springToCubicBezier({ stiffness: 200, damping: 10, mass: 1 })
      expect(bezier).toContain('cubic-bezier')
    })

    it('should convert highly underdamped spring', () => {
      const bezier = springToCubicBezier({ stiffness: 200, damping: 5, mass: 1 })
      expect(bezier).toContain('cubic-bezier')
    })

    it('should convert overdamped spring', () => {
      const bezier = springToCubicBezier({ stiffness: 50, damping: 30, mass: 1 })
      expect(bezier).toContain('cubic-bezier')
    })
  })

  describe('CSS Generation Functions', () => {
    it('should generate spring keyframes', () => {
      const css = getSpringKeyframes()
      expect(css).toContain('@keyframes springScaleIn')
      expect(css).toContain('@keyframes springScaleOut')
      expect(css).toContain('@keyframes springSlideUp')
      expect(css).toContain('@keyframes springPop')
      expect(css).toContain('@keyframes springBounce')
    })

    it('should generate view transition CSS', () => {
      const css = getViewTransitionCSS()
      expect(css).toContain('::view-transition-old')
      expect(css).toContain('::view-transition-new')
      expect(css).toContain('prefers-reduced-motion')
    })

    it('should generate complete spring animations CSS', () => {
      const css = generateSpringAnimationsCSS()
      expect(css).toContain('@keyframes')
      expect(css).toContain('::view-transition')
    })
  })
})
