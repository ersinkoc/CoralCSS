<script setup lang="ts">
/**
 * ContextMenuItem Component
 */

import { inject } from 'vue'

defineProps<{
  disabled?: boolean
  inset?: boolean
}>()

const emit = defineEmits<{
  (e: 'select'): void
}>()

const onOpenChange = inject<(value: boolean) => void>('context-menu-onOpenChange')

const handleClick = () => {
  emit('select')
  onOpenChange?.(false)
}
</script>

<template>
  <div
    role="menuitem"
    data-coral-context-menu-item=""
    :data-disabled="disabled || undefined"
    :data-inset="inset || undefined"
    :aria-disabled="disabled"
    @click="!disabled && handleClick()"
  >
    <slot />
  </div>
</template>
