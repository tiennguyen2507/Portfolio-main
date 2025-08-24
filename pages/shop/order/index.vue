<template>
  <div class="bg-[#fdf6ee] min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8 py-10 lg:py-14">
      <section class="mt-8 text-end">
        <NuxtLink
          to="/shop/shopping-card"
          class="btn-place w-full mb-4 md:w-auto"
          >Xem giỏ hàng</NuxtLink
        >
      </section>
      <header class="text-center mb-8">
        <h1 class="text-4xl sm:text-5xl font-serif font-bold text-[#3b2b23]">
          Đặt Món Quê Nhà
        </h1>
        <p class="mt-3 text-[#7a6657]">
          Chọn món bạn yêu thích, nhập thông tin – chúng tôi sẽ liên hệ xác nhận
          ngay.
        </p>
      </header>

      <!-- Loading state -->
      <div v-if="loading" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#3b2b23]"
        ></div>
        <p class="mt-4 text-[#7a6657]">Đang tải sản phẩm...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-600 mb-4">Có lỗi khi tải sản phẩm: {{ error }}</p>
        <button @click="fetchProducts()" class="btn-place">Thử lại</button>
      </div>

      <!-- Products grid -->
      <div
        v-else
        class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4 lg:gap-8"
      >
        <Card
          v-for="product in products"
          :key="product._id"
          :item="product"
          v-model="quantities[product._id]"
          @add="onAdd"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, watch, ref, reactive, computed } from 'vue'
  import Card from './_components/Card.vue'
  import { useSEO } from '~/composables/useSEO'
  import httpRequest from '~/utils/httpRequest'

  const { setPageSEO, addStructuredData } = useSEO()

  // State
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Fetch products function - lấy tất cả products
  const fetchProducts = async () => {
    loading.value = true
    error.value = null

    try {
      // Lấy tất cả products với limit lớn để đảm bảo mapping giỏ hàng
      const response = await httpRequest.get('/products?page=1&limit=100')

      if (response && response.data) {
        // Sử dụng trực tiếp data từ API
        products.value = response.data
        console.log('Products fetched:', products.value)
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err) {
      console.error('Error fetching products:', err)
      error.value = err.message
      // Fallback về mock data nếu API lỗi
      const { shopProducts } = await import('~/utils/mock')
      products.value = shopProducts
    } finally {
      loading.value = false
    }
  }

  // Fetch products khi component mount
  onMounted(async () => {
    await fetchProducts()
    // Clean up invalid cart items sau khi load products
    cleanupInvalidCartItems()
  })

  const quantities = reactive({})

  // Watch products để khởi tạo quantities
  watch(
    products,
    newProducts => {
      if (newProducts.length > 0) {
        newProducts.forEach(p => {
          if (!(p._id in quantities)) {
            quantities[p._id] = 0
          }
        })
      }
    },
    { immediate: true }
  )

  const cartItems = computed(() =>
    products.value
      .map(p => ({ item: p, quantity: quantities[p._id] || 0 }))
      .filter(ci => ci.quantity > 0)
  )

  const total = computed(() =>
    cartItems.value.reduce((sum, ci) => sum + ci.quantity * ci.item.price, 0)
  )

  const form = reactive({ name: '', phone: '', address: '', note: '' })

  // Cleanup invalid cart items
  const cleanupInvalidCartItems = () => {
    if (!products.value.length) return

    const validProductIds = products.value.map(p => p._id)
    const cartKeys = Object.keys(quantities)
    let hasChanges = false

    // Xóa sản phẩm không tồn tại trong products
    cartKeys.forEach(productId => {
      if (!validProductIds.includes(productId)) {
        console.log(`Removing invalid product from quantities: ${productId}`)
        delete quantities[productId]
        hasChanges = true
      }
    })

    // Xóa sản phẩm có số lượng không hợp lệ
    cartKeys.forEach(productId => {
      const quantity = quantities[productId]
      if (
        quantity === null ||
        quantity === undefined ||
        quantity < 0 ||
        !Number.isInteger(Number(quantity))
      ) {
        console.log(
          `Removing product with invalid quantity from quantities: ${productId}, quantity: ${quantity}`
        )
        delete quantities[productId]
        hasChanges = true
      }
    })

    // Xóa sản phẩm có số lượng = 0
    cartKeys.forEach(productId => {
      const quantity = quantities[productId]
      if (quantity === 0) {
        console.log(
          `Removing product with zero quantity from quantities: ${productId}`
        )
        delete quantities[productId]
        hasChanges = true
      }
    })

    if (hasChanges) {
      console.log('Quantities cleaned up, invalid items removed')
    }
  }

  const onAdd = ({ item, quantity }) => {
    if (quantity <= 0) return
    quantities[item._id] = quantity
  }

  const submitOrder = () => {
    if (!cartItems.value.length) {
      alert('Vui lòng chọn ít nhất 1 món.')
      return
    }
    // Demo: hiển thị tóm tắt, bạn có thể tích hợp API/Zalo OA/Google Sheet sau
    const summary = cartItems.value
      .map(ci => `${ci.item.name} × ${ci.quantity}`)
      .join(', ')
    alert(
      `Đặt hàng thành công!\nMón: ${summary}\nTổng: ${formatPrice(total.value)}\nKhách: ${form.name} - ${form.phone}\nĐ/c: ${form.address}`
    )
  }

  const formatPrice = v =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(v)

  definePageMeta({
    layout: 'shop',
  })

  // SEO
  const pageUrl = 'https://nguyenledinhtien.io.vn/shop/order'
  const coverImage =
    'https://res.cloudinary.com/daqwg8oql/image/upload/v1755689053/tien-hanh-shop/dia-khoai-bap_hdnt2c.png'

  setPageSEO({
    title:
      'Đặt món đồ quê – Khoai, Sắn, Trứng gà ta, Đậu | Tiệm Đồ Quê Tiên Hạnh',
    description:
      'Chọn món đồ quê ngon sạch: khoai lang nướng, sắn luộc, trứng gà ta, đậu phộng rang, bánh quê… Đặt nhanh, giao trong ngày tại Tiệm Đồ Quê Tiên Hạnh.',
    keywords:
      'đặt đồ quê, đặt bữa sáng, khoai lang, sắn, trứng gà ta, đậu phộng, bánh quê, tiệm đồ quê tiên hạnh',
    image: coverImage,
    url: pageUrl,
    type: 'website',
  })

  // Watch products để cập nhật SEO và cleanup quantities khi data thay đổi
  watch(
    products,
    newProducts => {
      if (newProducts.length > 0) {
        // Cleanup quantities khi products thay đổi
        cleanupInvalidCartItems()

        addStructuredData({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Danh sách món đồ quê',
          itemListElement: newProducts.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'Product',
              name: p.title,
              description: p.description,
              image: p.thumbnail,
              offers: {
                '@type': 'Offer',
                priceCurrency: 'VND',
                price: p.price,
                availability: 'https://schema.org/InStock',
              },
            },
          })),
        })
      }
    },
    { immediate: true }
  )

  addStructuredData({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Shop',
        item: 'https://nguyenledinhtien.io.vn/shop',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Đặt món',
        item: pageUrl,
      },
    ],
  })
</script>

<style scoped>
  .ipt {
    @apply rounded-xl border border-[#e5d6c3] bg-white/70 px-4 py-3 text-[#3b2b23] placeholder-[#7a6657] focus:outline-none focus:ring-2 focus:ring-[#e7d8c0]/40;
  }
  .btn-place {
    @apply inline-flex items-center justify-center rounded-xl bg-[#3b2b23] text-[#f7efe6] px-5 py-3 font-medium hover:bg-[#2f221c] transition-colors;
  }
</style>
