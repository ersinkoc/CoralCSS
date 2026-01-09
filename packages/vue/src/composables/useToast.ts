/**
 * useToast Composable
 *
 * Toast notification system for Vue.
 */

import { ref, reactive } from 'vue'

export interface ToastOptions {
  id?: string
  title?: string
  description?: string
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
  duration?: number
  dismissible?: boolean
}

export interface Toast extends ToastOptions {
  id: string
}

const toasts = reactive<Toast[]>([])
let toastId = 0

export function useToast() {
  const toast = (options: ToastOptions) => {
    const id = options.id ?? `toast-${++toastId}`
    const newToast: Toast = {
      id,
      variant: 'default',
      duration: 5000,
      dismissible: true,
      ...options,
    }

    toasts.push(newToast)

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        dismiss(id)
      }, newToast.duration)
    }

    return id
  }

  const dismiss = (id: string) => {
    const index = toasts.findIndex((t) => t.id === id)
    if (index > -1) {
      toasts.splice(index, 1)
    }
  }

  const dismissAll = () => {
    toasts.splice(0, toasts.length)
  }

  // Convenience methods
  const success = (title: string, description?: string) =>
    toast({ title, description, variant: 'success' })

  const error = (title: string, description?: string) =>
    toast({ title, description, variant: 'error' })

  const warning = (title: string, description?: string) =>
    toast({ title, description, variant: 'warning' })

  const info = (title: string, description?: string) =>
    toast({ title, description, variant: 'info' })

  return {
    toasts,
    toast,
    dismiss,
    dismissAll,
    success,
    error,
    warning,
    info,
  }
}
