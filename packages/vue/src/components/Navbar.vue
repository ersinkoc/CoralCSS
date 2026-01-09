<script setup lang="ts">
/**
 * Navbar Component
 *
 * Vue wrapper for CoralCSS Navbar component.
 */

import { ref, provide } from 'vue'

const props = withDefaults(
  defineProps<{
    sticky?: boolean
    hideOnScroll?: boolean
  }>(),
  {
    sticky: false,
    hideOnScroll: false,
  }
)

const mobileOpen = ref(false)

const toggleMobile = () => {
  mobileOpen.value = !mobileOpen.value
}

provide('navbar-mobile-open', mobileOpen)
provide('navbar-toggle-mobile', toggleMobile)
</script>

<template>
  <nav
    data-coral-navbar
    :data-sticky="sticky || undefined"
    :data-mobile-open="mobileOpen || undefined"
  >
    <slot :mobileOpen="mobileOpen" :toggleMobile="toggleMobile" />
  </nav>
</template>
