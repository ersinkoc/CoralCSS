/**
 * Extra Utilities Plugin
 *
 * Additional utility classes for useful but less common CSS properties.
 * Includes text alignment extensions, accent colors, print adjustments, etc.
 *
 * @module plugins/core/utilities/extras
 */

import type { Plugin } from '../../../types'
import { spacingScale } from '../../../theme/spacing'

/**
 * Create the extras utilities plugin
 *
 * Provides utilities for:
 * - accent-color (form element accent colors)
 * - color-scheme (light/dark mode preference)
 * - print-color-adjust (print optimization)
 * - box-decoration-break (inline element decoration)
 * - text-align-last (last line alignment)
 * - hanging-punctuation (typographic polish)
 * - line-clamp (text truncation)
 * - transition-behavior (discrete animations)
 * - reading-flow (reading order)
 * - text-spacing (CJK spacing)
 *
 * @example
 * ```typescript
 * import { extrasUtilitiesPlugin } from '@coral-css/plugins'
 * ```
 */
export function extrasUtilitiesPlugin(): Plugin {
  return {
    name: 'extras-utilities',
    version: '1.0.0',
    install(api) {
      const rules: Array<{
        pattern: RegExp | string
        properties?: Record<string, string>
        handler?: (match: RegExpMatchArray) => { properties: Record<string, string> } | null
      }> = []

      // ============================================================================
      // Accent Color (for form elements)
      // ============================================================================

      rules.push({ pattern: 'accent-auto', properties: { 'accent-color': 'auto' } })
      rules.push({ pattern: 'accent-current', properties: { 'accent-color': 'currentColor' } })

      // Accent with color names
      const colors = [
        'inherit', 'transparent', 'black', 'white',
        'red', 'orange', 'amber', 'yellow', 'lime', 'green',
        'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo',
        'violet', 'purple', 'fuchsia', 'pink', 'rose',
        'slate', 'gray', 'zinc', 'neutral', 'stone',
        'primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info',
      ]

      for (const color of colors) {
        rules.push({
          pattern: `accent-${color}`,
          properties: { 'accent-color': `hsl(var(--${color}))` },
        })
      }

      // Arbitrary accent color
      rules.push({
        pattern: /^accent-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) { return null }
          return { properties: { 'accent-color': v } }
        },
      })

      // ============================================================================
      // Color Scheme (light/dark preference)
      // ============================================================================

      rules.push({ pattern: 'color-scheme-normal', properties: { 'color-scheme': 'normal' } })
      rules.push({ pattern: 'color-scheme-light', properties: { 'color-scheme': 'light' } })
      rules.push({ pattern: 'color-scheme-dark', properties: { 'color-scheme': 'dark' } })
      rules.push({ pattern: 'color-scheme-light-dark', properties: { 'color-scheme': 'light dark' } })
      rules.push({ pattern: 'color-scheme-dark-light', properties: { 'color-scheme': 'dark light' } })
      rules.push({ pattern: 'color-scheme-only-light', properties: { 'color-scheme': 'only light' } })
      rules.push({ pattern: 'color-scheme-only-dark', properties: { 'color-scheme': 'only dark' } })

      // ============================================================================
      // Print Color Adjust (print optimization)
      // ============================================================================

      rules.push({ pattern: 'print-color-adjust-economy', properties: { 'print-color-adjust': 'economy', '-webkit-print-color-adjust': 'economy' } })
      rules.push({ pattern: 'print-color-adjust-exact', properties: { 'print-color-adjust': 'exact', '-webkit-print-color-adjust': 'exact' } })

      // ============================================================================
      // Box Decoration Break
      // ============================================================================

      rules.push({ pattern: 'decoration-slice', properties: { 'box-decoration-break': 'slice', '-webkit-box-decoration-break': 'slice' } })
      rules.push({ pattern: 'decoration-clone', properties: { 'box-decoration-break': 'clone', '-webkit-box-decoration-break': 'clone' } })

      // ============================================================================
      // Text Align Last
      // ============================================================================

      rules.push({ pattern: 'text-align-last-auto', properties: { 'text-align-last': 'auto' } })
      rules.push({ pattern: 'text-align-last-start', properties: { 'text-align-last': 'start' } })
      rules.push({ pattern: 'text-align-last-end', properties: { 'text-align-last': 'end' } })
      rules.push({ pattern: 'text-align-last-left', properties: { 'text-align-last': 'left' } })
      rules.push({ pattern: 'text-align-last-right', properties: { 'text-align-last': 'right' } })
      rules.push({ pattern: 'text-align-last-center', properties: { 'text-align-last': 'center' } })
      rules.push({ pattern: 'text-align-last-justify', properties: { 'text-align-last': 'justify' } })

      // ============================================================================
      // Hanging Punctuation
      // ============================================================================

      rules.push({ pattern: 'hanging-punctuation-none', properties: { 'hanging-punctuation': 'none' } })
      rules.push({ pattern: 'hanging-punctuation-first', properties: { 'hanging-punctuation': 'first' } })
      rules.push({ pattern: 'hanging-punctuation-last', properties: { 'hanging-punctuation': 'last' } })
      rules.push({ pattern: 'hanging-punctuation-force-end', properties: { 'hanging-punctuation': 'force-end' } })
      rules.push({ pattern: 'hanging-punctuation-allow-end', properties: { 'hanging-punctuation': 'allow-end' } })
      rules.push({ pattern: 'hanging-punctuation-first-last', properties: { 'hanging-punctuation': 'first last' } })
      rules.push({ pattern: 'hanging-punctuation-all', properties: { 'hanging-punctuation': 'first last force-end allow-end' } })

      // ============================================================================
      // Line Clamp (text truncation)
      // ============================================================================

      rules.push({ pattern: 'line-clamp-none', properties: { '-webkit-line-clamp': 'unset', display: 'block', '-webkit-box-orient': 'unset' } })

      for (let i = 1; i <= 10; i++) {
        rules.push({
          pattern: `line-clamp-${i}`,
          properties: {
            display: '-webkit-box',
            '-webkit-box-orient': 'vertical',
            '-webkit-line-clamp': String(i),
            overflow: 'hidden',
          },
        })
      }

      // Arbitrary line clamp
      rules.push({
        pattern: /^line-clamp-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) { return null }
          return {
            properties: {
              display: '-webkit-box',
              '-webkit-box-orient': 'vertical',
              '-webkit-line-clamp': v,
              overflow: 'hidden',
            },
          }
        },
      })

      // ============================================================================
      // Transition Behavior (for discrete properties)
      // ============================================================================

      rules.push({ pattern: 'transition-behavior-normal', properties: { 'transition-behavior': 'normal' } })
      rules.push({ pattern: 'transition-behavior-allow', properties: { 'transition-behavior': 'allow-discrete' } })
      rules.push({ pattern: 'transition-behavior-discrete', properties: { 'transition-behavior': 'allow-discrete' } })

      // ============================================================================
      // Reading Flow (reading order)
      // ============================================================================

      rules.push({ pattern: 'reading-flow-auto', properties: { 'reading-flow': 'auto' } })
      rules.push({ pattern: 'reading-flow-normal', properties: { 'reading-flow': 'normal' } })

      // ============================================================================
      // Text Spacing (CJK spacing optimization)
      // ============================================================================

      rules.push({ pattern: 'text-spacing-normal', properties: { 'text-spacing': 'normal' } })
      rules.push({ pattern: 'text-spacing-trim-start', properties: { 'text-spacing': 'trim-start' } })
      rules.push({ pattern: 'text-spacing-trim-end', properties: { 'text-spacing': 'trim-end' } })
      rules.push({ pattern: 'text-spacing-trim-both', properties: { 'text-spacing': 'trim-both' } })
      rules.push({ pattern: 'text-spacing-space-start', properties: { 'text-spacing': 'space-start' } })
      rules.push({ pattern: 'text-spacing-space-end', properties: { 'text-spacing': 'space-end' } })
      rules.push({ pattern: 'text-spacing-space-all', properties: { 'text-spacing': 'space-all' } })
      rules.push({ pattern: 'text-spacing-no-compress', properties: { 'text-spacing': 'no-compress' } })

      // ============================================================================
      // Appearance (native form styling)
      // ============================================================================

      rules.push({ pattern: 'appearance-auto', properties: { appearance: 'auto', '-webkit-appearance': 'auto', '-moz-appearance': 'auto' } })
      rules.push({ pattern: 'appearance-none', properties: { appearance: 'none', '-webkit-appearance': 'none', '-moz-appearance': 'none' } })
      rules.push({ pattern: 'appearance-textfield', properties: { appearance: 'textfield', '-webkit-appearance': 'textfield' } })
      rules.push({ pattern: 'appearance-searchfield', properties: { appearance: 'searchfield', '-webkit-appearance': 'searchfield' } })
      rules.push({ pattern: 'appearance-button', properties: { appearance: 'button', '-webkit-appearance': 'button' } })
      rules.push({ pattern: 'appearance-menulist', properties: { appearance: 'menulist', '-webkit-appearance': 'menulist' } })
      rules.push({ pattern: 'appearance-checkbox', properties: { appearance: 'auto', '-webkit-appearance': 'checkbox' } })
      rules.push({ pattern: 'appearance-radio', properties: { appearance: 'auto', '-webkit-appearance': 'radio' } })

      // ============================================================================
      // Forced Color Adjust (Windows high contrast mode)
      // ============================================================================

      rules.push({ pattern: 'forced-color-adjust-auto', properties: { 'forced-color-adjust': 'auto' } })
      rules.push({ pattern: 'forced-color-adjust-none', properties: { 'forced-color-adjust': 'none' } })
      rules.push({ pattern: 'forced-color-adjust-preserve', properties: { 'forced-color-adjust': 'preserve-parent-color' } })

      // ============================================================================
      // Hyphens (text hyphenation)
      // ============================================================================

      rules.push({ pattern: 'hyphens-none', properties: { '-webkit-hyphens': 'none', '-ms-hyphens': 'none', hyphens: 'none' } })
      rules.push({ pattern: 'hyphens-manual', properties: { '-webkit-hyphens': 'manual', '-ms-hyphens': 'manual', hyphens: 'manual' } })
      rules.push({ pattern: 'hyphens-auto', properties: { '-webkit-hyphens': 'auto', '-ms-hyphens': 'auto', hyphens: 'auto' } })

      // ============================================================================
      // Overflow Anchor (scroll anchoring)
      // ============================================================================

      rules.push({ pattern: 'overflow-anchor-auto', properties: { 'overflow-anchor': 'auto' } })
      rules.push({ pattern: 'overflow-anchor-none', properties: { 'overflow-anchor': 'none' } })

      // ============================================================================
      // Register all rules
      // ============================================================================

      for (const rule of rules) {
        api.addRule(rule)
      }
    },
  }
}

export default extrasUtilitiesPlugin
