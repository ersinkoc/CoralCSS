/**
 * RangeSlider Component
 *
 * Dual-handle range slider for value ranges.
 * @module components/range-slider
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface RangeSliderConfig extends ComponentConfig {
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step value */
  step?: number
  /** Default min value */
  defaultMinValue?: number
  /** Default max value */
  defaultMaxValue?: number
  /** Minimum range (distance between handles) */
  minRange?: number
  /** Show tooltip */
  showTooltip?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Orientation */
  orientation?: 'horizontal' | 'vertical'
}

export interface RangeSliderState extends ComponentState {
  minValue: number
  maxValue: number
  activeHandle: 'min' | 'max' | null
  disabled: boolean
}

/**
 * RangeSlider component for range selection
 */
export class RangeSlider extends BaseComponent {
  private track: HTMLElement | null = null
  private minHandle: HTMLElement | null = null
  private maxHandle: HTMLElement | null = null
  private filledTrack: HTMLElement | null = null
  private minTooltip: HTMLElement | null = null
  private maxTooltip: HTMLElement | null = null

  protected getDefaultConfig(): RangeSliderConfig {
    return {
      min: 0,
      max: 100,
      step: 1,
      defaultMinValue: 25,
      defaultMaxValue: 75,
      minRange: 0,
      showTooltip: true,
      disabled: false,
      orientation: 'horizontal',
    }
  }

  protected getInitialState(): RangeSliderState {
    const config = this.config as RangeSliderConfig
    return {
      minValue: config.defaultMinValue ?? 25,
      maxValue: config.defaultMaxValue ?? 75,
      activeHandle: null,
      disabled: config.disabled ?? false,
    }
  }

  protected override validateConfig(): void {
    super.validateConfig()
    const config = this.config as RangeSliderConfig

    // Ensure min < max
    if (config.min !== undefined && config.max !== undefined && config.min >= config.max) {
      this.warnConfig(`min (${config.min}) must be less than max (${config.max}). Swapping values.`)
      const temp = config.min
      config.min = config.max
      config.max = temp
    }

    // Ensure step is positive
    if (config.step !== undefined && config.step <= 0) {
      this.warnConfig(`step must be positive, got ${config.step}. Using default 1.`)
      config.step = 1
    }

    // Ensure minRange is non-negative
    if (config.minRange !== undefined && config.minRange < 0) {
      this.warnConfig(`minRange must be non-negative, got ${config.minRange}. Using 0.`)
      config.minRange = 0
    }
  }

  protected setupAria(): void {
    const config = this.config as RangeSliderConfig
    this.element.setAttribute('role', 'group')
    this.element.setAttribute('aria-label', 'Range slider')
    this.element.dataset.orientation = config.orientation
  }

  protected bindEvents(): void {
    this.track = this.query('[data-coral-range-slider-track]') || this.element
    this.minHandle = this.query('[data-coral-range-slider-min]')
    this.maxHandle = this.query('[data-coral-range-slider-max]')
    this.filledTrack = this.query('[data-coral-range-slider-filled]')
    this.minTooltip = this.query('[data-coral-range-slider-min-tooltip]')
    this.maxTooltip = this.query('[data-coral-range-slider-max-tooltip]')

    // Create handles if not exist
    if (!this.minHandle || !this.maxHandle) {
      this.createHandles()
    }

    this.setupHandle(this.minHandle!, 'min')
    this.setupHandle(this.maxHandle!, 'max')

    // Track click
    if (this.track) {
      const handleTrackClick = (e: Event) => {
        if ((this.state as RangeSliderState).disabled) {return}
        if ((e.target as HTMLElement).hasAttribute('data-coral-range-slider-min') ||
            (e.target as HTMLElement).hasAttribute('data-coral-range-slider-max')) {
          return
        }

        const value = this.getValueFromEvent(e as MouseEvent | TouchEvent)
        const state = this.state as RangeSliderState
        const distToMin = Math.abs(value - state.minValue)
        const distToMax = Math.abs(value - state.maxValue)

        if (distToMin <= distToMax) {
          this.setMinValue(value)
        } else {
          this.setMaxValue(value)
        }
      }
      this.addEventListener(this.track, 'click', handleTrackClick)
    }

    // Keyboard on handles
    [this.minHandle, this.maxHandle].forEach((handle, index) => {
      if (!handle) {return}
      const type = index === 0 ? 'min' : 'max'

      handle.setAttribute('role', 'slider')
      handle.setAttribute('tabindex', '0')
      handle.setAttribute('aria-orientation', (this.config as RangeSliderConfig).orientation!)
      this.updateHandleAria(handle, type)

      const handleKeydown = (e: Event) => {
        if ((this.state as RangeSliderState).disabled) {return}
        const ke = e as KeyboardEvent
        const config = this.config as RangeSliderConfig
        const state = this.state as RangeSliderState
        const step = config.step!
        const currentValue = type === 'min' ? state.minValue : state.maxValue

        let newValue = currentValue

        if (ke.key === 'ArrowRight' || ke.key === 'ArrowUp') {
          e.preventDefault()
          newValue = currentValue + step
        } else if (ke.key === 'ArrowLeft' || ke.key === 'ArrowDown') {
          e.preventDefault()
          newValue = currentValue - step
        } else if (ke.key === 'Home') {
          e.preventDefault()
          newValue = config.min!
        } else if (ke.key === 'End') {
          e.preventDefault()
          newValue = config.max!
        }

        if (type === 'min') {
          this.setMinValue(newValue)
        } else {
          this.setMaxValue(newValue)
        }
      }
      this.addEventListener(handle, 'keydown', handleKeydown)
    })

    this.render()
  }

  private createHandles(): void {
    if (!this.track) {return}

    // Create filled track
    this.filledTrack = document.createElement('div')
    this.filledTrack.className = 'range-slider-filled'
    this.filledTrack.setAttribute('data-coral-range-slider-filled', '')
    this.track.appendChild(this.filledTrack)

    // Create min handle
    this.minHandle = document.createElement('div')
    this.minHandle.className = 'range-slider-handle range-slider-handle--min'
    this.minHandle.setAttribute('data-coral-range-slider-min', '')
    this.track.appendChild(this.minHandle)

    // Create max handle
    this.maxHandle = document.createElement('div')
    this.maxHandle.className = 'range-slider-handle range-slider-handle--max'
    this.maxHandle.setAttribute('data-coral-range-slider-max', '')
    this.track.appendChild(this.maxHandle)

    // Create tooltips
    if ((this.config as RangeSliderConfig).showTooltip) {
      this.minTooltip = document.createElement('div')
      this.minTooltip.className = 'range-slider-tooltip'
      this.minHandle.appendChild(this.minTooltip)

      this.maxTooltip = document.createElement('div')
      this.maxTooltip.className = 'range-slider-tooltip'
      this.maxHandle.appendChild(this.maxTooltip)
    }
  }

  private setupHandle(handle: HTMLElement, type: 'min' | 'max'): void {
    let isDragging = false

    const handleStart = (e: Event) => {
      if ((this.state as RangeSliderState).disabled) {return}
      e.preventDefault()
      isDragging = true
      this.setState({ activeHandle: type })
      handle.focus()
    }

    const handleMove = (e: Event) => {
      if (!isDragging) {return}
      const value = this.getValueFromEvent(e as MouseEvent | TouchEvent)

      if (type === 'min') {
        this.setMinValue(value)
      } else {
        this.setMaxValue(value)
      }
    }

    const handleEnd = () => {
      if (isDragging) {
        isDragging = false
        this.setState({ activeHandle: null })
        this.dispatch('change-end', {
          min: (this.state as RangeSliderState).minValue,
          max: (this.state as RangeSliderState).maxValue,
        })
      }
    }

    this.addEventListener(handle, 'mousedown', handleStart)
    this.addEventListener(handle, 'touchstart', handleStart)
    // Track document listeners for proper cleanup on destroy
    this.addEventListener(document, 'mousemove', handleMove)
    this.addEventListener(document, 'touchmove', handleMove)
    this.addEventListener(document, 'mouseup', handleEnd)
    this.addEventListener(document, 'touchend', handleEnd)
  }

  private getValueFromEvent(e: MouseEvent | TouchEvent): number {
    if (!this.track) {return 0}

    const config = this.config as RangeSliderConfig
    const rect = this.track.getBoundingClientRect()
    const touch = 'touches' in e && e.touches.length > 0 ? e.touches[0] : null
    const clientX = touch ? touch.clientX : (e as MouseEvent).clientX
    const clientY = touch ? touch.clientY : (e as MouseEvent).clientY

    // Check for RTL direction
    const isRTL = getComputedStyle(this.element).direction === 'rtl'

    let percent: number
    if (config.orientation === 'vertical') {
      percent = 1 - (clientY - rect.top) / rect.height
    } else {
      percent = (clientX - rect.left) / rect.width
      // Invert for RTL languages
      if (isRTL) {
        percent = 1 - percent
      }
    }

    percent = Math.max(0, Math.min(1, percent))
    const value = config.min! + percent * (config.max! - config.min!)

    return Math.round(value / config.step!) * config.step!
  }

  private updateHandleAria(handle: HTMLElement, type: 'min' | 'max'): void {
    const config = this.config as RangeSliderConfig
    const state = this.state as RangeSliderState
    const value = type === 'min' ? state.minValue : state.maxValue

    handle.setAttribute('aria-valuemin', String(config.min))
    handle.setAttribute('aria-valuemax', String(config.max))
    handle.setAttribute('aria-valuenow', String(value))
    handle.setAttribute('aria-label', `${type === 'min' ? 'Minimum' : 'Maximum'} value`)
  }

  protected override render(): void {
    const config = this.config as RangeSliderConfig
    const state = this.state as RangeSliderState

    const range = config.max! - config.min!
    const minPercent = ((state.minValue - config.min!) / range) * 100
    const maxPercent = ((state.maxValue - config.min!) / range) * 100

    // Position handles
    if (this.minHandle) {
      if (config.orientation === 'vertical') {
        this.minHandle.style.bottom = `${minPercent}%`
      } else {
        this.minHandle.style.left = `${minPercent}%`
      }
      this.updateHandleAria(this.minHandle, 'min')
    }

    if (this.maxHandle) {
      if (config.orientation === 'vertical') {
        this.maxHandle.style.bottom = `${maxPercent}%`
      } else {
        this.maxHandle.style.left = `${maxPercent}%`
      }
      this.updateHandleAria(this.maxHandle, 'max')
    }

    // Update filled track
    if (this.filledTrack) {
      if (config.orientation === 'vertical') {
        this.filledTrack.style.bottom = `${minPercent}%`
        this.filledTrack.style.height = `${maxPercent - minPercent}%`
      } else {
        this.filledTrack.style.left = `${minPercent}%`
        this.filledTrack.style.width = `${maxPercent - minPercent}%`
      }
    }

    // Update tooltips
    if (this.minTooltip) {
      this.minTooltip.textContent = String(state.minValue)
    }
    if (this.maxTooltip) {
      this.maxTooltip.textContent = String(state.maxValue)
    }

    this.element.dataset.disabled = String(state.disabled)
    this.element.dataset.active = String(state.activeHandle !== null)
  }

  setMinValue(value: number): void {
    const config = this.config as RangeSliderConfig
    const state = this.state as RangeSliderState

    const clampedValue = Math.max(config.min!, Math.min(state.maxValue - (config.minRange ?? 0), value))

    if (clampedValue !== state.minValue) {
      this.setState({ minValue: clampedValue })
      this.dispatch('change', { min: clampedValue, max: state.maxValue })
    }
  }

  setMaxValue(value: number): void {
    const config = this.config as RangeSliderConfig
    const state = this.state as RangeSliderState

    const clampedValue = Math.min(config.max!, Math.max(state.minValue + (config.minRange ?? 0), value))

    if (clampedValue !== state.maxValue) {
      this.setState({ maxValue: clampedValue })
      this.dispatch('change', { min: state.minValue, max: clampedValue })
    }
  }

  getValues(): { min: number; max: number } {
    const state = this.state as RangeSliderState
    return { min: state.minValue, max: state.maxValue }
  }

  setValues(min: number, max: number): void {
    this.setState({ minValue: min, maxValue: max })
    this.dispatch('change', { min, max })
  }

  setDisabled(disabled: boolean): void {
    this.setState({ disabled })
  }
}

export const createRangeSlider = createComponentFactory(RangeSlider)
export default RangeSlider
