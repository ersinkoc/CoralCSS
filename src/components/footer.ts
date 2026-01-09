/**
 * Footer Component
 *
 * Accessible footer with multiple layout variants.
 * @module components/footer
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Footer variant types
 */
export type FooterVariant = 'simple' | 'columns' | 'centered' | 'minimal'

/**
 * Footer configuration
 */
export interface FooterConfig extends ComponentConfig {
  /**
   * Footer variant
   * @default 'simple'
   */
  variant?: FooterVariant

  /**
   * Enable sticky footer (stick to bottom)
   * @default false
   */
  sticky?: boolean
}

/**
 * Footer state
 */
export interface FooterState extends ComponentState {
  year: number
}

/**
 * Footer component
 *
 * @example
 * ```html
 * <footer data-coral-footer data-variant="columns">
 *   <div data-coral-footer-content>
 *     <div data-coral-footer-section>
 *       <h4 data-coral-footer-title>Company</h4>
 *       <nav data-coral-footer-nav>
 *         <a href="/about">About</a>
 *         <a href="/careers">Careers</a>
 *         <a href="/press">Press</a>
 *       </nav>
 *     </div>
 *     <div data-coral-footer-section>
 *       <h4 data-coral-footer-title>Resources</h4>
 *       <nav data-coral-footer-nav>
 *         <a href="/docs">Documentation</a>
 *         <a href="/blog">Blog</a>
 *         <a href="/support">Support</a>
 *       </nav>
 *     </div>
 *   </div>
 *   <div data-coral-footer-bottom>
 *     <p data-coral-footer-copyright></p>
 *     <div data-coral-footer-social>
 *       <a href="#" aria-label="Twitter"><svg>...</svg></a>
 *       <a href="#" aria-label="GitHub"><svg>...</svg></a>
 *     </div>
 *   </div>
 * </footer>
 * ```
 */
export class Footer extends BaseComponent {
  protected declare config: FooterConfig
  protected declare state: FooterState

  protected getDefaultConfig(): FooterConfig {
    return {
      variant: 'simple',
      sticky: false,
    }
  }

  protected getInitialState(): FooterState {
    return {
      year: new Date().getFullYear(),
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'contentinfo')

    // Set up navigation sections
    const navs = this.queryAll<HTMLElement>('[data-coral-footer-nav]')
    navs.forEach((nav, index) => {
      nav.setAttribute('role', 'navigation')
      const title = nav.previousElementSibling
      if (title && title.matches('[data-coral-footer-title]')) {
        const titleId = title.id || `${this.id}-nav-title-${index}`
        title.id = titleId
        nav.setAttribute('aria-labelledby', titleId)
      }
    })

    // Social links
    const socialLinks = this.queryAll<HTMLElement>('[data-coral-footer-social] a')
    socialLinks.forEach((link) => {
      if (!link.getAttribute('aria-label')) {
        const text = link.textContent?.trim()
        if (text) {
          link.setAttribute('aria-label', text)
        }
      }
    })
  }

  protected bindEvents(): void {
    // Footer is mostly static, minimal events needed
    // Could add newsletter form handling here if present

    const newsletterForm = this.query<HTMLFormElement>('[data-coral-footer-newsletter]')
    if (newsletterForm) {
      this.addEventListener(newsletterForm, 'submit', (e: Event) => {
        e.preventDefault()
        const formData = new FormData(newsletterForm)
        this.dispatch('newsletter-submit', { email: formData.get('email') })
      })
    }
  }

  protected override render(): void {
    const { variant, sticky } = this.config

    this.element.setAttribute('data-variant', variant ?? 'simple')

    if (sticky) {
      this.element.setAttribute('data-sticky', '')
    } else {
      this.element.removeAttribute('data-sticky')
    }

    // Update copyright year
    const copyrightEl = this.query<HTMLElement>('[data-coral-footer-copyright]')
    if (copyrightEl && !copyrightEl.textContent?.includes(String(this.state.year))) {
      const currentText = copyrightEl.getAttribute('data-template') || copyrightEl.textContent || ''
      copyrightEl.setAttribute('data-template', currentText)
      copyrightEl.textContent = currentText.replace(/\{year\}/g, String(this.state.year))
    }
  }

  /**
   * Get current year
   */
  getYear(): number {
    return this.state.year
  }
}

/**
 * Create a footer instance
 */
export const createFooter = createComponentFactory(Footer)

export default Footer
