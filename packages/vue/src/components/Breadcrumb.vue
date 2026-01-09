<script setup lang="ts">
/**
 * Breadcrumb Component
 */

import { provide } from 'vue'

const props = defineProps<{
  separator?: string
}>()

provide('breadcrumb-separator', props.separator ?? '/')
</script>

<template>
  <nav aria-label="Breadcrumb" data-coral-breadcrumb="">
    <slot />
  </nav>
</template>
