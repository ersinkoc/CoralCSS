/**
 * Toast Component
 *
 * React wrapper for CoralCSS Toast component with useToast hook.
 */

import React, { forwardRef, createContext, useContext, useState, useCallback, useEffect, HTMLAttributes } from 'react'

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info'

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  id?: string
  variant?: ToastVariant
  title?: string
  description?: string
  duration?: number
  onClose?: () => void
}

interface ToastData extends ToastProps {
  id: string
}

interface ToastContextValue {
  toasts: ToastData[]
  addToast: (toast: Omit<ToastData, 'id'>) => string
  removeToast: (id: string) => void
  removeAllToasts: () => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

let toastCount = 0

/**
 * Toast Provider for managing toasts
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const addToast = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = `toast-${++toastCount}`
    setToasts((prev) => [...prev, { ...toast, id }])
    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const removeAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  return React.createElement(
    ToastContext.Provider,
    { value: { toasts, addToast, removeToast, removeAllToasts } },
    children
  )
}

/**
 * Hook to show toasts
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { toast } = useToast()
 *
 *   return (
 *     <button onClick={() => toast({ title: 'Hello!', variant: 'success' })}>
 *       Show Toast
 *     </button>
 *   )
 * }
 * ```
 */
export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    // Return a no-op version if used outside provider
    return {
      toast: (_props: Omit<ToastData, 'id'>) => '',
      dismiss: (_id?: string) => {},
      toasts: [] as ToastData[],
    }
  }

  const { addToast, removeToast, removeAllToasts, toasts } = context

  const toast = useCallback(
    (props: Omit<ToastData, 'id'>) => {
      return addToast(props)
    },
    [addToast]
  )

  const dismiss = useCallback(
    (id?: string) => {
      if (id) {
        removeToast(id)
      } else {
        removeAllToasts()
      }
    },
    [removeToast, removeAllToasts]
  )

  return { toast, dismiss, toasts }
}

/**
 * Individual Toast component
 */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ id, variant = 'default', title, description, duration = 5000, onClose, className, children, ...props }, ref) => {
    useEffect(() => {
      if (duration > 0 && onClose) {
        const timer = setTimeout(onClose, duration)
        return () => clearTimeout(timer)
      }
    }, [duration, onClose])

    return (
      <div
        ref={ref}
        role="alert"
        data-coral-toast=""
        data-variant={variant}
        className={className}
        {...props}
      >
        <div data-coral-toast-content="">
          {title && <div data-coral-toast-title="">{title}</div>}
          {description && <div data-coral-toast-description="">{description}</div>}
          {children}
        </div>
        {onClose && (
          <button
            type="button"
            data-coral-toast-close=""
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        )}
      </div>
    )
  }
)

Toast.displayName = 'Toast'

/**
 * Toaster component that renders all active toasts
 */
export function Toaster() {
  const context = useContext(ToastContext)

  if (!context) return null

  const { toasts, removeToast } = context

  if (toasts.length === 0) return null

  return React.createElement(
    'div',
    { 'data-coral-toast-container': '', 'data-position': 'bottom-right' },
    toasts.map((toast) =>
      React.createElement(Toast, {
        key: toast.id,
        ...toast,
        onClose: () => {
          toast.onClose?.()
          removeToast(toast.id)
        },
      })
    )
  )
}

export default Toast
