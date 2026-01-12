/**
 * Countdown Component
 *
 * A versatile countdown timer component with various display formats
 * and controls for starting, pausing, and resetting.
 *
 * @module components/countdown
 */

import { BaseComponent, createComponentFactory } from './base'
import type { ComponentConfig, ComponentState } from './base'

/**
 * Countdown target types
 */
export type CountdownTarget = 'date' | 'duration' | 'now'

/**
 * Time units
 */
export interface TimeUnits {
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

/**
 * Countdown configuration
 */
export interface CountdownConfig extends ComponentConfig {
  /** Target date (ISO string) or duration in seconds */
  target?: string | number
  /** Target type */
  targetType?: CountdownTarget
  /** Display format */
  format?: 'full' | 'short' | 'minimal' | 'custom'
  /** Custom format template */
  formatTemplate?: string
  /** Whether to show milliseconds */
  showMilliseconds?: boolean
  /** Whether to auto-start the countdown */
  autoStart?: boolean
  /** Update interval in milliseconds */
  interval?: number
  /** Callback when countdown completes */
  onComplete?: () => void
  /** Callback on each tick */
  onTick?: (remaining: TimeUnits) => void
  /** Allow pausing */
  pauseable?: boolean
  /** Allow resetting */
  resettable?: boolean
  /** Prefix text */
  prefix?: string
  /** Suffix text */
  suffix?: string
  /** Separator between time units */
  separator?: string
}

/**
 * Countdown state
 */
export interface CountdownState extends ComponentState {
  /** Remaining time in milliseconds */
  remaining: number
  /** Total duration in milliseconds */
  total: number
  /** Whether countdown is running */
  isRunning: boolean
  /** Whether countdown is paused */
  isPaused: boolean
  /** Whether countdown has completed */
  isCompleted: boolean
  /** Current time units */
  timeUnits: TimeUnits
}

/**
 * Countdown Component
 *
 * A versatile countdown timer component.
 *
 * @example
 * ```html
 * <div data-coral-countdown data-target="2024-12-31T23:59:59" data-format="full">
 *   <span data-coral-countdown-prefix>Countdown: </span>
 *   <span data-coral-countdown-value></span>
 *   <span data-coral-countdown-suffix> remaining</span>
 *   <button type="button" data-coral-countdown-pause>Pause</button>
 *   <button type="button" data-coral-countdown-reset>Reset</button>
 * </div>
 * ```
 */
export class Countdown extends BaseComponent<CountdownConfig, CountdownState> {
  private intervalId: number | null = null
  private valueElement: HTMLElement | null = null
  private pauseButton: HTMLButtonElement | null = null
  private resetButton: HTMLButtonElement | null = null

  constructor(element: HTMLElement, config: CountdownConfig) {
    super(element, {
      format: 'full',
      showMilliseconds: false,
      autoStart: true,
      interval: 100,
      pauseable: true,
      resettable: true,
      separator: ':',
      ...config,
    })

    const totalDuration = this.calculateTotalDuration()

    this.state = {
      remaining: totalDuration,
      total: totalDuration,
      isRunning: false,
      isPaused: false,
      isCompleted: false,
      timeUnits: this.calculateTimeUnits(totalDuration),
    }

    this.init()
  }

  protected init(): void {
    this.cacheElements()
    this.bindEvents()
    this.render()

    if (this.config.autoStart) {
      this.start()
    }
  }

  private cacheElements(): void {
    this.valueElement = this.element.querySelector('[data-coral-countdown-value]')
    this.pauseButton = this.element.querySelector('[data-coral-countdown-pause]') as HTMLButtonElement
    this.resetButton = this.element.querySelector('[data-coral-countdown-reset]') as HTMLButtonElement
  }

  private bindEvents(): void {
    this.pauseButton?.addEventListener('click', () => this.togglePause())
    this.resetButton?.addEventListener('click', () => this.reset())
  }

  private calculateTotalDuration(): number {
    const { target, targetType } = this.config

    if (typeof target === 'number') {
      // Duration in seconds or milliseconds
      return target > 31536000 ? target : target * 1000
    }

    if (typeof target === 'string') {
      const targetDate = new Date(target)
      const now = new Date()

      if (isNaN(targetDate.getTime())) {
        console.error('Invalid target date:', target)
        return 0
      }

      return Math.max(0, targetDate.getTime() - now.getTime())
    }

    // Default to 60 seconds
    return 60000
  }

  private calculateTimeUnits(milliseconds: number): TimeUnits {
    const seconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    return {
      days,
      hours: hours % 24,
      minutes: minutes % 60,
      seconds: seconds % 60,
      milliseconds: milliseconds % 1000,
    }
  }

  private start(): void {
    if (this.state.isRunning || this.state.isCompleted) return

    this.setState({ isRunning: true, isPaused: false })
    this.emit('start')

    this.intervalId = window.setInterval(() => {
      this.tick()
    }, this.config.interval)
  }

  private tick(): void {
    if (this.state.remaining <= 0) {
      this.complete()
      return
    }

    const elapsed = this.config.interval || 100
    const newRemaining = Math.max(0, this.state.remaining - elapsed)
    const timeUnits = this.calculateTimeUnits(newRemaining)

    this.setState({
      remaining: newRemaining,
      timeUnits,
    })

    this.render()

    if (this.config.onTick) {
      this.config.onTick(timeUnits)
    }

    this.emit('tick', timeUnits)
  }

  private complete(): void {
    this.stop()
    this.setState({
      isCompleted: true,
      remaining: 0,
      timeUnits: this.calculateTimeUnits(0),
    })
    this.render()

    if (this.config.onComplete) {
      this.config.onComplete()
    }

    this.emit('complete')
  }

  private stop(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
    this.setState({ isRunning: false })
  }

  /**
   * Pause the countdown
   */
  pause(): void {
    if (!this.state.isRunning || this.state.isPaused) return

    this.stop()
    this.setState({ isPaused: true })
    this.emit('pause')
    this.updatePauseButton()
  }

  /**
   * Resume the countdown
   */
  resume(): void {
    if (!this.state.isPaused) return

    this.start()
    this.updatePauseButton()
  }

  /**
   * Toggle pause/resume
   */
  togglePause(): void {
    if (this.state.isPaused) {
      this.resume()
    } else {
      this.pause()
    }
  }

  /**
   * Reset the countdown
   */
  reset(): void {
    this.stop()
    const totalDuration = this.calculateTotalDuration()

    this.setState({
      remaining: totalDuration,
      total: totalDuration,
      isRunning: false,
      isPaused: false,
      isCompleted: false,
      timeUnits: this.calculateTimeUnits(totalDuration),
    })

    this.render()
    this.emit('reset')

    if (this.config.autoStart) {
      this.start()
    }

    this.updatePauseButton()
  }

  private updatePauseButton(): void {
    if (this.pauseButton) {
      this.pauseButton.textContent = this.state.isPaused ? 'Resume' : 'Pause'
    }
  }

  private render(): void {
    if (!this.valueElement) return

    const formattedTime = this.formatTime()
    this.valueElement.textContent = formattedTime

    // Add completed class
    if (this.state.isCompleted) {
      this.element.classList.add('completed')
    } else {
      this.element.classList.remove('completed')
    }

    // Add paused class
    if (this.state.isPaused) {
      this.element.classList.add('paused')
    } else {
      this.element.classList.remove('paused')
    }
  }

  private formatTime(): string {
    const { format, formatTemplate, showMilliseconds, separator, prefix, suffix } = this.config
    const { days, hours, minutes, seconds, milliseconds } = this.state.timeUnits

    if (format === 'custom' && formatTemplate) {
      return this.formatCustomTemplate(formatTemplate)
    }

    const parts: string[] = []

    switch (format) {
      case 'minimal':
        // Format: HH:MM:SS
        parts.push(
          this.padZero(hours + days * 24),
          this.padZero(minutes),
          this.padZero(seconds)
        )
        if (showMilliseconds) {
          parts.push(this.padZero(Math.floor(milliseconds / 10)))
        }
        return parts.join(separator || ':')

      case 'short':
        // Format: Dd HHh MMm SSs
        if (days > 0) parts.push(`${days}d`)
        if (hours > 0 || days > 0) parts.push(`${hours}h`)
        if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes}m`)
        parts.push(`${seconds}s`)
        if (showMilliseconds) parts.push(`${Math.floor(milliseconds / 10)}ms`)
        return parts.join(' ')

      case 'full':
      default:
        // Format: DD:HH:MM:SS
        parts.push(
          this.padZero(days),
          this.padZero(hours),
          this.padZero(minutes),
          this.padZero(seconds)
        )
        if (showMilliseconds) {
          parts.push(this.padZero(Math.floor(milliseconds / 10)))
        }
        const timeString = parts.join(separator || ':')
        return `${prefix || ''}${timeString}${suffix || ''}`
    }
  }

  private formatCustomTemplate(template: string): string {
    const { days, hours, minutes, seconds, milliseconds } = this.state.timeUnits

    return template
      .replace(/\{days?\}/gi, days.toString())
      .replace(/\{hours?\}/gi, hours.toString())
      .replace(/\{minutes?\}/gi, minutes.toString())
      .replace(/\{seconds?\}/gi, seconds.toString())
      .replace(/\{milliseconds?\}/gi, milliseconds.toString())
      .replace(/\{dd\}/gi, this.padZero(days))
      .replace(/\{hh\}/gi, this.padZero(hours))
      .replace(/\{mm\}/gi, this.padZero(minutes))
      .replace(/\{ss\}/gi, this.padZero(seconds))
      .replace(/\{ms\}/gi, this.padZero(Math.floor(milliseconds / 10)))
  }

  private padZero(num: number): string {
    return num.toString().padStart(2, '0')
  }

  /**
   * Get the remaining time in milliseconds
   */
  getRemaining(): number {
    return this.state.remaining
  }

  /**
   * Get the remaining time as TimeUnits
   */
  getTimeUnits(): TimeUnits {
    return { ...this.state.timeUnits }
  }

  /**
   * Get the progress percentage (0-100)
   */
  getProgress(): number {
    if (this.state.total === 0) return 0
    return Math.max(0, Math.min(100, ((this.state.total - this.state.remaining) / this.state.total) * 100))
  }

  /**
   * Check if countdown is running
   */
  isRunning(): boolean {
    return this.state.isRunning
  }

  /**
   * Check if countdown is paused
   */
  isPaused(): boolean {
    return this.state.isPaused
  }

  /**
   * Check if countdown is completed
   */
  isCompleted(): boolean {
    return this.state.isCompleted
  }

  /**
   * Destroy the component
   */
  destroy(): void {
    this.stop()
    this.pauseButton?.replaceWith(this.pauseButton.cloneNode(true))
    this.resetButton?.replaceWith(this.resetButton.cloneNode(true))
    super.destroy()
  }
}

/**
 * Factory function to create a Countdown instance
 */
export function createCountdown(element: HTMLElement, config?: CountdownConfig): Countdown {
  return new Countdown(element, config!)
}

/**
 * Factory to create Countdown components with consistent configuration
 */
export const createCountdownFactory = createComponentFactory<CountdownConfig, Countdown>(
  (element, config) => new Countdown(element, config!)
)

export default Countdown
