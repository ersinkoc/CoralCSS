<script setup lang="ts">
/**
 * PopoverContent Component
 */

import { inject, ref, onMounted, onUnmounted, type Ref } from 'vue'
import type { PopoverPosition, PopoverAlign } from './Popover.vue'

const open = inject<Ref<boolean>>('popover-open')
const close = inject<() => void>('popover-close')
const position = inject<PopoverPosition>('popover-position', 'bottom')
const align = inject<PopoverAlign>('popover-align', 'center')

const contentRef = ref<HTMLElement | null>(null)

const handleClickOutside = (e: MouseEvent) => {
  if (contentRef.value && !contentRef.value.contains(e.target as Node)) {
    close?.()
  }
}

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') close?.()
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <div
    v-if="open"
    ref="contentRef"
    data-coral-popover-content
    :data-position="position"
    :data-align="align"
    data-state="open"
  >
    <slot />
  </div>
</template>
