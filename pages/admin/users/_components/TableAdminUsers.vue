<template>
  <AdminUiTable
    :data-source="users"
    :columns="columns"
    :loading="loading"
    empty-text="Không có users"
    @row-click="onRowClick"
  >
    <!-- Cell: Info -->
    <template #cell-info="{ record }">
      <div class="flex items-center">
        <div class="mr-3">
          <AdminUiAvatar
            :src="record.avatar"
            :size="40"
            :read-only="true"
            :ring="false"
          />
        </div>
        <div>
          <div class="text-sm font-bold text-gray-900">
            {{ record.fullName || 'N/A' }}
          </div>
          <div class="text-sm text-gray-500">{{ record.email }}</div>
        </div>
      </div>
    </template>

    <!-- Cell: Source -->
    <template #cell-source="{ value }">
      <AdminUiTag variant="info">
        {{ value || 'Website' }}
      </AdminUiTag>
    </template>

    <!-- Cell: Status -->
    <template #cell-status="{ value }">
      <AdminUiTag :variant="value === 1 ? 'success' : 'gray'">
        {{ value === 1 ? 'Hoạt động' : 'Mới' }}
      </AdminUiTag>
    </template>

    <!-- Cell: Created At -->
    <template #cell-createdAt="{ value }">
      <span class="text-sm text-gray-500">{{ formatDate(value) }}</span>
    </template>
  </AdminUiTable>
</template>

<script setup>
  import AdminUiTable from '~/components/admin/ui/AdminUiTable.vue'
  import AdminUiAvatar from '~/components/admin/ui/AdminUiAvatar.vue'
  import AdminUiTag from '~/components/admin/ui/AdminUiTag.vue'

  const props = defineProps({
    users: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
  })

  const columns = [
    { key: 'info', title: 'User', dataIndex: 'fullName' },
    { key: 'source', title: 'NGUỒN', dataIndex: 'source', width: '140px' },
    { key: 'status', title: 'TRẠNG THÁI', dataIndex: 'status', width: '150px' },
    {
      key: 'createdAt',
      title: 'NGÀY TẠO',
      dataIndex: 'createdAt',
      width: '160px',
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

  const onRowClick = () => {}
</script>
