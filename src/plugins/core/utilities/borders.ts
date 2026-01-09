/**
 * Border Utilities Plugin
 *
 * Border, border-radius, outline, ring, and divide utilities.
 * @module plugins/core/utilities/borders
 */

import type { Plugin, Rule, PluginContext, CSSProperties } from '../../../types'
import { borderRadius, borderWidth } from '../../../theme'

/**
 * Border utilities plugin
 */
export function bordersPlugin(): Plugin {
  return {
    name: 'borders',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // Border radius
      for (const [key, value] of Object.entries(borderRadius)) {
        const suffix = key === 'DEFAULT' ? '' : `-${key}`
        rules.push({ pattern: `rounded${suffix}`, properties: { 'border-radius': value } })
        rules.push({ pattern: `rounded-t${suffix}`, properties: { 'border-top-left-radius': value, 'border-top-right-radius': value } })
        rules.push({ pattern: `rounded-r${suffix}`, properties: { 'border-top-right-radius': value, 'border-bottom-right-radius': value } })
        rules.push({ pattern: `rounded-b${suffix}`, properties: { 'border-bottom-right-radius': value, 'border-bottom-left-radius': value } })
        rules.push({ pattern: `rounded-l${suffix}`, properties: { 'border-top-left-radius': value, 'border-bottom-left-radius': value } })
        rules.push({ pattern: `rounded-tl${suffix}`, properties: { 'border-top-left-radius': value } })
        rules.push({ pattern: `rounded-tr${suffix}`, properties: { 'border-top-right-radius': value } })
        rules.push({ pattern: `rounded-br${suffix}`, properties: { 'border-bottom-right-radius': value } })
        rules.push({ pattern: `rounded-bl${suffix}`, properties: { 'border-bottom-left-radius': value } })
        rules.push({ pattern: `rounded-s${suffix}`, properties: { 'border-start-start-radius': value, 'border-end-start-radius': value } })
        rules.push({ pattern: `rounded-e${suffix}`, properties: { 'border-start-end-radius': value, 'border-end-end-radius': value } })
        rules.push({ pattern: `rounded-ss${suffix}`, properties: { 'border-start-start-radius': value } })
        rules.push({ pattern: `rounded-se${suffix}`, properties: { 'border-start-end-radius': value } })
        rules.push({ pattern: `rounded-ee${suffix}`, properties: { 'border-end-end-radius': value } })
        rules.push({ pattern: `rounded-es${suffix}`, properties: { 'border-end-start-radius': value } })
      }

      // Border width
      for (const [key, value] of Object.entries(borderWidth)) {
        const suffix = key === 'DEFAULT' ? '' : `-${key}`
        rules.push({ pattern: `border${suffix}`, properties: { 'border-width': value } })
        rules.push({ pattern: `border-x${suffix}`, properties: { 'border-left-width': value, 'border-right-width': value } })
        rules.push({ pattern: `border-y${suffix}`, properties: { 'border-top-width': value, 'border-bottom-width': value } })
        rules.push({ pattern: `border-t${suffix}`, properties: { 'border-top-width': value } })
        rules.push({ pattern: `border-r${suffix}`, properties: { 'border-right-width': value } })
        rules.push({ pattern: `border-b${suffix}`, properties: { 'border-bottom-width': value } })
        rules.push({ pattern: `border-l${suffix}`, properties: { 'border-left-width': value } })
        rules.push({ pattern: `border-s${suffix}`, properties: { 'border-inline-start-width': value } })
        rules.push({ pattern: `border-e${suffix}`, properties: { 'border-inline-end-width': value } })
      }

      // Border style
      rules.push({ pattern: 'border-solid', properties: { 'border-style': 'solid' } })
      rules.push({ pattern: 'border-dashed', properties: { 'border-style': 'dashed' } })
      rules.push({ pattern: 'border-dotted', properties: { 'border-style': 'dotted' } })
      rules.push({ pattern: 'border-double', properties: { 'border-style': 'double' } })
      rules.push({ pattern: 'border-hidden', properties: { 'border-style': 'hidden' } })
      rules.push({ pattern: 'border-none', properties: { 'border-style': 'none' } })

      // Divide width (between children)
      for (const [key, value] of Object.entries(borderWidth)) {
        const suffix = key === 'DEFAULT' ? '' : `-${key}`
        rules.push({
          pattern: `divide-x${suffix}`,
          selector: (s) => `${s} > * + *`,
          properties: { 'border-left-width': value },
        })
        rules.push({
          pattern: `divide-y${suffix}`,
          selector: (s) => `${s} > * + *`,
          properties: { 'border-top-width': value },
        })
      }

      // Divide style
      rules.push({
        pattern: 'divide-solid',
        selector: (s) => `${s} > * + *`,
        properties: { 'border-style': 'solid' },
      })
      rules.push({
        pattern: 'divide-dashed',
        selector: (s) => `${s} > * + *`,
        properties: { 'border-style': 'dashed' },
      })
      rules.push({
        pattern: 'divide-dotted',
        selector: (s) => `${s} > * + *`,
        properties: { 'border-style': 'dotted' },
      })
      rules.push({
        pattern: 'divide-double',
        selector: (s) => `${s} > * + *`,
        properties: { 'border-style': 'double' },
      })
      rules.push({
        pattern: 'divide-none',
        selector: (s) => `${s} > * + *`,
        properties: { 'border-style': 'none' },
      })

      // Outline width
      rules.push({ pattern: 'outline-0', properties: { 'outline-width': '0px' } })
      rules.push({ pattern: 'outline-1', properties: { 'outline-width': '1px' } })
      rules.push({ pattern: 'outline-2', properties: { 'outline-width': '2px' } })
      rules.push({ pattern: 'outline-4', properties: { 'outline-width': '4px' } })
      rules.push({ pattern: 'outline-8', properties: { 'outline-width': '8px' } })

      // Outline style
      rules.push({ pattern: 'outline', properties: { 'outline-style': 'solid' } })
      rules.push({ pattern: 'outline-none', properties: { outline: '2px solid transparent', 'outline-offset': '2px' } })
      rules.push({ pattern: 'outline-dashed', properties: { 'outline-style': 'dashed' } })
      rules.push({ pattern: 'outline-dotted', properties: { 'outline-style': 'dotted' } })
      rules.push({ pattern: 'outline-double', properties: { 'outline-style': 'double' } })

      // Outline offset
      rules.push({ pattern: 'outline-offset-0', properties: { 'outline-offset': '0px' } })
      rules.push({ pattern: 'outline-offset-1', properties: { 'outline-offset': '1px' } })
      rules.push({ pattern: 'outline-offset-2', properties: { 'outline-offset': '2px' } })
      rules.push({ pattern: 'outline-offset-4', properties: { 'outline-offset': '4px' } })
      rules.push({ pattern: 'outline-offset-8', properties: { 'outline-offset': '8px' } })

      // Ring (box-shadow based)
      rules.push({
        pattern: 'ring',
        properties: {
          '--coral-ring-offset-shadow': 'var(--coral-ring-inset) 0 0 0 var(--coral-ring-offset-width) var(--coral-ring-offset-color)',
          '--coral-ring-shadow': 'var(--coral-ring-inset) 0 0 0 calc(3px + var(--coral-ring-offset-width)) var(--coral-ring-color)',
          'box-shadow': 'var(--coral-ring-offset-shadow), var(--coral-ring-shadow), var(--coral-shadow, 0 0 #0000)',
        },
      })
      rules.push({
        pattern: 'ring-0',
        properties: {
          '--coral-ring-offset-shadow': 'var(--coral-ring-inset) 0 0 0 var(--coral-ring-offset-width) var(--coral-ring-offset-color)',
          '--coral-ring-shadow': 'var(--coral-ring-inset) 0 0 0 calc(0px + var(--coral-ring-offset-width)) var(--coral-ring-color)',
          'box-shadow': 'var(--coral-ring-offset-shadow), var(--coral-ring-shadow), var(--coral-shadow, 0 0 #0000)',
        },
      })
      rules.push({
        pattern: 'ring-1',
        properties: {
          '--coral-ring-offset-shadow': 'var(--coral-ring-inset) 0 0 0 var(--coral-ring-offset-width) var(--coral-ring-offset-color)',
          '--coral-ring-shadow': 'var(--coral-ring-inset) 0 0 0 calc(1px + var(--coral-ring-offset-width)) var(--coral-ring-color)',
          'box-shadow': 'var(--coral-ring-offset-shadow), var(--coral-ring-shadow), var(--coral-shadow, 0 0 #0000)',
        },
      })
      rules.push({
        pattern: 'ring-2',
        properties: {
          '--coral-ring-offset-shadow': 'var(--coral-ring-inset) 0 0 0 var(--coral-ring-offset-width) var(--coral-ring-offset-color)',
          '--coral-ring-shadow': 'var(--coral-ring-inset) 0 0 0 calc(2px + var(--coral-ring-offset-width)) var(--coral-ring-color)',
          'box-shadow': 'var(--coral-ring-offset-shadow), var(--coral-ring-shadow), var(--coral-shadow, 0 0 #0000)',
        },
      })
      rules.push({
        pattern: 'ring-4',
        properties: {
          '--coral-ring-offset-shadow': 'var(--coral-ring-inset) 0 0 0 var(--coral-ring-offset-width) var(--coral-ring-offset-color)',
          '--coral-ring-shadow': 'var(--coral-ring-inset) 0 0 0 calc(4px + var(--coral-ring-offset-width)) var(--coral-ring-color)',
          'box-shadow': 'var(--coral-ring-offset-shadow), var(--coral-ring-shadow), var(--coral-shadow, 0 0 #0000)',
        },
      })
      rules.push({
        pattern: 'ring-8',
        properties: {
          '--coral-ring-offset-shadow': 'var(--coral-ring-inset) 0 0 0 var(--coral-ring-offset-width) var(--coral-ring-offset-color)',
          '--coral-ring-shadow': 'var(--coral-ring-inset) 0 0 0 calc(8px + var(--coral-ring-offset-width)) var(--coral-ring-color)',
          'box-shadow': 'var(--coral-ring-offset-shadow), var(--coral-ring-shadow), var(--coral-shadow, 0 0 #0000)',
        },
      })
      rules.push({ pattern: 'ring-inset', properties: { '--coral-ring-inset': 'inset' } })

      // Ring offset
      rules.push({ pattern: 'ring-offset-0', properties: { '--coral-ring-offset-width': '0px' } })
      rules.push({ pattern: 'ring-offset-1', properties: { '--coral-ring-offset-width': '1px' } })
      rules.push({ pattern: 'ring-offset-2', properties: { '--coral-ring-offset-width': '2px' } })
      rules.push({ pattern: 'ring-offset-4', properties: { '--coral-ring-offset-width': '4px' } })
      rules.push({ pattern: 'ring-offset-8', properties: { '--coral-ring-offset-width': '8px' } })

      // Arbitrary values
      rules.push({
        pattern: /^rounded-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { 'border-radius': value } }
        },
      })
      rules.push({
        pattern: /^border-\[(.+)\]$/,
        handler: (match): { properties: CSSProperties } | null => {
          const value = match[1]
          if (!value) return null
          // Check if it's a width value
          if (/^\d/.test(value) || value.includes('px') || value.includes('rem')) {
            return { properties: { 'border-width': value } as CSSProperties }
          }
          // Otherwise treat as color
          return { properties: { 'border-color': value } as CSSProperties }
        },
      })
      rules.push({
        pattern: /^outline-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { outline: value } }
        },
      })
      rules.push({
        pattern: /^outline-offset-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { 'outline-offset': value } }
        },
      })
      rules.push({
        pattern: /^ring-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return {
            properties: {
              '--coral-ring-offset-shadow': 'var(--coral-ring-inset) 0 0 0 var(--coral-ring-offset-width) var(--coral-ring-offset-color)',
              '--coral-ring-shadow': `var(--coral-ring-inset) 0 0 0 calc(${value} + var(--coral-ring-offset-width)) var(--coral-ring-color)`,
              'box-shadow': 'var(--coral-ring-offset-shadow), var(--coral-ring-shadow), var(--coral-shadow, 0 0 #0000)',
            },
          }
        },
      })
      rules.push({
        pattern: /^ring-offset-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { '--coral-ring-offset-width': value } }
        },
      })

      // ========================================
      // LOGICAL BORDER PROPERTIES (Beyond Tailwind 4)
      // ========================================

      // Border block (top/bottom in horizontal writing mode)
      for (const [key, value] of Object.entries(borderWidth)) {
        const suffix = key === 'DEFAULT' ? '' : `-${key}`
        rules.push({ pattern: `border-block${suffix}`, properties: { 'border-block-width': value } })
        rules.push({ pattern: `border-block-start${suffix}`, properties: { 'border-block-start-width': value } })
        rules.push({ pattern: `border-block-end${suffix}`, properties: { 'border-block-end-width': value } })
        rules.push({ pattern: `border-inline${suffix}`, properties: { 'border-inline-width': value } })
        rules.push({ pattern: `border-inline-start${suffix}`, properties: { 'border-inline-start-width': value } })
        rules.push({ pattern: `border-inline-end${suffix}`, properties: { 'border-inline-end-width': value } })
      }

      // Logical border radius (extended)
      for (const [key, value] of Object.entries(borderRadius)) {
        const suffix = key === 'DEFAULT' ? '' : `-${key}`
        rules.push({ pattern: `rounded-bs${suffix}`, properties: { 'border-start-start-radius': value, 'border-start-end-radius': value } })
        rules.push({ pattern: `rounded-be${suffix}`, properties: { 'border-end-start-radius': value, 'border-end-end-radius': value } })
      }

      // ========================================
      // BORDER IMAGE (Beyond Tailwind 4)
      // ========================================

      // Border image source
      rules.push({ pattern: 'border-image-none', properties: { 'border-image-source': 'none' } })

      // Border image slice
      rules.push({ pattern: 'border-image-slice-0', properties: { 'border-image-slice': '0' } })
      rules.push({ pattern: 'border-image-slice-1', properties: { 'border-image-slice': '1' } })
      rules.push({ pattern: 'border-image-slice-fill', properties: { 'border-image-slice': '1 fill' } })
      rules.push({ pattern: 'border-image-slice-10', properties: { 'border-image-slice': '10' } })
      rules.push({ pattern: 'border-image-slice-20', properties: { 'border-image-slice': '20' } })
      rules.push({ pattern: 'border-image-slice-30', properties: { 'border-image-slice': '30%' } })

      rules.push({
        pattern: /^border-image-slice-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'border-image-slice': v } }
        },
      })

      // Border image width
      rules.push({ pattern: 'border-image-width-0', properties: { 'border-image-width': '0' } })
      rules.push({ pattern: 'border-image-width-1', properties: { 'border-image-width': '1' } })
      rules.push({ pattern: 'border-image-width-2', properties: { 'border-image-width': '2' } })
      rules.push({ pattern: 'border-image-width-auto', properties: { 'border-image-width': 'auto' } })

      rules.push({
        pattern: /^border-image-width-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'border-image-width': v } }
        },
      })

      // Border image outset
      rules.push({ pattern: 'border-image-outset-0', properties: { 'border-image-outset': '0' } })
      rules.push({ pattern: 'border-image-outset-1', properties: { 'border-image-outset': '1' } })
      rules.push({ pattern: 'border-image-outset-2', properties: { 'border-image-outset': '2' } })

      rules.push({
        pattern: /^border-image-outset-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'border-image-outset': v } }
        },
      })

      // Border image repeat
      rules.push({ pattern: 'border-image-repeat-stretch', properties: { 'border-image-repeat': 'stretch' } })
      rules.push({ pattern: 'border-image-repeat-repeat', properties: { 'border-image-repeat': 'repeat' } })
      rules.push({ pattern: 'border-image-repeat-round', properties: { 'border-image-repeat': 'round' } })
      rules.push({ pattern: 'border-image-repeat-space', properties: { 'border-image-repeat': 'space' } })

      // Gradient border image presets
      rules.push({
        pattern: 'border-gradient-to-r',
        properties: {
          'border-image-source': 'linear-gradient(to right, var(--coral-gradient-from, #ff6b6b), var(--coral-gradient-to, #4ecdc4))',
          'border-image-slice': '1',
        },
      })
      rules.push({
        pattern: 'border-gradient-to-b',
        properties: {
          'border-image-source': 'linear-gradient(to bottom, var(--coral-gradient-from, #ff6b6b), var(--coral-gradient-to, #4ecdc4))',
          'border-image-slice': '1',
        },
      })
      rules.push({
        pattern: 'border-gradient-to-br',
        properties: {
          'border-image-source': 'linear-gradient(to bottom right, var(--coral-gradient-from, #ff6b6b), var(--coral-gradient-to, #4ecdc4))',
          'border-image-slice': '1',
        },
      })
      rules.push({
        pattern: 'border-gradient-conic',
        properties: {
          'border-image-source': 'conic-gradient(from 0deg, var(--coral-gradient-from, #ff6b6b), var(--coral-gradient-via, #ffd93d), var(--coral-gradient-to, #4ecdc4), var(--coral-gradient-from, #ff6b6b))',
          'border-image-slice': '1',
        },
      })

      // Arbitrary border-image
      rules.push({
        pattern: /^border-image-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'border-image': v } }
        },
      })

      // ========================================
      // BORDER SPACING (Table)
      // ========================================

      const borderSpacingValues = ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20']
      for (const value of borderSpacingValues) {
        const size = value === '0' ? '0px' : `${parseInt(value, 10) * 0.25}rem`
        rules.push({ pattern: `border-spacing-${value}`, properties: { 'border-spacing': size } })
        rules.push({ pattern: `border-spacing-x-${value}`, properties: { 'border-spacing': `${size} 0` } })
        rules.push({ pattern: `border-spacing-y-${value}`, properties: { 'border-spacing': `0 ${size}` } })
      }

      rules.push({
        pattern: /^border-spacing-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'border-spacing': v } }
        },
      })

      // Border collapse
      rules.push({ pattern: 'border-collapse', properties: { 'border-collapse': 'collapse' } })
      rules.push({ pattern: 'border-separate', properties: { 'border-collapse': 'separate' } })

      // ========================================
      // TEXT EMPHASIS (Beyond Tailwind 4)
      // ========================================

      // Text emphasis style
      rules.push({ pattern: 'text-emphasis-none', properties: { 'text-emphasis-style': 'none' } })
      rules.push({ pattern: 'text-emphasis-filled', properties: { 'text-emphasis-style': 'filled' } })
      rules.push({ pattern: 'text-emphasis-open', properties: { 'text-emphasis-style': 'open' } })
      rules.push({ pattern: 'text-emphasis-dot', properties: { 'text-emphasis-style': 'dot' } })
      rules.push({ pattern: 'text-emphasis-circle', properties: { 'text-emphasis-style': 'circle' } })
      rules.push({ pattern: 'text-emphasis-double-circle', properties: { 'text-emphasis-style': 'double-circle' } })
      rules.push({ pattern: 'text-emphasis-triangle', properties: { 'text-emphasis-style': 'triangle' } })
      rules.push({ pattern: 'text-emphasis-sesame', properties: { 'text-emphasis-style': 'sesame' } })
      rules.push({ pattern: 'text-emphasis-filled-dot', properties: { 'text-emphasis-style': 'filled dot' } })
      rules.push({ pattern: 'text-emphasis-open-dot', properties: { 'text-emphasis-style': 'open dot' } })
      rules.push({ pattern: 'text-emphasis-filled-circle', properties: { 'text-emphasis-style': 'filled circle' } })
      rules.push({ pattern: 'text-emphasis-open-circle', properties: { 'text-emphasis-style': 'open circle' } })
      rules.push({ pattern: 'text-emphasis-filled-triangle', properties: { 'text-emphasis-style': 'filled triangle' } })
      rules.push({ pattern: 'text-emphasis-open-triangle', properties: { 'text-emphasis-style': 'open triangle' } })
      rules.push({ pattern: 'text-emphasis-filled-sesame', properties: { 'text-emphasis-style': 'filled sesame' } })
      rules.push({ pattern: 'text-emphasis-open-sesame', properties: { 'text-emphasis-style': 'open sesame' } })

      // Arbitrary text emphasis
      rules.push({
        pattern: /^text-emphasis-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'text-emphasis-style': `"${v}"` } }
        },
      })

      // Text emphasis color
      rules.push({ pattern: 'text-emphasis-current', properties: { 'text-emphasis-color': 'currentColor' } })
      rules.push({ pattern: 'text-emphasis-transparent', properties: { 'text-emphasis-color': 'transparent' } })

      rules.push({
        pattern: /^text-emphasis-color-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'text-emphasis-color': v } }
        },
      })

      // Text emphasis position
      rules.push({ pattern: 'text-emphasis-position-over', properties: { 'text-emphasis-position': 'over right' } })
      rules.push({ pattern: 'text-emphasis-position-under', properties: { 'text-emphasis-position': 'under right' } })
      rules.push({ pattern: 'text-emphasis-position-over-left', properties: { 'text-emphasis-position': 'over left' } })
      rules.push({ pattern: 'text-emphasis-position-under-left', properties: { 'text-emphasis-position': 'under left' } })

      // ========================================
      // OUTLINE EXTENDED
      // ========================================

      // Outline color
      rules.push({ pattern: 'outline-current', properties: { 'outline-color': 'currentColor' } })
      rules.push({ pattern: 'outline-transparent', properties: { 'outline-color': 'transparent' } })

      rules.push({
        pattern: /^outline-color-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'outline-color': v } }
        },
      })

      // ========================================
      // DIVIDE REVERSE (For flex-reverse layouts)
      // ========================================

      rules.push({
        pattern: 'divide-x-reverse',
        selector: (s) => `${s} > * + *`,
        properties: {
          '--coral-divide-x-reverse': '1',
          'border-right-width': 'calc(1px * var(--coral-divide-x-reverse))',
          'border-left-width': 'calc(1px * calc(1 - var(--coral-divide-x-reverse)))',
        },
      })
      rules.push({
        pattern: 'divide-y-reverse',
        selector: (s) => `${s} > * + *`,
        properties: {
          '--coral-divide-y-reverse': '1',
          'border-bottom-width': 'calc(1px * var(--coral-divide-y-reverse))',
          'border-top-width': 'calc(1px * calc(1 - var(--coral-divide-y-reverse)))',
        },
      })

      // ========================================
      // CAPTION SIDE (Table)
      // ========================================

      rules.push({ pattern: 'caption-top', properties: { 'caption-side': 'top' } })
      rules.push({ pattern: 'caption-bottom', properties: { 'caption-side': 'bottom' } })

      // ========================================
      // TABLE LAYOUT
      // ========================================

      rules.push({ pattern: 'table-auto', properties: { 'table-layout': 'auto' } })
      rules.push({ pattern: 'table-fixed', properties: { 'table-layout': 'fixed' } })

      // ========================================
      // EMPTY CELLS (Table)
      // ========================================

      rules.push({ pattern: 'empty-cells-show', properties: { 'empty-cells': 'show' } })
      rules.push({ pattern: 'empty-cells-hide', properties: { 'empty-cells': 'hide' } })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default bordersPlugin
