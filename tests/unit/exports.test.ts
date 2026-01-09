/**
 * Tests for main exports and index files
 * Ensures all public API exports are accessible
 */
import { describe, it, expect } from 'vitest'

// Test main index exports
import * as CoralCSS from '../../src/index'

describe('Main Index Exports', () => {
  describe('Core Exports', () => {
    it('should export Kernel and createCoral', () => {
      expect(CoralCSS.Kernel).toBeDefined()
      expect(CoralCSS.createCoral).toBeDefined()
      expect(typeof CoralCSS.createCoral).toBe('function')
    })
  })

  describe('Core Modules', () => {
    it('should export core classes', () => {
      expect(CoralCSS.CSSCache).toBeDefined()
      expect(CoralCSS.ClassNameParser).toBeDefined()
      expect(CoralCSS.RuleMatcher).toBeDefined()
      expect(CoralCSS.CSSGenerator).toBeDefined()
      expect(CoralCSS.CSSTransformer).toBeDefined()
      expect(CoralCSS.ClassExtractor).toBeDefined()
    })
  })

  describe('Theme Exports', () => {
    it('should export color palettes', () => {
      expect(CoralCSS.colors).toBeDefined()
      expect(CoralCSS.coral).toBeDefined()
      expect(CoralCSS.slate).toBeDefined()
    })

    it('should export theme utilities', () => {
      expect(CoralCSS.getColor).toBeDefined()
      expect(CoralCSS.spacing).toBeDefined()
      expect(CoralCSS.fonts).toBeDefined()
      expect(CoralCSS.defaultTheme).toBeDefined()
      expect(CoralCSS.generateThemeCSS).toBeDefined()
    })
  })

  describe('Utility Exports', () => {
    it('should export utilities', () => {
      expect(CoralCSS.kebabCase).toBeDefined()
      expect(CoralCSS.serializeProperties).toBeDefined()
      expect(CoralCSS.hexToRgb).toBeDefined()
      expect(CoralCSS.querySelector).toBeDefined()
    })
  })

  describe('Error Exports', () => {
    it('should export error classes', () => {
      expect(CoralCSS.CoralError).toBeDefined()
      expect(CoralCSS.ConfigError).toBeDefined()
      expect(CoralCSS.createError).toBeDefined()
      expect(CoralCSS.ErrorCode).toBeDefined()
    })
  })

  describe('Plugin Exports', () => {
    it('should export core plugins', () => {
      expect(CoralCSS.corePlugins).toBeDefined()
      expect(CoralCSS.coreUtilitiesPlugins).toBeDefined()
      expect(CoralCSS.coreVariantsPlugins).toBeDefined()
      expect(CoralCSS.modernCSSPlugin).toBeDefined()
      expect(CoralCSS.spacingPlugin).toBeDefined()
    })
  })

  describe('Preset Exports', () => {
    it('should export presets', () => {
      expect(CoralCSS.coralPreset).toBeDefined()
      expect(CoralCSS.windPreset).toBeDefined()
      expect(CoralCSS.miniPreset).toBeDefined()
      expect(CoralCSS.fullPreset).toBeDefined()
    })
  })

  describe('Component Exports', () => {
    it('should export components', () => {
      expect(CoralCSS.BaseComponent).toBeDefined()
      expect(CoralCSS.Dialog).toBeDefined()
      expect(CoralCSS.Dropdown).toBeDefined()
      expect(CoralCSS.Tabs).toBeDefined()
      expect(CoralCSS.Accordion).toBeDefined()
    })
  })

  describe('Runtime Exports', () => {
    it('should export runtime utilities', () => {
      expect(CoralCSS.DOMObserver).toBeDefined()
      expect(CoralCSS.StyleInjector).toBeDefined()
      expect(CoralCSS.createCoralCDN).toBeDefined()
    })
  })

  describe('Build Tool Exports', () => {
    it('should export build tools', () => {
      expect(CoralCSS.coralVitePlugin).toBeDefined()
      expect(CoralCSS.coralPostCSSPlugin).toBeDefined()
      expect(CoralCSS.cli).toBeDefined()
    })
  })
})

// Test core index exports
import * as Core from '../../src/core/index'

describe('Core Index Exports', () => {
  it('should export core classes', () => {
    expect(Core.CSSCache).toBeDefined()
    expect(Core.createCache).toBeDefined()
    expect(Core.parse).toBeDefined()
    expect(Core.parseClasses).toBeDefined()
    expect(Core.Matcher).toBeDefined()
    expect(Core.Generator).toBeDefined()
    expect(Core.Transformer).toBeDefined()
    expect(Core.Extractor).toBeDefined()
  })

  it('should export ClassNameParser class', () => {
    expect(Core.ClassNameParser).toBeDefined()
    const parser = new Core.ClassNameParser()
    expect(parser.parse).toBeDefined()
    const parsed = parser.parse('hover:bg-red-500')
    expect(parsed.variants).toContain('hover')
  })
})

// Test plugins index exports
import * as Plugins from '../../src/plugins/index'

describe('Plugins Index Exports', () => {
  it('should export corePlugins function', () => {
    expect(Plugins.corePlugins).toBeDefined()
    expect(typeof Plugins.corePlugins).toBe('function')
    expect(Array.isArray(Plugins.corePlugins())).toBe(true)
  })

  it('should export coreUtilitiesPlugins function', () => {
    expect(Plugins.coreUtilitiesPlugins).toBeDefined()
    expect(typeof Plugins.coreUtilitiesPlugins).toBe('function')
    expect(Array.isArray(Plugins.coreUtilitiesPlugins())).toBe(true)
  })

  it('should export coreVariantsPlugins function', () => {
    expect(Plugins.coreVariantsPlugins).toBeDefined()
    expect(typeof Plugins.coreVariantsPlugins).toBe('function')
    expect(Array.isArray(Plugins.coreVariantsPlugins())).toBe(true)
  })

  it('should export modernCSSPlugin', () => {
    expect(Plugins.modernCSSPlugin).toBeDefined()
    expect(Plugins.modernCSSPlugin.name).toBeDefined()
  })
})

// Test presets index exports
import * as Presets from '../../src/presets/index'

describe('Presets Index Exports', () => {
  it('should export preset functions', () => {
    expect(Presets.coralPreset).toBeDefined()
    expect(typeof Presets.coralPreset).toBe('function')
    expect(Presets.windPreset).toBeDefined()
    expect(Presets.miniPreset).toBeDefined()
    expect(Presets.fullPreset).toBeDefined()
  })

  it('should export coralPresetConfig', () => {
    expect(Presets.coralPresetConfig).toBeDefined()
  })

  it('should export default as coralPreset', () => {
    expect(Presets.default).toBe(Presets.coralPreset)
  })

  it('should create preset configurations that return plugin arrays', () => {
    const coral = Presets.coralPreset()
    expect(Array.isArray(coral)).toBe(true)
    expect(coral.length).toBeGreaterThan(0)

    const wind = Presets.windPreset()
    expect(Array.isArray(wind)).toBe(true)

    const mini = Presets.miniPreset()
    expect(Array.isArray(mini)).toBe(true)

    const full = Presets.fullPreset()
    expect(Array.isArray(full)).toBe(true)
  })
})

// Test build index exports
import * as Build from '../../src/build/index'

describe('Build Index Exports', () => {
  it('should export build tools', () => {
    expect(Build.coralVitePlugin).toBeDefined()
    expect(typeof Build.coralVitePlugin).toBe('function')
    expect(Build.coralPostCSSPlugin).toBeDefined()
    expect(typeof Build.coralPostCSSPlugin).toBe('function')
    expect(Build.cli).toBeDefined()
    expect(Build.run).toBeDefined()
    expect(Build.parseArgs).toBeDefined()
  })

  it('should export default object', () => {
    expect(Build.default).toBeDefined()
    expect(Build.default.vite).toBe(Build.coralVitePlugin)
    expect(Build.default.postcss).toBe(Build.coralPostCSSPlugin)
  })

  it('should create Vite plugin', () => {
    const plugin = Build.coralVitePlugin()
    expect(plugin).toBeDefined()
    expect(plugin.name).toBe('coral-vite')
  })

  it('should create PostCSS plugin', () => {
    const plugin = Build.coralPostCSSPlugin()
    expect(plugin).toBeDefined()
    expect(plugin.postcssPlugin).toBe('coral-postcss')
  })
})
