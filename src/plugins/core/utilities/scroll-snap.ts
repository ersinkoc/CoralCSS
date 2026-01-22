/**
 * Scroll Snap Utilities Plugin
 *
 * CSS Scroll Snap utilities for carousels, galleries, and snap-to-position scrolling.
 *
 * @module plugins/core/utilities/scroll-snap
 */

import type { Plugin, PluginContext } from '../../../types'

/**
 * Scroll snap utilities plugin
 *
 * @example
 * ```html
 * <div class="snap-x snap-mandatory">
 *   <div class="snap-center">Slide 1</div>
 *   <div class="snap-center">Slide 2</div>
 *   <div class="snap-center">Slide 3</div>
 * </div>
 * ```
 */
export function scrollSnapPlugin(): Plugin {
  return {
    name: 'scroll-snap',
    version: '1.0.0',

    install(ctx: PluginContext) {
      // ========================================
      // SCROLL SNAP TYPE (Container)
      // ========================================

      ctx.addRule({
        pattern: 'snap-none',
        properties: { 'scroll-snap-type': 'none' },
      })

      ctx.addRule({
        pattern: 'snap-x',
        properties: { 'scroll-snap-type': 'x var(--scroll-snap-strictness, mandatory)' },
      })

      ctx.addRule({
        pattern: 'snap-y',
        properties: { 'scroll-snap-type': 'y var(--scroll-snap-strictness, mandatory)' },
      })

      ctx.addRule({
        pattern: 'snap-both',
        properties: { 'scroll-snap-type': 'both var(--scroll-snap-strictness, mandatory)' },
      })

      ctx.addRule({
        pattern: 'snap-mandatory',
        properties: { '--scroll-snap-strictness': 'mandatory' },
      })

      ctx.addRule({
        pattern: 'snap-proximity',
        properties: { '--scroll-snap-strictness': 'proximity' },
      })

      // Arbitrary scroll snap type
      ctx.addRule({
        pattern: /^snap-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { 'scroll-snap-type': value.replace(/_/g, ' ') } }
        },
      })

      // ========================================
      // SCROLL SNAP ALIGN (Children)
      // ========================================

      ctx.addRule({
        pattern: 'snap-start',
        properties: { 'scroll-snap-align': 'start' },
      })

      ctx.addRule({
        pattern: 'snap-end',
        properties: { 'scroll-snap-align': 'end' },
      })

      ctx.addRule({
        pattern: 'snap-center',
        properties: { 'scroll-snap-align': 'center' },
      })

      ctx.addRule({
        pattern: 'snap-align-none',
        properties: { 'scroll-snap-align': 'none' },
      })

      // Arbitrary scroll snap align
      ctx.addRule({
        pattern: /^snap-align-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { 'scroll-snap-align': value.replace(/_/g, ' ') } }
        },
      })

      // ========================================
      // SCROLL SNAP STOP (Children)
      // ========================================

      ctx.addRule({
        pattern: 'snap-normal',
        properties: { 'scroll-snap-stop': 'normal' },
      })

      ctx.addRule({
        pattern: 'snap-always',
        properties: { 'scroll-snap-stop': 'always' },
      })

      // ========================================
      // SCROLL PADDING (For snap alignment)
      // ========================================

      // Scroll padding inline (for horizontal snap)
      const scrollPads = [0, 1, 2, 4, 6, 8, 12, 16, 20, 24]
      for (const pad of scrollPads) {
        ctx.addRule({
          pattern: `snap-p-${pad}`,
          properties: { 'scroll-padding-inline': `${pad * 0.25}rem` },
        })

        ctx.addRule({
          pattern: `snap-py-${pad}`,
          properties: { 'scroll-padding-block': `${pad * 0.25}rem` },
        })
      }

      // Scroll padding all sides
      ctx.addRule({
        pattern: 'snap-p-0',
        properties: { 'scroll-padding': '0' },
      })

      // Arbitrary scroll padding
      ctx.addRule({
        pattern: /^snap-p-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { 'scroll-padding': value.replace(/_/g, ' ') } }
        },
      })

      // ========================================
      // SCROLL MARGIN (Children offset)
      // ========================================

      for (const pad of scrollPads) {
        ctx.addRule({
          pattern: `snap-m-${pad}`,
          properties: { 'scroll-margin': `${pad * 0.25}rem` },
        })

        ctx.addRule({
          pattern: `snap-mx-${pad}`,
          properties: { 'scroll-margin-inline': `${pad * 0.25}rem` },
        })

        ctx.addRule({
          pattern: `snap-my-${pad}`,
          properties: { 'scroll-margin-block': `${pad * 0.25}rem` },
        })

        ctx.addRule({
          pattern: `snap-mt-${pad}`,
          properties: { 'scroll-margin-top': `${pad * 0.25}rem` },
        })

        ctx.addRule({
          pattern: `snap-mb-${pad}`,
          properties: { 'scroll-margin-bottom': `${pad * 0.25}rem` },
        })

        ctx.addRule({
          pattern: `snap-ml-${pad}`,
          properties: { 'scroll-margin-left': `${pad * 0.25}rem` },
        })

        ctx.addRule({
          pattern: `snap-mr-${pad}`,
          properties: { 'scroll-margin-right': `${pad * 0.25}rem` },
        })
      }

      // Arbitrary scroll margin
      ctx.addRule({
        pattern: /^snap-m-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { 'scroll-margin': value.replace(/_/g, ' ') } }
        },
      })
    }
  }
}

export default scrollSnapPlugin
