import { describe, it, expect } from 'vitest'
import {
  defaultDesignTokens,
  darkModeTokens,
  generateTokensCSS,
  generateDarkTokensCSS,
  generateTokensSCSS,
  generateTokensJSON,
  generateTokensTypeScript,
  createDesignTokens,
  generateCompleteTokensCSS,
} from '../../../src/theme/tokens'

describe('Theme Tokens', () => {
  describe('defaultDesignTokens', () => {
    it('should have color tokens', () => {
      expect(defaultDesignTokens.colors).toBeDefined()
      expect(defaultDesignTokens.colors.primitive).toBeDefined()
      expect(defaultDesignTokens.colors.semantic).toBeDefined()
    })

    it('should have coral color palette', () => {
      expect(defaultDesignTokens.colors.primitive['coral-500']).toBeDefined()
      expect(defaultDesignTokens.colors.primitive['coral-500'].value).toBe('#ff7f50')
    })

    it('should have gray color palette', () => {
      expect(defaultDesignTokens.colors.primitive['gray-500']).toBeDefined()
    })

    it('should have spacing tokens', () => {
      expect(defaultDesignTokens.spacing).toBeDefined()
      expect(defaultDesignTokens.spacing['4'].value).toBe('1rem')
    })

    it('should have sizing tokens', () => {
      expect(defaultDesignTokens.sizing).toBeDefined()
      expect(defaultDesignTokens.sizing.full.value).toBe('100%')
    })

    it('should have typography tokens', () => {
      expect(defaultDesignTokens.typography).toBeDefined()
      expect(defaultDesignTokens.typography.fontFamily).toBeDefined()
      expect(defaultDesignTokens.typography.fontSize).toBeDefined()
      expect(defaultDesignTokens.typography.fontWeight).toBeDefined()
    })

    it('should have border tokens', () => {
      expect(defaultDesignTokens.borders).toBeDefined()
      expect(defaultDesignTokens.borders.width).toBeDefined()
      expect(defaultDesignTokens.borders.radius).toBeDefined()
    })

    it('should have shadow tokens', () => {
      expect(defaultDesignTokens.shadows).toBeDefined()
      expect(defaultDesignTokens.shadows.sm).toBeDefined()
    })

    it('should have motion tokens', () => {
      expect(defaultDesignTokens.motion).toBeDefined()
      expect(defaultDesignTokens.motion.duration).toBeDefined()
      expect(defaultDesignTokens.motion.easing).toBeDefined()
    })

    it('should have opacity tokens', () => {
      expect(defaultDesignTokens.opacity).toBeDefined()
      expect(defaultDesignTokens.opacity['50'].value).toBe('0.5')
    })

    it('should have z-index tokens', () => {
      expect(defaultDesignTokens.zIndex).toBeDefined()
      expect(defaultDesignTokens.zIndex.modal).toBeDefined()
    })

    it('should have breakpoint tokens', () => {
      expect(defaultDesignTokens.breakpoints).toBeDefined()
      expect(defaultDesignTokens.breakpoints.sm.value).toBe('640px')
    })
  })

  describe('darkModeTokens', () => {
    it('should have dark mode color overrides', () => {
      expect(darkModeTokens.colors?.semantic).toBeDefined()
    })

    it('should have inverted surface colors', () => {
      expect(darkModeTokens.colors?.semantic['surface-default']).toBeDefined()
    })

    it('should have inverted text colors', () => {
      expect(darkModeTokens.colors?.semantic['text-default']).toBeDefined()
    })
  })

  describe('generateTokensCSS', () => {
    it('should generate CSS with :root selector', () => {
      const css = generateTokensCSS()
      expect(css).toContain(':root {')
      expect(css).toContain('}')
    })

    it('should generate color variables', () => {
      const css = generateTokensCSS()
      expect(css).toContain('--color-coral-500')
    })

    it('should generate spacing variables', () => {
      const css = generateTokensCSS()
      expect(css).toContain('--spacing-')
    })

    it('should generate typography variables', () => {
      const css = generateTokensCSS()
      expect(css).toContain('--font-')
      expect(css).toContain('--text-')
    })

    it('should handle prefix option', () => {
      const css = generateTokensCSS(defaultDesignTokens, { prefix: 'coral' })
      expect(css).toContain('--coral-')
    })

    it('should include descriptions when enabled', () => {
      const css = generateTokensCSS(defaultDesignTokens, { includeDescriptions: true })
      expect(css).toContain('/*')
    })

    it('should handle categorize option', () => {
      const css = generateTokensCSS(defaultDesignTokens, { categorize: true })
      expect(css).toContain(':root')
    })

    it('should handle empty prefix', () => {
      const css = generateTokensCSS(defaultDesignTokens, { prefix: '' })
      expect(css).toContain('--color-coral-500')
    })
  })

  describe('generateDarkTokensCSS', () => {
    it('should generate dark mode CSS with class strategy', () => {
      const css = generateDarkTokensCSS(darkModeTokens, 'class')
      expect(css).toContain('.dark {')
    })

    it('should generate dark mode CSS with media strategy', () => {
      const css = generateDarkTokensCSS(darkModeTokens, 'media')
      expect(css).toContain('@media (prefers-color-scheme: dark)')
    })

    it('should generate dark mode CSS with selector strategy', () => {
      const css = generateDarkTokensCSS(darkModeTokens, 'selector')
      expect(css).toContain('[data-theme="dark"]')
    })

    it('should generate dark mode CSS with auto strategy', () => {
      const css = generateDarkTokensCSS(darkModeTokens, 'auto')
      expect(css).toContain('.dark {')
      expect(css).toContain('@media (prefers-color-scheme: dark)')
    })

    it('should handle prefix option', () => {
      const css = generateDarkTokensCSS(darkModeTokens, 'class', { prefix: 'coral' })
      expect(css).toContain('--coral-')
    })
  })

  describe('generateTokensSCSS', () => {
    it('should generate SCSS variables', () => {
      const scss = generateTokensSCSS()
      expect(scss).toContain('$color-coral-500')
    })

    it('should include comments header', () => {
      const scss = generateTokensSCSS()
      expect(scss).toContain('// CoralCSS Design Tokens')
    })

    it('should handle prefix option', () => {
      const scss = generateTokensSCSS(defaultDesignTokens, { prefix: 'coral' })
      expect(scss).toContain('$coral-')
    })
  })

  describe('generateTokensJSON', () => {
    it('should generate valid JSON', () => {
      const json = generateTokensJSON()
      expect(() => JSON.parse(json)).not.toThrow()
    })

    it('should include color tokens', () => {
      const json = generateTokensJSON()
      const parsed = JSON.parse(json)
      expect(parsed.color).toBeDefined()
      expect(parsed.color.primitive).toBeDefined()
    })

    it('should include spacing tokens', () => {
      const json = generateTokensJSON()
      const parsed = JSON.parse(json)
      expect(parsed.spacing).toBeDefined()
    })
  })

  describe('generateTokensTypeScript', () => {
    it('should generate TypeScript export', () => {
      const ts = generateTokensTypeScript()
      expect(ts).toContain('export const tokens')
      expect(ts).toContain('as const')
    })

    it('should include type export', () => {
      const ts = generateTokensTypeScript()
      expect(ts).toContain('export type Tokens')
    })

    it('should include color tokens', () => {
      const ts = generateTokensTypeScript()
      expect(ts).toContain('colors:')
      expect(ts).toContain('primitive:')
    })
  })

  describe('createDesignTokens', () => {
    it('should merge custom tokens with defaults', () => {
      const custom = createDesignTokens({
        colors: {
          primitive: { custom: { value: '#custom' } },
          semantic: {},
        },
      })

      expect(custom.colors.primitive['coral-500']).toBeDefined()
      expect(custom.colors.primitive.custom).toEqual({ value: '#custom' })
    })

    it('should override default tokens', () => {
      const custom = createDesignTokens({
        spacing: { '4': { value: '2rem' } },
      })

      expect(custom.spacing['4'].value).toBe('2rem')
    })

    it('should preserve other default tokens', () => {
      const custom = createDesignTokens({
        spacing: { custom: { value: '5rem' } },
      })

      expect(custom.typography.fontFamily.sans).toBeDefined()
    })
  })

  describe('generateCompleteTokensCSS', () => {
    it('should generate both light and dark CSS', () => {
      const css = generateCompleteTokensCSS()
      expect(css).toContain(':root {')
      expect(css).toContain('.dark {')
    })

    it('should handle different dark mode strategies', () => {
      const css = generateCompleteTokensCSS(
        defaultDesignTokens,
        darkModeTokens,
        'media'
      )
      expect(css).toContain('@media (prefers-color-scheme: dark)')
    })

    it('should handle prefix option', () => {
      const css = generateCompleteTokensCSS(
        defaultDesignTokens,
        darkModeTokens,
        'class',
        { prefix: 'coral' }
      )
      expect(css).toContain('--coral-')
    })
  })
})
