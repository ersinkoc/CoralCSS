/**
 * Base Component
 *
 * Base class and utilities for headless components.
 * @module components/base
 */

import type { ComponentConfig, ComponentState, ComponentContext, ComponentHooks, StateListener } from '../types'
import { generateId, trapFocus, releaseFocusTrap, lockScroll, unlockScroll } from '../utils'

/**
 * Tracked event listener entry for proper cleanup
 */
interface TrackedListener {
  target: EventTarget
  event: string
  handler: EventListener
  options?: AddEventListenerOptions
}

/**
 * Base component class that all headless components extend
 */
export abstract class BaseComponent {
  readonly id: string
  readonly name: string
  readonly element: HTMLElement
  protected state: ComponentState
  protected config: ComponentConfig
  protected hooks: ComponentHooks
  protected boundHandlers: Map<string, EventListener> = new Map()
  protected trackedListeners: TrackedListener[] = []
  protected stateListeners: Set<StateListener> = new Set()

  constructor(element: HTMLElement, config: Partial<ComponentConfig> = {}) {
    this.element = element
    this.name = this.constructor.name.toLowerCase()
    this.id = element.id || generateId(this.name)
    this.config = {
      ...this.getDefaultConfig(),
      ...config,
    }
    this.hooks = config.hooks ?? {}
    this.state = this.getInitialState()

    // Set up component
    this.init()
  }

  /**
   * Get default configuration
   */
  protected abstract getDefaultConfig(): ComponentConfig

  /**
   * Get initial state
   */
  protected abstract getInitialState(): ComponentState

  /**
   * Validate configuration and warn about invalid values
   * Subclasses can override to add specific validation
   */
  protected validateConfig(): void {
    // Base validation - subclasses should call super.validateConfig()
    // and add their own validation logic
  }

  /**
   * Log a configuration warning
   */
  protected warnConfig(message: string): void {
    console.warn(`[${this.name}] Config warning: ${message}`)
  }

  /**
   * Initialize the component
   */
  protected init(): void {
    // Validate configuration
    this.validateConfig()

    // Generate unique ID if not present
    if (!this.element.id) {
      this.element.id = generateId(this.name)
    }

    // Set up ARIA attributes
    this.setupAria()

    // Bind event handlers
    this.bindEvents()

    // Call hook
    this.hooks.onInit?.(this.getContext())
  }

  /**
   * Set up ARIA attributes
   */
  protected abstract setupAria(): void

  /**
   * Bind event handlers
   */
  protected abstract bindEvents(): void

  /**
   * Get component context for hooks
   */
  protected getContext(): ComponentContext {
    return {
      element: this.element,
      state: { ...this.state },
      config: { ...this.config },
      component: this,
    }
  }

  /**
   * Update component state
   */
  protected setState(updates: Partial<ComponentState>): void {
    const prevState = { ...this.state }
    this.state = { ...this.state, ...updates }
    this.hooks.onStateChange?.(prevState, this.state, this.getContext())
    this.notifyStateListeners()
    this.render()
  }

  /**
   * Notify all state listeners
   */
  protected notifyStateListeners(): void {
    this.stateListeners.forEach(listener => listener(this.state))
  }

  /**
   * Subscribe to state changes
   */
  subscribe(listener: StateListener): () => void {
    this.stateListeners.add(listener)
    return () => {
      this.stateListeners.delete(listener)
    }
  }

  /**
   * Mount component to DOM (no-op for existing element)
   */
  mount(_container: HTMLElement | string): void {
    // Component is already mounted via constructor
    this.hooks.onMount?.()
  }

  /**
   * Unmount component from DOM
   */
  unmount(): void {
    this.hooks.onUnmount?.()
  }

  /**
   * Update component props
   */
  update(props: Record<string, unknown>): void {
    this.config = { ...this.config, ...props }
    this.hooks.onUpdate?.(props)
    this.render()
  }

  /**
   * Render/update the component
   */
  protected render(): void {
    // Subclasses implement specific rendering logic
  }

  /**
   * Emit a custom event (alias for dispatch)
   */
  protected emit(eventName: string, detail?: unknown): boolean {
    return this.dispatch(eventName, detail)
  }

  /**
   * Add event listener with cleanup tracking
   * All listeners added via this method will be automatically removed on destroy()
   */
  protected addEventListener(
    target: EventTarget,
    event: string,
    handler: EventListener,
    options?: AddEventListenerOptions
  ): void {
    // Track listener for cleanup
    this.trackedListeners.push({ target, event, handler, options })
    target.addEventListener(event, handler, options)
  }

  /**
   * Remove event listener and stop tracking it
   */
  protected removeEventListener(
    target: EventTarget,
    event: string,
    handler: EventListener,
    options?: EventListenerOptions
  ): void {
    target.removeEventListener(event, handler, options)
    // Remove from tracked listeners
    this.trackedListeners = this.trackedListeners.filter(
      (l) => !(l.target === target && l.event === event && l.handler === handler)
    )
  }

  /**
   * Remove all tracked event listeners
   */
  protected removeAllEventListeners(): void {
    for (const { target, event, handler, options } of this.trackedListeners) {
      target.removeEventListener(event, handler, options)
    }
    this.trackedListeners = []
  }

  /**
   * Query element within component
   */
  protected query<T extends Element = Element>(selector: string): T | null {
    return this.element.querySelector<T>(selector)
  }

  /**
   * Query all elements within component
   */
  protected queryAll<T extends Element = Element>(selector: string): NodeListOf<T> {
    return this.element.querySelectorAll<T>(selector)
  }

  /**
   * Dispatch custom event
   */
  protected dispatch(eventName: string, detail?: unknown): boolean {
    const event = new CustomEvent(`coral:${this.name}:${eventName}`, {
      detail,
      bubbles: true,
      cancelable: true,
    })
    return this.element.dispatchEvent(event)
  }

  /**
   * Trap focus within element
   */
  protected trapFocus(element?: HTMLElement): void {
    trapFocus(element ?? this.element)
  }

  /**
   * Release focus trap
   */
  protected releaseFocusTrap(element?: HTMLElement): void {
    releaseFocusTrap(element ?? this.element)
  }

  /**
   * Lock scroll
   */
  protected lockScroll(): void {
    lockScroll()
  }

  /**
   * Unlock scroll
   */
  protected unlockScroll(): void {
    unlockScroll()
  }

  /**
   * Check if component is open/active
   */
  isOpen(): boolean {
    return (this.state.isOpen as boolean) ?? false
  }

  /**
   * Get current state
   */
  getState(): ComponentState {
    return { ...this.state }
  }

  /**
   * Open the component (if applicable)
   */
  open(): void {
    if (!this.state.isOpen) {
      this.setState({ isOpen: true })
      this.hooks.onOpen?.(this.getContext())
      this.dispatch('open')
    }
  }

  /**
   * Close the component (if applicable)
   */
  close(): void {
    if (this.state.isOpen) {
      this.setState({ isOpen: false })
      this.hooks.onClose?.(this.getContext())
      this.dispatch('close')
    }
  }

  /**
   * Toggle the component (if applicable)
   */
  toggle(): void {
    if (this.state.isOpen) {
      this.close()
    } else {
      this.open()
    }
  }

  /**
   * Destroy the component and clean up
   */
  destroy(): void {
    // Remove all tracked event listeners (works for any target: element, document, window, etc.)
    this.removeAllEventListeners()

    // Legacy cleanup for boundHandlers (backward compatibility)
    // Key format is 'eventName-uniqueId' so we extract the event name before the last dash
    this.boundHandlers.forEach((handler, key) => {
      // Find the last dash to separate event name from unique suffix
      const lastDashIndex = key.lastIndexOf('-')
      const event = lastDashIndex > 0 ? key.substring(0, lastDashIndex) : key

      if (event) {
        // Try to remove from all possible targets since we don't know where it was added
        try {
          this.element.removeEventListener(event, handler)
        } catch { /* ignore */ }
        try {
          document.removeEventListener(event, handler)
        } catch { /* ignore */ }
        // Also try window for events like resize, scroll
        if (typeof window !== 'undefined') {
          try {
            window.removeEventListener(event, handler)
          } catch { /* ignore */ }
        }
      }
    })
    this.boundHandlers.clear()

    // Clear state listeners
    this.stateListeners.clear()

    // Release focus trap if active
    this.releaseFocusTrap()

    // Unlock scroll if locked
    this.unlockScroll()

    // Call hook
    this.hooks.onDestroy?.(this.getContext())

    // Dispatch event
    this.dispatch('destroy')
  }
}

/**
 * Create a component factory function
 */
export function createComponentFactory<T extends BaseComponent, C extends ComponentConfig>(
  ComponentClass: new (element: HTMLElement, config?: Partial<C>) => T
) {
  return (element: HTMLElement | string, config?: Partial<C>): T => {
    const el = typeof element === 'string' ? document.querySelector<HTMLElement>(element) : element
    if (!el) {
      throw new Error(`Element not found: ${element}`)
    }
    return new ComponentClass(el, config)
  }
}

/**
 * Auto-initialize components from data attributes
 */
export function autoInit(
  selector: string,
  ComponentClass: new (element: HTMLElement, config?: Partial<ComponentConfig>) => BaseComponent
): BaseComponent[] {
  const elements = document.querySelectorAll<HTMLElement>(selector)
  const instances: BaseComponent[] = []

  elements.forEach((element) => {
    // Parse config from data attributes
    const config: Partial<ComponentConfig> = {}
    for (const attr of element.attributes) {
      if (attr.name.startsWith('data-coral-')) {
        const key = attr.name
          .replace('data-coral-', '')
          .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
        try {
          config[key] = JSON.parse(attr.value)
        } catch {
          config[key] = attr.value
        }
      }
    }

    instances.push(new ComponentClass(element, config))
  })

  return instances
}

export default BaseComponent
