/**
 * Toast Component
 *
 * Accessible toast notification component.
 * @module components/toast
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'
import { generateId } from '../utils'

/**
 * Toast configuration
 */
export interface ToastConfig extends ComponentConfig {
  /**
   * Duration before auto-dismiss (ms). 0 = no auto-dismiss
   * @default 5000
   */
  duration?: number

  /**
   * Position of the toast container
   * @default 'bottom-right'
   */
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

  /**
   * Whether the toast can be dismissed by clicking
   * @default true
   */
  dismissible?: boolean

  /**
   * Whether to pause auto-dismiss on hover
   * @default true
   */
  pauseOnHover?: boolean

  /**
   * Close button selector
   * @default '[data-coral-toast-close]'
   */
  closeSelector?: string

  /**
   * Toast type for styling
   * @default 'default'
   */
  type?: 'default' | 'success' | 'error' | 'warning' | 'info'
}

/**
 * Toast state
 */
export interface ToastState extends ComponentState {
  isOpen: boolean
  isPaused: boolean
}

/**
 * Toast component
 *
 * @example
 * ```html
 * <div data-coral-toast role="alert">
 *   <span data-coral-toast-message>Toast message</span>
 *   <button data-coral-toast-close aria-label="Close">×</button>
 * </div>
 * ```
 */
export class Toast extends BaseComponent {
  protected declare config: ToastConfig
  protected declare state: ToastState

  private dismissTimeout!: ReturnType<typeof setTimeout> | null
  private remainingTime!: number
  private startTime!: number

  protected getDefaultConfig(): ToastConfig {
    return {
      duration: 5000,
      position: 'bottom-right',
      dismissible: true,
      pauseOnHover: true,
      closeSelector: '[data-coral-toast-close]',
      type: 'default',
    }
  }

  protected getInitialState(): ToastState {
    return {
      isOpen: true,
      isPaused: false,
    }
  }

  protected setupAria(): void {
    // Initialize fields (needed because setupAria is called from parent constructor)
    this.dismissTimeout = null
    this.remainingTime = 0
    this.startTime = 0

    // Set up ARIA
    this.element.setAttribute('role', 'alert')
    this.element.setAttribute('aria-live', 'polite')
    this.element.setAttribute('aria-atomic', 'true')

    // Set type attribute
    if (this.config.type) {
      this.element.setAttribute('data-type', this.config.type)
    }

    // Set position
    if (this.config.position) {
      this.element.setAttribute('data-position', this.config.position)
    }
  }

  protected bindEvents(): void {
    // Close button
    const closeButton = this.query(this.config.closeSelector!)
    if (closeButton && this.config.dismissible) {
      this.addEventListener(closeButton, 'click', () => this.dismiss())
    }

    // Click to dismiss
    if (this.config.dismissible) {
      this.addEventListener(this.element, 'click', (e: Event) => {
        // Don't dismiss if clicking on interactive elements
        const target = e.target as HTMLElement
        if (target.tagName !== 'BUTTON' && target.tagName !== 'A') {
          // Allow but don't require click-to-dismiss behavior
        }
      })
    }

    // Pause on hover
    if (this.config.pauseOnHover && this.config.duration && this.config.duration > 0) {
      this.addEventListener(this.element, 'mouseenter', () => this.pause())
      this.addEventListener(this.element, 'mouseleave', () => this.resume())
    }

    // Start auto-dismiss timer
    if (this.config.duration && this.config.duration > 0) {
      this.startTimer()
    }
  }

  private startTimer(): void {
    this.remainingTime = this.config.duration ?? 5000
    this.startTime = Date.now()

    this.dismissTimeout = setTimeout(() => {
      this.dismiss()
    }, this.remainingTime)
  }

  private pause(): void {
    if (!this.state.isPaused && this.dismissTimeout) {
      clearTimeout(this.dismissTimeout)
      this.remainingTime -= Date.now() - this.startTime
      this.setState({ isPaused: true })
    }
  }

  private resume(): void {
    if (this.state.isPaused && this.remainingTime > 0) {
      this.startTime = Date.now()
      this.dismissTimeout = setTimeout(() => {
        this.dismiss()
      }, this.remainingTime)
      this.setState({ isPaused: false })
    }
  }

  protected override render(): void {
    if (this.state.isOpen) {
      this.element.setAttribute('data-open', '')
      this.element.removeAttribute('hidden')
    } else {
      this.element.removeAttribute('data-open')
      this.element.setAttribute('hidden', '')
    }
  }

  /**
   * Dismiss the toast
   */
  dismiss(): void {
    if (!this.state.isOpen) return

    // Clear timeout
    if (this.dismissTimeout) {
      clearTimeout(this.dismissTimeout)
      this.dismissTimeout = null
    }

    this.setState({ isOpen: false })
    this.hooks.onClose?.(this.getContext())
    this.dispatch('dismiss')

    // Remove from DOM after animation
    setTimeout(() => {
      this.element.remove()
      this.destroy()
    }, 300)
  }

  /**
   * Update toast message
   */
  setMessage(message: string): void {
    const messageEl = this.query('[data-coral-toast-message]')
    if (messageEl) {
      messageEl.textContent = message
    }
  }

  override destroy(): void {
    if (this.dismissTimeout) {
      clearTimeout(this.dismissTimeout)
    }
    super.destroy()
  }
}

/**
 * Create a toast instance
 */
export const createToast = createComponentFactory(Toast)

/**
 * Toast container for managing multiple toasts
 */
export class ToastContainer {
  private container: HTMLElement
  private toasts: Map<string, Toast> = new Map()
  private defaultConfig: Partial<ToastConfig>

  constructor(config: Partial<ToastConfig> = {}) {
    this.defaultConfig = config

    // Create or find container
    const position = config.position ?? 'bottom-right'
    const containerId = `coral-toast-container-${position}`
    let container = document.getElementById(containerId)

    if (!container) {
      container = document.createElement('div')
      container.id = containerId
      container.setAttribute('data-coral-toast-container', '')
      container.setAttribute('data-position', position)
      container.setAttribute('aria-live', 'polite')
      container.setAttribute('aria-label', 'Notifications')
      document.body.appendChild(container)
    }

    this.container = container
  }

  /**
   * Show a toast notification
   */
  show(message: string, config: Partial<ToastConfig> = {}): Toast {
    const mergedConfig = { ...this.defaultConfig, ...config }
    const id = generateId('toast')

    // Create toast element
    const element = document.createElement('div')
    element.id = id
    element.setAttribute('data-coral-toast', '')
    element.innerHTML = `
      <span data-coral-toast-message>${message}</span>
      ${mergedConfig.dismissible !== false ? '<button data-coral-toast-close aria-label="Close">&times;</button>' : ''}
    `

    this.container.appendChild(element)

    // Create toast instance
    const toast = new Toast(element, mergedConfig)
    this.toasts.set(id, toast)

    // Clean up when dismissed
    element.addEventListener('coral:toast:dismiss', () => {
      this.toasts.delete(id)
    })

    return toast
  }

  /**
   * Show a success toast
   */
  success(message: string, config: Partial<ToastConfig> = {}): Toast {
    return this.show(message, { ...config, type: 'success' })
  }

  /**
   * Show an error toast
   */
  error(message: string, config: Partial<ToastConfig> = {}): Toast {
    return this.show(message, { ...config, type: 'error' })
  }

  /**
   * Show a warning toast
   */
  warning(message: string, config: Partial<ToastConfig> = {}): Toast {
    return this.show(message, { ...config, type: 'warning' })
  }

  /**
   * Show an info toast
   */
  info(message: string, config: Partial<ToastConfig> = {}): Toast {
    return this.show(message, { ...config, type: 'info' })
  }

  /**
   * Dismiss all toasts
   */
  dismissAll(): void {
    this.toasts.forEach((toast) => toast.dismiss())
  }

  /**
   * Destroy the container
   */
  destroy(): void {
    this.dismissAll()
    this.container.remove()
  }
}

/**
 * Create a toast container
 */
export function createToastContainer(config?: Partial<ToastConfig>): ToastContainer {
  return new ToastContainer(config)
}

export default Toast
