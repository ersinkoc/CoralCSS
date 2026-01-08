/**
 * Tooltip Component
 *
 * Accessible tooltip component.
 * @module components/tooltip
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Tooltip configuration
 */
export interface TooltipConfig extends ComponentConfig {
  /**
   * Placement of the tooltip
   * @default 'top'
   */
  placement?: 'top' | 'bottom' | 'left' | 'right'

  /**
   * Delay before showing tooltip (ms)
   * @default 0
   */
  showDelay?: number

  /**
   * Delay before hiding tooltip (ms)
   * @default 0
   */
  hideDelay?: number

  /**
   * Trigger events
   * @default ['hover', 'focus']
   */
  trigger?: Array<'hover' | 'focus' | 'click'>

  /**
   * Tooltip content element selector
   * @default '[data-coral-tooltip-content]'
   */
  contentSelector?: string

  /**
   * Offset from trigger (pixels)
   * @default 8
   */
  offset?: number
}

/**
 * Tooltip state
 */
export interface TooltipState extends ComponentState {
  isOpen: boolean
}

/**
 * Tooltip component
 *
 * @example
 * ```html
 * <div data-coral-tooltip>
 *   <button data-coral-tooltip-trigger>Hover me</button>
 *   <div data-coral-tooltip-content role="tooltip">
 *     Tooltip content
 *   </div>
 * </div>
 *
 * <!-- Or with title attribute -->
 * <button data-coral-tooltip title="Tooltip content">
 *   Hover me
 * </button>
 * ```
 */
export class Tooltip extends BaseComponent {
  protected declare config: TooltipConfig
  protected declare state: TooltipState

  private content!: HTMLElement | null
  private trigger!: HTMLElement | null
  private showTimeout!: ReturnType<typeof setTimeout> | null
  private hideTimeout!: ReturnType<typeof setTimeout> | null
  private titleContent!: string | null

  protected getDefaultConfig(): TooltipConfig {
    return {
      placement: 'top',
      showDelay: 0,
      hideDelay: 0,
      trigger: ['hover', 'focus'],
      contentSelector: '[data-coral-tooltip-content]',
      offset: 8,
    }
  }

  protected getInitialState(): TooltipState {
    return {
      isOpen: false,
    }
  }

  protected setupAria(): void {
    // Initialize fields (needed because setupAria is called from parent constructor)
    this.showTimeout = null
    this.hideTimeout = null
    this.titleContent = null

    this.content = this.query(this.config.contentSelector!)
    this.trigger = this.query('[data-coral-tooltip-trigger]') ?? this.element

    // Check for title attribute and create content element if needed
    const titleAttr = this.trigger.getAttribute('title')
    if (!this.content && titleAttr) {
      this.titleContent = titleAttr
      this.trigger.removeAttribute('title')

      this.content = document.createElement('div')
      this.content.setAttribute('data-coral-tooltip-content', '')
      this.content.textContent = titleAttr
      this.element.appendChild(this.content)
    }

    if (this.content) {
      // Generate ID
      if (!this.content.id) {
        this.content.id = `${this.element.id}-content`
      }

      // Set up ARIA
      this.content.setAttribute('role', 'tooltip')
      this.content.setAttribute('hidden', '')
      this.trigger.setAttribute('aria-describedby', this.content.id)
    }
  }

  protected bindEvents(): void {
    if (!this.trigger) return

    const triggers = this.config.trigger ?? ['hover', 'focus']

    if (triggers.includes('hover')) {
      this.addEventListener(this.trigger, 'mouseenter', () => this.show())
      this.addEventListener(this.trigger, 'mouseleave', () => this.hide())

      // Also handle content hover to prevent hiding
      if (this.content) {
        this.addEventListener(this.content, 'mouseenter', () => this.cancelHide())
        this.addEventListener(this.content, 'mouseleave', () => this.hide())
      }
    }

    if (triggers.includes('focus')) {
      this.addEventListener(this.trigger, 'focus', () => this.show())
      this.addEventListener(this.trigger, 'blur', () => this.hide())
    }

    if (triggers.includes('click')) {
      this.addEventListener(this.trigger, 'click', () => this.toggle())

      // Click outside to close
      this.addEventListener(document, 'click', (e: Event) => {
        if (this.state.isOpen && !this.element.contains(e.target as Node)) {
          this.hide()
        }
      })
    }

    // Escape to close
    this.addEventListener(document, 'keydown', (e: Event) => {
      const keyEvent = e as KeyboardEvent
      if (keyEvent.key === 'Escape' && this.state.isOpen) {
        this.hide()
      }
    })
  }

  private cancelShow(): void {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout)
      this.showTimeout = null
    }
  }

  private cancelHide(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout)
      this.hideTimeout = null
    }
  }

  /**
   * Show the tooltip
   */
  show(): void {
    this.cancelHide()

    if (this.state.isOpen) return

    if (this.config.showDelay && this.config.showDelay > 0) {
      this.showTimeout = setTimeout(() => {
        this.setState({ isOpen: true })
        this.hooks.onOpen?.(this.getContext())
        this.dispatch('show')
      }, this.config.showDelay)
    } else {
      this.setState({ isOpen: true })
      this.hooks.onOpen?.(this.getContext())
      this.dispatch('show')
    }
  }

  /**
   * Hide the tooltip
   */
  hide(): void {
    this.cancelShow()

    if (!this.state.isOpen) return

    if (this.config.hideDelay && this.config.hideDelay > 0) {
      this.hideTimeout = setTimeout(() => {
        this.setState({ isOpen: false })
        this.hooks.onClose?.(this.getContext())
        this.dispatch('hide')
      }, this.config.hideDelay)
    } else {
      this.setState({ isOpen: false })
      this.hooks.onClose?.(this.getContext())
      this.dispatch('hide')
    }
  }

  protected override render(): void {
    if (this.content) {
      if (this.state.isOpen) {
        this.content.removeAttribute('hidden')
        this.content.setAttribute('data-open', '')
        this.element.setAttribute('data-open', '')
        this.content.setAttribute('data-placement', this.config.placement!)
      } else {
        this.content.setAttribute('hidden', '')
        this.content.removeAttribute('data-open')
        this.element.removeAttribute('data-open')
      }
    }
  }

  /**
   * Update tooltip content
   */
  setContent(content: string): void {
    if (this.content) {
      this.content.textContent = content
    }
  }

  /**
   * Clean up
   */
  override destroy(): void {
    this.cancelShow()
    this.cancelHide()

    // Restore title attribute if we removed it
    if (this.titleContent && this.trigger) {
      this.trigger.setAttribute('title', this.titleContent)
    }

    super.destroy()
  }
}

/**
 * Create a tooltip instance
 */
export const createTooltip = createComponentFactory(Tooltip)

export default Tooltip
