<template>
  <Modal :isOpen="isOpen" @close="$emit('close')" size="2xl">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">
          Chi tiết đơn hàng #{{ order?._id?.slice(-8) }}
        </h3>
        <Tag :variant="getStatusVariant(order?.status)">
          {{ getStatusText(order?.status) }}
        </Tag>
      </div>
    </template>

    <template #body>
      <div v-if="order" class="space-y-6">
        <!-- Customer Information -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h4 class="font-medium text-gray-900 mb-3">Thông tin khách hàng</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium text-gray-600">Họ và tên</label>
              <p class="text-gray-900">{{ order.fullName }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-600"
                >Số điện thoại</label
              >
              <p class="text-gray-900">{{ order.phone }}</p>
            </div>
            <div class="md:col-span-2">
              <label class="text-sm font-medium text-gray-600"
                >Địa chỉ giao hàng</label
              >
              <p class="text-gray-900">{{ order.address }}</p>
            </div>
            <div v-if="order.note" class="md:col-span-2">
              <label class="text-sm font-medium text-gray-600">Ghi chú</label>
              <p class="text-gray-900 bg-white p-2 rounded border">
                {{ order.note }}
              </p>
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div>
          <h4 class="font-medium text-gray-900 mb-3">Sản phẩm đặt hàng</h4>
          <div class="border border-gray-200 rounded-lg overflow-hidden">
            <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <div
                class="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700"
              >
                <div class="col-span-6">Sản phẩm</div>
                <div class="col-span-2">Giá</div>
                <div class="col-span-2">Số lượng</div>
                <div class="col-span-2 text-right">Thành tiền</div>
              </div>
            </div>

            <div
              v-for="item in order.orderItems"
              :key="item._id"
              class="px-4 py-3 border-b border-gray-100 last:border-b-0"
            >
              <div class="grid grid-cols-12 gap-4 items-center">
                <div class="col-span-6 flex items-center gap-3">
                  <img
                    v-if="item.productId?.thumbnail"
                    :src="item.productId.thumbnail"
                    :alt="item.productId.title"
                    class="w-12 h-12 rounded-lg object-cover"
                  />
                  <div class="min-w-0 flex-1">
                    <div class="font-medium text-gray-900 truncate">
                      {{ item.productId?.title || 'N/A' }}
                    </div>
                    <div class="text-sm text-gray-600 truncate">
                      {{ item.productId?.description || 'Không có mô tả' }}
                    </div>
                  </div>
                </div>
                <div class="col-span-2 text-gray-900">
                  {{ formatPrice(item.productId?.price || 0) }}
                </div>
                <div class="col-span-2 text-gray-900">
                  {{ item.quantity }}
                </div>
                <div class="col-span-2 text-right font-semibold text-gray-900">
                  {{
                    formatPrice((item.productId?.price || 0) * item.quantity)
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h4 class="font-medium text-gray-900 mb-3">Tổng kết đơn hàng</h4>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Tổng sản phẩm:</span>
              <span class="text-gray-900">{{ getTotalItems() }} sản phẩm</span>
            </div>
            <div
              class="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2"
            >
              <span class="text-gray-900">Tổng cộng:</span>
              <span class="text-gray-900">{{
                formatPrice(order.totalAmount)
              }}</span>
            </div>
          </div>
        </div>

        <!-- Order Metadata -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h4 class="font-medium text-gray-900 mb-3">Thông tin đơn hàng</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <label class="font-medium text-gray-600">Mã đơn hàng</label>
              <p class="text-gray-900 font-mono">{{ order._id }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600">Trạng thái</label>
              <p class="text-gray-900">{{ getStatusText(order.status) }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600">Ngày tạo</label>
              <p class="text-gray-900">{{ formatDate(order.createdAt) }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600">Cập nhật lần cuối</label>
              <p class="text-gray-900">{{ formatDate(order.updatedAt) }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end gap-3">
        <Button variant="secondary" @click="$emit('close')">
          Đóng
        </Button>
        <Button
          v-if="order?.status === 'pending'"
          variant="success"
          @click="updateStatus('processing')"
        >
          Bắt đầu xử lý
        </Button>
        <Button
          v-if="order?.status === 'processing'"
          variant="success"
          @click="updateStatus('delivered')"
        >
          Xác nhận giao hàng
        </Button>
      </div>
    </template>
  </Modal>
</template>

<script setup>
  import Modal from '~/components/ui/Modal.vue'
  import Button from '~/components/ui/Button.vue'
  import Tag from '~/components/ui/Tag.vue'

  defineProps({
    isOpen: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Object,
      default: null,
    },
  })

  defineEmits(['close', 'updateStatus'])

  // Helper functions
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

  const getTotalItems = () => {
    if (!order?.orderItems) return 0
    return order.orderItems.reduce(
      (total, item) => total + (item.quantity || 0),
      0
    )
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

  const updateStatus = newStatus => {
    // Emit event để parent component xử lý
    // Parent sẽ gọi API để update status
    console.log('Updating order status to:', newStatus)
  }
</script>
