/**
 * Modern CSS Features Plugin
 *
 * Anchor positioning, scroll-driven animations, view transitions, and other modern CSS features.
 * @module plugins/core/modern
 */

import type { Plugin, Rule, PluginContext } from '../../types'

/**
 * Helper to generate rule name from pattern
 */
function getRuleName(pattern: RegExp | string): string {
  if (typeof pattern === 'string') {
    return pattern
  }
  // Extract the base name from regex pattern
  const source = pattern.source
  return source.replace(/[\^$\\[\](){}|+*?]/g, '').replace(/-\.\+/g, '-arb').slice(0, 30)
}

/**
 * Modern CSS features plugin
 */
export function modernCSSPlugin(): Plugin {
  return {
    name: 'modern-css',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // ============================================
      // Anchor Positioning
      // ============================================

      // Anchor name
      rules.push({
        name: 'anchor-name-arb',
        pattern: /^anchor-name-\[(.+)\]$/,
        handler: (match) => ({
          properties: { 'anchor-name': `--${match[1]}` },
        }),
      })

      // Position anchor
      rules.push({
        name: 'position-anchor-arb',
        pattern: /^position-anchor-\[(.+)\]$/,
        handler: (match) => ({
          properties: { 'position-anchor': `--${match[1]}` },
        }),
      })

      // Position area (for positioning relative to anchor)
      const positionAreas = [
        'top', 'bottom', 'left', 'right', 'center',
        'top-left', 'top-right', 'bottom-left', 'bottom-right',
        'top-span-left', 'top-span-right', 'bottom-span-left', 'bottom-span-right',
        'left-span-top', 'left-span-bottom', 'right-span-top', 'right-span-bottom',
        'span-all',
      ]
      for (const area of positionAreas) {
        rules.push({
          name: `position-area-${area}`,
          pattern: `position-area-${area}`,
          properties: { 'position-area': area.replace(/-/g, ' ') },
        })
      }

      // Arbitrary position area
      rules.push({
        name: 'position-area-arb',
        pattern: /^position-area-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { 'position-area': value } }
        },
      })

      // Anchor default
      rules.push({ name: 'anchor-default', pattern: 'anchor-default', properties: { 'position-anchor': 'auto' } })

      // ============================================
      // Scroll-Driven Animations
      // ============================================

      // Animation timeline
      rules.push({
        name: 'animation-timeline-scroll',
        pattern: 'animation-timeline-scroll',
        properties: { 'animation-timeline': 'scroll()' },
      })
      rules.push({
        name: 'animation-timeline-view',
        pattern: 'animation-timeline-view',
        properties: { 'animation-timeline': 'view()' },
      })
      rules.push({
        name: 'animation-timeline-scroll-arb',
        pattern: /^animation-timeline-scroll-\[(.+)\]$/,
        handler: (match) => ({
          properties: { 'animation-timeline': `scroll(${match[1]})` },
        }),
      })
      rules.push({
        name: 'animation-timeline-view-arb',
        pattern: /^animation-timeline-view-\[(.+)\]$/,
        handler: (match) => ({
          properties: { 'animation-timeline': `view(${match[1]})` },
        }),
      })

      // Animation range
      rules.push({
        name: 'animation-range-contain',
        pattern: 'animation-range-contain',
        properties: { 'animation-range': 'contain' },
      })
      rules.push({
        name: 'animation-range-cover',
        pattern: 'animation-range-cover',
        properties: { 'animation-range': 'cover' },
      })
      rules.push({
        name: 'animation-range-entry',
        pattern: 'animation-range-entry',
        properties: { 'animation-range': 'entry' },
      })
      rules.push({
        name: 'animation-range-exit',
        pattern: 'animation-range-exit',
        properties: { 'animation-range': 'exit' },
      })
      rules.push({
        name: 'animation-range-entry-crossing',
        pattern: 'animation-range-entry-crossing',
        properties: { 'animation-range': 'entry-crossing' },
      })
      rules.push({
        name: 'animation-range-exit-crossing',
        pattern: 'animation-range-exit-crossing',
        properties: { 'animation-range': 'exit-crossing' },
      })
      rules.push({
        name: 'animation-range-arb',
        pattern: /^animation-range-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { 'animation-range': value } }
        },
      })

      // Scroll timeline
      rules.push({
        name: 'scroll-timeline-name-arb',
        pattern: /^scroll-timeline-name-\[(.+)\]$/,
        handler: (match) => ({
          properties: { 'scroll-timeline-name': `--${match[1]}` },
        }),
      })
      rules.push({ name: 'scroll-timeline-x', pattern: 'scroll-timeline-x', properties: { 'scroll-timeline-axis': 'x' } })
      rules.push({ name: 'scroll-timeline-y', pattern: 'scroll-timeline-y', properties: { 'scroll-timeline-axis': 'y' } })
      rules.push({ name: 'scroll-timeline-block', pattern: 'scroll-timeline-block', properties: { 'scroll-timeline-axis': 'block' } })
      rules.push({ name: 'scroll-timeline-inline', pattern: 'scroll-timeline-inline', properties: { 'scroll-timeline-axis': 'inline' } })

      // View timeline
      rules.push({
        name: 'view-timeline-name-arb',
        pattern: /^view-timeline-name-\[(.+)\]$/,
        handler: (match) => ({
          properties: { 'view-timeline-name': `--${match[1]}` },
        }),
      })
      rules.push({ name: 'view-timeline-x', pattern: 'view-timeline-x', properties: { 'view-timeline-axis': 'x' } })
      rules.push({ name: 'view-timeline-y', pattern: 'view-timeline-y', properties: { 'view-timeline-axis': 'y' } })
      rules.push({ name: 'view-timeline-block', pattern: 'view-timeline-block', properties: { 'view-timeline-axis': 'block' } })
      rules.push({ name: 'view-timeline-inline', pattern: 'view-timeline-inline', properties: { 'view-timeline-axis': 'inline' } })

      // View timeline inset
      rules.push({
        name: 'view-timeline-inset-arb',
        pattern: /^view-timeline-inset-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { 'view-timeline-inset': value } }
        },
      })

      // ============================================
      // View Transitions
      // ============================================

      // View transition name
      rules.push({
        name: 'view-transition-name-arb',
        pattern: /^view-transition-name-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { 'view-transition-name': value } }
        },
      })
      rules.push({ name: 'view-transition-name-none', pattern: 'view-transition-name-none', properties: { 'view-transition-name': 'none' } })

      // View transition class
      rules.push({
        name: 'view-transition-class-arb',
        pattern: /^view-transition-class-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { 'view-transition-class': value } }
        },
      })

      // ============================================
      // Container Queries
      // ============================================

      // Container type
      rules.push({ name: 'container-type-normal', pattern: 'container-type-normal', properties: { 'container-type': 'normal' } })
      rules.push({ name: 'container-type-size', pattern: 'container-type-size', properties: { 'container-type': 'size' } })
      rules.push({ name: 'container-type-inline-size', pattern: 'container-type-inline-size', properties: { 'container-type': 'inline-size' } })
      rules.push({ name: '@container', pattern: '@container', properties: { 'container-type': 'inline-size' } })

      // Container name
      rules.push({
        name: 'container-name-arb',
        pattern: /^container-name-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { 'container-name': value } }
        },
      })

      // Container shorthand
      rules.push({
        name: 'container-arb',
        pattern: /^container-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { container: value } }
        },
      })

      // ============================================
      // Subgrid
      // ============================================

      rules.push({ name: 'grid-cols-subgrid', pattern: 'grid-cols-subgrid', properties: { 'grid-template-columns': 'subgrid' } })
      rules.push({ name: 'grid-rows-subgrid', pattern: 'grid-rows-subgrid', properties: { 'grid-template-rows': 'subgrid' } })

      // ============================================
      // Color Functions
      // ============================================

      // Color-mix
      rules.push({
        name: 'color-mix-arb',
        pattern: /^color-mix-\[(.+)\]$/,
        handler: (match) => ({
          properties: { color: `color-mix(${match[1]})` },
        }),
      })

      // Relative color syntax
      rules.push({
        name: 'bg-from-arb',
        pattern: /^bg-from-\[(.+)\]$/,
        handler: (match) => ({
          properties: { 'background-color': `from ${match[1]}` },
        }),
      })

      // ============================================
      // Text Wrap
      // ============================================

      rules.push({ name: 'text-wrap-balance', pattern: 'text-wrap-balance', properties: { 'text-wrap': 'balance' } })
      rules.push({ name: 'text-wrap-pretty', pattern: 'text-wrap-pretty', properties: { 'text-wrap': 'pretty' } })
      rules.push({ name: 'text-wrap-stable', pattern: 'text-wrap-stable', properties: { 'text-wrap': 'stable' } })

      // ============================================
      // Field Sizing
      // ============================================

      rules.push({ name: 'field-sizing-content', pattern: 'field-sizing-content', properties: { 'field-sizing': 'content' } })
      rules.push({ name: 'field-sizing-fixed', pattern: 'field-sizing-fixed', properties: { 'field-sizing': 'fixed' } })

      // ============================================
      // Popover
      // ============================================

      // Popover positioning
      rules.push({ name: 'popover-auto', pattern: 'popover-auto', properties: { popover: 'auto' } })
      rules.push({ name: 'popover-manual', pattern: 'popover-manual', properties: { popover: 'manual' } })

      // ============================================
      // Masonry Layout
      // ============================================

      rules.push({ name: 'grid-template-rows-masonry', pattern: 'grid-template-rows-masonry', properties: { 'grid-template-rows': 'masonry' } })
      rules.push({ name: 'grid-template-cols-masonry', pattern: 'grid-template-cols-masonry', properties: { 'grid-template-columns': 'masonry' } })

      // ============================================
      // CSS Math Functions
      // ============================================

      // Round
      rules.push({
        name: 'round-arb',
        pattern: /^round-\[(.+)\]$/,
        handler: (match) => ({
          properties: { '--coral-round': `round(${match[1]})` },
        }),
      })

      // Clamp (already common in sizing, but add explicit support)
      rules.push({
        name: 'clamp-arb',
        pattern: /^clamp-\[(.+)\]$/,
        handler: (match) => ({
          properties: { '--coral-clamp': `clamp(${match[1]})` },
        }),
      })

      // ============================================
      // Container Style Queries (Tailwind 4 feature)
      // Style based on container's CSS custom properties
      // ============================================
      rules.push({
        name: 'container-style-arb',
        pattern: /^@style-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          // For style queries like @container style(--variant: primary)
          return { properties: { '--coral-style-query': value } }
        },
      })

      // ============================================
      // CSS Nesting Support
      // ============================================
      rules.push({ name: 'nest', pattern: 'nest', properties: { '--coral-nesting': 'enabled' } })

      // ============================================
      // CSS Scope
      // ============================================
      rules.push({
        name: 'scope-start-arb',
        pattern: /^scope-start-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { '--coral-scope-start': value } }
        },
      })
      rules.push({
        name: 'scope-end-arb',
        pattern: /^scope-end-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { '--coral-scope-end': value } }
        },
      })

      // ============================================
      // CSS Layers
      // ============================================
      rules.push({ name: 'layer-base', pattern: 'layer-base', properties: { '--coral-layer': 'base' } })
      rules.push({ name: 'layer-components', pattern: 'layer-components', properties: { '--coral-layer': 'components' } })
      rules.push({ name: 'layer-utilities', pattern: 'layer-utilities', properties: { '--coral-layer': 'utilities' } })
      rules.push({ name: 'layer-reset', pattern: 'layer-reset', properties: { '--coral-layer': 'reset' } })

      // ============================================
      // Reading Flow (CSS Display 4)
      // ============================================
      rules.push({ name: 'reading-flow-normal', pattern: 'reading-flow-normal', properties: { 'reading-flow': 'normal' } })
      rules.push({ name: 'reading-flow-grid-rows', pattern: 'reading-flow-grid-rows', properties: { 'reading-flow': 'grid-rows' } })
      rules.push({ name: 'reading-flow-grid-columns', pattern: 'reading-flow-grid-columns', properties: { 'reading-flow': 'grid-columns' } })
      rules.push({ name: 'reading-flow-grid-order', pattern: 'reading-flow-grid-order', properties: { 'reading-flow': 'grid-order' } })
      rules.push({ name: 'reading-flow-flex-visual', pattern: 'reading-flow-flex-visual', properties: { 'reading-flow': 'flex-visual' } })
      rules.push({ name: 'reading-flow-flex-flow', pattern: 'reading-flow-flex-flow', properties: { 'reading-flow': 'flex-flow' } })

      // ============================================
      // Text Box Trim (CSS Inline 3)
      // ============================================
      rules.push({ name: 'text-box-trim-none', pattern: 'text-box-trim-none', properties: { 'text-box-trim': 'none' } })
      rules.push({ name: 'text-box-trim-start', pattern: 'text-box-trim-start', properties: { 'text-box-trim': 'start' } })
      rules.push({ name: 'text-box-trim-end', pattern: 'text-box-trim-end', properties: { 'text-box-trim': 'end' } })
      rules.push({ name: 'text-box-trim-both', pattern: 'text-box-trim-both', properties: { 'text-box-trim': 'both' } })

      // Text box edge
      rules.push({ name: 'text-box-edge-leading', pattern: 'text-box-edge-leading', properties: { 'text-box-edge': 'leading' } })
      rules.push({ name: 'text-box-edge-text', pattern: 'text-box-edge-text', properties: { 'text-box-edge': 'text' } })
      rules.push({ name: 'text-box-edge-cap', pattern: 'text-box-edge-cap', properties: { 'text-box-edge': 'cap' } })
      rules.push({ name: 'text-box-edge-ex', pattern: 'text-box-edge-ex', properties: { 'text-box-edge': 'ex' } })
      rules.push({ name: 'text-box-edge-ideographic', pattern: 'text-box-edge-ideographic', properties: { 'text-box-edge': 'ideographic' } })
      rules.push({ name: 'text-box-edge-ideographic-ink', pattern: 'text-box-edge-ideographic-ink', properties: { 'text-box-edge': 'ideographic-ink' } })

      // ============================================
      // Math Styles
      // ============================================
      rules.push({ name: 'math-style-normal', pattern: 'math-style-normal', properties: { 'math-style': 'normal' } })
      rules.push({ name: 'math-style-compact', pattern: 'math-style-compact', properties: { 'math-style': 'compact' } })

      // ============================================
      // Display Contents
      // ============================================
      rules.push({ name: 'display-contents', pattern: 'display-contents', properties: { display: 'contents' } })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default modernCSSPlugin
