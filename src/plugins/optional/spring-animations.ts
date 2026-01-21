/**
 * Spring Animations Plugin
 *
 * Physics-based spring animations for natural-feeling UI interactions.
 * Inspired by Framer Motion, react-spring, and Apple's spring animations.
 *
 * Features:
 * - CSS spring timing functions with configurable stiffness/damping
 * - Pre-built spring presets (bouncy, gentle, stiff, etc.)
 * - Gesture-based animations (drag, swipe, pinch placeholders)
 * - View transition animations
 * - Motion-reduced alternatives
 *
 * @module plugins/optional/spring-animations
 */

import type { Plugin, Rule, PluginContext } from '../../types'

/**
 * Spring configuration
 */
export interface SpringConfig {
  /** Spring stiffness (higher = faster) */
  stiffness: number
  /** Damping ratio (higher = less bouncy) */
  damping: number
  /** Mass (higher = more momentum) */
  mass: number
}

/**
 * Spring Animations Plugin Options
 */
export interface SpringAnimationsPluginOptions {
  /** Include spring timing presets */
  presets?: boolean
  /** Include gesture animations */
  gestures?: boolean
  /** Include view transitions */
  viewTransitions?: boolean
  /** Include motion preferences */
  motionPreferences?: boolean
  /** Custom spring configurations */
  customSprings?: Record<string, SpringConfig>
}

/**
 * Convert spring parameters to CSS cubic-bezier approximation
 * This is an approximation since CSS doesn't natively support spring physics
 */
function springToCubicBezier(config: SpringConfig): string {
  const { stiffness, damping, mass } = config

  // Calculate damping ratio
  const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass))

  // Approximate cubic-bezier based on damping ratio
  // These are empirically derived approximations
  if (dampingRatio >= 1) {
    // Critically damped or overdamped - no overshoot
    return 'cubic-bezier(0.32, 0, 0.67, 0)'
  } else if (dampingRatio >= 0.7) {
    // Slightly underdamped - minimal overshoot
    return 'cubic-bezier(0.34, 1.56, 0.64, 1)'
  } else if (dampingRatio >= 0.4) {
    // Underdamped - noticeable bounce
    return 'cubic-bezier(0.22, 1.8, 0.36, 1)'
  } else {
    // Highly underdamped - significant bounce
    return 'cubic-bezier(0.12, 2.2, 0.22, 1)'
  }
}

/**
 * Pre-defined spring configurations
 */
const springPresets: Record<string, SpringConfig> = {
  // Default - balanced spring
  default: { stiffness: 100, damping: 15, mass: 1 },

  // Gentle - soft, slow movement
  gentle: { stiffness: 50, damping: 20, mass: 1 },

  // Bouncy - playful with overshoot
  bouncy: { stiffness: 180, damping: 12, mass: 1 },

  // Stiff - quick with minimal bounce
  stiff: { stiffness: 300, damping: 30, mass: 1 },

  // Wobbly - extra bouncy
  wobbly: { stiffness: 150, damping: 8, mass: 1 },

  // Snappy - fast and responsive
  snappy: { stiffness: 400, damping: 35, mass: 0.8 },

  // Molasses - slow and smooth
  molasses: { stiffness: 40, damping: 25, mass: 1.5 },

  // Energetic - high energy bounce
  energetic: { stiffness: 200, damping: 10, mass: 0.6 },

  // Lazy - slow start, gradual stop
  lazy: { stiffness: 60, damping: 30, mass: 2 },

  // Quick - fast with slight bounce
  quick: { stiffness: 250, damping: 25, mass: 0.8 },

  // iOS-like spring (Apple's default)
  ios: { stiffness: 170, damping: 20, mass: 1 },

  // Android-like spring (Material Design)
  android: { stiffness: 150, damping: 25, mass: 1 },
}

/**
 * Spring Animations Plugin
 */
export function springAnimationsPlugin(options: SpringAnimationsPluginOptions = {}): Plugin {
  const {
    presets = true,
    gestures = true,
    viewTransitions = true,
    motionPreferences = true,
    customSprings = {},
  } = options

  const allSprings = { ...springPresets, ...customSprings }

  return {
    name: 'spring-animations',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // ========================================
      // Spring Timing Functions
      // ========================================

      if (presets) {
        // Generate spring timing utilities for each preset
        for (const [name, config] of Object.entries(allSprings)) {
          const bezier = springToCubicBezier(config)

          // Timing function utility
          rules.push({
            pattern: `spring-${name}`,
            properties: {
              '--spring-timing': bezier,
              'transition-timing-function': bezier,
              'animation-timing-function': bezier,
            },
          })

          // Spring transition utilities
          rules.push({
            pattern: `transition-spring-${name}`,
            properties: {
              'transition-timing-function': bezier,
            },
          })

          // Spring animation utilities
          rules.push({
            pattern: `animate-spring-${name}`,
            properties: {
              'animation-timing-function': bezier,
            },
          })
        }

        // Spring duration presets (tuned for spring feel)
        const springDurations: Record<string, string> = {
          'fast': '200ms',
          'normal': '400ms',
          'slow': '600ms',
          'slower': '800ms',
          'slowest': '1000ms',
        }

        for (const [name, duration] of Object.entries(springDurations)) {
          rules.push({
            pattern: `spring-duration-${name}`,
            properties: {
              '--spring-duration': duration,
              'transition-duration': duration,
              'animation-duration': duration,
            },
          })
        }

        // Arbitrary spring duration
        rules.push({
          pattern: /^spring-duration-\[(.+)\]$/,
          handler: (match) => {
            const v = match[1]
            if (!v) return null
            return {
              properties: {
                '--spring-duration': v,
                'transition-duration': v,
                'animation-duration': v,
              },
            }
          },
        })
      }

      // ========================================
      // Spring Animations (Pre-built)
      // ========================================

      // Spring scale animations
      rules.push({
        pattern: 'spring-scale-in',
        properties: {
          animation: 'springScaleIn var(--spring-duration, 400ms) var(--spring-timing, cubic-bezier(0.22, 1.8, 0.36, 1))',
        },
      })

      rules.push({
        pattern: 'spring-scale-out',
        properties: {
          animation: 'springScaleOut var(--spring-duration, 400ms) var(--spring-timing, cubic-bezier(0.22, 1.8, 0.36, 1))',
        },
      })

      // Spring slide animations
      rules.push({
        pattern: 'spring-slide-up',
        properties: {
          animation: 'springSlideUp var(--spring-duration, 400ms) var(--spring-timing, cubic-bezier(0.22, 1.8, 0.36, 1))',
        },
      })

      rules.push({
        pattern: 'spring-slide-down',
        properties: {
          animation: 'springSlideDown var(--spring-duration, 400ms) var(--spring-timing, cubic-bezier(0.22, 1.8, 0.36, 1))',
        },
      })

      rules.push({
        pattern: 'spring-slide-left',
        properties: {
          animation: 'springSlideLeft var(--spring-duration, 400ms) var(--spring-timing, cubic-bezier(0.22, 1.8, 0.36, 1))',
        },
      })

      rules.push({
        pattern: 'spring-slide-right',
        properties: {
          animation: 'springSlideRight var(--spring-duration, 400ms) var(--spring-timing, cubic-bezier(0.22, 1.8, 0.36, 1))',
        },
      })

      // Spring pop (scale up and back)
      rules.push({
        pattern: 'spring-pop',
        properties: {
          animation: 'springPop var(--spring-duration, 300ms) var(--spring-timing, cubic-bezier(0.22, 1.8, 0.36, 1))',
        },
      })

      // Spring bounce
      rules.push({
        pattern: 'spring-bounce',
        properties: {
          animation: 'springBounce var(--spring-duration, 500ms) var(--spring-timing, cubic-bezier(0.12, 2.2, 0.22, 1))',
        },
      })

      // Spring wiggle
      rules.push({
        pattern: 'spring-wiggle',
        properties: {
          animation: 'springWiggle var(--spring-duration, 400ms) var(--spring-timing, cubic-bezier(0.22, 1.8, 0.36, 1))',
        },
      })

      // Spring shake (horizontal)
      rules.push({
        pattern: 'spring-shake',
        properties: {
          animation: 'springShake var(--spring-duration, 500ms) var(--spring-timing, cubic-bezier(0.22, 1.8, 0.36, 1))',
        },
      })

      // ========================================
      // Gesture Animations
      // ========================================

      if (gestures) {
        // Draggable state utilities
        rules.push({
          pattern: 'draggable',
          properties: {
            cursor: 'grab',
            'user-select': 'none',
            'touch-action': 'none',
          },
        })

        rules.push({
          pattern: 'dragging',
          properties: {
            cursor: 'grabbing',
            'user-select': 'none',
          },
        })

        // Swipeable
        rules.push({
          pattern: 'swipeable',
          properties: {
            'touch-action': 'pan-x',
            'overscroll-behavior-x': 'contain',
          },
        })

        rules.push({
          pattern: 'swipeable-y',
          properties: {
            'touch-action': 'pan-y',
            'overscroll-behavior-y': 'contain',
          },
        })

        // Pinchable
        rules.push({
          pattern: 'pinchable',
          properties: {
            'touch-action': 'pinch-zoom',
          },
        })

        // Press animations
        rules.push({
          pattern: 'press-scale',
          properties: {
            transition: 'transform var(--spring-duration, 150ms) var(--spring-timing, cubic-bezier(0.22, 1.8, 0.36, 1))',
          },
        })

        // Hover lift effect
        rules.push({
          pattern: 'hover-lift',
          properties: {
            transition: 'transform var(--spring-duration, 300ms) var(--spring-timing, cubic-bezier(0.22, 1.8, 0.36, 1)), box-shadow var(--spring-duration, 300ms) ease',
          },
        })

        // Tilt on hover (3D)
        rules.push({
          pattern: 'hover-tilt',
          properties: {
            'transform-style': 'preserve-3d',
            transition: 'transform var(--spring-duration, 300ms) var(--spring-timing, cubic-bezier(0.22, 1.8, 0.36, 1))',
          },
        })

        // Magnetic effect base (for JS integration)
        rules.push({
          pattern: 'magnetic',
          properties: {
            '--magnetic-strength': '0.3',
            '--magnetic-x': '0',
            '--magnetic-y': '0',
            transform: 'translate(calc(var(--magnetic-x) * var(--magnetic-strength)), calc(var(--magnetic-y) * var(--magnetic-strength)))',
            transition: 'transform var(--spring-duration, 200ms) var(--spring-timing, cubic-bezier(0.22, 1.8, 0.36, 1))',
          },
        })

        // Rubber band effect (for scroll boundaries)
        rules.push({
          pattern: 'rubber-band',
          properties: {
            'overscroll-behavior': 'contain',
            'scroll-snap-type': 'y mandatory',
          },
        })

        // Inertia scrolling
        rules.push({
          pattern: 'inertia-scroll',
          properties: {
            'scroll-behavior': 'smooth',
            '-webkit-overflow-scrolling': 'touch',
          },
        })
      }

      // ========================================
      // View Transitions
      // ========================================

      if (viewTransitions) {
        // View transition name utilities
        rules.push({
          pattern: 'view-transition-none',
          properties: {
            'view-transition-name': 'none',
          },
        })

        rules.push({
          pattern: /^view-transition-\[(.+)\]$/,
          handler: (match) => {
            const name = match[1]
            if (!name) return null
            return {
              properties: {
                'view-transition-name': name,
              },
            }
          },
        })

        // Common view transition names
        const viewTransitionNames = ['header', 'main', 'sidebar', 'footer', 'card', 'image', 'title', 'content', 'hero', 'nav']
        for (const name of viewTransitionNames) {
          rules.push({
            pattern: `view-transition-${name}`,
            properties: {
              'view-transition-name': name,
            },
          })
        }

        // View transition classes (old/new states)
        rules.push({
          pattern: 'vt-fade',
          properties: {
            'view-transition-class': 'fade',
          },
        })

        rules.push({
          pattern: 'vt-slide',
          properties: {
            'view-transition-class': 'slide',
          },
        })

        rules.push({
          pattern: 'vt-scale',
          properties: {
            'view-transition-class': 'scale',
          },
        })

        // Cross-fade with spring
        rules.push({
          pattern: 'vt-spring',
          properties: {
            'view-transition-class': 'spring',
          },
        })
      }

      // ========================================
      // Motion Preferences
      // ========================================

      if (motionPreferences) {
        // Reduced motion utilities
        rules.push({
          pattern: 'motion-safe',
          properties: {},
          variants: ['@media (prefers-reduced-motion: no-preference)'],
        })

        rules.push({
          pattern: 'motion-reduce',
          properties: {},
          variants: ['@media (prefers-reduced-motion: reduce)'],
        })

        // Disable all animations for reduced motion
        rules.push({
          pattern: 'motion-reduce-all',
          properties: {
            animation: 'none',
            transition: 'none',
          },
        })

        // Safer animations for reduced motion
        rules.push({
          pattern: 'motion-reduce-safe',
          properties: {
            'animation-duration': '0.01ms',
            'animation-iteration-count': '1',
            'transition-duration': '0.01ms',
          },
        })

        // Motion intensity levels
        rules.push({
          pattern: 'motion-subtle',
          properties: {
            '--motion-scale': '0.5',
            '--spring-duration': '200ms',
          },
        })

        rules.push({
          pattern: 'motion-moderate',
          properties: {
            '--motion-scale': '1',
            '--spring-duration': '400ms',
          },
        })

        rules.push({
          pattern: 'motion-expressive',
          properties: {
            '--motion-scale': '1.5',
            '--spring-duration': '600ms',
          },
        })
      }

      // ========================================
      // Interactive States with Springs
      // ========================================

      // Hover scale with spring
      rules.push({
        pattern: 'hover-spring-scale',
        properties: {
          transition: 'transform var(--spring-duration, 300ms) var(--spring-timing, cubic-bezier(0.22, 1.8, 0.36, 1))',
        },
      })

      // Active press with spring
      rules.push({
        pattern: 'active-spring-press',
        properties: {
          transition: 'transform var(--spring-duration, 150ms) var(--spring-timing, cubic-bezier(0.22, 1.8, 0.36, 1))',
        },
      })

      // Focus ring with spring
      rules.push({
        pattern: 'focus-spring-ring',
        properties: {
          transition: 'box-shadow var(--spring-duration, 200ms) var(--spring-timing, cubic-bezier(0.22, 1.8, 0.36, 1)), outline var(--spring-duration, 200ms) var(--spring-timing, cubic-bezier(0.22, 1.8, 0.36, 1))',
        },
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

/**
 * Get spring keyframes CSS
 */
export function getSpringKeyframes(): string {
  return `/* Spring Animation Keyframes */
@keyframes springScaleIn {
  0% { opacity: 0; transform: scale(0.8); }
  60% { opacity: 1; transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes springScaleOut {
  0% { opacity: 1; transform: scale(1); }
  40% { transform: scale(1.05); }
  100% { opacity: 0; transform: scale(0.8); }
}

@keyframes springSlideUp {
  0% { opacity: 0; transform: translateY(20px); }
  60% { transform: translateY(-5px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes springSlideDown {
  0% { opacity: 0; transform: translateY(-20px); }
  60% { transform: translateY(5px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes springSlideLeft {
  0% { opacity: 0; transform: translateX(20px); }
  60% { transform: translateX(-5px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes springSlideRight {
  0% { opacity: 0; transform: translateX(-20px); }
  60% { transform: translateX(5px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes springPop {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}

@keyframes springBounce {
  0%, 100% { transform: translateY(0); }
  25% { transform: translateY(-15px); }
  50% { transform: translateY(-5px); }
  75% { transform: translateY(-10px); }
}

@keyframes springWiggle {
  0%, 100% { transform: rotate(0deg); }
  20% { transform: rotate(-5deg); }
  40% { transform: rotate(5deg); }
  60% { transform: rotate(-3deg); }
  80% { transform: rotate(3deg); }
}

@keyframes springShake {
  0%, 100% { transform: translateX(0); }
  15% { transform: translateX(-8px); }
  30% { transform: translateX(8px); }
  45% { transform: translateX(-5px); }
  60% { transform: translateX(5px); }
  75% { transform: translateX(-2px); }
  90% { transform: translateX(2px); }
}
`
}

/**
 * Get view transition CSS
 */
export function getViewTransitionCSS(): string {
  return `/* View Transition Animations */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.22, 1.8, 0.36, 1);
}

/* Fade transition */
::view-transition-old(fade) {
  animation: fadeOut 300ms ease-out;
}

::view-transition-new(fade) {
  animation: fadeIn 300ms ease-out;
}

/* Slide transition */
::view-transition-old(slide) {
  animation: slideOutLeft 400ms cubic-bezier(0.22, 1.8, 0.36, 1);
}

::view-transition-new(slide) {
  animation: slideInRight 400ms cubic-bezier(0.22, 1.8, 0.36, 1);
}

/* Scale transition */
::view-transition-old(scale) {
  animation: springScaleOut 400ms cubic-bezier(0.22, 1.8, 0.36, 1);
}

::view-transition-new(scale) {
  animation: springScaleIn 400ms cubic-bezier(0.22, 1.8, 0.36, 1);
}

/* Spring transition */
::view-transition-old(spring) {
  animation: springScaleOut 500ms cubic-bezier(0.12, 2.2, 0.22, 1);
}

::view-transition-new(spring) {
  animation: springScaleIn 500ms cubic-bezier(0.12, 2.2, 0.22, 1);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation-duration: 0.01ms !important;
  }
}
`
}

/**
 * Generate complete spring animations CSS
 */
export function generateSpringAnimationsCSS(): string {
  return [
    getSpringKeyframes(),
    getViewTransitionCSS(),
  ].join('\n\n')
}

/**
 * Export spring presets for custom configuration
 */
export { springPresets, springToCubicBezier }

export default springAnimationsPlugin
