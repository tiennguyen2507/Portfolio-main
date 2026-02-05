<template>
  <div>
    <HeaderContent
      title="Quản lý Bài viết"
      subtitle="Quản lý và theo dõi tất cả bài viết"
    >
      <template #action>
        <Button
          variant="primary"
          size="sm"
          @click="handleClickButtonAddBlog"
          class="rounded-full px-3"
        >
          <Icon name="plus" size="sm" />
        </Button>
      </template>
    </HeaderContent>
    <ErrorCommon v-if="error" :message="error" @retry="fetchPosts" />

    <ul class="flex flex-col gap-4 border-[1px] border-gray-200 rounded-lg">
      <li
        v-for="post in posts"
        :key="post._id"
        class="p-2 border-b-[1px] border-gray-200 list-none flex flex-col gap-2"
      >
        <div class="flex items-center gap-2">
          <img
            :src="post.thumbnail"
            alt="Thumbnail"
            class="w-24 h-24 rounded-md"
          />
          <div class="flex flex-col">
            <h3 class="text-sm font-bold text-gray-600">{{ post.title }}</h3>
            <ViewEditor
              class="text-xs text-gray-300"
              :content="post.description"
              :strip-html="true"
              :truncate="true"
              :max-length="90"
            />
          </div>
        </div>
        <div class="flex items-center gap-2 justify-between">
          <div class="flex items-center gap-1">
            <span
              v-if="post.createdAt"
              class="text-[8px] bg-green-100 text-green-800 px-2 py-1 rounded-full"
            >
              {{ formatDate(post.createdAt) }}
            </span>
            <span
              v-if="post.category"
              class="text-[8px] bg-red-100 text-red-800 px-2 py-1 rounded-full"
            >
              {{ post.category }}
            </span>
            <span
              v-if="post?.createdBy?.lastName"
              class="text-[8px] bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full"
            >
              {{ post?.createdBy?.lastName }}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <button
              class="bg-blue-500 text-white px-1 py-1 rounded-full hover:bg-blue-700 transition-colors flex items-center"
              @click="startEdit(post)"
            >
              <AdminUiIcon name="edit" size="sm" />
            </button>
            <button
              class="bg-red-500 text-white px-1 py-1 rounded-full hover:bg-red-700 transition-colors flex items-center"
              @click="deletePost(post._id)"
            >
              <AdminUiIcon name="delete" size="sm" />
            </button>
          </div>
        </div>
      </li>
    </ul>

    <div
      v-if="!error && posts.length > 0"
      class="mt-8 bg-white rounded-2xl shadow-md border border-gray-100 px-6 py-4 hover:shadow-lg transition-shadow duration-300"
    >
      <Pagination
        :page="currentPage"
        :total="pagination.total"
        :limit="limit"
        :show-info="true"
        :split="true"
        @update:page="handlePageChange"
      />
    </div>
    <FormBlogs
      v-if="showCreateModal"
      :isOpen="showCreateModal"
      :isEditing="isEditing"
      :form="form"
      :submitting="submitting"
      :error="error"
      :editorOptions="editorOptions"
      @close="closeModal"
      @submit="handleFormSubmit"
      @thumbnailChange="f => (thumbnailFile = f)"
    />
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import httpRequest from '~/utils/httpRequest'
  import handleUpdateImage from '~/utils/handleUpdateImage'
  import Button from '~/components/ui/Button.vue'
  import Icon from '~/components/ui/Icon/Icon.vue'
  import FormBlogs from '~/pages/admin/blogs/_components/ModalFormBlogs.vue'
  import HeaderContent from '~/components/common/Admin/HeaderContent.vue'
  import ErrorCommon from '~/components/common/Admin/ErrorCommon.vue'
  import Pagination from '~/components/ui/Pagination.vue'
  import TableBlogs from '~/pages/admin/blogs/_components/TableBlogs.vue'
  import { format } from 'date-fns'

  definePageMeta({
    layout: 'admin',
    middleware: 'auth',
  })

  // Route and Router for query params
  const route = useRoute()
  const router = useRouter()

  const posts = ref([])
  const loading = ref(true)
  const error = ref('')
  const showCreateModal = ref(false)
  const submitting = ref(false) // Loading state for form submit
  let form = ref({
    title: '',
    description: '',
    thumbnail: '',
    category: 'my-blog',
  })
  const isEditing = ref(false)
  const editingId = ref(null)
  let thumbnailFile = null
  const currentPage = ref(parseInt(route.query.page) || 1)
  const limit = 10
  const pagination = ref({
    total: 0,
    page: 1,
    limit: 10,
    nextPage: false,
    prePage: false,
  })

  // Editor options - now using default options from Editor component
  const editorOptions = {
    placeholder: 'Nhập nội dung bài viết...',
  }

  const fetchPosts = async () => {
    loading.value = true
    error.value = ''
    try {
      const params = new URLSearchParams({
        page: currentPage.value.toString(),
        limit: limit.toString(),
      })

      const resp = await httpRequest.get(`/posts?${params.toString()}`)

      posts.value = resp.data || []
      pagination.value = {
        total: resp.total || 0,
        page: resp.page || 1,
        limit: resp.limit || 10,
        nextPage: resp.nextPage || false,
        prePage: resp.prePage || false,
      }
    } catch (err) {
      error.value = err?.message || 'Không thể tải dữ liệu.'
    } finally {
      loading.value = false
    }
  }

  function closeModal() {
    showCreateModal.value = false
    isEditing.value = false
    editingId.value = null
    error.value = '' // Clear error when closing modal
    thumbnailFile = null // Reset thumbnail file when closing modal
  }

  function startEdit(post) {
    isEditing.value = true
    editingId.value = post._id
    form.value = {
      title: post.title || '',
      description: post.description || '',
      thumbnail: post.thumbnail || '',
      category: post.category || 'my-blog',
    }
    thumbnailFile = null // Reset thumbnail file when editing
    showCreateModal.value = true
  }
  const handleClickButtonAddBlog = () => {
    showCreateModal.value = true
    isEditing.value = false
    editingId.value = null
    form.value = {
      title: '',
      description: '',
    }
  }

  const handleFormSubmit = async result => {
    if (!result.success) {
      error.value = result.error
      return
    }

    submitting.value = true
    try {
      let thumbnailUrl = result.data.thumbnail

      // Upload thumbnail if there's a new file
      if (result.thumbnailFile && result.thumbnailFile instanceof File) {
        const uploadedUrl = await handleUpdateImage(
          result.thumbnailFile,
          'blogs'
        )
        if (uploadedUrl) {
          thumbnailUrl = uploadedUrl
        } else {
          error.value = 'Không thể upload thumbnail. Vui lòng thử lại.'
          submitting.value = false
          return
        }
      }

      const categoryValue = result.data.category?.trim() || 'my-blog'

      if (isEditing.value && editingId.value) {
        await httpRequest.patch(`/posts/${editingId.value}`, {
          title: result.data.title.trim(),
          description: result.data.description.trim(),
          thumbnail: thumbnailUrl,
          category: categoryValue,
        })
      } else {
        await httpRequest.post('/posts', {
          title: result.data.title.trim(),
          description: result.data.description.trim(),
          thumbnail: thumbnailUrl,
          category: categoryValue,
          status: true,
        })
      }
      await fetchPosts()
      closeModal()
      form.value = {
        title: '',
        description: '',
        thumbnail: '',
        category: 'my-blog',
      }
      error.value = '' // Clear any previous errors
    } catch (err) {
      error.value = err?.message || 'Không thể lưu dữ liệu.'
    } finally {
      submitting.value = false
    }
  }

  const deletePost = async id => {
    if (!id) return
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      try {
        await httpRequest.delete(`/posts/${id}`)
        await fetchPosts()
      } catch (err) {
        error.value = err?.message || 'Không thể xóa bài viết.'
      }
    }
  }

  const handlePageChange = page => {
    currentPage.value = page
    // Update query params
    router.push({
      query: {
        ...route.query,
        page: page > 1 ? page : undefined,
      },
    })
    fetchPosts()
  }

  const formatDate = dateString => {
    if (!dateString) return 'N/A'
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm')
    } catch (error) {
      console.error('Error formatting date:', error)
      return 'N/A'
    }
  }

  onMounted(() => {
    fetchPosts()
  })
</script>
