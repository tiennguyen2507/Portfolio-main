<template>
  <section
    class="relative isolate overflow-hidden min-h-[100vh] sm:min-h-[100svh] flex items-center bg-gradient-to-b from-[#f4e3d0] via-[#f8ead8] to-[#fdf6ee] pt-20 md:pt-24"
  >
    <div class="absolute inset-0 -z-10" />

    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center py-6 md:py-10 lg:py-20"
      >
        <!-- Left: Content -->
        <div class="lg:col-span-7 text-center lg:text-left">
          <!-- Top navigation -->

          <h1
            class="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#3b2b23]"
          >
            Chào mừng bạn
            <span class="block text-[#3b2b23]">Shop của Tiên và Hạnh</span>
          </h1>

          <p class="mt-6 text-lg leading-8 text-[#7a6657] max-w-2xl">
            Ở đây có bán rất nhiều thứ bạn thích, đồ ăn sáng, đồ quê, đồ ngon và
            đặc biệt là đồ ngon và rẻ, chất lượng thì đảm bảo, bạn hãy yên tâm
            nhé!
          </p>

          <div
            class="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <NuxtLink to="/order" class="btn btn-primary btn-lg">
              Đặt hàng
            </NuxtLink>
            <NuxtLink to="/locations" class="btn btn-outline btn-lg">
              Xem vị trí Shop
            </NuxtLink>
          </div>
        </div>

        <!-- Right: Decorative image -->
        <div class="lg:col-span-5 relative block mt-8 lg:mt-0">
          <div class="relative mx-auto w-full max-w-md">
            <img
              :src="heroImageUrl"
              alt="Signature Dish"
              class="w-full h-auto rounded-2xl shadow-2xl ring-1 ring-black/5"
              loading="eager"
              fetchpriority="high"
            />
            <div
              class="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-orange-200/50 via-orange-100/40 to-transparent blur-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import logoSrc from '~/assets/images/Tien-hanh-shop-logo-no-bg.webp'
  const heroImageUrl =
    'https://res.cloudinary.com/daqwg8oql/image/upload/v1755689053/tien-hanh-shop/dia-khoai-bap_hdnt2c.png'
</script>

<style scoped>
  .btn {
    @apply inline-flex items-center justify-center rounded-lg font-semibold transition-colors;
  }
  .btn-primary {
    @apply bg-[#3b2b23] text-[#f7efe6] hover:bg-[#2f221c] px-6 py-3 shadow-sm;
  }
  .btn-outline {
    @apply border-2 border-[#3b2b23] text-[#3b2b23] hover:bg-[#efe4d8] px-6 py-3;
  }

  .nav-link {
    @apply text-[#6b584b] hover:text-[#3b2b23] transition-colors;
  }
</style>
