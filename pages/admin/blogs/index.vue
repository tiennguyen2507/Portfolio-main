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
          <Icon name="plus" size="sm" color="white" />
        </Button>
      </template>
    </HeaderContent>
    <ErrorCommon v-if="error" :message="error" @retry="fetchPosts" />

    <Loading v-if="loading" size="md" color="orange" />

    <ul
      v-if="!loading"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
    >
      <li
        v-for="post in posts"
        :key="post._id"
        role="button"
        tabindex="0"
        class="list-none group border border-gray-200 dark:border-gray-700 rounded-lg p-2 sm:p-4 bg-white dark:bg-gray-800/30 hover:border-gray-300 dark:hover:border-gray-600 transition-colors flex flex-col justify-between cursor-pointer"
        @click="goToBlog(post._id)"
        @keydown.enter="goToBlog(post._id)"
      >
        <!-- Phần trên: ảnh + title + desc -->
        <div class="flex flex-row items-center gap-2 sm:gap-3">
          <!-- Thumbnail bên trái -->
          <div class="flex-shrink-0 w-20 sm:w-24">
            <div
              class="relative overflow-hidden rounded-lg w-20 h-20 sm:w-24 sm:h-24"
            >
              <img
                :src="post.thumbnail"
                alt="Thumbnail"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          </div>

          <!-- Nội dung bên phải: title + mô tả -->
          <div class="flex-1 min-w-0 flex flex-col">
            <!-- Tiêu đề: 1 dòng, quá thì ... -->
            <Typography
              as="h3"
              size="sm"
              weight="semibold"
              color="default"
              class="mb-1 sm:mb-2 line-clamp-1 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors text-[11px] sm:text-sm"
            >
              {{ post.title }}
            </Typography>

            <!-- Mô tả: tối đa 2 dòng, quá thì ... -->
            <ViewEditor
              class="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 line-clamp-2"
              :content="post.description"
              :strip-html="true"
            />
          </div>
        </div>

        <!-- Phần dưới: tags bên trái, actions bên phải -->
        <div class="mt-2 flex items-center gap-1 flex-wrap">
          <div class="flex items-center gap-1 flex-wrap">
            <Tag
              size="sm"
              variant="default"
              :pill="true"
              tag-class="!px-1.5 !py-[1px] !text-[10px]"
            >
              {{ post.category || 'Blog' }}
            </Tag>
            <Tag
              v-if="post.createdAt"
              size="sm"
              variant="info"
              tag-class="!px-1.5 !py-[1px] !text-[10px] whitespace-nowrap"
            >
              {{ formatDate(post.createdAt) }}
            </Tag>
            <Tag
              v-if="post?.createdBy?.lastName"
              size="sm"
              variant="gray"
              tag-class="!px-1.5 !py-[1px] !text-[10px]"
            >
              {{
                (post?.createdBy?.firstName || '') +
                ' ' +
                post?.createdBy?.lastName
              }}
            </Tag>
          </div>

          <div class="flex items-center gap-1 ml-auto">
            <Button
              size="sm"
              variant="ghost"
              class="!p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-200"
              @click.stop="startEdit(post)"
              aria-label="Chỉnh sửa bài viết"
            >
              <Icon name="edit" size="sm" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              class="!p-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/40 dark:hover:bg-red-900/60 dark:text-red-300"
              @click.stop="deletePost(post._id)"
              aria-label="Xóa bài viết"
            >
              <Icon name="delete" size="sm" />
            </Button>
          </div>
        </div>
      </li>
    </ul>

    <div
      v-if="!error && posts.length > 0 && !loading"
      class="mt-8 bg-white dark:bg-[#050505] rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 px-6 py-4 hover:shadow-lg transition-shadow duration-300"
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
  import Typography from '~/components/ui/Typography.vue'
  import Tag from '~/components/ui/Tag.vue'
  import Loading from '~/components/ui/Loading.vue'
  import { useNotification } from '~/composables/useNotification'

  definePageMeta({
    layout: 'admin',
    middleware: 'auth',
  })

  const { showNotification, showError } = useNotification()

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
      showError(error.value)
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

  const goToBlog = id => {
    if (id) router.push(`/blogs/${id}`)
  }

  const handleFormSubmit = async result => {
    if (!result.success) {
      if (result.error) showError(result.error)
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
          showError('Không thể upload thumbnail. Vui lòng thử lại.')
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
      error.value = ''
      showNotification(isEditing.value ? 'Cập nhật bài viết thành công!' : 'Tạo bài viết thành công!')
    } catch (err) {
      error.value = err?.message || 'Không thể lưu dữ liệu.'
      showError(error.value)
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
        showNotification('Xóa bài viết thành công!')
      } catch (err) {
        error.value = err?.message || 'Không thể xóa bài viết.'
        showError(error.value)
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
      // Rút gọn format để hiển thị gọn trên mobile
      return format(new Date(dateString), 'dd/MM HH:mm')
    } catch (error) {
      console.error('Error formatting date:', error)
      return 'N/A'
    }
  }

  onMounted(() => {
    fetchPosts()
  })
</script>
