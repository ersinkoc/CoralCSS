<script setup lang="ts">
/**
 * DropdownItem Component
 */

import { inject } from 'vue'

const props = defineProps<{
  disabled?: boolean
  destructive?: boolean
}>()

const emit = defineEmits<{
  (e: 'select'): void
}>()

const close = inject<() => void>('dropdown-close')

const handleClick = () => {
  if (props.disabled) return
  emit('select')
  close?.()
}
</script>

<template>
  <div
    role="menuitem"
    data-coral-dropdown-item
    :data-disabled="disabled || undefined"
    :data-destructive="destructive || undefined"
    @click="handleClick"
  >
    <slot />
  </div>
</template>
