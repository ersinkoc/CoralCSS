/**
 * Print Utilities Plugin
 *
 * Print-specific utilities for controlling page breaks,
 * print visibility, and print-optimized layouts.
 * @module plugins/core/utilities/print
 */

import type { Plugin, Rule, PluginContext } from '../../../types'

/**
 * Print utilities plugin
 */
export function printPlugin(): Plugin {
  return {
    name: 'print',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // ========================================
      // PAGE BREAK (Legacy & Modern)
      // ========================================

      // Break before
      rules.push({ pattern: 'break-before-auto', properties: { 'break-before': 'auto' } })
      rules.push({ pattern: 'break-before-avoid', properties: { 'break-before': 'avoid' } })
      rules.push({ pattern: 'break-before-all', properties: { 'break-before': 'all' } })
      rules.push({ pattern: 'break-before-avoid-page', properties: { 'break-before': 'avoid-page' } })
      rules.push({ pattern: 'break-before-page', properties: { 'break-before': 'page' } })
      rules.push({ pattern: 'break-before-left', properties: { 'break-before': 'left' } })
      rules.push({ pattern: 'break-before-right', properties: { 'break-before': 'right' } })
      rules.push({ pattern: 'break-before-recto', properties: { 'break-before': 'recto' } })
      rules.push({ pattern: 'break-before-verso', properties: { 'break-before': 'verso' } })
      rules.push({ pattern: 'break-before-column', properties: { 'break-before': 'column' } })
      rules.push({ pattern: 'break-before-avoid-column', properties: { 'break-before': 'avoid-column' } })
      rules.push({ pattern: 'break-before-region', properties: { 'break-before': 'region' } })
      rules.push({ pattern: 'break-before-avoid-region', properties: { 'break-before': 'avoid-region' } })

      // Break after
      rules.push({ pattern: 'break-after-auto', properties: { 'break-after': 'auto' } })
      rules.push({ pattern: 'break-after-avoid', properties: { 'break-after': 'avoid' } })
      rules.push({ pattern: 'break-after-all', properties: { 'break-after': 'all' } })
      rules.push({ pattern: 'break-after-avoid-page', properties: { 'break-after': 'avoid-page' } })
      rules.push({ pattern: 'break-after-page', properties: { 'break-after': 'page' } })
      rules.push({ pattern: 'break-after-left', properties: { 'break-after': 'left' } })
      rules.push({ pattern: 'break-after-right', properties: { 'break-after': 'right' } })
      rules.push({ pattern: 'break-after-recto', properties: { 'break-after': 'recto' } })
      rules.push({ pattern: 'break-after-verso', properties: { 'break-after': 'verso' } })
      rules.push({ pattern: 'break-after-column', properties: { 'break-after': 'column' } })
      rules.push({ pattern: 'break-after-avoid-column', properties: { 'break-after': 'avoid-column' } })
      rules.push({ pattern: 'break-after-region', properties: { 'break-after': 'region' } })
      rules.push({ pattern: 'break-after-avoid-region', properties: { 'break-after': 'avoid-region' } })

      // Break inside
      rules.push({ pattern: 'break-inside-auto', properties: { 'break-inside': 'auto' } })
      rules.push({ pattern: 'break-inside-avoid', properties: { 'break-inside': 'avoid' } })
      rules.push({ pattern: 'break-inside-avoid-page', properties: { 'break-inside': 'avoid-page' } })
      rules.push({ pattern: 'break-inside-avoid-column', properties: { 'break-inside': 'avoid-column' } })
      rules.push({ pattern: 'break-inside-avoid-region', properties: { 'break-inside': 'avoid-region' } })

      // ========================================
      // PAGE PROPERTIES
      // ========================================

      // Page size
      rules.push({ pattern: 'page-auto', properties: { 'page': 'auto' } })
      rules.push({ pattern: 'page-a3', properties: { 'size': 'A3' } })
      rules.push({ pattern: 'page-a4', properties: { 'size': 'A4' } })
      rules.push({ pattern: 'page-a5', properties: { 'size': 'A5' } })
      rules.push({ pattern: 'page-b4', properties: { 'size': 'B4' } })
      rules.push({ pattern: 'page-b5', properties: { 'size': 'B5' } })
      rules.push({ pattern: 'page-letter', properties: { 'size': 'letter' } })
      rules.push({ pattern: 'page-legal', properties: { 'size': 'legal' } })
      rules.push({ pattern: 'page-ledger', properties: { 'size': 'ledger' } })

      // Page orientation
      rules.push({ pattern: 'page-portrait', properties: { 'size': 'portrait' } })
      rules.push({ pattern: 'page-landscape', properties: { 'size': 'landscape' } })

      // ========================================
      // PRINT COLOR ADJUST
      // ========================================

      rules.push({ pattern: 'print-color-adjust-exact', properties: { 'print-color-adjust': 'exact', '-webkit-print-color-adjust': 'exact' } })
      rules.push({ pattern: 'print-color-adjust-economy', properties: { 'print-color-adjust': 'economy', '-webkit-print-color-adjust': 'economy' } })

      // Forced print colors (for backgrounds and borders)
      rules.push({ pattern: 'forced-color-adjust-auto', properties: { 'forced-color-adjust': 'auto' } })
      rules.push({ pattern: 'forced-color-adjust-none', properties: { 'forced-color-adjust': 'none' } })

      // ========================================
      // PRINT VISIBILITY (use with print: variant)
      // ========================================

      // These are base utilities - use with print: variant for print-specific behavior
      // Example: print:block (shows in print), print:hidden (hides in print)

      // Print-optimized display utilities
      rules.push({ pattern: 'print-block', properties: { display: 'block' } })
      rules.push({ pattern: 'print-inline', properties: { display: 'inline' } })
      rules.push({ pattern: 'print-inline-block', properties: { display: 'inline-block' } })
      rules.push({ pattern: 'print-flex', properties: { display: 'flex' } })
      rules.push({ pattern: 'print-grid', properties: { display: 'grid' } })
      rules.push({ pattern: 'print-table', properties: { display: 'table' } })
      rules.push({ pattern: 'print-hidden', properties: { display: 'none' } })

      // ========================================
      // PRINT-OPTIMIZED UTILITIES
      // ========================================

      // Text color for print (ensure readability)
      rules.push({ pattern: 'print-text-black', properties: { color: '#000000' } })
      rules.push({ pattern: 'print-text-gray', properties: { color: '#333333' } })

      // Background removal for print
      rules.push({ pattern: 'print-bg-transparent', properties: { 'background-color': 'transparent' } })
      rules.push({ pattern: 'print-bg-white', properties: { 'background-color': '#ffffff' } })

      // Border adjustments for print
      rules.push({ pattern: 'print-border-none', properties: { 'border-width': '0' } })
      rules.push({ pattern: 'print-border-black', properties: { 'border-color': '#000000' } })

      // Shadow removal for print
      rules.push({ pattern: 'print-shadow-none', properties: { 'box-shadow': 'none' } })

      // Full width for print
      rules.push({ pattern: 'print-w-full', properties: { width: '100%' } })
      rules.push({ pattern: 'print-max-w-none', properties: { 'max-width': 'none' } })

      // ========================================
      // LINK STYLING FOR PRINT
      // ========================================

      // Show URL after links in print
      rules.push({
        pattern: 'print-link-url',
        selector: (s) => `${s} a[href]::after`,
        properties: { content: '" (" attr(href) ")"' },
      })

      // Hide URL for specific links
      rules.push({
        pattern: 'print-link-no-url',
        selector: (s) => `${s} a[href]::after`,
        properties: { content: 'none' },
      })

      // ========================================
      // WIDOWS & ORPHANS (Print Pagination)
      // ========================================

      rules.push({ pattern: 'widows-1', properties: { widows: '1' } })
      rules.push({ pattern: 'widows-2', properties: { widows: '2' } })
      rules.push({ pattern: 'widows-3', properties: { widows: '3' } })
      rules.push({ pattern: 'widows-4', properties: { widows: '4' } })
      rules.push({ pattern: 'widows-5', properties: { widows: '5' } })

      rules.push({
        pattern: /^widows-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { widows: v } }
        },
      })

      rules.push({ pattern: 'orphans-1', properties: { orphans: '1' } })
      rules.push({ pattern: 'orphans-2', properties: { orphans: '2' } })
      rules.push({ pattern: 'orphans-3', properties: { orphans: '3' } })
      rules.push({ pattern: 'orphans-4', properties: { orphans: '4' } })
      rules.push({ pattern: 'orphans-5', properties: { orphans: '5' } })

      rules.push({
        pattern: /^orphans-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { orphans: v } }
        },
      })

      // ========================================
      // BOX DECORATION BREAK
      // ========================================

      rules.push({ pattern: 'box-decoration-clone', properties: { 'box-decoration-break': 'clone', '-webkit-box-decoration-break': 'clone' } })
      rules.push({ pattern: 'box-decoration-slice', properties: { 'box-decoration-break': 'slice', '-webkit-box-decoration-break': 'slice' } })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default printPlugin
