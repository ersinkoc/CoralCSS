/**
 * CoralCSS Presets
 *
 * Pre-configured plugin bundles for different use cases.
 * @module presets
 */

export { coralPreset, coralPresetConfig } from './coral'
export type { CoralPresetOptions } from './coral'

export { windPreset } from './wind'
export type { WindPresetOptions } from './wind'

export { miniPreset } from './mini'
export type { MiniPresetOptions } from './mini'

export { fullPreset } from './full'
export type { FullPresetOptions } from './full'

export { materialPreset, materialPresetConfig } from './material'
export type { MaterialPresetOptions } from './material'

export { cupertinoPreset, cupertinoPresetConfig } from './cupertino'
export type { CupertinoPresetOptions } from './cupertino'

export { nordPreset, nordPresetConfig } from './nord'
export type { NordPresetOptions } from './nord'

export { draculaPreset, draculaPresetConfig } from './dracula'
export type { DraculaPresetOptions } from './dracula'

export { githubPreset, githubPresetConfig } from './github'
export type { GitHubPresetOptions } from './github'

export { enhancedLightPreset, enhancedLightPresetConfig } from './enhanced-light'
export type { EnhancedLightPresetOptions } from './enhanced-light'

// Default export
export { coralPreset as default } from './coral'
