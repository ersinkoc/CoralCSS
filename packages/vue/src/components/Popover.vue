<script setup lang="ts">
/**
 * Popover Component
 *
 * Vue wrapper for CoralCSS Popover component.
 */

import { ref, provide, watch } from 'vue'

export type PopoverPosition = 'top' | 'right' | 'bottom' | 'left'
export type PopoverAlign = 'start' | 'center' | 'end'

const props = withDefaults(
  defineProps<{
    open?: boolean
    position?: PopoverPosition
    align?: PopoverAlign
  }>(),
  {
    open: false,
    position: 'bottom',
    align: 'center',
  }
)

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const internalOpen = ref(props.open)

watch(() => props.open, (val) => {
  internalOpen.value = val
})

const toggle = () => {
  internalOpen.value = !internalOpen.value
  emit('update:open', internalOpen.value)
}

const close = () => {
  internalOpen.value = false
  emit('update:open', false)
}

provide('popover-open', internalOpen)
provide('popover-toggle', toggle)
provide('popover-close', close)
provide('popover-position', props.position)
provide('popover-align', props.align)
</script>

<template>
  <div data-coral-popover :data-position="position">
    <slot :open="internalOpen" :toggle="toggle" :close="close" />
  </div>
</template>
