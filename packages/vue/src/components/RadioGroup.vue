<script setup lang="ts">
/**
 * RadioGroup Component
 *
 * Vue wrapper for CoralCSS RadioGroup component.
 */

import { ref, provide, watch } from 'vue'
import type { RadioSize } from './Radio.vue'

const props = withDefaults(
  defineProps<{
    name?: string
    modelValue?: string
    size?: RadioSize
    disabled?: boolean
    orientation?: 'horizontal' | 'vertical'
  }>(),
  {
    size: 'md',
    disabled: false,
    orientation: 'vertical',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const internalValue = ref(props.modelValue || '')

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== undefined) {
      internalValue.value = newVal
    }
  }
)

const handleChange = (value: string) => {
  internalValue.value = value
  emit('update:modelValue', value)
  emit('change', value)
}

provide('radio-group-value', internalValue)
provide('radio-group-change', handleChange)
provide('radio-group-name', props.name)
provide('radio-group-size', props.size)
provide('radio-group-disabled', props.disabled)
</script>

<template>
  <div
    role="radiogroup"
    data-coral-radio-group
    :data-orientation="orientation"
  >
    <slot />
  </div>
</template>
