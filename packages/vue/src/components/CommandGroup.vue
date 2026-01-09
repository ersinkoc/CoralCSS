<script setup lang="ts">
/**
 * CommandGroup Component
 */

defineProps<{
  heading?: string
}>()
</script>

<template>
  <div data-coral-command-group="" role="group">
    <div v-if="heading" data-coral-command-group-heading="">{{ heading }}</div>
    <slot />
  </div>
</template>
