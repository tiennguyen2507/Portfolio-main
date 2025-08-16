import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const token = ref(null)
  const isLoading = ref(false)

  // Lấy user info từ API
  const fetchUserInfo = async () => {
    if (!token.value) return null

    // Nếu đã có user và đang loading thì không gọi API
    if (user.value && isLoading.value) return user.value

    try {
      isLoading.value = true
      const response = await $fetch(
        'https://blog-data.up.railway.app/auth/info',
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      )

      if (response) {
        user.value = response
        return response
      }
    } catch {
      // Silent error handling for user info fetching
      clearAuth()
      return null
    } finally {
      isLoading.value = false
    }
  }

  // Set token và user
  const setAuth = (newToken, userData) => {
    token.value = newToken
    user.value = userData
  }

  // Clear auth data
  const clearAuth = () => {
    token.value = null
    user.value = null
  }

  // Check if user is authenticated
  const isAuthenticated = computed(() => {
    return !!token.value && !!user.value
  })

  // Check if user data is loaded
  const isUserLoaded = computed(() => {
    return !!user.value
  })

  return {
    user,
    token,
    isLoading,
    fetchUserInfo,
    setAuth,
    clearAuth,
    isAuthenticated,
    isUserLoaded,
  }
})
