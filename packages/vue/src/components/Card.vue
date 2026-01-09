<script setup lang="ts">
/**
 * Card Component
 *
 * Vue wrapper for CoralCSS Card component.
 */

export type CardVariant = 'default' | 'outline' | 'elevated' | 'filled' | 'interactive'

withDefaults(
  defineProps<{
    variant?: CardVariant
    padding?: 'none' | 'sm' | 'md' | 'lg'
  }>(),
  {
    variant: 'default',
    padding: 'md',
  }
)
</script>

<template>
  <div
    data-coral-card
    :data-variant="variant"
    :data-padding="padding"
  >
    <slot />
  </div>
</template>
