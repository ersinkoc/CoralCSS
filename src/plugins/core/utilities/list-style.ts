/**
 * List Style Utilities Plugin
 *
 * Control list markers, position, and image bullets.
 * Tailwind 4.1 compatible.
 *
 * @module plugins/core/utilities/list-style
 */

import type { Plugin, PluginContext } from '../../../types'

/**
 * List style utilities plugin
 *
 * @example
 * ```html
 * <ul class="list-disc list-inside">
 *   <li>Item 1</li>
 * </ul>
 *
 * <ul class="list-[url('check.png')]">
 *   <li>Custom bullet</li>
 * </ul>
 * ```
 */
export function listStylePlugin(): Plugin {
  return {
    name: 'list-style',
    version: '1.0.0',

    install(ctx: PluginContext) {
      // ========================================
      // LIST STYLE TYPE
      // ========================================

      ctx.addRule({
        pattern: 'list-none',
        properties: { 'list-style-type': 'none' },
      })

      ctx.addRule({
        pattern: 'list-disc',
        properties: { 'list-style-type': 'disc' },
      })

      ctx.addRule({
        pattern: 'list-circle',
        properties: { 'list-style-type': 'circle' },
      })

      ctx.addRule({
        pattern: 'list-square',
        properties: { 'list-style-type': 'square' },
      })

      ctx.addRule({
        pattern: 'list-decimal',
        properties: { 'list-style-type': 'decimal' },
      })

      ctx.addRule({
        pattern: 'list-decimal-leading-zero',
        properties: { 'list-style-type': 'decimal-leading-zero' },
      })

      ctx.addRule({
        pattern: 'list-lower-roman',
        properties: { 'list-style-type': 'lower-roman' },
      })

      ctx.addRule({
        pattern: 'list-upper-roman',
        properties: { 'list-style-type': 'upper-roman' },
      })

      ctx.addRule({
        pattern: 'list-lower-alpha',
        properties: { 'list-style-type': 'lower-alpha' },
      })

      ctx.addRule({
        pattern: 'list-upper-alpha',
        properties: { 'list-style-type': 'upper-alpha' },
      })

      // ========================================
      // LIST STYLE POSITION
      // ========================================

      ctx.addRule({
        pattern: 'list-inside',
        properties: { 'list-style-position': 'inside' },
      })

      ctx.addRule({
        pattern: 'list-outside',
        properties: { 'list-style-position': 'outside' },
      })

      // ========================================
      // LIST STYLE IMAGE
      // ========================================

      ctx.addRule({
        pattern: 'list-image-none',
        properties: { 'list-style-image': 'none' },
      })

      // Arbitrary list style image
      ctx.addRule({
        pattern: /^list-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { 'list-style-image': `url("${value.replace(/_/g, ' ')}")` } }
        },
      })

      // Arbitrary list style type
      ctx.addRule({
        pattern: /^list-type-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { 'list-style-type': value.replace(/_/g, ' ') } }
        },
      })
    }
  }
}

export default listStylePlugin
