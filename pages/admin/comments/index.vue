<template>
  <div>
    <!-- Page Header -->
    <HeaderContent
      title="Quản lý Comments About Me"
      subtitle="Danh sách lời nhận xét/testimonials"
    />

    <ErrorCommon v-if="error" :message="error" @retry="fetchComments" />

    <Loading v-if="loading" size="md" color="orange" />

    <!-- Comments Card Grid -->
    <ul
      v-if="!loading"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
    >
      <li v-for="comment in comments" :key="comment._id" class="list-none">
        <Card variant="default" padding="md" hover class="h-full flex flex-col">
          <div class="flex items-start gap-3">
            <Avatar
              :src="comment.avatar"
              :size="40"
              :ring="false"
              :readOnly="true"
            />
            <div class="flex-1 min-w-0">
              <Typography as="p" size="sm" weight="medium">
                {{ comment.name }}
              </Typography>
              <Typography as="p" size="xs" color="muted">
                {{ comment.relationship }}
              </Typography>
            </div>
          </div>
          <Typography as="p" size="sm" class="mt-3 line-clamp-3">
            {{ comment.comment }}
          </Typography>
          <div class="mt-3 flex flex-wrap items-center gap-2">
            <Tag
              :variant="isActiveStatus(comment.status) ? 'success' : 'warning'"
              size="xs"
            >
              {{ isActiveStatus(comment.status) ? 'Hiển thị' : 'Ẩn' }}
            </Tag>
            <Typography as="span" size="xs" color="tertiary">
              {{ formatDate(comment.createdAt) }}
            </Typography>
          </div>
          <div class="mt-3 flex items-center gap-2">
            <ButtonIcon
              icon="delete"
              color="red"
              :disabled="deletingId === comment._id"
              @click="deleteComment(comment._id)"
            />
            <div v-if="deletingId === comment._id" class="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
          </div>
        </Card>
      </li>
    </ul>

      <!-- Empty State -->
      <EmptyData
        v-if="comments.length === 0 && !loading && !error"
        title="Không có nhận xét nào"
        description="Chưa có dữ liệu hiển thị."
      />

    <!-- Pagination -->
    <div
      v-if="!error && comments.length > 0 && !loading"
      class="mt-8 bg-white dark:bg-[#050505] rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 px-6 py-4 hover:shadow-lg transition-shadow duration-300"
    >
      <Pagination
        :page="currentPage"
        :total="pagination.total"
        :limit="limit"
        :page-count="Math.ceil(pagination.total / limit)"
        :show-info="true"
        :split="true"
        @update:page="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { httpRequest } from '~/utils/httpRequest'
  import Avatar from '~/components/ui/Avatar.vue'
  import ButtonIcon from '~/components/ui/ButtonIcon.vue'
  import EmptyData from '~/components/ui/EmptyData.vue'
  import Pagination from '~/components/ui/Pagination.vue'
  import Card from '~/components/ui/Card.vue'
  import Tag from '~/components/ui/Tag.vue'
  import HeaderContent from '~/components/common/Admin/HeaderContent.vue'
  import Loading from '~/components/ui/Loading.vue'
  import ErrorCommon from '~/components/common/Admin/ErrorCommon.vue'
  import Typography from '~/components/ui/Typography.vue'
  import { useNotification } from '~/composables/useNotification'

  definePageMeta({
    layout: 'admin',
    middleware: 'auth',
  })

  // Route and Router for query params
  const route = useRoute()
  const router = useRouter()
  const { showError } = useNotification()

  // Reactive data
  const currentPage = ref(parseInt(route.query.page) || 1)
  const limit = 10
  const loading = ref(false)
  const error = ref('') // Error state
  const deletingId = ref(null) // Track which comment is being deleted
  const comments = ref([])
  const pagination = ref({
    total: 0,
    page: 1,
    limit: 10,
    nextPage: false,
    prePage: false,
  })

  // Helpers
  const isActiveStatus = status => {
    // Accept boolean true or string "true"/"public" as active
    if (status === true) return true
    if (typeof status === 'string') {
      const normalized = status.toLowerCase()
      return normalized === 'true' || normalized === 'public'
    }
    return false
  }

  // Fetch comments from API
  const fetchComments = async () => {
    loading.value = true
    error.value = ''
    try {
      const params = new URLSearchParams({
        page: currentPage.value.toString(),
        limit: limit.toString(),
      })

      const response = await httpRequest.get(
        `/comments-about-me?${params.toString()}`
      )

      comments.value = response.data || []
      pagination.value = {
        total: response.total || 0,
        page: response.page || 1,
        limit: response.limit || 10,
        nextPage: response.nextPage || false,
        prePage: response.prePage || false,
      }
    } catch (err) {
      console.error('Error fetching comments:', err)
      error.value = err?.message || 'Không thể tải dữ liệu comments.'
      showError(error.value)
    } finally {
      loading.value = false
    }
  }

  // Delete comment
  const deleteComment = async id => {
    if (confirm('Bạn có chắc chắn muốn xóa nhận xét này?')) {
      deletingId.value = id
      try {
        await httpRequest.delete(`/comments-about-me/${id}`)

        // Remove from local state
        comments.value = comments.value.filter(item => item._id !== id)

        // Refresh data if current page is empty
        if (comments.value.length === 0 && currentPage.value > 1) {
          currentPage.value--
          updateQueryParams()
          fetchComments()
        }
      } catch (err) {
        console.error('Error deleting comment:', err)
        error.value = err?.message || 'Không thể xóa comment.'
        showError(error.value)
      } finally {
        deletingId.value = null
      }
    }
  }

  // Pagination methods
  const handlePageChange = page => {
    currentPage.value = page
    updateQueryParams()
    fetchComments()
  }

  const updateQueryParams = () => {
    router.push({
      query: {
        ...route.query,
        page: currentPage.value > 1 ? currentPage.value : undefined,
      },
    })
  }

  const previousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
      updateQueryParams()
      fetchComments()
    }
  }

  const nextPage = () => {
    if (pagination.value.nextPage) {
      currentPage.value++
      updateQueryParams()
      fetchComments()
    }
  }

  // Utility methods
  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Fetch data on mount
  onMounted(() => {
    fetchComments()
  })
</script>
