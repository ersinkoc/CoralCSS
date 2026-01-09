<script setup lang="ts">
/**
 * ScrollArea Component
 */

defineProps<{
  orientation?: 'vertical' | 'horizontal' | 'both'
}>()
</script>

<template>
  <div data-coral-scroll-area="" :data-orientation="orientation || 'vertical'">
    <div data-coral-scroll-area-viewport="">
      <slot />
    </div>
    <div data-coral-scroll-bar="" :data-orientation="orientation === 'both' ? 'vertical' : (orientation || 'vertical')">
      <div data-coral-scroll-bar-thumb="" />
    </div>
    <div v-if="orientation === 'both'" data-coral-scroll-bar="" data-orientation="horizontal">
      <div data-coral-scroll-bar-thumb="" />
    </div>
  </div>
</template>
