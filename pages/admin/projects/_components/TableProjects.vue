<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Table Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-900">Danh sách dự án</h3>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="p-8 text-center">
      <div
        class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"
      ></div>
      <p class="mt-2 text-gray-500">Đang tải dữ liệu...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="projects.length === 0" class="p-8 text-center">
      <svg
        class="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">Không có dự án nào</h3>
      <p class="mt-1 text-sm text-gray-500">
        Bắt đầu tạo dự án đầu tiên của bạn.
      </p>
    </div>

    <!-- Projects Table -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Dự án
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Công nghệ
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Trạng thái
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ngày tạo
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="project in projects"
            :key="project._id"
            class="hover:bg-gray-50 transition-colors"
          >
            <!-- Project Info -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-12 w-12">
                  <img
                    :src="project.thumbnail || '/images/blog-1.webp'"
                    :alt="project.title"
                    class="h-12 w-12 rounded-lg object-cover"
                    @error="handleImageError"
                  />
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">
                    {{ project.title }}
                  </div>
                  <div class="text-sm text-gray-500 line-clamp-2 max-w-xs">
                    {{ project.description }}
                  </div>
                </div>
              </div>
            </td>

            <!-- Skills -->
            <td class="px-6 py-4">
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="skill in project.skill?.slice(0, 3)"
                  :key="skill"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                >
                  {{ skill }}
                </span>
                <span
                  v-if="project.skill && project.skill.length > 3"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  +{{ project.skill.length - 3 }}
                </span>
              </div>
            </td>

            <!-- Status -->
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="
                  project.status
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                "
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              >
                <svg
                  :class="project.status ? 'text-green-400' : 'text-yellow-400'"
                  class="w-2 h-2 mr-1"
                  fill="currentColor"
                  viewBox="0 0 8 8"
                >
                  <circle cx="4" cy="4" r="3" />
                </svg>
                {{ project.status ? 'Hoàn thành' : 'Đang phát triển' }}
              </span>
            </td>

            <!-- Created Date -->
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(project.createdAt) }}
            </td>

            <!-- Actions -->
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div class="flex items-center space-x-2">
                <button
                  @click="emit('edit', project)"
                  class="text-orange-600 hover:text-orange-900 transition-colors"
                  title="Chỉnh sửa"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                    />
                  </svg>
                </button>
                <button
                  @click="emit('delete', project._id)"
                  class="text-red-600 hover:text-red-900 transition-colors"
                  title="Xóa"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    projects: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  })

  const emit = defineEmits(['edit', 'delete'])

  // Format date
  const formatDate = dateString => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  // Handle image error
  const handleImageError = event => {
    const target = event.target
    if (target && target.src) {
      target.src = '/images/blog-1.webp'
    }
  }
</script>

<style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
