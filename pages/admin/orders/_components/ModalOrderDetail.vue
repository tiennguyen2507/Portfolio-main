<template>
  <Modal :isOpen="isOpen" @close="$emit('close')" size="2xl">
    <template #header>
      <div class="flex items-center justify-between">
        <Typography as="h3" size="lg" weight="semibold" color="default">
          Chi tiết đơn hàng #{{ order?._id?.slice(-8) }}
        </Typography>
        <Tag :variant="getStatusVariant(order?.status)">
          {{ getStatusText(order?.status) }}
        </Tag>
      </div>
    </template>

    <template #body>
      <div v-if="order" class="space-y-6">
        <!-- Customer Information -->
        <div class="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
          <Typography as="h4" size="md" weight="medium" color="default" class="mb-3">
            Thông tin khách hàng
          </Typography>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Typography as="label" size="sm" weight="medium" color="muted" class="block">
                Họ và tên
              </Typography>
              <Typography as="p" size="sm" color="default" class="mt-1">
                {{ order.fullName }}
              </Typography>
            </div>
            <div>
              <Typography as="label" size="sm" weight="medium" color="muted" class="block">
                Số điện thoại
              </Typography>
              <Typography as="p" size="sm" color="default" class="mt-1">
                {{ order.phone }}
              </Typography>
            </div>
            <div class="md:col-span-2">
              <Typography as="label" size="sm" weight="medium" color="muted" class="block">
                Địa chỉ giao hàng
              </Typography>
              <Typography as="p" size="sm" color="default" class="mt-1">
                {{ order.address }}
              </Typography>
            </div>
            <div v-if="order.note" class="md:col-span-2">
              <Typography as="label" size="sm" weight="medium" color="muted" class="block">
                Ghi chú
              </Typography>
              <Typography
                as="p"
                size="sm"
                color="default"
                class="bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700 mt-1"
              >
                {{ order.note }}
              </Typography>
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div>
          <Typography as="h4" size="md" weight="medium" color="default" class="mb-3">
            Sản phẩm đặt hàng
          </Typography>
          <div class="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
            <div class="bg-gray-50 dark:bg-gray-900/50 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
              <div class="grid grid-cols-12 gap-4">
                <Typography as="div" size="sm" weight="medium" color="muted" class="col-span-6">
                  Sản phẩm
                </Typography>
                <Typography as="div" size="sm" weight="medium" color="muted" class="col-span-2">
                  Giá
                </Typography>
                <Typography as="div" size="sm" weight="medium" color="muted" class="col-span-2">
                  Số lượng
                </Typography>
                <Typography
                  as="div"
                  size="sm"
                  weight="medium"
                  color="muted"
                  class="col-span-2 text-right"
                >
                  Thành tiền
                </Typography>
              </div>
            </div>

            <div
              v-for="item in order.orderItems"
              :key="item._id"
              class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 last:border-b-0 bg-white dark:bg-[#050505]"
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
                    <Typography as="div" size="sm" weight="medium" color="default" class="truncate">
                      {{ item.productId?.title || 'N/A' }}
                    </Typography>
                    <Typography as="div" size="xs" color="muted" class="truncate">
                      {{ item.productId?.description || 'Không có mô tả' }}
                    </Typography>
                  </div>
                </div>
                <div class="col-span-2">
                  <Typography as="span" size="sm" color="default">
                    {{ formatPrice(item.productId?.price || 0) }}
                  </Typography>
                </div>
                <div class="col-span-2">
                  <Typography as="span" size="sm" color="default">
                    {{ item.quantity }}
                  </Typography>
                </div>
                <div class="col-span-2 text-right">
                  <Typography as="span" size="sm" weight="semibold" color="default">
                    {{ formatPrice((item.productId?.price || 0) * item.quantity) }}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
          <Typography as="h4" size="md" weight="medium" color="default" class="mb-3">
            Tổng kết đơn hàng
          </Typography>
          <div class="space-y-2">
            <div class="flex justify-between">
              <Typography as="span" size="sm" color="muted">Tổng sản phẩm:</Typography>
              <Typography as="span" size="sm" color="default">
                {{ getTotalItems() }} sản phẩm
              </Typography>
            </div>
            <div class="flex justify-between border-t border-gray-200 dark:border-gray-800 pt-2">
              <Typography as="span" size="lg" weight="semibold" color="default">
                Tổng cộng:
              </Typography>
              <Typography as="span" size="lg" weight="semibold" color="default">
                {{ formatPrice(order.totalAmount) }}
              </Typography>
            </div>
          </div>
        </div>

        <!-- Order Metadata -->
        <div class="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
          <Typography as="h4" size="md" weight="medium" color="default" class="mb-3">
            Thông tin đơn hàng
          </Typography>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Typography as="label" size="sm" weight="medium" color="muted" class="block">
                Mã đơn hàng
              </Typography>
              <Typography as="p" size="sm" color="default" class="font-mono mt-1">
                {{ order._id }}
              </Typography>
            </div>
            <div>
              <Typography as="label" size="sm" weight="medium" color="muted" class="block">
                Trạng thái
              </Typography>
              <Typography as="p" size="sm" color="default" class="mt-1">
                {{ getStatusText(order.status) }}
              </Typography>
            </div>
            <div>
              <Typography as="label" size="sm" weight="medium" color="muted" class="block">
                Ngày tạo
              </Typography>
              <Typography as="p" size="sm" color="default" class="mt-1">
                {{ formatDate(order.createdAt) }}
              </Typography>
            </div>
            <div>
              <Typography as="label" size="sm" weight="medium" color="muted" class="block">
                Cập nhật lần cuối
              </Typography>
              <Typography as="p" size="sm" color="default" class="mt-1">
                {{ formatDate(order.updatedAt) }}
              </Typography>
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
  import Typography from '~/components/ui/Typography.vue'

  const props = defineProps({
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

  const order = computed(() => props.order)

  const getTotalItems = () => {
    if (!order.value?.orderItems) return 0
    return order.value.orderItems.reduce(
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
