<script setup lang="ts">
/**
 * CommandItem Component
 */

import { inject, computed, onMounted, onUnmounted, type Ref } from 'vue'

const props = defineProps<{
  value?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'select', value: string): void
}>()

const search = inject<Ref<string>>('command-search')
const selectedValue = inject<Ref<string>>('command-selectedValue')
const registerItem = inject<(value: string) => void>('command-registerItem')
const unregisterItem = inject<(value: string) => void>('command-unregisterItem')
const setSelectedValue = inject<(value: string) => void>('command-setSelectedValue')

const itemValue = computed(() => props.value || '')

const isSelected = computed(() => selectedValue?.value === itemValue.value)

const isVisible = computed(() => {
  if (!search?.value) return true
  return itemValue.value.toLowerCase().includes(search.value.toLowerCase())
})

const handleClick = () => {
  if (props.disabled) return
  setSelectedValue?.(itemValue.value)
  emit('select', itemValue.value)
}

onMounted(() => {
  registerItem?.(itemValue.value)
})

onUnmounted(() => {
  unregisterItem?.(itemValue.value)
})
</script>

<template>
  <div
    v-if="isVisible"
    data-coral-command-item=""
    :data-selected="isSelected || undefined"
    :data-disabled="disabled || undefined"
    role="option"
    :aria-selected="isSelected"
    :aria-disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </div>
</template>
