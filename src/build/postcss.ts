/**
 * PostCSS Plugin
 *
 * PostCSS plugin for CoralCSS.
 * @module build/postcss
 */

import { createCoral } from '../kernel'
import { coralPreset } from '../presets/coral'
import { generateThemeCSS } from '../theme/dark'
import type { Coral, CoralOptions, DarkModeStrategy } from '../types'

/**
 * PostCSS plugin options
 */
export interface PostCSSPluginOptions {
  /**
   * Content files to scan for classes
   */
  content?: string[]

  /**
   * Dark mode strategy
   * @default 'class'
   */
  darkMode?: DarkModeStrategy

  /**
   * Whether to include base styles (reset, CSS variables)
   * @default true
   */
  base?: boolean

  /**
   * Whether to include theme CSS variables
   * @default true
   */
  includeTheme?: boolean

  /**
   * Additional CoralCSS options
   */
  coralOptions?: Partial<CoralOptions>
}

/**
 * PostCSS plugin result type
 */
interface PostCSSPlugin {
  postcssPlugin: string
  Once: (root: PostCSSRoot, helpers: PostCSSHelpers) => Promise<void>
}

interface PostCSSRoot {
  walkAtRules: (name: string, callback: (rule: PostCSSAtRule) => void) => void
}

interface PostCSSAtRule {
  params: string
  replaceWith: (node: PostCSSNode) => void
  remove: () => void
}

interface PostCSSNode {
  toString: () => string
}

interface PostCSSHelpers {
  result: {
    opts: {
      from?: string
    }
  }
  postcss: {
    parse: (css: string) => PostCSSNode
  }
}

/**
 * Create PostCSS plugin for CoralCSS
 *
 * @example
 * ```javascript
 * // postcss.config.js
 * module.exports = {
 *   plugins: [
 *     require('@coral-css/core/postcss')({
 *       content: ['./src/**\/*.{html,js,jsx,ts,tsx}'],
 *       darkMode: 'class',
 *     }),
 *   ],
 * }
 * ```
 */
export function coralPostCSSPlugin(options: PostCSSPluginOptions = {}): PostCSSPlugin {
  const {
    content = [],
    darkMode = 'class',
    base = true,
    includeTheme = true,
    coralOptions = {},
  } = options

  let coral: Coral

  return {
    postcssPlugin: 'coral-postcss',

    async Once(root, helpers) {
      // Initialize Coral
      coral = createCoral(coralOptions as CoralOptions)

      // Load preset
      const plugins = coralPreset({ darkMode })
      plugins.forEach((plugin) => coral.use(plugin))

      // Process @coral directives
      root.walkAtRules('coral', (rule) => {
        const directive = rule.params.trim()

        switch (directive) {
          case 'base': {
            if (base) {
              const baseCSS = generateBaseCSS()
              rule.replaceWith(helpers.postcss.parse(baseCSS))
            } else {
              rule.remove()
            }
            break
          }

          case 'theme': {
            if (includeTheme) {
              const themeCSS = generateThemeCSS(darkMode)
              rule.replaceWith(helpers.postcss.parse(themeCSS))
            } else {
              rule.remove()
            }
            break
          }

          case 'utilities': {
            // Scan content files and generate utilities
            const classes = scanContentFiles(content)
            const utilitiesCSS = coral.generate(classes)
            rule.replaceWith(helpers.postcss.parse(utilitiesCSS))
            break
          }

          case 'components': {
            // Generate component styles
            const componentsCSS = generateComponentsCSS()
            rule.replaceWith(helpers.postcss.parse(componentsCSS))
            break
          }

          default: {
            // Unknown directive - leave as is or remove
            rule.remove()
          }
        }
      })
    },
  }
}

// Required for PostCSS plugin
coralPostCSSPlugin.postcss = true

/**
 * Generate base CSS (modern reset)
 */
function generateBaseCSS(): string {
  return `
/* CoralCSS Base Styles */
*, ::before, ::after {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: currentColor;
}

html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  -moz-tab-size: 4;
  tab-size: 4;
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-feature-settings: normal;
  font-variation-settings: normal;
  -webkit-tap-highlight-color: transparent;
}

body {
  margin: 0;
  line-height: inherit;
}

hr {
  height: 0;
  color: inherit;
  border-top-width: 1px;
}

abbr:where([title]) {
  text-decoration: underline dotted;
}

h1, h2, h3, h4, h5, h6 {
  font-size: inherit;
  font-weight: inherit;
}

a {
  color: inherit;
  text-decoration: inherit;
}

b, strong {
  font-weight: bolder;
}

code, kbd, samp, pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 1em;
}

small {
  font-size: 80%;
}

sub, sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

table {
  text-indent: 0;
  border-color: inherit;
  border-collapse: collapse;
}

button, input, optgroup, select, textarea {
  font-family: inherit;
  font-feature-settings: inherit;
  font-variation-settings: inherit;
  font-size: 100%;
  font-weight: inherit;
  line-height: inherit;
  color: inherit;
  margin: 0;
  padding: 0;
}

button, select {
  text-transform: none;
}

button, [type='button'], [type='reset'], [type='submit'] {
  -webkit-appearance: button;
  background-color: transparent;
  background-image: none;
}

:-moz-focusring {
  outline: auto;
}

:-moz-ui-invalid {
  box-shadow: none;
}

progress {
  vertical-align: baseline;
}

::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
  height: auto;
}

[type='search'] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}

::-webkit-search-decoration {
  -webkit-appearance: none;
}

::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}

summary {
  display: list-item;
}

blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol, ul, menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

dialog {
  padding: 0;
}

textarea {
  resize: vertical;
}

input::placeholder, textarea::placeholder {
  opacity: 1;
  color: #9ca3af;
}

button, [role="button"] {
  cursor: pointer;
}

:disabled {
  cursor: default;
}

img, svg, video, canvas, audio, iframe, embed, object {
  display: block;
  vertical-align: middle;
}

img, video {
  max-width: 100%;
  height: auto;
}

[hidden] {
  display: none;
}
`.trim()
}

/**
 * Generate component base styles
 */
function generateComponentsCSS(): string {
  return `
/* CoralCSS Component Styles */

/* Focus ring utilities */
.focus-ring {
  --coral-ring-color: rgb(59 130 246 / 0.5);
  --coral-ring-offset-width: 2px;
  --coral-ring-offset-color: #fff;
  --coral-ring-width: 2px;
}

/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Not screen reader only */
.not-sr-only {
  position: static;
  width: auto;
  height: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}

/* Group and peer markers */
.group {}
.peer {}

/* Toast container */
[data-coral-toast-container] {
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  pointer-events: none;
}

[data-coral-toast-container][data-position="top-left"] {
  top: 0;
  left: 0;
}

[data-coral-toast-container][data-position="top-center"] {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

[data-coral-toast-container][data-position="top-right"] {
  top: 0;
  right: 0;
}

[data-coral-toast-container][data-position="bottom-left"] {
  bottom: 0;
  left: 0;
}

[data-coral-toast-container][data-position="bottom-center"] {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

[data-coral-toast-container][data-position="bottom-right"] {
  bottom: 0;
  right: 0;
}

[data-coral-toast] {
  pointer-events: auto;
}
`.trim()
}

/**
 * Scan content files for classes
 * Note: This is a simplified implementation. In production,
 * you'd use fast-glob or similar to read files.
 */
function scanContentFiles(patterns: string[]): string[] {
  // In a real implementation, this would:
  // 1. Use fast-glob to find matching files
  // 2. Read each file
  // 3. Extract classes using regex
  // For now, return empty array - classes will be extracted
  // during PostCSS processing of actual CSS files

  // This is a placeholder - actual implementation would need
  // file system access which isn't available in browser context
  console.warn(
    'CoralCSS PostCSS: Content scanning requires Node.js. ' +
      'Classes will be extracted from processed files.'
  )

  return []
}

export default coralPostCSSPlugin
