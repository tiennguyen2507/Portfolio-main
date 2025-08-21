<template>
  <div class="bg-[#fdf6ee] min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <h1 class="text-3xl sm:text-4xl font-bold text-[#3b2b23] mb-6">
        Giỏ hàng
      </h1>

      <div
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
          :key="row.id"
          class="border-t border-[#e5d6c3] px-4 py-4"
        >
          <!-- Mobile friendly card -->
          <div class="sm:hidden">
            <div class="flex gap-3">
              <Image
                :src="row.image"
                :alt="row.name"
                custom-class="h-12 w-12 rounded-lg object-cover"
              />
              <div class="flex-1 min-w-0">
                <div class="text-base font-semibold text-[#3b2b23] truncate">
                  {{ row.name }}
                </div>
                <div class="text-xs text-[#7a6657] clamp-2">{{ row.desc }}</div>
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
                  {{ formatPrice(row.price * (cart[row.id] || 0)) }}
                </div>
              </div>
              <div class="mini-card">
                <div class="mini-label">Số lượng</div>
                <QuantityInput
                  :input-class="'w-16'"
                  :wrapper-class="'justify-center'"
                  v-model="cart[row.id]"
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
                :src="row.image"
                :alt="row.name"
                custom-class="h-12 w-12 rounded-lg object-cover"
              />
              <div>
                <div class="font-medium text-[#3b2b23]">{{ row.name }}</div>
                <div class="text-sm text-[#7a6657]">{{ row.desc }}</div>
              </div>
            </div>
            <div class="col-span-2 text-[#4b3e35]">
              {{ formatPrice(row.price) }}
            </div>
            <div class="col-span-2">
              <QuantityInput
                :input-class="'w-20'"
                v-model="cart[row.id]"
                :min="0"
                :max="99"
                @update:modelValue="sync()"
              />
            </div>
            <div class="col-span-2 text-right text-[#3b2b23] font-semibold">
              {{ formatPrice(row.price * (cart[row.id] || 0)) }}
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
            <textarea
              v-model="form.note"
              placeholder="Ghi chú"
              rows="3"
              class="ipt sm:col-span-2"
            ></textarea>
            <button type="submit" class="btn-place sm:col-span-2">
              Xác nhận đặt
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
  import { shopProducts } from '~/utils/mock'
  import { useSEO } from '~/composables/useSEO'
  const { setPageSEO, addStructuredData } = useSEO()
  import QuantityInput from '~/pages/shop/_components/QuantityInput.vue'
  import Image from '~/components/ui/Image.vue'
  const cart = useLocalStorage('th_shop_cart', {})

  const rows = computed(() =>
    shopProducts.filter(p => (cart.value?.[p.id] || 0) > 0).map(p => ({ ...p }))
  )
  const totalQuantity = computed(() =>
    Object.values(cart.value || {}).reduce((a, b) => a + Number(b || 0), 0)
  )
  const totalPrice = computed(() =>
    shopProducts.reduce(
      (sum, p) => sum + (cart.value?.[p.id] || 0) * p.price,
      0
    )
  )

  const form = reactive({ name: '', phone: '', address: '', note: '' })
  const errors = reactive({ name: '', phone: '', address: '' })
  const sync = () => (cart.value = { ...(cart.value || {}) })

  const validate = () => {
    errors.name = ''
    errors.phone = ''
    errors.address = ''

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

    return !errors.name && !errors.phone && !errors.address
  }

  const submit = () => {
    if (!rows.value.length) return alert('Giỏ hàng trống.')
    if (!validate()) {
      return
    }
    const summary = shopProducts
      .filter(p => (cart.value?.[p.id] || 0) > 0)
      .map(p => `${p.name} × ${cart.value[p.id]}`)
      .join(', ')
    alert(
      `Đặt hàng thành công!\nMón: ${summary}\nTổng: ${formatPrice(totalPrice.value)}\nKhách: ${form.name} - ${form.phone}\nĐ/c: ${form.address}`
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

  addStructuredData({
    '@context': 'https://schema.org',
    '@type': 'ShoppingCart',
    name: 'Giỏ hàng Tiệm Đồ Quê Tiên Hạnh',
    url: pageUrl,
    image: [coverImage],
  })
</script>

<style scoped>
  .ipt {
    @apply rounded-xl border border-[#e5d6c3] bg-white/70 px-4 py-3 text-[#3b2b23] placeholder-[#7a6657] focus:outline-none focus:ring-2 focus:ring-[#e7d8c0]/40;
  }
  .btn-place {
    @apply inline-flex items-center justify-center rounded-xl bg-[#3b2b23] text-[#f7efe6] px-5 py-3 font-medium hover:bg-[#2f221c] transition-colors;
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
