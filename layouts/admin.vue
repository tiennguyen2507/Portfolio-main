<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Admin Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="flex justify-between items-center px-4 sm:px-6 lg:px-8 h-16">
        <!-- Logo and Title -->
        <div class="flex items-center">
          <NuxtLink to="/admin" class="text-xl font-bold text-gray-900">
            Admin Panel
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
                    :alt="`${userStore.user && userStore.user.firstName ? userStore.user.firstName : 'User'} ${userStore.user && userStore.user.lastName ? userStore.user.lastName : ''}`"
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
                  {{
                    userStore.user && userStore.user.email
                      ? userStore.user.email
                      : "admin@example.com"
                  }}
                </span>
              </div>

              <!-- Dropdown Arrow -->
              <svg
                class="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
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
                        :alt="`${userStore.user && userStore.user.firstName ? userStore.user.firstName : 'User'} ${userStore.user && userStore.user.lastName ? userStore.user.lastName : ''}`"
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
                      {{
                        userStore.user && userStore.user.email
                          ? userStore.user.email
                          : "admin@example.com"
                      }}
                    </p>
                    <p class="text-xs text-gray-400 mt-1">
                      {{
                        userStore.user && userStore.user.role
                          ? userStore.user.role
                          : "Administrator"
                      }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Menu Items -->
              <div class="py-1">
                <NuxtLink
                  to="/admin/profile"
                  class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  @click="showUserMenu = false"
                >
                  <svg
                    class="w-4 h-4 mr-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Hồ sơ cá nhân
                </NuxtLink>
                <NuxtLink
                  to="/admin/settings"
                  class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  @click="showUserMenu = false"
                >
                  <svg
                    class="w-4 h-4 mr-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Cài đặt
                </NuxtLink>
              </div>

              <!-- Divider -->
              <div class="border-t border-gray-100 my-1"></div>

              <!-- Logout -->
              <div class="py-1">
                <button
                  @click="logout"
                  class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                >
                  <svg
                    class="w-4 h-4 mr-3 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-white shadow-sm min-h-screen">
        <nav class="mt-5 px-2">
          <div class="space-y-1">
            <!-- Dashboard -->
            <NuxtLink
              to="/admin"
              class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              :class="[
                $route.path === '/admin'
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              ]"
            >
              <svg
                class="mr-3 h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
                />
              </svg>
              Dashboard
            </NuxtLink>

            <!-- Users Management -->
            <NuxtLink
              to="/admin/users"
              class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              :class="[
                $route.path.startsWith('/admin/users')
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              ]"
            >
              <svg
                class="mr-3 h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
              Quản lý người dùng
            </NuxtLink>

            <!-- Leads Management -->
            <NuxtLink
              to="/admin/contacts"
              class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              :class="[
                $route.path.startsWith('/admin/contacts')
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              ]"
            >
              <svg
                class="mr-3 h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Quản lý liên hệ
            </NuxtLink>

            <!-- Campaigns -->
            <NuxtLink
              to="/admin/blogs"
              class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              :class="[
                $route.path.startsWith('/admin/blogs')
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              ]"
            >
              <svg
                class="mr-3 h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                />
              </svg>
              Quản lý bài viết
            </NuxtLink>

            <!-- Campaigns -->
            <NuxtLink
              to="/admin/comments"
              class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              :class="[
                $route.path.startsWith('/admin/comments')
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              ]"
            >
              <svg
                class="mr-3 h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                />
              </svg>
              Quản lý bình luận
            </NuxtLink>

            <!-- Reports -->
            <NuxtLink
              to="/admin/reports"
              class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              :class="[
                $route.path.startsWith('/admin/reports')
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              ]"
            >
              <svg
                class="mr-3 h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Báo cáo
            </NuxtLink>

            <!-- Settings -->
            <NuxtLink
              to="/admin/settings"
              class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              :class="[
                $route.path.startsWith('/admin/settings')
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              ]"
            >
              <svg
                class="mr-3 h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Cài đặt
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
const userStore = useUserStore();
const showUserMenu = ref(false);

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
};

// Helper functions for user display
const getUserFullName = () => {
  const user = userStore.user;
  if (!user) return "Admin";

  const firstName = user.firstName || "";
  const lastName = user.lastName || "";

  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  } else if (firstName) {
    return firstName;
  } else if (lastName) {
    return lastName;
  }

  return "Admin";
};

const getUserInitials = () => {
  const user = userStore.user;
  if (!user) return "A";

  const firstName = user.firstName || "";
  const lastName = user.lastName || "";

  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  } else if (firstName) {
    return firstName.charAt(0).toUpperCase();
  } else if (lastName) {
    return lastName.charAt(0).toUpperCase();
  }

  return "A";
};

const handleAvatarError = (event) => {
  // Hide the broken image and show the fallback avatar
  event.target.style.display = "none";
  if (event.target.nextElementSibling) {
    event.target.nextElementSibling.style.display = "flex";
  }
};

const logout = () => {
  // Clear authentication data from store
  userStore.clearAuth();

  // Clear localStorage
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
  localStorage.removeItem("remember_me");

  showUserMenu.value = false;

  // Redirect to login page
  navigateTo("/auth/login");
};

// Close user menu when clicking outside
onMounted(() => {
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".relative")) {
      showUserMenu.value = false;
    }
  });
});
</script>
