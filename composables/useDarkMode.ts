/**
 * Composable để quản lý dark mode
 * Logic đơn giản:
 * 1. Kiểm tra cookie xem có darkMode hay không
 * 2. Nếu không có -> lưu darkMode = false ngay ở server
 * 3. Khi click button -> đổi mode và update cookie
 */
export const useDarkMode = () => {
  // Sử dụng custom useCookie để lưu dark mode
  const darkModeCookie = useCookie('darkMode', {
    default: () => 'false', // Mặc định là false (light mode)
    maxAge: 60 * 60 * 24 * 365, // 1 năm
    sameSite: 'lax',
    path: '/',
  })

  // Parse cookie value thành boolean
  // Đảm bảo giá trị hợp lệ ('true' hoặc 'false')
  const getDarkModeValue = (): boolean => {
    const value = darkModeCookie.value
    if (!value || (value !== 'true' && value !== 'false')) {
      return false
    }
    return value === 'true'
  }

  const isDark = ref(getDarkModeValue())

  // Apply dark mode class vào html element
  const applyDarkMode = (dark: boolean) => {
    if (process.client) {
      const html = document.documentElement
      if (dark) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }
  }

  // Khởi tạo dark mode từ cookie khi component mount
  onMounted(() => {
    if (process.client) {
      // Refresh cookie từ browser để đảm bảo sync
      darkModeCookie.refresh()
      
      // Parse và apply dark mode
      const shouldBeDark = getDarkModeValue()
      isDark.value = shouldBeDark
      applyDarkMode(shouldBeDark)
    }
  })

  // Toggle dark mode và update cookie
  const toggleDarkMode = () => {
    if (!process.client) return

    // Toggle state
    const newValue = !isDark.value
    isDark.value = newValue

    // Apply class ngay lập tức
    applyDarkMode(newValue)

    // Update cookie - watch sẽ tự động set cookie
    const cookieValue = newValue ? 'true' : 'false'
    darkModeCookie.value = cookieValue
  }

  return {
    isDark: readonly(isDark),
    toggleDarkMode,
  }
}
