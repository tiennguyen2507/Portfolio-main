<template>
  <div>
    <HeaderContent
      title="Quản lý Users"
      subtitle="Quản lý và theo dõi tất cả users trong hệ thống"
    />
    <ErrorCommon v-if="error" :message="error" @retry="fetchUsers" />
    <div v-else>
      <div class="sm:flex sm:justify-end">
        <SearchInput
          class="sm:max-w-md"
          id="search-users"
          v-model="searchQuery"
          placeholder="Tìm theo tên, email..."
        />
      </div>
      <div class="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <TableAdminUsers :users="paginatedUsers" :loading="loading" />

        <div
          v-if="filteredUsers.length > 0"
          class="px-6 py-4 border-t border-gray-200"
        >
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
  </div>
</template>

<script setup>
  import { httpRequest } from '~/utils/httpRequest'
  import HeaderContent from '~/components/admin/HeaderContent.vue'
  import ErrorCommon from '~/components/admin/ErrorCommon.vue'
  import Pagination from '~/components/ui/Pagination.vue'
  import SearchInput from '~/components/ui/SearchInput'
  import TableAdminUsers from './_components/TableAdminUsers.vue'

  definePageMeta({
    layout: 'admin',
    middleware: 'auth',
  })

  const route = useRoute()
  const router = useRouter()

  const searchQuery = ref('')
  const currentPage = ref(parseInt(route.query.page) || 1)
  const itemsPerPage = 10
  const loading = ref(true)
  const error = ref(null)
  const users = ref([])

  const filteredUsers = computed(() => {
    if (!searchQuery.value) return users.value

    const query = searchQuery.value.toLowerCase()
    return users.value.filter(
      user =>
        user.fullName?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query)
    )
  })

  const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredUsers.value.slice(start, end)
  })

  const fetchUsers = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await httpRequest.get('/users')
      users.value = Array.isArray(response) ? response : []
    } catch (err) {
      console.error('Error fetching users:', err)
      error.value = err.message || 'Có lỗi xảy ra khi tải danh sách users'
      users.value = []
    } finally {
      loading.value = false
    }
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

  watch(searchQuery, () => {
    currentPage.value = 1
    updateQueryParams()
  })

  onMounted(() => {
    fetchUsers()
  })
</script>
