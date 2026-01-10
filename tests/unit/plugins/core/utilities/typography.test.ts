/**
 * Tests for Typography Utilities Plugin
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { typographyPlugin } from '../../../../../src/plugins/core/utilities/typography'
import type { Coral } from '../../../../../src/types'

describe('Typography Utilities Plugin', () => {
  let coral: Coral

  beforeEach(() => {
    coral = createCoral()
    coral.use(typographyPlugin())
  })

  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = typographyPlugin()
      expect(plugin.name).toBe('typography')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Font Family', () => {
    it('should generate font-sans', () => {
      const css = coral.generate(['font-sans'])
      expect(css).toContain('font-family')
    })

    it('should generate font-serif', () => {
      const css = coral.generate(['font-serif'])
      expect(css).toContain('font-family')
    })

    it('should generate font-mono', () => {
      const css = coral.generate(['font-mono'])
      expect(css).toContain('font-family')
    })
  })

  describe('Font Size', () => {
    it('should generate text-xs', () => {
      const css = coral.generate(['text-xs'])
      expect(css).toContain('font-size')
    })

    it('should generate text-sm', () => {
      const css = coral.generate(['text-sm'])
      expect(css).toContain('font-size')
    })

    it('should generate text-base', () => {
      const css = coral.generate(['text-base'])
      expect(css).toContain('font-size')
    })

    it('should generate text-lg', () => {
      const css = coral.generate(['text-lg'])
      expect(css).toContain('font-size')
    })

    it('should generate text-xl', () => {
      const css = coral.generate(['text-xl'])
      expect(css).toContain('font-size')
    })

    it('should generate text-2xl', () => {
      const css = coral.generate(['text-2xl'])
      expect(css).toContain('font-size')
    })
  })

  describe('Font Weight', () => {
    it('should generate font-thin', () => {
      const css = coral.generate(['font-thin'])
      expect(css).toContain('font-weight')
    })

    it('should generate font-normal', () => {
      const css = coral.generate(['font-normal'])
      expect(css).toContain('font-weight')
    })

    it('should generate font-bold', () => {
      const css = coral.generate(['font-bold'])
      expect(css).toContain('font-weight')
    })
  })

  describe('Line Height', () => {
    it('should generate leading-none', () => {
      const css = coral.generate(['leading-none'])
      expect(css).toContain('line-height')
    })

    it('should generate leading-tight', () => {
      const css = coral.generate(['leading-tight'])
      expect(css).toContain('line-height')
    })

    it('should generate leading-normal', () => {
      const css = coral.generate(['leading-normal'])
      expect(css).toContain('line-height')
    })
  })

  describe('Letter Spacing', () => {
    it('should generate tracking-tighter', () => {
      const css = coral.generate(['tracking-tighter'])
      expect(css).toContain('letter-spacing')
    })

    it('should generate tracking-normal', () => {
      const css = coral.generate(['tracking-normal'])
      expect(css).toContain('letter-spacing')
    })

    it('should generate tracking-wider', () => {
      const css = coral.generate(['tracking-wider'])
      expect(css).toContain('letter-spacing')
    })
  })

  describe('Text Alignment', () => {
    it('should generate text-left', () => {
      const css = coral.generate(['text-left'])
      expect(css).toContain('text-align')
    })

    it('should generate text-center', () => {
      const css = coral.generate(['text-center'])
      expect(css).toContain('text-align')
    })

    it('should generate text-right', () => {
      const css = coral.generate(['text-right'])
      expect(css).toContain('text-align')
    })

    it('should generate text-justify', () => {
      const css = coral.generate(['text-justify'])
      expect(css).toContain('text-align')
    })
  })

  describe('Text Decoration', () => {
    it('should generate underline', () => {
      const css = coral.generate(['underline'])
      expect(css).toContain('text-decoration')
    })

    it('should generate overline', () => {
      const css = coral.generate(['overline'])
      expect(css).toContain('text-decoration')
    })

    it('should generate line-through', () => {
      const css = coral.generate(['line-through'])
      expect(css).toContain('text-decoration')
    })

    it('should generate no-underline', () => {
      const css = coral.generate(['no-underline'])
      expect(css).toContain('text-decoration')
    })
  })

  describe('Text Transform', () => {
    it('should generate uppercase', () => {
      const css = coral.generate(['uppercase'])
      expect(css).toContain('text-transform')
    })

    it('should generate lowercase', () => {
      const css = coral.generate(['lowercase'])
      expect(css).toContain('text-transform')
    })

    it('should generate capitalize', () => {
      const css = coral.generate(['capitalize'])
      expect(css).toContain('text-transform')
    })

    it('should generate normal-case', () => {
      const css = coral.generate(['normal-case'])
      expect(css).toContain('text-transform')
    })
  })

  describe('Text Overflow', () => {
    it('should generate truncate', () => {
      const css = coral.generate(['truncate'])
      expect(css).toContain('overflow')
      expect(css).toContain('text-overflow')
    })

    it('should generate text-ellipsis', () => {
      const css = coral.generate(['text-ellipsis'])
      expect(css).toContain('text-overflow')
    })

    it('should generate text-clip', () => {
      const css = coral.generate(['text-clip'])
      expect(css).toContain('text-overflow')
    })
  })

  describe('Whitespace', () => {
    it('should generate whitespace-normal', () => {
      const css = coral.generate(['whitespace-normal'])
      expect(css).toContain('white-space')
    })

    it('should generate whitespace-nowrap', () => {
      const css = coral.generate(['whitespace-nowrap'])
      expect(css).toContain('white-space')
    })

    it('should generate whitespace-pre', () => {
      const css = coral.generate(['whitespace-pre'])
      expect(css).toContain('white-space')
    })
  })

  describe('Word Break', () => {
    it('should generate break-normal', () => {
      const css = coral.generate(['break-normal'])
      expect(css).toContain('word-break')
    })

    it('should generate break-words', () => {
      const css = coral.generate(['break-words'])
      expect(css).toContain('overflow-wrap')
    })

    it('should generate break-all', () => {
      const css = coral.generate(['break-all'])
      expect(css).toContain('word-break')
    })
  })

  describe('Marker Color', () => {
    it('should generate marker arbitrary value', () => {
      const css = coral.generate(['marker-[#ff0000]'])
      expect(css).toContain('color')
      expect(css).toContain('#ff0000')
    })

    it('should generate marker with currentColor', () => {
      const css = coral.generate(['marker-[currentColor]'])
      expect(css).toContain('color')
    })
  })

  describe('Quotes Styling', () => {
    it('should generate quotes-none', () => {
      const css = coral.generate(['quotes-none'])
      expect(css).toContain('quotes')
    })

    it('should generate quotes-auto', () => {
      const css = coral.generate(['quotes-auto'])
      expect(css).toContain('quotes')
    })

    it('should generate quotes-english', () => {
      const css = coral.generate(['quotes-english'])
      expect(css).toContain('quotes')
    })

    it('should generate quotes-french', () => {
      const css = coral.generate(['quotes-french'])
      expect(css).toContain('quotes')
    })

    it('should generate quotes-german', () => {
      const css = coral.generate(['quotes-german'])
      expect(css).toContain('quotes')
    })

    it('should generate quotes-cjk', () => {
      const css = coral.generate(['quotes-cjk'])
      expect(css).toContain('quotes')
    })

    it('should generate quotes arbitrary value', () => {
      const css = coral.generate(['quotes-["\\"" "\\""]'])
      expect(css).toContain('quotes')
    })
  })

  describe('Text Decoration Skip', () => {
    it('should generate decoration-skip-none', () => {
      const css = coral.generate(['decoration-skip-none'])
      expect(css).toContain('text-decoration-skip-ink')
    })

    it('should generate decoration-skip-auto', () => {
      const css = coral.generate(['decoration-skip-auto'])
      expect(css).toContain('text-decoration-skip-ink')
    })

    it('should generate decoration-skip-all', () => {
      const css = coral.generate(['decoration-skip-all'])
      expect(css).toContain('text-decoration-skip-ink')
    })
  })

  describe('Text Decoration Thickness', () => {
    it('should generate decoration-auto', () => {
      const css = coral.generate(['decoration-auto'])
      expect(css).toContain('text-decoration-thickness')
    })

    it('should generate decoration-from-font', () => {
      const css = coral.generate(['decoration-from-font'])
      expect(css).toContain('text-decoration-thickness')
    })

    it('should generate decoration-0', () => {
      const css = coral.generate(['decoration-0'])
      expect(css).toContain('text-decoration-thickness')
    })

    it('should generate decoration-1', () => {
      const css = coral.generate(['decoration-1'])
      expect(css).toContain('text-decoration-thickness')
    })

    it('should generate decoration-2', () => {
      const css = coral.generate(['decoration-2'])
      expect(css).toContain('text-decoration-thickness')
    })

    it('should generate decoration arbitrary value', () => {
      const css = coral.generate(['decoration-[3px]'])
      expect(css).toContain('text-decoration-thickness')
    })
  })

  describe('Text Underline Offset', () => {
    it('should generate underline-offset-auto', () => {
      const css = coral.generate(['underline-offset-auto'])
      expect(css).toContain('text-underline-offset')
    })

    it('should generate underline-offset-0', () => {
      const css = coral.generate(['underline-offset-0'])
      expect(css).toContain('text-underline-offset')
    })

    it('should generate underline-offset-1', () => {
      const css = coral.generate(['underline-offset-1'])
      expect(css).toContain('text-underline-offset')
    })

    it('should generate underline-offset-2', () => {
      const css = coral.generate(['underline-offset-2'])
      expect(css).toContain('text-underline-offset')
    })

    it('should generate underline-offset arbitrary value', () => {
      const css = coral.generate(['underline-offset-[5px]'])
      expect(css).toContain('text-underline-offset')
    })
  })

  describe('Counter Utilities', () => {
    it('should generate counter-reset arbitrary value', () => {
      const css = coral.generate(['counter-reset-[section]'])
      expect(css).toContain('counter-reset')
    })

    it('should generate counter-increment arbitrary value', () => {
      const css = coral.generate(['counter-increment-[section]'])
      expect(css).toContain('counter-increment')
    })

    it('should generate counter-set arbitrary value', () => {
      const css = coral.generate(['counter-set-[section_5]'])
      expect(css).toContain('counter-set')
    })

    it('should generate content-counter', () => {
      const css = coral.generate(['content-counter'])
      expect(css).toContain('content')
      expect(css).toContain('counter')
    })

    it('should generate content-counter-decimal', () => {
      const css = coral.generate(['content-counter-decimal'])
      expect(css).toContain('content')
    })

    it('should generate content-counter-roman', () => {
      const css = coral.generate(['content-counter-roman'])
      expect(css).toContain('content')
    })

    it('should generate content-counter-alpha', () => {
      const css = coral.generate(['content-counter-alpha'])
      expect(css).toContain('content')
    })
  })

  describe('List Style Utilities', () => {
    it('should generate list-inside', () => {
      const css = coral.generate(['list-inside'])
      expect(css).toContain('list-style-position')
      expect(css).toContain('inside')
    })

    it('should generate list-outside', () => {
      const css = coral.generate(['list-outside'])
      expect(css).toContain('list-style-position')
      expect(css).toContain('outside')
    })

    it('should generate list-none', () => {
      const css = coral.generate(['list-none'])
      expect(css).toContain('list-style-type')
      expect(css).toContain('none')
    })

    it('should generate list-disc', () => {
      const css = coral.generate(['list-disc'])
      expect(css).toContain('list-style-type')
      expect(css).toContain('disc')
    })

    it('should generate list-decimal', () => {
      const css = coral.generate(['list-decimal'])
      expect(css).toContain('list-style-type')
      expect(css).toContain('decimal')
    })

    it('should generate list-decimal-leading-zero', () => {
      const css = coral.generate(['list-decimal-leading-zero'])
      expect(css).toContain('list-style-type')
    })

    it('should generate list-lower-alpha', () => {
      const css = coral.generate(['list-lower-alpha'])
      expect(css).toContain('list-style-type')
    })

    it('should generate list-upper-alpha', () => {
      const css = coral.generate(['list-upper-alpha'])
      expect(css).toContain('list-style-type')
    })

    it('should generate list-lower-roman', () => {
      const css = coral.generate(['list-lower-roman'])
      expect(css).toContain('list-style-type')
    })

    it('should generate list-upper-roman', () => {
      const css = coral.generate(['list-upper-roman'])
      expect(css).toContain('list-style-type')
    })

    it('should generate list-circle', () => {
      const css = coral.generate(['list-circle'])
      expect(css).toContain('list-style-type')
    })

    it('should generate list-square', () => {
      const css = coral.generate(['list-square'])
      expect(css).toContain('list-style-type')
    })

    it('should generate list arbitrary value', () => {
      const css = coral.generate(['list-[emoji]'])
      expect(css).toContain('list-style-type')
    })
  })

  describe('Marker Utilities', () => {
    it('should generate marker-primary', () => {
      const css = coral.generate(['marker-primary'])
      expect(css).toContain('marker-primary')
      expect(css).toContain('color')
    })

    it('should generate marker-[custom]', () => {
      const css = coral.generate(['marker-[blue]'])
      expect(css).toContain('color')
    })
  })

  describe('Counter Utilities', () => {
    it('should generate counter-reset-[custom]', () => {
      const css = coral.generate(['counter-reset-[myCounter]'])
      expect(css).toContain('counter-reset')
    })

    it('should generate counter-increment-[custom]', () => {
      const css = coral.generate(['counter-increment-[myCounter]'])
      expect(css).toContain('counter-increment')
    })

    it('should generate counter-set-[custom]', () => {
      const css = coral.generate(['counter-set-[myCounter]'])
      expect(css).toContain('counter-set')
    })
  })

  describe('List Utilities', () => {
    it('should generate list-[custom]', () => {
      const css = coral.generate(['list-[emoji]'])
      expect(css).toContain('list-style-type')
    })
  })

  describe('Quotes Utilities', () => {
    it('should generate quotes-none', () => {
      const css = coral.generate(['quotes-none'])
      expect(css).toContain('quotes')
    })

    it('should generate quotes-auto', () => {
      const css = coral.generate(['quotes-auto'])
      expect(css).toContain('quotes')
    })

    it('should generate quotes-english', () => {
      const css = coral.generate(['quotes-english'])
      expect(css).toContain('quotes')
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/utilities/typography'
      )
      expect(defaultExport).toBe(typographyPlugin)
    })
  })
})
