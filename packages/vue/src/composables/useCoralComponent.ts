/**
 * useCoralComponent Composable
 *
 * Vue composable for integrating CoralCSS headless components.
 */

import { ref, onMounted, onUnmounted, type Ref } from 'vue'
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
 * Composable to manage CoralCSS component lifecycle in Vue
 *
 * @example
 * ```vue
 * <script setup>
 * import { useCoralComponent } from '@coral-css/vue'
 * import { Dialog as CoralDialog } from '@coral-css/core/components'
 *
 * const { templateRef, instance } = useCoralComponent(CoralDialog, {
 *   config: { closeOnEscape: true }
 * })
 * </script>
 *
 * <template>
 *   <div ref="templateRef" data-coral-dialog>
 *     ...
 *   </div>
 * </template>
 * ```
 */
export function useCoralComponent<T extends BaseComponent, C>(
  ComponentClass: ComponentClass<T, C>,
  options: UseCoralComponentOptions<C> = {}
) {
  const templateRef: Ref<HTMLElement | null> = ref(null)
  const instance: Ref<T | null> = ref(null)

  onMounted(() => {
    const element = templateRef.value
    if (!element) return

    instance.value = new ComponentClass(element, options.config)
    options.onInit?.()
  })

  onUnmounted(() => {
    instance.value?.destroy()
    instance.value = null
    options.onDestroy?.()
  })

  return {
    templateRef,
    instance,
  }
}

export default useCoralComponent
