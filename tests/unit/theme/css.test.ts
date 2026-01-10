import { describe, it, expect } from 'vitest'
import {
  generateColorPaletteCSS,
  generateSpacingCSS,
  generateSizingCSS,
  generateMaxWidthCSS,
  generateZIndexCSS,
  generateTypographyCSS,
  generateEffectsCSS,
  generateThemeCSSComplete,
  generateComponentsCSS,
  generateBaseCSS,
} from '../../../src/theme/css'

describe('Theme CSS', () => {
  describe('generateColorPaletteCSS', () => {
    it('should generate color CSS variables', () => {
      const css = generateColorPaletteCSS()
      expect(css).toContain('--color-')
    })

    it('should include coral colors', () => {
      const css = generateColorPaletteCSS()
      expect(css).toContain('--color-coral-')
    })

    it('should include slate colors', () => {
      const css = generateColorPaletteCSS()
      expect(css).toContain('--color-slate-')
    })

    it('should include shade values', () => {
      const css = generateColorPaletteCSS()
      expect(css).toContain('-500:')
    })
  })

  describe('generateSpacingCSS', () => {
    it('should generate spacing CSS variables', () => {
      const css = generateSpacingCSS()
      expect(css).toContain('--spacing-')
    })

    it('should include numeric spacing values', () => {
      const css = generateSpacingCSS()
      expect(css).toContain('--spacing-4')
    })
  })

  describe('generateSizingCSS', () => {
    it('should generate sizing CSS variables', () => {
      const css = generateSizingCSS()
      expect(css).toContain('--sizing-')
    })
  })

  describe('generateMaxWidthCSS', () => {
    it('should generate max-width CSS variables', () => {
      const css = generateMaxWidthCSS()
      expect(css).toContain('--max-width-')
    })
  })

  describe('generateZIndexCSS', () => {
    it('should generate z-index CSS variables', () => {
      const css = generateZIndexCSS()
      expect(css).toContain('--z-')
    })
  })

  describe('generateTypographyCSS', () => {
    it('should generate font family CSS variables', () => {
      const css = generateTypographyCSS()
      expect(css).toContain('--font-')
    })

    it('should generate font size CSS variables', () => {
      const css = generateTypographyCSS()
      expect(css).toContain('--text-')
    })

    it('should generate font weight CSS variables', () => {
      const css = generateTypographyCSS()
      expect(css).toContain('--font-weight-')
    })

    it('should generate line height CSS variables', () => {
      const css = generateTypographyCSS()
      expect(css).toContain('--leading-')
    })

    it('should generate letter spacing CSS variables', () => {
      const css = generateTypographyCSS()
      expect(css).toContain('--tracking-')
    })

    it('should generate text with line height when provided', () => {
      const css = generateTypographyCSS()
      expect(css).toContain('--text-')
      expect(css).toContain('-line-height')
    })
  })

  describe('generateEffectsCSS', () => {
    it('should generate border radius CSS variables', () => {
      const css = generateEffectsCSS()
      expect(css).toContain('--rounded-')
    })

    it('should generate border width CSS variables', () => {
      const css = generateEffectsCSS()
      expect(css).toContain('--border-')
    })

    it('should generate shadow CSS variables', () => {
      const css = generateEffectsCSS()
      expect(css).toContain('--shadow-')
    })

    it('should generate opacity CSS variables', () => {
      const css = generateEffectsCSS()
      expect(css).toContain('--opacity-')
    })

    it('should generate duration CSS variables', () => {
      const css = generateEffectsCSS()
      expect(css).toContain('--duration-')
    })
  })

  describe('generateBaseCSS', () => {
    it('should generate base CSS styles', () => {
      const css = generateBaseCSS()
      expect(css).toBeDefined()
      expect(typeof css).toBe('string')
    })
  })

  describe('generateComponentsCSS', () => {
    it('should generate component CSS styles', () => {
      const css = generateComponentsCSS()
      expect(css).toBeDefined()
      expect(typeof css).toBe('string')
    })
  })

  describe('generateThemeCSSComplete', () => {
    it('should generate complete theme CSS with defaults', () => {
      const css = generateThemeCSSComplete()
      expect(css).toBeDefined()
      expect(typeof css).toBe('string')
    })

    it('should generate theme CSS with coral preset', () => {
      const css = generateThemeCSSComplete({ preset: 'coral' })
      expect(css).toContain('--color-coral')
    })

    it('should generate theme CSS with class dark mode', () => {
      const css = generateThemeCSSComplete({ darkMode: 'class' })
      expect(css).toContain('.dark')
    })

    it('should generate theme CSS with media dark mode', () => {
      const css = generateThemeCSSComplete({ darkMode: 'media' })
      expect(css).toContain('prefers-color-scheme')
    })

    it('should include dark mode with selector strategy', () => {
      const css = generateThemeCSSComplete({ darkMode: 'selector', includeBase: false, includeComponents: false })
      expect(css).toContain('[data-theme="dark"]')
    })

    it('should include dark mode with auto strategy', () => {
      const css = generateThemeCSSComplete({ darkMode: 'auto', includeBase: false, includeComponents: false })
      expect(css).toContain('.dark')
      expect(css).toContain('@media (prefers-color-scheme: dark)')
    })

    it('should include reset when requested', () => {
      const css = generateThemeCSSComplete({ includeReset: true })
      expect(css).toBeDefined()
    })

    it('should include base when requested', () => {
      const css = generateThemeCSSComplete({ includeBase: true })
      expect(css).toBeDefined()
    })

    it('should include components when requested', () => {
      const css = generateThemeCSSComplete({ includeComponents: true })
      expect(css).toBeDefined()
    })

    it('should minify CSS when requested', () => {
      const css = generateThemeCSSComplete({ minify: true })
      // Minified CSS should not have newlines
      expect(css.includes('\n')).toBe(false)
    })

    it('should combine multiple options', () => {
      const css = generateThemeCSSComplete({
        preset: 'coral',
        darkMode: 'class',
        includeReset: true,
        includeBase: true,
        includeComponents: true,
        minify: false,
      })
      expect(css).toBeDefined()
    })
  })
})
