<template>
  <div>
    <HeaderContent
      title="Cài đặt"
      subtitle="Trang cài đặt hệ thống sẽ được phát triển ở đây"
    />
  </div>
</template>

<script setup>
  import HeaderContent from '~/components/admin/HeaderContent.vue'

  definePageMeta({
    layout: 'admin',
    middleware: 'auth',
  })
  // Trang cài đặt đơn giản
</script>
