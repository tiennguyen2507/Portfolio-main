export interface NotificationOptions {
  message: string
  type?: 'default' | 'success' | 'error' | 'warning' | 'info'
}

export const useNotification = () => {
  const { $toast } = useNuxtApp()

  const showNotification = (options: NotificationOptions | string) => {
    const notificationOptions: NotificationOptions =
      typeof options === 'string'
        ? { message: options, type: 'success' }
        : options

    if (!$toast) {
      console.warn('Toast not available')
      return
    }

    const toastType =
      notificationOptions.type === 'default'
        ? 'default'
        : notificationOptions.type || 'default'

    const toastOptions: any = {
      message: notificationOptions.message,
      type: toastType,
    }

    $toast.open(toastOptions)
  }

  const showError = (message: string) => {
    showNotification({
      message,
      type: 'error',
    })
  }

  const clear = () => {
    if ($toast) {
      $toast.clear()
    }
  }

  return {
    showNotification,
    showError,
    clear,
  }
}
