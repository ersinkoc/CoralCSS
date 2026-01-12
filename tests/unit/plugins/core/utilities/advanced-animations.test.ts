/**
 * Advanced Animations Utilities Plugin Tests
 *
 * Tests for advanced animation utilities including physics-based animations,
 * scroll-driven animations, gesture animations, and special effects.
 * @module tests/unit/plugins/core/utilities/advanced-animations
 */

import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { advancedAnimationsPlugin } from '../../../../../src/plugins/core/utilities/advanced-animations'

describe('Advanced Animations Utilities Plugin', () => {
  describe('Physics-Based Animations', () => {
    it('should generate animate-spring-sm', () => {
      const coral = createCoral({
        plugins: [advancedAnimationsPlugin()]
      })

      const css = coral.generate(['animate-spring-sm'])
      expect(css).toContain('animation: spring-sm 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)')
      expect(css).toContain('@keyframes spring-sm')
    })

    it('should generate animate-spring-md', () => {
      const coral = createCoral({
        plugins: [advancedAnimationsPlugin()]
      })

      const css = coral.generate(['animate-spring-md'])
      expect(css).toContain('animation: spring-md 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)')
      expect(css).toContain('@keyframes spring-md')
    })

    it('should generate animate-spring-lg', () => {
      const coral = createCoral({
        plugins: [advancedAnimationsPlugin()]
      })

      const css = coral.generate(['animate-spring-lg'])
      expect(css).toContain('animation: spring-lg 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)')
      expect(css).toContain('@keyframes spring-lg')
    })

    it('should generate animate-bounce-in', () => {
      const coral = createCoral({
        plugins: [advancedAnimationsPlugin()]
      })

      const css = coral.generate(['animate-bounce-in'])
      expect(css).toContain('animation: bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)')
      expect(css).toContain('@keyframes bounce-in')
    })

    it('should generate animate-bounce-out', () => {
      const coral = createCoral({
        plugins: [advancedAnimationsPlugin()]
      })

      const css = coral.generate(['animate-bounce-out'])
      expect(css).toContain('animation: bounce-out 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards')
      expect(css).toContain('@keyframes bounce-out')
    })

    it('should generate animate-elastic', () => {
      const coral = createCoral({
        plugins: [advancedAnimationsPlugin()]
      })

      const css = coral.generate(['animate-elastic'])
      expect(css).toContain('animation: elastic 1s ease-out')
      expect(css).toContain('@keyframes elastic')
    })

    it('should generate animate-elastic-in', () => {
      const coral = createCoral({
        plugins: [advancedAnimationsPlugin()]
      })

      const css = coral.generate(['animate-elastic-in'])
      expect(css).toContain('animation: elastic-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)')
      expect(css).toContain('@keyframes elastic-in')
    })
  })

  describe('Scroll-Driven Animations', () => {
    it('should generate animate-scroll-fade-in', () => {
      const coral = createCoral({
        plugins: [advancedAnimationsPlugin()]
      })

      const css = coral.generate(['animate-scroll-fade-in'])
      expect(css).toContain('animation-timeline: view()')
      expect(css).toContain('animation: scroll-fade-in linear both')
      expect(css).toContain('@keyframes scroll-fade-in')
    })

    it('should generate animate-scroll-scale', () => {
      const coral = createCoral({
        plugins: [advancedAnimationsPlugin()]
      })

      const css = coral.generate(['animate-scroll-scale'])
      expect(css).toContain('animation-timeline: view()')
      expect(css).toContain('animation-range: entry 0% entry 100%')
      expect(css).toContain('@keyframes scroll-scale')
    })

    it('should generate animate-scroll-rotate', () => {
      const coral = createCoral({
        plugins: [advancedAnimationsPlugin()]
      })

      const css = coral.generate(['animate-scroll-rotate'])
      expect(css).toContain('animation-timeline: view()')
      expect(css).toContain('@keyframes scroll-rotate')
    })

    it('should generate animate-scroll-slide-up', () => {
      const coral = createCoral({
        plugins: [advancedAnimationsPlugin()]
      })

      const css = coral.generate(['animate-scroll-slide-up'])
      expect(css).toContain('animation-timeline: view()')
      expect(css).toContain('@keyframes scroll-slide-up')
    })

    it('should generate animate-scroll-blur-in', () => {
      const coral = createCoral({
        plugins: [advancedAnimationsPlugin()]
      })

      const css = coral.generate(['animate-scroll-blur-in'])
      expect(css).toContain('animation-timeline: view()')
      expect(css).toContain('@keyframes scroll-blur-in')
    })
  })

  describe('Gesture Animations', () => {
    it('should generate animate-swipe-left', () => {
      const coral = createCoral({
        plugins: [advancedAnimationsPlugin()]
      })

      const css = coral.generate(['animate-swipe-left'])
      expect(css).toContain('animation: swipe-left 0.3s ease-out forwards')
      expect(css).toContain('@keyframes swipe-left')
    })

    it('should generate animate-swipe-right', () => {
      const coral = createCoral({
        plugins: [advancedAnimationsPlugin()]
      })

      const css = coral.generate(['animate-swipe-right'])
      expect(css).toContain('animation: swipe-right 0.3s ease-out forwards')
      expect(css).toContain('@keyframes swipe-right')
    })

    it('should generate animate-swipe-up', () => {
      const coral = createCoral({
        plugins: [advancedAnimationsPlugin()]
      })

      const css = coral.generate(['animate-swipe-up'])
      expect(css).toContain('animation: swipe-up 0.3s ease-out forwards')
      expect(css).toContain('@keyframes swipe-up')
    })

    it('should generate animate-swipe-down', () => {
      const coral = createCoral({
        plugins: [advancedAnimationsPlugin()]
      })

      const css = coral.generate(['animate-swipe-down'])
      expect(css).toContain('animation: swipe-down 0.3s ease-out forwards')
      expect(css).toContain('@keyframes swipe-down')
    })

    it('should generate animate-shake', () => {
      const coral = createCoral({
        plugins: [advancedAnimationsPlugin()]
      })

      const css = coral.generate(['animate-shake'])
      expect(css).toContain('animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both')
      expect(css).toContain('@keyframes shake')
    })

    it('should generate animate-wiggle', () => {
      const coral = createCoral({
        plugins: [advancedAnimationsPlugin()]
      })

      const css = coral.generate(['animate-wiggle'])
      expect(css).toContain('animation: wiggle 0.5s ease-in-out')
      expect(css).toContain('@keyframes wiggle')
    })

    it('should generate animate-pulse-glow', () => {
      const coral = createCoral({
        plugins: [advancedAnimationsPlugin()]
      })

      const css = coral.generate(['animate-pulse-glow'])
      expect(css).toContain('animation: pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite')
      expect(css).toContain('@keyframes pulse-glow')
    })
  })

  describe('View Transition Animations', () => {
    it('should generate view-transition-fade', () => {
      const coral = createCoral({
        plugins: [advancedAnimationsPlugin()]
      })

      const css = coral.generate(['view-transition-fade'])
      expect(css).toContain('view-transition-name: fade')
    })

    it('should generate view-transition-slide', () => {
      const coral = createCoral({
        plugins: [advancedAnimationsPlugin()]
      })

      const css = coral.generate(['view-transition-slide'])
      expect(css).toContain('view-transition-name: slide')
    })

    it('should generate view-transition-scale', () => {
      const coral = createCoral({
        plugins: [advancedAnimationsPlugin()]
      })

      const css = coral.generate(['view-transition-scale'])
      expect(css).toContain('view-transition-name: scale')
    })
  })

  describe('Special Effects', () => {
    it('should generate animate-glitch', () => {
      const coral = createCoral({
        plugins: [advancedAnimationsPlugin()]
      })

      const css = coral.generate(['animate-glitch'])
      expect(css).toContain('animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite')
      expect(css).toContain('@keyframes glitch')
    })

    it('should generate animate-typewriter', () => {
      const coral = createCoral({
        plugins: [advancedAnimationsPlugin()]
      })

      const css = coral.generate(['animate-typewriter'])
      expect(css).toContain('overflow: hidden')
      expect(css).toContain('white-space: nowrap')
      expect(css).toContain('animation: typewriter 2s steps(40, end)')
      expect(css).toContain('@keyframes typewriter')
    })

    it('should generate animate-reveal', () => {
      const coral = createCoral({
        plugins: [advancedAnimationsPlugin()]
      })

      const css = coral.generate(['animate-reveal'])
      expect(css).toContain('animation: reveal 0.6s ease-out forwards')
      expect(css).toContain('@keyframes reveal')
    })

    it('should generate animate-morph', () => {
      const coral = createCoral({
        plugins: [advancedAnimationsPlugin()]
      })

      const css = coral.generate(['animate-morph'])
      expect(css).toContain('animation: morph 0.5s ease-in-out')
      expect(css).toContain('@keyframes morph')
    })
  })

  describe('Combined Animations', () => {
    it('should generate multiple advanced animations together', () => {
      const coral = createCoral({
        plugins: [advancedAnimationsPlugin()]
      })

      const css = coral.generate([
        'animate-spring-md',
        'animate-pulse-glow'
      ])
      expect(css).toContain('animation:')
      expect(css).toContain('@keyframes')
    })
  })
})
