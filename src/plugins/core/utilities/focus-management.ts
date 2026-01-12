/**
 * Focus Management Utilities Plugin
 *
 * Enhanced focus management utilities for better accessibility and UX.
 * Includes focus-visible utilities, focus indicators, and focus-related CSS.
 *
 * @module plugins/core/utilities/focus-management
 */

import type { Plugin, Rule, PluginContext } from '../../../types'

/**
 * Focus management utilities plugin for CoralCSS
 *
 * Features:
 * - Focus-visible ring utilities
 * - Focus offset and inset control
 * - Focus indicators
 * - Focus order utilities
 * - Skip link utilities
 *
 * @example
 * ```html
 * <button class="focus-visible-ring-2 focus-visible-ring-coral-500">
 *   Accessible button
 * </button>
 * ```
 */
export function focusManagementPlugin(): Plugin {
  return {
    name: 'focus-management',
    version: '1.0.0',
    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // ========================================
      // FOCUS-VISIBLE RING UTILITIES
      // ========================================

      // Focus visible ring sizes
      const ringSizes = ['0', '1', '2', '4', '8']
      for (const size of ringSizes) {
        rules.push({
          pattern: `focus-visible-ring-${size}`,
          properties: {
            '--coral-ring-offset-width': '0px',
            '--coral-ring-width': `${size}px`
          }
        })

        // With offset
        rules.push({
          pattern: `focus-visible-ring-${size}-offset-${size}`,
          properties: {
            '--coral-ring-offset-width': `${size}px`,
            '--coral-ring-width': `${size}px`
          }
        })
      }

      // Focus visible ring colors
      const colors = [
        'coral', 'red', 'orange', 'amber', 'yellow', 'lime', 'green',
        'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet',
        'purple', 'fuchsia', 'pink', 'rose', 'slate', 'gray', 'zinc',
        'neutral', 'stone'
      ]

      for (const color of colors) {
        for (const shade of ['400', '500', '600']) {
          rules.push({
            pattern: `focus-visible-ring-${color}-${shade}`,
            properties: {
              '--coral-ring-color': `var(--color-${color}-${shade})`
            }
          })
        }
      }

      // ========================================
      // FOCUS-VISIBLE OUTLINE UTILITIES
      // ========================================

      rules.push({
        pattern: 'focus-visible-outline-none',
        properties: { outline: 'none' }
      })
      rules.push({
        pattern: 'focus-visible-outline-auto',
        properties: { outline: 'auto' }
      })

      const outlineStyles = ['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge']
      for (const style of outlineStyles) {
        rules.push({
          pattern: `focus-visible-outline-${style}`,
          properties: { 'outline-style': style }
        })
      }

      const outlineWidths = ['0', '1', '2', '4', '8']
      for (const width of outlineWidths) {
        rules.push({
          pattern: `focus-visible-outline-${width}`,
          properties: { 'outline-width': `${width}px` }
        })
      }

      // ========================================
      // FOCUS OFFSET UTILITIES
      // ========================================

      const offsets = ['0', '1', '2', '4', '8', '12', '16']
      for (const offset of offsets) {
        rules.push({
          pattern: `focus-visible-offset-${offset}`,
          properties: { '--coral-ring-offset-width': `${offset}px` }
        })
      }

      // ========================================
      // FOCUS INSET UTILITIES
      // ========================================

      rules.push({
        pattern: 'focus-visible-inset',
        properties: { '--coral-ring-inset': 'inset' }
      })
      rules.push({
        pattern: 'focus-visible-inset-0',
        properties: { '--coral-ring-inset': '' }
      })

      // ========================================
      // FOCUS INDICATOR UTILITIES
      // ========================================

      // Focus indicator visibility
      rules.push({
        pattern: 'focus-visible',
        properties: {}
      })

      rules.push({
        pattern: 'focus-visible-auto',
        properties: {}
      })

      // Focus indicator styles
      rules.push({
        pattern: 'focus-indicator-ring',
        properties: {
          'box-shadow': '0 0 0 2px var(--focus-indicator-color, currentColor)'
        }
      })

      rules.push({
        pattern: 'focus-indicator-ring-offset',
        properties: {
          'box-shadow': '0 0 0 2px var(--focus-indicator-bg, white), 0 0 0 4px var(--focus-indicator-color, currentColor)'
        }
      })

      // Focus indicator sizing
      const indicatorSizes = ['1', '2', '3', '4', '6', '8']
      for (const size of indicatorSizes) {
        rules.push({
          pattern: `focus-indicator-${size}`,
          properties: {
            'box-shadow': `0 0 0 ${size}px var(--focus-indicator-color, currentColor)`
          }
        })
      }

      // ========================================
      // FOCUS ORDER UTILITIES
      // ========================================

      const focusOrders = ['1', '2', '3', '4', '5', '10']
      for (const order of focusOrders) {
        rules.push({
          pattern: `focus-order-${order}`,
          properties: { 'order': order }
        })
      }

      // ========================================
      // SKIP LINK UTILITIES
      // ========================================

      rules.push({
        pattern: 'skip-link',
        properties: {
          'position': 'absolute',
          'top': '-40px',
          'left': '0',
          'background': 'var(--color-coral-600, #f97316)',
          'color': 'white',
          'padding': '8px',
          'text-decoration': 'none',
          'z-index': '100'
        }
      })

      rules.push({
        pattern: 'skip-link-active',
        properties: {
          'top': '0'
        }
      })

      // ========================================
      // FILL INDICATOR UTILITIES
      // ========================================

      rules.push({
        pattern: 'focus-fill-target',
        properties: {
          'fill': 'var(--focus-fill, currentColor)'
        }
      })

      rules.push({
        pattern: 'focus-stroke-target',
        properties: {
          'stroke': 'var(--focus-stroke, currentColor)'
        }
      })

      // ========================================
      // REGISTER ALL RULES
      // ========================================

      for (const rule of rules) {
        ctx.addRule(rule)
      }
    }
  }
}

export default focusManagementPlugin
