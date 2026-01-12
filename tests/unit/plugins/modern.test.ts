/**
 * Modern CSS Features Plugin Tests
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../src/kernel'
import { modernCSSPlugin } from '../../../src/plugins/core/modern'

describe('modernCSSPlugin', () => {
  let coral: ReturnType<typeof createCoral>

  beforeEach(() => {
    coral = createCoral()
    coral.use(modernCSSPlugin())
  })

  describe('Anchor Positioning', () => {
    it('should generate anchor-name arbitrary', () => {
      const css = coral.generate(['anchor-name-[myAnchor]'])
      expect(css).toContain('anchor-name')
      expect(css).toContain('--myAnchor')
    })

    it('should generate position-anchor arbitrary', () => {
      const css = coral.generate(['position-anchor-[myAnchor]'])
      expect(css).toContain('position-anchor')
      expect(css).toContain('--myAnchor')
    })

    it('should generate position-area utilities', () => {
      const areas = ['top', 'bottom', 'left', 'right', 'center']
      areas.forEach((area) => {
        const css = coral.generate([`position-area-${area}`])
        expect(css).toContain('position-area')
        expect(css).toContain(area)
      })
    })

    it('should generate position-area-top-left', () => {
      const css = coral.generate(['position-area-top-left'])
      expect(css).toContain('position-area')
      expect(css).toContain('top left')
    })

    it('should generate position-area-top-right', () => {
      const css = coral.generate(['position-area-top-right'])
      expect(css).toContain('position-area')
    })

    it('should generate position-area-bottom-left', () => {
      const css = coral.generate(['position-area-bottom-left'])
      expect(css).toContain('position-area')
    })

    it('should generate position-area-bottom-right', () => {
      const css = coral.generate(['position-area-bottom-right'])
      expect(css).toContain('position-area')
    })

    it('should generate position-area span utilities', () => {
      const spanAreas = [
        'top-span-left', 'top-span-right', 'bottom-span-left', 'bottom-span-right',
        'left-span-top', 'left-span-bottom', 'right-span-top', 'right-span-bottom'
      ]
      spanAreas.forEach((area) => {
        const css = coral.generate([`position-area-${area}`])
        expect(css).toContain('position-area')
      })
    })

    it('should generate position-area-span-all', () => {
      const css = coral.generate(['position-area-span-all'])
      expect(css).toContain('position-area')
    })

    it('should generate position-area arbitrary', () => {
      const css = coral.generate(['position-area-[top_center]'])
      expect(css).toContain('position-area')
    })

    it('should return null for position-area with empty value', () => {
      const css = coral.generate(['position-area-[]'])
      expect(css).not.toContain('position-area: ')
    })

    it('should generate anchor-default', () => {
      const css = coral.generate(['anchor-default'])
      expect(css).toContain('position-anchor')
      expect(css).toContain('auto')
    })
  })

  describe('Scroll-Driven Animations', () => {
    it('should generate animation-timeline-scroll', () => {
      const css = coral.generate(['animation-timeline-scroll'])
      expect(css).toContain('animation-timeline')
      expect(css).toContain('scroll()')
    })

    it('should generate animation-timeline-view', () => {
      const css = coral.generate(['animation-timeline-view'])
      expect(css).toContain('animation-timeline')
      expect(css).toContain('view()')
    })

    it('should generate animation-timeline-scroll arbitrary', () => {
      const css = coral.generate(['animation-timeline-scroll-[block_nearest]'])
      expect(css).toContain('animation-timeline')
      expect(css).toContain('scroll(')
    })

    it('should generate animation-timeline-view arbitrary', () => {
      const css = coral.generate(['animation-timeline-view-[block_auto]'])
      expect(css).toContain('animation-timeline')
      expect(css).toContain('view(')
    })

    it('should generate animation-range utilities', () => {
      const ranges = ['contain', 'cover', 'entry', 'exit', 'entry-crossing', 'exit-crossing']
      ranges.forEach((range) => {
        const css = coral.generate([`animation-range-${range}`])
        expect(css).toContain('animation-range')
      })
    })

    it('should generate animation-range arbitrary', () => {
      const css = coral.generate(['animation-range-[entry_0%_exit_100%]'])
      expect(css).toContain('animation-range')
    })

    it('should return null for animation-range with empty value', () => {
      const css = coral.generate(['animation-range-[]'])
      expect(css).not.toContain('animation-range: ')
    })

    it('should generate scroll-timeline-name arbitrary', () => {
      const css = coral.generate(['scroll-timeline-name-[myTimeline]'])
      expect(css).toContain('scroll-timeline-name')
      expect(css).toContain('--myTimeline')
    })

    it('should generate scroll-timeline axis utilities', () => {
      const axes = ['x', 'y', 'block', 'inline']
      axes.forEach((axis) => {
        const css = coral.generate([`scroll-timeline-${axis}`])
        expect(css).toContain('scroll-timeline-axis')
      })
    })

    it('should generate view-timeline-name arbitrary', () => {
      const css = coral.generate(['view-timeline-name-[myViewTimeline]'])
      expect(css).toContain('view-timeline-name')
      expect(css).toContain('--myViewTimeline')
    })

    it('should generate view-timeline axis utilities', () => {
      const axes = ['x', 'y', 'block', 'inline']
      axes.forEach((axis) => {
        const css = coral.generate([`view-timeline-${axis}`])
        expect(css).toContain('view-timeline-axis')
      })
    })

    it('should generate view-timeline-inset arbitrary', () => {
      const css = coral.generate(['view-timeline-inset-[10%_20%]'])
      expect(css).toContain('view-timeline-inset')
    })

    it('should return null for view-timeline-inset with empty value', () => {
      const css = coral.generate(['view-timeline-inset-[]'])
      expect(css).not.toContain('view-timeline-inset: ')
    })
  })

  describe('View Transitions', () => {
    it('should generate view-transition-name arbitrary', () => {
      const css = coral.generate(['view-transition-name-[hero-image]'])
      expect(css).toContain('view-transition-name')
    })

    it('should return null for view-transition-name with empty value', () => {
      const css = coral.generate(['view-transition-name-[]'])
      expect(css).not.toContain('view-transition-name: ')
    })

    it('should generate view-transition-name-none', () => {
      const css = coral.generate(['view-transition-name-none'])
      expect(css).toContain('view-transition-name')
      expect(css).toContain('none')
    })

    it('should generate view-transition-class arbitrary', () => {
      const css = coral.generate(['view-transition-class-[card]'])
      expect(css).toContain('view-transition-class')
    })

    it('should return null for view-transition-class with empty value', () => {
      const css = coral.generate(['view-transition-class-[]'])
      expect(css).not.toContain('view-transition-class: ')
    })
  })

  describe('Container Queries', () => {
    it('should generate container-type utilities', () => {
      const types = ['normal', 'size', 'inline-size']
      types.forEach((type) => {
        const css = coral.generate([`container-type-${type}`])
        expect(css).toContain('container-type')
      })
    })

    it('should generate @container shorthand', () => {
      const css = coral.generate(['@container'])
      expect(css).toContain('container-type')
      expect(css).toContain('inline-size')
    })

    it('should generate container-name arbitrary', () => {
      const css = coral.generate(['container-name-[sidebar]'])
      expect(css).toContain('container-name')
    })

    it('should return null for container-name with empty value', () => {
      const css = coral.generate(['container-name-[]'])
      expect(css).not.toContain('container-name: ')
    })

    it('should generate container arbitrary', () => {
      const css = coral.generate(['container-[sidebar_/_inline-size]'])
      expect(css).toContain('container')
    })

    it('should return null for container with empty value', () => {
      const css = coral.generate(['container-[]'])
      expect(css).not.toContain('container: ')
    })
  })

  describe('Subgrid', () => {
    it('should generate grid-cols-subgrid', () => {
      const css = coral.generate(['grid-cols-subgrid'])
      expect(css).toContain('grid-template-columns')
      expect(css).toContain('subgrid')
    })

    it('should generate grid-rows-subgrid', () => {
      const css = coral.generate(['grid-rows-subgrid'])
      expect(css).toContain('grid-template-rows')
      expect(css).toContain('subgrid')
    })
  })

  describe('Color Functions', () => {
    it('should generate color-mix arbitrary', () => {
      const css = coral.generate(['color-mix-[in_oklch,_red,_blue]'])
      expect(css).toContain('color')
      expect(css).toContain('color-mix(')
    })

    it('should generate bg-from arbitrary', () => {
      const css = coral.generate(['bg-from-[red_l_c_h]'])
      expect(css).toContain('background-color')
      expect(css).toContain('from')
    })
  })

  describe('Text Wrap', () => {
    it('should generate text-wrap-balance', () => {
      const css = coral.generate(['text-wrap-balance'])
      expect(css).toContain('text-wrap')
      expect(css).toContain('balance')
    })

    it('should generate text-wrap-pretty', () => {
      const css = coral.generate(['text-wrap-pretty'])
      expect(css).toContain('text-wrap')
      expect(css).toContain('pretty')
    })

    it('should generate text-wrap-stable', () => {
      const css = coral.generate(['text-wrap-stable'])
      expect(css).toContain('text-wrap')
      expect(css).toContain('stable')
    })
  })

  describe('Field Sizing', () => {
    it('should generate field-sizing-content', () => {
      const css = coral.generate(['field-sizing-content'])
      expect(css).toContain('field-sizing')
      expect(css).toContain('content')
    })

    it('should generate field-sizing-fixed', () => {
      const css = coral.generate(['field-sizing-fixed'])
      expect(css).toContain('field-sizing')
      expect(css).toContain('fixed')
    })
  })

  describe('Popover', () => {
    it('should generate popover-auto', () => {
      const css = coral.generate(['popover-auto'])
      expect(css).toContain('popover')
      expect(css).toContain('auto')
    })

    it('should generate popover-manual', () => {
      const css = coral.generate(['popover-manual'])
      expect(css).toContain('popover')
      expect(css).toContain('manual')
    })
  })

  describe('Masonry Layout', () => {
    it('should generate grid-template-rows-masonry', () => {
      const css = coral.generate(['grid-template-rows-masonry'])
      expect(css).toContain('grid-template-rows')
      expect(css).toContain('masonry')
    })

    it('should generate grid-template-cols-masonry', () => {
      const css = coral.generate(['grid-template-cols-masonry'])
      expect(css).toContain('grid-template-columns')
      expect(css).toContain('masonry')
    })
  })

  describe('CSS Math Functions', () => {
    it('should generate round arbitrary', () => {
      const css = coral.generate(['round-[nearest,_5.5]'])
      expect(css).toContain('--coral-round')
      expect(css).toContain('round(')
    })

    it('should generate clamp arbitrary', () => {
      const css = coral.generate(['clamp-[100px,_50%,_500px]'])
      expect(css).toContain('--coral-clamp')
      expect(css).toContain('clamp(')
    })
  })

  describe('Container Style Queries', () => {
    it('should generate @style arbitrary', () => {
      const css = coral.generate(['@style-[--variant:_primary]'])
      expect(css).toContain('--coral-style-query')
    })

    it('should return null for @style with empty value', () => {
      const css = coral.generate(['@style-[]'])
      expect(css).not.toContain('--coral-style-query: ')
    })
  })

  describe('CSS Nesting', () => {
    it('should generate nest utility', () => {
      const css = coral.generate(['nest'])
      expect(css).toContain('--coral-nesting')
      expect(css).toContain('enabled')
    })
  })

  describe('CSS Scope', () => {
    it('should generate scope-start arbitrary', () => {
      const css = coral.generate(['scope-start-[.card]'])
      expect(css).toContain('--coral-scope-start')
    })

    it('should return null for scope-start with empty value', () => {
      const css = coral.generate(['scope-start-[]'])
      expect(css).not.toContain('--coral-scope-start: ')
    })

    it('should generate scope-end arbitrary', () => {
      const css = coral.generate(['scope-end-[.footer]'])
      expect(css).toContain('--coral-scope-end')
    })

    it('should return null for scope-end with empty value', () => {
      const css = coral.generate(['scope-end-[]'])
      expect(css).not.toContain('--coral-scope-end: ')
    })
  })

  describe('CSS Layers', () => {
    it('should generate layer utilities', () => {
      const layers = ['base', 'components', 'utilities', 'reset']
      layers.forEach((layer) => {
        const css = coral.generate([`layer-${layer}`])
        expect(css).toContain('--coral-layer')
        expect(css).toContain(layer)
      })
    })
  })

  describe('Reading Flow', () => {
    it('should generate reading-flow utilities', () => {
      const flows = ['normal', 'grid-rows', 'grid-columns', 'grid-order', 'flex-visual', 'flex-flow']
      flows.forEach((flow) => {
        const css = coral.generate([`reading-flow-${flow}`])
        expect(css).toContain('reading-flow')
      })
    })
  })

  describe('Text Box Trim', () => {
    it('should generate text-box-trim utilities', () => {
      const trims = ['none', 'start', 'end', 'both']
      trims.forEach((trim) => {
        const css = coral.generate([`text-box-trim-${trim}`])
        expect(css).toContain('text-box-trim')
        expect(css).toContain(trim)
      })
    })

    it('should generate text-box-edge utilities', () => {
      const edges = ['leading', 'text', 'cap', 'ex', 'ideographic', 'ideographic-ink']
      edges.forEach((edge) => {
        const css = coral.generate([`text-box-edge-${edge}`])
        expect(css).toContain('text-box-edge')
      })
    })
  })

  describe('Math Styles', () => {
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
  })

  describe('Display Contents', () => {
    it('should generate display-contents', () => {
      const css = coral.generate(['display-contents'])
      expect(css).toContain('display')
      expect(css).toContain('contents')
    })
  })

  describe('@starting-style Support', () => {
    it('should generate starting-opacity-0', () => {
      const css = coral.generate(['starting-opacity-0'])
      expect(css).toContain('--coral-starting-opacity')
      expect(css).toContain('opacity')
    })

    it('should generate starting-scale utilities', () => {
      const scales = ['0', '75', '95']
      scales.forEach((scale) => {
        const css = coral.generate([`starting-scale-${scale}`])
        expect(css).toContain('--coral-starting-scale')
        expect(css).toContain('transform')
      })
    })

    it('should generate starting-translate-y-4', () => {
      const css = coral.generate(['starting-translate-y-4'])
      expect(css).toContain('--coral-starting-translate-y')
      expect(css).toContain('1rem')
    })

    it('should generate starting-translate-y-full', () => {
      const css = coral.generate(['starting-translate-y-full'])
      expect(css).toContain('--coral-starting-translate-y')
      expect(css).toContain('100%')
    })

    it('should generate starting--translate-y-full', () => {
      const css = coral.generate(['starting--translate-y-full'])
      expect(css).toContain('--coral-starting-translate-y')
      expect(css).toContain('-100%')
    })

    it('should generate starting-opacity arbitrary', () => {
      const css = coral.generate(['starting-opacity-[0.5]'])
      expect(css).toContain('--coral-starting-opacity')
    })

    it('should return null for starting-opacity with empty value', () => {
      const css = coral.generate(['starting-opacity-[]'])
      expect(css).not.toContain('--coral-starting-opacity: ')
    })

    it('should generate starting-scale arbitrary', () => {
      const css = coral.generate(['starting-scale-[0.9]'])
      expect(css).toContain('--coral-starting-scale')
    })

    it('should return null for starting-scale with empty value', () => {
      const css = coral.generate(['starting-scale-[]'])
      expect(css).not.toContain('--coral-starting-scale: ')
    })

    it('should generate starting-translate arbitrary', () => {
      const css = coral.generate(['starting-translate-[10px,_20px]'])
      expect(css).toContain('--coral-starting-translate')
    })

    it('should return null for starting-translate with empty value', () => {
      const css = coral.generate(['starting-translate-[]'])
      expect(css).not.toContain('--coral-starting-translate: ')
    })
  })

  describe('Transition Behavior', () => {
    it('should generate transition-discrete', () => {
      const css = coral.generate(['transition-discrete'])
      expect(css).toContain('transition-behavior')
      expect(css).toContain('allow-discrete')
    })

    it('should generate transition-normal', () => {
      const css = coral.generate(['transition-normal'])
      expect(css).toContain('transition-behavior')
      expect(css).toContain('normal')
    })
  })

  describe('Overlay Property', () => {
    it('should generate overlay-auto', () => {
      const css = coral.generate(['overlay-auto'])
      expect(css).toContain('overlay')
      expect(css).toContain('auto')
    })

    it('should generate overlay-none', () => {
      const css = coral.generate(['overlay-none'])
      expect(css).toContain('overlay')
      expect(css).toContain('none')
    })
  })

  describe('Color-Mix Utilities', () => {
    it('should generate mix-white percentages', () => {
      const percentages = ['10', '25', '50', '75', '90']
      percentages.forEach((pct) => {
        const css = coral.generate([`mix-white-${pct}`])
        expect(css).toContain('--coral-color-mix')
        expect(css).toContain('color-mix(')
        expect(css).toContain('white')
      })
    })

    it('should generate mix-black percentages', () => {
      const percentages = ['10', '25', '50', '75', '90']
      percentages.forEach((pct) => {
        const css = coral.generate([`mix-black-${pct}`])
        expect(css).toContain('--coral-color-mix')
        expect(css).toContain('color-mix(')
        expect(css).toContain('black')
      })
    })

    it('should generate all mix-white/black percentages', () => {
      const percentages = ['20', '30', '40', '60', '70', '80']
      percentages.forEach((pct) => {
        const cssWhite = coral.generate([`mix-white-${pct}`])
        expect(cssWhite).toContain('--coral-color-mix')
        const cssBlack = coral.generate([`mix-black-${pct}`])
        expect(cssBlack).toContain('--coral-color-mix')
      })
    })

    it('should generate mix-space utilities', () => {
      const spaces = ['srgb', 'srgb-linear', 'lab', 'oklab', 'lch', 'oklch', 'hsl', 'hwb']
      spaces.forEach((space) => {
        const css = coral.generate([`mix-space-${space}`])
        expect(css).toContain('--coral-mix-space')
        expect(css).toContain(space)
      })
    })

    it('should generate bg-mix arbitrary', () => {
      const css = coral.generate(['bg-mix-[red_50%,_blue]'])
      expect(css).toContain('background-color')
      expect(css).toContain('color-mix(')
    })

    it('should return null for bg-mix with empty value', () => {
      const css = coral.generate(['bg-mix-[]'])
      expect(css).not.toContain('background-color: color-mix(')
    })

    it('should generate text-mix arbitrary', () => {
      const css = coral.generate(['text-mix-[red_50%,_blue]'])
      expect(css).toContain('color')
      expect(css).toContain('color-mix(')
    })

    it('should return null for text-mix with empty value', () => {
      const css = coral.generate(['text-mix-[]'])
      expect(css).not.toContain('color: color-mix(')
    })

    it('should generate border-mix arbitrary', () => {
      const css = coral.generate(['border-mix-[red_50%,_blue]'])
      expect(css).toContain('border-color')
      expect(css).toContain('color-mix(')
    })

    it('should return null for border-mix with empty value', () => {
      const css = coral.generate(['border-mix-[]'])
      expect(css).not.toContain('border-color: color-mix(')
    })
  })

  describe('Light-Dark Function', () => {
    it('should generate bg-light-dark arbitrary', () => {
      const css = coral.generate(['bg-light-dark-[white,black]'])
      expect(css).toContain('background-color')
      expect(css).toContain('light-dark(')
    })

    it('should return null for bg-light-dark with empty value', () => {
      const css = coral.generate(['bg-light-dark-[]'])
      expect(css).not.toContain('background-color: light-dark(')
    })

    it('should generate text-light-dark arbitrary', () => {
      const css = coral.generate(['text-light-dark-[black,white]'])
      expect(css).toContain('color')
      expect(css).toContain('light-dark(')
    })

    it('should return null for text-light-dark with empty value', () => {
      const css = coral.generate(['text-light-dark-[]'])
      expect(css).not.toContain('color: light-dark(')
    })
  })

  describe('Relative Colors', () => {
    it('should generate bg-relative arbitrary', () => {
      const css = coral.generate(['bg-relative-[oklch(from_red_l_c_h)]'])
      expect(css).toContain('background-color')
    })

    it('should return null for bg-relative with empty value', () => {
      const css = coral.generate(['bg-relative-[]'])
      expect(css).not.toContain('background-color: ')
    })
  })

  describe('CSS @property Support', () => {
    it('should generate property-number', () => {
      const css = coral.generate(['property-number'])
      expect(css).toContain('--coral-property-syntax')
      expect(css).toContain('<number>')
    })

    it('should generate property-percentage', () => {
      const css = coral.generate(['property-percentage'])
      expect(css).toContain('--coral-property-syntax')
      expect(css).toContain('<percentage>')
    })

    it('should generate property-length', () => {
      const css = coral.generate(['property-length'])
      expect(css).toContain('--coral-property-syntax')
      expect(css).toContain('<length>')
    })

    it('should generate property-color', () => {
      const css = coral.generate(['property-color'])
      expect(css).toContain('--coral-property-syntax')
      expect(css).toContain('<color>')
    })

    it('should generate property-angle', () => {
      const css = coral.generate(['property-angle'])
      expect(css).toContain('--coral-property-syntax')
      expect(css).toContain('<angle>')
    })

    it('should generate property-inherit', () => {
      const css = coral.generate(['property-inherit'])
      expect(css).toContain('--coral-property-inherits')
      expect(css).toContain('true')
    })

    it('should generate property-no-inherit', () => {
      const css = coral.generate(['property-no-inherit'])
      expect(css).toContain('--coral-property-inherits')
      expect(css).toContain('false')
    })
  })

  describe('Interpolate Size', () => {
    it('should generate interpolate-size-allow-keywords', () => {
      const css = coral.generate(['interpolate-size-allow-keywords'])
      expect(css).toContain('interpolate-size')
      expect(css).toContain('allow-keywords')
    })

    it('should generate interpolate-size-numeric-only', () => {
      const css = coral.generate(['interpolate-size-numeric-only'])
      expect(css).toContain('interpolate-size')
      expect(css).toContain('numeric-only')
    })
  })

  describe('Calc-Size', () => {
    it('should generate h-calc-size-auto', () => {
      const css = coral.generate(['h-calc-size-auto'])
      expect(css).toContain('height')
      expect(css).toContain('calc-size(auto)')
    })

    it('should generate w-calc-size-auto', () => {
      const css = coral.generate(['w-calc-size-auto'])
      expect(css).toContain('width')
      expect(css).toContain('calc-size(auto)')
    })

    it('should generate max-h-calc-size-auto', () => {
      const css = coral.generate(['max-h-calc-size-auto'])
      expect(css).toContain('max-height')
      expect(css).toContain('calc-size(auto)')
    })

    it('should generate max-w-calc-size-auto', () => {
      const css = coral.generate(['max-w-calc-size-auto'])
      expect(css).toContain('max-width')
      expect(css).toContain('calc-size(auto)')
    })
  })

  describe('Inert Attribute', () => {
    it('should generate inert utility', () => {
      const css = coral.generate(['inert'])
      expect(css).toContain('pointer-events')
      expect(css).toContain('none')
      expect(css).toContain('user-select')
      expect(css).toContain('opacity')
    })
  })

  describe('CSS Trigonometric Functions', () => {
    it('should generate sin arbitrary', () => {
      const css = coral.generate(['sin-[90deg]'])
      expect(css).toContain('--coral-trig')
      expect(css).toContain('sin(')
    })

    it('should generate cos arbitrary', () => {
      const css = coral.generate(['cos-[0deg]'])
      expect(css).toContain('--coral-trig')
      expect(css).toContain('cos(')
    })

    it('should generate tan arbitrary', () => {
      const css = coral.generate(['tan-[45deg]'])
      expect(css).toContain('--coral-trig')
      expect(css).toContain('tan(')
    })

    it('should generate asin arbitrary', () => {
      const css = coral.generate(['asin-[0.5]'])
      expect(css).toContain('--coral-trig')
      expect(css).toContain('asin(')
    })

    it('should generate acos arbitrary', () => {
      const css = coral.generate(['acos-[0.5]'])
      expect(css).toContain('--coral-trig')
      expect(css).toContain('acos(')
    })

    it('should generate atan arbitrary', () => {
      const css = coral.generate(['atan-[1]'])
      expect(css).toContain('--coral-trig')
      expect(css).toContain('atan(')
    })

    it('should generate atan2 arbitrary', () => {
      const css = coral.generate(['atan2-[10,_20]'])
      expect(css).toContain('--coral-trig')
      expect(css).toContain('atan2(')
    })
  })

  describe('CSS Exponential Functions', () => {
    it('should generate exp arbitrary', () => {
      const css = coral.generate(['exp-[2]'])
      expect(css).toContain('--coral-exp')
      expect(css).toContain('exp(')
    })

    it('should generate pow arbitrary', () => {
      const css = coral.generate(['pow-[2,_3]'])
      expect(css).toContain('--coral-exp')
      expect(css).toContain('pow(')
    })

    it('should generate sqrt arbitrary', () => {
      const css = coral.generate(['sqrt-[25]'])
      expect(css).toContain('--coral-exp')
      expect(css).toContain('sqrt(')
    })

    it('should generate hypot arbitrary', () => {
      const css = coral.generate(['hypot-[3,_4]'])
      expect(css).toContain('--coral-exp')
      expect(css).toContain('hypot(')
    })

    it('should generate log arbitrary', () => {
      const css = coral.generate(['log-[10]'])
      expect(css).toContain('--coral-exp')
      expect(css).toContain('log(')
    })

    it('should generate log10 arbitrary', () => {
      const css = coral.generate(['log10-[100]'])
      expect(css).toContain('--coral-exp')
      expect(css).toContain('log10(')
    })

    it('should generate log2 arbitrary', () => {
      const css = coral.generate(['log2-[8]'])
      expect(css).toContain('--coral-exp')
      expect(css).toContain('log2(')
    })
  })

  describe('CSS Sign-Modulated Functions', () => {
    it('should generate mod arbitrary', () => {
      const css = coral.generate(['mod-[10,_3]'])
      expect(css).toContain('--coral-mod')
      expect(css).toContain('mod(')
    })

    it('should generate rem arbitrary', () => {
      const css = coral.generate(['rem-[10,_3]'])
      expect(css).toContain('--coral-rem')
      expect(css).toContain('rem(')
    })
  })

  describe('CSS Numeric Constants', () => {
    it('should generate e-constant', () => {
      const css = coral.generate(['e-constant'])
      expect(css).toContain('--coral-e')
      expect(css).toContain('2.718281828459045')
    })

    it('should generate pi-constant', () => {
      const css = coral.generate(['pi-constant'])
      expect(css).toContain('--coral-pi')
      expect(css).toContain('3.141592653589793')
    })
  })

  describe('Absolute Color Functions', () => {
    it('should generate oklab arbitrary', () => {
      const css = coral.generate(['oklab-[0.5_0.2_0.1]'])
      expect(css).toContain('color')
      expect(css).toContain('oklab(')
    })

    it('should generate oklch arbitrary', () => {
      const css = coral.generate(['oklch-[0.5_0.2_120]'])
      expect(css).toContain('color')
      expect(css).toContain('oklch(')
    })

    it('should generate bg-oklab arbitrary', () => {
      const css = coral.generate(['bg-oklab-[0.5_0.2_0.1]'])
      expect(css).toContain('background-color')
      expect(css).toContain('oklab(')
    })

    it('should generate bg-oklch arbitrary', () => {
      const css = coral.generate(['bg-oklch-[0.5_0.2_120]'])
      expect(css).toContain('background-color')
      expect(css).toContain('oklch(')
    })
  })

  describe('Color-contrast Function', () => {
    it('should generate text-contrast arbitrary', () => {
      const css = coral.generate(['text-contrast-[white_vs_black]'])
      expect(css).toContain('color')
      expect(css).toContain('color-contrast(')
    })

    it('should generate bg-contrast arbitrary', () => {
      const css = coral.generate(['bg-contrast-[white_vs_black]'])
      expect(css).toContain('background-color')
      expect(css).toContain('color-contrast(')
    })
  })

  describe('Color-adjust Function', () => {
    it('should generate text-adjust arbitrary', () => {
      const css = coral.generate(['text-adjust-[red_hue(+30deg)]'])
      expect(css).toContain('color')
      expect(css).toContain('color-adjust(')
    })
  })

  describe('Content-Visibility (Modern Plugin)', () => {
    it('should generate content-visibility-visible', () => {
      const css = coral.generate(['content-visibility-visible'])
      expect(css).toContain('content-visibility')
      expect(css).toContain('visible')
    })

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
  })

  describe('Contain Property (Modern Plugin)', () => {
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

    it('should generate contain-size-layout', () => {
      const css = coral.generate(['contain-size-layout'])
      expect(css).toContain('contain')
      expect(css).toContain('size layout')
    })

    it('should generate contain-size-layout-paint', () => {
      const css = coral.generate(['contain-size-layout-paint'])
      expect(css).toContain('contain')
      expect(css).toContain('size layout paint')
    })

    it('should generate contain-layout-paint', () => {
      const css = coral.generate(['contain-layout-paint'])
      expect(css).toContain('contain')
      expect(css).toContain('layout paint')
    })

    it('should generate contain-layout-style', () => {
      const css = coral.generate(['contain-layout-style'])
      expect(css).toContain('contain')
      expect(css).toContain('layout style')
    })

    it('should generate contain-paint-style', () => {
      const css = coral.generate(['contain-paint-style'])
      expect(css).toContain('contain')
      expect(css).toContain('paint style')
    })
  })

  describe('Anchor Positioning Functions', () => {
    it('should generate anchor-top arbitrary', () => {
      const css = coral.generate(['anchor-top-[--myAnchor]'])
      expect(css).toContain('--coral-anchor-top')
      expect(css).toContain('anchor(')
      expect(css).toContain('top')
    })

    it('should generate anchor-left arbitrary', () => {
      const css = coral.generate(['anchor-left-[--myAnchor]'])
      expect(css).toContain('--coral-anchor-left')
      expect(css).toContain('anchor(')
      expect(css).toContain('left')
    })

    it('should generate anchor-right arbitrary', () => {
      const css = coral.generate(['anchor-right-[--myAnchor]'])
      expect(css).toContain('--coral-anchor-right')
      expect(css).toContain('anchor(')
      expect(css).toContain('right')
    })

    it('should generate anchor-bottom arbitrary', () => {
      const css = coral.generate(['anchor-bottom-[--myAnchor]'])
      expect(css).toContain('--coral-anchor-bottom')
      expect(css).toContain('anchor(')
      expect(css).toContain('bottom')
    })

    it('should generate anchor-center arbitrary', () => {
      const css = coral.generate(['anchor-center-[--myAnchor]'])
      expect(css).toContain('--coral-anchor-center')
      expect(css).toContain('anchor(')
      expect(css).toContain('center')
    })

    it('should generate anchor-width arbitrary', () => {
      const css = coral.generate(['anchor-width-[--myAnchor]'])
      expect(css).toContain('--coral-anchor-width')
      expect(css).toContain('anchor-size(')
      expect(css).toContain('width')
    })

    it('should generate anchor-height arbitrary', () => {
      const css = coral.generate(['anchor-height-[--myAnchor]'])
      expect(css).toContain('--coral-anchor-height')
      expect(css).toContain('anchor-size(')
      expect(css).toContain('height')
    })
  })

  describe('View Transition Type', () => {
    it('should generate view-transition-type-root', () => {
      const css = coral.generate(['view-transition-type-root'])
      expect(css).toContain('view-transition-type')
      expect(css).toContain('root')
    })

    it('should generate view-transition-type arbitrary', () => {
      const css = coral.generate(['view-transition-type-[slide]'])
      expect(css).toContain('view-transition-type')
      expect(css).toContain('slide')
    })
  })

  describe('Transition Auto-Start', () => {
    it('should generate transition-start-auto', () => {
      const css = coral.generate(['transition-start-auto'])
      expect(css).toContain('transition-start')
      expect(css).toContain('auto')
    })

    it('should generate transition-start-normal', () => {
      const css = coral.generate(['transition-start-normal'])
      expect(css).toContain('transition-start')
      expect(css).toContain('normal')
    })
  })

  describe('Plugin Metadata', () => {
    it('should have correct plugin name', () => {
      const plugin = modernCSSPlugin()
      expect(plugin.name).toBe('modern-css')
    })

    it('should have correct plugin version', () => {
      const plugin = modernCSSPlugin()
      expect(plugin.version).toBe('1.0.0')
    })

    it('should have install method', () => {
      const plugin = modernCSSPlugin()
      expect(plugin.install).toBeDefined()
      expect(typeof plugin.install).toBe('function')
    })
  })
})
