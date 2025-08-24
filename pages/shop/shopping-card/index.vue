<template>
  <div class="bg-[#fdf6ee] min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <div class="flex items-center justify-between my-4">
        <h1 class="text-3xl sm:text-4xl font-bold text-[#3b2b23]">Giỏ hàng</h1>
        <div>
          <NuxtLink to="/shop/order" class="btn-back">
            <svg
              class="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Trở về đặt món
          </NuxtLink>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="text-center py-12 mb-6">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#3b2b23]"
        ></div>
        <p class="mt-4 text-[#7a6657]">Đang tải sản phẩm...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="text-center py-12 mb-6">
        <p class="text-red-600 mb-4">Có lỗi khi tải sản phẩm: {{ error }}</p>
        <button @click="fetchProducts()" class="btn-place">Thử lại</button>
      </div>

      <div
        v-else
        class="rounded-2xl overflow-hidden ring-1 ring-[#e5d6c3] bg-white/80"
      >
        <!-- Header for desktop -->
        <div
          class="hidden sm:grid grid-cols-12 gap-4 bg-[#f6eadb] text-[#3b2b23] px-4 py-3"
        >
          <div class="col-span-6">Sản phẩm</div>
          <div class="col-span-2">Giá</div>
          <div class="col-span-2">Số lượng</div>
          <div class="col-span-2 text-right">Thành tiền</div>
        </div>

        <!-- Rows -->
        <div
          v-for="row in rows"
          :key="row._id"
          class="border-t border-[#e5d6c3] px-4 py-4"
        >
          <!-- Mobile friendly card -->
          <div class="sm:hidden">
            <div class="flex gap-3">
              <Image
                :src="row.thumbnail"
                :alt="row.title"
                custom-class="h-12 w-12 rounded-lg object-cover"
              />
              <div class="flex-1 min-w-0">
                <div class="text-base font-semibold text-[#3b2b23] truncate">
                  {{ row.title }}
                </div>
                <ViewEditor
                  :content="row.description"
                  variant="default"
                  custom-class="text-xs text-[#7a6657] clamp-2"
                  :truncate="true"
                  :max-length="80"
                />
              </div>
            </div>
            <div class="mt-3 grid grid-cols-3 gap-2 items-stretch">
              <div class="mini-card">
                <div class="mini-label">Giá</div>
                <div class="text-[#3b2b23] text-sm font-medium">
                  {{ formatPrice(row.price) }}
                </div>
              </div>
              <div class="mini-card">
                <div class="mini-label">Thành tiền</div>
                <div class="text-[#3b2b23] text-sm font-semibold">
                  {{ formatPrice(row.price * (cart[row._id] || 0)) }}
                </div>
              </div>
              <div class="mini-card">
                <div class="mini-label">Số lượng</div>
                <QuantityInput
                  :input-class="'w-16'"
                  :wrapper-class="'justify-center'"
                  v-model="cart[row._id]"
                  :min="0"
                  :max="99"
                  @update:modelValue="sync()"
                />
              </div>
            </div>
          </div>

          <!-- Desktop row -->
          <div class="hidden sm:grid grid-cols-12 gap-4 items-center">
            <div class="col-span-6 flex items-center gap-3">
              <Image
                :src="row.thumbnail"
                :alt="row.title"
                custom-class="h-12 w-12 rounded-lg object-cover"
              />
              <div>
                <div class="font-medium text-[#3b2b23]">{{ row.title }}</div>
                <ViewEditor
                  :content="row.description"
                  variant="default"
                  custom-class="text-sm text-[#7a6657]"
                  :truncate="true"
                  :max-length="100"
                />
              </div>
            </div>
            <div class="col-span-2 text-[#4b3e35]">
              {{ formatPrice(row.price) }}
            </div>
            <div class="col-span-2">
              <QuantityInput
                :input-class="'w-20'"
                v-model="cart[row._id]"
                :min="0"
                :max="99"
                @update:modelValue="sync()"
              />
            </div>
            <div class="col-span-2 text-right text-[#3b2b23] font-semibold">
              {{ formatPrice(row.price * (cart[row._id] || 0)) }}
            </div>
          </div>
        </div>

        <div v-if="!rows.length" class="px-4 py-6 text-center text-[#7a6657]">
          Giỏ hàng trống.
        </div>
      </div>

      <!-- Summary + Customer info -->
      <div class="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <h2 class="text-2xl font-semibold text-[#3b2b23] mb-3">
            Thông tin khách hàng
          </h2>
          <!-- Mobile total summary -->
          <div
            class="sm:hidden mb-3 rounded-xl bg-[#f6eadb] p-3 flex items-center justify-between"
          >
            <span class="text-[#7a6657]">Tổng tiền</span>
            <span class="text-[#3b2b23] font-semibold">{{
              formatPrice(totalPrice)
            }}</span>
          </div>
          <form
            class="rounded-2xl bg-white/70 ring-1 ring-[#e5d6c3] p-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
            @submit.prevent="submit"
            novalidate
          >
            <div>
              <input
                v-model="form.name"
                placeholder="Họ và tên"
                :class="['ipt', errors.name && 'ipt-error', 'w-full']"
              />
              <p v-if="errors.name" class="err">{{ errors.name }}</p>
            </div>
            <div>
              <input
                v-model="form.phone"
                placeholder="Số điện thoại"
                :class="['ipt', errors.phone && 'ipt-error', 'w-full']"
              />
              <p v-if="errors.phone" class="err">{{ errors.phone }}</p>
            </div>
            <div class="sm:col-span-2">
              <input
                v-model="form.address"
                placeholder="Địa chỉ giao hàng"
                :class="['ipt', errors.address && 'ipt-error', 'w-full']"
              />
              <p v-if="errors.address" class="err">{{ errors.address }}</p>
            </div>
            <div class="sm:col-span-2">
              <textarea
                v-model="form.note"
                placeholder="Ghi chú"
                rows="3"
                class="ipt sm:col-span-2 w-full"
              ></textarea>
              <p class="text-xs text-[#ff0000]">
                *Ghi chú: Khách hàng thông cảm, chúng tôi chỉ giao hàng trong
                phạm vi 12km khu vực từ "FPT Complex, Nam Kì Khởi Nghĩa, Đà
                Nẵng" ,vì vậy vui lòng kiểm tra khoảng cách trước khi đặt hàng.
              </p>
            </div>

            <!-- Distance Confirmation Checkbox -->
            <div class="sm:col-span-2">
              <label class="flex items-start gap-3 cursor-pointer">
                <input
                  v-model="form.distanceConfirmed"
                  type="checkbox"
                  class="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  :class="{ 'border-red-500': showDistanceError }"
                />
                <div class="text-sm text-gray-700 leading-relaxed">
                  <span class="font-medium"
                    >Bạn đã kiểm tra khoảng cách từ bạn đến chúng tôi dưới 12km
                    phải không?</span
                  >
                  <span
                    v-if="showDistanceError"
                    class="block text-red-500 text-xs mt-1"
                  >
                    *Vui lòng xác nhận bạn đã kiểm tra khoảng cách trước khi đặt
                    hàng
                  </span>
                </div>
              </label>
            </div>

            <button
              type="submit"
              class="btn-place sm:col-span-2"
              :disabled="isSubmitting || !form.distanceConfirmed"
            >
              <Loading
                v-if="isSubmitting"
                size="xs"
                color="white"
                text=""
                container-class="py-0 mr-2"
              />
              <span>{{ isSubmitting ? 'Đang xử lý...' : 'Xác nhận đặt' }}</span>
            </button>
          </form>
        </div>
        <aside class="lg:col-span-1">
          <h2 class="text-2xl font-semibold text-[#3b2b23] mb-3">Tổng kết</h2>
          <div class="rounded-2xl bg-white/70 ring-1 ring-[#e5d6c3] p-6">
            <div class="flex justify-between text-[#4b3e35]">
              <span>Tổng sản phẩm</span><span>{{ totalQuantity }}</span>
            </div>
            <div
              class="mt-3 pt-3 border-t border-[#e5d6c3] flex justify-between text-[#3b2b23] font-semibold"
            >
              <span>Tổng cộng</span>
              <span>{{ formatPrice(totalPrice) }}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, watch, ref, reactive, computed } from 'vue'
  import { useSEO } from '~/composables/useSEO'
  import httpRequest from '~/utils/httpRequest'
  const { setPageSEO, addStructuredData } = useSEO()
  import QuantityInput from '~/pages/shop/_components/QuantityInput.vue'
  import Image from '~/components/ui/Image.vue'
  import ViewEditor from '~/components/ui/ViewEditor.vue'

  const cart = useLocalStorage('th_shop_cart', {})

  // State
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)
  const isSubmitting = ref(false)

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
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err) {
      error.value = err.message
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

  const rows = computed(() => {
    if (!products.value.length) return []
    return products.value
      .filter(p => (cart.value?.[p._id] || 0) > 0)
      .map(p => ({ ...p }))
  })

  const totalQuantity = computed(() =>
    Object.values(cart.value || {}).reduce((a, b) => a + Number(b || 0), 0)
  )

  const totalPrice = computed(() => {
    if (!products.value.length) return 0
    return products.value.reduce(
      (sum, p) => sum + (cart.value?.[p._id] || 0) * p.price,
      0
    )
  })

  const form = reactive({
    name: '',
    phone: '',
    address: '',
    note: '',
    distanceConfirmed: false,
  })
  const errors = reactive({ name: '', phone: '', address: '' })
  const showDistanceError = ref(false)
  const sync = () => (cart.value = { ...(cart.value || {}) })

  // Cleanup invalid cart items
  const cleanupInvalidCartItems = () => {
    if (!products.value.length || !cart.value) return

    const validProductIds = products.value.map(p => p._id)
    const cartKeys = Object.keys(cart.value)
    let hasChanges = false

    // Xóa sản phẩm không tồn tại trong products
    cartKeys.forEach(productId => {
      if (!validProductIds.includes(productId)) {
        console.log(`Removing invalid product from cart: ${productId}`)
        delete cart.value[productId]
        hasChanges = true
      }
    })

    // Xóa sản phẩm có số lượng không hợp lệ
    cartKeys.forEach(productId => {
      const quantity = cart.value[productId]
      if (
        quantity === null ||
        quantity === undefined ||
        quantity < 0 ||
        !Number.isInteger(Number(quantity))
      ) {
        console.log(
          `Removing product with invalid quantity from cart: ${productId}, quantity: ${quantity}`
        )
        delete cart.value[productId]
        hasChanges = true
      }
    })

    // Xóa sản phẩm có số lượng = 0
    cartKeys.forEach(productId => {
      const quantity = cart.value[productId]
      if (quantity === 0) {
        console.log(
          `Removing product with zero quantity from cart: ${productId}`
        )
        delete cart.value[productId]
        hasChanges = true
      }
    })

    // Sync cart nếu có thay đổi
    if (hasChanges) {
      sync()
      console.log('Cart cleaned up, invalid items removed')
    }
  }

  const validate = () => {
    errors.name = ''
    errors.phone = ''
    errors.address = ''
    showDistanceError.value = false

    if (!form.name || form.name.trim().length < 2) {
      errors.name = 'Vui lòng nhập họ và tên hợp lệ.'
    }

    const phone = (form.phone || '').replace(/\s+/g, '')
    const phoneOk = /^(0|\+84)(\d){9,10}$/.test(phone)
    if (!phoneOk) {
      errors.phone = 'Số điện thoại không hợp lệ (bắt đầu 0 hoặc +84).'
    }

    if (!form.address || form.address.trim().length < 6) {
      errors.address = 'Vui lòng nhập địa chỉ giao hàng chi tiết.'
    }

    if (!form.distanceConfirmed) {
      showDistanceError.value = true
      return false
    }

    return !errors.name && !errors.phone && !errors.address
  }

  const submit = async () => {
    if (!rows.value.length) return alert('Giỏ hàng trống.')
    if (!validate()) {
      return
    }

    // Bắt đầu loading
    isSubmitting.value = true

    try {
      // Chuẩn bị dữ liệu order theo API spec
      const orderData = {
        fullName: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        note: form.note.trim() || '',
        orderItems: rows.value.map(item => ({
          productId: item._id,
          quantity: cart.value[item._id] || 0,
        })),
      }

      console.log('Submitting order:', orderData)

      // Gọi API tạo order
      const response = await httpRequest.post('/orders', orderData)

      if (response) {
        console.log('Order created successfully:', response)

        // Hiển thị thông báo thành công
        const summary = rows.value
          .map(p => `${p.title} × ${cart.value[p._id]}`)
          .join(', ')

        alert(
          `Đặt hàng thành công!\nMã đơn hàng: ${response._id || 'N/A'}\nMón: ${summary}\nTổng: ${formatPrice(totalPrice.value)}\nKhách: ${form.name} - ${form.phone}\nĐ/c: ${form.address}`
        )

        // Clear cart after success
        cart.value = {}
        if (typeof window !== 'undefined') {
          try {
            localStorage.removeItem('th_shop_cart')
          } catch {}
        }

        // Reset form
        form.name = ''
        form.phone = ''
        form.address = ''
        form.note = ''
        form.distanceConfirmed = false

        // Redirect về trang order
        await navigateTo('/shop/order')
      }
    } catch (error) {
      console.error('Error creating order:', error)

      // Hiển thị lỗi cụ thể từ API
      let errorMessage = 'Có lỗi xảy ra khi đặt hàng!'

      if (error.data?.message) {
        errorMessage = error.data.message
      } else if (error.message) {
        errorMessage = error.message
      }

      alert(`Lỗi đặt hàng: ${errorMessage}`)
    } finally {
      // Kết thúc loading
      isSubmitting.value = false
    }
  }

  const formatPrice = v =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(v)

  definePageMeta({ layout: 'shop' })

  // SEO
  const pageUrl = 'https://nguyenledinhtien.io.vn/shop/shopping-card'
  const coverImage =
    'https://res.cloudinary.com/daqwg8oql/image/upload/v1755689053/tien-hanh-shop/dia-khoai-bap_hdnt2c.png'

  setPageSEO({
    title: 'Giỏ hàng – Tiệm Đồ Quê Tiên Hạnh',
    description:
      'Xem lại các món đồ quê đã chọn: khoai lang, sắn, trứng gà ta, đậu phộng rang, bánh quê… Nhập thông tin và xác nhận đặt hàng nhanh chóng.',
    keywords:
      'giỏ hàng, đặt đồ quê, khoai lang, sắn, trứng gà ta, đậu phộng, bánh quê, Tiên Hạnh',
    image: coverImage,
    url: pageUrl,
    type: 'website',
  })

  // Watch products để cập nhật SEO và cleanup cart khi data thay đổi
  watch(
    products,
    newProducts => {
      if (newProducts.length > 0) {
        // Cleanup cart khi products thay đổi
        cleanupInvalidCartItems()

        addStructuredData({
          '@context': 'https://schema.org',
          '@type': 'ShoppingCart',
          name: 'Giỏ hàng Tiệm Đồ Quê Tiên Hạnh',
          url: pageUrl,
          image: [coverImage],
          itemListElement: rows.value.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'Product',
              name: item.title,
              description: item.description,
              image: item.thumbnail,
              offers: {
                '@type': 'Offer',
                priceCurrency: 'VND',
                price: item.price,
                availability: 'https://schema.org/InStock',
              },
            },
          })),
        })
      }
    },
    { immediate: true }
  )
</script>

<style scoped>
  .ipt {
    @apply rounded-xl border border-[#e5d6c3] bg-white/70 px-4 py-3 text-[#3b2b23] placeholder-[#7a6657] focus:outline-none focus:ring-2 focus:ring-[#e7d8c0]/40;
  }
  .btn-place {
    @apply inline-flex items-center justify-center rounded-xl bg-[#3b2b23] text-[#f7efe6] px-5 py-3 font-medium hover:bg-[#2f221c] transition-colors disabled:bg-[#7a6657] disabled:cursor-not-allowed disabled:opacity-60;
  }
  .btn-back {
    @apply inline-flex items-center justify-center rounded-lg border border-[#3b2b23] text-[#3b2b23] px-4 py-2 text-sm font-medium hover:bg-[#3b2b23] hover:text-[#f7efe6] transition-all duration-200 hover:shadow-md;
  }
  .mini-card {
    @apply rounded-lg bg-[#f6eadb] p-2 text-center flex flex-col justify-center;
  }
  .mini-label {
    @apply text-[10px] text-[#7a6657];
  }
  .ipt-error {
    @apply border-red-500 ring-2 ring-red-200;
  }
  .err {
    @apply mt-1 text-xs text-red-600;
  }
</style>
