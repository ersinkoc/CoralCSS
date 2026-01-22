/**
 * OTP Input Component
 *
 * A one-time password/verification code input component
 * with auto-focus, paste handling, and accessibility support.
 *
 * @module components/otp-input
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * OTP Input configuration
 */
export interface OTPInputConfig extends ComponentConfig {
  length?: number
  type?: 'numeric' | 'alphanumeric' | 'text'
  mask?: boolean
  autoFocus?: boolean
  autoSubmit?: boolean
  separator?: string
  separatorIndices?: number[]
  disabled?: boolean
  error?: boolean
  /** Transform input to uppercase (default: false) */
  uppercase?: boolean
  onComplete?: (value: string) => void
  onChange?: (value: string) => void
}

/**
 * OTP Input state
 */
export interface OTPInputState extends ComponentState {
  values: string[]
  focused: number
  completed: boolean
  error: boolean
}

/**
 * OTP Input Component Class
 */
export class OTPInput extends BaseComponent {
  declare protected config: OTPInputConfig
  declare protected state: OTPInputState
  // Note: Don't use field initializers with = value - they run AFTER super() returns
  // and would overwrite values set during bindEvents().
  private inputs!: HTMLInputElement[]
  private hiddenInput!: HTMLInputElement | null
  private focusTimeout!: ReturnType<typeof setTimeout> | null

  protected getDefaultConfig(): OTPInputConfig {
    return {
      length: 6,
      type: 'numeric',
      mask: false,
      autoFocus: true,
      autoSubmit: false,
      separator: '',
      separatorIndices: [],
      disabled: false,
      error: false,
      uppercase: false,
    }
  }

  protected getInitialState(): OTPInputState {
    return {
      values: Array(this.config.length || 6).fill(''),
      focused: -1,
      completed: false,
      error: this.config.error || false,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'group')
    this.element.setAttribute('aria-label', 'Verification code input')
  }

  protected bindEvents(): void {
    // Initialize all private fields that don't use field initializers
    this.inputs = []
    this.hiddenInput = null
    this.focusTimeout = null

    this.buildDOM()
    this.setupInputEvents()

    if (this.config.autoFocus && this.inputs[0]) {
      this.focusTimeout = setTimeout(() => this.inputs[0]?.focus(), 0)
    }
  }

  private buildDOM(): void {
    this.element.classList.add('otp-input-container')
    const length = this.config.length || 6

    // Hidden input for form submission
    this.hiddenInput = document.createElement('input')
    this.hiddenInput.type = 'hidden'
    this.hiddenInput.name = 'otp'
    this.element.appendChild(this.hiddenInput)

    // Create input slots
    for (let i = 0; i < length; i++) {
      // Add separator if needed
      if (this.config.separatorIndices?.includes(i) && i > 0) {
        const separator = document.createElement('span')
        separator.className = 'otp-separator'
        separator.textContent = this.config.separator || '-'
        separator.setAttribute('aria-hidden', 'true')
        this.element.appendChild(separator)
      }

      const input = document.createElement('input')
      input.type = this.config.mask ? 'password' : 'text'
      input.inputMode = this.config.type === 'numeric' ? 'numeric' : 'text'
      if (this.config.type === 'numeric') {
        input.pattern = '[0-9]*'
      }
      input.maxLength = 1
      input.className = 'otp-input-slot'
      input.disabled = this.config.disabled || false
      input.autocomplete = 'one-time-code'
      input.setAttribute('aria-label', `Digit ${i + 1} of ${length}`)
      input.dataset.index = String(i)

      this.inputs.push(input)
      this.element.appendChild(input)
    }

    this.updateClasses()
  }

  private setupInputEvents(): void {
    this.inputs.forEach((input, index) => {
      // Use tracked addEventListener for proper cleanup on destroy
      this.addEventListener(input, 'input', (e) => this.handleInput(e, index))
      this.addEventListener(input, 'keydown', (e) => this.handleKeyDown(e as KeyboardEvent, index))
      this.addEventListener(input, 'focus', () => this.handleFocus(index))
      this.addEventListener(input, 'blur', () => this.handleBlur())
      this.addEventListener(input, 'paste', (e) => this.handlePaste(e as ClipboardEvent))
    })
  }

  /** Transform character based on uppercase config */
  private transformChar(char: string): string {
    return this.config.uppercase ? char.toUpperCase() : char
  }

  private handleInput(e: Event, index: number): void {
    const input = e.target as HTMLInputElement
    let value = input.value

    // Validate input based on type
    if (this.config.type === 'numeric') {
      value = value.replace(/[^0-9]/g, '')
    } else if (this.config.type === 'alphanumeric') {
      value = value.replace(/[^a-zA-Z0-9]/g, '')
    }

    // Take only the first character and optionally transform case
    value = this.transformChar(value.charAt(0))
    input.value = value

    // Update state
    const newValues = [...this.state.values]
    newValues[index] = value
    this.setState({ values: newValues })

    // Move to next input if value entered
    if (value && index < this.inputs.length - 1) {
      this.inputs[index + 1]?.focus()
    }

    // Update hidden input
    if (this.hiddenInput) {
      this.hiddenInput.value = newValues.join('')
    }

    // Check completion
    this.checkCompletion(newValues)

    // Trigger onChange
    this.config.onChange?.(newValues.join(''))
  }

  private handleKeyDown(e: KeyboardEvent, index: number): void {
    const input = this.inputs[index]
    if (!input) {return}

    switch (e.key) {
      case 'Backspace':
        if (!input.value && index > 0) {
          e.preventDefault()
          this.inputs[index - 1]?.focus()
          const newValues = [...this.state.values]
          newValues[index - 1] = ''
          this.setState({ values: newValues })
          const prevInput = this.inputs[index - 1]
          if (prevInput) {
            prevInput.value = ''
          }
        }
        break
      case 'ArrowLeft':
        e.preventDefault()
        if (index > 0) {
          this.inputs[index - 1]?.focus()
        }
        break
      case 'ArrowRight':
        e.preventDefault()
        if (index < this.inputs.length - 1) {
          this.inputs[index + 1]?.focus()
        }
        break
      case 'Delete':
        input.value = ''
        const newValues = [...this.state.values]
        newValues[index] = ''
        this.setState({ values: newValues })
        break
    }
  }

  private handlePaste(e: ClipboardEvent): void {
    e.preventDefault()
    const pastedData = e.clipboardData?.getData('text') || ''
    let cleanData = pastedData

    // Clean based on type
    if (this.config.type === 'numeric') {
      cleanData = pastedData.replace(/[^0-9]/g, '')
    } else if (this.config.type === 'alphanumeric') {
      cleanData = pastedData.replace(/[^a-zA-Z0-9]/g, '')
    }

    // Fill inputs
    const chars = cleanData.slice(0, this.config.length).split('')
    const newValues = [...this.state.values]

    chars.forEach((char, i) => {
      if (this.inputs[i]) {
        const transformed = this.transformChar(char)
        this.inputs[i].value = transformed
        newValues[i] = transformed
      }
    })

    this.setState({ values: newValues })

    // Update hidden input
    if (this.hiddenInput) {
      this.hiddenInput.value = newValues.join('')
    }

    // Focus last filled input or first empty
    if (chars.length < this.inputs.length) {
      this.inputs[chars.length]?.focus()
    } else {
      this.inputs[this.inputs.length - 1]?.focus()
    }

    // Check completion
    this.checkCompletion(newValues)

    // Trigger onChange
    this.config.onChange?.(newValues.join(''))
  }

  private handleFocus(index: number): void {
    this.setState({ focused: index })
    this.inputs[index]?.select()
    this.updateClasses()
  }

  private handleBlur(): void {
    this.setState({ focused: -1 })
    this.updateClasses()
  }

  private checkCompletion(values: string[]): void {
    const isComplete = values.every((v) => v !== '')
    if (isComplete !== this.state.completed) {
      this.setState({ completed: isComplete })

      if (isComplete) {
        this.config.onComplete?.(values.join(''))

        if (this.config.autoSubmit) {
          const form = this.element.closest('form')
          if (form) {
            form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
          }
        }
      }
    }
  }

  private updateClasses(): void {
    this.element.classList.toggle('otp-focused', this.state.focused >= 0)
    this.element.classList.toggle('otp-completed', this.state.completed)
    this.element.classList.toggle('otp-error', this.state.error)
    this.element.classList.toggle('otp-disabled', this.config.disabled || false)

    this.inputs.forEach((input, i) => {
      input.classList.toggle('focused', i === this.state.focused)
      input.classList.toggle('filled', !!this.state.values[i])
      input.classList.toggle('error', this.state.error)
    })
  }

  // Public API

  getValue(): string {
    return this.state.values.join('')
  }

  setValue(value: string): void {
    const chars = value.slice(0, this.config.length).split('')
    const newValues = Array(this.config.length).fill('')

    chars.forEach((char, i) => {
      const transformed = this.transformChar(char)
      newValues[i] = transformed
      if (this.inputs[i]) {
        this.inputs[i].value = transformed
      }
    })

    this.setState({ values: newValues })
    if (this.hiddenInput) {
      this.hiddenInput.value = newValues.join('')
    }
    this.checkCompletion(newValues)
    this.updateClasses()

    // Trigger onChange callback
    this.config.onChange?.(newValues.join(''))
  }

  clear(): void {
    const newValues = Array(this.config.length).fill('')
    this.setState({ values: newValues, completed: false })
    this.inputs.forEach((input) => (input.value = ''))
    if (this.hiddenInput) {
      this.hiddenInput.value = ''
    }
    this.inputs[0]?.focus()
    this.updateClasses()
  }

  setError(hasError: boolean): void {
    this.setState({ error: hasError })
    this.updateClasses()
  }

  setDisabled(disabled: boolean): void {
    this.config.disabled = disabled
    this.inputs.forEach((input) => (input.disabled = disabled))
    this.updateClasses()
  }

  isDisabled(): boolean {
    return this.config.disabled || false
  }

  isComplete(): boolean {
    return this.state.completed
  }

  focusAt(index: number): void {
    if (index >= 0 && index < this.inputs.length) {
      this.inputs[index]?.focus()
      this.setState({ focused: index })
    }
  }

  setValueAt(index: number, value: string): void {
    if (index >= 0 && index < this.inputs.length) {
      const newValues = [...this.state.values]
      newValues[index] = value
      this.setState({ values: newValues })
      if (this.inputs[index]) {
        this.inputs[index].value = value
      }
      // Auto-advance focus
      if (value && index < this.inputs.length - 1) {
        this.setState({ focused: index + 1 })
      }
      this.checkCompletion(newValues)
    }
  }

  isValidInput(char: string, type: 'numeric' | 'alphanumeric' | 'text'): boolean {
    if (type === 'numeric') {
      return /^[0-9]$/.test(char)
    } else if (type === 'alphanumeric') {
      return /^[a-zA-Z0-9]$/.test(char)
    }
    return true
  }

  focus(): void {
    const firstEmpty = this.state.values.findIndex((v) => !v)
    const index = firstEmpty >= 0 ? firstEmpty : 0
    this.inputs[index]?.focus()
  }

  getInputs(): HTMLInputElement[] {
    return [...this.inputs]
  }

  override getState(): OTPInputState {
    return { ...this.state }
  }

  override destroy(): void {
    if (this.focusTimeout) {
      clearTimeout(this.focusTimeout)
      this.focusTimeout = null
    }
    this.inputs = []
    this.hiddenInput = null
    super.destroy()
  }
}

/**
 * Create OTP Input instance
 */
export function createOTPInput(element: HTMLElement, config?: Partial<OTPInputConfig>): OTPInput {
  return new OTPInput(element, config)
}

export default OTPInput
