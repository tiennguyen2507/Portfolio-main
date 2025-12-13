<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="flex justify-between items-center px-4 sm:px-6 lg:px-8 h-16">
      <!-- Logo and Title -->
      <div class="flex items-center">
        <NuxtLink to="/admin" class="text-xl font-bold text-gray-900">
          Admin
        </NuxtLink>
      </div>

      <!-- User Menu -->
      <div class="flex items-center space-x-4">
        <div class="relative">
          <button
            @click="toggleUserMenu"
            class="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-colors duration-200"
          >
            <!-- Avatar -->
            <div class="relative">
              <div
                v-if="userStore.user && userStore.user.avatar"
                class="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200"
              >
                <img
                  :src="userStore.user.avatar"
                  :alt="getUserAltText()"
                  class="w-full h-full object-cover rounded-full"
                  @error="handleAvatarError"
                />
                <!-- Fallback avatar (hidden by default) -->
                <div
                  class="absolute inset-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg"
                  style="display: none"
                >
                  <span>{{ getUserInitials() }}</span>
                </div>
              </div>
              <div
                v-else
                class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg"
              >
                <span>{{ getUserInitials() }}</span>
              </div>
            </div>

            <!-- User Info -->
            <div class="flex flex-col items-start">
              <span class="text-sm font-semibold text-gray-900">
                {{ getUserFullName() }}
              </span>
              <span class="text-xs text-gray-500">
                {{ getUserEmail() }}
              </span>
            </div>

            <!-- Dropdown Arrow -->
            <AdminUiIcon
              name="chevron-down"
              size="sm"
              color="text-gray-400"
              class="transition-transform duration-200"
              :class="{ 'rotate-180': showUserMenu }"
            />
          </button>

          <!-- Dropdown Menu -->
          <div
            v-if="showUserMenu"
            class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
          >
            <!-- User Info Header -->
            <div class="px-4 py-3 border-b border-gray-100">
              <div class="flex items-center space-x-3">
                <div class="relative">
                  <div
                    v-if="userStore.user && userStore.user.avatar"
                    class="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200"
                  >
                    <img
                      :src="userStore.user.avatar"
                      :alt="getUserAltText()"
                      class="w-full h-full object-cover rounded-full"
                      @error="handleAvatarError"
                    />
                    <!-- Fallback avatar (hidden by default) -->
                    <div
                      class="absolute inset-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xl"
                      style="display: none"
                    >
                      <span>{{ getUserInitials() }}</span>
                    </div>
                  </div>
                  <div
                    v-else
                    class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xl"
                  >
                    <span>{{ getUserInitials() }}</span>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-gray-900 truncate">
                    {{ getUserFullName() }}
                  </p>
                  <p class="text-xs text-gray-500 truncate">
                    {{ getUserEmail() }}
                  </p>
                  <p class="text-xs text-gray-400 mt-1">
                    {{ getUserRole() }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Menu Items -->
            <div class="py-1">
              <NuxtLink
                to="/admin/profile"
                class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                @click="closeUserMenu"
              >
                <AdminUiIcon
                  name="user"
                  size="sm"
                  color="text-gray-400"
                  class="mr-3"
                />
                Hồ sơ cá nhân
              </NuxtLink>
              <NuxtLink
                to="/admin/settings"
                class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                @click="closeUserMenu"
              >
                <AdminUiIcon
                  name="settings"
                  size="sm"
                  color="text-gray-400"
                  class="mr-3"
                />
                Cài đặt
              </NuxtLink>
            </div>

            <!-- Divider -->
            <div class="border-t border-gray-100 my-1"></div>

            <!-- Logout -->
            <div class="py-1">
              <button
                @click="handleLogout"
                class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
              >
                <AdminUiIcon
                  name="logout"
                  size="sm"
                  color="text-red-400"
                  class="mr-3"
                />
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
  import AdminUiIcon from '~/components/admin/ui/AdminUiIcon.vue'

  const userStore = useUserStore()
  const showUserMenu = ref(false)

  // Toggle user menu
  const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value
  }

  // Close user menu
  const closeUserMenu = () => {
    showUserMenu.value = false
  }

  // Helper functions for user display
  const getUserFullName = () => {
    const user = userStore.user
    if (!user) return 'Admin'

    const firstName = user.firstName || ''
    const lastName = user.lastName || ''

    if (firstName && lastName) {
      return `${firstName} ${lastName}`
    } else if (firstName) {
      return firstName
    } else if (lastName) {
      return lastName
    }

    return 'Admin'
  }

  const getUserInitials = () => {
    const user = userStore.user
    if (!user) return 'A'

    const firstName = user.firstName || ''
    const lastName = user.lastName || ''

    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
    } else if (firstName) {
      return firstName.charAt(0).toUpperCase()
    } else if (lastName) {
      return lastName.charAt(0).toUpperCase()
    }

    return 'A'
  }

  const getUserEmail = () => {
    return userStore.user && userStore.user.email
      ? userStore.user.email
      : 'admin@example.com'
  }

  const getUserRole = () => {
    return userStore.user && userStore.user.role
      ? userStore.user.role
      : 'Administrator'
  }

  const getUserAltText = () => {
    const user = userStore.user
    if (!user) return 'Admin User'

    const firstName = user.firstName || ''
    const lastName = user.lastName || ''

    if (firstName && lastName) {
      return `${firstName} ${lastName}`
    } else if (firstName) {
      return firstName
    } else if (lastName) {
      return lastName
    }

    return 'Admin User'
  }

  const handleAvatarError = event => {
    // Hide the broken image and show the fallback avatar
    event.target.style.display = 'none'
    if (event.target.nextElementSibling) {
      event.target.nextElementSibling.style.display = 'flex'
    }
  }

  const handleLogout = () => {
    // Clear authentication data from store
    userStore.clearAuth()

    // Clear localStorage
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    localStorage.removeItem('remember_me')

    closeUserMenu()

    // Redirect to login page
    navigateTo('/auth/login')
  }

  // Close user menu when clicking outside
  onMounted(() => {
    document.addEventListener('click', e => {
      if (!e.target.closest('.relative')) {
        showUserMenu.value = false
      }
    })
  })

  // Cleanup event listener
  onUnmounted(() => {
    document.removeEventListener('click', e => {
      if (!e.target.closest('.relative')) {
        showUserMenu.value = false
      }
    })
  })
</script>
