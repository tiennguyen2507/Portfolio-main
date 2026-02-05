<template>
  <Table
    :dataSource="orders"
    :columns="columns"
    :loading="loading"
    loadingText="Đang tải danh sách đơn hàng..."
    emptyText="Không có đơn hàng nào."
    @row-click="handleRowClick"
  >
    <!-- Custom cell for customer info -->
    <template #cell-customer="{ record }">
      <div class="space-y-2">
        <!-- Customer Name -->
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
          <div class="font-semibold text-gray-900 text-sm">
            Khách hàng: {{ record.fullName }}
          </div>
        </div>

        <!-- Phone Number -->
        <div class="flex items-center gap-2 ml-4">
          <div class="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
          <div class="text-sm text-gray-600">
            Số điện thoại: {{ record.phone }}
          </div>
        </div>

        <!-- Address -->
        <div class="flex items-start gap-2 ml-4">
          <div class="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5"></div>
          <div
            class="text-xs text-gray-500 max-w-[180px] leading-relaxed"
            :title="record.address"
          >
            Địa chỉ: {{ record.address }}
          </div>
        </div>

        <!-- Note (if exists) -->
        <div
          v-if="record.note"
          class="ml-4 mt-3 p-2 bg-amber-50 border border-amber-200 rounded-lg"
        >
          <div class="flex items-start gap-2">
            <div
              class="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"
            ></div>
            <div class="text-xs text-amber-800">
              <span class="font-medium">Ghi chú:</span> {{ record.note }}
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Custom cell for products -->
    <template #cell-products="{ record }">
      <div
        class="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-blue-300 transition-colors"
      >
        <!-- Product Count Badge -->
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span
              class="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded-full"
            >
              {{ record.orderItems?.length || 0 }} sản phẩm
            </span>
          </div>
        </div>

        <!-- Product Summary -->
        <div class="space-y-1">
          <!-- Show first 2 products in detail -->
          <div
            v-if="record.orderItems && record.orderItems.length > 0"
            class="mt-2 space-y-1"
          >
            <div
              v-for="(item, index) in record.orderItems.slice(0, 2)"
              :key="index"
              class="flex items-center gap-2 text-xs"
            >
              <div class="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              <span class="text-gray-700 font-medium">
                {{ item.productId?.title || 'N/A' }}
              </span>
              <span class="text-gray-500">×</span>
              <span class="text-gray-600 font-semibold">
                {{ item.quantity }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Custom cell for total amount -->
    <template #cell-totalAmount="{ record }">
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
        <div class="font-bold text-lg text-gray-900">
          {{ formatPrice(record.totalAmount) }}
        </div>
      </div>
    </template>

    <!-- Custom cell for status -->
    <template #cell-status="{ record }">
      <Tag :variant="getStatusVariant(record.status)">
        {{ getStatusText(record.status) }}
      </Tag>
    </template>

    <!-- Custom cell for created date -->
    <template #cell-createdAt="{ record }">
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 bg-indigo-500 rounded-full"></div>
        <div class="text-sm text-gray-900">
          {{ formatDate(record.createdAt) }}
        </div>
      </div>
    </template>

    <!-- Custom cell for actions -->
    <template #cell-actions="{ record }">
      <div class="flex flex-col gap-2">
        <!-- Xác nhận button - chỉ hiển thị khi status là pending -->
        <Button
          v-if="record.status === 'pending'"
          variant="success"
          size="sm"
          @click="$emit('updateStatus', record._id, 'confirmed')"
          class="w-full text-xs"
        >
          Xác nhận
        </Button>

        <!-- Giao hàng button - hiển thị khi status là confirmed -->
        <Button
          v-if="record.status === 'confirmed'"
          variant="primary"
          size="sm"
          @click="$emit('updateStatus', record._id, 'shipped')"
          class="w-full text-xs"
        >
          Giao hàng
        </Button>

        <!-- Đã giao hàng button - hiển thị khi status là shipped -->
        <Button
          v-if="record.status === 'shipped'"
          variant="success"
          size="sm"
          @click="$emit('updateStatus', record._id, 'delivered')"
          class="w-full text-xs"
        >
          Đã giao hàng
        </Button>

        <!-- Hủy bỏ button - hiển thị khi status là pending, confirmed hoặc shipped -->
        <Button
          v-if="['pending', 'confirmed', 'shipped'].includes(record.status)"
          variant="danger"
          size="sm"
          @click="$emit('updateStatus', record._id, 'cancelled')"
          class="w-full text-xs"
        >
          Hủy bỏ
        </Button>
      </div>
    </template>
  </Table>
</template>

<script setup>
  import Table from '~/components/ui/Table.vue'
  import Button from '~/components/ui/Button.vue'
  import Tag from '~/components/ui/Tag.vue'

  defineProps({
    orders: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  })

  defineEmits(['view', 'updateStatus'])

  // Status options for select
  const statusOptions = [
    { label: 'Chờ xác nhận', value: 'pending' },
    { label: 'Đã xác nhận', value: 'confirmed' },
    { label: 'Đang giao hàng', value: 'shipped' },
    { label: 'Đã giao hàng', value: 'delivered' },
    { label: 'Đã hủy', value: 'cancelled' },
  ]

  // Table columns configuration
  const columns = [
    {
      title: 'Khách hàng',
      key: 'customer',
      dataIndex: 'customer',
      width: '25%',
    },
    {
      title: 'Sản phẩm',
      key: 'products',
      dataIndex: 'products',
      width: '20%',
    },
    {
      title: 'Tổng tiền',
      key: 'totalAmount',
      dataIndex: 'totalAmount',
      width: '15%',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      width: '12%',
    },
    {
      title: 'Ngày tạo',
      key: 'createdAt',
      dataIndex: 'createdAt',
      width: '15%',
    },
    {
      title: 'Thao tác',
      key: 'actions',
      dataIndex: 'actions',
      width: '18%',
    },
  ]

  // Helper functions
  const getProductSummary = orderItems => {
    if (!orderItems || !orderItems.length) return 'Không có sản phẩm'

    const firstItem = orderItems[0]
    if (orderItems.length === 1) {
      return `${firstItem.productId?.title || 'N/A'} × ${firstItem.quantity}`
    }

    return `${firstItem.productId?.title || 'N/A'} × ${firstItem.quantity} +${orderItems.length - 1} sản phẩm khác`
  }

  const getStatusVariant = status => {
    const variants = {
      pending: 'warning',
      confirmed: 'info',
      shipped: 'primary',
      delivered: 'success',
      cancelled: 'danger',
    }
    return variants[status] || 'default'
  }

  const getStatusText = status => {
    const texts = {
      pending: 'Chờ xác nhận',
      confirmed: 'Đã xác nhận',
      shipped: 'Đang giao hàng',
      delivered: 'Đã giao hàng',
      cancelled: 'Đã hủy',
    }
    return texts[status] || status
  }

  const formatPrice = price => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = dateString => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${day}/${month}/${year} ${hours}:${minutes}`
  }

  // Handle row click
  const handleRowClick = ({ record }) => {
    $emit('view', record)
  }
</script>
