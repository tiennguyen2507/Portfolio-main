<template>
  <div>
    <!-- Page Header -->
    <HeaderContent
      title="Quản lý Đơn hàng"
      subtitle="Theo dõi và quản lý tất cả đơn hàng từ khách hàng"
    >
      <template #action>
        <Button variant="secondary" size="md" @click="refreshOrders">
          <span class="inline-flex items-center gap-2">
            <span>Làm mới</span>
            <Icon name="refresh" size="md" color="text-white" />
          </span>
        </Button>
      </template>
    </HeaderContent>

    <!-- Loading State -->
    <div
      v-if="loading"
      class="bg-white dark:bg-[#050505] rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-8"
    >
      <Loading size="lg" />
    </div>

    <!-- Content -->
    <div v-else>
      <!-- Filters -->
      <div
        class="bg-white dark:bg-[#050505] p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 mb-6"
      >
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Input
              v-model="searchQuery"
              label="Tìm kiếm"
              type="text"
              placeholder="Tìm theo tên khách hàng..."
              size="md"
            />
          </div>
          <div>
            <Input
              v-model="dateRange"
              label="Khoảng thời gian"
              type="date"
              placeholder="Chọn ngày"
              size="md"
            />
          </div>
          <div class="flex items-end">
            <Button fullWidth size="md" variant="primary" @click="applyFilters">
              Lọc
            </Button>
          </div>
        </div>
      </div>

      <!-- Status Tags -->
      <div
        class="bg-white dark:bg-[#050505] p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 mb-6"
      >
        <div class="flex flex-wrap gap-3">
          <!-- Tất cả -->
          <Tag
            :variant="selectedStatus === '' ? 'primary' : 'gray'"
            size="md"
            class="cursor-pointer hover:opacity-80 transition-opacity"
            @click="selectStatus('')"
          >
            Tất cả
          </Tag>

          <!-- Chờ xác nhận -->
          <Tag
            :variant="selectedStatus === 'pending' ? 'warning' : 'gray'"
            size="md"
            class="cursor-pointer hover:opacity-80 transition-opacity"
            @click="selectStatus('pending')"
          >
            Chờ xác nhận
          </Tag>

          <!-- Đã xác nhận -->
          <Tag
            :variant="selectedStatus === 'confirmed' ? 'info' : 'gray'"
            size="md"
            class="cursor-pointer hover:opacity-80 transition-opacity"
            @click="selectStatus('confirmed')"
          >
            Đã xác nhận
          </Tag>

          <!-- Đang giao hàng -->
          <Tag
            :variant="selectedStatus === 'shipped' ? 'primary' : 'gray'"
            size="md"
            class="cursor-pointer hover:opacity-80 transition-opacity"
            @click="selectStatus('shipped')"
          >
            Đang giao hàng
          </Tag>

          <!-- Đã giao hàng -->
          <Tag
            :variant="selectedStatus === 'delivered' ? 'success' : 'gray'"
            size="md"
            class="cursor-pointer hover:opacity-80 transition-opacity"
            @click="selectStatus('delivered')"
          >
            Đã giao hàng
          </Tag>

          <!-- Đã hủy -->
          <Tag
            :variant="selectedStatus === 'cancelled' ? 'danger' : 'gray'"
            size="md"
            class="cursor-pointer hover:opacity-80 transition-opacity"
            @click="selectStatus('cancelled')"
          >
            Đã hủy
          </Tag>
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
      <div class="bg-white dark:bg-[#050505] px-6 py-3 border-t border-gray-200 dark:border-gray-800">
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
  import HeaderContent from '~/components/common/Admin/HeaderContent.vue'
  import Loading from '~/components/ui/Loading.vue'
  import Pagination from '~/components/ui/Pagination.vue'
  import Input from '~/components/ui/Input/Input.vue'
  import Button from '~/components/ui/Button.vue'
  import Tag from '~/components/ui/Tag.vue'
  import Icon from '~/components/ui/Icon/Icon.vue'
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
