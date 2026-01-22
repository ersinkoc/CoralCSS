/**
 * Table Utilities Plugin
 *
 * Table layout, border, and caption utilities.
 * Tailwind 4.1 compatible.
 *
 * @module plugins/core/utilities/tables
 */

import type { Plugin, PluginContext } from '../../../types'

/**
 * Table utilities plugin
 *
 * @example
 * ```html
 * <table class="table-auto border-collapse">
 *   <caption class="caption-bottom">Table caption</caption>
 *   <thead class="bg-gray-100">
 *     <tr>
 *       <th class="text-left">Column 1</th>
 *     </tr>
 *   </thead>
 * </table>
 * ```
 */
export function tablesPlugin(): Plugin {
  return {
    name: 'tables',
    version: '1.0.0',

    install(ctx: PluginContext) {
      // ========================================
      // TABLE LAYOUT
      // ========================================

      ctx.addRule({
        pattern: 'table-auto',
        properties: { 'table-layout': 'auto' },
      })

      ctx.addRule({
        pattern: 'table-fixed',
        properties: { 'table-layout': 'fixed' },
      })

      // ========================================
      // BORDER COLLAPSE
      // ========================================

      ctx.addRule({
        pattern: 'border-collapse',
        properties: { 'border-collapse': 'collapse' },
      })

      ctx.addRule({
        pattern: 'border-separate',
        properties: { 'border-collapse': 'separate' },
      })

      // ========================================
      // CAPTION SIDE
      // ========================================

      ctx.addRule({
        pattern: 'caption-top',
        properties: { 'caption-side': 'top' },
      })

      ctx.addRule({
        pattern: 'caption-bottom',
        properties: { 'caption-side': 'bottom' },
      })

      // ========================================
      // EMPTY CELLS
      // ========================================

      ctx.addRule({
        pattern: 'empty-cells-show',
        properties: { 'empty-cells': 'show' },
      })

      ctx.addRule({
        pattern: 'empty-cells-hide',
        properties: { 'empty-cells': 'hide' },
      })

      // ========================================
      // TABLE BORDER SPACING
      // ========================================

      ctx.addRule({
        pattern: 'border-spacing-0',
        properties: { 'border-spacing': '0px' },
      })

      ctx.addRule({
        pattern: 'border-spacing-1',
        properties: { 'border-spacing': '0.25rem' },
      })

      ctx.addRule({
        pattern: 'border-spacing-2',
        properties: { 'border-spacing': '0.5rem' },
      })

      ctx.addRule({
        pattern: 'border-spacing-4',
        properties: { 'border-spacing': '1rem' },
      })

      ctx.addRule({
        pattern: 'border-spacing-8',
        properties: { 'border-spacing': '2rem' },
      })

      // X and Y spacing
      ctx.addRule({
        pattern: /^border-spacing-x-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { 'border-spacing': `${value.replace(/_/g, ' ')} 0` } }
        },
      })

      ctx.addRule({
        pattern: /^border-spacing-y-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { 'border-spacing': `0 ${value.replace(/_/g, ' ')}` } }
        },
      })

      // Arbitrary border spacing
      ctx.addRule({
        pattern: /^border-spacing-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { 'border-spacing': value.replace(/_/g, ' ') } }
        },
      })

      // ========================================
      // TABLE ROW/VARIANT STYLES
      // ========================================

      // Stripe rows (even/odd)
      ctx.addRule({
        pattern: 'even:bg-gray-50',
        properties: { '&:even': { 'background-color': 'var(--color-gray-50)' } },
      })

      ctx.addRule({
        pattern: 'odd:bg-gray-50',
        properties: { '&:odd': { 'background-color': 'var(--color-gray-50)' } },
      })

      // Hover rows
      ctx.addRule({
        pattern: 'hover-row:bg-gray-100',
        properties: { '&:hover': { 'background-color': 'var(--color-gray-100)' } },
      })

      // ========================================
      // CELL ALIGNMENT
      // ========================================

      // Text align in cells
      const aligns = ['left', 'center', 'right', 'justify']
      for (const align of aligns) {
        ctx.addRule({
          pattern: `text-${align}`,
          properties: { 'text-align': align },
        })
      }

      // Vertical align in cells
      const verticalAligns = [
        'baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom'
      ]
      for (const align of verticalAligns) {
        ctx.addRule({
          pattern: `align-${align}`,
          properties: { 'vertical-align': align },
        })
      }

      // ========================================
      // CELL SPANNING
      // ========================================

      // Column span
      const colSpans = ['1', '2', '3', '4', '5', '6', 'full']
      for (const span of colSpans) {
        const value = span === 'full' ? 'all' : span
        ctx.addRule({
          pattern: `col-span-${span}`,
          properties: { 'grid-column': `span ${value} / span ${value}` },
        })
      }

      // Row span
      const rowSpans = ['1', '2', '3', '4', '5', '6', 'full']
      for (const span of rowSpans) {
        const value = span === 'full' ? 'all' : span
        ctx.addRule({
          pattern: `row-span-${span}`,
          properties: { 'grid-row': `span ${value} / span ${value}` },
        })
      }

      // Start/end column
      ctx.addRule({
        pattern: 'col-start-1',
        properties: { 'grid-column-start': '1' },
      })

      ctx.addRule({
        pattern: 'col-end-auto',
        properties: { 'grid-column-end': 'auto' },
      })

      // ========================================
      // TABLE WIDTH UTILITIES
      // ========================================

      ctx.addRule({
        pattern: 'w-table-fixed',
        properties: { 'table-layout': 'fixed', width: '100%' },
      })

      ctx.addRule({
        pattern: 'w-auto',
        properties: { width: 'auto' },
      })
    }
  }
}

export default tablesPlugin
