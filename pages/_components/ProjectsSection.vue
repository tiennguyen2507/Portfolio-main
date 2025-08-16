<template>
  <!-- Projects Section -->
  <section id="projects" class="py-12 sm:py-16 md:py-20 bg-gray-800/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-8 sm:mb-12 md:mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
          Dự án nổi bật
        </h2>
        <p class="text-lg text-gray-300 mb-4">
          Các dự án web và ứng dụng tôi đã phát triển
        </p>
        <div class="w-16 h-1 bg-orange-500 mx-auto"></div>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="text-center py-16">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"
        ></div>
        <p class="text-gray-400 mt-4 text-lg">Đang tải dự án...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16">
        <div
          class="bg-gray-800/50 border border-red-500/50 rounded-lg p-8 max-w-md mx-auto"
        >
          <h3 class="text-lg font-semibold text-red-400 mb-2">
            Không thể tải dự án
          </h3>
          <p class="text-gray-300 mb-4">
            Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại.
          </p>
          <button
            @click="fetchProjects"
            class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>

      <!-- Projects Grid -->
      <div v-else-if="projects.length" class="space-y-8">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <Card
            v-for="project in projects"
            :key="project._id"
            variant="elevated"
            hover
            class="h-full"
            padding="sm"
          >
            <img
              :src="project.thumbnail || '/images/blog-1.webp'"
              :alt="project.title"
              class="w-full h-48 object-cover rounded-t-lg"
              loading="lazy"
            />
            <div class="p-4 sm:p-2 flex flex-col h-full">
              <h3
                class="text-xl font-semibold text-white mb-2 line-clamp-1 min-h-[1.5rem]"
              >
                {{ project.title }}
              </h3>
              <p
                class="text-gray-400 mb-4 line-clamp-3 min-h-[4.5rem] flex-grow"
              >
                {{ project.description }}
              </p>
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
            class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span>Trước</span>
          </button>

          <div class="flex items-center space-x-2">
            <span class="text-gray-300 text-sm">
              Trang {{ currentPage }} / {{ totalPages }}
            </span>
          </div>

          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages || pending"
            class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <span>Sau</span>
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
          class="bg-gray-800/30 rounded-lg p-8 max-w-md mx-auto border border-gray-700"
        >
          <h3 class="text-lg font-semibold text-white mb-2">
            Không có dự án nào
          </h3>
          <p class="text-gray-400">Chưa có dự án nào được đăng</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import Card from '~/components/ui/Card.vue'
  import Badge from '~/components/ui/Badge.vue'
  import { httpRequest } from '~/utils/httpRequest'

  // State management
  const projects = ref([])
  const currentPage = ref(1)
  const totalPages = ref(1)
  const pending = ref(false)
  const error = ref(null)
  const limit = 6 // Hiển thị 6 project mỗi trang

  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      pending.value = true
      error.value = null

      const response = await httpRequest.get(
        `/projects?page=${currentPage.value}&limit=${limit}`
      )

      if (response && response.data && Array.isArray(response.data)) {
        projects.value = response.data.map(project => ({
          _id: project._id,
          title: project.title,
          description: project.description,
          thumbnail: project.thumbnail,
          skill: project.skill || [],
          status: project.status,
          createdBy: project.createdBy,
          createdAt: project.createdAt,
          updatedAt: project.updatedAt,
        }))

        // Tính tổng số trang
        const total = response.total || response.data.length
        totalPages.value = Math.ceil(total / limit)
      } else {
        projects.value = []
        totalPages.value = 1
      }
    } catch (err) {
      console.error('Error fetching projects:', err)
      error.value = err
      projects.value = []
    } finally {
      pending.value = false
    }
  }

  // Go to specific page
  const goToPage = async page => {
    if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
      currentPage.value = page
      await fetchProjects()
      // Scroll to top of section
      document
        .getElementById('projects')
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Initialize on mount
  onMounted(() => {
    fetchProjects()
  })

  // Watch for page changes
  watch(currentPage, () => {
    fetchProjects()
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

  /* Custom scrollbar for dark theme */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #1f2937;
  }

  ::-webkit-scrollbar-thumb {
    background: #4b5563;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
  }

  /* Focus states for accessibility */
  button:focus {
    outline: 2px solid #f97316;
    outline-offset: 2px;
  }
</style>
