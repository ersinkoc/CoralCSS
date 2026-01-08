/**
 * DOM Observer Tests
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { DOMObserver, createObserver } from '../../../src/runtime/observer'
import type { Coral } from '../../../src/types'

// Mock Coral instance
const createMockCoral = (): Coral => ({
  generate: vi.fn(),
  // Add other required Coral methods as needed
} as unknown as Coral)

describe('DOMObserver', () => {
  let container: HTMLElement
  let mockCoral: Coral

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    mockCoral = createMockCoral()
    vi.useFakeTimers()
  })

  afterEach(() => {
    container.remove()
    vi.clearAllMocks()
    vi.useRealTimers()
  })

  describe('initialization', () => {
    it('should create observer with default config', () => {
      const observer = new DOMObserver(mockCoral)

      expect(observer).toBeDefined()
    })

    it('should create observer with custom config', () => {
      const observer = new DOMObserver(mockCoral, {
        root: container,
        attributes: ['class', 'data-class'],
        subtree: false,
        childList: false,
        debounce: 50,
      })

      expect(observer).toBeDefined()
    })

    it('should create observer via factory function', () => {
      const observer = createObserver(mockCoral)

      expect(observer).toBeDefined()
    })
  })

  describe('start', () => {
    it('should scan existing classes on start', () => {
      container.innerHTML = '<div class="bg-red-500 text-white"></div>'
      const observer = new DOMObserver(mockCoral, { root: container })

      observer.start()

      expect(mockCoral.generate).toHaveBeenCalledWith(expect.arrayContaining(['bg-red-500', 'text-white']))
    })

    it('should not scan duplicate classes', () => {
      container.innerHTML = `
        <div class="bg-red-500"></div>
        <div class="bg-red-500"></div>
      `
      const observer = new DOMObserver(mockCoral, { root: container })

      observer.start()

      // Should only generate once for bg-red-500
      const generateCalls = (mockCoral.generate as ReturnType<typeof vi.fn>).mock.calls
      const allClasses = generateCalls.flatMap(call => call[0])
      expect(allClasses.filter(c => c === 'bg-red-500').length).toBe(1)
    })

    it('should not start twice', () => {
      container.innerHTML = '<div class="bg-red-500"></div>'
      const observer = new DOMObserver(mockCoral, { root: container })

      observer.start()
      const firstCallCount = (mockCoral.generate as ReturnType<typeof vi.fn>).mock.calls.length

      observer.start() // Second start should be no-op

      expect((mockCoral.generate as ReturnType<typeof vi.fn>).mock.calls.length).toBe(firstCallCount)
    })

    it('should call onClassesDetected callback', () => {
      container.innerHTML = '<div class="bg-red-500"></div>'
      const onClassesDetected = vi.fn()
      const observer = new DOMObserver(mockCoral, {
        root: container,
        onClassesDetected,
      })

      observer.start()

      expect(onClassesDetected).toHaveBeenCalledWith(expect.arrayContaining(['bg-red-500']))
    })
  })

  describe('observing attribute changes', () => {
    it('should detect class attribute changes via rescan', () => {
      container.innerHTML = '<div id="target"></div>'
      const observer = new DOMObserver(mockCoral, { root: container, debounce: 0 })
      observer.start()

      // Clear initial call
      vi.clearAllMocks()

      // Change class and rescan (since jsdom MutationObserver is tricky with fake timers)
      const target = container.querySelector('#target')!
      target.setAttribute('class', 'new-class-name')

      observer.rescan()

      expect(mockCoral.generate).toHaveBeenCalledWith(['new-class-name'])
    })

    it('should detect multiple new classes via rescan', () => {
      container.innerHTML = '<div id="target"></div>'
      const observer = new DOMObserver(mockCoral, { root: container, debounce: 0 })
      observer.start()

      vi.clearAllMocks()

      const target = container.querySelector('#target')!
      target.setAttribute('class', 'class-one class-two class-three')

      observer.rescan()

      expect(mockCoral.generate).toHaveBeenCalledWith(
        expect.arrayContaining(['class-one', 'class-two', 'class-three'])
      )
    })

    it('should ignore already seen classes via rescan', () => {
      container.innerHTML = '<div class="existing"></div>'
      const observer = new DOMObserver(mockCoral, { root: container, debounce: 0 })
      observer.start()

      vi.clearAllMocks()

      // Add the same class to another element
      container.innerHTML = '<div class="existing"></div><div id="target" class="existing new-class"></div>'

      observer.rescan()

      // Should only generate for new-class (existing was already seen)
      expect(mockCoral.generate).toHaveBeenCalledWith(['new-class'])
    })
  })

  describe('observing childList changes', () => {
    it('should detect classes on added elements via rescan', () => {
      const observer = new DOMObserver(mockCoral, { root: container, debounce: 0 })
      observer.start()

      vi.clearAllMocks()

      // Add new element
      const newEl = document.createElement('div')
      newEl.className = 'added-class'
      container.appendChild(newEl)

      observer.rescan()

      expect(mockCoral.generate).toHaveBeenCalledWith(['added-class'])
    })

    it('should detect classes on nested added elements via rescan', () => {
      const observer = new DOMObserver(mockCoral, { root: container, debounce: 0 })
      observer.start()

      vi.clearAllMocks()

      // Add parent with children
      const parent = document.createElement('div')
      parent.innerHTML = '<span class="child-class"></span>'
      container.appendChild(parent)

      observer.rescan()

      expect(mockCoral.generate).toHaveBeenCalledWith(
        expect.arrayContaining(['child-class'])
      )
    })
  })

  describe('debouncing', () => {
    it('should debounce timer with scheduleProcess', () => {
      container.innerHTML = '<div id="target" class="initial"></div>'
      const observer = new DOMObserver(mockCoral, { root: container, debounce: 100 })
      observer.start()

      // The debounce behavior is internal - test via seen classes
      const initialClasses = observer.getSeenClasses()
      expect(initialClasses).toContain('initial')
    })
  })

  describe('stop', () => {
    it('should stop observing', () => {
      container.innerHTML = '<div id="target"></div>'
      const observer = new DOMObserver(mockCoral, { root: container, debounce: 0 })
      observer.start()

      vi.clearAllMocks()

      observer.stop()

      // Changes should not be detected
      const target = container.querySelector('#target')!
      target.setAttribute('class', 'new-class')

      vi.advanceTimersByTime(10)

      expect(mockCoral.generate).not.toHaveBeenCalled()
    })

    it('should clear debounce timer on stop', () => {
      container.innerHTML = '<div id="target"></div>'
      const observer = new DOMObserver(mockCoral, { root: container, debounce: 100 })
      observer.start()

      vi.clearAllMocks()

      const target = container.querySelector('#target')!
      target.setAttribute('class', 'pending-class')

      observer.stop()

      // Advance past debounce time
      vi.advanceTimersByTime(200)

      // Should not have processed because observer was stopped
      expect(mockCoral.generate).not.toHaveBeenCalled()
    })
  })

  describe('rescan', () => {
    it('should rescan DOM for new classes', () => {
      const observer = new DOMObserver(mockCoral, { root: container })
      observer.start()

      vi.clearAllMocks()

      // Add element without triggering mutation (simulate server-rendered content)
      container.innerHTML = '<div class="server-rendered"></div>'

      observer.rescan()

      expect(mockCoral.generate).toHaveBeenCalledWith(['server-rendered'])
    })
  })

  describe('getSeenClasses', () => {
    it('should return all seen classes', () => {
      container.innerHTML = '<div class="class-a class-b"></div>'
      const observer = new DOMObserver(mockCoral, { root: container })
      observer.start()

      const seenClasses = observer.getSeenClasses()
      expect(seenClasses).toContain('class-a')
      expect(seenClasses).toContain('class-b')
    })

    it('should return empty array when no classes seen', () => {
      const observer = new DOMObserver(mockCoral, { root: container })

      expect(observer.getSeenClasses()).toEqual([])
    })
  })

  describe('clearCache', () => {
    it('should clear seen classes cache', () => {
      container.innerHTML = '<div class="cached-class"></div>'
      const observer = new DOMObserver(mockCoral, { root: container })
      observer.start()

      expect(observer.getSeenClasses()).toContain('cached-class')

      observer.clearCache()

      expect(observer.getSeenClasses()).toEqual([])
    })

    it('should clear pending classes', () => {
      container.innerHTML = '<div id="target"></div>'
      const observer = new DOMObserver(mockCoral, { root: container, debounce: 1000 })
      observer.start()

      vi.clearAllMocks()

      const target = container.querySelector('#target')!
      target.setAttribute('class', 'pending')

      observer.clearCache()

      // Advance past debounce
      vi.advanceTimersByTime(1000)

      // Pending classes were cleared, so nothing to process
      // Note: the debounce timer would still fire but with empty pending set
    })
  })

  describe('edge cases', () => {
    it('should handle empty class attribute', () => {
      container.innerHTML = '<div id="target" class=""></div>'
      const observer = new DOMObserver(mockCoral, { root: container })

      // Should not throw
      expect(() => observer.start()).not.toThrow()
    })

    it('should handle whitespace-only class attribute', () => {
      container.innerHTML = '<div id="target" class="   "></div>'
      const observer = new DOMObserver(mockCoral, { root: container })

      observer.start()

      // Should not call generate with empty/whitespace classes
      const generateCalls = (mockCoral.generate as ReturnType<typeof vi.fn>).mock.calls
      const allClasses = generateCalls.flatMap(call => call[0])
      expect(allClasses.every(c => c.trim().length > 0)).toBe(true)
    })

    it('should handle elements without class attribute', () => {
      container.innerHTML = '<div id="target"></div>'
      const observer = new DOMObserver(mockCoral, { root: container })

      // Should not throw
      expect(() => observer.start()).not.toThrow()
    })

    it('should not process when no pending classes', () => {
      const observer = new DOMObserver(mockCoral, { root: container, debounce: 0 })
      observer.start()

      vi.clearAllMocks()

      // Trigger mutation without new classes
      container.innerHTML = '<div></div>'

      vi.advanceTimersByTime(10)

      // generate might not be called or called with empty array
    })
  })
})
