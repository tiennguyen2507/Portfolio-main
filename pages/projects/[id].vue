<template>
  <div>
    <div class="min-h-screen mt-2 bg-white">
      <!-- Loading State -->
      <div v-if="pending" class="flex items-center justify-center min-h-screen">
        <div class="text-center">
          <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"
          ></div>
          <p class="mt-4 text-gray-600">Đang tải dự án...</p>
        </div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="fetchError"
        class="flex items-center justify-center min-h-screen"
      >
        <div class="text-center">
          <p class="text-red-600 mb-4 text-lg">
            {{ fetchError.message || 'Đã xảy ra lỗi' }}
          </p>
          <button
            @click="refresh"
            class="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Thử lại
          </button>
          <NuxtLink
            to="/projects"
            class="block mt-4 text-orange-500 hover:text-orange-600 transition-colors"
          >
            ← Về danh sách dự án
          </NuxtLink>
        </div>
      </div>

      <!-- Project Detail Content -->
      <article
        v-else-if="projectData"
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        itemscope
        itemtype="https://schema.org/SoftwareApplication"
      >
        <!-- Enhanced Breadcrumbs with Schema -->
        <nav class="mb-8" aria-label="Breadcrumb">
          <ol
            class="flex items-center space-x-2 text-sm text-gray-500"
            itemscope
            itemtype="https://schema.org/BreadcrumbList"
          >
            <li
              itemprop="itemListElement"
              itemscope
              itemtype="https://schema.org/ListItem"
            >
              <NuxtLink
                to="/"
                class="hover:text-orange-500 transition-colors"
                itemprop="item"
              >
                <span itemprop="name">Trang chủ</span>
              </NuxtLink>
              <meta itemprop="position" content="1" />
            </li>
            <li>
              <svg
                class="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </li>
            <li
              itemprop="itemListElement"
              itemscope
              itemtype="https://schema.org/ListItem"
            >
              <NuxtLink
                to="/projects"
                class="hover:text-orange-500 transition-colors"
                itemprop="item"
              >
                <span itemprop="name">Dự án</span>
              </NuxtLink>
              <meta itemprop="position" content="2" />
            </li>
            <li>
              <svg
                class="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </li>
            <li
              itemprop="itemListElement"
              itemscope
              itemtype="https://schema.org/ListItem"
            >
              <span class="text-gray-900 font-medium" itemprop="name">
                {{ projectData.title }}
              </span>
              <meta itemprop="position" content="3" />
            </li>
          </ol>
        </nav>

        <!-- Project Header -->
        <header class="mb-8">
          <div class="mb-6">
            <h1
              class="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              itemprop="name"
            >
              {{ projectData.title }}
            </h1>
          </div>

          <!-- Project Meta -->
          <div
            class="flex flex-wrap items-center gap-4 text-sm text-gray-500 border-t border-gray-200 pt-6"
          >
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>Ngày tạo: {{ formatDate(projectData.createdAt) }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>
                Tác giả: {{ projectData.createdBy?.firstName }}
                {{ projectData.createdBy?.lastName }}
              </span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span
                >Trạng thái:
                {{
                  projectData.status ? 'Hoàn thành' : 'Đang phát triển'
                }}</span
              >
            </div>
          </div>
        </header>

        <!-- Project Thumbnail -->
        <div v-if="projectData.thumbnail" class="mb-8">
          <img
            :src="projectData.thumbnail"
            :alt="projectData.title"
            class="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            itemprop="image"
          />
        </div>

        <!-- Project Skills -->
        <section
          v-if="projectData.skill && projectData.skill.length"
          class="mb-8"
        >
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Công nghệ sử dụng
          </h2>
          <div class="flex flex-wrap gap-3">
            <span
              v-for="skill in projectData.skill"
              :key="skill"
              class="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium"
            >
              {{ skill }}
            </span>
          </div>
        </section>

        <!-- Project Description -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Mô tả dự án</h2>
          <div
            class="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            itemprop="description"
            v-html="projectData.description"
          ></div>
        </section>

        <!-- Project Content -->
        <section v-if="projectData.content" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Chi tiết dự án</h2>
          <div
            class="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            itemprop="text"
            v-html="projectData.content"
          ></div>
        </section>

        <!-- Project Actions -->
        <section class="border-t border-gray-200 pt-8">
          <div class="flex flex-wrap gap-4">
            <NuxtLink
              to="/projects"
              class="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Về danh sách dự án
            </NuxtLink>
            <button
              @click="shareProject"
              class="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.3 3.3 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"
                ></path>
              </svg>
              Chia sẻ
            </button>
          </div>
        </section>
      </article>
    </div>
  </div>
</template>

<script setup>
  import { httpRequest } from '~/utils/httpRequest'

  // Get project ID from route
  const route = useRoute()
  const projectId = route.params.id

  // State management
  const projectData = ref(null)
  const pending = ref(true)
  const fetchError = ref(null)

  // SEO Meta Tags
  useHead({
    title: computed(() =>
      projectData.value
        ? `${projectData.value.title} - Dự án | Nguyễn Lê Đình Tiên`
        : 'Dự án | Nguyễn Lê Đình Tiên'
    ),
    meta: [
      {
        name: 'description',
        content: computed(
          () =>
            projectData.value?.description || 'Chi tiết dự án web và ứng dụng'
        ),
      },
      {
        name: 'keywords',
        content: computed(() => {
          if (!projectData.value?.skill)
            return 'dự án web, portfolio, web development'
          return [
            ...projectData.value.skill,
            'dự án web',
            'portfolio',
            'web development',
          ].join(', ')
        }),
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
        href: computed(
          () => `https://nguyenledinhtien.io.vn/projects/${projectId}`
        ),
      },
    ],
  })

  // SEO Meta for social sharing
  useSeoMeta({
    title: computed(() =>
      projectData.value
        ? `${projectData.value.title} - Dự án | Nguyễn Lê Đình Tiên`
        : 'Dự án | Nguyễn Lê Đình Tiên'
    ),
    description: computed(
      () => projectData.value?.description || 'Chi tiết dự án web và ứng dụng'
    ),
    ogTitle: computed(() =>
      projectData.value
        ? `${projectData.value.title} - Dự án | Nguyễn Lê Đình Tiên`
        : 'Dự án | Nguyễn Lê Đình Tiên'
    ),
    ogDescription: computed(
      () => projectData.value?.description || 'Chi tiết dự án web và ứng dụng'
    ),
    ogImage: computed(
      () =>
        projectData.value?.thumbnail ||
        'https://nguyenledinhtien.io.vn/images/blog-1.webp'
    ),
    ogUrl: computed(
      () => `https://nguyenledinhtien.io.vn/projects/${projectId}`
    ),
    ogSiteName: 'nguyenledinhtien.io.vn',
    ogLocale: 'vi_VN',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: computed(() =>
      projectData.value
        ? `${projectData.value.title} - Dự án | Nguyễn Lê Đình Tiên`
        : 'Dự án | Nguyễn Lê Đình Tiên'
    ),
    twitterDescription: computed(
      () => projectData.value?.description || 'Chi tiết dự án web và ứng dụng'
    ),
    twitterImage: computed(
      () =>
        projectData.value?.thumbnail ||
        'https://nguyenledinhtien.io.vn/images/blog-1.webp'
    ),
  })

  // Structured Data for Project
  useHead({
    script: [
      {
        type: 'application/ld+json',
        children: computed(() =>
          JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: projectData.value?.title || 'Dự án',
            description:
              projectData.value?.description ||
              'Chi tiết dự án web và ứng dụng',
            url: `https://nguyenledinhtien.io.vn/projects/${projectId}`,
            author: {
              '@type': 'Person',
              name: projectData.value?.createdBy?.firstName
                ? `${projectData.value.createdBy.firstName} ${projectData.value.createdBy.lastName}`
                : 'Nguyễn Lê Đình Tiên',
              url: 'https://nguyenledinhtien.io.vn',
            },
            datePublished: projectData.value?.createdAt,
            dateModified: projectData.value?.updatedAt,
            applicationCategory: 'WebApplication',
            operatingSystem: 'Web Browser',
            inLanguage: 'vi-VN',
            ...(projectData.value?.thumbnail && {
              image: {
                '@type': 'ImageObject',
                url: projectData.value.thumbnail,
              },
            }),
          })
        ),
      },
      // BreadcrumbList structured data
      {
        type: 'application/ld+json',
        children: computed(() =>
          JSON.stringify({
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
                name: 'Dự án',
                item: 'https://nguyenledinhtien.io.vn/projects',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: projectData.value?.title || 'Dự án',
                item: `https://nguyenledinhtien.io.vn/projects/${projectId}`,
              },
            ],
          })
        ),
      },
    ],
  })

  // Fetch project data
  const fetchProject = async () => {
    try {
      pending.value = true
      fetchError.value = null

      const response = await httpRequest.get(`/projects/${projectId}`)

      if (response && response._id) {
        projectData.value = {
          _id: response._id,
          title: response.title,
          description: response.description,
          content: response.content,
          thumbnail: response.thumbnail,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
          createdBy: response.createdBy,
          status: response.status,
          skill: response.skill || [],
        }
      } else {
        throw new Error('Không tìm thấy dự án')
      }
    } catch (err) {
      console.error('Error fetching project:', err)
      fetchError.value = {
        message: err.message || 'Không thể tải dự án. Vui lòng thử lại.',
      }
    } finally {
      pending.value = false
    }
  }

  // Refresh function
  const refresh = () => {
    fetchProject()
  }

  // Share project function
  const shareProject = async () => {
    if (navigator.share && projectData.value) {
      try {
        await navigator.share({
          title: projectData.value.title,
          text: projectData.value.description,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href)
        alert('Đã sao chép link vào clipboard!')
      } catch (err) {
        console.log('Error copying to clipboard:', err)
      }
    }
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

  // Fetch project on mount
  onMounted(() => {
    fetchProject()
  })

  // Watch for route changes
  watch(
    () => route.params.id,
    newId => {
      if (newId && newId !== projectId) {
        fetchProject()
      }
    }
  )

  // Define page meta
  definePageMeta({
    title: 'Dự án | Nguyễn Lê Đình Tiên',
    description: 'Chi tiết dự án web và ứng dụng',
    layout: 'default',
    ssr: true,
  })
</script>

<style scoped>
  .prose {
    color: #374151;
  }

  .prose h1,
  .prose h2,
  .prose h3,
  .prose h4,
  .prose h5,
  .prose h6 {
    color: #111827;
    font-weight: 600;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
  }

  .prose p {
    margin-bottom: 1em;
  }

  .prose ul,
  .prose ol {
    margin-bottom: 1em;
    padding-left: 1.5em;
  }

  .prose li {
    margin-bottom: 0.5em;
  }

  .prose a {
    color: #f97316;
    text-decoration: underline;
  }

  .prose a:hover {
    color: #ea580c;
  }

  .prose blockquote {
    border-left: 4px solid #f97316;
    padding-left: 1em;
    margin: 1em 0;
    font-style: italic;
    color: #6b7280;
  }

  .prose code {
    background-color: #f3f4f6;
    padding: 0.2em 0.4em;
    border-radius: 0.25rem;
    font-size: 0.875em;
    color: #dc2626;
  }

  .prose pre {
    background-color: #1f2937;
    color: #f9fafb;
    padding: 1em;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1em 0;
  }

  .prose pre code {
    background-color: transparent;
    color: inherit;
    padding: 0;
  }
</style>
