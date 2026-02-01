<template>
  <div>
    <!-- Blog Header -->
    <Header />
    
    <div class="min-h-screen pt-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <!-- Loading State -->
      <div v-if="pending" class="flex items-center justify-center min-h-screen">
        <div class="text-center">
          <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 dark:border-orange-400"
          ></div>
          <Typography
            as="p"
            color="muted"
            align="center"
            class="mt-4"
          >
            Đang tải bài viết...
          </Typography>
        </div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="fetchError"
        class="flex items-center justify-center min-h-screen"
      >
        <div class="text-center">
          <Typography
            as="p"
            size="lg"
            color="error"
            align="center"
            class="mb-4"
          >
            {{ fetchError.message || 'Đã xảy ra lỗi' }}
          </Typography>
          <button
            @click="refresh"
            class="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Thử lại
          </button>
          <NuxtLink
            to="/blogs"
            class="block mt-4 text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 transition-colors"
          >
            ← Về danh sách bài viết
          </NuxtLink>
        </div>
      </div>

      <!-- Blog Detail Content -->
      <article
        v-else-if="blogData"
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        itemscope
        itemtype="https://schema.org/BlogPosting"
      >
        <!-- Enhanced Breadcrumbs with Schema -->
        <nav class="mb-8" aria-label="Breadcrumb">
          <ol
            class="flex items-center space-x-2 text-sm"
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
                class="hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                itemprop="item"
              >
                <Typography
                  as="span"
                  size="sm"
                  color="muted"
                  itemprop="name"
                >
                  Trang chủ
                </Typography>
              </NuxtLink>
              <meta itemprop="position" content="1" />
            </li>
            <li>
              <Icon
                name="chevron-right-filled"
                size="sm"
                viewBox="0 0 20 20"
                color="text-gray-500 dark:text-gray-400"
              />
            </li>
            <li
              itemprop="itemListElement"
              itemscope
              itemtype="https://schema.org/ListItem"
            >
              <NuxtLink
                to="/blogs"
                class="hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                itemprop="item"
              >
                <Typography
                  as="span"
                  size="sm"
                  color="muted"
                  itemprop="name"
                >
                  Blog
                </Typography>
              </NuxtLink>
              <meta itemprop="position" content="2" />
            </li>
            <li>
              <Icon
                name="chevron-right-filled"
                size="sm"
                viewBox="0 0 20 20"
                color="text-gray-500 dark:text-gray-400"
              />
            </li>
            <li
              class="truncate max-w-xs"
              itemprop="itemListElement"
              itemscope
              itemtype="https://schema.org/ListItem"
            >
              <Typography
                as="span"
                size="sm"
                weight="medium"
                color="default"
                itemprop="name"
              >
                {{ blogData.title }}
              </Typography>
              <meta itemprop="position" content="3" />
            </li>
          </ol>
        </nav>

        <!-- Blog Content - Seamless Layout -->
        <div class="bg-white dark:bg-gray-900 transition-colors duration-300">
          <!-- Enhanced Title with better typography -->
          <header>
            <Typography
              as="h1"
              :size="{sp: '4xl', pc: '5xl'}"
              weight="bold"
              color="default"
              class="mb-6 leading-tight"
              itemprop="headline"
            >
              {{ blogData.title }}
            </Typography>

            <!-- Enhanced Meta Info with better accessibility -->
            <div class="flex flex-wrap items-center gap-6 mb-8">
              <div class="flex items-center">
                <Typography
                  as="span"
                  size="sm"
                  color="muted"
                  class="mr-2"
                >
                  Ngày đăng:
                </Typography>
                <time
                  :datetime="formatDateISO(blogData.createdAt)"
                  itemprop="datePublished"
                >
                  <Typography
                    as="span"
                    size="sm"
                    weight="medium"
                    color="default"
                  >
                    {{ formatDate(blogData.createdAt) }}
                  </Typography>
                </time>
              </div>
              <div class="flex items-center">
                <Typography
                  as="span"
                  size="sm"
                  color="muted"
                  class="mr-2"
                >
                  Tác giả:
                </Typography>
                <img
                  :src="blogData.createdBy.avatar"
                  :alt="`Avatar của ${blogData.createdBy.firstName} ${blogData.createdBy.lastName}`"
                  class="w-6 h-6 rounded-full mr-2"
                  @error="handleAvatarError"
                  loading="lazy"
                />
                <span
                  itemprop="author"
                  itemscope
                  itemtype="https://schema.org/Person"
                >
                  <Typography
                    as="span"
                    size="sm"
                    weight="medium"
                    color="default"
                    itemprop="name"
                  >
                    {{ blogData.createdBy.firstName }}
                    {{ blogData.createdBy.lastName }}
                  </Typography>
                </span>
              </div>
              <div class="flex items-center">
                <Typography
                  as="span"
                  size="sm"
                  color="muted"
                  class="mr-2"
                >
                  Trạng thái:
                </Typography>
                <Typography
                  as="span"
                  size="xs"
                  weight="medium"
                  color="white"
                  :class="[
                    'px-2 py-1 rounded',
                    blogData.status ? 'bg-green-500 dark:bg-green-600' : 'bg-gray-500 dark:bg-gray-600',
                  ]"
                >
                  {{ blogData.status ? 'Hoạt động' : 'Không hoạt động' }}
                </Typography>
              </div>
              <!-- Reading time estimate -->
              <div class="flex items-center">
                <Typography
                  as="span"
                  size="sm"
                  color="muted"
                  class="mr-2"
                >
                  Thời gian đọc:
                </Typography>
                <Typography
                  as="span"
                  size="sm"
                  weight="medium"
                  color="default"
                >
                  {{ calculateReadingTime(blogData.description) }} phút
                </Typography>
              </div>
            </div>
          </header>

          <!-- Enhanced Featured Image with lazy loading -->
          <figure class="relative mb-8">
            <img
              :src="blogData.thumbnail"
              :alt="`Hình ảnh chính cho bài viết: ${blogData.title}`"
              class="w-full h-96 object-cover rounded-lg shadow-lg"
              @error="handleImageError"
              itemprop="image"
              loading="lazy"
              decoding="async"
            />
            <figcaption
              class="absolute bottom-4 left-4 bg-black bg-opacity-75 dark:bg-black dark:bg-opacity-80 px-3 py-1 rounded"
            >
              <Typography
                as="span"
                size="sm"
                color="white"
              >
                Hình ảnh chính: {{ blogData.title }}
              </Typography>
            </figcaption>
          </figure>

          <!-- Enhanced Blog Content with better typography -->
          <ViewEditor :content="blogData.description" itemprop="articleBody" />

          <!-- Recommended Articles Section -->
          <section class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div class="flex items-center justify-between mb-8">
              <Typography
                as="h2"
                size="2xl"
                weight="bold"
                color="default"
              >
                Recommended
              </Typography>
              <NuxtLink
                to="/blogs"
                class="text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 font-medium transition-colors"
              >
                See all >
              </NuxtLink>
            </div>

            <!-- Loading State for Recommended -->
            <div v-if="recommendedPending" class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              <div v-for="i in 6" :key="i" class="animate-pulse">
                <div class="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <!-- Image Skeleton -->
                  <div class="flex-shrink-0 w-full sm:w-24 sm:order-2">
                    <div class="bg-gray-200 dark:bg-gray-700 w-full h-32 sm:h-24 rounded-lg"></div>
                  </div>
                  <!-- Content Skeleton -->
                  <div class="flex-1 sm:order-1">
                    <div class="flex items-center justify-between mb-2 sm:mb-3 gap-1 sm:gap-2">
                      <div class="bg-gray-200 dark:bg-gray-700 h-4 sm:h-6 w-16 sm:w-20 rounded"></div>
                      <div class="bg-gray-200 dark:bg-gray-700 h-3 sm:h-4 w-12 sm:w-16 rounded"></div>
                    </div>
                    <div class="space-y-1.5 sm:space-y-2 mb-2 sm:mb-3">
                      <div class="bg-gray-200 dark:bg-gray-700 h-3 sm:h-4 rounded w-full"></div>
                      <div class="bg-gray-200 dark:bg-gray-700 h-3 sm:h-4 rounded w-3/4"></div>
                    </div>
                    <div class="bg-gray-200 dark:bg-gray-700 h-2.5 sm:h-3 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recommended Articles Grid - Responsive columns with horizontal layout per article -->
            <div
              v-else-if="recommendedPosts.length"
              class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6"
            >
              <article
                v-for="post in recommendedPosts"
                :key="post._id"
                class="group cursor-pointer border border-gray-200 dark:border-gray-700 rounded-lg p-2 sm:p-4 hover:border-gray-300 dark:hover:border-gray-600 transition-colors bg-white dark:bg-gray-800/30"
                itemscope
                itemtype="https://schema.org/BlogPosting"
              >
                <NuxtLink :to="`/blogs/${post._id}`" class="block h-full">
                  <div class="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <!-- Image - Show on top for mobile -->
                    <div class="flex-shrink-0 w-full sm:w-24 sm:order-2">
                      <div
                        class="relative overflow-hidden rounded-lg w-full h-32 sm:h-24"
                      >
                        <img
                          :src="post.thumbnail"
                          :alt="post.title"
                          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    <!-- Content -->
                    <div class="flex-1 min-w-0 sm:order-1">
                      <!-- Source Tag and Time -->
                      <div class="flex items-center justify-between mb-2 sm:mb-3 flex-wrap gap-1 sm:gap-2">
                        <Typography
                          as="span"
                          size="xs"
                          weight="medium"
                          color="muted"
                          class="bg-white dark:bg-gray-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-gray-200 dark:border-gray-700 whitespace-nowrap text-[10px] sm:text-xs"
                        >
                          {{ post.createdBy?.firstName || 'Blog' }} News
                        </Typography>
                        <Typography
                          as="span"
                          size="xs"
                          color="tertiary"
                          class="whitespace-nowrap text-[10px] sm:text-xs"
                        >
                          4h ago
                        </Typography>
                      </div>

                      <!-- Article Title -->
                      <Typography
                        as="h3"
                        size="sm"
                        weight="semibold"
                        color="default"
                        class="mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-3 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors text-xs sm:text-sm"
                        itemprop="headline"
                      >
                        {{ post.title }}
                      </Typography>

                      <!-- Author and Reading Time -->
                      <Typography
                        as="p"
                        size="xs"
                        color="muted"
                        class="line-clamp-1 text-[10px] sm:text-xs"
                      >
                        by {{ post.createdBy?.firstName || 'Author' }} |
                        {{ calculateReadingTime(post.description) }} min
                      </Typography>
                    </div>
                  </div>
                </NuxtLink>
              </article>
            </div>

            <!-- Empty State for Recommended -->
            <div v-else class="text-center py-8">
              <Typography
                as="p"
                color="muted"
                align="center"
              >
                Không có bài viết liên quan
              </Typography>
            </div>
          </section>

          <!-- Enhanced Footer with better navigation -->
          <footer
            class="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-700 gap-4 mt-8 transition-colors duration-300"
          >
            <div>
              <Typography
                as="span"
                size="sm"
                color="muted"
              >
                Cập nhật lần cuối:
              </Typography>
              <time
                :datetime="
                  formatDateISO(blogData.updatedAt || blogData.createdAt)
                "
                itemprop="dateModified"
              >
                <Typography
                  as="span"
                  size="sm"
                  weight="medium"
                  color="default"
                >
                  {{ formatDate(blogData.updatedAt || blogData.createdAt) }}
                </Typography>
              </time>
            </div>
            <div class="flex gap-3">
              <NuxtLink
                to="/blogs"
                class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                aria-label="Xem tất cả bài viết"
              >
                <Icon
                  name="blogs"
                  size="sm"
                  icon-class="mr-2"
                />
                <Typography
                  as="span"
                  size="sm"
                  color="default"
                >
                  Tất cả bài viết
                </Typography>
              </NuxtLink>
              <NuxtLink
                to="/"
                class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                aria-label="Về trang chủ"
              >
                <Icon
                  name="home"
                  size="sm"
                  icon-class="mr-2"
                />
                <Typography
                  as="span"
                  size="sm"
                  color="default"
                >
                  Về trang chủ
                </Typography>
              </NuxtLink>
            </div>
          </footer>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
  import { computed, watch } from 'vue'
  import httpRequest from '~/utils/httpRequest'
  // ViewEditor component is auto-imported from components/ui/ViewEditor.vue

  // Dark mode
  const { isDark } = useDarkMode()

  // Get route params
  const route = useRoute()
  const blogId = computed(() => route.params.id)

  // Server-side data fetching with useAsyncData
  const {
    data: blogData,
    pending,
    error: fetchError,
    refresh,
  } = await useAsyncData(
    `blog-${blogId.value}`,
    async () => {
      try {
        const data = await httpRequest.get(`/posts/${blogId.value}`)
        return data
      } catch (err) {
        console.error('Error fetching blog detail:', err)
        throw new Error('Không thể tải bài viết. Vui lòng thử lại sau.')
      }
    },
    {
      server: true, // Enable SSR
      client: true, // Enable client-side hydration
      key: `blog-${blogId.value}`, // Unique key for caching
      transform: data => {
        // Transform data if needed
        return data
      },
      watch: [blogId], // Watch for route changes
    }
  )

  // Calculate reading time
  const calculateReadingTime = content => {
    if (!content) return 1
    const wordsPerMinute = 200
    const wordCount = stripHtml(content).split(' ').length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  // Format date
  const formatDate = dateString => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Format date for SEO (ISO format)
  const formatDateISO = dateString => {
    return new Date(dateString).toISOString()
  }

  // Strip HTML tags for meta description
  const stripHtml = html => {
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  }

  // Handle image error
  const handleImageError = event => {
    event.target.src = '/images/blog-1.webp' // Fallback image
  }

  // Handle avatar error
  const handleAvatarError = event => {
    event.target.src = '/images/ab-1.webp' // Fallback avatar
  }

  // Enhanced SEO Meta Tags with SSR support - Optimized for Google Search
  useHead(() => {
    if (!blogData.value) {
      return {
        title: 'Blog Detail - Nguyễn Lê Đình Tiên',
        meta: [
          {
            name: 'description',
            content:
              'Đọc các bài viết mới nhất về công nghệ, phát triển web và kinh nghiệm lập trình.',
          },
          {
            name: 'robots',
            content: 'noindex, nofollow',
          },
        ],
      }
    }

    // Optimized title for Google Search (50-60 characters)
    const title = `${blogData.value.title} - Nguyễn Lê Đình Tiên`

    // Optimized description for Google Search (150-160 characters)
    const rawDescription = stripHtml(blogData.value.description)
    const description =
      rawDescription.length > 155
        ? rawDescription.substring(0, 155) + '...'
        : rawDescription

    const imageUrl = blogData.value.thumbnail || '/images/blog-1.webp'
    const authorName = `${blogData.value.createdBy.firstName} ${blogData.value.createdBy.lastName}`
    const publishedDate = formatDateISO(blogData.value.createdAt)
    const modifiedDate = formatDateISO(
      blogData.value.updatedAt || blogData.value.createdAt
    )
    const url = `https://nguyenledinhtien.io.vn/blogs/${blogData.value._id}`
    const readingTime = calculateReadingTime(blogData.value.description)

    return {
      title,
      meta: [
        // Basic SEO - Optimized for Google Search
        {
          name: 'description',
          content: description,
        },
        {
          name: 'keywords',
          content: `${blogData.value.title}, blog, bài viết, công nghệ, phát triển web, lập trình, React, Vue.js, Node.js, Nguyễn Lê Đình Tiên, frontend, backend, fullstack`,
        },
        {
          name: 'author',
          content: authorName,
        },
        {
          name: 'robots',
          content:
            'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        },
        {
          name: 'googlebot',
          content: 'index, follow',
        },
        {
          name: 'article:reading_time',
          content: readingTime.toString(),
        },
        // Additional Google-specific meta tags
        {
          name: 'google-site-verification',
          content: 'your-google-verification-code', // Thay bằng code từ Google Search Console
        },
        {
          name: 'google',
          content: 'notranslate',
        },

        // Open Graph (Facebook, LinkedIn)
        {
          property: 'og:type',
          content: 'article',
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: description,
        },
        {
          property: 'og:image',
          content: imageUrl,
        },
        {
          property: 'og:image:width',
          content: '1200',
        },
        {
          property: 'og:image:height',
          content: '630',
        },
        {
          property: 'og:url',
          content: url,
        },
        {
          property: 'og:site_name',
          content: 'nguyenledinhtien.io.vn',
        },
        {
          property: 'og:locale',
          content: 'vi_VN',
        },
        {
          property: 'article:published_time',
          content: publishedDate,
        },
        {
          property: 'article:modified_time',
          content: modifiedDate,
        },
        {
          property: 'article:author',
          content: authorName,
        },
        {
          property: 'article:section',
          content: 'Blog',
        },
        {
          property: 'article:tag',
          content: 'công nghệ, phát triển web, lập trình',
        },

        // Twitter Card
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: description,
        },
        {
          name: 'twitter:image',
          content: imageUrl,
        },
        {
          name: 'twitter:site',
          content: '@yourusername',
        },
        {
          name: 'twitter:creator',
          content: '@yourusername',
        },

        // Additional SEO
        {
          name: 'canonical',
          content: url,
        },
        {
          name: 'article:publisher',
          content: 'https://your-domain.com',
        },
        {
          name: 'article:section',
          content: 'Blog',
        },
        {
          name: 'article:tag',
          content:
            'công nghệ, phát triển web, lập trình, React, Vue.js, Node.js',
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: url,
        },
        {
          rel: 'preload',
          href: imageUrl,
          as: 'image',
        },
      ],
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: blogData.value.title,
            description: description,
            image: {
              '@type': 'ImageObject',
              url: imageUrl,
              width: 1200,
              height: 630,
            },
            author: {
              '@type': 'Person',
              name: authorName,
              image: blogData.value.createdBy.avatar,
              url: 'https://your-domain.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Nguyễn Lê Đình Tiên',
              logo: {
                '@type': 'ImageObject',
                url: 'https://nguyenledinhtien.io.vn/images/logo-main.webp',
                width: 200,
                height: 200,
              },
              url: 'https://nguyenledinhtien.io.vn',
            },
            datePublished: publishedDate,
            dateModified: modifiedDate,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': url,
            },
            url: url,
            isPartOf: {
              '@type': 'Blog',
              name: 'Blog - Nguyễn Lê Đình Tiên',
              url: 'https://nguyenledinhtien.io.vn/blogs',
              description: 'Blog về công nghệ, phát triển web và lập trình',
            },
            articleSection: 'Blog',
            articleBody: stripHtml(blogData.value.description),
            wordCount: stripHtml(blogData.value.description).split(' ').length,
            timeRequired: `PT${readingTime}M`,
            inLanguage: 'vi-VN',
            isAccessibleForFree: true,
            license: 'https://creativecommons.org/licenses/by/4.0/',
          }),
        },
        // BreadcrumbList Schema
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
                name: 'Blog',
                item: 'https://nguyenledinhtien.io.vn/blogs',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: blogData.value.title,
                item: url,
              },
            ],
          }),
        },
      ],
    }
  })

  // Set page title for better SEO - Optimized for Google Search
  useSeoMeta({
    title: computed(() =>
      blogData.value
        ? `${blogData.value.title} - Nguyễn Lê Đình Tiên`
        : 'Blog Detail - Nguyễn Lê Đình Tiên'
    ),
    description: computed(() => {
      if (!blogData.value) {
        return 'Đọc các bài viết mới nhất về công nghệ, phát triển web và kinh nghiệm lập trình.'
      }
      const rawDescription = stripHtml(blogData.value.description)
      return rawDescription.length > 155
        ? rawDescription.substring(0, 155) + '...'
        : rawDescription
    }),
    ogTitle: computed(() =>
      blogData.value
        ? `${blogData.value.title} - Nguyễn Lê Đình Tiên`
        : 'Blog Detail - Nguyễn Lê Đình Tiên'
    ),
    ogDescription: computed(() => {
      if (!blogData.value) {
        return 'Đọc các bài viết mới nhất về công nghệ, phát triển web và kinh nghiệm lập trình.'
      }
      const rawDescription = stripHtml(blogData.value.description)
      return rawDescription.length > 155
        ? rawDescription.substring(0, 155) + '...'
        : rawDescription
    }),
    ogImage: computed(() => blogData.value?.thumbnail || '/images/blog-1.webp'),
    ogUrl: computed(() =>
      blogData.value
        ? `https://nguyenledinhtien.io.vn/blogs/${blogData.value._id}`
        : 'https://nguyenledinhtien.io.vn/blogs'
    ),
    ogSiteName: 'nguyenledinhtien.io.vn',
    ogLocale: 'vi_VN',
    twitterCard: 'summary_large_image',
    twitterTitle: computed(() =>
      blogData.value
        ? `${blogData.value.title} - Nguyễn Lê Đình Tiên`
        : 'Blog Detail - Nguyễn Lê Đình Tiên'
    ),
    twitterDescription: computed(() => {
      if (!blogData.value) {
        return 'Đọc các bài viết mới nhất về công nghệ, phát triển web và kinh nghiệm lập trình.'
      }
      const rawDescription = stripHtml(blogData.value.description)
      return rawDescription.length > 155
        ? rawDescription.substring(0, 155) + '...'
        : rawDescription
    }),
    twitterImage: computed(
      () => blogData.value?.thumbnail || '/images/blog-1.webp'
    ),
  })

  // Recommended posts state
  const recommendedPosts = ref([])
  const recommendedPending = ref(false)

  // Fetch recommended posts
  const fetchRecommendedPosts = async () => {
    try {
      recommendedPending.value = true
      // Lấy nhiều hơn để đảm bảo có đủ 6 bài sau khi filter
      const response = await httpRequest.get('/posts?limit=10&page=1')

      if (response && response.data && Array.isArray(response.data)) {
        // Filter out current post and get 6 recommended posts
        const filteredPosts = response.data
          .filter(post => post._id !== blogId.value)
          .slice(0, 6)

        recommendedPosts.value = filteredPosts
      } else {
        recommendedPosts.value = []
      }
    } catch (err) {
      console.error('Error fetching recommended posts:', err)
      recommendedPosts.value = []
    } finally {
      recommendedPending.value = false
    }
  }

  // Fetch recommended posts when blog data is loaded
  watch(
    blogData,
    newBlogData => {
      if (newBlogData) {
        fetchRecommendedPosts()
      }
    },
    { immediate: true }
  )

  // Handle route changes for SPA navigation
  watch(blogId, async newId => {
    if (newId) {
      // Refresh data when route changes
      await refresh()
      // Also fetch recommended posts for new blog
      fetchRecommendedPosts()
    }
  })

  // Fallback: fetch recommended posts after a short delay if not already fetched
  onMounted(() => {
    setTimeout(() => {
      if (recommendedPosts.value.length === 0 && !recommendedPending.value) {
        fetchRecommendedPosts()
      }
    }, 1000)
  })
</script>

<style scoped>
  /* Focus states for accessibility */
  a:focus {
    outline: 2px solid #f97316;
    outline-offset: 2px;
  }
</style>
