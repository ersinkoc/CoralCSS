/**
 * Object Fit & Position Utilities Plugin
 *
 * Control how replaced elements (images, videos) are sized and positioned.
 * Tailwind 4.1 compatible.
 *
 * @module plugins/core/utilities/object-fit
 */

import type { Plugin, PluginContext } from '../../../types'

/**
 * Object fit & position utilities plugin
 *
 * @example
 * ```html
 * <img class="object-cover w-full h-full" src="image.jpg" />
 *
 * <img class="object-top object-left" src="image.jpg" />
 * ```
 */
export function objectFitPlugin(): Plugin {
  return {
    name: 'object-fit',
    version: '1.0.0',

    install(ctx: PluginContext) {
      // ========================================
      // OBJECT FIT
      // ========================================

      ctx.addRule({
        pattern: 'object-contain',
        properties: { 'object-fit': 'contain' },
      })

      ctx.addRule({
        pattern: 'object-cover',
        properties: { 'object-fit': 'cover' },
      })

      ctx.addRule({
        pattern: 'object-fill',
        properties: { 'object-fit': 'fill' },
      })

      ctx.addRule({
        pattern: 'object-none',
        properties: { 'object-fit': 'none' },
      })

      ctx.addRule({
        pattern: 'object-scale-down',
        properties: { 'object-fit': 'scale-down' },
      })

      // ========================================
      // OBJECT POSITION
      // ========================================

      // Single value positions
      ctx.addRule({
        pattern: 'object-center',
        properties: { 'object-position': 'center' },
      })

      ctx.addRule({
        pattern: 'object-top',
        properties: { 'object-position': 'top' },
      })

      ctx.addRule({
        pattern: 'object-bottom',
        properties: { 'object-position': 'bottom' },
      })

      ctx.addRule({
        pattern: 'object-left',
        properties: { 'object-position': 'left' },
      })

      ctx.addRule({
        pattern: 'object-right',
        properties: { 'object-position': 'right' },
      })

      // Two value positions
      ctx.addRule({
        pattern: 'object-top-left',
        properties: { 'object-position': 'top left' },
      })

      ctx.addRule({
        pattern: 'object-top-right',
        properties: { 'object-position': 'top right' },
      })

      ctx.addRule({
        pattern: 'object-bottom-left',
        properties: { 'object-position': 'bottom left' },
      })

      ctx.addRule({
        pattern: 'object-bottom-right',
        properties: { 'object-position': 'bottom right' },
      })

      // Percentage positions
      const percentages = ['0', '25', '50', '75', '100']
      for (const x of percentages) {
        for (const y of percentages) {
          ctx.addRule({
            pattern: `object-position-${x}-${y}`,
            properties: { 'object-position': `${x}% ${y}%` },
          })
        }
      }

      // Arbitrary object position
      ctx.addRule({
        pattern: /^object-position-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { 'object-position': value.replace(/_/g, ' ') } }
        },
      })
    }
  }
}

export default objectFitPlugin
