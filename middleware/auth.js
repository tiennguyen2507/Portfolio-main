export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    const userStore = useUserStore()

    // Lấy token từ localStorage
    const token = localStorage.getItem('access_token')

    if (!token) {
      return navigateTo('/auth/login')
    }

    // Khởi tạo token vào store nếu chưa có
    if (!userStore.token) {
      userStore.token = token
    }

    // Kiểm tra nếu đã có user info trong store thì không cần gọi API
    if (userStore.isUserLoaded && userStore.token) {
      // User đã được load, không cần gọi API
      return
    }

    // Chỉ gọi API khi chưa có user info trong store
    if (!userStore.isUserLoaded) {
      // Call API lấy user info
      const userInfo = await userStore.fetchUserInfo()

      // Nếu API trả về lỗi hoặc không có user info, redirect về login
      if (!userInfo) {
        userStore.clearAuth()
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
        localStorage.removeItem('remember_me')
        return navigateTo('/auth/login')
      }
    }
  }
})
