<template>
  <div>
    <!-- Page Header -->
    <HeaderContent
      title="Quản lý Comments About Me"
      subtitle="Danh sách lời nhận xét/testimonials"
    />

    <!-- Error Display -->
    <div
      v-if="error"
      class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4"
    >
      <div class="flex items-center">
        <svg
          class="w-5 h-5 text-red-600 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div>
          <h3 class="text-sm font-medium text-red-800">Lỗi khi tải dữ liệu</h3>
          <p class="text-red-600 mt-1">{{ error }}</p>
        </div>
      </div>
      <button
        @click="fetchComments"
        class="mt-3 bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700 transition-colors text-sm"
      >
        Thử lại
      </button>
    </div>

    <!-- Loading State -->
    <div
      v-if="loading"
      class="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
    >
      <Loading />
    </div>

    <!-- Comments Table -->
    <div
      v-else-if="!error"
      class="bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Người nhận xét
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nội dung
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Trạng thái
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ngày tạo
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="comment in comments"
              :key="comment._id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <Avatar
                    :src="comment.avatar"
                    :size="40"
                    :ring="false"
                    :read-only="true"
                  />
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ comment.name }}
                    </div>
                    <div class="text-xs text-gray-500">
                      {{ comment.relationship }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900 max-w-xs truncate">
                  {{ comment.comment }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': isActiveStatus(
                      comment.status
                    ),
                    'bg-yellow-100 text-yellow-800': !isActiveStatus(
                      comment.status
                    ),
                  }"
                >
                  {{ isActiveStatus(comment.status) ? 'Hiển thị' : 'Ẩn' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(comment.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <ButtonIcon
                    icon="delete"
                    color="red"
                    :disabled="deletingId === comment._id"
                    @click="deleteComment(comment._id)"
                  />
                  <div v-if="deletingId === comment._id" class="ml-2">
                    <div
                      class="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"
                    ></div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <EmptyData
        v-if="comments.length === 0 && !loading && !error"
        title="Không có nhận xét nào"
        description="Chưa có dữ liệu hiển thị."
      />

      <!-- Pagination -->
      <div
        v-if="comments.length > 0"
        class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6 mt-2"
      >
        <Pagination
          :page="currentPage"
          :total="pagination.total"
          :limit="limit"
          :page-count="Math.ceil(pagination.total / limit)"
          :show-info="true"
          :split="true"
          @update:page="
            p => {
              currentPage = p
              fetchComments()
            }
          "
        />
      </div>
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
  import HeaderContent from '~/components/admin/HeaderContent.vue'
  import Loading from '~/components/ui/Loading.vue'

  definePageMeta({
    layout: 'admin',
    middleware: 'auth',
  })

  // Reactive data
  const currentPage = ref(1)
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
          fetchComments()
        }
      } catch (err) {
        console.error('Error deleting comment:', err)
        error.value = err?.message || 'Không thể xóa comment.'
      } finally {
        deletingId.value = null
      }
    }
  }

  // Pagination methods
  const previousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
      fetchComments()
    }
  }

  const nextPage = () => {
    if (pagination.value.nextPage) {
      currentPage.value++
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
