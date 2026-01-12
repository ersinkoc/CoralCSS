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
function _getRuleName(pattern: RegExp | string): string {
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
          if (!value) {return null}
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
          if (!value) {return null}
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
          if (!value) {return null}
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
          if (!value) {return null}
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
          if (!value) {return null}
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
          if (!value) {return null}
          return { properties: { 'container-name': value } }
        },
      })

      // Container shorthand
      rules.push({
        name: 'container-arb',
        pattern: /^container-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
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
          if (!value) {return null}
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
          if (!value) {return null}
          return { properties: { '--coral-scope-start': value } }
        },
      })
      rules.push({
        name: 'scope-end-arb',
        pattern: /^scope-end-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
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

      // ============================================
      // @starting-style Support (CSS Transitions Level 2)
      // For enter animations on elements that go from display:none
      // ============================================

      // Starting style utilities - these indicate the initial state
      // before transition begins (used with @starting-style rule)
      rules.push({
        name: 'starting-opacity-0',
        pattern: 'starting-opacity-0',
        properties: {
          '--coral-starting-opacity': '0',
          opacity: 'var(--coral-starting-opacity)',
        },
      })
      rules.push({
        name: 'starting-scale-0',
        pattern: 'starting-scale-0',
        properties: {
          '--coral-starting-scale': '0',
          transform: 'scale(var(--coral-starting-scale))',
        },
      })
      rules.push({
        name: 'starting-scale-75',
        pattern: 'starting-scale-75',
        properties: {
          '--coral-starting-scale': '0.75',
          transform: 'scale(var(--coral-starting-scale))',
        },
      })
      rules.push({
        name: 'starting-scale-95',
        pattern: 'starting-scale-95',
        properties: {
          '--coral-starting-scale': '0.95',
          transform: 'scale(var(--coral-starting-scale))',
        },
      })
      rules.push({
        name: 'starting-translate-y-4',
        pattern: 'starting-translate-y-4',
        properties: {
          '--coral-starting-translate-y': '1rem',
          transform: 'translateY(var(--coral-starting-translate-y))',
        },
      })
      rules.push({
        name: 'starting-translate-y-full',
        pattern: 'starting-translate-y-full',
        properties: {
          '--coral-starting-translate-y': '100%',
          transform: 'translateY(var(--coral-starting-translate-y))',
        },
      })
      rules.push({
        name: 'starting--translate-y-full',
        pattern: 'starting--translate-y-full',
        properties: {
          '--coral-starting-translate-y': '-100%',
          transform: 'translateY(var(--coral-starting-translate-y))',
        },
      })

      // Arbitrary starting style values
      rules.push({
        name: 'starting-opacity-arb',
        pattern: /^starting-opacity-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) { return null }
          return {
            properties: {
              '--coral-starting-opacity': value,
              opacity: 'var(--coral-starting-opacity)',
            },
          }
        },
      })
      rules.push({
        name: 'starting-scale-arb',
        pattern: /^starting-scale-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) { return null }
          return {
            properties: {
              '--coral-starting-scale': value,
              transform: 'scale(var(--coral-starting-scale))',
            },
          }
        },
      })
      rules.push({
        name: 'starting-translate-arb',
        pattern: /^starting-translate-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) { return null }
          return {
            properties: {
              '--coral-starting-translate': value,
              transform: `translate(var(--coral-starting-translate))`,
            },
          }
        },
      })

      // ============================================
      // Transition Behavior (for discrete animations)
      // ============================================
      rules.push({
        name: 'transition-discrete',
        pattern: 'transition-discrete',
        properties: { 'transition-behavior': 'allow-discrete' },
      })
      rules.push({
        name: 'transition-normal',
        pattern: 'transition-normal',
        properties: { 'transition-behavior': 'normal' },
      })

      // ============================================
      // Overlay Property (for top-layer elements)
      // ============================================
      rules.push({
        name: 'overlay-auto',
        pattern: 'overlay-auto',
        properties: { overlay: 'auto' },
      })
      rules.push({
        name: 'overlay-none',
        pattern: 'overlay-none',
        properties: { overlay: 'none' },
      })

      // ============================================
      // Color-Mix Utilities (Beyond basic)
      // ============================================

      // Pre-defined color mixes
      const colorMixPercentages = ['10', '20', '25', '30', '40', '50', '60', '70', '75', '80', '90']
      for (const pct of colorMixPercentages) {
        // Mix with white (lighten)
        rules.push({
          name: `mix-white-${pct}`,
          pattern: `mix-white-${pct}`,
          properties: {
            '--coral-color-mix': `color-mix(in srgb, currentColor, white ${pct}%)`,
          },
        })
        // Mix with black (darken)
        rules.push({
          name: `mix-black-${pct}`,
          pattern: `mix-black-${pct}`,
          properties: {
            '--coral-color-mix': `color-mix(in srgb, currentColor, black ${pct}%)`,
          },
        })
      }

      // Color space for mixing
      rules.push({ name: 'mix-space-srgb', pattern: 'mix-space-srgb', properties: { '--coral-mix-space': 'srgb' } })
      rules.push({ name: 'mix-space-srgb-linear', pattern: 'mix-space-srgb-linear', properties: { '--coral-mix-space': 'srgb-linear' } })
      rules.push({ name: 'mix-space-lab', pattern: 'mix-space-lab', properties: { '--coral-mix-space': 'lab' } })
      rules.push({ name: 'mix-space-oklab', pattern: 'mix-space-oklab', properties: { '--coral-mix-space': 'oklab' } })
      rules.push({ name: 'mix-space-lch', pattern: 'mix-space-lch', properties: { '--coral-mix-space': 'lch' } })
      rules.push({ name: 'mix-space-oklch', pattern: 'mix-space-oklch', properties: { '--coral-mix-space': 'oklch' } })
      rules.push({ name: 'mix-space-hsl', pattern: 'mix-space-hsl', properties: { '--coral-mix-space': 'hsl' } })
      rules.push({ name: 'mix-space-hwb', pattern: 'mix-space-hwb', properties: { '--coral-mix-space': 'hwb' } })

      // Arbitrary color-mix for backgrounds, text, borders
      rules.push({
        name: 'bg-mix-arb',
        pattern: /^bg-mix-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) { return null }
          return { properties: { 'background-color': `color-mix(in var(--coral-mix-space, srgb), ${value.replace(/_/g, ' ')})` } }
        },
      })
      rules.push({
        name: 'text-mix-arb',
        pattern: /^text-mix-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) { return null }
          return { properties: { color: `color-mix(in var(--coral-mix-space, srgb), ${value.replace(/_/g, ' ')})` } }
        },
      })
      rules.push({
        name: 'border-mix-arb',
        pattern: /^border-mix-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) { return null }
          return { properties: { 'border-color': `color-mix(in var(--coral-mix-space, srgb), ${value.replace(/_/g, ' ')})` } }
        },
      })

      // ============================================
      // Light-Dark Function
      // ============================================
      rules.push({
        name: 'bg-light-dark-arb',
        pattern: /^bg-light-dark-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) { return null }
          const [light, dark] = value.split(',').map(v => v.trim())
          return { properties: { 'background-color': `light-dark(${light}, ${dark})` } }
        },
      })
      rules.push({
        name: 'text-light-dark-arb',
        pattern: /^text-light-dark-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) { return null }
          const [light, dark] = value.split(',').map(v => v.trim())
          return { properties: { color: `light-dark(${light}, ${dark})` } }
        },
      })

      // ============================================
      // Relative Colors (from keyword)
      // ============================================
      rules.push({
        name: 'bg-relative-arb',
        pattern: /^bg-relative-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) { return null }
          return { properties: { 'background-color': value.replace(/_/g, ' ') } }
        },
      })

      // ============================================
      // CSS @property Support Utilities
      // ============================================
      rules.push({
        name: 'property-number',
        pattern: 'property-number',
        properties: { '--coral-property-syntax': '<number>' },
      })
      rules.push({
        name: 'property-percentage',
        pattern: 'property-percentage',
        properties: { '--coral-property-syntax': '<percentage>' },
      })
      rules.push({
        name: 'property-length',
        pattern: 'property-length',
        properties: { '--coral-property-syntax': '<length>' },
      })
      rules.push({
        name: 'property-color',
        pattern: 'property-color',
        properties: { '--coral-property-syntax': '<color>' },
      })
      rules.push({
        name: 'property-angle',
        pattern: 'property-angle',
        properties: { '--coral-property-syntax': '<angle>' },
      })
      rules.push({
        name: 'property-inherit',
        pattern: 'property-inherit',
        properties: { '--coral-property-inherits': 'true' },
      })
      rules.push({
        name: 'property-no-inherit',
        pattern: 'property-no-inherit',
        properties: { '--coral-property-inherits': 'false' },
      })

      // ============================================
      // Interpolate Size (for transitioning auto)
      // ============================================
      rules.push({
        name: 'interpolate-size-allow-keywords',
        pattern: 'interpolate-size-allow-keywords',
        properties: { 'interpolate-size': 'allow-keywords' },
      })
      rules.push({
        name: 'interpolate-size-numeric-only',
        pattern: 'interpolate-size-numeric-only',
        properties: { 'interpolate-size': 'numeric-only' },
      })

      // ============================================
      // Calc-Size (for animating to/from auto)
      // ============================================
      rules.push({
        name: 'h-calc-size-auto',
        pattern: 'h-calc-size-auto',
        properties: { height: 'calc-size(auto)' },
      })
      rules.push({
        name: 'w-calc-size-auto',
        pattern: 'w-calc-size-auto',
        properties: { width: 'calc-size(auto)' },
      })
      rules.push({
        name: 'max-h-calc-size-auto',
        pattern: 'max-h-calc-size-auto',
        properties: { 'max-height': 'calc-size(auto)' },
      })
      rules.push({
        name: 'max-w-calc-size-auto',
        pattern: 'max-w-calc-size-auto',
        properties: { 'max-width': 'calc-size(auto)' },
      })

      // ============================================
      // Inert Attribute Support
      // ============================================
      rules.push({
        name: 'inert',
        pattern: 'inert',
        properties: {
          'pointer-events': 'none',
          'user-select': 'none',
          opacity: '0.5',
        },
      })

      // ============================================
      // CSS Trigonometric Functions
      // ============================================

      const trigFunctions = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'atan2']
      for (const fn of trigFunctions) {
        rules.push({
          name: `${fn}-arb`,
          pattern: new RegExp(`^${fn}-\\[(.+?)\\]$`),
          handler: (match) => ({
            properties: { '--coral-trig': `${fn}(${match[1]})` },
          }),
        })
      }

      // ============================================
      // CSS Exponential Functions
      // ============================================

      const expFunctions = ['exp', 'pow', 'sqrt', 'hypot', 'log', 'log10', 'log2']
      for (const fn of expFunctions) {
        rules.push({
          name: `${fn}-arb`,
          pattern: new RegExp(`^${fn}-\\[(.+?)\\]$`),
          handler: (match) => ({
            properties: { '--coral-exp': `${fn}(${match[1]})` },
          }),
        })
      }

      // ============================================
      // CSS Sign-Modulated Functions
      // ============================================

      rules.push({
        name: 'mod-arb',
        pattern: /^mod-\[(.+?)\]$/,
        handler: (match) => ({
          properties: { '--coral-mod': `mod(${match[1]})` },
        }),
      })
      rules.push({
        name: 'rem-arb',
        pattern: /^rem-\[(.+?)\]$/,
        handler: (match) => ({
          properties: { '--coral-rem': `rem(${match[1]})` },
        }),
      })

      // ============================================
      // CSS Numeric Constants
      // ============================================

      rules.push({ name: 'e-constant', pattern: 'e-constant', properties: { '--coral-e': '2.718281828459045' } })
      rules.push({ name: 'pi-constant', pattern: 'pi-constant', properties: { '--coral-pi': '3.141592653589793' } })

      // ============================================
      // Absolute Color Functions (oklab, oklch)
      // ============================================

      rules.push({
        name: 'oklab-arb',
        pattern: /^oklab-\[(.+?)\]$/,
        handler: (match) => ({
          properties: { color: `oklab(${match[1]})` },
        }),
      })
      rules.push({
        name: 'oklch-arb',
        pattern: /^oklch-\[(.+?)\]$/,
        handler: (match) => ({
          properties: { color: `oklch(${match[1]})` },
        }),
      })
      rules.push({
        name: 'bg-oklab-arb',
        pattern: /^bg-oklab-\[(.+?)\]$/,
        handler: (match) => ({
          properties: { 'background-color': `oklab(${match[1]})` },
        }),
      })
      rules.push({
        name: 'bg-oklch-arb',
        pattern: /^bg-oklch-\[(.+?)\]$/,
        handler: (match) => ({
          properties: { 'background-color': `oklch(${match[1]})` },
        }),
      })

      // ============================================
      // Color-contrast Function
      // ============================================

      rules.push({
        name: 'text-contrast-arb',
        pattern: /^text-contrast-\[(.+?)\]$/,
        handler: (match) => ({
          properties: { color: `color-contrast(${match[1]})` },
        }),
      })
      rules.push({
        name: 'bg-contrast-arb',
        pattern: /^bg-contrast-\[(.+?)\]$/,
        handler: (match) => ({
          properties: { 'background-color': `color-contrast(${match[1]})` },
        }),
      })

      // ============================================
      // Color-adjust Function
      // ============================================

      rules.push({
        name: 'text-adjust-arb',
        pattern: /^text-adjust-\[(.+?)\]$/,
        handler: (match) => ({
          properties: { color: `color-adjust(${match[1]})` },
        }),
      })

      // ============================================
      // Content-Visibility (Performance)
      // ============================================

      rules.push({
        name: 'content-visibility-visible',
        pattern: 'content-visibility-visible',
        properties: { 'content-visibility': 'visible' },
      })
      rules.push({
        name: 'content-visibility-auto',
        pattern: 'content-visibility-auto',
        properties: { 'content-visibility': 'auto' },
      })
      rules.push({
        name: 'content-visibility-hidden',
        pattern: 'content-visibility-hidden',
        properties: { 'content-visibility': 'hidden' },
      })

      // ============================================
      // Contain Property (Performance/Isolation)
      // ============================================

      rules.push({ name: 'contain-none', pattern: 'contain-none', properties: { contain: 'none' } })
      rules.push({ name: 'contain-strict', pattern: 'contain-strict', properties: { contain: 'strict' } })
      rules.push({ name: 'contain-content', pattern: 'contain-content', properties: { contain: 'content' } })
      rules.push({ name: 'contain-size', pattern: 'contain-size', properties: { contain: 'size' } })
      rules.push({ name: 'contain-inline-size', pattern: 'contain-inline-size', properties: { contain: 'inline-size' } })
      rules.push({ name: 'contain-layout', pattern: 'contain-layout', properties: { contain: 'layout' } })
      rules.push({ name: 'contain-style', pattern: 'contain-style', properties: { contain: 'style' } })
      rules.push({ name: 'contain-paint', pattern: 'contain-paint', properties: { contain: 'paint' } })

      // Combinations
      rules.push({ name: 'contain-size-layout', pattern: 'contain-size-layout', properties: { contain: 'size layout' } })
      rules.push({ name: 'contain-size-layout-paint', pattern: 'contain-size-layout-paint', properties: { contain: 'size layout paint' } })
      rules.push({ name: 'contain-layout-paint', pattern: 'contain-layout-paint', properties: { contain: 'layout paint' } })
      rules.push({ name: 'contain-layout-style', pattern: 'contain-layout-style', properties: { contain: 'layout style' } })
      rules.push({ name: 'contain-paint-style', pattern: 'contain-paint-style', properties: { contain: 'paint style' } })

      // ============================================
      // Anchor Positioning Functions
      // ============================================

      // anchor() function for positioning
      rules.push({
        name: 'anchor-top-arb',
        pattern: /^anchor-top-\[(.+?)\]$/,
        handler: (match) => ({
          properties: { '--coral-anchor-top': `anchor(${match[1]} top)` },
        }),
      })
      rules.push({
        name: 'anchor-left-arb',
        pattern: /^anchor-left-\[(.+?)\]$/,
        handler: (match) => ({
          properties: { '--coral-anchor-left': `anchor(${match[1]} left)` },
        }),
      })
      rules.push({
        name: 'anchor-right-arb',
        pattern: /^anchor-right-\[(.+?)\]$/,
        handler: (match) => ({
          properties: { '--coral-anchor-right': `anchor(${match[1]} right)` },
        }),
      })
      rules.push({
        name: 'anchor-bottom-arb',
        pattern: /^anchor-bottom-\[(.+?)\]$/,
        handler: (match) => ({
          properties: { '--coral-anchor-bottom': `anchor(${match[1]} bottom)` },
        }),
      })
      rules.push({
        name: 'anchor-center-arb',
        pattern: /^anchor-center-\[(.+?)\]$/,
        handler: (match) => ({
          properties: { '--coral-anchor-center': `anchor(${match[1]} center)` },
        }),
      })

      // anchor-size() function for sizing
      rules.push({
        name: 'anchor-width-arb',
        pattern: /^anchor-width-\[(.+?)\]$/,
        handler: (match) => ({
          properties: { '--coral-anchor-width': `anchor-size(${match[1]} width)` },
        }),
      })
      rules.push({
        name: 'anchor-height-arb',
        pattern: /^anchor-height-\[(.+?)\]$/,
        handler: (match) => ({
          properties: { '--coral-anchor-height': `anchor-size(${match[1]} height)` },
        }),
      })

      // ============================================
      // CSS View Transitions API Enhancements
      // ============================================

      // View transition types
      rules.push({
        name: 'view-transition-type-root',
        pattern: 'view-transition-type-root',
        properties: { 'view-transition-type': 'root' },
      })
      rules.push({
        name: 'view-transition-type-arb',
        pattern: /^view-transition-type-\[(.+?)\]$/,
        handler: (match) => ({
          properties: { 'view-transition-type': match[1] },
        }),
      })

      // ============================================
      // Transition Auto-Start Enhancement
      // ============================================

      rules.push({
        name: 'transition-start-auto',
        pattern: 'transition-start-auto',
        properties: { 'transition-start': 'auto' },
      })
      rules.push({
        name: 'transition-start-normal',
        pattern: 'transition-start-normal',
        properties: { 'transition-start': 'normal' },
      })

      // ============================================
      // Register all rules
      // ============================================
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default modernCSSPlugin
