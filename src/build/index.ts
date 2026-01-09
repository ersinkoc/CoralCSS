/**
 * CoralCSS Build Tools
 *
 * Build-time integrations for CoralCSS.
 * @module build
 */

export { coralVitePlugin } from './vite'
export type { VitePluginOptions } from './vite'

export { coralPostCSSPlugin } from './postcss'
export type { PostCSSPluginOptions } from './postcss'

export { cli, run, parseArgs } from './cli'
export type { CLIOptions, CLIResult } from './cli'

// Default exports for convenience
import { coralVitePlugin } from './vite'
import { coralPostCSSPlugin } from './postcss'

export default {
  vite: coralVitePlugin,
  postcss: coralPostCSSPlugin,
}
