<script setup lang="ts">
/**
 * Select Component
 *
 * Vue wrapper for CoralCSS Select component.
 */

import { ref, provide, computed, watch, onMounted, onUnmounted } from 'vue'

export type SelectSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    size?: SelectSize
    disabled?: boolean
  }>(),
  {
    placeholder: 'Select...',
    size: 'md',
    disabled: false,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const open = ref(false)
const internalValue = ref(props.modelValue || '')
const selectedLabel = ref('')

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== undefined) {
      internalValue.value = newVal
    }
  }
)

const handleSelect = (value: string, label: string) => {
  internalValue.value = value
  selectedLabel.value = label
  emit('update:modelValue', value)
  emit('change', value)
  open.value = false
}

const toggleOpen = () => {
  if (!props.disabled) {
    open.value = !open.value
  }
}

// Close on click outside
const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('[data-coral-select]')) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

provide('select-value', internalValue)
provide('select-on-select', handleSelect)
provide('select-size', props.size)
</script>

<template>
  <div
    data-coral-select
    :data-open="open || undefined"
    :data-disabled="disabled || undefined"
  >
    <button
      type="button"
      role="combobox"
      :aria-expanded="open"
      data-coral-select-trigger
      :data-size="size"
      @click="toggleOpen"
    >
      <span
        data-coral-select-value
        :data-placeholder="!internalValue || undefined"
      >
        {{ selectedLabel || internalValue || placeholder }}
      </span>
      <svg
        data-coral-select-icon
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
    <div
      v-if="open"
      role="listbox"
      data-coral-select-content
      data-state="open"
    >
      <slot />
    </div>
  </div>
</template>
