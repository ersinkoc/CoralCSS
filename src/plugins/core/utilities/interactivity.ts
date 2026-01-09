/**
 * Interactivity Utilities Plugin
 *
 * Cursor, user-select, pointer-events, resize, scroll, and other interactivity utilities.
 * @module plugins/core/utilities/interactivity
 */

import type { Plugin, Rule, PluginContext } from '../../../types'

/**
 * Interactivity utilities plugin
 */
export function interactivityPlugin(): Plugin {
  return {
    name: 'interactivity',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // Appearance
      rules.push({ pattern: 'appearance-none', properties: { appearance: 'none' } })
      rules.push({ pattern: 'appearance-auto', properties: { appearance: 'auto' } })

      // Cursor
      rules.push({ pattern: 'cursor-auto', properties: { cursor: 'auto' } })
      rules.push({ pattern: 'cursor-default', properties: { cursor: 'default' } })
      rules.push({ pattern: 'cursor-pointer', properties: { cursor: 'pointer' } })
      rules.push({ pattern: 'cursor-wait', properties: { cursor: 'wait' } })
      rules.push({ pattern: 'cursor-text', properties: { cursor: 'text' } })
      rules.push({ pattern: 'cursor-move', properties: { cursor: 'move' } })
      rules.push({ pattern: 'cursor-help', properties: { cursor: 'help' } })
      rules.push({ pattern: 'cursor-not-allowed', properties: { cursor: 'not-allowed' } })
      rules.push({ pattern: 'cursor-none', properties: { cursor: 'none' } })
      rules.push({ pattern: 'cursor-context-menu', properties: { cursor: 'context-menu' } })
      rules.push({ pattern: 'cursor-progress', properties: { cursor: 'progress' } })
      rules.push({ pattern: 'cursor-cell', properties: { cursor: 'cell' } })
      rules.push({ pattern: 'cursor-crosshair', properties: { cursor: 'crosshair' } })
      rules.push({ pattern: 'cursor-vertical-text', properties: { cursor: 'vertical-text' } })
      rules.push({ pattern: 'cursor-alias', properties: { cursor: 'alias' } })
      rules.push({ pattern: 'cursor-copy', properties: { cursor: 'copy' } })
      rules.push({ pattern: 'cursor-no-drop', properties: { cursor: 'no-drop' } })
      rules.push({ pattern: 'cursor-grab', properties: { cursor: 'grab' } })
      rules.push({ pattern: 'cursor-grabbing', properties: { cursor: 'grabbing' } })
      rules.push({ pattern: 'cursor-all-scroll', properties: { cursor: 'all-scroll' } })
      rules.push({ pattern: 'cursor-col-resize', properties: { cursor: 'col-resize' } })
      rules.push({ pattern: 'cursor-row-resize', properties: { cursor: 'row-resize' } })
      rules.push({ pattern: 'cursor-n-resize', properties: { cursor: 'n-resize' } })
      rules.push({ pattern: 'cursor-e-resize', properties: { cursor: 'e-resize' } })
      rules.push({ pattern: 'cursor-s-resize', properties: { cursor: 's-resize' } })
      rules.push({ pattern: 'cursor-w-resize', properties: { cursor: 'w-resize' } })
      rules.push({ pattern: 'cursor-ne-resize', properties: { cursor: 'ne-resize' } })
      rules.push({ pattern: 'cursor-nw-resize', properties: { cursor: 'nw-resize' } })
      rules.push({ pattern: 'cursor-se-resize', properties: { cursor: 'se-resize' } })
      rules.push({ pattern: 'cursor-sw-resize', properties: { cursor: 'sw-resize' } })
      rules.push({ pattern: 'cursor-ew-resize', properties: { cursor: 'ew-resize' } })
      rules.push({ pattern: 'cursor-ns-resize', properties: { cursor: 'ns-resize' } })
      rules.push({ pattern: 'cursor-nesw-resize', properties: { cursor: 'nesw-resize' } })
      rules.push({ pattern: 'cursor-nwse-resize', properties: { cursor: 'nwse-resize' } })
      rules.push({ pattern: 'cursor-zoom-in', properties: { cursor: 'zoom-in' } })
      rules.push({ pattern: 'cursor-zoom-out', properties: { cursor: 'zoom-out' } })

      // Caret color (already in colors plugin, but adding text-specific here)

      // Pointer events
      rules.push({ pattern: 'pointer-events-none', properties: { 'pointer-events': 'none' } })
      rules.push({ pattern: 'pointer-events-auto', properties: { 'pointer-events': 'auto' } })

      // Resize
      rules.push({ pattern: 'resize-none', properties: { resize: 'none' } })
      rules.push({ pattern: 'resize-y', properties: { resize: 'vertical' } })
      rules.push({ pattern: 'resize-x', properties: { resize: 'horizontal' } })
      rules.push({ pattern: 'resize', properties: { resize: 'both' } })

      // Scroll behavior
      rules.push({ pattern: 'scroll-auto', properties: { 'scroll-behavior': 'auto' } })
      rules.push({ pattern: 'scroll-smooth', properties: { 'scroll-behavior': 'smooth' } })

      // Scroll margin
      const scrollMarginValues = {
        '0': '0px',
        'px': '1px',
        '0.5': '0.125rem',
        '1': '0.25rem',
        '1.5': '0.375rem',
        '2': '0.5rem',
        '2.5': '0.625rem',
        '3': '0.75rem',
        '3.5': '0.875rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
        '11': '2.75rem',
        '12': '3rem',
        '14': '3.5rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '28': '7rem',
        '32': '8rem',
        '36': '9rem',
        '40': '10rem',
        '44': '11rem',
        '48': '12rem',
      }

      for (const [key, value] of Object.entries(scrollMarginValues)) {
        rules.push({ pattern: `scroll-m-${key}`, properties: { 'scroll-margin': value } })
        rules.push({ pattern: `scroll-mx-${key}`, properties: { 'scroll-margin-left': value, 'scroll-margin-right': value } })
        rules.push({ pattern: `scroll-my-${key}`, properties: { 'scroll-margin-top': value, 'scroll-margin-bottom': value } })
        rules.push({ pattern: `scroll-mt-${key}`, properties: { 'scroll-margin-top': value } })
        rules.push({ pattern: `scroll-mr-${key}`, properties: { 'scroll-margin-right': value } })
        rules.push({ pattern: `scroll-mb-${key}`, properties: { 'scroll-margin-bottom': value } })
        rules.push({ pattern: `scroll-ml-${key}`, properties: { 'scroll-margin-left': value } })
        rules.push({ pattern: `scroll-ms-${key}`, properties: { 'scroll-margin-inline-start': value } })
        rules.push({ pattern: `scroll-me-${key}`, properties: { 'scroll-margin-inline-end': value } })
      }

      // Scroll padding
      for (const [key, value] of Object.entries(scrollMarginValues)) {
        rules.push({ pattern: `scroll-p-${key}`, properties: { 'scroll-padding': value } })
        rules.push({ pattern: `scroll-px-${key}`, properties: { 'scroll-padding-left': value, 'scroll-padding-right': value } })
        rules.push({ pattern: `scroll-py-${key}`, properties: { 'scroll-padding-top': value, 'scroll-padding-bottom': value } })
        rules.push({ pattern: `scroll-pt-${key}`, properties: { 'scroll-padding-top': value } })
        rules.push({ pattern: `scroll-pr-${key}`, properties: { 'scroll-padding-right': value } })
        rules.push({ pattern: `scroll-pb-${key}`, properties: { 'scroll-padding-bottom': value } })
        rules.push({ pattern: `scroll-pl-${key}`, properties: { 'scroll-padding-left': value } })
        rules.push({ pattern: `scroll-ps-${key}`, properties: { 'scroll-padding-inline-start': value } })
        rules.push({ pattern: `scroll-pe-${key}`, properties: { 'scroll-padding-inline-end': value } })
      }

      // Scroll snap align
      rules.push({ pattern: 'snap-start', properties: { 'scroll-snap-align': 'start' } })
      rules.push({ pattern: 'snap-end', properties: { 'scroll-snap-align': 'end' } })
      rules.push({ pattern: 'snap-center', properties: { 'scroll-snap-align': 'center' } })
      rules.push({ pattern: 'snap-align-none', properties: { 'scroll-snap-align': 'none' } })

      // Scroll snap stop
      rules.push({ pattern: 'snap-normal', properties: { 'scroll-snap-stop': 'normal' } })
      rules.push({ pattern: 'snap-always', properties: { 'scroll-snap-stop': 'always' } })

      // Scroll snap type
      rules.push({ pattern: 'snap-none', properties: { 'scroll-snap-type': 'none' } })
      rules.push({ pattern: 'snap-x', properties: { 'scroll-snap-type': 'x var(--coral-scroll-snap-strictness)' } })
      rules.push({ pattern: 'snap-y', properties: { 'scroll-snap-type': 'y var(--coral-scroll-snap-strictness)' } })
      rules.push({ pattern: 'snap-both', properties: { 'scroll-snap-type': 'both var(--coral-scroll-snap-strictness)' } })
      rules.push({ pattern: 'snap-mandatory', properties: { '--coral-scroll-snap-strictness': 'mandatory' } })
      rules.push({ pattern: 'snap-proximity', properties: { '--coral-scroll-snap-strictness': 'proximity' } })

      // Touch action
      rules.push({ pattern: 'touch-auto', properties: { 'touch-action': 'auto' } })
      rules.push({ pattern: 'touch-none', properties: { 'touch-action': 'none' } })
      rules.push({ pattern: 'touch-pan-x', properties: { 'touch-action': 'pan-x' } })
      rules.push({ pattern: 'touch-pan-left', properties: { 'touch-action': 'pan-left' } })
      rules.push({ pattern: 'touch-pan-right', properties: { 'touch-action': 'pan-right' } })
      rules.push({ pattern: 'touch-pan-y', properties: { 'touch-action': 'pan-y' } })
      rules.push({ pattern: 'touch-pan-up', properties: { 'touch-action': 'pan-up' } })
      rules.push({ pattern: 'touch-pan-down', properties: { 'touch-action': 'pan-down' } })
      rules.push({ pattern: 'touch-pinch-zoom', properties: { 'touch-action': 'pinch-zoom' } })
      rules.push({ pattern: 'touch-manipulation', properties: { 'touch-action': 'manipulation' } })

      // User select
      rules.push({ pattern: 'select-none', properties: { 'user-select': 'none' } })
      rules.push({ pattern: 'select-text', properties: { 'user-select': 'text' } })
      rules.push({ pattern: 'select-all', properties: { 'user-select': 'all' } })
      rules.push({ pattern: 'select-auto', properties: { 'user-select': 'auto' } })

      // Accent color (for form controls)
      rules.push({ pattern: 'accent-auto', properties: { 'accent-color': 'auto' } })

      // Screen readers
      rules.push({
        pattern: 'sr-only',
        properties: {
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          'white-space': 'nowrap',
          'border-width': '0',
        },
      })
      rules.push({
        pattern: 'not-sr-only',
        properties: {
          position: 'static',
          width: 'auto',
          height: 'auto',
          padding: '0',
          margin: '0',
          overflow: 'visible',
          clip: 'auto',
          'white-space': 'normal',
        },
      })

      // Forced color adjust
      rules.push({ pattern: 'forced-color-adjust-auto', properties: { 'forced-color-adjust': 'auto' } })
      rules.push({ pattern: 'forced-color-adjust-none', properties: { 'forced-color-adjust': 'none' } })

      // ========================================
      // Field Sizing (Tailwind 4 feature)
      // Enables auto-growing textareas and inputs
      // ========================================
      rules.push({ pattern: 'field-sizing-content', properties: { 'field-sizing': 'content' } })
      rules.push({ pattern: 'field-sizing-fixed', properties: { 'field-sizing': 'fixed' } })

      // ========================================
      // Inert Attribute Styling
      // ========================================
      rules.push({
        pattern: 'inert',
        properties: {
          'pointer-events': 'none',
          'user-select': 'none',
          opacity: '0.5',
        },
      })

      // ========================================
      // Content Visibility (Performance)
      // ========================================
      rules.push({ pattern: 'content-visibility-auto', properties: { 'content-visibility': 'auto' } })
      rules.push({ pattern: 'content-visibility-hidden', properties: { 'content-visibility': 'hidden' } })
      rules.push({ pattern: 'content-visibility-visible', properties: { 'content-visibility': 'visible' } })

      // Contain-intrinsic-size for content-visibility
      rules.push({ pattern: 'contain-intrinsic-auto', properties: { 'contain-intrinsic-size': 'auto' } })
      rules.push({ pattern: 'contain-intrinsic-none', properties: { 'contain-intrinsic-size': 'none' } })
      rules.push({
        pattern: /^contain-intrinsic-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'contain-intrinsic-size': v } }
        },
      })

      // ========================================
      // Color Scheme (for native controls)
      // ========================================
      rules.push({ pattern: 'color-scheme-light', properties: { 'color-scheme': 'light' } })
      rules.push({ pattern: 'color-scheme-dark', properties: { 'color-scheme': 'dark' } })
      rules.push({ pattern: 'color-scheme-normal', properties: { 'color-scheme': 'normal' } })
      rules.push({ pattern: 'color-scheme-only-light', properties: { 'color-scheme': 'only light' } })
      rules.push({ pattern: 'color-scheme-only-dark', properties: { 'color-scheme': 'only dark' } })
      rules.push({ pattern: 'color-scheme-light-dark', properties: { 'color-scheme': 'light dark' } })

      // ========================================
      // Interpolate Size (for smooth size transitions)
      // ========================================
      rules.push({ pattern: 'interpolate-size-allow', properties: { 'interpolate-size': 'allow-keywords' } })
      rules.push({ pattern: 'interpolate-size-numeric', properties: { 'interpolate-size': 'numeric-only' } })

      // ========================================
      // Overscroll Behavior Inline/Block
      // ========================================
      rules.push({ pattern: 'overscroll-inline-auto', properties: { 'overscroll-behavior-inline': 'auto' } })
      rules.push({ pattern: 'overscroll-inline-contain', properties: { 'overscroll-behavior-inline': 'contain' } })
      rules.push({ pattern: 'overscroll-inline-none', properties: { 'overscroll-behavior-inline': 'none' } })
      rules.push({ pattern: 'overscroll-block-auto', properties: { 'overscroll-behavior-block': 'auto' } })
      rules.push({ pattern: 'overscroll-block-contain', properties: { 'overscroll-behavior-block': 'contain' } })
      rules.push({ pattern: 'overscroll-block-none', properties: { 'overscroll-behavior-block': 'none' } })

      // ========================================
      // Scrollbar Styling
      // ========================================
      rules.push({ pattern: 'scrollbar-auto', properties: { 'scrollbar-width': 'auto' } })
      rules.push({ pattern: 'scrollbar-thin', properties: { 'scrollbar-width': 'thin' } })
      rules.push({ pattern: 'scrollbar-none', properties: { 'scrollbar-width': 'none' } })
      rules.push({ pattern: 'scrollbar-gutter-auto', properties: { 'scrollbar-gutter': 'auto' } })
      rules.push({ pattern: 'scrollbar-gutter-stable', properties: { 'scrollbar-gutter': 'stable' } })
      rules.push({ pattern: 'scrollbar-gutter-both-edges', properties: { 'scrollbar-gutter': 'stable both-edges' } })

      // Arbitrary values
      rules.push({
        pattern: /^cursor-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { cursor: v } } },
      })
      rules.push({
        pattern: /^scroll-m-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'scroll-margin': v } } },
      })
      rules.push({
        pattern: /^scroll-p-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'scroll-padding': v } } },
      })

      // ========================================
      // TOUCH ACTION (Beyond Tailwind 4)
      // ========================================

      rules.push({ pattern: 'touch-auto', properties: { 'touch-action': 'auto' } })
      rules.push({ pattern: 'touch-none', properties: { 'touch-action': 'none' } })
      rules.push({ pattern: 'touch-pan-x', properties: { 'touch-action': 'pan-x' } })
      rules.push({ pattern: 'touch-pan-y', properties: { 'touch-action': 'pan-y' } })
      rules.push({ pattern: 'touch-pan-left', properties: { 'touch-action': 'pan-left' } })
      rules.push({ pattern: 'touch-pan-right', properties: { 'touch-action': 'pan-right' } })
      rules.push({ pattern: 'touch-pan-up', properties: { 'touch-action': 'pan-up' } })
      rules.push({ pattern: 'touch-pan-down', properties: { 'touch-action': 'pan-down' } })
      rules.push({ pattern: 'touch-pinch-zoom', properties: { 'touch-action': 'pinch-zoom' } })
      rules.push({ pattern: 'touch-manipulation', properties: { 'touch-action': 'manipulation' } })

      // Combined touch actions
      rules.push({ pattern: 'touch-pan-x-pan-y', properties: { 'touch-action': 'pan-x pan-y' } })
      rules.push({ pattern: 'touch-pan-x-pinch-zoom', properties: { 'touch-action': 'pan-x pinch-zoom' } })
      rules.push({ pattern: 'touch-pan-y-pinch-zoom', properties: { 'touch-action': 'pan-y pinch-zoom' } })

      rules.push({
        pattern: /^touch-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'touch-action': v } }
        },
      })

      // ========================================
      // DRAG & DROP (Beyond Tailwind 4)
      // ========================================

      rules.push({ pattern: 'draggable', properties: { '-webkit-user-drag': 'element' } })
      rules.push({ pattern: 'draggable-none', properties: { '-webkit-user-drag': 'none' } })
      rules.push({ pattern: 'draggable-auto', properties: { '-webkit-user-drag': 'auto' } })

      // ========================================
      // IMAGE RENDERING (Beyond Tailwind 4)
      // ========================================

      rules.push({ pattern: 'image-render-auto', properties: { 'image-rendering': 'auto' } })
      rules.push({ pattern: 'image-render-crisp', properties: { 'image-rendering': 'crisp-edges' } })
      rules.push({ pattern: 'image-render-pixelated', properties: { 'image-rendering': 'pixelated' } })
      rules.push({ pattern: 'image-render-smooth', properties: { 'image-rendering': '-webkit-optimize-contrast' } })

      // ========================================
      // ZOOM (Beyond Tailwind 4)
      // ========================================

      rules.push({ pattern: 'zoom-normal', properties: { zoom: 'normal' } })
      rules.push({ pattern: 'zoom-reset', properties: { zoom: 'reset' } })
      rules.push({ pattern: 'zoom-50', properties: { zoom: '0.5' } })
      rules.push({ pattern: 'zoom-75', properties: { zoom: '0.75' } })
      rules.push({ pattern: 'zoom-90', properties: { zoom: '0.9' } })
      rules.push({ pattern: 'zoom-100', properties: { zoom: '1' } })
      rules.push({ pattern: 'zoom-110', properties: { zoom: '1.1' } })
      rules.push({ pattern: 'zoom-125', properties: { zoom: '1.25' } })
      rules.push({ pattern: 'zoom-150', properties: { zoom: '1.5' } })
      rules.push({ pattern: 'zoom-200', properties: { zoom: '2' } })

      rules.push({
        pattern: /^zoom-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { zoom: v } }
        },
      })

      // ========================================
      // SCROLL SNAP (Extended - Beyond Tailwind 4)
      // ========================================

      // Additional scroll-snap utilities
      rules.push({ pattern: 'scroll-snap-type-none', properties: { 'scroll-snap-type': 'none' } })
      rules.push({ pattern: 'scroll-snap-type-x-mandatory', properties: { 'scroll-snap-type': 'x mandatory' } })
      rules.push({ pattern: 'scroll-snap-type-y-mandatory', properties: { 'scroll-snap-type': 'y mandatory' } })
      rules.push({ pattern: 'scroll-snap-type-both-mandatory', properties: { 'scroll-snap-type': 'both mandatory' } })
      rules.push({ pattern: 'scroll-snap-type-x-proximity', properties: { 'scroll-snap-type': 'x proximity' } })
      rules.push({ pattern: 'scroll-snap-type-y-proximity', properties: { 'scroll-snap-type': 'y proximity' } })
      rules.push({ pattern: 'scroll-snap-type-both-proximity', properties: { 'scroll-snap-type': 'both proximity' } })

      // ========================================
      // RESIZE (Extended)
      // ========================================

      rules.push({ pattern: 'resize-none', properties: { resize: 'none' } })
      rules.push({ pattern: 'resize-y', properties: { resize: 'vertical' } })
      rules.push({ pattern: 'resize-x', properties: { resize: 'horizontal' } })
      rules.push({ pattern: 'resize', properties: { resize: 'both' } })
      rules.push({ pattern: 'resize-block', properties: { resize: 'block' } })
      rules.push({ pattern: 'resize-inline', properties: { resize: 'inline' } })

      // ========================================
      // FOCUS WITHIN/VISIBLE (Accessibility)
      // ========================================

      // These are typically handled via variants, but utility support
      rules.push({
        pattern: 'focus-visible-ring',
        properties: {
          outline: '2px solid var(--coral-ring-color, #3b82f6)',
          'outline-offset': '2px',
        },
      })
      rules.push({
        pattern: 'focus-visible-ring-inset',
        properties: {
          outline: '2px solid var(--coral-ring-color, #3b82f6)',
          'outline-offset': '-2px',
        },
      })

      // ========================================
      // SCROLL START (CSS Scroll Start)
      // ========================================

      rules.push({ pattern: 'scroll-start-auto', properties: { 'scroll-start': 'auto' } })
      rules.push({ pattern: 'scroll-start-0', properties: { 'scroll-start': '0' } })
      rules.push({ pattern: 'scroll-start-center', properties: { 'scroll-start': 'center' } })
      rules.push({ pattern: 'scroll-start-end', properties: { 'scroll-start': 'end' } })

      rules.push({
        pattern: /^scroll-start-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'scroll-start': v } }
        },
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default interactivityPlugin
