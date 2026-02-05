<template>
  <div>
    <!-- Page Header -->
    <HeaderContent
      title="Dashboard"
      subtitle="Tổng quan về hiệu suất hệ thống"
    />

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        class="group bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div
              class="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300"
            >
              <svg
                class="w-6 h-6 text-white"
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
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 mb-1">Tổng Leads</p>
              <p class="text-3xl font-bold text-gray-900">1,234</p>
            </div>
          </div>
        </div>
        <div class="mt-5 flex items-center">
          <span
            class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800"
          >
            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            +12%
          </span>
          <span class="text-gray-500 text-xs ml-2">so với tháng trước</span>
        </div>
      </div>

      <div
        class="group bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div
              class="p-3 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300"
            >
              <svg
                class="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 mb-1">
                Leads Chuyển đổi
              </p>
              <p class="text-3xl font-bold text-gray-900">456</p>
            </div>
          </div>
        </div>
        <div class="mt-5 flex items-center">
          <span
            class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800"
          >
            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            +8%
          </span>
          <span class="text-gray-500 text-xs ml-2">so với tháng trước</span>
        </div>
      </div>

      <div
        class="group bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div
              class="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300"
            >
              <svg
                class="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 mb-1">Doanh thu</p>
              <p class="text-3xl font-bold text-gray-900">$45,678</p>
            </div>
          </div>
        </div>
        <div class="mt-5 flex items-center">
          <span
            class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800"
          >
            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            +15%
          </span>
          <span class="text-gray-500 text-xs ml-2">so với tháng trước</span>
        </div>
      </div>

      <div
        class="group bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div
              class="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300"
            >
              <svg
                class="w-6 h-6 text-white"
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
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 mb-1">Người dùng</p>
              <p class="text-3xl font-bold text-gray-900">89</p>
            </div>
          </div>
        </div>
        <div class="mt-5 flex items-center">
          <span
            class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800"
          >
            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            +5%
          </span>
          <span class="text-gray-500 text-xs ml-2">so với tháng trước</span>
        </div>
      </div>
    </div>

    <!-- Charts and Tables -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Recent Leads -->
      <div
        class="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <div
          class="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white"
        >
          <div class="flex items-center gap-2">
            <div class="p-2 bg-blue-100 rounded-lg">
              <svg
                class="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900">Leads gần đây</h3>
          </div>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div
              v-for="lead in recentLeads"
              :key="lead.id"
              class="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
            >
              <div class="flex items-center">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200"
                >
                  <span class="text-sm font-bold text-white">{{
                    lead.name.charAt(0)
                  }}</span>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-semibold text-gray-900">
                    {{ lead.name }}
                  </p>
                  <p class="text-xs text-gray-500 mt-0.5">{{ lead.email }}</p>
                </div>
              </div>
              <div class="text-right">
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                >
                  {{ lead.source }}
                </span>
                <p class="text-xs text-gray-400 mt-1.5">{{ lead.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div
        class="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <div
          class="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white"
        >
          <div class="flex items-center gap-2">
            <div class="p-2 bg-orange-100 rounded-lg">
              <svg
                class="w-5 h-5 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900">Thao tác nhanh</h3>
          </div>
        </div>
        <div class="p-6">
          <div class="space-y-3">
            <NuxtLink
              to="/admin/blogs"
              class="group flex items-center p-4 border-2 border-gray-100 rounded-xl hover:border-orange-200 hover:bg-orange-50/50 transition-all duration-200 hover:shadow-md"
            >
              <div
                class="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-200"
              >
                <svg
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div class="ml-4 flex-1">
                <p
                  class="text-sm font-semibold text-gray-900 group-hover:text-orange-600 transition-colors"
                >
                  Quản lý Bài viết
                </p>
                <p class="text-xs text-gray-500 mt-0.5">
                  Tạo và quản lý bài viết
                </p>
              </div>
              <svg
                class="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </NuxtLink>

            <NuxtLink
              to="/admin/projects"
              class="group flex items-center p-4 border-2 border-gray-100 rounded-xl hover:border-orange-200 hover:bg-orange-50/50 transition-all duration-200 hover:shadow-md"
            >
              <div
                class="p-3 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-200"
              >
                <svg
                  class="w-5 h-5 text-white"
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
                </svg>
              </div>
              <div class="ml-4 flex-1">
                <p
                  class="text-sm font-semibold text-gray-900 group-hover:text-orange-600 transition-colors"
                >
                  Quản lý Dự án
                </p>
                <p class="text-xs text-gray-500 mt-0.5">
                  Quản lý dự án portfolio
                </p>
              </div>
              <svg
                class="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </NuxtLink>

            <NuxtLink
              to="/admin/reports"
              class="group flex items-center p-4 border-2 border-gray-100 rounded-xl hover:border-orange-200 hover:bg-orange-50/50 transition-all duration-200 hover:shadow-md"
            >
              <div
                class="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-200"
              >
                <svg
                  class="w-5 h-5 text-white"
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
              </div>
              <div class="ml-4 flex-1">
                <p
                  class="text-sm font-semibold text-gray-900 group-hover:text-orange-600 transition-colors"
                >
                  Xem báo cáo
                </p>
                <p class="text-xs text-gray-500 mt-0.5">
                  Phân tích hiệu suất hệ thống
                </p>
              </div>
              <svg
                class="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import HeaderContent from '~/components/common/Admin/HeaderContent.vue'

  definePageMeta({
    layout: 'admin',
    middleware: 'auth',
  })

  // Mock data for recent leads
  const recentLeads = ref([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      source: 'Website',
      date: '2 giờ trước',
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      source: 'Facebook',
      date: '4 giờ trước',
    },
    {
      id: 3,
      name: 'Lê Văn C',
      email: 'levanc@email.com',
      source: 'Google Ads',
      date: '6 giờ trước',
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      email: 'phamthid@email.com',
      source: 'Website',
      date: '8 giờ trước',
    },
  ])
</script>
