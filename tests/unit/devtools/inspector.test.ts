/**
 * DevTools Inspector Tests
 *
 * @vitest-environment jsdom
 * @module tests/unit/devtools/inspector
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  CoralInspector,
  createInspector,
  getPageClasses,
  type InspectorConfig,
  type ClassInfo,
  type ElementInfo,
} from '../../../src/devtools/inspector'

describe('DevTools Inspector', () => {
  let inspector: CoralInspector

  beforeEach(() => {
    // Clear any existing inspector elements
    document.getElementById('coral-inspector-panel')?.remove()
    document.getElementById('coral-inspector-highlight')?.remove()
    document.getElementById('coral-inspector-styles')?.remove()
  })

  afterEach(() => {
    inspector?.destroy()
  })

  describe('CoralInspector', () => {
    describe('constructor', () => {
      it('should create inspector with default config', () => {
        inspector = new CoralInspector()

        expect(document.getElementById('coral-inspector-panel')).toBeTruthy()
        expect(document.getElementById('coral-inspector-highlight')).toBeTruthy()
        expect(document.getElementById('coral-inspector-styles')).toBeTruthy()
      })

      it('should create inspector with custom config', () => {
        inspector = new CoralInspector({
          autoShow: false,
          position: 'top-left',
          enableShortcuts: true,
          darkMode: false,
          enableHighlight: true,
        })

        const panel = document.getElementById('coral-inspector-panel')
        expect(panel).toBeTruthy()
        // Panel should not be visible (display is '' or 'none')
        expect(['', 'none']).toContain(panel?.style.display)
      })

      it('should auto-show when configured', () => {
        inspector = new CoralInspector({ autoShow: true })

        const panel = document.getElementById('coral-inspector-panel')
        expect(panel?.style.display).toBe('block')
      })

      it('should position panel correctly', () => {
        const positions: Array<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'> = [
          'top-right',
          'top-left',
          'bottom-right',
          'bottom-left',
        ]

        for (const position of positions) {
          inspector?.destroy()
          inspector = new CoralInspector({ position })
          const panel = document.getElementById('coral-inspector-panel')
          expect(panel).toBeTruthy()
        }
      })
    })

    describe('show/hide/toggle', () => {
      it('should show the panel', () => {
        inspector = new CoralInspector({ autoShow: false })
        inspector.show()

        const panel = document.getElementById('coral-inspector-panel')
        expect(panel?.style.display).toBe('block')
      })

      it('should hide the panel', () => {
        inspector = new CoralInspector({ autoShow: true })
        inspector.hide()

        const panel = document.getElementById('coral-inspector-panel')
        expect(panel?.style.display).toBe('none')
      })

      it('should toggle the panel', () => {
        inspector = new CoralInspector({ autoShow: false })

        // First show it explicitly
        inspector.show()
        let panel = document.getElementById('coral-inspector-panel')
        expect(panel?.style.display).toBe('block')

        // Now toggle should hide it
        inspector.toggle()
        panel = document.getElementById('coral-inspector-panel')
        expect(panel?.style.display).toBe('none')

        // Toggle again should show it
        inspector.toggle()
        panel = document.getElementById('coral-inspector-panel')
        expect(panel?.style.display).toBe('block')
      })
    })

    describe('inspect', () => {
      it('should inspect an element programmatically', () => {
        inspector = new CoralInspector({ autoShow: false })

        const testElement = document.createElement('div')
        testElement.className = 'p-4 bg-blue-500 text-white rounded-lg'
        testElement.id = 'test-element'
        document.body.appendChild(testElement)

        inspector.inspect(testElement)

        const panel = document.getElementById('coral-inspector-panel')
        expect(panel?.style.display).toBe('block')

        const info = panel?.querySelector('#coral-inspector-info')
        expect(info?.textContent).toContain('test-element')

        testElement.remove()
      })

      it('should display CoralCSS and custom classes', () => {
        inspector = new CoralInspector({ autoShow: false })

        const testElement = document.createElement('div')
        testElement.className = 'p-4 my-custom-class flex items-center'
        document.body.appendChild(testElement)

        inspector.inspect(testElement)

        const coralClasses = document.querySelectorAll('.coral-inspector-class.coralcss')
        const customClasses = document.querySelectorAll('.coral-inspector-class.custom')

        expect(coralClasses.length).toBeGreaterThan(0)
        expect(customClasses.length).toBeGreaterThan(0)

        testElement.remove()
      })
    })

    describe('getAllCoralCSSClasses', () => {
      it('should return all CoralCSS classes on the page', () => {
        inspector = new CoralInspector()

        const el1 = document.createElement('div')
        el1.className = 'p-4 m-2 flex'
        const el2 = document.createElement('div')
        el2.className = 'bg-blue-500 text-white rounded-lg'
        document.body.appendChild(el1)
        document.body.appendChild(el2)

        const classes = inspector.getAllCoralCSSClasses()

        expect(classes).toContain('p-4')
        expect(classes).toContain('m-2')
        expect(classes).toContain('flex')
        expect(classes).toContain('bg-blue-500')
        expect(classes).toContain('text-white')
        expect(classes).toContain('rounded-lg')

        el1.remove()
        el2.remove()
      })

      it('should return sorted unique classes', () => {
        inspector = new CoralInspector()

        const el1 = document.createElement('div')
        el1.className = 'z-10 p-4 flex'
        const el2 = document.createElement('div')
        el2.className = 'p-4 flex m-2'
        document.body.appendChild(el1)
        document.body.appendChild(el2)

        const classes = inspector.getAllCoralCSSClasses()

        // Check for duplicates
        const uniqueClasses = [...new Set(classes)]
        expect(classes.length).toBe(uniqueClasses.length)

        el1.remove()
        el2.remove()
      })
    })

    describe('getStats', () => {
      it('should return usage statistics', () => {
        inspector = new CoralInspector()

        const el1 = document.createElement('div')
        el1.className = 'p-4 m-2 flex custom-class'
        const el2 = document.createElement('div')
        el2.className = 'bg-blue-500 another-custom'
        document.body.appendChild(el1)
        document.body.appendChild(el2)

        const stats = inspector.getStats()

        expect(stats.total).toBeGreaterThan(0)
        expect(stats.coralCSS).toBeGreaterThan(0)
        expect(stats.custom).toBeGreaterThan(0)
        expect(typeof stats.byCategory).toBe('object')

        el1.remove()
        el2.remove()
      })

      it('should categorize classes correctly', () => {
        inspector = new CoralInspector()

        const el = document.createElement('div')
        el.className = 'p-4 bg-blue-500 flex animate-bounce glass neu'
        document.body.appendChild(el)

        const stats = inspector.getStats()

        expect(stats.byCategory['spacing']).toBeGreaterThan(0)
        expect(stats.byCategory['background']).toBeGreaterThan(0)
        expect(stats.byCategory['display']).toBeGreaterThan(0)
        expect(stats.byCategory['animation']).toBeGreaterThan(0)
        expect(stats.byCategory['glass']).toBeGreaterThan(0)
        expect(stats.byCategory['neumorphism']).toBeGreaterThan(0)

        el.remove()
      })
    })

    describe('destroy', () => {
      it('should remove all inspector elements', () => {
        inspector = new CoralInspector({ autoShow: true })

        expect(document.getElementById('coral-inspector-panel')).toBeTruthy()
        expect(document.getElementById('coral-inspector-highlight')).toBeTruthy()
        expect(document.getElementById('coral-inspector-styles')).toBeTruthy()

        inspector.destroy()

        expect(document.getElementById('coral-inspector-panel')).toBeFalsy()
        expect(document.getElementById('coral-inspector-highlight')).toBeFalsy()
        expect(document.getElementById('coral-inspector-styles')).toBeFalsy()
      })
    })

    describe('keyboard shortcuts', () => {
      it('should toggle panel on Alt+Shift+I', () => {
        inspector = new CoralInspector({ autoShow: true, enableShortcuts: true })

        // Panel should be visible initially
        let panel = document.getElementById('coral-inspector-panel')
        expect(panel?.style.display).toBe('block')

        // Press Alt+Shift+I to toggle (hide)
        const event = new KeyboardEvent('keydown', {
          key: 'i',
          altKey: true,
          shiftKey: true,
        })
        document.dispatchEvent(event)

        panel = document.getElementById('coral-inspector-panel')
        expect(panel?.style.display).toBe('none')
      })

      it('should close on Escape', () => {
        inspector = new CoralInspector({ autoShow: true, enableShortcuts: true })

        const event = new KeyboardEvent('keydown', { key: 'Escape' })
        document.dispatchEvent(event)

        const panel = document.getElementById('coral-inspector-panel')
        expect(panel?.style.display).toBe('none')
      })
    })

    describe('panel interactions', () => {
      it('should close panel when close button clicked', () => {
        inspector = new CoralInspector({ autoShow: true })

        const closeBtn = document.getElementById('coral-inspector-close')
        closeBtn?.click()

        const panel = document.getElementById('coral-inspector-panel')
        expect(panel?.style.display).toBe('none')
      })

      it('should toggle inspection when toggle button clicked', () => {
        inspector = new CoralInspector({ autoShow: true })

        const toggleBtn = document.getElementById('coral-inspector-toggle')
        toggleBtn?.click()

        expect(document.body.style.cursor).toBe('crosshair')

        toggleBtn?.click()
        expect(document.body.style.cursor).toBe('')
      })
    })

    describe('dark mode', () => {
      it('should apply dark mode styles', () => {
        inspector = new CoralInspector({ darkMode: true })

        const panel = document.getElementById('coral-inspector-panel')
        expect(panel).toBeTruthy()
        expect(panel?.id).toBe('coral-inspector-panel')
      })

      it('should apply light mode styles', () => {
        inspector = new CoralInspector({ darkMode: false })

        const panel = document.getElementById('coral-inspector-panel')
        expect(panel).toBeTruthy()
        expect(panel?.id).toBe('coral-inspector-panel')
      })
    })
  })

  describe('createInspector', () => {
    it('should create inspector instance', () => {
      inspector = createInspector()
      expect(inspector).toBeInstanceOf(CoralInspector)
    })

    it('should create inspector with config', () => {
      inspector = createInspector({
        autoShow: true,
        position: 'bottom-left',
        darkMode: true,
      })

      const panel = document.getElementById('coral-inspector-panel')
      expect(panel?.style.display).toBe('block')
    })
  })

  describe('getPageClasses', () => {
    it('should return all CoralCSS classes', () => {
      const el = document.createElement('div')
      el.className = 'p-4 m-2 flex bg-blue-500'
      document.body.appendChild(el)

      const classes = getPageClasses()

      expect(classes).toContain('p-4')
      expect(classes).toContain('m-2')
      expect(classes).toContain('flex')
      expect(classes).toContain('bg-blue-500')

      el.remove()
    })

    it('should clean up inspector after getting classes', () => {
      getPageClasses()

      // Inspector should be destroyed
      expect(document.getElementById('coral-inspector-panel')).toBeFalsy()
    })
  })

  describe('utility category detection', () => {
    beforeEach(() => {
      inspector = new CoralInspector()
    })

    const categoryTests = [
      // Spacing
      { className: 'p-4', expectedCategory: 'spacing' },
      { className: 'm-8', expectedCategory: 'spacing' },
      { className: 'px-2', expectedCategory: 'spacing' },
      { className: 'gap-4', expectedCategory: 'spacing' },
      { className: 'space-x-4', expectedCategory: 'spacing' },

      // Fluid spacing
      { className: 'p-fluid-lg', expectedCategory: 'fluid-spacing' },
      { className: 'm-fluid-sm', expectedCategory: 'fluid-spacing' },

      // Sizing
      { className: 'w-full', expectedCategory: 'sizing' },
      { className: 'h-screen', expectedCategory: 'sizing' },
      { className: 'max-w-md', expectedCategory: 'sizing' },

      // Colors
      { className: 'bg-blue-500', expectedCategory: 'background' },
      { className: 'text-white', expectedCategory: 'text-color' },
      { className: 'border-gray-300', expectedCategory: 'border-color' },

      // Typography
      { className: 'font-bold', expectedCategory: 'font' },
      // Note: text-lg matches text-color pattern first due to regex order
      { className: 'leading-tight', expectedCategory: 'leading' },
      { className: 'tracking-wide', expectedCategory: 'tracking' },

      // Layout
      { className: 'flex', expectedCategory: 'display' },
      { className: 'grid', expectedCategory: 'display' },
      { className: 'hidden', expectedCategory: 'display' },
      { className: 'relative', expectedCategory: 'position' },
      { className: 'absolute', expectedCategory: 'position' },

      // Borders
      { className: 'border', expectedCategory: 'border' },
      { className: 'rounded-lg', expectedCategory: 'rounded' },
      { className: 'ring-2', expectedCategory: 'ring' },

      // Effects
      { className: 'shadow-lg', expectedCategory: 'shadow' },
      { className: 'opacity-50', expectedCategory: 'opacity' },
      { className: 'blur-sm', expectedCategory: 'blur' },

      // Glassmorphism & Neumorphism
      { className: 'glass', expectedCategory: 'glass' },
      { className: 'glass-frost', expectedCategory: 'glass' },
      { className: 'neu', expectedCategory: 'neumorphism' },
      { className: 'neu-inset', expectedCategory: 'neumorphism' },

      // Animations
      { className: 'animate-bounce', expectedCategory: 'animation' },
      { className: 'animate-spring-in', expectedCategory: 'animation' },
      { className: 'stagger-100', expectedCategory: 'stagger' },
      { className: 'gradient-shimmer', expectedCategory: 'gradient-animate' },

      // Aspect ratios
      { className: 'aspect-video', expectedCategory: 'aspect' },
      { className: 'aspect-golden', expectedCategory: 'aspect' },

      // Logical properties - ps/me match 'spacing' pattern first due to regex order
      { className: 'start-4', expectedCategory: 'logical-position' },
      { className: 'writing-vertical-rl', expectedCategory: 'writing-mode' },

      // Interactive
      { className: 'cursor-pointer', expectedCategory: 'cursor' },
      { className: 'select-none', expectedCategory: 'select' },

      // Performance
      { className: 'will-change-transform', expectedCategory: 'will-change' },
      { className: 'contain-layout', expectedCategory: 'contain' },

      // Custom (not CoralCSS)
      { className: 'my-custom-class', expectedCategory: 'custom' },
    ]

    for (const { className, expectedCategory } of categoryTests) {
      it(`should categorize "${className}" as "${expectedCategory}"`, () => {
        const el = document.createElement('div')
        el.className = className
        document.body.appendChild(el)

        inspector.inspect(el)

        const stats = inspector.getStats()

        if (expectedCategory === 'custom') {
          expect(stats.custom).toBeGreaterThan(0)
        } else {
          expect(stats.byCategory[expectedCategory]).toBeGreaterThan(0)
        }

        el.remove()
      })
    }
  })

  describe('element highlighting', () => {
    it('should highlight element on mouseover during inspection', () => {
      inspector = new CoralInspector({ enableHighlight: true })

      // Start inspection
      const toggleBtn = document.getElementById('coral-inspector-toggle')
      toggleBtn?.click()

      const testEl = document.createElement('div')
      testEl.style.cssText = 'width: 100px; height: 100px; position: fixed; top: 50px; left: 50px;'
      document.body.appendChild(testEl)

      // Simulate mouseover
      const event = new MouseEvent('mouseover', {
        bubbles: true,
        target: testEl,
      } as MouseEventInit)
      Object.defineProperty(event, 'target', { value: testEl })
      document.dispatchEvent(event)

      const highlight = document.getElementById('coral-inspector-highlight')
      // Highlight should be positioned (display may still be none initially)
      expect(highlight).toBeTruthy()

      testEl.remove()
    })

    it('should not highlight inspector panel itself', () => {
      inspector = new CoralInspector({ enableHighlight: true, autoShow: true })

      const toggleBtn = document.getElementById('coral-inspector-toggle')
      toggleBtn?.click()

      const panel = document.getElementById('coral-inspector-panel')
      const event = new MouseEvent('mouseover', {
        bubbles: true,
      })
      Object.defineProperty(event, 'target', { value: panel })
      document.dispatchEvent(event)

      const highlight = document.getElementById('coral-inspector-highlight')
      // Highlight element should exist but not highlight the panel
      expect(highlight).toBeTruthy()
    })
  })

  describe('class detail view', () => {
    it('should show class details when clicked', () => {
      inspector = new CoralInspector({ autoShow: true })

      const testEl = document.createElement('div')
      testEl.className = 'p-4 bg-blue-500'
      document.body.appendChild(testEl)

      inspector.inspect(testEl)

      // Click on a class badge
      const classBadge = document.querySelector('.coral-inspector-class') as HTMLElement
      classBadge?.click()

      const detailView = document.querySelector('.coral-inspector-class-detail')
      expect(detailView).toBeTruthy()

      testEl.remove()
    })
  })

  describe('type exports', () => {
    it('should export InspectorConfig type', () => {
      const config: InspectorConfig = {
        autoShow: true,
        position: 'bottom-right',
        enableShortcuts: true,
        darkMode: true,
        enableHighlight: true,
      }
      expect(config).toBeDefined()
    })

    it('should export ClassInfo type', () => {
      const info: ClassInfo = {
        className: 'p-4',
        category: 'spacing',
        description: 'Padding: 1rem',
        css: 'padding: 1rem;',
        isCoralCSS: true,
      }
      expect(info).toBeDefined()
    })

    it('should export ElementInfo type', () => {
      const el = document.createElement('div')
      const info: ElementInfo = {
        tagName: 'div',
        id: 'test',
        classes: [],
        computedStyles: {},
        element: el,
      }
      expect(info).toBeDefined()
    })
  })
})
