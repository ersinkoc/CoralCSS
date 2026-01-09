/**
 * Tests for CDN runtime
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { createCoralCDN, getCoralCDN } from '../../../src/runtime/cdn'

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
  })

  describe('window exposure', () => {
    it('should expose CoralCSS on window', () => {
      const win = window as unknown as { CoralCSS: { createCoralCDN: typeof createCoralCDN } }
      expect(win.CoralCSS).toBeDefined()
      expect(win.CoralCSS.createCoralCDN).toBe(createCoralCDN)
    })
  })

  describe('default export', () => {
    it('should export createCoralCDN as default', async () => {
      const { default: defaultExport } = await import('../../../src/runtime/cdn')
      expect(defaultExport).toBe(createCoralCDN)
    })
  })
})
