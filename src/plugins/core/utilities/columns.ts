/**
 * CSS Columns Utilities Plugin
 *
 * Multi-column layout utilities for newspaper-style text flow.
 * @module plugins/core/utilities/columns
 */

import type { Plugin, Rule, PluginContext, CSSProperties } from '../../../types'

/**
 * Columns utilities plugin
 */
export function columnsPlugin(): Plugin {
  return {
    name: 'columns',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // ========================================
      // COLUMN COUNT
      // ========================================

      rules.push({ pattern: 'columns-1', properties: { 'column-count': '1' } })
      rules.push({ pattern: 'columns-2', properties: { 'column-count': '2' } })
      rules.push({ pattern: 'columns-3', properties: { 'column-count': '3' } })
      rules.push({ pattern: 'columns-4', properties: { 'column-count': '4' } })
      rules.push({ pattern: 'columns-5', properties: { 'column-count': '5' } })
      rules.push({ pattern: 'columns-6', properties: { 'column-count': '6' } })
      rules.push({ pattern: 'columns-7', properties: { 'column-count': '7' } })
      rules.push({ pattern: 'columns-8', properties: { 'column-count': '8' } })
      rules.push({ pattern: 'columns-9', properties: { 'column-count': '9' } })
      rules.push({ pattern: 'columns-10', properties: { 'column-count': '10' } })
      rules.push({ pattern: 'columns-11', properties: { 'column-count': '11' } })
      rules.push({ pattern: 'columns-12', properties: { 'column-count': '12' } })
      rules.push({ pattern: 'columns-auto', properties: { 'column-count': 'auto' } })

      rules.push({
        pattern: /^columns-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          // Check if it's a number (column count) or a width
          if (/^\d+$/.test(v)) {
            return { properties: { 'column-count': v } as CSSProperties }
          }
          return { properties: { 'column-width': v } as CSSProperties }
        },
      })

      // ========================================
      // COLUMN WIDTH
      // ========================================

      rules.push({ pattern: 'col-w-auto', properties: { 'column-width': 'auto' } })
      rules.push({ pattern: 'col-w-3xs', properties: { 'column-width': '16rem' } })
      rules.push({ pattern: 'col-w-2xs', properties: { 'column-width': '18rem' } })
      rules.push({ pattern: 'col-w-xs', properties: { 'column-width': '20rem' } })
      rules.push({ pattern: 'col-w-sm', properties: { 'column-width': '24rem' } })
      rules.push({ pattern: 'col-w-md', properties: { 'column-width': '28rem' } })
      rules.push({ pattern: 'col-w-lg', properties: { 'column-width': '32rem' } })
      rules.push({ pattern: 'col-w-xl', properties: { 'column-width': '36rem' } })
      rules.push({ pattern: 'col-w-2xl', properties: { 'column-width': '42rem' } })
      rules.push({ pattern: 'col-w-3xl', properties: { 'column-width': '48rem' } })
      rules.push({ pattern: 'col-w-4xl', properties: { 'column-width': '56rem' } })
      rules.push({ pattern: 'col-w-5xl', properties: { 'column-width': '64rem' } })
      rules.push({ pattern: 'col-w-6xl', properties: { 'column-width': '72rem' } })
      rules.push({ pattern: 'col-w-7xl', properties: { 'column-width': '80rem' } })

      rules.push({
        pattern: /^col-w-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'column-width': v } }
        },
      })

      // ========================================
      // COLUMN GAP
      // ========================================

      rules.push({ pattern: 'col-gap-0', properties: { 'column-gap': '0' } })
      rules.push({ pattern: 'col-gap-px', properties: { 'column-gap': '1px' } })
      rules.push({ pattern: 'col-gap-0.5', properties: { 'column-gap': '0.125rem' } })
      rules.push({ pattern: 'col-gap-1', properties: { 'column-gap': '0.25rem' } })
      rules.push({ pattern: 'col-gap-1.5', properties: { 'column-gap': '0.375rem' } })
      rules.push({ pattern: 'col-gap-2', properties: { 'column-gap': '0.5rem' } })
      rules.push({ pattern: 'col-gap-2.5', properties: { 'column-gap': '0.625rem' } })
      rules.push({ pattern: 'col-gap-3', properties: { 'column-gap': '0.75rem' } })
      rules.push({ pattern: 'col-gap-3.5', properties: { 'column-gap': '0.875rem' } })
      rules.push({ pattern: 'col-gap-4', properties: { 'column-gap': '1rem' } })
      rules.push({ pattern: 'col-gap-5', properties: { 'column-gap': '1.25rem' } })
      rules.push({ pattern: 'col-gap-6', properties: { 'column-gap': '1.5rem' } })
      rules.push({ pattern: 'col-gap-7', properties: { 'column-gap': '1.75rem' } })
      rules.push({ pattern: 'col-gap-8', properties: { 'column-gap': '2rem' } })
      rules.push({ pattern: 'col-gap-9', properties: { 'column-gap': '2.25rem' } })
      rules.push({ pattern: 'col-gap-10', properties: { 'column-gap': '2.5rem' } })
      rules.push({ pattern: 'col-gap-11', properties: { 'column-gap': '2.75rem' } })
      rules.push({ pattern: 'col-gap-12', properties: { 'column-gap': '3rem' } })
      rules.push({ pattern: 'col-gap-14', properties: { 'column-gap': '3.5rem' } })
      rules.push({ pattern: 'col-gap-16', properties: { 'column-gap': '4rem' } })
      rules.push({ pattern: 'col-gap-20', properties: { 'column-gap': '5rem' } })
      rules.push({ pattern: 'col-gap-24', properties: { 'column-gap': '6rem' } })
      rules.push({ pattern: 'col-gap-28', properties: { 'column-gap': '7rem' } })
      rules.push({ pattern: 'col-gap-32', properties: { 'column-gap': '8rem' } })
      rules.push({ pattern: 'col-gap-normal', properties: { 'column-gap': 'normal' } })

      rules.push({
        pattern: /^col-gap-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'column-gap': v } }
        },
      })

      // ========================================
      // COLUMN RULE (Divider between columns)
      // ========================================

      // Column rule width
      rules.push({ pattern: 'col-rule-0', properties: { 'column-rule-width': '0' } })
      rules.push({ pattern: 'col-rule', properties: { 'column-rule-width': '1px' } })
      rules.push({ pattern: 'col-rule-2', properties: { 'column-rule-width': '2px' } })
      rules.push({ pattern: 'col-rule-4', properties: { 'column-rule-width': '4px' } })
      rules.push({ pattern: 'col-rule-8', properties: { 'column-rule-width': '8px' } })

      rules.push({
        pattern: /^col-rule-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'column-rule-width': v } }
        },
      })

      // Column rule style
      rules.push({ pattern: 'col-rule-none', properties: { 'column-rule-style': 'none' } })
      rules.push({ pattern: 'col-rule-solid', properties: { 'column-rule-style': 'solid' } })
      rules.push({ pattern: 'col-rule-dashed', properties: { 'column-rule-style': 'dashed' } })
      rules.push({ pattern: 'col-rule-dotted', properties: { 'column-rule-style': 'dotted' } })
      rules.push({ pattern: 'col-rule-double', properties: { 'column-rule-style': 'double' } })
      rules.push({ pattern: 'col-rule-groove', properties: { 'column-rule-style': 'groove' } })
      rules.push({ pattern: 'col-rule-ridge', properties: { 'column-rule-style': 'ridge' } })
      rules.push({ pattern: 'col-rule-inset', properties: { 'column-rule-style': 'inset' } })
      rules.push({ pattern: 'col-rule-outset', properties: { 'column-rule-style': 'outset' } })
      rules.push({ pattern: 'col-rule-hidden', properties: { 'column-rule-style': 'hidden' } })

      // Column rule color
      rules.push({ pattern: 'col-rule-transparent', properties: { 'column-rule-color': 'transparent' } })
      rules.push({ pattern: 'col-rule-current', properties: { 'column-rule-color': 'currentColor' } })
      rules.push({ pattern: 'col-rule-black', properties: { 'column-rule-color': '#000000' } })
      rules.push({ pattern: 'col-rule-white', properties: { 'column-rule-color': '#ffffff' } })
      rules.push({ pattern: 'col-rule-gray-100', properties: { 'column-rule-color': '#f3f4f6' } })
      rules.push({ pattern: 'col-rule-gray-200', properties: { 'column-rule-color': '#e5e7eb' } })
      rules.push({ pattern: 'col-rule-gray-300', properties: { 'column-rule-color': '#d1d5db' } })
      rules.push({ pattern: 'col-rule-gray-400', properties: { 'column-rule-color': '#9ca3af' } })
      rules.push({ pattern: 'col-rule-gray-500', properties: { 'column-rule-color': '#6b7280' } })
      rules.push({ pattern: 'col-rule-gray-600', properties: { 'column-rule-color': '#4b5563' } })
      rules.push({ pattern: 'col-rule-gray-700', properties: { 'column-rule-color': '#374151' } })
      rules.push({ pattern: 'col-rule-gray-800', properties: { 'column-rule-color': '#1f2937' } })
      rules.push({ pattern: 'col-rule-gray-900', properties: { 'column-rule-color': '#111827' } })

      // Primary colors for column rule
      rules.push({ pattern: 'col-rule-coral', properties: { 'column-rule-color': 'var(--coral-primary, #ff6b6b)' } })
      rules.push({ pattern: 'col-rule-primary', properties: { 'column-rule-color': 'var(--coral-primary, #ff6b6b)' } })

      rules.push({
        pattern: /^col-rule-color-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'column-rule-color': v } }
        },
      })

      // ========================================
      // COLUMN SPAN
      // ========================================

      rules.push({ pattern: 'col-span-none', properties: { 'column-span': 'none' } })
      rules.push({ pattern: 'col-span-all', properties: { 'column-span': 'all' } })

      // ========================================
      // COLUMN FILL
      // ========================================

      rules.push({ pattern: 'col-fill-auto', properties: { 'column-fill': 'auto' } })
      rules.push({ pattern: 'col-fill-balance', properties: { 'column-fill': 'balance' } })
      rules.push({ pattern: 'col-fill-balance-all', properties: { 'column-fill': 'balance-all' } })

      // ========================================
      // SHORTHAND COLUMNS
      // ========================================

      // Combined count and width
      rules.push({ pattern: 'columns-2xs', properties: { columns: '2 16rem' } })
      rules.push({ pattern: 'columns-xs', properties: { columns: '2 20rem' } })
      rules.push({ pattern: 'columns-sm', properties: { columns: '3 24rem' } })
      rules.push({ pattern: 'columns-md', properties: { columns: '3 28rem' } })
      rules.push({ pattern: 'columns-lg', properties: { columns: '4 32rem' } })
      rules.push({ pattern: 'columns-xl', properties: { columns: '4 36rem' } })
      rules.push({ pattern: 'columns-2xl', properties: { columns: '5 42rem' } })
      rules.push({ pattern: 'columns-3xl', properties: { columns: '6 48rem' } })

      // ========================================
      // COMMON COLUMN PATTERNS
      // ========================================

      // Newspaper-style layout
      rules.push({
        pattern: 'columns-newspaper',
        properties: {
          'column-count': '3',
          'column-gap': '2rem',
          'column-rule': '1px solid #e5e7eb',
        },
      })

      // Magazine-style layout
      rules.push({
        pattern: 'columns-magazine',
        properties: {
          'column-count': '2',
          'column-gap': '3rem',
          'column-rule': 'none',
        },
      })

      // Masonry-like with columns
      rules.push({
        pattern: 'columns-masonry',
        properties: {
          'column-count': '3',
          'column-gap': '1rem',
          'column-fill': 'balance',
        },
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default columnsPlugin
