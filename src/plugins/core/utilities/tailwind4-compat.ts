/**
 * Tailwind CSS 4.1+ Compatibility Utilities
 *
 * This plugin adds utilities that match Tailwind CSS 4.1+ features,
 * ensuring users migrating from Tailwind have a seamless experience.
 *
 * @module plugins/core/utilities/tailwind4-compat
 */

import type { Plugin, Rule, PluginContext } from '../../../types'

/**
 * Tailwind 4.1+ compatibility plugin
 *
 * Adds:
 * - color-scheme utilities
 * - overflow-wrap utilities
 * - inert styling utilities
 * - text-shadow utilities (Tailwind 4.1)
 * - colored drop-shadow utilities
 * - native carousel utilities
 * - scroll state utilities
 * - @starting-style related utilities
 */
export function tailwind4CompatPlugin(): Plugin {
  return {
    name: 'tailwind4-compat',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // ============================================
      // COLOR-SCHEME UTILITIES
      // Tailwind 4.x: Built-in support for color-scheme
      // ============================================

      rules.push({
        name: 'color-scheme-light',
        pattern: 'color-scheme-light',
        properties: { 'color-scheme': 'light' },
      })
      rules.push({
        name: 'color-scheme-dark',
        pattern: 'color-scheme-dark',
        properties: { 'color-scheme': 'dark' },
      })
      rules.push({
        name: 'color-scheme-light-dark',
        pattern: 'color-scheme-light-dark',
        properties: { 'color-scheme': 'light dark' },
      })
      rules.push({
        name: 'color-scheme-normal',
        pattern: 'color-scheme-normal',
        properties: { 'color-scheme': 'normal' },
      })
      rules.push({
        name: 'color-scheme-only-light',
        pattern: 'color-scheme-only-light',
        properties: { 'color-scheme': 'only light' },
      })
      rules.push({
        name: 'color-scheme-only-dark',
        pattern: 'color-scheme-only-dark',
        properties: { 'color-scheme': 'only dark' },
      })

      // ============================================
      // OVERFLOW-WRAP UTILITIES
      // Tailwind 4.1: Fine-grained text wrapping control
      // ============================================

      rules.push({
        name: 'overflow-wrap-normal',
        pattern: 'overflow-wrap-normal',
        properties: { 'overflow-wrap': 'normal' },
      })
      rules.push({
        name: 'overflow-wrap-anywhere',
        pattern: 'overflow-wrap-anywhere',
        properties: { 'overflow-wrap': 'anywhere' },
      })
      rules.push({
        name: 'overflow-wrap-break-word',
        pattern: 'overflow-wrap-break-word',
        properties: { 'overflow-wrap': 'break-word' },
      })
      // Shorthand aliases
      rules.push({
        name: 'wrap-normal',
        pattern: 'wrap-normal',
        properties: { 'overflow-wrap': 'normal' },
      })
      rules.push({
        name: 'wrap-anywhere',
        pattern: 'wrap-anywhere',
        properties: { 'overflow-wrap': 'anywhere' },
      })
      rules.push({
        name: 'wrap-break-word',
        pattern: 'wrap-break-word',
        properties: { 'overflow-wrap': 'break-word' },
      })

      // Word-break utilities for completeness
      rules.push({
        name: 'word-break-normal',
        pattern: 'word-break-normal',
        properties: { 'word-break': 'normal' },
      })
      rules.push({
        name: 'word-break-all',
        pattern: 'word-break-all',
        properties: { 'word-break': 'break-all' },
      })
      rules.push({
        name: 'word-break-keep',
        pattern: 'word-break-keep',
        properties: { 'word-break': 'keep-all' },
      })
      rules.push({
        name: 'word-break-auto-phrase',
        pattern: 'word-break-auto-phrase',
        properties: { 'word-break': 'auto-phrase' },
      })

      // ============================================
      // INERT UTILITIES (Enhanced)
      // Tailwind 4.x: inert attribute support
      // ============================================

      rules.push({
        name: 'inert-default',
        pattern: 'inert-default',
        properties: {
          'pointer-events': 'none',
          'user-select': 'none',
        },
      })
      rules.push({
        name: 'inert-fade',
        pattern: 'inert-fade',
        properties: {
          'pointer-events': 'none',
          'user-select': 'none',
          'opacity': '0.5',
        },
      })
      rules.push({
        name: 'inert-grayscale',
        pattern: 'inert-grayscale',
        properties: {
          'pointer-events': 'none',
          'user-select': 'none',
          'filter': 'grayscale(100%)',
          'opacity': '0.6',
        },
      })
      rules.push({
        name: 'inert-blur',
        pattern: 'inert-blur',
        properties: {
          'pointer-events': 'none',
          'user-select': 'none',
          'filter': 'blur(2px)',
          'opacity': '0.7',
        },
      })

      // ============================================
      // TEXT SHADOW UTILITIES
      // Tailwind 4.1: Finally added after 20 years!
      // ============================================

      const textShadowSizes = {
        'sm': '0 1px 2px var(--coral-text-shadow-color, rgba(0, 0, 0, 0.1))',
        'DEFAULT': '0 2px 4px var(--coral-text-shadow-color, rgba(0, 0, 0, 0.1))',
        'md': '0 4px 8px var(--coral-text-shadow-color, rgba(0, 0, 0, 0.15))',
        'lg': '0 8px 16px var(--coral-text-shadow-color, rgba(0, 0, 0, 0.2))',
        'xl': '0 12px 24px var(--coral-text-shadow-color, rgba(0, 0, 0, 0.25))',
        '2xl': '0 16px 32px var(--coral-text-shadow-color, rgba(0, 0, 0, 0.3))',
        'none': 'none',
      }

      for (const [size, value] of Object.entries(textShadowSizes)) {
        const className = size === 'DEFAULT' ? 'text-shadow' : `text-shadow-${size}`
        rules.push({
          name: className,
          pattern: className,
          properties: { 'text-shadow': value },
        })
      }

      // Text shadow colors (Tailwind 4.1 feature) - Dynamic pattern instead of static rules
      const validColors = new Set([
        'slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber',
        'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue',
        'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose', 'coral',
      ])
      const validShades = new Set(['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'])

      rules.push({
        name: 'text-shadow-color',
        pattern: /^text-shadow-(\w+)-(\d+)$/,
        handler: (match) => {
          const color = match[1]
          const shade = match[2]
          if (!color || !shade || !validColors.has(color) || !validShades.has(shade)) return null
          return {
            properties: {
              '--coral-text-shadow-color': `var(--colors-${color}-${shade})`,
            },
          }
        },
      })

      // Arbitrary text shadow color with opacity
      rules.push({
        name: 'text-shadow-color-arb',
        pattern: /^text-shadow-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return {
            properties: {
              '--coral-text-shadow-color': value.replace(/_/g, ' '),
            },
          }
        },
      })

      // Text shadow with opacity modifier (like text-shadow-red-500/50)
      rules.push({
        name: 'text-shadow-color-opacity',
        pattern: /^text-shadow-(\w+)-(\d+)\/(\d+)$/,
        handler: (match) => {
          const color = match[1]
          const shade = match[2]
          const opacity = match[3]
          if (!color || !shade || !opacity) return null
          return {
            properties: {
              '--coral-text-shadow-color': `color-mix(in srgb, var(--colors-${color}-${shade}) ${opacity}%, transparent)`,
            },
          }
        },
      })

      // ============================================
      // COLORED DROP SHADOW UTILITIES
      // Tailwind 4.1: Colored drop shadows - Dynamic pattern
      // ============================================

      const dropShadowShades = new Set(['400', '500', '600'])

      rules.push({
        name: 'drop-shadow-color',
        pattern: /^drop-shadow-(\w+)-(\d+)$/,
        handler: (match) => {
          const color = match[1]
          const shade = match[2]
          if (!color || !shade || !validColors.has(color) || !dropShadowShades.has(shade)) return null
          return {
            properties: {
              'filter': `drop-shadow(0 4px 6px var(--colors-${color}-${shade}))`,
            },
          }
        },
      })

      // Neon glow effect variant
      rules.push({
        name: 'drop-shadow-color-glow',
        pattern: /^drop-shadow-(\w+)-(\d+)-glow$/,
        handler: (match) => {
          const color = match[1]
          const shade = match[2]
          if (!color || !shade || !validColors.has(color) || !dropShadowShades.has(shade)) return null
          return {
            properties: {
              'filter': `drop-shadow(0 0 10px var(--colors-${color}-${shade})) drop-shadow(0 0 20px var(--colors-${color}-${shade}))`,
            },
          }
        },
      })

      // ============================================
      // NATIVE CAROUSEL UTILITIES (CSS Carousels)
      // Future CSS feature for native carousels
      // ============================================

      // Scroll marker group
      rules.push({
        name: 'scroll-marker-group-before',
        pattern: 'scroll-marker-group-before',
        properties: { 'scroll-marker-group': 'before' },
      })
      rules.push({
        name: 'scroll-marker-group-after',
        pattern: 'scroll-marker-group-after',
        properties: { 'scroll-marker-group': 'after' },
      })

      // Scroll marker styling (pseudo-element)
      rules.push({
        name: 'carousel-marker',
        pattern: 'carousel-marker',
        properties: {
          '--coral-carousel-marker-size': '8px',
          '--coral-carousel-marker-gap': '8px',
        },
      })
      rules.push({
        name: 'carousel-marker-sm',
        pattern: 'carousel-marker-sm',
        properties: {
          '--coral-carousel-marker-size': '6px',
          '--coral-carousel-marker-gap': '6px',
        },
      })
      rules.push({
        name: 'carousel-marker-lg',
        pattern: 'carousel-marker-lg',
        properties: {
          '--coral-carousel-marker-size': '12px',
          '--coral-carousel-marker-gap': '12px',
        },
      })

      // Scroll buttons
      rules.push({
        name: 'carousel-buttons',
        pattern: 'carousel-buttons',
        properties: {
          '--coral-carousel-button-size': '40px',
        },
      })
      rules.push({
        name: 'carousel-buttons-sm',
        pattern: 'carousel-buttons-sm',
        properties: {
          '--coral-carousel-button-size': '32px',
        },
      })
      rules.push({
        name: 'carousel-buttons-lg',
        pattern: 'carousel-buttons-lg',
        properties: {
          '--coral-carousel-button-size': '48px',
        },
      })

      // ============================================
      // SCROLL STATE UTILITIES
      // CSS Scroll State Queries (experimental)
      // ============================================

      // Scroll state indicators (CSS custom properties)
      rules.push({
        name: 'scroll-state-stuck',
        pattern: 'scroll-state-stuck',
        properties: {
          '--coral-scroll-state': 'stuck',
        },
      })
      rules.push({
        name: 'scroll-state-snapped',
        pattern: 'scroll-state-snapped',
        properties: {
          '--coral-scroll-state': 'snapped',
        },
      })
      rules.push({
        name: 'scroll-state-overflowing',
        pattern: 'scroll-state-overflowing',
        properties: {
          '--coral-scroll-state': 'overflowing',
        },
      })

      // Sticky position utilities with scroll state awareness
      rules.push({
        name: 'sticky-header',
        pattern: 'sticky-header',
        properties: {
          'position': 'sticky',
          'top': '0',
          'z-index': '40',
        },
      })
      rules.push({
        name: 'sticky-footer',
        pattern: 'sticky-footer',
        properties: {
          'position': 'sticky',
          'bottom': '0',
          'z-index': '40',
        },
      })
      rules.push({
        name: 'sticky-sidebar',
        pattern: 'sticky-sidebar',
        properties: {
          'position': 'sticky',
          'top': '1rem',
          'align-self': 'start',
        },
      })

      // ============================================
      // COMPLEX SHADOW UTILITIES
      // Tailwind 4.x: Enhanced shadow system
      // ============================================

      // Inner shadow combinations
      rules.push({
        name: 'shadow-inner-sm',
        pattern: 'shadow-inner-sm',
        properties: {
          'box-shadow': 'inset 0 1px 2px 0 rgb(0 0 0 / 0.05)',
        },
      })
      rules.push({
        name: 'shadow-inner-md',
        pattern: 'shadow-inner-md',
        properties: {
          'box-shadow': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.1)',
        },
      })
      rules.push({
        name: 'shadow-inner-lg',
        pattern: 'shadow-inner-lg',
        properties: {
          'box-shadow': 'inset 0 4px 6px -1px rgb(0 0 0 / 0.15)',
        },
      })

      // Multi-layer shadows (depth effect)
      rules.push({
        name: 'shadow-depth',
        pattern: 'shadow-depth',
        properties: {
          'box-shadow': '0 1px 1px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075)',
        },
      })
      rules.push({
        name: 'shadow-depth-sm',
        pattern: 'shadow-depth-sm',
        properties: {
          'box-shadow': '0 1px 1px hsl(0deg 0% 0% / 0.05), 0 2px 2px hsl(0deg 0% 0% / 0.05)',
        },
      })
      rules.push({
        name: 'shadow-depth-lg',
        pattern: 'shadow-depth-lg',
        properties: {
          'box-shadow': '0 1px 1px hsl(0deg 0% 0% / 0.08), 0 2px 2px hsl(0deg 0% 0% / 0.08), 0 4px 4px hsl(0deg 0% 0% / 0.08), 0 8px 8px hsl(0deg 0% 0% / 0.08), 0 16px 16px hsl(0deg 0% 0% / 0.08)',
        },
      })

      // Elevation shadows (Material Design-like) - Dynamic pattern
      const validElevations = new Set([1, 2, 3, 4, 5, 6, 8, 12, 16, 24])
      rules.push({
        name: 'elevation-dynamic',
        pattern: /^elevation-(\d+)$/,
        handler: (match) => {
          const levelStr = match[1]
          if (!levelStr) return null
          const level = parseInt(levelStr, 10)
          if (!validElevations.has(level)) return null
          return {
            properties: {
              'box-shadow': `0 ${level}px ${level * 2}px -${Math.floor(level / 2)}px rgb(0 0 0 / ${0.1 + level * 0.01}), 0 ${Math.floor(level / 2)}px ${level}px -${Math.floor(level / 2)}px rgb(0 0 0 / ${0.06 + level * 0.005})`,
            },
          }
        },
      })

      // ============================================
      // FORCED COLORS MODE
      // Accessibility: Windows High Contrast Mode
      // ============================================

      rules.push({
        name: 'forced-color-adjust-auto',
        pattern: 'forced-color-adjust-auto',
        properties: { 'forced-color-adjust': 'auto' },
      })
      rules.push({
        name: 'forced-color-adjust-none',
        pattern: 'forced-color-adjust-none',
        properties: { 'forced-color-adjust': 'none' },
      })

      // ============================================
      // ACCENT COLOR UTILITIES
      // Tailwind: accent-color for form elements
      // ============================================

      rules.push({
        name: 'accent-auto',
        pattern: 'accent-auto',
        properties: { 'accent-color': 'auto' },
      })
      rules.push({
        name: 'accent-current',
        pattern: 'accent-current',
        properties: { 'accent-color': 'currentColor' },
      })
      rules.push({
        name: 'accent-inherit',
        pattern: 'accent-inherit',
        properties: { 'accent-color': 'inherit' },
      })

      // Dynamic pattern for accent colors
      rules.push({
        name: 'accent-color-dynamic',
        pattern: /^accent-(\w+)-(\d+)$/,
        handler: (match) => {
          const color = match[1]
          const shade = match[2]
          if (!color || !shade || !validColors.has(color) || !dropShadowShades.has(shade)) return null
          return {
            properties: {
              'accent-color': `var(--colors-${color}-${shade})`,
            },
          }
        },
      })

      // ============================================
      // CARET COLOR UTILITIES
      // Tailwind: caret-color for text inputs
      // ============================================

      rules.push({
        name: 'caret-auto',
        pattern: 'caret-auto',
        properties: { 'caret-color': 'auto' },
      })
      rules.push({
        name: 'caret-current',
        pattern: 'caret-current',
        properties: { 'caret-color': 'currentColor' },
      })
      rules.push({
        name: 'caret-transparent',
        pattern: 'caret-transparent',
        properties: { 'caret-color': 'transparent' },
      })

      // Dynamic pattern for caret colors
      rules.push({
        name: 'caret-color-dynamic',
        pattern: /^caret-(\w+)-(\d+)$/,
        handler: (match) => {
          const color = match[1]
          const shade = match[2]
          if (!color || !shade || !validColors.has(color) || !dropShadowShades.has(shade)) return null
          return {
            properties: {
              'caret-color': `var(--colors-${color}-${shade})`,
            },
          }
        },
      })

      // ============================================
      // SCROLL MARGIN & PADDING UTILITIES
      // Tailwind: scroll-m-*, scroll-p-* - Dynamic patterns
      // ============================================

      const scrollSpacingValues: Record<string, string> = {
        '0': '0px', '1': '0.25rem', '2': '0.5rem', '3': '0.75rem', '4': '1rem',
        '5': '1.25rem', '6': '1.5rem', '8': '2rem', '10': '2.5rem', '12': '3rem',
        '16': '4rem', '20': '5rem', '24': '6rem', '32': '8rem',
      }

      const scrollMarginProps: Record<string, string> = {
        'm': 'scroll-margin',
        'mx': 'scroll-margin-inline',
        'my': 'scroll-margin-block',
        'mt': 'scroll-margin-top',
        'mr': 'scroll-margin-right',
        'mb': 'scroll-margin-bottom',
        'ml': 'scroll-margin-left',
      }

      const scrollPaddingProps: Record<string, string> = {
        'p': 'scroll-padding',
        'px': 'scroll-padding-inline',
        'py': 'scroll-padding-block',
        'pt': 'scroll-padding-top',
        'pr': 'scroll-padding-right',
        'pb': 'scroll-padding-bottom',
        'pl': 'scroll-padding-left',
      }

      // Dynamic scroll margin
      rules.push({
        name: 'scroll-margin-dynamic',
        pattern: /^scroll-(m|mx|my|mt|mr|mb|ml)-(\d+)$/,
        handler: (match) => {
          const dir = match[1]
          const size = match[2]
          if (!dir || !size) return null
          const prop = scrollMarginProps[dir]
          const value = scrollSpacingValues[size]
          if (!prop || !value) return null
          return { properties: { [prop]: value } }
        },
      })

      // Dynamic scroll padding
      rules.push({
        name: 'scroll-padding-dynamic',
        pattern: /^scroll-(p|px|py|pt|pr|pb|pl)-(\d+)$/,
        handler: (match) => {
          const dir = match[1]
          const size = match[2]
          if (!dir || !size) return null
          const prop = scrollPaddingProps[dir]
          const value = scrollSpacingValues[size]
          if (!prop || !value) return null
          return { properties: { [prop]: value } }
        },
      })

      // ============================================
      // TOUCH ACTION UTILITIES (Complete)
      // Tailwind: touch-*
      // ============================================

      rules.push({ name: 'touch-auto', pattern: 'touch-auto', properties: { 'touch-action': 'auto' } })
      rules.push({ name: 'touch-none', pattern: 'touch-none', properties: { 'touch-action': 'none' } })
      rules.push({ name: 'touch-pan-x', pattern: 'touch-pan-x', properties: { 'touch-action': 'pan-x' } })
      rules.push({ name: 'touch-pan-left', pattern: 'touch-pan-left', properties: { 'touch-action': 'pan-left' } })
      rules.push({ name: 'touch-pan-right', pattern: 'touch-pan-right', properties: { 'touch-action': 'pan-right' } })
      rules.push({ name: 'touch-pan-y', pattern: 'touch-pan-y', properties: { 'touch-action': 'pan-y' } })
      rules.push({ name: 'touch-pan-up', pattern: 'touch-pan-up', properties: { 'touch-action': 'pan-up' } })
      rules.push({ name: 'touch-pan-down', pattern: 'touch-pan-down', properties: { 'touch-action': 'pan-down' } })
      rules.push({ name: 'touch-pinch-zoom', pattern: 'touch-pinch-zoom', properties: { 'touch-action': 'pinch-zoom' } })
      rules.push({ name: 'touch-manipulation', pattern: 'touch-manipulation', properties: { 'touch-action': 'manipulation' } })

      // ============================================
      // WILL-CHANGE UTILITIES (Complete)
      // Tailwind: will-change-*
      // ============================================

      rules.push({ name: 'will-change-auto', pattern: 'will-change-auto', properties: { 'will-change': 'auto' } })
      rules.push({ name: 'will-change-scroll', pattern: 'will-change-scroll', properties: { 'will-change': 'scroll-position' } })
      rules.push({ name: 'will-change-contents', pattern: 'will-change-contents', properties: { 'will-change': 'contents' } })
      rules.push({ name: 'will-change-transform', pattern: 'will-change-transform', properties: { 'will-change': 'transform' } })
      rules.push({ name: 'will-change-opacity', pattern: 'will-change-opacity', properties: { 'will-change': 'opacity' } })
      rules.push({ name: 'will-change-filter', pattern: 'will-change-filter', properties: { 'will-change': 'filter' } })

      // ============================================
      // Register all rules
      // ============================================
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default tailwind4CompatPlugin
