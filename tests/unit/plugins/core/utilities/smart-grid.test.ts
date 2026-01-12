/**
 * Smart Grid Utilities Plugin Tests
 *
 * Tests for smart grid utilities including auto-fit, auto-fill,
 * masonry, and responsive smart grid layouts.
 * @module tests/unit/plugins/core/utilities/smart-grid
 */

import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { smartGridPlugin } from '../../../../../src/plugins/core/utilities/smart-grid'

describe('Smart Grid Utilities Plugin', () => {
  describe('Auto-Fit Grids', () => {
    it('should generate grid-auto-fit', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-auto-fit'])
      expect(css).toContain('display: grid')
      expect(css).toContain('grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr))')
    })

    it('should generate grid-auto-fit-sm', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-auto-fit-sm'])
      expect(css).toContain('grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr))')
    })

    it('should generate grid-auto-fit-md', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-auto-fit-md'])
      expect(css).toContain('grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr))')
    })

    it('should generate grid-auto-fit-lg', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-auto-fit-lg'])
      expect(css).toContain('grid-template-columns: repeat(auto-fit, minmax(min(100%, 350px), 1fr))')
    })

    it('should generate grid-auto-fit-xl', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-auto-fit-xl'])
      expect(css).toContain('grid-template-columns: repeat(auto-fit, minmax(min(100%, 450px), 1fr))')
    })
  })

  describe('Auto-Fill Grids', () => {
    it('should generate grid-auto-fill', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-auto-fill'])
      expect(css).toContain('display: grid')
      expect(css).toContain('grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr))')
    })

    it('should generate grid-auto-fill-sm', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-auto-fill-sm'])
      expect(css).toContain('grid-template-columns: repeat(auto-fill, minmax(min(100%, 180px), 1fr))')
    })

    it('should generate grid-auto-fill-md', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-auto-fill-md'])
      expect(css).toContain('grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr))')
    })

    it('should generate grid-auto-fill-lg', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-auto-fill-lg'])
      expect(css).toContain('grid-template-columns: repeat(auto-fill, minmax(min(100%, 350px), 1fr))')
    })
  })

  describe('Masonry Grids', () => {
    it('should generate grid-masonry', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-masonry'])
      expect(css).toContain('display: grid')
      expect(css).toContain('grid-template-rows: masonry')
      expect(css).toContain('grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr))')
    })

    it('should generate grid-masonry-sm', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-masonry-sm'])
      expect(css).toContain('grid-template-rows: masonry')
      expect(css).toContain('grid-template-columns: repeat(auto-fill, minmax(min(100%, 180px), 1fr))')
    })

    it('should generate grid-masonry-md', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-masonry-md'])
      expect(css).toContain('grid-template-rows: masonry')
      expect(css).toContain('grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr))')
    })

    it('should generate grid-masonry-lg', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-masonry-lg'])
      expect(css).toContain('grid-template-rows: masonry')
      expect(css).toContain('grid-template-columns: repeat(auto-fill, minmax(min(100%, 350px), 1fr))')
    })

    it('should generate grid-masonry-tight', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-masonry-tight'])
      expect(css).toContain('grid-template-rows: masonry')
      expect(css).toContain('masonry-auto-flow: next')
    })

    it('should generate grid-masonry-sparse', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-masonry-sparse'])
      expect(css).toContain('grid-template-rows: masonry')
      expect(css).toContain('masonry-auto-flow: definite-next')
    })
  })

  describe('Smart Responsive Grids', () => {
    it('should generate grid-smart', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-smart'])
      expect(css).toContain('display: grid')
      expect(css).toContain('grid-template-columns: repeat(auto-fit, minmax(clamp(200px, 20vw, 300px), 1fr))')
    })

    it('should generate grid-smart-compact', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-smart-compact'])
      expect(css).toContain('grid-template-columns: repeat(auto-fit, minmax(clamp(150px, 15vw, 220px), 1fr))')
    })

    it('should generate grid-smart-spacious', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-smart-spacious'])
      expect(css).toContain('grid-template-columns: repeat(auto-fit, minmax(clamp(280px, 25vw, 400px), 1fr))')
    })
  })

  describe('Dense Grid Packing', () => {
    it('should generate grid-dense', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-dense'])
      expect(css).toContain('grid-auto-flow: dense')
    })

    it('should generate grid-dense-row', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-dense-row'])
      expect(css).toContain('grid-auto-flow: row dense')
    })

    it('should generate grid-dense-column', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-dense-column'])
      expect(css).toContain('grid-auto-flow: column dense')
    })
  })

  describe('Subgrid Support', () => {
    it('should generate grid-subgrid-rows', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-subgrid-rows'])
      expect(css).toContain('grid-template-rows: subgrid')
    })

    it('should generate grid-subgrid-cols', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-subgrid-cols'])
      expect(css).toContain('grid-template-columns: subgrid')
    })

    it('should generate grid-subgrid', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-subgrid'])
      expect(css).toContain('grid-template-rows: subgrid')
      expect(css).toContain('grid-template-columns: subgrid')
    })
  })

  describe('Aspect Ratio Grids', () => {
    it('should generate grid-aspect-square', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-aspect-square'])
      expect(css).toContain('aspect-ratio: 1 / 1')
    })

    it('should generate grid-aspect-video', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-aspect-video'])
      expect(css).toContain('aspect-ratio: 16 / 9')
    })

    it('should generate grid-aspect-photo', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-aspect-photo'])
      expect(css).toContain('aspect-ratio: 4 / 3')
    })

    it('should generate grid-aspect-wide', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-aspect-wide'])
      expect(css).toContain('aspect-ratio: 21 / 9')
    })
  })

  describe('Grid Template Areas (Smart)', () => {
    it('should generate grid-areas-auto', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-areas-auto'])
      expect(css).toContain('display: grid')
      expect(css).toContain('grid-template-columns: repeat(auto-fit, minmax(min(100%, 150px), 1fr))')
      expect(css).toContain('grid-auto-rows: minmax(100px, auto)')
    })

    it('should generate grid-areas-masonry', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-areas-masonry'])
      expect(css).toContain('display: grid')
      expect(css).toContain('grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr))')
      expect(css).toContain('grid-auto-rows: max-content')
      expect(css).toContain('grid-auto-flow: dense')
    })
  })

  describe('Combined Utilities', () => {
    it('should work with gap utilities', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate(['grid-auto-fit', 'gap-4'])
      expect(css).toContain('grid-template-columns')
      // gap-4 should also be present if the spacing plugin is loaded
    })
  })

  describe('Multiple Smart Grid Utilities Together', () => {
    it('should generate combined smart grid layout', () => {
      const coral = createCoral({
        plugins: [smartGridPlugin()]
      })

      const css = coral.generate([
        'grid-auto-fit',
        'gap-4',
        'grid-dense'
      ])
      expect(css).toContain('grid-template-columns')
      expect(css).toContain('grid-auto-flow: dense')
    })
  })
})
