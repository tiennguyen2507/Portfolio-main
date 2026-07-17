const API_BASE_URL = 'http://localhost:3001'

// Chỉ lấy token khi chạy trên client (tránh lỗi SSR)
function getToken(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem('access_token')
  } catch {
    return null
  }
}

function createRequestConfig(options?: any) {
  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options?.headers,
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return {
    headers,
    baseURL: API_BASE_URL,
    ...options,
  }
}

// Chuẩn hóa lỗi từ $fetch (4xx/5xx) để UI luôn có message và status
function normalizeError(err: any): { message: string; status?: number } {
  const status = err?.statusCode ?? err?.status ?? err?.response?.status
  let message =
    err?.data?.message ?? err?.message ?? err?.data?.error ?? 'Có lỗi xảy ra'
  if (typeof message === 'object') message = JSON.stringify(message)
  if (status >= 500) {
    message = message || 'Lỗi server. Vui lòng thử lại sau.'
  }
  return { message: String(message), status }
}

async function handleFetch<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn()
  } catch (err: any) {
    const { message, status } = normalizeError(err)
    const e = new Error(message) as Error & { status?: number }
    e.status = status
    throw e
  }
}

export const httpRequest = {
  async get(url: string, options?: any): Promise<any> {
    const config = createRequestConfig(options)
    return handleFetch(() =>
      $fetch(url, {
        method: 'GET',
        ...config,
      })
    )
  },

  async post(url: string, data?: any, options?: any): Promise<any> {
    const config = createRequestConfig(options)
    return handleFetch(() =>
      $fetch(url, {
        method: 'POST',
        body: data,
        ...config,
      })
    )
  },

  async put(url: string, data?: any, options?: any): Promise<any> {
    const config = createRequestConfig(options)
    return handleFetch(() =>
      $fetch(url, {
        method: 'PUT',
        body: data,
        ...config,
      })
    )
  },

  async patch(url: string, data?: any, options?: any): Promise<any> {
    const config = createRequestConfig(options)
    return handleFetch(() =>
      $fetch(url, {
        method: 'PATCH',
        body: data,
        ...config,
      })
    )
  },

  async delete(url: string, options?: any): Promise<any> {
    const config = createRequestConfig(options)
    return handleFetch(() =>
      $fetch(url, {
        method: 'DELETE',
        ...config,
      })
    )
  },
}

export default httpRequest
