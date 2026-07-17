<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <PortfolioHeader />

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
  import PortfolioHeader from '~/pages/_components/PortfolioHeader.vue'
  // Footer component is auto-imported from components/common/Footer
</script>
