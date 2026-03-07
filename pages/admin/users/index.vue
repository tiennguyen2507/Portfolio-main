<template>
  <div>
    <HeaderContent
      title="Quản lý Users"
      subtitle="Quản lý và theo dõi tất cả users trong hệ thống"
    />
    <ErrorCommon v-if="error" :message="error" @retry="fetchUsers" />

    <Loading v-if="loading" size="md" color="orange" />

    <div v-if="!loading">
      <div class="sm:flex sm:justify-end mb-4">
        <SearchInput
          class="sm:max-w-md"
          id="search-users"
          v-model="searchQuery"
          placeholder="Tìm theo tên, email..."
        />
      </div>

      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <li v-for="user in paginatedUsers" :key="user.id" class="list-none">
          <Card variant="default" padding="md" hover class="h-full flex flex-col">
            <div class="flex items-start gap-3">
              <Avatar
                :src="user.avatar"
                :size="48"
                :readOnly="true"
                :ring="false"
              />
              <div class="flex-1 min-w-0">
                <Typography as="p" size="sm" weight="semibold" class="line-clamp-1">
                  {{ user.fullName }}
                </Typography>
                <Typography as="p" size="xs" color="muted" class="truncate mt-0.5">
                  {{ user.email }}
                </Typography>
              </div>
            </div>
            <div class="mt-3 flex flex-wrap items-center gap-2">
              <Tag
                :variant="user.status === 1 ? 'success' : 'gray'"
                size="xs"
              >
                {{ user.status === 1 ? 'Hoạt động' : 'Không hoạt động' }}
              </Tag>
              <Typography as="span" size="xs" color="tertiary">
                {{ formatDate(user.createdAt) }}
              </Typography>
            </div>
          </Card>
        </li>
      </ul>

      <div v-if="paginatedUsers.length === 0" class="text-center py-12">
        <Typography as="p" size="sm" color="muted">Không có user nào.</Typography>
      </div>

      <div
        v-if="!error && filteredUsers.length > 0"
        class="mt-8 bg-white dark:bg-[#050505] rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 px-6 py-4 hover:shadow-lg transition-shadow duration-300"
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
</template>

<script setup>
  import { format } from 'date-fns'
  import { httpRequest } from '~/utils/httpRequest'
  import HeaderContent from '~/components/common/Admin/HeaderContent.vue'
  import ErrorCommon from '~/components/common/Admin/ErrorCommon.vue'
  import Pagination from '~/components/ui/Pagination.vue'
  import Loading from '~/components/ui/Loading.vue'
  import Avatar from '~/components/ui/Avatar.vue'
  import Card from '~/components/ui/Card.vue'
  import Tag from '~/components/ui/Tag.vue'
  import Typography from '~/components/ui/Typography.vue'
  import { useNotification } from '~/composables/useNotification'

  definePageMeta({
    layout: 'admin',
    middleware: 'auth',
  })

  const route = useRoute()
  const router = useRouter()
  const { showError } = useNotification()

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
      error.value = err?.message || 'Có lỗi xảy ra khi tải danh sách users'
      showError(error.value)
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
