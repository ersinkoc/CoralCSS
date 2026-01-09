<script setup lang="ts">
/**
 * AspectRatio Component
 */

import { computed } from 'vue'

const props = defineProps<{
  ratio?: number
}>()

const paddingBottom = computed(() => `${100 / (props.ratio || 1)}%`)
</script>

<template>
  <div
    data-coral-aspect-ratio=""
    :style="{ position: 'relative', width: '100%', paddingBottom }"
  >
    <div :style="{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }">
      <slot />
    </div>
  </div>
</template>
