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
                  Blog & Tin tức
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
          <h1 class="text-4xl md:text-6xl font-bold mb-6">Blog & Tin tức</h1>
          <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Khám phá những bài viết mới nhất về công nghệ, phát triển web và
            kinh nghiệm lập trình
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
          <p class="text-gray-400 mt-4 text-lg">Đang tải bài viết...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-16">
          <div
            class="bg-gray-800/50 border border-red-500/50 rounded-lg p-8 max-w-md mx-auto"
          >
            <h3 class="text-lg font-semibold text-red-400 mb-2">
              Không thể tải bài viết
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

        <!-- Blog Posts -->
        <main v-else-if="allPosts.length" class="space-y-8">
          <h2 class="sr-only">Danh sách bài viết</h2>
          <!-- Grid View -->
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article
              v-for="post in allPosts"
              :key="post._id || post.id"
              class="bg-gray-800/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-700"
              itemscope
              itemtype="https://schema.org/BlogPosting"
            >
              <NuxtLink :to="`/blogs/${post._id || post.id}`" class="block">
                <!-- Featured Image -->
                <div class="relative overflow-hidden">
                  <img
                    :src="post.thumbnail"
                    :alt="post.title"
                    class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div class="absolute top-4 left-4">
                    <span
                      class="bg-orange-500/90 text-white px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {{ formatDate(post.createdAt) }}
                    </span>
                  </div>
                </div>

                <!-- Content -->
                <div class="p-6">
                  <h2
                    class="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-orange-400 transition-colors"
                    itemprop="headline"
                  >
                    {{ post.title }}
                  </h2>
                  <ViewEditor
                    :content="post.description"
                    :strip-html="true"
                    :truncate="true"
                    :max-length="120"
                    custom-class="text-gray-400 mb-4 line-clamp-3 text-sm"
                    itemprop="description"
                    variant="dark"
                  />

                  <!-- Author Info -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      <img
                        v-if="post.createdBy?.avatar"
                        :src="post.createdBy.avatar"
                        :alt="`${post.createdBy.firstName} ${post.createdBy.lastName}`"
                        class="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p class="text-sm font-medium text-gray-300">
                          {{ post.createdBy?.firstName }}
                          {{ post.createdBy?.lastName }}
                        </p>
                        <p class="text-xs text-gray-400">
                          {{ calculateReadingTime(post.description) }} phút đọc
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

          <!-- Load More Button -->
          <div v-if="hasMorePosts" class="text-center pt-8">
            <button
              @click="loadMorePosts"
              :disabled="pending"
              class="px-8 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
            >
              <span
                v-if="pending"
                class="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white"
              ></span>
              <span>{{ pending ? 'Đang tải...' : 'Xem thêm bài viết' }}</span>
            </button>
          </div>
        </main>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <div
            class="bg-gray-800/30 rounded-lg p-8 max-w-md mx-auto border border-gray-700"
          >
            <h3 class="text-lg font-semibold text-white mb-2">
              Không tìm thấy bài viết
            </h3>
            <p class="text-gray-400 mb-4">Chưa có bài viết nào được đăng</p>
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
    title: 'Blog & Tin tức - Nguyễn Lê Đình Tiên | Công nghệ & Lập trình',
    meta: [
      {
        name: 'description',
        content:
          'Khám phá những bài viết mới nhất về công nghệ, phát triển web, lập trình và kinh nghiệm thực tế từ Nguyễn Lê Đình Tiên. Chia sẻ kiến thức về React, Vue.js, Node.js, và các công nghệ web hiện đại.',
      },
      {
        name: 'keywords',
        content:
          'blog công nghệ, bài viết lập trình, phát triển web, React, Vue.js, Node.js, JavaScript, TypeScript, frontend, backend, fullstack, SEO, performance, web development, programming tips, coding tutorials',
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
      {
        name: 'google-site-verification',
        content: 'your-google-verification-code', // Thay thế bằng code thực tế
      },
      {
        name: 'google',
        content: 'notranslate',
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: 'https://nguyenledinhtien.io.vn/blogs',
      },
      {
        rel: 'alternate',
        hreflang: 'vi',
        href: 'https://nguyenledinhtien.io.vn/blogs',
      },
      {
        rel: 'alternate',
        hreflang: 'x-default',
        href: 'https://nguyenledinhtien.io.vn/blogs',
      },
    ],
  })

  // SEO Meta for social sharing
  useSeoMeta({
    title: 'Blog & Tin tức - Nguyễn Lê Đình Tiên | Công nghệ & Lập trình',
    description:
      'Khám phá những bài viết mới nhất về công nghệ, phát triển web, lập trình và kinh nghiệm thực tế từ Nguyễn Lê Đình Tiên. Chia sẻ kiến thức về React, Vue.js, Node.js, và các công nghệ web hiện đại.',
    ogTitle: 'Blog & Tin tức - Nguyễn Lê Đình Tiên | Công nghệ & Lập trình',
    ogDescription:
      'Khám phá những bài viết mới nhất về công nghệ, phát triển web, lập trình và kinh nghiệm thực tế từ Nguyễn Lê Đình Tiên. Chia sẻ kiến thức về React, Vue.js, Node.js, và các công nghệ web hiện đại.',
    ogImage: 'https://nguyenledinhtien.io.vn/images/blog-1.webp',
    ogUrl: 'https://nguyenledinhtien.io.vn/blogs',
    ogSiteName: 'nguyenledinhtien.io.vn',
    ogLocale: 'vi_VN',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle:
      'Blog & Tin tức - Nguyễn Lê Đình Tiên | Công nghệ & Lập trình',
    twitterDescription:
      'Khám phá những bài viết mới nhất về công nghệ, phát triển web, lập trình và kinh nghiệm thực tế từ Nguyễn Lê Đình Tiên.',
    twitterImage: 'https://nguyenledinhtien.io.vn/images/blog-1.webp',
    twitterSite: '@nguyenledinhtien',
    twitterCreator: '@nguyenledinhtien',
  })

  // Structured Data for Blog
  useHead({
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Blog & Tin tức - Nguyễn Lê Đình Tiên',
          description:
            'Blog chia sẻ kiến thức về công nghệ, phát triển web, lập trình và kinh nghiệm thực tế',
          url: 'https://nguyenledinhtien.io.vn/blogs',
          publisher: {
            '@type': 'Person',
            name: 'Nguyễn Lê Đình Tiên',
            url: 'https://nguyenledinhtien.io.vn',
            image: {
              '@type': 'ImageObject',
              url: 'https://nguyenledinhtien.io.vn/images/logo.webp',
              width: 200,
              height: 200,
            },
            sameAs: [
              'https://github.com/nguyenledinhtien',
              'https://linkedin.com/in/nguyenledinhtien',
            ],
          },
          author: {
            '@type': 'Person',
            name: 'Nguyễn Lê Đình Tiên',
            url: 'https://nguyenledinhtien.io.vn',
          },
          inLanguage: 'vi-VN',
          isAccessibleForFree: true,
          datePublished: new Date().toISOString(),
          dateModified: new Date().toISOString(),
          potentialAction: {
            '@type': 'ReadAction',
            target: 'https://nguyenledinhtien.io.vn/blogs',
          },
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
              name: 'Blog & Tin tức',
              item: 'https://nguyenledinhtien.io.vn/blogs',
            },
          ],
        }),
      },
    ],
  })

  // State management
  const currentPage = ref(1)
  const limit = 9
  const allPosts = ref([])
  const hasMorePosts = ref(true)
  const pending = ref(false)
  const error = ref(null)

  // Fetch blog data using httpRequest
  const fetchPosts = async () => {
    try {
      pending.value = true
      error.value = null

      const response = await httpRequest.get(
        `/posts?page=${currentPage.value}&limit=${limit}`
      )

      if (response && response.data && Array.isArray(response.data)) {
        // Map API data to match our expected format
        const mappedPosts = response.data.map(post => ({
          id: post._id,
          _id: post._id,
          title: post.title,
          description: post.description,
          content: post.content,
          thumbnail: post.thumbnail,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          createdBy: post.createdBy,
          status: post.status,
          tags: post.tags || [],
        }))

        if (currentPage.value === 1) {
          allPosts.value = mappedPosts
        } else {
          allPosts.value = [...allPosts.value, ...mappedPosts]
        }
        hasMorePosts.value = response.nextPage || false
      } else {
        allPosts.value = []
        hasMorePosts.value = false
      }
    } catch (err) {
      error.value = err
    } finally {
      pending.value = false
    }
  }

  // Load initial data
  await fetchPosts()

  // Load more posts
  const loadMorePosts = async () => {
    if (hasMorePosts.value && !pending.value) {
      currentPage.value++
      await fetchPosts()
    }
  }

  // Refresh function
  const refresh = () => {
    currentPage.value = 1
    fetchPosts()
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
    console.log('Component mounted')
  })

  // Define page meta for SSR
  definePageMeta({
    title: 'Blog & Tin tức - Nguyễn Lê Đình Tiên',
    description:
      'Khám phá những bài viết mới nhất về công nghệ, phát triển web, lập trình và kinh nghiệm thực tế từ Nguyễn Lê Đình Tiên.',
    layout: 'default',
    ssr: true, // Enable server-side rendering
  })
</script>

<style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
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
