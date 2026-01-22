/**
 * Nuxt Module
 *
 * Nuxt 3 module for CoralCSS integration.
 * Provides automatic CSS injection, HMR support, and configuration options.
 * @module build/nuxt
 */

import type { Coral, CoralOptions, DarkModeStrategy } from '../types'
import { createCoral } from '../kernel'
import { coralPreset } from '../presets/coral'

/**
 * Nuxt module options
 */
export interface NuxtModuleOptions extends Partial<CoralOptions> {
  /**
   * File patterns to scan for classes
   * @default ['components/**\/*.{vue,js,ts}', 'pages/**\/*.vue', 'layouts/**\/*.vue', 'app.vue']
   */
  include?: string[]

  /**
   * File patterns to exclude
   * @default ['node_modules/**']
   */
  exclude?: string[]

  /**
   * Whether to inject CSS automatically
   * @default true
   */
  injectCSS?: boolean

  /**
   * Whether to minify CSS in production
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
   * Custom config file path
   */
  configPath?: string

  /**
   * Enable dev tools integration
   * @default true
   */
  devtools?: boolean

  /**
   * Expose composables
   * @default true
   */
  exposeComposables?: boolean

  /**
   * CSS output path (relative to .nuxt)
   * @default 'coral.css'
   */
  cssPath?: string
}

/**
 * Nuxt module definition interface
 */
export interface NuxtModule {
  meta?: {
    name: string
    version?: string
    configKey?: string
  }
  defaults?: Partial<NuxtModuleOptions>
  setup: (options: NuxtModuleOptions, nuxt: NuxtContext) => void | Promise<void>
}

/**
 * Simplified Nuxt context interface
 */
export interface NuxtContext {
  options: {
    rootDir: string
    srcDir: string
    buildDir: string
    dev: boolean
    css: string[]
    vite?: {
      plugins?: unknown[]
    }
    postcss?: {
      plugins?: Record<string, unknown>
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hook: (name: string, callback: (...args: any[]) => void | Promise<void>) => void
  hooks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hook: (name: string, callback: (...args: any[]) => void | Promise<void>) => void
  }
}

/**
 * Nuxt plugin definition
 */
export interface NuxtPlugin {
  src: string
  mode?: 'client' | 'server' | 'all'
}

const VIRTUAL_CSS_ID = 'virtual:coral.css'

/**
 * Create Nuxt module for CoralCSS
 *
 * @example
 * ```typescript
 * // nuxt.config.ts
 * export default defineNuxtConfig({
 *   modules: ['@coral-css/nuxt'],
 *   coral: {
 *     darkMode: 'class',
 *     preset: 'coral',
 *   },
 * })
 * ```
 */
export function defineCoralModule(): NuxtModule {
  return {
    meta: {
      name: '@coral-css/nuxt',
      version: '1.0.0',
      configKey: 'coral',
    },
    defaults: {
      include: [
        'components/**/*.{vue,js,ts}',
        'pages/**/*.vue',
        'layouts/**/*.vue',
        'composables/**/*.{js,ts}',
        'app.vue',
        'error.vue',
      ],
      exclude: ['node_modules/**'],
      injectCSS: true,
      minify: true,
      darkMode: 'class',
      preset: 'coral',
      devtools: true,
      exposeComposables: true,
      cssPath: 'coral.css',
    },
    setup(options, nuxt) {
      const {
        include = [],
        exclude = [],
        injectCSS = true,
        minify = true,
        darkMode = 'class',
        preset: _preset = 'coral',
        devtools: _devtools = true,
        exposeComposables: _exposeComposables = true,
        cssPath = 'coral.css',
        ...coralOptions
      } = options

      // Initialize Coral
      const coral: Coral = createCoral(coralOptions)
      const plugins = coralPreset({ darkMode })
      plugins.forEach((plugin) => coral.use(plugin))

      const seenClasses = new Set<string>()
      let generatedCSS = ''

      // Add Vite plugin
      nuxt.hook('vite:extendConfig', (config: { plugins?: unknown[] }) => {
        config.plugins = config.plugins || []
        config.plugins.push(createNuxtVitePlugin({
          include,
          exclude,
          minify: minify && !nuxt.options.dev,
          darkMode,
          coral,
          seenClasses,
          onCSSUpdate: (css: string) => {
            generatedCSS = css
          },
        }))
      })

      // Inject CSS
      if (injectCSS) {
        nuxt.options.css = nuxt.options.css || []
        nuxt.options.css.push(VIRTUAL_CSS_ID)
      }

      // Generate CSS file in build
      nuxt.hook('build:before', async () => {
        // Scan all files for classes
        const classes = Array.from(seenClasses)
        if (classes.length > 0) {
          generatedCSS = coral.generate(classes)
          if (minify && !nuxt.options.dev) {
            generatedCSS = minifyCSS(generatedCSS)
          }
        }
      })

      // Add server handler for virtual CSS
      nuxt.hook('nitro:config', (nitroConfig: { devHandlers?: unknown[] }) => {
        nitroConfig.devHandlers = nitroConfig.devHandlers || []
        nitroConfig.devHandlers.push({
          route: '/_nuxt/coral.css',
          handler: () => {
            return new Response(generatedCSS, {
              headers: { 'Content-Type': 'text/css' },
            })
          },
        })
      })
    },
  }
}

/**
 * Create Vite plugin for Nuxt integration
 */
function createNuxtVitePlugin(options: {
  include: string[]
  exclude: string[]
  minify: boolean
  darkMode: DarkModeStrategy
  coral: Coral
  seenClasses: Set<string>
  onCSSUpdate: (css: string) => void
}) {
  const { include, exclude, minify, coral, seenClasses, onCSSUpdate } = options

  return {
    name: 'coral-nuxt',
    enforce: 'pre' as const,

    resolveId(id: string) {
      if (id === VIRTUAL_CSS_ID) {
        return '\0' + VIRTUAL_CSS_ID
      }
    },

    load(id: string) {
      if (id === '\0' + VIRTUAL_CSS_ID) {
        const classes = Array.from(seenClasses)
        let css = classes.length > 0 ? coral.generate(classes) : '/* CoralCSS - No classes found */'
        if (minify) {
          css = minifyCSS(css)
        }
        onCSSUpdate(css)
        return css
      }
    },

    transform(code: string, id: string) {
      // Check if file should be processed
      const shouldProcess = include.some((pattern) => {
        const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'))
        return regex.test(id)
      })

      const shouldExclude = exclude.some((pattern) => {
        const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'))
        return regex.test(id)
      })

      if (!shouldProcess || shouldExclude) {
        return null
      }

      // Extract classes from Vue SFC
      const newClasses = extractClassesFromVue(code)
      let hasNewClasses = false

      for (const cls of newClasses) {
        if (!seenClasses.has(cls)) {
          seenClasses.add(cls)
          hasNewClasses = true
        }
      }

      if (hasNewClasses) {
        const classes = Array.from(seenClasses)
        let css = coral.generate(classes)
        if (minify) {
          css = minifyCSS(css)
        }
        onCSSUpdate(css)
      }

      return null
    },

    handleHotUpdate({ file, server }: { file: string; server: { moduleGraph: { getModuleById: (id: string) => unknown; invalidateModule: (m: unknown) => void } } }) {
      const shouldProcess = include.some((pattern) => {
        const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'))
        return regex.test(file)
      })

      if (shouldProcess) {
        const module = server.moduleGraph.getModuleById('\0' + VIRTUAL_CSS_ID)
        if (module) {
          server.moduleGraph.invalidateModule(module)
          return [module]
        }
      }
    },
  }
}

/**
 * Extract classes from Vue SFC
 */
function extractClassesFromVue(code: string): string[] {
  const classes = new Set<string>()

  // Match class="..." and :class="..."
  const classAttrRegex = /(?::?class)=["']([^"']+)["']/g
  let match

  while ((match = classAttrRegex.exec(code)) !== null) {
    const captured = match[1]
    if (captured) {
      const classList = captured.split(/\s+/)
      classList.forEach((cls) => {
        if (cls && !cls.includes('{') && !cls.includes('[')) {
          classes.add(cls)
        }
      })
    }
  }

  // Match :class="{ 'class-name': condition }"
  const classBindingRegex = /:class="\{([^}]+)\}"/g
  while ((match = classBindingRegex.exec(code)) !== null) {
    const content = match[1]
    if (content) {
      const classKeyRegex = /['"]([^'"]+)['"]\s*:/g
      let classMatch
      while ((classMatch = classKeyRegex.exec(content)) !== null) {
        const captured = classMatch[1]
        if (captured) {
          classes.add(captured)
        }
      }
    }
  }

  // Match :class="[...]" arrays
  const classArrayRegex = /:class="\[([^\]]+)\]"/g
  while ((match = classArrayRegex.exec(code)) !== null) {
    const content = match[1]
    if (content) {
      const stringRegex = /['"]([^'"]+)['"]/g
      let stringMatch
      while ((stringMatch = stringRegex.exec(content)) !== null) {
        const captured = stringMatch[1]
        if (captured) {
          captured.split(/\s+/).forEach((cls) => {
            if (cls) { classes.add(cls) }
          })
        }
      }
    }
  }

  // Match class in template literals
  const templateRegex = /class=`([^`]+)`/g
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

  // Match @apply in <style> blocks
  const styleBlockRegex = /<style[^>]*>([\s\S]*?)<\/style>/g
  while ((match = styleBlockRegex.exec(code)) !== null) {
    const styleContent = match[1]
    if (styleContent) {
      const applyRegex = /@apply\s+([^;]+);/g
      let applyMatch
      while ((applyMatch = applyRegex.exec(styleContent)) !== null) {
        const captured = applyMatch[1]
        if (captured) {
          captured.split(/\s+/).forEach((cls) => {
            if (cls) { classes.add(cls) }
          })
        }
      }
    }
  }

  return Array.from(classes)
}

/**
 * Simple CSS minification
 */
function minifyCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim()
}

/**
 * Nuxt composables for CoralCSS
 */
export const useCoralComposables = {
  /**
   * Generate classes for a component
   */
  useCoralClasses: `
export function useCoralClasses(classes: string | string[]) {
  const classList = Array.isArray(classes) ? classes : classes.split(/\\s+/)
  return classList.filter(Boolean).join(' ')
}
`,

  /**
   * Dark mode toggle composable
   */
  useDarkMode: `
export function useDarkMode() {
  const isDark = useState('coral-dark-mode', () => false)
  const colorMode = useColorMode()

  const toggle = () => {
    isDark.value = !isDark.value
    if (process.client) {
      document.documentElement.classList.toggle('dark', isDark.value)
    }
  }

  const set = (dark: boolean) => {
    isDark.value = dark
    if (process.client) {
      document.documentElement.classList.toggle('dark', dark)
    }
  }

  return {
    isDark: readonly(isDark),
    toggle,
    set,
  }
}
`,

  /**
   * Theme switcher composable
   */
  useTheme: `
export function useTheme() {
  const theme = useState('coral-theme', () => 'coral')

  const setTheme = (newTheme: string) => {
    theme.value = newTheme
    if (process.client) {
      document.documentElement.setAttribute('data-theme', newTheme)
    }
  }

  return {
    theme: readonly(theme),
    setTheme,
  }
}
`,
}

/**
 * Create Nuxt plugin for runtime features
 */
export function createNuxtPlugin(): NuxtPlugin {
  return {
    src: 'coral-plugin.client.ts',
    mode: 'client',
  }
}

/**
 * Plugin content for client-side runtime
 */
export const nuxtPluginContent = `
export default defineNuxtPlugin(() => {
  // Initialize dark mode from system preference or saved preference
  if (process.client) {
    const savedMode = localStorage.getItem('coral-dark-mode')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedMode === 'dark' || (!savedMode && prefersDark)) {
      document.documentElement.classList.add('dark')
    }
  }
})
`

/**
 * App config type augmentation
 */
export const nuxtAppConfigTypes = `
declare module 'nuxt/schema' {
  interface AppConfigInput {
    coral?: {
      darkMode?: 'class' | 'media' | 'selector' | 'auto'
      theme?: string
    }
  }
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    coral?: import('@coral-css/core').NuxtModuleOptions
  }
}

export {}
`

/**
 * Default export for Nuxt module
 */
export const coralNuxtModule = defineCoralModule()

export default coralNuxtModule
