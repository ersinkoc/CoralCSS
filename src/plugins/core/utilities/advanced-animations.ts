/**
 * Advanced Animation Utilities Plugin
 *
 * Physics-based animations, scroll-driven animations, view transitions,
 * and gesture animations that go beyond standard CSS animations.
 *
 * @module plugins/core/utilities/advanced-animations
 */

import type { Plugin } from '../../../types'

/**
 * Advanced Animation Utilities Plugin for CoralCSS
 *
 * Features:
 * - Physics-based animations (spring, bounce, elastic)
 * - Scroll-driven animations (using animation-timeline)
 * - View transition API animations
 * - Gesture animations (swipe, shake)
 * - Magnetic hover effects
 *
 * @example
 * ```html
 * <div class="animate-spring-md">Bouncy entrance</div>
 * <div class="animate-scroll-fade-in">Fades in as you scroll</div>
 * <button class="animate-shake-on-error">Error feedback</button>
 * ```
 */
export const advancedAnimationsPlugin = (): Plugin => ({
  name: 'advanced-animations',
  version: '1.0.0',
  install(api) {
    // ========================================
    // PHYSICS-BASED ANIMATIONS
    // ========================================

    // Spring animations - using custom bezier curves for spring physics
    api.addRule({
      pattern: 'animate-spring-sm',
      generate: () => ({
        properties: {
          'animation': 'spring-sm 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        },
        atRules: [
          '@keyframes spring-sm',
          '0% { transform: scale(0.8); opacity: 0; }',
          '50% { transform: scale(1.05); }',
          '100% { transform: scale(1); opacity: 1; }'
        ]
      })
    })

    api.addRule({
      pattern: 'animate-spring-md',
      generate: () => ({
        properties: {
          'animation': 'spring-md 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
        },
        atRules: [
          '@keyframes spring-md',
          '0% { transform: scale(0.7); opacity: 0; }',
          '60% { transform: scale(1.1); }',
          '100% { transform: scale(1); opacity: 1; }'
        ]
      })
    })

    api.addRule({
      pattern: 'animate-spring-lg',
      generate: () => ({
        properties: {
          'animation': 'spring-lg 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        },
        atRules: [
          '@keyframes spring-lg',
          '0% { transform: scale(0.5); opacity: 0; }',
          '70% { transform: scale(1.2); }',
          '100% { transform: scale(1); opacity: 1; }'
        ]
      })
    })

    // Bounce animations
    api.addRule({
      pattern: 'animate-bounce-in',
      generate: () => ({
        properties: {
          'animation': 'bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        },
        atRules: [
          '@keyframes bounce-in',
          '0% { transform: scale(0); opacity: 0; }',
          '50% { transform: scale(1.2); }',
          '100% { transform: scale(1); opacity: 1; }'
        ]
      })
    })

    api.addRule({
      pattern: 'animate-bounce-out',
      generate: () => ({
        properties: {
          'animation': 'bounce-out 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards'
        },
        atRules: [
          '@keyframes bounce-out',
          '0% { transform: scale(1); opacity: 1; }',
          '50% { transform: scale(1.1); }',
          '100% { transform: scale(0); opacity: 0; }'
        ]
      })
    })

    // Elastic animations
    api.addRule({
      pattern: 'animate-elastic',
      generate: () => ({
        properties: {
          'animation': 'elastic 1s ease-out'
        },
        atRules: [
          '@keyframes elastic',
          '0% { transform: scale(0); }',
          '55% { transform: scale(1.1); }',
          '70% { transform: scale(0.95); }',
          '85% { transform: scale(1.02); }',
          '100% { transform: scale(1); }'
        ]
      })
    })

    api.addRule({
      pattern: 'animate-elastic-in',
      generate: () => ({
        properties: {
          'animation': 'elastic-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        },
        atRules: [
          '@keyframes elastic-in',
          '0% { transform: scale(0); opacity: 0; }',
          '60% { transform: scale(1.15); }',
          '80% { transform: scale(0.95); opacity: 1; }',
          '100% { transform: scale(1); }'
        ]
      })
    })

    // ========================================
    // SCROLL-DRIVEN ANIMATIONS
    // ========================================

    // Scroll fade-in
    api.addRule({
      pattern: 'animate-scroll-fade-in',
      generate: () => ({
        properties: {
          'animation': 'scroll-fade-in linear both',
          'animation-timeline': 'view()'
        },
        atRules: [
          '@keyframes scroll-fade-in',
          '0% { opacity: 0; transform: translateY(50px); }',
          '100% { opacity: 1; transform: translateY(0); }'
        ]
      })
    })

    // Scroll scale
    api.addRule({
      pattern: 'animate-scroll-scale',
      generate: () => ({
        properties: {
          'animation': 'scroll-scale linear both',
          'animation-timeline': 'view()',
          'animation-range': 'entry 0% entry 100%'
        },
        atRules: [
          '@keyframes scroll-scale',
          '0% { transform: scale(0.5); opacity: 0; }',
          '100% { transform: scale(1); opacity: 1; }'
        ]
      })
    })

    // Scroll rotate
    api.addRule({
      pattern: 'animate-scroll-rotate',
      generate: () => ({
        properties: {
          'animation': 'scroll-rotate linear both',
          'animation-timeline': 'view()'
        },
        atRules: [
          '@keyframes scroll-rotate',
          '0% { transform: rotate(0deg); }',
          '100% { transform: rotate(360deg); }'
        ]
      })
    })

    // Scroll slide-up
    api.addRule({
      pattern: 'animate-scroll-slide-up',
      generate: () => ({
        properties: {
          'animation': 'scroll-slide-up linear both',
          'animation-timeline': 'view()'
        },
        atRules: [
          '@keyframes scroll-slide-up',
          '0% { transform: translateY(100px); opacity: 0; }',
          '100% { transform: translateY(0); opacity: 1; }'
        ]
      })
    })

    // Scroll blur-in
    api.addRule({
      pattern: 'animate-scroll-blur-in',
      generate: () => ({
        properties: {
          'animation': 'scroll-blur-in linear both',
          'animation-timeline': 'view()'
        },
        atRules: [
          '@keyframes scroll-blur-in',
          '0% { filter: blur(10px); opacity: 0; }',
          '100% { filter: blur(0); opacity: 1; }'
        ]
      })
    })

    // ========================================
    // GESTURE ANIMATIONS
    // ========================================

    // Swipe left
    api.addRule({
      pattern: 'animate-swipe-left',
      generate: () => ({
        properties: {
          'animation': 'swipe-left 0.3s ease-out forwards'
        },
        atRules: [
          '@keyframes swipe-left',
          '0% { transform: translateX(0); opacity: 1; }',
          '100% { transform: translateX(-100%); opacity: 0; }'
        ]
      })
    })

    // Swipe right
    api.addRule({
      pattern: 'animate-swipe-right',
      generate: () => ({
        properties: {
          'animation': 'swipe-right 0.3s ease-out forwards'
        },
        atRules: [
          '@keyframes swipe-right',
          '0% { transform: translateX(0); opacity: 1; }',
          '100% { transform: translateX(100%); opacity: 0; }'
        ]
      })
    })

    // Swipe up
    api.addRule({
      pattern: 'animate-swipe-up',
      generate: () => ({
        properties: {
          'animation': 'swipe-up 0.3s ease-out forwards'
        },
        atRules: [
          '@keyframes swipe-up',
          '0% { transform: translateY(0); opacity: 1; }',
          '100% { transform: translateY(-100%); opacity: 0; }'
        ]
      })
    })

    // Swipe down
    api.addRule({
      pattern: 'animate-swipe-down',
      generate: () => ({
        properties: {
          'animation': 'swipe-down 0.3s ease-out forwards'
        },
        atRules: [
          '@keyframes swipe-down',
          '0% { transform: translateY(0); opacity: 1; }',
          '100% { transform: translateY(100%); opacity: 0; }'
        ]
      })
    })

    // Shake animation (for errors)
    api.addRule({
      pattern: 'animate-shake',
      generate: () => ({
        properties: {
          'animation': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both'
        },
        atRules: [
          '@keyframes shake',
          '10%, 90% { transform: translateX(-2px); }',
          '20%, 80% { transform: translateX(4px); }',
          '30%, 50%, 70% { transform: translateX(-8px); }',
          '40%, 60% { transform: translateX(8px); }'
        ]
      })
    })

    // Wiggle animation
    api.addRule({
      pattern: 'animate-wiggle',
      generate: () => ({
        properties: {
          'animation': 'wiggle 0.5s ease-in-out'
        },
        atRules: [
          '@keyframes wiggle',
          '0%, 100% { transform: rotate(0deg); }',
          '25% { transform: rotate(-5deg); }',
          '75% { transform: rotate(5deg); }'
        ]
      })
    })

    // Pulse-glow (enhanced pulse)
    api.addRule({
      pattern: 'animate-pulse-glow',
      generate: () => ({
        properties: {
          'animation': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        },
        atRules: [
          '@keyframes pulse-glow',
          '0%, 100% { opacity: 1; filter: drop-shadow(0 0 0px currentColor); }',
          '50% { opacity: 0.5; filter: drop-shadow(0 0 20px currentColor); }'
        ]
      })
    })

    // ========================================
    // MAGNETIC HOVER EFFECTS
    // ========================================

    // Magnetic pull with transition
    api.addRule({
      pattern: 'hover:animate-magnetic',
      generate: () => ({
        properties: {
          'transition': 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }
      })
    })

    // Magnetic pull with rotate
    api.addRule({
      pattern: 'hover:animate-magnetic-rotate',
      generate: () => ({
        properties: {
          'transition': 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }
      })
    })

    // ========================================
    // VIEW TRANSITION ANIMATIONS
    // ========================================

    api.addRule({
      pattern: 'view-transition-fade',
      generate: () => ({
        properties: {
          'view-transition-name': 'fade'
        }
      })
    })

    api.addRule({
      pattern: 'view-transition-slide',
      generate: () => ({
        properties: {
          'view-transition-name': 'slide'
        }
      })
    })

    api.addRule({
      pattern: 'view-transition-scale',
      generate: () => ({
        properties: {
          'view-transition-name': 'scale'
        }
      })
    })

    // ========================================
    // SPECIAL EFFECTS
    // ========================================

    // Glitch effect
    api.addRule({
      pattern: 'animate-glitch',
      generate: () => ({
        properties: {
          'animation': 'glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite'
        },
        atRules: [
          '@keyframes glitch',
          '0% { transform: translate(0); }',
          '20% { transform: translate(-2px, 2px); }',
          '40% { transform: translate(-2px, -2px); }',
          '60% { transform: translate(2px, 2px); }',
          '80% { transform: translate(2px, -2px); }',
          '100% { transform: translate(0); }'
        ]
      })
    })

    // Typewriter effect
    api.addRule({
      pattern: 'animate-typewriter',
      generate: () => ({
        properties: {
          'overflow': 'hidden',
          'white-space': 'nowrap',
          'animation': 'typewriter 2s steps(40, end)'
        },
        atRules: [
          '@keyframes typewriter',
          'from { width: 0; }',
          'to { width: 100%; }'
        ]
      })
    })

    // Reveal effect
    api.addRule({
      pattern: 'animate-reveal',
      generate: () => ({
        properties: {
          'animation': 'reveal 0.6s ease-out forwards'
        },
        atRules: [
          '@keyframes reveal',
          '0% { clip-path: inset(0 100% 0 0); }',
          '100% { clip-path: inset(0 0 0 0); }'
        ]
      })
    })

    // Morphing effect
    api.addRule({
      pattern: 'animate-morph',
      generate: () => ({
        properties: {
          'animation': 'morph 0.5s ease-in-out'
        },
        atRules: [
          '@keyframes morph',
          '0% { border-radius: 0%; }',
          '50% { border-radius: 50%; }',
          '100% { border-radius: 0%; }'
        ]
      })
    })
  }
})

export default advancedAnimationsPlugin
