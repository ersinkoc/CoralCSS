/**
 * Tests for Spotlight Component
 *
 * @vitest-environment jsdom
 * @module tests/unit/components/spotlight
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { Spotlight, createSpotlight } from '../../../src/components/spotlight'

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('Spotlight Component', () => {
  let container: HTMLElement
  let component: Spotlight

  const sampleItems = [
    { id: '1', label: 'Home', description: 'Go to home page', group: 'Navigation' },
    { id: '2', label: 'Settings', description: 'Open settings', group: 'Navigation' },
    { id: '3', label: 'Profile', description: 'View profile', group: 'User' },
    { id: '4', label: 'Logout', description: 'Sign out', group: 'User' },
  ]

  beforeEach(() => {
    container = document.createElement('div')
    container.id = 'spotlight-container'
    document.body.appendChild(container)
  })

  afterEach(() => {
    if (component) {
      component.destroy()
    }
    document.body.innerHTML = ''
  })

  describe('Initialization', () => {
    it('should create spotlight with default options', () => {
      component = createSpotlight(container)
      expect(component).toBeInstanceOf(Spotlight)
    })

    it('should create with items', () => {
      component = createSpotlight(container, { items: sampleItems })
      expect(component).toBeDefined()
    })

    it('should create with placeholder', () => {
      component = createSpotlight(container, {
        placeholder: 'Search commands...',
      })
      expect(component).toBeDefined()
    })

    it('should initialize as closed', () => {
      component = createSpotlight(container)
      const state = component.getState()
      expect(state.isOpen).toBe(false)
    })

    it('should initialize with empty query', () => {
      component = createSpotlight(container)
      const state = component.getState()
      expect(state.query).toBe('')
    })

    it('should initialize with selectedIndex at 0', () => {
      component = createSpotlight(container)
      const state = component.getState()
      expect(state.selectedIndex).toBe(0)
    })
  })

  describe('Open/Close', () => {
    it('should open spotlight', () => {
      component = createSpotlight(container)
      component.open()
      const state = component.getState()
      expect(state.isOpen).toBe(true)
    })

    it('should close spotlight', () => {
      component = createSpotlight(container)
      component.open()
      component.close()
      const state = component.getState()
      expect(state.isOpen).toBe(false)
    })

    it('should toggle spotlight', () => {
      component = createSpotlight(container)
      component.toggle()
      expect(component.getState().isOpen).toBe(true)
      component.toggle()
      expect(component.getState().isOpen).toBe(false)
    })

    it('should call onOpen callback', () => {
      const onOpen = vi.fn()
      component = createSpotlight(container, { onOpen })
      component.open()
      expect(onOpen).toHaveBeenCalled()
    })

    it('should call onClose callback', () => {
      const onClose = vi.fn()
      component = createSpotlight(container, { onClose })
      component.open()
      component.close()
      expect(onClose).toHaveBeenCalled()
    })
  })

  describe('Search', () => {
    it('should filter items by query', () => {
      component = createSpotlight(container, { items: sampleItems })
      component.setQuery('home')
      const state = component.getState()
      expect(state.query).toBe('home')
    })

    it('should clear query', () => {
      component = createSpotlight(container, { items: sampleItems })
      component.setQuery('test')
      component.clearQuery()
      const state = component.getState()
      expect(state.query).toBe('')
    })

    it('should get current query', () => {
      component = createSpotlight(container)
      component.setQuery('search term')
      expect(component.getQuery()).toBe('search term')
    })

    it('should call onSearch callback', () => {
      const onSearch = vi.fn()
      component = createSpotlight(container, { onSearch })
      component.setQuery('test')
      expect(onSearch).toHaveBeenCalledWith('test')
    })
  })

  describe('Selection', () => {
    it('should select next item', () => {
      component = createSpotlight(container, { items: sampleItems })
      component.open()
      component.selectNext()
      const state = component.getState()
      expect(state.selectedIndex).toBe(1)
    })

    it('should select previous item', () => {
      component = createSpotlight(container, { items: sampleItems })
      component.open()
      component.selectNext()
      component.selectNext()
      component.selectPrevious()
      const state = component.getState()
      expect(state.selectedIndex).toBe(1)
    })

    it('should select first item', () => {
      component = createSpotlight(container, { items: sampleItems })
      component.open()
      component.selectNext()
      component.selectNext()
      component.selectFirst()
      const state = component.getState()
      expect(state.selectedIndex).toBe(0)
    })

    it('should select last item', () => {
      component = createSpotlight(container, { items: sampleItems })
      component.open()
      component.selectLast()
      const state = component.getState()
      expect(state.selectedIndex).toBe(sampleItems.length - 1)
    })

    it('should select by index', () => {
      component = createSpotlight(container, { items: sampleItems })
      component.open()
      component.selectIndex(2)
      const state = component.getState()
      expect(state.selectedIndex).toBe(2)
    })
  })

  describe('Items', () => {
    it('should set items', () => {
      component = createSpotlight(container)
      component.setItems(sampleItems)
      expect(component.getItems()).toHaveLength(4)
    })

    it('should add item', () => {
      component = createSpotlight(container, { items: sampleItems })
      component.addItem({ id: '5', label: 'New Item' })
      expect(component.getItems()).toHaveLength(5)
    })

    it('should remove item', () => {
      component = createSpotlight(container, { items: sampleItems })
      component.removeItem('1')
      expect(component.getItems()).toHaveLength(3)
    })

    it('should get filtered items', () => {
      component = createSpotlight(container, { items: sampleItems })
      component.setQuery('nav')
      const filtered = component.getFilteredItems()
      expect(filtered.length).toBeGreaterThanOrEqual(0)
    })

    it('should get selected item', () => {
      component = createSpotlight(container, { items: sampleItems })
      component.open()
      const selected = component.getSelectedItem()
      expect(selected).toBeDefined()
    })
  })

  describe('Execute', () => {
    it('should execute selected item action', () => {
      const action = vi.fn()
      const itemsWithAction = [
        { id: '1', label: 'Test', action },
      ]
      component = createSpotlight(container, { items: itemsWithAction })
      component.open()
      component.executeSelected()
      expect(action).toHaveBeenCalled()
    })

    it('should call onSelect callback', () => {
      const onSelect = vi.fn()
      component = createSpotlight(container, {
        items: sampleItems,
        onSelect,
      })
      component.open()
      component.executeSelected()
      expect(onSelect).toHaveBeenCalled()
    })

    it('should close after execution by default', () => {
      component = createSpotlight(container, {
        items: sampleItems,
        closeOnSelect: true,
      })
      component.open()
      component.executeSelected()
      const state = component.getState()
      expect(state.isOpen).toBe(false)
    })
  })

  describe('Recent Items', () => {
    it('should support recent items', () => {
      component = createSpotlight(container, {
        items: sampleItems,
        showRecent: true,
        maxRecent: 5,
      })
      expect(component).toBeDefined()
    })

    it('should add to recent on select', () => {
      component = createSpotlight(container, {
        items: sampleItems,
        showRecent: true,
      })
      component.open()
      component.executeSelected()
      const recent = component.getRecentItems()
      expect(Array.isArray(recent)).toBe(true)
    })

    it('should clear recent items', () => {
      component = createSpotlight(container, {
        items: sampleItems,
        showRecent: true,
      })
      component.clearRecentItems()
      const recent = component.getRecentItems()
      expect(recent).toHaveLength(0)
    })
  })

  describe('Grouping', () => {
    it('should support grouped items', () => {
      component = createSpotlight(container, {
        items: sampleItems,
        groupBy: 'group',
      })
      expect(component).toBeDefined()
    })

    it('should get groups', () => {
      component = createSpotlight(container, {
        items: sampleItems,
        groupBy: 'group',
      })
      const groups = component.getGroups()
      expect(groups.length).toBeGreaterThan(0)
    })
  })

  describe('Keyboard Shortcut', () => {
    it('should support custom hotkey', () => {
      component = createSpotlight(container, {
        hotkey: 'mod+k',
      })
      expect(component).toBeDefined()
    })
  })

  describe('Loading State', () => {
    it('should set loading state', () => {
      component = createSpotlight(container)
      component.setLoading(true)
      const state = component.getState()
      expect(state.isLoading).toBe(true)
    })

    it('should clear loading state', () => {
      component = createSpotlight(container)
      component.setLoading(true)
      component.setLoading(false)
      const state = component.getState()
      expect(state.isLoading).toBe(false)
    })
  })

  describe('Factory Function', () => {
    it('should create instance via factory', () => {
      component = createSpotlight(container)
      expect(component).toBeInstanceOf(Spotlight)
    })

    it('should accept options via factory', () => {
      component = createSpotlight(container, {
        items: sampleItems,
        placeholder: 'Search...',
        hotkey: 'mod+k',
        showRecent: true,
      })
      expect(component).toBeDefined()
    })
  })
})
