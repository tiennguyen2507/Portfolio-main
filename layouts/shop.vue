<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-b from-[#f4e3d0] via-[#f8ead8] to-[#fdf6ee] overflow-hidden"
  >
    <HeaderShop />
    <main class="flex-1">
      <slot />
    </main>
    <FooterShop />
  </div>
</template>

<script setup>
  import HeaderShop from '~/pages/shop/_components/HeaderShop.vue'
  import FooterShop from '~/pages/shop/_components/FooterShop.vue'
</script>
