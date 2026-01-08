/**
 * Switch Component
 *
 * Accessible toggle switch component.
 * @module components/switch
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Switch configuration
 */
export interface SwitchConfig extends ComponentConfig {
  /**
   * Initial checked state
   * @default false
   */
  defaultChecked?: boolean

  /**
   * Whether the switch is disabled
   * @default false
   */
  disabled?: boolean

  /**
   * Name attribute for form submission
   */
  name?: string

  /**
   * Value when checked
   * @default 'on'
   */
  value?: string
}

/**
 * Switch state
 */
export interface SwitchState extends ComponentState {
  checked: boolean
  disabled: boolean
}

/**
 * Switch component
 *
 * @example
 * ```html
 * <button data-coral-switch role="switch" aria-checked="false">
 *   <span data-coral-switch-thumb></span>
 *   <span class="sr-only">Toggle feature</span>
 * </button>
 * ```
 */
export class Switch extends BaseComponent {
  protected declare config: SwitchConfig
  protected declare state: SwitchState

  private hiddenInput!: HTMLInputElement | null

  protected getDefaultConfig(): SwitchConfig {
    return {
      defaultChecked: false,
      disabled: false,
      value: 'on',
    }
  }

  protected getInitialState(): SwitchState {
    // Check for initial state from aria-checked or data attribute
    const ariaChecked = this.element.getAttribute('aria-checked')
    const dataChecked = this.element.hasAttribute('data-checked')

    return {
      checked: this.config.defaultChecked ?? ((ariaChecked === 'true') || dataChecked || false),
      disabled: this.config.disabled ?? (this.element.hasAttribute('disabled') || false),
    }
  }

  protected setupAria(): void {
    // Initialize field (needed because setupAria is called from parent constructor)
    this.hiddenInput = null

    // Ensure proper role
    if (!this.element.getAttribute('role')) {
      this.element.setAttribute('role', 'switch')
    }

    // Set initial state
    this.element.setAttribute('aria-checked', String(this.state.checked))

    // Make focusable if not already
    if (!this.element.getAttribute('tabindex')) {
      this.element.setAttribute('tabindex', '0')
    }

    // Set disabled state
    if (this.state.disabled) {
      this.element.setAttribute('aria-disabled', 'true')
    }

    // Create hidden input for form submission if name is provided
    if (this.config.name) {
      this.hiddenInput = document.createElement('input')
      this.hiddenInput.type = 'hidden'
      this.hiddenInput.name = this.config.name
      this.hiddenInput.value = this.state.checked ? (this.config.value ?? 'on') : ''
      this.element.appendChild(this.hiddenInput)
    }
  }

  protected bindEvents(): void {
    // Click to toggle
    this.addEventListener(this.element, 'click', () => {
      if (!this.state.disabled) {
        this.toggle()
      }
    })

    // Keyboard support
    this.addEventListener(this.element, 'keydown', (e: Event) => {
      const keyEvent = e as KeyboardEvent
      if ((keyEvent.key === 'Enter' || keyEvent.key === ' ') && !this.state.disabled) {
        e.preventDefault()
        this.toggle()
      }
    })
  }

  protected override render(): void {
    this.element.setAttribute('aria-checked', String(this.state.checked))

    if (this.state.checked) {
      this.element.setAttribute('data-checked', '')
    } else {
      this.element.removeAttribute('data-checked')
    }

    if (this.state.disabled) {
      this.element.setAttribute('aria-disabled', 'true')
      this.element.setAttribute('data-disabled', '')
    } else {
      this.element.removeAttribute('aria-disabled')
      this.element.removeAttribute('data-disabled')
    }

    // Update hidden input
    if (this.hiddenInput) {
      this.hiddenInput.value = this.state.checked ? (this.config.value ?? 'on') : ''
    }
  }

  /**
   * Toggle the switch
   */
  override toggle(): void {
    this.setChecked(!this.state.checked)
  }

  /**
   * Check if the switch is checked
   */
  isChecked(): boolean {
    return this.state.checked
  }

  /**
   * Set the checked state
   */
  setChecked(checked: boolean): void {
    if (this.state.checked === checked) return

    this.setState({ checked })
    this.dispatch('change', { checked })
  }

  /**
   * Set the disabled state
   */
  setDisabled(disabled: boolean): void {
    if (this.state.disabled === disabled) return

    this.setState({ disabled })
  }
}

/**
 * Create a switch instance
 */
export const createSwitch = createComponentFactory(Switch)

export default Switch
