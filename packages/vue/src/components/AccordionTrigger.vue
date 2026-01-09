<script setup lang="ts">
/**
 * AccordionTrigger Component
 */

import { inject, type Ref, type ComputedRef } from 'vue'

const toggle = inject<(value: string) => void>('accordion-toggle')
const itemValue = inject<string>('accordion-item-value', '')
const open = inject<ComputedRef<boolean>>('accordion-item-open')
const disabled = inject<boolean>('accordion-item-disabled', false)

const handleClick = () => {
  if (disabled) return
  toggle?.(itemValue)
}
</script>

<template>
  <button
    type="button"
    data-coral-accordion-trigger
    :data-open="open || undefined"
    :aria-expanded="open"
    :disabled="disabled"
    @click="handleClick"
  >
    <span><slot /></span>
    <svg
      data-coral-accordion-icon
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
</template>
