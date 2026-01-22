/**
 * CoralCSS Utilities
 *
 * Export all utility functions.
 * @module utils
 */

// String utilities
export {
  kebabCase,
  camelCase,
  pascalCase,
  escapeSelector,
  escapeRegex,
  generateId,
  isValidIdentifier,
  hashString,
  splitByDelimiter,
  trimQuotes,
  capitalize,
  isWhitespace,
  dedupeStrings,
  joinWithSpace,
} from './string'

// CSS utilities
export {
  serializeProperties,
  formatValue,
  formatRule,
  formatCSS,
  minifyCSS,
  wrapInMediaQuery,
  wrapInContainerQuery,
  wrapInLayer,
  cssVar,
  cssVarDeclaration,
  parseValueWithUnit,
  remToPx,
  pxToRem,
  isColor,
  isCSSFunction,
  parseCSSFunction,
  combineCSS,
  createKeyframes,
} from './css'

// Color utilities
export {
  hexToRgb,
  rgbToHex,
  parseRgbString,
  rgbToHsl,
  hslToRgb,
  adjustAlpha,
  lighten,
  darken,
  isDark,
  getContrastColor,
  parseColor,
  formatColor,
  mixColors,
  type RGB,
  type RGBA,
  type HSL,
  type HSLA,
} from './color'

// Regex utilities
export {
  escapeRegex as escapeRegExp,
  createPattern,
  anchorPattern,
  createUtilityPattern,
  createColorPattern,
  createSpacingPattern,
  createArbitraryPattern,
  extractArbitraryValue,
  hasArbitraryValue,
  VARIANT_PREFIX_PATTERN,
  VARIANT_GROUP_PATTERN,
  NEGATIVE_PATTERN,
  CLASS_ATTR_PATTERN,
  TEMPLATE_CLASS_PATTERN,
  DATA_ATTR_PATTERN,
  ARIA_PATTERN,
  RESPONSIVE_PATTERN,
  CONTAINER_QUERY_PATTERN,
} from './regex'

// DOM utilities (for runtime)
export {
  isBrowser,
  querySelector,
  querySelectorAll,
  createElement,
  getOrCreateStyleElement,
  getFocusableElements,
  trapFocus,
  releaseFocusTrap,
  setFocusTrap,
  lockScroll,
  unlockScroll,
  setScrollLock,
  isInViewport,
  setAttributes,
  setAriaAttributes,
  addEventListener,
  onDOMReady,
  dispatchCustomEvent,
  getComputedStyleValue,
  cssSupports,
  supportsAnchorPositioning,
  supportsContainerQueries,
  supportsHasSelector,
  supportsScrollTimeline,
  supportsViewTransitions,
  getDataAttribute,
  setDataAttribute,
} from './dom'

// Type guards and branded types
export {
  isValidPlainObject,
  assertPlainObject,
  safeAssert,
  createTypeGuard,
  isValidTheme,
  isValidConfig,
  safeCast,
  isNonNullObject,
  isString,
  isNumber,
  isFiniteNumber,
  isArray,
  isFunction,
  filterArray,
  assertArrayOfType,
  brandAsValidated,
  hasProperty,
  hasProperties,
} from './type-guards'
export type {
  ValidatedPlainObject,
  ValidatedTheme,
  ValidatedConfig,
  TypeGuardResult,
} from './type-guards'

// CVA (Class Variance Authority)
export {
  cva,
  cx,
  cn,
  compose,
  slots,
  responsiveVariants,
  when,
  toggle,
  focusRing,
  disabledStyles,
  transition,
  buttonVariants,
  badgeVariants,
  inputVariants,
  cardSlots,
} from './cva'
export type {
  ClassValue,
  VariantConfig,
  VariantProps,
  CVAReturn,
  VariantPropsOf,
  SlotsConfig,
  SlotsReturn,
  ResponsiveVariantValue,
  ResponsiveVariantProps,
  VariantKeys,
  VariantValues,
} from './cva'
