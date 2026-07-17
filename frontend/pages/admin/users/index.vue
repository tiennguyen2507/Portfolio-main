<template>
  <div>
    <HeaderContent
      title="Quản lý Users"
      subtitle="Quản lý và theo dõi tất cả users trong hệ thống"
    />
    <ErrorCommon v-if="error" :message="error" @retry="fetchUsers" />

    <Loading v-if="loading" size="md" color="orange" />

    <div v-if="!loading">
      <!-- Filters (giống admin/contacts) -->
      <div
        class="bg-white dark:bg-[#050505] rounded-xl border border-gray-200 dark:border-gray-800 p-3 sm:p-4 mb-4"
      >
        <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <div class="w-full sm:max-w-xs flex-shrink-0">
            <SearchInput
              id="search-users"
              v-model="searchQuery"
              placeholder="Tìm theo tên, email..."
              :show-microphone="false"
            />
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <Tag
              :variant="selectedStatus === '' ? 'primary' : 'gray'"
              size="sm"
              :pill="true"
              tag-class="!px-2 !py-1 cursor-pointer hover:opacity-90 transition-opacity"
              @click="selectStatus('')"
            >
              Tất cả
            </Tag>
            <Tag
              :variant="selectedStatus === '1' ? 'success' : 'gray'"
              size="sm"
              :pill="true"
              tag-class="!px-2 !py-1 cursor-pointer hover:opacity-90 transition-opacity"
              @click="selectStatus('1')"
            >
              Hoạt động
            </Tag>
            <Tag
              :variant="selectedStatus === '0' ? 'warning' : 'gray'"
              size="sm"
              :pill="true"
              tag-class="!px-2 !py-1 cursor-pointer hover:opacity-90 transition-opacity"
              @click="selectStatus('0')"
            >
              Không hoạt động
            </Tag>
          </div>
          <Button
            variant="primary"
            size="sm"
            class="rounded-full px-4 flex-shrink-0 sm:ml-auto"
            @click="updateQueryParams()"
          >
            Lọc
          </Button>
        </div>
      </div>

      <ul
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
      >
        <li
          v-for="user in paginatedUsers"
          :key="user.id"
          class="list-none group border border-gray-200 dark:border-gray-700 rounded-lg p-2 sm:p-4 bg-white dark:bg-gray-800/30 hover:border-gray-300 dark:hover:border-gray-600 transition-colors flex flex-col justify-between"
        >
          <div class="flex flex-row items-center gap-2 sm:gap-3">
            <div class="flex-shrink-0">
              <Avatar
                :src="user.avatar"
                :size="48"
                :readOnly="true"
                :ring="false"
              />
            </div>
            <div class="flex-1 min-w-0 flex flex-col">
              <Typography
                as="p"
                size="sm"
                weight="semibold"
                class="line-clamp-1 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors text-[11px] sm:text-sm"
              >
                {{ user.fullName }}
              </Typography>
              <Typography
                as="p"
                size="xs"
                color="muted"
                class="truncate mt-0.5 text-[9px] sm:text-xs"
              >
                {{ user.email }}
              </Typography>
            </div>
          </div>
          <div class="mt-2 flex items-center gap-1 flex-wrap">
            <Tag
              :variant="user.status === 1 ? 'success' : 'gray'"
              size="sm"
              :pill="true"
              tag-class="!px-1.5 !py-[1px] !text-[10px]"
            >
              {{ user.status === 1 ? 'Hoạt động' : 'Không hoạt động' }}
            </Tag>
            <Tag
              v-if="user.createdAt"
              size="sm"
              variant="info"
              tag-class="!px-1.5 !py-[1px] !text-[10px] whitespace-nowrap"
            >
              {{ formatDate(user.createdAt) }}
            </Tag>
          </div>
        </li>
      </ul>

      <div v-if="paginatedUsers.length === 0" class="text-center py-12">
        <Typography as="p" size="sm" color="muted"
          >Không có user nào.</Typography
        >
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
  import Button from '~/components/ui/Button.vue'
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
  const selectedStatus = ref(route.query.status ?? '')
  const currentPage = ref(parseInt(route.query.page) || 1)
  const itemsPerPage = 10
  const loading = ref(true)
  const error = ref(null)
  const users = ref([])

  const filteredUsers = computed(() => {
    let list = users.value

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      list = list.filter(
        user =>
          user.fullName?.toLowerCase().includes(query) ||
          user.email?.toLowerCase().includes(query)
      )
    }

    if (selectedStatus.value !== '') {
      const statusNum = selectedStatus.value === '1' ? 1 : 0
      list = list.filter(user => (user.status ?? 0) === statusNum)
    }

    return list
  })

  const selectStatus = status => {
    selectedStatus.value = status
    currentPage.value = 1
    updateQueryParams()
  }

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
        status: selectedStatus.value || undefined,
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

  watch([searchQuery, selectedStatus], () => {
    currentPage.value = 1
    updateQueryParams()
  })

  onMounted(() => {
    fetchUsers()
  })
</script>
