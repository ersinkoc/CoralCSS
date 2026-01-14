/**
 * Type declarations for @aspect/coral-turbo
 * This module is optional and may not be installed
 */

declare module '@aspect/coral-turbo' {
  export interface TurboParsedClass {
    raw: string
    utility: string
    value?: string
    variants: string[]
    opacity?: number
    arbitrary?: string
    important: boolean
    negative: boolean
  }

  export interface TurboEngine {
    parse(classString: string): TurboParsedClass[]
    parseSingle(className: string): TurboParsedClass
    extract(content: string): string[]
    process(classString: string): string
    processBatch(classStrings: string[]): string[]
    extractFromFiles(contents: string[]): string[]
  }

  export function createEngine(backend?: 'auto' | 'native' | 'wasm'): Promise<TurboEngine>
  export function getBackend(): string
}
