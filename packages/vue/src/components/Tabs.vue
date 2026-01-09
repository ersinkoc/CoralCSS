<script setup lang="ts">
/**
 * Tabs Component
 *
 * Vue wrapper for CoralCSS Tabs component.
 */

import { ref, provide, computed } from 'vue'

export type TabsVariant = 'default' | 'pills' | 'underline' | 'enclosed'

const props = withDefaults(
  defineProps<{
    defaultValue?: string
    modelValue?: string
    variant?: TabsVariant
    orientation?: 'horizontal' | 'vertical'
  }>(),
  {
    variant: 'default',
    orientation: 'horizontal',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const internalValue = ref(props.modelValue ?? props.defaultValue ?? '')

const currentValue = computed(() => props.modelValue ?? internalValue.value)

const setTab = (value: string) => {
  internalValue.value = value
  emit('update:modelValue', value)
  emit('change', value)
}

provide('tabs-value', currentValue)
provide('tabs-set', setTab)
</script>

<template>
  <div
    data-coral-tabs
    :data-variant="variant"
    :data-orientation="orientation"
  >
    <slot :value="currentValue" :setTab="setTab" />
  </div>
</template>
