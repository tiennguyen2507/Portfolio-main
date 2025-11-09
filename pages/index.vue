<template>
  <div
    class="min-h-screen bg-gray-900 text-white w-full max-w-full overflow-x-hidden"
  >
    <StructuredData />
    <PortfolioHero />
    <TechnologiesSection />
    <PortfolioAbout />
    <ProjectsSection />
    <PortfolioShop />
    <PortfolioBlog />
    <PortfolioWedding />
    <CommentsAboutMe />

    <PortfolioContact @submit="handleContactSubmit" />
  </div>
</template>

<script setup>
  import PortfolioHero from '~/pages/_components/PortfolioHero.vue'
  import TechnologiesSection from '~/pages/_components/TechnologiesSection.vue'
  import ProjectsSection from '~/pages/_components/ProjectsSection.vue'
  import PortfolioShop from '~/pages/_components/PortfolioShop.vue'
  import PortfolioWedding from '~/pages/_components/PortfolioWedding.vue'
  import PortfolioBlog from '~/pages/_components/PortfolioBlog.vue'
  import StructuredData from '~/components/StructuredData.vue'
  import CommentsAboutMe from '~/pages/_components/CommentsAboutMe.vue'

  // Enhanced SEO Meta Tags - Optimized for Google Search
  useHead({
    title:
      'Nguyễn Lê Đình Tiên - Fullstack Web Developer | React, Vue.js, Node.js | Đà Nẵng',
    meta: [
      // Basic SEO - Optimized for Google Search (50-60 characters)
      {
        name: 'description',
        content:
          'Nguyễn Lê Đình Tiên - Lập trình viên web với 6 năm kinh nghiệm. Chuyên Frontend (React, Vue.js) và Backend (Node.js, NestJS). Dựa tại Đà Nẵng, Việt Nam.',
      },
      {
        name: 'keywords',
        content:
          'web developer, fullstack developer, frontend developer, backend developer, React developer, Vue.js developer, Node.js developer, Đà Nẵng, Việt Nam, hire developer, modern UI/UX, API development, software engineer, NestJS, TypeScript, JavaScript, web development, portfolio',
      },
      {
        name: 'author',
        content: 'Nguyễn Lê Đình Tiên',
      },
      {
        name: 'robots',
        content:
          'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
      {
        name: 'googlebot',
        content: 'index, follow',
      },
      {
        name: 'google-site-verification',
        content: 'your-google-verification-code', // Thay bằng code từ Google Search Console
      },
      {
        name: 'google',
        content: 'notranslate',
      },
      {
        name: 'language',
        content: 'Vietnamese',
      },
      {
        name: 'geo.region',
        content: 'VN',
      },
      {
        name: 'geo.placename',
        content: 'Da Nang, Vietnam',
      },
      {
        name: 'geo.position',
        content: '16.0544;108.2022',
      },
      {
        name: 'ICBM',
        content: '16.0544, 108.2022',
      },

      // Open Graph (Facebook, LinkedIn)
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:title',
        content:
          'Nguyễn Lê Đình Tiên - Fullstack Web Developer | React, Vue.js, Node.js | Đà Nẵng',
      },
      {
        property: 'og:description',
        content:
          'Nguyễn Lê Đình Tiên - Lập trình viên web với 6 năm kinh nghiệm. Chuyên Frontend (React, Vue.js) và Backend (Node.js, NestJS). Dựa tại Đà Nẵng, Việt Nam.',
      },
      {
        property: 'og:image',
        content: 'https://nguyenledinhtien.io.vn/images/logo-main.webp',
      },
      {
        property: 'og:image:width',
        content: '1200',
      },
      {
        property: 'og:image:height',
        content: '630',
      },
      {
        property: 'og:url',
        content: 'https://nguyenledinhtien.io.vn',
      },
      {
        property: 'og:site_name',
        content: 'nguyenledinhtien.io.vn',
      },
      {
        property: 'og:locale',
        content: 'vi_VN',
      },

      // Twitter Card
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content:
          'Nguyễn Lê Đình Tiên - Fullstack Web Developer | React, Vue.js, Node.js | Đà Nẵng',
      },
      {
        name: 'twitter:description',
        content:
          'Nguyễn Lê Đình Tiên - Lập trình viên web với 6 năm kinh nghiệm. Chuyên Frontend (React, Vue.js) và Backend (Node.js, NestJS). Dựa tại Đà Nẵng, Việt Nam.',
      },
      {
        name: 'twitter:image',
        content: 'https://nguyenledinhtien.io.vn/images/logo-main.webp',
      },
      {
        name: 'twitter:site',
        content: '@yourusername',
      },
      {
        name: 'twitter:creator',
        content: '@yourusername',
      },

      // Additional SEO
      {
        name: 'canonical',
        content: 'https://nguyenledinhtien.io.vn',
      },
      {
        name: 'theme-color',
        content: '#f97316',
      },
      {
        name: 'msapplication-TileColor',
        content: '#f97316',
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent',
      },
      {
        name: 'apple-mobile-web-app-title',
        content: 'Nguyễn Lê Đình Tiên',
      },
      {
        name: 'application-name',
        content: 'Nguyễn Lê Đình Tiên Portfolio',
      },
      {
        name: 'msapplication-config',
        content: '/browserconfig.xml',
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: 'https://nguyenledinhtien.io.vn',
      },
      {
        rel: 'icon',
        type: 'image/webp',
        href: '/favicon.webp',
      },
      {
        rel: 'shortcut icon',
        type: 'image/webp',
        href: '/favicon.webp',
      },
      {
        rel: 'apple-touch-icon',
        href: '/favicon.webp',
      },
      {
        rel: 'alternate',
        hreflang: 'vi',
        href: 'https://nguyenledinhtien.io.vn',
      },
      {
        rel: 'alternate',
        hreflang: 'en',
        href: 'https://nguyenledinhtien.io.vn/en',
      },
      {
        rel: 'alternate',
        hreflang: 'x-default',
        href: 'https://nguyenledinhtien.io.vn',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: '',
      },
      {
        rel: 'dns-prefetch',
        href: 'https://www.google-analytics.com',
      },
      {
        rel: 'dns-prefetch',
        href: 'https://www.googletagmanager.com',
      },
    ],
    script: [
      // Structured Data - Person Schema
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Nguyễn Lê Đình Tiên',
          alternateName: 'Tien Nguyen',
          givenName: 'Đình Tiên',
          familyName: 'Nguyễn Lê',
          jobTitle: 'Fullstack Web Developer',
          description:
            'Lập trình viên web với 6 năm kinh nghiệm trong Frontend và Backend Development',
          url: 'https://nguyenledinhtien.io.vn',
          image: {
            '@type': 'ImageObject',
            url: 'https://nguyenledinhtien.io.vn/images/logo-main.webp',
            width: 400,
            height: 400,
          },
          sameAs: [
            'https://github.com/yourusername',
            'https://linkedin.com/in/yourusername',
            'https://twitter.com/yourusername',
            'https://facebook.com/yourusername',
          ],
          worksFor: {
            '@type': 'Organization',
            name: 'Freelance',
          },
          knowsAbout: [
            'Web Development',
            'Frontend Development',
            'Backend Development',
            'React',
            'Vue.js',
            'Node.js',
            'JavaScript',
            'TypeScript',
            'NestJS',
            'API Development',
            'UI/UX Design',
            'Database Design',
            'DevOps',
            'Cloud Computing',
          ],
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Đà Nẵng',
            addressRegion: 'Đà Nẵng',
            addressCountry: 'VN',
            postalCode: '50000',
          },
          telephone: '+84-xxx-xxx-xxxx',
          email: 'contact@nguyenledinhtien.io.vn',
          birthDate: '1995-01-01', // Thay bằng ngày sinh thực tế
          nationality: 'Vietnamese',
          alumniOf: {
            '@type': 'CollegeOrUniversity',
            name: 'Đại học Bách khoa Đà Nẵng', // Thay bằng trường đại học thực tế
          },
          hasOccupation: {
            '@type': 'Occupation',
            name: 'Software Developer',
            occupationLocation: {
              '@type': 'City',
              name: 'Đà Nẵng',
            },
          },
          makesOffer: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Web Development Services',
                description:
                  'Frontend và Backend development với React, Vue.js, Node.js',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'UI/UX Design',
                description:
                  'Thiết kế giao diện người dùng hiện đại và responsive',
              },
            },
          ],
        }),
      },
      // Structured Data - WebSite Schema
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Nguyễn Lê Đình Tiên - Portfolio',
          description:
            'Portfolio của Nguyễn Lê Đình Tiên - Fullstack Web Developer',
          url: 'https://nguyenledinhtien.io.vn',
          inLanguage: 'vi-VN',
          isAccessibleForFree: true,
          author: {
            '@type': 'Person',
            name: 'Nguyễn Lê Đình Tiên',
          },
          publisher: {
            '@type': 'Person',
            name: 'Nguyễn Lê Đình Tiên',
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate:
                'https://nguyenledinhtien.io.vn/search?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
          },
        }),
      },
      // Structured Data - Organization Schema
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Nguyễn Lê Đình Tiên',
          url: 'https://nguyenledinhtien.io.vn',
          logo: {
            '@type': 'ImageObject',
            url: 'https://nguyenledinhtien.io.vn/images/logo-main.webp',
            width: 400,
            height: 400,
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+84-xxx-xxx-xxxx',
            contactType: 'customer service',
            email: 'contact@nguyenledinhtien.io.vn',
            availableLanguage: ['Vietnamese', 'English'],
          },
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Đà Nẵng',
            addressRegion: 'Đà Nẵng',
            addressCountry: 'VN',
          },
          sameAs: [
            'https://github.com/yourusername',
            'https://linkedin.com/in/yourusername',
            'https://twitter.com/yourusername',
          ],
        }),
      },
    ],
  })

  // Enhanced SEO Meta for social sharing
  useSeoMeta({
    title:
      'Nguyễn Lê Đình Tiên - Fullstack Web Developer | React, Vue.js, Node.js | Đà Nẵng',
    description:
      'Nguyễn Lê Đình Tiên - Lập trình viên web với 6 năm kinh nghiệm. Chuyên Frontend (React, Vue.js) và Backend (Node.js, NestJS). Dựa tại Đà Nẵng, Việt Nam.',
    ogTitle:
      'Nguyễn Lê Đình Tiên - Fullstack Web Developer | React, Vue.js, Node.js | Đà Nẵng',
    ogDescription:
      'Nguyễn Lê Đình Tiên - Lập trình viên web với 6 năm kinh nghiệm. Chuyên Frontend (React, Vue.js) và Backend (Node.js, NestJS). Dựa tại Đà Nẵng, Việt Nam.',
    ogImage: 'https://nguyenledinhtien.io.vn/images/logo-main.webp',
    ogUrl: 'https://nguyenledinhtien.io.vn',
    ogSiteName: 'nguyenledinhtien.io.vn',
    ogLocale: 'vi_VN',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle:
      'Nguyễn Lê Đình Tiên - Fullstack Web Developer | React, Vue.js, Node.js | Đà Nẵng',
    twitterDescription:
      'Nguyễn Lê Đình Tiên - Lập trình viên web với 6 năm kinh nghiệm. Chuyên Frontend (React, Vue.js) và Backend (Node.js, NestJS). Dựa tại Đà Nẵng, Việt Nam.',
    twitterImage: 'https://nguyenledinhtien.io.vn/images/logo-main.webp',
    twitterSite: '@yourusername',
    twitterCreator: '@yourusername',
  })

  definePageMeta({
    layout: 'portfolio', // Sử dụng layout default với header và footer
  })

  // Handle contact form submission
  const handleContactSubmit = formData => {
    // Ở đây bạn có thể thêm logic gửi email hoặc lưu vào database
    // Ví dụ: gửi email, gọi API, etc.
  }
</script>

<style scoped>
  /* Smooth scrolling for anchor links */
  html {
    scroll-behavior: smooth;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #1f2937;
  }

  ::-webkit-scrollbar-thumb {
    background: #f97316;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #ea580c;
  }
</style>
