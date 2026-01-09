/**
 * Grid Utilities Plugin
 *
 * CSS Grid layout utilities.
 * @module plugins/core/utilities/grid
 */

import type { Plugin, Rule, PluginContext } from '../../../types'

/**
 * Grid utilities plugin
 */
export function gridPlugin(): Plugin {
  return {
    name: 'grid',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // Grid template columns
      for (let i = 1; i <= 12; i++) {
        rules.push({
          pattern: `grid-cols-${i}`,
          properties: { 'grid-template-columns': `repeat(${i}, minmax(0, 1fr))` },
        })
      }
      rules.push({ pattern: 'grid-cols-none', properties: { 'grid-template-columns': 'none' } })
      rules.push({ pattern: 'grid-cols-subgrid', properties: { 'grid-template-columns': 'subgrid' } })

      // Grid template rows
      for (let i = 1; i <= 12; i++) {
        rules.push({
          pattern: `grid-rows-${i}`,
          properties: { 'grid-template-rows': `repeat(${i}, minmax(0, 1fr))` },
        })
      }
      rules.push({ pattern: 'grid-rows-none', properties: { 'grid-template-rows': 'none' } })
      rules.push({ pattern: 'grid-rows-subgrid', properties: { 'grid-template-rows': 'subgrid' } })

      // Grid column span
      rules.push({ pattern: 'col-auto', properties: { 'grid-column': 'auto' } })
      for (let i = 1; i <= 12; i++) {
        rules.push({
          pattern: `col-span-${i}`,
          properties: { 'grid-column': `span ${i} / span ${i}` },
        })
      }
      rules.push({ pattern: 'col-span-full', properties: { 'grid-column': '1 / -1' } })

      // Grid column start
      rules.push({ pattern: 'col-start-auto', properties: { 'grid-column-start': 'auto' } })
      for (let i = 1; i <= 13; i++) {
        rules.push({
          pattern: `col-start-${i}`,
          properties: { 'grid-column-start': String(i) },
        })
      }

      // Grid column end
      rules.push({ pattern: 'col-end-auto', properties: { 'grid-column-end': 'auto' } })
      for (let i = 1; i <= 13; i++) {
        rules.push({
          pattern: `col-end-${i}`,
          properties: { 'grid-column-end': String(i) },
        })
      }

      // Grid row span
      rules.push({ pattern: 'row-auto', properties: { 'grid-row': 'auto' } })
      for (let i = 1; i <= 12; i++) {
        rules.push({
          pattern: `row-span-${i}`,
          properties: { 'grid-row': `span ${i} / span ${i}` },
        })
      }
      rules.push({ pattern: 'row-span-full', properties: { 'grid-row': '1 / -1' } })

      // Grid row start
      rules.push({ pattern: 'row-start-auto', properties: { 'grid-row-start': 'auto' } })
      for (let i = 1; i <= 13; i++) {
        rules.push({
          pattern: `row-start-${i}`,
          properties: { 'grid-row-start': String(i) },
        })
      }

      // Grid row end
      rules.push({ pattern: 'row-end-auto', properties: { 'grid-row-end': 'auto' } })
      for (let i = 1; i <= 13; i++) {
        rules.push({
          pattern: `row-end-${i}`,
          properties: { 'grid-row-end': String(i) },
        })
      }

      // Grid auto flow
      rules.push({ pattern: 'grid-flow-row', properties: { 'grid-auto-flow': 'row' } })
      rules.push({ pattern: 'grid-flow-col', properties: { 'grid-auto-flow': 'column' } })
      rules.push({ pattern: 'grid-flow-dense', properties: { 'grid-auto-flow': 'dense' } })
      rules.push({ pattern: 'grid-flow-row-dense', properties: { 'grid-auto-flow': 'row dense' } })
      rules.push({ pattern: 'grid-flow-col-dense', properties: { 'grid-auto-flow': 'column dense' } })

      // Grid auto columns
      rules.push({ pattern: 'auto-cols-auto', properties: { 'grid-auto-columns': 'auto' } })
      rules.push({ pattern: 'auto-cols-min', properties: { 'grid-auto-columns': 'min-content' } })
      rules.push({ pattern: 'auto-cols-max', properties: { 'grid-auto-columns': 'max-content' } })
      rules.push({ pattern: 'auto-cols-fr', properties: { 'grid-auto-columns': 'minmax(0, 1fr)' } })

      // Grid auto rows
      rules.push({ pattern: 'auto-rows-auto', properties: { 'grid-auto-rows': 'auto' } })
      rules.push({ pattern: 'auto-rows-min', properties: { 'grid-auto-rows': 'min-content' } })
      rules.push({ pattern: 'auto-rows-max', properties: { 'grid-auto-rows': 'max-content' } })
      rules.push({ pattern: 'auto-rows-fr', properties: { 'grid-auto-rows': 'minmax(0, 1fr)' } })

      // Arbitrary values
      rules.push({
        pattern: /^grid-cols-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'grid-template-columns': v } } },
      })
      rules.push({
        pattern: /^grid-rows-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'grid-template-rows': v } } },
      })
      rules.push({
        pattern: /^col-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'grid-column': v } } },
      })
      rules.push({
        pattern: /^col-start-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'grid-column-start': v } } },
      })
      rules.push({
        pattern: /^col-end-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'grid-column-end': v } } },
      })
      rules.push({
        pattern: /^row-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'grid-row': v } } },
      })
      rules.push({
        pattern: /^row-start-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'grid-row-start': v } } },
      })
      rules.push({
        pattern: /^row-end-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'grid-row-end': v } } },
      })
      rules.push({
        pattern: /^auto-cols-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'grid-auto-columns': v } } },
      })
      rules.push({
        pattern: /^auto-rows-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'grid-auto-rows': v } } },
      })

      // ========================================
      // GRID TEMPLATE AREAS (Beyond Tailwind 4)
      // ========================================

      // Grid area
      rules.push({ pattern: 'grid-area-auto', properties: { 'grid-area': 'auto' } })

      // Common named areas
      rules.push({ pattern: 'grid-area-header', properties: { 'grid-area': 'header' } })
      rules.push({ pattern: 'grid-area-sidebar', properties: { 'grid-area': 'sidebar' } })
      rules.push({ pattern: 'grid-area-main', properties: { 'grid-area': 'main' } })
      rules.push({ pattern: 'grid-area-footer', properties: { 'grid-area': 'footer' } })
      rules.push({ pattern: 'grid-area-content', properties: { 'grid-area': 'content' } })
      rules.push({ pattern: 'grid-area-nav', properties: { 'grid-area': 'nav' } })
      rules.push({ pattern: 'grid-area-aside', properties: { 'grid-area': 'aside' } })

      // Arbitrary grid-area
      rules.push({
        pattern: /^grid-area-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'grid-area': v } }
        },
      })

      // Common grid template areas layouts
      rules.push({
        pattern: 'grid-areas-holy-grail',
        properties: {
          'grid-template-areas': '"header header header" "nav main aside" "footer footer footer"',
          'grid-template-rows': 'auto 1fr auto',
          'grid-template-columns': '200px 1fr 200px',
        },
      })
      rules.push({
        pattern: 'grid-areas-sidebar-left',
        properties: {
          'grid-template-areas': '"header header" "sidebar main" "footer footer"',
          'grid-template-rows': 'auto 1fr auto',
          'grid-template-columns': '250px 1fr',
        },
      })
      rules.push({
        pattern: 'grid-areas-sidebar-right',
        properties: {
          'grid-template-areas': '"header header" "main sidebar" "footer footer"',
          'grid-template-rows': 'auto 1fr auto',
          'grid-template-columns': '1fr 250px',
        },
      })
      rules.push({
        pattern: 'grid-areas-stack',
        properties: {
          'grid-template-areas': '"header" "main" "footer"',
          'grid-template-rows': 'auto 1fr auto',
        },
      })

      // Arbitrary grid-template-areas
      rules.push({
        pattern: /^grid-areas-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'grid-template-areas': v.replace(/_/g, ' ') } }
        },
      })

      // ========================================
      // MASONRY LAYOUT (Beyond Tailwind 4)
      // CSS Grid Level 3
      // ========================================

      rules.push({ pattern: 'grid-rows-masonry', properties: { 'grid-template-rows': 'masonry' } })
      rules.push({ pattern: 'grid-cols-masonry', properties: { 'grid-template-columns': 'masonry' } })

      // Masonry auto flow
      rules.push({ pattern: 'masonry-auto-flow-pack', properties: { 'masonry-auto-flow': 'pack' } })
      rules.push({ pattern: 'masonry-auto-flow-next', properties: { 'masonry-auto-flow': 'next' } })
      rules.push({ pattern: 'masonry-auto-flow-ordered', properties: { 'masonry-auto-flow': 'ordered' } })
      rules.push({ pattern: 'masonry-auto-flow-definite-first', properties: { 'masonry-auto-flow': 'definite-first' } })

      // ========================================
      // ALIGN/JUSTIFY TRACKS (Beyond Tailwind 4)
      // ========================================

      // Align tracks (for grid with extra space)
      rules.push({ pattern: 'align-tracks-start', properties: { 'align-tracks': 'start' } })
      rules.push({ pattern: 'align-tracks-end', properties: { 'align-tracks': 'end' } })
      rules.push({ pattern: 'align-tracks-center', properties: { 'align-tracks': 'center' } })
      rules.push({ pattern: 'align-tracks-stretch', properties: { 'align-tracks': 'stretch' } })
      rules.push({ pattern: 'align-tracks-baseline', properties: { 'align-tracks': 'baseline' } })
      rules.push({ pattern: 'align-tracks-space-between', properties: { 'align-tracks': 'space-between' } })
      rules.push({ pattern: 'align-tracks-space-around', properties: { 'align-tracks': 'space-around' } })
      rules.push({ pattern: 'align-tracks-space-evenly', properties: { 'align-tracks': 'space-evenly' } })

      // Justify tracks
      rules.push({ pattern: 'justify-tracks-start', properties: { 'justify-tracks': 'start' } })
      rules.push({ pattern: 'justify-tracks-end', properties: { 'justify-tracks': 'end' } })
      rules.push({ pattern: 'justify-tracks-center', properties: { 'justify-tracks': 'center' } })
      rules.push({ pattern: 'justify-tracks-stretch', properties: { 'justify-tracks': 'stretch' } })
      rules.push({ pattern: 'justify-tracks-space-between', properties: { 'justify-tracks': 'space-between' } })
      rules.push({ pattern: 'justify-tracks-space-around', properties: { 'justify-tracks': 'space-around' } })
      rules.push({ pattern: 'justify-tracks-space-evenly', properties: { 'justify-tracks': 'space-evenly' } })

      // ========================================
      // GRID AUTO-FIT/AUTO-FILL (Beyond Tailwind 4)
      // ========================================

      // Auto-fit responsive columns
      const responsiveSizes = ['100', '150', '200', '250', '300', '350', '400']
      for (const size of responsiveSizes) {
        rules.push({
          pattern: `grid-cols-auto-fit-${size}`,
          properties: { 'grid-template-columns': `repeat(auto-fit, minmax(${size}px, 1fr))` },
        })
        rules.push({
          pattern: `grid-cols-auto-fill-${size}`,
          properties: { 'grid-template-columns': `repeat(auto-fill, minmax(${size}px, 1fr))` },
        })
      }

      // Arbitrary auto-fit/auto-fill
      rules.push({
        pattern: /^grid-cols-auto-fit-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'grid-template-columns': `repeat(auto-fit, minmax(${v}, 1fr))` } }
        },
      })
      rules.push({
        pattern: /^grid-cols-auto-fill-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'grid-template-columns': `repeat(auto-fill, minmax(${v}, 1fr))` } }
        },
      })

      // ========================================
      // EXTENDED SPAN UTILITIES
      // ========================================

      // Span to end (-1)
      rules.push({ pattern: 'col-span-to-end', properties: { 'grid-column-end': '-1' } })
      rules.push({ pattern: 'row-span-to-end', properties: { 'grid-row-end': '-1' } })

      // Negative grid lines
      rules.push({ pattern: 'col-start--1', properties: { 'grid-column-start': '-1' } })
      rules.push({ pattern: 'col-start--2', properties: { 'grid-column-start': '-2' } })
      rules.push({ pattern: 'col-start--3', properties: { 'grid-column-start': '-3' } })
      rules.push({ pattern: 'col-end--1', properties: { 'grid-column-end': '-1' } })
      rules.push({ pattern: 'col-end--2', properties: { 'grid-column-end': '-2' } })
      rules.push({ pattern: 'col-end--3', properties: { 'grid-column-end': '-3' } })
      rules.push({ pattern: 'row-start--1', properties: { 'grid-row-start': '-1' } })
      rules.push({ pattern: 'row-start--2', properties: { 'grid-row-start': '-2' } })
      rules.push({ pattern: 'row-start--3', properties: { 'grid-row-start': '-3' } })
      rules.push({ pattern: 'row-end--1', properties: { 'grid-row-end': '-1' } })
      rules.push({ pattern: 'row-end--2', properties: { 'grid-row-end': '-2' } })
      rules.push({ pattern: 'row-end--3', properties: { 'grid-row-end': '-3' } })

      // ========================================
      // GRID SIZING KEYWORDS (Beyond Tailwind 4)
      // ========================================

      // Min-content, max-content, fit-content for columns
      rules.push({ pattern: 'grid-cols-min', properties: { 'grid-template-columns': 'min-content' } })
      rules.push({ pattern: 'grid-cols-max', properties: { 'grid-template-columns': 'max-content' } })
      rules.push({ pattern: 'grid-cols-fit', properties: { 'grid-template-columns': 'fit-content(100%)' } })

      // Min-content, max-content, fit-content for rows
      rules.push({ pattern: 'grid-rows-min', properties: { 'grid-template-rows': 'min-content' } })
      rules.push({ pattern: 'grid-rows-max', properties: { 'grid-template-rows': 'max-content' } })
      rules.push({ pattern: 'grid-rows-fit', properties: { 'grid-template-rows': 'fit-content(100%)' } })

      // ========================================
      // ORDER (Grid/Flex item ordering)
      // ========================================

      rules.push({ pattern: 'order-first', properties: { order: '-9999' } })
      rules.push({ pattern: 'order-last', properties: { order: '9999' } })
      rules.push({ pattern: 'order-none', properties: { order: '0' } })

      for (let i = 1; i <= 12; i++) {
        rules.push({ pattern: `order-${i}`, properties: { order: String(i) } })
        rules.push({ pattern: `-order-${i}`, properties: { order: String(-i) } })
      }

      rules.push({
        pattern: /^order-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { order: v } }
        },
      })

      // ========================================
      // GRID GAP UTILITIES (Extended)
      // ========================================

      // Gap with logical properties
      const gapValues = ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24', '32', '40', '48', '56', '64']
      for (const value of gapValues) {
        const size = value === '0' ? '0px' : `${parseInt(value, 10) * 0.25}rem`
        rules.push({ pattern: `gap-inline-${value}`, properties: { 'column-gap': size } })
        rules.push({ pattern: `gap-block-${value}`, properties: { 'row-gap': size } })
      }

      rules.push({
        pattern: /^gap-inline-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'column-gap': v } } },
      })
      rules.push({
        pattern: /^gap-block-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'row-gap': v } } },
      })

      // ========================================
      // SUBGRID UTILITIES (Beyond Tailwind 4)
      // ========================================

      // Subgrid for both axes
      rules.push({
        pattern: 'subgrid',
        properties: {
          'grid-template-columns': 'subgrid',
          'grid-template-rows': 'subgrid',
        },
      })
      rules.push({ pattern: 'subgrid-cols', properties: { 'grid-template-columns': 'subgrid' } })
      rules.push({ pattern: 'subgrid-rows', properties: { 'grid-template-rows': 'subgrid' } })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default gridPlugin
