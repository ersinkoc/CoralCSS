/**
 * Sizing Utilities Plugin
 *
 * Width, height, min/max sizing utilities.
 * @module plugins/core/utilities/sizing
 */

import type { Plugin, Rule, PluginContext } from '../../../types'
import { sizing, heightSizing, maxWidth } from '../../../theme'

/**
 * Sizing utilities plugin
 */
export function sizingPlugin(): Plugin {
  return {
    name: 'sizing',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // Width
      for (const [key, value] of Object.entries(sizing)) {
        rules.push({
          pattern: `w-${key}`,
          properties: { width: value },
        })
      }

      // Height
      for (const [key, value] of Object.entries(heightSizing)) {
        rules.push({
          pattern: `h-${key}`,
          properties: { height: value },
        })
      }

      // Min-width
      for (const [key, value] of Object.entries(sizing)) {
        rules.push({
          pattern: `min-w-${key}`,
          properties: { 'min-width': value },
        })
      }

      // Max-width (uses different scale)
      for (const [key, value] of Object.entries(maxWidth)) {
        rules.push({
          pattern: `max-w-${key}`,
          properties: { 'max-width': value },
        })
      }

      // Min-height
      for (const [key, value] of Object.entries(heightSizing)) {
        rules.push({
          pattern: `min-h-${key}`,
          properties: { 'min-height': value },
        })
      }

      // Max-height
      for (const [key, value] of Object.entries(heightSizing)) {
        rules.push({
          pattern: `max-h-${key}`,
          properties: { 'max-height': value },
        })
      }

      // Size (width and height together)
      for (const [key, value] of Object.entries(sizing)) {
        rules.push({
          pattern: `size-${key}`,
          properties: { width: value, height: value },
        })
      }

      // Arbitrary values
      rules.push({
        pattern: /^w-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { width: v } } },
      })
      rules.push({
        pattern: /^h-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { height: v } } },
      })
      rules.push({
        pattern: /^min-w-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'min-width': v } } },
      })
      rules.push({
        pattern: /^max-w-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'max-width': v } } },
      })
      rules.push({
        pattern: /^min-h-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'min-height': v } } },
      })
      rules.push({
        pattern: /^max-h-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'max-height': v } } },
      })
      rules.push({
        pattern: /^size-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { width: v, height: v } } },
      })

      // ========================================
      // INTRINSIC SIZING (Beyond Tailwind 4)
      // ========================================

      // Width intrinsic sizing
      rules.push({ pattern: 'w-min-content', properties: { width: 'min-content' } })
      rules.push({ pattern: 'w-max-content', properties: { width: 'max-content' } })
      rules.push({ pattern: 'w-fit-content', properties: { width: 'fit-content' } })

      // fit-content with values
      const fitContentValues = ['0', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl']
      const fitContentSizes: Record<string, string> = {
        '0': '0px',
        'xs': '20rem',
        'sm': '24rem',
        'md': '28rem',
        'lg': '32rem',
        'xl': '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
      }
      for (const key of fitContentValues) {
        const value = fitContentSizes[key]
        rules.push({ pattern: `w-fit-content-${key}`, properties: { width: `fit-content(${value})` } })
      }

      rules.push({
        pattern: /^w-fit-content-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { width: `fit-content(${v})` } } },
      })

      // Height intrinsic sizing
      rules.push({ pattern: 'h-min-content', properties: { height: 'min-content' } })
      rules.push({ pattern: 'h-max-content', properties: { height: 'max-content' } })
      rules.push({ pattern: 'h-fit-content', properties: { height: 'fit-content' } })

      for (const key of fitContentValues) {
        const value = fitContentSizes[key]
        rules.push({ pattern: `h-fit-content-${key}`, properties: { height: `fit-content(${value})` } })
      }

      rules.push({
        pattern: /^h-fit-content-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { height: `fit-content(${v})` } } },
      })

      // Min-width intrinsic
      rules.push({ pattern: 'min-w-min-content', properties: { 'min-width': 'min-content' } })
      rules.push({ pattern: 'min-w-max-content', properties: { 'min-width': 'max-content' } })
      rules.push({ pattern: 'min-w-fit-content', properties: { 'min-width': 'fit-content' } })

      // Max-width intrinsic
      rules.push({ pattern: 'max-w-min-content', properties: { 'max-width': 'min-content' } })
      rules.push({ pattern: 'max-w-max-content', properties: { 'max-width': 'max-content' } })
      rules.push({ pattern: 'max-w-fit-content', properties: { 'max-width': 'fit-content' } })

      // Min-height intrinsic
      rules.push({ pattern: 'min-h-min-content', properties: { 'min-height': 'min-content' } })
      rules.push({ pattern: 'min-h-max-content', properties: { 'min-height': 'max-content' } })
      rules.push({ pattern: 'min-h-fit-content', properties: { 'min-height': 'fit-content' } })

      // Max-height intrinsic
      rules.push({ pattern: 'max-h-min-content', properties: { 'max-height': 'min-content' } })
      rules.push({ pattern: 'max-h-max-content', properties: { 'max-height': 'max-content' } })
      rules.push({ pattern: 'max-h-fit-content', properties: { 'max-height': 'fit-content' } })

      // Size intrinsic
      rules.push({ pattern: 'size-min-content', properties: { width: 'min-content', height: 'min-content' } })
      rules.push({ pattern: 'size-max-content', properties: { width: 'max-content', height: 'max-content' } })
      rules.push({ pattern: 'size-fit-content', properties: { width: 'fit-content', height: 'fit-content' } })

      // ========================================
      // CSS MATH FUNCTIONS (Beyond Tailwind 4)
      // ========================================

      // clamp() for responsive sizing
      rules.push({
        pattern: /^w-clamp-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          const parts = v.split(',').map(p => p.trim())
          if (parts.length !== 3) return null
          return { properties: { width: `clamp(${parts[0]}, ${parts[1]}, ${parts[2]})` } }
        },
      })
      rules.push({
        pattern: /^h-clamp-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          const parts = v.split(',').map(p => p.trim())
          if (parts.length !== 3) return null
          return { properties: { height: `clamp(${parts[0]}, ${parts[1]}, ${parts[2]})` } }
        },
      })

      // ========================================
      // CSS ENV() SAFE AREA (Beyond Tailwind 4)
      // ========================================

      // Safe area insets
      rules.push({ pattern: 'pt-safe', properties: { 'padding-top': 'env(safe-area-inset-top)' } })
      rules.push({ pattern: 'pr-safe', properties: { 'padding-right': 'env(safe-area-inset-right)' } })
      rules.push({ pattern: 'pb-safe', properties: { 'padding-bottom': 'env(safe-area-inset-bottom)' } })
      rules.push({ pattern: 'pl-safe', properties: { 'padding-left': 'env(safe-area-inset-left)' } })
      rules.push({
        pattern: 'px-safe',
        properties: {
          'padding-left': 'env(safe-area-inset-left)',
          'padding-right': 'env(safe-area-inset-right)',
        },
      })
      rules.push({
        pattern: 'py-safe',
        properties: {
          'padding-top': 'env(safe-area-inset-top)',
          'padding-bottom': 'env(safe-area-inset-bottom)',
        },
      })
      rules.push({
        pattern: 'p-safe',
        properties: {
          'padding-top': 'env(safe-area-inset-top)',
          'padding-right': 'env(safe-area-inset-right)',
          'padding-bottom': 'env(safe-area-inset-bottom)',
          'padding-left': 'env(safe-area-inset-left)',
        },
      })

      // Margin safe area
      rules.push({ pattern: 'mt-safe', properties: { 'margin-top': 'env(safe-area-inset-top)' } })
      rules.push({ pattern: 'mr-safe', properties: { 'margin-right': 'env(safe-area-inset-right)' } })
      rules.push({ pattern: 'mb-safe', properties: { 'margin-bottom': 'env(safe-area-inset-bottom)' } })
      rules.push({ pattern: 'ml-safe', properties: { 'margin-left': 'env(safe-area-inset-left)' } })
      rules.push({
        pattern: 'mx-safe',
        properties: {
          'margin-left': 'env(safe-area-inset-left)',
          'margin-right': 'env(safe-area-inset-right)',
        },
      })
      rules.push({
        pattern: 'my-safe',
        properties: {
          'margin-top': 'env(safe-area-inset-top)',
          'margin-bottom': 'env(safe-area-inset-bottom)',
        },
      })
      rules.push({
        pattern: 'm-safe',
        properties: {
          'margin-top': 'env(safe-area-inset-top)',
          'margin-right': 'env(safe-area-inset-right)',
          'margin-bottom': 'env(safe-area-inset-bottom)',
          'margin-left': 'env(safe-area-inset-left)',
        },
      })

      // Inset safe area
      rules.push({ pattern: 'top-safe', properties: { top: 'env(safe-area-inset-top)' } })
      rules.push({ pattern: 'right-safe', properties: { right: 'env(safe-area-inset-right)' } })
      rules.push({ pattern: 'bottom-safe', properties: { bottom: 'env(safe-area-inset-bottom)' } })
      rules.push({ pattern: 'left-safe', properties: { left: 'env(safe-area-inset-left)' } })
      rules.push({
        pattern: 'inset-safe',
        properties: {
          top: 'env(safe-area-inset-top)',
          right: 'env(safe-area-inset-right)',
          bottom: 'env(safe-area-inset-bottom)',
          left: 'env(safe-area-inset-left)',
        },
      })
      rules.push({
        pattern: 'inset-x-safe',
        properties: {
          left: 'env(safe-area-inset-left)',
          right: 'env(safe-area-inset-right)',
        },
      })
      rules.push({
        pattern: 'inset-y-safe',
        properties: {
          top: 'env(safe-area-inset-top)',
          bottom: 'env(safe-area-inset-bottom)',
        },
      })

      // Safe area with fallback
      rules.push({
        pattern: /^pt-safe-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'padding-top': `env(safe-area-inset-top, ${v})` } }
        },
      })
      rules.push({
        pattern: /^pb-safe-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'padding-bottom': `env(safe-area-inset-bottom, ${v})` } }
        },
      })
      rules.push({
        pattern: /^pl-safe-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'padding-left': `env(safe-area-inset-left, ${v})` } }
        },
      })
      rules.push({
        pattern: /^pr-safe-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'padding-right': `env(safe-area-inset-right, ${v})` } }
        },
      })

      // Height with safe area
      rules.push({ pattern: 'h-screen-safe', properties: { height: 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))' } })
      rules.push({ pattern: 'min-h-screen-safe', properties: { 'min-height': 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))' } })

      // Width with safe area
      rules.push({ pattern: 'w-screen-safe', properties: { width: 'calc(100vw - env(safe-area-inset-left) - env(safe-area-inset-right))' } })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default sizingPlugin
