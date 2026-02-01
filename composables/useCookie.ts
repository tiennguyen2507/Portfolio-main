/**
 * Composable để quản lý cookie đơn giản
 * Sử dụng document.cookie trực tiếp, không phụ thuộc vào Nuxt
 */
export const useCookie = <T = string>(
  name: string,
  options?: {
    default?: () => T
    maxAge?: number // seconds
    expires?: Date
    path?: string
    domain?: string
    secure?: boolean
    sameSite?: 'strict' | 'lax' | 'none'
  }
) => {
  // Helper function để get cookie
  const getCookie = (): string | null => {
    if (!process.client) return null
    
    const nameEQ = name + '='
    const cookies = document.cookie.split(';')
    
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i]
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length)
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length))
      }
    }
    return null
  }

  // Helper function để set cookie
  const setCookie = (value: string) => {
    if (!process.client) return

    let cookieString = `${name}=${encodeURIComponent(value)}`

    // Add maxAge
    if (options?.maxAge) {
      cookieString += `; max-age=${options.maxAge}`
    }

    // Add expires
    if (options?.expires) {
      cookieString += `; expires=${options.expires.toUTCString()}`
    }

    // Add path
    cookieString += `; path=${options?.path || '/'}`

    // Add domain
    if (options?.domain) {
      cookieString += `; domain=${options.domain}`
    }

    // Add secure
    if (options?.secure) {
      cookieString += `; secure`
    }

    // Add sameSite
    if (options?.sameSite) {
      cookieString += `; samesite=${options.sameSite}`
    }

    document.cookie = cookieString
  }

  // Helper function để delete cookie
  const deleteCookie = () => {
    if (!process.client) return
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${options?.path || '/'};`
  }

  // Get initial value
  const initialValue = process.client ? getCookie() : null
  const defaultValue = options?.default ? options.default() : null
  const currentValue = initialValue || defaultValue

  // Create reactive ref
  const cookieValue = ref<T | null>(currentValue as T | null)

  // Set cookie nếu có default value và chưa có cookie
  if (process.client && !initialValue && defaultValue !== null) {
    setCookie(String(defaultValue))
    cookieValue.value = defaultValue as T
  }

  // Watch for changes and update cookie
  watch(cookieValue, (newValue) => {
    if (!process.client) return
    
    if (newValue === null || newValue === undefined) {
      deleteCookie()
    } else {
      setCookie(String(newValue))
    }
  })

  // Create a proxy object that behaves like a ref
  const cookieRef = {
    get value() {
      return cookieValue.value
    },
    set value(newValue: T | null) {
      cookieValue.value = newValue
    },
    // Helper method để refresh từ browser
    refresh: () => {
      if (process.client) {
        const value = getCookie()
        cookieValue.value = (value as T) || (defaultValue as T) || null
      }
    },
    // Helper method để delete
    delete: deleteCookie,
  }

  // Return proxy object that can be used like a ref
  return cookieRef as {
    value: T | null
    refresh: () => void
    delete: () => void
  }
}

