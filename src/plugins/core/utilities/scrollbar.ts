/**
 * Scrollbar Utilities Plugin
 *
 * Custom scrollbar styling for WebKit and Firefox.
 *
 * @module plugins/core/utilities/scrollbar
 */

import type { Plugin, PluginContext } from '../../../types'

/**
 * Scrollbar utilities plugin
 *
 * @example
 * ```html
 * <div class="scrollbar-thin scrollbar-thumb-coral-500 scrollbar-track-gray-100">
 *   Content with custom scrollbar
 * </div>
 *
 * <div class="scrollbar-none">
 *   Hidden scrollbar
 * </div>
 * ```
 */
export function scrollbarPlugin(): Plugin {
  return {
    name: 'scrollbar',
    version: '1.0.0',

    install(ctx: PluginContext) {
      // ========================================
      // SCROLLBAR WIDTH (Firefox)
      // ========================================

      ctx.addRule({
        pattern: 'scrollbar-auto',
        properties: { 'scrollbar-width': 'auto' },
      })

      ctx.addRule({
        pattern: 'scrollbar-thin',
        properties: { 'scrollbar-width': 'thin' },
      })

      ctx.addRule({
        pattern: 'scrollbar-none',
        properties: { 'scrollbar-width': 'none' },
      })

      // ========================================
      // SCROLLBAR COLOR (Firefox)
      // ========================================

      // Scrollbar thumb and track colors
      const colors = [
        'coral', 'slate', 'gray', 'zinc', 'neutral', 'stone',
        'red', 'orange', 'amber', 'yellow', 'lime', 'green',
        'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo',
        'violet', 'purple', 'fuchsia', 'pink', 'rose',
      ]

      const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']

      for (const color of colors) {
        for (const shade of shades) {
          // Thumb color
          ctx.addRule({
            pattern: `scrollbar-thumb-${color}-${shade}`,
            properties: {
              'scrollbar-color': `var(--color-${color}-${shade}) auto`,
            },
          })

          // Track color
          ctx.addRule({
            pattern: `scrollbar-track-${color}-${shade}`,
            properties: {
              'scrollbar-color': `auto var(--color-${color}-${shade})`,
            },
          })
        }
      }

      // Arbitrary scrollbar color
      ctx.addRule({
        pattern: /^scrollbar-color-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          const [thumb, track] = value.split(',').map(v => v.trim())
          return { properties: { 'scrollbar-color': `${thumb} ${track || 'auto'}` } }
        },
      })

      // ========================================
      // WEBKIT SCROLLBAR STYLING
      // ========================================

      // Hide WebKit scrollbar
      ctx.addRule({
        pattern: 'scrollbar-hide',
        properties: {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        },
      })

      // WebKit scrollbar width
      ctx.addRule({
        pattern: 'scrollbar-w-0',
        properties: { '&::-webkit-scrollbar': { width: '0px' } },
      })

      ctx.addRule({
        pattern: 'scrollbar-w-1',
        properties: { '&::-webkit-scrollbar': { width: '4px' } },
      })

      ctx.addRule({
        pattern: 'scrollbar-w-2',
        properties: { '&::-webkit-scrollbar': { width: '8px' } },
      })

      ctx.addRule({
        pattern: 'scrollbar-w-4',
        properties: { '&::-webkit-scrollbar': { width: '16px' } },
      })

      ctx.addRule({
        pattern: 'scrollbar-h-1',
        properties: { '&::-webkit-scrollbar': { height: '4px' } },
      })

      ctx.addRule({
        pattern: 'scrollbar-h-2',
        properties: { '&::-webkit-scrollbar': { height: '8px' } },
      })

      ctx.addRule({
        pattern: 'scrollbar-h-4',
        properties: { '&::-webkit-scrollbar': { height: '16px' } },
      })

      // WebKit scrollbar thumb
      for (const color of colors) {
        for (const shade of shades) {
          ctx.addRule({
            pattern: `scrollbar-track-${color}-${shade}`,
            properties: {
              '&::-webkit-scrollbar-track': {
                'background-color': `var(--color-${color}-${shade})`,
              },
            },
          })

          ctx.addRule({
            pattern: `scrollbar-thumb-${color}-${shade}`,
            properties: {
              '&::-webkit-scrollbar-thumb': {
                'background-color': `var(--color-${color}-${shade})`,
              },
            },
          })

          // Hover state
          ctx.addRule({
            pattern: `scrollbar-thumb-${color}-${shade}\\:hover`,
            properties: {
              '&::-webkit-scrollbar-thumb:hover': {
                'background-color': `var(--color-${color}-${shade})`,
              },
            },
          })
        }
      }

      // Scrollbar thumb radius
      const radii = ['none', 'sm', 'md', 'lg', 'full']
      for (const radius of radii) {
        ctx.addRule({
          pattern: `scrollbar-thumb-rounded-${radius}`,
          properties: {
            '&::-webkit-scrollbar-thumb': { 'border-radius': radius === 'full' ? '9999px' : radius === 'none' ? '0' : radius },
          },
        })
      }

      // Scrollbar track radius
      for (const radius of radii) {
        ctx.addRule({
          pattern: `scrollbar-track-rounded-${radius}`,
          properties: {
            '&::-webkit-scrollbar-track': { 'border-radius': radius === 'full' ? '9999px' : radius === 'none' ? '0' : radius },
          },
        })
      }

      // Arbitrary scrollbar styles
      ctx.addRule({
        pattern: /^scrollbar-thumb-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          const parts = value.split(':')
          const propName = parts[0] ?? 'background'
          const propValue = parts[1] ?? value
          return {
            properties: {
              '&::-webkit-scrollbar-thumb': { [propName]: propValue },
            },
          }
        },
      })

      // ========================================
      // SCROLLBAR GUTTER
      // ========================================

      // Scrollbar gutter (stable/non-stable)
      ctx.addRule({
        pattern: 'scrollbar-gutter-stable',
        properties: { 'scrollbar-gutter': 'stable' },
      })

      ctx.addRule({
        pattern: 'scrollbar-gutter-auto',
        properties: { 'scrollbar-gutter': 'auto' },
      })
    }
  }
}

export default scrollbarPlugin
