/**
 * CoralCSS Render Helpers
 *
 * Utilities for rendering components with CoralCSS in tests.
 * @module testing/render
 */

import { createCoral } from '../index'
import type { CoralOptions, Coral } from '../types'

/**
 * Test wrapper options
 */
export interface TestWrapperOptions extends CoralOptions {
  /** Container element for rendering */
  container?: HTMLElement
  /** Style element for CSS injection (optional, created if not provided) */
  styleElement?: HTMLStyleElement
  /** Auto-inject CSS */
  autoInject?: boolean
  /** Base classes to always include */
  baseClasses?: string[]
}

/**
 * Test wrapper result
 */
export interface TestWrapper {
  /** Coral instance */
  coral: Coral
  /** Container element */
  container: HTMLElement
  /** Style element for injected CSS */
  styleElement: HTMLStyleElement
  /** Cleanup function */
  cleanup: () => void
  /** Inject CSS manually */
  injectCSS: (css: string) => void
  /** Get all injected CSS */
  getInjectedCSS: () => string
  /** Process classes and inject CSS */
  processClasses: (classes: string[]) => string
}

/**
 * Create a test wrapper with CoralCSS support
 *
 * @example
 * ```typescript
 * import { createTestWrapper } from '@coral-css/core/testing'
 *
 * describe('MyComponent', () => {
 *   let wrapper: TestWrapper
 *
 *   beforeEach(() => {
 *     wrapper = createTestWrapper({ darkMode: 'class' })
 *   })
 *
 *   afterEach(() => {
 *     wrapper.cleanup()
 *   })
 *
 *   it('should render with Coral classes', () => {
 *     const css = wrapper.processClasses(['bg-red-500', 'p-4'])
 *     expect(wrapper.getInjectedCSS()).toContain('background-color')
 *   })
 * })
 * ```
 */
export function createTestWrapper(options: TestWrapperOptions = {}): TestWrapper {
  const {
    container: providedContainer,
    styleElement: providedStyleElement,
    autoInject = true,
    baseClasses = [],
    ...coralOptions
  } = options

  // Check if we're in a browser environment
  const isBrowser = typeof document !== 'undefined'

  // Track what we created vs what was provided
  const createdContainer = !providedContainer
  const createdStyleElement = !providedStyleElement

  // Create or use provided container
  const container = providedContainer || (isBrowser ? document.createElement('div') : null)
  if (!container) {
    throw new Error('createTestWrapper requires a browser environment or a provided container')
  }
  container.setAttribute('data-testid', 'coral-test-wrapper')

  // Create or use provided style element
  const styleElement = providedStyleElement || (isBrowser ? document.createElement('style') : null)
  if (!styleElement) {
    throw new Error('createTestWrapper requires a browser environment or a provided styleElement')
  }
  styleElement.setAttribute('data-coral', 'test')

  // Append to document only if we created them
  if (isBrowser) {
    if (createdContainer) {
      document.body.appendChild(container)
    }
    if (createdStyleElement) {
      document.head.appendChild(styleElement)
    }
  }

  // Create Coral instance
  const coral = createCoral(coralOptions)
  let injectedCSS = ''

  // Process base classes
  if (baseClasses.length > 0) {
    const css = coral.generate(baseClasses)
    if (css && autoInject) {
      injectedCSS = css
      styleElement.textContent = css
    }
  }

  const wrapper: TestWrapper = {
    coral,
    container,
    styleElement,

    cleanup() {
      // Only remove elements we created
      if (createdContainer) {
        container.remove()
      }
      if (createdStyleElement) {
        styleElement.remove()
      }
      // Clear injected CSS reference
      injectedCSS = ''
    },

    injectCSS(css: string) {
      injectedCSS += (injectedCSS ? '\n' : '') + css
      styleElement.textContent = injectedCSS
    },

    getInjectedCSS() {
      return injectedCSS
    },

    processClasses(classes: string[]) {
      const css = coral.generate(classes)
      if (css && autoInject) {
        wrapper.injectCSS(css)
      }
      return classes.join(' ')
    },
  }

  return wrapper
}

/**
 * Create a provider wrapper for framework-specific testing
 *
 * @example
 * ```typescript
 * // React Testing Library
 * import { render } from '@testing-library/react'
 * import { createTestProvider } from '@coral-css/core/testing'
 *
 * const wrapper = createTestProvider()
 *
 * render(<MyComponent />, { wrapper: wrapper.Provider })
 * ```
 */
export function createTestProvider(options: TestWrapperOptions = {}) {
  const wrapper = createTestWrapper(options)

  return {
    ...wrapper,
    /** Context value for providers */
    contextValue: {
      coral: wrapper.coral,
      generate: wrapper.coral.generate.bind(wrapper.coral),
      process: wrapper.processClasses.bind(wrapper),
    },
    /** Get provider props */
    getProviderProps() {
      return {
        value: this.contextValue,
      }
    },
  }
}

/**
 * Higher-order function to wrap component rendering with Coral
 *
 * @example
 * ```typescript
 * // Usage with any render function
 * const renderWithCoral = renderWithCoralFactory(
 *   (component) => render(component),
 *   { darkMode: 'class' }
 * )
 *
 * const { container } = renderWithCoral(<MyComponent />)
 * ```
 */
export function renderWithCoral<T>(
  renderFn: (element: unknown) => T,
  options: TestWrapperOptions = {}
): (element: unknown) => T & { coralWrapper: TestWrapper } {
  return (element: unknown) => {
    const wrapper = createTestWrapper(options)
    const result = renderFn(element)

    return {
      ...result,
      coralWrapper: wrapper,
    }
  }
}

/**
 * Utility to wait for CSS to be injected
 */
export async function waitForCSS(
  wrapper: TestWrapper,
  predicate: (css: string) => boolean,
  timeout = 1000
): Promise<void> {
  // Check immediately first
  if (predicate(wrapper.getInjectedCSS())) {
    return
  }

  return new Promise((resolve, reject) => {
    let observer: MutationObserver | null = null
    let intervalId: ReturnType<typeof setInterval> | null = null
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    let settled = false

    const cleanup = () => {
      if (observer) {
        observer.disconnect()
        observer = null
      }
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
      }
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
    }

    const settle = (success: boolean) => {
      if (settled) {return}
      settled = true
      cleanup()
      if (success) {
        resolve()
      } else {
        reject(new Error('Timeout waiting for CSS'))
      }
    }

    const check = () => {
      if (!settled && predicate(wrapper.getInjectedCSS())) {
        settle(true)
      }
    }

    // Use MutationObserver if available for efficient change detection
    if (typeof MutationObserver !== 'undefined') {
      observer = new MutationObserver(check)
      observer.observe(wrapper.styleElement, {
        childList: true,
        characterData: true,
        subtree: true,
      })
    }

    // Fallback polling for environments without MutationObserver or edge cases
    intervalId = setInterval(check, 50)

    // Timeout
    timeoutId = setTimeout(() => settle(false), timeout)
  })
}

/**
 * Create isolated test environment using an iframe
 * @throws {Error} If not in browser environment or iframe document is inaccessible
 */
export function createIsolatedEnvironment(options: TestWrapperOptions = {}) {
  if (typeof document === 'undefined') {
    throw new Error('createIsolatedEnvironment requires a browser environment')
  }

  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  document.body.appendChild(iframe)

  const iframeDoc = iframe.contentDocument
  if (!iframeDoc) {
    iframe.remove()
    throw new Error('Unable to access iframe contentDocument (may be blocked by security policy)')
  }

  const container = iframeDoc.createElement('div')
  const styleElement = iframeDoc.createElement('style')
  iframeDoc.body.appendChild(container)
  iframeDoc.head.appendChild(styleElement)

  const wrapper = createTestWrapper({
    ...options,
    container,
    styleElement,
  })

  return {
    ...wrapper,
    iframe,
    document: iframeDoc,
    cleanup() {
      wrapper.cleanup()
      iframe.remove()
    },
  }
}
