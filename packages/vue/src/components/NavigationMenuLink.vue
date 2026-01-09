<script setup lang="ts">
/**
 * NavigationMenuLink Component
 */

defineProps<{
  href?: string
  active?: boolean
}>()
</script>

<template>
  <a
    :href="href"
    data-coral-navigation-menu-link=""
    :data-active="active || undefined"
  >
    <slot />
  </a>
</template>
