<script setup lang="ts">
/**
 * TabsTrigger Component
 */

import { inject, computed, type Ref, type ComputedRef } from 'vue'

const props = defineProps<{
  value: string
  disabled?: boolean
}>()

const currentValue = inject<ComputedRef<string>>('tabs-value')
const setTab = inject<(value: string) => void>('tabs-set')

const isActive = computed(() => currentValue?.value === props.value)

const handleClick = () => {
  if (!props.disabled && setTab) {
    setTab(props.value)
  }
}
</script>

<template>
  <button
    type="button"
    role="tab"
    data-coral-tabs-trigger
    :data-active="isActive || undefined"
    :aria-selected="isActive"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
