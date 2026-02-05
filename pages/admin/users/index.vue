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
      <div
        v-if="loading"
        class="mt-6 bg-white rounded-lg shadow-sm border-[1px] border-gray-200"
      >
        <Loading container-class="py-12" />
      </div>
      <ul
        v-else
        class="mt-6 bg-white rounded-lg shadow-sm border-[1px] border-gray-200"
      >
        <li
          v-for="user in users"
          :key="user.id"
          class="p-2 border-b-[1px] border-gray-200"
        >
          <div class="flex items-center gap-2">
            <Avatar
              :src="user.avatar"
              :size="45"
              :readOnly="true"
              :ring="false"
            />
            <div class="flex flex-col flex-grow gap-1">
              <div class="flex items-center justify-between">
                <p class="text-sm font-bold text-gray-600">
                  {{ user.fullName }}
                </p>
                <p class="text-[12px] text-gray-300">
                  {{ formatDate(user.createdAt) }}
                </p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm text-gray-300">{{ user.email }}</p>
                <p
                  class="text-[10px] bg-green-100 text-green-800 px-2 py-1 rounded-full"
                >
                  {{ user.status === 1 ? 'Hoạt động' : 'Không hoạt động' }}
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  import { format } from 'date-fns'
  import { httpRequest } from '~/utils/httpRequest'
  import HeaderContent from '~/components/common/Admin/HeaderContent.vue'
  import ErrorCommon from '~/components/common/Admin/ErrorCommon.vue'
  import Pagination from '~/components/ui/Pagination.vue'
  import Loading from '~/components/ui/Loading.vue'
  import Avatar from '~/components/ui/Avatar.vue'
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

  const formatDate = dateString => {
    if (!dateString) return 'N/A'
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm')
    } catch (error) {
      console.error('Error formatting date:', error)
      return 'N/A'
    }
  }

  watch(searchQuery, () => {
    currentPage.value = 1
    updateQueryParams()
  })

  onMounted(() => {
    fetchUsers()
  })
</script>
