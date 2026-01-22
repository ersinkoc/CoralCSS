/**
 * Interpolation Utilities Plugin
 *
 * CSS interpolation utilities for color-mix() and other interpolation functions.
 * Provides powerful color manipulation and mixing capabilities.
 *
 * @module plugins/core/utilities/interpolation
 */

import type { Plugin, Rule, PluginContext } from '../../../types'

/**
 * Interpolation utilities plugin for CoralCSS
 *
 * Features:
 * - color-mix() function utilities
 * - mix-blend-mode enhancements
 * - color interpolation in different color spaces
 * - Relative color syntax support
 *
 * @example
 * ```html
 * <div class="bg-mix-red-500-in-blue-500">
 *   Mixed background color
 * </div>
 * <div class="text-mix-coral-600-50%">
 *   Mixed text color with 50% mixing
 * </div>
 * ```
 */
export function interpolationPlugin(): Plugin {
  return {
    name: 'interpolation',
    version: '1.0.0',
    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // ========================================
      // COLOR-MIX UTILITIES
      // ========================================

      const colorSpaces = ['srgb', 'srgb-linear', 'lab', 'oklab', 'lch', 'oklch', 'hsl', 'hwb', 'xyz', 'xyz-d50', 'xyz-d65']

      // Generate mix-in utilities for each color space
      for (const space of colorSpaces) {
        // bg-mix-{color}-in-{base}
        rules.push({
          name: `bg-mix-${space}-arb`,
          pattern: new RegExp(`^bg-mix-${space}-\\[(.+?)\\]-in-\\[(.+?)\\]$`),
          handler: (match) => {
            const color = match[1]
            const base = match[2]
            if (!color || !base) {return null}
            return {
              properties: {
                'background-color': `color-mix(in ${space}, ${color.replace(/_/g, ' ')}, ${base.replace(/_/g, ' ')})`
              }
            }
          }
        })

        // text-mix-{color}-in-{base}
        rules.push({
          name: `text-mix-${space}-arb`,
          pattern: new RegExp(`^text-mix-${space}-\\[(.+?)\\]-in-\\[(.+?)\\]$`),
          handler: (match) => {
            const color = match[1]
            const base = match[2]
            if (!color || !base) {return null}
            return {
              properties: {
                color: `color-mix(in ${space}, ${color.replace(/_/g, ' ')}, ${base.replace(/_/g, ' ')})`
              }
            }
          }
        })

        // border-mix-{color}-in-{base}
        rules.push({
          name: `border-mix-${space}-arb`,
          pattern: new RegExp(`^border-mix-${space}-\\[(.+?)\\]-in-\\[(.+?)\\]$`),
          handler: (match) => {
            const color = match[1]
            const base = match[2]
            if (!color || !base) {return null}
            return {
              properties: {
                'border-color': `color-mix(in ${space}, ${color.replace(/_/g, ' ')}, ${base.replace(/_/g, ' ')})`
              }
            }
          }
        })
      }

      // Default srgb mix (simpler syntax)
      rules.push({
        pattern: /^bg-mix-\[(.+?)\]-in-\[(.+?)\]$/,
        handler: (match) => {
          const color = match[1]
          const base = match[2]
          if (!color || !base) {return null}
          return {
            properties: {
              'background-color': `color-mix(in srgb, ${color.replace(/_/g, ' ')}, ${base.replace(/_/g, ' ')})`
            }
          }
        }
      })

      rules.push({
        pattern: /^text-mix-\[(.+?)\]-in-\[(.+?)\]$/,
        handler: (match) => {
          const color = match[1]
          const base = match[2]
          if (!color || !base) {return null}
          return {
            properties: {
              color: `color-mix(in srgb, ${color.replace(/_/g, ' ')}, ${base.replace(/_/g, ' ')})`
            }
          }
        }
      })

      rules.push({
        pattern: /^border-mix-\[(.+?)\]-in-\[(.+?)\]$/,
        handler: (match) => {
          const color = match[1]
          const base = match[2]
          if (!color || !base) {return null}
          return {
            properties: {
              'border-color': `color-mix(in srgb, ${color.replace(/_/g, ' ')}, ${base.replace(/_/g, ' ')})`
            }
          }
        }
      })

      // ========================================
      // MIX WITH PERCENTAGE
      // ========================================

      // bg-mix-{color}-{percent}
      const percentages = ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100']
      const mixColors = ['white', 'black', 'transparent']

      for (const color of mixColors) {
        for (const p of percentages) {
          rules.push({
            pattern: `bg-mix-${color}-${p}%`,
            properties: {
              'background-color': `color-mix(in srgb, ${color} ${p}%, currentColor)`
            }
          })

          rules.push({
            pattern: `text-mix-${color}-${p}%`,
            properties: {
              color: `color-mix(in srgb, ${color} ${p}%, currentColor)`
            }
          })
        }
      }

      // ========================================
      // RELATIVE COLOR SYNTAX
      // ========================================

      // Color space modifications
      rules.push({
        pattern: /^from-lab-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return {
            properties: { color: `lab(from var(--color-base) ${value.replace(/_/g, ' ')})` }
          }
        }
      })

      rules.push({
        pattern: /^from-oklab-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return {
            properties: { color: `oklab(from var(--color-base) ${value.replace(/_/g, ' ')})` }
          }
        }
      })

      rules.push({
        pattern: /^from-lch-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return {
            properties: { color: `lch(from var(--color-base) ${value.replace(/_/g, ' ')})` }
          }
        }
      })

      rules.push({
        pattern: /^from-oklch-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return {
            properties: { color: `oklch(from var(--color-base) ${value.replace(/_/g, ' ')})` }
          }
        }
      })

      rules.push({
        pattern: /^from-hsl-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return {
            properties: { color: `hsl(from var(--color-base) ${value.replace(/_/g, ' ')})` }
          }
        }
      })

      rules.push({
        pattern: /^from-hwb-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return {
            properties: { color: `hwb(from var(--color-base) ${value.replace(/_/g, ' ')})` }
          }
        }
      })

      // ========================================
      // COLOR MANIPULATION SHORTCUTS
      // ========================================

      // Lighten/Darken utilities
      rules.push({
        pattern: /^lighten-\[(\d+)\]$/,
        handler: (match) => {
          const amount = match[1]
          if (!amount) {return null}
          return {
            properties: { color: `oklab(from var(--color-base) calc(l + ${amount}%) a b)` }
          }
        }
      })

      rules.push({
        pattern: /^darken-\[(\d+)\]$/,
        handler: (match) => {
          const amount = match[1]
          if (!amount) {return null}
          return {
            properties: { color: `oklab(from var(--color-base) calc(l - ${amount}%) a b)` }
          }
        }
      })

      // Saturate/Desaturate
      rules.push({
        pattern: /^saturate-\[(\d+)\]$/,
        handler: (match) => {
          const amount = match[1]
          if (!amount) {return null}
          return {
            properties: { color: `oklch(from var(--color-base) l calc(c * ${amount} / 100) h)` }
          }
        }
      })

      rules.push({
        pattern: /^desaturate-\[(\d+)\]$/,
        handler: (match) => {
          const amount = match[1]
          if (!amount) {return null}
          return {
            properties: { color: `oklch(from var(--color-base) l calc(c * ${100 - parseInt(amount, 10)} / 100) h)` }
          }
        }
      })

      // ========================================
      // BG MANIPULATION VARIANTS
      // ========================================

      rules.push({
        pattern: /^bg-lighten-\[(\d+)\]$/,
        handler: (match) => {
          const amount = match[1]
          if (!amount) {return null}
          return {
            properties: { 'background-color': `oklab(from var(--bg-color-base) calc(l + ${amount}%) a b)` }
          }
        }
      })

      rules.push({
        pattern: /^bg-darken-\[(\d+)\]$/,
        handler: (match) => {
          const amount = match[1]
          if (!amount) {return null}
          return {
            properties: { 'background-color': `oklab(from var(--bg-color-base) calc(l - ${amount}%) a b)` }
          }
        }
      })

      // ========================================
      // REGISTER ALL RULES
      // ========================================

      for (const rule of rules) {
        ctx.addRule(rule)
      }
    }
  }
}

export default interpolationPlugin
