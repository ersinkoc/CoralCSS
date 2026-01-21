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

  describe('Float and Clear Utilities', () => {
    it('should generate float-left', () => {
      const css = coral.generate(['float-left'])
      expect(css).toContain('float')
      expect(css).toContain('left')
    })

    it('should generate float-right', () => {
      const css = coral.generate(['float-right'])
      expect(css).toContain('float')
      expect(css).toContain('right')
    })

    it('should generate float-start', () => {
      const css = coral.generate(['float-start'])
      expect(css).toContain('float')
      expect(css).toContain('inline-start')
    })

    it('should generate float-none', () => {
      const css = coral.generate(['float-none'])
      expect(css).toContain('float')
      expect(css).toContain('none')
    })

    it('should generate clear-both', () => {
      const css = coral.generate(['clear-both'])
      expect(css).toContain('clear')
      expect(css).toContain('both')
    })

    it('should generate clear-left', () => {
      const css = coral.generate(['clear-left'])
      expect(css).toContain('clear')
      expect(css).toContain('left')
    })
  })

  describe('Isolation Utilities', () => {
    it('should generate isolate', () => {
      const css = coral.generate(['isolate'])
      expect(css).toContain('isolation')
      expect(css).toContain('isolate')
    })

    it('should generate isolation-auto', () => {
      const css = coral.generate(['isolation-auto'])
      expect(css).toContain('isolation')
      expect(css).toContain('auto')
    })
  })

  describe('Object Fit and Position', () => {
    it('should generate object-contain', () => {
      const css = coral.generate(['object-contain'])
      expect(css).toContain('object-fit')
      expect(css).toContain('contain')
    })

    it('should generate object-cover', () => {
      const css = coral.generate(['object-cover'])
      expect(css).toContain('object-fit')
      expect(css).toContain('cover')
    })

    it('should generate object-fill', () => {
      const css = coral.generate(['object-fill'])
      expect(css).toContain('object-fit')
      expect(css).toContain('fill')
    })

    it('should generate object-none', () => {
      const css = coral.generate(['object-none'])
      expect(css).toContain('object-fit')
      expect(css).toContain('none')
    })

    it('should generate object-scale-down', () => {
      const css = coral.generate(['object-scale-down'])
      expect(css).toContain('object-fit')
      expect(css).toContain('scale-down')
    })

    it('should generate object-bottom', () => {
      const css = coral.generate(['object-bottom'])
      expect(css).toContain('object-position')
      expect(css).toContain('bottom')
    })

    it('should generate object-center', () => {
      const css = coral.generate(['object-center'])
      expect(css).toContain('object-position')
      expect(css).toContain('center')
    })

    it('should generate object-left-top', () => {
      const css = coral.generate(['object-left-top'])
      expect(css).toContain('object-position')
      expect(css).toContain('left top')
    })
  })

  describe('Overflow XY Utilities', () => {
    it('should generate overflow-x-auto', () => {
      const css = coral.generate(['overflow-x-auto'])
      expect(css).toContain('overflow-x')
      expect(css).toContain('auto')
    })

    it('should generate overflow-y-scroll', () => {
      const css = coral.generate(['overflow-y-scroll'])
      expect(css).toContain('overflow-y')
      expect(css).toContain('scroll')
    })

    it('should generate overflow-clip', () => {
      const css = coral.generate(['overflow-clip'])
      expect(css).toContain('overflow')
      expect(css).toContain('clip')
    })
  })

  describe('Overscroll Utilities', () => {
    it('should generate overscroll-auto', () => {
      const css = coral.generate(['overscroll-auto'])
      expect(css).toContain('overscroll-behavior')
      expect(css).toContain('auto')
    })

    it('should generate overscroll-contain', () => {
      const css = coral.generate(['overscroll-contain'])
      expect(css).toContain('overscroll-behavior')
      expect(css).toContain('contain')
    })

    it('should generate overscroll-none', () => {
      const css = coral.generate(['overscroll-none'])
      expect(css).toContain('overscroll-behavior')
      expect(css).toContain('none')
    })

    it('should generate overscroll-x-auto', () => {
      const css = coral.generate(['overscroll-x-auto'])
      expect(css).toContain('overscroll-behavior-x')
    })

    it('should generate overscroll-y-contain', () => {
      const css = coral.generate(['overscroll-y-contain'])
      expect(css).toContain('overscroll-behavior-y')
    })
  })

  describe('Box Sizing', () => {
    it('should generate box-border', () => {
      const css = coral.generate(['box-border'])
      expect(css).toContain('box-sizing')
      expect(css).toContain('border-box')
    })

    it('should generate box-content', () => {
      const css = coral.generate(['box-content'])
      expect(css).toContain('box-sizing')
      expect(css).toContain('content-box')
    })
  })

  describe('Container and Aspect Ratio', () => {
    it('should generate container', () => {
      const css = coral.generate(['container'])
      expect(css).toContain('width')
      expect(css).toContain('100%')
      expect(css).toContain('margin-left')
      expect(css).toContain('auto')
    })

    it('should generate aspect-auto', () => {
      const css = coral.generate(['aspect-auto'])
      expect(css).toContain('aspect-ratio')
      expect(css).toContain('auto')
    })

    it('should generate aspect-square', () => {
      const css = coral.generate(['aspect-square'])
      expect(css).toContain('aspect-ratio')
      expect(css).toContain('1 / 1')
    })

    it('should generate aspect-video', () => {
      const css = coral.generate(['aspect-video'])
      expect(css).toContain('aspect-ratio')
      expect(css).toContain('16 / 9')
    })
  })

  describe('Columns Utilities', () => {
    it('should generate columns-1', () => {
      const css = coral.generate(['columns-1'])
      expect(css).toContain('columns')
      expect(css).toContain('1')
    })

    it('should generate columns-6', () => {
      const css = coral.generate(['columns-6'])
      expect(css).toContain('columns')
      expect(css).toContain('6')
    })

    it('should generate columns-auto', () => {
      const css = coral.generate(['columns-auto'])
      expect(css).toContain('columns')
      expect(css).toContain('auto')
    })

    it('should generate columns-xs', () => {
      const css = coral.generate(['columns-xs'])
      expect(css).toContain('columns')
      expect(css).toContain('20rem')
    })
  })

  describe('Break Utilities', () => {
    it('should generate break-after-auto', () => {
      const css = coral.generate(['break-after-auto'])
      expect(css).toContain('break-after')
      expect(css).toContain('auto')
    })

    it('should generate break-after-page', () => {
      const css = coral.generate(['break-after-page'])
      expect(css).toContain('break-after')
      expect(css).toContain('page')
    })

    it('should generate break-before-avoid', () => {
      const css = coral.generate(['break-before-avoid'])
      expect(css).toContain('break-before')
      expect(css).toContain('avoid')
    })

    it('should generate break-inside-avoid', () => {
      const css = coral.generate(['break-inside-avoid'])
      expect(css).toContain('break-inside')
      expect(css).toContain('avoid')
    })
  })

  describe('Scroll Snap Utilities', () => {
    it('should generate snap-none', () => {
      const css = coral.generate(['snap-none'])
      expect(css).toContain('scroll-snap-type')
      expect(css).toContain('none')
    })

    it('should generate snap-x', () => {
      const css = coral.generate(['snap-x'])
      expect(css).toContain('scroll-snap-type')
      expect(css).toContain('x')
    })

    it('should generate snap-y', () => {
      const css = coral.generate(['snap-y'])
      expect(css).toContain('scroll-snap-type')
      expect(css).toContain('y')
    })

    it('should generate snap-both', () => {
      const css = coral.generate(['snap-both'])
      expect(css).toContain('scroll-snap-type')
      expect(css).toContain('both')
    })

    it('should generate snap-mandatory', () => {
      const css = coral.generate(['snap-mandatory'])
      expect(css).toContain('--coral-scroll-snap-strictness')
      expect(css).toContain('mandatory')
    })

    it('should generate snap-proximity', () => {
      const css = coral.generate(['snap-proximity'])
      expect(css).toContain('--coral-scroll-snap-strictness')
      expect(css).toContain('proximity')
    })

    it('should generate snap-start', () => {
      const css = coral.generate(['snap-start'])
      expect(css).toContain('scroll-snap-align')
      expect(css).toContain('start')
    })

    it('should generate snap-end', () => {
      const css = coral.generate(['snap-end'])
      expect(css).toContain('scroll-snap-align')
      expect(css).toContain('end')
    })

    it('should generate snap-center', () => {
      const css = coral.generate(['snap-center'])
      expect(css).toContain('scroll-snap-align')
      expect(css).toContain('center')
    })

    it('should generate snap-align-none', () => {
      const css = coral.generate(['snap-align-none'])
      expect(css).toContain('scroll-snap-align')
      expect(css).toContain('none')
    })

    it('should generate snap-normal', () => {
      const css = coral.generate(['snap-normal'])
      expect(css).toContain('scroll-snap-stop')
      expect(css).toContain('normal')
    })

    it('should generate snap-always', () => {
      const css = coral.generate(['snap-always'])
      expect(css).toContain('scroll-snap-stop')
      expect(css).toContain('always')
    })
  })

  describe('Scroll Margin Utilities', () => {
    it('should generate scroll-m-4', () => {
      const css = coral.generate(['scroll-m-4'])
      expect(css).toContain('scroll-margin')
    })

    it('should generate scroll-mx-4', () => {
      const css = coral.generate(['scroll-mx-4'])
      expect(css).toContain('scroll-margin-left')
      expect(css).toContain('scroll-margin-right')
    })

    it('should generate scroll-my-8', () => {
      const css = coral.generate(['scroll-my-8'])
      expect(css).toContain('scroll-margin-top')
      expect(css).toContain('scroll-margin-bottom')
    })

    it('should generate scroll-mt-2', () => {
      const css = coral.generate(['scroll-mt-2'])
      expect(css).toContain('scroll-margin-top')
    })

    it('should generate scroll-ms-6', () => {
      const css = coral.generate(['scroll-ms-6'])
      expect(css).toContain('scroll-margin-inline-start')
    })

    it('should generate scroll-me-10', () => {
      const css = coral.generate(['scroll-me-10'])
      expect(css).toContain('scroll-margin-inline-end')
    })
  })

  describe('Scroll Padding Utilities', () => {
    it('should generate scroll-p-4', () => {
      const css = coral.generate(['scroll-p-4'])
      expect(css).toContain('scroll-padding')
    })

    it('should generate scroll-px-4', () => {
      const css = coral.generate(['scroll-px-4'])
      expect(css).toContain('scroll-padding-left')
      expect(css).toContain('scroll-padding-right')
    })

    it('should generate scroll-py-8', () => {
      const css = coral.generate(['scroll-py-8'])
      expect(css).toContain('scroll-padding-top')
      expect(css).toContain('scroll-padding-bottom')
    })

    it('should generate scroll-pt-2', () => {
      const css = coral.generate(['scroll-pt-2'])
      expect(css).toContain('scroll-padding-top')
    })

    it('should generate scroll-ps-6', () => {
      const css = coral.generate(['scroll-ps-6'])
      expect(css).toContain('scroll-padding-inline-start')
    })

    it('should generate scroll-pe-10', () => {
      const css = coral.generate(['scroll-pe-10'])
      expect(css).toContain('scroll-padding-inline-end')
    })

    it('should generate arbitrary scroll-p-[20px]', () => {
      const css = coral.generate(['scroll-p-[20px]'])
      expect(css).toContain('scroll-padding')
      expect(css).toContain('20px')
    })

    it('should return null for empty scroll-p-[]', () => {
      const css = coral.generate(['scroll-p-[]'])
      expect(css).toBe('')
    })
  })

  describe('Scroll Behavior Utilities', () => {
    it('should generate scroll-smooth', () => {
      const css = coral.generate(['scroll-smooth'])
      expect(css).toContain('scroll-behavior')
      expect(css).toContain('smooth')
    })

    it('should generate scroll-auto', () => {
      const css = coral.generate(['scroll-auto'])
      expect(css).toContain('scroll-behavior')
      expect(css).toContain('auto')
    })

    it('should generate scroll-timeline-x', () => {
      const css = coral.generate(['scroll-timeline-x'])
      expect(css).toContain('scroll-timeline-axis')
      expect(css).toContain('x')
    })

    it('should generate scroll-timeline-y', () => {
      const css = coral.generate(['scroll-timeline-y'])
      expect(css).toContain('scroll-timeline-axis')
      expect(css).toContain('y')
    })

    it('should generate arbitrary scroll-timeline-[name]', () => {
      const css = coral.generate(['scroll-timeline-[myTimeline]'])
      expect(css).toContain('scroll-timeline-name')
      expect(css).toContain('myTimeline')
    })

    it('should return null for empty scroll-timeline-[]', () => {
      const css = coral.generate(['scroll-timeline-[]'])
      expect(css).toBe('')
    })
  })

  describe('View Transition Utilities', () => {
    it('should generate view-transition-none', () => {
      const css = coral.generate(['view-transition-none'])
      expect(css).toContain('view-transition-name')
      expect(css).toContain('none')
    })

    it('should generate arbitrary view-transition-[name]', () => {
      const css = coral.generate(['view-transition-[myTransition]'])
      expect(css).toContain('view-transition-name')
      expect(css).toContain('myTransition')
    })

    it('should return null for empty view-transition-[]', () => {
      const css = coral.generate(['view-transition-[]'])
      expect(css).toBe('')
    })
  })

  describe('Contain Utilities', () => {
    it('should generate contain-none', () => {
      const css = coral.generate(['contain-none'])
      expect(css).toContain('contain')
      expect(css).toContain('none')
    })

    it('should generate contain-strict', () => {
      const css = coral.generate(['contain-strict'])
      expect(css).toContain('contain')
      expect(css).toContain('strict')
    })

    it('should generate contain-content', () => {
      const css = coral.generate(['contain-content'])
      expect(css).toContain('contain')
      expect(css).toContain('content')
    })

    it('should generate contain-size', () => {
      const css = coral.generate(['contain-size'])
      expect(css).toContain('contain')
      expect(css).toContain('size')
    })

    it('should generate contain-layout', () => {
      const css = coral.generate(['contain-layout'])
      expect(css).toContain('contain')
      expect(css).toContain('layout')
    })

    it('should generate contain-style', () => {
      const css = coral.generate(['contain-style'])
      expect(css).toContain('contain')
      expect(css).toContain('style')
    })

    it('should generate contain-paint', () => {
      const css = coral.generate(['contain-paint'])
      expect(css).toContain('contain')
      expect(css).toContain('paint')
    })
  })

  describe('Will Change Utilities', () => {
    it('should generate will-change-auto', () => {
      const css = coral.generate(['will-change-auto'])
      expect(css).toContain('will-change')
      expect(css).toContain('auto')
    })

    it('should generate will-change-scroll', () => {
      const css = coral.generate(['will-change-scroll'])
      expect(css).toContain('will-change')
      expect(css).toContain('scroll-position')
    })

    it('should generate will-change-contents', () => {
      const css = coral.generate(['will-change-contents'])
      expect(css).toContain('will-change')
      expect(css).toContain('contents')
    })

    it('should generate will-change-transform', () => {
      const css = coral.generate(['will-change-transform'])
      expect(css).toContain('will-change')
      expect(css).toContain('transform')
    })

    it('should generate will-change-opacity', () => {
      const css = coral.generate(['will-change-opacity'])
      expect(css).toContain('will-change')
      expect(css).toContain('opacity')
    })

    it('should generate arbitrary will-change-[filter]', () => {
      const css = coral.generate(['will-change-[filter]'])
      expect(css).toContain('will-change')
      expect(css).toContain('filter')
    })

    it('should return null for empty will-change-[]', () => {
      const css = coral.generate(['will-change-[]'])
      expect(css).toBe('')
    })
  })

  describe('Writing Mode and Text Orientation', () => {
    it('should generate writing-horizontal-tb', () => {
      const css = coral.generate(['writing-horizontal-tb'])
      expect(css).toContain('writing-mode')
      expect(css).toContain('horizontal-tb')
    })

    it('should generate writing-vertical-rl', () => {
      const css = coral.generate(['writing-vertical-rl'])
      expect(css).toContain('writing-mode')
      expect(css).toContain('vertical-rl')
    })

    it('should generate writing-vertical-lr', () => {
      const css = coral.generate(['writing-vertical-lr'])
      expect(css).toContain('writing-mode')
      expect(css).toContain('vertical-lr')
    })

    it('should generate text-orientation-mixed', () => {
      const css = coral.generate(['text-orientation-mixed'])
      expect(css).toContain('text-orientation')
      expect(css).toContain('mixed')
    })

    it('should generate text-orientation-upright', () => {
      const css = coral.generate(['text-orientation-upright'])
      expect(css).toContain('text-orientation')
      expect(css).toContain('upright')
    })

    it('should generate text-orientation-sideways', () => {
      const css = coral.generate(['text-orientation-sideways'])
      expect(css).toContain('text-orientation')
      expect(css).toContain('sideways')
    })

    it('should generate direction-ltr', () => {
      const css = coral.generate(['direction-ltr'])
      expect(css).toContain('direction')
      expect(css).toContain('ltr')
    })

    it('should generate direction-rtl', () => {
      const css = coral.generate(['direction-rtl'])
      expect(css).toContain('direction')
      expect(css).toContain('rtl')
    })
  })

  describe('Print Utilities', () => {
    it('should generate print-color-adjust-exact', () => {
      const css = coral.generate(['print-color-adjust-exact'])
      expect(css).toContain('print-color-adjust')
      expect(css).toContain('exact')
    })

    it('should generate print-color-adjust-economy', () => {
      const css = coral.generate(['print-color-adjust-economy'])
      expect(css).toContain('print-color-adjust')
      expect(css).toContain('economy')
    })
  })

  describe('Column Gap Utilities', () => {
    it('should generate column-gap-4', () => {
      const css = coral.generate(['column-gap-4'])
      expect(css).toContain('column-gap')
    })

    it('should generate column-gap-0', () => {
      const css = coral.generate(['column-gap-0'])
      expect(css).toContain('column-gap')
      expect(css).toContain('0px')
    })

    it('should generate column-gap-normal', () => {
      const css = coral.generate(['column-gap-normal'])
      expect(css).toContain('column-gap')
      expect(css).toContain('normal')
    })

    it('should generate arbitrary column-gap-[20px]', () => {
      const css = coral.generate(['column-gap-[20px]'])
      expect(css).toContain('column-gap')
      expect(css).toContain('20px')
    })

    it('should return null for empty column-gap-[]', () => {
      const css = coral.generate(['column-gap-[]'])
      expect(css).toBe('')
    })
  })

  describe('Column Rule Utilities', () => {
    it('should generate column-rule-none', () => {
      const css = coral.generate(['column-rule-none'])
      expect(css).toContain('column-rule')
      expect(css).toContain('none')
    })

    it('should generate column-rule', () => {
      const css = coral.generate(['column-rule'])
      expect(css).toContain('column-rule')
      expect(css).toContain('1px solid currentColor')
    })

    it('should generate column-rule-solid', () => {
      const css = coral.generate(['column-rule-solid'])
      expect(css).toContain('column-rule-style')
      expect(css).toContain('solid')
    })

    it('should generate column-rule-dashed', () => {
      const css = coral.generate(['column-rule-dashed'])
      expect(css).toContain('column-rule-style')
      expect(css).toContain('dashed')
    })

    it('should generate column-rule-w-4', () => {
      const css = coral.generate(['column-rule-w-4'])
      expect(css).toContain('column-rule-width')
      expect(css).toContain('4px')
    })

    it('should generate column-span-all', () => {
      const css = coral.generate(['column-span-all'])
      expect(css).toContain('column-span')
      expect(css).toContain('all')
    })

    it('should generate column-fill-auto', () => {
      const css = coral.generate(['column-fill-auto'])
      expect(css).toContain('column-fill')
      expect(css).toContain('auto')
    })

    it('should generate column-width-sm', () => {
      const css = coral.generate(['column-width-sm'])
      expect(css).toContain('column-width')
      expect(css).toContain('24rem')
    })
  })

  describe('Content Visibility Utilities', () => {
    it('should generate content-visibility-auto', () => {
      const css = coral.generate(['content-visibility-auto'])
      expect(css).toContain('content-visibility')
      expect(css).toContain('auto')
    })

    it('should generate content-visibility-hidden', () => {
      const css = coral.generate(['content-visibility-hidden'])
      expect(css).toContain('content-visibility')
      expect(css).toContain('hidden')
    })

    it('should generate content-visibility-visible', () => {
      const css = coral.generate(['content-visibility-visible'])
      expect(css).toContain('content-visibility')
      expect(css).toContain('visible')
    })
  })

  describe('Contain Intrinsic Size Utilities', () => {
    it('should generate contain-intrinsic-size-none', () => {
      const css = coral.generate(['contain-intrinsic-size-none'])
      expect(css).toContain('contain-intrinsic-size')
      expect(css).toContain('none')
    })

    it('should generate contain-intrinsic-size-auto', () => {
      const css = coral.generate(['contain-intrinsic-size-auto'])
      expect(css).toContain('contain-intrinsic-size')
      expect(css).toContain('auto')
    })

    it('should generate contain-intrinsic-size-md', () => {
      const css = coral.generate(['contain-intrinsic-size-md'])
      expect(css).toContain('contain-intrinsic-size')
      expect(css).toContain('28rem')
    })

    it('should generate arbitrary contain-intrinsic-size-[100px]', () => {
      const css = coral.generate(['contain-intrinsic-size-[100px]'])
      expect(css).toContain('contain-intrinsic-size')
      expect(css).toContain('100px')
    })

    it('should return null for empty contain-intrinsic-size-[]', () => {
      const css = coral.generate(['contain-intrinsic-size-[]'])
      expect(css).toBe('')
    })
  })

  describe('Extended Aspect Ratios', () => {
    it('should generate aspect-[4/3]', () => {
      const css = coral.generate(['aspect-[4/3]'])
      expect(css).toContain('aspect-ratio')
      expect(css).toContain('4 / 3')
    })

    it('should generate aspect-[3/2]', () => {
      const css = coral.generate(['aspect-[3/2]'])
      expect(css).toContain('aspect-ratio')
      expect(css).toContain('3 / 2')
    })

    it('should generate aspect-[9/16]', () => {
      const css = coral.generate(['aspect-[9/16]'])
      expect(css).toContain('aspect-ratio')
      expect(css).toContain('9 / 16')
    })

    it('should generate aspect-golden', () => {
      const css = coral.generate(['aspect-golden'])
      expect(css).toContain('aspect-ratio')
      expect(css).toContain('1.618 / 1')
    })

    it('should generate aspect-cinema', () => {
      const css = coral.generate(['aspect-cinema'])
      expect(css).toContain('aspect-ratio')
      expect(css).toContain('2.35 / 1')
    })
  })

  describe('Blend Mode Utilities', () => {
    it('should generate mix-blend-normal', () => {
      const css = coral.generate(['mix-blend-normal'])
      expect(css).toContain('mix-blend-mode')
      expect(css).toContain('normal')
    })

    it('should generate mix-blend-multiply', () => {
      const css = coral.generate(['mix-blend-multiply'])
      expect(css).toContain('mix-blend-mode')
      expect(css).toContain('multiply')
    })

    it('should generate mix-blend-screen', () => {
      const css = coral.generate(['mix-blend-screen'])
      expect(css).toContain('mix-blend-mode')
      expect(css).toContain('screen')
    })

    it('should generate bg-blend-normal', () => {
      const css = coral.generate(['bg-blend-normal'])
      expect(css).toContain('background-blend-mode')
      expect(css).toContain('normal')
    })

    it('should generate bg-blend-multiply', () => {
      const css = coral.generate(['bg-blend-multiply'])
      expect(css).toContain('background-blend-mode')
      expect(css).toContain('multiply')
    })
  })

  describe('Pointer Events Utilities', () => {
    it('should generate pointer-events-none', () => {
      const css = coral.generate(['pointer-events-none'])
      expect(css).toContain('pointer-events')
      expect(css).toContain('none')
    })

    it('should generate pointer-events-auto', () => {
      const css = coral.generate(['pointer-events-auto'])
      expect(css).toContain('pointer-events')
      expect(css).toContain('auto')
    })

    it('should generate pointer-events-visible', () => {
      const css = coral.generate(['pointer-events-visible'])
      expect(css).toContain('pointer-events')
      expect(css).toContain('visible')
    })
  })

  describe('User Select Utilities', () => {
    it('should generate select-none', () => {
      const css = coral.generate(['select-none'])
      expect(css).toContain('user-select')
      expect(css).toContain('none')
    })

    it('should generate select-text', () => {
      const css = coral.generate(['select-text'])
      expect(css).toContain('user-select')
      expect(css).toContain('text')
    })

    it('should generate select-all', () => {
      const css = coral.generate(['select-all'])
      expect(css).toContain('user-select')
      expect(css).toContain('all')
    })
  })

  describe('Place Items and Self Utilities', () => {
    it('should generate place-items-center', () => {
      const css = coral.generate(['place-items-center'])
      expect(css).toContain('place-items')
      expect(css).toContain('center')
    })

    it('should generate place-items-start', () => {
      const css = coral.generate(['place-items-start'])
      expect(css).toContain('place-items')
      expect(css).toContain('start')
    })

    it('should generate place-self-center', () => {
      const css = coral.generate(['place-self-center'])
      expect(css).toContain('place-self')
      expect(css).toContain('center')
    })

    it('should generate place-self-auto', () => {
      const css = coral.generate(['place-self-auto'])
      expect(css).toContain('place-self')
      expect(css).toContain('auto')
    })
  })

  describe('Scrollbar Gutter Utilities', () => {
    it('should generate scrollbar-gutter-auto', () => {
      const css = coral.generate(['scrollbar-gutter-auto'])
      expect(css).toContain('scrollbar-gutter')
      expect(css).toContain('auto')
    })

    it('should generate scrollbar-gutter-stable', () => {
      const css = coral.generate(['scrollbar-gutter-stable'])
      expect(css).toContain('scrollbar-gutter')
      expect(css).toContain('stable')
    })

    it('should generate scrollbar-gutter-stable-both', () => {
      const css = coral.generate(['scrollbar-gutter-stable-both'])
      expect(css).toContain('scrollbar-gutter')
      expect(css).toContain('stable both-edges')
    })
  })

  describe('Overflow Anchor and Clip Margin', () => {
    it('should generate overflow-anchor-auto', () => {
      const css = coral.generate(['overflow-anchor-auto'])
      expect(css).toContain('overflow-anchor')
      expect(css).toContain('auto')
    })

    it('should generate overflow-anchor-none', () => {
      const css = coral.generate(['overflow-anchor-none'])
      expect(css).toContain('overflow-anchor')
      expect(css).toContain('none')
    })

    it('should generate overflow-clip-margin-content', () => {
      const css = coral.generate(['overflow-clip-margin-content'])
      expect(css).toContain('overflow-clip-margin')
      expect(css).toContain('content-box')
    })

    it('should generate overflow-clip-margin-padding', () => {
      const css = coral.generate(['overflow-clip-margin-padding'])
      expect(css).toContain('overflow-clip-margin')
      expect(css).toContain('padding-box')
    })

    it('should generate arbitrary overflow-clip-margin-[10px]', () => {
      const css = coral.generate(['overflow-clip-margin-[10px]'])
      expect(css).toContain('overflow-clip-margin')
      expect(css).toContain('10px')
    })

    it('should return null for empty overflow-clip-margin-[]', () => {
      const css = coral.generate(['overflow-clip-margin-[]'])
      expect(css).toBe('')
    })
  })

  describe('Rendering Utilities', () => {
    it('should generate image-render-auto', () => {
      const css = coral.generate(['image-render-auto'])
      expect(css).toContain('image-rendering')
      expect(css).toContain('auto')
    })

    it('should generate image-render-pixelated', () => {
      const css = coral.generate(['image-render-pixelated'])
      expect(css).toContain('image-rendering')
      expect(css).toContain('pixelated')
    })

    it('should generate shape-render-auto', () => {
      const css = coral.generate(['shape-render-auto'])
      expect(css).toContain('shape-rendering')
      expect(css).toContain('auto')
    })

    it('should generate shape-render-speed', () => {
      const css = coral.generate(['shape-render-speed'])
      expect(css).toContain('shape-rendering')
      expect(css).toContain('optimizeSpeed')
    })

    it('should generate text-render-auto', () => {
      const css = coral.generate(['text-render-auto'])
      expect(css).toContain('text-rendering')
      expect(css).toContain('auto')
    })

    it('should generate text-render-legibility', () => {
      const css = coral.generate(['text-render-legibility'])
      expect(css).toContain('text-rendering')
      expect(css).toContain('optimizeLegibility')
    })

    it('should generate color-render-auto', () => {
      const css = coral.generate(['color-render-auto'])
      expect(css).toContain('color-rendering')
      expect(css).toContain('auto')
    })

    it('should generate forced-color-adjust-auto', () => {
      const css = coral.generate(['forced-color-adjust-auto'])
      expect(css).toContain('forced-color-adjust')
      expect(css).toContain('auto')
    })

    it('should generate forced-color-adjust-none', () => {
      const css = coral.generate(['forced-color-adjust-none'])
      expect(css).toContain('forced-color-adjust')
      expect(css).toContain('none')
    })
  })

  describe('Color Scheme Utilities', () => {
    it('should generate color-scheme-normal', () => {
      const css = coral.generate(['color-scheme-normal'])
      expect(css).toContain('color-scheme')
      expect(css).toContain('normal')
    })

    it('should generate color-scheme-light', () => {
      const css = coral.generate(['color-scheme-light'])
      expect(css).toContain('color-scheme')
      expect(css).toContain('light')
    })

    it('should generate color-scheme-dark', () => {
      const css = coral.generate(['color-scheme-dark'])
      expect(css).toContain('color-scheme')
      expect(css).toContain('dark')
    })

    it('should generate color-scheme-light-dark', () => {
      const css = coral.generate(['color-scheme-light-dark'])
      expect(css).toContain('color-scheme')
      expect(css).toContain('light dark')
    })
  })

  describe('Resize Utilities', () => {
    it('should generate resize-none', () => {
      const css = coral.generate(['resize-none'])
      expect(css).toContain('resize')
      expect(css).toContain('none')
    })

    it('should generate resize', () => {
      const css = coral.generate(['resize'])
      expect(css).toContain('resize')
      expect(css).toContain('both')
    })

    it('should generate resize-x', () => {
      const css = coral.generate(['resize-x'])
      expect(css).toContain('resize')
      expect(css).toContain('horizontal')
    })

    it('should generate resize-y', () => {
      const css = coral.generate(['resize-y'])
      expect(css).toContain('resize')
      expect(css).toContain('vertical')
    })

    it('should generate resize-block', () => {
      const css = coral.generate(['resize-block'])
      expect(css).toContain('resize')
      expect(css).toContain('block')
    })

    it('should generate resize-inline', () => {
      const css = coral.generate(['resize-inline'])
      expect(css).toContain('resize')
      expect(css).toContain('inline')
    })
  })

  describe('Extended Cursor Utilities', () => {
    it('should generate cursor-wait', () => {
      const css = coral.generate(['cursor-wait'])
      expect(css).toContain('cursor')
      expect(css).toContain('wait')
    })

    it('should generate cursor-text', () => {
      const css = coral.generate(['cursor-text'])
      expect(css).toContain('cursor')
      expect(css).toContain('text')
    })

    it('should generate cursor-move', () => {
      const css = coral.generate(['cursor-move'])
      expect(css).toContain('cursor')
      expect(css).toContain('move')
    })

    it('should generate cursor-help', () => {
      const css = coral.generate(['cursor-help'])
      expect(css).toContain('cursor')
      expect(css).toContain('help')
    })

    it('should generate cursor-not-allowed', () => {
      const css = coral.generate(['cursor-not-allowed'])
      expect(css).toContain('cursor')
      expect(css).toContain('not-allowed')
    })

    it('should generate cursor-progress', () => {
      const css = coral.generate(['cursor-progress'])
      expect(css).toContain('cursor')
      expect(css).toContain('progress')
    })

    it('should generate cursor-grab', () => {
      const css = coral.generate(['cursor-grab'])
      expect(css).toContain('cursor')
      expect(css).toContain('grab')
    })

    it('should generate cursor-grabbing', () => {
      const css = coral.generate(['cursor-grabbing'])
      expect(css).toContain('cursor')
      expect(css).toContain('grabbing')
    })

    it('should generate cursor-crosshair', () => {
      const css = coral.generate(['cursor-crosshair'])
      expect(css).toContain('cursor')
      expect(css).toContain('crosshair')
    })

    it('should generate cursor-zoom-in', () => {
      const css = coral.generate(['cursor-zoom-in'])
      expect(css).toContain('cursor')
      expect(css).toContain('zoom-in')
    })

    it('should generate cursor-zoom-out', () => {
      const css = coral.generate(['cursor-zoom-out'])
      expect(css).toContain('cursor')
      expect(css).toContain('zoom-out')
    })

    it('should generate arbitrary cursor-[url(cursor.png)]', () => {
      const css = coral.generate(['cursor-[url(cursor.png)_auto]'])
      expect(css).toContain('cursor')
    })

    it('should return null for empty cursor-[]', () => {
      const css = coral.generate(['cursor-[]'])
      expect(css).toBe('')
    })
  })

  describe('Extended Touch Action', () => {
    it('should generate touch-pan-left', () => {
      const css = coral.generate(['touch-pan-left'])
      expect(css).toContain('touch-action')
      expect(css).toContain('pan-left')
    })

    it('should generate touch-pan-right', () => {
      const css = coral.generate(['touch-pan-right'])
      expect(css).toContain('touch-action')
      expect(css).toContain('pan-right')
    })

    it('should generate touch-pan-up', () => {
      const css = coral.generate(['touch-pan-up'])
      expect(css).toContain('touch-action')
      expect(css).toContain('pan-up')
    })

    it('should generate touch-pan-down', () => {
      const css = coral.generate(['touch-pan-down'])
      expect(css).toContain('touch-action')
      expect(css).toContain('pan-down')
    })
  })

  describe('Caret Color Arbitrary', () => {
    it('should generate arbitrary caret-[red]', () => {
      const css = coral.generate(['caret-[red]'])
      expect(css).toContain('caret-color')
      expect(css).toContain('red')
    })

    it('should return null for empty caret-[]', () => {
      const css = coral.generate(['caret-[]'])
      expect(css).toBe('')
    })
  })

  describe('Accent Color Arbitrary', () => {
    it('should generate arbitrary accent-[blue]', () => {
      const css = coral.generate(['accent-[blue]'])
      expect(css).toContain('accent-color')
      expect(css).toContain('blue')
    })

    it('should return null for empty accent-[]', () => {
      const css = coral.generate(['accent-[]'])
      expect(css).toBe('')
    })
  })

  describe('Extended Appearance', () => {
    it('should generate appearance-textfield', () => {
      const css = coral.generate(['appearance-textfield'])
      expect(css).toContain('appearance')
      expect(css).toContain('textfield')
    })

    it('should generate appearance-menulist-button', () => {
      const css = coral.generate(['appearance-menulist-button'])
      expect(css).toContain('appearance')
      expect(css).toContain('menulist-button')
    })
  })

  describe('Field Sizing', () => {
    it('should generate field-sizing-fixed', () => {
      const css = coral.generate(['field-sizing-fixed'])
      expect(css).toContain('field-sizing')
      expect(css).toContain('fixed')
    })

    it('should generate field-sizing-content', () => {
      const css = coral.generate(['field-sizing-content'])
      expect(css).toContain('field-sizing')
      expect(css).toContain('content')
    })
  })

  describe('Math Style and Depth', () => {
    it('should generate math-style-normal', () => {
      const css = coral.generate(['math-style-normal'])
      expect(css).toContain('math-style')
      expect(css).toContain('normal')
    })

    it('should generate math-style-compact', () => {
      const css = coral.generate(['math-style-compact'])
      expect(css).toContain('math-style')
      expect(css).toContain('compact')
    })

    it('should generate math-depth-0', () => {
      const css = coral.generate(['math-depth-0'])
      expect(css).toContain('math-depth')
      expect(css).toContain('0')
    })

    it('should generate math-depth-add-1', () => {
      const css = coral.generate(['math-depth-add-1'])
      expect(css).toContain('math-depth')
      expect(css).toContain('add(1)')
    })

    it('should generate arbitrary math-depth-[add(3)]', () => {
      const css = coral.generate(['math-depth-[add(3)]'])
      expect(css).toContain('math-depth')
      expect(css).toContain('add(3)')
    })

    it('should return null for empty math-depth-[]', () => {
      const css = coral.generate(['math-depth-[]'])
      expect(css).toBe('')
    })
  })

  describe('Backface Visibility', () => {
    it('should generate backface-visible', () => {
      const css = coral.generate(['backface-visible'])
      expect(css).toContain('backface-visibility')
      expect(css).toContain('visible')
    })

    it('should generate backface-hidden', () => {
      const css = coral.generate(['backface-hidden'])
      expect(css).toContain('backface-visibility')
      expect(css).toContain('hidden')
    })
  })

  describe('Paint Order', () => {
    it('should generate paint-order-normal', () => {
      const css = coral.generate(['paint-order-normal'])
      expect(css).toContain('paint-order')
      expect(css).toContain('normal')
    })

    it('should generate paint-order-fill', () => {
      const css = coral.generate(['paint-order-fill'])
      expect(css).toContain('paint-order')
      expect(css).toContain('fill')
    })

    it('should generate paint-order-stroke', () => {
      const css = coral.generate(['paint-order-stroke'])
      expect(css).toContain('paint-order')
      expect(css).toContain('stroke')
    })

    it('should generate paint-order-markers', () => {
      const css = coral.generate(['paint-order-markers'])
      expect(css).toContain('paint-order')
      expect(css).toContain('markers')
    })

    it('should generate paint-order-stroke-fill', () => {
      const css = coral.generate(['paint-order-stroke-fill'])
      expect(css).toContain('paint-order')
      expect(css).toContain('stroke fill')
    })

    it('should generate paint-order-fill-stroke', () => {
      const css = coral.generate(['paint-order-fill-stroke'])
      expect(css).toContain('paint-order')
      expect(css).toContain('fill stroke')
    })
  })

  describe('Dominant Baseline', () => {
    it('should generate dominant-baseline-auto', () => {
      const css = coral.generate(['dominant-baseline-auto'])
      expect(css).toContain('dominant-baseline')
      expect(css).toContain('auto')
    })

    it('should generate dominant-baseline-text-bottom', () => {
      const css = coral.generate(['dominant-baseline-text-bottom'])
      expect(css).toContain('dominant-baseline')
      expect(css).toContain('text-bottom')
    })

    it('should generate dominant-baseline-middle', () => {
      const css = coral.generate(['dominant-baseline-middle'])
      expect(css).toContain('dominant-baseline')
      expect(css).toContain('middle')
    })

    it('should generate dominant-baseline-hanging', () => {
      const css = coral.generate(['dominant-baseline-hanging'])
      expect(css).toContain('dominant-baseline')
      expect(css).toContain('hanging')
    })
  })

  describe('Alignment Baseline', () => {
    it('should generate alignment-baseline-auto', () => {
      const css = coral.generate(['alignment-baseline-auto'])
      expect(css).toContain('alignment-baseline')
      expect(css).toContain('auto')
    })

    it('should generate alignment-baseline-baseline', () => {
      const css = coral.generate(['alignment-baseline-baseline'])
      expect(css).toContain('alignment-baseline')
      expect(css).toContain('baseline')
    })

    it('should generate alignment-baseline-middle', () => {
      const css = coral.generate(['alignment-baseline-middle'])
      expect(css).toContain('alignment-baseline')
      expect(css).toContain('middle')
    })

    it('should generate alignment-baseline-text-top', () => {
      const css = coral.generate(['alignment-baseline-text-top'])
      expect(css).toContain('alignment-baseline')
      expect(css).toContain('text-top')
    })
  })

  describe('Arbitrary Position Values', () => {
    it('should generate arbitrary inset-[10px]', () => {
      const css = coral.generate(['inset-[10px]'])
      expect(css).toContain('inset')
      expect(css).toContain('10px')
    })

    it('should generate arbitrary top-[50%]', () => {
      const css = coral.generate(['top-[50%]'])
      expect(css).toContain('top')
      expect(css).toContain('50%')
    })

    it('should generate arbitrary z-[100]', () => {
      const css = coral.generate(['z-[100]'])
      expect(css).toContain('z-index')
      expect(css).toContain('100')
    })

    it('should generate arbitrary aspect-[16/9]', () => {
      const css = coral.generate(['aspect-[16/9]'])
      expect(css).toContain('aspect-ratio')
      expect(css).toContain('16 / 9')
    })

    it('should return null for empty inset-[]', () => {
      const css = coral.generate(['inset-[]'])
      expect(css).toBe('')
    })

    it('should return null for empty top-[]', () => {
      const css = coral.generate(['top-[]'])
      expect(css).toBe('')
    })

    it('should return null for empty z-[]', () => {
      const css = coral.generate(['z-[]'])
      expect(css).toBe('')
    })

    it('should return null for empty aspect-[]', () => {
      const css = coral.generate(['aspect-[]'])
      expect(css).toBe('')
    })
  })

  describe('Arbitrary Scroll Margin', () => {
    it('should generate arbitrary scroll-m-[30px]', () => {
      const css = coral.generate(['scroll-m-[30px]'])
      expect(css).toContain('scroll-margin')
      expect(css).toContain('30px')
    })

    it('should return null for empty scroll-m-[]', () => {
      const css = coral.generate(['scroll-m-[]'])
      expect(css).toBe('')
    })
  })

  describe('Negative Z-Index', () => {
    it('should generate -z-10', () => {
      const css = coral.generate(['-z-10'])
      expect(css).toContain('z-index')
      expect(css).toContain('-10')
    })

    it('should generate -z-50', () => {
      const css = coral.generate(['-z-50'])
      expect(css).toContain('z-index')
      expect(css).toContain('-50')
    })
  })

  describe('Overscroll Inline Block', () => {
    it('should generate overscroll-inline-auto', () => {
      const css = coral.generate(['overscroll-inline-auto'])
      expect(css).toContain('overscroll-behavior-inline')
      expect(css).toContain('auto')
    })

    it('should generate overscroll-block-contain', () => {
      const css = coral.generate(['overscroll-block-contain'])
      expect(css).toContain('overscroll-behavior-block')
      expect(css).toContain('contain')
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
