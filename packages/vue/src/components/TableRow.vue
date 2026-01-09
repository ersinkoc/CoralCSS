<script setup lang="ts">
/**
 * TableRow Component
 */

defineProps<{
  selected?: boolean
}>()
</script>

<template>
  <tr data-coral-table-row="" :data-selected="selected || undefined">
    <slot />
  </tr>
</template>
