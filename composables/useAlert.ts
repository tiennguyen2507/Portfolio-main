/**
 * Composable để sử dụng Alert/Toast notifications
 *
 * @example
 * ```vue
 * <script setup>
 * const { showAlert, hideAll } = useAlert()
 *
 * // Show success alert
 * showAlert({
 *   message: 'Đăng nhập thành công!',
 *   type: 'success',
 *   duration: 3000
 * })
 * </script>
 * ```
 */

// Import types and state from useAlertState to avoid duplication
import type { AlertOptions } from './useAlertState'
import { alertState } from './useAlertState'

export const useAlert = () => {
  // Try to get from provide/inject
  let alertInstance: any = null

  try {
    alertInstance = inject('alert', null)
  } catch {
    // Ignore inject error
  }

  // If not available from inject, try global state
  if (!alertInstance && process.client) {
    alertInstance = (window as any).__alertInstance || null
  }

  const showAlert = (options: AlertOptions | string) => {
    // If options is a string, convert to AlertOptions
    const alertOptions: AlertOptions =
      typeof options === 'string' ? { message: options } : options

    if (alertInstance?.showAlert) {
      alertInstance.showAlert(alertOptions)
    } else if (alertState.showAlert) {
      alertState.showAlert(alertOptions)
    } else {
      // Fallback: use console
      console.warn(
        'Alert component not found. Please add <Alert /> to your layout.'
      )
      console.log(
        `[Alert ${alertOptions.type || 'default'}]:`,
        alertOptions.message
      )
    }
  }

  const showSuccess = (message: string, options?: Partial<AlertOptions>) => {
    showAlert({
      message,
      type: 'success',
      ...options,
    })
  }

  const showError = (message: string, options?: Partial<AlertOptions>) => {
    showAlert({
      message,
      type: 'error',
      duration: options?.duration ?? 5000, // Error messages stay longer
      ...options,
    })
  }

  const showWarning = (message: string, options?: Partial<AlertOptions>) => {
    showAlert({
      message,
      type: 'warning',
      ...options,
    })
  }

  const showInfo = (message: string, options?: Partial<AlertOptions>) => {
    showAlert({
      message,
      type: 'info',
      ...options,
    })
  }

  const dismissAlert = (id?: number) => {
    if (alertInstance?.dismissAlert) {
      alertInstance.dismissAlert(id)
    } else if (alertState.dismissAlert) {
      alertState.dismissAlert(id!)
    }
  }

  const hideAll = () => {
    if (alertInstance?.hideAll) {
      alertInstance.hideAll()
    } else if (alertState.hideAll) {
      alertState.hideAll()
    }
  }

  return {
    showAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    dismissAlert,
    hideAll,
  }
}
