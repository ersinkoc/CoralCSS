/**
 * Positioning Utilities Plugin
 *
 * Inset, float, clear, will-change, user select, resize, pointer events, cursor.
 *
 * @module plugins/core/utilities/positioning
 */

import type { Plugin, PluginContext } from '../../../types'

/**
 * Positioning utilities plugin
 *
 * @example
 * ```html
 * <div class="inset-0">Absolute overlay</div>
 * <div class="float-left">Floated left</div>
 * <div class="will-change-transform">Optimized for transform</div>
 * ```
 */
export function positioningPlugin(): Plugin {
  return {
    name: 'positioning',
    version: '1.0.0',

    install(ctx: PluginContext) {
      // ========================================
      // INSET (Shorthand for top/right/bottom/left)
      // ========================================

      ctx.addRule({
        pattern: 'inset-0',
        properties: { top: '0', right: '0', bottom: '0', left: '0' },
      })

      ctx.addRule({
        pattern: 'inset-auto',
        properties: { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' },
      })

      // Inset spacing
      const insets = ['0', '0.5', '1', '1.5', '2', '2.5', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24', '32', '40', '48', '56', '64', '72', '80', '96']
      for (const inset of insets) {
        const rem = parseFloat(inset) * 0.25
        ctx.addRule({
          pattern: `inset-${inset.replace('.', '-')}`,
          properties: { top: `${rem}rem`, right: `${rem}rem`, bottom: `${rem}rem`, left: `${rem}rem` },
        })
      }

      // Negative inset
      for (const inset of insets.slice(1)) {
        const rem = parseFloat(inset) * 0.25
        ctx.addRule({
          pattern: `-inset-${inset.replace('.', '-')}`,
          properties: { top: `-${rem}rem`, right: `-${rem}rem`, bottom: `-${rem}rem`, left: `-${rem}rem` },
        })
      }

      // Individual inset sides
      for (const inset of insets) {
        const rem = parseFloat(inset) * 0.25
        ctx.addRule({
          pattern: `inset-y-${inset.replace('.', '-')}`,
          properties: { top: `${rem}rem`, bottom: `${rem}rem` },
        })
        ctx.addRule({
          pattern: `inset-x-${inset.replace('.', '-')}`,
          properties: { left: `${rem}rem`, right: `${rem}rem` },
        })
        ctx.addRule({
          pattern: `top-${inset.replace('.', '-')}`,
          properties: { top: `${rem}rem` },
        })
        ctx.addRule({
          pattern: `right-${inset.replace('.', '-')}`,
          properties: { right: `${rem}rem` },
        })
        ctx.addRule({
          pattern: `bottom-${inset.replace('.', '-')}`,
          properties: { bottom: `${rem}rem` },
        })
        ctx.addRule({
          pattern: `left-${inset.replace('.', '-')}`,
          properties: { left: `${rem}rem` },
        })
      }

      // Negative individual sides
      for (const inset of insets.slice(1)) {
        const rem = parseFloat(inset) * 0.25
        ctx.addRule({
          pattern: `-top-${inset.replace('.', '-')}`,
          properties: { top: `-${rem}rem` },
        })
        ctx.addRule({
          pattern: `-right-${inset.replace('.', '-')}`,
          properties: { right: `-${rem}rem` },
        })
        ctx.addRule({
          pattern: `-bottom-${inset.replace('.', '-')}`,
          properties: { bottom: `-${rem}rem` },
        })
        ctx.addRule({
          pattern: `-left-${inset.replace('.', '-')}`,
          properties: { left: `-${rem}rem` },
        })
      }

      // Arbitrary inset
      ctx.addRule({
        pattern: /^inset-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { top: value, right: value, bottom: value, left: value } }
        },
      })

      ctx.addRule({
        pattern: /^inset-y-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { top: value, bottom: value } }
        },
      })

      ctx.addRule({
        pattern: /^inset-x-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { left: value, right: value } }
        },
      })

      // ========================================
      // FLOAT
      // ========================================

      ctx.addRule({
        pattern: 'float-right',
        properties: { float: 'right' },
      })

      ctx.addRule({
        pattern: 'float-left',
        properties: { float: 'left' },
      })

      ctx.addRule({
        pattern: 'float-none',
        properties: { float: 'none' },
      })

      // Inline float
      ctx.addRule({
        pattern: 'inline-start',
        properties: { 'float': 'inline-start' },
      })

      ctx.addRule({
        pattern: 'inline-end',
        properties: { 'float': 'inline-end' },
      })

      // ========================================
      // CLEAR
      // ========================================

      ctx.addRule({
        pattern: 'clear-left',
        properties: { clear: 'left' },
      })

      ctx.addRule({
        pattern: 'clear-right',
        properties: { clear: 'right' },
      })

      ctx.addRule({
        pattern: 'clear-both',
        properties: { clear: 'both' },
      })

      ctx.addRule({
        pattern: 'clear-none',
        properties: { clear: 'none' },
      })

      // ========================================
      // WILL CHANGE
      // ========================================

      ctx.addRule({
        pattern: 'will-change-auto',
        properties: { 'will-change': 'auto' },
      })

      ctx.addRule({
        pattern: 'will-change-scroll',
        properties: { 'will-change': 'scroll-position' },
      })

      ctx.addRule({
        pattern: 'will-change-contents',
        properties: { 'will-change': 'contents' },
      })

      ctx.addRule({
        pattern: 'will-change-transform',
        properties: { 'will-change': 'transform' },
      })

      // Combinations
      ctx.addRule({
        pattern: 'will-change-transforms',
        properties: { 'will-change': 'transform, opacity' },
      })

      // Arbitrary will-change
      ctx.addRule({
        pattern: /^will-change-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { 'will-change': value.replace(/_/g, ' ') } }
        },
      })

      // ========================================
      // USER SELECT
      // ========================================

      ctx.addRule({
        pattern: 'select-none',
        properties: { 'user-select': 'none' },
      })

      ctx.addRule({
        pattern: 'select-text',
        properties: { 'user-select': 'text' },
      })

      ctx.addRule({
        pattern: 'select-all',
        properties: { 'user-select': 'all' },
      })

      ctx.addRule({
        pattern: 'select-auto',
        properties: { 'user-select': 'auto' },
      })

      // ========================================
      // RESIZE
      // ========================================

      ctx.addRule({
        pattern: 'resize',
        properties: { resize: 'both' },
      })

      ctx.addRule({
        pattern: 'resize-none',
        properties: { resize: 'none' },
      })

      ctx.addRule({
        pattern: 'resize-x',
        properties: { resize: 'horizontal' },
      })

      ctx.addRule({
        pattern: 'resize-y',
        properties: { resize: 'vertical' },
      })

      // ========================================
      // POINTER EVENTS
      // ========================================

      ctx.addRule({
        pattern: 'pointer-events-none',
        properties: { 'pointer-events': 'none' },
      })

      ctx.addRule({
        pattern: 'pointer-events-auto',
        properties: { 'pointer-events': 'auto' },
      })

      // ========================================
      // CURSOR
      // ========================================

      const cursors = [
        'auto', 'default', 'pointer', 'wait', 'text', 'move', 'help', 'not-allowed',
        'none', 'context-menu', 'progress', 'cell', 'crosshair', 'vertical-text',
        'alias', 'copy', 'no-drop', 'grab', 'grabbing', 'all-scroll', 'col-resize',
        'row-resize', 'n-resize', 'e-resize', 's-resize', 'w-resize', 'ne-resize',
        'nw-resize', 'se-resize', 'sw-resize', 'ew-resize', 'ns-resize', 'nesw-resize',
        'nwse-resize', 'zoom-in', 'zoom-out',
      ]

      for (const cursor of cursors) {
        ctx.addRule({
          pattern: `cursor-${cursor}`,
          properties: { cursor: cursor },
        })
      }

      // Arbitrary cursor
      ctx.addRule({
        pattern: /^cursor-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { cursor: value.replace(/_/g, ' ') } }
        },
      })
    }
  }
}

export default positioningPlugin
