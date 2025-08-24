<template>
  <div>
    <!-- Page Header -->
    <HeaderContent
      title="Quản lý Đơn hàng"
      subtitle="Theo dõi và quản lý tất cả đơn hàng từ khách hàng"
    >
      <template #action>
        <AdminUiButton variant="secondary" size="md" @click="refreshOrders">
          Làm mới
          <template #suffix>
            <AdminUiIcon name="refresh" size="md" color="text-white" />
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
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <AdminUiInput
              v-model="searchQuery"
              label="Tìm kiếm"
              type="text"
              placeholder="Tìm theo tên khách hàng..."
            />
          </div>
          <div>
            <AdminUiInput
              v-model="dateRange"
              label="Khoảng thời gian"
              type="date"
              placeholder="Chọn ngày"
            />
          </div>
          <div class="flex items-end">
            <AdminUiButton fullWidth @click="applyFilters"> Lọc </AdminUiButton>
          </div>
        </div>
      </div>

      <!-- Status Tags -->
      <div
        class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6"
      >
        <div class="flex flex-wrap gap-3">
          <!-- Tất cả -->
          <AdminUiTag
            :variant="selectedStatus === '' ? 'primary' : 'gray'"
            size="md"
            class="cursor-pointer hover:opacity-80 transition-opacity"
            @click="selectStatus('')"
          >
            Tất cả
          </AdminUiTag>

          <!-- Chờ xác nhận -->
          <AdminUiTag
            :variant="selectedStatus === 'pending' ? 'warning' : 'gray'"
            size="md"
            class="cursor-pointer hover:opacity-80 transition-opacity"
            @click="selectStatus('pending')"
          >
            Chờ xác nhận
          </AdminUiTag>

          <!-- Đã xác nhận -->
          <AdminUiTag
            :variant="selectedStatus === 'confirmed' ? 'info' : 'gray'"
            size="md"
            class="cursor-pointer hover:opacity-80 transition-opacity"
            @click="selectStatus('confirmed')"
          >
            Đã xác nhận
          </AdminUiTag>

          <!-- Đang giao hàng -->
          <AdminUiTag
            :variant="selectedStatus === 'shipped' ? 'primary' : 'gray'"
            size="md"
            class="cursor-pointer hover:opacity-80 transition-opacity"
            @click="selectStatus('shipped')"
          >
            Đang giao hàng
          </AdminUiTag>

          <!-- Đã giao hàng -->
          <AdminUiTag
            :variant="selectedStatus === 'delivered' ? 'success' : 'gray'"
            size="md"
            class="cursor-pointer hover:opacity-80 transition-opacity"
            @click="selectStatus('delivered')"
          >
            Đã giao hàng
          </AdminUiTag>

          <!-- Đã hủy -->
          <AdminUiTag
            :variant="selectedStatus === 'cancelled' ? 'danger' : 'gray'"
            size="md"
            class="cursor-pointer hover:opacity-80 transition-opacity"
            @click="selectStatus('cancelled')"
          >
            Đã hủy
          </AdminUiTag>
        </div>
      </div>

      <!-- Orders Table -->
      <TableAdminOrders
        :orders="paginatedOrders"
        :loading="loading"
        @view="viewOrder"
        @updateStatus="updateOrderStatus"
      />

      <!-- Pagination -->
      <div class="bg-white px-6 py-3 border-t border-gray-200">
        <Pagination
          :page="currentPage"
          :total="filteredOrders.length"
          :limit="itemsPerPage"
          :show-info="true"
          :split="true"
          @update:page="
            p => {
              currentPage = p
              updateQueryParams()
            }
          "
        />
      </div>
    </div>

    <!-- Order Detail Modal -->
    <ModalOrderDetail
      v-if="showOrderModal"
      :isOpen="showOrderModal"
      :order="selectedOrder"
      @close="closeOrderModal"
    />
  </div>
</template>

<script setup>
  import { httpRequest } from '~/utils/httpRequest'
  import HeaderContent from '~/components/admin/HeaderContent.vue'
  import Loading from '~/components/ui/Loading.vue'
  import Pagination from '~/components/ui/Pagination.vue'
  import AdminUiInput from '~/components/admin/ui/AdminUiInput.vue'
  import AdminUiButton from '~/components/admin/ui/AdminUiButton.vue'
  import AdminUiTag from '~/components/admin/ui/AdminUiTag.vue'
  import AdminUiIcon from '~/components/admin/ui/AdminUiIcon.vue'
  import TableAdminOrders from './_components/TableAdminOrders.vue'
  import ModalOrderDetail from './_components/ModalOrderDetail.vue'

  // Route and Router
  const route = useRoute()
  const router = useRouter()

  definePageMeta({
    layout: 'admin',
    middleware: 'auth',
  })

  // Reactive data - initialize from query params
  const searchQuery = ref(route.query.search || '')
  const selectedStatus = ref(route.query.status || '')
  const dateRange = ref(
    route.query.date || new Date().toISOString().split('T')[0]
  )
  const currentPage = ref(parseInt(route.query.page) || 1)
  const itemsPerPage = 10
  const loading = ref(true)
  const error = ref(null)
  const orders = ref([])

  // Modal state
  const showOrderModal = ref(false)
  const selectedOrder = ref(null)

  // Computed properties
  const filteredOrders = computed(() => {
    let filtered = orders.value

    if (searchQuery.value) {
      filtered = filtered.filter(
        order =>
          (order.fullName &&
            order.fullName
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase())) ||
          (order.phone && order.phone.includes(searchQuery.value)) ||
          (order.address &&
            order.address
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase()))
      )
    }

    if (selectedStatus.value !== '') {
      filtered = filtered.filter(order => order.status === selectedStatus.value)
    }

    if (dateRange.value) {
      const selectedDate = new Date(dateRange.value)
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.createdAt)
        return orderDate.toDateString() === selectedDate.toDateString()
      })
    }

    return filtered
  })

  const totalPages = computed(() =>
    Math.ceil(filteredOrders.value.length / itemsPerPage)
  )
  const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
  const endIndex = computed(() =>
    Math.min(startIndex.value + itemsPerPage, filteredOrders.value.length)
  )

  const paginatedOrders = computed(() => {
    return filteredOrders.value.slice(startIndex.value, endIndex.value)
  })

  // Methods
  const fetchOrders = async () => {
    loading.value = true
    error.value = null

    try {
      // Lấy tất cả orders
      const response = await httpRequest.get('/orders?page=1&limit=100')

      if (response && response.data) {
        orders.value = response.data
        console.log('Orders fetched:', orders.value)
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err) {
      console.error('Error fetching orders:', err)
      error.value = err.message || 'Có lỗi xảy ra khi tải danh sách đơn hàng'
      orders.value = []
    } finally {
      loading.value = false
    }
  }

  const refreshOrders = () => {
    // Reset to first page and clear filters
    currentPage.value = 1
    searchQuery.value = ''
    selectedStatus.value = ''
    dateRange.value = new Date().toISOString().split('T')[0]

    // Update query params
    updateQueryParams()

    // Fetch orders
    fetchOrders()
  }

  const applyFilters = () => {
    currentPage.value = 1
    updateQueryParams()
  }

  const selectStatus = status => {
    selectedStatus.value = status
    currentPage.value = 1
    updateQueryParams()
  }

  const updateQueryParams = () => {
    const query = {
      search: searchQuery.value || undefined,
      status: selectedStatus.value || undefined,
      date: dateRange.value || undefined,
      page: currentPage.value > 1 ? currentPage.value : undefined,
    }

    // Remove undefined values
    Object.keys(query).forEach(key => {
      if (query[key] === undefined) {
        delete query[key]
      }
    })

    // Update URL without reloading the page
    router.push({ query })
  }

  const viewOrder = order => {
    selectedOrder.value = order
    showOrderModal.value = true
  }

  const closeOrderModal = () => {
    showOrderModal.value = false
    selectedOrder.value = null
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await httpRequest.patch(`/orders/${orderId}`, {
        status: newStatus,
      })

      // Update local state
      const orderIndex = orders.value.findIndex(order => order._id === orderId)
      if (orderIndex !== -1) {
        orders.value[orderIndex].status = newStatus
      }

      alert(`Cập nhật trạng thái đơn hàng thành công: ${newStatus}`)
    } catch (err) {
      console.error('Error updating order status:', err)
      alert('Có lỗi xảy ra khi cập nhật trạng thái đơn hàng')
    }
  }

  const formatDate = dateString => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = date.toLocaleDateString('vi-VN', { month: 'short' })
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${day} ${month}, ${year} ${hours}:${minutes}`
  }

  const formatPrice = price => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Watchers for auto-updating query params
  watch(searchQuery, () => {
    updateQueryParams()
  })

  watch(dateRange, () => {
    updateQueryParams()
  })

  // Lifecycle
  onMounted(() => {
    fetchOrders()
  })
</script>
