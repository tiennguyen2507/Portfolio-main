<template>
  <div>
    <!-- Page Header -->
    <HeaderContent
      title="Quản lý Dự án"
      subtitle="Quản lý và theo dõi tất cả dự án trong hệ thống"
    >
      <template #action>
        <Button
          variant="primary"
          size="sm"
          @click="handleClickButtonAddProject"
          class="rounded-full px-3"
        >
          <Icon name="plus" size="sm" color="white" />
        </Button>
      </template>
    </HeaderContent>

    <ErrorCommon v-if="error" :message="error" @retry="fetchProjects" />

    <Loading v-if="loading" size="md" color="orange" />

    <!-- Create/Edit Project Modal -->
    <FormProjects
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

    <!-- Projects List - Card Grid (style như admin/blogs) -->
    <ul
      v-if="!loading"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
    >
      <li
        v-for="project in projects"
        :key="project._id"
        class="list-none group border border-gray-200 dark:border-gray-700 rounded-lg p-2 sm:p-4 bg-white dark:bg-gray-800/30 hover:border-gray-300 dark:hover:border-gray-600 transition-colors flex flex-col justify-between"
      >
        <div class="flex flex-row items-center gap-2 sm:gap-3">
          <div class="flex-shrink-0 w-20 sm:w-24">
            <div
              class="relative overflow-hidden rounded-lg w-20 h-20 sm:w-24 sm:h-24"
            >
              <img
                :src="project.thumbnail || '/images/blog-1.webp'"
                :alt="project.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                @error="e => (e.target.src = '/images/blog-1.webp')"
              />
            </div>
          </div>
          <div class="flex-1 min-w-0 flex flex-col">
            <Typography
              as="h3"
              size="sm"
              weight="semibold"
              color="default"
              class="mb-1 sm:mb-2 line-clamp-1 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors text-[11px] sm:text-sm"
            >
              {{ project.title }}
            </Typography>
            <Typography as="p" size="xs" color="muted" class="line-clamp-2 text-[9px] sm:text-xs">
              {{ stripHtml(project.description) }}
            </Typography>
          </div>
        </div>
        <div class="mt-2 flex flex-wrap gap-1">
          <Tag
            v-for="s in (project.skill || []).slice(0, 3)"
            :key="s"
            size="sm"
            variant="primary"
            :pill="true"
            tag-class="!px-1.5 !py-[1px] !text-[10px]"
          >
            {{ s }}
          </Tag>
          <Tag
            v-if="(project.skill || []).length > 3"
            size="sm"
            variant="gray"
            :pill="true"
            tag-class="!px-1.5 !py-[1px] !text-[10px]"
          >
            +{{ (project.skill || []).length - 3 }}
          </Tag>
          <Tag
            :variant="project.status ? 'success' : 'warning'"
            size="sm"
            :pill="true"
            tag-class="!px-1.5 !py-[1px] !text-[10px]"
          >
            {{ project.status ? 'Hoàn thành' : 'Đang phát triển' }}
          </Tag>
          <Tag
            v-if="project.createdAt"
            size="sm"
            variant="info"
            tag-class="!px-1.5 !py-[1px] !text-[10px] whitespace-nowrap"
          >
            {{ formatProjectDate(project.createdAt) }}
          </Tag>
        </div>
        <div class="mt-2 flex items-center gap-1 flex-wrap">
          <div class="flex-1" />
          <div class="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              class="!p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-200"
              @click.stop="startEdit(project)"
              aria-label="Chỉnh sửa"
            >
              <Icon name="edit" size="sm" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              class="!p-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/40 dark:hover:bg-red-900/60 dark:text-red-300"
              @click.stop="deleteProject(project._id)"
              aria-label="Xóa"
            >
              <Icon name="delete" size="sm" />
            </Button>
          </div>
        </div>
      </li>
    </ul>

    <div v-if="!loading && projects.length === 0" class="text-center py-12">
      <Typography as="p" size="sm" color="muted">Không có dự án nào.</Typography>
    </div>

    <!-- Pagination - Separated from Table -->
    <div
      v-if="!error && projects.length > 0 && !loading"
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
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { httpRequest } from '~/utils/httpRequest'
  import handleUpdateImage from '~/utils/handleUpdateImage'
  import Button from '~/components/ui/Button.vue'
  import Icon from '~/components/ui/Icon/Icon.vue'
  import FormProjects from '~/pages/admin/projects/_components/ModalFormProjects.vue'
  import HeaderContent from '~/components/common/Admin/HeaderContent.vue'
  import ErrorCommon from '~/components/common/Admin/ErrorCommon.vue'
  import Pagination from '~/components/ui/Pagination.vue'
  import Tag from '~/components/ui/Tag.vue'
  import Typography from '~/components/ui/Typography.vue'
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

  const projects = ref([])
  const loading = ref(true)
  const error = ref('')
  const showCreateModal = ref(false)
  const submitting = ref(false) // Loading state for form submit
  const isEditing = ref(false)
  const editingId = ref(null)
  const thumbnailFile = ref(null)

  // Pagination
  const currentPage = ref(parseInt(route.query.page) || 1)
  const limit = 10
  const pagination = ref({
    total: 0,
    page: 1,
    limit: 10,
    nextPage: false,
    prePage: false,
  })

  // Form data
  const form = ref({
    title: '',
    description: '',
    thumbnail: '',
    skill: [],
  })

  // Editor options
  const editorOptions = {
    placeholder: 'Nhập mô tả dự án...',
    toolbar: [
      'bold',
      'italic',
      'underline',
      'strike',
      '|',
      'bullet',
      'ordered',
      '|',
      'link',
      'image',
      '|',
      'undo',
      'redo',
    ],
  }

  // Fetch projects
  const fetchProjects = async () => {
    try {
      loading.value = true
      error.value = ''

      const response = await httpRequest.get(
        `/projects?page=${currentPage.value}&limit=${limit}`
      )

      if (response && response.data) {
        projects.value = response.data
        pagination.value = {
          total: response.total || 0,
          page: response.page || 1,
          limit: response.limit || 10,
          nextPage: response.nextPage || false,
          prePage: response.prePage || false,
        }
      } else {
        projects.value = []
        pagination.value = {
          total: 0,
          page: 1,
          limit: 10,
          nextPage: false,
          prePage: false,
        }
      }
    } catch (err) {
      console.error('Error fetching projects:', err)
      error.value = err?.message || 'Không thể tải danh sách dự án. Vui lòng thử lại.'
      showError(error.value)
    } finally {
      loading.value = false
    }
  }

  // Handle form submit
  const handleFormSubmit = async formData => {
    try {
      submitting.value = true
      error.value = ''

      let thumbnailUrl = formData.thumbnail

      // Upload thumbnail if there's a new file
      if (thumbnailFile.value) {
        const uploadResult = await handleUpdateImage(thumbnailFile.value)
        if (uploadResult) {
          thumbnailUrl = uploadResult
        } else {
          throw new Error('Không thể tải lên hình ảnh')
        }
      }

      const projectData = {
        title: formData.title,
        description: formData.description,
        thumbnail: thumbnailUrl,
        skill: formData.skill || [],
        status: formData.status !== undefined ? formData.status : true,
      }

      let response
      try {
        if (isEditing.value && editingId.value) {
          // Update existing project
          console.log('Updating project:', editingId.value, projectData)
          response = await httpRequest.patch(
            `/projects/${editingId.value}`,
            projectData
          )
          console.log('Update response:', response)
        } else {
          // Create new project
          console.log('Creating project:', projectData)
          response = await httpRequest.post('/projects', projectData)
          console.log('Create response:', response)
        }

        // Check if API call was successful
        if (!response) {
          throw new Error('Không nhận được phản hồi từ server')
        }
      } catch (apiError) {
        console.error('API Error:', apiError)
        throw new Error(
          `API Error: ${apiError.message || 'Không thể kết nối với server'}`
        )
      }

      // Reset form and close modal
      closeModal()

      // Refresh projects list
      await fetchProjects()

      showNotification(
        isEditing.value ? 'Cập nhật dự án thành công!' : 'Tạo dự án thành công!'
      )
    } catch (err) {
      console.error('Error submitting project:', err)
      const msg = err?.message || 'Có lỗi xảy ra. Vui lòng thử lại.'
      error.value = msg
      showError(msg)
    } finally {
      submitting.value = false
    }
  }

  // Start editing
  const startEdit = project => {
    isEditing.value = true
    editingId.value = project._id
    form.value = {
      title: project.title || '',
      description: project.description || '',
      thumbnail: project.thumbnail || '',
      skill: project.skill || [],
      status: project.status !== undefined ? project.status : true,
    }
    showCreateModal.value = true
  }

  // Delete project
  const deleteProject = async projectId => {
    if (!confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
      return
    }

    try {
      await httpRequest.delete(`/projects/${projectId}`)
      await fetchProjects()
      showNotification('Xóa dự án thành công!')
    } catch (err) {
      console.error('Error deleting project:', err)
      error.value = err?.message || 'Không thể xóa dự án. Vui lòng thử lại.'
      showError(error.value)
    }
  }

  const handleClickButtonAddProject = () => {
    showCreateModal.value = true
    isEditing.value = false
    editingId.value = null
    form.value = {
      title: '',
      description: '',
      thumbnail: '',
      skill: [],
    }
    thumbnailFile.value = null
  }

  // Close modal
  const closeModal = () => {
    showCreateModal.value = false
    isEditing.value = false
    editingId.value = null
    form.value = {
      title: '',
      description: '',
      thumbnail: '',
      skill: [],
    }
    thumbnailFile.value = null
    error.value = ''
  }

  // Handle page change
  const handlePageChange = page => {
    currentPage.value = page
    // Update query params
    router.push({
      query: {
        ...route.query,
        page: page > 1 ? page : undefined,
      },
    })
    fetchProjects()
  }

  const formatProjectDate = dateString => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const stripHtml = html => {
    if (!html) return ''
    return String(html).replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()
  }

  onMounted(() => {
    fetchProjects()
  })
</script>
