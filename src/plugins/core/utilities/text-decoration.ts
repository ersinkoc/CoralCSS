/**
 * Text Decoration Utilities Plugin
 *
 * Underline, line-through, and text decoration styles.
 * Tailwind 4.1 compatible + enhanced features.
 *
 * @module plugins/core/utilities/text-decoration
 */

import type { Plugin, PluginContext } from '../../../types'

/**
 * Text decoration utilities plugin
 *
 * @example
 * ```html
 * <a class="underline underline-offset-4 hover:underline-wavy">
 *   Styled link
 * </a>
 *
 * <p class="line-through decoration-red-500">
 *   Strikethrough text
 * </p>
 * ```
 */
export function textDecorationPlugin(): Plugin {
  return {
    name: 'text-decoration',
    version: '1.0.0',

    install(ctx: PluginContext) {
      // ========================================
      // TEXT DECORATION LINE
      // ========================================

      ctx.addRule({
        pattern: 'underline',
        properties: { 'text-decoration-line': 'underline' },
      })

      ctx.addRule({
        pattern: 'overline',
        properties: { 'text-decoration-line': 'overline' },
      })

      ctx.addRule({
        pattern: 'line-through',
        properties: { 'text-decoration-line': 'line-through' },
      })

      ctx.addRule({
        pattern: 'no-underline',
        properties: { 'text-decoration-line': 'none' },
      })

      // Combined decorations
      ctx.addRule({
        pattern: 'underline-overline',
        properties: { 'text-decoration-line': 'underline overline' },
      })

      ctx.addRule({
        pattern: 'underline-through',
        properties: { 'text-decoration-line': 'underline line-through' },
      })

      // ========================================
      // TEXT DECORATION STYLE
      // ========================================

      ctx.addRule({
        pattern: 'decoration-solid',
        properties: { 'text-decoration-style': 'solid' },
      })

      ctx.addRule({
        pattern: 'decoration-double',
        properties: { 'text-decoration-style': 'double' },
      })

      ctx.addRule({
        pattern: 'decoration-dotted',
        properties: { 'text-decoration-style': 'dotted' },
      })

      ctx.addRule({
        pattern: 'decoration-dashed',
        properties: { 'text-decoration-style': 'dashed' },
      })

      ctx.addRule({
        pattern: 'decoration-wavy',
        properties: { 'text-decoration-style': 'wavy' },
      })

      // ========================================
      // TEXT DECORATION THICKNESS
      // ========================================

      const thicknesses = ['0', '1', '2', '4', '8']
      for (const t of thicknesses) {
        ctx.addRule({
          pattern: `decoration-${t}`,
          properties: { 'text-decoration-thickness': `${t}px` },
        })
      }

      ctx.addRule({
        pattern: 'decoration-auto',
        properties: { 'text-decoration-thickness': 'auto' },
      })

      ctx.addRule({
        pattern: 'decoration-from-font',
        properties: { 'text-decoration-thickness': 'from-font' },
      })

      // Arbitrary thickness
      ctx.addRule({
        pattern: /^decoration-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { 'text-decoration-thickness': value } }
        },
      })

      // ========================================
      // UNDERLINE OFFSET
      // ========================================

      const offsets = ['0', '1', '2', '4', '8', 'auto']
      for (const offset of offsets) {
        ctx.addRule({
          pattern: `underline-offset-${offset}`,
          properties: { 'text-underline-offset': offset === 'auto' ? 'auto' : `${offset}px` },
        })
      }

      // Arbitrary underline offset
      ctx.addRule({
        pattern: /^underline-offset-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { 'text-underline-offset': value } }
        },
      })

      // ========================================
      // TEXT DECORATION COLOR (Shortcut)
      // ========================================

      // Use existing color utilities with decoration prefix
      const colors = [
        'coral', 'slate', 'gray', 'zinc', 'neutral', 'stone',
        'red', 'orange', 'amber', 'yellow', 'lime', 'green',
        'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo',
        'violet', 'purple', 'fuchsia', 'pink', 'rose',
        'white', 'black', 'transparent', 'current',
      ]

      const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']

      for (const color of colors) {
        for (const shade of shades) {
          ctx.addRule({
            pattern: `decoration-${color}-${shade}`,
            properties: { 'text-decoration-color': `var(--color-${color}-${shade})` },
          })
        }
      }

      // ========================================
      // TEXT EMPHASIS (Additional)
      // ========================================

      ctx.addRule({
        pattern: 'emphasis-dot',
        properties: {
          'text-emphasis-style': 'dot',
          'text-emphasis-position': 'under',
        },
      })

      ctx.addRule({
        pattern: 'emphasis-circle',
        properties: {
          'text-emphasis-style': 'circle',
          'text-emphasis-position': 'under',
        },
      })

      ctx.addRule({
        pattern: 'emphasis-double-circle',
        properties: {
          'text-emphasis-style': 'double-circle',
          'text-emphasis-position': 'under',
        },
      })

      ctx.addRule({
        pattern: 'emphasis-triangle',
        properties: {
          'text-emphasis-style': 'triangle',
          'text-emphasis-position': 'under',
        },
      })

      ctx.addRule({
        pattern: 'emphasis-sesame',
        properties: {
          'text-emphasis-style': 'sesame',
          'text-emphasis-position': 'under',
        },
      })

      ctx.addRule({
        pattern: 'emphasis-none',
        properties: { 'text-emphasis': 'none' },
      })
    }
  }
}

export default textDecorationPlugin
