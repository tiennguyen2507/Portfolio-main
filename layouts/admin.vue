<template>
  <div class="h-screen bg-gray-100 overflow-hidden flex flex-col">
    <!-- Admin Header -->
    <HeaderLayout />

    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <aside
        class="bg-white shadow-sm h-full transition-all duration-300 relative"
        :class="collapsed ? 'w-16' : 'w-64'"
      >
        <nav class="mt-5 px-2">
          <div class="space-y-1">
            <NuxtLink
              v-for="item in menuItems"
              :key="item.path"
              :to="item.path"
              class="group relative flex items-center px-2 py-2 text-sm font-medium rounded-md overflow-hidden"
              :class="[
                $route.path === item.path ||
                (item.path !== '/admin' && $route.path.startsWith(item.path))
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              ]"
              :aria-label="item.label"
            >
              <AdminUiIcon
                :name="item.icon"
                size="lg"
                color="currentColor"
                class="mr-3"
              />
              <span v-if="!collapsed">{{ item.label }}</span>
              <span
                v-else
                class="pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              >
                {{ item.label }}
              </span>
            </NuxtLink>
          </div>
        </nav>
        <div class="absolute left-2 bottom-4">
          <button
            class="flex items-center justify-center rounded-md border border-gray-200 p-2 text-sm text-gray-700 hover:bg-gray-50"
            @click="collapsed = !collapsed"
            :aria-expanded="!collapsed"
            :aria-label="collapsed ? 'Mở sidebar' : 'Thu gọn sidebar'"
            type="button"
          >
            <span class="inline-flex items-center justify-center">
              <svg
                v-if="collapsed"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-5 w-5"
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
                class="h-5 w-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M15.53 19.53a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 1 1 1.06 1.06L10.06 12l5.47 5.47a.75.75 0 0 1 0 1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-6 overflow-auto">
        <slot />
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
