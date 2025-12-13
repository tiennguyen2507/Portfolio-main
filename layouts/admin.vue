<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <HeaderLayout />

    <main class="flex-1 overflow-auto bg-gray-50 pb-20">
      <div class="p-6 lg:p-8 w-full">
        <slot />
      </div>
    </main>

    <aside class="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom bg-white">
      <nav class="overflow-x-auto flex justify-center">
        <div
          class="flex items-end justify-center min-w-max gap-10 w-full lg:max-w-4xl lg:mx-auto p-3 lg:rounded-3xl bg-white/30"
        >
          <NuxtLink
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="group relative flex items-center justify-center p-2 rounded-xl transition-all duration-200 ease-out hover:scale-110 active:scale-95"
            :class="[item.active ? 'bg-primary-500 scale-110' : '']"
            :aria-label="item.label"
          >
            <AdminUiIcon
              :name="item.icon"
              :size="ICON_CONFIG.SIZE"
              :color="
                item.active
                  ? ICON_CONFIG.ACTIVE_COLOR
                  : ICON_CONFIG.INACTIVE_COLOR
              "
              :stroke-width="
                item.active
                  ? ICON_CONFIG.ACTIVE_STROKE_WIDTH
                  : ICON_CONFIG.INACTIVE_STROKE_WIDTH
              "
              class="relative z-10 flex-shrink-0 transition-all duration-200"
              :class="[
                item.active ? 'drop-shadow-md' : 'group-hover:drop-shadow-sm',
              ]"
            />
          </NuxtLink>
        </div>
      </nav>
    </aside>
  </div>
</template>

<script setup>
  import AdminUiIcon from '~/components/admin/ui/AdminUiIcon.vue'
  import {
    adminMenuItems,
    ICON_CONFIG,
    ADMIN_BASE_PATH,
  } from '~/constants/adminNavigation'

  const route = useRoute()

  // Check if a menu item is active based on current route
  const isActive = path => {
    if (path === ADMIN_BASE_PATH) {
      return route.path === path
    }
    return route.path.startsWith(path)
  }

  // Computed property for menu items with active state
  const menuItems = computed(() =>
    adminMenuItems.map(item => ({
      ...item,
      active: isActive(item.path),
    }))
  )
</script>
