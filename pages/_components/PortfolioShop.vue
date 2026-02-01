<template>
  <section id="shop" class="py-20 bg-[#F2F2F7] dark:bg-[#1C1C1E] transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <Typography as="h2" :size="{sp: '2xl', pc: '3xl'}" weight="bold" color="default" align="center" class="mb-4">
          Tiệm Đồ Quê Tiên Hạnh
        </Typography>
        <Typography as="p" :size="{sp: 'lg', pc: 'xl'}" color="muted" align="center" class="max-w-3xl mx-auto">
          Khám phá hương vị mộc mạc của đồ quê với khoai lang, sắn, trứng gà ta,
          đậu phộng rang và các món bánh quê truyền thống
        </Typography>
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
          <Typography as="h3" :size="{sp: 'xl', pc: '2xl'}" weight="bold" color="default">
            Hương Vị Quê Nhà, Ấm Áp Từng Món
          </Typography>

          <Typography as="p" :size="{sp: 'md', pc: 'lg'}" color="default" class="leading-relaxed">
            Tiệm đồ quê Tiên Hạnh chuyên cung cấp các món ăn sáng và đặc sản
            vùng quê như khoai lang, sắn, trứng gà ta, đậu phộng rang và các
            loại bánh quê truyền thống. Đảm bảo sạch, ngon, mộc mạc và giao hàng
            nhanh trong ngày.
          </Typography>

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
              <Typography as="span" :size="{sp: 'sm', pc: 'md'}" color="default">Nguyên liệu sạch</Typography>
            </div>
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 bg-orange-500 dark:bg-orange-600 rounded-full flex items-center justify-center"
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
              <Typography as="span" :size="{sp: 'sm', pc: 'md'}" color="default">Giao hàng nhanh</Typography>
            </div>
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 bg-orange-500 dark:bg-orange-600 rounded-full flex items-center justify-center"
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
              <Typography as="span" :size="{sp: 'sm', pc: 'md'}" color="default">Giá bình dân</Typography>
            </div>
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 bg-orange-500 dark:bg-orange-600 rounded-full flex items-center justify-center"
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
              <Typography as="span" :size="{sp: 'sm', pc: 'md'}" color="default">Chế biến thủ công</Typography>
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
        <Typography as="h3" :size="{sp: 'xl', pc: '2xl'}" weight="bold" color="default" align="center" class="mb-8">
          Món Nổi Bật
        </Typography>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="product in featuredProducts"
            :key="product.id"
            class="bg-white dark:bg-[#1C1C1E] rounded-xl overflow-hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
          >
            <Image
              :src="product.thumbnail"
              :alt="product.title"
              custom-class="w-full h-32 object-cover"
              loading="lazy"
            />
            <div class="p-4">
              <Typography as="h4" :size="{sp: 'xs', pc: 'sm'}" weight="semibold" color="default" class="mb-1 truncate">
                {{ product.title }}
              </Typography>
              <Typography as="p" :size="{sp: 'xs', pc: 'sm'}" weight="bold" color="primary">
                {{ formatPrice(product.price) }}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { computed } from 'vue'
  import Image from '~/components/ui/Image.vue'

  // Props từ parent component
  const props = defineProps({
    products: {
      type: Array,
      default: () => [],
    },
    pending: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Object,
      default: null,
    },
  })

  // Sử dụng data từ props
  const productsList = computed(() => props.products || [])

  // Lấy 4 sản phẩm đầu tiên để hiển thị
  const featuredProducts = computed(() => productsList.value.slice(0, 4))

  const formatPrice = price => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(price)
  }
</script>
