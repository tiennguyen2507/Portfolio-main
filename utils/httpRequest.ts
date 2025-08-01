// Helper function để tạo headers và baseURL
const createRequestConfig = (options?: any) => {
  const token = process.client ? localStorage.getItem("access_token") : null;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options?.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return {
    headers,
    baseURL: "https://blog-data.up.railway.app",
    ...options,
  };
};

// Sử dụng $fetch của Nuxt thay vì axios
export const httpRequest = {
  async get(url: string, options?: any): Promise<any> {
    const config = createRequestConfig(options);
    return await $fetch(url, {
      method: "GET",
      ...config,
    });
  },

  async post(url: string, data?: any, options?: any): Promise<any> {
    const config = createRequestConfig(options);
    return await $fetch(url, {
      method: "POST",
      body: data,
      ...config,
    });
  },

  async put(url: string, data?: any, options?: any): Promise<any> {
    const config = createRequestConfig(options);
    return await $fetch(url, {
      method: "PUT",
      body: data,
      ...config,
    });
  },

  async delete(url: string, options?: any): Promise<any> {
    const config = createRequestConfig(options);
    return await $fetch(url, {
      method: "DELETE",
      ...config,
    });
  },
};

export default httpRequest;
