<template>
  <section id="shop" class="py-20 bg-gray-800">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-white mb-4">
          Tiệm Đồ Quê Tiên Hạnh
        </h2>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
          Khám phá hương vị mộc mạc của đồ quê với khoai lang, sắn, trứng gà ta,
          đậu phộng rang và các món bánh quê truyền thống
        </p>
      </div>

      <!-- Shop Content -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <!-- Left: Image -->
        <div class="relative">
          <div
            class="relative rounded-2xl overflow-hidden ring-1 ring-orange-500/20 shadow-2xl"
          >
            <Image
              src="https://res.cloudinary.com/daqwg8oql/image/upload/v1755689053/tien-hanh-shop/dia-khoai-bap_hdnt2c.png"
              alt="Tiệm Đồ Quê Tiên Hạnh"
              custom-class="w-full h-80 object-cover"
              loading="lazy"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
            ></div>
          </div>
          <div
            class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Món quê ngon
          </div>
        </div>

        <!-- Right: Content -->
        <div class="space-y-6">
          <h3 class="text-2xl font-bold text-white">
            Hương Vị Quê Nhà, Ấm Áp Từng Món
          </h3>

          <p class="text-gray-300 leading-relaxed">
            Tiệm đồ quê Tiên Hạnh chuyên cung cấp các món ăn sáng và đặc sản
            vùng quê như khoai lang, sắn, trứng gà ta, đậu phộng rang và các
            loại bánh quê truyền thống. Đảm bảo sạch, ngon, mộc mạc và giao hàng
            nhanh trong ngày.
          </p>

          <!-- Features -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <span class="text-gray-300">Nguyên liệu sạch</span>
            </div>
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <span class="text-gray-300">Giao hàng nhanh</span>
            </div>
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <span class="text-gray-300">Giá bình dân</span>
            </div>
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <span class="text-gray-300">Chế biến thủ công</span>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 pt-4">
            <NuxtLink
              to="/shop"
              class="inline-flex items-center justify-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Xem Shop
              <svg
                class="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </NuxtLink>
            <NuxtLink
              to="/shop/order"
              class="inline-flex items-center justify-center px-6 py-3 border border-orange-500 text-orange-500 font-semibold rounded-lg hover:bg-orange-500 hover:text-white transition-colors"
            >
              Đặt hàng ngay
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Products Preview -->
      <div class="mt-16">
        <h3 class="text-2xl font-bold text-white text-center mb-8">
          Món Nổi Bật
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="product in featuredProducts"
            :key="product.id"
            class="bg-gray-700 rounded-xl overflow-hidden hover:bg-gray-600 transition-colors"
          >
            <Image
              :src="product.thumbnail"
              :alt="product.title"
              custom-class="w-full h-32 object-cover"
              loading="lazy"
            />
            <div class="p-4">
              <h4 class="text-white font-semibold text-sm mb-1 truncate">
                {{ product.title }}
              </h4>
              <p class="text-orange-400 font-bold text-sm">
                {{ formatPrice(product.price) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { onMounted, computed, ref } from 'vue'
  import httpRequest from '~/utils/httpRequest'
  import Image from '~/components/ui/Image.vue'

  // State
  const products = ref([])

  // Fetch products function
  const fetchProducts = async (page = 1, limit = 4) => {
    try {
      const response = await httpRequest.get(
        `/products?page=${page}&limit=${limit}`
      )

      if (response && response.data) {
        // Sử dụng trực tiếp data từ API
        products.value = response.data
        console.log('Products fetched for portfolio:', products.value)
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err) {
      console.error('Error fetching products for portfolio:', err)
      // Fallback về mock data nếu API lỗi
      const { shopProducts } = await import('~/utils/mock')
      products.value = shopProducts.slice(0, 4)
    }
  }

  // Fetch products khi component mount
  onMounted(async () => {
    await fetchProducts(1, 4) // Chỉ lấy 4 sản phẩm đầu tiên
  })

  // Lấy 4 sản phẩm đầu tiên để hiển thị
  const featuredProducts = computed(() => products.value.slice(0, 4))

  const formatPrice = price => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(price)
  }
</script>
