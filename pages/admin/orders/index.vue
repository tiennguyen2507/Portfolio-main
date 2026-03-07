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

    <ErrorCommon v-if="error" :message="error" @retry="fetchOrders" />

    <Loading v-if="loading" size="md" color="orange" />

    <!-- Content -->
    <div v-if="!loading">
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

      <!-- Orders Card Grid -->
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <li v-for="order in paginatedOrders" :key="order._id" class="list-none">
          <Card variant="default" padding="md" hover class="h-full flex flex-col">
            <div class="space-y-2">
              <Typography as="p" size="sm" weight="semibold">
                {{ order.fullName }}
              </Typography>
              <Typography as="p" size="xs" color="muted">
                {{ order.phone }}
              </Typography>
              <Typography as="p" size="xs" color="tertiary" class="line-clamp-2">
                {{ order.address }}
              </Typography>
              <div
                v-if="order.note"
                class="p-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg"
              >
                <Typography as="span" size="xs" color="default">
                  Ghi chú: {{ order.note }}
                </Typography>
              </div>
            </div>
            <div class="mt-3 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <Typography as="span" size="xs" weight="medium">
                {{ order.orderItems?.length || 0 }} sản phẩm
              </Typography>
              <div v-if="order.orderItems?.length" class="mt-1 space-y-0.5">
                <Typography
                  v-for="(item, idx) in order.orderItems.slice(0, 2)"
                  :key="idx"
                  as="p"
                  size="xs"
                  color="muted"
                >
                  {{ item.productId?.title || 'N/A' }} × {{ item.quantity }}
                </Typography>
              </div>
            </div>
            <div class="mt-3 flex flex-wrap items-center gap-2">
              <Typography as="span" size="sm" weight="bold">
                {{ formatPrice(order.totalAmount) }}
              </Typography>
              <Tag :variant="getOrderStatusVariant(order.status)" size="xs">
                {{ getOrderStatusText(order.status) }}
              </Tag>
              <Typography as="span" size="xs" color="tertiary">
                {{ formatDate(order.createdAt) }}
              </Typography>
            </div>
            <div class="mt-3 flex flex-wrap gap-2">
              <Button size="xs" variant="primary" @click="viewOrder(order)">
                Xem chi tiết
              </Button>
              <Button
                v-if="order.status === 'pending'"
                size="xs"
                variant="success"
                @click="updateOrderStatus(order._id, 'confirmed')"
              >
                Xác nhận
              </Button>
              <Button
                v-if="order.status === 'confirmed'"
                size="xs"
                variant="primary"
                @click="updateOrderStatus(order._id, 'shipped')"
              >
                Giao hàng
              </Button>
              <Button
                v-if="order.status === 'shipped'"
                size="xs"
                variant="success"
                @click="updateOrderStatus(order._id, 'delivered')"
              >
                Đã giao
              </Button>
              <Button
                v-if="['pending', 'confirmed', 'shipped'].includes(order.status)"
                size="xs"
                variant="danger"
                @click="updateOrderStatus(order._id, 'cancelled')"
              >
                Hủy
              </Button>
            </div>
          </Card>
        </li>
      </ul>

      <!-- Pagination -->
      <div
        v-if="!error && filteredOrders.length > 0"
        class="mt-8 bg-white dark:bg-[#050505] rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 px-6 py-4 hover:shadow-lg transition-shadow duration-300"
      >
        <Pagination
          :page="currentPage"
          :total="filteredOrders.length"
          :limit="itemsPerPage"
          :show-info="true"
          :split="true"
          @update:page="handlePageChange"
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
  import Card from '~/components/ui/Card.vue'
  import Typography from '~/components/ui/Typography.vue'
  import ModalOrderDetail from './_components/ModalOrderDetail.vue'
  import ErrorCommon from '~/components/common/Admin/ErrorCommon.vue'
  import { useNotification } from '~/composables/useNotification'

  // Route and Router
  const route = useRoute()
  const router = useRouter()

  definePageMeta({
    layout: 'admin',
    middleware: 'auth',
  })

  const { showNotification, showError } = useNotification()

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
      error.value = err?.message || 'Có lỗi xảy ra khi tải danh sách đơn hàng'
      showError(error.value)
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

  const handlePageChange = p => {
    currentPage.value = p
    updateQueryParams()
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

      showNotification(`Cập nhật trạng thái đơn hàng thành công: ${newStatus}`)
    } catch (err) {
      console.error('Error updating order status:', err)
      showError(err?.message || 'Có lỗi xảy ra khi cập nhật trạng thái đơn hàng')
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

  const getOrderStatusVariant = status => {
    const map = {
      pending: 'warning',
      confirmed: 'info',
      shipped: 'primary',
      delivered: 'success',
      cancelled: 'danger',
    }
    return map[status] || 'default'
  }

  const getOrderStatusText = status => {
    const map = {
      pending: 'Chờ xác nhận',
      confirmed: 'Đã xác nhận',
      shipped: 'Đang giao hàng',
      delivered: 'Đã giao hàng',
      cancelled: 'Đã hủy',
    }
    return map[status] || status
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
