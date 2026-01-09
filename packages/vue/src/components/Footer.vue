<script setup lang="ts">
/**
 * Footer Component
 *
 * Vue wrapper for CoralCSS Footer component.
 */

export type FooterVariant = 'simple' | 'columns' | 'centered' | 'minimal'

withDefaults(
  defineProps<{
    variant?: FooterVariant
    sticky?: boolean
  }>(),
  {
    variant: 'columns',
    sticky: false,
  }
)
</script>

<template>
  <footer
    data-coral-footer
    :data-variant="variant"
    :data-sticky="sticky || undefined"
  >
    <slot />
  </footer>
</template>
