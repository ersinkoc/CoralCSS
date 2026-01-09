/**
 * Layout Utilities Plugin
 *
 * Display, position, visibility, and layout utilities.
 * @module plugins/core/utilities/layout
 */

import type { Plugin, Rule, PluginContext } from '../../../types'
import { inset, zIndex, spacing } from '../../../theme'

/**
 * Layout utilities plugin
 */
export function layoutPlugin(): Plugin {
  return {
    name: 'layout',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // Display
      rules.push({ pattern: 'block', properties: { display: 'block' } })
      rules.push({ pattern: 'inline-block', properties: { display: 'inline-block' } })
      rules.push({ pattern: 'inline', properties: { display: 'inline' } })
      rules.push({ pattern: 'flex', properties: { display: 'flex' } })
      rules.push({ pattern: 'inline-flex', properties: { display: 'inline-flex' } })
      rules.push({ pattern: 'grid', properties: { display: 'grid' } })
      rules.push({ pattern: 'inline-grid', properties: { display: 'inline-grid' } })
      rules.push({ pattern: 'contents', properties: { display: 'contents' } })
      rules.push({ pattern: 'flow-root', properties: { display: 'flow-root' } })
      rules.push({ pattern: 'list-item', properties: { display: 'list-item' } })
      rules.push({ pattern: 'hidden', properties: { display: 'none' } })
      rules.push({ pattern: 'table', properties: { display: 'table' } })
      rules.push({ pattern: 'table-caption', properties: { display: 'table-caption' } })
      rules.push({ pattern: 'table-cell', properties: { display: 'table-cell' } })
      rules.push({ pattern: 'table-column', properties: { display: 'table-column' } })
      rules.push({ pattern: 'table-column-group', properties: { display: 'table-column-group' } })
      rules.push({ pattern: 'table-footer-group', properties: { display: 'table-footer-group' } })
      rules.push({ pattern: 'table-header-group', properties: { display: 'table-header-group' } })
      rules.push({ pattern: 'table-row', properties: { display: 'table-row' } })
      rules.push({ pattern: 'table-row-group', properties: { display: 'table-row-group' } })

      // Position
      rules.push({ pattern: 'static', properties: { position: 'static' } })
      rules.push({ pattern: 'fixed', properties: { position: 'fixed' } })
      rules.push({ pattern: 'absolute', properties: { position: 'absolute' } })
      rules.push({ pattern: 'relative', properties: { position: 'relative' } })
      rules.push({ pattern: 'sticky', properties: { position: 'sticky' } })

      // Inset (top, right, bottom, left)
      for (const [key, value] of Object.entries(inset)) {
        rules.push({ pattern: `inset-${key}`, properties: { inset: value } })
        rules.push({ pattern: `inset-x-${key}`, properties: { left: value, right: value } })
        rules.push({ pattern: `inset-y-${key}`, properties: { top: value, bottom: value } })
        rules.push({ pattern: `top-${key}`, properties: { top: value } })
        rules.push({ pattern: `right-${key}`, properties: { right: value } })
        rules.push({ pattern: `bottom-${key}`, properties: { bottom: value } })
        rules.push({ pattern: `left-${key}`, properties: { left: value } })
        rules.push({ pattern: `start-${key}`, properties: { 'inset-inline-start': value } })
        rules.push({ pattern: `end-${key}`, properties: { 'inset-inline-end': value } })
      }

      // Negative inset
      for (const [key, value] of Object.entries(spacing)) {
        if (key !== '0' && key !== 'px') {
          const negValue = `-${value}`
          rules.push({ pattern: `-inset-${key}`, properties: { inset: negValue } })
          rules.push({ pattern: `-inset-x-${key}`, properties: { left: negValue, right: negValue } })
          rules.push({ pattern: `-inset-y-${key}`, properties: { top: negValue, bottom: negValue } })
          rules.push({ pattern: `-top-${key}`, properties: { top: negValue } })
          rules.push({ pattern: `-right-${key}`, properties: { right: negValue } })
          rules.push({ pattern: `-bottom-${key}`, properties: { bottom: negValue } })
          rules.push({ pattern: `-left-${key}`, properties: { left: negValue } })
        }
      }

      // Z-index
      for (const [key, value] of Object.entries(zIndex)) {
        rules.push({
          pattern: `z-${key}`,
          properties: { 'z-index': value },
        })
      }

      // Negative z-index
      rules.push({ pattern: '-z-10', properties: { 'z-index': '-10' } })
      rules.push({ pattern: '-z-20', properties: { 'z-index': '-20' } })
      rules.push({ pattern: '-z-30', properties: { 'z-index': '-30' } })
      rules.push({ pattern: '-z-40', properties: { 'z-index': '-40' } })
      rules.push({ pattern: '-z-50', properties: { 'z-index': '-50' } })

      // Visibility
      rules.push({ pattern: 'visible', properties: { visibility: 'visible' } })
      rules.push({ pattern: 'invisible', properties: { visibility: 'hidden' } })
      rules.push({ pattern: 'collapse', properties: { visibility: 'collapse' } })

      // Float
      rules.push({ pattern: 'float-start', properties: { float: 'inline-start' } })
      rules.push({ pattern: 'float-end', properties: { float: 'inline-end' } })
      rules.push({ pattern: 'float-right', properties: { float: 'right' } })
      rules.push({ pattern: 'float-left', properties: { float: 'left' } })
      rules.push({ pattern: 'float-none', properties: { float: 'none' } })

      // Clear
      rules.push({ pattern: 'clear-start', properties: { clear: 'inline-start' } })
      rules.push({ pattern: 'clear-end', properties: { clear: 'inline-end' } })
      rules.push({ pattern: 'clear-right', properties: { clear: 'right' } })
      rules.push({ pattern: 'clear-left', properties: { clear: 'left' } })
      rules.push({ pattern: 'clear-both', properties: { clear: 'both' } })
      rules.push({ pattern: 'clear-none', properties: { clear: 'none' } })

      // Isolation
      rules.push({ pattern: 'isolate', properties: { isolation: 'isolate' } })
      rules.push({ pattern: 'isolation-auto', properties: { isolation: 'auto' } })

      // Object fit
      rules.push({ pattern: 'object-contain', properties: { 'object-fit': 'contain' } })
      rules.push({ pattern: 'object-cover', properties: { 'object-fit': 'cover' } })
      rules.push({ pattern: 'object-fill', properties: { 'object-fit': 'fill' } })
      rules.push({ pattern: 'object-none', properties: { 'object-fit': 'none' } })
      rules.push({ pattern: 'object-scale-down', properties: { 'object-fit': 'scale-down' } })

      // Object position
      rules.push({ pattern: 'object-bottom', properties: { 'object-position': 'bottom' } })
      rules.push({ pattern: 'object-center', properties: { 'object-position': 'center' } })
      rules.push({ pattern: 'object-left', properties: { 'object-position': 'left' } })
      rules.push({ pattern: 'object-left-bottom', properties: { 'object-position': 'left bottom' } })
      rules.push({ pattern: 'object-left-top', properties: { 'object-position': 'left top' } })
      rules.push({ pattern: 'object-right', properties: { 'object-position': 'right' } })
      rules.push({ pattern: 'object-right-bottom', properties: { 'object-position': 'right bottom' } })
      rules.push({ pattern: 'object-right-top', properties: { 'object-position': 'right top' } })
      rules.push({ pattern: 'object-top', properties: { 'object-position': 'top' } })

      // Overflow
      rules.push({ pattern: 'overflow-auto', properties: { overflow: 'auto' } })
      rules.push({ pattern: 'overflow-hidden', properties: { overflow: 'hidden' } })
      rules.push({ pattern: 'overflow-clip', properties: { overflow: 'clip' } })
      rules.push({ pattern: 'overflow-visible', properties: { overflow: 'visible' } })
      rules.push({ pattern: 'overflow-scroll', properties: { overflow: 'scroll' } })
      rules.push({ pattern: 'overflow-x-auto', properties: { 'overflow-x': 'auto' } })
      rules.push({ pattern: 'overflow-y-auto', properties: { 'overflow-y': 'auto' } })
      rules.push({ pattern: 'overflow-x-hidden', properties: { 'overflow-x': 'hidden' } })
      rules.push({ pattern: 'overflow-y-hidden', properties: { 'overflow-y': 'hidden' } })
      rules.push({ pattern: 'overflow-x-clip', properties: { 'overflow-x': 'clip' } })
      rules.push({ pattern: 'overflow-y-clip', properties: { 'overflow-y': 'clip' } })
      rules.push({ pattern: 'overflow-x-visible', properties: { 'overflow-x': 'visible' } })
      rules.push({ pattern: 'overflow-y-visible', properties: { 'overflow-y': 'visible' } })
      rules.push({ pattern: 'overflow-x-scroll', properties: { 'overflow-x': 'scroll' } })
      rules.push({ pattern: 'overflow-y-scroll', properties: { 'overflow-y': 'scroll' } })

      // Overscroll
      rules.push({ pattern: 'overscroll-auto', properties: { 'overscroll-behavior': 'auto' } })
      rules.push({ pattern: 'overscroll-contain', properties: { 'overscroll-behavior': 'contain' } })
      rules.push({ pattern: 'overscroll-none', properties: { 'overscroll-behavior': 'none' } })
      rules.push({ pattern: 'overscroll-x-auto', properties: { 'overscroll-behavior-x': 'auto' } })
      rules.push({ pattern: 'overscroll-x-contain', properties: { 'overscroll-behavior-x': 'contain' } })
      rules.push({ pattern: 'overscroll-x-none', properties: { 'overscroll-behavior-x': 'none' } })
      rules.push({ pattern: 'overscroll-y-auto', properties: { 'overscroll-behavior-y': 'auto' } })
      rules.push({ pattern: 'overscroll-y-contain', properties: { 'overscroll-behavior-y': 'contain' } })
      rules.push({ pattern: 'overscroll-y-none', properties: { 'overscroll-behavior-y': 'none' } })

      // Box sizing
      rules.push({ pattern: 'box-border', properties: { 'box-sizing': 'border-box' } })
      rules.push({ pattern: 'box-content', properties: { 'box-sizing': 'content-box' } })

      // Container
      rules.push({
        pattern: 'container',
        properties: {
          width: '100%',
          'margin-left': 'auto',
          'margin-right': 'auto',
        },
      })

      // Aspect ratio
      rules.push({ pattern: 'aspect-auto', properties: { 'aspect-ratio': 'auto' } })
      rules.push({ pattern: 'aspect-square', properties: { 'aspect-ratio': '1 / 1' } })
      rules.push({ pattern: 'aspect-video', properties: { 'aspect-ratio': '16 / 9' } })

      // Columns
      for (let i = 1; i <= 12; i++) {
        rules.push({
          pattern: `columns-${i}`,
          properties: { columns: String(i) },
        })
      }
      rules.push({ pattern: 'columns-auto', properties: { columns: 'auto' } })
      rules.push({ pattern: 'columns-3xs', properties: { columns: '16rem' } })
      rules.push({ pattern: 'columns-2xs', properties: { columns: '18rem' } })
      rules.push({ pattern: 'columns-xs', properties: { columns: '20rem' } })
      rules.push({ pattern: 'columns-sm', properties: { columns: '24rem' } })
      rules.push({ pattern: 'columns-md', properties: { columns: '28rem' } })
      rules.push({ pattern: 'columns-lg', properties: { columns: '32rem' } })
      rules.push({ pattern: 'columns-xl', properties: { columns: '36rem' } })
      rules.push({ pattern: 'columns-2xl', properties: { columns: '42rem' } })
      rules.push({ pattern: 'columns-3xl', properties: { columns: '48rem' } })
      rules.push({ pattern: 'columns-4xl', properties: { columns: '56rem' } })
      rules.push({ pattern: 'columns-5xl', properties: { columns: '64rem' } })
      rules.push({ pattern: 'columns-6xl', properties: { columns: '72rem' } })
      rules.push({ pattern: 'columns-7xl', properties: { columns: '80rem' } })

      // Break after/before/inside
      rules.push({ pattern: 'break-after-auto', properties: { 'break-after': 'auto' } })
      rules.push({ pattern: 'break-after-avoid', properties: { 'break-after': 'avoid' } })
      rules.push({ pattern: 'break-after-all', properties: { 'break-after': 'all' } })
      rules.push({ pattern: 'break-after-avoid-page', properties: { 'break-after': 'avoid-page' } })
      rules.push({ pattern: 'break-after-page', properties: { 'break-after': 'page' } })
      rules.push({ pattern: 'break-after-left', properties: { 'break-after': 'left' } })
      rules.push({ pattern: 'break-after-right', properties: { 'break-after': 'right' } })
      rules.push({ pattern: 'break-after-column', properties: { 'break-after': 'column' } })
      rules.push({ pattern: 'break-before-auto', properties: { 'break-before': 'auto' } })
      rules.push({ pattern: 'break-before-avoid', properties: { 'break-before': 'avoid' } })
      rules.push({ pattern: 'break-before-all', properties: { 'break-before': 'all' } })
      rules.push({ pattern: 'break-before-avoid-page', properties: { 'break-before': 'avoid-page' } })
      rules.push({ pattern: 'break-before-page', properties: { 'break-before': 'page' } })
      rules.push({ pattern: 'break-before-left', properties: { 'break-before': 'left' } })
      rules.push({ pattern: 'break-before-right', properties: { 'break-before': 'right' } })
      rules.push({ pattern: 'break-before-column', properties: { 'break-before': 'column' } })
      rules.push({ pattern: 'break-inside-auto', properties: { 'break-inside': 'auto' } })
      rules.push({ pattern: 'break-inside-avoid', properties: { 'break-inside': 'avoid' } })
      rules.push({ pattern: 'break-inside-avoid-page', properties: { 'break-inside': 'avoid-page' } })
      rules.push({ pattern: 'break-inside-avoid-column', properties: { 'break-inside': 'avoid-column' } })

      // Box decoration break
      rules.push({ pattern: 'box-decoration-clone', properties: { 'box-decoration-break': 'clone' } })
      rules.push({ pattern: 'box-decoration-slice', properties: { 'box-decoration-break': 'slice' } })

      // Arbitrary values
      rules.push({
        pattern: /^inset-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { inset: v } } },
      })
      rules.push({
        pattern: /^top-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { top: v } } },
      })
      rules.push({
        pattern: /^right-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { right: v } } },
      })
      rules.push({
        pattern: /^bottom-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { bottom: v } } },
      })
      rules.push({
        pattern: /^left-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { left: v } } },
      })
      rules.push({
        pattern: /^z-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'z-index': v } } },
      })
      rules.push({
        pattern: /^aspect-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'aspect-ratio': v.replace('/', ' / ') } } },
      })
      rules.push({
        pattern: /^columns-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { columns: v } } },
      })

      // ========================================
      // SCROLL SNAP (Beyond Tailwind 4)
      // ========================================

      // Scroll snap type
      rules.push({ pattern: 'snap-none', properties: { 'scroll-snap-type': 'none' } })
      rules.push({ pattern: 'snap-x', properties: { 'scroll-snap-type': 'x var(--coral-scroll-snap-strictness, mandatory)' } })
      rules.push({ pattern: 'snap-y', properties: { 'scroll-snap-type': 'y var(--coral-scroll-snap-strictness, mandatory)' } })
      rules.push({ pattern: 'snap-both', properties: { 'scroll-snap-type': 'both var(--coral-scroll-snap-strictness, mandatory)' } })
      rules.push({ pattern: 'snap-mandatory', properties: { '--coral-scroll-snap-strictness': 'mandatory' } })
      rules.push({ pattern: 'snap-proximity', properties: { '--coral-scroll-snap-strictness': 'proximity' } })

      // Scroll snap align
      rules.push({ pattern: 'snap-start', properties: { 'scroll-snap-align': 'start' } })
      rules.push({ pattern: 'snap-end', properties: { 'scroll-snap-align': 'end' } })
      rules.push({ pattern: 'snap-center', properties: { 'scroll-snap-align': 'center' } })
      rules.push({ pattern: 'snap-align-none', properties: { 'scroll-snap-align': 'none' } })

      // Scroll snap stop
      rules.push({ pattern: 'snap-normal', properties: { 'scroll-snap-stop': 'normal' } })
      rules.push({ pattern: 'snap-always', properties: { 'scroll-snap-stop': 'always' } })

      // Scroll margin
      const snapMarginValues = ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56', '60', '64', '72', '80', '96']
      for (const value of snapMarginValues) {
        const size = value === '0' ? '0px' : `${parseInt(value, 10) * 0.25}rem`
        rules.push({ pattern: `scroll-m-${value}`, properties: { 'scroll-margin': size } })
        rules.push({ pattern: `scroll-mx-${value}`, properties: { 'scroll-margin-left': size, 'scroll-margin-right': size } })
        rules.push({ pattern: `scroll-my-${value}`, properties: { 'scroll-margin-top': size, 'scroll-margin-bottom': size } })
        rules.push({ pattern: `scroll-mt-${value}`, properties: { 'scroll-margin-top': size } })
        rules.push({ pattern: `scroll-mr-${value}`, properties: { 'scroll-margin-right': size } })
        rules.push({ pattern: `scroll-mb-${value}`, properties: { 'scroll-margin-bottom': size } })
        rules.push({ pattern: `scroll-ml-${value}`, properties: { 'scroll-margin-left': size } })
        rules.push({ pattern: `scroll-ms-${value}`, properties: { 'scroll-margin-inline-start': size } })
        rules.push({ pattern: `scroll-me-${value}`, properties: { 'scroll-margin-inline-end': size } })
      }

      // Scroll padding
      for (const value of snapMarginValues) {
        const size = value === '0' ? '0px' : `${parseInt(value, 10) * 0.25}rem`
        rules.push({ pattern: `scroll-p-${value}`, properties: { 'scroll-padding': size } })
        rules.push({ pattern: `scroll-px-${value}`, properties: { 'scroll-padding-left': size, 'scroll-padding-right': size } })
        rules.push({ pattern: `scroll-py-${value}`, properties: { 'scroll-padding-top': size, 'scroll-padding-bottom': size } })
        rules.push({ pattern: `scroll-pt-${value}`, properties: { 'scroll-padding-top': size } })
        rules.push({ pattern: `scroll-pr-${value}`, properties: { 'scroll-padding-right': size } })
        rules.push({ pattern: `scroll-pb-${value}`, properties: { 'scroll-padding-bottom': size } })
        rules.push({ pattern: `scroll-pl-${value}`, properties: { 'scroll-padding-left': size } })
        rules.push({ pattern: `scroll-ps-${value}`, properties: { 'scroll-padding-inline-start': size } })
        rules.push({ pattern: `scroll-pe-${value}`, properties: { 'scroll-padding-inline-end': size } })
      }

      // Arbitrary scroll margin/padding
      rules.push({
        pattern: /^scroll-m-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'scroll-margin': v } } },
      })
      rules.push({
        pattern: /^scroll-p-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'scroll-padding': v } } },
      })

      // ========================================
      // SCROLL BEHAVIOR (Beyond Tailwind 4)
      // ========================================

      rules.push({ pattern: 'scroll-smooth', properties: { 'scroll-behavior': 'smooth' } })
      rules.push({ pattern: 'scroll-auto', properties: { 'scroll-behavior': 'auto' } })

      // Scroll timeline (CSS Scroll-driven Animations)
      rules.push({ pattern: 'scroll-timeline-x', properties: { 'scroll-timeline-axis': 'x' } })
      rules.push({ pattern: 'scroll-timeline-y', properties: { 'scroll-timeline-axis': 'y' } })
      rules.push({ pattern: 'scroll-timeline-block', properties: { 'scroll-timeline-axis': 'block' } })
      rules.push({ pattern: 'scroll-timeline-inline', properties: { 'scroll-timeline-axis': 'inline' } })

      rules.push({
        pattern: /^scroll-timeline-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'scroll-timeline-name': v } }
        },
      })

      // ========================================
      // VIEW TRANSITIONS (Beyond Tailwind 4)
      // ========================================

      rules.push({ pattern: 'view-transition-none', properties: { 'view-transition-name': 'none' } })
      rules.push({
        pattern: /^view-transition-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'view-transition-name': v } }
        },
      })

      // ========================================
      // CONTAIN (Performance optimization)
      // ========================================

      rules.push({ pattern: 'contain-none', properties: { contain: 'none' } })
      rules.push({ pattern: 'contain-strict', properties: { contain: 'strict' } })
      rules.push({ pattern: 'contain-content', properties: { contain: 'content' } })
      rules.push({ pattern: 'contain-size', properties: { contain: 'size' } })
      rules.push({ pattern: 'contain-layout', properties: { contain: 'layout' } })
      rules.push({ pattern: 'contain-style', properties: { contain: 'style' } })
      rules.push({ pattern: 'contain-paint', properties: { contain: 'paint' } })
      rules.push({ pattern: 'contain-inline-size', properties: { contain: 'inline-size' } })

      // ========================================
      // WILL-CHANGE (Performance hints)
      // ========================================

      rules.push({ pattern: 'will-change-auto', properties: { 'will-change': 'auto' } })
      rules.push({ pattern: 'will-change-scroll', properties: { 'will-change': 'scroll-position' } })
      rules.push({ pattern: 'will-change-contents', properties: { 'will-change': 'contents' } })
      rules.push({ pattern: 'will-change-transform', properties: { 'will-change': 'transform' } })
      rules.push({ pattern: 'will-change-opacity', properties: { 'will-change': 'opacity' } })
      rules.push({
        pattern: /^will-change-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'will-change': v } }
        },
      })

      // ========================================
      // WRITING MODE (Internationalization)
      // ========================================

      rules.push({ pattern: 'writing-horizontal-tb', properties: { 'writing-mode': 'horizontal-tb' } })
      rules.push({ pattern: 'writing-vertical-rl', properties: { 'writing-mode': 'vertical-rl' } })
      rules.push({ pattern: 'writing-vertical-lr', properties: { 'writing-mode': 'vertical-lr' } })
      rules.push({ pattern: 'writing-sideways-rl', properties: { 'writing-mode': 'sideways-rl' } })
      rules.push({ pattern: 'writing-sideways-lr', properties: { 'writing-mode': 'sideways-lr' } })

      // Text orientation
      rules.push({ pattern: 'text-orientation-mixed', properties: { 'text-orientation': 'mixed' } })
      rules.push({ pattern: 'text-orientation-upright', properties: { 'text-orientation': 'upright' } })
      rules.push({ pattern: 'text-orientation-sideways', properties: { 'text-orientation': 'sideways' } })

      // Direction
      rules.push({ pattern: 'direction-ltr', properties: { direction: 'ltr' } })
      rules.push({ pattern: 'direction-rtl', properties: { direction: 'rtl' } })

      // ========================================
      // PRINT UTILITIES
      // ========================================

      rules.push({ pattern: 'print-color-adjust-exact', properties: { 'print-color-adjust': 'exact' } })
      rules.push({ pattern: 'print-color-adjust-economy', properties: { 'print-color-adjust': 'economy' } })

      // ========================================
      // MULTI-COLUMN LAYOUT (Beyond Tailwind 4)
      // ========================================

      // Column gap (extended)
      const columnGapValues = ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24', '32', '40', '48', '56', '64']
      for (const value of columnGapValues) {
        const size = value === '0' ? '0px' : `${parseInt(value, 10) * 0.25}rem`
        rules.push({ pattern: `column-gap-${value}`, properties: { 'column-gap': size } })
      }
      rules.push({ pattern: 'column-gap-normal', properties: { 'column-gap': 'normal' } })
      rules.push({
        pattern: /^column-gap-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'column-gap': v } } },
      })

      // Column rule (divider between columns)
      rules.push({ pattern: 'column-rule-none', properties: { 'column-rule': 'none' } })
      rules.push({ pattern: 'column-rule', properties: { 'column-rule': '1px solid currentColor' } })
      rules.push({ pattern: 'column-rule-2', properties: { 'column-rule': '2px solid currentColor' } })
      rules.push({ pattern: 'column-rule-4', properties: { 'column-rule': '4px solid currentColor' } })

      // Column rule style
      rules.push({ pattern: 'column-rule-solid', properties: { 'column-rule-style': 'solid' } })
      rules.push({ pattern: 'column-rule-dashed', properties: { 'column-rule-style': 'dashed' } })
      rules.push({ pattern: 'column-rule-dotted', properties: { 'column-rule-style': 'dotted' } })
      rules.push({ pattern: 'column-rule-double', properties: { 'column-rule-style': 'double' } })
      rules.push({ pattern: 'column-rule-hidden', properties: { 'column-rule-style': 'hidden' } })
      rules.push({ pattern: 'column-rule-groove', properties: { 'column-rule-style': 'groove' } })
      rules.push({ pattern: 'column-rule-ridge', properties: { 'column-rule-style': 'ridge' } })
      rules.push({ pattern: 'column-rule-inset', properties: { 'column-rule-style': 'inset' } })
      rules.push({ pattern: 'column-rule-outset', properties: { 'column-rule-style': 'outset' } })

      // Column rule width
      rules.push({ pattern: 'column-rule-w-0', properties: { 'column-rule-width': '0px' } })
      rules.push({ pattern: 'column-rule-w-1', properties: { 'column-rule-width': '1px' } })
      rules.push({ pattern: 'column-rule-w-2', properties: { 'column-rule-width': '2px' } })
      rules.push({ pattern: 'column-rule-w-4', properties: { 'column-rule-width': '4px' } })
      rules.push({ pattern: 'column-rule-w-8', properties: { 'column-rule-width': '8px' } })

      rules.push({
        pattern: /^column-rule-w-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'column-rule-width': v } } },
      })

      // Column span
      rules.push({ pattern: 'column-span-all', properties: { 'column-span': 'all' } })
      rules.push({ pattern: 'column-span-none', properties: { 'column-span': 'none' } })

      // Column fill
      rules.push({ pattern: 'column-fill-auto', properties: { 'column-fill': 'auto' } })
      rules.push({ pattern: 'column-fill-balance', properties: { 'column-fill': 'balance' } })
      rules.push({ pattern: 'column-fill-balance-all', properties: { 'column-fill': 'balance-all' } })

      // Column width
      rules.push({ pattern: 'column-width-auto', properties: { 'column-width': 'auto' } })
      rules.push({ pattern: 'column-width-xs', properties: { 'column-width': '20rem' } })
      rules.push({ pattern: 'column-width-sm', properties: { 'column-width': '24rem' } })
      rules.push({ pattern: 'column-width-md', properties: { 'column-width': '28rem' } })
      rules.push({ pattern: 'column-width-lg', properties: { 'column-width': '32rem' } })
      rules.push({ pattern: 'column-width-xl', properties: { 'column-width': '36rem' } })
      rules.push({ pattern: 'column-width-2xl', properties: { 'column-width': '42rem' } })

      rules.push({
        pattern: /^column-width-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'column-width': v } } },
      })

      // ========================================
      // CONTENT-VISIBILITY (Beyond Tailwind 4)
      // ========================================

      rules.push({ pattern: 'content-visibility-auto', properties: { 'content-visibility': 'auto' } })
      rules.push({ pattern: 'content-visibility-hidden', properties: { 'content-visibility': 'hidden' } })
      rules.push({ pattern: 'content-visibility-visible', properties: { 'content-visibility': 'visible' } })

      // Contain intrinsic size (for content-visibility: auto)
      rules.push({ pattern: 'contain-intrinsic-size-none', properties: { 'contain-intrinsic-size': 'none' } })
      rules.push({ pattern: 'contain-intrinsic-size-auto', properties: { 'contain-intrinsic-size': 'auto' } })
      rules.push({ pattern: 'contain-intrinsic-size-xs', properties: { 'contain-intrinsic-size': '20rem' } })
      rules.push({ pattern: 'contain-intrinsic-size-sm', properties: { 'contain-intrinsic-size': '24rem' } })
      rules.push({ pattern: 'contain-intrinsic-size-md', properties: { 'contain-intrinsic-size': '28rem' } })
      rules.push({ pattern: 'contain-intrinsic-size-lg', properties: { 'contain-intrinsic-size': '32rem' } })
      rules.push({ pattern: 'contain-intrinsic-size-xl', properties: { 'contain-intrinsic-size': '36rem' } })

      rules.push({
        pattern: /^contain-intrinsic-size-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'contain-intrinsic-size': v } } },
      })

      // Contain intrinsic width/height
      rules.push({
        pattern: /^contain-intrinsic-w-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'contain-intrinsic-width': v } } },
      })
      rules.push({
        pattern: /^contain-intrinsic-h-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'contain-intrinsic-height': v } } },
      })

      // ========================================
      // EXTENDED ASPECT RATIOS (Beyond Tailwind 4)
      // ========================================

      rules.push({ pattern: 'aspect-4/3', properties: { 'aspect-ratio': '4 / 3' } })
      rules.push({ pattern: 'aspect-3/2', properties: { 'aspect-ratio': '3 / 2' } })
      rules.push({ pattern: 'aspect-2/1', properties: { 'aspect-ratio': '2 / 1' } })
      rules.push({ pattern: 'aspect-21/9', properties: { 'aspect-ratio': '21 / 9' } })
      rules.push({ pattern: 'aspect-9/16', properties: { 'aspect-ratio': '9 / 16' } })
      rules.push({ pattern: 'aspect-3/4', properties: { 'aspect-ratio': '3 / 4' } })
      rules.push({ pattern: 'aspect-2/3', properties: { 'aspect-ratio': '2 / 3' } })
      rules.push({ pattern: 'aspect-1/2', properties: { 'aspect-ratio': '1 / 2' } })
      rules.push({ pattern: 'aspect-golden', properties: { 'aspect-ratio': '1.618 / 1' } })
      rules.push({ pattern: 'aspect-photo', properties: { 'aspect-ratio': '4 / 3' } })
      rules.push({ pattern: 'aspect-cinema', properties: { 'aspect-ratio': '2.35 / 1' } })
      rules.push({ pattern: 'aspect-portrait', properties: { 'aspect-ratio': '3 / 4' } })
      rules.push({ pattern: 'aspect-landscape', properties: { 'aspect-ratio': '4 / 3' } })

      // ========================================
      // BLEND MODES (Beyond Tailwind 4)
      // ========================================

      // Mix blend mode
      rules.push({ pattern: 'mix-blend-normal', properties: { 'mix-blend-mode': 'normal' } })
      rules.push({ pattern: 'mix-blend-multiply', properties: { 'mix-blend-mode': 'multiply' } })
      rules.push({ pattern: 'mix-blend-screen', properties: { 'mix-blend-mode': 'screen' } })
      rules.push({ pattern: 'mix-blend-overlay', properties: { 'mix-blend-mode': 'overlay' } })
      rules.push({ pattern: 'mix-blend-darken', properties: { 'mix-blend-mode': 'darken' } })
      rules.push({ pattern: 'mix-blend-lighten', properties: { 'mix-blend-mode': 'lighten' } })
      rules.push({ pattern: 'mix-blend-color-dodge', properties: { 'mix-blend-mode': 'color-dodge' } })
      rules.push({ pattern: 'mix-blend-color-burn', properties: { 'mix-blend-mode': 'color-burn' } })
      rules.push({ pattern: 'mix-blend-hard-light', properties: { 'mix-blend-mode': 'hard-light' } })
      rules.push({ pattern: 'mix-blend-soft-light', properties: { 'mix-blend-mode': 'soft-light' } })
      rules.push({ pattern: 'mix-blend-difference', properties: { 'mix-blend-mode': 'difference' } })
      rules.push({ pattern: 'mix-blend-exclusion', properties: { 'mix-blend-mode': 'exclusion' } })
      rules.push({ pattern: 'mix-blend-hue', properties: { 'mix-blend-mode': 'hue' } })
      rules.push({ pattern: 'mix-blend-saturation', properties: { 'mix-blend-mode': 'saturation' } })
      rules.push({ pattern: 'mix-blend-color', properties: { 'mix-blend-mode': 'color' } })
      rules.push({ pattern: 'mix-blend-luminosity', properties: { 'mix-blend-mode': 'luminosity' } })
      rules.push({ pattern: 'mix-blend-plus-darker', properties: { 'mix-blend-mode': 'plus-darker' } })
      rules.push({ pattern: 'mix-blend-plus-lighter', properties: { 'mix-blend-mode': 'plus-lighter' } })

      // Background blend mode
      rules.push({ pattern: 'bg-blend-normal', properties: { 'background-blend-mode': 'normal' } })
      rules.push({ pattern: 'bg-blend-multiply', properties: { 'background-blend-mode': 'multiply' } })
      rules.push({ pattern: 'bg-blend-screen', properties: { 'background-blend-mode': 'screen' } })
      rules.push({ pattern: 'bg-blend-overlay', properties: { 'background-blend-mode': 'overlay' } })
      rules.push({ pattern: 'bg-blend-darken', properties: { 'background-blend-mode': 'darken' } })
      rules.push({ pattern: 'bg-blend-lighten', properties: { 'background-blend-mode': 'lighten' } })
      rules.push({ pattern: 'bg-blend-color-dodge', properties: { 'background-blend-mode': 'color-dodge' } })
      rules.push({ pattern: 'bg-blend-color-burn', properties: { 'background-blend-mode': 'color-burn' } })
      rules.push({ pattern: 'bg-blend-hard-light', properties: { 'background-blend-mode': 'hard-light' } })
      rules.push({ pattern: 'bg-blend-soft-light', properties: { 'background-blend-mode': 'soft-light' } })
      rules.push({ pattern: 'bg-blend-difference', properties: { 'background-blend-mode': 'difference' } })
      rules.push({ pattern: 'bg-blend-exclusion', properties: { 'background-blend-mode': 'exclusion' } })
      rules.push({ pattern: 'bg-blend-hue', properties: { 'background-blend-mode': 'hue' } })
      rules.push({ pattern: 'bg-blend-saturation', properties: { 'background-blend-mode': 'saturation' } })
      rules.push({ pattern: 'bg-blend-color', properties: { 'background-blend-mode': 'color' } })
      rules.push({ pattern: 'bg-blend-luminosity', properties: { 'background-blend-mode': 'luminosity' } })

      // ========================================
      // POINTER EVENTS (Extended)
      // ========================================

      rules.push({ pattern: 'pointer-events-none', properties: { 'pointer-events': 'none' } })
      rules.push({ pattern: 'pointer-events-auto', properties: { 'pointer-events': 'auto' } })
      rules.push({ pattern: 'pointer-events-visiblePainted', properties: { 'pointer-events': 'visiblePainted' } })
      rules.push({ pattern: 'pointer-events-visibleFill', properties: { 'pointer-events': 'visibleFill' } })
      rules.push({ pattern: 'pointer-events-visibleStroke', properties: { 'pointer-events': 'visibleStroke' } })
      rules.push({ pattern: 'pointer-events-visible', properties: { 'pointer-events': 'visible' } })
      rules.push({ pattern: 'pointer-events-painted', properties: { 'pointer-events': 'painted' } })
      rules.push({ pattern: 'pointer-events-fill', properties: { 'pointer-events': 'fill' } })
      rules.push({ pattern: 'pointer-events-stroke', properties: { 'pointer-events': 'stroke' } })
      rules.push({ pattern: 'pointer-events-all', properties: { 'pointer-events': 'all' } })

      // ========================================
      // USER SELECT (Extended)
      // ========================================

      rules.push({ pattern: 'select-none', properties: { 'user-select': 'none' } })
      rules.push({ pattern: 'select-text', properties: { 'user-select': 'text' } })
      rules.push({ pattern: 'select-all', properties: { 'user-select': 'all' } })
      rules.push({ pattern: 'select-auto', properties: { 'user-select': 'auto' } })
      rules.push({ pattern: 'select-contain', properties: { 'user-select': 'contain' } })

      // ========================================
      // OVERSCROLL (Extended)
      // ========================================

      // Overscroll with inline/block variants
      rules.push({ pattern: 'overscroll-inline-auto', properties: { 'overscroll-behavior-inline': 'auto' } })
      rules.push({ pattern: 'overscroll-inline-contain', properties: { 'overscroll-behavior-inline': 'contain' } })
      rules.push({ pattern: 'overscroll-inline-none', properties: { 'overscroll-behavior-inline': 'none' } })
      rules.push({ pattern: 'overscroll-block-auto', properties: { 'overscroll-behavior-block': 'auto' } })
      rules.push({ pattern: 'overscroll-block-contain', properties: { 'overscroll-behavior-block': 'contain' } })
      rules.push({ pattern: 'overscroll-block-none', properties: { 'overscroll-behavior-block': 'none' } })

      // ========================================
      // PLACE UTILITIES (Extended)
      // ========================================

      // Place content
      rules.push({ pattern: 'place-content-center', properties: { 'place-content': 'center' } })
      rules.push({ pattern: 'place-content-start', properties: { 'place-content': 'start' } })
      rules.push({ pattern: 'place-content-end', properties: { 'place-content': 'end' } })
      rules.push({ pattern: 'place-content-between', properties: { 'place-content': 'space-between' } })
      rules.push({ pattern: 'place-content-around', properties: { 'place-content': 'space-around' } })
      rules.push({ pattern: 'place-content-evenly', properties: { 'place-content': 'space-evenly' } })
      rules.push({ pattern: 'place-content-baseline', properties: { 'place-content': 'baseline' } })
      rules.push({ pattern: 'place-content-stretch', properties: { 'place-content': 'stretch' } })

      // Place items
      rules.push({ pattern: 'place-items-center', properties: { 'place-items': 'center' } })
      rules.push({ pattern: 'place-items-start', properties: { 'place-items': 'start' } })
      rules.push({ pattern: 'place-items-end', properties: { 'place-items': 'end' } })
      rules.push({ pattern: 'place-items-baseline', properties: { 'place-items': 'baseline' } })
      rules.push({ pattern: 'place-items-stretch', properties: { 'place-items': 'stretch' } })

      // Place self
      rules.push({ pattern: 'place-self-center', properties: { 'place-self': 'center' } })
      rules.push({ pattern: 'place-self-start', properties: { 'place-self': 'start' } })
      rules.push({ pattern: 'place-self-end', properties: { 'place-self': 'end' } })
      rules.push({ pattern: 'place-self-auto', properties: { 'place-self': 'auto' } })
      rules.push({ pattern: 'place-self-stretch', properties: { 'place-self': 'stretch' } })

      // ========================================
      // INSET LOGICAL PROPERTIES (Extended)
      // ========================================

      // Inset inline/block
      for (const [key, value] of Object.entries(inset)) {
        rules.push({ pattern: `inset-inline-${key}`, properties: { 'inset-inline': value } })
        rules.push({ pattern: `inset-block-${key}`, properties: { 'inset-block': value } })
        rules.push({ pattern: `inset-inline-start-${key}`, properties: { 'inset-inline-start': value } })
        rules.push({ pattern: `inset-inline-end-${key}`, properties: { 'inset-inline-end': value } })
        rules.push({ pattern: `inset-block-start-${key}`, properties: { 'inset-block-start': value } })
        rules.push({ pattern: `inset-block-end-${key}`, properties: { 'inset-block-end': value } })
      }

      rules.push({
        pattern: /^inset-inline-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'inset-inline': v } } },
      })
      rules.push({
        pattern: /^inset-block-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'inset-block': v } } },
      })

      // ========================================
      // SCROLLBAR GUTTER (Beyond Tailwind 4)
      // ========================================

      rules.push({ pattern: 'scrollbar-gutter-auto', properties: { 'scrollbar-gutter': 'auto' } })
      rules.push({ pattern: 'scrollbar-gutter-stable', properties: { 'scrollbar-gutter': 'stable' } })
      rules.push({ pattern: 'scrollbar-gutter-stable-both', properties: { 'scrollbar-gutter': 'stable both-edges' } })

      // ========================================
      // OVERFLOW ANCHOR (Beyond Tailwind 4)
      // ========================================

      rules.push({ pattern: 'overflow-anchor-auto', properties: { 'overflow-anchor': 'auto' } })
      rules.push({ pattern: 'overflow-anchor-none', properties: { 'overflow-anchor': 'none' } })

      // ========================================
      // OVERFLOW CLIP MARGIN (Beyond Tailwind 4)
      // ========================================

      rules.push({ pattern: 'overflow-clip-margin-content', properties: { 'overflow-clip-margin': 'content-box' } })
      rules.push({ pattern: 'overflow-clip-margin-padding', properties: { 'overflow-clip-margin': 'padding-box' } })
      rules.push({ pattern: 'overflow-clip-margin-border', properties: { 'overflow-clip-margin': 'border-box' } })

      rules.push({
        pattern: /^overflow-clip-margin-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'overflow-clip-margin': v } } },
      })

      // ========================================
      // IMAGE RENDERING (Beyond Tailwind 4)
      // ========================================

      rules.push({ pattern: 'image-render-auto', properties: { 'image-rendering': 'auto' } })
      rules.push({ pattern: 'image-render-crisp', properties: { 'image-rendering': 'crisp-edges' } })
      rules.push({ pattern: 'image-render-pixelated', properties: { 'image-rendering': 'pixelated' } })
      rules.push({ pattern: 'image-render-smooth', properties: { 'image-rendering': 'smooth' } })
      rules.push({ pattern: 'image-render-high-quality', properties: { 'image-rendering': 'high-quality' } })

      // ========================================
      // SHAPE RENDERING (SVG)
      // ========================================

      rules.push({ pattern: 'shape-render-auto', properties: { 'shape-rendering': 'auto' } })
      rules.push({ pattern: 'shape-render-speed', properties: { 'shape-rendering': 'optimizeSpeed' } })
      rules.push({ pattern: 'shape-render-crisp', properties: { 'shape-rendering': 'crispEdges' } })
      rules.push({ pattern: 'shape-render-geometric', properties: { 'shape-rendering': 'geometricPrecision' } })

      // ========================================
      // TEXT RENDERING
      // ========================================

      rules.push({ pattern: 'text-render-auto', properties: { 'text-rendering': 'auto' } })
      rules.push({ pattern: 'text-render-speed', properties: { 'text-rendering': 'optimizeSpeed' } })
      rules.push({ pattern: 'text-render-legibility', properties: { 'text-rendering': 'optimizeLegibility' } })
      rules.push({ pattern: 'text-render-precision', properties: { 'text-rendering': 'geometricPrecision' } })

      // ========================================
      // COLOR RENDERING
      // ========================================

      rules.push({ pattern: 'color-render-auto', properties: { 'color-rendering': 'auto' } })
      rules.push({ pattern: 'color-render-speed', properties: { 'color-rendering': 'optimizeSpeed' } })
      rules.push({ pattern: 'color-render-quality', properties: { 'color-rendering': 'optimizeQuality' } })

      // ========================================
      // FORCED COLOR ADJUST
      // ========================================

      rules.push({ pattern: 'forced-color-adjust-auto', properties: { 'forced-color-adjust': 'auto' } })
      rules.push({ pattern: 'forced-color-adjust-none', properties: { 'forced-color-adjust': 'none' } })

      // ========================================
      // COLOR SCHEME
      // ========================================

      rules.push({ pattern: 'color-scheme-normal', properties: { 'color-scheme': 'normal' } })
      rules.push({ pattern: 'color-scheme-light', properties: { 'color-scheme': 'light' } })
      rules.push({ pattern: 'color-scheme-dark', properties: { 'color-scheme': 'dark' } })
      rules.push({ pattern: 'color-scheme-light-dark', properties: { 'color-scheme': 'light dark' } })
      rules.push({ pattern: 'color-scheme-only-light', properties: { 'color-scheme': 'only light' } })
      rules.push({ pattern: 'color-scheme-only-dark', properties: { 'color-scheme': 'only dark' } })

      // ========================================
      // RESIZE (Beyond Tailwind 4)
      // ========================================

      rules.push({ pattern: 'resize-none', properties: { resize: 'none' } })
      rules.push({ pattern: 'resize', properties: { resize: 'both' } })
      rules.push({ pattern: 'resize-x', properties: { resize: 'horizontal' } })
      rules.push({ pattern: 'resize-y', properties: { resize: 'vertical' } })
      rules.push({ pattern: 'resize-block', properties: { resize: 'block' } })
      rules.push({ pattern: 'resize-inline', properties: { resize: 'inline' } })

      // ========================================
      // CURSOR (Extended)
      // ========================================

      rules.push({ pattern: 'cursor-auto', properties: { cursor: 'auto' } })
      rules.push({ pattern: 'cursor-default', properties: { cursor: 'default' } })
      rules.push({ pattern: 'cursor-pointer', properties: { cursor: 'pointer' } })
      rules.push({ pattern: 'cursor-wait', properties: { cursor: 'wait' } })
      rules.push({ pattern: 'cursor-text', properties: { cursor: 'text' } })
      rules.push({ pattern: 'cursor-move', properties: { cursor: 'move' } })
      rules.push({ pattern: 'cursor-help', properties: { cursor: 'help' } })
      rules.push({ pattern: 'cursor-not-allowed', properties: { cursor: 'not-allowed' } })
      rules.push({ pattern: 'cursor-none', properties: { cursor: 'none' } })
      rules.push({ pattern: 'cursor-context-menu', properties: { cursor: 'context-menu' } })
      rules.push({ pattern: 'cursor-progress', properties: { cursor: 'progress' } })
      rules.push({ pattern: 'cursor-cell', properties: { cursor: 'cell' } })
      rules.push({ pattern: 'cursor-crosshair', properties: { cursor: 'crosshair' } })
      rules.push({ pattern: 'cursor-vertical-text', properties: { cursor: 'vertical-text' } })
      rules.push({ pattern: 'cursor-alias', properties: { cursor: 'alias' } })
      rules.push({ pattern: 'cursor-copy', properties: { cursor: 'copy' } })
      rules.push({ pattern: 'cursor-no-drop', properties: { cursor: 'no-drop' } })
      rules.push({ pattern: 'cursor-grab', properties: { cursor: 'grab' } })
      rules.push({ pattern: 'cursor-grabbing', properties: { cursor: 'grabbing' } })
      rules.push({ pattern: 'cursor-all-scroll', properties: { cursor: 'all-scroll' } })
      rules.push({ pattern: 'cursor-col-resize', properties: { cursor: 'col-resize' } })
      rules.push({ pattern: 'cursor-row-resize', properties: { cursor: 'row-resize' } })
      rules.push({ pattern: 'cursor-n-resize', properties: { cursor: 'n-resize' } })
      rules.push({ pattern: 'cursor-e-resize', properties: { cursor: 'e-resize' } })
      rules.push({ pattern: 'cursor-s-resize', properties: { cursor: 's-resize' } })
      rules.push({ pattern: 'cursor-w-resize', properties: { cursor: 'w-resize' } })
      rules.push({ pattern: 'cursor-ne-resize', properties: { cursor: 'ne-resize' } })
      rules.push({ pattern: 'cursor-nw-resize', properties: { cursor: 'nw-resize' } })
      rules.push({ pattern: 'cursor-se-resize', properties: { cursor: 'se-resize' } })
      rules.push({ pattern: 'cursor-sw-resize', properties: { cursor: 'sw-resize' } })
      rules.push({ pattern: 'cursor-ew-resize', properties: { cursor: 'ew-resize' } })
      rules.push({ pattern: 'cursor-ns-resize', properties: { cursor: 'ns-resize' } })
      rules.push({ pattern: 'cursor-nesw-resize', properties: { cursor: 'nesw-resize' } })
      rules.push({ pattern: 'cursor-nwse-resize', properties: { cursor: 'nwse-resize' } })
      rules.push({ pattern: 'cursor-zoom-in', properties: { cursor: 'zoom-in' } })
      rules.push({ pattern: 'cursor-zoom-out', properties: { cursor: 'zoom-out' } })

      rules.push({
        pattern: /^cursor-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { cursor: v } } },
      })

      // ========================================
      // TOUCH ACTION (Extended)
      // ========================================

      rules.push({ pattern: 'touch-auto', properties: { 'touch-action': 'auto' } })
      rules.push({ pattern: 'touch-none', properties: { 'touch-action': 'none' } })
      rules.push({ pattern: 'touch-pan-x', properties: { 'touch-action': 'pan-x' } })
      rules.push({ pattern: 'touch-pan-left', properties: { 'touch-action': 'pan-left' } })
      rules.push({ pattern: 'touch-pan-right', properties: { 'touch-action': 'pan-right' } })
      rules.push({ pattern: 'touch-pan-y', properties: { 'touch-action': 'pan-y' } })
      rules.push({ pattern: 'touch-pan-up', properties: { 'touch-action': 'pan-up' } })
      rules.push({ pattern: 'touch-pan-down', properties: { 'touch-action': 'pan-down' } })
      rules.push({ pattern: 'touch-pinch-zoom', properties: { 'touch-action': 'pinch-zoom' } })
      rules.push({ pattern: 'touch-manipulation', properties: { 'touch-action': 'manipulation' } })

      // ========================================
      // CARET COLOR
      // ========================================

      rules.push({ pattern: 'caret-transparent', properties: { 'caret-color': 'transparent' } })
      rules.push({ pattern: 'caret-current', properties: { 'caret-color': 'currentColor' } })
      rules.push({ pattern: 'caret-auto', properties: { 'caret-color': 'auto' } })

      rules.push({
        pattern: /^caret-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'caret-color': v } } },
      })

      // ========================================
      // ACCENT COLOR
      // ========================================

      rules.push({ pattern: 'accent-auto', properties: { 'accent-color': 'auto' } })
      rules.push({ pattern: 'accent-transparent', properties: { 'accent-color': 'transparent' } })
      rules.push({ pattern: 'accent-current', properties: { 'accent-color': 'currentColor' } })

      rules.push({
        pattern: /^accent-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'accent-color': v } } },
      })

      // ========================================
      // APPEARANCE
      // ========================================

      rules.push({ pattern: 'appearance-none', properties: { appearance: 'none' } })
      rules.push({ pattern: 'appearance-auto', properties: { appearance: 'auto' } })
      rules.push({ pattern: 'appearance-textfield', properties: { appearance: 'textfield' } })
      rules.push({ pattern: 'appearance-menulist-button', properties: { appearance: 'menulist-button' } })

      // ========================================
      // FIELD SIZING (Beyond Tailwind 4)
      // ========================================

      rules.push({ pattern: 'field-sizing-fixed', properties: { 'field-sizing': 'fixed' } })
      rules.push({ pattern: 'field-sizing-content', properties: { 'field-sizing': 'content' } })

      // ========================================
      // MATH STYLE
      // ========================================

      rules.push({ pattern: 'math-style-normal', properties: { 'math-style': 'normal' } })
      rules.push({ pattern: 'math-style-compact', properties: { 'math-style': 'compact' } })

      // ========================================
      // MATH DEPTH
      // ========================================

      rules.push({ pattern: 'math-depth-0', properties: { 'math-depth': '0' } })
      rules.push({ pattern: 'math-depth-1', properties: { 'math-depth': '1' } })
      rules.push({ pattern: 'math-depth-2', properties: { 'math-depth': '2' } })
      rules.push({ pattern: 'math-depth-add-1', properties: { 'math-depth': 'add(1)' } })
      rules.push({ pattern: 'math-depth-add-2', properties: { 'math-depth': 'add(2)' } })
      rules.push({ pattern: 'math-depth-auto-add', properties: { 'math-depth': 'auto-add' } })

      rules.push({
        pattern: /^math-depth-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'math-depth': v } } },
      })

      // ========================================
      // VISIBILITY EXTENDED
      // ========================================

      rules.push({ pattern: 'backface-visible', properties: { 'backface-visibility': 'visible' } })
      rules.push({ pattern: 'backface-hidden', properties: { 'backface-visibility': 'hidden' } })

      // ========================================
      // PAINT ORDER (SVG)
      // ========================================

      rules.push({ pattern: 'paint-order-normal', properties: { 'paint-order': 'normal' } })
      rules.push({ pattern: 'paint-order-fill', properties: { 'paint-order': 'fill' } })
      rules.push({ pattern: 'paint-order-stroke', properties: { 'paint-order': 'stroke' } })
      rules.push({ pattern: 'paint-order-markers', properties: { 'paint-order': 'markers' } })
      rules.push({ pattern: 'paint-order-stroke-fill', properties: { 'paint-order': 'stroke fill' } })
      rules.push({ pattern: 'paint-order-fill-stroke', properties: { 'paint-order': 'fill stroke' } })

      // ========================================
      // DOMINANT BASELINE (SVG)
      // ========================================

      rules.push({ pattern: 'dominant-baseline-auto', properties: { 'dominant-baseline': 'auto' } })
      rules.push({ pattern: 'dominant-baseline-text-bottom', properties: { 'dominant-baseline': 'text-bottom' } })
      rules.push({ pattern: 'dominant-baseline-alphabetic', properties: { 'dominant-baseline': 'alphabetic' } })
      rules.push({ pattern: 'dominant-baseline-ideographic', properties: { 'dominant-baseline': 'ideographic' } })
      rules.push({ pattern: 'dominant-baseline-middle', properties: { 'dominant-baseline': 'middle' } })
      rules.push({ pattern: 'dominant-baseline-central', properties: { 'dominant-baseline': 'central' } })
      rules.push({ pattern: 'dominant-baseline-mathematical', properties: { 'dominant-baseline': 'mathematical' } })
      rules.push({ pattern: 'dominant-baseline-hanging', properties: { 'dominant-baseline': 'hanging' } })
      rules.push({ pattern: 'dominant-baseline-text-top', properties: { 'dominant-baseline': 'text-top' } })

      // ========================================
      // ALIGNMENT BASELINE (SVG)
      // ========================================

      rules.push({ pattern: 'alignment-baseline-auto', properties: { 'alignment-baseline': 'auto' } })
      rules.push({ pattern: 'alignment-baseline-baseline', properties: { 'alignment-baseline': 'baseline' } })
      rules.push({ pattern: 'alignment-baseline-text-bottom', properties: { 'alignment-baseline': 'text-bottom' } })
      rules.push({ pattern: 'alignment-baseline-alphabetic', properties: { 'alignment-baseline': 'alphabetic' } })
      rules.push({ pattern: 'alignment-baseline-ideographic', properties: { 'alignment-baseline': 'ideographic' } })
      rules.push({ pattern: 'alignment-baseline-middle', properties: { 'alignment-baseline': 'middle' } })
      rules.push({ pattern: 'alignment-baseline-central', properties: { 'alignment-baseline': 'central' } })
      rules.push({ pattern: 'alignment-baseline-mathematical', properties: { 'alignment-baseline': 'mathematical' } })
      rules.push({ pattern: 'alignment-baseline-text-top', properties: { 'alignment-baseline': 'text-top' } })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default layoutPlugin
