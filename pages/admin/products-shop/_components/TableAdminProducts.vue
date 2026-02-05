<template>
  <Table
    :data-source="products"
    :columns="columns"
    :loading="loading"
    empty-text="Không có sản phẩm"
    @row-click="onRowClick"
  >
    <!-- Cell: Info -->
    <template #cell-info="{ record }">
      <div class="flex items-center">
        <div class="mr-3">
          <Avatar
            :src="record.thumbnail"
            :size="40"
            :readOnly="true"
            :ring="false"
          />
        </div>
        <div>
          <div class="text-sm font-bold text-gray-900">
            {{ record.title || 'N/A' }}
          </div>
          <ViewEditor
            :content="record.description || ''"
            variant="default"
            custom-class="text-sm text-gray-500"
            :truncate="true"
            :max-length="100"
          />
        </div>
      </div>
    </template>

    <!-- Cell: Category -->
    <template #cell-category="{ value }">
      <Tag :variant="getCategoryVariant(value)">
        {{ getCategoryLabel(value) || 'N/A' }}
      </Tag>
    </template>

    <!-- Cell: Price -->
    <template #cell-price="{ value }">
      <span class="text-sm font-semibold text-green-600">
        {{ formatPrice(value) }}
      </span>
    </template>

    <!-- Cell: Quantity -->
    <template #cell-quantity="{ value }">
      <span class="text-sm text-gray-600">{{ value || 0 }}</span>
    </template>

    <!-- Cell: Sales -->
    <template #cell-sales="{ value }">
      <span class="text-sm text-blue-600">{{ formatPrice(value) }}</span>
    </template>

    <!-- Cell: Created At -->
    <template #cell-createdAt="{ value }">
      <span class="text-sm text-gray-500">{{ formatDate(value) }}</span>
    </template>

    <!-- Cell: Actions -->
    <template #cell-actions="{ record }">
      <div class="flex items-center gap-2">
        <Button
          size="sm"
          variant="primary"
          @click.stop="editProduct(record._id)"
        >
          <Icon name="edit" size="sm" />
        </Button>
        <Button
          size="sm"
          variant="danger"
          @click.stop="deleteProduct(record._id)"
        >
          <Icon name="delete" size="sm" />
        </Button>
      </div>
    </template>
  </Table>
</template>

<script setup>
  import Table from '~/components/ui/Table.vue'
  import Avatar from '~/components/ui/Avatar.vue'
  import Tag from '~/components/ui/Tag.vue'
  import Button from '~/components/ui/Button.vue'
  import Icon from '~/components/ui/Icon/Icon.vue'
  import ViewEditor from '~/components/ui/ViewEditor.vue'

  const props = defineProps({
    products: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
  })

  const emit = defineEmits(['edit', 'delete'])

  const columns = [
    { key: 'info', title: 'Sản phẩm', dataIndex: 'title' },
    {
      key: 'category',
      title: 'DANH MỤC',
      dataIndex: 'category',
      width: '120px',
    },
    { key: 'price', title: 'GIÁ', dataIndex: 'price', width: '120px' },
    {
      key: 'quantity',
      title: 'SỐ LƯỢNG',
      dataIndex: 'quantity',
      width: '120px',
    },
    { key: 'sales', title: 'DOANH THU', dataIndex: 'sales', width: '120px' },
    {
      key: 'createdAt',
      title: 'NGÀY TẠO',
      dataIndex: 'createdAt',
      width: '160px',
    },
    {
      key: 'actions',
      title: 'THAO TÁC',
      dataIndex: 'actions',
      width: '120px',
    },
  ]

  const formatDate = dateString => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatPrice = price => {
    if (!price) return '0 ₫'
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const categoryConfig = {
    breakfast: {
      label: 'Đồ ăn sáng',
      variant: 'success',
    },
    drink: {
      label: 'Đồ uống',
      variant: 'primary',
    },
  }

  const getCategoryLabel = value => {
    return categoryConfig[value]?.label || value
  }

  const getCategoryVariant = value => {
    return categoryConfig[value]?.variant || 'info'
  }

  const editProduct = id => {
    emit('edit', id)
  }

  const deleteProduct = id => {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      emit('delete', id)
    }
  }

  const onRowClick = () => {}
</script>
