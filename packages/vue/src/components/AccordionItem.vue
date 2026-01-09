<script setup lang="ts">
/**
 * AccordionItem Component
 */

import { computed, provide, inject, type Ref } from 'vue'

const props = defineProps<{
  value: string
  disabled?: boolean
}>()

const accordionValue = inject<Ref<string[]>>('accordion-value')

const open = computed(() => accordionValue?.value.includes(props.value) ?? false)

provide('accordion-item-value', props.value)
provide('accordion-item-open', open)
provide('accordion-item-disabled', props.disabled)
</script>

<template>
  <div
    data-coral-accordion-item
    :data-open="open || undefined"
    :data-disabled="disabled || undefined"
  >
    <slot :open="open" />
  </div>
</template>
