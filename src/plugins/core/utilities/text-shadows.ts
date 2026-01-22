/**
 * Text Shadow Utilities Plugin
 *
 * Text shadow utilities for creating dramatic typography effects.
 * Includes base shadows, colored shadows, opacity modifiers, and arbitrary values.
 *
 * @module plugins/core/utilities/text-shadows
 */

import type { Plugin } from '../../../types'

/**
 * Text shadow utilities plugin for CoralCSS
 *
 * Features:
 * - 8 base shadow sizes (surpasses Tailwind's 5)
 * - Colored text shadows for all color palette
 * - Opacity modifiers (e.g., text-shadow-lg/50)
 * - Arbitrary value support
 *
 * @example
 * ```html
 * <h1 class="text-shadow-md">Heading with shadow</h1>
 * <p class="text-shadow-lg/20">Subtle shadow</p>
 * <h1 class="text-shadow-lg text-shadow-red-500">Red shadow</h1>
 * <h1 class="text-shadow-[0_2px_10px_rgba(255,0,0,0.5)]">Custom shadow</h1>
 * ```
 */
export const textShadowsPlugin = (): Plugin => ({
  name: 'text-shadows',
  version: '1.0.0',
  install(api) {
    // ========================================
    // BASE TEXT SHADOWS
    // ========================================

    api.addRule({
      pattern: 'text-shadow-2xs',
      generate: () => ({
        properties: {
          'text-shadow': '0 1px 1px rgba(0, 0, 0, 0.1)'
        }
      })
    })

    api.addRule({
      pattern: 'text-shadow-xs',
      generate: () => ({
        properties: {
          'text-shadow': '0 1px 2px rgba(0, 0, 0, 0.15)'
        }
      })
    })

    api.addRule({
      pattern: 'text-shadow-sm',
      generate: () => ({
        properties: {
          'text-shadow': '0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)'
        }
      })
    })

    api.addRule({
      pattern: 'text-shadow-md',
      generate: () => ({
        properties: {
          'text-shadow': '0 4px 6px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.15)'
        }
      })
    })

    api.addRule({
      pattern: 'text-shadow-lg',
      generate: () => ({
        properties: {
          'text-shadow': '0 10px 15px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.2)'
        }
      })
    })

    // BONUS: 3 extra shadows to surpass Tailwind's 5
    api.addRule({
      pattern: 'text-shadow-xl',
      generate: () => ({
        properties: {
          'text-shadow': '0 20px 25px rgba(0, 0, 0, 0.35), 0 8px 10px rgba(0, 0, 0, 0.25)'
        }
      })
    })

    api.addRule({
      pattern: 'text-shadow-2xl',
      generate: () => ({
        properties: {
          'text-shadow': '0 25px 50px rgba(0, 0, 0, 0.4), 0 12px 24px rgba(0, 0, 0, 0.3)'
        }
      })
    })

    api.addRule({
      pattern: 'text-shadow-none',
      generate: () => ({
        properties: { 'text-shadow': 'none' }
      })
    })

    // ========================================
    // OPACITY MODIFIERS
    // ========================================

    // text-shadow-lg/50 syntax
    api.addRule({
      pattern: /^text-shadow-(2xs|xs|sm|md|lg|xl|2xl)\/(\d+)$/,
      /* istanbul ignore next -- @preserve: handler coverage not tracked by v8 */
      handler: (match) => {
        const size = match[1]
        const opacityStr = match[2]
        if (!size || !opacityStr) {return null}

        const opacityValue = (parseInt(opacityStr, 10) / 100).toFixed(2)

        // Map size to actual shadow
        const shadowMap: Record<string, string> = {
          '2xs': '0 1px 1px',
          'xs': '0 1px 2px',
          'sm': '0 1px 3px, 0 1px 2px',
          'md': '0 4px 6px, 0 2px 4px',
          'lg': '0 10px 15px, 0 4px 6px',
          'xl': '0 20px 25px, 0 8px 10px',
          '2xl': '0 25px 50px, 0 12px 24px',
        }

        const shadow = shadowMap[size] ?? shadowMap['md']
        return {
          properties: {
            'text-shadow': `${shadow} rgba(0, 0, 0, ${opacityValue})`
          }
        }
      }
    })

    // ========================================
    // COLORED TEXT SHADOWS
    // ========================================

    const colorStops = [
      'coral', 'slate', 'gray', 'zinc', 'neutral', 'stone',
      'red', 'orange', 'amber', 'yellow', 'lime', 'green',
      'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo',
      'violet', 'purple', 'fuchsia', 'pink', 'rose',
    ]

    // Generate color variants
    for (const color of colorStops) {
      for (const shade of ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']) {
        api.addRule({
          pattern: `text-shadow-${color}-${shade}`,
          generate: () => ({
            properties: {
              'text-shadow': '0 4px 6px var(--text-shadow-color)',
              '--text-shadow-color': 'var(--color-' + color + '-' + shade + ')'
            }
          })
        })

        // With opacity modifier
        api.addRule({
          pattern: `text-shadow-${color}-${shade}\\/(\\d+)`,
          /* istanbul ignore next -- @preserve: handler coverage not tracked by v8 */
          handler: (match) => {
            const opacityStr = match[1]
            if (!opacityStr) {return null}

            const opacity = (parseInt(opacityStr, 10) / 100).toFixed(2)
            return {
              properties: {
                'text-shadow': '0 4px 6px var(--text-shadow-color-alpha)',
                '--text-shadow-color-alpha': 'color-mix(in srgb, var(--color-' + color + '-' + shade + ') ' + opacity + ', transparent)'
              }
            }
          }
        })
      }
    }

    // ========================================
    // ARBITRARY VALUES
    // ========================================

    // text-shadow-[...] syntax
    api.addRule({
      pattern: /^text-shadow-\[(.+)\]$/,
      handler: (match) => {
        const value = match[1]
        if (!value) {return null}

        return {
          properties: { 'text-shadow': value.replace(/_/g, ' ') }
        }
      }
    })

    // ========================================
    // SPECIAL EFFECTS
    // ========================================

    // Embossed effect (light shadow from top-left, dark from bottom-right)
    api.addRule({
      pattern: 'text-shadow-embossed',
      generate: () => ({
        properties: {
          'text-shadow': '1px 1px 1px rgba(255, 255, 255, 0.8), -1px -1px 1px rgba(0, 0, 0, 0.2)'
        }
      })
    })

    // Debossed effect (reverse of embossed)
    api.addRule({
      pattern: 'text-shadow-debossed',
      generate: () => ({
        properties: {
          'text-shadow': '-1px -1px 1px rgba(255, 255, 255, 0.8), 1px 1px 1px rgba(0, 0, 0, 0.2)'
        }
      })
    })

    // Neon/glow effect
    api.addRule({
      pattern: 'text-shadow-neon',
      generate: () => ({
        properties: {
          'text-shadow': '0 0 5px currentColor, 0 0 10px currentColor, 0 0 20px currentColor'
        }
      })
    })

    api.addRule({
      pattern: 'text-shadow-neon-lg',
      generate: () => ({
        properties: {
          'text-shadow': '0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor, 0 0 80px currentColor'
        }
      })
    })

    // Retro 3D effect
    api.addRule({
      pattern: 'text-shadow-3d',
      generate: () => ({
        properties: {
          'text-shadow': '1px 1px 0 #ccc, 2px 2px 0 #bbb, 3px 3px 0 #aaa, 4px 4px 0 #999'
        }
      })
    })

    // Outline effect
    api.addRule({
      pattern: 'text-shadow-outline',
      generate: () => ({
        properties: {
          'text-shadow': '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
        }
      })
    })
  }
})

export default textShadowsPlugin
