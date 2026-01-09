/**
 * Sidebar Component
 *
 * Collapsible sidebar navigation with multiple variants.
 * @module components/sidebar
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Sidebar variant types
 */
export type SidebarVariant = 'default' | 'floating' | 'inset' | 'compact'

/**
 * Sidebar position types
 */
export type SidebarPosition = 'left' | 'right'

/**
 * Sidebar configuration
 */
export interface SidebarConfig extends ComponentConfig {
  /**
   * Sidebar variant
   * @default 'default'
   */
  variant?: SidebarVariant

  /**
   * Sidebar position
   * @default 'left'
   */
  side?: SidebarPosition

  /**
   * Enable collapsible behavior
   * @default true
   */
  collapsible?: boolean

  /**
   * Default collapsed state
   * @default false
   */
  defaultCollapsed?: boolean

  /**
   * Collapsed width
   * @default '64px'
   */
  collapsedWidth?: string

  /**
   * Expanded width
   * @default '280px'
   */
  expandedWidth?: string

  /**
   * Breakpoint for mobile overlay mode
   * @default '1024px'
   */
  breakpoint?: string

  /**
   * Show overlay backdrop in mobile
   * @default true
   */
  overlay?: boolean
}

/**
 * Sidebar state
 */
export interface SidebarState extends ComponentState {
  collapsed: boolean
  mobileOpen: boolean
  hovering: boolean
}

/**
 * Sidebar component
 *
 * @example
 * ```html
 * <aside data-coral-sidebar data-variant="default">
 *   <div data-coral-sidebar-header>
 *     <img src="logo.svg" alt="Logo">
 *     <span>App Name</span>
 *   </div>
 *   <nav data-coral-sidebar-nav>
 *     <a href="/" data-coral-sidebar-item data-active>
 *       <svg>...</svg>
 *       <span>Dashboard</span>
 *     </a>
 *     <a href="/users" data-coral-sidebar-item>
 *       <svg>...</svg>
 *       <span>Users</span>
 *     </a>
 *     <div data-coral-sidebar-group>
 *       <button data-coral-sidebar-group-trigger>Settings</button>
 *       <div data-coral-sidebar-group-content>
 *         <a href="/settings/profile">Profile</a>
 *         <a href="/settings/security">Security</a>
 *       </div>
 *     </div>
 *   </nav>
 *   <div data-coral-sidebar-footer>
 *     <button data-coral-sidebar-toggle>
 *       <svg>...</svg>
 *     </button>
 *   </div>
 * </aside>
 * ```
 */
export class Sidebar extends BaseComponent {
  protected declare config: SidebarConfig
  protected declare state: SidebarState

  private resizeHandler: (() => void) | null = null

  protected getDefaultConfig(): SidebarConfig {
    return {
      variant: 'default',
      side: 'left',
      collapsible: true,
      defaultCollapsed: false,
      collapsedWidth: '64px',
      expandedWidth: '280px',
      breakpoint: '1024px',
      overlay: true,
    }
  }

  protected getInitialState(): SidebarState {
    const dataCollapsed = this.element.hasAttribute('data-collapsed')
    return {
      collapsed: this.config.defaultCollapsed ?? dataCollapsed ?? false,
      mobileOpen: false,
      hovering: false,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'complementary')
    this.element.setAttribute('aria-label', 'Sidebar navigation')

    // Setup group triggers
    const groupTriggers = this.queryAll<HTMLElement>('[data-coral-sidebar-group-trigger]')
    groupTriggers.forEach((trigger, index) => {
      const group = trigger.closest('[data-coral-sidebar-group]')
      const content = group?.querySelector('[data-coral-sidebar-group-content]')

      if (content) {
        const contentId = content.id || `${this.id}-group-${index}`
        content.id = contentId
        trigger.setAttribute('aria-controls', contentId)
        trigger.setAttribute('aria-expanded', 'false')
      }
    })
  }

  protected bindEvents(): void {
    // Toggle button
    const toggleBtns = this.queryAll<HTMLElement>('[data-coral-sidebar-toggle]')
    toggleBtns.forEach((btn) => {
      this.addEventListener(btn, 'click', () => {
        this.toggle()
      })
    })

    // Group triggers
    const groupTriggers = this.queryAll<HTMLElement>('[data-coral-sidebar-group-trigger]')
    groupTriggers.forEach((trigger) => {
      this.addEventListener(trigger, 'click', () => {
        this.toggleGroup(trigger)
      })
    })

    // Hover to expand (when collapsed)
    if (this.config.collapsible) {
      this.addEventListener(this.element, 'mouseenter', () => {
        if (this.state.collapsed) {
          this.setState({ hovering: true })
        }
      })

      this.addEventListener(this.element, 'mouseleave', () => {
        if (this.state.hovering) {
          this.setState({ hovering: false })
        }
      })
    }

    // Mobile overlay close on outside click
    this.addEventListener(document, 'click', (e: Event) => {
      if (this.state.mobileOpen && !this.element.contains(e.target as Node)) {
        this.closeMobile()
      }
    })

    // Escape key
    this.addEventListener(document, 'keydown', (e: Event) => {
      if ((e as KeyboardEvent).key === 'Escape' && this.state.mobileOpen) {
        this.closeMobile()
      }
    })

    // Resize handling
    this.resizeHandler = this.handleResize.bind(this)
    window.addEventListener('resize', this.resizeHandler)
  }

  protected override render(): void {
    const { collapsed, mobileOpen, hovering } = this.state
    const { variant, side, collapsedWidth, expandedWidth } = this.config

    // Set CSS custom properties
    this.element.style.setProperty('--sidebar-collapsed-width', collapsedWidth ?? '64px')
    this.element.style.setProperty('--sidebar-expanded-width', expandedWidth ?? '280px')

    // Data attributes for styling
    this.element.setAttribute('data-variant', variant ?? 'default')
    this.element.setAttribute('data-position', side ?? 'left')

    if (collapsed && !hovering) {
      this.element.setAttribute('data-collapsed', '')
    } else {
      this.element.removeAttribute('data-collapsed')
    }

    if (hovering) {
      this.element.setAttribute('data-hovering', '')
    } else {
      this.element.removeAttribute('data-hovering')
    }

    if (mobileOpen) {
      this.element.setAttribute('data-mobile-open', '')
    } else {
      this.element.removeAttribute('data-mobile-open')
    }

    // Update toggle button aria
    const toggleBtns = this.queryAll<HTMLElement>('[data-coral-sidebar-toggle]')
    toggleBtns.forEach((btn) => {
      btn.setAttribute('aria-expanded', String(!collapsed))
    })
  }

  private handleResize(): void {
    const breakpoint = parseInt(this.config.breakpoint ?? '1024')
    if (window.innerWidth >= breakpoint && this.state.mobileOpen) {
      this.closeMobile()
    }
  }

  private toggleGroup(trigger: HTMLElement): void {
    const group = trigger.closest('[data-coral-sidebar-group]')
    const content = group?.querySelector<HTMLElement>('[data-coral-sidebar-group-content]')

    if (!content) return

    const isExpanded = trigger.getAttribute('aria-expanded') === 'true'
    trigger.setAttribute('aria-expanded', String(!isExpanded))

    if (isExpanded) {
      content.removeAttribute('data-open')
      group?.removeAttribute('data-open')
    } else {
      content.setAttribute('data-open', '')
      group?.setAttribute('data-open', '')
    }

    this.dispatch('group-toggle', { trigger, expanded: !isExpanded })
  }

  /**
   * Toggle sidebar collapsed state
   */
  override toggle(): void {
    if (this.state.collapsed) {
      this.expand()
    } else {
      this.collapse()
    }
  }

  /**
   * Collapse sidebar
   */
  collapse(): void {
    if (!this.config.collapsible || this.state.collapsed) return
    this.setState({ collapsed: true })
    this.dispatch('collapse')
  }

  /**
   * Expand sidebar
   */
  expand(): void {
    if (!this.config.collapsible || !this.state.collapsed) return
    this.setState({ collapsed: false })
    this.dispatch('expand')
  }

  /**
   * Check if sidebar is collapsed
   */
  isCollapsed(): boolean {
    return this.state.collapsed
  }

  /**
   * Open mobile sidebar
   */
  openMobile(): void {
    if (this.state.mobileOpen) return
    this.setState({ mobileOpen: true })
    this.lockScroll()
    this.dispatch('mobile-open')
  }

  /**
   * Close mobile sidebar
   */
  closeMobile(): void {
    if (!this.state.mobileOpen) return
    this.setState({ mobileOpen: false })
    this.unlockScroll()
    this.dispatch('mobile-close')
  }

  /**
   * Toggle mobile sidebar
   */
  toggleMobile(): void {
    if (this.state.mobileOpen) {
      this.closeMobile()
    } else {
      this.openMobile()
    }
  }

  /**
   * Destroy and cleanup
   */
  override destroy(): void {
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler)
    }
    super.destroy()
  }
}

/**
 * Create a sidebar instance
 */
export const createSidebar = createComponentFactory(Sidebar)

export default Sidebar
