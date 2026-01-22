/**
 * Effects Utilities Plugin
 *
 * Box shadow, opacity, mix-blend-mode utilities.
 * @module plugins/core/utilities/effects
 */

import type { Plugin, Rule, PluginContext } from '../../../types'
import { boxShadow } from '../../../theme'

/**
 * Effects utilities plugin
 */
export function effectsPlugin(): Plugin {
  return {
    name: 'effects',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // Box shadow
      for (const [key, value] of Object.entries(boxShadow)) {
        const suffix = key === 'DEFAULT' ? '' : `-${key}`
        rules.push({
          pattern: `shadow${suffix}`,
          properties: {
            '--coral-shadow': value,
            'box-shadow': 'var(--coral-ring-offset-shadow, 0 0 #0000), var(--coral-ring-shadow, 0 0 #0000), var(--coral-shadow)',
          },
        })
      }

      // Mix blend mode
      rules.push({ pattern: 'mix-blend-normal', properties: { 'mix-blend-mode': 'normal' } })
      rules.push({ pattern: 'mix-blend-multiply', properties: { 'mix-blend-mode': 'multiply' } })
      rules.push({ pattern: 'mix-blend-screen', properties: { 'mix-blend-mode': 'screen' } })
      rules.push({ pattern: 'mix-blend-overlay', properties: { 'mix-blend-mode': 'overlay' } })
      rules.push({ pattern: 'mix-blend-darken', properties: { 'mix-blend-mode': 'darken' } })
      rules.push({ pattern: 'mix-blend-lighten', properties: { 'mix-blend-mode': 'lighten' } })
      rules.push({ pattern: 'mix-blend-color-dodge', properties: { 'mix-blend-mode': 'color-dodge' } })
      rules.push({ pattern: 'mix-blend-color-burn', properties: { 'mix-blend-mode': 'color-burn' } })
      rules.push({ pattern: 'mix-blend-hard-light', properties: { 'mix-blend-mode': 'hard-light' } })
      rules.push({ pattern: 'mix-blend-soft-light', properties: { 'mix-blend-mode': 'soft-light' } })
      rules.push({ pattern: 'mix-blend-difference', properties: { 'mix-blend-mode': 'difference' } })
      rules.push({ pattern: 'mix-blend-exclusion', properties: { 'mix-blend-mode': 'exclusion' } })
      rules.push({ pattern: 'mix-blend-hue', properties: { 'mix-blend-mode': 'hue' } })
      rules.push({ pattern: 'mix-blend-saturation', properties: { 'mix-blend-mode': 'saturation' } })
      rules.push({ pattern: 'mix-blend-color', properties: { 'mix-blend-mode': 'color' } })
      rules.push({ pattern: 'mix-blend-luminosity', properties: { 'mix-blend-mode': 'luminosity' } })
      rules.push({ pattern: 'mix-blend-plus-darker', properties: { 'mix-blend-mode': 'plus-darker' } })
      rules.push({ pattern: 'mix-blend-plus-lighter', properties: { 'mix-blend-mode': 'plus-lighter' } })

      // Background blend mode
      rules.push({ pattern: 'bg-blend-normal', properties: { 'background-blend-mode': 'normal' } })
      rules.push({ pattern: 'bg-blend-multiply', properties: { 'background-blend-mode': 'multiply' } })
      rules.push({ pattern: 'bg-blend-screen', properties: { 'background-blend-mode': 'screen' } })
      rules.push({ pattern: 'bg-blend-overlay', properties: { 'background-blend-mode': 'overlay' } })
      rules.push({ pattern: 'bg-blend-darken', properties: { 'background-blend-mode': 'darken' } })
      rules.push({ pattern: 'bg-blend-lighten', properties: { 'background-blend-mode': 'lighten' } })
      rules.push({ pattern: 'bg-blend-color-dodge', properties: { 'background-blend-mode': 'color-dodge' } })
      rules.push({ pattern: 'bg-blend-color-burn', properties: { 'background-blend-mode': 'color-burn' } })
      rules.push({ pattern: 'bg-blend-hard-light', properties: { 'background-blend-mode': 'hard-light' } })
      rules.push({ pattern: 'bg-blend-soft-light', properties: { 'background-blend-mode': 'soft-light' } })
      rules.push({ pattern: 'bg-blend-difference', properties: { 'background-blend-mode': 'difference' } })
      rules.push({ pattern: 'bg-blend-exclusion', properties: { 'background-blend-mode': 'exclusion' } })
      rules.push({ pattern: 'bg-blend-hue', properties: { 'background-blend-mode': 'hue' } })
      rules.push({ pattern: 'bg-blend-saturation', properties: { 'background-blend-mode': 'saturation' } })
      rules.push({ pattern: 'bg-blend-color', properties: { 'background-blend-mode': 'color' } })
      rules.push({ pattern: 'bg-blend-luminosity', properties: { 'background-blend-mode': 'luminosity' } })

      // Arbitrary values
      rules.push({
        pattern: /^shadow-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return {
            properties: {
              '--coral-shadow': value,
              'box-shadow': 'var(--coral-ring-offset-shadow, 0 0 #0000), var(--coral-ring-shadow, 0 0 #0000), var(--coral-shadow)',
            },
          }
        },
      })

      // ========================================
      // COLORED DROP SHADOWS (Tailwind 4.1+)
      // ========================================

      const dropShadowColors = [
        'coral', 'slate', 'gray', 'zinc', 'neutral', 'stone',
        'red', 'orange', 'amber', 'yellow', 'lime', 'green',
        'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo',
        'violet', 'purple', 'fuchsia', 'pink', 'rose',
      ]

      // Generate colored drop shadows
      for (const color of dropShadowColors) {
        for (const shade of ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']) {
          // Without opacity
          rules.push({
            pattern: `drop-shadow-${color}-${shade}`,
            generate: () => ({
              properties: {
                'filter': 'drop-shadow(var(--drop-shadow-color))',
                '--drop-shadow-color': 'var(--color-' + color + '-' + shade + ')'
              }
            })
          })

          // With opacity modifier
          rules.push({
            pattern: `drop-shadow-${color}-${shade}\\/(\\d+)`,
            handler: (match) => {
              const opacityValue = match[1]
              if (!opacityValue) {return null}
              const opacity = (parseInt(opacityValue, 10) / 100).toFixed(2)
              return {
                properties: {
                  'filter': 'drop-shadow(var(--drop-shadow-color-alpha))',
                  '--drop-shadow-color-alpha': 'color-mix(in srgb, var(--color-' + color + '-' + shade + ') ' + opacity + ', transparent)'
                }
              }
            }
          })
        }
      }

      // Arbitrary colored drop shadows
      rules.push({
        pattern: /^drop-shadow-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return {
            properties: { 'filter': 'drop-shadow(' + value.replace(/_/g, ' ') + ')' }
          }
        }
      })

      // ========================================
      // CSS MASKS (Beyond Tailwind 4)
      // ========================================

      // Mask image
      rules.push({ pattern: 'mask-none', properties: { 'mask-image': 'none' } })
      rules.push({
        pattern: 'mask-linear',
        properties: { 'mask-image': 'linear-gradient(black, transparent)' },
      })
      rules.push({
        pattern: 'mask-linear-r',
        properties: { 'mask-image': 'linear-gradient(to right, black, transparent)' },
      })
      rules.push({
        pattern: 'mask-linear-l',
        properties: { 'mask-image': 'linear-gradient(to left, black, transparent)' },
      })
      rules.push({
        pattern: 'mask-linear-t',
        properties: { 'mask-image': 'linear-gradient(to top, black, transparent)' },
      })
      rules.push({
        pattern: 'mask-linear-b',
        properties: { 'mask-image': 'linear-gradient(to bottom, black, transparent)' },
      })
      rules.push({
        pattern: 'mask-radial',
        properties: { 'mask-image': 'radial-gradient(black, transparent)' },
      })

      // Arbitrary mask-image
      rules.push({
        pattern: /^mask-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'mask-image': v } }
        },
      })

      // Mask size
      rules.push({ pattern: 'mask-auto', properties: { 'mask-size': 'auto' } })
      rules.push({ pattern: 'mask-cover', properties: { 'mask-size': 'cover' } })
      rules.push({ pattern: 'mask-contain', properties: { 'mask-size': 'contain' } })

      rules.push({
        pattern: /^mask-size-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'mask-size': v } }
        },
      })

      // Mask repeat
      rules.push({ pattern: 'mask-repeat', properties: { 'mask-repeat': 'repeat' } })
      rules.push({ pattern: 'mask-no-repeat', properties: { 'mask-repeat': 'no-repeat' } })
      rules.push({ pattern: 'mask-repeat-x', properties: { 'mask-repeat': 'repeat-x' } })
      rules.push({ pattern: 'mask-repeat-y', properties: { 'mask-repeat': 'repeat-y' } })
      rules.push({ pattern: 'mask-repeat-round', properties: { 'mask-repeat': 'round' } })
      rules.push({ pattern: 'mask-repeat-space', properties: { 'mask-repeat': 'space' } })

      // Mask position
      rules.push({ pattern: 'mask-position-center', properties: { 'mask-position': 'center' } })
      rules.push({ pattern: 'mask-position-top', properties: { 'mask-position': 'top' } })
      rules.push({ pattern: 'mask-position-bottom', properties: { 'mask-position': 'bottom' } })
      rules.push({ pattern: 'mask-position-left', properties: { 'mask-position': 'left' } })
      rules.push({ pattern: 'mask-position-right', properties: { 'mask-position': 'right' } })

      rules.push({
        pattern: /^mask-position-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'mask-position': v } }
        },
      })

      // Mask composite
      rules.push({ pattern: 'mask-composite-add', properties: { 'mask-composite': 'add' } })
      rules.push({ pattern: 'mask-composite-subtract', properties: { 'mask-composite': 'subtract' } })
      rules.push({ pattern: 'mask-composite-intersect', properties: { 'mask-composite': 'intersect' } })
      rules.push({ pattern: 'mask-composite-exclude', properties: { 'mask-composite': 'exclude' } })

      // Mask type
      rules.push({ pattern: 'mask-type-alpha', properties: { 'mask-type': 'alpha' } })
      rules.push({ pattern: 'mask-type-luminance', properties: { 'mask-type': 'luminance' } })

      // Mask origin
      rules.push({ pattern: 'mask-origin-border', properties: { 'mask-origin': 'border-box' } })
      rules.push({ pattern: 'mask-origin-padding', properties: { 'mask-origin': 'padding-box' } })
      rules.push({ pattern: 'mask-origin-content', properties: { 'mask-origin': 'content-box' } })

      // Mask clip
      rules.push({ pattern: 'mask-clip-border', properties: { 'mask-clip': 'border-box' } })
      rules.push({ pattern: 'mask-clip-padding', properties: { 'mask-clip': 'padding-box' } })
      rules.push({ pattern: 'mask-clip-content', properties: { 'mask-clip': 'content-box' } })
      rules.push({ pattern: 'mask-clip-no-clip', properties: { 'mask-clip': 'no-clip' } })

      // ========================================
      // CLIP-PATH (Beyond Tailwind 4)
      // ========================================

      // Predefined clip paths
      rules.push({ pattern: 'clip-none', properties: { 'clip-path': 'none' } })
      rules.push({ pattern: 'clip-circle', properties: { 'clip-path': 'circle(50%)' } })
      rules.push({ pattern: 'clip-ellipse', properties: { 'clip-path': 'ellipse(50% 25%)' } })
      rules.push({ pattern: 'clip-inset', properties: { 'clip-path': 'inset(0)' } })
      rules.push({ pattern: 'clip-inset-sm', properties: { 'clip-path': 'inset(5%)' } })
      rules.push({ pattern: 'clip-inset-md', properties: { 'clip-path': 'inset(10%)' } })
      rules.push({ pattern: 'clip-inset-lg', properties: { 'clip-path': 'inset(20%)' } })

      // Common polygon shapes
      rules.push({ pattern: 'clip-triangle', properties: { 'clip-path': 'polygon(50% 0%, 0% 100%, 100% 100%)' } })
      rules.push({ pattern: 'clip-triangle-up', properties: { 'clip-path': 'polygon(50% 0%, 0% 100%, 100% 100%)' } })
      rules.push({ pattern: 'clip-triangle-down', properties: { 'clip-path': 'polygon(0% 0%, 100% 0%, 50% 100%)' } })
      rules.push({ pattern: 'clip-triangle-left', properties: { 'clip-path': 'polygon(100% 0%, 0% 50%, 100% 100%)' } })
      rules.push({ pattern: 'clip-triangle-right', properties: { 'clip-path': 'polygon(0% 0%, 100% 50%, 0% 100%)' } })
      rules.push({ pattern: 'clip-rhombus', properties: { 'clip-path': 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' } })
      rules.push({ pattern: 'clip-pentagon', properties: { 'clip-path': 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' } })
      rules.push({ pattern: 'clip-hexagon', properties: { 'clip-path': 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' } })
      rules.push({ pattern: 'clip-octagon', properties: { 'clip-path': 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' } })
      rules.push({ pattern: 'clip-star', properties: { 'clip-path': 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' } })
      rules.push({ pattern: 'clip-cross', properties: { 'clip-path': 'polygon(33% 0%, 66% 0%, 66% 33%, 100% 33%, 100% 66%, 66% 66%, 66% 100%, 33% 100%, 33% 66%, 0% 66%, 0% 33%, 33% 33%)' } })
      rules.push({ pattern: 'clip-arrow-right', properties: { 'clip-path': 'polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)' } })
      rules.push({ pattern: 'clip-arrow-left', properties: { 'clip-path': 'polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)' } })
      rules.push({ pattern: 'clip-message', properties: { 'clip-path': 'polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)' } })
      rules.push({ pattern: 'clip-bevel', properties: { 'clip-path': 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)' } })
      rules.push({ pattern: 'clip-rabbet', properties: { 'clip-path': 'polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%)' } })

      // Arbitrary clip-path
      rules.push({
        pattern: /^clip-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'clip-path': v } }
        },
      })

      // ========================================
      // CSS SHAPES (Beyond Tailwind 4)
      // ========================================

      // shape-outside for text wrapping
      rules.push({ pattern: 'shape-none', properties: { 'shape-outside': 'none' } })
      rules.push({ pattern: 'shape-margin-box', properties: { 'shape-outside': 'margin-box' } })
      rules.push({ pattern: 'shape-border-box', properties: { 'shape-outside': 'border-box' } })
      rules.push({ pattern: 'shape-padding-box', properties: { 'shape-outside': 'padding-box' } })
      rules.push({ pattern: 'shape-content-box', properties: { 'shape-outside': 'content-box' } })
      rules.push({ pattern: 'shape-circle', properties: { 'shape-outside': 'circle(50%)' } })
      rules.push({ pattern: 'shape-ellipse', properties: { 'shape-outside': 'ellipse(50% 25%)' } })
      rules.push({ pattern: 'shape-inset', properties: { 'shape-outside': 'inset(10%)' } })

      rules.push({
        pattern: /^shape-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'shape-outside': v } }
        },
      })

      // shape-margin
      const shapeMargins = ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16']
      for (const value of shapeMargins) {
        rules.push({
          pattern: `shape-margin-${value}`,
          properties: { 'shape-margin': `${parseInt(value, 10) * 0.25}rem` },
        })
      }

      rules.push({
        pattern: /^shape-margin-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'shape-margin': v } }
        },
      })

      // shape-image-threshold
      const thresholds = ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100']
      for (const value of thresholds) {
        rules.push({
          pattern: `shape-threshold-${value}`,
          properties: { 'shape-image-threshold': (parseInt(value, 10) / 100).toString() },
        })
      }

      rules.push({
        pattern: /^shape-threshold-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'shape-image-threshold': v } }
        },
      })

      // ========================================
      // OBJECT VIEW BOX (Beyond Tailwind 4)
      // ========================================

      // object-view-box for image cropping
      rules.push({ pattern: 'object-view-box-none', properties: { 'object-view-box': 'none' } })
      rules.push({
        pattern: 'object-view-box-inset-5',
        properties: { 'object-view-box': 'inset(5% 5% 5% 5%)' },
      })
      rules.push({
        pattern: 'object-view-box-inset-10',
        properties: { 'object-view-box': 'inset(10% 10% 10% 10%)' },
      })
      rules.push({
        pattern: 'object-view-box-inset-15',
        properties: { 'object-view-box': 'inset(15% 15% 15% 15%)' },
      })
      rules.push({
        pattern: 'object-view-box-inset-20',
        properties: { 'object-view-box': 'inset(20% 20% 20% 20%)' },
      })
      rules.push({
        pattern: 'object-view-box-inset-25',
        properties: { 'object-view-box': 'inset(25% 25% 25% 25%)' },
      })

      rules.push({
        pattern: /^object-view-box-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'object-view-box': v } }
        },
      })

      // ========================================
      // ANIMATION COMPOSITION (Beyond Tailwind 4)
      // ========================================

      rules.push({ pattern: 'animation-composition-replace', properties: { 'animation-composition': 'replace' } })
      rules.push({ pattern: 'animation-composition-add', properties: { 'animation-composition': 'add' } })
      rules.push({ pattern: 'animation-composition-accumulate', properties: { 'animation-composition': 'accumulate' } })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default effectsPlugin
