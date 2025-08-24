<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Admin Header -->
    <HeaderLayout />

    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-white shadow-sm min-h-screen">
        <nav class="mt-5 px-2">
          <div class="space-y-1">
            <NuxtLink
              v-for="item in menuItems"
              :key="item.path"
              :to="item.path"
              class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              :class="[
                $route.path === item.path ||
                (item.path !== '/admin' && $route.path.startsWith(item.path))
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              ]"
            >
              <AdminUiIcon
                :name="item.icon"
                size="lg"
                color="currentColor"
                class="mr-3"
              />
              {{ item.label }}
            </NuxtLink>
          </div>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
  import AdminUiIcon from '~/components/admin/ui/AdminUiIcon.vue'

  // Menu items array
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
