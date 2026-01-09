<script setup lang="ts">
/**
 * SelectItem Component
 */

import { inject, computed, type Ref } from 'vue'

const props = defineProps<{
  value: string
  disabled?: boolean
}>()

const selectedValue = inject<Ref<string>>('select-value')
const onSelect = inject<(value: string, label: string) => void>('select-on-select')

const isSelected = computed(() => selectedValue?.value === props.value)

const handleClick = () => {
  if (!props.disabled && onSelect) {
    // Get the text content from the slot
    onSelect(props.value, props.value)
  }
}
</script>

<template>
  <div
    role="option"
    :aria-selected="isSelected"
    data-coral-select-item
    :data-selected="isSelected || undefined"
    :data-disabled="disabled || undefined"
    @click="handleClick"
  >
    <svg
      v-if="isSelected"
      data-coral-select-item-indicator
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
    <slot />
  </div>
</template>
