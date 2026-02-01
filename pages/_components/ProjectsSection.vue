<template>
  <!-- Projects Section -->
  <section id="projects" class="py-12 sm:py-16 md:py-20 bg-white dark:bg-black transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-8 sm:mb-12 md:mb-16">
        <Typography as="h2" :size="{sp: '2xl', pc: '3xl'}" weight="bold" color="default" align="center" class="mb-4">
          Dự án nổi bật
        </Typography>
        <Typography as="p" :size="{sp: 'md', pc: 'lg'}" color="muted" align="center" class="mb-4">
          Các dự án web và ứng dụng tôi đã phát triển
        </Typography>
        <div class="w-16 h-1 bg-orange-500 dark:bg-orange-400 mx-auto"></div>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="text-center py-16">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"
        ></div>
        <Typography as="p" :size="{sp: 'md', pc: 'lg'}" color="muted" align="center" class="mt-4">
          Đang tải dự án...
        </Typography>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16">
        <div
          class="bg-[#F2F2F7] dark:bg-[#1C1C1E] border border-red-500/50 dark:border-red-400/50 rounded-lg p-8 max-w-md mx-auto"
        >
          <Typography as="h3" :size="{sp: 'md', pc: 'lg'}" weight="semibold" color="error" align="center" class="mb-2">
            Không thể tải dự án
          </Typography>
          <Typography as="p" :size="{sp: 'sm', pc: 'md'}" color="default" align="center" class="mb-4">
            Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại.
          </Typography>
          <button
            @click="handleRefresh"
            class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>

      <!-- Projects Grid -->
      <div v-else-if="displayedProjects.length" class="space-y-8">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <Card
            v-for="project in displayedProjects"
            :key="project._id"
            variant="elevated"
            hover
            class="h-full cursor-pointer transition-transform hover:scale-105"
            padding="sm"
            @click="goToProjectDetail(project._id)"
          >
            <img
              :src="project.thumbnail || '/images/blog-1.webp'"
              :alt="project.title"
              class="w-full h-48 object-cover rounded-t-lg"
              loading="lazy"
            />
            <div class="p-4 sm:p-2 flex flex-col h-full">
              <Typography
                as="h3"
                :size="{sp: 'lg', pc: 'xl'}"
                weight="semibold"
                color="default"
                class="mb-2 line-clamp-1 min-h-[1.5rem] hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
              >
                {{ project.title }}
              </Typography>
              <ViewEditor
                :content="project.description"
                :strip-html="true"
                :truncate="true"
                :max-length="120"
                custom-class="text-gray-400 dark:text-gray-300 mb-4 line-clamp-3 min-h-[4.5rem] flex-grow"
                variant="light"
              />
              <div class="flex flex-wrap gap-2 mt-auto">
                <Badge
                  v-for="skill in project.skill?.slice(0, 3)"
                  :key="skill"
                  variant="primary"
                >
                  {{ skill }}
                </Badge>
                <Badge
                  v-if="project.skill && project.skill.length > 3"
                  variant="info"
                >
                  +{{ project.skill.length - 3 }}
                </Badge>
              </div>

              <!-- View Details Button -->
              <div class="mt-4 pt-3 border-t border-gray-300 dark:border-gray-700">
                <div class="flex items-center justify-between">
                  <Typography as="span" :size="{sp: 'xs', pc: 'sm'}" color="muted">
                    Xem chi tiết
                  </Typography>
                  <svg
                    class="w-4 h-4 text-orange-500 dark:text-orange-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <!-- Pagination -->
        <div
          v-if="totalPages > 1"
          class="flex justify-center items-center space-x-4 mt-8"
        >
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1 || pending"
            class="px-4 py-2 bg-[#F2F2F7] dark:bg-[#1C1C1E] rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <Typography as="span" :size="{sp: 'xs', pc: 'sm'}" color="default">Trước</Typography>
          </button>

          <div class="flex items-center space-x-2">
            <Typography as="span" :size="{sp: 'xs', pc: 'sm'}" color="muted">
              Trang {{ currentPage }} / {{ totalPages }}
            </Typography>
          </div>

          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages || pending"
            class="px-4 py-2 bg-[#F2F2F7] dark:bg-[#1C1C1E] rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <Typography as="span" :size="{sp: 'xs', pc: 'sm'}" color="default">Sau</Typography>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <div
          class="bg-[#F2F2F7] dark:bg-[#1C1C1E] rounded-lg p-8 max-w-md mx-auto border border-gray-300 dark:border-gray-700"
        >
          <Typography as="h3" :size="{sp: 'md', pc: 'lg'}" weight="semibold" color="default" align="center" class="mb-2">
            Không có dự án nào
          </Typography>
          <Typography as="p" :size="{sp: 'sm', pc: 'md'}" color="muted" align="center">
            Chưa có dự án nào được đăng
          </Typography>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import Card from '~/components/ui/Card.vue'
  import Badge from '~/components/ui/Badge.vue'
  import { httpRequest } from '~/utils/httpRequest'

  // Props từ parent component
  const props = defineProps({
    projects: {
      type: Array,
      default: () => [],
    },
    pending: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Object,
      default: null,
    },
  })

  // Emit events
  const emit = defineEmits(['refresh'])

  // State management cho pagination (local)
  const currentPage = ref(1)
  const totalPages = ref(1)
  const limit = 6

  // Sử dụng data từ props
  const projectsList = computed(() => {
    if (props.projects && props.projects.length > 0) {
      // Tính totalPages từ data
      const total = props.projects.length
      totalPages.value = Math.ceil(total / limit)
      return props.projects
    }
    return []
  })

  // Go to specific page (local pagination)
  const goToPage = page => {
    if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
      currentPage.value = page
      // Scroll to top of section
      document
        .getElementById('projects')
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Go to project detail page
  const goToProjectDetail = projectId => {
    if (projectId) {
      navigateTo(`/projects/${projectId}`)
    }
  }

  // Refresh function - emit event để parent refresh
  const handleRefresh = () => {
    emit('refresh')
  }

  // Tính projects hiển thị theo pagination
  const displayedProjects = computed(() => {
    const start = (currentPage.value - 1) * limit
    const end = start + limit
    return projectsList.value.slice(start, end)
  })
</script>

<style scoped>
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .min-h-\[1\.5rem\] {
    min-height: 1.5rem;
  }

  .min-h-\[4\.5rem\] {
    min-height: 4.5rem;
  }

  /* Custom scrollbar - gray color */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #9ca3af;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
  }

  .dark ::-webkit-scrollbar-thumb {
    background: #6b7280;
  }

  .dark ::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }

  /* Focus states for accessibility */
  button:focus {
    outline: 2px solid #f97316;
    outline-offset: 2px;
  }
</style>
