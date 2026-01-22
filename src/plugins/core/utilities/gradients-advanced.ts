/**
 * Advanced Gradients Utilities Plugin
 *
 * Mesh gradients, noise textures, conic gradients, and complex gradient patterns.
 * Goes beyond Tailwind 4.1's gradient capabilities.
 *
 * @module plugins/core/utilities/gradients-advanced
 */

import type { Plugin, Rule, PluginContext } from '../../../types'

/**
 * Advanced gradients plugin
 *
 * @example
 * ```html
 * <!-- Mesh gradient -->
 * <div class="bg-mesh-gradient-md">
 *   Mesh gradient background
 * </div>
 *
 * <!-- Noise texture -->
 * <div class="bg-gradient-noise-light">
 *   Subtle noise overlay
 * </div>
 *
 * <!-- Conic gradient -->
 * <div class="bg-conic-gradient-tri">
 *   Triangular conic gradient
 * </div>
 * ```
 */
export function advancedGradientsPlugin(): Plugin {
  return {
    name: 'gradients-advanced',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // ========================================
      // MESH GRADIENTS
      // ========================================

      // Mesh gradient sizes
      const meshGradients = [
        { name: 'sm', size: '400% 400%', colors: 'from #4f46e5 via #ec4899 to #8b5cf6' },
        { name: 'md', size: '200% 200%', colors: 'from #3b82f6 via #8b5cf6 to #ec4899' },
        { name: 'lg', size: '150% 150%', colors: 'from #06b6d4 via #3b82f6 to #8b5cf6' },
        { name: 'xl', size: '100% 100%', colors: 'from #10b981 via #3b82f6 to #ec4899' },
      ]

      for (const mesh of meshGradients) {
        rules.push({
          pattern: `bg-mesh-gradient-${mesh.name}`,
          properties: {
            'background': `radial-gradient(at 0% 0%, ${mesh.colors}), radial-gradient(at 100% 100%, ${mesh.colors})`,
            'background-size': mesh.size,
          },
        })
      }

      // Animated mesh gradient
      rules.push({
        pattern: 'bg-mesh-gradient-animated',
        properties: {
          'background':
            'radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), ' +
            'radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), ' +
            'radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)',
          'background-size': '200% 200%',
          'animation': 'mesh-gradient 15s ease infinite',
        },
      })

      // ========================================
      // NOISE TEXTURES
      // ========================================

      // Light noise (subtle)
      rules.push({
        pattern: 'bg-gradient-noise-light',
        properties: {
          'background-image': `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
        },
      })

      // Medium noise
      rules.push({
        pattern: 'bg-gradient-noise-medium',
        properties: {
          'background-image': `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`,
        },
      })

      // Heavy noise (dark)
      rules.push({
        pattern: 'bg-gradient-noise-heavy',
        properties: {
          'background-image': `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")`,
        },
      })

      // Grain noise (film-like)
      rules.push({
        pattern: 'bg-gradient-noise-grain',
        properties: {
          'background-image': `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
          'background-size': '200px 200px',
        },
      })

      // ========================================
      // CONIC GRADIENTS (Enhanced)
      // ========================================

      // Conic gradient from center
      rules.push({
        pattern: 'bg-conic-gradient',
        properties: {
          'background': 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
        },
      })

      // Conic gradient - 2 colors
      rules.push({
        pattern: 'bg-conic-gradient-2',
        properties: {
          'background': 'conic-gradient(from 0deg at 50% 50%, #3b82f6 0deg, #8b5cf6 180deg, #3b82f6 360deg)',
        },
      })

      // Conic gradient - 3 colors (triangular)
      rules.push({
        pattern: 'bg-conic-gradient-tri',
        properties: {
          'background': 'conic-gradient(from 0deg at 50% 50%, #3b82f6 0deg, #8b5cf6 120deg, #ec4899 240deg, #3b82f6 360deg)',
        },
      })

      // Conic gradient - 4 colors (square)
      rules.push({
        pattern: 'bg-conic-gradient-square',
        properties: {
          'background': 'conic-gradient(from 45deg at 50% 50%, #3b82f6 0deg, #ec4899 90deg, #8b5cf6 180deg, #10b981 270deg, #3b82f6 360deg)',
        },
      })

      // Conic gradient - from position
      rules.push({
        pattern: 'bg-conic-gradient-from-top',
        properties: {
          'background': 'conic-gradient(from 0deg at 50% 0%, #3b82f6, #8b5cf6, #ec4899)',
        },
      })
      rules.push({
        pattern: 'bg-conic-gradient-from-bottom',
        properties: {
          'background': 'conic-gradient(from 180deg at 50% 100%, #3b82f6, #8b5cf6, #ec4899)',
        },
      })

      // ========================================
      // RADIAL GRADIENTS (Enhanced)
      // ========================================

      // Radial gradient - elliptical
      rules.push({
        pattern: 'bg-radial-gradient-ellipse',
        properties: {
          'background': 'radial-gradient(ellipse at center, #3b82f6 0%, #1e40af 100%)',
        },
      })

      // Radial gradient - circle
      rules.push({
        pattern: 'bg-radial-gradient-circle',
        properties: {
          'background': 'radial-gradient(circle at center, #3b82f6 0%, transparent 70%)',
        },
      })

      // Radial gradient - off-center
      rules.push({
        pattern: 'bg-radial-gradient-top-right',
        properties: {
          'background': 'radial-gradient(circle at top right, #3b82f6 0%, transparent 50%)',
        },
      })

      // Radial gradient - multiple stops
      rules.push({
        pattern: 'bg-radial-gradient-multi',
        properties: {
          'background': 'radial-gradient(circle at center, #3b82f6 0%, #8b5cf6 25%, #ec4899 50%, transparent 75%)',
        },
      })

      // ========================================
      // GRADIENT OVERLAYS
      // ========================================

      // Gradient overlay - top to bottom
      rules.push({
        pattern: 'bg-gradient-overlay',
        properties: {
          'background': 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
        },
      })

      // Gradient overlay - vignette
      rules.push({
        pattern: 'bg-gradient-vignette',
        properties: {
          'background': 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.5) 100%)',
        },
      })

      // Gradient overlay - shimmer
      rules.push({
        pattern: 'bg-gradient-shimmer',
        properties: {
          'background':
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
          'background-size': '200% 100%',
        },
      })

      // ========================================
      // GRADIENT BLENDS
      // ========================================

      // Screen blend gradient
      rules.push({
        pattern: 'bg-gradient-blend-screen',
        properties: {
          'background':
            'linear-gradient(to right, #3b82f6), linear-gradient(to right, #ec4899)',
          'background-blend-mode': 'screen',
        },
      })

      // Multiply blend gradient
      rules.push({
        pattern: 'bg-gradient-blend-multiply',
        properties: {
          'background':
            'linear-gradient(to right, #3b82f6), linear-gradient(to right, #ec4899)',
          'background-blend-mode': 'multiply',
        },
      })

      // Overlay blend gradient
      rules.push({
        pattern: 'bg-gradient-blend-overlay',
        properties: {
          'background':
            'linear-gradient(to right, #3b82f6), linear-gradient(to right, #ec4899)',
          'background-blend-mode': 'overlay',
        },
      })

      // ========================================
      // GRADIENT PATTERNS
      // ========================================

      // Checkerboard gradient
      rules.push({
        pattern: 'bg-gradient-checkerboard',
        properties: {
          'background-image':
            'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
          'background-size': '20px 20px',
          'background-position': '0 0, 0 10px, 10px -10px, -10px 0px',
        },
      })

      // Stripe gradient
      rules.push({
        pattern: 'bg-gradient-stripes',
        properties: {
          'background-image': 'linear-gradient(45deg, #3b82f6 25%, transparent 25%, transparent 75%, #3b82f6 75%)',
          'background-size': '20px 20px',
        },
      })

      // Dotted gradient
      rules.push({
        pattern: 'bg-gradient-dots',
        properties: {
          'background-image':
            'radial-gradient(#3b82f6 1px, transparent 1px), radial-gradient(#3b82f6 1px, transparent 1px)',
          'background-size': '20px 20px',
          'background-position': '0 0, 10px 10px',
        },
      })

      // Polka dot gradient
      rules.push({
        pattern: 'bg-gradient-polka',
        properties: {
          'background-image': 'radial-gradient(#ec4899 20%, transparent 20%)',
          'background-size': '20px 20px',
        },
      })

      // ========================================
      // AURORA GRADIENTS
      // ========================================

      // Aurora gradient - smooth
      rules.push({
        pattern: 'bg-aurora-gradient',
        properties: {
          'background':
            'linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(168, 85, 247, 0.4) 50%, rgba(236, 72, 153, 0.4) 100%)',
          'filter': 'blur(40px)',
        },
      })

      // Aurora gradient - animated
      rules.push({
        pattern: 'bg-aurora-gradient-animated',
        properties: {
          'background':
            'linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(168, 85, 247, 0.4) 50%, rgba(236, 72, 153, 0.4) 100%)',
          'filter': 'blur(40px)',
          'animation': 'aurora 10s ease infinite',
        },
      })

      // ========================================
      // METALLIC GRADIENTS
      // ========================================

      // Gold gradient
      rules.push({
        pattern: 'bg-gradient-gold',
        properties: {
          'background': 'linear-gradient(135deg, #fcd34d 0%, #f59e0b 50%, #d97706 100%)',
        },
      })

      // Silver gradient
      rules.push({
        pattern: 'bg-gradient-silver',
        properties: {
          'background': 'linear-gradient(135deg, #e5e7eb 0%, #9ca3af 50%, #6b7280 100%)',
        },
      })

      // Bronze gradient
      rules.push({
        pattern: 'bg-gradient-bronze',
        properties: {
          'background': 'linear-gradient(135deg, #d97706 0%, #b45309 50%, #92400e 100%)',
        },
      })

      // ========================================
      // GLASSMORPHISM GRADIENTS
      // ========================================

      // Glass gradient
      rules.push({
        pattern: 'bg-glass-gradient',
        properties: {
          'background': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
        },
      })

      // Frosted glass gradient
      rules.push({
        pattern: 'bg-glass-frosted',
        properties: {
          'background':
            'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)',
          'backdrop-filter': 'blur(20px) saturate(180%)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
        },
      })

      // ========================================
      // ARBITRARY GRADIENTS
      // ========================================

      // Arbitrary conic gradient
      rules.push({
        pattern: /^bg-conic-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { background: `conic-gradient(${value.replace(/_/g, ' ')})` } }
        },
      })

      // Arbitrary radial gradient
      rules.push({
        pattern: /^bg-radial-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return { properties: { background: `radial-gradient(${value.replace(/_/g, ' ')})` } }
        },
      })

      // Arbitrary gradient overlay
      rules.push({
        pattern: /^bg-overlay-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return {
            properties: {
              'background': `linear-gradient(${value.replace(/_/g, ' ')})`,
              'background-blend-mode': 'overlay',
            }
          }
        },
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    }
  }
}

export default advancedGradientsPlugin
