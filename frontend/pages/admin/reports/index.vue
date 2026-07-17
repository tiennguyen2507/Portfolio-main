<template>
  <div>
    <HeaderContent
      title="Báo cáo"
      subtitle="Trang báo cáo hiệu suất hệ thống sẽ được phát triển ở đây"
    />
  </div>
</template>

<script setup>
  import HeaderContent from '~/components/common/Admin/HeaderContent.vue'

  definePageMeta({
    layout: 'admin',
    middleware: 'auth',
  })
  // Trang báo cáo đơn giản
</script>
