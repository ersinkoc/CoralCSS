/**
 * Pattern Utilities Plugin
 *
 * CSS pattern utilities for backgrounds and decorative elements.
 *
 * @module plugins/core/utilities/patterns
 */

import type { Plugin } from '../../../types'

/**
 * Pattern utilities plugin for CoralCSS
 */
export const patternsPlugin = (): Plugin => ({
  name: 'patterns',
  version: '1.0.0',
  install(api) {
    // Dot patterns
    for (const size of ['sm', 'md', 'lg']) {
      const dotSize = size === 'sm' ? '2px' : size === 'md' ? '4px' : '6px'
      const spacing = size === 'sm' ? '8px' : size === 'md' ? '16px' : '24px'

      api.addRule({
        name: `bg-pattern-dot-${size}`,
        pattern: `bg-pattern-dot-${size}`,
        generate: () => ({
          properties: {
            'background-image': `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            'background-size': `${spacing} ${spacing}`,
          },
        }),
      })
    }

    // Grid patterns
    for (const size of ['sm', 'md', 'lg']) {
      const spacing = size === 'sm' ? '20px' : size === 'md' ? '40px' : '60px'
      const strokeWidth = size === 'sm' ? '1px' : size === 'md' ? '1px' : '2px'

      api.addRule({
        name: `bg-pattern-grid-${size}`,
        pattern: `bg-pattern-grid-${size}`,
        generate: () => ({
          properties: {
            'background-image': `linear-gradient(to right, currentColor ${strokeWidth}, transparent ${strokeWidth}), linear-gradient(to bottom, currentColor ${strokeWidth}, transparent ${strokeWidth})`,
            'background-size': `${spacing} ${spacing}`,
          },
        }),
      })
    }

    // Checkerboard pattern
    for (const size of ['sm', 'md', 'lg']) {
      const boxSize = size === 'sm' ? '10px' : size === 'md' ? '20px' : '40px'

      api.addRule({
        name: `bg-pattern-checkerboard-${size}`,
        pattern: `bg-pattern-checkerboard-${size}`,
        generate: () => ({
          properties: {
            'background-image': `conic-gradient(currentColor 90deg, transparent 90deg, transparent 180deg, currentColor 180deg, currentColor 270deg, transparent 270deg)`,
            'background-size': `${boxSize} ${boxSize}`,
          },
        }),
      })
    }

    // Diagonal stripe pattern
    for (const size of ['sm', 'md', 'lg']) {
      const stripeWidth = size === 'sm' ? '2px' : size === 'md' ? '4px' : '8px'

      api.addRule({
        name: `bg-pattern-stripe-diagonal-${size}`,
        pattern: `bg-pattern-stripe-diagonal-${size}`,
        generate: () => ({
          properties: {
            'background-image': `repeating-linear-gradient(45deg, currentColor 0, currentColor ${stripeWidth}, transparent ${stripeWidth}, transparent calc(${stripeWidth} * 4))`,
            'background-size': `calc(${stripeWidth} * 4) calc(${stripeWidth} * 4)`,
          },
        }),
      })
    }

    // Horizontal stripe pattern
    for (const size of ['sm', 'md', 'lg']) {
      const stripeWidth = size === 'sm' ? '2px' : size === 'md' ? '4px' : '8px'

      api.addRule({
        name: `bg-pattern-stripe-${size}`,
        pattern: `bg-pattern-stripe-${size}`,
        generate: () => ({
          properties: {
            'background-image': `repeating-linear-gradient(0deg, currentColor, currentColor ${stripeWidth}, transparent ${stripeWidth}, transparent calc(${stripeWidth} * 2))`,
            'background-size': `100% calc(${stripeWidth} * 2)`,
          },
        }),
      })
    }

    // Zigzag pattern
    api.addRule({
      name: 'bg-pattern-zigzag',
      pattern: 'bg-pattern-zigzag',
      generate: () => ({
        properties: {
          'background': `linear-gradient(135deg, currentColor 25%, transparent 25%) -50px 0,
                      linear-gradient(225deg, currentColor 25%, transparent 25%) -50px 0,
                      linear-gradient(315deg, currentColor 25%, transparent 25%),
                      linear-gradient(45deg, currentColor 25%, transparent 25%)`,
          'background-size': '100px 50px',
        },
      }),
    })

    // Polka dot pattern
    for (const size of ['sm', 'md', 'lg']) {
      const dotSize = size === 'sm' ? '4px' : size === 'md' ? '8px' : '12px'
      const spacing = size === 'sm' ? '16px' : size === 'md' ? '24px' : '32px'

      api.addRule({
        name: `bg-pattern-polka-${size}`,
        pattern: `bg-pattern-polka-${size}`,
        generate: () => ({
          properties: {
            'background-image': `radial-gradient(currentColor ${dotSize}, transparent ${dotSize})`,
            'background-size': `${spacing} ${spacing}`,
          },
        }),
      })
    }

    // Waves pattern
    api.addRule({
      name: 'bg-pattern-waves',
      pattern: 'bg-pattern-waves',
      generate: () => ({
        properties: {
          'background': `radial-gradient(circle at 100% 50%, transparent 20%, currentColor 21%, currentColor 34%, transparent 35%, transparent),
                      radial-gradient(circle at 0% 50%, transparent 20%, currentColor 21%, currentColor 34%, transparent 35%, transparent)`,
          'background-size': '100px 100px',
          'background-position': '0 0, 0 0',
        },
      }),
    })

    // Circles pattern
    for (const size of ['sm', 'md', 'lg']) {
      const circleSize = size === 'sm' ? '10px' : size === 'md' ? '20px' : '40px'
      const spacing = size === 'sm' ? '20px' : size === 'md' ? '40px' : '80px'

      api.addRule({
        name: `bg-pattern-circles-${size}`,
        pattern: `bg-pattern-circles-${size}`,
        generate: () => ({
          properties: {
            'background-image': `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            'background-size': `${circleSize} ${circleSize}`,
            'background-position': `0 0, ${spacing} 0, ${spacing} ${spacing}`,
          },
        }),
      })
    }

    // Crosshatch pattern
    for (const size of ['sm', 'md', 'lg']) {
      const spacing = size === 'sm' ? '8px' : size === 'md' ? '16px' : '24px'

      api.addRule({
        name: `bg-pattern-crosshatch-${size}`,
        pattern: `bg-pattern-crosshatch-${size}`,
        generate: () => ({
          properties: {
            'background-image': `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            'background-size': `${spacing} ${spacing}`,
          },
        }),
      })
    }

    // Stars pattern
    for (const density of ['sparse', 'dense']) {
      const size = density === 'sparse' ? '3px' : '2px'
      const spacing = density === 'sparse' ? '40px' : '20px'

      api.addRule({
        name: `bg-pattern-stars-${density}`,
        pattern: `bg-pattern-stars-${density}`,
        generate: () => ({
          properties: {
            'background-image': `radial-gradient(1px 1px at 50% 50%, currentColor 1px, transparent 0)`,
            'background-size': `${spacing}px ${spacing}px`,
          },
        }),
      })
    }

    // Triangles pattern
    api.addRule({
      name: 'bg-pattern-triangles',
      pattern: 'bg-pattern-triangles',
      generate: () => ({
        properties: {
          'background-image': `linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%, currentColor),
                      linear-gradient(-45deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%, currentColor)`,
          'background-size': '20px 20px',
          'background-position': '0 0, 0 10px',
        },
      }),
    })

    // Diamonds pattern
    for (const size of ['sm', 'md', 'lg']) {
      const diamondSize = size === 'sm' ? '10px' : size === 'md' ? '20px' : '30px'

      api.addRule({
        name: `bg-pattern-diamonds-${size}`,
        pattern: `bg-pattern-diamonds-${size}`,
        generate: () => ({
          properties: {
            'background-image': `radial-gradient(circle at 50% 50%, currentColor 1px, transparent 1px)`,
            'background-size': `${diamondSize} ${diamondSize}`,
          },
        }),
      })
    }

    // Hexagon pattern
    api.addRule({
      name: 'bg-pattern-hexagons',
      pattern: 'bg-pattern-hexagons',
      generate: () => ({
        properties: {
          'background': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%239C92AC' fill-opacity='0.4' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9l12.99 7.5L27 17.9v15l-13.01 7.5L3 32.9v-15zm13.01 9l-13-7.5v15l13 7.5 13-7.5v-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          'background-size': '56px 98px',
        },
      }),
    })

    // Animated patterns
    api.addRule({
      name: 'animate-pattern-scroll',
      pattern: 'animate-pattern-scroll',
      generate: () => ({
        properties: {
          'animation': 'pattern-scroll 20s linear infinite',
        },
        atRules: [
          '@keyframes pattern-scroll',
          '0% { background-position: 0 0 }',
          '100% { background-position: 100px 100px }',
        ],
      }),
    })

    // Pattern overlays for cards
    api.addRule({
      name: 'pattern-overlay-dots',
      pattern: 'pattern-overlay-dots',
      generate: () => ({
        properties: {
          'background-image': `radial-gradient(circle, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
          'background-size': '20px 20px',
        },
      }),
    })

    api.addRule({
      name: 'pattern-overlay-lines',
      pattern: 'pattern-overlay-lines',
      generate: () => ({
        properties: {
          'background-image': `linear-gradient(to right, rgba(99, 102, 241, 0.05) 1px, transparent 1px)`,
          'background-size': '40px 100%',
        },
      }),
    })
  },
})

export default patternsPlugin
