// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  // Enable SSR for better SEO
  ssr: true,

  css: ["~/assets/scss/main.scss", "swiper/css"],
  modules: ["@nuxtjs/tailwindcss", "@vee-validate/nuxt", "@nuxt/image"],

  // Auto import Vue composables and composables from composables directory
  imports: {
    autoImport: true,
    dirs: ["composables/**"],
  },

  // Auto import components
  components: [
    { path: "~/components", pathPrefix: false },
    { path: "~/pages/_components", pathPrefix: false },
  ],

  // Image optimization configuration
  // @ts-ignore
  image: {
    provider: "ipx",
  },

  // Vite configuration for better auto import
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
          silenceDeprecations: ["import"],
        },
      },
    },
  },

  // SEO optimization
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title:
        process.env.SITE_TITLE ||
        "Nguyễn Lê Đình Tiên - Fullstack Web Developer | React, Vue.js, Node.js | Da Nang",
      meta: [
        {
          name: "description",
          content:
            process.env.SITE_DESCRIPTION ||
            "Nguyễn Lê Đình Tiên - Lập trình viên web với 6 năm kinh nghiệm trong Frontend và Backend Development. Chuyên xây dựng giao diện hiện đại với React, Vue.js và API mạnh mẽ với Node.js, NestJS. Dựa tại Đà Nẵng, Việt Nam.",
        },
        { name: "robots", content: "index, follow" },
        {
          name: "author",
          content: process.env.SITE_AUTHOR || "Nguyễn Lê Đình Tiên",
        },
        {
          name: "keywords",
          content:
            "web developer, fullstack developer, frontend developer, backend developer, React developer, Vue.js developer, Node.js developer, Da Nang, Vietnam, hire developer, modern UI/UX, API development, software engineer",
        },
        { property: "og:type", content: "website" },
        {
          property: "og:title",
          content:
            process.env.SITE_TITLE ||
            "Nguyễn Lê Đình Tiên - Fullstack Web Developer | React, Vue.js, Node.js | Da Nang",
        },
        {
          property: "og:description",
          content:
            process.env.SITE_DESCRIPTION ||
            "Nguyễn Lê Đình Tiên - Lập trình viên web với 6 năm kinh nghiệm trong Frontend và Backend Development. Chuyên xây dựng giao diện hiện đại với React, Vue.js và API mạnh mẽ với Node.js, NestJS.",
        },
        {
          property: "og:site_name",
          content: process.env.SITE_NAME || "Nguyễn Lê Đình Tiên Portfolio",
        },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Nguyễn Lê Đình Tiên - Fullstack Web Developer",
        },
        {
          name: "twitter:description",
          content:
            "Lập trình viên web với 6 năm kinh nghiệm trong Frontend và Backend Development",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, maximum-scale=5",
        },
        { name: "theme-color", content: "#f97316" },
        { name: "msapplication-TileColor", content: "#f97316" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "canonical",
          href: process.env.SITE_URL || "https://nguyenledinhtien.io.vn",
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      // API URL
      NUXT_PUBLIC_API_URL:
        process.env.NUXT_PUBLIC_API_URL || "http://localhost:3000",

      // Authentication URLs
      PUBLISHER_SIGNUP_URL:
        process.env.PUBLISHER_SIGNUP_URL ||
        "https://leadswise.affise.com/v2/sign/up",
      LOGIN_URL:
        process.env.LOGIN_URL || "https://leadswise.affise.com/v2/sign/in",

      // Site SEO Configuration
      SITE_URL: process.env.SITE_URL || "https://nguyenledinhtien.io.vn",
      SITE_TITLE:
        process.env.SITE_TITLE ||
        "Nguyễn Lê Đình Tiên - Fullstack Web Developer | React, Vue.js, Node.js | Da Nang",
      SITE_DESCRIPTION:
        process.env.SITE_DESCRIPTION ||
        "Nguyễn Lê Đình Tiên - Lập trình viên web với 6 năm kinh nghiệm trong Frontend và Backend Development. Chuyên xây dựng giao diện hiện đại với React, Vue.js và API mạnh mẽ với Node.js, NestJS. Dựa tại Đà Nẵng, Việt Nam.",
      SITE_KEYWORDS:
        process.env.SITE_KEYWORDS ||
        "web developer, fullstack developer, frontend developer, backend developer, React developer, Vue.js developer, Node.js developer, Da Nang, Vietnam, hire developer, modern UI/UX, API development, software engineer, NestJS, TypeScript",
      SITE_NAME: process.env.SITE_NAME || "Nguyễn Lê Đình Tiên Portfolio",
      SITE_AUTHOR: process.env.SITE_AUTHOR || "Nguyễn Lê Đình Tiên",
      SITE_LOCALE: process.env.SITE_LOCALE || "en_US",

      // Social Media URLs
      SITE_FACEBOOK:
        process.env.SITE_FACEBOOK || "https://facebook.com/nguyenledinhtien",
      SITE_TWITTER:
        process.env.SITE_TWITTER || "https://twitter.com/nguyenledinhtien",
      SITE_LINKEDIN:
        process.env.SITE_LINKEDIN || "https://linkedin.com/in/nguyenledinhtien",
      SITE_TWITTER_SITE: process.env.SITE_TWITTER_SITE || "@nguyenledinhtien",
      SITE_TWITTER_CREATOR:
        process.env.SITE_TWITTER_CREATOR || "@nguyenledinhtien",

      // Images
      SITE_OG_IMAGE:
        process.env.SITE_OG_IMAGE ||
        "https://nguyenledinhtien.io.vn/og-image.jpg",
      SITE_TWITTER_IMAGE:
        process.env.SITE_TWITTER_IMAGE ||
        "https://nguyenledinhtien.io.vn/twitter-image.jpg",
      SITE_LOGO:
        process.env.SITE_LOGO || "https://nguyenledinhtien.io.vn/logo.png",

      // Contact Information
      SITE_PHONE: process.env.SITE_PHONE || "+84 88 669 4350",
      SITE_AREA_SERVED: process.env.SITE_AREA_SERVED || "VN",
      SITE_LANGUAGES: process.env.SITE_LANGUAGES || "English,Vietnamese",
    },
  },
});
