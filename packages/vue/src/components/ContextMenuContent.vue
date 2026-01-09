<script setup lang="ts">
/**
 * ContextMenuContent Component
 */

import { inject, onMounted, onUnmounted, type Ref } from 'vue'

defineProps<{
  forceMount?: boolean
  alignOffset?: number
  sideOffset?: number
}>()

const open = inject<Ref<boolean>>('context-menu-open')
const onOpenChange = inject<(value: boolean) => void>('context-menu-onOpenChange')
const position = inject<Ref<{ x: number; y: number }>>('context-menu-position')

const handleClickOutside = (e: MouseEvent) => {
  onOpenChange?.(false)
}

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    onOpenChange?.(false)
  }
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
    v-if="forceMount || open"
    data-coral-context-menu-content=""
    :data-state="open ? 'open' : 'closed'"
    role="menu"
    :style="{
      position: 'fixed',
      top: `${(position?.y || 0) + (sideOffset || 0)}px`,
      left: `${(position?.x || 0) + (alignOffset || 0)}px`,
    }"
    @click.stop
  >
    <slot />
  </div>
</template>
