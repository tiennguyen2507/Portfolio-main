<template>
  <header
    class="w-full fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-[#dbcab8]/60 bg-[#f4e3d0]/70"
  >
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex items-center justify-between">
        <div class="flex justify-between gap-3">
          <img
            :src="logoSrc"
            alt="Tien Hanh Shop"
            class="h-12 sm:h-12 w-auto"
          />
        </div>
        <nav class="hidden md:flex items-center gap-8 text-[#6b584b]">
          <NuxtLink class="nav-link" to="/shop">Cửa hàng</NuxtLink>
          <NuxtLink class="nav-link" to="/about">Giới thiệu</NuxtLink>
          <NuxtLink class="nav-link" to="/blogs">Blog</NuxtLink>
          <NuxtLink class="nav-link" to="/locations">Địa điểm</NuxtLink>
          <NuxtLink class="nav-link" to="/contact">Liên hệ</NuxtLink>
        </nav>
        <div class="flex items-center gap-2 md:hidden">
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
</style>
