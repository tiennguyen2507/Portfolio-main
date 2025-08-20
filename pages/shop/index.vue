<template>
  <div>
    <HeroShop />
    <IntroduceShop />
    <AboutShop />
  </div>
</template>

<script setup>
  import HeroShop from './_components/HeroShop.vue'
  import IntroduceShop from './_components/IntroduceShop.vue'
  import AboutShop from './_components/AboutShop.vue'

  definePageMeta({
    layout: 'shop',
  })
</script>
