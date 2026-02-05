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
          <div class="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
          <Typography as="span" size="sm" weight="semibold" color="default">
            Khách hàng: {{ record.fullName }}
          </Typography>
        </div>

        <!-- Phone Number -->
        <div class="flex items-center gap-2 ml-4">
          <div class="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
          <Typography as="span" size="sm" color="muted">
            Số điện thoại: {{ record.phone }}
          </Typography>
        </div>

        <!-- Address -->
        <div class="flex items-start gap-2 ml-4">
          <div class="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full mt-1.5"></div>
          <Typography
            as="span"
            size="xxs"
            color="tertiary"
            class="max-w-[180px]"
            :title="record.address"
          >
            Địa chỉ: {{ record.address }}
          </Typography>
        </div>

        <!-- Note (if exists) -->
        <div
          v-if="record.note"
          class="ml-4 mt-3 p-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg"
        >
          <div class="flex items-start gap-2">
            <div
              class="w-1.5 h-1.5 bg-amber-500 dark:bg-amber-400 rounded-full mt-1.5 flex-shrink-0"
            ></div>
            <Typography as="span" size="xxs" color="warning">
              <span class="font-medium">Ghi chú:</span> {{ record.note }}
            </Typography>
          </div>
        </div>
      </div>
    </template>

    <!-- Custom cell for products -->
    <template #cell-products="{ record }">
      <div
        class="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
      >
        <!-- Product Count Badge -->
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
            <span
              class="text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full"
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
              class="flex items-center gap-2"
            >
              <div class="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
              <Typography as="span" size="xxs" weight="medium" color="default">
                {{ item.productId?.title || 'N/A' }}
              </Typography>
              <Typography as="span" size="xxs" color="tertiary">×</Typography>
              <Typography as="span" size="xxs" weight="semibold" color="muted">
                {{ item.quantity }}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Custom cell for total amount -->
    <template #cell-totalAmount="{ record }">
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full"></div>
        <Typography as="span" size="lg" weight="bold" color="default">
          {{ formatPrice(record.totalAmount) }}
        </Typography>
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
        <div class="w-2 h-2 bg-indigo-500 dark:bg-indigo-400 rounded-full"></div>
        <Typography as="span" size="sm" color="default">
          {{ formatDate(record.createdAt) }}
        </Typography>
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
  import Typography from '~/components/ui/Typography.vue'

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
