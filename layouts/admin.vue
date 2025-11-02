<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden flex flex-col"
  >
    <!-- Admin Header -->
    <HeaderLayout />

    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <aside
        class="bg-white border-r border-gray-200/60 shadow-sm h-full transition-all duration-300 ease-in-out relative backdrop-blur-sm"
        :class="collapsed ? 'w-20' : 'w-64'"
      >
        <div class="h-full flex flex-col">
          <nav class="flex-1 mt-6 px-3 overflow-y-auto">
            <div class="space-y-1">
              <NuxtLink
                v-for="item in menuItems"
                :key="item.path"
                :to="item.path"
                class="group relative flex items-center px-3 py-3 text-sm font-medium rounded-xl overflow-hidden transition-all duration-200"
                :class="[
                  $route.path === item.path ||
                  (item.path !== '/admin' && $route.path.startsWith(item.path))
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30 scale-[1.02]'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-orange-600 hover:scale-[1.01]',
                ]"
                :aria-label="item.label"
              >
                <AdminUiIcon
                  :name="item.icon"
                  size="lg"
                  :color="
                    $route.path === item.path ||
                    (item.path !== '/admin' &&
                      $route.path.startsWith(item.path))
                      ? 'text-white'
                      : 'currentColor'
                  "
                  class="transition-transform duration-200"
                  :class="collapsed ? 'mr-0' : 'mr-3'"
                />
                <span
                  v-if="!collapsed"
                  class="transition-opacity duration-200 font-medium"
                >
                  {{ item.label }}
                </span>
                <span
                  v-else
                  class="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs text-white opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 shadow-xl z-50"
                >
                  {{ item.label }}
                </span>
              </NuxtLink>
            </div>
          </nav>

          <!-- Collapse Button -->
          <div class="p-3 border-t border-gray-200/60">
            <button
              class="w-full flex items-center justify-center rounded-xl border border-gray-200 bg-white p-2.5 text-gray-600 hover:bg-gray-50 hover:border-orange-300 hover:text-orange-600 transition-all duration-200 shadow-sm hover:shadow-md"
              @click="collapsed = !collapsed"
              :aria-expanded="!collapsed"
              :aria-label="collapsed ? 'Mở sidebar' : 'Thu gọn sidebar'"
              type="button"
            >
              <svg
                v-if="collapsed"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-5 w-5 transition-transform duration-200"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.47 4.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06L13.94 12 8.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-5 w-5 transition-transform duration-200"
              >
                <path
                  fill-rule="evenodd"
                  d="M15.53 19.53a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 1 1 1.06 1.06L10.06 12l5.47 5.47a.75.75 0 0 1 0 1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main
        class="flex-1 overflow-auto bg-gradient-to-br from-gray-50/50 via-white to-gray-50/50"
      >
        <div class="p-6 lg:p-8 w-full">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import AdminUiIcon from '~/components/admin/ui/AdminUiIcon.vue'

  // Menu items array
  const collapsed = ref(true)
  const menuItems = [
    {
      path: '/admin',
      label: 'Dashboard',
      icon: 'dashboard',
    },
    {
      path: '/admin/users',
      label: 'Quản lý người dùng',
      icon: 'users',
    },
    {
      path: '/admin/contacts',
      label: 'Quản lý liên hệ',
      icon: 'contacts',
    },
    {
      path: '/admin/blogs',
      label: 'Quản lý bài viết',
      icon: 'blogs',
    },
    {
      path: '/admin/projects',
      label: 'Quản lý dự án',
      icon: 'projects',
    },
    {
      path: '/admin/comments',
      label: 'Quản lý bình luận',
      icon: 'comments',
    },
    {
      path: '/admin/products-shop',
      label: 'Quản lý sản phẩm shop',
      icon: 'shop',
    },
    {
      path: '/admin/orders',
      label: 'Quản lý đơn hàng',
      icon: 'reports',
    },
    {
      path: '/admin/reports',
      label: 'Báo cáo',
      icon: 'reports',
    },
    {
      path: '/admin/settings',
      label: 'Cài đặt',
      icon: 'settings',
    },
  ]
</script>
