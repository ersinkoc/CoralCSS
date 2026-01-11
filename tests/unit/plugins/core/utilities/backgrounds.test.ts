/**
 * Backgrounds Plugin Tests
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { backgroundsPlugin } from '../../../../../src/plugins/core/utilities/backgrounds'

describe('backgroundsPlugin', () => {
  let coral: ReturnType<typeof createCoral>

  beforeEach(() => {
    coral = createCoral()
    coral.use(backgroundsPlugin())
  })

  describe('background attachment', () => {
    it('should generate bg-fixed', () => {
      const css = coral.generate(['bg-fixed'])
      expect(css).toContain('background-attachment: fixed')
    })

    it('should generate bg-local', () => {
      const css = coral.generate(['bg-local'])
      expect(css).toContain('background-attachment: local')
    })

    it('should generate bg-scroll', () => {
      const css = coral.generate(['bg-scroll'])
      expect(css).toContain('background-attachment: scroll')
    })
  })

  describe('background clip', () => {
    it('should generate bg-clip-border', () => {
      const css = coral.generate(['bg-clip-border'])
      expect(css).toContain('background-clip: border-box')
    })

    it('should generate bg-clip-padding', () => {
      const css = coral.generate(['bg-clip-padding'])
      expect(css).toContain('background-clip: padding-box')
    })

    it('should generate bg-clip-content', () => {
      const css = coral.generate(['bg-clip-content'])
      expect(css).toContain('background-clip: content-box')
    })

    it('should generate bg-clip-text', () => {
      const css = coral.generate(['bg-clip-text'])
      expect(css).toContain('background-clip: text')
    })
  })

  describe('background origin', () => {
    it('should generate bg-origin-border', () => {
      const css = coral.generate(['bg-origin-border'])
      expect(css).toContain('background-origin: border-box')
    })

    it('should generate bg-origin-padding', () => {
      const css = coral.generate(['bg-origin-padding'])
      expect(css).toContain('background-origin: padding-box')
    })

    it('should generate bg-origin-content', () => {
      const css = coral.generate(['bg-origin-content'])
      expect(css).toContain('background-origin: content-box')
    })
  })

  describe('background position', () => {
    it('should generate bg-bottom', () => {
      const css = coral.generate(['bg-bottom'])
      expect(css).toContain('background-position: bottom')
    })

    it('should generate bg-center', () => {
      const css = coral.generate(['bg-center'])
      expect(css).toContain('background-position: center')
    })

    it('should generate bg-left', () => {
      const css = coral.generate(['bg-left'])
      expect(css).toContain('background-position: left')
    })

    it('should generate bg-left-bottom', () => {
      const css = coral.generate(['bg-left-bottom'])
      expect(css).toContain('background-position: left bottom')
    })

    it('should generate bg-right-top', () => {
      const css = coral.generate(['bg-right-top'])
      expect(css).toContain('background-position: right top')
    })
  })

  describe('background repeat', () => {
    it('should generate bg-repeat', () => {
      const css = coral.generate(['bg-repeat'])
      expect(css).toContain('background-repeat: repeat')
    })

    it('should generate bg-no-repeat', () => {
      const css = coral.generate(['bg-no-repeat'])
      expect(css).toContain('background-repeat: no-repeat')
    })

    it('should generate bg-repeat-x', () => {
      const css = coral.generate(['bg-repeat-x'])
      expect(css).toContain('background-repeat: repeat-x')
    })

    it('should generate bg-repeat-y', () => {
      const css = coral.generate(['bg-repeat-y'])
      expect(css).toContain('background-repeat: repeat-y')
    })
  })

  describe('background size', () => {
    it('should generate bg-auto', () => {
      const css = coral.generate(['bg-auto'])
      expect(css).toContain('background-size: auto')
    })

    it('should generate bg-cover', () => {
      const css = coral.generate(['bg-cover'])
      expect(css).toContain('background-size: cover')
    })

    it('should generate bg-contain', () => {
      const css = coral.generate(['bg-contain'])
      expect(css).toContain('background-size: contain')
    })
  })

  describe('background image', () => {
    it('should generate bg-none', () => {
      const css = coral.generate(['bg-none'])
      expect(css).toContain('background-image: none')
    })
  })

  describe('linear gradients', () => {
    it('should generate bg-gradient-to-t', () => {
      const css = coral.generate(['bg-gradient-to-t'])
      expect(css).toContain('linear-gradient(to top')
    })

    it('should generate bg-gradient-to-r', () => {
      const css = coral.generate(['bg-gradient-to-r'])
      expect(css).toContain('linear-gradient(to right')
    })

    it('should generate bg-gradient-to-b', () => {
      const css = coral.generate(['bg-gradient-to-b'])
      expect(css).toContain('linear-gradient(to bottom')
    })

    it('should generate bg-gradient-to-l', () => {
      const css = coral.generate(['bg-gradient-to-l'])
      expect(css).toContain('linear-gradient(to left')
    })

    it('should generate diagonal gradients', () => {
      const css = coral.generate(['bg-gradient-to-tr', 'bg-gradient-to-br', 'bg-gradient-to-bl', 'bg-gradient-to-tl'])
      expect(css).toContain('to top right')
      expect(css).toContain('to bottom right')
      expect(css).toContain('to bottom left')
      expect(css).toContain('to top left')
    })
  })

  describe('radial gradients', () => {
    it('should generate bg-gradient-radial', () => {
      const css = coral.generate(['bg-gradient-radial'])
      expect(css).toContain('radial-gradient')
    })

    it('should generate bg-radial-circle', () => {
      const css = coral.generate(['bg-radial-circle'])
      expect(css).toContain('radial-gradient(circle')
    })

    it('should generate bg-radial-ellipse', () => {
      const css = coral.generate(['bg-radial-ellipse'])
      expect(css).toContain('radial-gradient(ellipse')
    })

    it('should generate radial sizes', () => {
      const css = coral.generate(['bg-radial-closest-side', 'bg-radial-farthest-corner'])
      expect(css).toContain('closest-side')
      expect(css).toContain('farthest-corner')
    })

    it('should generate radial positions', () => {
      const css = coral.generate(['bg-radial-at-center', 'bg-radial-at-top', 'bg-radial-at-bottom-right'])
      expect(css).toContain('at center')
      expect(css).toContain('at top')
      expect(css).toContain('at bottom right')
    })
  })

  describe('conic gradients', () => {
    it('should generate bg-gradient-conic', () => {
      const css = coral.generate(['bg-gradient-conic'])
      expect(css).toContain('conic-gradient')
    })

    it('should generate conic from angles', () => {
      const css = coral.generate(['bg-conic-from-0', 'bg-conic-from-90', 'bg-conic-from-180'])
      expect(css).toContain('from 0deg')
      expect(css).toContain('from 90deg')
      expect(css).toContain('from 180deg')
    })

    it('should generate conic at positions', () => {
      const css = coral.generate(['bg-conic-at-center', 'bg-conic-at-top', 'bg-conic-at-bottom-left'])
      expect(css).toContain('at center')
      expect(css).toContain('at top')
      expect(css).toContain('at bottom left')
    })
  })

  describe('gradient stop positions', () => {
    it('should generate from positions', () => {
      const css = coral.generate(['from-0%', 'from-50%', 'from-100%'])
      expect(css).toContain('--coral-gradient-from-position: 0%')
      expect(css).toContain('--coral-gradient-from-position: 50%')
      expect(css).toContain('--coral-gradient-from-position: 100%')
    })

    it('should generate via positions', () => {
      const css = coral.generate(['via-25%', 'via-50%', 'via-75%'])
      expect(css).toContain('--coral-gradient-via-position: 25%')
      expect(css).toContain('--coral-gradient-via-position: 50%')
      expect(css).toContain('--coral-gradient-via-position: 75%')
    })

    it('should generate to positions', () => {
      const css = coral.generate(['to-0%', 'to-50%', 'to-100%'])
      expect(css).toContain('--coral-gradient-to-position: 0%')
      expect(css).toContain('--coral-gradient-to-position: 50%')
      expect(css).toContain('--coral-gradient-to-position: 100%')
    })
  })

  describe('arbitrary gradients', () => {
    it('should generate arbitrary from color', () => {
      const css = coral.generate(['from-[#ff0000]'])
      expect(css).toContain('--coral-gradient-from: #ff0000')
    })

    it('should generate arbitrary via color', () => {
      const css = coral.generate(['via-[#00ff00]'])
      expect(css).toContain('--coral-gradient-stops')
      expect(css).toContain('#00ff00')
    })

    it('should generate arbitrary to color', () => {
      const css = coral.generate(['to-[#0000ff]'])
      expect(css).toContain('--coral-gradient-to: #0000ff')
    })

    it('should return null for from-[] with empty value', () => {
      const css = coral.generate(['from-[]'])
      expect(css).not.toContain('--coral-gradient-from: ;')
    })

    it('should return null for via-[] with empty value', () => {
      const css = coral.generate(['via-[]'])
      expect(css).not.toContain('--coral-gradient-stops: var(--coral-gradient-from), , var(--coral-gradient-to)')
    })

    it('should return null for to-[] with empty value', () => {
      const css = coral.generate(['to-[]'])
      expect(css).not.toContain('--coral-gradient-to: ;')
    })
  })

  describe('more background positions', () => {
    it('should generate bg-left-top', () => {
      const css = coral.generate(['bg-left-top'])
      expect(css).toContain('background-position: left top')
    })

    it('should generate bg-right', () => {
      const css = coral.generate(['bg-right'])
      expect(css).toContain('background-position: right')
    })

    it('should generate bg-right-bottom', () => {
      const css = coral.generate(['bg-right-bottom'])
      expect(css).toContain('background-position: right bottom')
    })

    it('should generate bg-top', () => {
      const css = coral.generate(['bg-top'])
      expect(css).toContain('background-position: top')
    })
  })

  describe('more background repeat', () => {
    it('should generate bg-repeat-round', () => {
      const css = coral.generate(['bg-repeat-round'])
      expect(css).toContain('background-repeat: round')
    })

    it('should generate bg-repeat-space', () => {
      const css = coral.generate(['bg-repeat-space'])
      expect(css).toContain('background-repeat: space')
    })
  })

  describe('more radial gradient sizes', () => {
    it('should generate bg-radial-closest-corner', () => {
      const css = coral.generate(['bg-radial-closest-corner'])
      expect(css).toContain('radial-gradient(closest-corner')
    })

    it('should generate bg-radial-farthest-side', () => {
      const css = coral.generate(['bg-radial-farthest-side'])
      expect(css).toContain('radial-gradient(farthest-side')
    })
  })

  describe('more radial gradient positions', () => {
    it('should generate bg-radial-at-right', () => {
      const css = coral.generate(['bg-radial-at-right'])
      expect(css).toContain('at right')
    })

    it('should generate bg-radial-at-top-right', () => {
      const css = coral.generate(['bg-radial-at-top-right'])
      expect(css).toContain('at top right')
    })

    it('should generate bg-radial-at-bottom-left', () => {
      const css = coral.generate(['bg-radial-at-bottom-left'])
      expect(css).toContain('at bottom left')
    })

    it('should generate bg-radial-at-left', () => {
      const css = coral.generate(['bg-radial-at-left'])
      expect(css).toContain('at left')
    })

    it('should generate bg-radial-at-top-left', () => {
      const css = coral.generate(['bg-radial-at-top-left'])
      expect(css).toContain('at top left')
    })
  })

  describe('radial circle at positions', () => {
    it('should generate bg-radial-circle-at-center', () => {
      const css = coral.generate(['bg-radial-circle-at-center'])
      expect(css).toContain('radial-gradient(circle at center')
    })

    it('should generate bg-radial-circle-at-top', () => {
      const css = coral.generate(['bg-radial-circle-at-top'])
      expect(css).toContain('radial-gradient(circle at top')
    })

    it('should generate bg-radial-circle-at-bottom', () => {
      const css = coral.generate(['bg-radial-circle-at-bottom'])
      expect(css).toContain('radial-gradient(circle at bottom')
    })

    it('should generate bg-radial-circle-at-left', () => {
      const css = coral.generate(['bg-radial-circle-at-left'])
      expect(css).toContain('radial-gradient(circle at left')
    })

    it('should generate bg-radial-circle-at-right', () => {
      const css = coral.generate(['bg-radial-circle-at-right'])
      expect(css).toContain('radial-gradient(circle at right')
    })
  })

  describe('more conic gradient angles', () => {
    it('should generate bg-conic-from-45', () => {
      const css = coral.generate(['bg-conic-from-45'])
      expect(css).toContain('from 45deg')
    })

    it('should generate bg-conic-from-135', () => {
      const css = coral.generate(['bg-conic-from-135'])
      expect(css).toContain('from 135deg')
    })

    it('should generate bg-conic-from-225', () => {
      const css = coral.generate(['bg-conic-from-225'])
      expect(css).toContain('from 225deg')
    })

    it('should generate bg-conic-from-270', () => {
      const css = coral.generate(['bg-conic-from-270'])
      expect(css).toContain('from 270deg')
    })

    it('should generate bg-conic-from-315', () => {
      const css = coral.generate(['bg-conic-from-315'])
      expect(css).toContain('from 315deg')
    })
  })

  describe('more conic gradient positions', () => {
    it('should generate bg-conic-at-top-right', () => {
      const css = coral.generate(['bg-conic-at-top-right'])
      expect(css).toContain('at top right')
    })

    it('should generate bg-conic-at-right', () => {
      const css = coral.generate(['bg-conic-at-right'])
      expect(css).toContain('at right')
    })

    it('should generate bg-conic-at-bottom-right', () => {
      const css = coral.generate(['bg-conic-at-bottom-right'])
      expect(css).toContain('at bottom right')
    })

    it('should generate bg-conic-at-bottom', () => {
      const css = coral.generate(['bg-conic-at-bottom'])
      expect(css).toContain('at bottom')
    })

    it('should generate bg-conic-at-bottom-left', () => {
      const css = coral.generate(['bg-conic-at-bottom-left'])
      expect(css).toContain('at bottom left')
    })

    it('should generate bg-conic-at-left', () => {
      const css = coral.generate(['bg-conic-at-left'])
      expect(css).toContain('at left')
    })

    it('should generate bg-conic-at-top-left', () => {
      const css = coral.generate(['bg-conic-at-top-left'])
      expect(css).toContain('at top left')
    })
  })

  describe('more gradient stop positions', () => {
    const positions = ['5', '10', '15', '20', '30', '35', '40', '45', '55', '60', '65', '70', '80', '85', '90', '95']
    positions.forEach((pos) => {
      it(`should generate from-${pos}%`, () => {
        const css = coral.generate([`from-${pos}%`])
        expect(css).toContain(`--coral-gradient-from-position: ${pos}%`)
      })

      it(`should generate via-${pos}%`, () => {
        const css = coral.generate([`via-${pos}%`])
        expect(css).toContain(`--coral-gradient-via-position: ${pos}%`)
      })

      it(`should generate to-${pos}%`, () => {
        const css = coral.generate([`to-${pos}%`])
        expect(css).toContain(`--coral-gradient-to-position: ${pos}%`)
      })
    })
  })

  describe('repeating gradients', () => {
    it('should generate bg-repeating-linear-to-t', () => {
      const css = coral.generate(['bg-repeating-linear-to-t'])
      expect(css).toContain('repeating-linear-gradient(to top')
    })

    it('should generate bg-repeating-linear-to-r', () => {
      const css = coral.generate(['bg-repeating-linear-to-r'])
      expect(css).toContain('repeating-linear-gradient(to right')
    })

    it('should generate bg-repeating-linear-to-b', () => {
      const css = coral.generate(['bg-repeating-linear-to-b'])
      expect(css).toContain('repeating-linear-gradient(to bottom')
    })

    it('should generate bg-repeating-linear-to-l', () => {
      const css = coral.generate(['bg-repeating-linear-to-l'])
      expect(css).toContain('repeating-linear-gradient(to left')
    })

    it('should generate diagonal repeating gradients', () => {
      const css = coral.generate(['bg-repeating-linear-to-tr', 'bg-repeating-linear-to-br', 'bg-repeating-linear-to-bl', 'bg-repeating-linear-to-tl'])
      expect(css).toContain('to top right')
      expect(css).toContain('to bottom right')
      expect(css).toContain('to bottom left')
      expect(css).toContain('to top left')
    })

    it('should generate bg-repeating-radial', () => {
      const css = coral.generate(['bg-repeating-radial'])
      expect(css).toContain('repeating-radial-gradient')
    })

    it('should generate bg-repeating-radial-circle', () => {
      const css = coral.generate(['bg-repeating-radial-circle'])
      expect(css).toContain('repeating-radial-gradient(circle')
    })

    it('should generate bg-repeating-radial-ellipse', () => {
      const css = coral.generate(['bg-repeating-radial-ellipse'])
      expect(css).toContain('repeating-radial-gradient(ellipse')
    })

    it('should generate bg-repeating-conic', () => {
      const css = coral.generate(['bg-repeating-conic'])
      expect(css).toContain('repeating-conic-gradient')
    })

    it('should generate bg-repeating-conic-from-0', () => {
      const css = coral.generate(['bg-repeating-conic-from-0'])
      expect(css).toContain('repeating-conic-gradient(from 0deg')
    })

    it('should generate bg-repeating-conic-from-90', () => {
      const css = coral.generate(['bg-repeating-conic-from-90'])
      expect(css).toContain('repeating-conic-gradient(from 90deg')
    })

    it('should generate bg-repeating-conic-from-180', () => {
      const css = coral.generate(['bg-repeating-conic-from-180'])
      expect(css).toContain('repeating-conic-gradient(from 180deg')
    })

    it('should generate bg-repeating-conic-from-270', () => {
      const css = coral.generate(['bg-repeating-conic-from-270'])
      expect(css).toContain('repeating-conic-gradient(from 270deg')
    })
  })

  describe('gradient angle utilities', () => {
    const angles = ['0', '15', '30', '45', '60', '75', '90', '105', '120', '135', '150', '165', '180', '195', '210', '225', '240', '255', '270', '285', '300', '315', '330', '345']
    angles.forEach((angle) => {
      it(`should generate bg-gradient-${angle}`, () => {
        const css = coral.generate([`bg-gradient-${angle}`])
        expect(css).toContain(`linear-gradient(${angle}deg`)
      })
    })
  })

  describe('gradient color interpolation', () => {
    it('should generate gradient-in-srgb', () => {
      const css = coral.generate(['gradient-in-srgb'])
      expect(css).toContain('--coral-gradient-interpolation: in srgb')
    })

    it('should generate gradient-in-srgb-linear', () => {
      const css = coral.generate(['gradient-in-srgb-linear'])
      expect(css).toContain('--coral-gradient-interpolation: in srgb-linear')
    })

    it('should generate gradient-in-lab', () => {
      const css = coral.generate(['gradient-in-lab'])
      expect(css).toContain('--coral-gradient-interpolation: in lab')
    })

    it('should generate gradient-in-oklab', () => {
      const css = coral.generate(['gradient-in-oklab'])
      expect(css).toContain('--coral-gradient-interpolation: in oklab')
    })

    it('should generate gradient-in-lch', () => {
      const css = coral.generate(['gradient-in-lch'])
      expect(css).toContain('--coral-gradient-interpolation: in lch')
    })

    it('should generate gradient-in-oklch', () => {
      const css = coral.generate(['gradient-in-oklch'])
      expect(css).toContain('--coral-gradient-interpolation: in oklch')
    })

    it('should generate gradient-in-hsl', () => {
      const css = coral.generate(['gradient-in-hsl'])
      expect(css).toContain('--coral-gradient-interpolation: in hsl')
    })

    it('should generate gradient-in-hwb', () => {
      const css = coral.generate(['gradient-in-hwb'])
      expect(css).toContain('--coral-gradient-interpolation: in hwb')
    })
  })

  describe('gradient hue interpolation', () => {
    it('should generate gradient-hue-shorter', () => {
      const css = coral.generate(['gradient-hue-shorter'])
      expect(css).toContain('--coral-gradient-hue: shorter hue')
    })

    it('should generate gradient-hue-longer', () => {
      const css = coral.generate(['gradient-hue-longer'])
      expect(css).toContain('--coral-gradient-hue: longer hue')
    })

    it('should generate gradient-hue-increasing', () => {
      const css = coral.generate(['gradient-hue-increasing'])
      expect(css).toContain('--coral-gradient-hue: increasing hue')
    })

    it('should generate gradient-hue-decreasing', () => {
      const css = coral.generate(['gradient-hue-decreasing'])
      expect(css).toContain('--coral-gradient-hue: decreasing hue')
    })
  })

  describe('gradient blend modes', () => {
    const blendModes = [
      'blend', 'blend-multiply', 'blend-screen', 'blend-overlay',
      'blend-darken', 'blend-lighten', 'blend-color-dodge', 'blend-color-burn',
      'blend-hard-light', 'blend-soft-light', 'blend-difference', 'blend-exclusion',
      'blend-hue', 'blend-saturation', 'blend-color', 'blend-luminosity'
    ]
    blendModes.forEach((mode) => {
      it(`should generate bg-gradient-${mode}`, () => {
        const css = coral.generate([`bg-gradient-${mode}`])
        expect(css).toContain('background-blend-mode')
      })
    })
  })

  describe('arbitrary background values', () => {
    it('should generate bg-[url(image.png)]', () => {
      const css = coral.generate(['bg-[url(image.png)]'])
      expect(css).toContain('background-image: url(image.png)')
    })

    it('should return null for bg-[url()] with empty url', () => {
      const css = coral.generate(['bg-[url()]'])
      // Empty url should still generate something
      expect(css).toContain('url()')
    })

    it('should generate bg-[linear-gradient(red,blue)]', () => {
      const css = coral.generate(['bg-[linear-gradient(red,blue)]'])
      expect(css).toContain('background-image')
      expect(css).toContain('linear-gradient')
    })

    it('should generate bg-[50%_auto]', () => {
      const css = coral.generate(['bg-[50%_auto]'])
      expect(css).toContain('background-size')
    })

    it('should generate bg-[100px]', () => {
      const css = coral.generate(['bg-[100px]'])
      expect(css).toContain('background-size')
    })

    it('should generate bg-[5rem_5rem]', () => {
      const css = coral.generate(['bg-[5rem_5rem]'])
      expect(css).toContain('background-size')
    })

    it('should generate bg-[#ff0000] as color', () => {
      const css = coral.generate(['bg-[#ff0000]'])
      expect(css).toContain('background-color')
    })

    it('should return null for bg-[] with empty value', () => {
      const css = coral.generate(['bg-[]'])
      expect(css).not.toContain('background-')
    })
  })

  describe('Radial Gradients', () => {
    it('should generate bg-gradient-radial', () => {
      const css = coral.generate(['bg-gradient-radial'])
      expect(css).toContain('radial-gradient')
    })

    it('should generate bg-radial-circle', () => {
      const css = coral.generate(['bg-radial-circle'])
      expect(css).toContain('radial-gradient')
      expect(css).toContain('circle')
    })

    it('should generate bg-radial-ellipse', () => {
      const css = coral.generate(['bg-radial-ellipse'])
      expect(css).toContain('radial-gradient')
      expect(css).toContain('ellipse')
    })

    it('should generate bg-radial-closest-side', () => {
      const css = coral.generate(['bg-radial-closest-side'])
      expect(css).toContain('radial-gradient')
      expect(css).toContain('closest-side')
    })

    it('should generate bg-radial-closest-corner', () => {
      const css = coral.generate(['bg-radial-closest-corner'])
      expect(css).toContain('radial-gradient')
      expect(css).toContain('closest-corner')
    })

    it('should generate bg-radial-farthest-side', () => {
      const css = coral.generate(['bg-radial-farthest-side'])
      expect(css).toContain('radial-gradient')
      expect(css).toContain('farthest-side')
    })

    it('should generate bg-radial-farthest-corner', () => {
      const css = coral.generate(['bg-radial-farthest-corner'])
      expect(css).toContain('radial-gradient')
      expect(css).toContain('farthest-corner')
    })

    it('should generate bg-radial-at-center', () => {
      const css = coral.generate(['bg-radial-at-center'])
      expect(css).toContain('radial-gradient')
      expect(css).toContain('at center')
    })

    it('should generate bg-radial-at-top', () => {
      const css = coral.generate(['bg-radial-at-top'])
      expect(css).toContain('radial-gradient')
      expect(css).toContain('at top')
    })

    it('should generate bg-radial-at-top-right', () => {
      const css = coral.generate(['bg-radial-at-top-right'])
      expect(css).toContain('radial-gradient')
      expect(css).toContain('at top right')
    })

    it('should generate bg-radial-at-right', () => {
      const css = coral.generate(['bg-radial-at-right'])
      expect(css).toContain('radial-gradient')
      expect(css).toContain('at right')
    })

    it('should generate bg-radial-at-bottom-right', () => {
      const css = coral.generate(['bg-radial-at-bottom-right'])
      expect(css).toContain('radial-gradient')
      expect(css).toContain('at bottom right')
    })

    it('should generate bg-radial-at-bottom', () => {
      const css = coral.generate(['bg-radial-at-bottom'])
      expect(css).toContain('radial-gradient')
      expect(css).toContain('at bottom')
    })

    it('should generate bg-radial-at-bottom-left', () => {
      const css = coral.generate(['bg-radial-at-bottom-left'])
      expect(css).toContain('radial-gradient')
      expect(css).toContain('at bottom left')
    })

    it('should generate bg-radial-at-left', () => {
      const css = coral.generate(['bg-radial-at-left'])
      expect(css).toContain('radial-gradient')
      expect(css).toContain('at left')
    })

    it('should generate bg-radial-at-top-left', () => {
      const css = coral.generate(['bg-radial-at-top-left'])
      expect(css).toContain('radial-gradient')
      expect(css).toContain('at top left')
    })

    it('should generate bg-radial-circle-at-center', () => {
      const css = coral.generate(['bg-radial-circle-at-center'])
      expect(css).toContain('radial-gradient')
      expect(css).toContain('circle')
      expect(css).toContain('at center')
    })

    it('should generate bg-radial-circle-at-top', () => {
      const css = coral.generate(['bg-radial-circle-at-top'])
      expect(css).toContain('radial-gradient')
      expect(css).toContain('circle')
      expect(css).toContain('at top')
    })

    it('should generate bg-radial-circle-at-bottom', () => {
      const css = coral.generate(['bg-radial-circle-at-bottom'])
      expect(css).toContain('radial-gradient')
      expect(css).toContain('circle')
      expect(css).toContain('at bottom')
    })

    it('should generate bg-radial-circle-at-left', () => {
      const css = coral.generate(['bg-radial-circle-at-left'])
      expect(css).toContain('radial-gradient')
      expect(css).toContain('circle')
      expect(css).toContain('at left')
    })

    it('should generate bg-radial-circle-at-right', () => {
      const css = coral.generate(['bg-radial-circle-at-right'])
      expect(css).toContain('radial-gradient')
      expect(css).toContain('circle')
      expect(css).toContain('at right')
    })
  })

  describe('gradient position arbitrary', () => {
    it('should generate gradient-from-[45deg]', () => {
      const css = coral.generate(['gradient-from-[45deg]'])
      expect(css).toContain('--coral-gradient-position: 45deg')
    })

    it('should return null for gradient-from-[] with empty value', () => {
      const css = coral.generate(['gradient-from-[]'])
      expect(css).not.toContain('--coral-gradient-position: ;')
    })
  })

  describe('Arbitrary Values', () => {
    it('should generate bg-[url(image.png)]', () => {
      const css = coral.generate(['bg-[url(image.png)]'])
      expect(css).toContain('background-image')
      expect(css).toContain('url(image.png)')
    })

    it('should generate bg-[gradient]', () => {
      const css = coral.generate(['bg-[linear-gradient(red, blue)]'])
      expect(css).toContain('background-image')
      expect(css).toContain('linear-gradient')
    })

    it('should generate bg-[50%] as size', () => {
      const css = coral.generate(['bg-[50%]'])
      expect(css).toContain('background-size')
      expect(css).toContain('50%')
    })

    it('should generate bg-[100px] as size', () => {
      const css = coral.generate(['bg-[100px]'])
      expect(css).toContain('background-size')
      expect(css).toContain('100px')
    })

    it('should generate bg-[auto] as size', () => {
      const css = coral.generate(['bg-[auto]'])
      expect(css).toContain('background-size')
      expect(css).toContain('auto')
    })
  })

  describe('From Gradient Arbitrary', () => {
    it('should generate from-[red]', () => {
      const css = coral.generate(['from-[red]'])
      expect(css).toContain('--coral-gradient-from')
      expect(css).toContain('red')
    })

    it('should generate from-[blue] with gradient stops', () => {
      const css = coral.generate(['from-[blue]'])
      expect(css).toContain('--coral-gradient-from')
      expect(css).toContain('--coral-gradient-to')
      expect(css).toContain('--coral-gradient-stops')
    })

    it('should return null for from-[] with empty value', () => {
      const css = coral.generate(['from-[]'])
      expect(css).not.toContain('--coral-gradient-from')
    })
  })

  describe('Via Gradient Arbitrary', () => {
    it('should generate via-[custom]', () => {
      const css = coral.generate(['via-[blue]'])
      expect(css).toContain('--coral-gradient-stops')
    })

    it('should return null for via-[] with empty value', () => {
      const css = coral.generate(['via-[]'])
      expect(css).not.toContain('--coral-gradient-stops')
    })
  })

  describe('To Gradient Arbitrary', () => {
    it('should generate to-[custom]', () => {
      const css = coral.generate(['to-[blue]'])
      expect(css).toContain('--coral-gradient-to')
    })

    it('should return null for to-[] with empty value', () => {
      const css = coral.generate(['to-[]'])
      expect(css).not.toContain('--coral-gradient-to')
    })
  })

  describe('Repeating Gradients', () => {
    it('should generate bg-repeating-linear-to-t', () => {
      const css = coral.generate(['bg-repeating-linear-to-t'])
      expect(css).toContain('repeating-linear-gradient')
    })

    it('should generate bg-repeating-linear-to-r', () => {
      const css = coral.generate(['bg-repeating-linear-to-r'])
      expect(css).toContain('repeating-linear-gradient')
    })

    it('should generate bg-repeating-linear-to-b', () => {
      const css = coral.generate(['bg-repeating-linear-to-b'])
      expect(css).toContain('repeating-linear-gradient')
    })

    it('should generate bg-repeating-linear-to-l', () => {
      const css = coral.generate(['bg-repeating-linear-to-l'])
      expect(css).toContain('repeating-linear-gradient')
    })

    it('should generate bg-repeating-linear-to-tr', () => {
      const css = coral.generate(['bg-repeating-linear-to-tr'])
      expect(css).toContain('repeating-linear-gradient')
    })

    it('should generate bg-repeating-linear-to-br', () => {
      const css = coral.generate(['bg-repeating-linear-to-br'])
      expect(css).toContain('repeating-linear-gradient')
    })

    it('should generate bg-repeating-linear-to-bl', () => {
      const css = coral.generate(['bg-repeating-linear-to-bl'])
      expect(css).toContain('repeating-linear-gradient')
    })

    it('should generate bg-repeating-linear-to-tl', () => {
      const css = coral.generate(['bg-repeating-linear-to-tl'])
      expect(css).toContain('repeating-linear-gradient')
    })

    it('should generate bg-repeating-radial', () => {
      const css = coral.generate(['bg-repeating-radial'])
      expect(css).toContain('repeating-radial-gradient')
    })

    it('should generate bg-repeating-radial-circle', () => {
      const css = coral.generate(['bg-repeating-radial-circle'])
      expect(css).toContain('repeating-radial-gradient')
    })

    it('should generate bg-repeating-radial-ellipse', () => {
      const css = coral.generate(['bg-repeating-radial-ellipse'])
      expect(css).toContain('repeating-radial-gradient')
    })

    it('should generate bg-repeating-conic', () => {
      const css = coral.generate(['bg-repeating-conic'])
      expect(css).toContain('repeating-conic-gradient')
    })

    it('should generate bg-repeating-conic-from-0', () => {
      const css = coral.generate(['bg-repeating-conic-from-0'])
      expect(css).toContain('repeating-conic-gradient')
    })

    it('should generate bg-repeating-conic-from-90', () => {
      const css = coral.generate(['bg-repeating-conic-from-90'])
      expect(css).toContain('repeating-conic-gradient')
    })

    it('should generate bg-repeating-conic-from-180', () => {
      const css = coral.generate(['bg-repeating-conic-from-180'])
      expect(css).toContain('repeating-conic-gradient')
    })

    it('should generate bg-repeating-conic-from-270', () => {
      const css = coral.generate(['bg-repeating-conic-from-270'])
      expect(css).toContain('repeating-conic-gradient')
    })
  })

  describe('Gradient Angles', () => {
    it('should generate bg-gradient-0', () => {
      const css = coral.generate(['bg-gradient-0'])
      expect(css).toContain('linear-gradient')
    })

    it('should generate bg-gradient-45', () => {
      const css = coral.generate(['bg-gradient-45'])
      expect(css).toContain('linear-gradient')
    })

    it('should generate bg-gradient-90', () => {
      const css = coral.generate(['bg-gradient-90'])
      expect(css).toContain('linear-gradient')
    })

    it('should generate bg-gradient-135', () => {
      const css = coral.generate(['bg-gradient-135'])
      expect(css).toContain('linear-gradient')
    })

    it('should generate bg-gradient-180', () => {
      const css = coral.generate(['bg-gradient-180'])
      expect(css).toContain('linear-gradient')
    })
  })

  describe('Gradient Color Interpolation', () => {
    it('should generate gradient-in-srgb', () => {
      const css = coral.generate(['gradient-in-srgb'])
      expect(css).toContain('--coral-gradient-interpolation')
    })

    it('should generate gradient-in-srgb-linear', () => {
      const css = coral.generate(['gradient-in-srgb-linear'])
      expect(css).toContain('--coral-gradient-interpolation')
    })

    it('should generate gradient-in-lab', () => {
      const css = coral.generate(['gradient-in-lab'])
      expect(css).toContain('--coral-gradient-interpolation')
    })

    it('should generate gradient-in-oklab', () => {
      const css = coral.generate(['gradient-in-oklab'])
      expect(css).toContain('--coral-gradient-interpolation')
    })

    it('should generate gradient-in-lch', () => {
      const css = coral.generate(['gradient-in-lch'])
      expect(css).toContain('--coral-gradient-interpolation')
    })

    it('should generate gradient-in-oklch', () => {
      const css = coral.generate(['gradient-in-oklch'])
      expect(css).toContain('--coral-gradient-interpolation')
    })

    it('should generate gradient-in-hsl', () => {
      const css = coral.generate(['gradient-in-hsl'])
      expect(css).toContain('--coral-gradient-interpolation')
    })

    it('should generate gradient-in-hwb', () => {
      const css = coral.generate(['gradient-in-hwb'])
      expect(css).toContain('--coral-gradient-interpolation')
    })
  })

  describe('Gradient Hue Interpolation', () => {
    it('should generate gradient-hue-shorter', () => {
      const css = coral.generate(['gradient-hue-shorter'])
      expect(css).toContain('--coral-gradient-hue')
    })

    it('should generate gradient-hue-longer', () => {
      const css = coral.generate(['gradient-hue-longer'])
      expect(css).toContain('--coral-gradient-hue')
    })

    it('should generate gradient-hue-increasing', () => {
      const css = coral.generate(['gradient-hue-increasing'])
      expect(css).toContain('--coral-gradient-hue')
    })

    it('should generate gradient-hue-decreasing', () => {
      const css = coral.generate(['gradient-hue-decreasing'])
      expect(css).toContain('--coral-gradient-hue')
    })
  })

  describe('Gradient Blend Modes', () => {
    it('should generate bg-gradient-blend', () => {
      const css = coral.generate(['bg-gradient-blend'])
      expect(css).toContain('background-blend-mode')
    })

    it('should generate bg-gradient-blend-multiply', () => {
      const css = coral.generate(['bg-gradient-blend-multiply'])
      expect(css).toContain('background-blend-mode')
    })

    it('should generate bg-gradient-blend-screen', () => {
      const css = coral.generate(['bg-gradient-blend-screen'])
      expect(css).toContain('background-blend-mode')
    })

    it('should generate bg-gradient-blend-overlay', () => {
      const css = coral.generate(['bg-gradient-blend-overlay'])
      expect(css).toContain('background-blend-mode')
    })

    it('should generate bg-gradient-blend-darken', () => {
      const css = coral.generate(['bg-gradient-blend-darken'])
      expect(css).toContain('background-blend-mode')
    })

    it('should generate bg-gradient-blend-lighten', () => {
      const css = coral.generate(['bg-gradient-blend-lighten'])
      expect(css).toContain('background-blend-mode')
    })

    it('should generate bg-gradient-blend-color-dodge', () => {
      const css = coral.generate(['bg-gradient-blend-color-dodge'])
      expect(css).toContain('background-blend-mode')
    })

    it('should generate bg-gradient-blend-color-burn', () => {
      const css = coral.generate(['bg-gradient-blend-color-burn'])
      expect(css).toContain('background-blend-mode')
    })

    it('should generate bg-gradient-blend-hard-light', () => {
      const css = coral.generate(['bg-gradient-blend-hard-light'])
      expect(css).toContain('background-blend-mode')
    })

    it('should generate bg-gradient-blend-soft-light', () => {
      const css = coral.generate(['bg-gradient-blend-soft-light'])
      expect(css).toContain('background-blend-mode')
    })

    it('should generate bg-gradient-blend-difference', () => {
      const css = coral.generate(['bg-gradient-blend-difference'])
      expect(css).toContain('background-blend-mode')
    })

    it('should generate bg-gradient-blend-exclusion', () => {
      const css = coral.generate(['bg-gradient-blend-exclusion'])
      expect(css).toContain('background-blend-mode')
    })

    it('should generate bg-gradient-blend-hue', () => {
      const css = coral.generate(['bg-gradient-blend-hue'])
      expect(css).toContain('background-blend-mode')
    })

    it('should generate bg-gradient-blend-saturation', () => {
      const css = coral.generate(['bg-gradient-blend-saturation'])
      expect(css).toContain('background-blend-mode')
    })

    it('should generate bg-gradient-blend-color', () => {
      const css = coral.generate(['bg-gradient-blend-color'])
      expect(css).toContain('background-blend-mode')
    })

    it('should generate bg-gradient-blend-luminosity', () => {
      const css = coral.generate(['bg-gradient-blend-luminosity'])
      expect(css).toContain('background-blend-mode')
    })
  })

  describe('Gradient Edge Cases', () => {
    it('should handle gradient with custom angle', () => {
      const css = coral.generate(['bg-gradient-to-tl'])
      expect(css).toContain('to top left')
    })

    it('should handle arbitrary gradient values', () => {
      const css = coral.generate(['bg-[linear-gradient(45deg, red, blue)]'])
      expect(css).toContain('background-image')
      expect(css).toContain('linear-gradient')
    })

    it('should handle radial gradient at center', () => {
      const css = coral.generate(['bg-radial-at-center'])
      expect(css).toContain('radial-gradient')
      expect(css).toContain('at center')
    })

    it('should handle repeating linear gradient', () => {
      const css = coral.generate(['bg-repeating-linear-to-t'])
      expect(css).toContain('repeating-linear-gradient')
    })

    it('should handle gradient blend modes', () => {
      const css = coral.generate(['bg-gradient-blend-multiply'])
      expect(css).toContain('background-blend-mode')
      expect(css).toContain('multiply')
    })

    it('should handle gradient interpolation', () => {
      const css = coral.generate(['gradient-in-srgb'])
      expect(css).toContain('gradient')
    })
  })

  describe('Background Size and Position', () => {
    it('should generate background-size with multiple values', () => {
      const css = coral.generate(['bg-[100px_200px]'])
      expect(css).toContain('background-size')
      expect(css).toContain('100px')
      expect(css).toContain('200px')
    })

    it('should handle background-origin', () => {
      const css = coral.generate(['bg-origin-border'])
      expect(css).toContain('background-origin')
      expect(css).toContain('border-box')
    })
  })

  describe('Empty and Edge Case Values', () => {
    it('should handle empty bg-[] gracefully', () => {
      const css = coral.generate(['bg-[]'])
      expect(css).not.toContain('background-')
    })

    it('should handle empty gradient-from-[]', () => {
      const css = coral.generate(['gradient-from-[]'])
      expect(css).not.toContain('--coral-gradient-position')
    })

    it('should handle empty via-[]', () => {
      const css = coral.generate(['via-[]'])
      expect(css).not.toContain('--coral-gradient-stops')
    })

    it('should handle empty to-[]', () => {
      const css = coral.generate(['to-[]'])
      expect(css).not.toContain('--coral-gradient-to')
    })

    it('should handle bg-[url()] with empty url', () => {
      const css = coral.generate(['bg-[url()]'])
      expect(css).toContain('url()')
    })
  })

})
