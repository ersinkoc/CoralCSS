/**
 * DateRangePicker Component
 *
 * An accessible date range picker component for selecting date ranges.
 * Built on top of the Calendar component with range selection support.
 *
 * @module components/date-range-picker
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Date range value
 */
export interface DateRange {
  start: Date | null
  end: Date | null
}

/**
 * Preset range option
 */
export interface PresetRange {
  label: string
  getValue: () => DateRange
}

/**
 * DateRangePicker configuration
 */
export interface DateRangePickerConfig extends ComponentConfig {
  /**
   * Default date range
   */
  defaultValue?: DateRange

  /**
   * Minimum selectable date
   */
  minDate?: Date

  /**
   * Maximum selectable date
   */
  maxDate?: Date

  /**
   * Disabled dates
   */
  disabledDates?: Date[]

  /**
   * First day of week (0 = Sunday, 1 = Monday, etc.)
   * @default 0
   */
  firstDayOfWeek?: number

  /**
   * Number of months to display
   * @default 2
   */
  numberOfMonths?: number

  /**
   * Show preset ranges (Today, Yesterday, Last 7 days, etc.)
   * @default true
   */
  showPresets?: boolean

  /**
   * Custom preset ranges
   */
  presets?: PresetRange[]

  /**
   * Date format for display
   * @default 'MMM d, yyyy'
   */
  dateFormat?: string

  /**
   * Locale for formatting
   * @default 'en-US'
   */
  locale?: string

  /**
   * Placeholder text
   * @default 'Select date range'
   */
  placeholder?: string

  /**
   * Allow same day selection
   * @default true
   */
  allowSameDay?: boolean

  /**
   * Close on selection complete
   * @default true
   */
  closeOnSelect?: boolean

  /**
   * Show time picker
   * @default false
   */
  showTimePicker?: boolean

  /**
   * Trigger element selector
   * @default '[data-coral-date-range-trigger]'
   */
  triggerSelector?: string

  /**
   * Calendar content selector
   * @default '[data-coral-date-range-content]'
   */
  contentSelector?: string

  /**
   * Apply button text
   * @default 'Apply'
   */
  applyText?: string

  /**
   * Cancel button text
   * @default 'Cancel'
   */
  cancelText?: string

  /**
   * Clear button text
   * @default 'Clear'
   */
  clearText?: string
}

/**
 * DateRangePicker state
 */
export interface DateRangePickerState extends ComponentState {
  isOpen: boolean
  range: DateRange
  tempRange: DateRange
  hoverDate: Date | null
  viewMonth: Date
  selecting: 'start' | 'end'
}

// Default preset ranges
const defaultPresets: PresetRange[] = [
  {
    label: 'Today',
    getValue: () => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return { start: today, end: today }
    },
  },
  {
    label: 'Yesterday',
    getValue: () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      yesterday.setHours(0, 0, 0, 0)
      return { start: yesterday, end: yesterday }
    },
  },
  {
    label: 'Last 7 days',
    getValue: () => {
      const end = new Date()
      end.setHours(0, 0, 0, 0)
      const start = new Date()
      start.setDate(start.getDate() - 6)
      start.setHours(0, 0, 0, 0)
      return { start, end }
    },
  },
  {
    label: 'Last 30 days',
    getValue: () => {
      const end = new Date()
      end.setHours(0, 0, 0, 0)
      const start = new Date()
      start.setDate(start.getDate() - 29)
      start.setHours(0, 0, 0, 0)
      return { start, end }
    },
  },
  {
    label: 'This month',
    getValue: () => {
      const now = new Date()
      const start = new Date(now.getFullYear(), now.getMonth(), 1)
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      return { start, end }
    },
  },
  {
    label: 'Last month',
    getValue: () => {
      const now = new Date()
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      const end = new Date(now.getFullYear(), now.getMonth(), 0)
      return { start, end }
    },
  },
  {
    label: 'This year',
    getValue: () => {
      const now = new Date()
      const start = new Date(now.getFullYear(), 0, 1)
      const end = new Date(now.getFullYear(), 11, 31)
      return { start, end }
    },
  },
]

/**
 * DateRangePicker component
 *
 * @example
 * ```html
 * <div data-coral-date-range-picker>
 *   <button data-coral-date-range-trigger>
 *     <span data-coral-date-range-value>Select date range</span>
 *   </button>
 *   <div data-coral-date-range-content>
 *     <!-- Calendar rendered dynamically -->
 *   </div>
 * </div>
 * ```
 *
 * @example
 * ```typescript
 * const picker = createDateRangePicker(element, {
 *   numberOfMonths: 2,
 *   showPresets: true,
 *   closeOnSelect: true,
 * })
 *
 * picker.on('change', ({ range }) => {
 *   console.log('Selected range:', range)
 * })
 * ```
 */
export class DateRangePicker extends BaseComponent {
  protected declare config: DateRangePickerConfig
  protected declare state: DateRangePickerState

  private triggerEl: HTMLElement | null = null
  private contentEl: HTMLElement | null = null

  protected override getDefaultConfig(): DateRangePickerConfig {
    return {
      defaultValue: { start: null, end: null },
      firstDayOfWeek: 0,
      numberOfMonths: 2,
      showPresets: true,
      presets: defaultPresets,
      dateFormat: 'MMM d, yyyy',
      locale: 'en-US',
      placeholder: 'Select date range',
      allowSameDay: true,
      closeOnSelect: true,
      showTimePicker: false,
      triggerSelector: '[data-coral-date-range-trigger]',
      contentSelector: '[data-coral-date-range-content]',
      applyText: 'Apply',
      cancelText: 'Cancel',
      clearText: 'Clear',
    }
  }

  protected override getInitialState(): DateRangePickerState {
    return {
      isOpen: false,
      range: this.config.defaultValue || { start: null, end: null },
      tempRange: { start: null, end: null },
      hoverDate: null,
      viewMonth: new Date(),
      selecting: 'start',
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'group')
    this.element.setAttribute('aria-label', 'Date range picker')
  }

  protected bindEvents(): void {
    this.triggerEl = this.element.querySelector(this.config.triggerSelector!)
    this.contentEl = this.element.querySelector(this.config.contentSelector!)

    if (!this.triggerEl || !this.contentEl) {
      console.warn('DateRangePicker: Trigger or content element not found')
      return
    }

    this.setupTrigger()
    this.setupClickOutside()
    this.setupKeyboard()
    this.updateTriggerText()
  }

  private setupTrigger(): void {
    if (!this.triggerEl) {return}

    this.triggerEl.addEventListener('click', () => {
      this.toggle()
    })
  }

  private setupClickOutside(): void {
    document.addEventListener('click', (e) => {
      if (!this.element.contains(e.target as Node) && this.state.isOpen) {
        this.close()
      }
    })
  }

  private setupKeyboard(): void {
    this.element.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.state.isOpen) {
        this.close()
        this.triggerEl?.focus()
      }
    })
  }


  private renderCalendar(): void {
    if (!this.contentEl) {return}

    const { numberOfMonths, showPresets, presets } = this.config
    const { viewMonth, tempRange, hoverDate } = this.state

    let html = '<div data-coral-date-range-wrapper>'

    // Presets sidebar
    if (showPresets && presets && presets.length > 0) {
      html += '<div data-coral-date-range-presets>'
      for (const preset of presets) {
        html += `<button type="button" data-coral-date-range-preset="${preset.label}">${preset.label}</button>`
      }
      html += '</div>'
    }

    // Calendars
    html += '<div data-coral-date-range-calendars>'

    // Navigation
    html += '<div data-coral-date-range-nav>'
    html += '<button type="button" data-coral-date-range-prev aria-label="Previous month">&lt;</button>'
    html += '<div data-coral-date-range-month-labels>'

    for (let i = 0; i < (numberOfMonths || 2); i++) {
      const monthDate = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + i, 1)
      const monthLabel = monthDate.toLocaleDateString(this.config.locale, { month: 'long', year: 'numeric' })
      html += `<span>${monthLabel}</span>`
    }

    html += '</div>'
    html += '<button type="button" data-coral-date-range-next aria-label="Next month">&gt;</button>'
    html += '</div>'

    // Calendar grids
    html += '<div data-coral-date-range-grids>'
    for (let i = 0; i < (numberOfMonths || 2); i++) {
      const monthDate = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + i, 1)
      html += this.renderMonth(monthDate, tempRange, hoverDate)
    }
    html += '</div>'

    html += '</div>' // calendars

    // Footer with buttons
    html += '<div data-coral-date-range-footer>'
    html += `<button type="button" data-coral-date-range-clear>${this.config.clearText}</button>`
    html += '<div data-coral-date-range-actions>'
    html += `<button type="button" data-coral-date-range-cancel>${this.config.cancelText}</button>`
    html += `<button type="button" data-coral-date-range-apply>${this.config.applyText}</button>`
    html += '</div>'
    html += '</div>'

    html += '</div>' // wrapper

    this.contentEl.innerHTML = html
    this.setupCalendarEvents()
  }

  private renderMonth(monthDate: Date, range: DateRange, hoverDate: Date | null): string {
    const year = monthDate.getFullYear()
    const month = monthDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startWeekday = (firstDay.getDay() - (this.config.firstDayOfWeek || 0) + 7) % 7

    let html = '<div data-coral-date-range-month>'

    // Day headers
    html += '<div data-coral-date-range-weekdays>'
    const weekdays = this.getWeekdayNames()
    for (const day of weekdays) {
      html += `<div>${day}</div>`
    }
    html += '</div>'

    // Day grid
    html += '<div data-coral-date-range-days>'

    // Empty cells for days before month starts
    for (let i = 0; i < startWeekday; i++) {
      html += '<div data-coral-date-range-day-empty></div>'
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      date.setHours(0, 0, 0, 0)

      const isDisabled = this.isDateDisabled(date)
      const isToday = this.isSameDay(date, new Date())
      const isStart = range.start && this.isSameDay(date, range.start)
      const isEnd = range.end && this.isSameDay(date, range.end)
      const isInRange = this.isInRange(date, range, hoverDate)

      let classes = ''
      if (isDisabled) {classes += ' data-disabled'}
      if (isToday) {classes += ' data-today'}
      if (isStart) {classes += ' data-range-start'}
      if (isEnd) {classes += ' data-range-end'}
      if (isInRange) {classes += ' data-in-range'}
      if (isStart && isEnd) {classes += ' data-range-single'}

      html += `<button type="button" data-coral-date-range-day data-date="${date.toISOString()}"${classes ? classes.split(' ').filter(Boolean).map(c => ` ${c}`).join('') : ''} ${isDisabled ? 'disabled' : ''}>${day}</button>`
    }

    html += '</div>'
    html += '</div>'

    return html
  }

  private getWeekdayNames(): string[] {
    const weekdays: string[] = []
    const firstDayOfWeek = this.config.firstDayOfWeek || 0

    for (let i = 0; i < 7; i++) {
      const dayIndex = (firstDayOfWeek + i) % 7
      const date = new Date(2025, 0, dayIndex) // Jan 2025 starts on Monday
      while (date.getDay() !== dayIndex) {
        date.setDate(date.getDate() + 1)
      }
      weekdays.push(date.toLocaleDateString(this.config.locale, { weekday: 'short' }))
    }

    return weekdays
  }

  private setupCalendarEvents(): void {
    if (!this.contentEl) {return}

    // Day click
    this.contentEl.querySelectorAll('[data-coral-date-range-day]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const dateStr = (e.target as HTMLElement).getAttribute('data-date')
        if (dateStr) {
          const date = new Date(dateStr)
          this.handleDateClick(date)
        }
      })

      btn.addEventListener('mouseenter', (e) => {
        const dateStr = (e.target as HTMLElement).getAttribute('data-date')
        if (dateStr) {
          const date = new Date(dateStr)
          this.setState({ hoverDate: date })
          this.renderCalendar()
        }
      })
    })

    // Mouse leave calendar
    this.contentEl.addEventListener('mouseleave', () => {
      if (this.state.hoverDate) {
        this.setState({ hoverDate: null })
        this.renderCalendar()
      }
    })

    // Navigation
    this.contentEl.querySelector('[data-coral-date-range-prev]')?.addEventListener('click', () => {
      this.navigateMonth(-1)
    })

    this.contentEl.querySelector('[data-coral-date-range-next]')?.addEventListener('click', () => {
      this.navigateMonth(1)
    })

    // Presets
    this.contentEl.querySelectorAll('[data-coral-date-range-preset]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const label = (e.target as HTMLElement).getAttribute('data-coral-date-range-preset')
        const preset = this.config.presets?.find((p) => p.label === label)
        if (preset) {
          this.selectPreset(preset)
        }
      })
    })

    // Footer buttons
    this.contentEl.querySelector('[data-coral-date-range-clear]')?.addEventListener('click', () => {
      this.clear()
    })

    this.contentEl.querySelector('[data-coral-date-range-cancel]')?.addEventListener('click', () => {
      this.close()
    })

    this.contentEl.querySelector('[data-coral-date-range-apply]')?.addEventListener('click', () => {
      this.apply()
    })
  }

  private handleDateClick(date: Date): void {
    const { tempRange, selecting } = this.state

    if (selecting === 'start') {
      // Starting new selection
      this.setState({
        tempRange: { start: date, end: null },
        selecting: 'end',
      })
    } else {
      // Completing selection
      if (tempRange.start && date < tempRange.start) {
        // Clicked date is before start, swap
        this.setState({
          tempRange: { start: date, end: tempRange.start },
          selecting: 'start',
        })
      } else if (!this.config.allowSameDay && tempRange.start && this.isSameDay(date, tempRange.start)) {
        // Same day not allowed, reset
        this.setState({
          tempRange: { start: date, end: null },
          selecting: 'end',
        })
      } else {
        this.setState({
          tempRange: { start: tempRange.start, end: date },
          selecting: 'start',
        })

        if (this.config.closeOnSelect) {
          this.apply()
          return
        }
      }
    }

    this.renderCalendar()
    this.dispatch('select', { tempRange: this.state.tempRange })
  }

  private navigateMonth(direction: number): void {
    const { viewMonth } = this.state
    const newMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + direction, 1)
    this.setState({ viewMonth: newMonth })
    this.renderCalendar()
  }

  private selectPreset(preset: PresetRange): void {
    const range = preset.getValue()
    this.setState({
      tempRange: range,
      selecting: 'start',
    })
    this.renderCalendar()
    this.dispatch('preset', { preset: preset.label, range })
  }

  private isDateDisabled(date: Date): boolean {
    const { minDate, maxDate, disabledDates } = this.config

    if (minDate && date < minDate) {return true}
    if (maxDate && date > maxDate) {return true}
    if (disabledDates?.some((d) => this.isSameDay(d, date))) {return true}

    return false
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }

  private isInRange(date: Date, range: DateRange, hoverDate: Date | null): boolean {
    let start = range.start
    let end = range.end || hoverDate

    if (!start) {return false}
    if (!end) {return false}

    // Normalize order
    if (end < start) {
      [start, end] = [end, start]
    }

    return date > start && date < end
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString(this.config.locale, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  private formatRange(range: DateRange): string {
    if (!range.start && !range.end) {
      return this.config.placeholder || 'Select date range'
    }

    if (range.start && !range.end) {
      return this.formatDate(range.start) + ' - ...'
    }

    if (range.start && range.end) {
      if (this.isSameDay(range.start, range.end)) {
        return this.formatDate(range.start)
      }
      return `${this.formatDate(range.start)} - ${this.formatDate(range.end)}`
    }

    return this.config.placeholder || 'Select date range'
  }

  private updateTriggerText(): void {
    const valueEl = this.triggerEl?.querySelector('[data-coral-date-range-value]')
    if (valueEl) {
      valueEl.textContent = this.formatRange(this.state.range)
    }
  }

  // Public API

  /**
   * Open the date range picker
   */
  override open(): void {
    this.setState({
      isOpen: true,
      tempRange: { ...this.state.range },
      selecting: 'start',
      viewMonth: this.state.range.start || new Date(),
    })

    if (this.contentEl) {
      this.contentEl.setAttribute('data-visible', 'true')
    }

    this.renderCalendar()
    super.open()
  }

  /**
   * Close the date range picker
   */
  override close(): void {
    this.setState({
      isOpen: false,
      tempRange: { start: null, end: null },
      hoverDate: null,
    })

    if (this.contentEl) {
      this.contentEl.removeAttribute('data-visible')
    }

    super.close()
  }

  /**
   * Apply the selected range
   */
  apply(): void {
    const { tempRange } = this.state

    if (tempRange.start) {
      this.setState({
        range: { ...tempRange },
      })
      this.updateTriggerText()
      this.dispatch('change', { range: this.state.range })
    }

    this.close()
  }

  /**
   * Clear the selection
   */
  clear(): void {
    this.setState({
      range: { start: null, end: null },
      tempRange: { start: null, end: null },
      selecting: 'start',
    })
    this.updateTriggerText()
    this.renderCalendar()
    this.dispatch('clear', {})
  }

  /**
   * Get the current range
   */
  getValue(): DateRange {
    return { ...this.state.range }
  }

  /**
   * Set the range value
   */
  setValue(range: DateRange): void {
    this.setState({
      range: { ...range },
      tempRange: { ...range },
    })
    this.updateTriggerText()
    if (this.state.isOpen) {
      this.renderCalendar()
    }
    this.dispatch('change', { range })
  }

  /**
   * Set minimum date
   */
  setMinDate(date: Date | null): void {
    this.config.minDate = date || undefined
    if (this.state.isOpen) {
      this.renderCalendar()
    }
  }

  /**
   * Set maximum date
   */
  setMaxDate(date: Date | null): void {
    this.config.maxDate = date || undefined
    if (this.state.isOpen) {
      this.renderCalendar()
    }
  }

  /**
   * Check if picker is open
   */
  override isOpen(): boolean {
    return this.state.isOpen
  }
}

/**
 * Create DateRangePicker component factory
 */
export const createDateRangePicker = createComponentFactory(DateRangePicker)

export default DateRangePicker
