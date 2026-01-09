/**
 * Main Index Tests
 *
 * Tests for main module exports from src/index.ts
 */
import { describe, it, expect } from 'vitest'
import {
  // Core
  Kernel,
  createCoral,
  CSSCache,
  ClassNameParser,
  RuleMatcher,
  CSSGenerator,
  CSSTransformer,
  ClassExtractor,
  // Theme - Colors
  colors,
  coral,
  slate,
  gray,
  zinc,
  neutral,
  stone,
  red,
  orange,
  amber,
  yellow,
  lime,
  green,
  emerald,
  teal,
  cyan,
  sky,
  blue,
  indigo,
  violet,
  purple,
  fuchsia,
  pink,
  rose,
  getColor,
  // Theme - Spacing
  spacing,
  sizing,
  heightSizing,
  zIndex,
  maxWidth,
  inset,
  negativeSpacing,
  getSpacing,
  getSizing,
  getNegativeSpacing,
  // Theme - Typography
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
  textDecorationThickness,
  textUnderlineOffset,
  getFontFamily,
  getFontSize,
  getFontWeight,
  getLineHeight,
  getLetterSpacing,
  // Theme - Default
  defaultTheme,
  getDefaultTheme,
  borderRadius,
  borderWidth,
  boxShadow,
  opacity,
  transitionDuration,
  transitionTimingFunction,
  animation,
  screens,
  containers,
  blur,
  dropShadow,
  keyframes,
  // Dark mode
  invertColorScale,
  generateDarkColors,
  generateDarkModeCSS,
  wrapInDarkMode,
  usesClassStrategy,
  usesMediaStrategy,
  generateLightModeCSS,
  generateThemeCSS,
  // Utils
  kebabCase,
  escapeSelector,
  generateId,
  splitByDelimiter,
  serializeProperties,
  formatCSS,
  minifyCSS,
  wrapInMediaQuery,
  wrapInContainerQuery,
  cssVar,
  hexToRgb,
  rgbToHex,
  adjustAlpha,
  isDark,
  mixColors,
  createPattern,
  anchorPattern,
  extractArbitraryValue,
  querySelector,
  querySelectorAll,
  trapFocus,
  releaseFocusTrap,
  lockScroll,
  unlockScroll,
  cssSupports,
  // Errors
  CoralError,
  ConfigError,
  PluginNotFoundError,
  RuleConflictError,
  InvalidValueError,
  ParseError,
  GenerationError,
  createError,
  ErrorCode,
  // Plugins
  corePlugins,
  coreUtilitiesPlugins,
  coreVariantsPlugins,
  modernCSSPlugin,
  spacingPlugin,
  sizingPlugin,
  colorsPlugin,
  typographyPlugin,
  layoutPlugin,
  flexboxPlugin,
  gridPlugin,
  bordersPlugin,
  effectsPlugin,
  filtersPlugin,
  transformsPlugin,
  transitionsPlugin,
  interactivityPlugin,
  backgroundsPlugin,
  pseudoVariantsPlugin,
  responsiveVariantsPlugin,
  darkModeVariantsPlugin,
  modernVariantsPlugin,
  // Presets
  coralPreset,
  windPreset,
  miniPreset,
  fullPreset,
} from '../../src'

describe('Main Index Exports', () => {
  describe('Core exports', () => {
    it('should export Kernel', () => {
      expect(Kernel).toBeDefined()
      expect(typeof Kernel).toBe('function')
    })

    it('should export createCoral', () => {
      expect(createCoral).toBeDefined()
      expect(typeof createCoral).toBe('function')
    })

    it('should export CSSCache', () => {
      expect(CSSCache).toBeDefined()
    })

    it('should export ClassNameParser', () => {
      expect(ClassNameParser).toBeDefined()
    })

    it('should export RuleMatcher', () => {
      expect(RuleMatcher).toBeDefined()
    })

    it('should export CSSGenerator', () => {
      expect(CSSGenerator).toBeDefined()
    })

    it('should export CSSTransformer', () => {
      expect(CSSTransformer).toBeDefined()
    })

    it('should export ClassExtractor', () => {
      expect(ClassExtractor).toBeDefined()
    })
  })

  describe('Color exports', () => {
    it('should export colors object', () => {
      expect(colors).toBeDefined()
      expect(typeof colors).toBe('object')
    })

    it('should export coral color palette', () => {
      expect(coral).toBeDefined()
      expect(coral[500]).toBeDefined()
    })

    it('should export all color palettes', () => {
      expect(slate).toBeDefined()
      expect(gray).toBeDefined()
      expect(zinc).toBeDefined()
      expect(neutral).toBeDefined()
      expect(stone).toBeDefined()
      expect(red).toBeDefined()
      expect(orange).toBeDefined()
      expect(amber).toBeDefined()
      expect(yellow).toBeDefined()
      expect(lime).toBeDefined()
      expect(green).toBeDefined()
      expect(emerald).toBeDefined()
      expect(teal).toBeDefined()
      expect(cyan).toBeDefined()
      expect(sky).toBeDefined()
      expect(blue).toBeDefined()
      expect(indigo).toBeDefined()
      expect(violet).toBeDefined()
      expect(purple).toBeDefined()
      expect(fuchsia).toBeDefined()
      expect(pink).toBeDefined()
      expect(rose).toBeDefined()
    })

    it('should export getColor function', () => {
      expect(getColor).toBeDefined()
      expect(typeof getColor).toBe('function')
    })
  })

  describe('Spacing exports', () => {
    it('should export spacing', () => {
      expect(spacing).toBeDefined()
      expect(typeof spacing).toBe('object')
    })

    it('should export sizing and height sizing', () => {
      expect(sizing).toBeDefined()
      expect(heightSizing).toBeDefined()
    })

    it('should export zIndex and positioning', () => {
      expect(zIndex).toBeDefined()
      expect(maxWidth).toBeDefined()
      expect(inset).toBeDefined()
      expect(negativeSpacing).toBeDefined()
    })

    it('should export spacing getter functions', () => {
      expect(getSpacing).toBeDefined()
      expect(getSizing).toBeDefined()
      expect(getNegativeSpacing).toBeDefined()
    })
  })

  describe('Typography exports', () => {
    it('should export typography values', () => {
      expect(fonts).toBeDefined()
      expect(fontSizes).toBeDefined()
      expect(fontWeights).toBeDefined()
      expect(lineHeights).toBeDefined()
      expect(letterSpacing).toBeDefined()
      expect(textDecorationThickness).toBeDefined()
      expect(textUnderlineOffset).toBeDefined()
    })

    it('should export typography getter functions', () => {
      expect(getFontFamily).toBeDefined()
      expect(getFontSize).toBeDefined()
      expect(getFontWeight).toBeDefined()
      expect(getLineHeight).toBeDefined()
      expect(getLetterSpacing).toBeDefined()
    })
  })

  describe('Default theme exports', () => {
    it('should export defaultTheme and getDefaultTheme', () => {
      expect(defaultTheme).toBeDefined()
      expect(getDefaultTheme).toBeDefined()
    })

    it('should export border values', () => {
      expect(borderRadius).toBeDefined()
      expect(borderWidth).toBeDefined()
    })

    it('should export effect values', () => {
      expect(boxShadow).toBeDefined()
      expect(opacity).toBeDefined()
      expect(blur).toBeDefined()
      expect(dropShadow).toBeDefined()
    })

    it('should export transition and animation values', () => {
      expect(transitionDuration).toBeDefined()
      expect(transitionTimingFunction).toBeDefined()
      expect(animation).toBeDefined()
      expect(keyframes).toBeDefined()
    })

    it('should export responsive values', () => {
      expect(screens).toBeDefined()
      expect(containers).toBeDefined()
    })
  })

  describe('Dark mode exports', () => {
    it('should export dark mode functions', () => {
      expect(invertColorScale).toBeDefined()
      expect(generateDarkColors).toBeDefined()
      expect(generateDarkModeCSS).toBeDefined()
      expect(wrapInDarkMode).toBeDefined()
      expect(usesClassStrategy).toBeDefined()
      expect(usesMediaStrategy).toBeDefined()
      expect(generateLightModeCSS).toBeDefined()
      expect(generateThemeCSS).toBeDefined()
    })
  })

  describe('Utility exports', () => {
    it('should export string utilities', () => {
      expect(kebabCase).toBeDefined()
      expect(escapeSelector).toBeDefined()
      expect(generateId).toBeDefined()
      expect(splitByDelimiter).toBeDefined()
    })

    it('should export CSS utilities', () => {
      expect(serializeProperties).toBeDefined()
      expect(formatCSS).toBeDefined()
      expect(minifyCSS).toBeDefined()
      expect(wrapInMediaQuery).toBeDefined()
      expect(wrapInContainerQuery).toBeDefined()
      expect(cssVar).toBeDefined()
    })

    it('should export color utilities', () => {
      expect(hexToRgb).toBeDefined()
      expect(rgbToHex).toBeDefined()
      expect(adjustAlpha).toBeDefined()
      expect(isDark).toBeDefined()
      expect(mixColors).toBeDefined()
    })

    it('should export regex utilities', () => {
      expect(createPattern).toBeDefined()
      expect(anchorPattern).toBeDefined()
      expect(extractArbitraryValue).toBeDefined()
    })

    it('should export DOM utilities', () => {
      expect(querySelector).toBeDefined()
      expect(querySelectorAll).toBeDefined()
      expect(trapFocus).toBeDefined()
      expect(releaseFocusTrap).toBeDefined()
      expect(lockScroll).toBeDefined()
      expect(unlockScroll).toBeDefined()
      expect(cssSupports).toBeDefined()
    })
  })

  describe('Error exports', () => {
    it('should export CoralError', () => {
      expect(CoralError).toBeDefined()
    })

    it('should export specific error classes', () => {
      expect(ConfigError).toBeDefined()
      expect(PluginNotFoundError).toBeDefined()
      expect(RuleConflictError).toBeDefined()
      expect(InvalidValueError).toBeDefined()
      expect(ParseError).toBeDefined()
      expect(GenerationError).toBeDefined()
    })

    it('should export createError and ErrorCode', () => {
      expect(createError).toBeDefined()
      expect(ErrorCode).toBeDefined()
      expect(ErrorCode.INVALID_CONFIG).toBeDefined()
    })
  })

  describe('Plugin exports', () => {
    it('should export core plugin functions', () => {
      expect(corePlugins).toBeDefined()
      expect(coreUtilitiesPlugins).toBeDefined()
      expect(coreVariantsPlugins).toBeDefined()
      expect(modernCSSPlugin).toBeDefined()
    })

    it('should export utility plugins', () => {
      expect(spacingPlugin).toBeDefined()
      expect(sizingPlugin).toBeDefined()
      expect(colorsPlugin).toBeDefined()
      expect(typographyPlugin).toBeDefined()
      expect(layoutPlugin).toBeDefined()
      expect(flexboxPlugin).toBeDefined()
      expect(gridPlugin).toBeDefined()
      expect(bordersPlugin).toBeDefined()
      expect(effectsPlugin).toBeDefined()
      expect(filtersPlugin).toBeDefined()
      expect(transformsPlugin).toBeDefined()
      expect(transitionsPlugin).toBeDefined()
      expect(interactivityPlugin).toBeDefined()
      expect(backgroundsPlugin).toBeDefined()
    })

    it('should export variant plugins', () => {
      expect(pseudoVariantsPlugin).toBeDefined()
      expect(responsiveVariantsPlugin).toBeDefined()
      expect(darkModeVariantsPlugin).toBeDefined()
      expect(modernVariantsPlugin).toBeDefined()
    })
  })

  describe('Preset exports', () => {
    it('should export all presets', () => {
      expect(coralPreset).toBeDefined()
      expect(windPreset).toBeDefined()
      expect(miniPreset).toBeDefined()
      expect(fullPreset).toBeDefined()
    })

    it('should return plugin arrays from presets', () => {
      const coralPlugins = coralPreset()
      expect(Array.isArray(coralPlugins)).toBe(true)
      expect(coralPlugins.length).toBeGreaterThan(0)
    })
  })
})
