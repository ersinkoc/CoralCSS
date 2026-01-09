/**
 * Navbar Component
 *
 * Responsive navigation bar with mobile menu support.
 * @module components/navbar
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Navbar configuration
 */
export interface NavbarConfig extends ComponentConfig {
  /**
   * Breakpoint for mobile menu
   * @default '768px'
   */
  breakpoint?: string

  /**
   * Enable sticky positioning
   * @default false
   */
  sticky?: boolean

  /**
   * Hide on scroll down, show on scroll up
   * @default false
   */
  hideOnScroll?: boolean

  /**
   * Scroll threshold before hiding
   * @default 100
   */
  scrollThreshold?: number

  /**
   * Enable backdrop blur when sticky
   * @default true
   */
  blur?: boolean
}

/**
 * Navbar state
 */
export interface NavbarState extends ComponentState {
  mobileMenuOpen: boolean
  hidden: boolean
  scrolled: boolean
}

/**
 * Navbar component
 *
 * @example
 * ```html
 * <nav data-coral-navbar>
 *   <div data-coral-navbar-brand>
 *     <a href="/">Logo</a>
 *   </div>
 *   <button data-coral-navbar-toggle aria-label="Toggle menu">
 *     <span></span>
 *   </button>
 *   <div data-coral-navbar-menu>
 *     <a href="/about">About</a>
 *     <a href="/contact">Contact</a>
 *   </div>
 *   <div data-coral-navbar-actions>
 *     <button>Sign In</button>
 *   </div>
 * </nav>
 * ```
 */
export class Navbar extends BaseComponent {
  protected declare config: NavbarConfig
  protected declare state: NavbarState

  private lastScrollY = 0
  private scrollHandler: (() => void) | null = null
  private resizeHandler: (() => void) | null = null

  protected getDefaultConfig(): NavbarConfig {
    return {
      breakpoint: '768px',
      sticky: false,
      hideOnScroll: false,
      scrollThreshold: 100,
      blur: true,
    }
  }

  protected getInitialState(): NavbarState {
    return {
      mobileMenuOpen: false,
      hidden: false,
      scrolled: false,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'navigation')

    const toggle = this.query<HTMLElement>('[data-coral-navbar-toggle]')
    const menu = this.query<HTMLElement>('[data-coral-navbar-menu]')

    if (toggle && menu) {
      const menuId = menu.id || `${this.id}-menu`
      menu.id = menuId
      toggle.setAttribute('aria-controls', menuId)
      toggle.setAttribute('aria-expanded', 'false')
      toggle.setAttribute('aria-label', 'Toggle navigation menu')
    }
  }

  protected bindEvents(): void {
    // Toggle button click
    const toggle = this.query<HTMLElement>('[data-coral-navbar-toggle]')
    if (toggle) {
      this.addEventListener(toggle, 'click', () => {
        this.toggleMobileMenu()
      })
    }

    // Close menu when clicking outside
    this.addEventListener(document, 'click', (e: Event) => {
      if (this.state.mobileMenuOpen && !this.element.contains(e.target as Node)) {
        this.closeMobileMenu()
      }
    })

    // Handle escape key
    this.addEventListener(document, 'keydown', (e: Event) => {
      if ((e as KeyboardEvent).key === 'Escape' && this.state.mobileMenuOpen) {
        this.closeMobileMenu()
      }
    })

    // Scroll handling
    if (this.config.sticky || this.config.hideOnScroll) {
      this.scrollHandler = this.handleScroll.bind(this)
      window.addEventListener('scroll', this.scrollHandler, { passive: true })
    }

    // Resize handling - close mobile menu on desktop
    this.resizeHandler = this.handleResize.bind(this)
    window.addEventListener('resize', this.resizeHandler)
  }

  protected override render(): void {
    const toggle = this.query<HTMLElement>('[data-coral-navbar-toggle]')
    const menu = this.query<HTMLElement>('[data-coral-navbar-menu]')

    // Mobile menu state
    if (this.state.mobileMenuOpen) {
      this.element.setAttribute('data-mobile-open', '')
      toggle?.setAttribute('aria-expanded', 'true')
      menu?.setAttribute('data-open', '')
    } else {
      this.element.removeAttribute('data-mobile-open')
      toggle?.setAttribute('aria-expanded', 'false')
      menu?.removeAttribute('data-open')
    }

    // Hidden state (hide on scroll)
    if (this.state.hidden) {
      this.element.setAttribute('data-hidden', '')
    } else {
      this.element.removeAttribute('data-hidden')
    }

    // Scrolled state
    if (this.state.scrolled) {
      this.element.setAttribute('data-scrolled', '')
    } else {
      this.element.removeAttribute('data-scrolled')
    }
  }

  private handleScroll(): void {
    const currentScrollY = window.scrollY
    const scrolled = currentScrollY > 0

    if (scrolled !== this.state.scrolled) {
      this.setState({ scrolled })
    }

    if (this.config.hideOnScroll) {
      const threshold = this.config.scrollThreshold ?? 100

      if (currentScrollY > threshold) {
        const hidden = currentScrollY > this.lastScrollY
        if (hidden !== this.state.hidden) {
          this.setState({ hidden })
        }
      } else if (this.state.hidden) {
        this.setState({ hidden: false })
      }
    }

    this.lastScrollY = currentScrollY
  }

  private handleResize(): void {
    // Close mobile menu when resizing to desktop
    if (this.state.mobileMenuOpen) {
      const breakpoint = parseInt(this.config.breakpoint ?? '768')
      if (window.innerWidth >= breakpoint) {
        this.closeMobileMenu()
      }
    }
  }

  /**
   * Toggle mobile menu
   */
  toggleMobileMenu(): void {
    if (this.state.mobileMenuOpen) {
      this.closeMobileMenu()
    } else {
      this.openMobileMenu()
    }
  }

  /**
   * Open mobile menu
   */
  openMobileMenu(): void {
    if (this.state.mobileMenuOpen) return
    this.setState({ mobileMenuOpen: true })
    this.dispatch('mobile-open')
  }

  /**
   * Close mobile menu
   */
  closeMobileMenu(): void {
    if (!this.state.mobileMenuOpen) return
    this.setState({ mobileMenuOpen: false })
    this.dispatch('mobile-close')
  }

  /**
   * Check if mobile menu is open
   */
  isMobileMenuOpen(): boolean {
    return this.state.mobileMenuOpen
  }

  /**
   * Destroy and cleanup
   */
  override destroy(): void {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler)
    }
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler)
    }
    super.destroy()
  }
}

/**
 * Create a navbar instance
 */
export const createNavbar = createComponentFactory(Navbar)

export default Navbar
