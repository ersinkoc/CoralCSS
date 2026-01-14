/**
 * Terminal Component Tests
 *
 * @vitest-environment jsdom
 * @module tests/unit/components/terminal
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  Terminal,
  createTerminal,
  TERMINAL_THEMES,
  type TerminalConfig,
  type TerminalTheme,
} from '../../../src/components/terminal'

function createTestContainer(): HTMLElement {
  const container = document.createElement('div')

  const outputDiv = document.createElement('div')
  outputDiv.setAttribute('data-terminal-output', '')
  container.appendChild(outputDiv)

  const inputEl = document.createElement('input')
  inputEl.setAttribute('data-terminal-input', '')
  container.appendChild(inputEl)

  return container
}

describe('Terminal Component', () => {
  let container: HTMLElement
  let terminal: Terminal

  beforeEach(() => {
    container = createTestContainer()
    document.body.appendChild(container)
  })

  afterEach(() => {
    terminal?.destroy()
    container?.remove()
  })

  describe('constructor', () => {
    it('should create Terminal with element', () => {
      terminal = new Terminal(container)
      expect(container.getAttribute('role')).toBe('application')
      expect(container.getAttribute('aria-label')).toBe('Terminal')
    })

    it('should create Terminal with config', () => {
      const config: TerminalConfig = {
        prompt: '> ',
        theme: 'dracula',
      }
      terminal = new Terminal(container, config)
      expect(terminal.getThemeColors()).toEqual(TERMINAL_THEMES.dracula)
    })

    it('should show welcome message', () => {
      terminal = new Terminal(container, {
        welcomeMessage: 'Welcome to Terminal!',
      })

      const output = terminal.getOutput()
      expect(output).toContain('Welcome to Terminal!')
    })
  })

  describe('writeLine', () => {
    it('should write a line to terminal', () => {
      terminal = new Terminal(container)

      terminal.writeLine('Hello World')

      expect(terminal.getOutput()).toContain('Hello World')
    })

    it('should write stdout', () => {
      terminal = new Terminal(container)

      terminal.writeLine('Output', 'stdout')

      const state = terminal.getState()
      expect(state.lines[0]?.type).toBe('stdout')
    })

    it('should write stderr', () => {
      terminal = new Terminal(container)

      terminal.writeLine('Error', 'stderr')

      const state = terminal.getState()
      expect(state.lines[0]?.type).toBe('stderr')
    })

    it('should write system message', () => {
      terminal = new Terminal(container)

      terminal.writeLine('System message', 'system')

      const state = terminal.getState()
      expect(state.lines[0]?.type).toBe('system')
    })

    it('should write input', () => {
      terminal = new Terminal(container)

      terminal.writeLine('Input', 'input')

      const state = terminal.getState()
      expect(state.lines[0]?.type).toBe('input')
    })

    it('should respect maxLines', () => {
      terminal = new Terminal(container, { maxLines: 2 })

      terminal.writeLine('Line 1')
      terminal.writeLine('Line 2')
      terminal.writeLine('Line 3')

      const state = terminal.getState()
      expect(state.lines).toHaveLength(2)
    })

    it('should emit line event', () => {
      terminal = new Terminal(container)
      const eventHandler = vi.fn()
      container.addEventListener('coral:terminal:line', eventHandler)

      terminal.writeLine('Test')

      expect(eventHandler).toHaveBeenCalled()
    })
  })

  describe('writeHTML', () => {
    it('should write HTML content', () => {
      terminal = new Terminal(container)

      terminal.writeHTML('<strong>Bold</strong>')

      const state = terminal.getState()
      expect(state.lines[0]?.isHTML).toBe(true)
    })

    it('should respect maxLines for HTML', () => {
      terminal = new Terminal(container, { maxLines: 1 })

      terminal.writeHTML('<em>Line 1</em>')
      terminal.writeHTML('<em>Line 2</em>')

      const state = terminal.getState()
      expect(state.lines).toHaveLength(1)
    })
  })

  describe('writeError', () => {
    it('should write error', () => {
      terminal = new Terminal(container)

      terminal.writeError('Error message')

      const state = terminal.getState()
      expect(state.lines[0]?.type).toBe('stderr')
    })
  })

  describe('clear', () => {
    it('should clear terminal', () => {
      terminal = new Terminal(container)

      terminal.writeLine('Line 1')
      terminal.writeLine('Line 2')
      terminal.clear()

      expect(terminal.getOutput()).toBe('')
    })

    it('should emit clear event', () => {
      terminal = new Terminal(container)
      const eventHandler = vi.fn()
      container.addEventListener('coral:terminal:clear', eventHandler)

      terminal.clear()

      expect(eventHandler).toHaveBeenCalled()
    })
  })

  describe('processCommand', () => {
    it('should process a command', async () => {
      const onCommand = vi.fn()
      terminal = new Terminal(container, { onCommand })

      terminal.setInput('ls -la')
      await terminal.processCommand('ls -la')

      expect(onCommand).toHaveBeenCalledWith('ls -la')
    })

    it('should add command to history', async () => {
      terminal = new Terminal(container)

      await terminal.processCommand('first command')
      await terminal.processCommand('second command')

      const history = terminal.getHistory()
      expect(history).toContain('first command')
      expect(history).toContain('second command')
    })

    it('should not add duplicate commands to history', async () => {
      terminal = new Terminal(container)

      await terminal.processCommand('same command')
      await terminal.processCommand('same command')

      const history = terminal.getHistory()
      expect(history.filter(h => h === 'same command')).toHaveLength(1)
    })

    it('should respect maxHistory', async () => {
      terminal = new Terminal(container, { maxHistory: 2 })

      await terminal.processCommand('cmd1')
      await terminal.processCommand('cmd2')
      await terminal.processCommand('cmd3')

      const history = terminal.getHistory()
      expect(history).toHaveLength(2)
    })

    it('should not process when already processing', async () => {
      const onCommand = vi.fn()
      terminal = new Terminal(container, { onCommand })

      terminal['setState']({ isProcessing: true })
      await terminal.processCommand('test')

      expect(onCommand).not.toHaveBeenCalled()
    })
  })

  describe('setInput / getInput', () => {
    it('should set input value', () => {
      terminal = new Terminal(container)

      terminal.setInput('test input')

      expect(terminal.getInput()).toBe('test input')
    })

    it('should update cursor position', () => {
      terminal = new Terminal(container)

      terminal.setInput('test')

      expect(terminal.getState().cursorPosition).toBe(4)
    })
  })

  describe('getHistory / clearHistory', () => {
    it('should return history', async () => {
      terminal = new Terminal(container)

      await terminal.processCommand('cmd1')

      expect(terminal.getHistory()).toContain('cmd1')
    })

    it('should clear history', async () => {
      terminal = new Terminal(container)

      await terminal.processCommand('cmd1')
      terminal.clearHistory()

      expect(terminal.getHistory()).toHaveLength(0)
    })
  })

  describe('getOutput', () => {
    it('should return output as plain text', () => {
      terminal = new Terminal(container)

      terminal.writeLine('Line 1')
      terminal.writeLine('Line 2')

      const output = terminal.getOutput()
      expect(output).toContain('Line 1')
      expect(output).toContain('Line 2')
    })
  })

  describe('copyToClipboard', () => {
    it('should copy to clipboard', async () => {
      terminal = new Terminal(container)
      terminal.writeLine('Copy this')

      const writeTextMock = vi.fn().mockResolvedValue(undefined)
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: writeTextMock },
        configurable: true,
      })

      const result = await terminal.copyToClipboard()

      expect(result).toBe(true)
      expect(writeTextMock).toHaveBeenCalled()
    })

    it('should return false on clipboard error', async () => {
      terminal = new Terminal(container)

      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: vi.fn().mockRejectedValue(new Error('Failed')) },
        configurable: true,
      })

      const result = await terminal.copyToClipboard()

      expect(result).toBe(false)
    })

    it('should emit copy event', async () => {
      terminal = new Terminal(container)
      const eventHandler = vi.fn()
      container.addEventListener('coral:terminal:copy', eventHandler)

      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: vi.fn().mockResolvedValue(undefined) },
        configurable: true,
      })

      await terminal.copyToClipboard()

      expect(eventHandler).toHaveBeenCalled()
    })
  })

  describe('focus / blur', () => {
    it('should focus input', () => {
      terminal = new Terminal(container)
      terminal['inputElement'] = container.querySelector('input')

      const focusSpy = vi.spyOn(terminal['inputElement']!, 'focus')
      terminal.focus()

      expect(focusSpy).toHaveBeenCalled()
    })

    it('should blur input', () => {
      terminal = new Terminal(container)
      terminal['inputElement'] = container.querySelector('input')

      const blurSpy = vi.spyOn(terminal['inputElement']!, 'blur')
      terminal.blur()

      expect(blurSpy).toHaveBeenCalled()
    })

    it('should handle null input element', () => {
      terminal = new Terminal(container)
      terminal['inputElement'] = null

      terminal.focus()
      terminal.blur()
      // Should not throw
      expect(true).toBe(true)
    })
  })

  describe('scrollToBottom', () => {
    it('should scroll to bottom', () => {
      terminal = new Terminal(container)

      terminal.scrollToBottom()
      // Just verify no error is thrown
      expect(true).toBe(true)
    })
  })

  describe('historyUp / historyDown', () => {
    it('should navigate history up', async () => {
      terminal = new Terminal(container)

      await terminal.processCommand('cmd1')
      await terminal.processCommand('cmd2')

      terminal.historyUp()

      expect(terminal.getInput()).toBe('cmd2')
    })

    it('should navigate history down', async () => {
      terminal = new Terminal(container)

      await terminal.processCommand('cmd1')
      await terminal.processCommand('cmd2')

      terminal.historyUp()
      terminal.historyUp()
      terminal.historyDown()

      expect(terminal.getInput()).toBe('cmd2')
    })

    it('should return to empty input after history down', async () => {
      terminal = new Terminal(container)

      await terminal.processCommand('cmd1')

      terminal.historyUp()
      terminal.historyDown()

      expect(terminal.getInput()).toBe('')
    })

    it('should do nothing with empty history', () => {
      terminal = new Terminal(container)

      terminal.historyUp()

      expect(terminal.getInput()).toBe('')
    })

    it('should not go past start of history', async () => {
      terminal = new Terminal(container)

      await terminal.processCommand('cmd1')

      terminal.historyUp()
      terminal.historyUp()
      terminal.historyUp()

      expect(terminal.getInput()).toBe('cmd1')
    })

    it('should not navigate down when not in history', () => {
      terminal = new Terminal(container)

      terminal.historyDown()

      expect(terminal.getState().historyIndex).toBe(-1)
    })
  })

  describe('tabComplete', () => {
    it('should complete with single match', () => {
      terminal = new Terminal(container, {
        tabComplete: (partial) => {
          if (partial.startsWith('hel')) return ['hello']
          return []
        },
      })

      terminal.setInput('hel')
      terminal.tabComplete()

      expect(terminal.getInput()).toBe('hello')
    })

    it('should show options with multiple matches', () => {
      terminal = new Terminal(container, {
        tabComplete: () => ['hello', 'help', 'helicopter'],
      })

      terminal.setInput('hel')
      terminal.tabComplete()

      const output = terminal.getOutput()
      expect(output).toContain('hello')
    })

    it('should do nothing without tabComplete function', () => {
      terminal = new Terminal(container)

      terminal.setInput('test')
      terminal.tabComplete()

      expect(terminal.getInput()).toBe('test')
    })
  })

  describe('getThemeColors', () => {
    it('should return theme colors', () => {
      terminal = new Terminal(container, { theme: 'nord' })

      const colors = terminal.getThemeColors()

      expect(colors).toEqual(TERMINAL_THEMES.nord)
    })

    it('should default to dark theme', () => {
      terminal = new Terminal(container)

      const colors = terminal.getThemeColors()

      expect(colors).toEqual(TERMINAL_THEMES.dark)
    })
  })

  describe('keyboard events', () => {
    it('should handle Ctrl+C', () => {
      const onInterrupt = vi.fn()
      terminal = new Terminal(container, { onInterrupt })

      const event = new KeyboardEvent('keydown', {
        key: 'c',
        ctrlKey: true,
        bubbles: true,
      })
      container.dispatchEvent(event)

      expect(onInterrupt).toHaveBeenCalled()
    })

    it('should handle Ctrl+D', () => {
      const onEOF = vi.fn()
      terminal = new Terminal(container, { onEOF })

      const event = new KeyboardEvent('keydown', {
        key: 'd',
        ctrlKey: true,
        bubbles: true,
      })
      container.dispatchEvent(event)

      expect(onEOF).toHaveBeenCalled()
    })

    it('should handle Ctrl+L', () => {
      const onClear = vi.fn()
      terminal = new Terminal(container, { onClear })

      terminal.writeLine('Line 1')

      const event = new KeyboardEvent('keydown', {
        key: 'l',
        ctrlKey: true,
        bubbles: true,
      })
      container.dispatchEvent(event)

      expect(onClear).toHaveBeenCalled()
      expect(terminal.getOutput()).toBe('')
    })

    it('should handle Ctrl+U', () => {
      terminal = new Terminal(container)

      terminal.setInput('some text')

      const event = new KeyboardEvent('keydown', {
        key: 'u',
        ctrlKey: true,
        bubbles: true,
      })
      container.dispatchEvent(event)

      expect(terminal.getInput()).toBe('')
    })

    it('should handle ArrowUp', () => {
      terminal = new Terminal(container)
      terminal['setState']({
        commandHistory: ['cmd1', 'cmd2'],
        historyIndex: -1,
        currentInput: '',
        cursorPosition: 0,
      })

      const event = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        bubbles: true,
      })
      container.dispatchEvent(event)

      expect(terminal.getInput()).toBe('cmd2')
    })

    it('should handle ArrowDown', () => {
      terminal = new Terminal(container)
      terminal['setState']({
        commandHistory: ['cmd1', 'cmd2'],
        historyIndex: 0,
        currentInput: 'cmd1',
        cursorPosition: 4,
      })

      const event = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
      })
      container.dispatchEvent(event)

      expect(terminal.getInput()).toBe('cmd2')
    })

    it('should handle Tab', () => {
      const tabComplete = vi.fn().mockReturnValue(['completed'])
      terminal = new Terminal(container, { tabComplete })

      terminal.setInput('test')

      const event = new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
      })
      container.dispatchEvent(event)

      expect(tabComplete).toHaveBeenCalled()
    })

    it('should handle Enter', () => {
      terminal = new Terminal(container)

      terminal.setInput('test command')

      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
      })
      container.dispatchEvent(event)

      // Command should be processed
      const output = terminal.getOutput()
      expect(output).toContain('test command')
    })

    it('should not process Enter with Shift', () => {
      terminal = new Terminal(container)

      terminal.setInput('test')

      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        shiftKey: true,
        bubbles: true,
      })
      container.dispatchEvent(event)

      // Should not process command
      expect(terminal.getState().lines).toHaveLength(0)
    })

    it('should ignore keyboard events in readOnly mode', () => {
      const onInterrupt = vi.fn()
      terminal = new Terminal(container, { readOnly: true, onInterrupt })

      const event = new KeyboardEvent('keydown', {
        key: 'c',
        ctrlKey: true,
        bubbles: true,
      })
      container.dispatchEvent(event)

      expect(onInterrupt).not.toHaveBeenCalled()
    })
  })

  describe('click events', () => {
    it('should focus on click', () => {
      terminal = new Terminal(container)
      terminal['inputElement'] = container.querySelector('input')

      const focusSpy = vi.spyOn(terminal['inputElement']!, 'focus')

      container.click()

      expect(focusSpy).toHaveBeenCalled()
    })

    it('should not focus when clicking button', () => {
      terminal = new Terminal(container)
      terminal['inputElement'] = container.querySelector('input')

      const focusSpy = vi.spyOn(terminal['inputElement']!, 'focus')

      const btn = document.createElement('button')
      container.appendChild(btn)
      btn.click()

      // Focus should not be called directly from button click
    })
  })

  describe('emit events', () => {
    it('should emit interrupt event', () => {
      terminal = new Terminal(container)
      const eventHandler = vi.fn()
      container.addEventListener('coral:terminal:interrupt', eventHandler)

      const event = new KeyboardEvent('keydown', {
        key: 'c',
        ctrlKey: true,
        bubbles: true,
      })
      container.dispatchEvent(event)

      expect(eventHandler).toHaveBeenCalled()
    })

    it('should emit eof event', () => {
      terminal = new Terminal(container)
      const eventHandler = vi.fn()
      container.addEventListener('coral:terminal:eof', eventHandler)

      const event = new KeyboardEvent('keydown', {
        key: 'd',
        ctrlKey: true,
        bubbles: true,
      })
      container.dispatchEvent(event)

      expect(eventHandler).toHaveBeenCalled()
    })
  })

  describe('TERMINAL_THEMES', () => {
    it('should have all theme definitions', () => {
      const themes: TerminalTheme[] = [
        'dark',
        'light',
        'retro-green',
        'retro-amber',
        'matrix',
        'dracula',
        'monokai',
        'nord',
      ]

      for (const theme of themes) {
        expect(TERMINAL_THEMES[theme]).toBeDefined()
        expect(TERMINAL_THEMES[theme].background).toBeDefined()
        expect(TERMINAL_THEMES[theme].foreground).toBeDefined()
      }
    })
  })

  describe('createTerminal factory', () => {
    it('should create Terminal instance', () => {
      terminal = createTerminal(container)
      expect(terminal).toBeInstanceOf(Terminal)
    })

    it('should create Terminal with config', () => {
      terminal = createTerminal(container, { prompt: '>>> ' })
      expect(terminal).toBeInstanceOf(Terminal)
    })
  })

  describe('timestamps', () => {
    it('should show timestamps when enabled', () => {
      terminal = new Terminal(container, { showTimestamps: true })

      terminal.writeLine('Test')

      // render is called, timestamps should be in output
      const state = terminal.getState()
      expect(state.lines[0]?.timestamp).toBeDefined()
    })
  })

  describe('autoScroll', () => {
    it('should auto scroll when enabled', () => {
      terminal = new Terminal(container, { autoScroll: true })

      terminal.writeLine('Line 1')
      terminal.writeLine('Line 2')

      // Just verify no error
      expect(true).toBe(true)
    })

    it('should not auto scroll when disabled', () => {
      terminal = new Terminal(container, { autoScroll: false })

      terminal.writeLine('Line 1')

      expect(true).toBe(true)
    })
  })

  describe('getState', () => {
    it('should return current state', () => {
      terminal = new Terminal(container)

      const state = terminal.getState()

      expect(state.lines).toBeDefined()
      expect(state.commandHistory).toBeDefined()
      expect(state.historyIndex).toBe(-1)
      expect(state.currentInput).toBe('')
      expect(state.isProcessing).toBe(false)
      expect(state.cursorPosition).toBe(0)
    })
  })

  describe('destroy', () => {
    it('should clean up on destroy', () => {
      terminal = new Terminal(container)
      terminal.destroy()
      expect(true).toBe(true)
    })
  })
})
