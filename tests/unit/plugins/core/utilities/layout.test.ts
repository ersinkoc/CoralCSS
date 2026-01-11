/**
 * Tests for Layout Utilities Plugin
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { layoutPlugin } from '../../../../../src/plugins/core/utilities/layout'
import type { Coral } from '../../../../../src/types'

describe('Layout Utilities Plugin', () => {
  let coral: Coral

  beforeEach(() => {
    coral = createCoral()
    coral.use(layoutPlugin())
  })

  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = layoutPlugin()
      expect(plugin.name).toBe('layout')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Display Utilities', () => {
    it('should generate block', () => {
      const css = coral.generate(['block'])
      expect(css).toContain('display')
      expect(css).toContain('block')
    })

    it('should generate inline-block', () => {
      const css = coral.generate(['inline-block'])
      expect(css).toContain('display')
      expect(css).toContain('inline-block')
    })

    it('should generate flex', () => {
      const css = coral.generate(['flex'])
      expect(css).toContain('display')
      expect(css).toContain('flex')
    })

    it('should generate grid', () => {
      const css = coral.generate(['grid'])
      expect(css).toContain('display')
      expect(css).toContain('grid')
    })

    it('should generate hidden', () => {
      const css = coral.generate(['hidden'])
      expect(css).toContain('display')
      expect(css).toContain('none')
    })
  })

  describe('Position Utilities', () => {
    it('should generate static', () => {
      const css = coral.generate(['static'])
      expect(css).toContain('position')
      expect(css).toContain('static')
    })

    it('should generate fixed', () => {
      const css = coral.generate(['fixed'])
      expect(css).toContain('position')
      expect(css).toContain('fixed')
    })

    it('should generate absolute', () => {
      const css = coral.generate(['absolute'])
      expect(css).toContain('position')
      expect(css).toContain('absolute')
    })

    it('should generate relative', () => {
      const css = coral.generate(['relative'])
      expect(css).toContain('position')
      expect(css).toContain('relative')
    })

    it('should generate sticky', () => {
      const css = coral.generate(['sticky'])
      expect(css).toContain('position')
      expect(css).toContain('sticky')
    })
  })

  describe('Place Content Utilities', () => {
    it('should generate place-content-center', () => {
      const css = coral.generate(['place-content-center'])
      expect(css).toContain('place-content')
      expect(css).toContain('center')
    })

    it('should generate place-content-between', () => {
      const css = coral.generate(['place-content-between'])
      expect(css).toContain('place-content')
      expect(css).toContain('space-between')
    })

    it('should generate place-content-around', () => {
      const css = coral.generate(['place-content-around'])
      expect(css).toContain('place-content')
      expect(css).toContain('space-around')
    })

    it('should generate place-content-evenly', () => {
      const css = coral.generate(['place-content-evenly'])
      expect(css).toContain('place-content')
      expect(css).toContain('space-evenly')
    })
  })

  describe('Inset Logical Properties', () => {
    it('should generate inset-inline-0', () => {
      const css = coral.generate(['inset-inline-0'])
      expect(css).toContain('inset-inline')
      expect(css).toContain('0')
    })

    it('should generate inset-block-0', () => {
      const css = coral.generate(['inset-block-0'])
      expect(css).toContain('inset-block')
      expect(css).toContain('0')
    })

    it('should generate arbitrary inset-inline', () => {
      const css = coral.generate(['inset-inline-[10px]'])
      expect(css).toContain('inset-inline')
      expect(css).toContain('10px')
    })

    it('should generate arbitrary inset-block', () => {
      const css = coral.generate(['inset-block-[20px]'])
      expect(css).toContain('inset-block')
      expect(css).toContain('20px')
    })
  })

  describe('Touch Action Utilities', () => {
    it('should generate touch-auto', () => {
      const css = coral.generate(['touch-auto'])
      expect(css).toContain('touch-action')
      expect(css).toContain('auto')
    })

    it('should generate touch-none', () => {
      const css = coral.generate(['touch-none'])
      expect(css).toContain('touch-action')
      expect(css).toContain('none')
    })

    it('should generate touch-pan-x', () => {
      const css = coral.generate(['touch-pan-x'])
      expect(css).toContain('touch-action')
      expect(css).toContain('pan-x')
    })

    it('should generate touch-manipulation', () => {
      const css = coral.generate(['touch-manipulation'])
      expect(css).toContain('touch-action')
      expect(css).toContain('manipulation')
    })
  })

  describe('Appearance Utilities', () => {
    it('should generate appearance-none', () => {
      const css = coral.generate(['appearance-none'])
      expect(css).toContain('appearance')
      expect(css).toContain('none')
    })

    it('should generate appearance-auto', () => {
      const css = coral.generate(['appearance-auto'])
      expect(css).toContain('appearance')
      expect(css).toContain('auto')
    })
  })

  describe('Z-Index Utilities', () => {
    it('should generate z-10', () => {
      const css = coral.generate(['z-10'])
      expect(css).toContain('z-index')
    })

    it('should generate z-50', () => {
      const css = coral.generate(['z-50'])
      expect(css).toContain('z-index')
    })

    it('should generate -z-10', () => {
      const css = coral.generate(['-z-10'])
      expect(css).toContain('z-index')
      expect(css).toContain('-10')
    })
  })

  describe('Visibility Utilities', () => {
    it('should generate visible', () => {
      const css = coral.generate(['visible'])
      expect(css).toContain('visibility')
      expect(css).toContain('visible')
    })

    it('should generate invisible', () => {
      const css = coral.generate(['invisible'])
      expect(css).toContain('visibility')
      expect(css).toContain('hidden')
    })

    it('should generate collapse', () => {
      const css = coral.generate(['collapse'])
      expect(css).toContain('visibility')
      expect(css).toContain('collapse')
    })
  })

  describe('Z-Index Utilities', () => {
    it('should generate z-0', () => {
      const css = coral.generate(['z-0'])
      expect(css).toContain('z-index')
    })

    it('should generate z-10', () => {
      const css = coral.generate(['z-10'])
      expect(css).toContain('z-index')
    })

    it('should generate z-auto', () => {
      const css = coral.generate(['z-auto'])
      expect(css).toContain('z-index')
    })
  })

  describe('Overflow Utilities', () => {
    it('should generate overflow-auto', () => {
      const css = coral.generate(['overflow-auto'])
      expect(css).toContain('overflow')
    })

    it('should generate overflow-hidden', () => {
      const css = coral.generate(['overflow-hidden'])
      expect(css).toContain('overflow')
    })

    it('should generate overflow-visible', () => {
      const css = coral.generate(['overflow-visible'])
      expect(css).toContain('overflow')
    })

    it('should generate overflow-scroll', () => {
      const css = coral.generate(['overflow-scroll'])
      expect(css).toContain('overflow')
    })
  })

  describe('Touch Action Utilities', () => {
    it('should generate touch-auto', () => {
      const css = coral.generate(['touch-auto'])
      expect(css).toContain('touch-action')
    })

    it('should generate touch-none', () => {
      const css = coral.generate(['touch-none'])
      expect(css).toContain('touch-action')
    })

    it('should generate touch-pan-x', () => {
      const css = coral.generate(['touch-pan-x'])
      expect(css).toContain('touch-action')
    })

    it('should generate touch-pan-left', () => {
      const css = coral.generate(['touch-pan-left'])
      expect(css).toContain('touch-action')
    })

    it('should generate touch-pan-right', () => {
      const css = coral.generate(['touch-pan-right'])
      expect(css).toContain('touch-action')
    })

    it('should generate touch-pan-y', () => {
      const css = coral.generate(['touch-pan-y'])
      expect(css).toContain('touch-action')
    })

    it('should generate touch-pan-up', () => {
      const css = coral.generate(['touch-pan-up'])
      expect(css).toContain('touch-action')
    })

    it('should generate touch-pan-down', () => {
      const css = coral.generate(['touch-pan-down'])
      expect(css).toContain('touch-action')
    })

    it('should generate touch-pinch-zoom', () => {
      const css = coral.generate(['touch-pinch-zoom'])
      expect(css).toContain('touch-action')
    })

    it('should generate touch-manipulation', () => {
      const css = coral.generate(['touch-manipulation'])
      expect(css).toContain('touch-action')
    })
  })

  describe('Caret Color Utilities', () => {
    it('should generate caret-transparent', () => {
      const css = coral.generate(['caret-transparent'])
      expect(css).toContain('caret-color')
    })

    it('should generate caret-current', () => {
      const css = coral.generate(['caret-current'])
      expect(css).toContain('caret-color')
    })

    it('should generate caret-auto', () => {
      const css = coral.generate(['caret-auto'])
      expect(css).toContain('caret-color')
    })

    it('should generate caret-[custom]', () => {
      const css = coral.generate(['caret-[blue]'])
      expect(css).toContain('caret-color')
    })
  })

  describe('Accent Color Utilities', () => {
    it('should generate accent-auto', () => {
      const css = coral.generate(['accent-auto'])
      expect(css).toContain('accent-color')
    })

    it('should generate accent-transparent', () => {
      const css = coral.generate(['accent-transparent'])
      expect(css).toContain('accent-color')
    })

    it('should generate accent-current', () => {
      const css = coral.generate(['accent-current'])
      expect(css).toContain('accent-color')
    })

    it('should generate accent-[custom]', () => {
      const css = coral.generate(['accent-[blue]'])
      expect(css).toContain('accent-color')
    })
  })

  describe('Cursor Utilities', () => {
    it('should generate cursor-[custom]', () => {
      const css = coral.generate(['cursor-[grab]'])
      expect(css).toContain('cursor')
    })
  })

  describe('Table Display Utilities', () => {
    it('should generate table', () => {
      const css = coral.generate(['table'])
      expect(css).toContain('display')
      expect(css).toContain('table')
    })

    it('should generate table-caption', () => {
      const css = coral.generate(['table-caption'])
      expect(css).toContain('display')
      expect(css).toContain('table-caption')
    })

    it('should generate table-cell', () => {
      const css = coral.generate(['table-cell'])
      expect(css).toContain('display')
      expect(css).toContain('table-cell')
    })

    it('should generate table-column', () => {
      const css = coral.generate(['table-column'])
      expect(css).toContain('display')
      expect(css).toContain('table-column')
    })

    it('should generate table-column-group', () => {
      const css = coral.generate(['table-column-group'])
      expect(css).toContain('display')
      expect(css).toContain('table-column-group')
    })

    it('should generate table-footer-group', () => {
      const css = coral.generate(['table-footer-group'])
      expect(css).toContain('display')
      expect(css).toContain('table-footer-group')
    })

    it('should generate table-header-group', () => {
      const css = coral.generate(['table-header-group'])
      expect(css).toContain('display')
      expect(css).toContain('table-header-group')
    })

    it('should generate table-row', () => {
      const css = coral.generate(['table-row'])
      expect(css).toContain('display')
      expect(css).toContain('table-row')
    })

    it('should generate table-row-group', () => {
      const css = coral.generate(['table-row-group'])
      expect(css).toContain('display')
      expect(css).toContain('table-row-group')
    })

    it('should generate flow-root', () => {
      const css = coral.generate(['flow-root'])
      expect(css).toContain('display')
      expect(css).toContain('flow-root')
    })

    it('should generate list-item', () => {
      const css = coral.generate(['list-item'])
      expect(css).toContain('display')
      expect(css).toContain('list-item')
    })
  })

  describe('Display Contents Utilities', () => {
    it('should generate contents', () => {
      const css = coral.generate(['contents'])
      expect(css).toContain('display')
      expect(css).toContain('contents')
    })
  })

  describe('Position Utilities', () => {
    it('should generate static', () => {
      const css = coral.generate(['static'])
      expect(css).toContain('position')
      expect(css).toContain('static')
    })

    it('should generate fixed', () => {
      const css = coral.generate(['fixed'])
      expect(css).toContain('position')
      expect(css).toContain('fixed')
    })

    it('should generate absolute', () => {
      const css = coral.generate(['absolute'])
      expect(css).toContain('position')
      expect(css).toContain('absolute')
    })

    it('should generate relative', () => {
      const css = coral.generate(['relative'])
      expect(css).toContain('position')
      expect(css).toContain('relative')
    })

    it('should generate sticky', () => {
      const css = coral.generate(['sticky'])
      expect(css).toContain('position')
      expect(css).toContain('sticky')
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/utilities/layout'
      )
      expect(defaultExport).toBe(layoutPlugin)
    })
  })
})
