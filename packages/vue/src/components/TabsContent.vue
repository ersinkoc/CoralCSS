<script setup lang="ts">
/**
 * TabsContent Component
 */

import { inject, computed, type ComputedRef } from 'vue'

const props = defineProps<{
  value: string
}>()

const currentValue = inject<ComputedRef<string>>('tabs-value')

const isActive = computed(() => currentValue?.value === props.value)
</script>

<template>
  <div
    v-if="isActive"
    role="tabpanel"
    data-coral-tabs-content
    :data-active="isActive || undefined"
  >
    <slot />
  </div>
</template>
