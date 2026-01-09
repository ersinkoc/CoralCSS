/**
 * Spinner Component
 *
 * React wrapper for CoralCSS Spinner component.
 */

import React, { forwardRef, HTMLAttributes } from 'react'

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'primary' | 'secondary'
}

/**
 * Spinner component for loading states
 *
 * @example
 * ```tsx
 * <Spinner size="md" />
 * <Spinner size="lg" variant="primary" />
 * ```
 */
export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'md', variant = 'default', className, ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      aria-label="Loading"
      data-coral-spinner=""
      data-size={size}
      data-variant={variant}
      className={className}
      {...props}
    >
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.25"
        />
        <path
          d="M12 2C6.47715 2 2 6.47715 2 12"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  )
)

Spinner.displayName = 'Spinner'

export default Spinner
