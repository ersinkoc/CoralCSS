/**
 * Progress Component
 *
 * React wrapper for CoralCSS Progress component.
 */

import React, { forwardRef } from 'react'

export type ProgressVariant = 'default' | 'success' | 'warning' | 'error'
export type ProgressSize = 'sm' | 'md' | 'lg'

export interface ProgressProps {
  /** Progress value (0-100) */
  value?: number
  /** Maximum value */
  max?: number
  /** Variant */
  variant?: ProgressVariant
  /** Size */
  size?: ProgressSize
  /** Show value label */
  showValue?: boolean
  /** Indeterminate state (animated) */
  indeterminate?: boolean
  /** Additional class */
  className?: string
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      variant = 'default',
      size = 'md',
      showValue = false,
      indeterminate = false,
      className,
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100))

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        data-coral-progress
        data-variant={variant}
        data-size={size}
        data-indeterminate={indeterminate || undefined}
        className={className}
      >
        <div
          data-coral-progress-bar
          style={{
            width: indeterminate ? undefined : `${percentage}%`,
          }}
        />
        {showValue && !indeterminate && (
          <span data-coral-progress-value>{Math.round(percentage)}%</span>
        )}
      </div>
    )
  }
)

Progress.displayName = 'Progress'
