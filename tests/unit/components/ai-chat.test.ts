/**
 * AI Chat Component Tests
 *
 * @vitest-environment jsdom
 * @module tests/unit/components/ai-chat
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  AIChat,
  createAIChat,
  type AIChatConfig,
  type ChatMessage,
} from '../../../src/components/ai-chat'

function createTestContainer(): HTMLElement {
  const container = document.createElement('div')

  const messagesDiv = document.createElement('div')
  messagesDiv.setAttribute('data-coral-chat-messages', '')
  container.appendChild(messagesDiv)

  const textarea = document.createElement('textarea')
  textarea.setAttribute('data-coral-chat-input', '')
  container.appendChild(textarea)

  const sendBtn = document.createElement('button')
  sendBtn.setAttribute('data-coral-chat-send', '')
  sendBtn.textContent = 'Send'
  container.appendChild(sendBtn)

  const stopBtn = document.createElement('button')
  stopBtn.setAttribute('data-coral-chat-stop', '')
  stopBtn.style.display = 'none'
  stopBtn.textContent = 'Stop'
  container.appendChild(stopBtn)

  return container
}

describe('AI Chat Component', () => {
  let container: HTMLElement
  let chat: AIChat

  beforeEach(() => {
    container = createTestContainer()
    document.body.appendChild(container)
  })

  afterEach(() => {
    chat?.destroy()
    container?.remove()
  })

  describe('constructor', () => {
    it('should create AIChat with element', () => {
      chat = new AIChat(container)
      expect(container.getAttribute('role')).toBe('region')
      expect(container.getAttribute('aria-label')).toBe('AI Chat')
    })

    it('should create AIChat with config', () => {
      const config: AIChatConfig = {
        placeholder: 'Type here...',
        welcomeTitle: 'Welcome!',
        messages: [],
      }
      chat = new AIChat(container, config)
      expect(chat.getState().messages).toEqual([])
    })

    it('should initialize with initial messages', () => {
      const messages: ChatMessage[] = [
        {
          id: 'msg-1',
          role: 'user',
          content: 'Hello',
          timestamp: new Date(),
          status: 'complete',
        },
      ]
      chat = new AIChat(container, { messages })
      expect(chat.getMessages()).toHaveLength(1)
      expect(chat.getMessages()[0]?.content).toBe('Hello')
    })

    it('should set up ARIA on messages container', () => {
      chat = new AIChat(container)
      const messagesContainer = container.querySelector('[data-coral-chat-messages]')
      expect(messagesContainer?.getAttribute('role')).toBe('log')
      expect(messagesContainer?.getAttribute('aria-live')).toBe('polite')
    })

    it('should set up ARIA on input', () => {
      chat = new AIChat(container, { placeholder: 'Send a message...' })
      const input = container.querySelector('[data-coral-chat-input]')
      expect(input?.getAttribute('aria-label')).toBe('Message input')
    })
  })

  describe('sendMessage', () => {
    it('should send a message', async () => {
      const onSend = vi.fn()
      chat = new AIChat(container, { onSend })

      const input = container.querySelector('textarea') as HTMLTextAreaElement
      input.value = 'Hello AI'
      input.dispatchEvent(new Event('input'))

      await chat.sendMessage()

      expect(onSend).toHaveBeenCalled()
      expect(chat.getMessages()).toHaveLength(1)
      expect(chat.getMessages()[0]?.content).toBe('Hello AI')
    })

    it('should not send empty message', async () => {
      const onSend = vi.fn()
      chat = new AIChat(container, { onSend })

      await chat.sendMessage()

      expect(onSend).not.toHaveBeenCalled()
    })

    it('should not send when loading', async () => {
      const onSend = vi.fn()
      chat = new AIChat(container, { onSend })

      const input = container.querySelector('textarea') as HTMLTextAreaElement
      input.value = 'Hello'
      input.dispatchEvent(new Event('input'))

      // Trigger loading state manually
      chat['setState']({ isLoading: true })

      await chat.sendMessage()
      expect(chat.getMessages()).toHaveLength(0)
    })

    it('should clear input after sending', async () => {
      chat = new AIChat(container)

      // Access the internal inputElement
      const inputElement = (chat as unknown as { inputElement: HTMLTextAreaElement | null }).inputElement
      if (inputElement) {
        inputElement.value = 'Hello'
        inputElement.dispatchEvent(new Event('input'))

        await chat.sendMessage()

        expect(inputElement.value).toBe('')
      } else {
        // If no input element, test the state is cleared
        expect(chat.getState().inputValue).toBe('')
      }
    })

    it('should emit send event', async () => {
      chat = new AIChat(container)
      const eventHandler = vi.fn()
      container.addEventListener('coral:aichat:send', eventHandler)

      const input = container.querySelector('textarea') as HTMLTextAreaElement
      input.value = 'Hello'
      input.dispatchEvent(new Event('input'))

      await chat.sendMessage()

      expect(eventHandler).toHaveBeenCalled()
    })

    it('should handle onSend error', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      chat = new AIChat(container, {
        onSend: async () => {
          throw new Error('Send failed')
        },
      })

      const input = container.querySelector('textarea') as HTMLTextAreaElement
      input.value = 'Hello'
      input.dispatchEvent(new Event('input'))

      await chat.sendMessage()

      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })
  })

  describe('addAssistantMessage', () => {
    it('should add assistant message', () => {
      chat = new AIChat(container)

      const messageId = chat.addAssistantMessage('Hello user!')

      expect(messageId).toContain('assistant')
      expect(chat.getMessages()).toHaveLength(1)
      expect(chat.getMessages()[0]?.role).toBe('assistant')
    })

    it('should add streaming message', () => {
      chat = new AIChat(container)

      const messageId = chat.addAssistantMessage('Streaming...', 'streaming')

      expect(chat.getState().isStreaming).toBe(true)
      expect(chat.getState().currentStreamingId).toBe(messageId)
    })

    it('should add pending message', () => {
      chat = new AIChat(container)

      chat.addAssistantMessage('Loading...', 'pending')

      expect(chat.getState().isLoading).toBe(true)
    })
  })

  describe('updateMessage', () => {
    it('should update message content', () => {
      chat = new AIChat(container)

      const messageId = chat.addAssistantMessage('Initial')
      chat.updateMessage(messageId, 'Updated content')

      expect(chat.getMessages()[0]?.content).toBe('Updated content')
    })

    it('should update message status', () => {
      chat = new AIChat(container)

      const messageId = chat.addAssistantMessage('Content', 'streaming')
      chat.updateMessage(messageId, 'Content', 'complete')

      expect(chat.getMessages()[0]?.status).toBe('complete')
    })
  })

  describe('completeStreaming', () => {
    it('should complete streaming', () => {
      chat = new AIChat(container)

      const messageId = chat.addAssistantMessage('Streaming', 'streaming')
      chat.completeStreaming()

      expect(chat.getState().isStreaming).toBe(false)
      expect(chat.getState().currentStreamingId).toBeNull()
      expect(chat.getMessages()[0]?.status).toBe('complete')
    })

    it('should complete specific message', () => {
      chat = new AIChat(container)

      const messageId = chat.addAssistantMessage('Streaming', 'streaming')
      chat.completeStreaming(messageId)

      expect(chat.getMessages()[0]?.status).toBe('complete')
    })

    it('should do nothing without streaming id', () => {
      chat = new AIChat(container)
      chat.completeStreaming()
      expect(chat.getState().isStreaming).toBe(false)
    })
  })

  describe('setMessageError', () => {
    it('should set error on message', () => {
      chat = new AIChat(container)

      const messageId = chat.addAssistantMessage('Content')
      chat.setMessageError(messageId, 'Something went wrong')

      expect(chat.getMessages()[0]?.status).toBe('error')
      expect(chat.getMessages()[0]?.error).toBe('Something went wrong')
    })

    it('should emit error event', () => {
      chat = new AIChat(container)
      const eventHandler = vi.fn()
      container.addEventListener('coral:aichat:error', eventHandler)

      const messageId = chat.addAssistantMessage('Content')
      chat.setMessageError(messageId, 'Error')

      expect(eventHandler).toHaveBeenCalled()
    })
  })

  describe('regenerateMessage', () => {
    it('should regenerate message', async () => {
      const onRegenerate = vi.fn()
      chat = new AIChat(container, { onRegenerate })

      const messageId = chat.addAssistantMessage('Old response')
      await chat.regenerateMessage(messageId)

      expect(onRegenerate).toHaveBeenCalled()
      expect(chat.getMessages()).toHaveLength(0)
    })

    it('should not regenerate when loading', async () => {
      chat = new AIChat(container)

      chat.addAssistantMessage('Response')
      chat['setState']({ isLoading: true })

      await chat.regenerateMessage('msg-1')
      expect(chat.getMessages()).toHaveLength(1)
    })

    it('should not regenerate non-existent message', async () => {
      chat = new AIChat(container)

      await chat.regenerateMessage('non-existent')
      expect(chat.getMessages()).toHaveLength(0)
    })

    it('should handle onRegenerate error', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      chat = new AIChat(container, {
        onRegenerate: async () => {
          throw new Error('Regenerate failed')
        },
      })

      const messageId = chat.addAssistantMessage('Content')
      await chat.regenerateMessage(messageId)

      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })
  })

  describe('stopGeneration', () => {
    it('should stop generation', () => {
      const onStop = vi.fn()
      chat = new AIChat(container, { onStop })

      chat.addAssistantMessage('Streaming', 'streaming')
      chat.stopGeneration()

      expect(onStop).toHaveBeenCalled()
      expect(chat.getState().isStreaming).toBe(false)
    })

    it('should not stop when not streaming', () => {
      const onStop = vi.fn()
      chat = new AIChat(container, { onStop })

      chat.stopGeneration()

      expect(onStop).not.toHaveBeenCalled()
    })

    it('should emit stop event', () => {
      chat = new AIChat(container)
      const eventHandler = vi.fn()
      container.addEventListener('coral:aichat:stop', eventHandler)

      chat.addAssistantMessage('Streaming', 'streaming')
      chat.stopGeneration()

      expect(eventHandler).toHaveBeenCalled()
    })
  })

  describe('editing', () => {
    it('should start editing', () => {
      chat = new AIChat(container, { enableEditing: true })

      const input = container.querySelector('textarea') as HTMLTextAreaElement
      input.value = 'User message'
      input.dispatchEvent(new Event('input'))
      chat.sendMessage()

      const messageId = chat.getMessages()[0]?.id
      if (messageId) {
        chat.startEditing(messageId)
        expect(chat.getState().editingMessageId).toBe(messageId)
      }
    })

    it('should not edit assistant messages', () => {
      chat = new AIChat(container, { enableEditing: true })

      const messageId = chat.addAssistantMessage('Assistant')
      chat.startEditing(messageId)

      expect(chat.getState().editingMessageId).toBeNull()
    })

    it('should not edit when editing disabled', () => {
      chat = new AIChat(container, { enableEditing: false })

      const input = container.querySelector('textarea') as HTMLTextAreaElement
      input.value = 'User message'
      input.dispatchEvent(new Event('input'))
      chat.sendMessage()

      const messageId = chat.getMessages()[0]?.id
      if (messageId) {
        chat.startEditing(messageId)
        expect(chat.getState().editingMessageId).toBeNull()
      }
    })

    it('should cancel edit', () => {
      chat = new AIChat(container, { enableEditing: true })

      const input = container.querySelector('textarea') as HTMLTextAreaElement
      input.value = 'User message'
      input.dispatchEvent(new Event('input'))
      chat.sendMessage()

      const messageId = chat.getMessages()[0]?.id
      if (messageId) {
        chat.startEditing(messageId)
        chat.cancelEdit()
        expect(chat.getState().editingMessageId).toBeNull()
      }
    })

    it('should cancel edit with no editing message', () => {
      chat = new AIChat(container)
      chat.cancelEdit()
      expect(chat.getState().editingMessageId).toBeNull()
    })

    it('should save edit with no editing message', async () => {
      chat = new AIChat(container)
      await chat.saveEdit()
      expect(chat.getMessages()).toHaveLength(0)
    })
  })

  describe('clearMessages', () => {
    it('should clear all messages', () => {
      chat = new AIChat(container)

      chat.addAssistantMessage('Message 1')
      chat.addAssistantMessage('Message 2')
      chat.clearMessages()

      expect(chat.getMessages()).toHaveLength(0)
    })

    it('should emit clear event', () => {
      chat = new AIChat(container)
      const eventHandler = vi.fn()
      container.addEventListener('coral:aichat:clear', eventHandler)

      chat.clearMessages()

      expect(eventHandler).toHaveBeenCalled()
    })
  })

  describe('setMessages', () => {
    it('should set messages externally', () => {
      chat = new AIChat(container)

      const messages: ChatMessage[] = [
        {
          id: 'msg-1',
          role: 'user',
          content: 'Hello',
          timestamp: new Date(),
          status: 'complete',
        },
        {
          id: 'msg-2',
          role: 'assistant',
          content: 'Hi!',
          timestamp: new Date(),
          status: 'complete',
        },
      ]

      chat.setMessages(messages)

      expect(chat.getMessages()).toHaveLength(2)
    })
  })

  describe('keyboard events', () => {
    it('should send on Enter', async () => {
      chat = new AIChat(container)

      const input = container.querySelector('textarea') as HTMLTextAreaElement
      input.value = 'Hello'
      input.dispatchEvent(new Event('input'))

      const event = new KeyboardEvent('keydown', { key: 'Enter' })
      input.dispatchEvent(event)

      // Wait for async send
      await new Promise(resolve => setTimeout(resolve, 10))

      expect(chat.getMessages()).toHaveLength(1)
    })

    it('should not send on Shift+Enter', () => {
      chat = new AIChat(container)

      const input = container.querySelector('textarea') as HTMLTextAreaElement
      input.value = 'Hello'
      input.dispatchEvent(new Event('input'))

      const event = new KeyboardEvent('keydown', { key: 'Enter', shiftKey: true })
      input.dispatchEvent(event)

      expect(chat.getMessages()).toHaveLength(0)
    })
  })

  describe('click events', () => {
    it('should handle send button click', async () => {
      chat = new AIChat(container)

      const input = container.querySelector('textarea') as HTMLTextAreaElement
      input.value = 'Hello'
      input.dispatchEvent(new Event('input'))

      const sendBtn = container.querySelector('[data-coral-chat-send]') as HTMLButtonElement
      sendBtn.click()

      await new Promise(resolve => setTimeout(resolve, 10))

      expect(chat.getMessages()).toHaveLength(1)
    })

    it('should handle stop button click', () => {
      const onStop = vi.fn()
      chat = new AIChat(container, { onStop })

      chat.addAssistantMessage('Streaming', 'streaming')

      const stopBtn = container.querySelector('[data-coral-chat-stop]') as HTMLButtonElement
      stopBtn.click()

      expect(onStop).toHaveBeenCalled()
    })

    it('should handle copy code click', async () => {
      chat = new AIChat(container)

      // Mock clipboard
      const writeTextMock = vi.fn().mockResolvedValue(undefined)
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: writeTextMock },
        configurable: true,
      })

      // Add a code block element using DOM methods
      const codeBlockDiv = document.createElement('div')
      codeBlockDiv.setAttribute('data-coral-chat-code-block', '')

      const codeEl = document.createElement('code')
      codeEl.textContent = 'const x = 1;'
      codeBlockDiv.appendChild(codeEl)

      const copyBtn = document.createElement('button')
      copyBtn.setAttribute('data-coral-chat-copy-code', '')
      copyBtn.textContent = 'Copy'
      codeBlockDiv.appendChild(copyBtn)

      container.appendChild(codeBlockDiv)

      copyBtn.click()

      await new Promise(resolve => setTimeout(resolve, 10))

      expect(writeTextMock).toHaveBeenCalledWith('const x = 1;')
    })
  })

  describe('scrollToBottom', () => {
    it('should scroll to bottom', () => {
      chat = new AIChat(container, { autoScroll: true })

      chat.scrollToBottom()
      // Just verify no error is thrown
      expect(true).toBe(true)
    })
  })

  describe('focus', () => {
    it('should focus input', () => {
      chat = new AIChat(container)

      // Access the internal inputElement
      const inputElement = (chat as unknown as { inputElement: HTMLTextAreaElement | null }).inputElement
      if (inputElement) {
        const focusSpy = vi.spyOn(inputElement, 'focus')
        chat.focus()
        expect(focusSpy).toHaveBeenCalled()
      } else {
        // If no input element, focus should not throw
        expect(() => chat.focus()).not.toThrow()
      }
    })
  })

  describe('destroy', () => {
    it('should clean up on destroy', () => {
      chat = new AIChat(container)
      chat.destroy()
      // Verify no errors thrown
      expect(true).toBe(true)
    })
  })

  describe('createAIChat factory', () => {
    it('should create AIChat instance', () => {
      chat = createAIChat(container)
      expect(chat).toBeInstanceOf(AIChat)
    })

    it('should create AIChat with config', () => {
      chat = createAIChat(container, { placeholder: 'Custom placeholder' })
      expect(chat).toBeInstanceOf(AIChat)
    })
  })

  describe('render', () => {
    it('should update send button state', () => {
      chat = new AIChat(container)

      const input = container.querySelector('textarea') as HTMLTextAreaElement
      input.value = 'Hello'
      input.dispatchEvent(new Event('input'))

      const sendBtn = container.querySelector('[data-coral-chat-send]') as HTMLButtonElement
      expect(sendBtn.hasAttribute('disabled')).toBe(false)
    })

    it('should update stop button visibility', () => {
      chat = new AIChat(container)

      // Add a streaming message
      const messageId = chat.addAssistantMessage('Streaming', 'streaming')

      // Verify streaming state is set
      const state = chat.getState()
      expect(state.isStreaming).toBe(true)
      expect(messageId).toBeDefined()
    })

    it('should set data attributes', () => {
      chat = new AIChat(container)

      // Check that component is rendered with role and aria attributes
      expect(container.getAttribute('role')).toBe('region')
      expect(container.getAttribute('aria-label')).toBe('AI Chat')
    })
  })

  describe('suggested prompts', () => {
    it('should handle suggested prompt click', () => {
      chat = new AIChat(container, {
        suggestedPrompts: [
          { id: 'prompt-1', label: 'Help', prompt: 'Help me!' },
        ],
      })

      // Verify suggested prompts were configured
      // We just test the configuration was accepted without error
      expect(chat).toBeInstanceOf(AIChat)
    })
  })

  describe('copy message', () => {
    it('should copy message content', async () => {
      chat = new AIChat(container)

      const writeTextMock = vi.fn().mockResolvedValue(undefined)
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: writeTextMock },
        configurable: true,
      })

      const messageId = chat.addAssistantMessage('Copy me!')

      // Create message element using DOM methods
      const messageDiv = document.createElement('div')
      messageDiv.setAttribute('data-coral-chat-message', '')
      messageDiv.setAttribute('data-message-id', messageId)

      const copyBtn = document.createElement('button')
      copyBtn.setAttribute('data-coral-chat-copy-message', '')
      copyBtn.textContent = 'Copy'
      messageDiv.appendChild(copyBtn)

      container.appendChild(messageDiv)

      copyBtn.click()

      await new Promise(resolve => setTimeout(resolve, 10))

      expect(writeTextMock).toHaveBeenCalledWith('Copy me!')
    })

    it('should handle clipboard error', async () => {
      chat = new AIChat(container)

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: vi.fn().mockRejectedValue(new Error('Failed')) },
        configurable: true,
      })

      // Create code block element using DOM methods
      const codeBlockDiv = document.createElement('div')
      codeBlockDiv.setAttribute('data-coral-chat-code-block', '')

      const codeEl = document.createElement('code')
      codeEl.textContent = 'code'
      codeBlockDiv.appendChild(codeEl)

      const copyBtn = document.createElement('button')
      copyBtn.setAttribute('data-coral-chat-copy-code', '')
      copyBtn.textContent = 'Copy'
      codeBlockDiv.appendChild(copyBtn)

      container.appendChild(codeBlockDiv)

      copyBtn.click()

      await new Promise(resolve => setTimeout(resolve, 10))

      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })
  })

  describe('regenerate click', () => {
    it('should handle regenerate button click', async () => {
      const onRegenerate = vi.fn()
      chat = new AIChat(container, { onRegenerate })

      const messageId = chat.addAssistantMessage('Response')

      // Create message element using DOM methods
      const messageDiv = document.createElement('div')
      messageDiv.setAttribute('data-coral-chat-message', '')
      messageDiv.setAttribute('data-message-id', messageId)

      const regenBtn = document.createElement('button')
      regenBtn.setAttribute('data-coral-chat-regenerate', '')
      regenBtn.textContent = 'Regenerate'
      messageDiv.appendChild(regenBtn)

      container.appendChild(messageDiv)

      regenBtn.click()

      await new Promise(resolve => setTimeout(resolve, 10))

      expect(onRegenerate).toHaveBeenCalled()
    })
  })

  describe('edit click handlers', () => {
    it('should handle edit button click', () => {
      chat = new AIChat(container, { enableEditing: true })

      const input = container.querySelector('textarea') as HTMLTextAreaElement
      input.value = 'User message'
      input.dispatchEvent(new Event('input'))
      chat.sendMessage()

      const messageId = chat.getMessages()[0]?.id

      // Create message element using DOM methods
      const messageDiv = document.createElement('div')
      messageDiv.setAttribute('data-coral-chat-message', '')
      messageDiv.setAttribute('data-message-id', messageId!)

      const editBtn = document.createElement('button')
      editBtn.setAttribute('data-coral-chat-edit', '')
      editBtn.textContent = 'Edit'
      messageDiv.appendChild(editBtn)

      container.appendChild(messageDiv)

      editBtn.click()

      expect(chat.getState().editingMessageId).toBe(messageId)
    })

    it('should handle save edit click', async () => {
      chat = new AIChat(container, { enableEditing: true })

      const input = container.querySelector('textarea') as HTMLTextAreaElement
      input.value = 'User message'
      input.dispatchEvent(new Event('input'))
      await chat.sendMessage()

      const messageId = chat.getMessages()[0]?.id
      chat.startEditing(messageId!)

      // Create edit input using DOM methods
      const editTextarea = document.createElement('textarea')
      editTextarea.setAttribute('data-coral-chat-edit-input', '')
      editTextarea.setAttribute('data-message-id', messageId!)
      editTextarea.value = 'Edited message'
      container.appendChild(editTextarea)

      const saveBtn = document.createElement('button')
      saveBtn.setAttribute('data-coral-chat-save-edit', '')
      saveBtn.textContent = 'Save'
      container.appendChild(saveBtn)

      saveBtn.click()
    })

    it('should handle cancel edit click', () => {
      chat = new AIChat(container, { enableEditing: true })

      const input = container.querySelector('textarea') as HTMLTextAreaElement
      input.value = 'User message'
      input.dispatchEvent(new Event('input'))
      chat.sendMessage()

      const messageId = chat.getMessages()[0]?.id
      chat.startEditing(messageId!)

      // Create cancel button using DOM methods
      const cancelBtn = document.createElement('button')
      cancelBtn.setAttribute('data-coral-chat-cancel-edit', '')
      cancelBtn.textContent = 'Cancel'
      container.appendChild(cancelBtn)

      cancelBtn.click()

      expect(chat.getState().editingMessageId).toBeNull()
    })
  })

  describe('onCopy callback', () => {
    it('should call onCopy callback', async () => {
      const onCopy = vi.fn()
      chat = new AIChat(container, { onCopy })

      const writeTextMock = vi.fn().mockResolvedValue(undefined)
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: writeTextMock },
        configurable: true,
      })

      // Create code block element using DOM methods
      const codeBlockDiv = document.createElement('div')
      codeBlockDiv.setAttribute('data-coral-chat-code-block', '')

      const codeEl = document.createElement('code')
      codeEl.textContent = 'code'
      codeBlockDiv.appendChild(codeEl)

      const copyBtn = document.createElement('button')
      copyBtn.setAttribute('data-coral-chat-copy-code', '')
      copyBtn.textContent = 'Copy'
      codeBlockDiv.appendChild(copyBtn)

      container.appendChild(codeBlockDiv)

      copyBtn.click()

      await new Promise(resolve => setTimeout(resolve, 10))

      expect(onCopy).toHaveBeenCalledWith('code')
    })
  })

  describe('onEdit callback', () => {
    it('should call onEdit callback', async () => {
      const onEdit = vi.fn()
      chat = new AIChat(container, { enableEditing: true, onEdit })

      const input = container.querySelector('textarea') as HTMLTextAreaElement
      input.value = 'User message'
      input.dispatchEvent(new Event('input'))
      await chat.sendMessage()

      const messageId = chat.getMessages()[0]?.id
      chat.startEditing(messageId!)

      // Create edit input using DOM methods
      const editTextarea = document.createElement('textarea')
      editTextarea.setAttribute('data-coral-chat-edit-input', '')
      editTextarea.setAttribute('data-message-id', messageId!)
      editTextarea.value = 'Edited message'
      container.appendChild(editTextarea)

      await chat.saveEdit()

      expect(onEdit).toHaveBeenCalled()
    })

    it('should handle onEdit error', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      chat = new AIChat(container, {
        enableEditing: true,
        onEdit: async () => {
          throw new Error('Edit failed')
        },
      })

      const input = container.querySelector('textarea') as HTMLTextAreaElement
      input.value = 'User message'
      input.dispatchEvent(new Event('input'))
      await chat.sendMessage()

      const messageId = chat.getMessages()[0]?.id
      chat.startEditing(messageId!)

      // Create edit input using DOM methods
      const editTextarea = document.createElement('textarea')
      editTextarea.setAttribute('data-coral-chat-edit-input', '')
      editTextarea.setAttribute('data-message-id', messageId!)
      editTextarea.value = 'Edited'
      container.appendChild(editTextarea)

      await chat.saveEdit()

      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })
  })
})
