/**
 * Global state for Alert component
 * Separate file to avoid circular dependencies
 */

export interface AlertOptions {
  /** Message hiển thị trong alert */
  message: string
  /** Loại alert: 'default' | 'success' | 'error' | 'warning' | 'info' */
  type?: 'default' | 'success' | 'error' | 'warning' | 'info'
  /** Thời gian tự động ẩn (ms). 0 = không tự ẩn */
  duration?: number
  /** Có thể click để đóng không */
  dismissible?: boolean
  /** Vị trí hiển thị */
  position?:
    | 'top'
    | 'top-left'
    | 'top-right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'
  /** Chờ alert trước đó đóng mới hiển thị */
  queue?: boolean
}

// Global alert state - will be populated by Alert component
export const alertState = reactive({
  alerts: [] as any[],
  showAlert: null as ((options: AlertOptions) => void) | null,
  dismissAlert: null as ((id: number) => void) | null,
  hideAll: null as (() => void) | null,
})
