/**
 * Caret Color & Place Utilities Plugin
 *
 * Text caret/input cursor color and CSS place-* shorthand properties.
 *
 * @module plugins/core/utilities/caret-place
 */

import type { Plugin, PluginContext } from '../../../types'

/**
 * Caret color & place utilities plugin
 *
 * @example
 * ```html
 * <input class="caret-coral-500" />
 *
 * <div class="place-items-center">
 *   Centered content
 * </div>
 * ```
 */
export function caretPlacePlugin(): Plugin {
  return {
    name: 'caret-place',
    version: '1.0.0',

    install(ctx: PluginContext) {
      // ========================================
      // CARET COLOR
      // ========================================

      ctx.addRule({
        pattern: 'caret-auto',
        properties: { 'caret-color': 'auto' },
      })

      ctx.addRule({
        pattern: 'caret-current',
        properties: { 'caret-color': 'currentColor' },
      })

      // Color palette caret colors
      const colors = [
        'coral', 'slate', 'gray', 'zinc', 'neutral', 'stone',
        'red', 'orange', 'amber', 'yellow', 'lime', 'green',
        'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo',
        'violet', 'purple', 'fuchsia', 'pink', 'rose',
      ]

      const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']

      for (const color of colors) {
        for (const shade of shades) {
          ctx.addRule({
            pattern: `caret-${color}-${shade}`,
            properties: { 'caret-color': `var(--color-${color}-${shade})` },
          })
        }
      }

      ctx.addRule({
        pattern: 'caret-white',
        properties: { 'caret-color': '#ffffff' },
      })

      ctx.addRule({
        pattern: 'caret-black',
        properties: { 'caret-color': '#000000' },
      })

      // Arbitrary caret color
      ctx.addRule({
        pattern: /^caret-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { 'caret-color': value.replace(/_/g, ' ') } }
        },
      })

      // ========================================
      // PLACE UTILITIES (Shorthand)
      // ========================================

      // Place items (align-items + justify-items)
      const placeValues = ['start', 'end', 'center', 'stretch', 'baseline']
      for (const value of placeValues) {
        ctx.addRule({
          pattern: `place-items-${value}`,
          properties: { 'place-items': value },
        })
      }

      // Place self (align-self + justify-self)
      for (const value of placeValues) {
        ctx.addRule({
          pattern: `place-self-${value}`,
          properties: { 'place-self': value },
        })
      }

      // Place content (align-content + justify-content)
      const placeContentValues = ['center', 'start', 'end', 'between', 'around', 'evenly', 'stretch', 'baseline']
      for (const value of placeContentValues) {
        ctx.addRule({
          pattern: `place-content-${value}`,
          properties: { 'place-content': value },
        })
      }

      // Arbitrary place values
      ctx.addRule({
        pattern: /^place-items-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { 'place-items': value.replace(/_/g, ' ') } }
        },
      })

      ctx.addRule({
        pattern: /^place-self-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { 'place-self': value.replace(/_/g, ' ') } }
        },
      })

      ctx.addRule({
        pattern: /^place-content-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { 'place-content': value.replace(/_/g, ' ') } }
        },
      })
    }
  }
}

export default caretPlacePlugin
