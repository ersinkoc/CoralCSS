/**
 * Qwik Integration
 *
 * Qwik plugin for CoralCSS integration.
 * Provides Vite plugin compatibility, resumability support, and Qwik-specific features.
 * @module build/qwik
 */

import type { Plugin as VitePlugin } from 'vite'
import type { Coral, CoralOptions, DarkModeStrategy } from '../types'
import { createCoral } from '../kernel'
import { coralPreset } from '../presets/coral'

/**
 * Qwik plugin options
 */
export interface QwikPluginOptions extends Partial<CoralOptions> {
  /**
   * File patterns to scan for classes
   * @default ['src/**\/*.{tsx,jsx,ts,js}']
   */
  include?: string[]

  /**
   * File patterns to exclude
   * @default ['node_modules/**']
   */
  exclude?: string[]

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
   * Output CSS file path
   * @default 'virtual:coral.css'
   */
  output?: string

  /**
   * Extract classes from useSignal/useStore
   * @default true
   */
  extractFromSignals?: boolean

  /**
   * Extract classes from component$ functions
   * @default true
   */
  extractFromComponents?: boolean
}

const VIRTUAL_MODULE_ID = 'virtual:coral.css'
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID

/**
 * Create Qwik Vite plugin for CoralCSS
 *
 * @example
 * ```typescript
 * // vite.config.ts
 * import { qwikVite } from '@builder.io/qwik/optimizer'
 * import { qwikCity } from '@builder.io/qwik-city/vite'
 * import { coralQwik } from '@coral-css/core/qwik'
 *
 * export default defineConfig({
 *   plugins: [
 *     qwikCity(),
 *     qwikVite(),
 *     coralQwik({
 *       darkMode: 'class',
 *     }),
 *   ],
 * })
 * ```
 *
 * @example
 * ```typescript
 * // src/root.tsx
 * import 'virtual:coral.css'
 *
 * export default component$(() => {
 *   return (
 *     <QwikCityProvider>
 *       <head>
 *         <RouterHead />
 *       </head>
 *       <body class="bg-white dark:bg-gray-900">
 *         <RouterOutlet />
 *       </body>
 *     </QwikCityProvider>
 *   )
 * })
 * ```
 */
export function coralQwik(options: QwikPluginOptions = {}): VitePlugin {
  const {
    include = ['src/**/*.{tsx,jsx,ts,js}'],
    exclude = ['node_modules/**'],
    minify = true,
    darkMode = 'class',
    preset: _preset = 'coral',
    output = VIRTUAL_MODULE_ID,
    extractFromSignals = true,
    extractFromComponents = true,
    ...coralOptions
  } = options

  let coral: Coral
  const seenClasses = new Set<string>()
  let generatedCSS = ''
  let isProduction = false

  return {
    name: 'coral-qwik',
    enforce: 'pre',

    configResolved(config) {
      isProduction = config.command === 'build' || config.mode === 'production'

      // Initialize Coral
      coral = createCoral(coralOptions)
      const plugins = coralPreset({ darkMode })
      plugins.forEach((plugin) => coral.use(plugin))
    },

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID || id === output) {
        return RESOLVED_VIRTUAL_MODULE_ID
      }
    },

    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        return generatedCSS || '/* CoralCSS - No classes found */'
      }
    },

    transform(code, id) {
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

      // Extract classes from code
      const newClasses = extractClassesFromQwik(code, {
        extractFromSignals,
        extractFromComponents,
      })

      let hasNewClasses = false

      for (const cls of newClasses) {
        if (!seenClasses.has(cls)) {
          seenClasses.add(cls)
          hasNewClasses = true
        }
      }

      // Regenerate CSS if new classes found
      if (hasNewClasses) {
        const classes = Array.from(seenClasses)
        generatedCSS = coral.generate(classes)

        if (isProduction && minify) {
          generatedCSS = minifyCSS(generatedCSS)
        }
      }

      return null
    },

    handleHotUpdate({ file, server }) {
      // Check if file should trigger CSS regeneration
      const shouldProcess = include.some((pattern) => {
        const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'))
        return regex.test(file)
      })

      if (shouldProcess) {
        // Invalidate virtual module to trigger reload
        const module = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID)
        if (module) {
          server.moduleGraph.invalidateModule(module)
          return [module]
        }
      }
    },
  }
}

interface ExtractOptions {
  extractFromSignals: boolean
  extractFromComponents: boolean
}

/**
 * Extract classes from Qwik components
 */
function extractClassesFromQwik(code: string, options: ExtractOptions): string[] {
  const classes = new Set<string>()

  // Match class="..." (Qwik uses class, not className)
  const classAttrRegex = /class=["']([^"']+)["']/g
  let match

  while ((match = classAttrRegex.exec(code)) !== null) {
    const captured = match[1]
    if (captured) {
      captured.split(/\s+/).forEach((cls) => {
        if (cls && !cls.includes('{')) {
          classes.add(cls)
        }
      })
    }
  }

  // Match class={`...`} template literals
  const templateRegex = /class=\{`([^`]+)`\}/g
  while ((match = templateRegex.exec(code)) !== null) {
    const content = match[1]
    if (content) {
      const staticParts = content.replace(/\$\{[^}]+\}/g, ' ')
      staticParts.split(/\s+/).forEach((cls) => {
        if (cls) { classes.add(cls) }
      })
    }
  }

  // Match class={cn('...')} or clsx('...')
  const cnRegex = /(?:cn|clsx|cva|classnames|twMerge)\s*\(\s*["']([^"']+)["']/g
  while ((match = cnRegex.exec(code)) !== null) {
    const captured = match[1]
    if (captured) {
      captured.split(/\s+/).forEach((cls) => {
        if (cls) { classes.add(cls) }
      })
    }
  }

  // Match ternary class expressions class={isActive ? 'active' : 'inactive'}
  const ternaryRegex = /class=\{[^?]+\?\s*["']([^"']+)["']\s*:\s*["']([^"']+)["']\s*\}/g
  while ((match = ternaryRegex.exec(code)) !== null) {
    const [, trueClass, falseClass] = match
    if (trueClass) {
      trueClass.split(/\s+/).forEach((cls) => {
        if (cls) { classes.add(cls) }
      })
    }
    if (falseClass) {
      falseClass.split(/\s+/).forEach((cls) => {
        if (cls) { classes.add(cls) }
      })
    }
  }

  // Extract from signal assignments if enabled
  if (options.extractFromSignals) {
    // Match useSignal<string>('class-name') or useSignal('class')
    const signalRegex = /useSignal(?:<[^>]*>)?\s*\(\s*["']([^"']+)["']\s*\)/g
    while ((match = signalRegex.exec(code)) !== null) {
      const value = match[1]
      if (value && looksLikeClassName(value)) {
        value.split(/\s+/).forEach((cls) => {
          if (cls) { classes.add(cls) }
        })
      }
    }

    // Match useStore({ className: '...' })
    const storeRegex = /useStore\s*\(\s*\{[^}]*(?:class|className)\s*:\s*["']([^"']+)["']/g
    while ((match = storeRegex.exec(code)) !== null) {
      const value = match[1]
      if (value) {
        value.split(/\s+/).forEach((cls) => {
          if (cls) { classes.add(cls) }
        })
      }
    }

    // Match useComputed$(() => 'class-name')
    const computedRegex = /useComputed\$\s*\(\s*\(\)\s*=>\s*["']([^"']+)["']\s*\)/g
    while ((match = computedRegex.exec(code)) !== null) {
      const value = match[1]
      if (value && looksLikeClassName(value)) {
        value.split(/\s+/).forEach((cls) => {
          if (cls) { classes.add(cls) }
        })
      }
    }
  }

  // Extract from component$ functions if enabled
  if (options.extractFromComponents) {
    // Match component$(() => { ... return <div class="..."/> })
    const componentRegex = /component\$\s*\(\s*(?:\([^)]*\))?\s*(?:=>)?\s*\{([\s\S]*?)\}\s*\)/g
    while ((match = componentRegex.exec(code)) !== null) {
      const componentContent = match[1]
      if (componentContent) {
        // Extract classes from component body
        const innerClasses = extractClassesFromQwik(componentContent, {
          extractFromSignals: false,
          extractFromComponents: false,
        })
        innerClasses.forEach((cls) => classes.add(cls))
      }
    }

    // Match routeLoader$, routeAction$ return values with classes
    const loaderRegex = /route(?:Loader|Action)\$\s*\(\s*(?:async)?\s*\([^)]*\)\s*=>\s*\{([\s\S]*?)\}\s*\)/g
    while ((match = loaderRegex.exec(code)) !== null) {
      const loaderContent = match[1]
      if (loaderContent) {
        // Look for class references in return data
        const classInLoader = /(?:className|class|classes?):\s*["']([^"']+)["']/g
        let loaderMatch
        while ((loaderMatch = classInLoader.exec(loaderContent)) !== null) {
          const value = loaderMatch[1]
          if (value) {
            value.split(/\s+/).forEach((cls) => {
              if (cls) { classes.add(cls) }
            })
          }
        }
      }
    }
  }

  // Match $() event handler classes
  const eventHandlerRegex = /\$\s*\(\s*(?:async)?\s*\([^)]*\)\s*=>\s*\{[^}]*class[^}]*["']([^"']+)["']/g
  while ((match = eventHandlerRegex.exec(code)) !== null) {
    const value = match[1]
    if (value && looksLikeClassName(value)) {
      value.split(/\s+/).forEach((cls) => {
        if (cls) { classes.add(cls) }
      })
    }
  }

  // Match Slot with class attribute
  const slotRegex = /<Slot[^>]*class=["']([^"']+)["']/g
  while ((match = slotRegex.exec(code)) !== null) {
    const captured = match[1]
    if (captured) {
      captured.split(/\s+/).forEach((cls) => {
        if (cls) { classes.add(cls) }
      })
    }
  }

  // Match useVisibleTask$ with class manipulation
  const visibleTaskRegex = /useVisibleTask\$\s*\(\s*(?:async)?\s*\([^)]*\)\s*=>\s*\{([\s\S]*?)\}\s*\)/g
  while ((match = visibleTaskRegex.exec(code)) !== null) {
    const taskContent = match[1]
    if (taskContent) {
      // Look for classList.add/remove/toggle
      const classListRegex = /classList\.(?:add|remove|toggle)\s*\(\s*["']([^"']+)["']\s*\)/g
      let classListMatch
      while ((classListMatch = classListRegex.exec(taskContent)) !== null) {
        const value = classListMatch[1]
        if (value) {
          classes.add(value)
        }
      }
    }
  }

  // Extract array/object syntax from clsx/cn
  const objectSyntaxRegex = /(?:cn|clsx|cva)\s*\(\s*\{([^}]+)\}/g
  while ((match = objectSyntaxRegex.exec(code)) !== null) {
    const objectContent = match[1]
    if (objectContent) {
      const keyRegex = /["']?([a-zA-Z][a-zA-Z0-9_:-]*)["']?\s*:/g
      let keyMatch
      while ((keyMatch = keyRegex.exec(objectContent)) !== null) {
        const key = keyMatch[1]
        if (key && looksLikeClassName(key)) {
          classes.add(key)
        }
      }
    }
  }

  return Array.from(classes)
}

/**
 * Check if a string looks like a CSS class name
 */
function looksLikeClassName(str: string): boolean {
  const utilityPatterns = [
    /^[a-z]+-/,
    /^-?[mp][trblxy]?-/,
    /^(?:w|h|min|max)-/,
    /^(?:flex|grid|gap)/,
    /^(?:text|font|leading)/,
    /^(?:bg|border|ring|shadow)/,
    /^(?:rounded|opacity|z)/,
    /^(?:hover|focus|active|dark):/,
    /^(?:sm|md|lg|xl|2xl):/,
  ]

  return utilityPatterns.some((pattern) => pattern.test(str))
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
 * Qwik context for dark mode
 */
export const darkModeContext = `
import { createContextId } from '@builder.io/qwik'

export interface DarkModeContext {
  darkMode: boolean
  toggle: () => void
  set: (value: boolean) => void
}

export const DarkModeContext = createContextId<DarkModeContext>('coral-dark-mode')
`

/**
 * Qwik dark mode provider component code
 */
export const darkModeProvider = `
import { component$, Slot, useContextProvider, useSignal, useVisibleTask$ } from '@builder.io/qwik'
import { DarkModeContext } from './dark-mode-context'

export const DarkModeProvider = component$(() => {
  const darkMode = useSignal(false)

  useVisibleTask$(() => {
    // Initialize from localStorage or system preference
    const stored = localStorage.getItem('coral-dark-mode')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    darkMode.value = stored ? stored === 'dark' : prefersDark
    document.documentElement.classList.toggle('dark', darkMode.value)
  })

  useContextProvider(DarkModeContext, {
    get darkMode() { return darkMode.value },
    toggle: $(() => {
      darkMode.value = !darkMode.value
      localStorage.setItem('coral-dark-mode', darkMode.value ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', darkMode.value)
    }),
    set: $((value: boolean) => {
      darkMode.value = value
      localStorage.setItem('coral-dark-mode', value ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', value)
    }),
  })

  return <Slot />
})
`

/**
 * Qwik hook for dark mode
 */
export const useDarkModeHook = `
import { useContext } from '@builder.io/qwik'
import { DarkModeContext } from './dark-mode-context'

export function useDarkMode() {
  return useContext(DarkModeContext)
}
`

/**
 * Server-side dark mode detection for Qwik City
 */
export interface QwikDarkModeUtils {
  /**
   * Get dark mode from request cookies
   */
  getDarkModeFromRequest: (request: Request) => boolean | null

  /**
   * Set dark mode cookie headers
   */
  setDarkModeCookie: (value: boolean) => Headers
}

/**
 * Create dark mode utilities for Qwik City
 *
 * @example
 * ```typescript
 * // src/routes/layout.tsx
 * import { routeLoader$ } from '@builder.io/qwik-city'
 * import { createQwikDarkModeUtils } from '@coral-css/core/qwik'
 *
 * const darkModeUtils = createQwikDarkModeUtils()
 *
 * export const useDarkModeLoader = routeLoader$(async ({ request }) => {
 *   const darkMode = darkModeUtils.getDarkModeFromRequest(request)
 *   return { darkMode }
 * })
 * ```
 */
export function createQwikDarkModeUtils(): QwikDarkModeUtils {
  return {
    getDarkModeFromRequest(request: Request): boolean | null {
      const cookies = request.headers.get('Cookie') || ''
      const match = cookies.match(/coral-dark-mode=(\w+)/)
      if (match) {
        return match[1] === 'dark'
      }
      return null
    },

    setDarkModeCookie(value: boolean): Headers {
      const headers = new Headers()
      const mode = value ? 'dark' : 'light'
      headers.set(
        'Set-Cookie',
        `coral-dark-mode=${mode}; Path=/; Max-Age=31536000; SameSite=Lax`
      )
      return headers
    },
  }
}

/**
 * Qwik City action for dark mode toggle
 */
export const darkModeAction = `
import { routeAction$, zod$, z } from '@builder.io/qwik-city'

export const useDarkModeAction = routeAction$(
  async (data, { cookie }) => {
    const darkMode = data.darkMode === 'dark'
    cookie.set('coral-dark-mode', darkMode ? 'dark' : 'light', {
      path: '/',
      maxAge: 31536000,
      sameSite: 'lax',
    })
    return { success: true, darkMode }
  },
  zod$({
    darkMode: z.enum(['dark', 'light']),
  })
)
`

/**
 * Type declarations for Qwik context
 */
export interface CoralQwikContext {
  darkMode: boolean
  theme: 'light' | 'dark' | 'system'
}

/**
 * Helper to get initial dark mode class for SSR
 *
 * @example
 * ```typescript
 * // src/entry.ssr.tsx
 * import { getInitialDarkModeClass } from '@coral-css/core/qwik'
 *
 * export default function (opts: RenderToStreamOptions) {
 *   const darkModeClass = getInitialDarkModeClass(opts.serverData?.request)
 *   return renderToStream(<Root />, {
 *     ...opts,
 *     containerAttributes: {
 *       class: darkModeClass,
 *     },
 *   })
 * }
 * ```
 */
export function getInitialDarkModeClass(request?: Request): string {
  if (!request) {return ''}

  const cookies = request.headers.get('Cookie') || ''
  const match = cookies.match(/coral-dark-mode=(\w+)/)
  if (match && match[1] === 'dark') {
    return 'dark'
  }

  // Check system preference via client hints
  const colorScheme = request.headers.get('Sec-CH-Prefers-Color-Scheme')
  if (colorScheme === 'dark') {
    return 'dark'
  }

  return ''
}

/**
 * Qwik-specific class utilities
 */
export const qwikClassUtils = `
import { useSignal, useComputed$ } from '@builder.io/qwik'

/**
 * Create a reactive class signal
 */
export function useClass(initialClass: string) {
  const classSignal = useSignal(initialClass)

  return {
    class: classSignal,
    add: (cls: string) => {
      const classes = classSignal.value.split(/\\s+/).filter(Boolean)
      if (!classes.includes(cls)) {
        classSignal.value = [...classes, cls].join(' ')
      }
    },
    remove: (cls: string) => {
      const classes = classSignal.value.split(/\\s+/).filter(Boolean)
      classSignal.value = classes.filter(c => c !== cls).join(' ')
    },
    toggle: (cls: string) => {
      const classes = classSignal.value.split(/\\s+/).filter(Boolean)
      if (classes.includes(cls)) {
        classSignal.value = classes.filter(c => c !== cls).join(' ')
      } else {
        classSignal.value = [...classes, cls].join(' ')
      }
    },
    has: (cls: string) => classSignal.value.split(/\\s+/).includes(cls),
  }
}

/**
 * Create a computed class based on conditions
 */
export function useConditionalClass(
  baseClass: string,
  conditions: Record<string, boolean>
) {
  return useComputed$(() => {
    const classes = [baseClass]
    for (const [cls, condition] of Object.entries(conditions)) {
      if (condition) {
        classes.push(cls)
      }
    }
    return classes.join(' ')
  })
}
`

export default coralQwik
