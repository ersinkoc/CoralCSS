/**
 * Input Component
 *
 * React wrapper for CoralCSS Input component.
 */

import React, { forwardRef, InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'filled' | 'underlined'
  error?: boolean
  success?: boolean
}

/**
 * Input component with multiple variants
 *
 * @example
 * ```tsx
 * <Input placeholder="Enter your email" type="email" />
 * <Input variant="filled" placeholder="Filled input" />
 * <Input error placeholder="Invalid input" />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = 'default', error, success, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        data-coral-input=""
        data-variant={variant}
        data-error={error || undefined}
        data-success={success || undefined}
        className={className}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input
