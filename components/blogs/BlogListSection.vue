<template>
  <section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"
        ></div>
        <p class="mt-4 text-gray-600">Loading blogs...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button
          @click="fetchBlogs"
          class="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Try Again
        </button>
      </div>

      <!-- Blog Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink
          v-for="blog in blogs"
          :key="blog._id"
          :to="`/blogs/${blog._id}`"
          class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer block"
        >
          <!-- Blog Image -->
          <div class="relative overflow-hidden h-48">
            <img
              :src="blog.thumbnail"
              :alt="blog.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              @error="handleImageError"
            />
            <!-- Category Badge -->
            <div class="absolute top-4 left-4">
              <span
                class="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
              >
                Blog
              </span>
            </div>
            <!-- Status Badge -->
            <div class="absolute top-4 right-4">
              <span
                :class="blog.status ? 'bg-green-500' : 'bg-gray-500'"
                class="text-white px-2 py-1 rounded text-xs"
              >
                {{ blog.status ? "Active" : "Inactive" }}
              </span>
            </div>
          </div>

          <!-- Blog Content -->
          <div class="p-6">
            <!-- Date -->
            <div class="flex items-center text-sm text-gray-500 mb-3">
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              {{ formatDate(blog.createdAt) }}
            </div>

            <!-- Title -->
            <h3
              class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-500 transition-colors duration-300 h-[55px]"
            >
              {{ blog.title }}
            </h3>

            <!-- Excerpt -->
            <div
              class="text-gray-600 mb-4 line-clamp-3 prose prose-sm max-w-none h-[63px]"
              v-html="blog.description"
            ></div>

            <!-- Author -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <img
                  :src="blog.createdBy.avatar"
                  :alt="`${blog.createdBy.firstName} ${blog.createdBy.lastName}`"
                  class="w-8 h-8 rounded-full mr-3"
                  @error="handleAvatarError"
                />
                <div>
                  <p class="text-sm font-semibold text-gray-900">
                    {{ blog.createdBy.firstName }} {{ blog.createdBy.lastName }}
                  </p>
                  <p class="text-xs text-gray-500">Author</p>
                </div>
              </div>

              <!-- Read More Button -->
              <button
                class="text-orange-500 hover:text-orange-600 font-semibold text-sm flex items-center group-hover:translate-x-1 transition-transform duration-300"
              >
                Read More
                <svg
                  class="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty State -->
      <div
        v-if="!loading && !error && blogs.length === 0"
        class="text-center py-12"
      >
        <p class="text-gray-600">No blogs found.</p>
      </div>

      <!-- Load More Button -->
      <div v-if="blogs.length > 0 && hasMorePages" class="text-center mt-12">
        <button
          @click="loadMoreBlogs"
          :disabled="loadingMore"
          class="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center mx-auto"
        >
          <div
            v-if="loadingMore"
            class="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"
          ></div>
          {{ loadingMore ? "Loading..." : "Load More Articles" }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Reactive data
const blogs = ref([]);
const loading = ref(true);
const error = ref(null);
const currentPage = ref(1);
const hasMorePages = ref(true);
const loadingMore = ref(false);

// API URL with pagination
const API_URL = "https://blog-data.up.railway.app/posts";
const LIMIT = 6;

// Fetch blogs from API
const fetchBlogs = async (page = 1, append = false) => {
  try {
    if (page === 1) {
      loading.value = true;
    } else {
      loadingMore.value = true;
    }
    error.value = null;

    const url = `${API_URL}?page=${page}&limit=${LIMIT}`;
    console.log("Fetching from:", url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API response:", data);

    if (append) {
      // Append new blogs to existing ones
      blogs.value = [...blogs.value, ...(data.data || [])];
    } else {
      // Replace blogs for first page
      blogs.value = data.data || [];
    }

    // Update pagination state
    currentPage.value = page;
    hasMorePages.value = data.nextPage || false;
  } catch (err) {
    console.error("Error fetching blogs:", err);
    error.value = "Failed to load blogs. Please try again later.";
  } finally {
    loading.value = false;
    loadingMore.value = false;
  }
};

// Load more blogs
const loadMoreBlogs = async () => {
  if (!hasMorePages.value || loadingMore.value) return;

  const nextPage = currentPage.value + 1;
  await fetchBlogs(nextPage, true);
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

// Handle image error
const handleImageError = (event) => {
  event.target.src = "/images/blog-1.webp"; // Fallback image
};

// Handle avatar error
const handleAvatarError = (event) => {
  event.target.src = "/images/ab-1.webp"; // Fallback avatar
};

// Fetch blogs on component mount
onMounted(() => {
  fetchBlogs(1, false);
});
</script>

<style scoped>
/* Line clamp utilities */
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

/* Custom hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:text-orange-500 {
  color: #f97316;
}

.group:hover .group-hover\:translate-x-1 {
  transform: translateX(0.25rem);
}

/* Quill editor content styling */
.prose {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
}

.prose p {
  margin: 0;
  padding: 0;
}

.prose strong {
  font-weight: 600;
  color: #374151;
}

.prose em {
  font-style: italic;
}

.prose ul,
.prose ol {
  margin: 0;
  padding-left: 1rem;
}

.prose li {
  margin: 0.25rem 0;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  margin: 0;
  font-weight: 600;
  color: #374151;
}

.prose blockquote {
  margin: 0;
  padding-left: 0.75rem;
  border-left: 3px solid #f97316;
  font-style: italic;
}

.prose code {
  background-color: #f3f4f6;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  color: #374151;
}

.prose pre {
  background-color: #f3f4f6;
  padding: 0.5rem;
  border-radius: 0.375rem;
  overflow-x: auto;
  margin: 0;
}

.prose a {
  color: #f97316;
  text-decoration: none;
}

.prose a:hover {
  text-decoration: underline;
}
</style>
