/**
 * Time Picker Component
 *
 * A component for selecting time values with hours, minutes, and seconds.
 * Supports 12-hour and 24-hour formats.
 *
 * @module components/time-picker
 */

import { BaseComponent, createComponentFactory } from './base'
import type { ComponentConfig, ComponentState } from './base'

/**
 * Time format options
 */
export type TimeFormat = '12' | '24'

/**
 * Time period for 12-hour format
 */
export type TimePeriod = 'AM' | 'PM'

/**
 * Time value structure
 */
export interface TimeValue {
  hours: number
  minutes: number
  seconds?: number
  period?: TimePeriod
}

/**
 * Time picker configuration
 */
export interface TimePickerConfig extends ComponentConfig {
  /** Current time value */
  value?: TimeValue
  /** Whether to show seconds */
  showSeconds?: boolean
  /** Time format (12 or 24 hour) */
  format?: TimeFormat
  /** Minimum time */
  min?: TimeValue
  /** Maximum time */
  max?: TimeValue
  /** Time step in minutes */
  step?: number
  /** Whether time input is required */
  required?: boolean
  /** Placeholder text */
  placeholder?: string
  /** Input name for forms */
  name?: string
  /** Disable the time picker */
  disabled?: boolean
  /** Read-only mode */
  readonly?: boolean
}

/**
 * Time picker state
 */
export interface TimePickerState extends ComponentState {
  /** Current time value */
  value: TimeValue | null
  /** Whether the dropdown is open */
  isOpen: boolean
  /** Currently active section (hours, minutes, seconds, period) */
  activeSection: 'hours' | 'minutes' | 'seconds' | 'period' | null
  /** Validation error message */
  error: string | null
}

/**
 * Time Picker Component
 *
 * A component for selecting time values with a clean, accessible interface.
 *
 * @example
 * ```html
 * <div data-coral-time-picker data-format="24" data-show-seconds="true">
 *   <input type="text" data-coral-time-picker-input />
 *   <div data-coral-time-picker-dropdown>
 *     <!-- Time selection interface -->
 *   </div>
 * </div>
 * ```
 */
export class TimePicker extends BaseComponent<TimePickerConfig, TimePickerState> {
  private inputElement: HTMLInputElement | null = null
  private dropdownElement: HTMLElement | null = null
  private hoursSelect: HTMLSelectElement | null = null
  private minutesSelect: HTMLSelectElement | null = null
  private secondsSelect: HTMLSelectElement | null = null
  private periodSelect: HTMLSelectElement | null = null

  constructor(element: HTMLElement, config: TimePickerConfig = {}) {
    super(element, {
      showSeconds: false,
      format: '24',
      step: 1,
      required: false,
      disabled: false,
      readonly: false,
      ...config,
    })

    this.state = {
      value: config.value || null,
      isOpen: false,
      activeSection: null,
      error: null,
    }

    this.init()
  }

  protected init(): void {
    this.cacheElements()
    this.bindEvents()
    this.render()
  }

  private cacheElements(): void {
    this.inputElement = this.element.querySelector('[data-coral-time-picker-input]') as HTMLInputElement
    this.dropdownElement = this.element.querySelector('[data-coral-time-picker-dropdown]')

    if (this.dropdownElement) {
      this.hoursSelect = this.dropdownElement.querySelector('[data-coral-time-picker-hours]') as HTMLSelectElement
      this.minutesSelect = this.dropdownElement.querySelector('[data-coral-time-picker-minutes]') as HTMLSelectElement
      this.secondsSelect = this.dropdownElement.querySelector('[data-coral-time-picker-seconds]') as HTMLSelectElement
      this.periodSelect = this.dropdownElement.querySelector('[data-coral-time-picker-period]') as HTMLSelectElement
    }
  }

  private bindEvents(): void {
    // Input focus
    this.inputElement?.addEventListener('focus', this.handleInputFocus.bind(this))
    this.inputElement?.addEventListener('blur', this.handleInputBlur.bind(this))

    // Input changes
    this.inputElement?.addEventListener('input', this.handleInputChange.bind(this))

    // Dropdown
    this.hoursSelect?.addEventListener('change', this.handleHoursChange.bind(this))
    this.minutesSelect?.addEventListener('change', this.handleMinutesChange.bind(this))
    this.secondsSelect?.addEventListener('change', this.handleSecondsChange.bind(this))
    this.periodSelect?.addEventListener('change', this.handlePeriodChange.bind(this))

    // Click outside to close
    document.addEventListener('click', this.handleDocumentClick.bind(this))

    // Keyboard navigation
    this.element.addEventListener('keydown', this.handleKeydown.bind(this))
  }

  private handleInputFocus(): void {
    if (!this.config.disabled && !this.config.readonly) {
      this.openDropdown()
    }
  }

  private handleInputBlur(): void {
    // Delay to allow dropdown clicks to register
    setTimeout(() => {
      if (!this.dropdownElement?.contains(document.activeElement)) {
        this.closeDropdown()
      }
    }, 150)
  }

  private handleInputChange(event: Event): void {
    const input = event.target as HTMLInputElement
    this.parseInputValue(input.value)
  }

  private handleHoursChange(event: Event): void {
    const select = event.target as HTMLSelectElement
    const hours = parseInt(select.value, 10)
    this.updateTime({ hours })
  }

  private handleMinutesChange(event: Event): void {
    const select = event.target as HTMLSelectElement
    const minutes = parseInt(select.value, 10)
    this.updateTime({ minutes })
  }

  private handleSecondsChange(event: Event): void {
    const select = event.target as HTMLSelectElement
    const seconds = parseInt(select.value, 10)
    this.updateTime({ seconds })
  }

  private handlePeriodChange(event: Event): void {
    const select = event.target as HTMLSelectElement
    const period = select.value as TimePeriod
    this.updateTime({ period })
  }

  private handleDocumentClick(event: MouseEvent): void {
    if (!this.element.contains(event.target as Node)) {
      this.closeDropdown()
    }
  }

  private handleKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        this.closeDropdown()
        break
      case 'Enter':
        event.preventDefault()
        this.toggleDropdown()
        break
      case 'ArrowUp':
      case 'ArrowDown':
        if (this.state.isOpen) {
          event.preventDefault()
          // Navigate within the dropdown
        }
        break
    }
  }

  private parseInputValue(value: string): void {
    // Parse time string (HH:MM or HH:MM:SS)
    const timeRegex = /^(\d{1,2}):(\d{2})(?::(\d{2}))?(?:\s*(AM|PM))?$/i
    const match = value.match(timeRegex)

    if (match) {
      const [, hours, minutes, seconds, period] = match
      const timeValue: TimeValue = {
        hours: parseInt(hours, 10),
        minutes: parseInt(minutes, 10),
      }

      if (seconds) {
        timeValue.seconds = parseInt(seconds, 10)
      }

      if (period && this.config.format === '12') {
        timeValue.period = period.toUpperCase() as TimePeriod
      }

      this.setValue(timeValue)
    }
  }

  private updateTime(updates: Partial<TimeValue>): void {
    if (this.state.value) {
      this.setValue({ ...this.state.value, ...updates })
    }
  }

  private openDropdown(): void {
    this.setState({ isOpen: true })
    this.dropdownElement?.classList.add('open')
    this.emit('open')
  }

  private closeDropdown(): void {
    this.setState({ isOpen: false })
    this.dropdownElement?.classList.remove('open')
    this.emit('close')
  }

  private toggleDropdown(): void {
    if (this.state.isOpen) {
      this.closeDropdown()
    } else {
      this.openDropdown()
    }
  }

  private validate(): boolean {
    if (this.config.required && !this.state.value) {
      this.setState({ error: 'Time is required' })
      return false
    }

    if (this.state.value) {
      const { hours, minutes, seconds = 0 } = this.state.value

      if (hours < 0 || hours > 23) {
        this.setState({ error: 'Invalid hours' })
        return false
      }

      if (minutes < 0 || minutes > 59) {
        this.setState({ error: 'Invalid minutes' })
        return false
      }

      if (seconds < 0 || seconds > 59) {
        this.setState({ error: 'Invalid seconds' })
        return false
      }

      // Check min/max constraints
      if (this.config.min && this.isBefore(this.state.value, this.config.min)) {
        this.setState({ error: 'Time is before minimum' })
        return false
      }

      if (this.config.max && this.isAfter(this.state.value, this.config.max)) {
        this.setState({ error: 'Time is after maximum' })
        return false
      }
    }

    this.setState({ error: null })
    return true
  }

  private isBefore(time1: TimeValue, time2: TimeValue): boolean {
    const totalSeconds1 = time1.hours * 3600 + time1.minutes * 60 + (time1.seconds || 0)
    const totalSeconds2 = time2.hours * 3600 + time2.minutes * 60 + (time2.seconds || 0)
    return totalSeconds1 < totalSeconds2
  }

  private isAfter(time1: TimeValue, time2: TimeValue): boolean {
    const totalSeconds1 = time1.hours * 3600 + time1.minutes * 60 + (time1.seconds || 0)
    const totalSeconds2 = time2.hours * 3600 + time2.minutes * 60 + (time2.seconds || 0)
    return totalSeconds1 > totalSeconds2
  }

  private render(): void {
    this.renderSelects()
    this.updateInput()
  }

  private renderSelects(): void {
    if (!this.dropdownElement) return

    // Render hours select
    if (this.hoursSelect) {
      const maxHours = this.config.format === '12' ? 12 : 23
      this.hoursSelect.innerHTML = ''

      for (let i = 0; i <= maxHours; i++) {
        const hour = this.config.format === '12' ? (i === 0 ? 12 : i) : i
        const option = document.createElement('option')
        option.value = i.toString()
        option.textContent = hour.toString().padStart(2, '0')
        this.hoursSelect.appendChild(option)
      }
    }

    // Render minutes select
    if (this.minutesSelect) {
      this.minutesSelect.innerHTML = ''
      const step = this.config.step || 1

      for (let i = 0; i < 60; i += step) {
        const option = document.createElement('option')
        option.value = i.toString()
        option.textContent = i.toString().padStart(2, '0')
        this.minutesSelect.appendChild(option)
      }
    }

    // Render seconds select
    if (this.secondsSelect && this.config.showSeconds) {
      this.secondsSelect.innerHTML = ''

      for (let i = 0; i < 60; i++) {
        const option = document.createElement('option')
        option.value = i.toString()
        option.textContent = i.toString().padStart(2, '0')
        this.secondsSelect.appendChild(option)
      }
    }

    // Render period select (12-hour format)
    if (this.periodSelect && this.config.format === '12') {
      this.periodSelect.innerHTML = ''

      const amOption = document.createElement('option')
      amOption.value = 'AM'
      amOption.textContent = 'AM'
      this.periodSelect.appendChild(amOption)

      const pmOption = document.createElement('option')
      pmOption.value = 'PM'
      pmOption.textContent = 'PM'
      this.periodSelect.appendChild(pmOption)
    }
  }

  private updateInput(): void {
    if (this.inputElement && this.state.value) {
      const { hours, minutes, seconds = 0, period } = this.state.value
      let formatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

      if (this.config.showSeconds) {
        formatted += `:${seconds.toString().padStart(2, '0')}`
      }

      if (period && this.config.format === '12') {
        formatted += ` ${period}`
      }

      this.inputElement.value = formatted
    }
  }

  /**
   * Set the time value
   */
  setValue(value: TimeValue | null): void {
    this.setState({ value })
    this.updateInput()
    this.emit('change', value)
  }

  /**
   * Get the current time value
   */
  getValue(): TimeValue | null {
    return this.state.value
  }

  /**
   * Clear the time value
   */
  clear(): void {
    this.setValue(null)
    if (this.inputElement) {
      this.inputElement.value = ''
    }
  }

  /**
   * Disable the time picker
   */
  disable(): void {
    this.config.disabled = true
    this.element.classList.add('disabled')
    this.inputElement?.setAttribute('disabled', 'disabled')
  }

  /**
   * Enable the time picker
   */
  enable(): void {
    this.config.disabled = false
    this.element.classList.remove('disabled')
    this.inputElement?.removeAttribute('disabled')
  }

  /**
   * Destroy the component
   */
  destroy(): void {
    // Remove event listeners
    this.inputElement?.removeEventListener('focus', this.handleInputFocus.bind(this))
    this.inputElement?.removeEventListener('blur', this.handleInputBlur.bind(this))
    this.inputElement?.removeEventListener('input', this.handleInputChange.bind(this))
    document.removeEventListener('click', this.handleDocumentClick.bind(this))

    // Clean up
    this.inputElement = null
    this.dropdownElement = null
    this.hoursSelect = null
    this.minutesSelect = null
    this.secondsSelect = null
    this.periodSelect = null

    super.destroy()
  }
}

/**
 * Factory function to create a TimePicker instance
 */
export function createTimePicker(element: HTMLElement, config?: TimePickerConfig): TimePicker {
  return new TimePicker(element, config)
}

/**
 * Factory to create TimePicker components with consistent configuration
 */
export const createTimePickerFactory = createComponentFactory<TimePickerConfig, TimePicker>(
  (element, config) => new TimePicker(element, config)
)

export default TimePicker
