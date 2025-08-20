<template>
  <div class="bg-[#fdf6ee] min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8 py-10 lg:py-14">
      <header class="text-center mb-8">
        <h1 class="text-4xl sm:text-5xl font-serif font-bold text-[#3b2b23]">
          Đặt Món Quê Nhà
        </h1>
        <p class="mt-3 text-[#7a6657]">
          Chọn món bạn yêu thích, nhập thông tin – chúng tôi sẽ liên hệ xác nhận
          ngay.
        </p>
      </header>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4 lg:gap-8">
        <Card
          v-for="product in products"
          :key="product.id"
          :item="product"
          v-model="quantities[product.id]"
          @add="onAdd"
        />
      </div>

      <section class="mt-8 text-center">
        <NuxtLink to="/shop/shopping-card" class="btn-place"
          >Xem giỏ hàng</NuxtLink
        >
      </section>
    </div>
  </div>
</template>

<script setup>
  import Card from './_components/Card.vue'

  import { shopProducts } from '~/utils/mock'
  import { useSEO } from '~/composables/useSEO'
  const { setPageSEO, addStructuredData } = useSEO()
  const products = shopProducts

  const quantities = reactive(Object.fromEntries(products.map(p => [p.id, 0])))

  const cartItems = computed(() =>
    products
      .map(p => ({ item: p, quantity: quantities[p.id] }))
      .filter(ci => ci.quantity > 0)
  )
  const total = computed(() =>
    cartItems.value.reduce((sum, ci) => sum + ci.quantity * ci.item.price, 0)
  )

  const form = reactive({ name: '', phone: '', address: '', note: '' })

  const onAdd = ({ item, quantity }) => {
    if (quantity <= 0) return
    quantities[item.id] = quantity
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

  addStructuredData({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Danh sách món đồ quê',
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        description: p.desc,
        image: p.image,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'VND',
          price: p.price,
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  })

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
