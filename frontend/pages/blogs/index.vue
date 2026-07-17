<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 pt-16">
    <Header />
    <section class="bg-gray-50 dark:bg-gray-800/30 py-16 md:py-20 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <Typography
            as="h1"
            :size="{sp: '4xl', pc: '6xl'}"
            weight="bold"
            color="default"
            align="center"
            class="mb-6"
          >
            Blog & Tin tức
          </Typography>
          <Typography
            as="p"
            :size="{sp: 'xl', pc: '2xl'}"
            color="muted"
            align="center"
            class="mb-8 max-w-3xl mx-auto"
          >
            Khám phá những bài viết mới nhất về công nghệ, phát triển web và
            kinh nghiệm lập trình
          </Typography>
          <div class="w-16 h-1 bg-orange-500 dark:bg-orange-400 mx-auto transition-colors duration-300"></div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section id="blogs" class="py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <!-- My Blog Section -->
        <section id="my-blog" class="space-y-8">
          <div class="text-center">
            <Typography
              as="h2"
              :size="{sp: '3xl', pc: '4xl'}"
              weight="bold"
              color="default"
              align="center"
              class="mb-4"
            >
              My Blog
            </Typography>
            <Typography
              as="p"
              size="lg"
              color="muted"
              align="center"
            >
              Những bài viết cá nhân của tôi
            </Typography>
            <div class="w-16 h-1 bg-blue-500 dark:bg-blue-400 mx-auto mt-4 transition-colors duration-300"></div>
          </div>

          <!-- Loading State for My Blog -->
          <div v-if="myBlogPending" class="text-center py-16">
            <div
              class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 dark:border-blue-400"
            ></div>
            <Typography
              as="p"
              size="lg"
              color="tertiary"
              align="center"
              class="mt-4"
            >
              Đang tải bài viết...
            </Typography>
          </div>

          <!-- Error State for My Blog -->
          <div v-else-if="myBlogError" class="text-center py-8">
            <Typography
              as="p"
              color="tertiary"
              align="center"
            >
              Không thể tải bài viết My Blog
            </Typography>
          </div>

          <!-- My Blog Posts -->
          <div
            v-else-if="myBlogPosts.length"
            class="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <article
              v-for="post in myBlogPosts"
              :key="post._id || post.id"
              class="bg-white dark:bg-gray-800/30 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              itemscope
              itemtype="https://schema.org/BlogPosting"
            >
              <NuxtLink
                :to="`/blogs/${post._id || post.id}`"
                class="block focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 rounded-xl"
              >
                <!-- Featured Image -->
                <div class="relative overflow-hidden">
                  <img
                    :src="post.thumbnail"
                    :alt="post.title"
                    class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div class="absolute top-4 left-4 flex gap-2 flex-wrap">
                    <Typography
                      as="span"
                      size="sm"
                      weight="medium"
                      color="white"
                      class="bg-orange-500/90 dark:bg-orange-600/90 px-3 py-1 rounded-full"
                    >
                      {{ formatDate(post.createdAt) }}
                    </Typography>
                    <Typography
                      v-if="post.category"
                      as="span"
                      size="sm"
                      weight="medium"
                      color="white"
                      :class="[
                        'px-3 py-1 rounded-full',
                        post.category === 'ai-blog'
                          ? 'bg-cyan-500/90 dark:bg-cyan-600/90'
                          : 'bg-blue-500/90 dark:bg-blue-600/90',
                      ]"
                    >
                      {{ getCategoryLabel(post.category) }}
                    </Typography>
                  </div>
                </div>

                <!-- Content -->
                <div class="p-6">
                  <Typography
                    as="h2"
                    size="xl"
                    weight="bold"
                    color="default"
                    class="mb-3 line-clamp-2 group-hover:text-orange-400 dark:group-hover:text-orange-400 transition-colors duration-200"
                    itemprop="headline"
                  >
                    {{ post.title }}
                  </Typography>
                  <ViewEditor
                    :content="post.description"
                    :strip-html="true"
                    :truncate="true"
                    :max-length="120"
                    custom-class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm"
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
                        <Typography
                          as="p"
                          size="sm"
                          weight="medium"
                          color="muted"
                        >
                          {{ post.createdBy?.firstName }}
                          {{ post.createdBy?.lastName }}
                        </Typography>
                        <Typography
                          as="p"
                          size="xs"
                          color="tertiary"
                        >
                          {{ calculateReadingTime(post.description) }} phút đọc
                        </Typography>
                      </div>
                    </div>
                    <span
                      class="text-orange-500 dark:text-orange-400 group-hover:text-orange-600 dark:group-hover:text-orange-300 transition-colors"
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
              class="bg-gray-50 dark:bg-gray-800/30 rounded-lg p-8 max-w-md mx-auto border border-gray-200 dark:border-gray-700 transition-colors duration-300"
            >
              <Typography
                as="h3"
                size="lg"
                weight="semibold"
                color="default"
                align="center"
                class="mb-2"
              >
                Chưa có bài viết My Blog
              </Typography>
              <Typography
                as="p"
                color="tertiary"
                align="center"
                class="mb-4"
              >
                Chưa có bài viết nào được đăng
              </Typography>
            </div>
          </div>
        </section>

        <!-- Blog AI Section -->
        <section id="ai-blog" class="space-y-8">
          <div class="text-center">
            <Typography
              as="h2"
              :size="{sp: '3xl', pc: '4xl'}"
              weight="bold"
              color="default"
              align="center"
              class="mb-4"
            >
              Blog AI
            </Typography>
            <Typography
              as="p"
              size="lg"
              color="muted"
              align="center"
            >
              Những bài viết được tạo bởi AI
            </Typography>
            <div class="w-16 h-1 bg-cyan-500 dark:bg-cyan-400 mx-auto mt-4 transition-colors duration-300"></div>
          </div>

          <!-- Loading State for Blog AI -->
          <div v-if="aiBlogPending" class="text-center py-16">
            <div
              class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 dark:border-cyan-400"
            ></div>
            <Typography
              as="p"
              size="lg"
              color="tertiary"
              align="center"
              class="mt-4"
            >
              Đang tải bài viết...
            </Typography>
          </div>

          <!-- Error State for Blog AI -->
          <div v-else-if="aiBlogError" class="text-center py-8">
            <Typography
              as="p"
              color="tertiary"
              align="center"
            >
              Không thể tải bài viết Blog AI
            </Typography>
          </div>

          <!-- Blog AI Posts -->
          <div
            v-else-if="aiBlogPosts.length"
            class="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <article
              v-for="post in aiBlogPosts"
              :key="post._id || post.id"
              class="bg-white dark:bg-gray-800/30 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              itemscope
              itemtype="https://schema.org/BlogPosting"
            >
              <NuxtLink
                :to="`/blogs/${post._id || post.id}`"
                class="block focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 rounded-xl"
              >
                <!-- Featured Image -->
                <div class="relative overflow-hidden">
                  <img
                    :src="post.thumbnail"
                    :alt="post.title"
                    class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div class="absolute top-4 left-4 flex gap-2 flex-wrap">
                    <Typography
                      as="span"
                      size="sm"
                      weight="medium"
                      color="white"
                      class="bg-orange-500/90 dark:bg-orange-600/90 px-3 py-1 rounded-full"
                    >
                      {{ formatDate(post.createdAt) }}
                    </Typography>
                    <Typography
                      v-if="post.category"
                      as="span"
                      size="sm"
                      weight="medium"
                      color="white"
                      :class="[
                        'px-3 py-1 rounded-full',
                        post.category === 'ai-blog'
                          ? 'bg-cyan-500/90 dark:bg-cyan-600/90'
                          : 'bg-blue-500/90 dark:bg-blue-600/90',
                      ]"
                    >
                      {{ getCategoryLabel(post.category) }}
                    </Typography>
                  </div>
                </div>

                <!-- Content -->
                <div class="p-6">
                  <Typography
                    as="h2"
                    size="xl"
                    weight="bold"
                    color="default"
                    class="mb-3 line-clamp-2 group-hover:text-orange-400 dark:group-hover:text-orange-400 transition-colors duration-200"
                    itemprop="headline"
                  >
                    {{ post.title }}
                  </Typography>
                  <ViewEditor
                    :content="post.description"
                    :strip-html="true"
                    :truncate="true"
                    :max-length="120"
                    custom-class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm"
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
                        <Typography
                          as="p"
                          size="sm"
                          weight="medium"
                          color="muted"
                        >
                          {{ post.createdBy?.firstName }}
                          {{ post.createdBy?.lastName }}
                        </Typography>
                        <Typography
                          as="p"
                          size="xs"
                          color="tertiary"
                        >
                          {{ calculateReadingTime(post.description) }} phút đọc
                        </Typography>
                      </div>
                    </div>
                    <span
                      class="text-orange-500 dark:text-orange-400 group-hover:text-orange-600 dark:group-hover:text-orange-300 transition-colors"
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
              class="bg-gray-50 dark:bg-gray-800/30 rounded-lg p-8 max-w-md mx-auto border border-gray-200 dark:border-gray-700 transition-colors duration-300"
            >
              <Typography
                as="h3"
                size="lg"
                weight="semibold"
                color="default"
                align="center"
                class="mb-2"
              >
                Chưa có bài viết Blog AI
              </Typography>
              <Typography
                as="p"
                color="tertiary"
                align="center"
                class="mb-4"
              >
                Chưa có bài viết nào được đăng
              </Typography>
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

  // Dark mode
  const { isDark } = useDarkMode()

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

