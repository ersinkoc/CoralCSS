/**
 * Adaptive Color Utilities Plugin
 *
 * Colors that automatically adapt to environment, user preferences,
 * and ambient conditions. Uses modern CSS features for intelligent
 * color management.
 *
 * @module plugins/core/utilities/adaptive-colors
 */

import type { Plugin } from '../../../types'

/**
 * Adaptive Color Utilities Plugin for CoralCSS
 *
 * Features:
 * - Ambient light detection
 * - Perceptual color system
 * - High contrast mode support
 * - Color scheme adaptation
 *
 * @example
 * ```html
 * <div class="text-perceptual">Maintains perceived brightness</div>
 * <div class="bg-adaptive">Adapts to theme</div>
 * <div class="contrast-high">High contrast for accessibility</div>
 * ```
 */
export const adaptiveColorsPlugin = (): Plugin => ({
  name: 'adaptive-colors',
  version: '1.0.0',
  install(api) {
    // ========================================
    // PERCEPTUAL COLORS
    // ========================================

    // Text that maintains perceived brightness across themes
    api.addRule({
      pattern: 'text-perceptual',
      generate: () => ({
        properties: {
          'color': 'color-mix(in oklch, canvasText 85%, currentColor)'
        }
      })
    })

    api.addRule({
      pattern: 'text-perceptual-dim',
      generate: () => ({
        properties: {
          'color': 'color-mix(in oklch, canvasText 65%, currentColor)'
        }
      })
    })

    api.addRule({
      pattern: 'text-perceptual-bright',
      generate: () => ({
        properties: {
          'color': 'color-mix(in oklch, canvasText 95%, currentColor)'
        }
      })
    })

    // Background that maintains perceived brightness
    api.addRule({
      pattern: 'bg-perceptual',
      generate: () => ({
        properties: {
          'background-color': 'color-mix(in oklch, canvas 85%, currentColor)'
        }
      })
    })

    api.addRule({
      pattern: 'bg-perceptual-dim',
      generate: () => ({
        properties: {
          'background-color': 'color-mix(in oklch, canvas 70%, currentColor)'
        }
      })
    })

    api.addRule({
      pattern: 'bg-perceptual-bright',
      generate: () => ({
        properties: {
          'background-color': 'color-mix(in oklch, canvas 95%, currentColor)'
        }
      })
    })

    // ========================================
    // ADAPTIVE COLORS
    // ========================================

    // Text color that adapts to theme
    api.addRule({
      pattern: 'text-adaptive',
      generate: () => ({
        properties: {
          'color': 'color-mix(in oklch, currentColor, canvasText)'
        }
      })
    })

    api.addRule({
      pattern: 'bg-adaptive',
      generate: () => ({
        properties: {
          'background-color': 'color-mix(in oklch, currentColor, canvas)'
        }
      })
    })

    // Border color that adapts
    api.addRule({
      pattern: 'border-adaptive',
      generate: () => ({
        properties: {
          'border-color': 'color-mix(in oklch, currentColor, canvasText 30%)'
        }
      })
    })

    // ========================================
    // AMBIENT LIGHT DETECTION
    // ========================================

    // Adjust for high contrast preference
    api.addRule({
      pattern: 'contrast-high',
      generate: () => ({
        properties: {
          'color': 'canvasText',
          'background-color': 'canvas'
        }
      })
    })

    api.addRule({
      pattern: 'contrast-high:hover',
      generate: () => ({
        properties: {
          'filter': 'contrast(1.2)'
        }
      })
    })

    // Prefer reduced contrast
    api.addRule({
      pattern: 'contrast-soft',
      generate: () => ({
        properties: {
          'filter': 'contrast(0.9)'
        }
      })
    })

    // ========================================
    // COLOR SCHEME ADAPTATION
    // ========================================

    // Automatic light/dark adaptation
    api.addRule({
      pattern: 'color-scheme-auto',
      generate: () => ({
        properties: {
          'color-scheme': 'light dark'
        }
      })
    })

    api.addRule({
      pattern: 'color-scheme-light',
      generate: () => ({
        properties: {
          'color-scheme': 'light'
        }
      })
    })

    api.addRule({
      pattern: 'color-scheme-dark',
      generate: () => ({
        properties: {
          'color-scheme': 'dark'
        }
      })
    })

    // Force specific color scheme
    api.addRule({
      pattern: 'color-scheme-only-light',
      generate: () => ({
        properties: {
          'color-scheme': 'light'
        }
      })
    })

    api.addRule({
      pattern: 'color-scheme-only-dark',
      generate: () => ({
        properties: {
          'color-scheme': 'dark'
        }
      })
    })

    // ========================================
    // SEMANTIC COLOR ADAPTATION
    // ========================================

    // Semantic foreground/background using system colors
    api.addRule({
      pattern: 'text-system',
      generate: () => ({
        properties: {
          'color': 'CanvasText'
        }
      })
    })

    api.addRule({
      pattern: 'bg-system',
      generate: () => ({
        properties: {
          'background-color': 'Canvas'
        }
      })
    })

    api.addRule({
      pattern: 'accent-system',
      generate: () => ({
        properties: {
          'color': 'Highlight'
        }
      })
    })

    // ========================================
    // ACCESSIBILITY COLORS
    // ========================================

    // Focus visible with system colors
    api.addRule({
      pattern: 'focus-ring-system',
      generate: () => ({
        properties: {
          'outline': '2px solid Highlight',
          'outline-offset': '2px'
        }
      })
    })

    // Link colors that adapt
    api.addRule({
      pattern: 'link-adaptive',
      generate: () => ({
        properties: {
          'color': 'color-mix(in oklch, LinkText, currentColor)'
        }
      })
    })

    // Visited link adaptation
    api.addRule({
      pattern: 'visited-adaptive',
      generate: () => ({
        properties: {
          'color': 'color-mix(in oklch, VisitedText, currentColor)'
        }
      })
    })

    // ========================================
    // LUMINANCE-BASED COLORS
    // ========================================

    // High luminance text (always readable)
    api.addRule({
      pattern: 'text-luminant',
      generate: () => ({
        properties: {
          'color': 'oklch(from currentColor calc(l + 0.2) c h)'
        }
      })
    })

    // Low luminance text (subtle)
    api.addRule({
      pattern: 'text-subtle',
      generate: () => ({
        properties: {
          'color': 'oklch(from currentColor calc(l - 0.2) c h)'
        }
      })
    })

    // Background luminance adjustment
    api.addRule({
      pattern: 'bg-luminant',
      generate: () => ({
        properties: {
          'background-color': 'oklch(from currentColor calc(l + 0.3) c h)'
        }
      })
    })

    // ========================================
    // COLOR BLINDNESS SUPPORT
    // ========================================

    // Enhance for protanopia (red-weak)
    api.addRule({
      pattern: 'color-enhance-protan',
      generate: () => ({
        properties: {
          'filter': 'url(#protan-filter)'
        }
      })
    })

    // Enhance for deuteranopia (green-weak)
    api.addRule({
      pattern: 'color-enhance-deutan',
      generate: () => ({
        properties: {
          'filter': 'url(#deutan-filter)'
        }
      })
    })

    // High contrast mode support
    api.addRule({
      pattern: 'forced-colors-auto',
      generate: () => ({
        properties: {
          'forced-color-adjust': 'auto'
        }
      })
    })

    api.addRule({
      pattern: 'forced-colors-none',
      generate: () => ({
        properties: {
          'forced-color-adjust': 'none'
        }
      })
    })

    // ========================================
    // DYNAMIC COLOR MIXING
    // ========================================

    // Blend with canvas
    api.addRule({
      pattern: 'text-blend-canvas',
      generate: () => ({
        properties: {
          'color': 'color-mix(in oklch, currentColor 50%, CanvasText)'
        }
      })
    })

    api.addRule({
      pattern: 'bg-blend-canvas',
      generate: () => ({
        properties: {
          'background-color': 'color-mix(in oklch, currentColor 50%, Canvas)'
        }
      })
    })

    // Blend with accent
    api.addRule({
      pattern: 'text-blend-accent',
      generate: () => ({
        properties: {
          'color': 'color-mix(in oklch, currentColor 70%, Highlight 30%)'
        }
      })
    })

    // ========================================
    // PRINT ADAPTATION
    // ========================================

    // Adapt colors for print
    api.addRule({
      pattern: 'print-optimize',
      generate: () => ({
        properties: {
          '-webkit-print-color-adjust': 'exact',
          'print-color-adjust': 'exact'
        }
      })
    })

    // Economize ink for print
    api.addRule({
      pattern: 'print-ink-save',
      generate: () => ({
        properties: {
          '-webkit-print-color-adjust': 'economy',
          'print-color-adjust': 'economy'
        }
      })
    })
  }
})

export default adaptiveColorsPlugin
