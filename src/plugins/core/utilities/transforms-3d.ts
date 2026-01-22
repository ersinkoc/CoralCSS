/**
 * 3D Transform Utilities Plugin
 *
 * Comprehensive 3D transformation utilities including perspective,
 * 3D translations, rotations, and transform styles.
 *
 * @module plugins/core/utilities/transforms-3d
 */

import type { Plugin, Rule, PluginContext } from '../../../types'

/**
 * 3D Transform utilities plugin
 *
 * @example
 * ```html
 * <div class="perspective-1000">
 *   <div class="preserve-3d rotate-x-45 rotate-y-45">
 *     3D transformed content
 *   </div>
 * </div>
 * ```
 */
export function transforms3DPlugin(): Plugin {
  return {
    name: 'transforms-3d',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // ========================================
      // PERSPECTIVE
      // ========================================

      // Perspective on container
      rules.push(
        { pattern: 'perspective-none', properties: { perspective: 'none' } },
        { pattern: 'perspective-100', properties: { perspective: '100px' } },
        { pattern: 'perspective-200', properties: { perspective: '200px' } },
        { pattern: 'perspective-300', properties: { perspective: '300px' } },
        { pattern: 'perspective-400', properties: { perspective: '400px' } },
        { pattern: 'perspective-500', properties: { perspective: '500px' } },
        { pattern: 'perspective-600', properties: { perspective: '600px' } },
        { pattern: 'perspective-700', properties: { perspective: '700px' } },
        { pattern: 'perspective-800', properties: { perspective: '800px' } },
        { pattern: 'perspective-900', properties: { perspective: '900px' } },
        { pattern: 'perspective-1000', properties: { perspective: '1000px' } },
        { pattern: 'perspective-1500', properties: { perspective: '1500px' } },
        { pattern: 'perspective-2000', properties: { perspective: '2000px' } }
      )

      // Arbitrary perspective
      rules.push({
        pattern: /^perspective-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { perspective: value.replace(/_/g, ' ') } }
        },
      })

      // ========================================
      // PERSPECTIVE ORIGIN
      // ========================================

      const perspectiveOrigins = [
        'center',
        'top',
        'top-right',
        'right',
        'bottom-right',
        'bottom',
        'bottom-left',
        'left',
        'top-left',
      ]

      for (const origin of perspectiveOrigins) {
        rules.push({
          pattern: `perspective-origin-${origin}`,
          properties: { 'perspective-origin': origin.replace(/-/g, ' ') },
        })
      }

      // Percentage perspective origins
      const perspectivePercentages = ['0', '50', '100']
      for (const x of perspectivePercentages) {
        for (const y of perspectivePercentages) {
          rules.push({
            pattern: `perspective-origin-${x}-${y}`,
            properties: { 'perspective-origin': `${x}% ${y}%` },
          })
        }
      }

      // Arbitrary perspective origin
      rules.push({
        pattern: /^perspective-origin-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { 'perspective-origin': value.replace(/_/g, ' ') } }
        },
      })

      // ========================================
      // TRANSFORM STYLE
      // ========================================

      rules.push(
        { pattern: 'transform-style-flat', properties: { 'transform-style': 'flat' } },
        { pattern: 'transform-style-flat-3d', properties: { 'transform-style': 'preserve-3d' } },
        { pattern: 'preserve-3d', properties: { 'transform-style': 'preserve-3d' } }
      )

      // ========================================
      // BACKFACE VISIBILITY
      // ========================================

      rules.push(
        { pattern: 'backface-visible', properties: { 'backface-visibility': 'visible' } },
        { pattern: 'backface-hidden', properties: { 'backface-visibility': 'hidden' } }
      )

      // ========================================
      // 3D TRANSLATIONS
      // ========================================

      // Translate Z
      const translateZValues = [
        '0', 'px-0', 'px-1', 'px-2', 'px-4', 'px-8', 'px-12', 'px-16',
        'px-24', 'px-32', 'px-40', 'px-48', 'px-56', 'px-64', 'px-72',
        'px-80', 'px-96'
      ]

      for (const value of translateZValues) {
        const pxValue = value === '0' ? '0px' : value.replace('px-', '') + 'px'
        rules.push({
          pattern: `translate-z-${value}`,
          properties: { transform: `translateZ(${pxValue})` },
        })
        rules.push({
          pattern: `-translate-z-${value}`,
          properties: { transform: `translateZ(calc(-1 * ${pxValue}))` },
        })
      }

      // Rem-based translate Z
      const translateZRem = ['0', '0.5', '1', '1.5', '2', '2.5', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24']
      for (const value of translateZRem) {
        rules.push({
          pattern: `translate-z-${value.replace('.', '-')}`,
          properties: { transform: `translateZ(${value}rem)` },
        })
      }

      // Arbitrary translate Z
      rules.push({
        pattern: /^translate-z-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { transform: `translateZ(${value.replace(/_/g, ' ')})` } }
        },
      })

      // 3D translate (translate3d)
      rules.push({
        pattern: /^translate-3d-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { transform: `translate3d(${value.replace(/_/g, ' ')})` } }
        },
      })

      // ========================================
      // 3D ROTATIONS
      // ========================================

      // Rotate X
      const rotateValues = [
        '0', '1', '2', '3', '6', '12', '45', '90', '180'
      ]

      for (const value of rotateValues) {
        rules.push({
          pattern: `rotate-x-${value}`,
          properties: { transform: `rotateX(${value}deg)` },
        })
        rules.push({
          pattern: `-rotate-x-${value}`,
          properties: { transform: `rotateX(calc(-1 * ${value}deg))` },
        })
        rules.push({
          pattern: `rotate-y-${value}`,
          properties: { transform: `rotateY(${value}deg)` },
        })
        rules.push({
          pattern: `-rotate-y-${value}`,
          properties: { transform: `rotateY(calc(-1 * ${value}deg))` },
        })
      }

      // Rotate Z (same as regular rotate)
      for (const value of rotateValues) {
        rules.push({
          pattern: `rotate-z-${value}`,
          properties: { transform: `rotateZ(${value}deg)` },
        })
      }

      // Arbitrary rotations
      rules.push({
        pattern: /^rotate-x-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { transform: `rotateX(${value.replace(/_/g, ' ')})` } }
        },
      })
      rules.push({
        pattern: /^rotate-y-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { transform: `rotateY(${value.replace(/_/g, ' ')})` } }
        },
      })
      rules.push({
        pattern: /^rotate-z-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { transform: `rotateZ(${value.replace(/_/g, ' ')})` } }
        },
      })

      // ========================================
      // 3D SCALE
      // ========================================

      const scale3DValues = ['0', '50', '75', '90', '95', '100', '105', '110', '125', '150', '200']
      for (const value of scale3DValues) {
        const decimal = (parseInt(value, 10) / 100).toFixed(2)
        rules.push({
          pattern: `scale-z-${value}`,
          properties: { transform: `scaleZ(${decimal})` },
        })
      }

      // 3D scale (scale3d)
      rules.push({
        pattern: /^scale-3d-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { transform: `scale3d(${value.replace(/_/g, ' ')})` } }
        },
      })

      // ========================================
      // COMBINATION TRANSFORMS
      // ========================================

      // Rotate 3D
      rules.push({
        pattern: /^rotate-3d-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { transform: `rotate3d(${value.replace(/_/g, ' ')})` } }
        },
      })

      // Matrix 3D
      rules.push({
        pattern: /^matrix-3d-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { transform: `matrix3d(${value.replace(/_/g, ' ')})` } }
        },
      })

      // ========================================
      // TRANSFORM ORIGIN (3D)
      // ========================================

      const transformOrigins3D = [
        'center',
        'top',
        'top-right',
        'right',
        'bottom-right',
        'bottom',
        'bottom-left',
        'left',
        'top-left',
      ]

      for (const origin of transformOrigins3D) {
        rules.push({
          pattern: `transform-origin-${origin}`,
          properties: { 'transform-origin': origin.replace(/-/g, ' ') },
        })
      }

      // Z origin for 3D transforms
      rules.push({
        pattern: /^transform-origin-z-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { 'transform-origin': `center center ${value.replace(/_/g, ' ')}` } }
        },
      })

      // ========================================
      // UTILITY SHORTCUTS
      // ========================================

      // Flip X (rotate 180deg on X axis)
      rules.push({
        pattern: 'flip-x',
        properties: { transform: 'rotateX(180deg)' },
      })

      // Flip Y (rotate 180deg on Y axis)
      rules.push({
        pattern: 'flip-y',
        properties: { transform: 'rotateY(180deg)' },
      })

      // Flip Z (rotate 180deg on Z axis)
      rules.push({
        pattern: 'flip-z',
        properties: { transform: 'rotateZ(180deg)' },
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    }
  }
}

export default transforms3DPlugin
