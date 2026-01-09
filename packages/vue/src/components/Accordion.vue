<script setup lang="ts">
/**
 * Accordion Component
 *
 * Vue wrapper for CoralCSS Accordion component.
 */

import { ref, provide, watch } from 'vue'

export type AccordionType = 'single' | 'multiple'

const props = withDefaults(
  defineProps<{
    type?: AccordionType
    modelValue?: string[]
    defaultValue?: string[]
    collapsible?: boolean
  }>(),
  {
    type: 'single',
    defaultValue: () => [],
    collapsible: true,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const internalValue = ref<string[]>(props.modelValue ?? props.defaultValue)

watch(() => props.modelValue, (val) => {
  if (val) internalValue.value = val
})

const toggle = (itemValue: string) => {
  let newValue: string[]

  if (props.type === 'single') {
    if (internalValue.value.includes(itemValue)) {
      newValue = props.collapsible ? [] : internalValue.value
    } else {
      newValue = [itemValue]
    }
  } else {
    if (internalValue.value.includes(itemValue)) {
      newValue = internalValue.value.filter((v) => v !== itemValue)
    } else {
      newValue = [...internalValue.value, itemValue]
    }
  }

  internalValue.value = newValue
  emit('update:modelValue', newValue)
}

provide('accordion-value', internalValue)
provide('accordion-toggle', toggle)
</script>

<template>
  <div data-coral-accordion :data-type="type">
    <slot />
  </div>
</template>
