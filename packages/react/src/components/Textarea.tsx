/**
 * Textarea Component
 *
 * React wrapper for CoralCSS Textarea component.
 */

import React, { forwardRef, TextareaHTMLAttributes } from 'react'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'filled' | 'ghost'
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  error?: boolean
}

/**
 * Textarea component for multi-line text input
 *
 * @example
 * ```tsx
 * <Textarea placeholder="Enter your message..." rows={4} />
 * ```
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ variant = 'default', resize = 'vertical', error, className, ...props }, ref) => (
    <textarea
      ref={ref}
      data-coral-textarea=""
      data-variant={variant}
      data-resize={resize}
      data-error={error || undefined}
      className={className}
      {...props}
    />
  )
)

Textarea.displayName = 'Textarea'

export default Textarea
