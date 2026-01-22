/**
 * Split View Component
 *
 * A resizable split pane component with draggable divider,
 * keyboard support, and customizable constraints.
 *
 * @module components/split-view
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent } from './base'

/**
 * Split View configuration
 */
export interface SplitViewConfig extends ComponentConfig {
  direction?: 'horizontal' | 'vertical'
  initialSplit?: number // percentage (0-100)
  minPaneSize?: number // pixels
  maxPaneSize?: number // pixels
  gutterSize?: number // pixels
  snapThreshold?: number // pixels
  snapPoints?: number[] // percentages
  collapsible?: boolean
  collapseThreshold?: number // percentage below which to collapse
  animated?: boolean
  animationDuration?: number
  disabled?: boolean
  onDragStart?: () => void
  onDrag?: (percentage: number) => void
  onDragEnd?: (percentage: number) => void
  onCollapse?: (pane: 'first' | 'second') => void
  onExpand?: (pane: 'first' | 'second') => void
}

/**
 * Split View state
 */
export interface SplitViewState extends ComponentState {
  splitPercentage: number
  isDragging: boolean
  isCollapsed: 'first' | 'second' | null
  pane1Size: number
  pane2Size: number
}

/**
 * Split View Component Class
 */
export class SplitView extends BaseComponent {
  declare protected config: SplitViewConfig
  declare protected state: SplitViewState
  // Note: Don't use field initializers with = value - they run AFTER super() returns
  // and would overwrite values set during bindEvents().
  private pane1!: HTMLElement | null
  private pane2!: HTMLElement | null
  private gutter!: HTMLElement | null
  private resizeObserver!: ResizeObserver | null
  private startPos!: number
  private startSplit!: number
  private _initialSplit!: number
  // Bound event handlers (stored for proper cleanup)
  private boundHandleDrag!: (e: MouseEvent | TouchEvent) => void
  private boundHandleDragEnd!: () => void

  protected getDefaultConfig(): SplitViewConfig {
    return {
      direction: 'horizontal',
      initialSplit: 50,
      minPaneSize: 0,
      maxPaneSize: Infinity,
      gutterSize: 8,
      snapThreshold: 10,
      snapPoints: [],
      collapsible: false,
      collapseThreshold: 5,
      animated: false,
      animationDuration: 200,
      disabled: false,
    }
  }

  protected getInitialState(): SplitViewState {
    this._initialSplit = this.config.initialSplit ?? 50
    return {
      splitPercentage: this.config.initialSplit ?? 50,
      isDragging: false,
      isCollapsed: null,
      pane1Size: 0,
      pane2Size: 0,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'group')
    this.element.setAttribute('aria-label', 'Split view container')
  }

  protected bindEvents(): void {
    // Initialize all private fields that don't use field initializers
    this.pane1 = null
    this.pane2 = null
    this.gutter = null
    this.resizeObserver = null
    this.startPos = 0
    this.startSplit = 0
    // _initialSplit is already set in getInitialState(), preserve it
    if (this._initialSplit === undefined) {
      this._initialSplit = this.config.initialSplit ?? 50
    }
    // Store bound handlers for proper cleanup
    this.boundHandleDrag = this.handleDrag.bind(this)
    this.boundHandleDragEnd = this.handleDragEnd.bind(this)

    this.element.classList.add('split-view-container')
    this.findPanes()
    this.calculateSizes()
    this.setupGutterEvents()
    this.setupKeyboardEvents()

    // Setup resize observer
    this.resizeObserver = new ResizeObserver(() => {
      this.calculateSizes()
    })
    this.resizeObserver.observe(this.element)
  }

  private findPanes(): void {
    const panes = this.element.querySelectorAll<HTMLElement>('[data-pane]')
    if (panes.length >= 2) {
      this.pane1 = panes[0] ?? null
      this.pane2 = panes[1] ?? null
    }

    this.gutter = this.element.querySelector<HTMLElement>('[data-gutter]')
    if (!this.gutter) {
      // Create gutter if not present
      this.gutter = document.createElement('div')
      this.gutter.className = 'split-view-gutter'
      this.gutter.setAttribute('data-gutter', '')
      this.gutter.setAttribute('role', 'separator')
      this.gutter.setAttribute('aria-orientation', this.config.direction === 'horizontal' ? 'vertical' : 'horizontal')
      this.gutter.setAttribute('tabindex', '0')

      if (this.pane2) {
        this.element.insertBefore(this.gutter, this.pane2)
      }
    }

    // Setup gutter styles
    if (this.gutter) {
      this.gutter.style.cursor = this.config.direction === 'horizontal' ? 'col-resize' : 'row-resize'
      if (this.config.direction === 'horizontal') {
        this.gutter.style.width = `${this.config.gutterSize}px`
      } else {
        this.gutter.style.height = `${this.config.gutterSize}px`
      }
    }

    this.applyLayout()
  }

  private calculateSizes(): void {
    const containerSize = this.config.direction === 'horizontal' ? this.element.clientWidth : this.element.clientHeight

    const gutterSize = this.config.gutterSize || 8
    const availableSize = containerSize - gutterSize

    const pane1Size = (availableSize * this.state.splitPercentage) / 100
    const pane2Size = availableSize - pane1Size

    this.setState({
      pane1Size,
      pane2Size,
    })
  }

  private applyLayout(): void {
    if (!this.pane1 || !this.pane2) {return}

    const splitPercentage = this.state.splitPercentage
    const direction = this.config.direction

    if (direction === 'horizontal') {
      this.pane1.style.width = `calc(${splitPercentage}% - ${(this.config.gutterSize || 8) / 2}px)`
      this.pane2.style.width = `calc(${100 - splitPercentage}% - ${(this.config.gutterSize || 8) / 2}px)`
    } else {
      this.pane1.style.height = `calc(${splitPercentage}% - ${(this.config.gutterSize || 8) / 2}px)`
      this.pane2.style.height = `calc(${100 - splitPercentage}% - ${(this.config.gutterSize || 8) / 2}px)`
    }

    if (this.config.animated && !this.state.isDragging) {
      this.pane1.style.transition = `all ${this.config.animationDuration}ms ease`
      this.pane2.style.transition = `all ${this.config.animationDuration}ms ease`
    } else {
      this.pane1.style.transition = ''
      this.pane2.style.transition = ''
    }
  }

  private setupGutterEvents(): void {
    if (!this.gutter) {return}

    this.gutter.addEventListener('mousedown', this.handleDragStart.bind(this))
    this.gutter.addEventListener('touchstart', this.handleDragStart.bind(this))
    document.addEventListener('mousemove', this.boundHandleDrag)
    document.addEventListener('touchmove', this.boundHandleDrag)
    document.addEventListener('mouseup', this.boundHandleDragEnd)
    document.addEventListener('touchend', this.boundHandleDragEnd)
  }

  private setupKeyboardEvents(): void {
    if (!this.gutter) {return}

    this.gutter.addEventListener('keydown', (e: KeyboardEvent) => {
      if (this.config.disabled) {return}

      const step = 5
      let newSplit = this.state.splitPercentage

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          newSplit = Math.max(0, this.state.splitPercentage - step)
          break
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault()
          newSplit = Math.min(100, this.state.splitPercentage + step)
          break
        case 'Home':
          e.preventDefault()
          newSplit = 0
          break
        case 'End':
          e.preventDefault()
          newSplit = 100
          break
      }

      if (newSplit !== this.state.splitPercentage) {
        this.setSplit(newSplit)
      }
    })
  }

  private handleDragStart(e: MouseEvent | TouchEvent): void {
    if (this.config.disabled) {return}

    e.preventDefault()
    this.startDrag()
    this.startPos = this.getEventPosition(e)
    this.startSplit = this.state.splitPercentage
  }

  private handleDrag(e: MouseEvent | TouchEvent): void {
    if (!this.state.isDragging) {return}

    // Guard against destroyed element (element may be removed from DOM during drag)
    if (!this.element.isConnected) {
      this.endDrag()
      return
    }

    const currentPos = this.getEventPosition(e)
    const containerSize = this.config.direction === 'horizontal' ? this.element.clientWidth : this.element.clientHeight

    const delta = currentPos - this.startPos
    const deltaPercentage = (delta / containerSize) * 100
    const newSplit = Math.max(0, Math.min(100, this.startSplit + deltaPercentage))

    this.updateDrag(newSplit)
  }

  private handleDragEnd(): void {
    if (!this.state.isDragging) {return}
    this.endDrag()
  }

  private getEventPosition(e: MouseEvent | TouchEvent): number {
    if ('touches' in e && e.touches.length > 0) {
      const touch = e.touches[0]!
      return this.config.direction === 'horizontal' ? touch.clientX : touch.clientY
    }
    return this.config.direction === 'horizontal' ? (e as MouseEvent).clientX : (e as MouseEvent).clientY
  }

  // Public API

  startDrag(): void {
    this.setState({ isDragging: true })
    this.element.classList.add('split-view-dragging')
    this.config.onDragStart?.()
  }

  updateDrag(percentage: number): void {
    this.setState({ splitPercentage: percentage })
    this.applyLayout()
    this.calculateSizes()
    this.config.onDrag?.(percentage)
  }

  endDrag(): void {
    this.setState({ isDragging: false })
    this.element.classList.remove('split-view-dragging')

    // Apply snap points
    if (this.config.snapPoints && this.config.snapPoints.length > 0) {
      this.snapToNearest()
    }

    // Check for collapse
    if (this.config.collapsible) {
      const threshold = this.config.collapseThreshold || 5
      if (this.state.splitPercentage <= threshold) {
        this.collapseFirst()
      } else if (this.state.splitPercentage >= 100 - threshold) {
        this.collapseSecond()
      }
    }

    this.config.onDragEnd?.(this.state.splitPercentage)
  }

  setSplit(percentage: number): void {
    const clamped = Math.max(0, Math.min(100, percentage))
    this.setState({ splitPercentage: clamped, isCollapsed: null })
    this.applyLayout()
    this.calculateSizes()
  }

  getSplit(): number {
    return this.state.splitPercentage
  }

  snapToNearest(): void {
    if (!this.config.snapPoints || this.config.snapPoints.length === 0) {return}

    const threshold = this.config.snapThreshold || 10
    let nearestPoint = this.state.splitPercentage
    let minDistance = Infinity

    for (const point of this.config.snapPoints) {
      const distance = Math.abs(this.state.splitPercentage - point)
      if (distance < threshold && distance < minDistance) {
        minDistance = distance
        nearestPoint = point
      }
    }

    if (nearestPoint !== this.state.splitPercentage) {
      this.setSplit(nearestPoint)
    }
  }

  collapseFirst(): void {
    this.setState({ splitPercentage: 0, isCollapsed: 'first' })
    this.applyLayout()
    this.calculateSizes()
    this.config.onCollapse?.('first')
  }

  collapseSecond(): void {
    this.setState({ splitPercentage: 100, isCollapsed: 'second' })
    this.applyLayout()
    this.calculateSizes()
    this.config.onCollapse?.('second')
  }

  expand(): void {
    const wasCollapsed = this.state.isCollapsed
    this.setState({ splitPercentage: this._initialSplit, isCollapsed: null })
    this.applyLayout()
    this.calculateSizes()
    if (wasCollapsed) {
      this.config.onExpand?.(wasCollapsed)
    }
  }

  toggleCollapse(pane: 'first' | 'second'): void {
    if (this.state.isCollapsed === pane) {
      this.expand()
    } else {
      if (pane === 'first') {
        this.collapseFirst()
      } else {
        this.collapseSecond()
      }
    }
  }

  disable(): void {
    this.config.disabled = true
    this.element.classList.add('split-view-disabled')
  }

  enable(): void {
    this.config.disabled = false
    this.element.classList.remove('split-view-disabled')
  }

  isDisabled(): boolean {
    return this.config.disabled || false
  }

  getPane1Size(): number {
    return this.state.pane1Size
  }

  getPane2Size(): number {
    return this.state.pane2Size
  }

  reset(): void {
    this.setState({
      splitPercentage: this._initialSplit,
      isCollapsed: null,
    })
    this.applyLayout()
    this.calculateSizes()
  }

  override getState(): SplitViewState {
    return { ...this.state }
  }

  override destroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    }
    document.removeEventListener('mousemove', this.boundHandleDrag)
    document.removeEventListener('touchmove', this.boundHandleDrag)
    document.removeEventListener('mouseup', this.boundHandleDragEnd)
    document.removeEventListener('touchend', this.boundHandleDragEnd)
    super.destroy()
  }
}

/**
 * Create Split View instance
 */
export function createSplitView(element: HTMLElement, config?: Partial<SplitViewConfig>): SplitView {
  return new SplitView(element, config)
}

export default SplitView
