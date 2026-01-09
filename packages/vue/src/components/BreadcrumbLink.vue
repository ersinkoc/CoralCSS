<script setup lang="ts">
/**
 * BreadcrumbLink Component
 */

defineProps<{
  href?: string
}>()
</script>

<template>
  <a :href="href" data-coral-breadcrumb-link="">
    <slot />
  </a>
</template>
