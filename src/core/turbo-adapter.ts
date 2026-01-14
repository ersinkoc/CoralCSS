/**
 * Turbo Engine Adapter
 *
 * Bridge between CoralCSS and the Rust-based Turbo engine.
 * Provides drop-in replacement for parser and extractor with
 * automatic fallback to JavaScript implementation.
 *
 * @module core/turbo-adapter
 */

import type { ParsedClass } from '../types'

/**
 * Turbo engine interface (matches @aspect/coral-turbo exports)
 */
interface TurboEngine {
  parse(classString: string): TurboParsedClass[]
  parseSingle(className: string): TurboParsedClass
  extract(content: string): string[]
  process(classString: string): string
  processBatch(classStrings: string[]): string[]
  extractFromFiles(contents: string[]): string[]
}

/**
 * Parsed class from Turbo engine
 */
interface TurboParsedClass {
  raw: string
  utility: string
  value?: string
  variants: string[]
  opacity?: number
  arbitrary?: string
  important: boolean
  negative: boolean
}

/**
 * Turbo adapter configuration
 */
export interface TurboAdapterConfig {
  /** Enable Turbo engine */
  enabled?: boolean
  /** Prefer native over WASM */
  preferNative?: boolean
  /** Fallback to JS on error */
  fallbackOnError?: boolean
}

/**
 * Global Turbo engine instance
 */
let turboEngine: TurboEngine | null = null
let turboAvailable: boolean | null = null
let initPromise: Promise<void> | null = null

/**
 * Default adapter configuration
 */
const defaultConfig: TurboAdapterConfig = {
  enabled: true,
  preferNative: true,
  fallbackOnError: true,
}

/**
 * Current configuration
 */
let currentConfig: TurboAdapterConfig = { ...defaultConfig }

/**
 * Configure the Turbo adapter
 */
export function configureTurbo(config: Partial<TurboAdapterConfig>): void {
  currentConfig = { ...defaultConfig, ...config }
  // Reset state if disabled
  if (!currentConfig.enabled) {
    turboEngine = null
    turboAvailable = false
  }
}

/**
 * Initialize the Turbo engine
 */
export async function initTurbo(): Promise<boolean> {
  if (!currentConfig.enabled) {
    turboAvailable = false
    return false
  }

  if (turboAvailable !== null) {
    return turboAvailable
  }

  if (initPromise) {
    await initPromise
    return turboAvailable ?? false
  }

  initPromise = (async () => {
    try {
      // Try to import @aspect/coral-turbo
      const turboModule = await import('@aspect/coral-turbo')

      // Create engine with preferred backend
      const backend = currentConfig.preferNative ? 'auto' : 'wasm'
      turboEngine = await turboModule.createEngine(backend)
      turboAvailable = true

      console.log(
        `[CoralCSS] Turbo engine initialized (backend: ${turboModule.getBackend()})`
      )
    } catch (error) {
      console.warn('[CoralCSS] Turbo engine not available, using JS fallback')
      turboAvailable = false
    }
  })()

  await initPromise
  return turboAvailable ?? false
}

/**
 * Check if Turbo engine is available
 */
export function isTurboAvailable(): boolean {
  return turboAvailable === true && turboEngine !== null
}

/**
 * Get the Turbo engine instance
 */
export function getTurboEngine(): TurboEngine | null {
  return turboEngine
}

/**
 * Convert Turbo parsed class to CoralCSS format
 */
function convertParsedClass(turbo: TurboParsedClass): ParsedClass {
  // Reconstruct utility with value
  let utility = turbo.utility
  if (turbo.value) {
    utility = `${turbo.utility}-${turbo.value}`
  }

  return {
    original: turbo.raw,
    variants: turbo.variants,
    utility,
    negative: turbo.negative,
    arbitrary: turbo.arbitrary ?? null,
    important: turbo.important,
    opacity: turbo.opacity !== undefined ? String(turbo.opacity) : undefined,
  }
}

/**
 * Parse a class name using Turbo engine
 * Falls back to JS implementation if Turbo is unavailable
 */
export async function turboParse(
  className: string,
  jsFallback: (className: string) => ParsedClass
): Promise<ParsedClass> {
  if (!turboAvailable || !turboEngine) {
    // Try to initialize
    await initTurbo()
  }

  if (turboEngine && turboAvailable) {
    try {
      const result = turboEngine.parseSingle(className)
      return convertParsedClass(result)
    } catch (error) {
      if (currentConfig.fallbackOnError) {
        console.warn(`[CoralCSS] Turbo parse failed, using fallback: ${error}`)
        return jsFallback(className)
      }
      throw error
    }
  }

  return jsFallback(className)
}

/**
 * Parse multiple classes using Turbo engine
 */
export async function turboParseAll(
  classString: string,
  jsFallback: (classString: string) => ParsedClass[]
): Promise<ParsedClass[]> {
  if (!turboAvailable || !turboEngine) {
    await initTurbo()
  }

  if (turboEngine && turboAvailable) {
    try {
      const results = turboEngine.parse(classString)
      return results.map(convertParsedClass)
    } catch (error) {
      if (currentConfig.fallbackOnError) {
        console.warn(`[CoralCSS] Turbo parseAll failed, using fallback: ${error}`)
        return jsFallback(classString)
      }
      throw error
    }
  }

  return jsFallback(classString)
}

/**
 * Extract classes using Turbo engine
 */
export async function turboExtract(
  content: string,
  jsFallback: (content: string) => string[]
): Promise<string[]> {
  if (!turboAvailable || !turboEngine) {
    await initTurbo()
  }

  if (turboEngine && turboAvailable) {
    try {
      return turboEngine.extract(content)
    } catch (error) {
      if (currentConfig.fallbackOnError) {
        console.warn(`[CoralCSS] Turbo extract failed, using fallback: ${error}`)
        return jsFallback(content)
      }
      throw error
    }
  }

  return jsFallback(content)
}

/**
 * Extract from multiple files using Turbo engine (parallel)
 */
export async function turboExtractParallel(
  contents: string[],
  jsFallback: (contents: string[]) => string[]
): Promise<string[]> {
  if (!turboAvailable || !turboEngine) {
    await initTurbo()
  }

  if (turboEngine && turboAvailable) {
    try {
      return turboEngine.extractFromFiles(contents)
    } catch (error) {
      if (currentConfig.fallbackOnError) {
        console.warn(
          `[CoralCSS] Turbo extractParallel failed, using fallback: ${error}`
        )
        return jsFallback(contents)
      }
      throw error
    }
  }

  return jsFallback(contents)
}

/**
 * Process classes and generate CSS using Turbo engine
 */
export async function turboProcess(
  classString: string,
  jsFallback: (classString: string) => string
): Promise<string> {
  if (!turboAvailable || !turboEngine) {
    await initTurbo()
  }

  if (turboEngine && turboAvailable) {
    try {
      return turboEngine.process(classString)
    } catch (error) {
      if (currentConfig.fallbackOnError) {
        console.warn(`[CoralCSS] Turbo process failed, using fallback: ${error}`)
        return jsFallback(classString)
      }
      throw error
    }
  }

  return jsFallback(classString)
}

/**
 * Synchronous check if Turbo should be used
 * For hot paths that can't be async
 */
export function shouldUseTurbo(): boolean {
  return turboAvailable === true && turboEngine !== null
}

/**
 * Synchronous parse using Turbo (if available)
 * Returns null if Turbo not available
 */
export function turboParseSync(className: string): ParsedClass | null {
  if (!turboEngine || !turboAvailable) {
    return null
  }

  try {
    const result = turboEngine.parseSingle(className)
    return convertParsedClass(result)
  } catch {
    return null
  }
}

/**
 * Synchronous extract using Turbo (if available)
 * Returns null if Turbo not available
 */
export function turboExtractSync(content: string): string[] | null {
  if (!turboEngine || !turboAvailable) {
    return null
  }

  try {
    return turboEngine.extract(content)
  } catch {
    return null
  }
}
