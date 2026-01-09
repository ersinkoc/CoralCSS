<script setup lang="ts">
/**
 * Dropdown Component
 *
 * Vue wrapper for CoralCSS Dropdown component.
 */

import { ref, provide, onMounted, onUnmounted } from 'vue'

const props = withDefaults(
  defineProps<{
    open?: boolean
  }>(),
  {
    open: false,
  }
)

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const internalOpen = ref(props.open)

const toggle = () => {
  internalOpen.value = !internalOpen.value
  emit('update:open', internalOpen.value)
}

const close = () => {
  internalOpen.value = false
  emit('update:open', false)
}

provide('dropdown-open', internalOpen)
provide('dropdown-toggle', toggle)
provide('dropdown-close', close)
</script>

<template>
  <div data-coral-dropdown :data-open="internalOpen || undefined">
    <slot :open="internalOpen" :toggle="toggle" :close="close" />
  </div>
</template>
