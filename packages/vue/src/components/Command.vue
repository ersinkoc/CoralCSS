<script setup lang="ts">
/**
 * Command Component
 */

import { ref, provide } from 'vue'

defineProps<{
  loop?: boolean
}>()

const emit = defineEmits<{
  (e: 'select', value: string): void
}>()

const search = ref('')
const selectedValue = ref('')
const items = ref<string[]>([])

const registerItem = (value: string) => {
  items.value = [...items.value, value]
}

const unregisterItem = (value: string) => {
  items.value = items.value.filter(v => v !== value)
}

const setSelectedValue = (value: string) => {
  selectedValue.value = value
  emit('select', value)
}

provide('command-search', search)
provide('command-selectedValue', selectedValue)
provide('command-items', items)
provide('command-registerItem', registerItem)
provide('command-unregisterItem', unregisterItem)
provide('command-setSelectedValue', setSelectedValue)
</script>

<template>
  <div data-coral-command="">
    <slot />
  </div>
</template>
