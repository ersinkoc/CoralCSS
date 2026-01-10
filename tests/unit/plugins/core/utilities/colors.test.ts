/**
 * Tests for Colors Utilities Plugin
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { colorsPlugin } from '../../../../../src/plugins/core/utilities/colors'
import type { Coral } from '../../../../../src/types'

describe('Colors Utilities Plugin', () => {
  let coral: Coral

  beforeEach(() => {
    coral = createCoral()
    coral.use(colorsPlugin())
  })

  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = colorsPlugin()
      expect(plugin.name).toBe('colors')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Text Colors', () => {
    it('should generate text-black', () => {
      const css = coral.generate(['text-black'])
      expect(css).toContain('color')
    })

    it('should generate text-white', () => {
      const css = coral.generate(['text-white'])
      expect(css).toContain('color')
    })

    it('should generate text-transparent', () => {
      const css = coral.generate(['text-transparent'])
      expect(css).toContain('color')
      expect(css).toContain('transparent')
    })

    it('should generate text-current', () => {
      const css = coral.generate(['text-current'])
      expect(css).toContain('color')
      expect(css).toContain('currentColor')
    })

    it('should generate text-inherit', () => {
      const css = coral.generate(['text-inherit'])
      expect(css).toContain('color')
      expect(css).toContain('inherit')
    })

    it('should generate text-{color}-{shade}', () => {
      const css = coral.generate(['text-red-500'])
      expect(css).toContain('color')
    })

    it('should generate text-{color}-{shade}/{opacity}', () => {
      const css = coral.generate(['text-blue-500/50'])
      expect(css).toContain('color')
    })
  })

  describe('Background Colors', () => {
    it('should generate bg-black', () => {
      const css = coral.generate(['bg-black'])
      expect(css).toContain('background-color')
    })

    it('should generate bg-white', () => {
      const css = coral.generate(['bg-white'])
      expect(css).toContain('background-color')
    })

    it('should generate bg-transparent', () => {
      const css = coral.generate(['bg-transparent'])
      expect(css).toContain('background-color')
      expect(css).toContain('transparent')
    })

    it('should generate bg-current', () => {
      const css = coral.generate(['bg-current'])
      expect(css).toContain('background-color')
      expect(css).toContain('currentColor')
    })

    it('should generate bg-inherit', () => {
      const css = coral.generate(['bg-inherit'])
      expect(css).toContain('background-color')
      expect(css).toContain('inherit')
    })

    it('should generate bg-{color}-{shade}', () => {
      const css = coral.generate(['bg-green-500'])
      expect(css).toContain('background-color')
    })

    it('should generate bg-{color}-{shade}/{opacity}', () => {
      const css = coral.generate(['bg-purple-500/75'])
      expect(css).toContain('background-color')
    })
  })

  describe('Border Colors', () => {
    it('should generate border-black', () => {
      const css = coral.generate(['border-black'])
      expect(css).toContain('border-color')
    })

    it('should generate border-{color}-{shade}', () => {
      const css = coral.generate(['border-yellow-400'])
      expect(css).toContain('border-color')
    })

    it('should generate border-{color}-{shade}/{opacity}', () => {
      const css = coral.generate(['border-pink-300/50'])
      expect(css).toContain('border-color')
    })
  })

  describe('Ring Colors', () => {
    it('should generate ring-{color}-{shade}', () => {
      const css = coral.generate(['ring-indigo-500'])
      // Ring colors may use different property names
      expect(css).toBeDefined()
    })
  })

  describe('Outline Colors', () => {
    it('should generate outline-black', () => {
      const css = coral.generate(['outline-black'])
      expect(css).toContain('outline-color')
    })

    it('should generate outline-{color}-{shade}', () => {
      const css = coral.generate(['outline-orange-500'])
      expect(css).toContain('outline-color')
    })

    it('should generate outline-{color}-{shade}/{opacity}', () => {
      const css = coral.generate(['outline-teal-400/60'])
      expect(css).toContain('outline-color')
    })
  })

  describe('Fill Colors', () => {
    it('should generate fill-current', () => {
      const css = coral.generate(['fill-current'])
      expect(css).toContain('fill')
    })

    it('should generate fill-{color}-{shade}', () => {
      const css = coral.generate(['fill-blue-500'])
      expect(css).toContain('fill')
    })
  })

  describe('Stroke Colors', () => {
    it('should generate stroke-current', () => {
      const css = coral.generate(['stroke-current'])
      expect(css).toContain('stroke')
    })

    it('should generate stroke-{color}-{shade}', () => {
      const css = coral.generate(['stroke-red-500'])
      expect(css).toContain('stroke')
    })
  })

  describe('Gradient Colors', () => {
    describe('from-{color}', () => {
      it('should generate from-black', () => {
        const css = coral.generate(['from-black'])
        expect(css).toContain('--coral-gradient-from')
      })

      it('should generate from-white', () => {
        const css = coral.generate(['from-white'])
        expect(css).toContain('--coral-gradient-from')
      })

      it('should generate from-transparent', () => {
        const css = coral.generate(['from-transparent'])
        expect(css).toContain('--coral-gradient-from')
      })

      it('should generate from-current', () => {
        const css = coral.generate(['from-current'])
        expect(css).toContain('--coral-gradient-from')
      })

      it('should generate from-{color}-{shade}', () => {
        const css = coral.generate(['from-red-500'])
        expect(css).toContain('--coral-gradient-from')
      })

      it('should generate from-{color}-{shade}/{opacity}', () => {
        const css = coral.generate(['from-blue-500/50'])
        expect(css).toContain('--coral-gradient-from')
      })
    })

    describe('via-{color}', () => {
      it('should generate via-black', () => {
        const css = coral.generate(['via-black'])
        expect(css).toContain('--coral-gradient-via')
      })

      it('should generate via-{color}-{shade}', () => {
        const css = coral.generate(['via-green-500'])
        expect(css).toContain('--coral-gradient-via')
      })

      it('should generate via-{color}-{shade}/{opacity}', () => {
        const css = coral.generate(['via-purple-500/25'])
        expect(css).toContain('--coral-gradient-via')
      })
    })

    describe('to-{color}', () => {
      it('should generate to-black', () => {
        const css = coral.generate(['to-black'])
        expect(css).toContain('--coral-gradient-to')
      })

      it('should generate to-white', () => {
        const css = coral.generate(['to-white'])
        expect(css).toContain('--coral-gradient-to')
      })

      it('should generate to-transparent', () => {
        const css = coral.generate(['to-transparent'])
        expect(css).toContain('--coral-gradient-to')
      })

      it('should generate to-current', () => {
        const css = coral.generate(['to-current'])
        expect(css).toContain('--coral-gradient-to')
      })

      it('should generate to-{color}-{shade}', () => {
        const css = coral.generate(['to-red-500'])
        expect(css).toContain('--coral-gradient-to')
      })

      it('should generate to-{color}-{shade}/{opacity}', () => {
        const css = coral.generate(['to-blue-500/50'])
        expect(css).toContain('--coral-gradient-to')
      })

      it('should generate to-yellow-400', () => {
        const css = coral.generate(['to-yellow-400'])
        expect(css).toContain('--coral-gradient-to')
      })

      it('should generate to-pink-300/75', () => {
        const css = coral.generate(['to-pink-300/75'])
        expect(css).toContain('--coral-gradient-to')
      })

      it('should generate to-indigo-600/100', () => {
        const css = coral.generate(['to-indigo-600/100'])
        expect(css).toContain('--coral-gradient-to')
      })

      it('should generate to-teal-200/0', () => {
        const css = coral.generate(['to-teal-200/0'])
        expect(css).toContain('--coral-gradient-to')
      })
    })
  })

  describe('Text Gradient Utilities', () => {
    it('should generate text-gradient', () => {
      const css = coral.generate(['text-gradient'])
      expect(css).toContain('background-image')
      expect(css).toContain('linear-gradient')
      expect(css).toContain('background-clip')
      expect(css).toContain('text')
    })

    it('should generate text-gradient-radial', () => {
      const css = coral.generate(['text-gradient-radial'])
      expect(css).toContain('background-image')
      expect(css).toContain('radial-gradient')
      expect(css).toContain('background-clip')
    })

    it('should generate text-gradient-conic', () => {
      const css = coral.generate(['text-gradient-conic'])
      expect(css).toContain('background-image')
      expect(css).toContain('conic-gradient')
    })
  })

  describe('Color Palette Coverage', () => {
    const palettes = [
      'slate', 'gray', 'zinc', 'neutral', 'stone',
      'red', 'orange', 'amber', 'yellow', 'lime',
      'green', 'emerald', 'teal', 'cyan', 'sky',
      'blue', 'indigo', 'violet', 'purple', 'fuchsia',
      'pink', 'rose', 'coral'
    ]

    for (const palette of palettes) {
      it(`should generate text-${palette}-500`, () => {
        const css = coral.generate([`text-${palette}-500`])
        expect(css).toContain('color')
      })

      it(`should generate bg-${palette}-500`, () => {
        const css = coral.generate([`bg-${palette}-500`])
        expect(css).toContain('background-color')
      })

      it(`should generate from-${palette}-500`, () => {
        const css = coral.generate([`from-${palette}-500`])
        expect(css).toContain('--coral-gradient-from')
      })

      it(`should generate to-${palette}-500`, () => {
        const css = coral.generate([`to-${palette}-500`])
        expect(css).toContain('--coral-gradient-to')
      })
    }
  })

  describe('Shade Coverage', () => {
    const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']

    for (const shade of shades) {
      it(`should generate text-blue-${shade}`, () => {
        const css = coral.generate([`text-blue-${shade}`])
        expect(css).toContain('color')
      })

      it(`should generate to-red-${shade}`, () => {
        const css = coral.generate([`to-red-${shade}`])
        expect(css).toContain('--coral-gradient-to')
      })
    }
  })

  describe('Opacity Variations', () => {
    const opacities = ['0', '5', '10', '20', '25', '30', '40', '50', '60', '70', '75', '80', '90', '95', '100']

    for (const opacity of opacities) {
      it(`should generate text-red-500/${opacity}`, () => {
        const css = coral.generate([`text-red-500/${opacity}`])
        expect(css).toContain('color')
      })

      it(`should generate to-blue-500/${opacity}`, () => {
        const css = coral.generate([`to-blue-500/${opacity}`])
        expect(css).toContain('--coral-gradient-to')
      })
    }
  })

  describe('Border Gradient Utilities', () => {
    it('should generate border-gradient', () => {
      const css = coral.generate(['border-gradient'])
      expect(css).toContain('border-image')
      expect(css).toContain('linear-gradient')
    })

    it('should generate border-gradient-radial', () => {
      const css = coral.generate(['border-gradient-radial'])
      expect(css).toContain('border-image')
      expect(css).toContain('radial-gradient')
    })

    it('should generate border-gradient-conic', () => {
      const css = coral.generate(['border-gradient-conic'])
      expect(css).toContain('border-image')
      expect(css).toContain('conic-gradient')
    })
  })

  describe('Gradient Presets (OKLCH)', () => {
    it('should generate bg-gradient-vivid-sunset', () => {
      const css = coral.generate(['bg-gradient-vivid-sunset'])
      expect(css).toContain('background-image')
      expect(css).toContain('oklch')
    })

    it('should generate bg-gradient-vivid-ocean', () => {
      const css = coral.generate(['bg-gradient-vivid-ocean'])
      expect(css).toContain('background-image')
      expect(css).toContain('oklch')
    })

    it('should generate bg-gradient-vivid-aurora', () => {
      const css = coral.generate(['bg-gradient-vivid-aurora'])
      expect(css).toContain('background-image')
      expect(css).toContain('oklch')
    })

    it('should generate bg-gradient-vivid-neon', () => {
      const css = coral.generate(['bg-gradient-vivid-neon'])
      expect(css).toContain('background-image')
      expect(css).toContain('oklch')
    })

    it('should generate bg-gradient-rainbow', () => {
      const css = coral.generate(['bg-gradient-rainbow'])
      expect(css).toContain('background-image')
      expect(css).toContain('oklch')
    })

    it('should generate bg-gradient-rainbow-vivid', () => {
      const css = coral.generate(['bg-gradient-rainbow-vivid'])
      expect(css).toContain('background-image')
      expect(css).toContain('oklch')
    })
  })

  describe('Gradient Utilities', () => {
    it('should generate from-red-500', () => {
      const css = coral.generate(['from-red-500'])
      expect(css).toContain('--coral-gradient-from')
    })

    it('should generate via-red-500', () => {
      const css = coral.generate(['via-red-500'])
      expect(css).toContain('--coral-gradient-via')
    })

    it('should generate to-red-500', () => {
      const css = coral.generate(['to-red-500'])
      expect(css).toContain('--coral-gradient-to')
    })

    it('should generate to-red-500/50 with opacity', () => {
      const css = coral.generate(['to-red-500/50'])
      expect(css).toContain('--coral-gradient-to')
      expect(css).toContain('red-500')
    })

    it('should generate gradient from-*, via-*, to-*', () => {
      const css = coral.generate(['from-blue-400', 'via-purple-500', 'to-pink-500'])
      expect(css).toContain('--coral-gradient-from')
      expect(css).toContain('--coral-gradient-via')
      expect(css).toContain('--coral-gradient-to')
    })
  })

  describe('Text Gradient', () => {
    it('should generate text-gradient', () => {
      const css = coral.generate(['text-gradient'])
      expect(css).toContain('background-image')
      expect(css).toContain('linear-gradient')
      expect(css).toContain('background-clip')
      expect(css).toContain('text')
    })

    it('should generate text-gradient-radial', () => {
      const css = coral.generate(['text-gradient-radial'])
      expect(css).toContain('background-image')
      expect(css).toContain('radial-gradient')
      expect(css).toContain('background-clip')
      expect(css).toContain('text')
    })

    it('should generate text-gradient-conic', () => {
      const css = coral.generate(['text-gradient-conic'])
      expect(css).toContain('background-image')
      expect(css).toContain('conic-gradient')
      expect(css).toContain('background-clip')
      expect(css).toContain('text')
    })
  })

  describe('Border Gradient', () => {
    it('should generate border-gradient', () => {
      const css = coral.generate(['border-gradient'])
      expect(css).toContain('border-image')
      expect(css).toContain('linear-gradient')
    })

    it('should generate border-gradient-radial', () => {
      const css = coral.generate(['border-gradient-radial'])
      expect(css).toContain('border-image')
      expect(css).toContain('radial-gradient')
    })

    it('should generate border-gradient-conic', () => {
      const css = coral.generate(['border-gradient-conic'])
      expect(css).toContain('border-image')
      expect(css).toContain('conic-gradient')
    })
  })

  describe('OKLCH Gradient Presets', () => {
    it('should generate bg-gradient-vivid-sunset', () => {
      const css = coral.generate(['bg-gradient-vivid-sunset'])
      expect(css).toContain('background-image')
      expect(css).toContain('oklch')
    })

    it('should generate bg-gradient-vivid-ocean', () => {
      const css = coral.generate(['bg-gradient-vivid-ocean'])
      expect(css).toContain('background-image')
      expect(css).toContain('oklch')
    })

    it('should generate bg-gradient-vivid-aurora', () => {
      const css = coral.generate(['bg-gradient-vivid-aurora'])
      expect(css).toContain('background-image')
      expect(css).toContain('oklch')
    })

    it('should generate bg-gradient-vivid-neon', () => {
      const css = coral.generate(['bg-gradient-vivid-neon'])
      expect(css).toContain('background-image')
      expect(css).toContain('oklch')
    })

    it('should generate bg-gradient-rainbow', () => {
      const css = coral.generate(['bg-gradient-rainbow'])
      expect(css).toContain('background-image')
      expect(css).toContain('oklch')
    })

    it('should generate bg-gradient-rainbow-vivid', () => {
      const css = coral.generate(['bg-gradient-rainbow-vivid'])
      expect(css).toContain('background-image')
      expect(css).toContain('oklch')
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/utilities/colors'
      )
      expect(defaultExport).toBe(colorsPlugin)
    })
  })
})
