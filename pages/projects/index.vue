<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Breadcrumb Navigation -->
    <section class="py-4 bg-gray-900/50 border-b border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <NuxtLink
                to="/"
                class="inline-flex items-center text-sm font-medium text-gray-400 hover:text-orange-400 transition-colors"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                  ></path>
                </svg>
                Trang chủ
              </NuxtLink>
            </li>
            <li>
              <div class="flex items-center">
                <svg
                  class="w-6 h-6 text-gray-600 mx-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="text-sm font-medium text-orange-400">
                  Dự án & Portfolio
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </section>

    <!-- Hero Section -->
    <section class="bg-gray-800/30 text-white py-16 md:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">Dự án & Portfolio</h1>
          <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Khám phá các dự án web và ứng dụng tôi đã phát triển với công nghệ
            hiện đại
          </p>
          <div class="w-16 h-1 bg-orange-500 mx-auto"></div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              @click="refresh"
              class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Thử lại
            </button>
          </div>
        </div>

        <!-- Projects Grid -->
        <main v-else-if="projects.length" class="space-y-8">
          <h2 class="sr-only">Danh sách dự án</h2>
          <!-- Grid View -->
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article
              v-for="project in projects"
              :key="project._id"
              class="bg-gray-800/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-700"
              itemscope
              itemtype="https://schema.org/SoftwareApplication"
            >
              <NuxtLink :to="`/projects/${project._id}`" class="block">
                <!-- Featured Image -->
                <div class="relative overflow-hidden">
                  <img
                    :src="project.thumbnail || '/images/blog-1.webp'"
                    :alt="project.title"
                    class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div class="absolute top-4 left-4">
                    <span
                      class="bg-orange-500/90 text-white px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {{ formatDate(project.createdAt) }}
                    </span>
                  </div>
                </div>

                <!-- Content -->
                <div class="p-6">
                  <h3
                    class="text-xl font-bold text-white mb-3 line-clamp-1 group-hover:text-orange-400 transition-colors"
                    itemprop="name"
                  >
                    {{ project.title }}
                  </h3>
                  <ViewEdior
                    :content="project.description"
                    :strip-html="true"
                    :truncate="true"
                    :max-length="120"
                    custom-class="text-gray-500 mb-4 line-clamp-3 text-sm"
                    itemprop="description"
                    variant="light"
                  />

                  <!-- Skills -->
                  <div class="flex flex-wrap gap-2 mb-4">
                    <span
                      v-for="skill in project.skill?.slice(0, 3)"
                      :key="skill"
                      class="bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {{ skill }}
                    </span>
                    <span
                      v-if="project.skill && project.skill.length > 3"
                      class="bg-gray-600/50 text-gray-300 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      +{{ project.skill.length - 3 }}
                    </span>
                  </div>

                  <!-- Author Info -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      <img
                        v-if="project.createdBy?.avatar"
                        :src="project.createdBy.avatar"
                        :alt="`${project.createdBy.firstName} ${project.createdBy.lastName}`"
                        class="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p class="text-sm font-medium text-gray-300">
                          {{ project.createdBy?.firstName }}
                          {{ project.createdBy?.lastName }}
                        </p>
                        <p class="text-xs text-gray-400">
                          {{ calculateReadingTime(project.description) }} phút
                          đọc
                        </p>
                      </div>
                    </div>
                    <span
                      class="text-orange-500 group-hover:text-orange-400 transition-colors"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </NuxtLink>
            </article>
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
        </main>

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
  </div>
</template>

<script setup>
  import { httpRequest } from '~/utils/httpRequest'

  // SEO Meta Tags
  useHead({
    title: 'Dự án & Portfolio - Nguyễn Lê Đình Tiên | Web Development Projects',
    meta: [
      {
        name: 'description',
        content:
          'Khám phá các dự án web và ứng dụng tôi đã phát triển với React, Vue.js, Node.js và các công nghệ hiện đại. Portfolio chuyên nghiệp với nhiều dự án thực tế.',
      },
      {
        name: 'keywords',
        content:
          'dự án web, portfolio, React, Vue.js, Node.js, JavaScript, TypeScript, frontend, backend, fullstack, web development, projects',
      },
      {
        name: 'robots',
        content:
          'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
      {
        name: 'author',
        content: 'Nguyễn Lê Đình Tiên',
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: 'https://nguyenledinhtien.io.vn/projects',
      },
    ],
  })

  // SEO Meta for social sharing
  useSeoMeta({
    title: 'Dự án & Portfolio - Nguyễn Lê Đình Tiên | Web Development Projects',
    description:
      'Khám phá các dự án web và ứng dụng tôi đã phát triển với React, Vue.js, Node.js và các công nghệ hiện đại.',
    ogTitle:
      'Dự án & Portfolio - Nguyễn Lê Đình Tiên | Web Development Projects',
    ogDescription:
      'Khám phá các dự án web và ứng dụng tôi đã phát triển với React, Vue.js, Node.js và các công nghệ hiện đại.',
    ogImage: 'https://nguyenledinhtien.io.vn/images/blog-1.webp',
    ogUrl: 'https://nguyenledinhtien.io.vn/projects',
    ogSiteName: 'nguyenledinhtien.io.vn',
    ogLocale: 'vi_VN',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle:
      'Dự án & Portfolio - Nguyễn Lê Đình Tiên | Web Development Projects',
    twitterDescription:
      'Khám phá các dự án web và ứng dụng tôi đã phát triển với React, Vue.js, Node.js và các công nghệ hiện đại.',
    twitterImage: 'https://nguyenledinhtien.io.vn/images/blog-1.webp',
  })

  // Structured Data for Projects
  useHead({
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Dự án & Portfolio - Nguyễn Lê Đình Tiên',
          description: 'Danh sách các dự án web và ứng dụng đã phát triển',
          url: 'https://nguyenledinhtien.io.vn/projects',
          numberOfItems: 0,
          itemListElement: [],
        }),
      },
      // BreadcrumbList structured data
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Trang chủ',
              item: 'https://nguyenledinhtien.io.vn',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Dự án & Portfolio',
              item: 'https://nguyenledinhtien.io.vn/projects',
            },
          ],
        }),
      },
    ],
  })

  // State management
  const currentPage = ref(1)
  const limit = 6 // Hiển thị 6 project mỗi trang
  const projects = ref([])
  const totalPages = ref(1)
  const hasMoreProjects = ref(true)
  const pending = ref(false)
  const error = ref(null)

  // Fetch projects data using httpRequest
  const fetchProjects = async () => {
    try {
      pending.value = true
      error.value = null

      const response = await httpRequest.get(
        `/projects?page=${currentPage.value}&limit=${limit}`
      )

      if (response && response.data && Array.isArray(response.data)) {
        // Map API data to match our expected format
        const mappedProjects = response.data.map(project => ({
          _id: project._id,
          title: project.title,
          description: project.description,
          content: project.content,
          thumbnail: project.thumbnail,
          createdAt: project.createdAt,
          updatedAt: project.updatedAt,
          createdBy: project.createdBy,
          status: project.status,
          skill: project.skill || [],
        }))

        if (currentPage.value === 1) {
          projects.value = mappedProjects
        } else {
          projects.value = [...projects.value, ...mappedProjects]
        }

        // Tính tổng số trang
        const total = response.total || response.data.length
        totalPages.value = Math.ceil(total / limit)
        hasMoreProjects.value = response.nextPage || false
      } else {
        projects.value = []
        totalPages.value = 1
        hasMoreProjects.value = false
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

  // Load initial data
  await fetchProjects()

  // Refresh function
  const refresh = () => {
    currentPage.value = 1
    fetchProjects()
  }

  // Helper function to strip HTML tags
  const stripHtmlTags = html => {
    if (!html) return ''
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/\*\*/g, '')
      .trim()
  }

  // Helper function to format date
  const formatDate = dateString => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  // Calculate reading time
  const calculateReadingTime = content => {
    if (!content) return 1
    const wordsPerMinute = 200
    const wordCount = stripHtmlTags(content).split(' ').length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  // Initialize on mount
  onMounted(() => {
    console.log('Projects component mounted')
  })

  // Define page meta for SSR
  definePageMeta({
    title: 'Dự án & Portfolio - Nguyễn Lê Đình Tiên',
    description:
      'Khám phá các dự án web và ứng dụng tôi đã phát triển với React, Vue.js, Node.js và các công nghệ hiện đại.',
    layout: 'default',
    ssr: true, // Enable server-side rendering
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

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Dark theme enhancements */
  .group:hover {
    box-shadow:
      0 20px 25px -5px rgba(0, 0, 0, 0.3),
      0 10px 10px -5px rgba(0, 0, 0, 0.2);
  }

  /* Focus states for accessibility */
  button:focus,
  a:focus {
    outline: 2px solid #f97316;
    outline-offset: 2px;
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
</style>
