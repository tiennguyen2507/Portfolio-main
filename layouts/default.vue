<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <PortfolioHeader />

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <PortfolioFooter />
  </div>
</template>

<script setup>
import PortfolioHeader from "~/pages/_components/PortfolioHeader.vue";
import PortfolioFooter from "~/pages/_components/PortfolioFooter.vue";
</script>
