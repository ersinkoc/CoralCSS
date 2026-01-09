<script setup lang="ts">
/**
 * Spinner Component
 */

defineProps<{
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'primary' | 'secondary'
}>()
</script>

<template>
  <div
    role="status"
    aria-label="Loading"
    data-coral-spinner=""
    :data-size="size || 'md'"
    :data-variant="variant || 'default'"
  >
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        opacity="0.25"
      />
      <path
        d="M12 2C6.47715 2 2 6.47715 2 12"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
      />
    </svg>
    <span class="sr-only">Loading...</span>
  </div>
</template>
