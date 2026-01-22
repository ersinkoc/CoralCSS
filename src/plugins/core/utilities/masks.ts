/**
 * Mask & Clip-Path Utilities Plugin
 *
 * CSS mask and clip-path utilities for creative layouts and effects.
 * @module plugins/core/utilities/masks
 */

import type { Plugin, Rule, PluginContext } from '../../../types'

/**
 * Masks utilities plugin
 */
export function masksPlugin(): Plugin {
  return {
    name: 'masks',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // ========================================
      // CLIP-PATH SHAPES
      // ========================================

      rules.push({ pattern: 'clip-none', properties: { 'clip-path': 'none' } })

      // Basic shapes
      rules.push({ pattern: 'clip-circle', properties: { 'clip-path': 'circle(50%)' } })
      rules.push({ pattern: 'clip-circle-sm', properties: { 'clip-path': 'circle(40%)' } })
      rules.push({ pattern: 'clip-circle-lg', properties: { 'clip-path': 'circle(60%)' } })
      rules.push({ pattern: 'clip-ellipse', properties: { 'clip-path': 'ellipse(50% 40% at 50% 50%)' } })
      rules.push({ pattern: 'clip-inset', properties: { 'clip-path': 'inset(10%)' } })
      rules.push({ pattern: 'clip-inset-sm', properties: { 'clip-path': 'inset(5%)' } })
      rules.push({ pattern: 'clip-inset-lg', properties: { 'clip-path': 'inset(15%)' } })

      // Polygons
      rules.push({ pattern: 'clip-triangle', properties: { 'clip-path': 'polygon(50% 0%, 0% 100%, 100% 100%)' } })
      rules.push({ pattern: 'clip-triangle-up', properties: { 'clip-path': 'polygon(50% 0%, 0% 100%, 100% 100%)' } })
      rules.push({ pattern: 'clip-triangle-down', properties: { 'clip-path': 'polygon(0% 0%, 100% 0%, 50% 100%)' } })
      rules.push({ pattern: 'clip-triangle-left', properties: { 'clip-path': 'polygon(0% 50%, 100% 0%, 100% 100%)' } })
      rules.push({ pattern: 'clip-triangle-right', properties: { 'clip-path': 'polygon(0% 0%, 100% 50%, 0% 100%)' } })

      rules.push({ pattern: 'clip-rhombus', properties: { 'clip-path': 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' } })
      rules.push({ pattern: 'clip-diamond', properties: { 'clip-path': 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' } })

      rules.push({ pattern: 'clip-pentagon', properties: { 'clip-path': 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' } })
      rules.push({ pattern: 'clip-hexagon', properties: { 'clip-path': 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' } })
      rules.push({ pattern: 'clip-heptagon', properties: { 'clip-path': 'polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)' } })
      rules.push({ pattern: 'clip-octagon', properties: { 'clip-path': 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' } })

      // Arrows
      rules.push({ pattern: 'clip-arrow-right', properties: { 'clip-path': 'polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)' } })
      rules.push({ pattern: 'clip-arrow-left', properties: { 'clip-path': 'polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)' } })
      rules.push({ pattern: 'clip-arrow-up', properties: { 'clip-path': 'polygon(50% 0%, 100% 40%, 80% 40%, 80% 100%, 20% 100%, 20% 40%, 0% 40%)' } })
      rules.push({ pattern: 'clip-arrow-down', properties: { 'clip-path': 'polygon(20% 0%, 80% 0%, 80% 60%, 100% 60%, 50% 100%, 0% 60%, 20% 60%)' } })

      // Chevrons
      rules.push({ pattern: 'clip-chevron-right', properties: { 'clip-path': 'polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)' } })
      rules.push({ pattern: 'clip-chevron-left', properties: { 'clip-path': 'polygon(100% 0%, 75% 50%, 100% 100%, 25% 100%, 0% 50%, 25% 0%)' } })

      // Stars
      rules.push({ pattern: 'clip-star-4', properties: { 'clip-path': 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' } })
      rules.push({ pattern: 'clip-star-5', properties: { 'clip-path': 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' } })
      rules.push({ pattern: 'clip-star-6', properties: { 'clip-path': 'polygon(50% 0%, 60% 30%, 100% 35%, 70% 55%, 85% 100%, 50% 70%, 15% 100%, 30% 55%, 0% 35%, 40% 30%)' } })

      // Cross/Plus
      rules.push({ pattern: 'clip-cross', properties: { 'clip-path': 'polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%, 0% 35%, 35% 35%)' } })
      rules.push({ pattern: 'clip-plus', properties: { 'clip-path': 'polygon(40% 0%, 60% 0%, 60% 40%, 100% 40%, 100% 60%, 60% 60%, 60% 100%, 40% 100%, 40% 60%, 0% 60%, 0% 40%, 40% 40%)' } })

      // Corners
      rules.push({ pattern: 'clip-corner-tr', properties: { 'clip-path': 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 20%, 20% 0%)' } })
      rules.push({ pattern: 'clip-corner-tl', properties: { 'clip-path': 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 20%)' } })
      rules.push({ pattern: 'clip-corner-br', properties: { 'clip-path': 'polygon(0% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%)' } })
      rules.push({ pattern: 'clip-corner-bl', properties: { 'clip-path': 'polygon(0% 0%, 100% 0%, 100% 100%, 20% 100%, 0% 80%)' } })

      // Notches
      rules.push({ pattern: 'clip-notch-r', properties: { 'clip-path': 'polygon(0% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 0% 100%)' } })
      rules.push({ pattern: 'clip-notch-l', properties: { 'clip-path': 'polygon(10% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 90%, 0% 10%)' } })
      rules.push({ pattern: 'clip-notch-all', properties: { 'clip-path': 'polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)' } })

      // Waves
      rules.push({
        pattern: 'clip-wave-top',
        properties: {
          'clip-path': 'polygon(0% 10%, 5% 15%, 10% 10%, 15% 15%, 20% 10%, 25% 15%, 30% 10%, 35% 15%, 40% 10%, 45% 15%, 50% 10%, 55% 15%, 60% 10%, 65% 15%, 70% 10%, 75% 15%, 80% 10%, 85% 15%, 90% 10%, 95% 15%, 100% 10%, 100% 100%, 0% 100%)'
        }
      })
      rules.push({
        pattern: 'clip-wave-bottom',
        properties: {
          'clip-path': 'polygon(0% 0%, 100% 0%, 100% 90%, 95% 85%, 90% 90%, 85% 85%, 80% 90%, 75% 85%, 70% 90%, 65% 85%, 60% 90%, 55% 85%, 50% 90%, 45% 85%, 40% 90%, 35% 85%, 30% 90%, 25% 85%, 20% 90%, 15% 85%, 10% 90%, 5% 85%, 0% 90%)'
        }
      })

      // Message bubbles
      rules.push({ pattern: 'clip-message', properties: { 'clip-path': 'polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)' } })
      rules.push({ pattern: 'clip-message-left', properties: { 'clip-path': 'polygon(0% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 75%, 0% 75%)' } })

      // Slots
      rules.push({ pattern: 'clip-slot-t', properties: { 'clip-path': 'polygon(0% 0%, 35% 0%, 35% 15%, 65% 15%, 65% 0%, 100% 0%, 100% 100%, 0% 100%)' } })
      rules.push({ pattern: 'clip-slot-b', properties: { 'clip-path': 'polygon(0% 0%, 100% 0%, 100% 100%, 65% 100%, 65% 85%, 35% 85%, 35% 100%, 0% 100%)' } })

      // Arbitrary clip-path
      rules.push({
        pattern: /^clip-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'clip-path': v.replace(/_/g, ' ') } }
        },
      })

      // ========================================
      // MASK IMAGE
      // ========================================

      rules.push({ pattern: 'mask-none', properties: { 'mask-image': 'none', '-webkit-mask-image': 'none' } })

      // Gradient masks
      rules.push({
        pattern: 'mask-linear',
        properties: {
          'mask-image': 'linear-gradient(to bottom, black, transparent)',
          '-webkit-mask-image': 'linear-gradient(to bottom, black, transparent)',
        }
      })
      rules.push({
        pattern: 'mask-linear-t',
        properties: {
          'mask-image': 'linear-gradient(to top, black, transparent)',
          '-webkit-mask-image': 'linear-gradient(to top, black, transparent)',
        }
      })
      rules.push({
        pattern: 'mask-linear-r',
        properties: {
          'mask-image': 'linear-gradient(to right, black, transparent)',
          '-webkit-mask-image': 'linear-gradient(to right, black, transparent)',
        }
      })
      rules.push({
        pattern: 'mask-linear-l',
        properties: {
          'mask-image': 'linear-gradient(to left, black, transparent)',
          '-webkit-mask-image': 'linear-gradient(to left, black, transparent)',
        }
      })

      // Radial masks
      rules.push({
        pattern: 'mask-radial',
        properties: {
          'mask-image': 'radial-gradient(circle, black, transparent)',
          '-webkit-mask-image': 'radial-gradient(circle, black, transparent)',
        }
      })
      rules.push({
        pattern: 'mask-radial-sm',
        properties: {
          'mask-image': 'radial-gradient(circle at center, black 30%, transparent 70%)',
          '-webkit-mask-image': 'radial-gradient(circle at center, black 30%, transparent 70%)',
        }
      })
      rules.push({
        pattern: 'mask-radial-lg',
        properties: {
          'mask-image': 'radial-gradient(circle at center, black 70%, transparent 100%)',
          '-webkit-mask-image': 'radial-gradient(circle at center, black 70%, transparent 100%)',
        }
      })

      // Fade edges
      rules.push({
        pattern: 'mask-fade-y',
        properties: {
          'mask-image': 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          '-webkit-mask-image': 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
        }
      })
      rules.push({
        pattern: 'mask-fade-x',
        properties: {
          'mask-image': 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          '-webkit-mask-image': 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }
      })
      rules.push({
        pattern: 'mask-fade-all',
        properties: {
          'mask-image': 'radial-gradient(ellipse at center, black 50%, transparent 100%)',
          '-webkit-mask-image': 'radial-gradient(ellipse at center, black 50%, transparent 100%)',
        }
      })

      // Arbitrary mask
      rules.push({
        pattern: /^mask-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          const val = v.replace(/_/g, ' ')
          return {
            properties: {
              'mask-image': val,
              '-webkit-mask-image': val,
            }
          }
        },
      })

      // ========================================
      // MASK SIZE
      // ========================================

      rules.push({ pattern: 'mask-auto', properties: { 'mask-size': 'auto', '-webkit-mask-size': 'auto' } })
      rules.push({ pattern: 'mask-cover', properties: { 'mask-size': 'cover', '-webkit-mask-size': 'cover' } })
      rules.push({ pattern: 'mask-contain', properties: { 'mask-size': 'contain', '-webkit-mask-size': 'contain' } })

      rules.push({
        pattern: /^mask-size-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          const val = v.replace(/_/g, ' ')
          return {
            properties: {
              'mask-size': val,
              '-webkit-mask-size': val,
            }
          }
        },
      })

      // ========================================
      // MASK REPEAT
      // ========================================

      rules.push({ pattern: 'mask-repeat', properties: { 'mask-repeat': 'repeat', '-webkit-mask-repeat': 'repeat' } })
      rules.push({ pattern: 'mask-no-repeat', properties: { 'mask-repeat': 'no-repeat', '-webkit-mask-repeat': 'no-repeat' } })
      rules.push({ pattern: 'mask-repeat-x', properties: { 'mask-repeat': 'repeat-x', '-webkit-mask-repeat': 'repeat-x' } })
      rules.push({ pattern: 'mask-repeat-y', properties: { 'mask-repeat': 'repeat-y', '-webkit-mask-repeat': 'repeat-y' } })
      rules.push({ pattern: 'mask-repeat-space', properties: { 'mask-repeat': 'space', '-webkit-mask-repeat': 'space' } })
      rules.push({ pattern: 'mask-repeat-round', properties: { 'mask-repeat': 'round', '-webkit-mask-repeat': 'round' } })

      // ========================================
      // MASK POSITION
      // ========================================

      rules.push({ pattern: 'mask-center', properties: { 'mask-position': 'center', '-webkit-mask-position': 'center' } })
      rules.push({ pattern: 'mask-top', properties: { 'mask-position': 'top', '-webkit-mask-position': 'top' } })
      rules.push({ pattern: 'mask-bottom', properties: { 'mask-position': 'bottom', '-webkit-mask-position': 'bottom' } })
      rules.push({ pattern: 'mask-left', properties: { 'mask-position': 'left', '-webkit-mask-position': 'left' } })
      rules.push({ pattern: 'mask-right', properties: { 'mask-position': 'right', '-webkit-mask-position': 'right' } })
      rules.push({ pattern: 'mask-top-left', properties: { 'mask-position': 'top left', '-webkit-mask-position': 'top left' } })
      rules.push({ pattern: 'mask-top-right', properties: { 'mask-position': 'top right', '-webkit-mask-position': 'top right' } })
      rules.push({ pattern: 'mask-bottom-left', properties: { 'mask-position': 'bottom left', '-webkit-mask-position': 'bottom left' } })
      rules.push({ pattern: 'mask-bottom-right', properties: { 'mask-position': 'bottom right', '-webkit-mask-position': 'bottom right' } })

      rules.push({
        pattern: /^mask-position-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          const val = v.replace(/_/g, ' ')
          return {
            properties: {
              'mask-position': val,
              '-webkit-mask-position': val,
            }
          }
        },
      })

      // ========================================
      // MASK COMPOSITE
      // ========================================

      rules.push({ pattern: 'mask-composite-add', properties: { 'mask-composite': 'add', '-webkit-mask-composite': 'source-over' } })
      rules.push({ pattern: 'mask-composite-subtract', properties: { 'mask-composite': 'subtract', '-webkit-mask-composite': 'source-out' } })
      rules.push({ pattern: 'mask-composite-intersect', properties: { 'mask-composite': 'intersect', '-webkit-mask-composite': 'source-in' } })
      rules.push({ pattern: 'mask-composite-exclude', properties: { 'mask-composite': 'exclude', '-webkit-mask-composite': 'xor' } })

      // ========================================
      // MASK MODE
      // ========================================

      rules.push({ pattern: 'mask-mode-alpha', properties: { 'mask-mode': 'alpha', '-webkit-mask-mode': 'alpha' } })
      rules.push({ pattern: 'mask-mode-luminance', properties: { 'mask-mode': 'luminance', '-webkit-mask-mode': 'luminance' } })
      rules.push({ pattern: 'mask-mode-match-source', properties: { 'mask-mode': 'match-source', '-webkit-mask-mode': 'match-source' } })

      // ========================================
      // MASK ORIGIN & CLIP
      // ========================================

      rules.push({ pattern: 'mask-origin-border', properties: { 'mask-origin': 'border-box', '-webkit-mask-origin': 'border-box' } })
      rules.push({ pattern: 'mask-origin-padding', properties: { 'mask-origin': 'padding-box', '-webkit-mask-origin': 'padding-box' } })
      rules.push({ pattern: 'mask-origin-content', properties: { 'mask-origin': 'content-box', '-webkit-mask-origin': 'content-box' } })

      rules.push({ pattern: 'mask-clip-border', properties: { 'mask-clip': 'border-box', '-webkit-mask-clip': 'border-box' } })
      rules.push({ pattern: 'mask-clip-padding', properties: { 'mask-clip': 'padding-box', '-webkit-mask-clip': 'padding-box' } })
      rules.push({ pattern: 'mask-clip-content', properties: { 'mask-clip': 'content-box', '-webkit-mask-clip': 'content-box' } })
      rules.push({ pattern: 'mask-clip-no-clip', properties: { 'mask-clip': 'no-clip', '-webkit-mask-clip': 'no-clip' } })

      // ========================================
      // SHAPE OUTSIDE (Text Wrap Around Shapes)
      // ========================================

      rules.push({ pattern: 'shape-none', properties: { 'shape-outside': 'none' } })
      rules.push({ pattern: 'shape-margin-box', properties: { 'shape-outside': 'margin-box' } })
      rules.push({ pattern: 'shape-border-box', properties: { 'shape-outside': 'border-box' } })
      rules.push({ pattern: 'shape-padding-box', properties: { 'shape-outside': 'padding-box' } })
      rules.push({ pattern: 'shape-content-box', properties: { 'shape-outside': 'content-box' } })
      rules.push({ pattern: 'shape-circle', properties: { 'shape-outside': 'circle(50%)' } })
      rules.push({ pattern: 'shape-ellipse', properties: { 'shape-outside': 'ellipse(50% 40%)' } })
      rules.push({ pattern: 'shape-inset', properties: { 'shape-outside': 'inset(10%)' } })

      rules.push({
        pattern: /^shape-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'shape-outside': v.replace(/_/g, ' ') } }
        },
      })

      // Shape margin
      rules.push({ pattern: 'shape-margin-0', properties: { 'shape-margin': '0' } })
      rules.push({ pattern: 'shape-margin-1', properties: { 'shape-margin': '0.25rem' } })
      rules.push({ pattern: 'shape-margin-2', properties: { 'shape-margin': '0.5rem' } })
      rules.push({ pattern: 'shape-margin-3', properties: { 'shape-margin': '0.75rem' } })
      rules.push({ pattern: 'shape-margin-4', properties: { 'shape-margin': '1rem' } })
      rules.push({ pattern: 'shape-margin-5', properties: { 'shape-margin': '1.25rem' } })
      rules.push({ pattern: 'shape-margin-6', properties: { 'shape-margin': '1.5rem' } })
      rules.push({ pattern: 'shape-margin-8', properties: { 'shape-margin': '2rem' } })

      rules.push({
        pattern: /^shape-margin-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'shape-margin': v } }
        },
      })

      // Shape image threshold
      rules.push({ pattern: 'shape-image-threshold-0', properties: { 'shape-image-threshold': '0' } })
      rules.push({ pattern: 'shape-image-threshold-25', properties: { 'shape-image-threshold': '0.25' } })
      rules.push({ pattern: 'shape-image-threshold-50', properties: { 'shape-image-threshold': '0.5' } })
      rules.push({ pattern: 'shape-image-threshold-75', properties: { 'shape-image-threshold': '0.75' } })
      rules.push({ pattern: 'shape-image-threshold-100', properties: { 'shape-image-threshold': '1' } })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default masksPlugin
