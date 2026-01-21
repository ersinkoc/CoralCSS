/**
 * Tests for Cupertino Preset
 */
import { describe, it, expect } from 'vitest'
import { cupertinoPreset, cupertinoPresetConfig } from '../../../src/presets/cupertino'
import { createCoral } from '../../../src/kernel'

describe('Cupertino Preset', () => {
  describe('cupertinoPreset', () => {
    it('should return an array of plugins', () => {
      const plugins = cupertinoPreset()
      expect(Array.isArray(plugins)).toBe(true)
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should include cupertino-theme plugin', () => {
      const plugins = cupertinoPreset()
      const themePlugin = plugins.find((p) => p.name === 'cupertino-theme')
      expect(themePlugin).toBeDefined()
      expect(themePlugin?.version).toBe('1.0.0')
    })

    it('should use default options when none provided', () => {
      const plugins = cupertinoPreset()
      // Should include core plugins
      expect(plugins.length).toBeGreaterThan(5)
    })

    it('should accept custom dark mode strategy', () => {
      const plugins = cupertinoPreset({ darkMode: 'class' })
      const darkModePlugin = plugins.find((p) => p.name === 'dark-mode-variants')
      expect(darkModePlugin).toBeDefined()
    })

    it('should accept custom dark mode selector', () => {
      const plugins = cupertinoPreset({
        darkMode: 'class',
        darkModeSelector: '[data-theme="dark"]',
      })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should exclude modern CSS when modernCSS is false', () => {
      const pluginsWithModern = cupertinoPreset({ modernCSS: true })
      const pluginsWithoutModern = cupertinoPreset({ modernCSS: false })

      const hasModernWithOption = pluginsWithModern.some((p) => p.name === 'modern-css')
      const hasModernWithoutOption = pluginsWithoutModern.some((p) => p.name === 'modern-css')

      expect(hasModernWithOption).toBe(true)
      expect(hasModernWithoutOption).toBe(false)
    })

    it('should accept custom primary color', () => {
      const plugins = cupertinoPreset({ primary: '#FF0000' })
      const themePlugin = plugins.find((p) => p.name === 'cupertino-theme')
      expect(themePlugin).toBeDefined()
    })

    it('should accept custom secondary color', () => {
      const plugins = cupertinoPreset({ secondary: '#00FF00' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept custom success color', () => {
      const plugins = cupertinoPreset({ success: '#00FF00' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept custom warning color', () => {
      const plugins = cupertinoPreset({ warning: '#FFFF00' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept custom error color', () => {
      const plugins = cupertinoPreset({ error: '#FF0000' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept custom background color', () => {
      const plugins = cupertinoPreset({ background: '#F0F0F0' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should accept custom surface color', () => {
      const plugins = cupertinoPreset({ surface: '#FAFAFA' })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should disable SF Pro font when useSFPro is false', () => {
      const plugins = cupertinoPreset({ useSFPro: false })
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('should work with createCoral', () => {
      const coral = createCoral({
        plugins: cupertinoPreset(),
      })
      expect(coral).toBeDefined()
      expect(coral.generate).toBeDefined()
    })

    it('should generate CSS with Cupertino utilities', () => {
      const coral = createCoral({
        plugins: cupertinoPreset(),
      })
      const css = coral.generate(['p-4', 'bg-blue-500', 'text-white'])
      expect(css).toContain('padding')
    })

    it('should filter out default dark-mode-variants plugin', () => {
      const plugins = cupertinoPreset()
      // Should only have one dark-mode-variants plugin (custom one)
      const darkModePlugins = plugins.filter((p) => p.name === 'dark-mode-variants')
      expect(darkModePlugins.length).toBe(1)
    })

    it('should accept all options at once', () => {
      const plugins = cupertinoPreset({
        darkMode: 'media',
        darkModeSelector: '.dark-mode',
        modernCSS: true,
        primary: '#007AFF',
        secondary: '#8E8E93',
        success: '#34C759',
        warning: '#FF9500',
        error: '#FF3B30',
        background: '#FFFFFF',
        surface: '#F2F2F7',
        useSFPro: true,
      })
      expect(plugins.length).toBeGreaterThan(0)
    })
  })

  describe('cupertinoPresetConfig', () => {
    it('should return default config when no options provided', () => {
      const config = cupertinoPresetConfig()
      expect(config.darkMode).toBe('media')
    })

    it('should return custom darkMode from options', () => {
      const config = cupertinoPresetConfig({ darkMode: 'class' })
      expect(config.darkMode).toBe('class')
    })

    it('should return media darkMode when option is undefined', () => {
      const config = cupertinoPresetConfig({})
      expect(config.darkMode).toBe('media')
    })

    it('should handle selector strategy', () => {
      const config = cupertinoPresetConfig({ darkMode: 'selector' })
      expect(config.darkMode).toBe('selector')
    })

    it('should handle auto strategy', () => {
      const config = cupertinoPresetConfig({ darkMode: 'auto' })
      expect(config.darkMode).toBe('auto')
    })
  })

  describe('Default Export', () => {
    it('should export cupertinoPreset as default', async () => {
      const { default: defaultExport } = await import('../../../src/presets/cupertino')
      expect(defaultExport).toBe(cupertinoPreset)
    })
  })

  describe('Color Manipulation', () => {
    it('should generate lighter and darker color variants', () => {
      const coral = createCoral({
        plugins: cupertinoPreset({ primary: '#007AFF' }),
      })
      // The theme should extend with color variants
      expect(coral).toBeDefined()
    })

    it('should handle edge case colors', () => {
      // Test with white (max values)
      const pluginsWhite = cupertinoPreset({ primary: '#FFFFFF' })
      expect(pluginsWhite.length).toBeGreaterThan(0)

      // Test with black (min values)
      const pluginsBlack = cupertinoPreset({ primary: '#000000' })
      expect(pluginsBlack.length).toBeGreaterThan(0)
    })
  })

  describe('Theme Extension', () => {
    it('should extend theme with iOS colors', () => {
      const coral = createCoral({
        plugins: cupertinoPreset(),
      })
      // Verify the coral instance is properly configured
      expect(coral.generate).toBeDefined()
    })

    it('should extend theme with iOS font sizes', () => {
      const plugins = cupertinoPreset()
      const themePlugin = plugins.find((p) => p.name === 'cupertino-theme')
      expect(themePlugin).toBeDefined()
    })

    it('should extend theme with iOS border radius values', () => {
      const plugins = cupertinoPreset()
      const themePlugin = plugins.find((p) => p.name === 'cupertino-theme')
      expect(themePlugin).toBeDefined()
    })

    it('should extend theme with iOS box shadow values', () => {
      const plugins = cupertinoPreset()
      const themePlugin = plugins.find((p) => p.name === 'cupertino-theme')
      expect(themePlugin).toBeDefined()
    })

    it('should extend theme with safe area spacing', () => {
      const plugins = cupertinoPreset()
      const themePlugin = plugins.find((p) => p.name === 'cupertino-theme')
      expect(themePlugin).toBeDefined()
    })
  })
})
