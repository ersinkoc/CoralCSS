/**
 * useCoralComponent Hook
 *
 * React hook for integrating CoralCSS headless components.
 */

import { useEffect, useRef, useCallback } from 'react'
import type { BaseComponent } from '@coral-css/core/components'

type ComponentClass<T extends BaseComponent, C> = new (
  element: HTMLElement,
  config?: Partial<C>
) => T

interface UseCoralComponentOptions<C> {
  config?: Partial<C>
  onInit?: () => void
  onDestroy?: () => void
}

/**
 * Hook to manage CoralCSS component lifecycle in React
 *
 * @example
 * ```tsx
 * import { useCoralComponent } from '@coral-css/react'
 * import { Dialog as CoralDialog } from '@coral-css/core/components'
 *
 * function MyDialog() {
 *   const { ref, instance } = useCoralComponent(CoralDialog, {
 *     config: { closeOnEscape: true }
 *   })
 *
 *   return (
 *     <div ref={ref} data-coral-dialog>
 *       ...
 *     </div>
 *   )
 * }
 * ```
 */
export function useCoralComponent<T extends BaseComponent, C>(
  ComponentClass: ComponentClass<T, C>,
  options: UseCoralComponentOptions<C> = {}
) {
  const ref = useRef<HTMLElement>(null)
  const instanceRef = useRef<T | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Create component instance
    instanceRef.current = new ComponentClass(element, options.config)
    options.onInit?.()

    // Cleanup on unmount
    return () => {
      instanceRef.current?.destroy()
      instanceRef.current = null
      options.onDestroy?.()
    }
  }, [ComponentClass, options.config])

  const getInstance = useCallback(() => instanceRef.current, [])

  return {
    ref,
    instance: instanceRef.current,
    getInstance,
  }
}

export default useCoralComponent
