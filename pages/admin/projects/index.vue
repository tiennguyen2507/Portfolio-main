<template>
  <div>
    <!-- Page Header -->
    <HeaderContent
      title="Quản lý Dự án"
      subtitle="Quản lý và theo dõi tất cả dự án trong hệ thống"
    >
      <template #action>
        <Button
          @click="
            () => {
              showCreateModal = true
              isEditing = false
              editingId = null
              form = { title: '', description: '', thumbnail: '', skill: [] }
            }
          "
          class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Thêm dự án mới
        </Button>
      </template>
    </HeaderContent>

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

    <!-- Projects List -->
    <ErrorCommon v-if="error" :message="error" @retry="fetchProjects" />

    <TableProjects
      v-if="!error"
      :projects="projects"
      :loading="loading"
      @edit="startEdit"
      @delete="deleteProject"
    />

    <!-- Pagination - Separated from Table -->
    <div
      v-if="!error && projects.length > 0"
      class="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-3"
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
  import FormProjects from '~/pages/admin/projects/_components/ModalFormProjects.vue'
  import HeaderContent from '~/components/admin/HeaderContent.vue'
  import ErrorCommon from '~/components/admin/ErrorCommon.vue'
  import Pagination from '~/components/ui/Pagination.vue'
  import TableProjects from '~/pages/admin/projects/_components/TableProjects.vue'

  definePageMeta({
    layout: 'admin',
    middleware: 'auth',
  })

  const projects = ref([])
  const loading = ref(true)
  const error = ref('')
  const showCreateModal = ref(false)
  const submitting = ref(false) // Loading state for form submit
  const isEditing = ref(false)
  const editingId = ref(null)
  const thumbnailFile = ref(null)

  // Pagination
  const currentPage = ref(1)
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
      error.value = 'Không thể tải danh sách dự án. Vui lòng thử lại.'
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

      // Show success message
      alert(
        isEditing.value ? 'Cập nhật dự án thành công!' : 'Tạo dự án thành công!'
      )
    } catch (err) {
      console.error('Error submitting project:', err)
      error.value = err.message || 'Có lỗi xảy ra. Vui lòng thử lại.'
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
      alert('Xóa dự án thành công!')
    } catch (err) {
      console.error('Error deleting project:', err)
      error.value = 'Không thể xóa dự án. Vui lòng thử lại.'
    }
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
    fetchProjects()
  }

  // Initialize
  onMounted(() => {
    fetchProjects()
  })
</script>
