/**
 * Performance Utilities Plugin
 *
 * Performance optimization utilities including will-change,
 * content-visibility, contain, and rendering hints.
 * @module plugins/core/utilities/performance
 */

import type { Plugin, Rule, PluginContext } from '../../../types'

/**
 * Performance utilities plugin
 */
export function performancePlugin(): Plugin {
  return {
    name: 'performance',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // ========================================
      // WILL-CHANGE
      // ========================================

      rules.push({ pattern: 'will-change-auto', properties: { 'will-change': 'auto' } })
      rules.push({ pattern: 'will-change-scroll', properties: { 'will-change': 'scroll-position' } })
      rules.push({ pattern: 'will-change-contents', properties: { 'will-change': 'contents' } })
      rules.push({ pattern: 'will-change-transform', properties: { 'will-change': 'transform' } })
      rules.push({ pattern: 'will-change-opacity', properties: { 'will-change': 'opacity' } })
      rules.push({ pattern: 'will-change-filter', properties: { 'will-change': 'filter' } })
      rules.push({ pattern: 'will-change-backdrop', properties: { 'will-change': 'backdrop-filter' } })
      rules.push({ pattern: 'will-change-left', properties: { 'will-change': 'left' } })
      rules.push({ pattern: 'will-change-top', properties: { 'will-change': 'top' } })
      rules.push({ pattern: 'will-change-width', properties: { 'will-change': 'width' } })
      rules.push({ pattern: 'will-change-height', properties: { 'will-change': 'height' } })

      // Common combinations
      rules.push({ pattern: 'will-change-all', properties: { 'will-change': 'transform, opacity' } })
      rules.push({ pattern: 'will-change-animation', properties: { 'will-change': 'transform, opacity, filter' } })
      rules.push({ pattern: 'will-change-position', properties: { 'will-change': 'top, left, right, bottom' } })
      rules.push({ pattern: 'will-change-size', properties: { 'will-change': 'width, height' } })

      rules.push({
        pattern: /^will-change-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'will-change': v.replace(/_/g, ' ') } }
        },
      })

      // ========================================
      // BACKFACE VISIBILITY
      // ========================================

      rules.push({ pattern: 'backface-visible', properties: { 'backface-visibility': 'visible' } })
      rules.push({ pattern: 'backface-hidden', properties: { 'backface-visibility': 'hidden' } })

      // ========================================
      // CONTENT VISIBILITY (Paint Containment)
      // ========================================

      rules.push({ pattern: 'content-visibility-auto', properties: { 'content-visibility': 'auto' } })
      rules.push({ pattern: 'content-visibility-hidden', properties: { 'content-visibility': 'hidden' } })
      rules.push({ pattern: 'content-visibility-visible', properties: { 'content-visibility': 'visible' } })

      // ========================================
      // CONTAIN INTRINSIC SIZE
      // ========================================

      rules.push({ pattern: 'contain-intrinsic-none', properties: { 'contain-intrinsic-size': 'none' } })
      rules.push({ pattern: 'contain-intrinsic-auto', properties: { 'contain-intrinsic-size': 'auto' } })
      rules.push({ pattern: 'contain-intrinsic-xs', properties: { 'contain-intrinsic-size': 'auto 100px' } })
      rules.push({ pattern: 'contain-intrinsic-sm', properties: { 'contain-intrinsic-size': 'auto 200px' } })
      rules.push({ pattern: 'contain-intrinsic-md', properties: { 'contain-intrinsic-size': 'auto 300px' } })
      rules.push({ pattern: 'contain-intrinsic-lg', properties: { 'contain-intrinsic-size': 'auto 500px' } })
      rules.push({ pattern: 'contain-intrinsic-xl', properties: { 'contain-intrinsic-size': 'auto 800px' } })
      rules.push({ pattern: 'contain-intrinsic-2xl', properties: { 'contain-intrinsic-size': 'auto 1200px' } })

      rules.push({
        pattern: /^contain-intrinsic-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'contain-intrinsic-size': v.replace(/_/g, ' ') } }
        },
      })

      // Contain intrinsic width
      rules.push({ pattern: 'contain-intrinsic-w-none', properties: { 'contain-intrinsic-width': 'none' } })
      rules.push({ pattern: 'contain-intrinsic-w-auto', properties: { 'contain-intrinsic-width': 'auto' } })

      rules.push({
        pattern: /^contain-intrinsic-w-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'contain-intrinsic-width': v } }
        },
      })

      // Contain intrinsic height
      rules.push({ pattern: 'contain-intrinsic-h-none', properties: { 'contain-intrinsic-height': 'none' } })
      rules.push({ pattern: 'contain-intrinsic-h-auto', properties: { 'contain-intrinsic-height': 'auto' } })

      rules.push({
        pattern: /^contain-intrinsic-h-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'contain-intrinsic-height': v } }
        },
      })

      // ========================================
      // CSS CONTAIN (Containment)
      // ========================================

      rules.push({ pattern: 'contain-none', properties: { contain: 'none' } })
      rules.push({ pattern: 'contain-strict', properties: { contain: 'strict' } })
      rules.push({ pattern: 'contain-content', properties: { contain: 'content' } })
      rules.push({ pattern: 'contain-size', properties: { contain: 'size' } })
      rules.push({ pattern: 'contain-inline-size', properties: { contain: 'inline-size' } })
      rules.push({ pattern: 'contain-layout', properties: { contain: 'layout' } })
      rules.push({ pattern: 'contain-style', properties: { contain: 'style' } })
      rules.push({ pattern: 'contain-paint', properties: { contain: 'paint' } })

      // Common combinations
      rules.push({ pattern: 'contain-layout-paint', properties: { contain: 'layout paint' } })
      rules.push({ pattern: 'contain-size-layout', properties: { contain: 'size layout' } })
      rules.push({ pattern: 'contain-size-layout-paint', properties: { contain: 'size layout paint' } })

      rules.push({
        pattern: /^contain-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { contain: v.replace(/_/g, ' ') } }
        },
      })

      // ========================================
      // ISOLATION
      // ========================================

      rules.push({ pattern: 'isolate', properties: { isolation: 'isolate' } })
      rules.push({ pattern: 'isolation-auto', properties: { isolation: 'auto' } })

      // ========================================
      // PAINT ORDER (SVG/Text optimization)
      // ========================================

      rules.push({ pattern: 'paint-order-normal', properties: { 'paint-order': 'normal' } })
      rules.push({ pattern: 'paint-order-stroke', properties: { 'paint-order': 'stroke' } })
      rules.push({ pattern: 'paint-order-fill', properties: { 'paint-order': 'fill' } })
      rules.push({ pattern: 'paint-order-markers', properties: { 'paint-order': 'markers' } })
      rules.push({ pattern: 'paint-order-stroke-fill', properties: { 'paint-order': 'stroke fill' } })
      rules.push({ pattern: 'paint-order-fill-stroke', properties: { 'paint-order': 'fill stroke' } })

      // ========================================
      // IMAGE RENDERING
      // ========================================

      rules.push({ pattern: 'image-render-auto', properties: { 'image-rendering': 'auto' } })
      rules.push({ pattern: 'image-render-crisp', properties: { 'image-rendering': 'crisp-edges' } })
      rules.push({ pattern: 'image-render-pixelated', properties: { 'image-rendering': 'pixelated' } })
      rules.push({ pattern: 'image-render-smooth', properties: { 'image-rendering': 'smooth' } })
      rules.push({ pattern: 'image-render-high-quality', properties: { 'image-rendering': 'high-quality' } })

      // ========================================
      // TEXT RENDERING
      // ========================================

      rules.push({ pattern: 'text-render-auto', properties: { 'text-rendering': 'auto' } })
      rules.push({ pattern: 'text-render-speed', properties: { 'text-rendering': 'optimizeSpeed' } })
      rules.push({ pattern: 'text-render-legibility', properties: { 'text-rendering': 'optimizeLegibility' } })
      rules.push({ pattern: 'text-render-precision', properties: { 'text-rendering': 'geometricPrecision' } })

      // ========================================
      // SHAPE RENDERING (SVG)
      // ========================================

      rules.push({ pattern: 'shape-render-auto', properties: { 'shape-rendering': 'auto' } })
      rules.push({ pattern: 'shape-render-speed', properties: { 'shape-rendering': 'optimizeSpeed' } })
      rules.push({ pattern: 'shape-render-crisp', properties: { 'shape-rendering': 'crispEdges' } })
      rules.push({ pattern: 'shape-render-precision', properties: { 'shape-rendering': 'geometricPrecision' } })

      // ========================================
      // COLOR RENDERING
      // ========================================

      rules.push({ pattern: 'color-render-auto', properties: { 'color-rendering': 'auto' } })
      rules.push({ pattern: 'color-render-speed', properties: { 'color-rendering': 'optimizeSpeed' } })
      rules.push({ pattern: 'color-render-quality', properties: { 'color-rendering': 'optimizeQuality' } })

      // ========================================
      // FONT SMOOTHING
      // ========================================

      rules.push({
        pattern: 'antialiased',
        properties: {
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
        }
      })
      rules.push({
        pattern: 'subpixel-antialiased',
        properties: {
          '-webkit-font-smoothing': 'auto',
          '-moz-osx-font-smoothing': 'auto',
        }
      })

      // ========================================
      // GPU ACCELERATION HINTS
      // ========================================

      // Force GPU layer
      rules.push({
        pattern: 'gpu-layer',
        properties: {
          transform: 'translateZ(0)',
          'will-change': 'transform',
        }
      })

      // Force compositing
      rules.push({
        pattern: 'composited',
        properties: {
          transform: 'translate3d(0, 0, 0)',
        }
      })

      // ========================================
      // VIRTUAL SCROLLING OPTIMIZATION
      // ========================================

      rules.push({
        pattern: 'virtual-scroll-item',
        properties: {
          'content-visibility': 'auto',
          'contain-intrinsic-size': 'auto 50px',
          contain: 'layout style paint',
        },
      })

      rules.push({
        pattern: 'virtual-scroll-row',
        properties: {
          'content-visibility': 'auto',
          'contain-intrinsic-size': 'auto 40px',
          contain: 'layout style paint',
        },
      })

      rules.push({
        pattern: 'virtual-scroll-card',
        properties: {
          'content-visibility': 'auto',
          'contain-intrinsic-size': '200px 300px',
          contain: 'layout style paint',
        },
      })

      // ========================================
      // LAZY LOADING OPTIMIZATION
      // ========================================

      rules.push({
        pattern: 'lazy-content',
        properties: {
          'content-visibility': 'auto',
          'contain-intrinsic-size': 'auto 500px',
        },
      })

      rules.push({
        pattern: 'lazy-section',
        properties: {
          'content-visibility': 'auto',
          'contain-intrinsic-size': 'auto 800px',
        },
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default performancePlugin
