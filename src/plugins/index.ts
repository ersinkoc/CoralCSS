/**
 * CoralCSS Plugins
 *
 * All plugins for CoralCSS.
 * @module plugins
 */

// Core plugins
export * from './core'
export { corePlugins, coreUtilitiesPlugins, coreVariantsPlugins } from './core'

// Modern CSS plugin
export { modernCSSPlugin } from './core/modern'

// Individual utility plugins
export {
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
} from './core/utilities'

// Individual variant plugins
export {
  pseudoVariantsPlugin,
  responsiveVariantsPlugin,
  darkModeVariantsPlugin,
  modernVariantsPlugin,
} from './core/variants'

// Optional plugins
export {
  animationsPlugin,
  getAnimationKeyframes,
  generateAnimationCSS,
  generateStartingStyleCSS,
  keyframes as animationKeyframes,
} from './optional/animations'
export type { AnimationsPluginOptions } from './optional/animations'

export {
  springAnimationsPlugin,
  springPresets,
  springToCubicBezier,
  getSpringKeyframes,
  getViewTransitionCSS,
  generateSpringAnimationsCSS,
} from './optional/spring-animations'
export type { SpringAnimationsPluginOptions, SpringConfig } from './optional/spring-animations'

export {
  popoverAPIPlugin,
  generatePopoverAnimationsCSS,
  generateAnchorPositioningCSS,
  generatePopoverAPICSS,
} from './optional/popover-api'
export type { PopoverAPIPluginOptions } from './optional/popover-api'

// Type exports
export type { DarkModeVariantsOptions } from './core/variants'
