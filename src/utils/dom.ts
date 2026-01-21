/**
 * DOM Utilities
 *
 * Helper functions for DOM manipulation (runtime mode).
 * @module utils/dom
 */

/**
 * Check if code is running in browser environment
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

/**
 * Escape HTML special characters to prevent XSS attacks
 *
 * @example
 * ```typescript
 * escapeHtml('<script>alert("xss")</script>')
 * // Returns: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
 * ```
 */
export function escapeHtml(str: string): string {
  if (!str) return ''
  const escapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }
  return str.replace(/[&<>"']/g, (char) => escapeMap[char] || char)
}

/**
 * Safe querySelector that returns typed element or null
 *
 * @example
 * ```typescript
 * const button = querySelector<HTMLButtonElement>('#my-button')
 * ```
 */
export function querySelector<T extends Element = Element>(
  selector: string,
  root: Document | Element = document
): T | null {
  if (!isBrowser()) {
    return null
  }
  return root.querySelector<T>(selector)
}

/**
 * Safe querySelectorAll that returns array instead of NodeList
 *
 * @example
 * ```typescript
 * const buttons = querySelectorAll<HTMLButtonElement>('.btn')
 * ```
 */
export function querySelectorAll<T extends Element = Element>(
  selector: string,
  root: Document | Element = document
): T[] {
  if (!isBrowser()) {
    return []
  }
  return Array.from(root.querySelectorAll<T>(selector))
}

/**
 * Create an element with optional attributes and children
 *
 * @example
 * ```typescript
 * const div = createElement('div', { class: 'container' }, 'Hello')
 * const button = createElement('button', { type: 'submit' }, createElement('span', {}, 'Click'))
 * ```
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attributes: Record<string, string> = {},
  ...children: (string | Node)[]
): HTMLElementTagNameMap[K] {
  if (!isBrowser()) {
    throw new Error('createElement can only be called in browser environment')
  }

  const element = document.createElement(tag)

  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value)
  }

  for (const child of children) {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child))
    } else {
      element.appendChild(child)
    }
  }

  return element
}

/**
 * Get or create a style element
 *
 * @example
 * ```typescript
 * const style = getOrCreateStyleElement('coralcss')
 * style.textContent = '.p-4 { padding: 1rem; }'
 * ```
 */
export function getOrCreateStyleElement(id: string): HTMLStyleElement {
  if (!isBrowser()) {
    throw new Error('getOrCreateStyleElement can only be called in browser environment')
  }

  let style = document.getElementById(id) as HTMLStyleElement | null

  if (!style) {
    style = document.createElement('style')
    style.id = id
    style.setAttribute('type', 'text/css')
    document.head.appendChild(style)
  }

  return style
}

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',')

  return Array.from(container.querySelectorAll<HTMLElement>(selector))
}

/**
 * Trap focus within a container
 *
 * @returns Cleanup function to remove the trap
 */
export function trapFocus(container: HTMLElement): () => void {
  const focusableElements = getFocusableElements(container)
  const firstFocusable = focusableElements[0]
  const lastFocusable = focusableElements[focusableElements.length - 1]

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') {
      return
    }

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusable) {
        event.preventDefault()
        lastFocusable?.focus()
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusable) {
        event.preventDefault()
        firstFocusable?.focus()
      }
    }
  }

  container.addEventListener('keydown', handleKeyDown)

  // Focus first element
  firstFocusable?.focus()

  return () => {
    container.removeEventListener('keydown', handleKeyDown)
  }
}

/**
 * Lock body scroll
 *
 * @returns Cleanup function to unlock scroll
 */
export function lockScroll(): () => void {
  if (!isBrowser()) {
    return () => {}
  }

  const scrollY = window.scrollY
  const body = document.body
  const originalStyle = body.style.cssText

  body.style.position = 'fixed'
  body.style.top = `-${scrollY}px`
  body.style.left = '0'
  body.style.right = '0'
  body.style.overflow = 'hidden'

  return () => {
    body.style.cssText = originalStyle
    window.scrollTo(0, scrollY)
  }
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: Element): boolean {
  if (!isBrowser()) {
    return false
  }

  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * Set multiple attributes on an element
 */
export function setAttributes(element: Element, attributes: Record<string, string | null>): void {
  for (const [key, value] of Object.entries(attributes)) {
    if (value === null) {
      element.removeAttribute(key)
    } else {
      element.setAttribute(key, value)
    }
  }
}

/**
 * Set ARIA attributes for accessibility
 */
export function setAriaAttributes(
  element: Element,
  attributes: Record<string, string | boolean | null>
): void {
  for (const [key, value] of Object.entries(attributes)) {
    const attrName = key.startsWith('aria-') ? key : `aria-${key}`
    if (value === null || value === false) {
      element.removeAttribute(attrName)
    } else if (value === true) {
      element.setAttribute(attrName, 'true')
    } else {
      element.setAttribute(attrName, value)
    }
  }
}

/**
 * Listen to events with automatic cleanup
 *
 * @returns Cleanup function to remove all listeners
 */
export function addEventListener<K extends keyof HTMLElementEventMap>(
  element: HTMLElement | Document | Window,
  event: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): () => void {
  element.addEventListener(event, handler as EventListener, options)
  return () => {
    element.removeEventListener(event, handler as EventListener, options)
  }
}

/**
 * Wait for DOM ready
 */
export function onDOMReady(callback: () => void): void {
  if (!isBrowser()) {
    return
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback)
  } else {
    callback()
  }
}

/**
 * Dispatch custom event
 */
export function dispatchCustomEvent<T>(element: Element, eventName: string, detail?: T): void {
  const event = new CustomEvent(eventName, {
    bubbles: true,
    cancelable: true,
    detail,
  })
  element.dispatchEvent(event)
}

/**
 * Get computed style value
 */
export function getComputedStyleValue(element: Element, property: string): string {
  if (!isBrowser()) {
    return ''
  }
  return window.getComputedStyle(element).getPropertyValue(property)
}

/**
 * Check if CSS feature is supported
 */
export function cssSupports(property: string, value: string): boolean {
  if (!isBrowser() || !CSS.supports) {
    return false
  }
  return CSS.supports(property, value)
}

/**
 * Check for modern CSS feature support
 */
export const supportsAnchorPositioning = () => cssSupports('anchor-name', '--test')
export const supportsContainerQueries = () => cssSupports('container-type', 'inline-size')
export const supportsHasSelector = () => {
  try {
    document.querySelector(':has(*)')
    return true
  } catch {
    return false
  }
}
export const supportsScrollTimeline = () => cssSupports('animation-timeline', 'scroll()')
export const supportsViewTransitions = () =>
  isBrowser() && 'startViewTransition' in document

/**
 * Get data attribute value
 */
export function getDataAttribute(element: Element, name: string): string | null {
  const attrName = name.startsWith('data-') ? name : `data-${name}`
  return element.getAttribute(attrName)
}

/**
 * Set data attribute value
 */
export function setDataAttribute(element: Element, name: string, value: string | null): void {
  const attrName = name.startsWith('data-') ? name : `data-${name}`
  if (value === null) {
    element.removeAttribute(attrName)
  } else {
    element.setAttribute(attrName, value)
  }
}

// Store active focus trap cleanup functions
const focusTrapCleanups = new WeakMap<HTMLElement, () => void>()

/**
 * Release focus trap from a container
 */
export function releaseFocusTrap(container: HTMLElement): void {
  const cleanup = focusTrapCleanups.get(container)
  if (cleanup) {
    cleanup()
    focusTrapCleanups.delete(container)
  }
}

/**
 * Set focus trap and track it
 * If a trap already exists on the container, it will be released first
 */
export function setFocusTrap(container: HTMLElement): () => void {
  // Release any existing trap on this container first
  releaseFocusTrap(container)

  const cleanup = trapFocus(container)
  focusTrapCleanups.set(container, cleanup)
  return () => releaseFocusTrap(container)
}

// Store scroll lock state with reference counting
let scrollLockCleanup: (() => void) | null = null
let scrollLockCount = 0

/**
 * Unlock body scroll (decrements lock count)
 */
export function unlockScroll(): void {
  if (scrollLockCount > 0) {
    scrollLockCount--
  }

  // Only actually unlock when all locks are released
  if (scrollLockCount === 0 && scrollLockCleanup) {
    scrollLockCleanup()
    scrollLockCleanup = null
  }
}

/**
 * Lock scroll and track it (supports multiple concurrent locks)
 * Each call increments the lock count, scroll is only unlocked when count reaches 0
 */
export function setScrollLock(): () => void {
  scrollLockCount++

  // Only create the actual lock on first request
  if (scrollLockCount === 1) {
    scrollLockCleanup = lockScroll()
  }

  // Return a one-time unlock function for this specific lock request
  let unlocked = false
  return () => {
    if (!unlocked) {
      unlocked = true
      unlockScroll()
    }
  }
}
