<template>
  <div>
    <!-- Hero Section with Stats -->
    <HomeHeroSection />

    <!-- Marketing Performance Section -->
    <HomeMarketingPerformanceSection />

    <!-- User Types Section -->
    <HomeUserTypesSection />
    
    <!-- Our Stats Section -->
    <StatsSection />
    
    <!-- Members First Section -->
    <HomeMembersFirstSection />

    <!-- Contact Section -->
    <ContactSection />
    
    <!-- Mission Vision Section -->
    <!-- <MissionVisionSection /> -->
  </div>
</template>

<script setup>
// Get runtime config for environment variables
const config = useRuntimeConfig();

// SEO meta tags with structured data
useHead({
  title:
    config.public.SITE_TITLE ||
    "Leadsmax Network - Leading Affiliate Marketing Platform in Vietnam | CPA, CPL, Lead Generation",
  meta: [
    {
      name: "description",
      content:
        config.public.SITE_DESCRIPTION ||
        "Leadsmax Network is Vietnam's premier affiliate marketing platform connecting +300 advertisers with +1000 publishers. Specialize in CPA, CPL, lead generation with real-time tracking and competitive payouts.",
    },
    {
      name: "keywords",
      content:
        config.public.SITE_KEYWORDS ||
        "affiliate marketing Vietnam, CPA marketing, CPL campaigns, lead generation, digital marketing, publishers network, advertisers platform, performance marketing, affiliate network Vietnam, lead management, marketing automation, revenue optimization",
    },
    {
      name: "robots",
      content:
        "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    },
    {
      name: "author",
      content: config.public.SITE_AUTHOR || "Leadsmax Network",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, shrink-to-fit=no",
    },
    {
      name: "format-detection",
      content: "telephone=no",
    },
    {
      name: "theme-color",
      content: "#f97316",
    },
    {
      name: "msapplication-TileColor",
      content: "#f97316",
    },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "default",
    },
    {
      name: "apple-mobile-web-app-title",
      content: "Leadsmax Network",
    },
    {
      name: "application-name",
      content: "Leadsmax Network",
    },
    {
      name: "msapplication-config",
      content: "/browserconfig.xml",
    },
    {
      name: "geo.region",
      content: "VN",
    },
    {
      name: "geo.placename",
      content: "Ha Tinh, Vietnam",
    },
    {
      name: "geo.position",
      content: "18.3333;105.9000",
    },
    {
      name: "ICBM",
      content: "18.3333, 105.9000",
    },
    {
      property: "og:title",
      content:
        config.public.SITE_TITLE ||
        "Leadsmax Network - Leading Affiliate Marketing Platform in Vietnam",
    },
    {
      property: "og:description",
      content:
        config.public.SITE_DESCRIPTION ||
        "Vietnam's premier affiliate marketing platform connecting +300 advertisers with +1000 publishers. Specialize in CPA, CPL, lead generation with real-time tracking.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: config.public.SITE_URL || "https://leadswise.network",
    },
    {
      property: "og:image",
      content:
        config.public.SITE_OG_IMAGE ||
        `${config.public.SITE_URL || "https://leadswise.network"}/og-image.jpg`,
    },
    {
      property: "og:image:width",
      content: "1200",
    },
    {
      property: "og:image:height",
      content: "630",
    },
    {
      property: "og:site_name",
      content: config.public.SITE_NAME || "Leadsmax Network",
    },
    {
      property: "og:locale",
      content: config.public.SITE_LOCALE || "en_US",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content:
        config.public.SITE_TITLE ||
        "Leadsmax Network - Vietnam's Premier Affiliate Platform",
    },
    {
      name: "twitter:description",
      content:
        config.public.SITE_DESCRIPTION ||
        "Connect with +300 advertisers and +1000 publishers. Specialize in CPA, CPL, lead generation with real-time tracking and competitive payouts.",
    },
    {
      name: "twitter:image",
      content:
        config.public.SITE_TWITTER_IMAGE ||
        `${config.public.SITE_URL || "https://leadswise.network"}/twitter-image.jpg`,
    },
    {
      name: "twitter:site",
      content: config.public.SITE_TWITTER_SITE || "@leadswise",
    },
    {
      name: "twitter:creator",
      content: config.public.SITE_TWITTER_CREATOR || "@leadswise",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: config.public.SITE_URL || "https://leadswise.network",
    },
    {
      rel: "alternate",
      hreflang: "en",
      href: config.public.SITE_URL || "https://leadswise.network",
    },
    {
      rel: "alternate",
      hreflang: "vi",
      href: `${config.public.SITE_URL || "https://leadswise.network"}/vi`,
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "",
    },
    {
      rel: "dns-prefetch",
      href: "https://www.google-analytics.com",
    },
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: config.public.SITE_NAME || "Leadsmax Network",
        url: config.public.SITE_URL || "https://leadswise.network",
        logo:
          config.public.SITE_LOGO ||
          `${config.public.SITE_URL || "https://leadswise.network"}/logo.png`,
        description:
          config.public.SITE_DESCRIPTION ||
          "Vietnam's premier affiliate marketing platform connecting advertisers and publishers for maximum performance.",
        sameAs: [
          config.public.SITE_FACEBOOK || "https://facebook.com/leadswise",
          config.public.SITE_TWITTER || "https://twitter.com/leadswise",
          config.public.SITE_LINKEDIN ||
            "https://linkedin.com/company/leadswise",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: config.public.SITE_PHONE || "+84-xxx-xxx-xxxx",
          contactType: "customer service",
          areaServed: config.public.SITE_AREA_SERVED || "VN",
          availableLanguage: config.public.SITE_LANGUAGES
            ? config.public.SITE_LANGUAGES.split(",")
            : ["English", "Vietnamese"],
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "VN",
          addressRegion: "Ha Tinh",
          addressLocality: "Ha Tinh",
        },
        foundingDate: "2024",
        numberOfEmployees: "50-100",
        industry: "Affiliate Marketing",
        keywords: "affiliate marketing, CPA, CPL, lead generation, Vietnam",
      }),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: config.public.SITE_NAME || "Leadsmax Network",
        url: config.public.SITE_URL || "https://leadswise.network",
        description:
          config.public.SITE_DESCRIPTION ||
          "Vietnam's premier affiliate marketing platform - Empowering Affiliate Journey",
        potentialAction: {
          "@type": "SearchAction",
          target: `${config.public.SITE_URL || "https://leadswise.network"}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
        inLanguage: "en",
        isAccessibleForFree: true,
      }),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: config.public.SITE_URL || "https://leadswise.network",
          },
        ],
      }),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Leadsmax Network?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Leadsmax Network is Vietnam's premier affiliate marketing platform that connects advertisers with publishers to generate high-quality leads and drive business growth through CPA and CPL campaigns.",
            },
          },
          {
            "@type": "Question",
            name: "How does affiliate marketing work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Affiliate marketing works by connecting advertisers who need leads with publishers who can generate them. Publishers earn commissions for successful conversions, creating a win-win partnership.",
            },
          },
          {
            "@type": "Question",
            name: "What types of campaigns do you offer?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We offer CPA (Cost Per Action) and CPL (Cost Per Lead) campaigns across various industries including finance, education, e-commerce, and more, with real-time tracking and competitive payouts.",
            },
          },
        ],
      }),
    },
  ],
});

definePageMeta({
  layout: "default",
});
</script>
