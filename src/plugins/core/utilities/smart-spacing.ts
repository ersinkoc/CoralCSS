/**
 * Smart Spacing Utilities Plugin
 *
 * Context-aware spacing system using clamp(), min(), max(),
 * and CSS container queries for automatic responsive spacing.
 *
 * @module plugins/core/utilities/smart-spacing
 */

import type { Plugin } from '../../../types'

/**
 * Smart Spacing Utilities Plugin for CoralCSS
 *
 * Features:
 * - Fluid spacing using clamp()
 * - Container-aware spacing
 * - Context-sensitive gaps
 * - Auto-adjusting margins and padding
 *
 * @example
 * ```html
 * <div class="p-smart">Fluid padding</div>
 * <div class="gap-smart">Responsive gap</div>
 * <div class="space-smart">Smart spacing between children</div>
 * ```
 */
export const smartSpacingPlugin = (): Plugin => ({
  name: 'smart-spacing',
  version: '1.0.0',
  install(api) {
    // ========================================
    // SMART PADDING
    // ========================================

    // Fluid padding that scales with viewport
    api.addRule({
      pattern: 'p-smart',
      generate: () => ({
        properties: {
          'padding': 'clamp(1rem, 2.5vw, 1.5rem)'
        }
      })
    })

    api.addRule({
      pattern: 'p-smart-sm',
      generate: () => ({
        properties: {
          'padding': 'clamp(0.5rem, 1.5vw, 1rem)'
        }
      })
    })

    api.addRule({
      pattern: 'p-smart-md',
      generate: () => ({
        properties: {
          'padding': 'clamp(1rem, 2.5vw, 1.5rem)'
        }
      })
    })

    api.addRule({
      pattern: 'p-smart-lg',
      generate: () => ({
        properties: {
          'padding': 'clamp(1.5rem, 4vw, 2.5rem)'
        }
      })
    })

    api.addRule({
      pattern: 'p-smart-xl',
      generate: () => ({
        properties: {
          'padding': 'clamp(2rem, 5vw, 4rem)'
        }
      })
    })

    // Horizontal smart padding
    api.addRule({
      pattern: 'px-smart',
      generate: () => ({
        properties: {
          'padding-left': 'clamp(1rem, 2.5vw, 1.5rem)',
          'padding-right': 'clamp(1rem, 2.5vw, 1.5rem)'
        }
      })
    })

    // Vertical smart padding
    api.addRule({
      pattern: 'py-smart',
      generate: () => ({
        properties: {
          'padding-top': 'clamp(1rem, 2.5vw, 1.5rem)',
          'padding-bottom': 'clamp(1rem, 2.5vw, 1.5rem)'
        }
      })
    })

    // ========================================
    // SMART MARGINS
    // ========================================

    api.addRule({
      pattern: 'm-smart',
      generate: () => ({
        properties: {
          'margin': 'clamp(0.5rem, 2vw, 1rem)'
        }
      })
    })

    api.addRule({
      pattern: 'm-smart-sm',
      generate: () => ({
        properties: {
          'margin': 'clamp(0.25rem, 1vw, 0.5rem)'
        }
      })
    })

    api.addRule({
      pattern: 'm-smart-md',
      generate: () => ({
        properties: {
          'margin': 'clamp(0.5rem, 2vw, 1rem)'
        }
      })
    })

    api.addRule({
      pattern: 'm-smart-lg',
      generate: () => ({
        properties: {
          'margin': 'clamp(1rem, 3vw, 2rem)'
        }
      })
    })

    // ========================================
    // SMART GAPS
    // ========================================

    api.addRule({
      pattern: 'gap-smart',
      generate: () => ({
        properties: {
          'gap': 'clamp(0.5rem, 1.5vw, 1rem)'
        }
      })
    })

    api.addRule({
      pattern: 'gap-smart-sm',
      generate: () => ({
        properties: {
          'gap': 'clamp(0.25rem, 1vw, 0.5rem)'
        }
      })
    })

    api.addRule({
      pattern: 'gap-smart-md',
      generate: () => ({
        properties: {
          'gap': 'clamp(0.5rem, 1.5vw, 1rem)'
        }
      })
    })

    api.addRule({
      pattern: 'gap-smart-lg',
      generate: () => ({
        properties: {
          'gap': 'clamp(1rem, 2.5vw, 1.5rem)'
        }
      })
    })

    // Gap X smart
    api.addRule({
      pattern: 'gap-x-smart',
      generate: () => ({
        properties: {
          'column-gap': 'clamp(0.5rem, 1.5vw, 1rem)'
        }
      })
    })

    // Gap Y smart
    api.addRule({
      pattern: 'gap-y-smart',
      generate: () => ({
        properties: {
          'row-gap': 'clamp(0.5rem, 1.5vw, 1rem)'
        }
      })
    })

    // ========================================
    // SMART SPACE BETWEEN (for flex children)
    // ========================================

    api.addRule({
      pattern: 'space-smart',
      generate: () => ({
        properties: {
          '--smart-spacing': 'clamp(0.5rem, 1.5vw, 1rem)'
        }
      })
    })

    api.addRule({
      pattern: 'space-x-smart',
      generate: () => ({
        properties: {
          '--smart-spacing-x': 'clamp(0.5rem, 1.5vw, 1rem)'
        }
      })
    })

    api.addRule({
      pattern: 'space-y-smart',
      generate: () => ({
        properties: {
          '--smart-spacing-y': 'clamp(0.5rem, 1.5vw, 1rem)'
        }
      })
    })

    // ========================================
    // CONTAINER-AWARE SPACING
    // ========================================

    // Padding that scales with container width
    api.addRule({
      pattern: 'p-container',
      generate: () => ({
        properties: {
          'padding': 'clamp(1rem, 5cqi, 3rem)'
        }
      })
    })

    api.addRule({
      pattern: 'p-container-sm',
      generate: () => ({
        properties: {
          'padding': 'clamp(0.5rem, 3cqi, 1.5rem)'
        }
      })
    })

    api.addRule({
      pattern: 'p-container-lg',
      generate: () => ({
        properties: {
          'padding': 'clamp(1.5rem, 7cqi, 4rem)'
        }
      })
    })

    // Gap that scales with container
    api.addRule({
      pattern: 'gap-container',
      generate: () => ({
        properties: {
          'gap': 'clamp(0.5rem, 3cqi, 1.5rem)'
        }
      })
    })

    // ========================================
    // CONTENT-AWARE SPACING
    // ========================================

    // Proportional spacing based on font size
    api.addRule({
      pattern: 'p-prose',
      generate: () => ({
        properties: {
          'padding': 'clamp(1em, 2.5em, 2em)'
        }
      })
    })

    api.addRule({
      pattern: 'p-prose-sm',
      generate: () => ({
        properties: {
          'padding': 'clamp(0.75em, 1.5em, 1.25em)'
        }
      })
    })

    api.addRule({
      pattern: 'p-prose-lg',
      generate: () => ({
        properties: {
          'padding': 'clamp(1.25em, 3em, 2.5em)'
        }
      })
    })

    // Gap proportional to line height
    api.addRule({
      pattern: 'gap-leading',
      generate: () => ({
        properties: {
          'gap': 'calc(1em * 0.5)'
        }
      })
    })

    api.addRule({
      pattern: 'gap-leading-lg',
      generate: () => ({
        properties: {
          'gap': 'calc(1em * 1)'
        }
      })
    })

    // ========================================
    // RESPONSIVE SPACING WITH MIN/MAX
    // ========================================

    // Minimum spacing that grows
    api.addRule({
      pattern: 'p-min-fluid',
      generate: () => ({
        properties: {
          'padding': 'max(1rem, 2vw)'
        }
      })
    })

    api.addRule({
      pattern: 'p-max-fluid',
      generate: () => ({
        properties: {
          'padding': 'min(2rem, 5vw)'
        }
      })
    })

    // Gap with min/max constraints
    api.addRule({
      pattern: 'gap-bounded',
      generate: () => ({
        properties: {
          'gap': 'clamp(0.5rem, 2vw, 2rem)'
        }
      })
    })

    api.addRule({
      pattern: 'gap-bounded-sm',
      generate: () => ({
        properties: {
          'gap': 'clamp(0.25rem, 1.5vw, 1rem)'
        }
      })
    })

    api.addRule({
      pattern: 'gap-bounded-lg',
      generate: () => ({
        properties: {
          'gap': 'clamp(1rem, 3vw, 3rem)'
        }
      })
    })

    // ========================================
    // SAFE SPACING (prevents overflow)
    // ========================================

    api.addRule({
      pattern: 'p-safe',
      generate: () => ({
        properties: {
          'padding': 'clamp(0.5rem, 2vw, 1rem)'
        }
      })
    })

    // Safe margin that prevents pushing content out
    api.addRule({
      pattern: 'm-safe',
      generate: () => ({
        properties: {
          'margin': 'clamp(0.25rem, 1.5vw, 0.75rem)'
        }
      })
    })
  }
})

export default smartSpacingPlugin
