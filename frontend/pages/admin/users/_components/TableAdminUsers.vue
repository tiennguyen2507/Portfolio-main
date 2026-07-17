<template>
  <Table
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
          <Avatar
            :src="record.avatar"
            :size="40"
            :readOnly="true"
            :ring="false"
          />
        </div>
        <div>
          <Typography as="div" size="sm" weight="bold" color="default">
            {{ record.fullName || 'N/A' }}
          </Typography>
          <Typography as="div" size="sm" color="muted">{{ record.email }}</Typography>
        </div>
      </div>
    </template>

    <!-- Cell: Source -->
    <template #cell-source="{ value }">
      <Tag variant="info">
        {{ value || 'Website' }}
      </Tag>
    </template>

    <!-- Cell: Status -->
    <template #cell-status="{ value }">
      <Tag :variant="value === 1 ? 'success' : 'gray'">
        {{ value === 1 ? 'Hoạt động' : 'Mới' }}
      </Tag>
    </template>

    <!-- Cell: Created At -->
    <template #cell-createdAt="{ value }">
      <Typography as="span" size="sm" color="tertiary">{{ formatDate(value) }}</Typography>
    </template>
  </Table>
</template>

<script setup>
  import Table from '~/components/ui/Table.vue'
  import Avatar from '~/components/ui/Avatar.vue'
  import Tag from '~/components/ui/Tag.vue'
  import Typography from '~/components/ui/Typography.vue'

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
