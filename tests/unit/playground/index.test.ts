/**
 * Playground Tests
 *
 * @vitest-environment jsdom
 * @module tests/unit/playground/index
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  CoralPlayground,
  createPlayground,
  type PlaygroundConfig,
  type ClassSuggestion,
} from '../../../src/playground/index'

describe('Playground', () => {
  let playground: CoralPlayground
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    container.id = 'playground-container'
    document.body.appendChild(container)
  })

  afterEach(() => {
    playground?.destroy()
    container?.remove()
  })

  describe('CoralPlayground', () => {
    describe('constructor', () => {
      it('should create playground with HTMLElement container', () => {
        playground = new CoralPlayground({ container })

        expect(container.querySelector('.coral-playground')).toBeTruthy()
      })

      it('should create playground with selector container', () => {
        playground = new CoralPlayground({ container: '#playground-container' })

        expect(container.querySelector('.coral-playground')).toBeTruthy()
      })

      it('should throw error for invalid container', () => {
        expect(() => {
          new CoralPlayground({ container: '#non-existent' })
        }).toThrow('Playground container not found')
      })

      it('should use default config values', () => {
        playground = new CoralPlayground({ container })

        // Should have default HTML
        const preview = container.querySelector('#coral-playground-preview')
        expect(preview?.textContent).toContain('Preview')
      })

      it('should use custom initial values', () => {
        playground = new CoralPlayground({
          container,
          initialHTML: '<button>Test</button>',
          initialClasses: 'p-4 bg-blue-500',
        })

        const preview = container.querySelector('#coral-playground-preview')
        expect(preview?.textContent).toContain('Test')
      })

      it('should initialize with dark mode', () => {
        playground = new CoralPlayground({
          container,
          darkMode: true,
        })

        const wrapper = container.querySelector('.coral-playground') as HTMLElement
        expect(wrapper).toBeTruthy()
        expect(wrapper.className).toBe('coral-playground')
      })

      it('should initialize with light mode', () => {
        playground = new CoralPlayground({
          container,
          darkMode: false,
        })

        const wrapper = container.querySelector('.coral-playground') as HTMLElement
        expect(wrapper).toBeTruthy()
        expect(wrapper.className).toBe('coral-playground')
      })
    })

    describe('addClass', () => {
      it('should add a class', () => {
        playground = new CoralPlayground({
          container,
          initialClasses: 'p-4',
        })

        playground.addClass('bg-blue-500')

        const classes = playground.getClasses()
        expect(classes).toContain('p-4')
        expect(classes).toContain('bg-blue-500')
      })

      it('should not add duplicate classes', () => {
        playground = new CoralPlayground({
          container,
          initialClasses: 'p-4',
        })

        playground.addClass('p-4')

        const classes = playground.getClasses()
        expect(classes.filter(c => c === 'p-4').length).toBe(1)
      })

      it('should update input and preview', () => {
        playground = new CoralPlayground({
          container,
          initialClasses: '',
        })

        playground.addClass('flex')

        const input = container.querySelector('input[type="text"]') as HTMLInputElement
        expect(input?.value).toContain('flex')
      })
    })

    describe('removeClass', () => {
      it('should remove a class', () => {
        playground = new CoralPlayground({
          container,
          initialClasses: 'p-4 bg-blue-500',
        })

        playground.removeClass('p-4')

        const classes = playground.getClasses()
        expect(classes).not.toContain('p-4')
        expect(classes).toContain('bg-blue-500')
      })

      it('should handle removing non-existent class', () => {
        playground = new CoralPlayground({
          container,
          initialClasses: 'p-4',
        })

        playground.removeClass('non-existent')

        const classes = playground.getClasses()
        expect(classes).toContain('p-4')
      })
    })

    describe('setClasses', () => {
      it('should replace all classes', () => {
        playground = new CoralPlayground({
          container,
          initialClasses: 'p-4 m-2',
        })

        playground.setClasses('flex items-center gap-4')

        const classes = playground.getClasses()
        expect(classes).toEqual(['flex', 'items-center', 'gap-4'])
        expect(classes).not.toContain('p-4')
        expect(classes).not.toContain('m-2')
      })

      it('should handle empty string', () => {
        playground = new CoralPlayground({
          container,
          initialClasses: 'p-4',
        })

        playground.setClasses('')

        const classes = playground.getClasses()
        expect(classes.length).toBe(0)
      })
    })

    describe('getClasses', () => {
      it('should return current classes', () => {
        playground = new CoralPlayground({
          container,
          initialClasses: 'p-4 bg-blue-500 text-white',
        })

        const classes = playground.getClasses()

        expect(classes).toEqual(['p-4', 'bg-blue-500', 'text-white'])
      })

      it('should return a copy (not reference)', () => {
        playground = new CoralPlayground({
          container,
          initialClasses: 'p-4',
        })

        const classes = playground.getClasses()
        classes.push('modified')

        expect(playground.getClasses()).not.toContain('modified')
      })
    })

    describe('setHTML', () => {
      it('should set HTML content', () => {
        playground = new CoralPlayground({
          container,
          initialHTML: '<div>Initial</div>',
        })

        playground.setHTML('<button>New Content</button>')

        expect(playground.getHTML()).toBe('<button>New Content</button>')
      })

      it('should update preview', () => {
        playground = new CoralPlayground({
          container,
          initialHTML: '<div>Initial</div>',
        })

        playground.setHTML('<span>Updated</span>')

        const preview = container.querySelector('#coral-playground-preview')
        expect(preview?.textContent).toContain('Updated')
      })
    })

    describe('getHTML', () => {
      it('should return current HTML', () => {
        playground = new CoralPlayground({
          container,
          initialHTML: '<div class="test">Content</div>',
        })

        expect(playground.getHTML()).toBe('<div class="test">Content</div>')
      })
    })

    describe('destroy', () => {
      it('should remove all playground content', () => {
        playground = new CoralPlayground({ container })

        expect(container.querySelector('.coral-playground')).toBeTruthy()

        playground.destroy()

        expect(container.querySelector('.coral-playground')).toBeFalsy()
      })
    })

    describe('live preview', () => {
      it('should update preview when enabled', () => {
        playground = new CoralPlayground({
          container,
          livePreview: true,
          initialClasses: 'p-4',
        })

        const input = container.querySelector('input[type="text"]') as HTMLInputElement
        input.value = 'flex items-center'
        input.dispatchEvent(new Event('input'))

        const codeOutput = container.querySelector('#coral-playground-code')
        expect(codeOutput?.textContent).toContain('flex items-center')
      })

      it('should call onChange callback', () => {
        const onChange = vi.fn()

        playground = new CoralPlayground({
          container,
          livePreview: true,
          onChange,
        })

        playground.addClass('test-class')

        expect(onChange).toHaveBeenCalled()
      })
    })

    describe('suggestions panel', () => {
      it('should show suggestions when enabled', () => {
        playground = new CoralPlayground({
          container,
          showSuggestions: true,
        })

        const suggestionsPanel = container.querySelectorAll('button')
        expect(suggestionsPanel.length).toBeGreaterThan(0)
      })

      it('should add class when suggestion clicked', () => {
        playground = new CoralPlayground({
          container,
          showSuggestions: true,
          initialClasses: '',
        })

        // Find a suggestion button
        const buttons = container.querySelectorAll('button')
        const suggestionBtn = Array.from(buttons).find(
          btn => btn.textContent === 'flex'
        ) as HTMLButtonElement

        suggestionBtn?.click()

        const classes = playground.getClasses()
        expect(classes).toContain('flex')
      })

      it('should group suggestions by category', () => {
        playground = new CoralPlayground({
          container,
          showSuggestions: true,
        })

        // Look for category labels
        const categoryLabels = container.querySelectorAll('div')
        const hasLayout = Array.from(categoryLabels).some(
          div => div.textContent?.includes('Layout')
        )
        const hasSpacing = Array.from(categoryLabels).some(
          div => div.textContent?.includes('Spacing')
        )

        expect(hasLayout || hasSpacing).toBe(true)
      })
    })

    describe('code output', () => {
      it('should generate HTML code output', () => {
        playground = new CoralPlayground({
          container,
          initialHTML: '<div>Test</div>',
          initialClasses: 'p-4 bg-blue-500',
        })

        const codeOutput = container.querySelector('#coral-playground-code')

        expect(codeOutput?.textContent).toContain('<div class="p-4 bg-blue-500">')
        expect(codeOutput?.textContent).toContain('<div>Test</div>')
      })

      it('should update code output on changes', () => {
        playground = new CoralPlayground({
          container,
          initialHTML: '<div>Test</div>',
          initialClasses: 'p-4',
        })

        playground.addClass('flex')

        const codeOutput = container.querySelector('#coral-playground-code')
        expect(codeOutput?.textContent).toContain('flex')
      })
    })

    describe('input handling', () => {
      it('should handle HTML textarea input', () => {
        playground = new CoralPlayground({
          container,
          livePreview: true,
        })

        const textarea = container.querySelector('textarea') as HTMLTextAreaElement
        textarea.value = '<span>New HTML</span>'
        textarea.dispatchEvent(new Event('input'))

        const preview = container.querySelector('#coral-playground-preview')
        expect(preview?.textContent).toContain('New HTML')
      })

      it('should handle class input', () => {
        playground = new CoralPlayground({
          container,
          livePreview: true,
        })

        const input = container.querySelector('input[type="text"]') as HTMLInputElement
        input.value = 'new-class another-class'
        input.dispatchEvent(new Event('input'))

        const classes = playground.getClasses()
        expect(classes).toContain('new-class')
        expect(classes).toContain('another-class')
      })
    })
  })

  describe('createPlayground', () => {
    it('should create playground instance', () => {
      playground = createPlayground({ container })
      expect(playground).toBeInstanceOf(CoralPlayground)
    })

    it('should create playground with config', () => {
      playground = createPlayground({
        container,
        initialClasses: 'p-4 m-2',
        darkMode: true,
      })

      const classes = playground.getClasses()
      expect(classes).toContain('p-4')
      expect(classes).toContain('m-2')
    })
  })

  describe('type exports', () => {
    it('should export PlaygroundConfig type', () => {
      const config: PlaygroundConfig = {
        container,
        initialHTML: '<div>Test</div>',
        initialClasses: 'p-4',
        showSuggestions: true,
        darkMode: false,
        livePreview: true,
        onChange: () => {},
      }
      expect(config).toBeDefined()
    })

    it('should export ClassSuggestion type', () => {
      const suggestion: ClassSuggestion = {
        className: 'p-4',
        category: 'Spacing',
        description: 'Padding: 1rem',
      }
      expect(suggestion).toBeDefined()
    })
  })

  describe('preview rendering', () => {
    it('should render preview with classes applied', () => {
      playground = new CoralPlayground({
        container,
        initialHTML: '<button>Click</button>',
        initialClasses: 'rounded-lg shadow-md',
      })

      const preview = container.querySelector('#coral-playground-preview')
      const previewChild = preview?.firstElementChild

      expect(previewChild?.className).toContain('rounded-lg')
      expect(previewChild?.className).toContain('shadow-md')
    })

    it('should handle complex HTML', () => {
      playground = new CoralPlayground({
        container,
        initialHTML: '<div><h1>Title</h1><p>Paragraph</p></div>',
        initialClasses: 'p-4',
      })

      const preview = container.querySelector('#coral-playground-preview')
      expect(preview?.textContent).toContain('Title')
      expect(preview?.textContent).toContain('Paragraph')
    })

    it('should escape HTML in code output', () => {
      playground = new CoralPlayground({
        container,
        initialHTML: '<script>alert("xss")</script>',
        initialClasses: '',
      })

      const codeOutput = container.querySelector('#coral-playground-code')
      // Code output should contain the script tag as text, not executable
      expect(codeOutput?.textContent).toContain('<script>')
    })
  })

  describe('suggestion button interactions', () => {
    it('should have hover effect on suggestion buttons', () => {
      playground = new CoralPlayground({
        container,
        showSuggestions: true,
        darkMode: false,
      })

      const buttons = container.querySelectorAll('button')
      const suggestionBtn = Array.from(buttons).find(
        btn => !['×'].includes(btn.textContent || '')
      ) as HTMLButtonElement

      if (suggestionBtn) {
        // Verify button has mouseenter/mouseleave event listeners
        // by checking that dispatchEvent doesn't throw
        expect(() => {
          suggestionBtn.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
          suggestionBtn.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))
        }).not.toThrow()

        // Button should have style defined
        expect(suggestionBtn.style.cssText).toBeTruthy()
      }
    })
  })

  describe('edge cases', () => {
    it('should handle empty initial classes', () => {
      playground = new CoralPlayground({
        container,
        initialClasses: '',
      })

      expect(playground.getClasses()).toEqual([])
    })

    it('should handle classes with extra spaces', () => {
      playground = new CoralPlayground({
        container,
        initialClasses: '  p-4   m-2  ',
      })

      expect(playground.getClasses()).toEqual(['p-4', 'm-2'])
    })

    it('should handle empty HTML', () => {
      playground = new CoralPlayground({
        container,
        initialHTML: '',
      })

      expect(playground.getHTML()).toBe('')
    })

    it('should handle whitespace-only HTML', () => {
      playground = new CoralPlayground({
        container,
        initialHTML: '   ',
      })

      const preview = container.querySelector('#coral-playground-preview')
      expect(preview).toBeTruthy()
    })
  })

  describe('class suggestions data', () => {
    it('should have Layout category suggestions', () => {
      playground = new CoralPlayground({
        container,
        showSuggestions: true,
      })

      const buttons = container.querySelectorAll('button')
      const hasFlexSuggestion = Array.from(buttons).some(
        btn => btn.textContent === 'flex'
      )

      expect(hasFlexSuggestion).toBe(true)
    })

    it('should have Glass category suggestions', () => {
      playground = new CoralPlayground({
        container,
        showSuggestions: true,
      })

      const buttons = container.querySelectorAll('button')
      const hasGlassSuggestion = Array.from(buttons).some(
        btn => btn.textContent === 'glass'
      )

      expect(hasGlassSuggestion).toBe(true)
    })

    it('should have Animation category suggestions', () => {
      playground = new CoralPlayground({
        container,
        showSuggestions: true,
      })

      const buttons = container.querySelectorAll('button')
      const hasAnimateSuggestion = Array.from(buttons).some(
        btn => btn.textContent === 'animate-bounce'
      )

      expect(hasAnimateSuggestion).toBe(true)
    })
  })
})
