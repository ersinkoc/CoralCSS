<script setup lang="ts">
/**
 * Checkbox Component
 *
 * Vue wrapper for CoralCSS Checkbox component.
 */

import { computed } from 'vue'

export type CheckboxSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    label?: string
    size?: CheckboxSize
    disabled?: boolean
    error?: boolean
    indeterminate?: boolean
  }>(),
  {
    modelValue: false,
    size: 'md',
    disabled: false,
    error: false,
    indeterminate: false,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
  emit('change', target.checked)
}
</script>

<template>
  <label
    data-coral-checkbox-wrapper
    :data-size="size"
    :data-error="error || undefined"
    :data-disabled="disabled || undefined"
  >
    <input
      type="checkbox"
      data-coral-checkbox
      :data-size="size"
      :data-indeterminate="indeterminate || undefined"
      :checked="modelValue"
      :disabled="disabled"
      @change="handleChange"
    />
    <span data-coral-checkbox-indicator />
    <span v-if="label" data-coral-checkbox-label>{{ label }}</span>
  </label>
</template>
