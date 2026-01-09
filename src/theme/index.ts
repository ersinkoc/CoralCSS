/**
 * CoralCSS Theme
 *
 * Theme configuration and utilities.
 * @module theme
 */

// Colors
export {
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
} from './colors'

// Spacing
export {
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
} from './spacing'

// Typography
export {
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
} from './typography'

// Default theme
export {
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
} from './default'

// Dark mode
export {
  invertColorScale,
  generateDarkColors,
  generateDarkModeCSS,
  wrapInDarkMode,
  usesClassStrategy,
  usesMediaStrategy,
  generateLightModeCSS,
  generateThemeCSS,
} from './dark'

// Semantic tokens
export {
  lightSemanticTokens,
  darkSemanticTokens,
  themePresets,
  generateSemanticCSS,
  generateSemanticThemeCSS,
  generateCustomSemanticThemeCSS,
} from './semantic'
export type { SemanticTokens, ThemePresetName } from './semantic'

// CSS generation
export {
  generateColorPaletteCSS,
  generateSpacingCSS,
  generateSizingCSS,
  generateMaxWidthCSS,
  generateZIndexCSS,
  generateTypographyCSS,
  generateEffectsCSS,
  generateBreakpointsCSS,
  generateResetCSS,
  generateBaseCSS,
  generateComponentsCSS,
  generateThemeCSSComplete,
  defaultThemeCSS,
  minimalThemeCSS,
  resetOnlyCSS,
  systemDarkModeCSS,
} from './css'
export type { CSSGenerationOptions } from './css'

// Re-export types
export type {
  Theme,
  ThemeColors,
  ColorScale,
  SpacingScale,
  SizingScale,
  FontFamilies,
  FontSizeScale,
  FontSizeValue,
  FontWeightScale,
  LineHeightScale,
  LetterSpacingScale,
  BorderRadiusScale,
  BorderWidthScale,
  BoxShadowScale,
  OpacityScale,
  ZIndexScale,
  DurationScale,
  EasingScale,
  AnimationScale,
  ScreensConfig,
  ScreenConfig,
  ContainerConfig,
  DarkModeStrategy,
} from '../types'
