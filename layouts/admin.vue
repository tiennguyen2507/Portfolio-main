<template>
  <div class="min-h-screen bg-gray-50 dark:bg-black flex flex-col">
    <div
      v-if="isLoading"
      class="min-h-screen flex items-center justify-center bg-gray-50"
    >
      <Loading size="lg" color="green" />
    </div>
    <template v-else>
      <Header />
      <main class="flex-1 overflow-auto bg-gray-50 dark:bg-black pb-24 pt-16">
        <div class="p-6 lg:p-8 w-full">
          <slot />
        </div>
      </main>

      <aside
        class="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom bg-white dark:bg-black"
      >
        <nav class="overflow-x-auto flex justify-center">
          <div
            class="flex items-end justify-between w-full gap-6 p-3 px-6 pb-5 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800"
          >
            <NuxtLink
              v-for="item in menuItems"
              :key="item.path"
              :to="item.path"
              class="group relative flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ease-out hover:scale-105 active:scale-95"
              :class="[item.active ? 'bg-orange-500 text-white scale-105 shadow-md' : '']"
              :aria-label="item.label"
            >
              <Icon
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

              <Typography
                as="span"
                :size="{ sp: 'xxs', pc: 'xs' }"
                weight="medium"
                :color="item.active ? 'white' : 'muted'"
                align="center"
                no-wrap
                class="relative z-10 hidden sm:block"
              >
                {{ item.label }}
              </Typography>
            </NuxtLink>
          </div>
        </nav>
      </aside>
    </template>
  </div>
</template>

<script setup>
  import Icon from '~/components/ui/Icon/Icon.vue'
  import Loading from '~/components/ui/Loading.vue'
  import Header from '~/components/common/Header/Header.vue'
  import Typography from '~/components/ui/Typography.vue'
  import {
    adminMenuItems,
    ICON_CONFIG,
    ADMIN_BASE_PATH,
  } from '~/constants/adminNavigation'

  const route = useRoute()
  const userStore = useUserStore()
  const isLoading = computed(() => !userStore.user)

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
