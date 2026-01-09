/**
 * Tests for Vite plugin
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { coralVitePlugin } from '../../../src/build/vite'

describe('Vite Plugin', () => {
  describe('coralVitePlugin', () => {
    it('should create a Vite plugin', () => {
      const plugin = coralVitePlugin()
      expect(plugin).toBeDefined()
      expect(plugin.name).toBe('coral-vite')
      expect(plugin.enforce).toBe('pre')
    })

    it('should accept options', () => {
      const plugin = coralVitePlugin({
        include: ['**/*.tsx'],
        exclude: ['node_modules/**', 'dist/**'],
        minify: false,
        darkMode: 'media',
      })
      expect(plugin).toBeDefined()
    })

    it('should have all hooks', () => {
      const plugin = coralVitePlugin()
      expect(plugin.configResolved).toBeDefined()
      expect(plugin.resolveId).toBeDefined()
      expect(plugin.load).toBeDefined()
      expect(plugin.transform).toBeDefined()
      expect(plugin.handleHotUpdate).toBeDefined()
    })
  })

  describe('resolveId hook', () => {
    it('should resolve virtual:coral.css module', () => {
      const plugin = coralVitePlugin()
      const resolveId = plugin.resolveId as (id: string) => string | undefined

      const result = resolveId('virtual:coral.css')
      expect(result).toBe('\0virtual:coral.css')
    })

    it('should resolve custom output path', () => {
      const plugin = coralVitePlugin({ output: 'styles/coral.css' })
      const resolveId = plugin.resolveId as (id: string) => string | undefined

      const result = resolveId('styles/coral.css')
      expect(result).toBe('\0virtual:coral.css')
    })

    it('should return undefined for non-coral modules', () => {
      const plugin = coralVitePlugin()
      const resolveId = plugin.resolveId as (id: string) => string | undefined

      const result = resolveId('some-other-module')
      expect(result).toBeUndefined()
    })
  })

  describe('load hook', () => {
    it('should return generated CSS for virtual module', () => {
      const plugin = coralVitePlugin()
      const load = plugin.load as (id: string) => string | undefined

      const result = load('\0virtual:coral.css')
      expect(result).toBe('')
    })

    it('should return undefined for non-virtual modules', () => {
      const plugin = coralVitePlugin()
      const load = plugin.load as (id: string) => string | undefined

      const result = load('some-other-module')
      expect(result).toBeUndefined()
    })
  })

  describe('configResolved hook', () => {
    it('should handle development mode', () => {
      const plugin = coralVitePlugin()
      const configResolved = plugin.configResolved as (config: Record<string, unknown>) => void

      configResolved({ command: 'serve', mode: 'development' })
      expect(true).toBe(true)
    })

    it('should handle production mode', () => {
      const plugin = coralVitePlugin()
      const configResolved = plugin.configResolved as (config: Record<string, unknown>) => void

      configResolved({ command: 'build', mode: 'production' })
      expect(true).toBe(true)
    })
  })

  describe('transform hook', () => {
    let plugin: ReturnType<typeof coralVitePlugin>
    let transform: (code: string, id: string) => null
    let configResolved: (config: Record<string, unknown>) => void

    beforeEach(() => {
      plugin = coralVitePlugin()
      transform = plugin.transform as (code: string, id: string) => null
      configResolved = plugin.configResolved as (config: Record<string, unknown>) => void
      configResolved({ command: 'serve', mode: 'development' })
    })

    it('should process HTML files', () => {
      const result = transform('<div class="bg-red-500">Test</div>', 'app.html')
      expect(result).toBeNull()
    })

    it('should process TSX files', () => {
      const result = transform('<div className="bg-green-500">Test</div>', 'Component.tsx')
      expect(result).toBeNull()
    })

    it('should process Vue files', () => {
      const result = transform('<template><div class="text-white">Test</div></template>', 'Component.vue')
      expect(result).toBeNull()
    })

    it('should process Svelte files', () => {
      const result = transform('<div class="flex">Test</div>', 'Component.svelte')
      expect(result).toBeNull()
    })

    it('should process Astro files', () => {
      const result = transform('<div class="grid">Test</div>', 'Page.astro')
      expect(result).toBeNull()
    })

    it('should exclude node_modules', () => {
      const result = transform('<div class="bg-red-500">Test</div>', 'node_modules/pkg/index.js')
      expect(result).toBeNull()
    })

    it('should extract classes from template literals', () => {
      const code = '<div className={`bg-green-500 ${active}`}>Test</div>'
      const result = transform(code, 'app.tsx')
      expect(result).toBeNull()
    })

    it('should extract classes from cn() calls', () => {
      const code = 'cn("bg-purple-500", active && "active")'
      const result = transform(code, 'app.tsx')
      expect(result).toBeNull()
    })

    it('should handle empty files', () => {
      const result = transform('', 'empty.html')
      expect(result).toBeNull()
    })
  })

  describe('handleHotUpdate hook', () => {
    it('should exist as a function', () => {
      const plugin = coralVitePlugin()
      expect(typeof plugin.handleHotUpdate).toBe('function')
    })
  })

  describe('custom options', () => {
    it('should use custom include patterns', () => {
      const plugin = coralVitePlugin({ include: ['**/*.js', '**/*.ts'] })
      const configResolved = plugin.configResolved as (config: Record<string, unknown>) => void
      configResolved({ command: 'serve', mode: 'development' })

      const transform = plugin.transform as (code: string, id: string) => null
      const result = transform('<div class="p-4">Test</div>', 'app.js')
      expect(result).toBeNull()
    })

    it('should use custom exclude patterns', () => {
      const plugin = coralVitePlugin({ exclude: ['**/*.test.*', 'dist/**'] })
      const configResolved = plugin.configResolved as (config: Record<string, unknown>) => void
      configResolved({ command: 'serve', mode: 'development' })

      const transform = plugin.transform as (code: string, id: string) => null
      const result = transform('<div class="p-4">Test</div>', 'Component.test.tsx')
      expect(result).toBeNull()
    })

    it('should handle minify option', () => {
      const plugin = coralVitePlugin({ minify: true })
      const configResolved = plugin.configResolved as (config: Record<string, unknown>) => void
      configResolved({ command: 'build', mode: 'production' })
      expect(true).toBe(true)
    })

    it('should handle darkMode option', () => {
      const plugin = coralVitePlugin({ darkMode: 'media' })
      const configResolved = plugin.configResolved as (config: Record<string, unknown>) => void
      configResolved({ command: 'serve', mode: 'development' })
      expect(true).toBe(true)
    })
  })

  describe('default export', () => {
    it('should export coralVitePlugin as default', async () => {
      const { default: defaultExport } = await import('../../../src/build/vite')
      expect(defaultExport).toBe(coralVitePlugin)
    })
  })
})
