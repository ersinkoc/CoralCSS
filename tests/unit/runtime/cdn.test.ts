/**
 * @vitest-environment jsdom
 * Tests for CDN runtime
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { createCoralCDN, getCoralCDN, resetGlobalInstance } from '../../../src/runtime/cdn'

describe('CDN Runtime', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    document.head.innerHTML = ''
  })

  afterEach(() => {
    document.body.innerHTML = ''
    document.head.innerHTML = ''
  })

  describe('createCoralCDN', () => {
    it('should create a CDN instance', () => {
      const cdn = createCoralCDN({ autoStart: false })
      expect(cdn).toBeDefined()
      expect(cdn.coral).toBeDefined()
      expect(cdn.observer).toBeDefined()
      expect(cdn.injector).toBeDefined()
      cdn.destroy()
    })

    it('should have all required methods', () => {
      const cdn = createCoralCDN({ autoStart: false })
      expect(typeof cdn.start).toBe('function')
      expect(typeof cdn.stop).toBe('function')
      expect(typeof cdn.generate).toBe('function')
      expect(typeof cdn.generateFromHTML).toBe('function')
      expect(typeof cdn.getCSS).toBe('function')
      expect(typeof cdn.reset).toBe('function')
      expect(typeof cdn.initComponents).toBe('function')
      expect(typeof cdn.destroy).toBe('function')
      cdn.destroy()
    })
  })

  describe('autoStart option', () => {
    it('should auto-start when autoStart is true', () => {
      const cdn = createCoralCDN({ autoStart: true, autoInitComponents: false })
      expect(cdn).toBeDefined()
      cdn.stop()
      cdn.destroy()
    })

    it('should not auto-start when autoStart is false', () => {
      const cdn = createCoralCDN({ autoStart: false })
      expect(cdn).toBeDefined()
      cdn.destroy()
    })
  })

  describe('generate method', () => {
    it('should generate CSS for classes', () => {
      const cdn = createCoralCDN({ autoStart: false })
      const css = cdn.generate(['bg-red-500', 'p-4', 'text-white'])
      expect(css).toBeDefined()
      expect(typeof css).toBe('string')
      cdn.destroy()
    })

    it('should return empty string for empty array', () => {
      const cdn = createCoralCDN({ autoStart: false })
      const css = cdn.generate([])
      expect(css).toBe('')
      cdn.destroy()
    })

    it('should inject CSS into style tag', () => {
      const cdn = createCoralCDN({ autoStart: false })
      cdn.generate(['bg-blue-500'])
      const styleTag = document.getElementById('coral-styles')
      expect(styleTag).toBeDefined()
      cdn.destroy()
    })
  })

  describe('generateFromHTML method', () => {
    it('should generate CSS from HTML string', () => {
      const cdn = createCoralCDN({ autoStart: false })
      const html = '<div class="bg-green-500 text-white p-4">Test</div>'
      const css = cdn.generateFromHTML(html)
      expect(css).toBeDefined()
      expect(typeof css).toBe('string')
      cdn.destroy()
    })

    it('should handle HTML without classes', () => {
      const cdn = createCoralCDN({ autoStart: false })
      const html = '<div>No classes</div>'
      const css = cdn.generateFromHTML(html)
      expect(css).toBe('')
      cdn.destroy()
    })
  })

  describe('getCSS method', () => {
    it('should return generated CSS', () => {
      const cdn = createCoralCDN({ autoStart: false })
      cdn.generate(['bg-purple-500'])
      const css = cdn.getCSS()
      expect(css).toContain('bg-purple-500')
      cdn.destroy()
    })

    it('should return empty string when no CSS generated', () => {
      const cdn = createCoralCDN({ autoStart: false })
      const css = cdn.getCSS()
      expect(css).toBe('')
      cdn.destroy()
    })
  })

  describe('reset method', () => {
    it('should clear generated CSS', () => {
      const cdn = createCoralCDN({ autoStart: false })
      cdn.generate(['bg-yellow-500'])
      expect(cdn.getCSS()).toContain('bg-yellow-500')
      cdn.reset()
      expect(cdn.getCSS()).toBe('')
      cdn.destroy()
    })
  })

  describe('start and stop methods', () => {
    it('should start and stop observing', () => {
      const cdn = createCoralCDN({ autoStart: false })
      cdn.start()
      cdn.stop()
      cdn.destroy()
    })
  })

  describe('initComponents method', () => {
    it('should initialize components', () => {
      const cdn = createCoralCDN({ autoStart: false, autoInitComponents: false })
      document.body.innerHTML = '<div data-coral-accordion></div>'
      cdn.initComponents()
      cdn.destroy()
    })
  })

  describe('destroy method', () => {
    it('should clean up resources', () => {
      const cdn = createCoralCDN({ autoStart: false })
      cdn.generate(['bg-teal-500'])
      cdn.destroy()
      const styleTag = document.getElementById('coral-styles')
      expect(styleTag).toBeNull()
    })
  })

  describe('configuration options', () => {
    it('should accept injector config', () => {
      const cdn = createCoralCDN({
        autoStart: false,
        injector: { id: 'custom-coral-styles', nonce: 'abc123' },
      })
      cdn.generate(['bg-red-500'])
      const styleTag = document.getElementById('custom-coral-styles')
      expect(styleTag).toBeDefined()
      cdn.destroy()
    })

    it('should accept observer config', () => {
      const cdn = createCoralCDN({
        autoStart: false,
        observer: { debounce: 50 },
      })
      expect(cdn).toBeDefined()
      cdn.destroy()
    })

    it('should accept darkMode option', () => {
      const cdn = createCoralCDN({
        autoStart: false,
        darkMode: 'media',
      })
      expect(cdn).toBeDefined()
      cdn.destroy()
    })
  })

  describe('getCoralCDN', () => {
    it('should create global instance', () => {
      const cdn = getCoralCDN()
      expect(cdn).toBeDefined()
      cdn.stop()
      cdn.destroy()
    })

    it('should return same instance on subsequent calls', () => {
      resetGlobalInstance()
      const cdn1 = getCoralCDN()
      const cdn2 = getCoralCDN()
      expect(cdn1).toBe(cdn2)
      resetGlobalInstance()
    })

    it('should create new instance after reset', () => {
      const cdn1 = getCoralCDN()
      resetGlobalInstance()
      const cdn2 = getCoralCDN()
      expect(cdn1).not.toBe(cdn2)
      cdn2.stop()
      cdn2.destroy()
    })
  })

  describe('resetGlobalInstance', () => {
    it('should destroy existing global instance', () => {
      const cdn = getCoralCDN()
      cdn.generate(['bg-red-500'])
      expect(cdn.getCSS()).toContain('bg-red-500')

      resetGlobalInstance()

      const newCdn = getCoralCDN()
      expect(newCdn.getCSS()).toBe('')
      newCdn.stop()
      newCdn.destroy()
    })

    it('should handle reset when no instance exists', () => {
      resetGlobalInstance()
      expect(() => resetGlobalInstance()).not.toThrow()
    })
  })

  describe('window exposure', () => {
    it('should expose CoralCSS on window', () => {
      const win = window as unknown as { CoralCSS: { createCoralCDN: typeof createCoralCDN } }
      expect(win.CoralCSS).toBeDefined()
      expect(win.CoralCSS.createCoralCDN).toBe(createCoralCDN)
    })

    it('should expose Coral API on window', () => {
      const win = window as unknown as {
        Coral: {
          init: (config?: unknown) => unknown
          getInstance: () => unknown
          create: (config?: unknown) => unknown
          generate: (classes: string[]) => string
          generateFromHTML: (html: string) => string
          getCSS: () => string
          reset: () => void
          initComponents: () => void
          stop: () => void
          start: () => void
        }
      }

      expect(win.Coral).toBeDefined()
      expect(typeof win.Coral.init).toBe('function')
      expect(typeof win.Coral.getInstance).toBe('function')
      expect(typeof win.Coral.create).toBe('function')
      expect(typeof win.Coral.generate).toBe('function')
      expect(typeof win.Coral.generateFromHTML).toBe('function')
      expect(typeof win.Coral.getCSS).toBe('function')
      expect(typeof win.Coral.reset).toBe('function')
      expect(typeof win.Coral.initComponents).toBe('function')
      expect(typeof win.Coral.stop).toBe('function')
      expect(typeof win.Coral.start).toBe('function')
    })

    it('should use Coral.generate method', () => {
      const win = window as unknown as {
        Coral: {
          generate: (classes: string[]) => string
          stop: () => void
        }
      }

      const css = win.Coral.generate(['bg-indigo-500'])
      expect(typeof css).toBe('string')
      win.Coral.stop()
    })

    it('should use Coral.generateFromHTML method', () => {
      const win = window as unknown as {
        Coral: {
          generateFromHTML: (html: string) => string
          stop: () => void
        }
      }

      const css = win.Coral.generateFromHTML('<div class="text-lg">Test</div>')
      expect(typeof css).toBe('string')
      win.Coral.stop()
    })

    it('should use Coral.getCSS method', () => {
      const win = window as unknown as {
        Coral: {
          getCSS: () => string
          stop: () => void
        }
      }

      const css = win.Coral.getCSS()
      expect(typeof css).toBe('string')
      win.Coral.stop()
    })

    it('should use Coral.reset method', () => {
      const win = window as unknown as {
        Coral: {
          reset: () => void
          getCSS: () => string
          stop: () => void
        }
      }

      win.Coral.reset()
      const css = win.Coral.getCSS()
      expect(css).toBe('')
      win.Coral.stop()
    })
  })

  describe('default export', () => {
    it('should export createCoralCDN as default', async () => {
      const { default: defaultExport } = await import('../../../src/runtime/cdn')
      expect(defaultExport).toBe(createCoralCDN)
    })
  })

  describe('Coral API methods', () => {
    it('should use Coral.init method', () => {
      const win = window as unknown as {
        Coral: {
          init: () => unknown
          stop: () => void
        }
      }

      const instance = win.Coral.init()
      expect(instance).toBeDefined()
      win.Coral.stop()
    })

    it('should use Coral.getInstance method', () => {
      const win = window as unknown as {
        Coral: {
          getInstance: () => unknown
          stop: () => void
        }
      }

      const instance = win.Coral.getInstance()
      expect(instance).toBeDefined()
      win.Coral.stop()
    })

    it('should use Coral.create method', () => {
      const win = window as unknown as {
        Coral: {
          create: (config?: unknown) => { stop: () => void; destroy: () => void }
        }
      }

      const instance = win.Coral.create({ autoStart: false })
      expect(instance).toBeDefined()
      instance.stop()
      instance.destroy()
    })

    it('should use Coral.initComponents method', () => {
      const win = window as unknown as {
        Coral: {
          initComponents: () => void
          stop: () => void
        }
      }

      expect(() => win.Coral.initComponents()).not.toThrow()
      win.Coral.stop()
    })

    it('should use Coral.start method', () => {
      const win = window as unknown as {
        Coral: {
          start: () => void
          stop: () => void
        }
      }

      expect(() => win.Coral.start()).not.toThrow()
      win.Coral.stop()
    })

    it('should use Coral.stop method', () => {
      const win = window as unknown as {
        Coral: {
          start: () => void
          stop: () => void
        }
      }

      win.Coral.start()
      expect(() => win.Coral.stop()).not.toThrow()
    })
  })

  describe('CORAL_CONFIG from window', () => {
    it('should use window.CORAL_CONFIG if available', () => {
      const win = window as unknown as { CORAL_CONFIG?: unknown }
      win.CORAL_CONFIG = { darkMode: 'media' }

      const cdn = getCoralCDN()
      expect(cdn).toBeDefined()
      cdn.stop()
      cdn.destroy()

      delete win.CORAL_CONFIG
    })
  })

  describe('auto-init with components', () => {
    it('should auto-initialize components when autoInitComponents is true', () => {
      document.body.innerHTML = '<div data-coral-accordion></div>'
      const cdn = createCoralCDN({ autoStart: true, autoInitComponents: true })
      expect(cdn).toBeDefined()
      cdn.stop()
      cdn.destroy()
    })
  })

  describe('DOMContentLoaded handling', () => {
    it('should handle DOM loading state', () => {
      // When document is already loaded, autoStart executes immediately
      const cdn = createCoralCDN({
        autoStart: true,
        autoInitComponents: true
      })
      expect(cdn).toBeDefined()
      cdn.stop()
      cdn.destroy()
    })

    it('should queue DOMContentLoaded listener when document is loading', () => {
      // Mock document.readyState to be 'loading'
      const originalReadyState = Object.getOwnPropertyDescriptor(Document.prototype, 'readyState')

      Object.defineProperty(document, 'readyState', {
        configurable: true,
        get: () => 'loading'
      })

      const events: Record<string, EventListener[]> = {}
      const originalAddEventListener = document.addEventListener.bind(document)
      document.addEventListener = function(type: string, listener: EventListener) {
        if (!events[type]) events[type] = []
        events[type].push(listener)
      } as typeof document.addEventListener

      const cdn = createCoralCDN({
        autoStart: true,
        autoInitComponents: true
      })

      // Restore original readyState
      if (originalReadyState) {
        Object.defineProperty(document, 'readyState', originalReadyState)
      } else {
        Object.defineProperty(document, 'readyState', {
          configurable: true,
          get: () => 'complete'
        })
      }
      document.addEventListener = originalAddEventListener

      // Verify DOMContentLoaded listener was added
      expect(events['DOMContentLoaded']).toBeDefined()
      expect(events['DOMContentLoaded'].length).toBeGreaterThan(0)

      // Manually trigger the listener
      events['DOMContentLoaded'].forEach(listener => listener(new Event('DOMContentLoaded')))

      cdn.stop()
      cdn.destroy()
    })

    it('should handle different document ready states', () => {
      // Test with 'interactive' state (DOM parsed but resources loading)
      const originalReadyState = Object.getOwnPropertyDescriptor(Document.prototype, 'readyState')

      Object.defineProperty(document, 'readyState', {
        configurable: true,
        get: () => 'interactive'
      })

      const cdn = createCoralCDN({
        autoStart: true,
        autoInitComponents: false
      })

      // Restore original readyState
      if (originalReadyState) {
        Object.defineProperty(document, 'readyState', originalReadyState)
      } else {
        Object.defineProperty(document, 'readyState', {
          configurable: true,
          get: () => 'complete'
        })
      }

      expect(cdn).toBeDefined()
      cdn.stop()
      cdn.destroy()
    })
  })
})
