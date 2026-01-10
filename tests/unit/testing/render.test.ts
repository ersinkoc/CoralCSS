/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  createTestWrapper,
  createTestProvider,
  renderWithCoral,
  waitForCSS,
  createIsolatedEnvironment,
} from '../../../src/testing/render'

describe('Testing Render Utilities', () => {
  describe('createTestWrapper', () => {
    let wrapper: ReturnType<typeof createTestWrapper>

    afterEach(() => {
      if (wrapper) {
        wrapper.cleanup()
      }
    })

    it('should create a test wrapper', () => {
      wrapper = createTestWrapper()

      expect(wrapper.coral).toBeDefined()
      expect(wrapper.container).toBeDefined()
      expect(wrapper.styleElement).toBeDefined()
      expect(wrapper.cleanup).toBeDefined()
      expect(wrapper.injectCSS).toBeDefined()
      expect(wrapper.getInjectedCSS).toBeDefined()
      expect(wrapper.processClasses).toBeDefined()
    })

    it('should create container element', () => {
      wrapper = createTestWrapper()

      expect(wrapper.container.getAttribute('data-testid')).toBe('coral-test-wrapper')
    })

    it('should create style element', () => {
      wrapper = createTestWrapper()

      expect(wrapper.styleElement.getAttribute('data-coral')).toBe('test')
    })

    it('should process classes and inject CSS', () => {
      wrapper = createTestWrapper()

      const classes = wrapper.processClasses(['bg-red-500', 'p-4'])
      expect(classes).toBe('bg-red-500 p-4')

      // getInjectedCSS returns all injected CSS as string
      const css = wrapper.getInjectedCSS()
      expect(typeof css).toBe('string')
    })

    it('should inject CSS manually', () => {
      wrapper = createTestWrapper()

      wrapper.injectCSS('.test { color: red; }')

      expect(wrapper.getInjectedCSS()).toContain('.test')
    })

    it('should cleanup on destroy', () => {
      wrapper = createTestWrapper()
      const container = wrapper.container
      const styleElement = wrapper.styleElement

      wrapper.cleanup()

      expect(document.body.contains(container)).toBe(false)
      expect(document.head.contains(styleElement)).toBe(false)
    })

    it('should use provided container', () => {
      const providedContainer = document.createElement('div')
      providedContainer.id = 'provided'
      document.body.appendChild(providedContainer)

      wrapper = createTestWrapper({ container: providedContainer })

      expect(wrapper.container).toBe(providedContainer)

      // Should not remove provided container on cleanup
      wrapper.cleanup()
      expect(document.body.contains(providedContainer)).toBe(true)

      providedContainer.remove()
    })

    it('should not remove provided style element on cleanup', () => {
      const providedContainer = document.createElement('div')
      const providedStyle = document.createElement('style')
      providedStyle.id = 'provided-style'
      document.head.appendChild(providedStyle)

      wrapper = createTestWrapper({ container: providedContainer, styleElement: providedStyle })

      // Should not remove provided style on cleanup
      wrapper.cleanup()
      expect(document.head.contains(providedStyle)).toBe(true)

      providedContainer.remove()
      providedStyle.remove()
    })

    it('should process base classes', () => {
      wrapper = createTestWrapper({
        baseClasses: ['bg-slate-100', 'p-4'],
      })

      // Base classes are processed during initialization
      const css = wrapper.getInjectedCSS()
      expect(typeof css).toBe('string')
    })

    it('should respect autoInject option', () => {
      wrapper = createTestWrapper({ autoInject: false })

      wrapper.processClasses(['bg-red-500'])

      // CSS should not be injected
      expect(wrapper.getInjectedCSS()).toBe('')
    })
  })

  describe('createTestProvider', () => {
    let provider: ReturnType<typeof createTestProvider>

    afterEach(() => {
      if (provider) {
        provider.cleanup()
      }
    })

    it('should create a test provider', () => {
      provider = createTestProvider()

      expect(provider.coral).toBeDefined()
      expect(provider.contextValue).toBeDefined()
      expect(provider.getProviderProps).toBeDefined()
    })

    it('should provide context value with coral instance', () => {
      provider = createTestProvider()

      expect(provider.contextValue.coral).toBeDefined()
      expect(provider.contextValue.generate).toBeDefined()
      expect(provider.contextValue.process).toBeDefined()
    })

    it('should provide provider props', () => {
      provider = createTestProvider()

      const props = provider.getProviderProps()
      expect(props.value).toBe(provider.contextValue)
    })
  })

  describe('renderWithCoral', () => {
    it('should wrap render function with coral', () => {
      const mockRender = (element: unknown) => ({
        element,
        rendered: true,
      })

      const renderWithCoralFn = renderWithCoral(mockRender)
      const result = renderWithCoralFn('<div>Test</div>')

      expect(result.rendered).toBe(true)
      expect(result.coralWrapper).toBeDefined()
      expect(result.coralWrapper.coral).toBeDefined()

      result.coralWrapper.cleanup()
    })

    it('should accept config options', () => {
      const mockRender = (element: unknown) => ({ element })

      const renderWithCoralFn = renderWithCoral(mockRender, { darkMode: 'class' })
      const result = renderWithCoralFn('<div>Test</div>')

      expect(result.coralWrapper.coral.config.darkMode).toBe('class')

      result.coralWrapper.cleanup()
    })
  })

  describe('waitForCSS', () => {
    it('should resolve when predicate is true', async () => {
      const wrapper = createTestWrapper()

      wrapper.injectCSS('.test { color: red; }')

      await expect(
        waitForCSS(wrapper, (css) => css.includes('.test'), 100)
      ).resolves.toBeUndefined()

      wrapper.cleanup()
    })

    it('should reject on timeout', async () => {
      const wrapper = createTestWrapper()

      await expect(
        waitForCSS(wrapper, (css) => css.includes('.nonexistent'), 50)
      ).rejects.toThrow('Timeout')

      wrapper.cleanup()
    })
  })

  describe('createIsolatedEnvironment', () => {
    it('should create isolated iframe environment', () => {
      const env = createIsolatedEnvironment()

      expect(env.iframe).toBeDefined()
      expect(env.document).toBeDefined()
      expect(env.container).toBeDefined()
      expect(env.coral).toBeDefined()

      env.cleanup()
    })

    it('should cleanup iframe on destroy', () => {
      const env = createIsolatedEnvironment()
      const iframe = env.iframe

      env.cleanup()

      expect(document.body.contains(iframe)).toBe(false)
    })
  })
})
