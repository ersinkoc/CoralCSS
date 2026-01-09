<script setup lang="ts">
/**
 * Radio Component
 *
 * Vue wrapper for CoralCSS Radio component.
 */

import { inject, computed, type Ref } from 'vue'

export type RadioSize = 'sm' | 'md' | 'lg'

const props = defineProps<{
  value: string
  label?: string
  size?: RadioSize
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

// Inject from RadioGroup
const groupValue = inject<Ref<string>>('radio-group-value', undefined)
const groupOnChange = inject<(value: string) => void>('radio-group-change', undefined)
const groupName = inject<string>('radio-group-name', undefined)
const groupSize = inject<RadioSize>('radio-group-size', 'md')
const groupDisabled = inject<boolean>('radio-group-disabled', false)

const radioSize = computed(() => props.size || groupSize || 'md')
const isDisabled = computed(() => props.disabled || groupDisabled)
const isChecked = computed(() => groupValue?.value === props.value)

const handleChange = () => {
  if (isDisabled.value) return
  groupOnChange?.(props.value)
  emit('change', props.value)
}
</script>

<template>
  <label
    data-coral-radio-wrapper
    :data-size="radioSize"
    :data-disabled="isDisabled || undefined"
    :data-checked="isChecked || undefined"
  >
    <input
      type="radio"
      :name="groupName"
      :value="value"
      :checked="isChecked"
      :disabled="isDisabled"
      data-coral-radio
      :data-size="radioSize"
      @change="handleChange"
    />
    <span data-coral-radio-indicator />
    <span v-if="label" data-coral-radio-label>{{ label }}</span>
  </label>
</template>
