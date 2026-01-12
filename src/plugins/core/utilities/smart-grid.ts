/**
 * Smart Grid Utilities Plugin
 *
 * Advanced grid layouts with auto-fit, auto-fill, and masonry support.
 * Goes beyond standard CSS grid with intelligent responsive behavior.
 *
 * @module plugins/core/utilities/smart-grid
 */

import type { Plugin } from '../../../types'

/**
 * Smart Grid Utilities Plugin for CoralCSS
 *
 * Features:
 * - Auto-fit grids that adapt to content
 * - Auto-fill grids for consistent spacing
 * - Masonry layout support
 * - Responsive smart breakpoints
 *
 * @example
 * ```html
 * <div class="grid-auto-fit gap-4">
 *   <div>Card 1</div>
 *   <div>Card 2</div>
 * </div>
 *
 * <div class="grid-masonry-tight">
 *   <div class="h-40">Tall item</div>
 *   <div class="h-24">Short item</div>
 * </div>
 * ```
 */
export const smartGridPlugin = (): Plugin => ({
  name: 'smart-grid',
  version: '1.0.0',
  install(api) {
    // ========================================
    // AUTO-FIT GRIDS
    // ========================================

    // Auto-fit grid - adapts to screen and content
    api.addRule({
      pattern: 'grid-auto-fit',
      generate: () => ({
        properties: {
          'display': 'grid',
          'grid-template-columns': 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))'
        }
      })
    })

    api.addRule({
      pattern: 'grid-auto-fit-sm',
      generate: () => ({
        properties: {
          'display': 'grid',
          'grid-template-columns': 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))'
        }
      })
    })

    api.addRule({
      pattern: 'grid-auto-fit-md',
      generate: () => ({
        properties: {
          'display': 'grid',
          'grid-template-columns': 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))'
        }
      })
    })

    api.addRule({
      pattern: 'grid-auto-fit-lg',
      generate: () => ({
        properties: {
          'display': 'grid',
          'grid-template-columns': 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))'
        }
      })
    })

    api.addRule({
      pattern: 'grid-auto-fit-xl',
      generate: () => ({
        properties: {
          'display': 'grid',
          'grid-template-columns': 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))'
        }
      })
    })

    // ========================================
    // AUTO-FILL GRIDS
    // ========================================

    api.addRule({
      pattern: 'grid-auto-fill',
      generate: () => ({
        properties: {
          'display': 'grid',
          'grid-template-columns': 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))'
        }
      })
    })

    api.addRule({
      pattern: 'grid-auto-fill-sm',
      generate: () => ({
        properties: {
          'display': 'grid',
          'grid-template-columns': 'repeat(auto-fill, minmax(min(100%, 180px), 1fr))'
        }
      })
    })

    api.addRule({
      pattern: 'grid-auto-fill-md',
      generate: () => ({
        properties: {
          'display': 'grid',
          'grid-template-columns': 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))'
        }
      })
    })

    api.addRule({
      pattern: 'grid-auto-fill-lg',
      generate: () => ({
        properties: {
          'display': 'grid',
          'grid-template-columns': 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))'
        }
      })
    })

    // ========================================
    // MASONRY GRIDS
    // ========================================

    // Masonry grid using CSS Grid masonry (experimental)
    api.addRule({
      pattern: 'grid-masonry',
      generate: () => ({
        properties: {
          'display': 'grid',
          'grid-template-rows': 'masonry',
          'grid-template-columns': 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))'
        }
      })
    })

    api.addRule({
      pattern: 'grid-masonry-sm',
      generate: () => ({
        properties: {
          'display': 'grid',
          'grid-template-rows': 'masonry',
          'grid-template-columns': 'repeat(auto-fill, minmax(min(100%, 180px), 1fr))'
        }
      })
    })

    api.addRule({
      pattern: 'grid-masonry-md',
      generate: () => ({
        properties: {
          'display': 'grid',
          'grid-template-rows': 'masonry',
          'grid-template-columns': 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))'
        }
      })
    })

    api.addRule({
      pattern: 'grid-masonry-lg',
      generate: () => ({
        properties: {
          'display': 'grid',
          'grid-template-rows': 'masonry',
          'grid-template-columns': 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))'
        }
      })
    })

    // Masonry with tight packing
    api.addRule({
      pattern: 'grid-masonry-tight',
      generate: () => ({
        properties: {
          'display': 'grid',
          'grid-template-rows': 'masonry',
          'masonry-auto-flow': 'next',
          'grid-template-columns': 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))'
        }
      })
    })

    // Masonry with sparse packing
    api.addRule({
      pattern: 'grid-masonry-sparse',
      generate: () => ({
        properties: {
          'display': 'grid',
          'grid-template-rows': 'masonry',
          'masonry-auto-flow': 'definite-next',
          'grid-template-columns': 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))'
        }
      })
    })

    // ========================================
    // SMART RESPONSIVE GRIDS
    // ========================================

    // Grid that adjusts columns based on container width
    api.addRule({
      pattern: 'grid-smart',
      generate: () => ({
        properties: {
          'display': 'grid',
          'grid-template-columns': 'repeat(auto-fit, minmax(clamp(200px, 20vw, 300px), 1fr))'
        }
      })
    })

    api.addRule({
      pattern: 'grid-smart-compact',
      generate: () => ({
        properties: {
          'display': 'grid',
          'grid-template-columns': 'repeat(auto-fit, minmax(clamp(150px, 15vw, 220px), 1fr))'
        }
      })
    })

    api.addRule({
      pattern: 'grid-smart-spacious',
      generate: () => ({
        properties: {
          'display': 'grid',
          'grid-template-columns': 'repeat(auto-fit, minmax(clamp(280px, 25vw, 400px), 1fr))'
        }
      })
    })

    // ========================================
    // DENSE GRID PACKING
    // ========================================

    api.addRule({
      pattern: 'grid-dense',
      generate: () => ({
        properties: {
          'grid-auto-flow': 'dense'
        }
      })
    })

    api.addRule({
      pattern: 'grid-dense-row',
      generate: () => ({
        properties: {
          'grid-auto-flow': 'row dense'
        }
      })
    })

    api.addRule({
      pattern: 'grid-dense-column',
      generate: () => ({
        properties: {
          'grid-auto-flow': 'column dense'
        }
      })
    })

    // ========================================
    // SUBGRID SUPPORT
    // ========================================

    api.addRule({
      pattern: 'grid-subgrid-rows',
      generate: () => ({
        properties: {
          'grid-template-rows': 'subgrid'
        }
      })
    })

    api.addRule({
      pattern: 'grid-subgrid-cols',
      generate: () => ({
        properties: {
          'grid-template-columns': 'subgrid'
        }
      })
    })

    api.addRule({
      pattern: 'grid-subgrid',
      generate: () => ({
        properties: {
          'grid-template-rows': 'subgrid',
          'grid-template-columns': 'subgrid'
        }
      })
    })

    // ========================================
    // ASPECT RATIO GRIDS
    // ========================================

    api.addRule({
      pattern: 'grid-aspect-square',
      generate: () => ({
        properties: {
          'aspect-ratio': '1 / 1'
        }
      })
    })

    api.addRule({
      pattern: 'grid-aspect-video',
      generate: () => ({
        properties: {
          'aspect-ratio': '16 / 9'
        }
      })
    })

    api.addRule({
      pattern: 'grid-aspect-photo',
      generate: () => ({
        properties: {
          'aspect-ratio': '4 / 3'
        }
      })
    })

    api.addRule({
      pattern: 'grid-aspect-wide',
      generate: () => ({
        properties: {
          'aspect-ratio': '21 / 9'
        }
      })
    })

    // ========================================
    // GRID TEMPLATE AREAS (SMART)
    // ========================================

    // Auto-fit grid with named areas
    api.addRule({
      pattern: 'grid-areas-auto',
      generate: () => ({
        properties: {
          'display': 'grid',
          'grid-template-columns': 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
          'grid-auto-rows': 'minmax(100px, auto)'
        }
      })
    })

    api.addRule({
      pattern: 'grid-areas-masonry',
      generate: () => ({
        properties: {
          'display': 'grid',
          'grid-template-columns': 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
          'grid-auto-rows': 'max-content',
          'grid-auto-flow': 'dense'
        }
      })
    })
  }
})

export default smartGridPlugin
