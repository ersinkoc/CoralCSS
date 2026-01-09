<script setup lang="ts">
/**
 * Collapsible Component
 */

import { ref, provide, watch } from 'vue'

const props = defineProps<{
  open?: boolean
  defaultOpen?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const isOpen = ref(props.open ?? props.defaultOpen ?? false)

watch(() => props.open, (val) => {
  if (val !== undefined) isOpen.value = val
})

const toggle = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  emit('update:open', isOpen.value)
}

provide('collapsible-open', isOpen)
provide('collapsible-toggle', toggle)
provide('collapsible-disabled', props.disabled)
</script>

<template>
  <div
    data-coral-collapsible=""
    :data-state="isOpen ? 'open' : 'closed'"
    :data-disabled="disabled || undefined"
  >
    <slot :open="isOpen" />
  </div>
</template>
