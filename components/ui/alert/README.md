# Alert/Toast Component

Component hiển thị thông báo toast notification với nhiều tính năng.

## Cài đặt

Component đã được thêm vào `layouts/default.vue`, nên bạn có thể sử dụng ngay.

## Cách sử dụng

### 1. Import và sử dụng hook

```vue
<script setup>
  import { useAlert } from '~/composables/useAlert'

  const { showAlert, showSuccess, showError, showWarning, showInfo, hideAll } =
    useAlert()

  // Show default alert
  showAlert('Thông báo mặc định')

  // Show success alert
  showSuccess('Đăng nhập thành công!')

  // Show error alert
  showError('Có lỗi xảy ra!')

  // Show warning alert
  showWarning('Cảnh báo!')

  // Show info alert
  showInfo('Thông tin')

  // Hide all alerts
  hideAll()
</script>
```

### 2. Với options đầy đủ

```vue
<script setup>
  import { useAlert } from '~/composables/useAlert'

  const { showAlert } = useAlert()

  // Show alert với options
  showAlert({
    message: 'Đăng nhập thành công!',
    type: 'success',
    duration: 3000, // 3 giây
    dismissible: true, // Có thể click để đóng
    position: 'bottom', // Vị trí hiển thị
  })
</script>
```

### 3. Sử dụng trong form submit

```vue
<script setup>
  import { useAlert } from '~/composables/useAlert'

  const { showSuccess, showError } = useAlert()

  const handleSubmit = async () => {
    try {
      await api.post('/login', formData)
      showSuccess('Đăng nhập thành công!')
    } catch (error) {
      showError('Đăng nhập thất bại!')
    }
  }
</script>
```

## API

### `useAlert()`

Trả về object với các methods:

- `showAlert(options | message)` - Hiển thị alert
- `showSuccess(message, options?)` - Hiển thị success alert
- `showError(message, options?)` - Hiển thị error alert
- `showWarning(message, options?)` - Hiển thị warning alert
- `showInfo(message, options?)` - Hiển thị info alert
- `dismissAlert(id?)` - Đóng alert theo ID
- `hideAll()` - Đóng tất cả alerts

### AlertOptions

```typescript
interface AlertOptions {
  message: string // Message hiển thị (required)
  type?: 'default' | 'success' | 'error' | 'warning' | 'info' // Loại alert
  duration?: number // Thời gian tự động ẩn (ms), 0 = không tự ẩn
  dismissible?: boolean // Có thể click để đóng không
  position?:
    | 'top'
    | 'top-left'
    | 'top-right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'
  queue?: boolean // Chờ alert trước đó đóng mới hiển thị
}
```

## Ví dụ

### Login form

```vue
<template>
  <form @submit.prevent="handleLogin">
    <!-- Form fields -->
    <button type="submit">Đăng nhập</button>
  </form>
</template>

<script setup>
  import { useAlert } from '~/composables/useAlert'

  const { showSuccess, showError } = useAlert()

  const handleLogin = async () => {
    try {
      const response = await httpRequest.post('/auth/login', formData)
      showSuccess('Đăng nhập thành công! Đang chuyển hướng...')
      // Redirect...
    } catch (err) {
      if (err.status === 401) {
        showError('Email hoặc mật khẩu không đúng')
      } else {
        showError('Có lỗi xảy ra khi đăng nhập')
      }
    }
  }
</script>
```

## Tính năng

- ✅ 5 loại alert: default, success, error, warning, info
- ✅ Tự động ẩn sau thời gian chỉ định
- ✅ Click để đóng (dismissible)
- ✅ Nhiều vị trí hiển thị
- ✅ Queue mode (chờ alert trước đó đóng)
- ✅ Animation mượt mà
- ✅ Responsive
- ✅ TypeScript support
