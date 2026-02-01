<template>
  <div class="min-h-screen flex flex-col">
    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
  // Footer component is auto-imported from components/common/Footer
</script>
