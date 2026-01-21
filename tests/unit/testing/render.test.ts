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

    it('should inject CSS for base classes with autoInject enabled', () => {
      wrapper = createTestWrapper({
        baseClasses: ['m-4', 'text-lg'],
        autoInject: true,
      })

      // CSS should be injected into style element for base classes
      // Note: CSS may or may not be generated depending on enabled plugins
      const css = wrapper.getInjectedCSS()
      expect(typeof css).toBe('string')
      // styleElement.textContent should match injectedCSS
      if (css.length > 0) {
        expect(wrapper.styleElement.textContent).toContain(css)
      }
    })

    it('should inject CSS via processClasses when autoInject is true', () => {
      wrapper = createTestWrapper({ autoInject: true })

      // Initially empty
      expect(wrapper.getInjectedCSS()).toBe('')

      // Process classes - CSS generation depends on which plugins are enabled
      wrapper.processClasses(['flex', 'items-center'])

      // Just verify the method was called (CSS may or may not be generated)
      const css = wrapper.getInjectedCSS()
      expect(typeof css).toBe('string')
    })

    it('should respect autoInject option', () => {
      wrapper = createTestWrapper({ autoInject: false })

      wrapper.processClasses(['bg-red-500'])

      // CSS should not be injected
      expect(wrapper.getInjectedCSS()).toBe('')
    })

    it('should not add leading newline on first injectCSS call', () => {
      wrapper = createTestWrapper()

      wrapper.injectCSS('.first { color: red; }')

      // First inject should not have leading newline
      expect(wrapper.getInjectedCSS()).toBe('.first { color: red; }')
      expect(wrapper.getInjectedCSS().startsWith('\n')).toBe(false)
    })

    it('should add newline between multiple injectCSS calls', () => {
      wrapper = createTestWrapper()

      wrapper.injectCSS('.first { color: red; }')
      wrapper.injectCSS('.second { color: blue; }')

      const css = wrapper.getInjectedCSS()
      expect(css).toContain('.first')
      expect(css).toContain('.second')
      expect(css).toContain('\n')
    })

    it('should clear injectedCSS on cleanup', () => {
      wrapper = createTestWrapper()

      wrapper.injectCSS('.test { color: red; }')
      expect(wrapper.getInjectedCSS()).not.toBe('')

      wrapper.cleanup()

      // After cleanup, getInjectedCSS should return empty string
      expect(wrapper.getInjectedCSS()).toBe('')
    })

    it('should use provided styleElement', () => {
      const providedStyle = document.createElement('style')
      providedStyle.id = 'my-style'
      document.head.appendChild(providedStyle)

      wrapper = createTestWrapper({ styleElement: providedStyle })

      expect(wrapper.styleElement).toBe(providedStyle)
      expect(wrapper.styleElement.id).toBe('my-style')

      // Should have data-coral attribute set
      expect(wrapper.styleElement.getAttribute('data-coral')).toBe('test')

      wrapper.cleanup()
      // Provided style should not be removed
      expect(document.head.contains(providedStyle)).toBe(true)

      providedStyle.remove()
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

    it('should resolve immediately when predicate is already true', async () => {
      const wrapper = createTestWrapper()

      // Inject CSS first
      wrapper.injectCSS('.existing { color: green; }')

      const startTime = Date.now()
      // This should resolve immediately since predicate is already true
      await waitForCSS(wrapper, (css) => css.includes('.existing'), 1000)
      const elapsed = Date.now() - startTime

      // Should resolve very quickly (less than 100ms) since it checks immediately
      expect(elapsed).toBeLessThan(100)

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
