<script setup lang="ts">
/**
 * PaginationLink Component
 */

defineProps<{
  href?: string
  isActive?: boolean
  size?: 'default' | 'sm' | 'lg'
}>()
</script>

<template>
  <a
    :href="href"
    :aria-current="isActive ? 'page' : undefined"
    data-coral-pagination-link=""
    :data-active="isActive || undefined"
    :data-size="size || 'default'"
  >
    <slot />
  </a>
</template>
