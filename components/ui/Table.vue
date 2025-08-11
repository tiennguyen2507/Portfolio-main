<template>
  <div class="table-container">
    <!-- Loading State -->
    <div v-if="loading" class="table-loading">
      <Loading :text="loadingText" />
    </div>

    <!-- Table -->
    <div v-else class="table-wrapper">
      <table class="table">
        <!-- Table Header -->
        <thead class="table-header">
          <tr>
            <th
              v-for="column in visibleColumns"
              :key="column.key || column.dataIndex"
              :class="[
                'table-header-cell',
                column.className,
                column.fixed && `fixed-${column.fixed}`,
                column.width && 'has-width'
              ]"
              :style="column.width ? { width: column.width } : {}"
            >
              <div class="header-content">
                <span class="header-title">{{ column.title }}</span>
                <slot
                  v-if="$slots[`header-${column.key || column.dataIndex}`]"
                  :name="`header-${column.key || column.dataIndex}`"
                  :column="column"
                />
              </div>
            </th>
          </tr>
        </thead>

        <!-- Table Body -->
        <tbody class="table-body">
          <tr
            v-for="(record, index) in dataSource"
            :key="record.key || index"
            :class="[
              'table-row',
              { 'hover:bg-gray-50': hoverable },
              rowClassName && rowClassName(record, index)
            ]"
            @click="handleRowClick(record, index)"
          >
            <td
              v-for="column in visibleColumns"
              :key="column.key || column.dataIndex"
              :class="[
                'table-cell',
                column.className,
                column.fixed && `fixed-${column.fixed}`,
                column.width && 'has-width'
              ]"
              :style="column.width ? { width: column.width } : {}"
            >
              <!-- Custom Slot (Priority 1) -->
              <template v-if="$slots[`cell-${column.key || column.dataIndex}`]">
                <slot
                  :name="`cell-${column.key || column.dataIndex}`"
                  :record="record"
                  :column="column"
                  :index="index"
                  :value="getCellValue(record, column)"
                />
              </template>

              <!-- Custom Render Function (Priority 2) -->
              <template v-else-if="column.render">
                <component
                  :is="column.render"
                  :record="record"
                  :column="column"
                  :index="index"
                  :value="getCellValue(record, column)"
                />
              </template>

              <!-- Default Cell Content (Priority 3) -->
              <template v-else>
                <span 
                  class="cell-content"
                  v-html="formatCellValue(getCellValue(record, column), column, record, index)"
                ></span>
              </template>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div
        v-if="dataSource.length === 0 && !loading"
        class="table-empty"
      >
        <slot name="empty">
          <EmptyData :title="emptyText" />
        </slot>
      </div>
    </div>


  </div>
</template>

<script setup>
import Loading from './Loading.vue'
import EmptyData from './EmptyData.vue'

const props = defineProps({
  // Data
  dataSource: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    default: () => []
  },

  // Loading
  loading: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: 'Đang tải dữ liệu...'
  },

  // Styling
  hoverable: {
    type: Boolean,
    default: true
  },
  rowClassName: {
    type: Function,
    default: null
  },

  // Empty state
  emptyText: {
    type: String,
    default: 'Không có dữ liệu'
  },


  

})

const emit = defineEmits(['row-click', 'cell-click'])

// Computed
const visibleColumns = computed(() => {
  return props.columns.filter(column => column.hidden !== true)
})

// Methods
const getCellValue = (record, column) => {
  if (column.dataIndex) {
    return column.dataIndex.split('.').reduce((obj, key) => obj?.[key], record)
  }
  return null
}

const formatCellValue = (value, column, record, index) => {
  if (column.formatter) {
    return column.formatter(value, record, index)
  }
  
  if (value === null || value === undefined) {
    return '-'
  }
  
  return value
}

const handleRowClick = (record, index) => {
  emit('row-click', { record, index })
}



const handleCellClick = (event, record, column, index) => {
  // Emit cell click event for parent to handle
  emit('cell-click', { event, record, column, index })
}
</script>

<style scoped>
.table-container {
  @apply relative;
  margin-bottom: 1rem;
}

.table-loading {
  @apply flex items-center justify-center py-12;
}

.table-wrapper {
  @apply bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden;
  border-bottom: none;
}

.table {
  @apply min-w-full divide-y divide-gray-200;
}

.table-header {
  @apply bg-gray-50;
}

.table-header-cell {
  @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
}

.table-header-cell.has-width {
  @apply whitespace-nowrap;
}

.header-content {
  @apply flex items-center justify-between;
}

.header-title {
  @apply font-medium;
}

.table-body {
  @apply bg-white divide-y divide-gray-200;
}

.table-body tr:last-child td:first-child {
  border-bottom-left-radius: 0.5rem;
}

.table-body tr:last-child td:last-child {
  border-bottom-right-radius: 0.5rem;
}

.table-row {
  @apply transition-colors duration-150;
}

.table-row:hover {
  @apply bg-gray-50;
}

.table-cell {
  @apply px-6 py-4 whitespace-nowrap text-sm text-gray-900;
}

.table-cell.has-width {
  @apply whitespace-nowrap;
}

.cell-content {
  @apply block;
}





/* Fixed columns support */
.fixed-left {
  @apply sticky left-0 z-10 bg-white;
}

.fixed-right {
  @apply sticky right-0 z-10 bg-white;
}

/* Responsive */
@media (max-width: 768px) {
  .table-header-cell,
  .table-cell {
    @apply px-3 py-2;
  }
  
  .table-pagination {
    @apply px-3 py-2;
  }
}
</style>
