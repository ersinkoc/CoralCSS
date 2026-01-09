<script setup lang="ts">
/**
 * NavigationMenu Component
 */

import { ref, provide, watch } from 'vue'

const props = defineProps<{
  modelValue?: string
  defaultValue?: string
  orientation?: 'horizontal' | 'vertical'
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const value = ref(props.modelValue ?? props.defaultValue ?? '')

watch(() => props.modelValue, (val) => {
  if (val !== undefined) value.value = val
})

const onValueChange = (newValue: string) => {
  value.value = newValue
  emit('update:modelValue', newValue)
}

provide('navigation-menu-value', value)
provide('navigation-menu-onValueChange', onValueChange)
provide('navigation-menu-orientation', props.orientation ?? 'horizontal')
</script>

<template>
  <nav
    aria-label="Main"
    data-coral-navigation-menu=""
    :data-orientation="orientation || 'horizontal'"
  >
    <slot />
  </nav>
</template>
