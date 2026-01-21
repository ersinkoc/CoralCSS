/**
 * Popover API Plugin
 *
 * Utilities for the native HTML Popover API.
 * Provides styling for popover elements, anchor positioning,
 * animations, and backdrop handling.
 *
 * @module plugins/optional/popover-api
 */

import type { Plugin, Rule, PluginContext } from '../../types'

/**
 * Popover API plugin options
 */
export interface PopoverAPIPluginOptions {
  /** Enable popover display utilities */
  display?: boolean
  /** Enable anchor positioning utilities */
  anchor?: boolean
  /** Enable popover animations */
  animations?: boolean
  /** Enable backdrop utilities */
  backdrop?: boolean
  /** Enable popover state utilities */
  states?: boolean
  /** Custom animation duration */
  animationDuration?: string
}

const defaultOptions: PopoverAPIPluginOptions = {
  display: true,
  anchor: true,
  animations: true,
  backdrop: true,
  states: true,
  animationDuration: '200ms',
}

/**
 * Check if the native Popover API is supported in the current environment
 */
export function isPopoverSupported(): boolean {
  if (typeof HTMLElement === 'undefined') return false
  return 'popover' in HTMLElement.prototype
}

/**
 * Check if CSS Anchor Positioning is supported
 */
export function isAnchorPositioningSupported(): boolean {
  if (typeof CSS === 'undefined' || !CSS.supports) return false
  return CSS.supports('anchor-name', '--test')
}

/**
 * Popover API plugin for native HTML popovers
 */
export function popoverAPIPlugin(options: PopoverAPIPluginOptions = {}): Plugin {
  const opts = { ...defaultOptions, ...options }

  return {
    name: 'popover-api',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // ========================================
      // POPOVER DISPLAY UTILITIES
      // ========================================
      if (opts.display) {
        // Popover attribute utilities
        rules.push({
          pattern: 'popover-auto',
          properties: {
            'popover': 'auto',
          },
        })
        rules.push({
          pattern: 'popover-manual',
          properties: {
            'popover': 'manual',
          },
        })
        rules.push({
          pattern: 'popover-hint',
          properties: {
            'popover': 'hint',
          },
        })

        // Popover base styles (apply to elements with [popover])
        rules.push({
          pattern: 'popover-base',
          properties: {
            'position': 'fixed',
            'inset': 'unset',
            'margin': '0',
            'padding': '1rem',
            'border': '1px solid hsl(var(--border))',
            'border-radius': 'var(--radius)',
            'background-color': 'hsl(var(--popover))',
            'color': 'hsl(var(--popover-foreground))',
            'box-shadow': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            'max-width': 'calc(100vw - 2rem)',
            'max-height': 'calc(100vh - 2rem)',
            'overflow': 'auto',
          },
        })

        // Popover size variants
        rules.push({
          pattern: 'popover-sm',
          properties: {
            'padding': '0.5rem 0.75rem',
            'font-size': '0.875rem',
          },
        })
        rules.push({
          pattern: 'popover-lg',
          properties: {
            'padding': '1.5rem',
            'font-size': '1rem',
          },
        })
        rules.push({
          pattern: 'popover-xl',
          properties: {
            'padding': '2rem',
            'font-size': '1.125rem',
          },
        })

        // Popover width utilities
        rules.push({ pattern: 'popover-w-auto', properties: { width: 'auto' } })
        rules.push({ pattern: 'popover-w-48', properties: { width: '12rem' } })
        rules.push({ pattern: 'popover-w-64', properties: { width: '16rem' } })
        rules.push({ pattern: 'popover-w-80', properties: { width: '20rem' } })
        rules.push({ pattern: 'popover-w-96', properties: { width: '24rem' } })
        rules.push({ pattern: 'popover-w-full', properties: { width: '100%' } })
        rules.push({
          pattern: /^popover-w-\[(.+)\]$/,
          handler: (match) => {
            const v = match[1]
            if (!v) return null
            return { properties: { width: v } }
          },
        })
      }

      // ========================================
      // ANCHOR POSITIONING
      // ========================================
      if (opts.anchor) {
        // Anchor name (for the target element)
        rules.push({
          pattern: /^anchor-name-\[(.+)\]$/,
          handler: (match) => {
            const v = match[1]
            if (!v) return null
            return { properties: { 'anchor-name': `--${v}` } }
          },
        })

        // Position anchor (for the popover)
        rules.push({
          pattern: /^position-anchor-\[(.+)\]$/,
          handler: (match) => {
            const v = match[1]
            if (!v) return null
            return { properties: { 'position-anchor': `--${v}` } }
          },
        })

        // Inset area positioning
        const positions = ['top', 'bottom', 'left', 'right', 'center']
        const spans = ['all', 'start', 'end']

        for (const pos of positions) {
          rules.push({
            pattern: `inset-area-${pos}`,
            properties: { 'inset-area': pos },
          })
        }

        // Compound positions
        rules.push({ pattern: 'inset-area-top-left', properties: { 'inset-area': 'top left' } })
        rules.push({ pattern: 'inset-area-top-right', properties: { 'inset-area': 'top right' } })
        rules.push({ pattern: 'inset-area-bottom-left', properties: { 'inset-area': 'bottom left' } })
        rules.push({ pattern: 'inset-area-bottom-right', properties: { 'inset-area': 'bottom right' } })
        rules.push({ pattern: 'inset-area-top-center', properties: { 'inset-area': 'top center' } })
        rules.push({ pattern: 'inset-area-bottom-center', properties: { 'inset-area': 'bottom center' } })
        rules.push({ pattern: 'inset-area-left-center', properties: { 'inset-area': 'left center' } })
        rules.push({ pattern: 'inset-area-right-center', properties: { 'inset-area': 'right center' } })

        // Span positioning
        for (const span of spans) {
          rules.push({
            pattern: `inset-area-span-${span}`,
            properties: { 'inset-area': `span-${span}` },
          })
        }

        // Arbitrary inset-area
        rules.push({
          pattern: /^inset-area-\[(.+)\]$/,
          handler: (match) => {
            const v = match[1]
            if (!v) return null
            return { properties: { 'inset-area': v.replace(/_/g, ' ') } }
          },
        })

        // Position try utilities
        rules.push({
          pattern: 'position-try-flip-block',
          properties: { 'position-try-fallbacks': 'flip-block' },
        })
        rules.push({
          pattern: 'position-try-flip-inline',
          properties: { 'position-try-fallbacks': 'flip-inline' },
        })
        rules.push({
          pattern: 'position-try-flip-both',
          properties: { 'position-try-fallbacks': 'flip-block flip-inline' },
        })

        // Position try order
        rules.push({
          pattern: 'position-try-order-normal',
          properties: { 'position-try-order': 'normal' },
        })
        rules.push({
          pattern: 'position-try-order-most-width',
          properties: { 'position-try-order': 'most-width' },
        })
        rules.push({
          pattern: 'position-try-order-most-height',
          properties: { 'position-try-order': 'most-height' },
        })
        rules.push({
          pattern: 'position-try-order-most-block',
          properties: { 'position-try-order': 'most-block-size' },
        })
        rules.push({
          pattern: 'position-try-order-most-inline',
          properties: { 'position-try-order': 'most-inline-size' },
        })

        // Position visibility
        rules.push({
          pattern: 'position-visibility-always',
          properties: { 'position-visibility': 'always' },
        })
        rules.push({
          pattern: 'position-visibility-anchors-visible',
          properties: { 'position-visibility': 'anchors-visible' },
        })
        rules.push({
          pattern: 'position-visibility-no-overflow',
          properties: { 'position-visibility': 'no-overflow' },
        })

        // Anchor offset utilities
        const offsetSizes = ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16']
        for (const size of offsetSizes) {
          const value = size === '0' ? '0px' : `${parseInt(size, 10) * 0.25}rem`
          rules.push({
            pattern: `anchor-offset-${size}`,
            properties: { 'margin': value },
          })
        }
        rules.push({
          pattern: /^anchor-offset-\[(.+)\]$/,
          handler: (match) => {
            const v = match[1]
            if (!v) return null
            return { properties: { margin: v } }
          },
        })
      }

      // ========================================
      // POPOVER ANIMATIONS
      // ========================================
      if (opts.animations) {
        const duration = opts.animationDuration || '200ms'

        // Basic fade animation
        rules.push({
          pattern: 'popover-animate-fade',
          properties: {
            'opacity': '0',
            'transition': `opacity ${duration} ease-out, display ${duration} allow-discrete, overlay ${duration} allow-discrete`,
          },
        })

        // Scale animation
        rules.push({
          pattern: 'popover-animate-scale',
          properties: {
            'opacity': '0',
            'transform': 'scale(0.95)',
            'transition': `opacity ${duration} ease-out, transform ${duration} ease-out, display ${duration} allow-discrete, overlay ${duration} allow-discrete`,
          },
        })

        // Slide animations
        rules.push({
          pattern: 'popover-animate-slide-up',
          properties: {
            'opacity': '0',
            'transform': 'translateY(0.5rem)',
            'transition': `opacity ${duration} ease-out, transform ${duration} ease-out, display ${duration} allow-discrete, overlay ${duration} allow-discrete`,
          },
        })
        rules.push({
          pattern: 'popover-animate-slide-down',
          properties: {
            'opacity': '0',
            'transform': 'translateY(-0.5rem)',
            'transition': `opacity ${duration} ease-out, transform ${duration} ease-out, display ${duration} allow-discrete, overlay ${duration} allow-discrete`,
          },
        })
        rules.push({
          pattern: 'popover-animate-slide-left',
          properties: {
            'opacity': '0',
            'transform': 'translateX(0.5rem)',
            'transition': `opacity ${duration} ease-out, transform ${duration} ease-out, display ${duration} allow-discrete, overlay ${duration} allow-discrete`,
          },
        })
        rules.push({
          pattern: 'popover-animate-slide-right',
          properties: {
            'opacity': '0',
            'transform': 'translateX(-0.5rem)',
            'transition': `opacity ${duration} ease-out, transform ${duration} ease-out, display ${duration} allow-discrete, overlay ${duration} allow-discrete`,
          },
        })

        // Open state (apply to :popover-open)
        rules.push({
          pattern: 'popover-open-visible',
          properties: {
            'opacity': '1',
            'transform': 'scale(1) translate(0, 0)',
          },
        })

        // Starting style for @starting-style
        rules.push({
          pattern: 'popover-starting-hidden',
          properties: {
            'opacity': '0',
            'transform': 'scale(0.95)',
          },
        })
      }

      // ========================================
      // BACKDROP UTILITIES
      // ========================================
      if (opts.backdrop) {
        // Backdrop for [popover]::backdrop
        rules.push({
          pattern: 'popover-backdrop-none',
          properties: {
            'background': 'transparent',
          },
        })
        rules.push({
          pattern: 'popover-backdrop-dim',
          properties: {
            'background': 'rgb(0 0 0 / 0.2)',
          },
        })
        rules.push({
          pattern: 'popover-backdrop-dark',
          properties: {
            'background': 'rgb(0 0 0 / 0.5)',
          },
        })
        rules.push({
          pattern: 'popover-backdrop-blur',
          properties: {
            'background': 'rgb(0 0 0 / 0.2)',
            'backdrop-filter': 'blur(4px)',
          },
        })
        rules.push({
          pattern: 'popover-backdrop-blur-heavy',
          properties: {
            'background': 'rgb(0 0 0 / 0.3)',
            'backdrop-filter': 'blur(8px)',
          },
        })

        // Backdrop animation
        rules.push({
          pattern: 'popover-backdrop-animate',
          properties: {
            'opacity': '0',
            'transition': `opacity ${opts.animationDuration} ease-out`,
          },
        })
        rules.push({
          pattern: 'popover-backdrop-open',
          properties: {
            'opacity': '1',
          },
        })

        // Arbitrary backdrop
        rules.push({
          pattern: /^popover-backdrop-\[(.+)\]$/,
          handler: (match) => {
            const v = match[1]
            if (!v) return null
            return { properties: { background: v.replace(/_/g, ' ') } }
          },
        })
      }

      // ========================================
      // POPOVER STATE UTILITIES
      // ========================================
      if (opts.states) {
        // Overlay utilities (for stacking)
        rules.push({
          pattern: 'overlay-auto',
          properties: { 'overlay': 'auto' },
        })
        rules.push({
          pattern: 'overlay-none',
          properties: { 'overlay': 'none' },
        })

        // Popover target (for invoker button)
        rules.push({
          pattern: 'popover-target-toggle',
          properties: {
            'cursor': 'pointer',
          },
        })
        rules.push({
          pattern: 'popover-target-show',
          properties: {
            'cursor': 'pointer',
          },
        })
        rules.push({
          pattern: 'popover-target-hide',
          properties: {
            'cursor': 'pointer',
          },
        })

        // Focus trap indicator (for accessibility)
        rules.push({
          pattern: 'popover-focus-trap',
          properties: {
            'outline': 'none',
          },
        })

        // Popover dismiss on escape
        rules.push({
          pattern: 'popover-dismissible',
          properties: {
            '--popover-dismissible': '1',
          },
        })
      }

      // ========================================
      // COMMON POPOVER PATTERNS
      // ========================================

      // Tooltip-style popover
      rules.push({
        pattern: 'popover-tooltip',
        properties: {
          'padding': '0.375rem 0.75rem',
          'font-size': '0.875rem',
          'border-radius': 'calc(var(--radius) - 2px)',
          'background-color': 'hsl(var(--foreground))',
          'color': 'hsl(var(--background))',
          'box-shadow': '0 2px 4px rgb(0 0 0 / 0.1)',
          'white-space': 'nowrap',
        },
      })

      // Dropdown-style popover
      rules.push({
        pattern: 'popover-dropdown',
        properties: {
          'padding': '0.25rem',
          'min-width': '12rem',
          'border-radius': 'var(--radius)',
          'background-color': 'hsl(var(--popover))',
          'border': '1px solid hsl(var(--border))',
          'box-shadow': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
      })

      // Dialog-style popover
      rules.push({
        pattern: 'popover-dialog',
        properties: {
          'padding': '1.5rem',
          'min-width': '20rem',
          'max-width': '32rem',
          'border-radius': 'calc(var(--radius) + 2px)',
          'background-color': 'hsl(var(--popover))',
          'border': '1px solid hsl(var(--border))',
          'box-shadow': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        },
      })

      // Sheet-style popover (slides from edge)
      rules.push({
        pattern: 'popover-sheet-bottom',
        properties: {
          'position': 'fixed',
          'bottom': '0',
          'left': '0',
          'right': '0',
          'margin': '0',
          'border-radius': 'var(--radius) var(--radius) 0 0',
          'max-height': '80vh',
        },
      })
      rules.push({
        pattern: 'popover-sheet-top',
        properties: {
          'position': 'fixed',
          'top': '0',
          'left': '0',
          'right': '0',
          'margin': '0',
          'border-radius': '0 0 var(--radius) var(--radius)',
          'max-height': '80vh',
        },
      })
      rules.push({
        pattern: 'popover-sheet-left',
        properties: {
          'position': 'fixed',
          'top': '0',
          'left': '0',
          'bottom': '0',
          'margin': '0',
          'border-radius': '0 var(--radius) var(--radius) 0',
          'max-width': '80vw',
          'width': '20rem',
        },
      })
      rules.push({
        pattern: 'popover-sheet-right',
        properties: {
          'position': 'fixed',
          'top': '0',
          'right': '0',
          'bottom': '0',
          'margin': '0',
          'border-radius': 'var(--radius) 0 0 var(--radius)',
          'max-width': '80vw',
          'width': '20rem',
        },
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

/**
 * Generate CSS for popover API animations with @starting-style
 */
export function generatePopoverAnimationsCSS(duration = '200ms'): string {
  return `
/* Popover API Animations */
[popover] {
  opacity: 0;
  transform: scale(0.95) translateY(0.25rem);
  transition:
    opacity ${duration} ease-out,
    transform ${duration} ease-out,
    display ${duration} allow-discrete,
    overlay ${duration} allow-discrete;
}

[popover]:popover-open {
  opacity: 1;
  transform: scale(1) translateY(0);
}

@starting-style {
  [popover]:popover-open {
    opacity: 0;
    transform: scale(0.95) translateY(0.25rem);
  }
}

/* Popover backdrop animation */
[popover]::backdrop {
  background: rgb(0 0 0 / 0);
  transition: background ${duration} ease-out, display ${duration} allow-discrete, overlay ${duration} allow-discrete;
}

[popover]:popover-open::backdrop {
  background: rgb(0 0 0 / 0.2);
}

@starting-style {
  [popover]:popover-open::backdrop {
    background: rgb(0 0 0 / 0);
  }
}

/* Slide animations by position */
[popover].popover-slide-up {
  transform: translateY(0.5rem);
}
[popover].popover-slide-up:popover-open {
  transform: translateY(0);
}
@starting-style {
  [popover].popover-slide-up:popover-open {
    transform: translateY(0.5rem);
  }
}

[popover].popover-slide-down {
  transform: translateY(-0.5rem);
}
[popover].popover-slide-down:popover-open {
  transform: translateY(0);
}
@starting-style {
  [popover].popover-slide-down:popover-open {
    transform: translateY(-0.5rem);
  }
}

/* Sheet animations */
[popover].popover-sheet-bottom {
  transform: translateY(100%);
}
[popover].popover-sheet-bottom:popover-open {
  transform: translateY(0);
}
@starting-style {
  [popover].popover-sheet-bottom:popover-open {
    transform: translateY(100%);
  }
}

[popover].popover-sheet-top {
  transform: translateY(-100%);
}
[popover].popover-sheet-top:popover-open {
  transform: translateY(0);
}
@starting-style {
  [popover].popover-sheet-top:popover-open {
    transform: translateY(-100%);
  }
}

[popover].popover-sheet-left {
  transform: translateX(-100%);
}
[popover].popover-sheet-left:popover-open {
  transform: translateX(0);
}
@starting-style {
  [popover].popover-sheet-left:popover-open {
    transform: translateX(-100%);
  }
}

[popover].popover-sheet-right {
  transform: translateX(100%);
}
[popover].popover-sheet-right:popover-open {
  transform: translateX(0);
}
@starting-style {
  [popover].popover-sheet-right:popover-open {
    transform: translateX(100%);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  [popover],
  [popover]::backdrop {
    transition: none;
  }
}
`
}

/**
 * Generate CSS for anchor positioning fallbacks
 */
export function generateAnchorPositioningCSS(): string {
  return `
/* Anchor Positioning Presets */

/* Top-aligned popover */
.anchor-top {
  position-anchor: --trigger;
  inset-area: top;
  margin-bottom: 0.5rem;
}

/* Bottom-aligned popover */
.anchor-bottom {
  position-anchor: --trigger;
  inset-area: bottom;
  margin-top: 0.5rem;
}

/* Left-aligned popover */
.anchor-left {
  position-anchor: --trigger;
  inset-area: left;
  margin-right: 0.5rem;
}

/* Right-aligned popover */
.anchor-right {
  position-anchor: --trigger;
  inset-area: right;
  margin-left: 0.5rem;
}

/* Position try fallbacks */
@position-try --flip-to-bottom {
  inset-area: bottom;
  margin-top: 0.5rem;
  margin-bottom: 0;
}

@position-try --flip-to-top {
  inset-area: top;
  margin-bottom: 0.5rem;
  margin-top: 0;
}

@position-try --flip-to-left {
  inset-area: left;
  margin-right: 0.5rem;
  margin-left: 0;
}

@position-try --flip-to-right {
  inset-area: right;
  margin-left: 0.5rem;
  margin-right: 0;
}

/* Auto-flip popover that prefers top */
.anchor-auto-top {
  position-anchor: --trigger;
  inset-area: top;
  margin-bottom: 0.5rem;
  position-try-fallbacks: --flip-to-bottom;
}

/* Auto-flip popover that prefers bottom */
.anchor-auto-bottom {
  position-anchor: --trigger;
  inset-area: bottom;
  margin-top: 0.5rem;
  position-try-fallbacks: --flip-to-top;
}

/* Auto-flip popover that prefers left */
.anchor-auto-left {
  position-anchor: --trigger;
  inset-area: left;
  margin-right: 0.5rem;
  position-try-fallbacks: --flip-to-right;
}

/* Auto-flip popover that prefers right */
.anchor-auto-right {
  position-anchor: --trigger;
  inset-area: right;
  margin-left: 0.5rem;
  position-try-fallbacks: --flip-to-left;
}
`
}

/**
 * Generate complete Popover API CSS bundle
 */
export function generatePopoverAPICSS(): string {
  return generatePopoverAnimationsCSS() + '\n' + generateAnchorPositioningCSS()
}

export default popoverAPIPlugin
