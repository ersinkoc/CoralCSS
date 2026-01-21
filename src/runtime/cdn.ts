/**
 * CDN Bundle
 *
 * Auto-initializing bundle for CDN usage.
 * @module runtime/cdn
 */

import { createCoral } from '../kernel'
import { coralPreset } from '../presets/coral'
import { DOMObserver, createObserver } from './observer'
import { StyleInjector, createInjector } from './injector'
import { initComponents } from '../components'
import type { Coral, CoralOptions } from '../types'

/**
 * CDN configuration
 */
export interface CDNConfig extends Partial<CoralOptions> {
  /**
   * Whether to auto-start observing
   * @default true
   */
  autoStart?: boolean

  /**
   * Whether to auto-initialize components
   * @default true
   */
  autoInitComponents?: boolean

  /**
   * Injector configuration
   */
  injector?: {
    id?: string
    nonce?: string
  }

  /**
   * Observer configuration
   */
  observer?: {
    debounce?: number
  }
}

/**
 * CoralCSS CDN instance
 */
export interface CoralCDN {
  /**
   * The Coral instance
   */
  coral: Coral

  /**
   * The DOM observer
   */
  observer: DOMObserver

  /**
   * The style injector
   */
  injector: StyleInjector

  /**
   * Start observing and generating CSS
   */
  start(): void

  /**
   * Stop observing
   */
  stop(): void

  /**
   * Generate CSS for specific classes
   */
  generate(classes: string[]): string

  /**
   * Generate CSS from HTML string
   */
  generateFromHTML(html: string): string

  /**
   * Get all generated CSS
   */
  getCSS(): string

  /**
   * Reset and clear all generated CSS
   */
  reset(): void

  /**
   * Initialize components
   */
  initComponents(): void

  /**
   * Destroy the CDN instance
   */
  destroy(): void
}

/**
 * Create CoralCSS CDN instance
 */
export function createCoralCDN(config: CDNConfig = {}): CoralCDN {
  const {
    autoStart = true,
    autoInitComponents = true,
    injector: injectorConfig = {},
    observer: observerConfig = {},
    ...coralOptions
  } = config

  // Create Coral instance with preset
  const coral = createCoral({
    ...coralOptions,
  })

  // Use coral preset by default
  const plugins = coralPreset({
    darkMode: coralOptions.darkMode ?? 'class',
  })
  plugins.forEach((plugin) => coral.use(plugin))

  // Create injector
  const injector = createInjector({
    id: injectorConfig.id ?? 'coral-styles',
    nonce: injectorConfig.nonce,
  })
  injector.init()

  // Create observer with CSS injection callback
  const observer = createObserver(coral, {
    debounce: observerConfig.debounce ?? 10,
    onClassesDetected: (classes) => {
      const css = coral.generate(classes)
      if (css) {
        injector.append(css)
      }
    },
  })

  const instance: CoralCDN = {
    coral,
    observer,
    injector,

    start() {
      observer.start()
    },

    stop() {
      observer.stop()
    },

    generate(classes: string[]): string {
      const css = coral.generate(classes)
      if (css) {
        injector.append(css)
      }
      return css
    },

    generateFromHTML(html: string): string {
      const css = coral.generateFromHTML(html)
      if (css) {
        injector.append(css)
      }
      return css
    },

    getCSS(): string {
      return injector.getCSS()
    },

    reset() {
      coral.reset()
      injector.clear()
      observer.clearCache()
    },

    initComponents() {
      initComponents()
    },

    destroy() {
      observer.stop()
      injector.destroy()
    },
  }

  // Auto-start if configured
  if (autoStart) {
    // Wait for DOM ready
    if (document.readyState === 'loading') {
      const onDOMReady = () => {
        document.removeEventListener('DOMContentLoaded', onDOMReady)
        instance.start()
        if (autoInitComponents) {
          instance.initComponents()
        }
      }
      document.addEventListener('DOMContentLoaded', onDOMReady)
    } else {
      instance.start()
      if (autoInitComponents) {
        instance.initComponents()
      }
    }
  }

  return instance
}

// Auto-initialize on script load
let globalInstance: CoralCDN | null = null

/**
 * Get or create global CoralCSS CDN instance
 */
export function getCoralCDN(): CoralCDN {
  if (!globalInstance) {
    // Check for configuration in script tag or window
    const config: CDNConfig = (window as unknown as { CORAL_CONFIG?: CDNConfig }).CORAL_CONFIG ?? {}
    globalInstance = createCoralCDN(config)
  }
  return globalInstance
}

/**
 * Reset the global instance (for cleanup/testing)
 */
export function resetGlobalInstance(): void {
  if (globalInstance) {
    globalInstance.destroy()
    globalInstance = null
  }
}

/**
 * Simple Coral API for CDN usage
 */
export interface CoralAPI {
  /** Initialize CoralCSS (called automatically) */
  init(config?: CDNConfig): CoralCDN
  /** Get the current instance */
  getInstance(): CoralCDN | null
  /** Create a new instance with custom config */
  create(config?: CDNConfig): CoralCDN
  /** Generate CSS for specific classes */
  generate(classes: string[]): string
  /** Generate CSS from HTML string */
  generateFromHTML(html: string): string
  /** Get all generated CSS */
  getCSS(): string
  /** Reset and clear all generated CSS */
  reset(): void
  /** Initialize components manually */
  initComponents(): void
  /** Stop observing DOM changes */
  stop(): void
  /** Start observing DOM changes */
  start(): void
}

// Expose to window for CDN usage
if (typeof window !== 'undefined') {
  // Legacy CoralCSS API
  (window as unknown as { CoralCSS: { createCoralCDN: typeof createCoralCDN; getCoralCDN: typeof getCoralCDN; resetGlobalInstance: typeof resetGlobalInstance } }).CoralCSS = {
    createCoralCDN,
    getCoralCDN,
    resetGlobalInstance,
  }

  // Simple Coral API
  const CoralAPI: CoralAPI = {
    init(config?: CDNConfig): CoralCDN {
      if (!globalInstance) {
        globalInstance = createCoralCDN(config)
      }
      return globalInstance
    },
    getInstance(): CoralCDN | null {
      return globalInstance
    },
    create(config?: CDNConfig): CoralCDN {
      return createCoralCDN(config)
    },
    generate(classes: string[]): string {
      return getCoralCDN().generate(classes)
    },
    generateFromHTML(html: string): string {
      return getCoralCDN().generateFromHTML(html)
    },
    getCSS(): string {
      return getCoralCDN().getCSS()
    },
    reset(): void {
      getCoralCDN().reset()
    },
    initComponents(): void {
      getCoralCDN().initComponents()
    },
    stop(): void {
      getCoralCDN().stop()
    },
    start(): void {
      getCoralCDN().start()
    },
  };

  (window as unknown as { Coral: CoralAPI }).Coral = CoralAPI

  // Auto-initialize on script load (not deferred)
  if (document.readyState === 'loading') {
    const onAutoInit = () => {
      document.removeEventListener('DOMContentLoaded', onAutoInit)
      CoralAPI.init()
    }
    document.addEventListener('DOMContentLoaded', onAutoInit)
  } else {
    // DOM already loaded, initialize immediately
    CoralAPI.init()
  }
}


export default createCoralCDN
