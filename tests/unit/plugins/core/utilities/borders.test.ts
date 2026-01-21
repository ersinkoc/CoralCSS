/**
 * Tests for Borders Utilities Plugin
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { bordersPlugin } from '../../../../../src/plugins/core/utilities/borders'
import type { Coral } from '../../../../../src/types'

describe('Borders Utilities Plugin', () => {
  let coral: Coral

  beforeEach(() => {
    coral = createCoral()
    coral.use(bordersPlugin())
  })

  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = bordersPlugin()
      expect(plugin.name).toBe('borders')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Border Radius Utilities', () => {
    describe('Base rounded utilities', () => {
      it('should generate rounded', () => {
        const css = coral.generate(['rounded'])
        expect(css).toContain('border-radius')
      })

      it('should generate rounded-none', () => {
        const css = coral.generate(['rounded-none'])
        expect(css).toContain('border-radius')
        expect(css).toContain('0')
      })

      it('should generate rounded-full', () => {
        const css = coral.generate(['rounded-full'])
        expect(css).toContain('border-radius')
        expect(css).toContain('9999')
      })
    })

    describe('rounded with suffixes', () => {
      it('should generate rounded-sm', () => {
        const css = coral.generate(['rounded-sm'])
        expect(css).toContain('border-radius')
      })

      it('should generate rounded-md', () => {
        const css = coral.generate(['rounded-md'])
        expect(css).toContain('border-radius')
      })

      it('should generate rounded-lg', () => {
        const css = coral.generate(['rounded-lg'])
        expect(css).toContain('border-radius')
      })

      it('should generate rounded-xl', () => {
        const css = coral.generate(['rounded-xl'])
        expect(css).toContain('border-radius')
      })

      it('should generate rounded-2xl', () => {
        const css = coral.generate(['rounded-2xl'])
        expect(css).toContain('border-radius')
      })

      it('should generate rounded-3xl', () => {
        const css = coral.generate(['rounded-3xl'])
        expect(css).toContain('border-radius')
      })
    })

    describe('rounded-t (top) with suffixes', () => {
      it('should generate rounded-t', () => {
        const css = coral.generate(['rounded-t'])
        expect(css).toContain('border-top-left-radius')
        expect(css).toContain('border-top-right-radius')
      })

      it('should generate rounded-t-sm', () => {
        const css = coral.generate(['rounded-t-sm'])
        expect(css).toContain('border-top-left-radius')
      })

      it('should generate rounded-t-md', () => {
        const css = coral.generate(['rounded-t-md'])
        expect(css).toContain('border-top-left-radius')
      })

      it('should generate rounded-t-lg', () => {
        const css = coral.generate(['rounded-t-lg'])
        expect(css).toContain('border-top-left-radius')
      })

      it('should generate rounded-t-xl', () => {
        const css = coral.generate(['rounded-t-xl'])
        expect(css).toContain('border-top-left-radius')
      })

      it('should generate rounded-t-2xl', () => {
        const css = coral.generate(['rounded-t-2xl'])
        expect(css).toContain('border-top-left-radius')
      })

      it('should generate rounded-t-3xl', () => {
        const css = coral.generate(['rounded-t-3xl'])
        expect(css).toContain('border-top-left-radius')
      })

      it('should generate rounded-t-full', () => {
        const css = coral.generate(['rounded-t-full'])
        expect(css).toContain('border-top-left-radius')
        expect(css).toContain('9999')
      })
    })

    describe('rounded-r (right) with suffixes', () => {
      it('should generate rounded-r', () => {
        const css = coral.generate(['rounded-r'])
        expect(css).toContain('border-top-right-radius')
        expect(css).toContain('border-bottom-right-radius')
      })

      it('should generate rounded-r-sm', () => {
        const css = coral.generate(['rounded-r-sm'])
        expect(css).toContain('border-top-right-radius')
      })

      it('should generate rounded-r-md', () => {
        const css = coral.generate(['rounded-r-md'])
        expect(css).toContain('border-top-right-radius')
      })

      it('should generate rounded-r-lg', () => {
        const css = coral.generate(['rounded-r-lg'])
        expect(css).toContain('border-top-right-radius')
      })

      it('should generate rounded-r-xl', () => {
        const css = coral.generate(['rounded-r-xl'])
        expect(css).toContain('border-top-right-radius')
      })

      it('should generate rounded-r-2xl', () => {
        const css = coral.generate(['rounded-r-2xl'])
        expect(css).toContain('border-top-right-radius')
      })

      it('should generate rounded-r-3xl', () => {
        const css = coral.generate(['rounded-r-3xl'])
        expect(css).toContain('border-top-right-radius')
      })

      it('should generate rounded-r-none', () => {
        const css = coral.generate(['rounded-r-none'])
        expect(css).toContain('border-top-right-radius')
        expect(css).toContain('0')
      })
    })

    describe('rounded-b (bottom) with suffixes', () => {
      it('should generate rounded-b', () => {
        const css = coral.generate(['rounded-b'])
        expect(css).toContain('border-bottom-right-radius')
        expect(css).toContain('border-bottom-left-radius')
      })

      it('should generate rounded-b-sm', () => {
        const css = coral.generate(['rounded-b-sm'])
        expect(css).toContain('border-bottom-right-radius')
      })

      it('should generate rounded-b-md', () => {
        const css = coral.generate(['rounded-b-md'])
        expect(css).toContain('border-bottom-right-radius')
      })

      it('should generate rounded-b-lg', () => {
        const css = coral.generate(['rounded-b-lg'])
        expect(css).toContain('border-bottom-right-radius')
      })

      it('should generate rounded-b-xl', () => {
        const css = coral.generate(['rounded-b-xl'])
        expect(css).toContain('border-bottom-right-radius')
      })

      it('should generate rounded-b-2xl', () => {
        const css = coral.generate(['rounded-b-2xl'])
        expect(css).toContain('border-bottom-right-radius')
      })

      it('should generate rounded-b-3xl', () => {
        const css = coral.generate(['rounded-b-3xl'])
        expect(css).toContain('border-bottom-right-radius')
      })

      it('should generate rounded-b-full', () => {
        const css = coral.generate(['rounded-b-full'])
        expect(css).toContain('border-bottom-right-radius')
        expect(css).toContain('9999')
      })
    })

    describe('rounded-l (left) with suffixes', () => {
      it('should generate rounded-l', () => {
        const css = coral.generate(['rounded-l'])
        expect(css).toContain('border-top-left-radius')
        expect(css).toContain('border-bottom-left-radius')
      })

      it('should generate rounded-l-sm', () => {
        const css = coral.generate(['rounded-l-sm'])
        expect(css).toContain('border-top-left-radius')
      })

      it('should generate rounded-l-md', () => {
        const css = coral.generate(['rounded-l-md'])
        expect(css).toContain('border-top-left-radius')
      })

      it('should generate rounded-l-lg', () => {
        const css = coral.generate(['rounded-l-lg'])
        expect(css).toContain('border-top-left-radius')
      })

      it('should generate rounded-l-xl', () => {
        const css = coral.generate(['rounded-l-xl'])
        expect(css).toContain('border-top-left-radius')
      })

      it('should generate rounded-l-2xl', () => {
        const css = coral.generate(['rounded-l-2xl'])
        expect(css).toContain('border-top-left-radius')
      })

      it('should generate rounded-l-3xl', () => {
        const css = coral.generate(['rounded-l-3xl'])
        expect(css).toContain('border-top-left-radius')
      })

      it('should generate rounded-l-none', () => {
        const css = coral.generate(['rounded-l-none'])
        expect(css).toContain('border-top-left-radius')
        expect(css).toContain('0')
      })
    })

    describe('rounded-tl (top-left) with suffixes', () => {
      it('should generate rounded-tl', () => {
        const css = coral.generate(['rounded-tl'])
        expect(css).toContain('border-top-left-radius')
      })

      it('should generate rounded-tl-sm', () => {
        const css = coral.generate(['rounded-tl-sm'])
        expect(css).toContain('border-top-left-radius')
      })

      it('should generate rounded-tl-md', () => {
        const css = coral.generate(['rounded-tl-md'])
        expect(css).toContain('border-top-left-radius')
      })

      it('should generate rounded-tl-lg', () => {
        const css = coral.generate(['rounded-tl-lg'])
        expect(css).toContain('border-top-left-radius')
      })

      it('should generate rounded-tl-xl', () => {
        const css = coral.generate(['rounded-tl-xl'])
        expect(css).toContain('border-top-left-radius')
      })

      it('should generate rounded-tl-2xl', () => {
        const css = coral.generate(['rounded-tl-2xl'])
        expect(css).toContain('border-top-left-radius')
      })

      it('should generate rounded-tl-3xl', () => {
        const css = coral.generate(['rounded-tl-3xl'])
        expect(css).toContain('border-top-left-radius')
      })

      it('should generate rounded-tl-full', () => {
        const css = coral.generate(['rounded-tl-full'])
        expect(css).toContain('border-top-left-radius')
        expect(css).toContain('9999')
      })
    })

    describe('rounded-tr (top-right) with suffixes', () => {
      it('should generate rounded-tr', () => {
        const css = coral.generate(['rounded-tr'])
        expect(css).toContain('border-top-right-radius')
      })

      it('should generate rounded-tr-sm', () => {
        const css = coral.generate(['rounded-tr-sm'])
        expect(css).toContain('border-top-right-radius')
      })

      it('should generate rounded-tr-md', () => {
        const css = coral.generate(['rounded-tr-md'])
        expect(css).toContain('border-top-right-radius')
      })

      it('should generate rounded-tr-lg', () => {
        const css = coral.generate(['rounded-tr-lg'])
        expect(css).toContain('border-top-right-radius')
      })

      it('should generate rounded-tr-xl', () => {
        const css = coral.generate(['rounded-tr-xl'])
        expect(css).toContain('border-top-right-radius')
      })

      it('should generate rounded-tr-2xl', () => {
        const css = coral.generate(['rounded-tr-2xl'])
        expect(css).toContain('border-top-right-radius')
      })

      it('should generate rounded-tr-3xl', () => {
        const css = coral.generate(['rounded-tr-3xl'])
        expect(css).toContain('border-top-right-radius')
      })

      it('should generate rounded-tr-none', () => {
        const css = coral.generate(['rounded-tr-none'])
        expect(css).toContain('border-top-right-radius')
        expect(css).toContain('0')
      })
    })

    describe('rounded-br (bottom-right) with suffixes', () => {
      it('should generate rounded-br', () => {
        const css = coral.generate(['rounded-br'])
        expect(css).toContain('border-bottom-right-radius')
      })

      it('should generate rounded-br-sm', () => {
        const css = coral.generate(['rounded-br-sm'])
        expect(css).toContain('border-bottom-right-radius')
      })

      it('should generate rounded-br-md', () => {
        const css = coral.generate(['rounded-br-md'])
        expect(css).toContain('border-bottom-right-radius')
      })

      it('should generate rounded-br-lg', () => {
        const css = coral.generate(['rounded-br-lg'])
        expect(css).toContain('border-bottom-right-radius')
      })

      it('should generate rounded-br-xl', () => {
        const css = coral.generate(['rounded-br-xl'])
        expect(css).toContain('border-bottom-right-radius')
      })

      it('should generate rounded-br-2xl', () => {
        const css = coral.generate(['rounded-br-2xl'])
        expect(css).toContain('border-bottom-right-radius')
      })

      it('should generate rounded-br-3xl', () => {
        const css = coral.generate(['rounded-br-3xl'])
        expect(css).toContain('border-bottom-right-radius')
      })

      it('should generate rounded-br-full', () => {
        const css = coral.generate(['rounded-br-full'])
        expect(css).toContain('border-bottom-right-radius')
        expect(css).toContain('9999')
      })
    })

    describe('rounded-bl (bottom-left) with suffixes', () => {
      it('should generate rounded-bl', () => {
        const css = coral.generate(['rounded-bl'])
        expect(css).toContain('border-bottom-left-radius')
      })

      it('should generate rounded-bl-sm', () => {
        const css = coral.generate(['rounded-bl-sm'])
        expect(css).toContain('border-bottom-left-radius')
      })

      it('should generate rounded-bl-md', () => {
        const css = coral.generate(['rounded-bl-md'])
        expect(css).toContain('border-bottom-left-radius')
      })

      it('should generate rounded-bl-lg', () => {
        const css = coral.generate(['rounded-bl-lg'])
        expect(css).toContain('border-bottom-left-radius')
      })

      it('should generate rounded-bl-xl', () => {
        const css = coral.generate(['rounded-bl-xl'])
        expect(css).toContain('border-bottom-left-radius')
      })

      it('should generate rounded-bl-2xl', () => {
        const css = coral.generate(['rounded-bl-2xl'])
        expect(css).toContain('border-bottom-left-radius')
      })

      it('should generate rounded-bl-3xl', () => {
        const css = coral.generate(['rounded-bl-3xl'])
        expect(css).toContain('border-bottom-left-radius')
      })

      it('should generate rounded-bl-none', () => {
        const css = coral.generate(['rounded-bl-none'])
        expect(css).toContain('border-bottom-left-radius')
        expect(css).toContain('0')
      })
    })

    describe('Arbitrary border-radius', () => {
      it('should generate arbitrary border-radius', () => {
        const css = coral.generate(['rounded-[17px]'])
        expect(css).toContain('border-radius')
        expect(css).toContain('17px')
      })

      it('should handle empty arbitrary border-radius', () => {
        const css = coral.generate(['rounded-[]'])
        expect(css).toBe('')
      })
    })
  })

  describe('Border Width Utilities', () => {
    describe('border (all sides)', () => {
      it('should generate border', () => {
        const css = coral.generate(['border'])
        expect(css).toContain('border-width')
      })

      it('should generate border-0', () => {
        const css = coral.generate(['border-0'])
        expect(css).toContain('border-width')
        expect(css).toContain('0')
      })

      it('should generate border-2', () => {
        const css = coral.generate(['border-2'])
        expect(css).toContain('border-width')
      })

      it('should generate border-4', () => {
        const css = coral.generate(['border-4'])
        expect(css).toContain('border-width')
      })

      it('should generate border-8', () => {
        const css = coral.generate(['border-8'])
        expect(css).toContain('border-width')
      })
    })

    describe('border-x (horizontal)', () => {
      it('should generate border-x', () => {
        const css = coral.generate(['border-x'])
        expect(css).toContain('border-left-width')
        expect(css).toContain('border-right-width')
      })

      it('should generate border-x-0', () => {
        const css = coral.generate(['border-x-0'])
        expect(css).toContain('border-left-width')
        expect(css).toContain('0')
      })

      it('should generate border-x-2', () => {
        const css = coral.generate(['border-x-2'])
        expect(css).toContain('border-left-width')
      })

      it('should generate border-x-4', () => {
        const css = coral.generate(['border-x-4'])
        expect(css).toContain('border-left-width')
      })

      it('should generate border-x-8', () => {
        const css = coral.generate(['border-x-8'])
        expect(css).toContain('border-left-width')
      })
    })

    describe('border-y (vertical)', () => {
      it('should generate border-y', () => {
        const css = coral.generate(['border-y'])
        expect(css).toContain('border-top-width')
        expect(css).toContain('border-bottom-width')
      })

      it('should generate border-y-0', () => {
        const css = coral.generate(['border-y-0'])
        expect(css).toContain('border-top-width')
        expect(css).toContain('0')
      })

      it('should generate border-y-2', () => {
        const css = coral.generate(['border-y-2'])
        expect(css).toContain('border-top-width')
      })

      it('should generate border-y-4', () => {
        const css = coral.generate(['border-y-4'])
        expect(css).toContain('border-top-width')
      })

      it('should generate border-y-8', () => {
        const css = coral.generate(['border-y-8'])
        expect(css).toContain('border-top-width')
      })
    })

    describe('border-t (top)', () => {
      it('should generate border-t', () => {
        const css = coral.generate(['border-t'])
        expect(css).toContain('border-top-width')
      })

      it('should generate border-t-0', () => {
        const css = coral.generate(['border-t-0'])
        expect(css).toContain('border-top-width')
        expect(css).toContain('0')
      })

      it('should generate border-t-2', () => {
        const css = coral.generate(['border-t-2'])
        expect(css).toContain('border-top-width')
      })

      it('should generate border-t-4', () => {
        const css = coral.generate(['border-t-4'])
        expect(css).toContain('border-top-width')
      })

      it('should generate border-t-8', () => {
        const css = coral.generate(['border-t-8'])
        expect(css).toContain('border-top-width')
      })
    })

    describe('border-r (right)', () => {
      it('should generate border-r', () => {
        const css = coral.generate(['border-r'])
        expect(css).toContain('border-right-width')
      })

      it('should generate border-r-0', () => {
        const css = coral.generate(['border-r-0'])
        expect(css).toContain('border-right-width')
        expect(css).toContain('0')
      })

      it('should generate border-r-2', () => {
        const css = coral.generate(['border-r-2'])
        expect(css).toContain('border-right-width')
      })

      it('should generate border-r-4', () => {
        const css = coral.generate(['border-r-4'])
        expect(css).toContain('border-right-width')
      })

      it('should generate border-r-8', () => {
        const css = coral.generate(['border-r-8'])
        expect(css).toContain('border-right-width')
      })
    })

    describe('border-b (bottom)', () => {
      it('should generate border-b', () => {
        const css = coral.generate(['border-b'])
        expect(css).toContain('border-bottom-width')
      })

      it('should generate border-b-0', () => {
        const css = coral.generate(['border-b-0'])
        expect(css).toContain('border-bottom-width')
        expect(css).toContain('0')
      })

      it('should generate border-b-2', () => {
        const css = coral.generate(['border-b-2'])
        expect(css).toContain('border-bottom-width')
      })

      it('should generate border-b-4', () => {
        const css = coral.generate(['border-b-4'])
        expect(css).toContain('border-bottom-width')
      })

      it('should generate border-b-8', () => {
        const css = coral.generate(['border-b-8'])
        expect(css).toContain('border-bottom-width')
      })
    })

    describe('border-l (left)', () => {
      it('should generate border-l', () => {
        const css = coral.generate(['border-l'])
        expect(css).toContain('border-left-width')
      })

      it('should generate border-l-0', () => {
        const css = coral.generate(['border-l-0'])
        expect(css).toContain('border-left-width')
        expect(css).toContain('0')
      })

      it('should generate border-l-2', () => {
        const css = coral.generate(['border-l-2'])
        expect(css).toContain('border-left-width')
      })

      it('should generate border-l-4', () => {
        const css = coral.generate(['border-l-4'])
        expect(css).toContain('border-left-width')
      })

      it('should generate border-l-8', () => {
        const css = coral.generate(['border-l-8'])
        expect(css).toContain('border-left-width')
      })
    })

    describe('border-s (inline-start)', () => {
      it('should generate border-s', () => {
        const css = coral.generate(['border-s'])
        expect(css).toContain('border-inline-start-width')
      })

      it('should generate border-s-0', () => {
        const css = coral.generate(['border-s-0'])
        expect(css).toContain('border-inline-start-width')
        expect(css).toContain('0')
      })

      it('should generate border-s-2', () => {
        const css = coral.generate(['border-s-2'])
        expect(css).toContain('border-inline-start-width')
      })

      it('should generate border-s-4', () => {
        const css = coral.generate(['border-s-4'])
        expect(css).toContain('border-inline-start-width')
      })

      it('should generate border-s-8', () => {
        const css = coral.generate(['border-s-8'])
        expect(css).toContain('border-inline-start-width')
      })
    })

    describe('border-e (inline-end)', () => {
      it('should generate border-e', () => {
        const css = coral.generate(['border-e'])
        expect(css).toContain('border-inline-end-width')
      })

      it('should generate border-e-0', () => {
        const css = coral.generate(['border-e-0'])
        expect(css).toContain('border-inline-end-width')
        expect(css).toContain('0')
      })

      it('should generate border-e-2', () => {
        const css = coral.generate(['border-e-2'])
        expect(css).toContain('border-inline-end-width')
      })

      it('should generate border-e-4', () => {
        const css = coral.generate(['border-e-4'])
        expect(css).toContain('border-inline-end-width')
      })

      it('should generate border-e-8', () => {
        const css = coral.generate(['border-e-8'])
        expect(css).toContain('border-inline-end-width')
      })
    })
  })

  describe('Border Style Utilities', () => {
    it('should generate border-solid', () => {
      const css = coral.generate(['border-solid'])
      expect(css).toContain('border-style')
      expect(css).toContain('solid')
    })

    it('should generate border-dashed', () => {
      const css = coral.generate(['border-dashed'])
      expect(css).toContain('border-style')
      expect(css).toContain('dashed')
    })

    it('should generate border-dotted', () => {
      const css = coral.generate(['border-dotted'])
      expect(css).toContain('border-style')
      expect(css).toContain('dotted')
    })

    it('should generate border-double', () => {
      const css = coral.generate(['border-double'])
      expect(css).toContain('border-style')
      expect(css).toContain('double')
    })

    it('should generate border-hidden', () => {
      const css = coral.generate(['border-hidden'])
      expect(css).toContain('border-style')
      expect(css).toContain('hidden')
    })

    it('should generate border-none', () => {
      const css = coral.generate(['border-none'])
      expect(css).toContain('border-style')
      expect(css).toContain('none')
    })
  })

  describe('Divide Utilities', () => {
    describe('divide-x (horizontal divider)', () => {
      it('should generate divide-x', () => {
        const css = coral.generate(['divide-x'])
        expect(css).toContain('border-left-width')
      })

      it('should generate divide-x-0', () => {
        const css = coral.generate(['divide-x-0'])
        expect(css).toContain('border-left-width')
        expect(css).toContain('0')
      })

      it('should generate divide-x-2', () => {
        const css = coral.generate(['divide-x-2'])
        expect(css).toContain('border-left-width')
      })

      it('should generate divide-x-4', () => {
        const css = coral.generate(['divide-x-4'])
        expect(css).toContain('border-left-width')
      })

      it('should generate divide-x-8', () => {
        const css = coral.generate(['divide-x-8'])
        expect(css).toContain('border-left-width')
      })
    })

    describe('divide-y (vertical divider)', () => {
      it('should generate divide-y', () => {
        const css = coral.generate(['divide-y'])
        expect(css).toContain('border-top-width')
      })

      it('should generate divide-y-0', () => {
        const css = coral.generate(['divide-y-0'])
        expect(css).toContain('border-top-width')
        expect(css).toContain('0')
      })

      it('should generate divide-y-2', () => {
        const css = coral.generate(['divide-y-2'])
        expect(css).toContain('border-top-width')
      })

      it('should generate divide-y-4', () => {
        const css = coral.generate(['divide-y-4'])
        expect(css).toContain('border-top-width')
      })

      it('should generate divide-y-8', () => {
        const css = coral.generate(['divide-y-8'])
        expect(css).toContain('border-top-width')
      })
    })

    describe('divide styles', () => {
      it('should generate divide-solid', () => {
        const css = coral.generate(['divide-solid'])
        expect(css).toContain('border-style')
        expect(css).toContain('solid')
      })

      it('should generate divide-dashed', () => {
        const css = coral.generate(['divide-dashed'])
        expect(css).toContain('border-style')
        expect(css).toContain('dashed')
      })

      it('should generate divide-dotted', () => {
        const css = coral.generate(['divide-dotted'])
        expect(css).toContain('border-style')
        expect(css).toContain('dotted')
      })

      it('should generate divide-double', () => {
        const css = coral.generate(['divide-double'])
        expect(css).toContain('border-style')
        expect(css).toContain('double')
      })

      it('should generate divide-none', () => {
        const css = coral.generate(['divide-none'])
        expect(css).toContain('border-style')
        expect(css).toContain('none')
      })
    })
  })

  describe('Outline Utilities', () => {
    it('should generate outline-0', () => {
      const css = coral.generate(['outline-0'])
      expect(css).toContain('outline-width')
      expect(css).toContain('0px')
    })

    it('should generate outline-1', () => {
      const css = coral.generate(['outline-1'])
      expect(css).toContain('outline-width')
      expect(css).toContain('1px')
    })

    it('should generate outline-2', () => {
      const css = coral.generate(['outline-2'])
      expect(css).toContain('outline-width')
      expect(css).toContain('2px')
    })

    it('should generate outline-4', () => {
      const css = coral.generate(['outline-4'])
      expect(css).toContain('outline-width')
      expect(css).toContain('4px')
    })

    it('should generate outline-8', () => {
      const css = coral.generate(['outline-8'])
      expect(css).toContain('outline-width')
      expect(css).toContain('8px')
    })

    it('should generate outline', () => {
      const css = coral.generate(['outline'])
      expect(css).toContain('outline-style')
      expect(css).toContain('solid')
    })

    it('should generate outline-none', () => {
      const css = coral.generate(['outline-none'])
      expect(css).toContain('outline')
    })

    it('should generate outline-dashed', () => {
      const css = coral.generate(['outline-dashed'])
      expect(css).toContain('outline-style')
      expect(css).toContain('dashed')
    })

    it('should generate outline-dotted', () => {
      const css = coral.generate(['outline-dotted'])
      expect(css).toContain('outline-style')
      expect(css).toContain('dotted')
    })

    it('should generate outline-double', () => {
      const css = coral.generate(['outline-double'])
      expect(css).toContain('outline-style')
      expect(css).toContain('double')
    })
  })

  describe('Outline Offset Utilities', () => {
    it('should generate outline-offset-0', () => {
      const css = coral.generate(['outline-offset-0'])
      expect(css).toContain('outline-offset')
      expect(css).toContain('0px')
    })

    it('should generate outline-offset-1', () => {
      const css = coral.generate(['outline-offset-1'])
      expect(css).toContain('outline-offset')
      expect(css).toContain('1px')
    })

    it('should generate outline-offset-2', () => {
      const css = coral.generate(['outline-offset-2'])
      expect(css).toContain('outline-offset')
      expect(css).toContain('2px')
    })

    it('should generate outline-offset-4', () => {
      const css = coral.generate(['outline-offset-4'])
      expect(css).toContain('outline-offset')
      expect(css).toContain('4px')
    })

    it('should generate outline-offset-8', () => {
      const css = coral.generate(['outline-offset-8'])
      expect(css).toContain('outline-offset')
      expect(css).toContain('8px')
    })
  })

  describe('Ring Utilities', () => {
    it('should generate ring', () => {
      const css = coral.generate(['ring'])
      expect(css).toContain('--coral-ring-offset-shadow')
      expect(css).toContain('--coral-ring-shadow')
      expect(css).toContain('box-shadow')
    })

    it('should generate ring-0', () => {
      const css = coral.generate(['ring-0'])
      expect(css).toContain('--coral-ring-shadow')
      expect(css).toContain('calc(0px')
    })

    it('should generate ring-1', () => {
      const css = coral.generate(['ring-1'])
      expect(css).toContain('--coral-ring-shadow')
      expect(css).toContain('calc(1px')
    })

    it('should generate ring-2', () => {
      const css = coral.generate(['ring-2'])
      expect(css).toContain('--coral-ring-shadow')
      expect(css).toContain('calc(2px')
    })

    it('should generate ring-4', () => {
      const css = coral.generate(['ring-4'])
      expect(css).toContain('--coral-ring-shadow')
      expect(css).toContain('calc(4px')
    })

    it('should generate ring-8', () => {
      const css = coral.generate(['ring-8'])
      expect(css).toContain('--coral-ring-shadow')
      expect(css).toContain('calc(8px')
    })

    it('should generate ring-inset', () => {
      const css = coral.generate(['ring-inset'])
      expect(css).toContain('--coral-ring-inset')
      expect(css).toContain('inset')
    })
  })

  describe('Ring Offset Utilities', () => {
    it('should generate ring-offset-0', () => {
      const css = coral.generate(['ring-offset-0'])
      expect(css).toContain('--coral-ring-offset-width')
      expect(css).toContain('0px')
    })

    it('should generate ring-offset-1', () => {
      const css = coral.generate(['ring-offset-1'])
      expect(css).toContain('--coral-ring-offset-width')
      expect(css).toContain('1px')
    })

    it('should generate ring-offset-2', () => {
      const css = coral.generate(['ring-offset-2'])
      expect(css).toContain('--coral-ring-offset-width')
      expect(css).toContain('2px')
    })

    it('should generate ring-offset-4', () => {
      const css = coral.generate(['ring-offset-4'])
      expect(css).toContain('--coral-ring-offset-width')
      expect(css).toContain('4px')
    })

    it('should generate ring-offset-8', () => {
      const css = coral.generate(['ring-offset-8'])
      expect(css).toContain('--coral-ring-offset-width')
      expect(css).toContain('8px')
    })
  })

  describe('Arbitrary Values', () => {
    it('should generate arbitrary border width', () => {
      const css = coral.generate(['border-[17px]'])
      expect(css).toContain('border-width')
      expect(css).toContain('17px')
    })

    it('should generate arbitrary border color', () => {
      const css = coral.generate(['border-[#ff6b6b]'])
      expect(css).toContain('border-color')
      expect(css).toContain('#ff6b6b')
    })

    it('should generate arbitrary outline', () => {
      const css = coral.generate(['outline-[3px_solid_red]'])
      expect(css).toContain('outline')
      expect(css).toContain('3px')
    })

    it('should generate arbitrary outline-offset', () => {
      const css = coral.generate(['outline-offset-[17px]'])
      expect(css).toContain('outline-offset')
      expect(css).toContain('17px')
    })

    it('should generate arbitrary ring', () => {
      const css = coral.generate(['ring-[17px]'])
      expect(css).toContain('--coral-ring-shadow')
      expect(css).toContain('17px')
    })

    it('should generate arbitrary ring-offset', () => {
      const css = coral.generate(['ring-offset-[17px]'])
      expect(css).toContain('--coral-ring-offset-width')
      expect(css).toContain('17px')
    })
  })

  describe('Logical Border Properties', () => {
    describe('border-block', () => {
      it('should generate border-block', () => {
        const css = coral.generate(['border-block'])
        expect(css).toContain('border-block-width')
      })

      it('should generate border-block-0', () => {
        const css = coral.generate(['border-block-0'])
        expect(css).toContain('border-block-width')
        expect(css).toContain('0')
      })

      it('should generate border-block-2', () => {
        const css = coral.generate(['border-block-2'])
        expect(css).toContain('border-block-width')
      })

      it('should generate border-block-4', () => {
        const css = coral.generate(['border-block-4'])
        expect(css).toContain('border-block-width')
      })

      it('should generate border-block-8', () => {
        const css = coral.generate(['border-block-8'])
        expect(css).toContain('border-block-width')
      })
    })

    describe('border-block-start', () => {
      it('should generate border-block-start', () => {
        const css = coral.generate(['border-block-start'])
        expect(css).toContain('border-block-start-width')
      })

      it('should generate border-block-start-0', () => {
        const css = coral.generate(['border-block-start-0'])
        expect(css).toContain('border-block-start-width')
        expect(css).toContain('0')
      })

      it('should generate border-block-start-2', () => {
        const css = coral.generate(['border-block-start-2'])
        expect(css).toContain('border-block-start-width')
      })
    })

    describe('border-block-end', () => {
      it('should generate border-block-end', () => {
        const css = coral.generate(['border-block-end'])
        expect(css).toContain('border-block-end-width')
      })

      it('should generate border-block-end-0', () => {
        const css = coral.generate(['border-block-end-0'])
        expect(css).toContain('border-block-end-width')
        expect(css).toContain('0')
      })

      it('should generate border-block-end-4', () => {
        const css = coral.generate(['border-block-end-4'])
        expect(css).toContain('border-block-end-width')
      })
    })

    describe('border-inline', () => {
      it('should generate border-inline', () => {
        const css = coral.generate(['border-inline'])
        expect(css).toContain('border-inline-width')
      })

      it('should generate border-inline-0', () => {
        const css = coral.generate(['border-inline-0'])
        expect(css).toContain('border-inline-width')
        expect(css).toContain('0')
      })

      it('should generate border-inline-2', () => {
        const css = coral.generate(['border-inline-2'])
        expect(css).toContain('border-inline-width')
      })
    })

    describe('border-inline-start', () => {
      it('should generate border-inline-start', () => {
        const css = coral.generate(['border-inline-start'])
        expect(css).toContain('border-inline-start-width')
      })

      it('should generate border-inline-start-0', () => {
        const css = coral.generate(['border-inline-start-0'])
        expect(css).toContain('border-inline-start-width')
        expect(css).toContain('0')
      })

      it('should generate border-inline-start-4', () => {
        const css = coral.generate(['border-inline-start-4'])
        expect(css).toContain('border-inline-start-width')
      })
    })

    describe('border-inline-end', () => {
      it('should generate border-inline-end', () => {
        const css = coral.generate(['border-inline-end'])
        expect(css).toContain('border-inline-end-width')
      })

      it('should generate border-inline-end-0', () => {
        const css = coral.generate(['border-inline-end-0'])
        expect(css).toContain('border-inline-end-width')
        expect(css).toContain('0')
      })

      it('should generate border-inline-end-8', () => {
        const css = coral.generate(['border-inline-end-8'])
        expect(css).toContain('border-inline-end-width')
      })
    })
  })

  describe('Border Image Utilities', () => {
    it('should generate border-image-none', () => {
      const css = coral.generate(['border-image-none'])
      expect(css).toContain('border-image-source')
      expect(css).toContain('none')
    })

    it('should generate border-image-slice-0', () => {
      const css = coral.generate(['border-image-slice-0'])
      expect(css).toContain('border-image-slice')
      expect(css).toContain('0')
    })

    it('should generate border-image-slice-fill', () => {
      const css = coral.generate(['border-image-slice-fill'])
      expect(css).toContain('border-image-slice')
      expect(css).toContain('fill')
    })

    it('should generate border-image-width-0', () => {
      const css = coral.generate(['border-image-width-0'])
      expect(css).toContain('border-image-width')
      expect(css).toContain('0')
    })

    it('should generate border-image-width-auto', () => {
      const css = coral.generate(['border-image-width-auto'])
      expect(css).toContain('border-image-width')
      expect(css).toContain('auto')
    })

    it('should generate border-image-outset-0', () => {
      const css = coral.generate(['border-image-outset-0'])
      expect(css).toContain('border-image-outset')
      expect(css).toContain('0')
    })

    it('should generate border-image-repeat-stretch', () => {
      const css = coral.generate(['border-image-repeat-stretch'])
      expect(css).toContain('border-image-repeat')
      expect(css).toContain('stretch')
    })

    it('should generate border-image-repeat-repeat', () => {
      const css = coral.generate(['border-image-repeat-repeat'])
      expect(css).toContain('border-image-repeat')
      expect(css).toContain('repeat')
    })

    it('should generate border-image-repeat-round', () => {
      const css = coral.generate(['border-image-repeat-round'])
      expect(css).toContain('border-image-repeat')
      expect(css).toContain('round')
    })

    it('should generate border-image-repeat-space', () => {
      const css = coral.generate(['border-image-repeat-space'])
      expect(css).toContain('border-image-repeat')
      expect(css).toContain('space')
    })

    it('should generate border-gradient-to-r', () => {
      const css = coral.generate(['border-gradient-to-r'])
      expect(css).toContain('border-image-source')
      expect(css).toContain('linear-gradient')
    })

    it('should generate border-gradient-to-b', () => {
      const css = coral.generate(['border-gradient-to-b'])
      expect(css).toContain('border-image-source')
      expect(css).toContain('linear-gradient')
    })

    it('should generate border-gradient-conic', () => {
      const css = coral.generate(['border-gradient-conic'])
      expect(css).toContain('border-image-source')
      expect(css).toContain('conic-gradient')
    })
  })

  describe('Border Spacing Utilities', () => {
    it('should generate border-spacing-0', () => {
      const css = coral.generate(['border-spacing-0'])
      expect(css).toContain('border-spacing')
      expect(css).toContain('0px')
    })

    it('should generate border-spacing-4', () => {
      const css = coral.generate(['border-spacing-4'])
      expect(css).toContain('border-spacing')
    })

    it('should generate border-spacing-x-4', () => {
      const css = coral.generate(['border-spacing-x-4'])
      expect(css).toContain('border-spacing')
    })

    it('should generate border-spacing-y-4', () => {
      const css = coral.generate(['border-spacing-y-4'])
      expect(css).toContain('border-spacing')
    })
  })

  describe('Border Collapse Utilities', () => {
    it('should generate border-collapse', () => {
      const css = coral.generate(['border-collapse'])
      expect(css).toContain('border-collapse')
      expect(css).toContain('collapse')
    })

    it('should generate border-separate', () => {
      const css = coral.generate(['border-separate'])
      expect(css).toContain('border-collapse')
      expect(css).toContain('separate')
    })
  })

  describe('Table Layout Utilities', () => {
    it('should generate table-auto', () => {
      const css = coral.generate(['table-auto'])
      expect(css).toContain('table-layout')
      expect(css).toContain('auto')
    })

    it('should generate table-fixed', () => {
      const css = coral.generate(['table-fixed'])
      expect(css).toContain('table-layout')
      expect(css).toContain('fixed')
    })
  })

  describe('Caption Side Utilities', () => {
    it('should generate caption-top', () => {
      const css = coral.generate(['caption-top'])
      expect(css).toContain('caption-side')
      expect(css).toContain('top')
    })

    it('should generate caption-bottom', () => {
      const css = coral.generate(['caption-bottom'])
      expect(css).toContain('caption-side')
      expect(css).toContain('bottom')
    })
  })

  describe('Empty Cells Utilities', () => {
    it('should generate empty-cells-show', () => {
      const css = coral.generate(['empty-cells-show'])
      expect(css).toContain('empty-cells')
      expect(css).toContain('show')
    })

    it('should generate empty-cells-hide', () => {
      const css = coral.generate(['empty-cells-hide'])
      expect(css).toContain('empty-cells')
      expect(css).toContain('hide')
    })
  })

  describe('Logical Border Radius Utilities', () => {
    describe('rounded-s (start) with suffixes', () => {
      it('should generate rounded-s', () => {
        const css = coral.generate(['rounded-s'])
        expect(css).toContain('border-start-start-radius')
        expect(css).toContain('border-end-start-radius')
      })

      it('should generate rounded-s-sm', () => {
        const css = coral.generate(['rounded-s-sm'])
        expect(css).toContain('border-start-start-radius')
        expect(css).toContain('border-end-start-radius')
      })

      it('should generate rounded-s-md', () => {
        const css = coral.generate(['rounded-s-md'])
        expect(css).toContain('border-start-start-radius')
      })

      it('should generate rounded-s-lg', () => {
        const css = coral.generate(['rounded-s-lg'])
        expect(css).toContain('border-start-start-radius')
      })

      it('should generate rounded-s-xl', () => {
        const css = coral.generate(['rounded-s-xl'])
        expect(css).toContain('border-start-start-radius')
      })

      it('should generate rounded-s-2xl', () => {
        const css = coral.generate(['rounded-s-2xl'])
        expect(css).toContain('border-start-start-radius')
      })

      it('should generate rounded-s-3xl', () => {
        const css = coral.generate(['rounded-s-3xl'])
        expect(css).toContain('border-start-start-radius')
      })

      it('should generate rounded-s-none', () => {
        const css = coral.generate(['rounded-s-none'])
        expect(css).toContain('border-start-start-radius')
        expect(css).toContain('0')
      })
    })

    describe('rounded-e (end) with suffixes', () => {
      it('should generate rounded-e', () => {
        const css = coral.generate(['rounded-e'])
        expect(css).toContain('border-start-end-radius')
        expect(css).toContain('border-end-end-radius')
      })

      it('should generate rounded-e-sm', () => {
        const css = coral.generate(['rounded-e-sm'])
        expect(css).toContain('border-start-end-radius')
      })

      it('should generate rounded-e-md', () => {
        const css = coral.generate(['rounded-e-md'])
        expect(css).toContain('border-start-end-radius')
      })

      it('should generate rounded-e-lg', () => {
        const css = coral.generate(['rounded-e-lg'])
        expect(css).toContain('border-start-end-radius')
      })

      it('should generate rounded-e-xl', () => {
        const css = coral.generate(['rounded-e-xl'])
        expect(css).toContain('border-start-end-radius')
      })

      it('should generate rounded-e-2xl', () => {
        const css = coral.generate(['rounded-e-2xl'])
        expect(css).toContain('border-start-end-radius')
      })

      it('should generate rounded-e-3xl', () => {
        const css = coral.generate(['rounded-e-3xl'])
        expect(css).toContain('border-start-end-radius')
      })

      it('should generate rounded-e-full', () => {
        const css = coral.generate(['rounded-e-full'])
        expect(css).toContain('border-start-end-radius')
        expect(css).toContain('9999')
      })
    })

    describe('rounded-ss (start-start) with suffixes', () => {
      it('should generate rounded-ss', () => {
        const css = coral.generate(['rounded-ss'])
        expect(css).toContain('border-start-start-radius')
      })

      it('should generate rounded-ss-sm', () => {
        const css = coral.generate(['rounded-ss-sm'])
        expect(css).toContain('border-start-start-radius')
      })

      it('should generate rounded-ss-md', () => {
        const css = coral.generate(['rounded-ss-md'])
        expect(css).toContain('border-start-start-radius')
      })

      it('should generate rounded-ss-lg', () => {
        const css = coral.generate(['rounded-ss-lg'])
        expect(css).toContain('border-start-start-radius')
      })

      it('should generate rounded-ss-xl', () => {
        const css = coral.generate(['rounded-ss-xl'])
        expect(css).toContain('border-start-start-radius')
      })

      it('should generate rounded-ss-2xl', () => {
        const css = coral.generate(['rounded-ss-2xl'])
        expect(css).toContain('border-start-start-radius')
      })

      it('should generate rounded-ss-3xl', () => {
        const css = coral.generate(['rounded-ss-3xl'])
        expect(css).toContain('border-start-start-radius')
      })

      it('should generate rounded-ss-none', () => {
        const css = coral.generate(['rounded-ss-none'])
        expect(css).toContain('border-start-start-radius')
        expect(css).toContain('0')
      })
    })

    describe('rounded-se (start-end) with suffixes', () => {
      it('should generate rounded-se', () => {
        const css = coral.generate(['rounded-se'])
        expect(css).toContain('border-start-end-radius')
      })

      it('should generate rounded-se-sm', () => {
        const css = coral.generate(['rounded-se-sm'])
        expect(css).toContain('border-start-end-radius')
      })

      it('should generate rounded-se-md', () => {
        const css = coral.generate(['rounded-se-md'])
        expect(css).toContain('border-start-end-radius')
      })

      it('should generate rounded-se-lg', () => {
        const css = coral.generate(['rounded-se-lg'])
        expect(css).toContain('border-start-end-radius')
      })

      it('should generate rounded-se-xl', () => {
        const css = coral.generate(['rounded-se-xl'])
        expect(css).toContain('border-start-end-radius')
      })

      it('should generate rounded-se-2xl', () => {
        const css = coral.generate(['rounded-se-2xl'])
        expect(css).toContain('border-start-end-radius')
      })

      it('should generate rounded-se-3xl', () => {
        const css = coral.generate(['rounded-se-3xl'])
        expect(css).toContain('border-start-end-radius')
      })

      it('should generate rounded-se-full', () => {
        const css = coral.generate(['rounded-se-full'])
        expect(css).toContain('border-start-end-radius')
        expect(css).toContain('9999')
      })
    })

    describe('rounded-ee (end-end) with suffixes', () => {
      it('should generate rounded-ee', () => {
        const css = coral.generate(['rounded-ee'])
        expect(css).toContain('border-end-end-radius')
      })

      it('should generate rounded-ee-sm', () => {
        const css = coral.generate(['rounded-ee-sm'])
        expect(css).toContain('border-end-end-radius')
      })

      it('should generate rounded-ee-md', () => {
        const css = coral.generate(['rounded-ee-md'])
        expect(css).toContain('border-end-end-radius')
      })

      it('should generate rounded-ee-lg', () => {
        const css = coral.generate(['rounded-ee-lg'])
        expect(css).toContain('border-end-end-radius')
      })

      it('should generate rounded-ee-xl', () => {
        const css = coral.generate(['rounded-ee-xl'])
        expect(css).toContain('border-end-end-radius')
      })

      it('should generate rounded-ee-2xl', () => {
        const css = coral.generate(['rounded-ee-2xl'])
        expect(css).toContain('border-end-end-radius')
      })

      it('should generate rounded-ee-3xl', () => {
        const css = coral.generate(['rounded-ee-3xl'])
        expect(css).toContain('border-end-end-radius')
      })

      it('should generate rounded-ee-full', () => {
        const css = coral.generate(['rounded-ee-full'])
        expect(css).toContain('border-end-end-radius')
        expect(css).toContain('9999')
      })
    })

    describe('rounded-es (end-start) with suffixes', () => {
      it('should generate rounded-es', () => {
        const css = coral.generate(['rounded-es'])
        expect(css).toContain('border-end-start-radius')
      })

      it('should generate rounded-es-sm', () => {
        const css = coral.generate(['rounded-es-sm'])
        expect(css).toContain('border-end-start-radius')
      })

      it('should generate rounded-es-md', () => {
        const css = coral.generate(['rounded-es-md'])
        expect(css).toContain('border-end-start-radius')
      })

      it('should generate rounded-es-lg', () => {
        const css = coral.generate(['rounded-es-lg'])
        expect(css).toContain('border-end-start-radius')
      })

      it('should generate rounded-es-xl', () => {
        const css = coral.generate(['rounded-es-xl'])
        expect(css).toContain('border-end-start-radius')
      })

      it('should generate rounded-es-2xl', () => {
        const css = coral.generate(['rounded-es-2xl'])
        expect(css).toContain('border-end-start-radius')
      })

      it('should generate rounded-es-3xl', () => {
        const css = coral.generate(['rounded-es-3xl'])
        expect(css).toContain('border-end-start-radius')
      })

      it('should generate rounded-es-full', () => {
        const css = coral.generate(['rounded-es-full'])
        expect(css).toContain('border-end-start-radius')
        expect(css).toContain('9999')
      })
    })

    describe('rounded-bs (block-start) with suffixes', () => {
      it('should generate rounded-bs', () => {
        const css = coral.generate(['rounded-bs'])
        expect(css).toContain('border-start-start-radius')
        expect(css).toContain('border-start-end-radius')
      })

      it('should generate rounded-bs-sm', () => {
        const css = coral.generate(['rounded-bs-sm'])
        expect(css).toContain('border-start-start-radius')
      })

      it('should generate rounded-bs-md', () => {
        const css = coral.generate(['rounded-bs-md'])
        expect(css).toContain('border-start-start-radius')
      })

      it('should generate rounded-bs-lg', () => {
        const css = coral.generate(['rounded-bs-lg'])
        expect(css).toContain('border-start-start-radius')
      })

      it('should generate rounded-bs-xl', () => {
        const css = coral.generate(['rounded-bs-xl'])
        expect(css).toContain('border-start-start-radius')
      })

      it('should generate rounded-bs-2xl', () => {
        const css = coral.generate(['rounded-bs-2xl'])
        expect(css).toContain('border-start-start-radius')
      })

      it('should generate rounded-bs-3xl', () => {
        const css = coral.generate(['rounded-bs-3xl'])
        expect(css).toContain('border-start-start-radius')
      })

      it('should generate rounded-bs-none', () => {
        const css = coral.generate(['rounded-bs-none'])
        expect(css).toContain('border-start-start-radius')
        expect(css).toContain('0')
      })
    })

    describe('rounded-be (block-end) with suffixes', () => {
      it('should generate rounded-be', () => {
        const css = coral.generate(['rounded-be'])
        expect(css).toContain('border-end-start-radius')
        expect(css).toContain('border-end-end-radius')
      })

      it('should generate rounded-be-sm', () => {
        const css = coral.generate(['rounded-be-sm'])
        expect(css).toContain('border-end-start-radius')
      })

      it('should generate rounded-be-md', () => {
        const css = coral.generate(['rounded-be-md'])
        expect(css).toContain('border-end-start-radius')
      })

      it('should generate rounded-be-lg', () => {
        const css = coral.generate(['rounded-be-lg'])
        expect(css).toContain('border-end-start-radius')
      })

      it('should generate rounded-be-xl', () => {
        const css = coral.generate(['rounded-be-xl'])
        expect(css).toContain('border-end-start-radius')
      })

      it('should generate rounded-be-2xl', () => {
        const css = coral.generate(['rounded-be-2xl'])
        expect(css).toContain('border-end-start-radius')
      })

      it('should generate rounded-be-3xl', () => {
        const css = coral.generate(['rounded-be-3xl'])
        expect(css).toContain('border-end-start-radius')
      })

      it('should generate rounded-be-full', () => {
        const css = coral.generate(['rounded-be-full'])
        expect(css).toContain('border-end-start-radius')
        expect(css).toContain('9999')
      })
    })
  })

  describe('Border Image Slice Utilities', () => {
    it('should generate border-image-slice-0', () => {
      const css = coral.generate(['border-image-slice-0'])
      expect(css).toContain('border-image-slice')
      expect(css).toContain('0')
    })

    it('should generate border-image-slice-1', () => {
      const css = coral.generate(['border-image-slice-1'])
      expect(css).toContain('border-image-slice')
      expect(css).toContain('1')
    })

    it('should generate border-image-slice-10', () => {
      const css = coral.generate(['border-image-slice-10'])
      expect(css).toContain('border-image-slice')
      expect(css).toContain('10')
    })

    it('should generate border-image-slice-20', () => {
      const css = coral.generate(['border-image-slice-20'])
      expect(css).toContain('border-image-slice')
      expect(css).toContain('20')
    })

    it('should generate border-image-slice-30', () => {
      const css = coral.generate(['border-image-slice-30'])
      expect(css).toContain('border-image-slice')
      expect(css).toContain('30%')
    })

    it('should generate arbitrary border-image-slice', () => {
      const css = coral.generate(['border-image-slice-[50%]'])
      expect(css).toContain('border-image-slice')
      expect(css).toContain('50%')
    })

    it('should handle empty arbitrary border-image-slice', () => {
      const css = coral.generate(['border-image-slice-[]'])
      expect(css).toBe('')
    })
  })

  describe('Border Image Width Utilities', () => {
    it('should generate border-image-width-0', () => {
      const css = coral.generate(['border-image-width-0'])
      expect(css).toContain('border-image-width')
      expect(css).toContain('0')
    })

    it('should generate border-image-width-1', () => {
      const css = coral.generate(['border-image-width-1'])
      expect(css).toContain('border-image-width')
      expect(css).toContain('1')
    })

    it('should generate border-image-width-2', () => {
      const css = coral.generate(['border-image-width-2'])
      expect(css).toContain('border-image-width')
      expect(css).toContain('2')
    })

    it('should generate arbitrary border-image-width', () => {
      const css = coral.generate(['border-image-width-[3rem]'])
      expect(css).toContain('border-image-width')
      expect(css).toContain('3rem')
    })

    it('should handle empty arbitrary border-image-width', () => {
      const css = coral.generate(['border-image-width-[]'])
      expect(css).toBe('')
    })
  })

  describe('Border Image Outset Utilities', () => {
    it('should generate border-image-outset-0', () => {
      const css = coral.generate(['border-image-outset-0'])
      expect(css).toContain('border-image-outset')
      expect(css).toContain('0')
    })

    it('should generate border-image-outset-1', () => {
      const css = coral.generate(['border-image-outset-1'])
      expect(css).toContain('border-image-outset')
      expect(css).toContain('1')
    })

    it('should generate border-image-outset-2', () => {
      const css = coral.generate(['border-image-outset-2'])
      expect(css).toContain('border-image-outset')
      expect(css).toContain('2')
    })

    it('should generate arbitrary border-image-outset', () => {
      const css = coral.generate(['border-image-outset-[5px]'])
      expect(css).toContain('border-image-outset')
      expect(css).toContain('5px')
    })

    it('should handle empty arbitrary border-image-outset', () => {
      const css = coral.generate(['border-image-outset-[]'])
      expect(css).toBe('')
    })
  })

  describe('Border Image Arbitrary Utilities', () => {
    it('should generate arbitrary border-image', () => {
      const css = coral.generate(['border-image-[url(border.png)_30_round]'])
      expect(css).toContain('border-image')
      expect(css).toContain('url(border.png)_30_round')
    })

    it('should handle empty arbitrary border-image', () => {
      const css = coral.generate(['border-image-[]'])
      expect(css).toBe('')
    })
  })

  describe('Border Gradient Utilities', () => {
    it('should generate border-gradient-to-br', () => {
      const css = coral.generate(['border-gradient-to-br'])
      expect(css).toContain('border-image-source')
      expect(css).toContain('linear-gradient')
      expect(css).toContain('bottom right')
    })
  })

  describe('Text Emphasis Style Utilities', () => {
    it('should generate text-emphasis-none', () => {
      const css = coral.generate(['text-emphasis-none'])
      expect(css).toContain('text-emphasis-style')
      expect(css).toContain('none')
    })

    it('should generate text-emphasis-filled', () => {
      const css = coral.generate(['text-emphasis-filled'])
      expect(css).toContain('text-emphasis-style')
      expect(css).toContain('filled')
    })

    it('should generate text-emphasis-open', () => {
      const css = coral.generate(['text-emphasis-open'])
      expect(css).toContain('text-emphasis-style')
      expect(css).toContain('open')
    })

    it('should generate text-emphasis-dot', () => {
      const css = coral.generate(['text-emphasis-dot'])
      expect(css).toContain('text-emphasis-style')
      expect(css).toContain('dot')
    })

    it('should generate text-emphasis-circle', () => {
      const css = coral.generate(['text-emphasis-circle'])
      expect(css).toContain('text-emphasis-style')
      expect(css).toContain('circle')
    })

    it('should generate text-emphasis-double-circle', () => {
      const css = coral.generate(['text-emphasis-double-circle'])
      expect(css).toContain('text-emphasis-style')
      expect(css).toContain('double-circle')
    })

    it('should generate text-emphasis-triangle', () => {
      const css = coral.generate(['text-emphasis-triangle'])
      expect(css).toContain('text-emphasis-style')
      expect(css).toContain('triangle')
    })

    it('should generate text-emphasis-sesame', () => {
      const css = coral.generate(['text-emphasis-sesame'])
      expect(css).toContain('text-emphasis-style')
      expect(css).toContain('sesame')
    })

    it('should generate text-emphasis-filled-dot', () => {
      const css = coral.generate(['text-emphasis-filled-dot'])
      expect(css).toContain('text-emphasis-style')
      expect(css).toContain('filled dot')
    })

    it('should generate text-emphasis-open-dot', () => {
      const css = coral.generate(['text-emphasis-open-dot'])
      expect(css).toContain('text-emphasis-style')
      expect(css).toContain('open dot')
    })

    it('should generate text-emphasis-filled-circle', () => {
      const css = coral.generate(['text-emphasis-filled-circle'])
      expect(css).toContain('text-emphasis-style')
      expect(css).toContain('filled circle')
    })

    it('should generate text-emphasis-open-circle', () => {
      const css = coral.generate(['text-emphasis-open-circle'])
      expect(css).toContain('text-emphasis-style')
      expect(css).toContain('open circle')
    })

    it('should generate text-emphasis-filled-triangle', () => {
      const css = coral.generate(['text-emphasis-filled-triangle'])
      expect(css).toContain('text-emphasis-style')
      expect(css).toContain('filled triangle')
    })

    it('should generate text-emphasis-open-triangle', () => {
      const css = coral.generate(['text-emphasis-open-triangle'])
      expect(css).toContain('text-emphasis-style')
      expect(css).toContain('open triangle')
    })

    it('should generate text-emphasis-filled-sesame', () => {
      const css = coral.generate(['text-emphasis-filled-sesame'])
      expect(css).toContain('text-emphasis-style')
      expect(css).toContain('filled sesame')
    })

    it('should generate text-emphasis-open-sesame', () => {
      const css = coral.generate(['text-emphasis-open-sesame'])
      expect(css).toContain('text-emphasis-style')
      expect(css).toContain('open sesame')
    })

    it('should generate arbitrary text-emphasis', () => {
      const css = coral.generate(['text-emphasis-[*]'])
      expect(css).toContain('text-emphasis-style')
      expect(css).toContain('"*"')
    })

    it('should handle empty arbitrary text-emphasis', () => {
      const css = coral.generate(['text-emphasis-[]'])
      expect(css).toBe('')
    })
  })

  describe('Text Emphasis Color Utilities', () => {
    it('should generate text-emphasis-current', () => {
      const css = coral.generate(['text-emphasis-current'])
      expect(css).toContain('text-emphasis-color')
      expect(css).toContain('currentColor')
    })

    it('should generate text-emphasis-transparent', () => {
      const css = coral.generate(['text-emphasis-transparent'])
      expect(css).toContain('text-emphasis-color')
      expect(css).toContain('transparent')
    })

    it('should generate arbitrary text-emphasis-color', () => {
      const css = coral.generate(['text-emphasis-color-[#ff0000]'])
      expect(css).toContain('text-emphasis-color')
      expect(css).toContain('#ff0000')
    })

    it('should handle empty arbitrary text-emphasis-color', () => {
      const css = coral.generate(['text-emphasis-color-[]'])
      expect(css).toBe('')
    })
  })

  describe('Text Emphasis Position Utilities', () => {
    it('should generate text-emphasis-position-over', () => {
      const css = coral.generate(['text-emphasis-position-over'])
      expect(css).toContain('text-emphasis-position')
      expect(css).toContain('over right')
    })

    it('should generate text-emphasis-position-under', () => {
      const css = coral.generate(['text-emphasis-position-under'])
      expect(css).toContain('text-emphasis-position')
      expect(css).toContain('under right')
    })

    it('should generate text-emphasis-position-over-left', () => {
      const css = coral.generate(['text-emphasis-position-over-left'])
      expect(css).toContain('text-emphasis-position')
      expect(css).toContain('over left')
    })

    it('should generate text-emphasis-position-under-left', () => {
      const css = coral.generate(['text-emphasis-position-under-left'])
      expect(css).toContain('text-emphasis-position')
      expect(css).toContain('under left')
    })
  })

  describe('Outline Color Utilities', () => {
    it('should generate outline-current', () => {
      const css = coral.generate(['outline-current'])
      expect(css).toContain('outline-color')
      expect(css).toContain('currentColor')
    })

    it('should generate outline-transparent', () => {
      const css = coral.generate(['outline-transparent'])
      expect(css).toContain('outline-color')
      expect(css).toContain('transparent')
    })

    it('should generate arbitrary outline-color', () => {
      const css = coral.generate(['outline-color-[#00ff00]'])
      expect(css).toContain('outline-color')
      expect(css).toContain('#00ff00')
    })

    it('should handle empty arbitrary outline-color', () => {
      const css = coral.generate(['outline-color-[]'])
      expect(css).toBe('')
    })
  })

  describe('Divide Reverse Utilities', () => {
    it('should generate divide-x-reverse', () => {
      const css = coral.generate(['divide-x-reverse'])
      expect(css).toContain('--coral-divide-x-reverse')
      expect(css).toContain('1')
      expect(css).toContain('border-right-width')
      expect(css).toContain('calc(1px * var(--coral-divide-x-reverse))')
      expect(css).toContain('border-left-width')
      expect(css).toContain('calc(1px * calc(1 - var(--coral-divide-x-reverse)))')
    })

    it('should generate divide-y-reverse', () => {
      const css = coral.generate(['divide-y-reverse'])
      expect(css).toContain('--coral-divide-y-reverse')
      expect(css).toContain('1')
      expect(css).toContain('border-bottom-width')
      expect(css).toContain('calc(1px * var(--coral-divide-y-reverse))')
      expect(css).toContain('border-top-width')
      expect(css).toContain('calc(1px * calc(1 - var(--coral-divide-y-reverse)))')
    })
  })

  describe('Border Spacing Utilities Extended', () => {
    it('should generate border-spacing-1', () => {
      const css = coral.generate(['border-spacing-1'])
      expect(css).toContain('border-spacing')
    })

    it('should generate border-spacing-2', () => {
      const css = coral.generate(['border-spacing-2'])
      expect(css).toContain('border-spacing')
    })

    it('should generate border-spacing-3', () => {
      const css = coral.generate(['border-spacing-3'])
      expect(css).toContain('border-spacing')
    })

    it('should generate border-spacing-5', () => {
      const css = coral.generate(['border-spacing-5'])
      expect(css).toContain('border-spacing')
    })

    it('should generate border-spacing-6', () => {
      const css = coral.generate(['border-spacing-6'])
      expect(css).toContain('border-spacing')
    })

    it('should generate border-spacing-8', () => {
      const css = coral.generate(['border-spacing-8'])
      expect(css).toContain('border-spacing')
    })

    it('should generate border-spacing-10', () => {
      const css = coral.generate(['border-spacing-10'])
      expect(css).toContain('border-spacing')
    })

    it('should generate border-spacing-12', () => {
      const css = coral.generate(['border-spacing-12'])
      expect(css).toContain('border-spacing')
    })

    it('should generate border-spacing-16', () => {
      const css = coral.generate(['border-spacing-16'])
      expect(css).toContain('border-spacing')
    })

    it('should generate border-spacing-20', () => {
      const css = coral.generate(['border-spacing-20'])
      expect(css).toContain('border-spacing')
    })

    it('should generate border-spacing-x-8', () => {
      const css = coral.generate(['border-spacing-x-8'])
      expect(css).toContain('border-spacing')
    })

    it('should generate border-spacing-y-12', () => {
      const css = coral.generate(['border-spacing-y-12'])
      expect(css).toContain('border-spacing')
    })

    it('should generate arbitrary border-spacing', () => {
      const css = coral.generate(['border-spacing-[15px]'])
      expect(css).toContain('border-spacing')
      expect(css).toContain('15px')
    })

    it('should handle empty arbitrary border-spacing', () => {
      const css = coral.generate(['border-spacing-[]'])
      expect(css).toBe('')
    })
  })
})
