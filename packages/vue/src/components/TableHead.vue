<script setup lang="ts">
/**
 * TableHead Component
 */

defineProps<{
  sortable?: boolean
  sorted?: 'asc' | 'desc' | false
}>()
</script>

<template>
  <th
    data-coral-table-head=""
    :data-sortable="sortable || undefined"
    :data-sorted="sorted || undefined"
  >
    <slot />
    <span v-if="sortable" data-coral-table-sort-icon="">
      {{ sorted === 'asc' ? '↑' : sorted === 'desc' ? '↓' : '↕' }}
    </span>
  </th>
</template>
