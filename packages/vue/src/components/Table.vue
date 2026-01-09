<script setup lang="ts">
/**
 * Table Component
 *
 * Vue wrapper for CoralCSS Table component.
 */

defineProps<{
  variant?: 'default' | 'striped' | 'bordered'
}>()
</script>

<template>
  <div data-coral-table-wrapper="">
    <table data-coral-table="" :data-variant="variant">
      <slot />
    </table>
  </div>
</template>
