<script setup lang="ts">
/**
 * Separator Component
 */

defineProps<{
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
}>()
</script>

<template>
  <div
    :role="decorative !== false ? 'none' : 'separator'"
    :aria-orientation="decorative !== false ? undefined : orientation"
    data-coral-separator=""
    :data-orientation="orientation || 'horizontal'"
  />
</template>
