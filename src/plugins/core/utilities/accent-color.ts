/**
 * Accent Color Utilities Plugin
 *
 * Control the accent color for form controls (checkboxes, radio buttons, etc.).
 * Tailwind 4.1 compatible.
 *
 * @module plugins/core/utilities/accent-color
 */

import type { Plugin, PluginContext } from '../../../types'

/**
 * Accent color utilities plugin
 *
 * @example
 * ```html
 * <input type="checkbox" class="accent-coral-500" />
 *
 * <input type="radio" class="accent-blue-500" />
 * ```
 */
export function accentColorPlugin(): Plugin {
  return {
    name: 'accent-color',
    version: '1.0.0',

    install(ctx: PluginContext) {
      // Auto accent color (default)
      ctx.addRule({
        pattern: 'accent-auto',
        properties: { 'accent-color': 'auto' },
      })

      // Current color
      ctx.addRule({
        pattern: 'accent-current',
        properties: { 'accent-color': 'currentColor' },
      })

      // ========================================
      // COLOR PALETTE ACCENTS
      // ========================================

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
            pattern: `accent-${color}-${shade}`,
            properties: { 'accent-color': `var(--color-${color}-${shade})` },
          })
        }
      }

      // Basic colors
      ctx.addRule({
        pattern: 'accent-white',
        properties: { 'accent-color': '#ffffff' },
      })

      ctx.addRule({
        pattern: 'accent-black',
        properties: { 'accent-color': '#000000' },
      })

      ctx.addRule({
        pattern: 'accent-transparent',
        properties: { 'accent-color': 'transparent' },
      })

      // ========================================
      // ARBITRARY ACCENT COLOR
      // ========================================

      ctx.addRule({
        pattern: /^accent-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { 'accent-color': value.replace(/_/g, ' ') } }
        },
      })
    }
  }
}

export default accentColorPlugin
