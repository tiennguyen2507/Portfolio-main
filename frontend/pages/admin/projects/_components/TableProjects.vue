<template>
  <div class="bg-white dark:bg-[#050505] rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
    <!-- Table Header -->
    <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
      <Typography as="h3" size="lg" weight="semibold" color="default">
        Danh sách dự án
      </Typography>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="p-8 text-center">
      <div
        class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 dark:border-orange-400"
      ></div>
      <Typography as="p" size="sm" color="muted" class="mt-2">
        Đang tải dữ liệu...
      </Typography>
    </div>

    <!-- Empty State -->
    <div v-else-if="projects.length === 0" class="p-8 text-center">
      <svg
        class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600"
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
      <Typography as="h3" size="sm" weight="medium" color="default" class="mt-2">
        Không có dự án nào
      </Typography>
      <Typography as="p" size="sm" color="muted" class="mt-1">
        Bắt đầu tạo dự án đầu tiên của bạn.
      </Typography>
    </div>

    <!-- Projects Table -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50 dark:bg-gray-900/50">
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
        <tbody class="bg-white dark:bg-[#050505] divide-y divide-gray-200 dark:divide-gray-800">
          <tr
            v-for="project in projects"
            :key="project._id"
            class="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
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
                  <Typography as="div" size="sm" weight="medium" color="default">
                    {{ project.title }}
                  </Typography>
                  <Typography
                    as="div"
                    size="sm"
                    color="muted"
                    class="line-clamp-2 max-w-xs"
                  >
                    {{ project.description }}
                  </Typography>
                </div>
              </div>
            </td>

            <!-- Skills -->
            <td class="px-6 py-4">
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="skill in project.skill?.slice(0, 3)"
                  :key="skill"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300"
                >
                  {{ skill }}
                </span>
                <span
                  v-if="project.skill && project.skill.length > 3"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300"
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
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                    : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                "
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              >
                <svg
                  :class="project.status ? 'text-green-400 dark:text-green-500' : 'text-yellow-400 dark:text-yellow-500'"
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
            <td class="px-6 py-4 whitespace-nowrap">
              <Typography as="span" size="sm" color="tertiary">
                {{ formatDate(project.createdAt) }}
              </Typography>
            </td>

            <!-- Actions -->
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div class="flex items-center space-x-2">
                <button
                  @click="emit('edit', project)"
                  class="text-orange-600 dark:text-orange-400 hover:text-orange-900 dark:hover:text-orange-300 transition-colors"
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
                  class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition-colors"
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
  import Typography from '~/components/ui/Typography.vue'

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
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
