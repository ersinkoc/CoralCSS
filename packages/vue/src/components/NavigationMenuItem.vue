<script setup lang="ts">
/**
 * NavigationMenuItem Component
 */

import { provide } from 'vue'

const props = defineProps<{
  value?: string
}>()

provide('navigation-menu-item-value', props.value ?? '')
</script>

<template>
  <li data-coral-navigation-menu-item="">
    <slot />
  </li>
</template>
