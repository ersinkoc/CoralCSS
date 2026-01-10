/**
 * Layout Plugin Tests
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../src/kernel'
import { layoutPlugin } from '../../../src/plugins/core/utilities/layout'

describe('layoutPlugin', () => {
  let coral: ReturnType<typeof createCoral>

  beforeEach(() => {
    coral = createCoral()
    coral.use(layoutPlugin())
  })

  describe('display', () => {
    it('should generate block', () => {
      const css = coral.generate(['block'])
      expect(css).toContain('display: block')
    })

    it('should generate inline', () => {
      const css = coral.generate(['inline'])
      expect(css).toContain('display: inline')
    })

    it('should generate inline-block', () => {
      const css = coral.generate(['inline-block'])
      expect(css).toContain('display: inline-block')
    })

    it('should generate flex', () => {
      const css = coral.generate(['flex'])
      expect(css).toContain('display: flex')
    })

    it('should generate inline-flex', () => {
      const css = coral.generate(['inline-flex'])
      expect(css).toContain('display: inline-flex')
    })

    it('should generate grid', () => {
      const css = coral.generate(['grid'])
      expect(css).toContain('display: grid')
    })

    it('should generate inline-grid', () => {
      const css = coral.generate(['inline-grid'])
      expect(css).toContain('display: inline-grid')
    })

    it('should generate hidden', () => {
      const css = coral.generate(['hidden'])
      expect(css).toContain('display: none')
    })

    it('should generate table-caption', () => {
      const css = coral.generate(['table-caption'])
      expect(css).toContain('display: table-caption')
    })

    it('should generate table-cell', () => {
      const css = coral.generate(['table-cell'])
      expect(css).toContain('display: table-cell')
    })

    it('should generate table-column', () => {
      const css = coral.generate(['table-column'])
      expect(css).toContain('display: table-column')
    })

    it('should generate table-column-group', () => {
      const css = coral.generate(['table-column-group'])
      expect(css).toContain('display: table-column-group')
    })

    it('should generate table-footer-group', () => {
      const css = coral.generate(['table-footer-group'])
      expect(css).toContain('display: table-footer-group')
    })

    it('should generate table-header-group', () => {
      const css = coral.generate(['table-header-group'])
      expect(css).toContain('display: table-header-group')
    })

    it('should generate table-row-group', () => {
      const css = coral.generate(['table-row-group'])
      expect(css).toContain('display: table-row-group')
    })

    it('should generate flow-root', () => {
      const css = coral.generate(['flow-root'])
      expect(css).toContain('display: flow-root')
    })

    it('should generate list-item', () => {
      const css = coral.generate(['list-item'])
      expect(css).toContain('display: list-item')
    })
  })

  describe('position', () => {
    it('should generate static', () => {
      const css = coral.generate(['static'])
      expect(css).toContain('position: static')
    })

    it('should generate relative', () => {
      const css = coral.generate(['relative'])
      expect(css).toContain('position: relative')
    })

    it('should generate absolute', () => {
      const css = coral.generate(['absolute'])
      expect(css).toContain('position: absolute')
    })

    it('should generate fixed', () => {
      const css = coral.generate(['fixed'])
      expect(css).toContain('position: fixed')
    })

    it('should generate sticky', () => {
      const css = coral.generate(['sticky'])
      expect(css).toContain('position: sticky')
    })
  })

  describe('positioning', () => {
    it('should generate inset-0', () => {
      const css = coral.generate(['inset-0'])
      expect(css).toContain('inset: 0px')
    })

    it('should generate top-0', () => {
      const css = coral.generate(['top-0'])
      expect(css).toContain('top: 0px')
    })

    it('should generate right-0', () => {
      const css = coral.generate(['right-0'])
      expect(css).toContain('right: 0px')
    })

    it('should generate bottom-0', () => {
      const css = coral.generate(['bottom-0'])
      expect(css).toContain('bottom: 0px')
    })

    it('should generate left-0', () => {
      const css = coral.generate(['left-0'])
      expect(css).toContain('left: 0px')
    })
  })

  describe('z-index', () => {
    it('should generate z-0', () => {
      const css = coral.generate(['z-0'])
      expect(css).toContain('z-index: 0')
    })

    it('should generate z-10', () => {
      const css = coral.generate(['z-10'])
      expect(css).toContain('z-index: 10')
    })

    it('should generate z-50', () => {
      const css = coral.generate(['z-50'])
      expect(css).toContain('z-index: 50')
    })

    it('should generate z-auto', () => {
      const css = coral.generate(['z-auto'])
      expect(css).toContain('z-index: auto')
    })
  })

  describe('overflow', () => {
    it('should generate overflow-auto', () => {
      const css = coral.generate(['overflow-auto'])
      expect(css).toContain('overflow: auto')
    })

    it('should generate overflow-hidden', () => {
      const css = coral.generate(['overflow-hidden'])
      expect(css).toContain('overflow: hidden')
    })

    it('should generate overflow-scroll', () => {
      const css = coral.generate(['overflow-scroll'])
      expect(css).toContain('overflow: scroll')
    })

    it('should generate overflow-x-auto', () => {
      const css = coral.generate(['overflow-x-auto'])
      expect(css).toContain('overflow-x: auto')
    })

    it('should generate overflow-y-auto', () => {
      const css = coral.generate(['overflow-y-auto'])
      expect(css).toContain('overflow-y: auto')
    })
  })

  describe('visibility', () => {
    it('should generate visible', () => {
      const css = coral.generate(['visible'])
      expect(css).toContain('visibility: visible')
    })

    it('should generate invisible', () => {
      const css = coral.generate(['invisible'])
      expect(css).toContain('visibility: hidden')
    })

    it('should generate collapse', () => {
      const css = coral.generate(['collapse'])
      expect(css).toContain('visibility: collapse')
    })
  })
})
