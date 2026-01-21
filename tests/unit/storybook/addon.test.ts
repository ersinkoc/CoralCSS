import { describe, it, expect, vi } from 'vitest'
import {
  ADDON_ID,
  PANEL_ID,
  TOOL_ID,
  PARAM_KEY,
  CoralCSSAddon,
  createPanelContent,
  createToolbarItems,
  createEventEmitter,
  EVENTS,
} from '../../../src/storybook/addon'

describe('Storybook Addon', () => {
  describe('Constants', () => {
    it('should export ADDON_ID', () => {
      expect(ADDON_ID).toBe('coral-css')
    })

    it('should export PANEL_ID', () => {
      expect(PANEL_ID).toBe('coral-css/panel')
    })

    it('should export TOOL_ID', () => {
      expect(TOOL_ID).toBe('coral-css/tool')
    })

    it('should export PARAM_KEY', () => {
      expect(PARAM_KEY).toBe('coralCSS')
    })
  })

  describe('EVENTS', () => {
    it('should have CSS_GENERATED event', () => {
      expect(EVENTS.CSS_GENERATED).toBe('coral-css/css-generated')
    })

    it('should have CLASSES_USED event', () => {
      expect(EVENTS.CLASSES_USED).toBe('coral-css/classes-used')
    })

    it('should have DARK_MODE_TOGGLED event', () => {
      expect(EVENTS.DARK_MODE_TOGGLED).toBe('coral-css/dark-mode-toggled')
    })

    it('should have THEME_CHANGED event', () => {
      expect(EVENTS.THEME_CHANGED).toBe('coral-css/theme-changed')
    })

    it('should have REQUEST_STATE event', () => {
      expect(EVENTS.REQUEST_STATE).toBe('coral-css/request-state')
    })

    it('should have STATE_UPDATE event', () => {
      expect(EVENTS.STATE_UPDATE).toBe('coral-css/state-update')
    })
  })

  describe('CoralCSSAddon', () => {
    it('should have correct id', () => {
      expect(CoralCSSAddon.id).toBe(ADDON_ID)
    })

    it('should have register function', () => {
      expect(typeof CoralCSSAddon.register).toBe('function')
    })

    it('should return addon info from register', () => {
      const result = CoralCSSAddon.register()
      expect(result.id).toBe(ADDON_ID)
      expect(result.title).toBe('CoralCSS')
    })

    it('should have getPanel function', () => {
      const panel = CoralCSSAddon.getPanel()
      expect(panel.id).toBe(PANEL_ID)
      expect(panel.title).toBe('CoralCSS')
      expect(panel.render).toBeDefined()
    })

    it('should have getTool function', () => {
      const tool = CoralCSSAddon.getTool()
      expect(tool.id).toBe(TOOL_ID)
      expect(tool.title).toBe('Theme')
      expect(tool.render).toBeDefined()
    })

    it('should have defaultParameters', () => {
      expect(CoralCSSAddon.defaultParameters.disable).toBe(false)
      expect(CoralCSSAddon.defaultParameters.darkMode).toBe(false)
      expect(CoralCSSAddon.defaultParameters.highlightClasses).toEqual([])
    })
  })

  describe('createPanelContent', () => {
    const options = {
      css: '.bg-red-500 { background-color: #ef4444; }',
      classes: ['bg-red-500', 'p-4', 'p-4'],
      theme: { primary: '#ff6b6b' },
      darkMode: true,
    }

    it('should return getCSSContent function', () => {
      const content = createPanelContent(options)
      expect(content.getCSSContent()).toBe(options.css)
    })

    it('should return getClassesContent with counts', () => {
      const content = createPanelContent(options)
      const classes = content.getClassesContent()

      expect(classes).toEqual([
        { name: 'p-4', count: 2 },
        { name: 'bg-red-500', count: 1 },
      ])
    })

    it('should return getThemeContent', () => {
      const content = createPanelContent(options)
      expect(content.getThemeContent()).toEqual(options.theme)
    })

    it('should return HTML representation', () => {
      const content = createPanelContent(options)
      const html = content.getHTML()

      expect(html).toContain('Generated CSS')
      expect(html).toContain('.bg-red-500')
      expect(html).toContain('Used Classes')
      expect(html).toContain('Dark Mode')
      expect(html).toContain('Enabled')
    })

    it('should handle empty CSS', () => {
      const content = createPanelContent({
        css: '',
        classes: [],
      })
      const html = content.getHTML()
      expect(html).toContain('No CSS generated')
    })

    it('should handle empty classes', () => {
      const content = createPanelContent({
        css: '.test {}',
        classes: [],
      })
      const html = content.getHTML()
      expect(html).toContain('No classes used')
    })

    it('should handle disabled dark mode', () => {
      const content = createPanelContent({
        css: '',
        classes: [],
        darkMode: false,
      })
      const html = content.getHTML()
      expect(html).toContain('Disabled')
    })

    it('should escape HTML in CSS', () => {
      const content = createPanelContent({
        css: '<script>alert("xss")</script>',
        classes: [],
      })
      const html = content.getHTML()
      expect(html).not.toContain('<script>')
      expect(html).toContain('&lt;script&gt;')
    })
  })

  describe('createToolbarItems', () => {
    it('should create dark mode toggle', () => {
      const onDarkModeToggle = vi.fn()
      const items = createToolbarItems({ onDarkModeToggle })

      expect(items.darkModeToggle.id).toBe('coral-dark-mode')
      expect(items.darkModeToggle.type).toBe('button')
      expect(items.darkModeToggle.onClick).toBe(onDarkModeToggle)
    })

    it('should create theme selector', () => {
      const onThemeChange = vi.fn()
      const items = createToolbarItems({ onThemeChange })

      expect(items.themeSelector.id).toBe('coral-theme')
      expect(items.themeSelector.type).toBe('select')
      expect(items.themeSelector.onChange).toBe(onThemeChange)
    })

    it('should use default themes', () => {
      const items = createToolbarItems({})
      expect(items.themeSelector.options).toEqual([
        { value: 'light', label: 'light' },
        { value: 'dark', label: 'dark' },
      ])
    })

    it('should use custom themes', () => {
      const items = createToolbarItems({
        themes: ['custom1', 'custom2', 'custom3'],
      })
      expect(items.themeSelector.options).toEqual([
        { value: 'custom1', label: 'custom1' },
        { value: 'custom2', label: 'custom2' },
        { value: 'custom3', label: 'custom3' },
      ])
    })

    it('should handle empty themes array', () => {
      const items = createToolbarItems({ themes: [] })
      expect(items.themeSelector.options).toEqual([])
    })

    it('should handle single theme', () => {
      const items = createToolbarItems({ themes: ['single'] })
      expect(items.themeSelector.options).toEqual([
        { value: 'single', label: 'single' },
      ])
    })

    it('should work with both callbacks', () => {
      const onDarkModeToggle = vi.fn()
      const onThemeChange = vi.fn()
      const items = createToolbarItems({ onDarkModeToggle, onThemeChange })

      expect(items.darkModeToggle.onClick).toBe(onDarkModeToggle)
      expect(items.themeSelector.onChange).toBe(onThemeChange)
    })
  })

  describe('createEventEmitter', () => {
    it('should emit CSS generated event', () => {
      const emit = vi.fn()
      const emitter = createEventEmitter({ emit })

      emitter.emitCSSGenerated('.test {}')

      expect(emit).toHaveBeenCalledWith(EVENTS.CSS_GENERATED, { css: '.test {}' })
    })

    it('should emit classes used event', () => {
      const emit = vi.fn()
      const emitter = createEventEmitter({ emit })

      emitter.emitClassesUsed(['bg-red-500', 'p-4'])

      expect(emit).toHaveBeenCalledWith(EVENTS.CLASSES_USED, {
        classes: ['bg-red-500', 'p-4'],
      })
    })

    it('should emit dark mode toggled event', () => {
      const emit = vi.fn()
      const emitter = createEventEmitter({ emit })

      emitter.emitDarkModeToggled(true)

      expect(emit).toHaveBeenCalledWith(EVENTS.DARK_MODE_TOGGLED, { enabled: true })
    })

    it('should emit theme changed event', () => {
      const emit = vi.fn()
      const emitter = createEventEmitter({ emit })

      emitter.emitThemeChanged({ primary: '#ff6b6b' })

      expect(emit).toHaveBeenCalledWith(EVENTS.THEME_CHANGED, {
        theme: { primary: '#ff6b6b' },
      })
    })

    it('should emit state update event', () => {
      const emit = vi.fn()
      const emitter = createEventEmitter({ emit })

      emitter.emitStateUpdate({ darkMode: true })

      expect(emit).toHaveBeenCalledWith(EVENTS.STATE_UPDATE, { darkMode: true })
    })
  })
})
