<script setup lang="ts">
/**
 * Skeleton Component
 */

import { computed } from 'vue'

const props = defineProps<{
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  animation?: 'pulse' | 'wave' | 'none'
  width?: string | number
  height?: string | number
}>()

const style = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
}))
</script>

<template>
  <div
    data-coral-skeleton=""
    :data-variant="variant || 'text'"
    :data-animation="animation || 'pulse'"
    :style="style"
  />
</template>
