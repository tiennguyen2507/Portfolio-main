<template>
  <div>
    <div class="h-[80px] bg-black"></div>
    <div class="min-h-screen mt-2 bg-white">
      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center min-h-screen">
        <div class="text-center">
          <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"
          ></div>
          <p class="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="flex items-center justify-center min-h-screen"
      >
        <div class="text-center">
          <p class="text-red-600 mb-4 text-lg">{{ error }}</p>
          <button
            @click="fetchBlogDetail"
            class="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg"
          >
            Try Again
          </button>
          <NuxtLink
            to="/blogs"
            class="block mt-4 text-orange-500 hover:text-orange-600"
          >
            ← Back to Blogs
          </NuxtLink>
        </div>
      </div>

      <!-- Blog Detail Content -->
      <article
        v-else-if="blog"
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        itemscope
        itemtype="https://schema.org/BlogPosting"
      >
        <!-- Breadcrumbs -->
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
              <NuxtLink to="/" class="hover:text-orange-500" itemprop="item">
                <span itemprop="name">Home</span>
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
                to="/blogs"
                class="hover:text-orange-500"
                itemprop="item"
              >
                <span itemprop="name">Blogs</span>
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
              <span itemprop="name">{{ blog.title }}</span>
              <meta itemprop="position" content="3" />
            </li>
          </ol>
        </nav>

        <!-- Blog Content - Seamless Layout -->
        <div class="bg-white">
          <!-- Title -->
          <header>
            <h1
              class="text-4xl font-bold text-gray-900 mb-6 leading-tight"
              itemprop="headline"
            >
              {{ blog.title }}
            </h1>

            <!-- Meta Info -->
            <div class="flex flex-wrap items-center gap-6 mb-8 text-sm">
              <div class="flex items-center">
                <span class="text-gray-500 mr-2">Published on:</span>
                <time
                  :datetime="formatDateISO(blog.createdAt)"
                  class="text-gray-900"
                  itemprop="datePublished"
                >
                  {{ formatDate(blog.createdAt) }}
                </time>
              </div>
              <div class="flex items-center">
                <span class="text-gray-500 mr-2">By:</span>
                <img
                  :src="blog.createdBy.avatar"
                  :alt="`${blog.createdBy.firstName} ${blog.createdBy.lastName}`"
                  class="w-6 h-6 rounded-full mr-2"
                  @error="handleAvatarError"
                />
                <span
                  class="text-gray-900"
                  itemprop="author"
                  itemscope
                  itemtype="https://schema.org/Person"
                >
                  <span itemprop="name"
                    >{{ blog.createdBy.firstName }}
                    {{ blog.createdBy.lastName }}</span
                  >
                </span>
              </div>
              <div class="flex items-center">
                <span class="text-gray-500 mr-2">Status:</span>
                <span
                  :class="blog.status ? 'bg-green-500' : 'bg-gray-500'"
                  class="text-white px-2 py-1 rounded text-xs font-medium"
                >
                  {{ blog.status ? "Active" : "Inactive" }}
                </span>
              </div>
            </div>
          </header>

          <!-- Featured Image -->
          <figure class="relative mb-8">
            <img
              :src="blog.thumbnail"
              :alt="`Featured image for: ${blog.title}`"
              class="w-full h-96 object-cover"
              @error="handleImageError"
              itemprop="image"
            />
            <figcaption
              class="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded text-sm"
            >
              Featured image for: {{ blog.title }}
            </figcaption>
          </figure>

          <!-- Blog Content -->
          <div
            class="prose prose-lg max-w-none mb-8"
            itemprop="articleBody"
            v-html="blog.description"
          ></div>

          <!-- Footer -->
          <footer
            class="flex items-center justify-between text-sm text-gray-500 pt-8 border-t border-gray-200"
          >
            <div>
              <span>Last updated: </span>
              <time
                :datetime="formatDateISO(blog.updatedAt || blog.createdAt)"
                itemprop="dateModified"
              >
                {{ formatDate(blog.updatedAt || blog.createdAt) }}
              </time>
            </div>
            <div>
              <NuxtLink
                to="/blogs"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                aria-label="Back to all blog posts"
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
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
                Back to All Posts
              </NuxtLink>
            </div>
          </footer>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

// Get route params
const route = useRoute();
const blogId = computed(() => route.params.id);

console.log("Blog Detail Page - Route params:", route.params);
console.log("Blog ID:", blogId.value);

// Reactive data
const blog = ref(null);
const loading = ref(true);
const error = ref(null);

// API URL - sử dụng computed
const API_URL = computed(
  () => `https://blog-data.up.railway.app/posts/${blogId.value}`
);

// Fetch blog detail from API
const fetchBlogDetail = async () => {
  try {
    loading.value = true;
    error.value = null;

    console.log("Fetching from API:", API_URL.value);

    const response = await fetch(API_URL.value);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API response:", data);
    blog.value = data;
  } catch (err) {
    console.error("Error fetching blog detail:", err);
    error.value = "Failed to load article. Please try again later.";
  } finally {
    loading.value = false;
  }
};

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
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

// SEO Meta Tags
useHead(() => {
  if (!blog.value) {
    return {
      title: "Blog Detail - LEADSWISE Network",
      meta: [
        {
          name: "description",
          content:
            "Read our latest blog articles and insights about affiliate marketing, lead generation, and digital marketing strategies.",
        },
      ],
    };
  }

  const title = `${blog.value.title} - LEADSWISE Network`;
  const description = stripHtml(blog.value.description).substring(0, 160);
  const imageUrl = blog.value.thumbnail || "/images/blog-1.webp";
  const authorName = `${blog.value.createdBy.firstName} ${blog.value.createdBy.lastName}`;
  const publishedDate = formatDateISO(blog.value.createdAt);
  const modifiedDate = formatDateISO(
    blog.value.updatedAt || blog.value.createdAt
  );
  const url = `https://leadswisenetwork.com/blogs/${blog.value._id}`;

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
        content:
          "blog, article, marketing, affiliate marketing, lead generation, digital marketing, LEADSWISE Network",
      },
      {
        name: "author",
        content: authorName,
      },
      {
        name: "robots",
        content:
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      {
        name: "googlebot",
        content: "index, follow",
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
        content: "LEADSWISE Network",
      },
      {
        property: "og:locale",
        content: "en_US",
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
        content: "@leadswisenetwork",
      },
      {
        name: "twitter:creator",
        content: "@leadswisenetwork",
      },

      // Additional SEO
      {
        name: "canonical",
        content: url,
      },
      {
        name: "article:publisher",
        content: "https://leadswisenetwork.com",
      },
    ],
    link: [
      {
        rel: "canonical",
        href: url,
      },
    ],
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: blog.value.title,
          description: description,
          image: imageUrl,
          author: {
            "@type": "Person",
            name: authorName,
            image: blog.value.createdBy.avatar,
          },
          publisher: {
            "@type": "Organization",
            name: "LEADSWISE Network",
            logo: {
              "@type": "ImageObject",
              url: "https://leadswisenetwork.com/images/logo.webp",
            },
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
            name: "LEADSWISE Network Blog",
            url: "https://leadswisenetwork.com/blogs",
          },
        }),
      },
    ],
  };
});

// Watch for route changes
watch(
  blogId,
  (newId) => {
    console.log("Blog ID changed to:", newId);
    if (newId) {
      fetchBlogDetail();
    }
  },
  { immediate: true }
);

// Fetch blog detail on component mount
onMounted(() => {
  console.log("Component mounted, blogId:", blogId.value);
  if (blogId.value) {
    fetchBlogDetail();
  } else {
    error.value = "Blog ID not found";
    loading.value = false;
  }
});
</script>

<style scoped>
/* Prose styling for blog content */
.prose {
  color: #374151;
  line-height: 1.75;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  color: #111827;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose h1 {
  font-size: 2.25rem;
}

.prose h2 {
  font-size: 1.875rem;
}

.prose h3 {
  font-size: 1.5rem;
}

.prose p {
  margin-bottom: 1.5rem;
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
  padding-left: 1.5rem;
  margin: 2rem 0;
  font-style: italic;
  color: #6b7280;
}

.prose code {
  background-color: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #374151;
}

.prose pre {
  background-color: #1f2937;
  color: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 2rem 0;
}

.prose a {
  color: #f97316;
  text-decoration: none;
}

.prose a:hover {
  text-decoration: underline;
}

.prose img {
  border-radius: 0.5rem;
  margin: 2rem 0;
}

.prose table {
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
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
}
</style>
