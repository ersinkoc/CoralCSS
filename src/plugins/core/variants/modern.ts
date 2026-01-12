/**
 * Modern CSS Variants Plugin
 *
 * Container queries, :has() selector, and other modern CSS variants.
 * @module plugins/core/variants/modern
 */

import type { Plugin, Variant, PluginContext } from '../../../types'
import { containers } from '../../../theme'

/**
 * Modern CSS variants plugin
 */
export function modernVariantsPlugin(): Plugin {
  return {
    name: 'modern-variants',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const variants: Variant[] = []

      // Container queries (unnamed container)
      for (const [name, width] of Object.entries(containers)) {
        variants.push({
          name: `@${name}`,
          handler: (selector) => selector,
          wrapper: (css: string) => `@container (min-width: ${width}) { ${css} }`,
        })
      }

      // Named container queries
      variants.push({
        name: '@container',
        handler: (selector) => selector,
        wrapper: (css: string) => `@container { ${css} }`,
      })

      // Container query with arbitrary value
      // This will be handled by pattern matching in the kernel

      // :has() selector variants
      variants.push({
        name: 'has-checked',
        handler: (selector) => `${selector}:has(:checked)`,
      })
      variants.push({
        name: 'has-focus',
        handler: (selector) => `${selector}:has(:focus)`,
      })
      variants.push({
        name: 'has-focus-visible',
        handler: (selector) => `${selector}:has(:focus-visible)`,
      })
      variants.push({
        name: 'has-hover',
        handler: (selector) => `${selector}:has(:hover)`,
      })
      variants.push({
        name: 'has-active',
        handler: (selector) => `${selector}:has(:active)`,
      })

      // Arbitrary :has() selector
      // has-[selector]: pattern will be handled by regex matching

      // Supports query
      variants.push({
        name: 'supports-grid',
        handler: (selector) => selector,
        wrapper: (css: string) => `@supports (display: grid) { ${css} }`,
      })
      variants.push({
        name: 'supports-flex',
        handler: (selector) => selector,
        wrapper: (css: string) => `@supports (display: flex) { ${css} }`,
      })
      variants.push({
        name: 'supports-backdrop',
        handler: (selector) => selector,
        wrapper: (css: string) => `@supports (backdrop-filter: blur(1px)) { ${css} }`,
      })
      variants.push({
        name: 'supports-scroll-snap',
        handler: (selector) => selector,
        wrapper: (css: string) => `@supports (scroll-snap-type: x mandatory) { ${css} }`,
      })
      variants.push({
        name: 'supports-container',
        handler: (selector) => selector,
        wrapper: (css: string) => `@supports (container-type: inline-size) { ${css} }`,
      })
      variants.push({
        name: 'supports-anchor',
        handler: (selector) => selector,
        wrapper: (css: string) => `@supports (anchor-name: --a) { ${css} }`,
      })
      variants.push({
        name: 'supports-has',
        handler: (selector) => selector,
        wrapper: (css: string) => `@supports selector(:has(*)) { ${css} }`,
      })

      // :where() and :is() variants for specificity control
      variants.push({
        name: 'where',
        handler: (selector) => `:where(${selector})`,
      })
      variants.push({
        name: 'is',
        handler: (selector) => `:is(${selector})`,
      })
      variants.push({
        name: 'not',
        handler: (selector) => `:not(${selector})`,
      })

      // RTL/LTR variants
      variants.push({
        name: 'rtl',
        handler: (selector) => `[dir="rtl"] ${selector}`,
      })
      variants.push({
        name: 'ltr',
        handler: (selector) => `[dir="ltr"] ${selector}`,
      })

      // Data attribute variants
      variants.push({
        name: 'data-loading',
        handler: (selector) => `${selector}[data-loading]`,
      })
      variants.push({
        name: 'data-active',
        handler: (selector) => `${selector}[data-active]`,
      })
      variants.push({
        name: 'data-selected',
        handler: (selector) => `${selector}[data-selected]`,
      })
      variants.push({
        name: 'data-disabled',
        handler: (selector) => `${selector}[data-disabled]`,
      })
      variants.push({
        name: 'data-open',
        handler: (selector) => `${selector}[data-open]`,
      })
      variants.push({
        name: 'data-closed',
        handler: (selector) => `${selector}[data-closed]`,
      })

      // ARIA state variants
      variants.push({
        name: 'aria-busy',
        handler: (selector) => `${selector}[aria-busy="true"]`,
      })
      variants.push({
        name: 'aria-checked',
        handler: (selector) => `${selector}[aria-checked="true"]`,
      })
      variants.push({
        name: 'aria-disabled',
        handler: (selector) => `${selector}[aria-disabled="true"]`,
      })
      variants.push({
        name: 'aria-expanded',
        handler: (selector) => `${selector}[aria-expanded="true"]`,
      })
      variants.push({
        name: 'aria-hidden',
        handler: (selector) => `${selector}[aria-hidden="true"]`,
      })
      variants.push({
        name: 'aria-pressed',
        handler: (selector) => `${selector}[aria-pressed="true"]`,
      })
      variants.push({
        name: 'aria-readonly',
        handler: (selector) => `${selector}[aria-readonly="true"]`,
      })
      variants.push({
        name: 'aria-required',
        handler: (selector) => `${selector}[aria-required="true"]`,
      })
      variants.push({
        name: 'aria-selected',
        handler: (selector) => `${selector}[aria-selected="true"]`,
      })

      // ========================================
      // TAILWIND 4.1 MODERN VARIANTS
      // ========================================

      // User validation variants - only apply after user interaction
      variants.push({
        name: 'user-valid',
        handler: (selector) => `${selector}:user-valid`,
      })
      variants.push({
        name: 'user-invalid',
        handler: (selector) => `${selector}:user-invalid`,
      })
      variants.push({
        name: 'user-error',
        handler: (selector) => `${selector}:user-invalid`,
      })

      // Pointer device detection variants
      variants.push({
        name: 'pointer-fine',
        handler: (selector) => selector,
        wrapper: (css: string) => `@media (pointer: fine) { ${css} }`,
      })
      variants.push({
        name: 'pointer-coarse',
        handler: (selector) => selector,
        wrapper: (css: string) => `@media (pointer: coarse) { ${css} }`,
      })
      variants.push({
        name: 'any-pointer-fine',
        handler: (selector) => selector,
        wrapper: (css: string) => `@media (any-pointer: fine) { ${css} }`,
      })
      variants.push({
        name: 'any-pointer-coarse',
        handler: (selector) => selector,
        wrapper: (css: string) => `@media (any-pointer: coarse) { ${css} }`,
      })
      // Hover only for fine pointer devices (mouse)
      variants.push({
        name: 'hover-pointer',
        handler: (sel) => `${sel}:hover`,
        wrapper: (css: string) => `@media (pointer: fine) { ${css} }`,
      })

      // Inverted color mode variant (accessibility)
      variants.push({
        name: 'inverted-colors',
        handler: (selector) => selector,
        wrapper: (css: string) => `@media (inverted-colors: inverted) { ${css} }`,
      })

      // NoScript variant - JavaScript disabled detection
      variants.push({
        name: 'noscript',
        handler: (selector) => selector,
        wrapper: (css: string) => `@supports not (selector(:where(noscript))) { ${css} }`,
      })

      // Details content variant - targets the anonymous content wrapper
      variants.push({
        name: 'details-content',
        handler: (selector) => `${selector}::details-content`,
      })
      // Details marker variant for the summary marker
      variants.push({
        name: 'details-marker',
        handler: (selector) => `summary${selector}::marker`,
      })
      // Details open state variant
      variants.push({
        name: 'details-open',
        handler: (selector) => `details[open] > summary${selector}`,
      })

      // ========================================
      // CONTAINER QUERIES PLUS (Phase 3.2)
      // ========================================

      // Style-based container queries
      variants.push({
        name: 'container-style-grid',
        handler: (selector) => selector,
        wrapper: (css: string) => `@container style(display: grid) { ${css} }`,
      })
      variants.push({
        name: 'container-style-flex',
        handler: (selector) => selector,
        wrapper: (css: string) => `@container style(display: flex) { ${css} }`,
      })
      variants.push({
        name: 'container-style-block',
        handler: (selector) => selector,
        wrapper: (css: string) => `@container style(display: block) { ${css} }`,
      })
      variants.push({
        name: 'container-style-inline',
        handler: (selector) => selector,
        wrapper: (css: string) => `@container style(display: inline) { ${css} }`,
      })

      // State-based container queries
      variants.push({
        name: 'container-hovered',
        handler: (selector) => selector,
        wrapper: (css: string) => `@container state(:hover) { ${css} }`,
      })
      variants.push({
        name: 'container-focused',
        handler: (selector) => selector,
        wrapper: (css: string) => `@container state(:focus-within) { ${css} }`,
      })
      variants.push({
        name: 'container-active',
        handler: (selector) => selector,
        wrapper: (css: string) => `@container state(:active) { ${css} }`,
      })
      variants.push({
        name: 'container-checked',
        handler: (selector) => selector,
        wrapper: (css: string) => `@container state(:checked) { ${css} }`,
      })
      variants.push({
        name: 'container-disabled',
        handler: (selector) => selector,
        wrapper: (css: string) => `@container state(:disabled) { ${css} }`,
      })

      // Orientation container queries
      variants.push({
        name: 'container-portrait',
        handler: (selector) => selector,
        wrapper: (css: string) => `@container (orientation: portrait) { ${css} }`,
      })
      variants.push({
        name: 'container-landscape',
        handler: (selector) => selector,
        wrapper: (css: string) => `@container (orientation: landscape) { ${css} }`,
      })

      // ========================================
      // END TAILWIND 4.1 MODERN VARIANTS
      // ========================================

      // Register all variants
      for (const variant of variants) {
        ctx.addVariant(variant)
      }
    },
  }
}

export default modernVariantsPlugin
