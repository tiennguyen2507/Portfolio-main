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

    <!-- Projects List - Card Grid -->
    <ul
      v-if="!loading"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
    >
      <li
        v-for="project in projects"
        :key="project._id"
        class="list-none"
      >
        <Card variant="default" padding="md" hover class="h-full flex flex-col">
          <div class="flex flex-row items-start gap-3">
            <div class="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img
                :src="project.thumbnail || '/images/blog-1.webp'"
                :alt="project.title"
                class="w-full h-full object-cover"
                @error="e => (e.target.src = '/images/blog-1.webp')"
              />
            </div>
            <div class="flex-1 min-w-0">
              <Typography as="h3" size="sm" weight="semibold" color="default" class="line-clamp-1 mb-1">
                {{ project.title }}
              </Typography>
              <Typography as="p" size="xs" color="muted" class="line-clamp-2">
                {{ stripHtml(project.description) }}
              </Typography>
            </div>
          </div>
          <div class="mt-3 flex flex-wrap gap-1">
            <Tag
              v-for="s in (project.skill || []).slice(0, 3)"
              :key="s"
              size="xs"
              variant="primary"
            >
              {{ s }}
            </Tag>
            <Tag v-if="(project.skill || []).length > 3" size="xs" variant="gray">
              +{{ (project.skill || []).length - 3 }}
            </Tag>
          </div>
          <div class="mt-3 flex items-center justify-between gap-2 flex-wrap">
            <div class="flex items-center gap-2">
              <Tag
                :variant="project.status ? 'success' : 'warning'"
                size="xs"
              >
                {{ project.status ? 'Hoàn thành' : 'Đang phát triển' }}
              </Tag>
              <Typography as="span" size="xs" color="tertiary">
                {{ formatProjectDate(project.createdAt) }}
              </Typography>
            </div>
            <div class="flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                class="!p-1.5 rounded-full"
                aria-label="Chỉnh sửa"
                @click.stop="startEdit(project)"
              >
                <Icon name="edit" size="sm" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                class="!p-1.5 rounded-full text-red-600 dark:text-red-400"
                aria-label="Xóa"
                @click.stop="deleteProject(project._id)"
              >
                <Icon name="delete" size="sm" />
              </Button>
            </div>
          </div>
        </Card>
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
  import Card from '~/components/ui/Card.vue'
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
