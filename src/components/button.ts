/**
 * Button Component
 *
 * Accessible, customizable button component with multiple variants.
 * @module components/button
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Button variant types
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive'
  | 'link'
  | 'soft'
  | 'success'
  | 'warning'
  | 'info'

/**
 * Button size types
 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon'

/**
 * Button configuration
 */
export interface ButtonConfig extends ComponentConfig {
  /**
   * Button variant style
   * @default 'primary'
   */
  variant?: ButtonVariant

  /**
   * Button size
   * @default 'md'
   */
  size?: ButtonSize

  /**
   * Whether the button is in loading state
   * @default false
   */
  loading?: boolean

  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean

  /**
   * Whether the button takes full width
   * @default false
   */
  fullWidth?: boolean

  /**
   * Button type attribute
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset'

  /**
   * Enable ripple effect on click
   * @default true
   */
  ripple?: boolean
}

/**
 * Button state
 */
export interface ButtonState extends ComponentState {
  loading: boolean
  disabled: boolean
  pressed: boolean
}

/**
 * Button component
 *
 * @example
 * ```html
 * <button data-coral-button data-variant="primary" data-size="md">
 *   Click me
 * </button>
 * ```
 *
 * @example
 * ```html
 * <!-- Loading button -->
 * <button data-coral-button data-variant="primary" data-loading>
 *   <span data-coral-button-spinner></span>
 *   <span>Saving...</span>
 * </button>
 * ```
 *
 * @example
 * ```html
 * <!-- Icon button -->
 * <button data-coral-button data-variant="outline" data-size="icon">
 *   <svg>...</svg>
 * </button>
 * ```
 */
export class Button extends BaseComponent {
  protected declare config: ButtonConfig
  protected declare state: ButtonState

  protected getDefaultConfig(): ButtonConfig {
    return {
      variant: 'primary',
      size: 'md',
      loading: false,
      disabled: false,
      fullWidth: false,
      type: 'button',
      ripple: true,
    }
  }

  protected getInitialState(): ButtonState {
    // Parse state from data attributes
    const dataLoading = this.element.hasAttribute('data-loading')
    const dataDisabled = this.element.hasAttribute('disabled') ||
                         this.element.hasAttribute('data-disabled')

    return {
      loading: this.config.loading ?? dataLoading ?? false,
      disabled: this.config.disabled ?? dataDisabled ?? false,
      pressed: false,
    }
  }

  protected setupAria(): void {
    // Set button type if it's a button element
    if (this.element.tagName === 'BUTTON' && !this.element.getAttribute('type')) {
      this.element.setAttribute('type', this.config.type ?? 'button')
    }

    // Set initial states
    if (this.state.disabled) {
      this.element.setAttribute('aria-disabled', 'true')
      if (this.element.tagName === 'BUTTON') {
        ;(this.element as HTMLButtonElement).disabled = true
      }
    }

    if (this.state.loading) {
      this.element.setAttribute('aria-busy', 'true')
    }

    // Make non-button elements focusable
    if (this.element.tagName !== 'BUTTON' && !this.element.getAttribute('tabindex')) {
      this.element.setAttribute('tabindex', '0')
      this.element.setAttribute('role', 'button')
    }
  }

  protected bindEvents(): void {
    // Click handler
    this.addEventListener(this.element, 'click', (e: Event) => {
      if (this.state.disabled || this.state.loading) {
        e.preventDefault()
        e.stopPropagation()
        return
      }

      // Ripple effect
      if (this.config.ripple) {
        this.createRipple(e as MouseEvent)
      }

      this.dispatch('click', { event: e })
    })

    // Keyboard support for non-button elements
    this.addEventListener(this.element, 'keydown', (e: Event) => {
      const keyEvent = e as KeyboardEvent
      if ((keyEvent.key === 'Enter' || keyEvent.key === ' ') &&
          this.element.tagName !== 'BUTTON') {
        if (this.state.disabled || this.state.loading) {
          e.preventDefault()
          return
        }
        e.preventDefault()
        this.element.click()
      }
    })

    // Press state
    this.addEventListener(this.element, 'mousedown', () => {
      if (!this.state.disabled && !this.state.loading) {
        this.setState({ pressed: true })
      }
    })

    this.addEventListener(document, 'mouseup', () => {
      if (this.state.pressed) {
        this.setState({ pressed: false })
      }
    })

    // Focus handling
    this.addEventListener(this.element, 'focus', () => {
      this.element.setAttribute('data-focused', '')
    })

    this.addEventListener(this.element, 'blur', () => {
      this.element.removeAttribute('data-focused')
    })
  }

  protected override render(): void {
    // Update data attributes for styling
    if (this.state.loading) {
      this.element.setAttribute('data-loading', '')
      this.element.setAttribute('aria-busy', 'true')
    } else {
      this.element.removeAttribute('data-loading')
      this.element.removeAttribute('aria-busy')
    }

    if (this.state.disabled) {
      this.element.setAttribute('data-disabled', '')
      this.element.setAttribute('aria-disabled', 'true')
      if (this.element.tagName === 'BUTTON') {
        ;(this.element as HTMLButtonElement).disabled = true
      }
    } else {
      this.element.removeAttribute('data-disabled')
      this.element.removeAttribute('aria-disabled')
      if (this.element.tagName === 'BUTTON') {
        ;(this.element as HTMLButtonElement).disabled = false
      }
    }

    if (this.state.pressed) {
      this.element.setAttribute('data-pressed', '')
    } else {
      this.element.removeAttribute('data-pressed')
    }
  }

  /**
   * Create ripple effect on click
   */
  private createRipple(event: MouseEvent): void {
    const rect = this.element.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    const ripple = document.createElement('span')
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: currentColor;
      opacity: 0.2;
      border-radius: 50%;
      transform: scale(0);
      pointer-events: none;
      animation: coral-ripple 600ms ease-out forwards;
    `
    ripple.setAttribute('data-coral-button-ripple', '')

    // Ensure position relative for ripple
    const computedStyle = window.getComputedStyle(this.element)
    if (computedStyle.position === 'static') {
      this.element.style.position = 'relative'
    }
    this.element.style.overflow = 'hidden'

    this.element.appendChild(ripple)

    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove()
    }, 600)
  }

  /**
   * Set loading state
   */
  setLoading(loading: boolean): void {
    if (this.state.loading === loading) return
    this.setState({ loading })
    this.dispatch('loading', { loading })
  }

  /**
   * Check if button is loading
   */
  isLoading(): boolean {
    return this.state.loading
  }

  /**
   * Set disabled state
   */
  setDisabled(disabled: boolean): void {
    if (this.state.disabled === disabled) return
    this.setState({ disabled })
    this.dispatch('disabled', { disabled })
  }

  /**
   * Check if button is disabled
   */
  isDisabled(): boolean {
    return this.state.disabled
  }

  /**
   * Set button variant
   */
  setVariant(variant: ButtonVariant): void {
    this.element.setAttribute('data-variant', variant)
    this.config.variant = variant
    this.dispatch('variant', { variant })
  }

  /**
   * Set button size
   */
  setSize(size: ButtonSize): void {
    this.element.setAttribute('data-size', size)
    this.config.size = size
    this.dispatch('size', { size })
  }

  /**
   * Programmatically click the button
   */
  click(): void {
    if (!this.state.disabled && !this.state.loading) {
      this.element.click()
    }
  }

  /**
   * Focus the button
   */
  focus(): void {
    this.element.focus()
  }

  /**
   * Blur the button
   */
  blur(): void {
    this.element.blur()
  }
}

/**
 * Create a button instance
 */
export const createButton = createComponentFactory(Button)

/**
 * Button Group Component
 * Groups multiple buttons together
 */
export interface ButtonGroupConfig extends ComponentConfig {
  /**
   * Orientation of the button group
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical'

  /**
   * Size for all buttons in the group
   */
  size?: ButtonSize

  /**
   * Variant for all buttons in the group
   */
  variant?: ButtonVariant
}

export interface ButtonGroupState extends ComponentState {
  activeIndex: number | null
}

export class ButtonGroup extends BaseComponent {
  protected declare config: ButtonGroupConfig
  protected declare state: ButtonGroupState

  protected getDefaultConfig(): ButtonGroupConfig {
    return {
      orientation: 'horizontal',
    }
  }

  protected getInitialState(): ButtonGroupState {
    return {
      activeIndex: null,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'group')

    const orientation = this.config.orientation ?? 'horizontal'
    this.element.setAttribute('aria-orientation', orientation)
  }

  protected bindEvents(): void {
    // Handle button clicks within group
    this.addEventListener(this.element, 'click', (e: Event) => {
      const target = e.target as HTMLElement
      const button = target.closest('[data-coral-button]')

      if (button) {
        const buttons = this.queryAll<HTMLElement>('[data-coral-button]')
        const index = Array.from(buttons).indexOf(button as HTMLElement)

        if (index !== -1) {
          this.setState({ activeIndex: index })
          this.dispatch('select', { index, button })
        }
      }
    })

    // Keyboard navigation
    this.addEventListener(this.element, 'keydown', (e: Event) => {
      const keyEvent = e as KeyboardEvent
      const buttons = Array.from(this.queryAll<HTMLElement>('[data-coral-button]'))
      const currentIndex = buttons.findIndex(btn => btn === document.activeElement)

      if (currentIndex === -1) return

      let nextIndex = currentIndex
      const isHorizontal = this.config.orientation !== 'vertical'

      if ((isHorizontal && keyEvent.key === 'ArrowRight') ||
          (!isHorizontal && keyEvent.key === 'ArrowDown')) {
        nextIndex = (currentIndex + 1) % buttons.length
      } else if ((isHorizontal && keyEvent.key === 'ArrowLeft') ||
                 (!isHorizontal && keyEvent.key === 'ArrowUp')) {
        nextIndex = (currentIndex - 1 + buttons.length) % buttons.length
      } else if (keyEvent.key === 'Home') {
        nextIndex = 0
      } else if (keyEvent.key === 'End') {
        nextIndex = buttons.length - 1
      } else {
        return
      }

      e.preventDefault()
      buttons[nextIndex]?.focus()
    })
  }

  protected override render(): void {
    const buttons = this.queryAll<HTMLElement>('[data-coral-button]')

    buttons.forEach((button, index) => {
      // Apply group-wide size if specified
      if (this.config.size && !button.hasAttribute('data-size')) {
        button.setAttribute('data-size', this.config.size)
      }

      // Apply group-wide variant if specified
      if (this.config.variant && !button.hasAttribute('data-variant')) {
        button.setAttribute('data-variant', this.config.variant)
      }

      // Mark active button
      if (index === this.state.activeIndex) {
        button.setAttribute('data-active', '')
      } else {
        button.removeAttribute('data-active')
      }
    })
  }

  /**
   * Get active button index
   */
  getActiveIndex(): number | null {
    return this.state.activeIndex
  }

  /**
   * Set active button by index
   */
  setActiveIndex(index: number | null): void {
    this.setState({ activeIndex: index })
  }
}

/**
 * Create a button group instance
 */
export const createButtonGroup = createComponentFactory(ButtonGroup)

export default Button
