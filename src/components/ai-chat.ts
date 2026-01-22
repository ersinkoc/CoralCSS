/**
 * AI Chat Component
 *
 * A modern AI chat interface similar to ChatGPT/Claude.
 * Features: streaming responses, markdown support, code blocks, regeneration.
 * @module components/ai-chat
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Chat message types
 */
export type MessageRole = 'user' | 'assistant' | 'system'
export type MessageStatus = 'pending' | 'streaming' | 'complete' | 'error'

/**
 * Chat message interface
 */
export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: Date
  status: MessageStatus
  error?: string
  metadata?: Record<string, unknown>
  isEditing?: boolean
  originalContent?: string
}

/**
 * Suggested prompt/action
 */
export interface SuggestedPrompt {
  id: string
  label: string
  prompt: string
  icon?: string
}

/**
 * AI Chat configuration
 */
export interface AIChatConfig extends ComponentConfig {
  /**
   * Initial messages
   */
  messages?: ChatMessage[]

  /**
   * Placeholder text for input
   * @default 'Send a message...'
   */
  placeholder?: string

  /**
   * Welcome message when chat is empty
   */
  welcomeMessage?: string

  /**
   * Welcome title
   * @default 'How can I help you today?'
   */
  welcomeTitle?: string

  /**
   * Suggested prompts shown when chat is empty
   */
  suggestedPrompts?: SuggestedPrompt[]

  /**
   * Enable markdown rendering
   * @default true
   */
  enableMarkdown?: boolean

  /**
   * Enable code syntax highlighting
   * @default true
   */
  enableCodeHighlight?: boolean

  /**
   * Enable copy code button
   * @default true
   */
  enableCopyCode?: boolean

  /**
   * Enable message editing
   * @default true
   */
  enableEditing?: boolean

  /**
   * Enable message regeneration
   * @default true
   */
  enableRegenerate?: boolean

  /**
   * Enable stop generation
   * @default true
   */
  enableStopGeneration?: boolean

  /**
   * Show timestamps
   * @default false
   */
  showTimestamps?: boolean

  /**
   * Maximum message length
   * @default 10000
   */
  maxLength?: number

  /**
   * Auto-scroll to bottom on new messages
   * @default true
   */
  autoScroll?: boolean

  /**
   * Show typing indicator during streaming
   * @default true
   */
  showTypingIndicator?: boolean

  /**
   * User avatar URL or initials
   */
  userAvatar?: string

  /**
   * Assistant avatar URL or initials
   */
  assistantAvatar?: string

  /**
   * Assistant name
   * @default 'Assistant'
   */
  assistantName?: string

  /**
   * User name
   * @default 'You'
   */
  userName?: string

  /**
   * Send message handler
   */
  onSend?: (message: string, messages: ChatMessage[]) => void | Promise<void>

  /**
   * Regenerate message handler
   */
  onRegenerate?: (messageId: string, messages: ChatMessage[]) => void | Promise<void>

  /**
   * Stop generation handler
   */
  onStop?: () => void

  /**
   * Edit message handler
   */
  onEdit?: (messageId: string, newContent: string, messages: ChatMessage[]) => void | Promise<void>

  /**
   * Copy message handler
   */
  onCopy?: (content: string) => void

  /**
   * Message container selector
   * @default '[data-coral-chat-messages]'
   */
  messagesSelector?: string

  /**
   * Input selector
   * @default '[data-coral-chat-input]'
   */
  inputSelector?: string

  /**
   * Send button selector
   * @default '[data-coral-chat-send]'
   */
  sendSelector?: string

  /**
   * Stop button selector
   * @default '[data-coral-chat-stop]'
   */
  stopSelector?: string
}

/**
 * AI Chat state
 */
export interface AIChatState extends ComponentState {
  messages: ChatMessage[]
  inputValue: string
  isLoading: boolean
  isStreaming: boolean
  currentStreamingId: string | null
  editingMessageId: string | null
}

/**
 * Default configuration
 */
const defaultConfig: AIChatConfig = {
  messages: [],
  placeholder: 'Send a message...',
  welcomeTitle: 'How can I help you today?',
  enableMarkdown: true,
  enableCodeHighlight: true,
  enableCopyCode: true,
  enableEditing: true,
  enableRegenerate: true,
  enableStopGeneration: true,
  showTimestamps: false,
  maxLength: 10000,
  autoScroll: true,
  showTypingIndicator: true,
  assistantName: 'Assistant',
  userName: 'You',
  messagesSelector: '[data-coral-chat-messages]',
  inputSelector: '[data-coral-chat-input]',
  sendSelector: '[data-coral-chat-send]',
  stopSelector: '[data-coral-chat-stop]',
}

/**
 * AI Chat Component Class
 */
export class AIChat extends BaseComponent {
  protected declare config: AIChatConfig
  protected declare state: AIChatState
  private messagesContainer: HTMLElement | null = null
  private inputElement: HTMLTextAreaElement | null = null
  private sendButton: HTMLElement | null = null
  private stopButton: HTMLElement | null = null

  protected getDefaultConfig(): AIChatConfig {
    return { ...defaultConfig }
  }

  protected getInitialState(): AIChatState {
    return {
      messages: this.config.messages || [],
      inputValue: '',
      isLoading: false,
      isStreaming: false,
      currentStreamingId: null,
      editingMessageId: null,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'region')
    this.element.setAttribute('aria-label', 'AI Chat')

    // Set up messages container
    this.messagesContainer = this.element.querySelector(this.config.messagesSelector || '[data-coral-chat-messages]')
    if (this.messagesContainer) {
      this.messagesContainer.setAttribute('role', 'log')
      this.messagesContainer.setAttribute('aria-live', 'polite')
      this.messagesContainer.setAttribute('aria-label', 'Chat messages')
    }

    // Set up input
    this.inputElement = this.element.querySelector(this.config.inputSelector || '[data-coral-chat-input]')
    if (this.inputElement) {
      this.inputElement.setAttribute('aria-label', 'Message input')
      this.inputElement.setAttribute('placeholder', this.config.placeholder || 'Send a message...')
    }

    // Set up buttons
    this.sendButton = this.element.querySelector(this.config.sendSelector || '[data-coral-chat-send]')
    this.stopButton = this.element.querySelector(this.config.stopSelector || '[data-coral-chat-stop]')
  }

  protected bindEvents(): void {
    // Input handlers
    if (this.inputElement) {
      const handleInput = (e: Event) => {
        const target = e.target as HTMLTextAreaElement
        this.setState({ inputValue: target.value })
        this.autoResizeInput()
      }
      this.inputElement.addEventListener('input', handleInput)
      this.boundHandlers.set('input', handleInput)

      const handleKeydown = (e: KeyboardEvent) => {
        // Send on Enter (without Shift)
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          this.sendMessage()
        }
      }
      this.inputElement.addEventListener('keydown', handleKeydown as EventListener)
      this.boundHandlers.set('keydown', handleKeydown as EventListener)
    }

    // Send button
    if (this.sendButton) {
      const handleSend = () => this.sendMessage()
      this.sendButton.addEventListener('click', handleSend)
      this.boundHandlers.set('send', handleSend)
    }

    // Stop button
    if (this.stopButton) {
      const handleStop = () => this.stopGeneration()
      this.stopButton.addEventListener('click', handleStop)
      this.boundHandlers.set('stop', handleStop)
    }

    // Delegate events for message actions (using tracked listener for cleanup)
    const handleDelegatedClick = (e: Event) => {
      const target = e.target as HTMLElement

      // Copy code
      if (target.closest('[data-coral-chat-copy-code]')) {
        const codeBlock = target.closest('[data-coral-chat-code-block]')
        const code = codeBlock?.querySelector('code')?.textContent || ''
        this.copyToClipboard(code)
      }

      // Copy message
      if (target.closest('[data-coral-chat-copy-message]')) {
        const messageEl = target.closest('[data-coral-chat-message]')
        const messageId = messageEl?.getAttribute('data-message-id')
        const message = this.state.messages.find(m => m.id === messageId)
        if (message) {
          this.copyToClipboard(message.content)
        }
      }

      // Regenerate
      if (target.closest('[data-coral-chat-regenerate]')) {
        const messageEl = target.closest('[data-coral-chat-message]')
        const messageId = messageEl?.getAttribute('data-message-id')
        if (messageId) {
          this.regenerateMessage(messageId)
        }
      }

      // Edit message
      if (target.closest('[data-coral-chat-edit]')) {
        const messageEl = target.closest('[data-coral-chat-message]')
        const messageId = messageEl?.getAttribute('data-message-id')
        if (messageId) {
          this.startEditing(messageId)
        }
      }

      // Save edit
      if (target.closest('[data-coral-chat-save-edit]')) {
        this.saveEdit()
      }

      // Cancel edit
      if (target.closest('[data-coral-chat-cancel-edit]')) {
        this.cancelEdit()
      }

      // Suggested prompt
      if (target.closest('[data-coral-chat-suggested-prompt]')) {
        const promptEl = target.closest('[data-coral-chat-suggested-prompt]')
        const promptId = promptEl?.getAttribute('data-prompt-id')
        const prompt = this.config.suggestedPrompts?.find(p => p.id === promptId)
        if (prompt) {
          this.setState({ inputValue: prompt.prompt })
          if (this.inputElement) {
            this.inputElement.value = prompt.prompt
            this.inputElement.focus()
          }
        }
      }
    }
    this.addEventListener(this.element, 'click', handleDelegatedClick)
  }

  /**
   * Send a new message
   */
  async sendMessage(): Promise<void> {
    const content = this.state.inputValue.trim()
    if (!content || this.state.isLoading) {return}

    // Create user message
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content,
      timestamp: new Date(),
      status: 'complete',
    }

    // Add message and clear input
    this.setState({
      messages: [...this.state.messages, userMessage],
      inputValue: '',
      isLoading: true,
    })

    if (this.inputElement) {
      this.inputElement.value = ''
      this.autoResizeInput()
    }

    // Scroll to bottom
    if (this.config.autoScroll) {
      this.scrollToBottom()
    }

    // Emit event
    this.emit('send', { message: userMessage, messages: this.state.messages })

    // Call handler
    if (this.config.onSend) {
      try {
        await this.config.onSend(content, this.state.messages)
      } catch (error) {
        console.error('Send message error:', error)
      }
    }
  }

  /**
   * Add an assistant message (for external use)
   */
  addAssistantMessage(content: string, status: MessageStatus = 'complete'): string {
    const messageId = `msg-${Date.now()}-assistant`
    const assistantMessage: ChatMessage = {
      id: messageId,
      role: 'assistant',
      content,
      timestamp: new Date(),
      status,
    }

    this.setState({
      messages: [...this.state.messages, assistantMessage],
      isLoading: status === 'pending' || status === 'streaming',
      isStreaming: status === 'streaming',
      currentStreamingId: status === 'streaming' ? messageId : null,
    })

    if (this.config.autoScroll) {
      this.scrollToBottom()
    }

    return messageId
  }

  /**
   * Update a message (for streaming)
   */
  updateMessage(messageId: string, content: string, status?: MessageStatus): void {
    const messages = this.state.messages.map(m =>
      m.id === messageId
        ? { ...m, content, status: status || m.status }
        : m
    )

    this.setState({
      messages,
      isLoading: status === 'pending' || status === 'streaming',
      isStreaming: status === 'streaming',
      currentStreamingId: status === 'streaming' ? messageId : null,
    })

    if (this.config.autoScroll) {
      this.scrollToBottom()
    }
  }

  /**
   * Complete streaming
   */
  completeStreaming(messageId?: string): void {
    const targetId = messageId || this.state.currentStreamingId
    if (!targetId) {return}

    const messages = this.state.messages.map(m =>
      m.id === targetId
        ? { ...m, status: 'complete' as MessageStatus }
        : m
    )

    this.setState({
      messages,
      isLoading: false,
      isStreaming: false,
      currentStreamingId: null,
    })

    this.emit('streamComplete', { messageId: targetId })
  }

  /**
   * Set error on message
   */
  setMessageError(messageId: string, error: string): void {
    const messages = this.state.messages.map(m =>
      m.id === messageId
        ? { ...m, status: 'error' as MessageStatus, error }
        : m
    )

    this.setState({
      messages,
      isLoading: false,
      isStreaming: false,
      currentStreamingId: null,
    })

    this.emit('error', { messageId, error })
  }

  /**
   * Regenerate a message
   */
  async regenerateMessage(messageId: string): Promise<void> {
    if (this.state.isLoading) {return}

    // Find the message and all messages after it
    const messageIndex = this.state.messages.findIndex(m => m.id === messageId)
    if (messageIndex === -1) {return}

    // Remove this message and all subsequent messages
    const messages = this.state.messages.slice(0, messageIndex)

    this.setState({
      messages,
      isLoading: true,
    })

    this.emit('regenerate', { messageId, messages })

    if (this.config.onRegenerate) {
      try {
        await this.config.onRegenerate(messageId, messages)
      } catch (error) {
        console.error('Regenerate error:', error)
      }
    }
  }

  /**
   * Stop generation
   */
  stopGeneration(): void {
    if (!this.state.isStreaming) {return}

    if (this.state.currentStreamingId) {
      this.completeStreaming(this.state.currentStreamingId)
    }

    this.emit('stop', {})
    this.config.onStop?.()
  }

  /**
   * Start editing a message
   */
  startEditing(messageId: string): void {
    if (!this.config.enableEditing) {return}

    const message = this.state.messages.find(m => m.id === messageId)
    if (!message || message.role !== 'user') {return}

    const messages = this.state.messages.map(m =>
      m.id === messageId
        ? { ...m, isEditing: true, originalContent: m.content }
        : m
    )

    this.setState({
      messages,
      editingMessageId: messageId,
    })

    this.emit('editStart', { messageId })
  }

  /**
   * Save edited message
   */
  async saveEdit(): Promise<void> {
    const messageId = this.state.editingMessageId
    if (!messageId) {return}

    const editInput = this.element.querySelector(`[data-coral-chat-edit-input][data-message-id="${messageId}"]`) as HTMLTextAreaElement
    const newContent = editInput?.value.trim()

    if (!newContent) {return}

    // Find index and remove subsequent messages
    const messageIndex = this.state.messages.findIndex(m => m.id === messageId)
    if (messageIndex === -1) {return}

    const originalMessage = this.state.messages[messageIndex]!
    const messages = this.state.messages.slice(0, messageIndex).concat({
      ...originalMessage,
      content: newContent,
      isEditing: false,
      originalContent: undefined,
    } as ChatMessage)

    this.setState({
      messages,
      editingMessageId: null,
      isLoading: true,
    })

    this.emit('editSave', { messageId, newContent, messages })

    if (this.config.onEdit) {
      try {
        await this.config.onEdit(messageId, newContent, messages)
      } catch (error) {
        console.error('Edit error:', error)
      }
    }
  }

  /**
   * Cancel editing
   */
  cancelEdit(): void {
    const messageId = this.state.editingMessageId
    if (!messageId) {return}

    const messages = this.state.messages.map(m =>
      m.id === messageId
        ? { ...m, isEditing: false, content: m.originalContent || m.content, originalContent: undefined }
        : m
    )

    this.setState({
      messages,
      editingMessageId: null,
    })

    this.emit('editCancel', { messageId })
  }

  /**
   * Clear all messages
   */
  clearMessages(): void {
    this.setState({
      messages: [],
      isLoading: false,
      isStreaming: false,
      currentStreamingId: null,
      editingMessageId: null,
    })

    this.emit('clear', {})
  }

  /**
   * Get all messages
   */
  getMessages(): ChatMessage[] {
    return [...this.state.messages]
  }

  /**
   * Set messages externally
   */
  setMessages(messages: ChatMessage[]): void {
    this.setState({ messages })
  }

  /**
   * Copy text to clipboard
   */
  private async copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text)
      this.emit('copy', { text })
      this.config.onCopy?.(text)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  /**
   * Auto-resize textarea
   */
  private autoResizeInput(): void {
    if (!this.inputElement) {return}

    this.inputElement.style.height = 'auto'
    this.inputElement.style.height = `${Math.min(this.inputElement.scrollHeight, 200)}px`
  }

  /**
   * Scroll messages to bottom
   */
  scrollToBottom(): void {
    if (!this.messagesContainer) {return}

    requestAnimationFrame(() => {
      if (this.messagesContainer) {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight
      }
    })
  }

  /**
   * Focus input
   */
  focus(): void {
    this.inputElement?.focus()
  }

  /**
   * Get current state
   */
  override getState(): AIChatState {
    return { ...this.state }
  }

  /**
   * Destroy component
   */
  override destroy(): void {
    this.boundHandlers.forEach((handler, key) => {
      if (key === 'input' || key === 'keydown') {
        this.inputElement?.removeEventListener(key, handler)
      } else if (key === 'send') {
        this.sendButton?.removeEventListener('click', handler)
      } else if (key === 'stop') {
        this.stopButton?.removeEventListener('click', handler)
      }
    })
    this.boundHandlers.clear()
    super.destroy()
  }

  protected override render(): void {
    // Update send button state
    if (this.sendButton) {
      const canSend = this.state.inputValue.trim().length > 0 && !this.state.isLoading
      this.sendButton.toggleAttribute('disabled', !canSend)
      this.sendButton.setAttribute('aria-disabled', String(!canSend))
    }

    // Update stop button visibility
    if (this.stopButton) {
      this.stopButton.style.display = this.state.isStreaming ? '' : 'none'
    }

    // Update loading state
    this.element.setAttribute('data-loading', String(this.state.isLoading))
    this.element.setAttribute('data-streaming', String(this.state.isStreaming))
    this.element.setAttribute('data-empty', String(this.state.messages.length === 0))
  }
}

/**
 * Create AI Chat instance
 */
export const createAIChat = createComponentFactory<AIChat, AIChatConfig>(AIChat)

export default AIChat
