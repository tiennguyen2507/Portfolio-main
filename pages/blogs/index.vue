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
    <section id="blogs" class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <!-- My Blog Section -->
        <section id="my-blog" class="space-y-8">
          <div class="text-center">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
              My Blog
            </h2>
            <p class="text-gray-300 text-lg">Những bài viết cá nhân của tôi</p>
            <div class="w-16 h-1 bg-blue-500 mx-auto mt-4"></div>
          </div>

          <!-- Loading State for My Blog -->
          <div v-if="myBlogPending" class="text-center py-16">
            <div
              class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"
            ></div>
            <p class="text-gray-400 mt-4 text-lg">Đang tải bài viết...</p>
          </div>

          <!-- Error State for My Blog -->
          <div v-else-if="myBlogError" class="text-center py-8">
            <p class="text-gray-400">Không thể tải bài viết My Blog</p>
          </div>

          <!-- My Blog Posts -->
          <div
            v-else-if="myBlogPosts.length"
            class="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <article
              v-for="post in myBlogPosts"
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
                  <div class="absolute top-4 left-4 flex gap-2 flex-wrap">
                    <span
                      class="bg-orange-500/90 text-white px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {{ formatDate(post.createdAt) }}
                    </span>
                    <span
                      v-if="post.category"
                      :class="[
                        'px-3 py-1 rounded-full text-sm font-medium',
                        post.category === 'ai-blog'
                          ? 'bg-cyan-500/90 text-white'
                          : 'bg-blue-500/90 text-white',
                      ]"
                    >
                      {{ getCategoryLabel(post.category) }}
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
                    variant="light"
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

          <!-- Empty State for My Blog -->
          <div v-else class="text-center py-16">
            <div
              class="bg-gray-800/30 rounded-lg p-8 max-w-md mx-auto border border-gray-700"
            >
              <h3 class="text-lg font-semibold text-white mb-2">
                Chưa có bài viết My Blog
              </h3>
              <p class="text-gray-400 mb-4">Chưa có bài viết nào được đăng</p>
            </div>
          </div>
        </section>

        <!-- Blog AI Section -->
        <section id="ai-blog" class="space-y-8">
          <div class="text-center">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
              Blog AI
            </h2>
            <p class="text-gray-300 text-lg">Những bài viết được tạo bởi AI</p>
            <div class="w-16 h-1 bg-cyan-500 mx-auto mt-4"></div>
          </div>

          <!-- Loading State for Blog AI -->
          <div v-if="aiBlogPending" class="text-center py-16">
            <div
              class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"
            ></div>
            <p class="text-gray-400 mt-4 text-lg">Đang tải bài viết...</p>
          </div>

          <!-- Error State for Blog AI -->
          <div v-else-if="aiBlogError" class="text-center py-8">
            <p class="text-gray-400">Không thể tải bài viết Blog AI</p>
          </div>

          <!-- Blog AI Posts -->
          <div
            v-else-if="aiBlogPosts.length"
            class="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <article
              v-for="post in aiBlogPosts"
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
                  <div class="absolute top-4 left-4 flex gap-2 flex-wrap">
                    <span
                      class="bg-orange-500/90 text-white px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {{ formatDate(post.createdAt) }}
                    </span>
                    <span
                      v-if="post.category"
                      :class="[
                        'px-3 py-1 rounded-full text-sm font-medium',
                        post.category === 'ai-blog'
                          ? 'bg-cyan-500/90 text-white'
                          : 'bg-blue-500/90 text-white',
                      ]"
                    >
                      {{ getCategoryLabel(post.category) }}
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
                    variant="light"
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

          <!-- Empty State for Blog AI -->
          <div v-else class="text-center py-16">
            <div
              class="bg-gray-800/30 rounded-lg p-8 max-w-md mx-auto border border-gray-700"
            >
              <h3 class="text-lg font-semibold text-white mb-2">
                Chưa có bài viết Blog AI
              </h3>
              <p class="text-gray-400 mb-4">Chưa có bài viết nào được đăng</p>
            </div>
          </div>
        </section>
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
              url: 'https://nguyenledinhtien.io.vn/images/logo-main.webp',
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

  // Router for syncing page with query
  const route = useRoute()
  const router = useRouter()

  // State management
  const limit = 8

  // My Blog state
  const myBlogPosts = ref([])
  const myBlogPending = ref(false)
  const myBlogError = ref(null)

  // Blog AI state
  const aiBlogPosts = ref([])
  const aiBlogPending = ref(false)
  const aiBlogError = ref(null)

  // Map API data to expected format
  const mapPostData = post => ({
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
    category: post.category || '',
  })

  // Fetch My Blog posts
  const fetchMyBlogPosts = async () => {
    try {
      myBlogPending.value = true
      myBlogError.value = null

      const params = new URLSearchParams({
        page: '1',
        limit: limit.toString(),
        category: 'my-blog',
      })

      const response = await httpRequest.get(`/posts?${params.toString()}`)

      if (response && response.data && Array.isArray(response.data)) {
        myBlogPosts.value = response.data.map(mapPostData)
      } else {
        myBlogPosts.value = []
      }
    } catch (err) {
      myBlogError.value = err
      myBlogPosts.value = []
    } finally {
      myBlogPending.value = false
    }
  }

  // Fetch Blog AI posts
  const fetchAiBlogPosts = async () => {
    try {
      aiBlogPending.value = true
      aiBlogError.value = null

      const params = new URLSearchParams({
        page: '1',
        limit: limit.toString(),
        category: 'ai-blog',
      })

      const response = await httpRequest.get(`/posts?${params.toString()}`)

      if (response && response.data && Array.isArray(response.data)) {
        aiBlogPosts.value = response.data.map(mapPostData)
      } else {
        aiBlogPosts.value = []
      }
    } catch (err) {
      aiBlogError.value = err
      aiBlogPosts.value = []
    } finally {
      aiBlogPending.value = false
    }
  }

  // Get category label
  const getCategoryLabel = category => {
    const categoryMap = {
      'ai-blog': 'Blog AI',
      'my-blog': 'My Blog',
    }
    return categoryMap[category] || category || ''
  }

  // Load initial data
  await Promise.all([fetchMyBlogPosts(), fetchAiBlogPosts()])

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
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
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
