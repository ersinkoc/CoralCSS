/**
 * Tests for PostCSS plugin
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { coralPostCSSPlugin } from '../../../src/build/postcss'

describe('PostCSS Plugin', () => {
  describe('coralPostCSSPlugin', () => {
    it('should create a PostCSS plugin', () => {
      const plugin = coralPostCSSPlugin()
      expect(plugin).toBeDefined()
      expect(plugin.postcssPlugin).toBe('coral-postcss')
    })

    it('should have Once hook', () => {
      const plugin = coralPostCSSPlugin()
      expect(plugin.Once).toBeDefined()
      expect(typeof plugin.Once).toBe('function')
    })

    it('should accept options', () => {
      const plugin = coralPostCSSPlugin({
        content: ['./src/**/*.tsx'],
        darkMode: 'media',
        base: true,
        includeTheme: true,
      })
      expect(plugin).toBeDefined()
    })

    it('should have postcss property for plugin detection', () => {
      expect((coralPostCSSPlugin as unknown as { postcss: boolean }).postcss).toBe(true)
    })
  })

  describe('Once hook', () => {
    interface MockAtRule {
      params: string
      replaceWith: ReturnType<typeof vi.fn>
      remove: ReturnType<typeof vi.fn>
    }

    interface MockRoot {
      walkAtRules: (name: string, callback: (rule: MockAtRule) => void) => void
    }

    interface MockHelpers {
      result: { opts: { from?: string } }
      postcss: {
        parse: (css: string) => { toString: () => string }
      }
    }

    let plugin: ReturnType<typeof coralPostCSSPlugin>
    let mockRoot: MockRoot
    let mockHelpers: MockHelpers
    let atRules: MockAtRule[]

    beforeEach(() => {
      atRules = []
      mockRoot = {
        walkAtRules: vi.fn((name: string, callback: (rule: MockAtRule) => void) => {
          if (name === 'coral') {
            atRules.forEach(callback)
          }
        }),
      }
      mockHelpers = {
        result: { opts: { from: 'input.css' } },
        postcss: {
          parse: vi.fn((css: string) => ({ toString: () => css })),
        },
      }
    })

    it('should process @coral base directive', async () => {
      const mockRule: MockAtRule = {
        params: 'base',
        replaceWith: vi.fn(),
        remove: vi.fn(),
      }
      atRules.push(mockRule)

      plugin = coralPostCSSPlugin({ base: true })
      await plugin.Once(mockRoot as unknown as Parameters<typeof plugin.Once>[0], mockHelpers as unknown as Parameters<typeof plugin.Once>[1])

      expect(mockRule.replaceWith).toHaveBeenCalled()
      expect(mockHelpers.postcss.parse).toHaveBeenCalled()
    })

    it('should remove @coral base when base is false', async () => {
      const mockRule: MockAtRule = {
        params: 'base',
        replaceWith: vi.fn(),
        remove: vi.fn(),
      }
      atRules.push(mockRule)

      plugin = coralPostCSSPlugin({ base: false })
      await plugin.Once(mockRoot as unknown as Parameters<typeof plugin.Once>[0], mockHelpers as unknown as Parameters<typeof plugin.Once>[1])

      expect(mockRule.remove).toHaveBeenCalled()
      expect(mockRule.replaceWith).not.toHaveBeenCalled()
    })

    it('should process @coral theme directive', async () => {
      const mockRule: MockAtRule = {
        params: 'theme',
        replaceWith: vi.fn(),
        remove: vi.fn(),
      }
      atRules.push(mockRule)

      plugin = coralPostCSSPlugin({ includeTheme: true })
      await plugin.Once(mockRoot as unknown as Parameters<typeof plugin.Once>[0], mockHelpers as unknown as Parameters<typeof plugin.Once>[1])

      expect(mockRule.replaceWith).toHaveBeenCalled()
    })

    it('should remove @coral theme when includeTheme is false', async () => {
      const mockRule: MockAtRule = {
        params: 'theme',
        replaceWith: vi.fn(),
        remove: vi.fn(),
      }
      atRules.push(mockRule)

      plugin = coralPostCSSPlugin({ includeTheme: false })
      await plugin.Once(mockRoot as unknown as Parameters<typeof plugin.Once>[0], mockHelpers as unknown as Parameters<typeof plugin.Once>[1])

      expect(mockRule.remove).toHaveBeenCalled()
      expect(mockRule.replaceWith).not.toHaveBeenCalled()
    })

    it('should process @coral utilities directive', async () => {
      // Suppress console.warn for this test
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const mockRule: MockAtRule = {
        params: 'utilities',
        replaceWith: vi.fn(),
        remove: vi.fn(),
      }
      atRules.push(mockRule)

      plugin = coralPostCSSPlugin({ content: ['./src/**/*.tsx'] })
      await plugin.Once(mockRoot as unknown as Parameters<typeof plugin.Once>[0], mockHelpers as unknown as Parameters<typeof plugin.Once>[1])

      expect(mockRule.replaceWith).toHaveBeenCalled()

      warnSpy.mockRestore()
    })

    it('should process @coral components directive', async () => {
      const mockRule: MockAtRule = {
        params: 'components',
        replaceWith: vi.fn(),
        remove: vi.fn(),
      }
      atRules.push(mockRule)

      plugin = coralPostCSSPlugin()
      await plugin.Once(mockRoot as unknown as Parameters<typeof plugin.Once>[0], mockHelpers as unknown as Parameters<typeof plugin.Once>[1])

      expect(mockRule.replaceWith).toHaveBeenCalled()
    })

    it('should remove unknown directives', async () => {
      const mockRule: MockAtRule = {
        params: 'unknown-directive',
        replaceWith: vi.fn(),
        remove: vi.fn(),
      }
      atRules.push(mockRule)

      plugin = coralPostCSSPlugin()
      await plugin.Once(mockRoot as unknown as Parameters<typeof plugin.Once>[0], mockHelpers as unknown as Parameters<typeof plugin.Once>[1])

      expect(mockRule.remove).toHaveBeenCalled()
    })

    it('should handle multiple directives', async () => {
      const baseRule: MockAtRule = {
        params: 'base',
        replaceWith: vi.fn(),
        remove: vi.fn(),
      }
      const themeRule: MockAtRule = {
        params: 'theme',
        replaceWith: vi.fn(),
        remove: vi.fn(),
      }
      const componentsRule: MockAtRule = {
        params: 'components',
        replaceWith: vi.fn(),
        remove: vi.fn(),
      }
      atRules.push(baseRule, themeRule, componentsRule)

      plugin = coralPostCSSPlugin({ base: true, includeTheme: true })
      await plugin.Once(mockRoot as unknown as Parameters<typeof plugin.Once>[0], mockHelpers as unknown as Parameters<typeof plugin.Once>[1])

      expect(baseRule.replaceWith).toHaveBeenCalled()
      expect(themeRule.replaceWith).toHaveBeenCalled()
      expect(componentsRule.replaceWith).toHaveBeenCalled()
    })

    it('should handle directive with extra whitespace', async () => {
      const mockRule: MockAtRule = {
        params: '  base  ',
        replaceWith: vi.fn(),
        remove: vi.fn(),
      }
      atRules.push(mockRule)

      plugin = coralPostCSSPlugin({ base: true })
      await plugin.Once(mockRoot as unknown as Parameters<typeof plugin.Once>[0], mockHelpers as unknown as Parameters<typeof plugin.Once>[1])

      expect(mockRule.replaceWith).toHaveBeenCalled()
    })
  })

  describe('dark mode options', () => {
    it('should use class dark mode by default', async () => {
      const plugin = coralPostCSSPlugin()
      expect(plugin).toBeDefined()
    })

    it('should accept media dark mode', async () => {
      const plugin = coralPostCSSPlugin({ darkMode: 'media' })
      expect(plugin).toBeDefined()
    })

    it('should accept selector dark mode', async () => {
      const plugin = coralPostCSSPlugin({ darkMode: 'selector' })
      expect(plugin).toBeDefined()
    })

    it('should accept auto dark mode', async () => {
      const plugin = coralPostCSSPlugin({ darkMode: 'auto' })
      expect(plugin).toBeDefined()
    })
  })

  describe('content option', () => {
    it('should accept empty content array', async () => {
      const plugin = coralPostCSSPlugin({ content: [] })
      expect(plugin).toBeDefined()
    })

    it('should accept glob patterns', async () => {
      const plugin = coralPostCSSPlugin({
        content: [
          './src/**/*.{js,jsx,ts,tsx}',
          './pages/**/*.{js,jsx,ts,tsx}',
          './components/**/*.{js,jsx,ts,tsx}',
        ],
      })
      expect(plugin).toBeDefined()
    })
  })

  describe('coralOptions', () => {
    it('should pass through coral options', async () => {
      const plugin = coralPostCSSPlugin({
        coralOptions: {
          prefix: 'tw-',
        },
      })
      expect(plugin).toBeDefined()
    })
  })

  describe('default export', () => {
    it('should export coralPostCSSPlugin as default', async () => {
      const { default: defaultExport } = await import('../../../src/build/postcss')
      expect(defaultExport).toBe(coralPostCSSPlugin)
    })
  })
})
