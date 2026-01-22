/**
 * Compare Slider Component
 *
 * An image comparison slider component for comparing two images
 * with a draggable divider. Supports horizontal/vertical orientation.
 *
 * @module components/compare-slider
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent } from './base'

/**
 * Compare Slider configuration
 */
export interface CompareSliderConfig extends ComponentConfig {
  beforeImage?: string
  afterImage?: string
  beforeLabel?: string
  afterLabel?: string
  orientation?: 'horizontal' | 'vertical'
  initialPosition?: number // percentage (0-100)
  handleSize?: number
  handleColor?: string
  showLabels?: boolean
  labelPosition?: 'top' | 'inside' | 'bottom'
  animate?: boolean
  animationDuration?: number
  keyboard?: boolean
  keyboardStep?: number
  onSlide?: (position: number) => void
  onSlideStart?: () => void
  onSlideEnd?: (position: number) => void
}

/**
 * Compare Slider state
 */
export interface CompareSliderState extends ComponentState {
  position: number
  isDragging: boolean
  beforeLoaded: boolean
  afterLoaded: boolean
}

/**
 * Compare Slider Component Class
 */
export class CompareSlider extends BaseComponent {
  declare protected config: CompareSliderConfig
  declare protected state: CompareSliderState
  // Note: Don't use field initializers with = value - they run AFTER super() returns
  // and would overwrite values set during bindEvents().
  private beforeContainer!: HTMLElement | null
  private afterContainer!: HTMLElement | null
  private handle!: HTMLElement | null
  private divider!: HTMLElement | null
  // Bound event handlers (stored for proper cleanup)
  private boundHandleDrag!: (e: MouseEvent | TouchEvent) => void
  private boundHandleDragEnd!: () => void

  protected getDefaultConfig(): CompareSliderConfig {
    return {
      beforeImage: '',
      afterImage: '',
      beforeLabel: 'Before',
      afterLabel: 'After',
      orientation: 'horizontal',
      initialPosition: 50,
      handleSize: 40,
      handleColor: '#ffffff',
      showLabels: true,
      labelPosition: 'inside',
      animate: true,
      animationDuration: 200,
      keyboard: true,
      keyboardStep: 5,
    }
  }

  protected getInitialState(): CompareSliderState {
    return {
      position: this.config.initialPosition ?? 50,
      isDragging: false,
      beforeLoaded: false,
      afterLoaded: false,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'slider')
    this.element.setAttribute('aria-label', 'Image comparison slider')
    this.element.setAttribute('aria-valuemin', '0')
    this.element.setAttribute('aria-valuemax', '100')
    this.element.setAttribute('aria-valuenow', String(this.state.position))
    this.element.setAttribute('tabindex', '0')
  }

  protected bindEvents(): void {
    // Initialize all private fields that don't use field initializers
    this.beforeContainer = null
    this.afterContainer = null
    this.handle = null
    this.divider = null
    // Store bound handlers for proper cleanup
    this.boundHandleDrag = this.handleDrag.bind(this)
    this.boundHandleDragEnd = this.handleDragEnd.bind(this)

    this.buildDOM()
    this.setupDragEvents()
    if (this.config.keyboard) {
      this.setupKeyboardEvents()
    }
    this.loadImages()
  }

  private buildDOM(): void {
    this.element.classList.add('compare-slider-container')
    this.element.classList.add(`compare-slider-${this.config.orientation}`)

    // Before container (clipped)
    this.beforeContainer = document.createElement('div')
    this.beforeContainer.className = 'compare-slider-before'
    this.beforeContainer.setAttribute('aria-hidden', 'true')

    const beforeImg = document.createElement('img')
    beforeImg.className = 'compare-slider-image'
    beforeImg.alt = this.config.beforeLabel || 'Before'
    if (this.config.beforeImage) {
      beforeImg.src = this.config.beforeImage
    }
    this.beforeContainer.appendChild(beforeImg)

    if (this.config.showLabels) {
      const beforeLabel = document.createElement('span')
      beforeLabel.className = `compare-slider-label compare-slider-label-${this.config.labelPosition}`
      beforeLabel.classList.add('compare-slider-label-before')
      beforeLabel.textContent = this.config.beforeLabel || 'Before'
      this.beforeContainer.appendChild(beforeLabel)
    }

    this.element.appendChild(this.beforeContainer)

    // After container (full width)
    this.afterContainer = document.createElement('div')
    this.afterContainer.className = 'compare-slider-after'
    this.afterContainer.setAttribute('aria-hidden', 'true')

    const afterImg = document.createElement('img')
    afterImg.className = 'compare-slider-image'
    afterImg.alt = this.config.afterLabel || 'After'
    if (this.config.afterImage) {
      afterImg.src = this.config.afterImage
    }
    this.afterContainer.appendChild(afterImg)

    if (this.config.showLabels) {
      const afterLabel = document.createElement('span')
      afterLabel.className = `compare-slider-label compare-slider-label-${this.config.labelPosition}`
      afterLabel.classList.add('compare-slider-label-after')
      afterLabel.textContent = this.config.afterLabel || 'After'
      this.afterContainer.appendChild(afterLabel)
    }

    this.element.appendChild(this.afterContainer)

    // Divider line
    this.divider = document.createElement('div')
    this.divider.className = 'compare-slider-divider'
    this.element.appendChild(this.divider)

    // Handle
    this.handle = document.createElement('div')
    this.handle.className = 'compare-slider-handle'
    this.handle.style.width = `${this.config.handleSize}px`
    this.handle.style.height = `${this.config.handleSize}px`
    this.handle.setAttribute('aria-hidden', 'true')

    const handleInner = document.createElement('div')
    handleInner.className = 'compare-slider-handle-inner'

    // Handle arrows
    const leftArrow = document.createElement('span')
    leftArrow.className = 'compare-slider-handle-arrow'
    leftArrow.innerHTML = this.config.orientation === 'horizontal' ? '◀' : '▲'

    const rightArrow = document.createElement('span')
    rightArrow.className = 'compare-slider-handle-arrow'
    rightArrow.innerHTML = this.config.orientation === 'horizontal' ? '▶' : '▼'

    handleInner.appendChild(leftArrow)
    handleInner.appendChild(rightArrow)
    this.handle.appendChild(handleInner)
    this.element.appendChild(this.handle)

    this.updatePosition(this.state.position)
  }

  private loadImages(): void {
    const beforeImg = this.beforeContainer?.querySelector('img')
    const afterImg = this.afterContainer?.querySelector('img')

    if (beforeImg) {
      beforeImg.onload = () => {
        this.setState({ beforeLoaded: true })
      }
    }

    if (afterImg) {
      afterImg.onload = () => {
        this.setState({ afterLoaded: true })
      }
    }
  }

  private setupDragEvents(): void {
    if (!this.handle) {return}

    // Mouse events
    this.handle.addEventListener('mousedown', this.handleDragStart.bind(this))
    document.addEventListener('mousemove', this.boundHandleDrag)
    document.addEventListener('mouseup', this.boundHandleDragEnd)

    // Touch events - use passive: false to allow preventDefault() in handlers
    this.handle.addEventListener('touchstart', this.handleDragStart.bind(this), { passive: false })
    document.addEventListener('touchmove', this.boundHandleDrag, { passive: false })
    document.addEventListener('touchend', this.boundHandleDragEnd)

    // Click to position
    this.element.addEventListener('click', (e) => {
      if (e.target !== this.handle && !this.handle?.contains(e.target as Node)) {
        this.handleClick(e)
      }
    })
  }

  private setupKeyboardEvents(): void {
    this.element.addEventListener('keydown', (e: KeyboardEvent) => {
      const step = this.config.keyboardStep || 5
      let newPosition = this.state.position

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          newPosition = Math.max(0, this.state.position - step)
          break
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault()
          newPosition = Math.min(100, this.state.position + step)
          break
        case 'Home':
          e.preventDefault()
          newPosition = 0
          break
        case 'End':
          e.preventDefault()
          newPosition = 100
          break
      }

      if (newPosition !== this.state.position) {
        this.setPosition(newPosition)
      }
    })
  }

  private handleDragStart(e: MouseEvent | TouchEvent): void {
    e.preventDefault()
    this.setState({ isDragging: true })
    this.element.classList.add('compare-slider-dragging')
    this.config.onSlideStart?.()
  }

  private handleDrag(e: MouseEvent | TouchEvent): void {
    if (!this.state.isDragging) {return}

    // Prevent scrolling while dragging on touch devices
    if ('touches' in e) {
      e.preventDefault()
    }

    const position = this.calculatePosition(e)
    this.updatePosition(position)
  }

  private handleDragEnd(): void {
    if (!this.state.isDragging) {return}

    this.setState({ isDragging: false })
    this.element.classList.remove('compare-slider-dragging')
    this.config.onSlideEnd?.(this.state.position)
  }

  private handleClick(e: MouseEvent): void {
    const position = this.calculatePosition(e)
    this.setPosition(position)
  }

  private calculatePosition(e: MouseEvent | TouchEvent): number {
    const rect = this.element.getBoundingClientRect()
    let clientPos: number
    let size: number

    if ('touches' in e && e.touches.length > 0) {
      const touch = e.touches[0]!
      clientPos = this.config.orientation === 'horizontal' ? touch.clientX - rect.left : touch.clientY - rect.top
    } else {
      const mouseEvent = e as MouseEvent
      clientPos = this.config.orientation === 'horizontal' ? mouseEvent.clientX - rect.left : mouseEvent.clientY - rect.top
    }

    size = this.config.orientation === 'horizontal' ? rect.width : rect.height

    // Prevent division by zero if element has no size
    if (size === 0) {
      return 50 // Default to middle position
    }

    return Math.max(0, Math.min(100, (clientPos / size) * 100))
  }

  private updatePosition(position: number): void {
    const clampedPosition = Math.max(0, Math.min(100, position))
    this.setState({ position: clampedPosition })

    this.element.setAttribute('aria-valuenow', String(clampedPosition))

    const isHorizontal = this.config.orientation === 'horizontal'

    // Update before container clip
    if (this.beforeContainer) {
      if (isHorizontal) {
        this.beforeContainer.style.clipPath = `inset(0 ${100 - clampedPosition}% 0 0)`
      } else {
        this.beforeContainer.style.clipPath = `inset(0 0 ${100 - clampedPosition}% 0)`
      }
    }

    // Update handle position
    if (this.handle) {
      if (isHorizontal) {
        this.handle.style.left = `${clampedPosition}%`
        this.handle.style.top = '50%'
        this.handle.style.transform = 'translate(-50%, -50%)'
      } else {
        this.handle.style.top = `${clampedPosition}%`
        this.handle.style.left = '50%'
        this.handle.style.transform = 'translate(-50%, -50%)'
      }
    }

    // Update divider position
    if (this.divider) {
      if (isHorizontal) {
        this.divider.style.left = `${clampedPosition}%`
      } else {
        this.divider.style.top = `${clampedPosition}%`
      }
    }

    this.config.onSlide?.(clampedPosition)
  }

  // Public API

  setPosition(position: number): void {
    if (this.config.animate) {
      this.element.classList.add('compare-slider-animating')
      setTimeout(() => {
        this.element.classList.remove('compare-slider-animating')
      }, this.config.animationDuration)
    }
    this.updatePosition(position)
  }

  getPosition(): number {
    return this.state.position
  }

  setBeforeImage(src: string): void {
    const img = this.beforeContainer?.querySelector('img')
    if (img) {
      img.src = src
      this.setState({ beforeLoaded: false })
    }
  }

  setAfterImage(src: string): void {
    const img = this.afterContainer?.querySelector('img')
    if (img) {
      img.src = src
      this.setState({ afterLoaded: false })
    }
  }

  setLabels(before: string, after: string): void {
    const beforeLabel = this.beforeContainer?.querySelector('.compare-slider-label')
    const afterLabel = this.afterContainer?.querySelector('.compare-slider-label')

    if (beforeLabel) {beforeLabel.textContent = before}
    if (afterLabel) {afterLabel.textContent = after}
  }

  isLoaded(): boolean {
    return this.state.beforeLoaded && this.state.afterLoaded
  }

  isDragging(): boolean {
    return this.state.isDragging
  }

  override getState(): CompareSliderState {
    return { ...this.state }
  }

  override destroy(): void {
    document.removeEventListener('mousemove', this.boundHandleDrag)
    document.removeEventListener('mouseup', this.boundHandleDragEnd)
    document.removeEventListener('touchmove', this.boundHandleDrag)
    document.removeEventListener('touchend', this.boundHandleDragEnd)
    super.destroy()
  }
}

/**
 * Create Compare Slider instance
 */
export function createCompareSlider(element: HTMLElement, config?: Partial<CompareSliderConfig>): CompareSlider {
  return new CompareSlider(element, config)
}

export default CompareSlider
