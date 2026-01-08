/**
 * Style Injector Tests
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { StyleInjector, createInjector } from '../../../src/runtime/injector'

describe('StyleInjector', () => {
  beforeEach(() => {
    // Clean up any existing style elements
    document.querySelectorAll('[data-coral]').forEach((el) => el.remove())
  })

  afterEach(() => {
    vi.clearAllMocks()
    // Clean up any style elements
    document.querySelectorAll('[data-coral]').forEach((el) => el.remove())
  })

  describe('initialization', () => {
    it('should create injector with default config', () => {
      const injector = new StyleInjector()

      expect(injector).toBeDefined()
      expect(injector.getStyleElement()).toBeNull() // Not initialized yet
    })

    it('should create injector with custom config', () => {
      const injector = new StyleInjector({
        id: 'custom-styles',
        target: 'body',
        position: 'prepend',
      })

      expect(injector).toBeDefined()
    })

    it('should create injector via factory function', () => {
      const injector = createInjector()

      expect(injector).toBeDefined()
    })

    it('should init style element in head by default', () => {
      const injector = new StyleInjector()
      injector.init()

      const styleEl = document.getElementById('coral-styles')
      expect(styleEl).not.toBeNull()
      expect(styleEl?.parentElement).toBe(document.head)
    })

    it('should init style element in body when configured', () => {
      const injector = new StyleInjector({ target: 'body' })
      injector.init()

      const styleEl = document.getElementById('coral-styles')
      expect(styleEl).not.toBeNull()
      expect(styleEl?.parentElement).toBe(document.body)
    })

    it('should init style element in custom container', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      const injector = new StyleInjector({ container })
      injector.init()

      const styleEl = document.getElementById('coral-styles')
      expect(styleEl).not.toBeNull()
      expect(styleEl?.parentElement).toBe(container)

      container.remove()
    })

    it('should init style element in custom HTMLElement target', () => {
      const customTarget = document.createElement('div')
      document.body.appendChild(customTarget)

      const injector = new StyleInjector({ target: customTarget })
      injector.init()

      const styleEl = document.getElementById('coral-styles')
      expect(styleEl).not.toBeNull()
      expect(styleEl?.parentElement).toBe(customTarget)

      customTarget.remove()
    })

    it('should prepend style element when configured', () => {
      // Add an existing element to head
      const existingEl = document.createElement('meta')
      document.head.appendChild(existingEl)

      const injector = new StyleInjector({ position: 'prepend' })
      injector.init()

      const styleEl = document.getElementById('coral-styles')
      expect(styleEl).not.toBeNull()
      expect(document.head.firstChild).toBe(styleEl)

      existingEl.remove()
    })

    it('should use custom ID', () => {
      const injector = new StyleInjector({ id: 'my-custom-styles' })
      injector.init()

      const styleEl = document.getElementById('my-custom-styles')
      expect(styleEl).not.toBeNull()
    })

    it('should set data-coral attribute', () => {
      const injector = new StyleInjector()
      injector.init()

      const styleEl = document.getElementById('coral-styles')
      expect(styleEl?.hasAttribute('data-coral')).toBe(true)
    })

    it('should set nonce when configured', () => {
      const injector = new StyleInjector({ nonce: 'abc123' })
      injector.init()

      const styleEl = document.getElementById('coral-styles')
      expect(styleEl?.nonce).toBe('abc123')
    })

    it('should reuse existing style element with same ID', () => {
      const existingStyle = document.createElement('style')
      existingStyle.id = 'coral-styles'
      existingStyle.textContent = '.existing { color: red; }'
      document.head.appendChild(existingStyle)

      const injector = new StyleInjector()
      injector.init()

      const styleEl = injector.getStyleElement()
      expect(styleEl).toBe(existingStyle)
    })

    it('should not init twice', () => {
      const injector = new StyleInjector()
      injector.init()
      injector.init() // Second init should be no-op

      const styleElements = document.querySelectorAll('#coral-styles')
      expect(styleElements.length).toBe(1)
    })
  })

  describe('inject', () => {
    it('should inject CSS', () => {
      const injector = new StyleInjector()
      injector.inject('.test { color: red; }')

      const styleEl = document.getElementById('coral-styles')
      expect(styleEl?.textContent).toBe('.test { color: red; }')
    })

    it('should auto-init when injecting', () => {
      const injector = new StyleInjector()

      expect(injector.getStyleElement()).toBeNull()
      injector.inject('.test { color: red; }')
      expect(injector.getStyleElement()).not.toBeNull()
    })

    it('should replace existing CSS', () => {
      const injector = new StyleInjector()
      injector.inject('.first { color: red; }')
      injector.inject('.second { color: blue; }')

      const styleEl = document.getElementById('coral-styles')
      expect(styleEl?.textContent).toBe('.second { color: blue; }')
    })
  })

  describe('append', () => {
    it('should append CSS to existing', () => {
      const injector = new StyleInjector()
      injector.inject('.first { color: red; }')
      injector.append('.second { color: blue; }')

      const css = injector.getCSS()
      expect(css).toContain('.first { color: red; }')
      expect(css).toContain('.second { color: blue; }')
    })

    it('should auto-init when appending', () => {
      const injector = new StyleInjector()

      expect(injector.getStyleElement()).toBeNull()
      injector.append('.test { color: red; }')
      expect(injector.getStyleElement()).not.toBeNull()
    })
  })

  describe('addClass', () => {
    it('should add CSS for a class', () => {
      const injector = new StyleInjector()
      injector.addClass('bg-red-500', '.bg-red-500 { background-color: red; }')

      expect(injector.hasClass('bg-red-500')).toBe(true)
      expect(injector.getCSS()).toContain('.bg-red-500')
    })

    it('should not add duplicate class', () => {
      const injector = new StyleInjector()
      injector.addClass('bg-red-500', '.bg-red-500 { background-color: red; }')
      injector.addClass('bg-red-500', '.bg-red-500 { background-color: blue; }') // Different CSS

      // Should still have original CSS
      const css = injector.getCSS()
      expect(css.match(/\.bg-red-500/g)?.length).toBe(1)
    })
  })

  describe('addClasses', () => {
    it('should add multiple classes', () => {
      const injector = new StyleInjector()
      const classMap = new Map([
        ['bg-red-500', '.bg-red-500 { background-color: red; }'],
        ['text-white', '.text-white { color: white; }'],
      ])

      injector.addClasses(classMap)

      expect(injector.hasClass('bg-red-500')).toBe(true)
      expect(injector.hasClass('text-white')).toBe(true)
    })

    it('should skip already existing classes', () => {
      const injector = new StyleInjector()
      injector.addClass('bg-red-500', '.bg-red-500 { background-color: red; }')

      const classMap = new Map([
        ['bg-red-500', '.bg-red-500 { background-color: blue; }'], // Already exists
        ['text-white', '.text-white { color: white; }'],
      ])

      injector.addClasses(classMap)

      // Should have original CSS for bg-red-500
      expect(injector.getCSS()).toContain('background-color: red')
    })

    it('should not append if no new classes', () => {
      const injector = new StyleInjector()
      injector.addClass('bg-red-500', '.bg-red-500 { background-color: red; }')

      const initialCSS = injector.getCSS()

      const classMap = new Map([
        ['bg-red-500', '.bg-red-500 { background-color: blue; }'],
      ])

      injector.addClasses(classMap)

      // CSS should be the same (no extra newlines)
      expect(injector.getCSS()).toBe(initialCSS)
    })
  })

  describe('removeClass', () => {
    it('should remove CSS for a class', () => {
      const injector = new StyleInjector()
      injector.addClass('bg-red-500', '.bg-red-500 { background-color: red; }')
      injector.addClass('text-white', '.text-white { color: white; }')

      expect(injector.hasClass('bg-red-500')).toBe(true)

      injector.removeClass('bg-red-500')

      expect(injector.hasClass('bg-red-500')).toBe(false)
      expect(injector.getCSS()).not.toContain('.bg-red-500')
      expect(injector.getCSS()).toContain('.text-white')
    })

    it('should do nothing for non-existent class', () => {
      const injector = new StyleInjector()
      injector.addClass('bg-red-500', '.bg-red-500 { background-color: red; }')

      const initialCSS = injector.getCSS()

      injector.removeClass('non-existent')

      expect(injector.getCSS()).toBe(initialCSS)
    })
  })

  describe('clear', () => {
    it('should clear all CSS', () => {
      const injector = new StyleInjector()
      injector.addClass('bg-red-500', '.bg-red-500 { background-color: red; }')
      injector.addClass('text-white', '.text-white { color: white; }')

      injector.clear()

      expect(injector.getCSS()).toBe('')
      expect(injector.hasClass('bg-red-500')).toBe(false)
      expect(injector.hasClass('text-white')).toBe(false)

      const styleEl = document.getElementById('coral-styles')
      expect(styleEl?.textContent).toBe('')
    })
  })

  describe('getCSS', () => {
    it('should return current CSS', () => {
      const injector = new StyleInjector()
      injector.inject('.test { color: red; }')

      expect(injector.getCSS()).toBe('.test { color: red; }')
    })

    it('should return empty string when no CSS', () => {
      const injector = new StyleInjector()

      expect(injector.getCSS()).toBe('')
    })
  })

  describe('getStyleElement', () => {
    it('should return style element after init', () => {
      const injector = new StyleInjector()
      injector.init()

      const styleEl = injector.getStyleElement()
      expect(styleEl).not.toBeNull()
      expect(styleEl?.id).toBe('coral-styles')
    })

    it('should return null before init', () => {
      const injector = new StyleInjector()

      expect(injector.getStyleElement()).toBeNull()
    })
  })

  describe('hasClass', () => {
    it('should return true for added class', () => {
      const injector = new StyleInjector()
      injector.addClass('bg-red-500', '.bg-red-500 {}')

      expect(injector.hasClass('bg-red-500')).toBe(true)
    })

    it('should return false for non-existent class', () => {
      const injector = new StyleInjector()

      expect(injector.hasClass('bg-red-500')).toBe(false)
    })
  })

  describe('getClassNames', () => {
    it('should return all class names', () => {
      const injector = new StyleInjector()
      injector.addClass('bg-red-500', '.bg-red-500 {}')
      injector.addClass('text-white', '.text-white {}')

      const classNames = injector.getClassNames()
      expect(classNames).toContain('bg-red-500')
      expect(classNames).toContain('text-white')
    })

    it('should return empty array when no classes', () => {
      const injector = new StyleInjector()

      expect(injector.getClassNames()).toEqual([])
    })
  })

  describe('destroy', () => {
    it('should remove style element from DOM', () => {
      const injector = new StyleInjector()
      injector.init()

      expect(document.getElementById('coral-styles')).not.toBeNull()

      injector.destroy()

      expect(document.getElementById('coral-styles')).toBeNull()
    })

    it('should clear CSS and class map', () => {
      const injector = new StyleInjector()
      injector.addClass('bg-red-500', '.bg-red-500 {}')

      injector.destroy()

      expect(injector.getCSS()).toBe('')
      expect(injector.getClassNames()).toEqual([])
      expect(injector.getStyleElement()).toBeNull()
    })
  })
})
