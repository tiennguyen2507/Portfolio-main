<template>
  <div class="min-h-screen flex flex-col w-full min-w-0">
    <!-- Main Content -->
    <main class="flex-1 w-full min-w-0">
      <slot />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
  // Footer component is auto-imported from components/common/Footer
</script>
