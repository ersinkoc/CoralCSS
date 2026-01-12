/**
 * CoralCSS Configuration System
 *
 * CSS-first and JavaScript configuration for CoralCSS.
 *
 * @module config
 */

export { parseCSSConfig, mergeConfigs, extractCoralDirectives, validateCSSConfig, type ParsedCSSConfig } from './css-parser'
export { cssConfigPlugin, createCoralWithCSS, generateCSSConfigTemplate, type CSSConfigPluginOptions } from './css-config'
