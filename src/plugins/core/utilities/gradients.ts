/**
 * Gradient Utilities Plugin
 *
 * Comprehensive gradient utilities for beautiful backgrounds and text effects.
 *
 * @module plugins/core/utilities/gradients
 */

import type { Plugin } from '../../../types'

/**
 * Gradient direction mappings
 */
const gradientDirections: Record<string, string> = {
  't': 'to top',
  'tr': 'to top right',
  'r': 'to right',
  'br': 'to bottom right',
  'b': 'to bottom',
  'bl': 'to bottom left',
  'l': 'to left',
  'tl': 'to top left',
}

/**
 * Gradient color stops
 */
const colorStops = [
  'primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info',
  'coral', 'slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange',
  'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky',
  'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
]

/**
 * Gradient plugin for CoralCSS
 */
export const gradientsPlugin = (): Plugin => ({
  name: 'gradients',
  version: '1.0.0',
  install(api) {
    // Background gradients - linear
    for (const [abbr, direction] of Object.entries(gradientDirections)) {
      // Two-color gradients
      for (const color of colorStops) {
        const fromColor = color
        const toColors = colorStops.filter(c => c !== color)

        for (const toColor of toColors.slice(0, 3)) { // Limit to 3 combinations
          api.addRule({
            name: `bg-gradient-${abbr}-${fromColor}-to-${toColor}`,
            pattern: `bg-gradient-${abbr}-${fromColor}-to-${toColor}`,
            generate: () => ({
              properties: {
                'background': `linear-gradient(${direction}, var(--colors-${fromColor}), var(--colors-${toColor}))`,
              },
            }),
          })
        }
      }

      // Three-color gradients (with middle stop)
      for (const color of ['primary', 'secondary', 'accent', 'coral']) {
        api.addRule({
          name: `bg-gradient-${abbr}-${color}-3`,
          pattern: `bg-gradient-${abbr}-${color}-3`,
          generate: () => ({
            properties: {
              'background': `linear-gradient(${direction}, var(--colors-${color}-400), var(--colors-${color}-500), var(--colors-${color}-600))`,
            },
          }),
        })
      }
    }

    // Radial gradients
    for (const color of colorStops.slice(0, 8)) {
      api.addRule({
        name: `bg-gradient-radial-${color}`,
        pattern: `bg-gradient-radial-${color}`,
        generate: () => ({
          properties: {
            'background': `radial-gradient(circle, var(--colors-${color}-500), transparent)`,
          },
        }),
      })

      api.addRule({
        name: `bg-gradient-radial-${color}-fade`,
        pattern: `bg-gradient-radial-${color}-fade`,
        generate: () => ({
          properties: {
            'background': `radial-gradient(circle at center, var(--colors-${color}), transparent 70%)`,
          },
        }),
      })
    }

    // Conic gradients
    for (const color of ['primary', 'coral', 'rainbow']) {
      if (color === 'rainbow') {
        api.addRule({
          name: 'bg-gradient-conic-rainbow',
          pattern: 'bg-gradient-conic-rainbow',
          generate: () => ({
            properties: {
              'background': 'conic-gradient(from 0deg, #ef4444, #f97316, #f59e0b, #84cc16, #10b981, #06b6d4, #3b82f6, #8b5cf6, #d946ef, #f43f5e, #ef4444)',
            },
          }),
        })
      } else {
        api.addRule({
          name: `bg-gradient-conic-${color}`,
          pattern: `bg-gradient-conic-${color}`,
          generate: () => ({
            properties: {
              'background': `conic-gradient(from 0deg, var(--colors-${color}-400), var(--colors-${color}-500), var(--colors-${color}-600), var(--colors-${color}-400))`,
            },
          }),
        })
      }
    }

    // Text gradients
    for (const [abbr, direction] of Object.entries(gradientDirections)) {
      for (const color of ['primary', 'coral', 'rainbow']) {
        if (color === 'rainbow') {
          api.addRule({
            name: `text-gradient-${abbr}-rainbow`,
            pattern: `text-gradient-${abbr}-rainbow`,
            generate: () => ({
              properties: {
                'background': 'linear-gradient(to right, #ef4444, #f97316, #f59e0b, #84cc16, #10b981, #06b6d4, #3b82f6, #8b5cf6, #d946ef, #f43f5e)',
                '-webkit-background-clip': 'text',
                '-webkit-text-fill-color': 'transparent',
                'background-clip': 'text',
              },
            }),
          })
        } else {
          api.addRule({
            name: `text-gradient-${abbr}-${color}`,
            pattern: `text-gradient-${abbr}-${color}`,
            generate: () => ({
              properties: {
                'background': `linear-gradient(${direction}, var(--colors-${color}-400), var(--colors-${color}-600))`,
                '-webkit-background-clip': 'text',
                '-webkit-text-fill-color': 'transparent',
                'background-clip': 'text',
              },
            }),
          })
        }
      }
    }

    // Animated gradient backgrounds
    api.addRule({
      name: 'animate-gradient-x',
      pattern: 'animate-gradient-x',
      generate: () => ({
        properties: {
          'background-size': '200% 200%',
          'animation': 'gradient-x 3s ease infinite',
        },
        atRules: [
          '@keyframes gradient-x',
          '0%, 100% { background-position: 0% 50% }',
          '50% { background-position: 100% 50% }',
        ],
      }),
    })

    api.addRule({
      name: 'animate-gradient-y',
      pattern: 'animate-gradient-y',
      generate: () => ({
        properties: {
          'background-size': '200% 200%',
          'animation': 'gradient-y 3s ease infinite',
        },
        atRules: [
          '@keyframes gradient-y',
          '0%, 100% { background-position: 50% 0% }',
          '50% { background-position: 50% 100% }',
        ],
      }),
    })

    api.addRule({
      name: 'animate-gradient-xy',
      pattern: 'animate-gradient-xy',
      generate: () => ({
        properties: {
          'background-size': '400% 400%',
          'animation': 'gradient-xy 15s ease infinite',
        },
        atRules: [
          '@keyframes gradient-xy',
          '0%, 100% { background-position: 0% 50% }',
          '50% { background-position: 100% 50% }',
        ],
      }),
    })

    // Mesh gradients
    for (const color of ['primary', 'coral', 'purple', 'blue']) {
      api.addRule({
        name: `bg-gradient-mesh-${color}`,
        pattern: `bg-gradient-mesh-${color}`,
        generate: () => ({
          properties: {
            'background-color': `var(--colors-${color}-500)`,
            'background-image': `
              radial-gradient(at 40% 20%, var(--colors-${color}-400) 0px, transparent 50%),
              radial-gradient(at 80% 0%, var(--colors-${color}-300) 0px, transparent 50%),
              radial-gradient(at 0% 50%, var(--colors-${color}-500) 0px, transparent 50%),
              radial-gradient(at 80% 50%, var(--colors-${color}-600) 0px, transparent 50%),
              radial-gradient(at 0% 100%, var(--colors-${color}-700) 0px, transparent 50%),
              radial-gradient(at 80% 100%, var(--colors-${color}-800) 0px, transparent 50%)
            `.replace(/\s+/g, ' '),
          },
        }),
      })
    }

    // Glass morphism gradient overlay
    api.addRule({
      name: 'bg-gradient-glass',
      pattern: 'bg-gradient-glass',
      generate: () => ({
        properties: {
          'background': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
        },
      }),
    })

    // Shimmer effect
    api.addRule({
      name: 'animate-shimmer',
      pattern: 'animate-shimmer',
      generate: () => ({
        properties: {
          'background': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          'background-size': '200% 100%',
          'animation': 'shimmer 2s infinite',
        },
        atRules: [
          '@keyframes shimmer',
          '0% { background-position: 200% 0 }',
          '100% { background-position: -200% 0 }',
        ],
      }),
    })

    // Aurora gradient (Northern lights effect)
    api.addRule({
      name: 'bg-gradient-aurora',
      pattern: 'bg-gradient-aurora',
      generate: () => ({
        properties: {
          'background': 'linear-gradient(135deg, #a855f7 0%, #6366f1 25%, #3b82f6 50%, #06b6d4 75%, #10b981 100%)',
          'background-size': '200% 200%',
          'animation': 'aurora 8s ease infinite',
        },
        atRules: [
          '@keyframes aurora',
          '0% { background-position: 0% 50% }',
          '50% { background-position: 100% 50% }',
          '100% { background-position: 0% 50% }',
        ],
      }),
    })
  },
})

export default gradientsPlugin
