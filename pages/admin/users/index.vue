<template>
  <div>
    <!-- Page Header -->
    <HeaderContent
      title="Quản lý Users"
      subtitle="Quản lý và theo dõi tất cả users trong hệ thống"
    >
      <template #action>
        <AdminUiButton variant="secondary" size="md" @click="noop">
          Thêm User mới
          <template #suffix>
            <AdminUiIcon name="plus" size="md" color="text-white" />
          </template>
        </AdminUiButton>
      </template>
    </HeaderContent>

    <!-- Loading State -->
    <Loading v-if="loading" size="lg" />

    <!-- Content -->
    <div v-else>
      <!-- Filters -->
      <div
        class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <AdminUiInput
              v-model="searchQuery"
              label="Tìm kiếm"
              type="text"
              placeholder="Tìm theo tên, email..."
            />
          </div>
          <div>
            <AdminUiSelect
              v-model="selectedStatus"
              label="Trạng thái"
              placeholder="Tất cả trạng thái"
              :options="[
                { label: 'Hoạt động', value: '1' },
                { label: 'Không hoạt động', value: '0' },
              ]"
            />
          </div>
          <div class="flex items-end">
            <AdminUiButton fullWidth @click="applyFilters"> Lọc </AdminUiButton>
          </div>
        </div>
      </div>

      <!-- Users Table -->

      <TableAdminUsers :users="paginatedUsers" :loading="loading" />
      <!-- Pagination -->
      <div class="bg-white px-6 py-3 border-t border-gray-200">
        <Pagination
          :page="currentPage"
          :total="filteredUsers.length"
          :limit="itemsPerPage"
          :show-info="true"
          :split="true"
          @update:page="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { httpRequest } from '~/utils/httpRequest'
  import HeaderContent from '~/components/admin/HeaderContent.vue'
  import Loading from '~/components/ui/Loading.vue'
  import Pagination from '~/components/ui/Pagination.vue'
  import AdminUiInput from '~/components/admin/ui/AdminUiInput.vue'
  import AdminUiSelect from '~/components/admin/ui/AdminUiSelect.vue'
  import AdminUiButton from '~/components/admin/ui/AdminUiButton.vue'
  import AdminUiIcon from '~/components/admin/ui/AdminUiIcon.vue'
  import TableAdminUsers from './_components/TableAdminUsers.vue'

  definePageMeta({
    layout: 'admin',
    middleware: 'auth',
  })

  // Route and Router for query params
  const route = useRoute()
  const router = useRouter()

  // Reactive data
  const searchQuery = ref('')
  const selectedStatus = ref('')
  const currentPage = ref(parseInt(route.query.page) || 1)
  const itemsPerPage = 10
  const loading = ref(true)
  const error = ref(null)
  const users = ref([])
  // Removed multi-select state

  // Computed properties
  const filteredUsers = computed(() => {
    let filtered = users.value

    if (searchQuery.value) {
      filtered = filtered.filter(
        user =>
          (user.fullName &&
            user.fullName
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase())) ||
          (user.email &&
            user.email.toLowerCase().includes(searchQuery.value.toLowerCase()))
      )
    }

    if (selectedStatus.value !== '') {
      filtered = filtered.filter(
        user => user.status === parseInt(selectedStatus.value)
      )
    }

    return filtered
  })

  const totalPages = computed(() =>
    Math.ceil(filteredUsers.value.length / itemsPerPage)
  )
  const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
  const endIndex = computed(() =>
    Math.min(startIndex.value + itemsPerPage, filteredUsers.value.length)
  )

  const paginatedUsers = computed(() => {
    return filteredUsers.value.slice(startIndex.value, endIndex.value)
  })

  // Methods
  const fetchUsers = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await httpRequest.get('/users')
      // API trả về array trực tiếp, không có data wrapper
      users.value = Array.isArray(response) ? response : []
    } catch (err) {
      console.error('Error fetching users:', err)
      error.value = err.message || 'Có lỗi xảy ra khi tải danh sách users'
      users.value = []
    } finally {
      loading.value = false
    }
  }

  const applyFilters = () => {
    currentPage.value = 1
    updateQueryParams()
    // Removed selectedUsers.value = []
    // Removed selectAll.value = false
  }

  const handlePageChange = page => {
    currentPage.value = page
    updateQueryParams()
  }

  const updateQueryParams = () => {
    router.push({
      query: {
        ...route.query,
        page: currentPage.value > 1 ? currentPage.value : undefined,
      },
    })
  }

  const formatDate = dateString => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = date.toLocaleDateString('en-US', { month: 'short' })
    const year = date.getFullYear()
    return `${day} ${month}, ${year}`
  }

  const editUser = id => {
    // Navigate to edit page
    navigateTo(`/admin/users/${id}/edit`)
  }

  const toggleUserStatus = async (id, currentStatus) => {
    try {
      await httpRequest.put(`/users/${id}`, {
        status: currentStatus === 1 ? 0 : 1,
      })

      // Update local state
      const userIndex = users.value.findIndex(user => user._id === id)
      if (userIndex !== -1) {
        users.value[userIndex].status = currentStatus === 1 ? 0 : 1
      }
    } catch (err) {
      console.error('Error toggling user status:', err)
      alert('Có lỗi xảy ra khi cập nhật trạng thái user')
    }
  }

  const deleteUser = async id => {
    if (confirm('Bạn có chắc chắn muốn xóa user này?')) {
      try {
        await httpRequest.delete(`/users/${id}`)

        // Remove from local state
        users.value = users.value.filter(user => user._id !== id)
        // Removed selectedUsers.value = selectedUsers.value.filter(
        //   userId => userId !== id
        // )
      } catch (err) {
        console.error('Error deleting user:', err)
        alert('Có lỗi xảy ra khi xóa user')
      }
    }
  }

  // Lifecycle
  onMounted(() => {
    fetchUsers()
  })
</script>
