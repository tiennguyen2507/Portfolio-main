<template>
  <!-- Blog Section -->
  <section id="blogs" class="py-12 sm:py-16 md:py-20 bg-white dark:bg-black transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-8 sm:mb-12 md:mb-16">
        <Typography as="h2" :size="{sp: '2xl', pc: '3xl'}" weight="bold" color="default" align="center" class="mb-4">
          Blog & Tin tức
        </Typography>
        <Typography as="p" :size="{sp: 'md', pc: 'lg'}" color="muted" align="center" class="mb-4">
          Những bài viết mới nhất về công nghệ và phát triển web
        </Typography>
        <div class="w-16 h-1 bg-orange-500 dark:bg-orange-400 mx-auto"></div>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"
        ></div>
        <Typography as="p" :size="{sp: 'sm', pc: 'md'}" color="muted" align="center" class="mt-4">
          Đang tải bài viết...
        </Typography>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <Typography as="p" :size="{sp: 'sm', pc: 'md'}" color="error" align="center" class="mb-4">
          Không thể tải bài viết
        </Typography>
        <button
          @click="handleRefresh"
          class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Thử lại
        </button>
      </div>

      <!-- Blog Grid -->
      <div
        v-else-if="allPosts.length"
        class="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8"
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
            class="group cursor-pointer p-3 sm:p-4"
            padding="sm"
          >
            <div class="relative overflow-hidden">
              <img
                :src="post.thumbnail"
                :alt="post.title"
                class="w-full h-36 sm:h-44 lg:h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute top-4 left-4">
                <Badge variant="primary" class="bg-orange-500/90 text-white">
                  {{ formatDate(post.createdAt) }}
                </Badge>
              </div>
            </div>

            <div>
              <Typography
                as="h3"
                :size="{sp: 'lg', pc: 'xl'}"
                weight="semibold"
                color="default"
                class="mb-3 line-clamp-2 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors h-[56px] overflow-hidden"
              >
                {{ post.title }}
              </Typography>

              <ViewEditor
                :content="post.description"
                :strip-html="true"
                :truncate="true"
                :max-length="120"
                custom-class="text-gray-400 dark:text-gray-300 mb-4 text-sm blog-desc-clamp"
                variant="light"
              />

              <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div class="flex items-center space-x-2">
                  <img
                    v-if="post.createdBy?.avatar"
                    :src="post.createdBy.avatar"
                    :alt="`${post.createdBy.firstName} ${post.createdBy.lastName}`"
                    class="w-8 h-8 rounded-full object-cover"
                  />
                  <Typography as="div" :size="{sp: 'xs', pc: 'sm'}" color="muted">
                    {{ post.createdBy?.firstName }}
                    {{ post.createdBy?.lastName }}
                  </Typography>
                </div>

                <Typography
                  as="span"
                  :size="{sp: 'xs', pc: 'sm'}"
                  weight="medium"
                  color="primary"
                  class="hover:text-orange-600 dark:hover:text-orange-300 transition-colors"
                >
                  Đọc thêm →
                </Typography>
              </div>
            </div>
          </Card>
        </NuxtLink>
      </div>

      <!-- View More Button: navigate to blogs page -->
      <div v-if="allPosts.length" class="text-center mt-8 sm:mt-12">
        <NuxtLink
          to="/blogs"
          class="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg ring-1 ring-white/10 hover:from-orange-600 hover:to-amber-600 hover:shadow-orange-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70 active:scale-[0.98] transition-all duration-200 mx-auto"
        >
          <span class="font-medium">Xem thêm bài viết</span>
          <svg
            class="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </NuxtLink>
      </div>

      <!-- Empty State -->
      <div v-else-if="!allPosts.length" class="text-center py-12">
        <Typography as="p" :size="{sp: 'sm', pc: 'md'}" color="muted" align="center">
          Chưa có bài viết nào
        </Typography>
      </div>
    </div>
  </section>
</template>

<script setup>
  import Card from '~/components/ui/Card.vue'
  import Badge from '~/components/ui/Badge.vue'

  // Props từ parent component
  const props = defineProps({
    posts: {
      type: Array,
      default: () => [],
    },
    pending: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Object,
      default: null,
    },
  })

  // Emit events
  const emit = defineEmits(['refresh'])

  // Sử dụng data từ props
  const allPosts = computed(() => props.posts || [])

  // Refresh function - emit event để parent refresh
  const handleRefresh = () => {
    emit('refresh')
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
  .blog-desc-clamp {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media (min-width: 1024px) {
    .blog-desc-clamp {
      -webkit-line-clamp: 3;
      line-clamp: 3;
    }
  }
</style>
