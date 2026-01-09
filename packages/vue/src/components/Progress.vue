<script setup lang="ts">
/**
 * Progress Component
 *
 * Vue wrapper for CoralCSS Progress component.
 */

import { computed } from 'vue'

export type ProgressVariant = 'default' | 'success' | 'warning' | 'error'
export type ProgressSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    value?: number
    max?: number
    variant?: ProgressVariant
    size?: ProgressSize
    showValue?: boolean
    indeterminate?: boolean
  }>(),
  {
    value: 0,
    max: 100,
    variant: 'default',
    size: 'md',
    showValue: false,
    indeterminate: false,
  }
)

const percentage = computed(() => {
  return Math.min(100, Math.max(0, (props.value / props.max) * 100))
})
</script>

<template>
  <div
    role="progressbar"
    :aria-valuenow="indeterminate ? undefined : value"
    :aria-valuemin="0"
    :aria-valuemax="max"
    data-coral-progress
    :data-variant="variant"
    :data-size="size"
    :data-indeterminate="indeterminate || undefined"
  >
    <div
      data-coral-progress-bar
      :style="{
        width: indeterminate ? undefined : `${percentage}%`
      }"
    />
    <span v-if="showValue && !indeterminate" data-coral-progress-value>
      {{ Math.round(percentage) }}%
    </span>
  </div>
</template>
