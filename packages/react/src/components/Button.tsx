/**
 * Button Component
 *
 * React wrapper for CoralCSS Button component.
 */

import React, { forwardRef, ButtonHTMLAttributes } from 'react'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive'
  | 'link'
  | 'soft'
  | 'success'
  | 'warning'
  | 'info'
  | 'gradient'
  | 'glow'

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  fullWidth?: boolean
  asChild?: boolean
}

/**
 * Button component with multiple variants and sizes
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">
 *   Click me
 * </Button>
 *
 * <Button variant="outline" loading>
 *   Saving...
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        data-coral-button=""
        data-variant={variant}
        data-size={size}
        data-loading={loading || undefined}
        data-full-width={fullWidth || undefined}
        disabled={disabled || loading}
        className={className}
        {...props}
      >
        {loading && (
          <span data-coral-button-spinner="" className="coral-button-spinner">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="8" cy="8" r="6" opacity="0.25" />
              <path d="M8 2a6 6 0 0 1 6 6" strokeLinecap="round">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 8 8"
                  to="360 8 8"
                  dur="0.75s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </span>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  size?: ButtonSize
  variant?: ButtonVariant
}

/**
 * Button Group component for grouping related buttons
 *
 * @example
 * ```tsx
 * <ButtonGroup>
 *   <Button>One</Button>
 *   <Button>Two</Button>
 *   <Button>Three</Button>
 * </ButtonGroup>
 * ```
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      orientation = 'horizontal',
      size,
      variant,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        data-coral-button-group=""
        data-orientation={orientation}
        data-size={size}
        data-variant={variant}
        role="group"
        className={className}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ButtonGroup.displayName = 'ButtonGroup'

export default Button
