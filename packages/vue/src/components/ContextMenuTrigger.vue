<script setup lang="ts">
/**
 * ContextMenuTrigger Component
 */

import { inject } from 'vue'

defineProps<{
  disabled?: boolean
}>()

const onOpenChange = inject<(value: boolean) => void>('context-menu-onOpenChange')
const setPosition = inject<(pos: { x: number; y: number }) => void>('context-menu-setPosition')

const handleContextMenu = (e: MouseEvent) => {
  e.preventDefault()
  setPosition?.({ x: e.clientX, y: e.clientY })
  onOpenChange?.(true)
}
</script>

<template>
  <div
    data-coral-context-menu-trigger=""
    :data-disabled="disabled || undefined"
    @contextmenu="!disabled && handleContextMenu($event)"
  >
    <slot />
  </div>
</template>
