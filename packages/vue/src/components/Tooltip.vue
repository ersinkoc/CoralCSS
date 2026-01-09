<script setup lang="ts">
/**
 * Tooltip Component
 *
 * Vue wrapper for CoralCSS Tooltip component.
 */

import { ref, provide, onUnmounted } from 'vue'

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left'

const props = withDefaults(
  defineProps<{
    position?: TooltipPosition
    delay?: number
  }>(),
  {
    position: 'top',
    delay: 300,
  }
)

const open = ref(false)
let timeout: ReturnType<typeof setTimeout> | null = null

const showTooltip = () => {
  timeout = setTimeout(() => {
    open.value = true
  }, props.delay)
}

const hideTooltip = () => {
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }
  open.value = false
}

provide('tooltip-open', open)
provide('tooltip-show', showTooltip)
provide('tooltip-hide', hideTooltip)
provide('tooltip-position', props.position)

onUnmounted(() => {
  if (timeout) clearTimeout(timeout)
})
</script>

<template>
  <div data-coral-tooltip :data-position="position">
    <slot :open="open" />
  </div>
</template>
