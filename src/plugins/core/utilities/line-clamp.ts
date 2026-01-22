/**
 * Line Clamp Utilities Plugin
 *
 * Truncate multi-line text with ellipsis.
 * Tailwind 4.1 compatible.
 *
 * @module plugins/core/utilities/line-clamp
 */

import type { Plugin, PluginContext } from '../../../types'

/**
 * Line clamp utilities plugin
 *
 * @example
 * ```html
 * <p class="line-clamp-3">
 *   Long text that will be truncated after 3 lines...
 * </p>
 *
 * <p class="line-clamp-none">
 *   Text won't be truncated
 * </p>
 * ```
 */
export function lineClampPlugin(): Plugin {
  return {
    name: 'line-clamp',
    version: '1.0.0',

    install(ctx: PluginContext) {
      // No line clamp (show all text)
      ctx.addRule({
        pattern: 'line-clamp-none',
        properties: {
          'display': 'block',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': 'unset',
          'overflow': 'visible',
        },
      })

      // Standard line clamps (1-10 lines)
      const lineCounts = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

      for (const count of lineCounts) {
        ctx.addRule({
          pattern: `line-clamp-${count}`,
          properties: {
            'display': '-webkit-box',
            '-webkit-box-orient': 'vertical',
            '-webkit-line-clamp': count,
            'overflow': 'hidden',
          },
        })
      }

      // Extended line clamps (12, 16, 20)
      const extendedCounts = ['12', '16', '20']
      for (const count of extendedCounts) {
        ctx.addRule({
          pattern: `line-clamp-${count}`,
          properties: {
            'display': '-webkit-box',
            '-webkit-box-orient': 'vertical',
            '-webkit-line-clamp': count,
            'overflow': 'hidden',
          },
        })
      }

      // Arbitrary line clamp
      ctx.addRule({
        pattern: /^line-clamp-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return {
            properties: {
              'display': '-webkit-box',
              '-webkit-box-orient': 'vertical',
              '-webkit-line-clamp': value,
              'overflow': 'hidden',
            },
          }
        },
      })

      // ========================================
      // TEXT OVERFLOW (Single Line)
      // ========================================

      ctx.addRule({
        pattern: 'truncate',
        properties: {
          'overflow': 'hidden',
          'text-overflow': 'ellipsis',
          'white-space': 'nowrap',
        },
      })

      ctx.addRule({
        pattern: 'text-ellipsis',
        properties: { 'text-overflow': 'ellipsis' },
      })

      ctx.addRule({
        pattern: 'text-clip',
        properties: { 'text-overflow': 'clip' },
      })

      // ========================================
      // TEXT WRAP & BREAK
      // ========================================

      ctx.addRule({
        pattern: 'text-wrap',
        properties: { 'text-wrap': 'wrap' },
      })

      ctx.addRule({
        pattern: 'text-nowrap',
        properties: { 'white-space': 'nowrap' },
      })

      ctx.addRule({
        pattern: 'text-balance',
        properties: { 'text-wrap': 'balance' },
      })

      ctx.addRule({
        pattern: 'text-pretty',
        properties: { 'text-wrap': 'pretty' },
      })

      ctx.addRule({
        pattern: 'break-normal',
        properties: {
          'overflow-wrap': 'normal',
          'word-break': 'normal',
        },
      })

      ctx.addRule({
        pattern: 'break-words',
        properties: { 'overflow-wrap': 'break-word' },
      })

      ctx.addRule({
        pattern: 'break-all',
        properties: { 'word-break': 'break-all' },
      })

      ctx.addRule({
        pattern: 'break-keep',
        properties: { 'word-break': 'keep-all' },
      })

      // ========================================
      // WHITE SPACE
      // ========================================

      ctx.addRule({
        pattern: 'whitespace-normal',
        properties: { 'white-space': 'normal' },
      })

      ctx.addRule({
        pattern: 'whitespace-nowrap',
        properties: { 'white-space': 'nowrap' },
      })

      ctx.addRule({
        pattern: 'whitespace-pre',
        properties: { 'white-space': 'pre' },
      })

      ctx.addRule({
        pattern: 'whitespace-pre-line',
        properties: { 'white-space': 'pre-line' },
      })

      ctx.addRule({
        pattern: 'whitespace-pre-wrap',
        properties: { 'white-space': 'pre-wrap' },
      })

      ctx.addRule({
        pattern: 'whitespace-break-spaces',
        properties: { 'white-space': 'break-spaces' },
      })
    }
  }
}

export default lineClampPlugin
