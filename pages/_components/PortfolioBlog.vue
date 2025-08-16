<template>
  <!-- Blog Section -->
  <section id="blog" class="py-12 sm:py-16 md:py-20 bg-gray-800/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-8 sm:mb-12 md:mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
          Blog & Tin tức
        </h2>
        <p class="text-lg text-gray-300 mb-4">
          Những bài viết mới nhất về công nghệ và phát triển web
        </p>
        <div class="w-16 h-1 bg-orange-500 mx-auto"></div>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"
        ></div>
        <p class="text-gray-400 mt-4">Đang tải bài viết...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-400 mb-4">Không thể tải bài viết</p>
        <button
          @click="refresh"
          class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Thử lại
        </button>
      </div>

      <!-- Blog Grid -->
      <div
        v-else-if="allPosts.length"
        class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        <NuxtLink
          v-for="post in allPosts"
          :key="post._id"
          :to="`/blogs/${post._id}`"
          class="block"
        >
          <Card
            variant="elevated"
            hover
            class="group cursor-pointer"
            padding="sm"
          >
            <div class="relative overflow-hidden">
              <img
                :src="post.thumbnail"
                :alt="post.title"
                class="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute top-4 left-4">
                <Badge variant="primary" class="bg-orange-500/90 text-white">
                  {{ formatDate(post.createdAt) }}
                </Badge>
              </div>
            </div>

            <div>
              <h3
                class="text-xl font-semibold text-white mb-3 line-clamp-2 group-hover:text-orange-400 transition-colors h-[56px] overflow-hidden"
              >
                {{ post.title }}
              </h3>

              <p
                class="text-gray-400 mb-4 line-clamp-3 text-sm h-[60px] overflow-hidden"
              >
                {{ stripHtmlTags(post.description) }}
              </p>

              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <img
                    v-if="post.createdBy?.avatar"
                    :src="post.createdBy.avatar"
                    :alt="`${post.createdBy.firstName} ${post.createdBy.lastName}`"
                    class="w-8 h-8 rounded-full object-cover"
                  />
                  <div class="text-sm text-gray-400">
                    {{ post.createdBy?.firstName }}
                    {{ post.createdBy?.lastName }}
                  </div>
                </div>

                <span
                  class="text-orange-500 hover:text-orange-400 transition-colors text-sm font-medium"
                >
                  Đọc thêm →
                </span>
              </div>
            </div>
          </Card>
        </NuxtLink>
      </div>

      <!-- Load More Button -->
      <div
        v-if="allPosts.length && hasMorePosts"
        class="text-center mt-8 sm:mt-12"
      >
        <button
          @click="loadMorePosts"
          :disabled="pending"
          class="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
        >
          <span
            v-if="pending"
            class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"
          ></span>
          <span>{{ pending ? 'Đang tải...' : 'Xem thêm bài viết' }}</span>
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="!allPosts.length" class="text-center py-12">
        <p class="text-gray-400">Chưa có bài viết nào</p>
      </div>
    </div>
  </section>
</template>

<script setup>
  import Card from '~/components/ui/Card.vue'
  import Badge from '~/components/ui/Badge.vue'

  // Pagination state
  const currentPage = ref(1)
  const limit = 6
  const allPosts = ref([])
  const hasMorePosts = ref(true)
  const pending = ref(false)
  const error = ref(null)

  // Fetch blog data
  const fetchPosts = async () => {
    try {
      pending.value = true
      error.value = null
      const response = await $fetch(
        `https://blog-data.up.railway.app/posts?page=${currentPage.value}&limit=${limit}`
      )

      if (response && response.data) {
        if (currentPage.value === 1) {
          allPosts.value = response.data
        } else {
          allPosts.value = [...allPosts.value, ...response.data]
        }
        hasMorePosts.value = response.nextPage || false
      }
    } catch (err) {
      console.error('Error fetching posts:', err)
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
</style>
