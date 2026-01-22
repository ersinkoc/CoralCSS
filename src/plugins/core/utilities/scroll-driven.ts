/**
 * Scroll-Driven Animations Utilities Plugin
 *
 * CSS Scroll-Driven Animations utilities for creating scroll-based animations.
 * Uses animation-timeline, animation-range, and view-timeline properties.
 *
 * @module plugins/core/utilities/scroll-driven
 */

import type { Plugin, Rule, PluginContext } from '../../../types'

/**
 * Scroll-driven animations utilities plugin for CoralCSS
 *
 * Features:
 * - Animation timeline (scroll, view)
 * - Animation range control
 * - View timeline for element visibility
 * - Scroll timeline for scroll position
 * - Named timeline support
 *
 * @example
 * ```html
 * <div class="animate-fade-in scroll-timeline-root">
 *   Fade in based on scroll
 * </div>
 * <div class="view-timeline-item animation-range-enter">
 *   Animate when entering viewport
 * </div>
 * ```
 */
export function scrollDrivenAnimationsPlugin(): Plugin {
  return {
    name: 'scroll-driven-animations',
    version: '1.0.0',
    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // ========================================
      // ANIMATION TIMELINE
      // ========================================

      // Scroll timeline
      rules.push({
        pattern: 'animation-timeline-scroll',
        properties: { 'animation-timeline': 'scroll()' }
      })
      rules.push({
        pattern: 'animation-timeline-scroll-root',
        properties: { 'animation-timeline': 'scroll(root)' }
      })
      rules.push({
        pattern: 'animation-timeline-scroll-self',
        properties: { 'animation-timeline': 'scroll(self)' }
      })
      rules.push({
        pattern: 'animation-timeline-scroll-nearest',
        properties: { 'animation-timeline': 'scroll(nearest)' }
      })

      // View timeline
      rules.push({
        pattern: 'animation-timeline-view',
        properties: { 'animation-timeline': 'view()' }
      })
      rules.push({
        pattern: 'animation-timeline-view-block',
        properties: { 'animation-timeline': 'view(block)' }
      })
      rules.push({
        pattern: 'animation-timeline-view-inline',
        properties: { 'animation-timeline': 'view(inline)' }
      })
      rules.push({
        pattern: 'animation-timeline-view-y',
        properties: { 'animation-timeline': 'view(y)' }
      })
      rules.push({
        pattern: 'animation-timeline-view-x',
        properties: { 'animation-timeline': 'view(x)' }
      })

      // Named timeline
      rules.push({
        pattern: /^animation-timeline-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return {
            properties: { 'animation-timeline': value.replace(/_/g, ' ') }
          }
        }
      })

      // ========================================
      // ANIMATION RANGE
      // ========================================

      // Predefined ranges
      rules.push({
        pattern: 'animation-range-entry',
        properties: { 'animation-range': 'entry' }
      })
      rules.push({
        pattern: 'animation-range-entry-crossing',
        properties: { 'animation-range': 'entry-crossing' }
      })
      rules.push({
        pattern: 'animation-range-exit',
        properties: { 'animation-range': 'exit' }
      })
      rules.push({
        pattern: 'animation-range-exit-crossing',
        properties: { 'animation-range': 'exit-crossing' }
      })
      rules.push({
        pattern: 'animation-range-cover',
        properties: { 'animation-range': 'cover' }
      })
      rules.push({
        pattern: 'animation-range-contain',
        properties: { 'animation-range': 'contain' }
      })

      // Percentage ranges
      const percentages = ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100']
      for (const p of percentages) {
        rules.push({
          pattern: `animation-range-${p}%`,
          properties: { 'animation-range': `${p}%` }
        })
      }

      // Range start/end combinations
      rules.push({
        pattern: 'animation-range-entry-0%',
        properties: { 'animation-range': 'entry 0%' }
      })
      rules.push({
        pattern: 'animation-range-entry-25%',
        properties: { 'animation-range': 'entry 25%' }
      })
      rules.push({
        pattern: 'animation-range-entry-50%',
        properties: { 'animation-range': 'entry 50%' }
      })
      rules.push({
        pattern: 'animation-range-entry-100%',
        properties: { 'animation-range': 'entry 100%' }
      })

      rules.push({
        pattern: 'animation-range-exit-0%',
        properties: { 'animation-range': 'exit 0%' }
      })
      rules.push({
        pattern: 'animation-range-exit-25%',
        properties: { 'animation-range': 'exit 25%' }
      })
      rules.push({
        pattern: 'animation-range-exit-50%',
        properties: { 'animation-range': 'exit 50%' }
      })
      rules.push({
        pattern: 'animation-range-exit-100%',
        properties: { 'animation-range': 'exit 100%' }
      })

      // Cover range shortcuts
      rules.push({
        pattern: 'animation-range-cover-0%-100%',
        properties: { 'animation-range': 'cover 0% 100%' }
      })
      rules.push({
        pattern: 'animation-range-contain-0%-100%',
        properties: { 'animation-range': 'contain 0% 100%' }
      })

      // Arbitrary range
      rules.push({
        pattern: /^animation-range-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return {
            properties: { 'animation-range': value.replace(/_/g, ' ') }
          }
        }
      })

      // ========================================
      // ANIMATION RANGE START/END
      // ========================================

      rules.push({
        pattern: /^animation-range-start-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return {
            properties: { 'animation-range-start': value.replace(/_/g, ' ') }
          }
        }
      })

      rules.push({
        pattern: /^animation-range-end-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return {
            properties: { 'animation-range-end': value.replace(/_/g, ' ') }
          }
        }
      })

      // ========================================
      // VIEW TIMELINE
      // ========================================

      // View timeline axis
      rules.push({
        pattern: 'view-timeline-block',
        properties: { 'view-timeline-axis': 'block' }
      })
      rules.push({
        pattern: 'view-timeline-inline',
        properties: { 'view-timeline-axis': 'inline' }
      })
      rules.push({
        pattern: 'view-timeline-y',
        properties: { 'view-timeline-axis': 'y' }
      })
      rules.push({
        pattern: 'view-timeline-x',
        properties: { 'view-timeline-axis': 'x' }
      })

      // View timeline name
      rules.push({
        pattern: /^view-timeline-name-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return {
            properties: { 'view-timeline-name': value }
          }
        }
      })

      // View timeline inset
      const insets = ['auto', '0', '10%', '20%', '30%', '40%', '50%']
      for (const i of insets) {
        rules.push({
          pattern: `view-timeline-inset-${i}`,
          properties: { 'view-timeline-inset': i }
        })
      }

      rules.push({
        pattern: /^view-timeline-inset-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return {
            properties: { 'view-timeline-inset': value }
          }
        }
      })

      // ========================================
      // SCROLL TIMELINE
      // ========================================

      // Scroll timeline name
      rules.push({
        pattern: /^scroll-timeline-name-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return {
            properties: { 'scroll-timeline-name': value }
          }
        }
      })

      // Scroll timeline axis
      rules.push({
        pattern: 'scroll-timeline-block',
        properties: { 'scroll-timeline-axis': 'block' }
      })
      rules.push({
        pattern: 'scroll-timeline-inline',
        properties: { 'scroll-timeline-axis': 'inline' }
      })
      rules.push({
        pattern: 'scroll-timeline-y',
        properties: { 'scroll-timeline-axis': 'y' }
      })
      rules.push({
        pattern: 'scroll-timeline-x',
        properties: { 'scroll-timeline-axis': 'x' }
      })

      // ========================================
      // TIMELINE SCOPE
      // ========================================

      rules.push({
        pattern: 'timeline-scope-root',
        properties: { 'timeline-scope': 'root' }
      })
      rules.push({
        pattern: 'timeline-scope-self',
        properties: { 'timeline-scope': 'self' }
      })
      rules.push({
        pattern: 'timeline-scope-nearest',
        properties: { 'timeline-scope': 'nearest' }
      })

      rules.push({
        pattern: /^timeline-scope-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return {
            properties: { 'timeline-scope': value }
          }
        }
      })

      // ========================================
      // CONVENIENCE CLASSES
      // ========================================

      // Scroll-driven fade in
      rules.push({
        pattern: 'scroll-fade-in',
        properties: {
          'animation-timeline': 'view()',
          'animation-range': 'entry 0% entry 50%',
          'animation-name': 'scroll-fade-in'
        }
      })

      // Scroll-driven fade out
      rules.push({
        pattern: 'scroll-fade-out',
        properties: {
          'animation-timeline': 'view()',
          'animation-range': 'exit 0% exit 50%',
          'animation-name': 'scroll-fade-out'
        }
      })

      // Scroll-driven slide up
      rules.push({
        pattern: 'scroll-slide-up',
        properties: {
          'animation-timeline': 'view()',
          'animation-range': 'entry 0% entry 50%',
          'animation-name': 'scroll-slide-up'
        }
      })

      // Scroll-driven scale
      rules.push({
        pattern: 'scroll-scale-in',
        properties: {
          'animation-timeline': 'view()',
          'animation-range': 'entry 0% entry 50%',
          'animation-name': 'scroll-scale-in'
        }
      })

      // Parallax effect
      rules.push({
        pattern: 'scroll-parallax',
        properties: {
          'animation-timeline': 'scroll(root)',
          'animation-name': 'scroll-parallax'
        }
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    }
  }
}

export default scrollDrivenAnimationsPlugin
