/**
 * Motion Path Utilities Plugin
 *
 * CSS Motion Path utilities for animating elements along custom paths.
 * Uses offset-path (formerly motion-path) and related properties.
 *
 * @module plugins/core/utilities/motion-path
 */

import type { Plugin, Rule, PluginContext } from '../../../types'

/**
 * Motion path utilities plugin for CoralCSS
 *
 * Features:
 * - Path-based animations using offset-path
 * - Distance control with offset-distance
 * - Rotate and anchor controls
 * - Support for path(), ray(), url(), and basic shapes
 *
 * @example
 * ```html
 * <div class="offset-path-[path('M10,10 L90,90')] offset-distance-full">
 *   Animated along path
 * </div>
 * <div class="offset-path-circle offset-distance-50%">
 *   Animated around circle
 * </div>
 * ```
 */
export function motionPathPlugin(): Plugin {
  return {
    name: 'motion-path',
    version: '1.0.0',
    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // ========================================
      // OFFSET PATH (formerly motion-path)
      // ========================================

      // None value
      rules.push({
        pattern: 'offset-path-none',
        properties: { 'offset-path': 'none' }
      })

      // Basic shapes
      rules.push({
        pattern: 'offset-path-circle',
        properties: { 'offset-path': 'circle(50% at 50% 50%)' }
      })
      rules.push({
        pattern: 'offset-path-ellipse',
        properties: { 'offset-path': 'ellipse(40% 30% at 50% 50%)' }
      })
      rules.push({
        pattern: 'offset-path-rect',
        properties: { 'offset-path': 'inset(10% round 20px)' }
      })
      rules.push({
        pattern: 'offset-path-polygon',
        properties: { 'offset-path': 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }
      })

      // Ray() function - for animations along a ray
      rules.push({
        pattern: 'offset-ray-top',
        properties: { 'offset-path': 'ray(0deg closest-side)' }
      })
      rules.push({
        pattern: 'offset-ray-top-right',
        properties: { 'offset-path': 'ray(45deg closest-side)' }
      })
      rules.push({
        pattern: 'offset-ray-right',
        properties: { 'offset-path': 'ray(90deg closest-side)' }
      })
      rules.push({
        pattern: 'offset-ray-bottom-right',
        properties: { 'offset-path': 'ray(135deg closest-side)' }
      })
      rules.push({
        pattern: 'offset-ray-bottom',
        properties: { 'offset-path': 'ray(180deg closest-side)' }
      })
      rules.push({
        pattern: 'offset-ray-bottom-left',
        properties: { 'offset-path': 'ray(225deg closest-side)' }
      })
      rules.push({
        pattern: 'offset-ray-left',
        properties: { 'offset-path': 'ray(270deg closest-side)' }
      })
      rules.push({
        pattern: 'offset-ray-top-left',
        properties: { 'offset-path': 'ray(315deg closest-side)' }
      })

      // Arbitrary offset-path
      rules.push({
        pattern: /^offset-path-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return {
            properties: { 'offset-path': value.replace(/_/g, ' ') }
          }
        }
      })

      // ========================================
      // OFFSET DISTANCE
      // ========================================

      const distances = [
        '0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100',
        'px-0', 'px-1', 'px-2', 'px-4', 'px-8', 'px-12', 'px-16', 'px-20', 'px-24',
      ]

      for (const d of distances) {
        let value = d
        if (d.startsWith('px-')) {
          value = d.replace('px-', '') + 'px'
        } else if (d !== '0') {
          value = d + '%'
        }
        rules.push({
          pattern: `offset-distance-${d}`,
          properties: { 'offset-distance': value }
        })
      }

      // Full and none shortcuts
      rules.push({
        pattern: 'offset-distance-full',
        properties: { 'offset-distance': '100%' }
      })
      rules.push({
        pattern: 'offset-distance-none',
        properties: { 'offset-distance': '0' }
      })

      // Arbitrary offset-distance
      rules.push({
        pattern: /^offset-distance-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return {
            properties: { 'offset-distance': value }
          }
        }
      })

      // ========================================
      // OFFSET ROTATE
      // ========================================

      const rotations = [
        'auto', 'reverse', '0deg', '45deg', '90deg', '135deg', '180deg',
        '225deg', '270deg', '315deg'
      ]

      for (const r of rotations) {
        rules.push({
          pattern: `offset-rotate-${r}`,
          properties: { 'offset-rotate': r }
        })
      }

      // Arbitrary offset-rotate
      rules.push({
        pattern: /^offset-rotate-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return {
            properties: { 'offset-rotate': value }
          }
        }
      })

      // ========================================
      // OFFSET ANCHOR
      // ========================================

      const anchors = [
        'auto', 'center', 'top', 'bottom', 'left', 'right',
        'top-left', 'top-right', 'bottom-left', 'bottom-right'
      ]

      for (const a of anchors) {
        const value = a.includes('-') ? a.replace('-', ' ') : a
        rules.push({
          pattern: `offset-anchor-${a}`,
          properties: { 'offset-anchor': value }
        })
      }

      // None value for anchor
      rules.push({
        pattern: 'offset-anchor-none',
        properties: { 'offset-anchor': 'none' }
      })

      // Arbitrary offset-anchor
      rules.push({
        pattern: /^offset-anchor-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return {
            properties: { 'offset-anchor': value }
          }
        }
      })

      // ========================================
      // OFFSET POSITION
      // ========================================

      const positions = [
        'auto', 'normal', 'top', 'bottom', 'left', 'right', 'center'
      ]

      for (const p of positions) {
        rules.push({
          pattern: `offset-position-${p}`,
          properties: { 'offset-position': p }
        })
      }

      // Arbitrary offset-position
      rules.push({
        pattern: /^offset-position-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return {
            properties: { 'offset-position': value.replace(/_/g, ' ') }
          }
        }
      })

      // ========================================
      // CONVENIENCE ALIASES
      // ========================================

      // Short alias for offset-path
      rules.push({
        pattern: /^motion-path-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return {
            properties: { 'offset-path': value.replace(/_/g, ' ') }
          }
        }
      })

      // Short alias for offset-distance
      rules.push({
        pattern: /^motion-distance-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return {
            properties: { 'offset-distance': value }
          }
        }
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    }
  }
}

export default motionPathPlugin
