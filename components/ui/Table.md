# Table Component

A flexible and reusable table component inspired by Ant Design's table structure, built with Vue 3 and Tailwind CSS.

## Features

- ✅ **Data-driven**: Uses `dataSource` and `columns` props like Ant Design
- ✅ **Loading state**: Built-in loading indicator
- ✅ **Empty state**: Customizable empty state display
- ✅ **Pagination**: Integrated with the common Pagination component
- ✅ **Custom rendering**: Support for custom cell renderers and slots
- ✅ **Responsive**: Mobile-friendly design
- ✅ **Hover effects**: Optional row hover highlighting
- ✅ **Fixed columns**: Support for sticky left/right columns
- ✅ **Custom styling**: Flexible className and styling options

## Basic Usage

```vue
<template>
  <Table :dataSource="dataSource" :columns="columns" />
</template>

<script setup>
  import Table from '~/components/ui/Table.vue'

  const dataSource = [
    {
      key: '1',
      name: 'Nguyễn Văn A',
      age: 32,
      email: 'nguyenvana@example.com',
      status: 'active',
    },
    {
      key: '2',
      name: 'Trần Thị B',
      age: 28,
      email: 'tranthib@example.com',
      status: 'inactive',
    },
  ]

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tuổi',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
  ]
</script>
```

## Props

### Data Props

| Prop         | Type  | Default | Description                      |
| ------------ | ----- | ------- | -------------------------------- |
| `dataSource` | Array | `[]`    | Array of data objects to display |
| `columns`    | Array | `[]`    | Array of column definitions      |

### Loading Props

| Prop          | Type    | Default                 | Description        |
| ------------- | ------- | ----------------------- | ------------------ |
| `loading`     | Boolean | `false`                 | Show loading state |
| `loadingText` | String  | `'Đang tải dữ liệu...'` | Loading text       |

### Styling Props

| Prop           | Type     | Default              | Description                          |
| -------------- | -------- | -------------------- | ------------------------------------ |
| `hoverable`    | Boolean  | `true`               | Enable row hover effects             |
| `rowClassName` | Function | `null`               | Function to generate row class names |
| `emptyText`    | String   | `'Không có dữ liệu'` | Empty state text                     |

### Pagination Props

| Prop             | Type    | Default | Description                     |
| ---------------- | ------- | ------- | ------------------------------- |
| `showPagination` | Boolean | `false` | Show pagination component       |
| `pagination`     | Object  | `null`  | Pagination configuration object |

## Column Definition

Each column object can have the following properties:

```javascript
{
  title: 'Column Title',           // Required: Column header text
  dataIndex: 'fieldName',          // Required: Field name in dataSource
  key: 'uniqueKey',                // Optional: Unique identifier
  width: '200px',                  // Optional: Column width
  className: 'custom-class',       // Optional: CSS class for the column
  hidden: false,                   // Optional: Hide the column
  fixed: 'left' | 'right',         // Optional: Fix column position
  render: CustomComponent,         // Optional: Custom render component
  formatter: (value, record, index) => string, // Optional: Format cell value
}
```

## Advanced Examples

### 1. Custom Cell Rendering

```vue
<template>
  <Table :dataSource="dataSource" :columns="columns" />
</template>

<script setup>
  import Badge from '~/components/ui/Badge.vue'
  import ButtonIcon from '~/components/ui/ButtonIcon.vue'

  const dataSource = [
    {
      key: '1',
      name: 'Nguyễn Văn A',
      status: 'active',
      actions: ['edit', 'delete'],
    },
  ]

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: defineComponent({
        props: ['value', 'record'],
        setup(props) {
          return () =>
            h(
              Badge,
              {
                variant: props.value === 'active' ? 'success' : 'danger',
                size: 'sm',
              },
              () => (props.value === 'active' ? 'Hoạt động' : 'Không hoạt động')
            )
        },
      }),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: defineComponent({
        props: ['record'],
        setup(props) {
          return () =>
            h('div', { class: 'flex items-center gap-2' }, [
              h(ButtonIcon, {
                icon: 'edit',
                color: 'blue',
                onClick: () => handleEdit(props.record),
              }),
              h(ButtonIcon, {
                icon: 'delete',
                color: 'red',
                onClick: () => handleDelete(props.record),
              }),
            ])
        },
      }),
    },
  ]
</script>
```

### 2. Using Slots for Custom Rendering

```vue
<template>
  <Table :dataSource="dataSource" :columns="columns">
    <!-- Custom header slot -->
    <template #header-name="{ column }">
      <span class="text-red-600">*</span>
    </template>

    <!-- Custom cell slot -->
    <template #cell-status="{ value, record }">
      <Badge :variant="value === 'active' ? 'success' : 'danger'" size="sm">
        {{ value === 'active' ? 'Hoạt động' : 'Không hoạt động' }}
      </Badge>
    </template>

    <!-- Custom empty state -->
    <template #empty>
      <div class="text-center py-8">
        <p class="text-gray-500">Không tìm thấy dữ liệu phù hợp</p>
      </div>
    </template>
  </Table>
</template>
```

### 3. With Pagination

```vue
<template>
  <Table
    :dataSource="dataSource"
    :columns="columns"
    :loading="loading"
    :show-pagination="true"
    :pagination="paginationConfig"
    @page-change="handlePageChange"
  />
</template>

<script setup>
  const loading = ref(false)
  const currentPage = ref(1)
  const dataSource = ref([])

  const paginationConfig = computed(() => ({
    page: currentPage.value,
    total: 100,
    limit: 10,
    showInfo: true,
    split: true,
  }))

  const handlePageChange = page => {
    currentPage.value = page
    fetchData()
  }
</script>
```

### 4. Fixed Columns

```vue
<template>
  <Table :dataSource="dataSource" :columns="columns" />
</template>

<script setup>
  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: '200px',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Thao tác',
      key: 'actions',
      fixed: 'right',
      width: '120px',
      render: ActionsComponent,
    },
  ]
</script>
```

### 5. Custom Row Styling

```vue
<template>
  <Table
    :dataSource="dataSource"
    :columns="columns"
    :row-class-name="getRowClassName"
  />
</template>

<script setup>
  const getRowClassName = (record, index) => {
    if (record.status === 'inactive') {
      return 'bg-gray-100'
    }
    if (index % 2 === 0) {
      return 'bg-blue-50'
    }
    return ''
  }
</script>
```

## Events

| Event         | Parameters          | Description                        |
| ------------- | ------------------- | ---------------------------------- |
| `row-click`   | `{ record, index }` | Fired when a row is clicked        |
| `page-change` | `page`              | Fired when pagination page changes |

## Slots

| Slot Name            | Props                              | Description                               |
| -------------------- | ---------------------------------- | ----------------------------------------- |
| `empty`              | -                                  | Custom empty state content                |
| `header-{columnKey}` | `{ column }`                       | Custom header content for specific column |
| `cell-{columnKey}`   | `{ record, column, index, value }` | Custom cell content for specific column   |

## Styling

The component uses Tailwind CSS classes and provides a clean, modern design that matches the existing UI components. You can customize the appearance by:

1. **Modifying the scoped styles** in the component
2. **Using the `className` prop** on columns
3. **Using the `rowClassName` function** for dynamic row styling
4. **Overriding CSS classes** in your global styles

## Integration with Existing Components

The Table component integrates seamlessly with other UI components:

- **Pagination**: Built-in pagination support
- **Badge**: For status indicators
- **ButtonIcon**: For action buttons
- **Loading**: Built-in loading state
- **EmptyData**: Can be used in empty slot

## Best Practices

1. **Always provide a `key`** for each record in dataSource
2. **Use `dataIndex`** for simple field access
3. **Use `render` function** for complex cell content
4. **Use slots** for highly customizable content
5. **Handle loading states** properly
6. **Provide meaningful empty states**
7. **Use fixed columns** sparingly for better UX
