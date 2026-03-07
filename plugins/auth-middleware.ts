export default defineNuxtPlugin(() => {
  addRouteMiddleware(
    'auth',
    async () => {
      if (import.meta.client) {
        const userStore = useUserStore()
        const token = localStorage.getItem('access_token')

        if (!token) {
          return navigateTo('/auth/login')
        }

        if (!userStore.token) {
          userStore.token = token
        }

        if (userStore.isUserLoaded && userStore.token) {
          return
        }

        if (!userStore.isUserLoaded) {
          const userInfo = await userStore.fetchUserInfo()
          if (!userInfo) {
            userStore.clearAuth()
            localStorage.removeItem('access_token')
            localStorage.removeItem('user')
            localStorage.removeItem('remember_me')
            return navigateTo('/auth/login')
          }
        }
      }
    },
    { global: false }
  )
})
