/**
 * Aspect Ratio Utilities Plugin
 *
 * Control the aspect ratio of elements.
 * Tailwind 4.1 compatible + additional features.
 *
 * @module plugins/core/utilities/aspect-ratio
 */

import type { Plugin, PluginContext } from '../../../types'

/**
 * Aspect ratio utilities plugin
 *
 * @example
 * ```html
 * <div class="aspect-video">
 *   16:9 video container
 * </div>
 *
 * <div class="aspect-[4/3]">
 *   Custom 4:3 ratio
 * </div>
 * ```
 */
export function aspectRatioPlugin(): Plugin {
  return {
    name: 'aspect-ratio',
    version: '1.0.0',

    install(ctx: PluginContext) {
      // ========================================
      // STANDARD ASPECT RATIOS
      // ========================================

      // Square (1:1)
      ctx.addRule({
        pattern: 'aspect-square',
        properties: { 'aspect-ratio': '1 / 1' },
      })

      // Video (16:9)
      ctx.addRule({
        pattern: 'aspect-video',
        properties: { 'aspect-ratio': '16 / 9' },
      })

      // Photo (4:3)
      ctx.addRule({
        pattern: 'aspect-photo',
        properties: { 'aspect-ratio': '4 / 3' },
      })

      // Portrait (3:4)
      ctx.addRule({
        pattern: 'aspect-portrait',
        properties: { 'aspect-ratio': '3 / 4' },
      })

      // Landscape (3:2)
      ctx.addRule({
        pattern: 'aspect-landscape',
        properties: { 'aspect-ratio': '3 / 2' },
      })

      // Wide (21:9) - Ultrawide
      ctx.addRule({
        pattern: 'aspect-ultra-wide',
        properties: { 'aspect-ratio': '21 / 9' },
      })

      // Golden ratio (1.618:1)
      ctx.addRule({
        pattern: 'aspect-golden',
        properties: { 'aspect-ratio': '1.618 / 1' },
      })

      // ========================================
      // SOCIAL MEDIA ASPECT RATIOS
      // ========================================

      // Instagram post (1:1)
      ctx.addRule({
        pattern: 'aspect-instagram',
        properties: { 'aspect-ratio': '1 / 1' },
      })

      // Instagram portrait (4:5)
      ctx.addRule({
        pattern: 'aspect-instagram-portrait',
        properties: { 'aspect-ratio': '4 / 5' },
      })

      // Instagram story (9:16)
      ctx.addRule({
        pattern: 'aspect-story',
        properties: { 'aspect-ratio': '9 / 16' },
      })

      // Twitter post (16:9)
      ctx.addRule({
        pattern: 'aspect-twitter',
        properties: { 'aspect-ratio': '16 / 9' },
      })

      // Facebook cover (820x312 ≈ 2.63:1)
      ctx.addRule({
        pattern: 'aspect-facebook-cover',
        properties: { 'aspect-ratio': '2.63 / 1' },
      })

      // LinkedIn post (1.91:1)
      ctx.addRule({
        pattern: 'aspect-linkedin',
        properties: { 'aspect-ratio': '1.91 / 1' },
      })

      // Pinterest (2:3)
      ctx.addRule({
        pattern: 'aspect-pinterest',
        properties: { 'aspect-ratio': '2 / 3' },
      })

      // ========================================
      // PRINT ASPECT RATIOS
      // ========================================

      // A4 (1:1.414)
      ctx.addRule({
        pattern: 'aspect-a4',
        properties: { 'aspect-ratio': '1 / 1.414' },
      })

      // A3 (1:1.414 - same ratio, larger)
      ctx.addRule({
        pattern: 'aspect-a3',
        properties: { 'aspect-ratio': '1 / 1.414' },
      })

      // Letter (8.5x11 = 1:1.294)
      ctx.addRule({
        pattern: 'aspect-letter',
        properties: { 'aspect-ratio': '1 / 1.294' },
      })

      // Legal (8.5x14 = 1:1.647)
      ctx.addRule({
        pattern: 'aspect-legal',
        properties: { 'aspect-ratio': '1 / 1.647' },
      })

      // ========================================
      // COMMON SCREEN RATIOS
      // ========================================

      // 4:3 Standard TV
      ctx.addRule({
        pattern: 'aspect-4-3',
        properties: { 'aspect-ratio': '4 / 3' },
      })

      // 16:9 Widescreen
      ctx.addRule({
        pattern: 'aspect-16-9',
        properties: { 'aspect-ratio': '16 / 9' },
      })

      // 21:9 Ultrawide
      ctx.addRule({
        pattern: 'aspect-21-9',
        properties: { 'aspect-ratio': '21 / 9' },
      })

      // 32:9 Super ultrawide
      ctx.addRule({
        pattern: 'aspect-32-9',
        properties: { 'aspect-ratio': '32 / 9' },
      })

      // ========================================
      // SPECIAL RATIOS
      // ========================================

      // None (auto)
      ctx.addRule({
        pattern: 'aspect-auto',
        properties: { 'aspect-ratio': 'auto' },
      })

      // Dynamic aspect ratio (from intrinsic)
      ctx.addRule({
        pattern: 'aspect-dynamic',
        properties: { 'aspect-ratio': 'auto' },
      })

      // ========================================
      // ARBITRARY ASPECT RATIO
      // ========================================

      // Arbitrary values like aspect-[4/3], aspect-[16/9], etc.
      ctx.addRule({
        pattern: /^aspect-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { 'aspect-ratio': value.replace(/_/g, ' ') } }
        },
      })

      // Slash-based syntax (Tailwind compatible)
      ctx.addRule({
        pattern: /^aspect-(\d+)\/(\d+)$/,
        handler: (match) => {
          const width = match[1]
          const height = match[2]
          if (!width || !height) {return null}
          return { properties: { 'aspect-ratio': `${width} / ${height}` } }
        },
      })

      // Decimal ratio (e.g., aspect-1.5 for 1.5:1)
      ctx.addRule({
        pattern: /^aspect-([\d.]+)$/,
        handler: (match) => {
          const ratio = match[1]
          if (!ratio || ratio === 'square' || ratio === 'video') {return null}
          return { properties: { 'aspect-ratio': `${ratio} / 1` } }
        },
      })
    }
  }
}

export default aspectRatioPlugin
