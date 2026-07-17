<template>
  <div>
    <HeaderContent
      title="Quản lý Liên hệ"
      subtitle="Quản lý và theo dõi tất cả liên hệ từ khách hàng"
    />

    <ErrorCommon v-if="error" :message="error" @retry="fetchContacts" />

    <Loading v-if="loading" size="md" color="orange" />

    <div v-if="!loading">
    <!-- Filters -->
    <div
      class="bg-white dark:bg-[#050505] rounded-xl border border-gray-200 dark:border-gray-800 p-3 sm:p-4 mb-4"
    >
      <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <div class="w-full sm:max-w-xs flex-shrink-0">
          <SearchInput
            id="search-contacts"
            v-model="searchQuery"
            placeholder="Tìm theo tên, email..."
            :show-microphone="false"
            @input="debouncedSearch"
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
            :variant="selectedStatus === 'true' ? 'success' : 'gray'"
            size="sm"
            :pill="true"
            tag-class="!px-2 !py-1 cursor-pointer hover:opacity-90 transition-opacity"
            @click="selectStatus('true')"
          >
            Đã xử lý
          </Tag>
          <Tag
            :variant="selectedStatus === 'false' ? 'warning' : 'gray'"
            size="sm"
            :pill="true"
            tag-class="!px-2 !py-1 cursor-pointer hover:opacity-90 transition-opacity"
            @click="selectStatus('false')"
          >
            Chưa xử lý
          </Tag>
        </div>
        <Button
          variant="primary"
          size="sm"
          class="rounded-full px-4 flex-shrink-0 sm:ml-auto"
          @click="fetchContacts"
        >
          Lọc
        </Button>
      </div>
    </div>

    <!-- Contacts Card Grid (style như admin/blogs) -->
    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
      <li
        v-for="contact in contacts"
        :key="contact._id"
        class="list-none group border border-gray-200 dark:border-gray-700 rounded-lg p-2 sm:p-4 bg-white dark:bg-gray-800/30 hover:border-gray-300 dark:hover:border-gray-600 transition-colors flex flex-col justify-between"
      >
        <div class="flex flex-row items-center gap-2 sm:gap-3">
          <div
            class="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center"
          >
            <span class="text-sm font-medium text-gray-600 dark:text-gray-100">
              {{ (contact.name || '').charAt(0).toUpperCase() }}
            </span>
          </div>
          <div class="flex-1 min-w-0 flex flex-col">
            <Typography
              as="p"
              size="sm"
              weight="medium"
              class="line-clamp-1 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors text-[11px] sm:text-sm"
            >
              {{ contact.name }}
            </Typography>
            <Typography as="p" size="xs" color="muted" class="truncate text-[9px] sm:text-xs">
              {{ contact.email }}
            </Typography>
          </div>
        </div>
        <Typography as="p" size="sm" color="default" class="mt-2 line-clamp-2 text-[9px] sm:text-xs text-gray-500 dark:text-gray-400">
          {{ contact.message }}
        </Typography>
        <div class="mt-2 flex items-center gap-1 flex-wrap">
          <Tag
            :variant="contact.status ? 'success' : 'warning'"
            size="sm"
            :pill="true"
            tag-class="!px-1.5 !py-[1px] !text-[10px]"
          >
            {{ contact.status ? 'Đã xử lý' : 'Chưa xử lý' }}
          </Tag>
          <Tag
            v-if="contact.createdAt"
            size="sm"
            variant="info"
            tag-class="!px-1.5 !py-[1px] !text-[10px] whitespace-nowrap"
          >
            {{ formatDate(contact.createdAt) }}
          </Tag>
          <Button
            size="sm"
            variant="ghost"
            class="!p-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/40 dark:hover:bg-red-900/60 dark:text-red-300 flex-shrink-0 ml-auto"
            @click="deleteContact(contact._id)"
            aria-label="Xóa liên hệ"
          >
            <Icon name="delete" size="sm" />
          </Button>
        </div>
      </li>
    </ul>

    <!-- Empty State -->
      <div v-if="contacts.length === 0" class="text-center py-12">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <Typography as="h3" size="sm" weight="medium">
          Không có liên hệ nào
        </Typography>
        <Typography as="p" size="sm" color="muted" class="mt-1">
          Chưa có liên hệ nào được gửi đến.
        </Typography>
      </div>

      <!-- Pagination -->
      <div
        v-if="!error && contacts.length > 0 && !loading"
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
  </div>
</template>

<script setup>
  import { httpRequest } from '~/utils/httpRequest'
  import HeaderContent from '~/components/common/Admin/HeaderContent.vue'
  import Loading from '~/components/ui/Loading.vue'
  import Pagination from '~/components/ui/Pagination.vue'
  import SearchInput from '~/components/ui/SearchInput/SearchInput.vue'
  import Button from '~/components/ui/Button.vue'
  import Icon from '~/components/ui/Icon/Icon.vue'
  import Typography from '~/components/ui/Typography.vue'
  import Tag from '~/components/ui/Tag.vue'
  import { useNotification } from '~/composables/useNotification'

  definePageMeta({
    layout: 'admin',
    middleware: 'auth',
  })

  // Route and Router for query params
  const route = useRoute()
  const router = useRouter()
  const { showNotification, showError } = useNotification()

  // Reactive data
  const error = ref('')
  const searchQuery = ref('')
  const selectedStatus = ref('')
  const currentPage = ref(parseInt(route.query.page) || 1)
  const limit = 10
  const loading = ref(false)
  const contacts = ref([])
  const pagination = ref({
    total: 0,
    page: 1,
    limit: 10,
    nextPage: false,
    prePage: false,
  })

  // Debounced search
  let searchTimeout
  const debouncedSearch = () => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      currentPage.value = 1
      updateQueryParams()
      fetchContacts()
    }, 500)
  }

  const selectStatus = (status) => {
    selectedStatus.value = status
    currentPage.value = 1
    updateQueryParams()
    fetchContacts()
  }

  const handlePageChange = page => {
    currentPage.value = page
    updateQueryParams()
    fetchContacts()
  }

  const updateQueryParams = () => {
    router.push({
      query: {
        ...route.query,
        page: currentPage.value > 1 ? currentPage.value : undefined,
      },
    })
  }

  // Fetch contacts from API
  const fetchContacts = async () => {
    loading.value = true
    error.value = ''
    try {
      const params = new URLSearchParams({
        page: currentPage.value.toString(),
        limit: limit.toString(),
      })

      if (searchQuery.value) {
        params.append('search', searchQuery.value)
      }

      if (selectedStatus.value !== '') {
        params.append('status', selectedStatus.value)
      }

      const response = await httpRequest.get(`/contact?${params.toString()}`)

      contacts.value = response.data
      pagination.value = {
        total: response.total,
        page: response.page,
        limit: response.limit,
        nextPage: response.nextPage,
        prePage: response.prePage,
      }
    } catch (err) {
      console.error('Error fetching contacts:', err)
      error.value = err?.message || 'Không thể tải danh sách liên hệ.'
      showError(error.value)
    } finally {
      loading.value = false
    }
  }

  // Toggle contact status
  const toggleStatus = async (id, currentStatus) => {
    try {
      await httpRequest.put(`/contact/${id}`, {
        status: !currentStatus,
      })

      // Update local state
      const contact = contacts.value.find(c => c._id === id)
      if (contact) {
        contact.status = !currentStatus
      }
      showNotification('Cập nhật trạng thái thành công!')
    } catch (err) {
      console.error('Error updating contact status:', err)
      showError(err?.message || 'Không thể cập nhật trạng thái.')
    }
  }

  // Delete contact
  const deleteContact = async id => {
    if (confirm('Bạn có chắc chắn muốn xóa liên hệ này?')) {
      try {
        await httpRequest.delete(`/contact/${id}`)

        // Remove from local state
        contacts.value = contacts.value.filter(contact => contact._id !== id)

        // Refresh data if current page is empty
        if (contacts.value.length === 0 && currentPage.value > 1) {
          currentPage.value--
          fetchContacts()
        }
        showNotification('Xóa liên hệ thành công!')
      } catch (err) {
        console.error('Error deleting contact:', err)
        showError(err?.message || 'Không thể xóa liên hệ.')
      }
    }
  }

  // Utility methods
  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Fetch data on mount
  onMounted(() => {
    fetchContacts()
  })
</script>
