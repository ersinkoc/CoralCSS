<script setup lang="ts">
/**
 * Sidebar Component
 *
 * Vue wrapper for CoralCSS Sidebar component.
 */

import { ref, provide, computed } from 'vue'

export type SidebarVariant = 'default' | 'floating' | 'inset' | 'compact'
export type SidebarPosition = 'left' | 'right'

const props = withDefaults(
  defineProps<{
    variant?: SidebarVariant
    position?: SidebarPosition
    collapsible?: boolean
    defaultCollapsed?: boolean
  }>(),
  {
    variant: 'default',
    position: 'left',
    collapsible: true,
    defaultCollapsed: false,
  }
)

const collapsed = ref(props.defaultCollapsed)
const mobileOpen = ref(false)

const toggle = () => {
  collapsed.value = !collapsed.value
}

const toggleMobile = () => {
  mobileOpen.value = !mobileOpen.value
}

provide('sidebar-collapsed', collapsed)
provide('sidebar-toggle', toggle)
provide('sidebar-mobile-open', mobileOpen)
provide('sidebar-toggle-mobile', toggleMobile)
</script>

<template>
  <aside
    data-coral-sidebar
    :data-variant="variant"
    :data-position="position"
    :data-collapsed="collapsed || undefined"
    :data-mobile-open="mobileOpen || undefined"
  >
    <slot
      :collapsed="collapsed"
      :toggle="toggle"
      :mobileOpen="mobileOpen"
      :toggleMobile="toggleMobile"
    />
  </aside>
</template>
