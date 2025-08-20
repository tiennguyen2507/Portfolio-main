<template>
  <header
    class="w-full fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-[#dbcab8]/60 bg-[#f4e3d0]/70"
  >
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex items-center justify-between">
        <div class="flex justify-between gap-3">
          <NuxtLink
            to="/shop"
            class="inline-flex items-center"
            aria-label="Trang chủ shop"
          >
            <img
              :src="logoSrc"
              alt="Tien Hanh Shop"
              class="h-12 sm:h-12 w-auto"
            />
          </NuxtLink>
        </div>
        <nav class="hidden md:flex items-center gap-8 text-[#6b584b]">
          <NuxtLink class="nav-link" to="/shop">Cửa hàng</NuxtLink>
          <NuxtLink class="nav-link" to="/about">Giới thiệu</NuxtLink>
          <NuxtLink class="nav-link" to="/blogs">Blog</NuxtLink>
          <NuxtLink class="nav-link" to="/locations">Địa điểm</NuxtLink>
          <NuxtLink class="nav-link" to="/contact">Liên hệ</NuxtLink>
          <NuxtLink
            to="/shop/shopping-card"
            aria-label="Giỏ hàng"
            class="icon-btn hidden md:inline-flex relative"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
              <path
                d="M7 4h-2a1 1 0 1 1 0-2h3a1 1 0 0 1 .92.6L10.38 6H20a1 1 0 0 1 .95 1.31l-2 6A1 1 0 0 1 18 14H9a1 1 0 0 1-.95-.68L6.1 6.76 5.62 5.6A1 1 0 0 0 4.7 5H3a1 1 0 1 1 0-2h1.7a3 3 0 0 1 2.78 1.8L7 4zm2.62 8h7.76l1.33-4H9.38l.24.72 2 5.98zM9 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm8 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
              />
            </svg>
            <span v-if="cartQty" class="cart-badge">{{ cartQty }}</span>
          </NuxtLink>
        </nav>
        <div class="flex items-center gap-2 md:hidden">
          <NuxtLink
            to="/shop/shopping-card"
            aria-label="Giỏ hàng"
            class="icon-btn relative"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
              <path
                d="M7 4h-2a1 1 0 1 1 0-2h3a1 1 0 0 1 .92.6L10.38 6H20a1 1 0 0 1 .95 1.31l-2 6A1 1 0 0 1 18 14H9a1 1 0 0 1-.95-.68L6.1 6.76 5.62 5.6A1 1 0 0 0 4.7 5H3a1 1 0 1 1 0-2h1.7a3 3 0 0 1 2.78 1.8L7 4zm2.62 8h7.76l1.33-4H9.38l.24.72 2 5.98zM9 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm8 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
              />
            </svg>
            <span v-if="cartQty" class="cart-badge">{{ cartQty }}</span>
          </NuxtLink>
          <button
            class="md:hidden text-[#6b584b] hover:text-[#3b2b23] transition-colors"
            aria-label="Toggle menu"
            @click="toggleMobileMenu"
          >
            <svg
              class="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div
        v-if="showMobileMenu"
        class="md:hidden mt-2 pb-4 border-t border-[#dbcab8]"
      >
        <ul class="flex flex-col space-y-2 pt-4">
          <li>
            <NuxtLink class="mobile-link" to="/shop" @click="closeMobileMenu"
              >Cửa hàng</NuxtLink
            >
          </li>
          <li>
            <NuxtLink class="mobile-link" to="/about" @click="closeMobileMenu"
              >Giới thiệu</NuxtLink
            >
          </li>
          <li>
            <NuxtLink class="mobile-link" to="/blogs" @click="closeMobileMenu"
              >Blog</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="mobile-link"
              to="/locations"
              @click="closeMobileMenu"
              >Địa điểm</NuxtLink
            >
          </li>
          <li>
            <NuxtLink class="mobile-link" to="/contact" @click="closeMobileMenu"
              >Liên hệ</NuxtLink
            >
          </li>
          <li class="pt-2">
            <NuxtLink
              to="/order"
              class="btn btn-primary w-full justify-center py-3"
              @click="closeMobileMenu"
              >Đặt hàng online</NuxtLink
            >
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
  import logoSrc from '~/assets/images/Tien-hanh-shop-logo-no-bg.webp'
  const showMobileMenu = ref(false)
  const route = useRoute()
  const cart = useLocalStorage('th_shop_cart', {})
  const cartQty = computed(() =>
    Object.values(cart.value || {}).reduce((a, b) => a + Number(b || 0), 0)
  )

  const toggleMobileMenu = () => {
    showMobileMenu.value = !showMobileMenu.value
  }
  const closeMobileMenu = () => {
    showMobileMenu.value = false
  }
  watch(
    () => route.path,
    () => {
      showMobileMenu.value = false
    }
  )
</script>

<style scoped>
  .btn {
    @apply inline-flex items-center justify-center rounded-lg font-semibold transition-colors;
  }
  .btn-primary {
    @apply bg-[#3b2b23] text-[#f7efe6] hover:bg-[#2f221c] px-4 py-2 shadow-sm;
  }
  .nav-link {
    @apply text-[#6b584b] hover:text-[#3b2b23] transition-colors;
  }
  .mobile-link {
    @apply block px-4 py-3 text-[#6b584b] hover:text-[#3b2b23] hover:bg-white/40 rounded-lg transition-all duration-200 text-right;
  }
  .icon-btn {
    @apply inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#dbcab8]/60 text-[#6b584b] hover:text-[#3b2b23] bg-white/40 hover:bg-white/60 transition-colors;
  }
  .cart-badge {
    @apply absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 inline-flex items-center justify-center rounded-full bg-[#3b2b23] text-[#f7efe6] text-[11px] font-semibold;
  }
</style>
