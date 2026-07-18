// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  // Enable SSR for better SEO
  ssr: true,

  css: [
    '~/assets/scss/main.scss',
    '~/assets/scss/toast-custom.scss',
    'swiper/css',
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    '@vee-validate/nuxt',
    '@nuxt/image',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
  ],

  // Auto import Vue composables and composables from composables directory
  imports: {
    autoImport: true,
    dirs: ['composables/**'],
  },

  // Auto import components
  components: [
    { path: '~/components', pathPrefix: false },
    { path: '~/pages/_components', pathPrefix: false },
  ],

  // Image optimization configuration
  // @ts-ignore
  image: {
    provider: 'ipx',
  },

  // Performance optimization
  nitro: {
    compressPublicAssets: true,
    minify: true,
  },

  // Build optimization
  build: {
    transpile: ['swiper'],
  },

  // Vite configuration for better auto import and performance
  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: ['import'],
        },
      },
    },
    build: {
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router'],
            swiper: ['swiper'],
          },
        },
      },
    },
    optimizeDeps: {
      include: ['vue', 'vue-router', 'swiper'],
    },
  },

  // SEO optimization
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no',
      title: 'Nguyễn Lê Đình Tiên - Portfolio | Fullstack Web Developer | Đà Nẵng',
      meta: [
        {
          name: 'description',
          content: 'Portfolio của Nguyễn Lê Đình Tiên - Lập trình viên web với 6 năm kinh nghiệm trong Frontend (React, Vue.js) và Backend (Node.js, NestJS). Dựa tại Đà Nẵng, Việt Nam.'
        },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'Nguyễn Lê Đình Tiên' },
        {
          name: 'keywords',
          content: 'portfolio, web developer, fullstack developer, frontend developer, backend developer, React, Vue.js, Node.js, Da Nang, Vietnam, NestJS, TypeScript, Nuxt 3'
        },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Nguyễn Lê Đình Tiên - Portfolio | Fullstack Web Developer' },
        { property: 'og:description', content: 'Portfolio của Nguyễn Lê Đình Tiên - Lập trình viên web với 6 năm kinh nghiệm trong Frontend (React, Vue.js) và Backend (Node.js, NestJS).' },
        { property: 'og:site_name', content: 'Nguyễn Lê Đình Tiên Portfolio' },
        { property: 'og:url', content: 'https://nguyenledinhtien.io.vn' },
        { property: 'og:image', content: 'https://nguyenledinhtien.io.vn/og-image.jpg' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Nguyễn Lê Đình Tiên - Portfolio | Fullstack Web Developer' },
        { name: 'twitter:description', content: 'Portfolio của Nguyễn Lê Đình Tiên - Lập trình viên web với 6 năm kinh nghiệm trong Frontend và Backend Development' },
        { name: 'twitter:image', content: 'https://nguyenledinhtien.io.vn/twitter-image.jpg' },
        { name: 'twitter:site', content: '@nguyenledinhtien' },
        { name: 'twitter:creator', content: '@nguyenledinhtien' },
        // Styling & Theme
        { name: 'theme-color', content: '#f97316' },
        { name: 'msapplication-TileColor', content: '#f97316' },
        // iOS PWA Meta Tags
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'Nguyễn Lê Đình Tiên' },
        { name: 'application-name', content: 'Nguyễn Lê Đình Tiên Portfolio' }
      ],
      link: [
        // Favicon với các kích thước chuẩn
        { rel: 'icon', type: 'image/webp', sizes: '16x16', href: '/favicon-16x16.webp' },
        { rel: 'icon', type: 'image/webp', sizes: '32x32', href: '/favicon-32x32.webp' },
        { rel: 'icon', type: 'image/webp', sizes: '96x96', href: '/favicon-96x96.webp' },
        { rel: 'icon', type: 'image/webp', sizes: '192x192', href: '/favicon-192x192.webp' },
        { rel: 'icon', type: 'image/webp', href: '/favicon.webp' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        // iOS PWA Icons
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/apple-touch-icon.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/icons/apple-touch-icon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/icons/apple-touch-icon-120x120.png' },
        { rel: 'canonical', href: 'https://nguyenledinhtien.io.vn' },
        // Preload & Preconnect
        { rel: 'preload', href: '/fonts/UTM-Hanzel.ttf', as: 'font', type: 'font/ttf', crossorigin: 'anonymous' },
        { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' }
      ]
    }
  },

  runtimeConfig: {
    public: {
      NUXT_PUBLIC_API_URL: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3000',
      PUBLISHER_SIGNUP_URL: '',
      LOGIN_URL: '',

      // Fixed metadata used by footer / other pages
      SITE_URL: 'https://nguyenledinhtien.io.vn',
      SITE_NAME: 'Nguyễn Lê Đình Tiên Portfolio',
      SITE_AUTHOR: 'Nguyễn Lê Đình Tiên',
      SITE_PHONE: '+84 88 669 4350',
      SITE_FACEBOOK: 'https://facebook.com/nguyenledinhtien',
      SITE_LINKEDIN: 'https://linkedin.com/in/nguyenledinhtien',
      SITE_TWITTER: 'https://twitter.com/nguyenledinhtien',
      SITE_GITHUB: 'https://github.com/nguyenledinhtien'
    }
  },

  // PWA Configuration
  pwa: {
    registerType: 'autoUpdate',
    strategies: 'generateSW',
    manifest: {
      name: 'Nguyễn Lê Đình Tiên Portfolio',
      short_name: 'Tiên Portfolio',
      description: 'Portfolio của Nguyễn Lê Đình Tiên - Lập trình viên web với kinh nghiệm trong Frontend và Backend Development.',
      theme_color: '#f97316',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      scope: '/',
      start_url: '/',
      icons: [
        {
          src: '/icons/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: '/icons/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: '/icons/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
          purpose: 'apple-touch-icon',
        },
      ],
      screenshots: [],
      categories: ['portfolio', 'developer', 'web'],
      lang: 'vi',
      dir: 'ltr',
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico,webp,woff,woff2,ttf}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images-cache',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
            },
          },
        },
        {
          urlPattern: /^https:\/\/.*\.(?:js|css)$/i,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'static-resources',
          },
        },
        {
          urlPattern: /^https?:\/\/.*/i,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'network-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24, // 1 day
            },
            networkTimeoutSeconds: 10,
          },
        },
      ],
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20,
    },
  },
})
