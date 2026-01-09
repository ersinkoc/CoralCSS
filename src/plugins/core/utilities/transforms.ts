/**
 * Transforms Utilities Plugin
 *
 * CSS transform utilities.
 * @module plugins/core/utilities/transforms
 */

import type { Plugin, Rule, PluginContext } from '../../../types'

/**
 * Transforms utilities plugin
 */
export function transformsPlugin(): Plugin {
  return {
    name: 'transforms',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // Scale
      const scaleValues = ['0', '50', '75', '90', '95', '100', '105', '110', '125', '150']
      for (const value of scaleValues) {
        const decimal = parseInt(value, 10) / 100
        rules.push({
          pattern: `scale-${value}`,
          properties: {
            '--coral-scale-x': String(decimal),
            '--coral-scale-y': String(decimal),
            transform: 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))',
          },
        })
        rules.push({
          pattern: `scale-x-${value}`,
          properties: {
            '--coral-scale-x': String(decimal),
            transform: 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))',
          },
        })
        rules.push({
          pattern: `scale-y-${value}`,
          properties: {
            '--coral-scale-y': String(decimal),
            transform: 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))',
          },
        })
      }

      // Rotate
      const rotateValues = ['0', '1', '2', '3', '6', '12', '45', '90', '180']
      for (const value of rotateValues) {
        rules.push({
          pattern: `rotate-${value}`,
          properties: {
            '--coral-rotate': `${value}deg`,
            transform: 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))',
          },
        })
        if (value !== '0') {
          rules.push({
            pattern: `-rotate-${value}`,
            properties: {
              '--coral-rotate': `-${value}deg`,
              transform: 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))',
            },
          })
        }
      }

      // Translate
      const translateValues = {
        '0': '0px',
        'px': '1px',
        '0.5': '0.125rem',
        '1': '0.25rem',
        '1.5': '0.375rem',
        '2': '0.5rem',
        '2.5': '0.625rem',
        '3': '0.75rem',
        '3.5': '0.875rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
        '11': '2.75rem',
        '12': '3rem',
        '14': '3.5rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '28': '7rem',
        '32': '8rem',
        '36': '9rem',
        '40': '10rem',
        '44': '11rem',
        '48': '12rem',
        '52': '13rem',
        '56': '14rem',
        '60': '15rem',
        '64': '16rem',
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        'full': '100%',
      }

      for (const [key, value] of Object.entries(translateValues)) {
        rules.push({
          pattern: `translate-x-${key}`,
          properties: {
            '--coral-translate-x': value,
            transform: 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))',
          },
        })
        rules.push({
          pattern: `translate-y-${key}`,
          properties: {
            '--coral-translate-y': value,
            transform: 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))',
          },
        })
        // Negative values
        if (!key.includes('/') && key !== 'full' && key !== '0' && key !== 'px') {
          rules.push({
            pattern: `-translate-x-${key}`,
            properties: {
              '--coral-translate-x': `-${value}`,
              transform: 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))',
            },
          })
          rules.push({
            pattern: `-translate-y-${key}`,
            properties: {
              '--coral-translate-y': `-${value}`,
              transform: 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))',
            },
          })
        }
      }

      // Skew
      const skewValues = ['0', '1', '2', '3', '6', '12']
      for (const value of skewValues) {
        rules.push({
          pattern: `skew-x-${value}`,
          properties: {
            '--coral-skew-x': `${value}deg`,
            transform: 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))',
          },
        })
        rules.push({
          pattern: `skew-y-${value}`,
          properties: {
            '--coral-skew-y': `${value}deg`,
            transform: 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))',
          },
        })
        if (value !== '0') {
          rules.push({
            pattern: `-skew-x-${value}`,
            properties: {
              '--coral-skew-x': `-${value}deg`,
              transform: 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))',
            },
          })
          rules.push({
            pattern: `-skew-y-${value}`,
            properties: {
              '--coral-skew-y': `-${value}deg`,
              transform: 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))',
            },
          })
        }
      }

      // Transform origin
      rules.push({ pattern: 'origin-center', properties: { 'transform-origin': 'center' } })
      rules.push({ pattern: 'origin-top', properties: { 'transform-origin': 'top' } })
      rules.push({ pattern: 'origin-top-right', properties: { 'transform-origin': 'top right' } })
      rules.push({ pattern: 'origin-right', properties: { 'transform-origin': 'right' } })
      rules.push({ pattern: 'origin-bottom-right', properties: { 'transform-origin': 'bottom right' } })
      rules.push({ pattern: 'origin-bottom', properties: { 'transform-origin': 'bottom' } })
      rules.push({ pattern: 'origin-bottom-left', properties: { 'transform-origin': 'bottom left' } })
      rules.push({ pattern: 'origin-left', properties: { 'transform-origin': 'left' } })
      rules.push({ pattern: 'origin-top-left', properties: { 'transform-origin': 'top left' } })

      // ========================================
      // 3D TRANSFORMS (Tailwind 4 parity)
      // ========================================

      // Perspective
      const perspectiveValues = {
        'none': 'none',
        'sm': '250px',
        'DEFAULT': '500px',
        'md': '750px',
        'lg': '1000px',
        'xl': '1500px',
        '2xl': '2000px',
      }
      for (const [key, value] of Object.entries(perspectiveValues)) {
        const pattern = key === 'DEFAULT' ? 'perspective' : `perspective-${key}`
        rules.push({ pattern, properties: { perspective: value } })
      }

      // Perspective origin
      rules.push({ pattern: 'perspective-origin-center', properties: { 'perspective-origin': 'center' } })
      rules.push({ pattern: 'perspective-origin-top', properties: { 'perspective-origin': 'top' } })
      rules.push({ pattern: 'perspective-origin-top-right', properties: { 'perspective-origin': 'top right' } })
      rules.push({ pattern: 'perspective-origin-right', properties: { 'perspective-origin': 'right' } })
      rules.push({ pattern: 'perspective-origin-bottom-right', properties: { 'perspective-origin': 'bottom right' } })
      rules.push({ pattern: 'perspective-origin-bottom', properties: { 'perspective-origin': 'bottom' } })
      rules.push({ pattern: 'perspective-origin-bottom-left', properties: { 'perspective-origin': 'bottom left' } })
      rules.push({ pattern: 'perspective-origin-left', properties: { 'perspective-origin': 'left' } })
      rules.push({ pattern: 'perspective-origin-top-left', properties: { 'perspective-origin': 'top left' } })

      // Transform style (for nested 3D)
      rules.push({ pattern: 'transform-3d', properties: { 'transform-style': 'preserve-3d' } })
      rules.push({ pattern: 'transform-flat', properties: { 'transform-style': 'flat' } })
      rules.push({ pattern: 'preserve-3d', properties: { 'transform-style': 'preserve-3d' } })

      // Backface visibility
      rules.push({ pattern: 'backface-visible', properties: { 'backface-visibility': 'visible' } })
      rules.push({ pattern: 'backface-hidden', properties: { 'backface-visibility': 'hidden' } })

      // Rotate X (3D)
      const rotate3dValues = ['0', '1', '2', '3', '6', '12', '45', '90', '180']
      for (const value of rotate3dValues) {
        rules.push({
          pattern: `rotate-x-${value}`,
          properties: {
            '--coral-rotate-x': `${value}deg`,
            transform: 'perspective(var(--coral-perspective, 1000px)) rotateX(var(--coral-rotate-x, 0deg)) rotateY(var(--coral-rotate-y, 0deg)) rotateZ(var(--coral-rotate-z, 0deg)) translateZ(var(--coral-translate-z, 0px))',
          },
        })
        if (value !== '0') {
          rules.push({
            pattern: `-rotate-x-${value}`,
            properties: {
              '--coral-rotate-x': `-${value}deg`,
              transform: 'perspective(var(--coral-perspective, 1000px)) rotateX(var(--coral-rotate-x, 0deg)) rotateY(var(--coral-rotate-y, 0deg)) rotateZ(var(--coral-rotate-z, 0deg)) translateZ(var(--coral-translate-z, 0px))',
            },
          })
        }
      }

      // Rotate Y (3D)
      for (const value of rotate3dValues) {
        rules.push({
          pattern: `rotate-y-${value}`,
          properties: {
            '--coral-rotate-y': `${value}deg`,
            transform: 'perspective(var(--coral-perspective, 1000px)) rotateX(var(--coral-rotate-x, 0deg)) rotateY(var(--coral-rotate-y, 0deg)) rotateZ(var(--coral-rotate-z, 0deg)) translateZ(var(--coral-translate-z, 0px))',
          },
        })
        if (value !== '0') {
          rules.push({
            pattern: `-rotate-y-${value}`,
            properties: {
              '--coral-rotate-y': `-${value}deg`,
              transform: 'perspective(var(--coral-perspective, 1000px)) rotateX(var(--coral-rotate-x, 0deg)) rotateY(var(--coral-rotate-y, 0deg)) rotateZ(var(--coral-rotate-z, 0deg)) translateZ(var(--coral-translate-z, 0px))',
            },
          })
        }
      }

      // Rotate Z (3D) - alias for regular rotate but with 3D transform
      for (const value of rotate3dValues) {
        rules.push({
          pattern: `rotate-z-${value}`,
          properties: {
            '--coral-rotate-z': `${value}deg`,
            transform: 'perspective(var(--coral-perspective, 1000px)) rotateX(var(--coral-rotate-x, 0deg)) rotateY(var(--coral-rotate-y, 0deg)) rotateZ(var(--coral-rotate-z, 0deg)) translateZ(var(--coral-translate-z, 0px))',
          },
        })
        if (value !== '0') {
          rules.push({
            pattern: `-rotate-z-${value}`,
            properties: {
              '--coral-rotate-z': `-${value}deg`,
              transform: 'perspective(var(--coral-perspective, 1000px)) rotateX(var(--coral-rotate-x, 0deg)) rotateY(var(--coral-rotate-y, 0deg)) rotateZ(var(--coral-rotate-z, 0deg)) translateZ(var(--coral-translate-z, 0px))',
            },
          })
        }
      }

      // Translate Z (3D depth)
      const translateZValues = {
        '0': '0px',
        'px': '1px',
        '0.5': '0.125rem',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
        '40': '10rem',
        '48': '12rem',
        '56': '14rem',
        '64': '16rem',
      }
      for (const [key, value] of Object.entries(translateZValues)) {
        rules.push({
          pattern: `translate-z-${key}`,
          properties: {
            '--coral-translate-z': value,
            transform: 'perspective(var(--coral-perspective, 1000px)) translateZ(var(--coral-translate-z, 0px))',
          },
        })
        if (key !== '0' && key !== 'px') {
          rules.push({
            pattern: `-translate-z-${key}`,
            properties: {
              '--coral-translate-z': `-${value}`,
              transform: 'perspective(var(--coral-perspective, 1000px)) translateZ(var(--coral-translate-z, 0px))',
            },
          })
        }
      }

      // Scale Z (3D)
      for (const value of scaleValues) {
        const decimal = parseInt(value, 10) / 100
        rules.push({
          pattern: `scale-z-${value}`,
          properties: {
            '--coral-scale-z': String(decimal),
            transform: 'perspective(var(--coral-perspective, 1000px)) scale3d(var(--coral-scale-x, 1), var(--coral-scale-y, 1), var(--coral-scale-z, 1))',
          },
        })
      }

      // 3D combined transform
      rules.push({
        pattern: 'transform-3d-gpu',
        properties: {
          transform: 'perspective(var(--coral-perspective, 1000px)) translate3d(var(--coral-translate-x, 0), var(--coral-translate-y, 0), var(--coral-translate-z, 0)) rotateX(var(--coral-rotate-x, 0deg)) rotateY(var(--coral-rotate-y, 0deg)) rotateZ(var(--coral-rotate-z, 0deg)) scale3d(var(--coral-scale-x, 1), var(--coral-scale-y, 1), var(--coral-scale-z, 1))',
          'transform-style': 'preserve-3d',
        },
      })

      // Transform none
      rules.push({ pattern: 'transform-none', properties: { transform: 'none' } })

      // Transform GPU (for hardware acceleration)
      rules.push({ pattern: 'transform-gpu', properties: { transform: 'translate3d(var(--coral-translate-x), var(--coral-translate-y), 0) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))' } })
      rules.push({ pattern: 'transform-cpu', properties: { transform: 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))' } })

      // Arbitrary values
      const transformVar = 'translate(var(--coral-translate-x), var(--coral-translate-y)) rotate(var(--coral-rotate)) skewX(var(--coral-skew-x)) skewY(var(--coral-skew-y)) scaleX(var(--coral-scale-x)) scaleY(var(--coral-scale-y))'
      rules.push({
        pattern: /^scale-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-scale-x': v, '--coral-scale-y': v, transform: transformVar } }
        },
      })
      rules.push({
        pattern: /^rotate-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-rotate': v, transform: transformVar } }
        },
      })
      rules.push({
        pattern: /^translate-x-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-translate-x': v, transform: transformVar } }
        },
      })
      rules.push({
        pattern: /^translate-y-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-translate-y': v, transform: transformVar } }
        },
      })
      rules.push({
        pattern: /^skew-x-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-skew-x': v, transform: transformVar } }
        },
      })
      rules.push({
        pattern: /^skew-y-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-skew-y': v, transform: transformVar } }
        },
      })
      rules.push({
        pattern: /^origin-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'transform-origin': v } } },
      })

      // 3D arbitrary values
      const transform3dVar = 'perspective(var(--coral-perspective, 1000px)) rotateX(var(--coral-rotate-x, 0deg)) rotateY(var(--coral-rotate-y, 0deg)) rotateZ(var(--coral-rotate-z, 0deg)) translateZ(var(--coral-translate-z, 0px))'
      rules.push({
        pattern: /^perspective-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { perspective: v } } },
      })
      rules.push({
        pattern: /^rotate-x-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { '--coral-rotate-x': v, transform: transform3dVar } } },
      })
      rules.push({
        pattern: /^rotate-y-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { '--coral-rotate-y': v, transform: transform3dVar } } },
      })
      rules.push({
        pattern: /^rotate-z-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { '--coral-rotate-z': v, transform: transform3dVar } } },
      })
      rules.push({
        pattern: /^translate-z-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { '--coral-translate-z': v, transform: 'perspective(var(--coral-perspective, 1000px)) translateZ(var(--coral-translate-z, 0px))' } } },
      })
      rules.push({
        pattern: /^perspective-origin-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'perspective-origin': v } } },
      })

      // ========================================
      // CSS MOTION PATH (Beyond Tailwind 4)
      // ========================================

      // Offset path - predefined shapes
      rules.push({
        pattern: 'offset-path-none',
        properties: { 'offset-path': 'none' },
      })
      rules.push({
        pattern: 'offset-path-circle',
        properties: { 'offset-path': 'circle(50%)' },
      })
      rules.push({
        pattern: 'offset-path-ellipse',
        properties: { 'offset-path': 'ellipse(50% 25%)' },
      })
      rules.push({
        pattern: 'offset-path-inset',
        properties: { 'offset-path': 'inset(10%)' },
      })
      rules.push({
        pattern: 'offset-path-polygon',
        properties: { 'offset-path': 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' },
      })

      // Arbitrary offset-path
      rules.push({
        pattern: /^offset-path-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'offset-path': v } }
        },
      })

      // Offset distance
      const offsetDistances = ['0', '10', '20', '25', '30', '40', '50', '60', '70', '75', '80', '90', '100']
      for (const value of offsetDistances) {
        rules.push({
          pattern: `offset-distance-${value}`,
          properties: { 'offset-distance': `${value}%` },
        })
      }

      // Arbitrary offset-distance
      rules.push({
        pattern: /^offset-distance-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'offset-distance': v } }
        },
      })

      // Offset rotate
      rules.push({ pattern: 'offset-rotate-auto', properties: { 'offset-rotate': 'auto' } })
      rules.push({ pattern: 'offset-rotate-reverse', properties: { 'offset-rotate': 'reverse' } })
      rules.push({ pattern: 'offset-rotate-auto-reverse', properties: { 'offset-rotate': 'auto reverse' } })

      const offsetRotates = ['0', '45', '90', '135', '180', '225', '270', '315']
      for (const value of offsetRotates) {
        rules.push({
          pattern: `offset-rotate-${value}`,
          properties: { 'offset-rotate': `${value}deg` },
        })
        if (value !== '0') {
          rules.push({
            pattern: `-offset-rotate-${value}`,
            properties: { 'offset-rotate': `-${value}deg` },
          })
        }
      }

      // Arbitrary offset-rotate
      rules.push({
        pattern: /^offset-rotate-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'offset-rotate': v } }
        },
      })

      // Offset position (anchor point)
      rules.push({ pattern: 'offset-position-auto', properties: { 'offset-position': 'auto' } })
      rules.push({ pattern: 'offset-position-center', properties: { 'offset-position': 'center' } })
      rules.push({ pattern: 'offset-position-top', properties: { 'offset-position': 'top' } })
      rules.push({ pattern: 'offset-position-bottom', properties: { 'offset-position': 'bottom' } })
      rules.push({ pattern: 'offset-position-left', properties: { 'offset-position': 'left' } })
      rules.push({ pattern: 'offset-position-right', properties: { 'offset-position': 'right' } })

      rules.push({
        pattern: /^offset-position-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'offset-position': v } }
        },
      })

      // Offset anchor
      rules.push({ pattern: 'offset-anchor-auto', properties: { 'offset-anchor': 'auto' } })
      rules.push({ pattern: 'offset-anchor-center', properties: { 'offset-anchor': 'center' } })
      rules.push({ pattern: 'offset-anchor-top', properties: { 'offset-anchor': 'top' } })
      rules.push({ pattern: 'offset-anchor-bottom', properties: { 'offset-anchor': 'bottom' } })
      rules.push({ pattern: 'offset-anchor-left', properties: { 'offset-anchor': 'left' } })
      rules.push({ pattern: 'offset-anchor-right', properties: { 'offset-anchor': 'right' } })

      rules.push({
        pattern: /^offset-anchor-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'offset-anchor': v } }
        },
      })

      // Combined offset shorthand helper
      rules.push({
        pattern: 'motion-path-ready',
        properties: {
          'offset-path': 'var(--coral-offset-path, none)',
          'offset-distance': 'var(--coral-offset-distance, 0%)',
          'offset-rotate': 'var(--coral-offset-rotate, auto)',
        },
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default transformsPlugin
