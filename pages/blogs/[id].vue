<template>
  <div>
    <div class="min-h-screen mt-2 bg-white">
      <!-- Loading State -->
      <div v-if="pending" class="flex items-center justify-center min-h-screen">
        <div class="text-center">
          <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"
          ></div>
          <p class="mt-4 text-gray-600">Đang tải bài viết...</p>
        </div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="fetchError"
        class="flex items-center justify-center min-h-screen"
      >
        <div class="text-center">
          <p class="text-red-600 mb-4 text-lg">{{ fetchError.message || 'Đã xảy ra lỗi' }}</p>
          <button
            @click="refresh"
            class="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Thử lại
          </button>
          <NuxtLink
            to="/blogs"
            class="block mt-4 text-orange-500 hover:text-orange-600 transition-colors"
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
            class="flex items-center space-x-2 text-sm text-gray-500"
            itemscope
            itemtype="https://schema.org/BreadcrumbList"
          >
            <li
              itemprop="itemListElement"
              itemscope
              itemtype="https://schema.org/ListItem"
            >
              <NuxtLink to="/" class="hover:text-orange-500 transition-colors" itemprop="item">
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
              <NuxtLink to="/blogs" class="hover:text-orange-500 transition-colors" itemprop="item">
                <span itemprop="name">Blog</span>
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
              class="text-gray-900 font-medium truncate max-w-xs"
              itemprop="itemListElement"
              itemscope
              itemtype="https://schema.org/ListItem"
            >
              <span itemprop="name">{{ blogData.title }}</span>
              <meta itemprop="position" content="3" />
            </li>
          </ol>
        </nav>

        <!-- Blog Content - Seamless Layout -->
        <div class="bg-white">
          <!-- Enhanced Title with better typography -->
          <header>
            <h1
              class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              itemprop="headline"
            >
              {{ blogData.title }}
            </h1>

            <!-- Enhanced Meta Info with better accessibility -->
            <div class="flex flex-wrap items-center gap-6 mb-8 text-sm">
              <div class="flex items-center">
                <span class="text-gray-500 mr-2">Ngày đăng:</span>
                <time
                  :datetime="formatDateISO(blogData.createdAt)"
                  class="text-gray-900 font-medium"
                  itemprop="datePublished"
                >
                  {{ formatDate(blogData.createdAt) }}
                </time>
              </div>
              <div class="flex items-center">
                <span class="text-gray-500 mr-2">Tác giả:</span>
                <img
                  :src="blogData.createdBy.avatar"
                  :alt="`Avatar của ${blogData.createdBy.firstName} ${blogData.createdBy.lastName}`"
                  class="w-6 h-6 rounded-full mr-2"
                  @error="handleAvatarError"
                  loading="lazy"
                />
                <span
                  class="text-gray-900 font-medium"
                  itemprop="author"
                  itemscope
                  itemtype="https://schema.org/Person"
                >
                  <span itemprop="name"
                    >{{ blogData.createdBy.firstName }}
                    {{ blogData.createdBy.lastName }}</span
                  >
                </span>
              </div>
              <div class="flex items-center">
                <span class="text-gray-500 mr-2">Trạng thái:</span>
                <span
                  :class="blogData.status ? 'bg-green-500' : 'bg-gray-500'"
                  class="text-white px-2 py-1 rounded text-xs font-medium"
                >
                  {{ blogData.status ? "Hoạt động" : "Không hoạt động" }}
                </span>
              </div>
              <!-- Reading time estimate -->
              <div class="flex items-center">
                <span class="text-gray-500 mr-2">Thời gian đọc:</span>
                <span class="text-gray-900 font-medium">{{ calculateReadingTime(blogData.description) }} phút</span>
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
              class="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded text-sm"
            >
              Hình ảnh chính: {{ blogData.title }}
            </figcaption>
          </figure>

          <!-- Enhanced Blog Content with better typography -->
          <div
            class="prose prose-lg max-w-none mb-8"
            itemprop="articleBody"
            v-html="blogData.description"
          ></div>

          <!-- Enhanced Footer with better navigation -->
          <footer
            class="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-500 pt-8 border-t border-gray-200 gap-4"
          >
            <div>
              <span>Cập nhật lần cuối: </span>
              <time
                :datetime="formatDateISO(blogData.updatedAt || blogData.createdAt)"
                itemprop="dateModified"
                class="font-medium"
              >
                {{ formatDate(blogData.updatedAt || blogData.createdAt) }}
              </time>
            </div>
            <div class="flex gap-3">
              <NuxtLink
                to="/blogs"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                aria-label="Xem tất cả bài viết"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  ></path>
                </svg>
                Tất cả bài viết
              </NuxtLink>
              <NuxtLink
                to="/"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                aria-label="Về trang chủ"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  ></path>
                </svg>
                Về trang chủ
              </NuxtLink>
            </div>
          </footer>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import httpRequest from "~/utils/httpRequest";

// Get route params
const route = useRoute();
const blogId = computed(() => route.params.id);

// Server-side data fetching with useAsyncData
const { data: blogData, pending, error: fetchError, refresh } = await useAsyncData(
  `blog-${blogId.value}`,
  async () => {
    try {
      const data = await httpRequest.get(`/posts/${blogId.value}`);
      return data;
    } catch (err) {
      console.error("Error fetching blog detail:", err);
      throw new Error("Không thể tải bài viết. Vui lòng thử lại sau.");
    }
  },
  {
    server: true, // Enable SSR
    client: true, // Enable client-side hydration
    key: `blog-${blogId.value}`, // Unique key for caching
    transform: (data) => {
      // Transform data if needed
      return data;
    },
    watch: [blogId], // Watch for route changes
  }
);

// Calculate reading time
const calculateReadingTime = (content) => {
  if (!content) return 1;
  const wordsPerMinute = 200;
  const wordCount = stripHtml(content).split(' ').length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Format date for SEO (ISO format)
const formatDateISO = (dateString) => {
  return new Date(dateString).toISOString();
};

// Strip HTML tags for meta description
const stripHtml = (html) => {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

// Handle image error
const handleImageError = (event) => {
  event.target.src = "/images/blog-1.webp"; // Fallback image
};

// Handle avatar error
const handleAvatarError = (event) => {
  event.target.src = "/images/ab-1.webp"; // Fallback avatar
};

// Enhanced SEO Meta Tags with SSR support
useHead(() => {
  if (!blogData.value) {
    return {
      title: "Chi tiết bài viết - Nguyễn Lê Đình Tiên",
      meta: [
        {
          name: "description",
          content: "Đọc các bài viết mới nhất về công nghệ, phát triển web và kinh nghiệm lập trình từ Nguyễn Lê Đình Tiên.",
        },
        {
          name: "robots",
          content: "noindex, nofollow",
        },
      ],
    };
  }

  const title = `${blogData.value.title} - Blog Nguyễn Lê Đình Tiên`;
  const description = stripHtml(blogData.value.description).substring(0, 160);
  const imageUrl = blogData.value.thumbnail || "/images/blog-1.webp";
  const authorName = `${blogData.value.createdBy.firstName} ${blogData.value.createdBy.lastName}`;
  const publishedDate = formatDateISO(blogData.value.createdAt);
  const modifiedDate = formatDateISO(
    blogData.value.updatedAt || blogData.value.createdAt
  );
  const url = `https://your-domain.com/blogs/${blogData.value._id}`;
  const readingTime = calculateReadingTime(blogData.value.description);

  return {
    title,
    meta: [
      // Basic SEO
      {
        name: "description",
        content: description,
      },
      {
        name: "keywords",
        content: `${blogData.value.title}, blog, bài viết, công nghệ, phát triển web, lập trình, React, Vue.js, Node.js, Nguyễn Lê Đình Tiên`,
      },
      {
        name: "author",
        content: authorName,
      },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      {
        name: "googlebot",
        content: "index, follow",
      },
      {
        name: "article:reading_time",
        content: readingTime.toString(),
      },

      // Open Graph (Facebook, LinkedIn)
      {
        property: "og:type",
        content: "article",
      },
      {
        property: "og:title",
        content: title,
      },
      {
        property: "og:description",
        content: description,
      },
      {
        property: "og:image",
        content: imageUrl,
      },
      {
        property: "og:image:width",
        content: "1200",
      },
      {
        property: "og:image:height",
        content: "630",
      },
      {
        property: "og:url",
        content: url,
      },
      {
        property: "og:site_name",
        content: "Nguyễn Lê Đình Tiên - Portfolio & Blog",
      },
      {
        property: "og:locale",
        content: "vi_VN",
      },
      {
        property: "article:published_time",
        content: publishedDate,
      },
      {
        property: "article:modified_time",
        content: modifiedDate,
      },
      {
        property: "article:author",
        content: authorName,
      },
      {
        property: "article:section",
        content: "Blog",
      },
      {
        property: "article:tag",
        content: "công nghệ, phát triển web, lập trình",
      },

      // Twitter Card
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: title,
      },
      {
        name: "twitter:description",
        content: description,
      },
      {
        name: "twitter:image",
        content: imageUrl,
      },
      {
        name: "twitter:site",
        content: "@yourusername",
      },
      {
        name: "twitter:creator",
        content: "@yourusername",
      },

      // Additional SEO
      {
        name: "canonical",
        content: url,
      },
      {
        name: "article:publisher",
        content: "https://your-domain.com",
      },
      {
        name: "article:section",
        content: "Blog",
      },
      {
        name: "article:tag",
        content: "công nghệ, phát triển web, lập trình, React, Vue.js, Node.js",
      },
    ],
    link: [
      {
        rel: "canonical",
        href: url,
      },
      {
        rel: "preload",
        href: imageUrl,
        as: "image",
      },
    ],
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: blogData.value.title,
          description: description,
          image: {
            "@type": "ImageObject",
            url: imageUrl,
            width: 1200,
            height: 630,
          },
          author: {
            "@type": "Person",
            name: authorName,
            image: blogData.value.createdBy.avatar,
            url: "https://your-domain.com",
          },
          publisher: {
            "@type": "Organization",
            name: "Nguyễn Lê Đình Tiên",
            logo: {
              "@type": "ImageObject",
              url: "https://your-domain.com/images/logo.webp",
              width: 200,
              height: 200,
            },
            url: "https://your-domain.com",
          },
          datePublished: publishedDate,
          dateModified: modifiedDate,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
          },
          url: url,
          isPartOf: {
            "@type": "Blog",
            name: "Nguyễn Lê Đình Tiên Blog",
            url: "https://your-domain.com/blogs",
            description: "Blog về công nghệ, phát triển web và lập trình",
          },
          articleSection: "Blog",
          articleBody: stripHtml(blogData.value.description),
          wordCount: stripHtml(blogData.value.description).split(' ').length,
          timeRequired: `PT${readingTime}M`,
          inLanguage: "vi-VN",
          isAccessibleForFree: true,
          license: "https://creativecommons.org/licenses/by/4.0/",
        }),
      },
      // BreadcrumbList Schema
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Trang chủ",
              item: "https://your-domain.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Blog",
              item: "https://your-domain.com/blogs",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: blogData.value.title,
              item: url,
            },
          ],
        }),
      },
    ],
  };
});

// Set page title for better SEO
useSeoMeta({
  title: computed(() => blogData.value ? `${blogData.value.title} - Blog Nguyễn Lê Đình Tiên` : "Chi tiết bài viết - Nguyễn Lê Đình Tiên"),
  description: computed(() => blogData.value ? stripHtml(blogData.value.description).substring(0, 160) : "Đọc các bài viết mới nhất về công nghệ, phát triển web và kinh nghiệm lập trình từ Nguyễn Lê Đình Tiên."),
  ogTitle: computed(() => blogData.value ? `${blogData.value.title} - Blog Nguyễn Lê Đình Tiên` : "Chi tiết bài viết - Nguyễn Lê Đình Tiên"),
  ogDescription: computed(() => blogData.value ? stripHtml(blogData.value.description).substring(0, 160) : "Đọc các bài viết mới nhất về công nghệ, phát triển web và kinh nghiệm lập trình từ Nguyễn Lê Đình Tiên."),
  ogImage: computed(() => blogData.value?.thumbnail || "/images/blog-1.webp"),
  twitterCard: "summary_large_image",
});

// Handle route changes for SPA navigation
watch(
  blogId,
  async (newId) => {
    if (newId) {
      // Refresh data when route changes
      await refresh();
    }
  }
);
</script>

<style scoped>
/* Enhanced Prose styling for blog content */
.prose {
  color: #374151;
  line-height: 1.75;
  font-size: 1.125rem;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  color: #111827;
  font-weight: 700;
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
  line-height: 1.3;
}

.prose h1 {
  font-size: 2.25rem;
  border-bottom: 3px solid #f97316;
  padding-bottom: 0.5rem;
}

.prose h2 {
  font-size: 1.875rem;
  border-bottom: 2px solid #fbbf24;
  padding-bottom: 0.25rem;
}

.prose h3 {
  font-size: 1.5rem;
  color: #f97316;
}

.prose p {
  margin-bottom: 1.5rem;
  text-align: justify;
}

.prose ul,
.prose ol {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.prose li {
  margin-bottom: 0.5rem;
}

.prose blockquote {
  border-left: 4px solid #f97316;
  padding: 1rem 1.5rem;
  margin: 2rem 0;
  font-style: italic;
  color: #6b7280;
  background-color: #f9fafb;
  border-radius: 0 0.5rem 0.5rem 0;
}

.prose code {
  background-color: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #374151;
  border: 1px solid #e5e7eb;
}

.prose pre {
  background-color: #1f2937;
  color: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 2rem 0;
  border: 1px solid #374151;
}

.prose a {
  color: #f97316;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

.prose a:hover {
  border-bottom-color: #f97316;
}

.prose img {
  border-radius: 0.5rem;
  margin: 2rem 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.prose table {
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.prose th,
.prose td {
  border: 1px solid #e5e7eb;
  padding: 0.75rem;
  text-align: left;
}

.prose th {
  background-color: #f9fafb;
  font-weight: 600;
  color: #374151;
}

.prose th:first-child {
  border-top-left-radius: 0.5rem;
}

.prose th:last-child {
  border-top-right-radius: 0.5rem;
}

/* Enhanced responsive design */
@media (max-width: 768px) {
  .prose {
    font-size: 1rem;
  }
  
  .prose h1 {
    font-size: 1.875rem;
  }
  
  .prose h2 {
    font-size: 1.5rem;
  }
  
  .prose h3 {
    font-size: 1.25rem;
  }
}

/* Smooth transitions */
.prose * {
  transition: all 0.2s ease;
}

/* Focus states for accessibility */
.prose a:focus {
  outline: 2px solid #f97316;
  outline-offset: 2px;
}
</style>
