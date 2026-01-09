<script setup lang="ts">
/**
 * ButtonGroup Component
 *
 * Vue wrapper for CoralCSS ButtonGroup component.
 */

import type { ButtonVariant, ButtonSize } from './Button.vue'

withDefaults(
  defineProps<{
    orientation?: 'horizontal' | 'vertical'
    size?: ButtonSize
    variant?: ButtonVariant
  }>(),
  {
    orientation: 'horizontal',
  }
)
</script>

<template>
  <div
    data-coral-button-group
    :data-orientation="orientation"
    :data-size="size"
    :data-variant="variant"
    role="group"
  >
    <slot />
  </div>
</template>
