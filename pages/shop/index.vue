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
  import { useSEO } from '~/composables/useSEO'

  const { setPageSEO, addStructuredData } = useSEO()

  const pageUrl = 'https://nguyenledinhtien.io.vn/shop'
  const coverImage =
    'https://res.cloudinary.com/daqwg8oql/image/upload/v1755689053/tien-hanh-shop/dia-khoai-bap_hdnt2c.png'

  setPageSEO({
    title:
      'Tiệm Đồ Quê Tiên Hạnh - Khoai, Sắn, Trứng Gà Ta, Đậu | Ăn sáng ngon sạch',
    description:
      'Tiệm đồ quê Tiên Hạnh chuyên khoai lang, sắn, trứng gà ta, đậu phộng rang và bánh quê. Món sạch, mộc mạc, giao nhanh trong ngày – bữa sáng ngon lành cho cả nhà.',
    keywords:
      'đồ quê, khoai lang, sắn, trứng gà ta, đậu phộng rang, bánh quê, bữa sáng, đồ ăn sạch, đặc sản quê, Tiên Hạnh',
    image: coverImage,
    url: pageUrl,
    type: 'website',
  })

  addStructuredData({
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'Tiệm Đồ Quê Tiên Hạnh',
    description:
      'Cửa hàng đồ quê: khoai, sắn, trứng gà ta, đậu phộng rang, bánh quê – món sạch, mộc mạc cho bữa sáng.',
    image: [coverImage],
    url: pageUrl,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Việt Nam',
      addressCountry: 'VN',
    },
    sameAs: ['https://facebook.com', 'https://instagram.com'],
    department: [
      { '@type': 'DepartmentStore', name: 'Khoai & Sắn' },
      { '@type': 'DepartmentStore', name: 'Trứng gà ta' },
      { '@type': 'DepartmentStore', name: 'Đậu phộng & bánh quê' },
    ],
    servesCuisine: ['Vietnamese', 'Breakfast'],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '06:00',
        closes: '20:00',
      },
    ],
  })

  definePageMeta({
    layout: 'shop',
  })
</script>
