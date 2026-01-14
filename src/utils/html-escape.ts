/**
 * HTML Escape Utilities
 *
 * Safe HTML string handling to prevent XSS attacks.
 * Use these utilities when rendering user-provided content.
 *
 * @module utils/html-escape
 */

/**
 * Characters that need to be escaped in HTML content
 */
const HTML_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '`': '&#96;',
}

/**
 * Regex pattern for characters that need escaping
 */
const HTML_ESCAPE_REGEX = /[&<>"'`]/g

/**
 * Escape HTML special characters in a string
 *
 * @example
 * ```typescript
 * escapeHtml('<script>alert("xss")</script>')
 * // Returns: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
 * ```
 */
export function escapeHtml(str: string): string {
  if (typeof str !== 'string') {
    return String(str ?? '')
  }

  return str.replace(HTML_ESCAPE_REGEX, char => HTML_ESCAPE_MAP[char] ?? char)
}

/**
 * Escape HTML and preserve line breaks by converting them to <br>
 *
 * @example
 * ```typescript
 * escapeHtmlPreserveBreaks('Hello\nWorld')
 * // Returns: 'Hello<br>World'
 * ```
 */
export function escapeHtmlPreserveBreaks(str: string): string {
  return escapeHtml(str).replace(/\n/g, '<br>')
}

/**
 * Create safe HTML content using template strings
 * Only use this when you need to include safe, pre-escaped content
 *
 * @example
 * ```typescript
 * const userInput = escapeHtml(untrustedData)
 * const html = safeHtml`<span>${userInput}</span>`
 * ```
 */
export function safeHtml(strings: TemplateStringsArray, ...values: string[]): string {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ?? '')
  }, '')
}

/**
 * Create an HTML element safely with text content (no HTML parsing)
 *
 * @example
 * ```typescript
 * const span = createTextElement('span', userInput, { className: 'message' })
 * ```
 */
export function createTextElement(
  tag: string,
  text: string,
  attributes?: Record<string, string>
): HTMLElement {
  const element = document.createElement(tag)
  element.textContent = text

  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value
      } else {
        element.setAttribute(key, value)
      }
    })
  }

  return element
}

/**
 * Safely set text content on an element
 * This is always safe as textContent doesn't parse HTML
 *
 * @example
 * ```typescript
 * setTextContent(element, userInput)
 * ```
 */
export function setTextContent(element: Element, text: string): void {
  element.textContent = text
}

/**
 * Check if a string contains potential XSS patterns
 * Useful for validation before accepting user input
 */
export function containsHtmlTags(str: string): boolean {
  return /<[^>]*>/g.test(str)
}

/**
 * Strip all HTML tags from a string
 * Use when you only want plain text from potentially HTML content
 */
export function stripHtmlTags(str: string): string {
  return str.replace(/<[^>]*>/g, '')
}

/**
 * Sanitize a string for use as an HTML attribute value
 * More restrictive than escapeHtml for attribute contexts
 */
export function escapeAttribute(str: string): string {
  if (typeof str !== 'string') {
    return String(str ?? '')
  }

  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/`/g, '&#96;')
    .replace(/\\/g, '&#92;')
}

/**
 * Sanitize a URL to prevent javascript: and data: injection
 */
export function sanitizeUrl(url: string): string {
  if (typeof url !== 'string') {
    return ''
  }

  const trimmed = url.trim().toLowerCase()

  // Block dangerous protocols
  if (
    trimmed.startsWith('javascript:') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('vbscript:')
  ) {
    return ''
  }

  return url
}

export default {
  escapeHtml,
  escapeHtmlPreserveBreaks,
  safeHtml,
  createTextElement,
  setTextContent,
  containsHtmlTags,
  stripHtmlTags,
  escapeAttribute,
  sanitizeUrl,
}
