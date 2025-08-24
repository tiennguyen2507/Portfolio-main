<template>
  <div
    class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
  >
    <!-- Table Header -->
    <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
      <div class="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
        <div class="col-span-3">Khách hàng</div>
        <div class="col-span-2">Sản phẩm</div>
        <div class="col-span-2">Tổng tiền</div>
        <div class="col-span-2">Trạng thái</div>
        <div class="col-span-2">Ngày tạo</div>
        <div class="col-span-1">Thao tác</div>
      </div>
    </div>

    <!-- Table Body -->
    <div v-if="!orders.length" class="px-6 py-12 text-center text-gray-500">
      Không có đơn hàng nào.
    </div>

    <div v-else>
      <div
        v-for="order in orders"
        :key="order._id"
        class="px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
      >
        <div class="grid grid-cols-12 gap-4 items-center">
          <!-- Customer Info -->
          <div class="col-span-3">
            <div class="font-medium text-gray-900">{{ order.fullName }}</div>
            <div class="text-sm text-gray-600">{{ order.phone }}</div>
            <div
              class="text-xs text-gray-500 truncate max-w-[200px]"
              :title="order.address"
            >
              {{ order.address }}
            </div>
          </div>

          <!-- Products -->
          <div class="col-span-2">
            <div class="text-sm text-gray-900">
              {{ order.orderItems?.length || 0 }} sản phẩm
            </div>
            <div class="text-xs text-gray-600">
              {{ getProductSummary(order.orderItems) }}
            </div>
          </div>

          <!-- Total Amount -->
          <div class="col-span-2">
            <div class="font-semibold text-gray-900">
              {{ formatPrice(order.totalAmount) }}
            </div>
          </div>

          <!-- Status -->
          <div class="col-span-2">
            <AdminUiTag
              :variant="getStatusVariant(order.status)"
              :text="getStatusText(order.status)"
            />
          </div>

          <!-- Created Date -->
          <div class="col-span-2">
            <div class="text-sm text-gray-900">
              {{ formatDate(order.createdAt) }}
            </div>
          </div>

          <!-- Actions -->
          <div class="col-span-1">
            <div class="flex items-center gap-2">
              <AdminUiButton
                variant="ghost"
                size="sm"
                @click="$emit('view', order)"
                title="Xem chi tiết"
              >
                <AdminUiIcon name="eye" size="sm" />
              </AdminUiButton>

              <AdminUiSelect
                v-model="order.status"
                size="sm"
                :options="[
                  { label: 'Chờ xử lý', value: 'pending' },
                  { label: 'Đang xử lý', value: 'processing' },
                  { label: 'Đã giao hàng', value: 'delivered' },
                  { label: 'Đã hủy', value: 'cancelled' },
                ]"
                @update:modelValue="
                  newStatus => $emit('updateStatus', order._id, newStatus)
                "
              />
            </div>
          </div>
        </div>

        <!-- Note (if exists) -->
        <div
          v-if="order.note"
          class="mt-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded"
        >
          <span class="font-medium">Ghi chú:</span> {{ order.note }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import AdminUiButton from '~/components/admin/ui/AdminUiButton.vue'
  import AdminUiIcon from '~/components/admin/ui/AdminUiIcon.vue'
  import AdminUiSelect from '~/components/admin/ui/AdminUiSelect.vue'
  import AdminUiTag from '~/components/admin/ui/AdminUiTag.vue'

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
      processing: 'info',
      delivered: 'success',
      cancelled: 'danger',
    }
    return variants[status] || 'default'
  }

  const getStatusText = status => {
    const texts = {
      pending: 'Chờ xử lý',
      processing: 'Đang xử lý',
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
</script>
