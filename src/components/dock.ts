/**
 * Dock Component
 *
 * A macOS-style dock component with magnification effect,
 * smooth animations, and customizable item layout.
 *
 * @module components/dock
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent } from './base'

/** Distance from dock edge to trigger auto-show (pixels) */
const AUTO_SHOW_THRESHOLD = 50
/** Default magnification range (pixels from cursor to affect items) */
const DEFAULT_MAGNIFY_RANGE = 150
/** Default animation duration for scale transitions (milliseconds) */
const DEFAULT_ANIMATION_DURATION = 150
/** Duration of bounce animation (milliseconds) */
const BOUNCE_ANIMATION_DURATION = 500

/**
 * Dock item interface
 */
export interface DockItem {
  id: string
  icon: string
  label: string
  href?: string
  badge?: number | string
  active?: boolean
  disabled?: boolean
  running?: boolean
  onClick?: () => void
}

/**
 * Dock configuration
 */
export interface DockConfig extends ComponentConfig {
  items?: DockItem[]
  dockPosition?: 'bottom' | 'top' | 'left' | 'right'
  itemSize?: number
  magnification?: boolean
  magnificationScale?: number
  magnifyRange?: number
  gap?: number
  autoHide?: boolean
  autoHideDelay?: number
  showLabels?: boolean
  labelPosition?: 'top' | 'bottom' | 'left' | 'right'
  animationDuration?: number
  bounceOnClick?: boolean
  separatorIndices?: number[]
  onClick?: (item: DockItem) => void
  onHover?: (id: string) => void
  onLeave?: () => void
}

/**
 * Dock state
 */
export interface DockState extends ComponentState {
  hoveredItem: string | null
  activeItem: string | null
  isHidden: boolean
  mouseX: number
  mouseY: number
}

/**
 * Dock Component Class
 */
export class Dock extends BaseComponent {
  declare protected config: DockConfig
  declare protected state: DockState
  // Note: Don't use field initializers with = value - they run AFTER super() returns
  // and would overwrite values set during bindEvents().
  private dockContainer!: HTMLElement | null
  private itemElements!: HTMLElement[]
  private hideTimeout!: ReturnType<typeof setTimeout> | null
  // Cached item positions for performance (avoid getBoundingClientRect in hot path)
  private cachedItemPositions!: { center: number; width: number; height: number }[]
  private positionsCacheValid!: boolean

  protected getDefaultConfig(): DockConfig {
    return {
      items: [],
      dockPosition: 'bottom',
      itemSize: 48,
      magnification: true,
      magnificationScale: 1.5,
      magnifyRange: DEFAULT_MAGNIFY_RANGE,
      gap: 4,
      autoHide: false,
      autoHideDelay: 1000,
      showLabels: true,
      labelPosition: 'top',
      animationDuration: DEFAULT_ANIMATION_DURATION,
      bounceOnClick: false,
      separatorIndices: [],
    }
  }

  protected getInitialState(): DockState {
    return {
      hoveredItem: null,
      activeItem: null,
      isHidden: this.config.autoHide || false,
      mouseX: 0,
      mouseY: 0,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'toolbar')
    this.element.setAttribute('aria-label', 'Application dock')
  }

  protected bindEvents(): void {
    // Initialize all private fields that don't use field initializers
    this.dockContainer = null
    this.itemElements = []
    this.hideTimeout = null
    this.cachedItemPositions = []
    this.positionsCacheValid = false

    this.buildDOM()
    this.setupMouseEvents()
    if (this.config.autoHide) {
      this.setupAutoHide()
    }

    // Setup ResizeObserver to invalidate position cache on resize
    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(() => {
        this.positionsCacheValid = false
      })
      resizeObserver.observe(this.element)
    }
  }

  /**
   * Update cached item positions (call before magnification calculations)
   */
  private updatePositionCache(): void {
    if (this.positionsCacheValid) return

    const isHorizontal = this.config.dockPosition === 'bottom' || this.config.dockPosition === 'top'

    this.cachedItemPositions = this.itemElements.map((wrapper) => {
      const rect = wrapper.getBoundingClientRect()
      return {
        center: isHorizontal ? rect.left + rect.width / 2 : rect.top + rect.height / 2,
        width: rect.width,
        height: rect.height,
      }
    })

    this.positionsCacheValid = true
  }

  private buildDOM(): void {
    this.element.classList.add('dock-wrapper')
    this.element.classList.add(`dock-${this.config.dockPosition}`)

    this.dockContainer = document.createElement('div')
    this.dockContainer.className = 'dock-container'
    this.dockContainer.style.gap = `${this.config.gap}px`

    this.renderItems()
    this.element.appendChild(this.dockContainer)

    if (this.state.isHidden) {
      this.element.classList.add('dock-hidden')
    }
  }

  private renderItems(): void {
    if (!this.dockContainer) return

    this.dockContainer.innerHTML = ''
    this.itemElements = []

    const items = this.config.items || []
    items.forEach((item, index) => {
      const itemElement = this.createItemElement(item, index)
      this.itemElements.push(itemElement)
      this.dockContainer?.appendChild(itemElement)
    })
  }

  private createItemElement(item: DockItem, index: number): HTMLElement {
    const wrapper = document.createElement('div')
    wrapper.className = 'dock-item-wrapper'
    wrapper.dataset.index = String(index)
    wrapper.dataset.id = item.id

    const itemElement = document.createElement('button')
    itemElement.className = 'dock-item'
    itemElement.style.width = `${this.config.itemSize}px`
    itemElement.style.height = `${this.config.itemSize}px`
    itemElement.setAttribute('aria-label', item.label)
    itemElement.setAttribute('role', 'button')

    if (item.active || this.state.activeItem === item.id) {
      itemElement.classList.add('active')
    }

    if (item.disabled) {
      itemElement.classList.add('disabled')
      itemElement.disabled = true
    }

    if (item.running) {
      itemElement.classList.add('running')
    }

    // Icon
    const icon = document.createElement('span')
    icon.className = 'dock-item-icon'
    // Safety: Only allow SVG elements (starting with <svg), otherwise treat as text/URL
    if (item.icon.trim().toLowerCase().startsWith('<svg')) {
      // Parse SVG safely using DOMParser
      const parser = new DOMParser()
      const doc = parser.parseFromString(item.icon, 'image/svg+xml')
      const svgEl = doc.querySelector('svg')
      if (svgEl && !doc.querySelector('parsererror')) {
        icon.appendChild(document.importNode(svgEl, true))
      } else {
        icon.textContent = item.icon
      }
    } else if (item.icon.match(/^https?:\/\//) || item.icon.startsWith('/') || item.icon.startsWith('.')) {
      const img = document.createElement('img')
      img.src = item.icon
      img.alt = item.label
      icon.appendChild(img)
    } else {
      icon.textContent = item.icon // Emoji or text - safe
    }
    itemElement.appendChild(icon)

    // Badge
    if (item.badge !== undefined) {
      const badge = document.createElement('span')
      badge.className = 'dock-item-badge'
      badge.textContent = String(item.badge)
      itemElement.appendChild(badge)
    }

    // Active indicator
    const indicator = document.createElement('span')
    indicator.className = 'dock-item-indicator'
    itemElement.appendChild(indicator)

    wrapper.appendChild(itemElement)

    // Label tooltip
    if (this.config.showLabels) {
      const label = document.createElement('span')
      label.className = 'dock-item-label'
      label.classList.add(`dock-label-${this.config.labelPosition}`)
      label.textContent = item.label
      wrapper.appendChild(label)
    }

    // Events
    itemElement.addEventListener('click', () => {
      if (!item.disabled) {
        this.handleItemClick(item, index)
      }
    })

    itemElement.addEventListener('mouseenter', () => {
      if (!item.disabled) {
        this.handleItemHover(item.id)
      }
    })

    itemElement.addEventListener('mouseleave', () => {
      this.handleItemLeave()
    })

    return wrapper
  }

  private setupMouseEvents(): void {
    this.element.addEventListener('mousemove', (e) => {
      if (this.config.magnification) {
        this.handleMouseMove(e)
      }
    })

    this.element.addEventListener('mouseleave', () => {
      this.resetMagnification()
    })
  }

  private setupAutoHide(): void {
    // Use arrow function stored in variable so we can track and remove it
    const handleDocumentMouseMove = (e: MouseEvent) => {
      const isNearDock = this.isMouseNearDock(e)

      if (isNearDock && this.state.isHidden) {
        this.show()
      } else if (!isNearDock && !this.state.isHidden) {
        this.scheduleHide()
      }
    }

    // Track listener for proper cleanup on destroy
    this.addEventListener(document, 'mousemove', handleDocumentMouseMove as EventListener)

    this.element.addEventListener('mouseenter', () => {
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout)
        this.hideTimeout = null
      }
    })
  }

  private isMouseNearDock(e: MouseEvent): boolean {
    const rect = this.element.getBoundingClientRect()
    const threshold = AUTO_SHOW_THRESHOLD

    switch (this.config.dockPosition) {
      case 'bottom':
        return e.clientY >= rect.top - threshold
      case 'top':
        return e.clientY <= rect.bottom + threshold
      case 'left':
        return e.clientX <= rect.right + threshold
      case 'right':
        return e.clientX >= rect.left - threshold
      default:
        return false
    }
  }

  private scheduleHide(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout)
    }

    this.hideTimeout = setTimeout(() => {
      this.hide()
    }, this.config.autoHideDelay)
  }

  private handleMouseMove(e: MouseEvent): void {
    const rect = this.dockContainer?.getBoundingClientRect()
    if (!rect) return

    // Update position cache if invalidated (avoids layout thrashing)
    this.updatePositionCache()

    const isHorizontal = this.config.dockPosition === 'bottom' || this.config.dockPosition === 'top'
    const mousePos = isHorizontal ? e.clientX : e.clientY

    this.setState({ mouseX: e.clientX, mouseY: e.clientY })

    const range = this.config.magnifyRange || DEFAULT_MAGNIFY_RANGE
    const maxScale = this.config.magnificationScale || 1.5

    this.itemElements.forEach((wrapper, index) => {
      // Use cached positions instead of getBoundingClientRect
      const cached = this.cachedItemPositions[index]
      const itemCenter = cached?.center ?? 0

      const distance = Math.abs(mousePos - itemCenter)

      let scale = 1
      if (distance < range) {
        scale = 1 + ((maxScale - 1) * (range - distance)) / range
      }

      const item = wrapper.querySelector('.dock-item') as HTMLElement
      if (item) {
        item.style.transform = `scale(${scale})`
        item.style.transition = `transform ${this.config.animationDuration}ms ease-out`
      }
    })
  }

  private resetMagnification(): void {
    this.itemElements.forEach((wrapper) => {
      const item = wrapper.querySelector('.dock-item') as HTMLElement
      if (item) {
        item.style.transform = 'scale(1)'
      }
    })
  }

  private handleItemClick(item: DockItem, index: number): void {
    this.config.onClick?.(item)
    item.onClick?.()

    if (this.config.bounceOnClick) {
      this.bounceItem(item.id)
    }

    if (item.href) {
      // Security: Only allow same-origin or relative URLs to prevent open redirect
      try {
        const url = new URL(item.href, window.location.origin)
        if (url.origin === window.location.origin) {
          window.location.href = item.href
        } else {
          console.warn('Dock: External URLs are blocked for security. Use onClick callback instead.')
        }
      } catch {
        // Relative URL - safe to navigate
        window.location.href = item.href
      }
    }
  }

  private handleItemHover(id: string): void {
    this.setState({ hoveredItem: id })
    this.config.onHover?.(id)
  }

  private handleItemLeave(): void {
    this.setState({ hoveredItem: null })
    this.config.onLeave?.()
  }

  // Public API

  show(): void {
    this.element.classList.remove('dock-hidden')
    this.setState({ isHidden: false })
  }

  hide(): void {
    this.element.classList.add('dock-hidden')
    this.setState({ isHidden: true })
  }

  setItems(items: DockItem[]): void {
    this.config.items = items
    this.renderItems()
  }

  getItems(): DockItem[] {
    return [...(this.config.items || [])]
  }

  getItem(id: string): DockItem | undefined {
    return (this.config.items || []).find((item) => item.id === id)
  }

  addItem(item: DockItem): void {
    const items = [...(this.config.items || []), item]
    this.setItems(items)
  }

  removeItem(id: string): void {
    const items = (this.config.items || []).filter((item) => item.id !== id)
    this.setItems(items)
  }

  updateItem(id: string, updates: Partial<DockItem>): void {
    const items = (this.config.items || []).map((item) => (item.id === id ? { ...item, ...updates } : item))
    this.setItems(items)
  }

  setActive(id: string): void {
    this.setState({ activeItem: id })
    this.renderItems()
  }

  clearActive(): void {
    this.setState({ activeItem: null })
    this.renderItems()
  }

  getActiveItem(): string | null {
    return this.state.activeItem
  }

  setPosition(position: 'bottom' | 'top' | 'left' | 'right'): void {
    this.element.classList.remove(`dock-${this.config.dockPosition}`)
    this.config.dockPosition = position
    this.element.classList.add(`dock-${position}`)
  }

  setMagnification(enabled: boolean): void {
    this.config.magnification = enabled
  }

  setBadge(id: string, badge: number | string | undefined): void {
    this.updateItem(id, { badge })
  }

  setDisabled(id: string, disabled: boolean): void {
    this.updateItem(id, { disabled })
  }

  setRunning(id: string, running: boolean): void {
    this.updateItem(id, { running })
  }

  hoverItem(id: string): void {
    this.handleItemHover(id)
  }

  leaveItem(): void {
    this.handleItemLeave()
  }

  clickItem(id: string): void {
    const item = this.getItem(id)
    if (item) {
      const index = (this.config.items || []).findIndex((i) => i.id === id)
      this.handleItemClick(item, index)
    }
  }

  bounceItem(id: string): void {
    const wrapper = this.itemElements.find((el) => el.dataset.id === id)
    const item = wrapper?.querySelector('.dock-item') as HTMLElement
    if (item) {
      item.classList.add('bouncing')
      setTimeout(() => {
        item.classList.remove('bouncing')
      }, BOUNCE_ANIMATION_DURATION)
    }
  }

  override getState(): DockState {
    return { ...this.state }
  }

  override destroy(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout)
    }
    super.destroy()
  }
}

/**
 * Create Dock instance
 */
export function createDock(element: HTMLElement, config?: Partial<DockConfig>): Dock {
  return new Dock(element, config)
}

export default Dock
