<template>
  <div>
    <Table
      :dataSource="posts"
      :columns="columns"
      :loading="loading"
      @cell-click="handleCellClick"
    >
      <!-- Custom Thumbnail Column -->
      <template #cell-thumbnail="{ value, record }">
        <div class="flex items-center justify-center">
          <img
            v-if="value"
            :src="value"
            :alt="record.title"
            class="w-16 h-16 object-cover rounded-lg"
          />
          <div
            v-else
            class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center"
          >
            <span class="text-gray-400 text-xs">No image</span>
          </div>
        </div>
      </template>

      <!-- Custom Title Column -->
      <template #cell-title="{ value, record }">
        <NuxtLink
          :to="`/blogs/${record._id}`"
          class="text-sm font-semibold text-blue-600 max-w-xs truncate hover:underline focus:underline focus:outline-none cursor-pointer hover:text-blue-700"
          title="Xem bài viết"
        >
          {{ value }}
        </NuxtLink>
      </template>

      <!-- Custom Description Column -->
      <template #cell-description="{ value }">
        <div
          class="text-sm text-gray-500 max-w-md overflow-hidden"
          style="
            max-height: 60px;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          "
          v-html="value"
        ></div>
      </template>

      <!-- Custom Category Column -->
      <template #cell-category="{ value }">
        <Tag :variant="getCategoryVariant(value)" size="sm">
          {{ formatCategory(value) }}
        </Tag>
      </template>

      <!-- Custom Actions Column -->
      <template #cell-actions="{ record }">
        <div class="flex items-center gap-2">
          <ButtonIcon icon="edit" color="blue" @click="$emit('edit', record)" />
          <ButtonIcon
            icon="delete"
            color="red"
            @click="$emit('delete', record._id)"
          />
        </div>
      </template>
    </Table>
  </div>
</template>

<script setup>
  import ButtonIcon from '~/components/ui/ButtonIcon.vue'
  import Table from '~/components/ui/Table.vue'
  import Tag from '~/components/ui/Tag.vue'

  const props = defineProps({
    posts: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  })

  const emit = defineEmits(['edit', 'delete', 'cell-click'])

  // Table columns configuration
  const columns = [
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: '100px',
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      width: '120px',
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: '100px',
    },
  ]

  const handleCellClick = ({ event, record, column, index }) => {
    emit('cell-click', { event, record, column, index })
  }

  // Format category value for display
  const formatCategory = category => {
    const categoryMap = {
      'ai-blog': 'Blog AI',
      'my-blog': 'My Blog',
    }
    return categoryMap[category] || category || '-'
  }

  // Get variant for category tag
  const getCategoryVariant = category => {
    const variantMap = {
      'ai-blog': 'secondary', // Blue color for AI Blog
      'my-blog': 'primary', // Blue color for My Blog
    }
    return variantMap[category] || 'gray'
  }
</script>
