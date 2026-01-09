/**
 * Alert Component
 *
 * React wrapper for CoralCSS Alert component.
 */

import React, { forwardRef, HTMLAttributes } from 'react'

export type AlertVariant = 'default' | 'info' | 'success' | 'warning' | 'error' | 'destructive'

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant
  dismissible?: boolean
  onDismiss?: () => void
}

/**
 * Alert component for notifications and messages
 *
 * @example
 * ```tsx
 * <Alert variant="success">
 *   <AlertTitle>Success!</AlertTitle>
 *   <AlertDescription>Your changes have been saved.</AlertDescription>
 * </Alert>
 * ```
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'default', dismissible, onDismiss, className, children, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      data-coral-alert=""
      data-variant={variant}
      className={className}
      {...props}
    >
      {children}
      {dismissible && (
        <button
          type="button"
          data-coral-alert-close=""
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
      )}
    </div>
  )
)

Alert.displayName = 'Alert'

export const AlertTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} data-coral-alert-title="" className={className} {...props} />
  )
)

AlertTitle.displayName = 'AlertTitle'

export const AlertDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} data-coral-alert-description="" className={className} {...props} />
  )
)

AlertDescription.displayName = 'AlertDescription'

export default Alert
