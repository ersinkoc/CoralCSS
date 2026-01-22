/**
 * esbuild Plugin
 *
 * esbuild plugin for CoralCSS build-time CSS generation.
 * @module build/esbuild
 */

import type { Plugin as EsbuildPlugin, OnLoadArgs, OnLoadResult, OnResolveArgs, OnResolveResult, PluginBuild } from 'esbuild'
import { promises as fs } from 'fs'
import { createCoral } from '../kernel'
import { coralPreset } from '../presets/coral'
import type { Coral, CoralOptions, DarkModeStrategy } from '../types'

/**
 * esbuild plugin options
 */
export interface EsbuildPluginOptions extends Partial<CoralOptions> {
  /**
   * File patterns to scan for classes
   * @default ['**\/*.{html,jsx,tsx,vue,svelte}']
   */
  include?: RegExp[]

  /**
   * File patterns to exclude
   * @default [/node_modules/]
   */
  exclude?: RegExp[]

  /**
   * Whether to minify CSS
   * @default true
   */
  minify?: boolean

  /**
   * Dark mode strategy
   * @default 'class'
   */
  darkMode?: DarkModeStrategy

  /**
   * Custom preset to use
   */
  preset?: 'coral' | 'wind' | 'mini' | 'full'

  /**
   * Output CSS file path (optional - if not set, CSS is injected)
   */
  outFile?: string

  /**
   * Base CSS to include before generated utilities
   */
  base?: string

  /**
   * Whether to watch for file changes
   * @default false
   */
  watch?: boolean
}

const VIRTUAL_MODULE_ID = 'virtual:coral.css'
const CORAL_NAMESPACE = 'coral-css'

/**
 * Create esbuild plugin for CoralCSS
 *
 * @example
 * ```typescript
 * // build.js
 * import esbuild from 'esbuild'
 * import coral from '@coral-css/core/esbuild'
 *
 * esbuild.build({
 *   entryPoints: ['src/index.tsx'],
 *   bundle: true,
 *   outdir: 'dist',
 *   plugins: [
 *     coral({
 *       darkMode: 'class',
 *       minify: true,
 *     }),
 *   ],
 * })
 * ```
 */
export function coralEsbuildPlugin(options: EsbuildPluginOptions = {}): EsbuildPlugin {
  const {
    include = [/\.(jsx?|tsx?|vue|svelte|astro|html)$/],
    exclude = [/node_modules/],
    minify = true,
    darkMode = 'class',
    preset: _preset = 'coral',
    outFile,
    base = '',
    watch: _watch = false,
    ...coralOptions
  } = options

  let coral: Coral
  const seenClasses = new Set<string>()
  let generatedCSS = ''

  // Initialize Coral
  coral = createCoral(coralOptions)
  const plugins = coralPreset({ darkMode })
  plugins.forEach((plugin) => coral.use(plugin))

  return {
    name: 'coral-esbuild',

    setup(build: PluginBuild) {
      // Resolve virtual module
      build.onResolve({ filter: new RegExp(`^${VIRTUAL_MODULE_ID}$`) }, (args: OnResolveArgs): OnResolveResult => {
        return {
          path: args.path,
          namespace: CORAL_NAMESPACE,
        }
      })

      // Also handle coral.css imports
      build.onResolve({ filter: /^coral\.css$/ }, (args: OnResolveArgs): OnResolveResult => {
        return {
          path: VIRTUAL_MODULE_ID,
          namespace: CORAL_NAMESPACE,
        }
      })

      // Load virtual module content
      build.onLoad({ filter: /.*/, namespace: CORAL_NAMESPACE }, (): OnLoadResult => {
        // Generate final CSS
        if (seenClasses.size > 0) {
          const classes = Array.from(seenClasses)
          generatedCSS = coral.generate(classes)

          if (minify) {
            generatedCSS = minifyCSS(generatedCSS)
          }
        }

        const finalCSS = base ? `${base}\n${generatedCSS}` : generatedCSS

        return {
          contents: finalCSS,
          loader: 'css',
        }
      })

      // Process source files to extract classes
      build.onLoad({ filter: /\.(jsx?|tsx?|vue|svelte|astro|html)$/ }, async (args: OnLoadArgs): Promise<OnLoadResult | null> => {
        // Check include/exclude patterns
        const shouldInclude = include.some((pattern) => pattern.test(args.path))
        const shouldExclude = exclude.some((pattern) => pattern.test(args.path))

        if (!shouldInclude || shouldExclude) {
          return null
        }

        try {
          const code = await fs.readFile(args.path, 'utf-8')

          // Extract classes from code
          const newClasses = extractClassesFromCode(code)

          for (const cls of newClasses) {
            seenClasses.add(cls)
          }

          // Return null to let esbuild process the file normally
          return null
        } catch {
          return null
        }
      })

      // Write CSS file on build end if outFile is specified
      build.onEnd(async () => {
        if (outFile && seenClasses.size > 0) {
          const classes = Array.from(seenClasses)
          generatedCSS = coral.generate(classes)

          if (minify) {
            generatedCSS = minifyCSS(generatedCSS)
          }

          const finalCSS = base ? `${base}\n${generatedCSS}` : generatedCSS

          try {
            await fs.writeFile(outFile, finalCSS, 'utf-8')
          } catch (error) {
            console.error(`CoralCSS: Failed to write CSS file to ${outFile}:`, error)
          }
        }
      })
    },
  }
}

/**
 * Extract classes from code
 */
function extractClassesFromCode(code: string): string[] {
  const classes = new Set<string>()

  // Match class="..." and className="..."
  const classAttrRegex = /(?:class|className)=["']([^"']+)["']/g
  let match

  while ((match = classAttrRegex.exec(code)) !== null) {
    const captured = match[1]
    if (captured) {
      const classList = captured.split(/\s+/)
      classList.forEach((cls) => {
        if (cls) { classes.add(cls) }
      })
    }
  }

  // Match class={`...`} template literals (JSX)
  const templateRegex = /(?:class|className)=\{`([^`]+)`\}/g
  while ((match = templateRegex.exec(code)) !== null) {
    const content = match[1]
    if (content) {
      const staticParts = content.replace(/\$\{[^}]+\}/g, ' ')
      const classList = staticParts.split(/\s+/)
      classList.forEach((cls) => {
        if (cls) { classes.add(cls) }
      })
    }
  }

  // Match class={cn('...')} or clsx('...')
  const cnRegex = /(?:cn|clsx|cva|classnames)\s*\(\s*["']([^"']+)["']/g
  while ((match = cnRegex.exec(code)) !== null) {
    const captured = match[1]
    if (captured) {
      const classList = captured.split(/\s+/)
      classList.forEach((cls) => {
        if (cls) { classes.add(cls) }
      })
    }
  }

  // Match @apply directive in CSS
  const applyRegex = /@apply\s+([^;]+);/g
  while ((match = applyRegex.exec(code)) !== null) {
    const captured = match[1]
    if (captured) {
      const classList = captured.split(/\s+/)
      classList.forEach((cls) => {
        if (cls) { classes.add(cls) }
      })
    }
  }

  // Match tw`...` tagged template literal (twin.macro style)
  const twRegex = /tw`([^`]+)`/g
  while ((match = twRegex.exec(code)) !== null) {
    const content = match[1]
    if (content) {
      const staticParts = content.replace(/\$\{[^}]+\}/g, ' ')
      const classList = staticParts.split(/\s+/)
      classList.forEach((cls) => {
        if (cls) { classes.add(cls) }
      })
    }
  }

  // Match css`...` with @apply
  const cssRegex = /css`([^`]+)`/g
  while ((match = cssRegex.exec(code)) !== null) {
    const content = match[1]
    if (content) {
      // Look for @apply in css`` blocks
      const applyMatches = content.match(/@apply\s+([^;]+)/g)
      if (applyMatches) {
        applyMatches.forEach((applyMatch) => {
          const classList = applyMatch.replace('@apply', '').trim().split(/\s+/)
          classList.forEach((cls) => {
            if (cls) { classes.add(cls) }
          })
        })
      }
    }
  }

  return Array.from(classes)
}

/**
 * Simple CSS minification
 *
 * Uses a state machine approach to avoid ReDoS vulnerability from
 * nested comment patterns (e.g. comment-within-comment that causes
 * catastrophic backtracking in regex solutions).
 */
function minifyCSS(css: string): string {
  // State machine approach to avoid ReDoS vulnerability
  const result: string[] = []
  let i = 0
  const len = css.length

  while (i < len) {
    // Skip CSS comments - O(n) guaranteed, no backtracking
    if (i + 1 < len && css[i] === '/' && css[i + 1] === '*') {
      i += 2
      // Advance until we find closing */
      while (i + 1 < len) {
        if (css[i] === '*' && css[i + 1] === '/') {
          i += 2
          break
        }
        i++
      }
      continue
    }

    // Handle whitespace compression
    if (/\s/.test(css[i]!)) {
      result.push(' ')
      // Skip consecutive whitespace
      while (i < len && /\s/.test(css[i]!)) {
        i++
      }
      continue
    }

    // Copy non-whitespace, non-comment characters
    result.push(css[i]!)
    i++
  }

  let output = result.join('')

  // Clean up around special characters - these are safe patterns
  output = output
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim()

  return output
}

/**
 * Create a CSS loader for runtime injection
 */
export function createCSSLoader(): string {
  return `
// CoralCSS runtime CSS loader
export function injectCSS(css) {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.setAttribute('data-coral', '');
    style.textContent = css;
    document.head.appendChild(style);
  }
}

export function updateCSS(css) {
  if (typeof document !== 'undefined') {
    let style = document.querySelector('style[data-coral]');
    if (!style) {
      style = document.createElement('style');
      style.setAttribute('data-coral', '');
      document.head.appendChild(style);
    }
    style.textContent = css;
  }
}
`
}

export default coralEsbuildPlugin
