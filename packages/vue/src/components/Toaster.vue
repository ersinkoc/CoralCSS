<script setup lang="ts">
/**
 * Toaster Component
 *
 * Container for toast notifications.
 */

import type { ToastPosition } from './Toast.vue'

withDefaults(
  defineProps<{
    position?: ToastPosition
  }>(),
  {
    position: 'bottom-right',
  }
)
</script>

<template>
  <div
    data-coral-toaster
    :data-position="position"
  >
    <slot />
  </div>
</template>
