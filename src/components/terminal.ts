/**
 * Terminal Component
 *
 * A headless terminal/console emulator UI component with command history,
 * ANSI color support, customizable prompts, and themes.
 * Note: This is a UI component only - command handling is via callbacks.
 * @module components/terminal
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

// ============================================================================
// Types
// ============================================================================

export type TerminalTheme =
  | 'dark'
  | 'light'
  | 'retro-green'
  | 'retro-amber'
  | 'matrix'
  | 'dracula'
  | 'monokai'
  | 'nord'

export type OutputType = 'stdout' | 'stderr' | 'system' | 'input'

export interface TerminalLine {
  id: string
  content: string
  type: OutputType
  timestamp: Date
  isHTML?: boolean
}

export interface TerminalConfig extends ComponentConfig {
  /** Terminal prompt string (default: '$ ') */
  prompt?: string
  /** Welcome message shown on initialization */
  welcomeMessage?: string
  /** Maximum lines to keep in history */
  maxLines?: number
  /** Maximum command history entries */
  maxHistory?: number
  /** Enable auto-scroll to bottom */
  autoScroll?: boolean
  /** Terminal theme */
  theme?: TerminalTheme
  /** Read-only mode (no input) */
  readOnly?: boolean
  /** Enable timestamps */
  showTimestamps?: boolean
  /** Tab completion function */
  tabComplete?: (partial: string) => string[]
  /** Called when a command is submitted (for UI/application handling) */
  onCommand?: (command: string) => void | Promise<void>
  /** Called when Ctrl+C is pressed */
  onInterrupt?: () => void
  /** Called when Ctrl+D is pressed */
  onEOF?: () => void
  /** Called when Ctrl+L is pressed */
  onClear?: () => void
}

export interface TerminalState extends ComponentState {
  lines: TerminalLine[]
  commandHistory: string[]
  historyIndex: number
  currentInput: string
  isProcessing: boolean
  cursorPosition: number
}

// ============================================================================
// ANSI Color Parser
// ============================================================================

const ANSI_COLORS: Record<string, string> = {
  '30': 'color: #000000',
  '31': 'color: #cd0000',
  '32': 'color: #00cd00',
  '33': 'color: #cdcd00',
  '34': 'color: #0000ee',
  '35': 'color: #cd00cd',
  '36': 'color: #00cdcd',
  '37': 'color: #e5e5e5',
  '90': 'color: #7f7f7f',
  '91': 'color: #ff0000',
  '92': 'color: #00ff00',
  '93': 'color: #ffff00',
  '94': 'color: #5c5cff',
  '95': 'color: #ff00ff',
  '96': 'color: #00ffff',
  '97': 'color: #ffffff',
  '40': 'background-color: #000000',
  '41': 'background-color: #cd0000',
  '42': 'background-color: #00cd00',
  '43': 'background-color: #cdcd00',
  '44': 'background-color: #0000ee',
  '45': 'background-color: #cd00cd',
  '46': 'background-color: #00cdcd',
  '47': 'background-color: #e5e5e5',
  '1': 'font-weight: bold',
  '3': 'font-style: italic',
  '4': 'text-decoration: underline',
  '9': 'text-decoration: line-through',
}

/**
 * Parse ANSI escape codes and convert to HTML spans with styles
 */
function parseANSI(text: string): string {
  const ansiRegex = /\x1b\[([0-9;]*)m/g
  let result = ''
  let lastIndex = 0
  let currentStyles: string[] = []
  let match: RegExpExecArray | null

  while ((match = ansiRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const textBefore = escapeHTML(text.slice(lastIndex, match.index))
      if (currentStyles.length > 0) {
        result += `<span style="${currentStyles.join('; ')}">${textBefore}</span>`
      } else {
        result += textBefore
      }
    }

    const codes = (match[1] || '').split(';').filter((c) => c !== '')

    for (const code of codes) {
      if (code === '0' || code === '') {
        currentStyles = []
      } else if (ANSI_COLORS[code]) {
        currentStyles.push(ANSI_COLORS[code])
      }
    }

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    const remainingText = escapeHTML(text.slice(lastIndex))
    if (currentStyles.length > 0) {
      result += `<span style="${currentStyles.join('; ')}">${remainingText}</span>`
    } else {
      result += remainingText
    }
  }

  return result
}

function escapeHTML(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// ============================================================================
// Theme Styles
// ============================================================================

export const TERMINAL_THEMES: Record<TerminalTheme, Record<string, string>> = {
  dark: {
    background: '#1e1e1e',
    foreground: '#d4d4d4',
    cursor: '#ffffff',
    selection: '#264f78',
    prompt: '#569cd6',
  },
  light: {
    background: '#ffffff',
    foreground: '#333333',
    cursor: '#333333',
    selection: '#add6ff',
    prompt: '#0066cc',
  },
  'retro-green': {
    background: '#0a0a0a',
    foreground: '#33ff33',
    cursor: '#33ff33',
    selection: '#003300',
    prompt: '#00ff00',
  },
  'retro-amber': {
    background: '#0a0a00',
    foreground: '#ffb000',
    cursor: '#ffb000',
    selection: '#332200',
    prompt: '#ffc000',
  },
  matrix: {
    background: '#000000',
    foreground: '#00ff41',
    cursor: '#00ff41',
    selection: '#003b00',
    prompt: '#00ff41',
  },
  dracula: {
    background: '#282a36',
    foreground: '#f8f8f2',
    cursor: '#f8f8f2',
    selection: '#44475a',
    prompt: '#bd93f9',
  },
  monokai: {
    background: '#272822',
    foreground: '#f8f8f2',
    cursor: '#f8f8f2',
    selection: '#49483e',
    prompt: '#a6e22e',
  },
  nord: {
    background: '#2e3440',
    foreground: '#d8dee9',
    cursor: '#d8dee9',
    selection: '#434c5e',
    prompt: '#88c0d0',
  },
}

// ============================================================================
// Terminal Component
// ============================================================================

export class Terminal extends BaseComponent {
  protected declare config: TerminalConfig
  protected declare state: TerminalState
  private inputElement: HTMLInputElement | null = null

  protected getDefaultConfig(): TerminalConfig {
    return {
      prompt: '$ ',
      welcomeMessage: '',
      maxLines: 1000,
      maxHistory: 100,
      autoScroll: true,
      theme: 'dark',
      readOnly: false,
      showTimestamps: false,
    }
  }

  protected getInitialState(): TerminalState {
    return {
      lines: [],
      commandHistory: [],
      historyIndex: -1,
      currentInput: '',
      isProcessing: false,
      cursorPosition: 0,
    }
  }

  protected override init(): void {
    super.init()

    if (this.config.welcomeMessage) {
      this.writeLine(this.config.welcomeMessage, 'system')
    }

    this.dispatch('ready', {})
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'application')
    this.element.setAttribute('aria-label', 'Terminal')
  }

  protected bindEvents(): void {
    this.addEventListener(this.element, 'click', (e: Event) => {
      const target = e.target as HTMLElement
      if (!target.closest('button') && !target.closest('a')) {
        this.focus()
      }
    })

    this.addEventListener(this.element, 'keydown', (e: Event) => {
      this.handleKeyDown(e as KeyboardEvent)
    })
  }

  /**
   * Write a line to the terminal
   */
  writeLine(content: string, type: OutputType = 'stdout'): void {
    const line: TerminalLine = {
      id: this.generateLineId(),
      content,
      type,
      timestamp: new Date(),
      isHTML: false,
    }

    const lines = [...this.state.lines, line]

    if (this.config.maxLines && lines.length > this.config.maxLines) {
      lines.splice(0, lines.length - this.config.maxLines)
    }

    this.setState({ lines })
    this.dispatch('line', { line })

    if (this.config.autoScroll) {
      this.scrollToBottom()
    }
  }

  /**
   * Write HTML content to the terminal
   */
  writeHTML(html: string, type: OutputType = 'stdout'): void {
    const line: TerminalLine = {
      id: this.generateLineId(),
      content: html,
      type,
      timestamp: new Date(),
      isHTML: true,
    }

    const lines = [...this.state.lines, line]

    if (this.config.maxLines && lines.length > this.config.maxLines) {
      lines.splice(0, lines.length - this.config.maxLines)
    }

    this.setState({ lines })

    if (this.config.autoScroll) {
      this.scrollToBottom()
    }
  }

  /**
   * Write error output
   */
  writeError(content: string): void {
    this.writeLine(content, 'stderr')
  }

  /**
   * Clear the terminal
   */
  clear(): void {
    this.setState({ lines: [] })
    this.dispatch('clear', {})
  }

  /**
   * Process a command (UI-only, triggers callback for actual handling)
   */
  async processCommand(command: string): Promise<void> {
    if (this.state.isProcessing) {return}

    this.writeLine(`${this.config.prompt}${command}`, 'input')

    const commandHistory = [...this.state.commandHistory]
    if (command.trim() && commandHistory[commandHistory.length - 1] !== command) {
      commandHistory.push(command)
      if (this.config.maxHistory && commandHistory.length > this.config.maxHistory) {
        commandHistory.shift()
      }
    }

    this.setState({
      commandHistory,
      historyIndex: -1,
      currentInput: '',
      isProcessing: true,
    })

    try {
      await this.config.onCommand?.(command)
    } finally {
      this.setState({ isProcessing: false })
    }
  }

  /**
   * Set the current input value
   */
  setInput(value: string): void {
    this.setState({
      currentInput: value,
      cursorPosition: value.length,
    })
  }

  /**
   * Get the current input value
   */
  getInput(): string {
    return this.state.currentInput
  }

  /**
   * Get command history
   */
  getHistory(): string[] {
    return [...this.state.commandHistory]
  }

  /**
   * Clear command history
   */
  clearHistory(): void {
    this.setState({
      commandHistory: [],
      historyIndex: -1,
    })
  }

  /**
   * Get all terminal output as plain text
   */
  getOutput(): string {
    return this.state.lines.map((line: TerminalLine) => line.content).join('\n')
  }

  /**
   * Copy terminal output to clipboard
   */
  async copyToClipboard(): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(this.getOutput())
      this.dispatch('copy', {})
      return true
    } catch {
      return false
    }
  }

  /**
   * Focus the terminal input
   */
  focus(): void {
    this.inputElement?.focus()
  }

  /**
   * Blur the terminal input
   */
  blur(): void {
    this.inputElement?.blur()
  }

  /**
   * Scroll to bottom of terminal
   */
  scrollToBottom(): void {
    requestAnimationFrame(() => {
      const outputEl = this.element.querySelector('[data-terminal-output]')
      if (outputEl) {
        outputEl.scrollTop = outputEl.scrollHeight
      }
    })
  }

  /**
   * Navigate history up
   */
  historyUp(): void {
    const { commandHistory, historyIndex } = this.state

    if (commandHistory.length === 0) {return}

    let newIndex: number
    if (historyIndex === -1) {
      newIndex = commandHistory.length - 1
    } else if (historyIndex > 0) {
      newIndex = historyIndex - 1
    } else {
      return
    }

    const historyItem = commandHistory[newIndex]!
    this.setState({
      historyIndex: newIndex,
      currentInput: historyItem,
      cursorPosition: historyItem.length,
    })
  }

  /**
   * Navigate history down
   */
  historyDown(): void {
    const { commandHistory, historyIndex } = this.state

    if (historyIndex === -1) {return}

    if (historyIndex < commandHistory.length - 1) {
      const newIndex = historyIndex + 1
      const historyItem = commandHistory[newIndex]!
      this.setState({
        historyIndex: newIndex,
        currentInput: historyItem,
        cursorPosition: historyItem.length,
      })
    } else {
      this.setState({
        historyIndex: -1,
        currentInput: '',
        cursorPosition: 0,
      })
    }
  }

  /**
   * Handle tab completion
   */
  tabComplete(): void {
    if (!this.config.tabComplete) {return}

    const { currentInput } = this.state
    const completions = this.config.tabComplete(currentInput)

    if (completions.length === 1) {
      const completion = completions[0]!
      this.setState({
        currentInput: completion,
        cursorPosition: completion.length,
      })
    } else if (completions.length > 1) {
      this.writeLine(completions.join('  '), 'system')
    }
  }

  /**
   * Get theme colors
   */
  getThemeColors(): Record<string, string> {
    const theme = this.config.theme || 'dark'
    return TERMINAL_THEMES[theme]
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (this.config.readOnly) {return}

    if (e.ctrlKey) {
      switch (e.key.toLowerCase()) {
        case 'c':
          this.config.onInterrupt?.()
          this.dispatch('interrupt', {})
          e.preventDefault()
          return
        case 'd':
          this.config.onEOF?.()
          this.dispatch('eof', {})
          e.preventDefault()
          return
        case 'l':
          this.clear()
          this.config.onClear?.()
          e.preventDefault()
          return
        case 'u':
          this.setInput('')
          e.preventDefault()
          return
      }
    }

    switch (e.key) {
      case 'ArrowUp':
        this.historyUp()
        e.preventDefault()
        break
      case 'ArrowDown':
        this.historyDown()
        e.preventDefault()
        break
      case 'Tab':
        this.tabComplete()
        e.preventDefault()
        break
      case 'Enter':
        if (!e.shiftKey) {
          this.processCommand(this.state.currentInput)
          e.preventDefault()
        }
        break
    }
  }

  private generateLineId(): string {
    return `term-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  protected override render(): void {
    const { lines } = this.state
    const theme = this.getThemeColors()

    const formattedLines = lines.map((line: TerminalLine) => {
      const content = line.isHTML ? line.content : parseANSI(line.content)

      const typeClass = `terminal-line-${line.type}`
      let colorStyle = ''

      switch (line.type) {
        case 'stderr':
          colorStyle = 'color: #ff6b6b;'
          break
        case 'system':
          colorStyle = `color: ${theme.prompt};`
          break
        case 'input':
          colorStyle = `color: ${theme.foreground}; opacity: 0.8;`
          break
      }

      const timestamp = this.config.showTimestamps
        ? `<span class="terminal-timestamp" style="color: ${theme.foreground}; opacity: 0.5;">[${line.timestamp.toLocaleTimeString()}]</span> `
        : ''

      return `<div class="terminal-line ${typeClass}" style="${colorStyle}" data-line-id="${line.id}">${timestamp}${content}</div>`
    })

    this.dispatch('render', {
      lines: formattedLines,
      theme,
      prompt: this.config.prompt,
      input: this.state.currentInput,
      isProcessing: this.state.isProcessing,
    })
  }
}

// ============================================================================
// Factory Function
// ============================================================================

export const createTerminal = createComponentFactory<Terminal, TerminalConfig>(Terminal)

export default Terminal
