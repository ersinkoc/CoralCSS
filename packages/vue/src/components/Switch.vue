<script setup lang="ts">
/**
 * Switch Component
 *
 * Vue wrapper for CoralCSS Switch component.
 */

import { computed } from 'vue'

export type SwitchSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    size?: SwitchSize
    disabled?: boolean
    label?: string
  }>(),
  {
    modelValue: false,
    size: 'md',
    disabled: false,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

const isChecked = computed(() => props.modelValue)

const toggle = () => {
  if (props.disabled) return
  const newValue = !props.modelValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    toggle()
  }
}
</script>

<template>
  <label
    data-coral-switch-wrapper
    :data-disabled="disabled || undefined"
  >
    <button
      type="button"
      role="switch"
      data-coral-switch
      :data-size="size"
      :data-checked="isChecked || undefined"
      :aria-checked="isChecked"
      :disabled="disabled"
      @click="toggle"
      @keydown="handleKeydown"
    >
      <span data-coral-switch-thumb />
    </button>
    <span v-if="label" data-coral-switch-label>{{ label }}</span>
  </label>
</template>
