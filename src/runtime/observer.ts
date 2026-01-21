/**
 * Runtime Observer
 *
 * MutationObserver for watching DOM changes and generating CSS.
 * @module runtime/observer
 */

import type { Coral } from '../types'

/**
 * Observer configuration
 */
export interface ObserverConfig {
  /**
   * Root element to observe
   * @default document.documentElement
   */
  root?: HTMLElement

  /**
   * Attributes to watch for class changes
   * @default ['class']
   */
  attributes?: string[]

  /**
   * Whether to observe subtree
   * @default true
   */
  subtree?: boolean

  /**
   * Whether to observe child list changes
   * @default true
   */
  childList?: boolean

  /**
   * Callback when new classes are detected
   */
  onClassesDetected?: (classes: string[]) => void

  /**
   * Debounce time in ms
   * @default 10
   */
  debounce?: number
}

/**
 * DOM observer for watching class changes
 */
export class DOMObserver {
  private observer: MutationObserver | null = null
  private coral: Coral
  private config: Required<ObserverConfig>
  private seenClasses = new Set<string>()
  private pendingClasses = new Set<string>()
  private debounceTimer: ReturnType<typeof setTimeout> | null = null

  constructor(coral: Coral, config: ObserverConfig = {}) {
    this.coral = coral
    this.config = {
      root: config.root ?? document.documentElement,
      attributes: config.attributes ?? ['class'],
      subtree: config.subtree ?? true,
      childList: config.childList ?? true,
      onClassesDetected: config.onClassesDetected ?? (() => {}),
      debounce: config.debounce ?? 10,
    }
  }

  /**
   * Start observing the DOM
   */
  start(): void {
    if (this.observer) {return}

    // Scan existing classes first
    this.scanExisting()

    // Create observer
    this.observer = new MutationObserver((mutations) => {
      this.handleMutations(mutations)
    })

    // Start observing
    this.observer.observe(this.config.root, {
      attributes: true,
      attributeFilter: this.config.attributes,
      subtree: this.config.subtree,
      childList: this.config.childList,
      characterData: false,
    })
  }

  /**
   * Stop observing the DOM and clean up resources
   */
  stop(): void {
    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer)
      this.debounceTimer = null
    }

    // Clear class caches to prevent memory leaks
    this.seenClasses.clear()
    this.pendingClasses.clear()
  }

  /**
   * Scan existing elements for classes
   */
  private scanExisting(): void {
    const elements = this.config.root.querySelectorAll('[class]')
    const classes = new Set<string>()

    elements.forEach((el) => {
      const classList = el.getAttribute('class')?.split(/\s+/) ?? []
      classList.forEach((cls) => {
        if (cls && !this.seenClasses.has(cls)) {
          classes.add(cls)
          this.seenClasses.add(cls)
        }
      })
    })

    if (classes.size > 0) {
      this.processClasses(Array.from(classes))
    }
  }

  /**
   * Handle mutations
   */
  private handleMutations(mutations: MutationRecord[]): void {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const el = mutation.target as HTMLElement
        this.extractClasses(el)
      } else if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement
            this.extractClasses(el)
            el.querySelectorAll('[class]').forEach((child) => {
              this.extractClasses(child as HTMLElement)
            })
          }
        })
      }
    }

    // Process pending classes with debounce
    if (this.pendingClasses.size > 0) {
      this.scheduleProcess()
    }
  }

  /**
   * Extract classes from element
   */
  private extractClasses(el: HTMLElement): void {
    const classList = el.getAttribute('class')?.split(/\s+/) ?? []

    for (const cls of classList) {
      if (cls && !this.seenClasses.has(cls)) {
        this.pendingClasses.add(cls)
        this.seenClasses.add(cls)
      }
    }
  }

  /**
   * Schedule processing of pending classes
   */
  private scheduleProcess(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer)
    }

    this.debounceTimer = setTimeout(() => {
      const classes = Array.from(this.pendingClasses)
      this.pendingClasses.clear()
      this.processClasses(classes)
    }, this.config.debounce)
  }

  /**
   * Process detected classes
   */
  private processClasses(classes: string[]): void {
    if (classes.length === 0) {return}

    // Generate CSS for new classes
    this.coral.generate(classes)

    // Call callback
    this.config.onClassesDetected(classes)
  }

  /**
   * Force scan of current DOM
   */
  rescan(): void {
    this.scanExisting()
  }

  /**
   * Get all seen classes
   */
  getSeenClasses(): string[] {
    return Array.from(this.seenClasses)
  }

  /**
   * Clear seen classes cache
   */
  clearCache(): void {
    this.seenClasses.clear()
    this.pendingClasses.clear()
  }
}

/**
 * Create a DOM observer
 */
export function createObserver(coral: Coral, config?: ObserverConfig): DOMObserver {
  return new DOMObserver(coral, config)
}

export default DOMObserver
