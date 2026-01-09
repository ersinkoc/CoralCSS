/**
 * Checkbox Component
 *
 * React wrapper for CoralCSS Checkbox component.
 */

import React, { forwardRef, useId } from 'react'

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Label text for the checkbox */
  label?: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Error state */
  error?: boolean
  /** Indeterminate state */
  indeterminate?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      size = 'md',
      error = false,
      indeterminate = false,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const checkboxId = id || generatedId

    return (
      <label
        data-coral-checkbox-wrapper
        data-size={size}
        data-error={error || undefined}
        data-disabled={props.disabled || undefined}
        className={className}
      >
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          data-coral-checkbox
          data-size={size}
          data-indeterminate={indeterminate || undefined}
          {...props}
        />
        <span data-coral-checkbox-indicator />
        {label && <span data-coral-checkbox-label>{label}</span>}
      </label>
    )
  }
)

Checkbox.displayName = 'Checkbox'
