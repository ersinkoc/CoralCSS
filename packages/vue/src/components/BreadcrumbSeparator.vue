<script setup lang="ts">
/**
 * BreadcrumbSeparator Component
 */

import { inject } from 'vue'

const separator = inject<string>('breadcrumb-separator', '/')
</script>

<template>
  <li role="presentation" aria-hidden="true" data-coral-breadcrumb-separator="">
    <slot>{{ separator }}</slot>
  </li>
</template>
