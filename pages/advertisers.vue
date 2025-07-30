<template>
  <div>
    <!-- Hero Section -->
    <HeroSection 
      :title="heroData.title"
      :subtitle="heroData.subtitle"
      :description="heroData.description"
      :primaryButton="heroData.primaryButton"
      :secondaryButton="heroData.secondaryButton"
      :backgroundImage="heroData.backgroundImage"
      :theme="heroData.theme"
    />
    
    <!-- Seamless Connections Section -->
    <SeamlessConnectionsSection 
      :backgroundClass="seamlessData.backgroundClass"
      :titleFirst="seamlessData.titleFirst"
      :titleFirstColor="seamlessData.titleFirstColor"
      :titleSecond="seamlessData.titleSecond"
      :titleSecondColor="seamlessData.titleSecondColor"
      :description="seamlessData.description"
      :descriptionColor="seamlessData.descriptionColor"
      :image="seamlessData.image"
      :statsCard="seamlessData.statsCard"
    />
    
    <!-- Personalized Strategies Section -->
    <PersonalizedStrategiesSection 
      :backgroundClass="personalizedData.backgroundClass"
      :titleFirst="personalizedData.titleFirst"
      :titleFirstColor="personalizedData.titleFirstColor"
      :titleSecond="personalizedData.titleSecond"
      :titleSecondColor="personalizedData.titleSecondColor"
      :description="personalizedData.description"
      :descriptionColor="personalizedData.descriptionColor"
      :image="personalizedData.image"
      :achievementCard="personalizedData.achievementCard"
      :features="personalizedData.features"
    />

    <!-- Global Growth Section -->
    <GlobalGrowthSection 
      :isBack="globalGrowthData.isBack"
      :titleFirst="globalGrowthData.titleFirst"
      :titleFirstColor="globalGrowthData.titleFirstColor"
      :titleSecond="globalGrowthData.titleSecond"
      :titleSecondColor="globalGrowthData.titleSecondColor"
      :titleThird="globalGrowthData.titleThird"
      :titleThirdColor="globalGrowthData.titleThirdColor"
      :description="globalGrowthData.description"
      :descriptionColor="globalGrowthData.descriptionColor"
      :primaryButton="globalGrowthData.primaryButton"
      :secondaryButton="globalGrowthData.secondaryButton"
      :backgroundImage="globalGrowthData.backgroundImage"
      :overlayClass="globalGrowthData.overlayClass"
      :statsCards="globalGrowthData.statsCards"
    />
    <!-- Key Features Section -->
    <KeyFeaturesSection 
      :backgroundClass="keyFeaturesData.backgroundClass"
      :title="keyFeaturesData.title"
      :titleColor="keyFeaturesData.titleColor"
      :titleAccent="keyFeaturesData.titleAccent"
      :titleAccentColor="keyFeaturesData.titleAccentColor"
      :subtitle="keyFeaturesData.subtitle"
      :subtitleColor="keyFeaturesData.subtitleColor"
      :features="keyFeaturesData.features"
    />
    
    <!-- Stats Section -->
    <StatsSection 
      :isBlack="statsData.isBlack"
      :title="statsData.title"
      :stats="statsData.stats"
    />
    
    <!-- Contact Section (reuse from home) -->
    <ContactSection />
  </div>
</template>

<script setup>
// Hero section data for advertisers page
const heroData = {
  title: "ADVERTISERS",
  subtitle: "Acquire high-quality leads at scale",
  description: "At Leadsmax, we help advertisers cut through the noise and reach real users who convert. Whether you're promoting financial products, insurance, sweepstakes, or lead-gen offers — our network is built to maximize every dollar you spend.",
  primaryButton: {
    text: "ADVERTISER SIGN UP",
    link: "/login"
  },
  secondaryButton: {
    text: "ADVERTISER LOGIN",
    link: "https://leadswise.affise.com/v2/sign/in"
  },
  backgroundImage: "/images/adv-bg.webp",
  theme: {
    primaryColor: "orange",
    textColor: "white",
    overlayOpacity: 50
  }
}

// Stats data for advertisers page
const statsData = {
  isBlack: true,
  title: 'OUR ACHIEVEMENTS',
  stats: [
    {
      value: 500,
      suffix: '+',
      label: 'Active Advertisers'
    },
    {
      value: 10,
      suffix: 'M+',
      label: 'Monthly Impressions'
    },
    {
      value: 95,
      suffix: '%',
      label: 'Client Satisfaction'
    },
    {
      value: 24,
      suffix: '/7',
      label: 'Support Available'
    }
  ]
}

// Seamless Connections data for advertisers page
const seamlessData = {
  backgroundClass: 'bg-white',
  titleFirst: 'Effortless Access',
  titleFirstColor: 'text-black',
  titleSecond: 'Exceptional Performance',
  titleSecondColor: 'text-orange-500',
  description: `We don’t just connect you to traffic — we own a significant portion of it.
Our in-house media buying team and vetted publisher network allow us to deliver high-quality clicks and leads with speed and consistency. That means more predictability, more performance — and less waste.
`,
  descriptionColor: 'text-gray-700',
  image: {
    src: '/images/adv1.webp',
    alt: 'Business Partnership - Two people shaking hands'
  },
  statsCard: {
    value: '+150%',
    label: 'Average ROI'
  }
}

// Personalized Strategies data for advertisers page
const personalizedData = {
  backgroundClass: 'bg-gray-50',
  titleFirst: 'Personalized Strategies for',
  titleFirstColor: 'text-black',
  titleSecond: 'Peak Performance',
  titleSecondColor: 'text-orange-500',
  description: `Leadsmax builds a transparent, results-driven ecosystem where advertisers and publishers grow together.
With data-driven strategies and real collaboration, we help you scale smarter and hit your goals.`,
  descriptionColor: 'text-gray-700',
  image: {
    src: '/images/adv2.webp',
    alt: 'Team Collaboration - Four people celebrating success'
  },
  achievementCard: {
    title: 'Award-Winning',
    subtitle: 'Performance Network'
  },
  features: [
    {
      title: 'Premium Traffic',
      description: ' In-house & verified sources.'
    },
    {
      title: 'Global Scale',
      description: '50+ countries, seamless reach.'
    },
    {
      title: 'Performance Focus',
      description: 'Optimized for ROI.'
    },
    {
      title: 'Trusted Partners',
      description: 'Transparent & committed.'
    }
  ]
}

// Global Growth data for advertisers page
const globalGrowthData = {
  isBack: false,
  titleFirst: 'ASSURED',
  titleFirstColor: 'text-white',
  titleSecond: 'GLOBAL',
  titleSecondColor: 'text-orange-500',
  titleThird: 'GROWTH',
  titleThirdColor: 'text-orange-500',
  description: `Whether you're a well-established brand, an ambitious startup, or a business on the rise, our platform connects you with high-quality traffic sources and top-performing publishers worldwide. By joining our network, you'll reach highly targeted audiences, drive better campaign performance, and maximize your return on investment.
Let’s grow together — and take your business to the next level on a global scale.`,
  descriptionColor: 'text-gray-200',
  primaryButton: {
    text: 'BECOME AN ADVERTISER',
    link: '/login'
  },
  secondaryButton: {
    text: 'ADVERTISER ACCESS',
    link: '/contact'
  },
  backgroundImage: {
    src: '/images/globalgrowth.webp',
    alt: 'Global Growth Background'
  },
  overlayClass: 'bg-black/70',
  statsCards: {
    countries: {
      value: '50+',
      label: 'Countries'
    },
    clicks: {
      value: '1M+',
      label: 'Daily Clicks'
    }
  }
}

// Key Features data for advertisers page
const keyFeaturesData = {
  backgroundClass: 'bg-gradient-to-br from-gray-50 to-white',
  title: 'Why Work With Us?',
  titleColor: 'text-gray-900',
  titleAccent: '',
  titleAccentColor: 'text-orange-500',
  subtitle: 'Experience the advantages of partnering with Singapore\'s leading performance network',
  subtitleColor: 'text-gray-600',
  features: [
    {
      title: 'Qualified, performance-driven traffic',
      description: 'Tap into our curated publisher base — trusted affiliates who deliver real results, not just impressions.',
      iconBgClass: 'bg-gradient-to-br from-blue-500 to-blue-600',
      titleColor: 'text-gray-900',
      titleHoverColor: 'group-hover:text-orange-600',
      descriptionColor: 'text-gray-600',
      floatingElement1: 'bg-orange-400',
      floatingElement2: 'bg-yellow-400'
    },
    {
      title: 'Advanced targeting & optimization',
      description: 'Run smart campaigns with geo, device, and behavioral filters. We optimize in real time to hit your KPIs.',
      iconBgClass: 'bg-gradient-to-br from-orange-500 to-orange-600',
      titleColor: 'text-gray-900',
      titleHoverColor: 'group-hover:text-orange-600',
      descriptionColor: 'text-gray-600',
      floatingElement1: 'bg-pink-400',
      floatingElement2: 'bg-blue-400'
    },
    {
      title: 'Clean, transparent tracking',
      description: 'From first click to final conversion — we track everything. You see what we see.',
      iconBgClass: 'bg-gradient-to-br from-green-500 to-green-600',
      titleColor: 'text-gray-900',
      titleHoverColor: 'group-hover:text-green-600',
      descriptionColor: 'text-gray-600',
      floatingElement1: 'bg-red-400',
      floatingElement2: 'bg-yellow-400'
    },
    {
      title: 'Fraud prevention by design',
      description: 'Every lead is verified. Every source is monitored. We protect your budget with layered fraud defense.',
      iconBgClass: 'bg-gradient-to-br from-red-500 to-red-600',
      titleColor: 'text-gray-900',
      titleHoverColor: 'group-hover:text-red-600',
      descriptionColor: 'text-gray-600',
      floatingElement1: 'bg-purple-400',
      floatingElement2: 'bg-blue-400'
    },
    {
      title: 'Dedicated account managers',
      description: 'Our experienced team works alongside you — optimizing, scaling, and solving fast.',
      iconBgClass: 'bg-gradient-to-br from-purple-500 to-purple-600',
      titleColor: 'text-gray-900',
      titleHoverColor: 'group-hover:text-purple-600',
      descriptionColor: 'text-gray-600',
      floatingElement1: 'bg-orange-400',
      floatingElement2: 'bg-green-400'
    }
  ]
}

// Get runtime config for environment variables
const config = useRuntimeConfig();

// SEO meta tags with structured data
useHead({
  title: "Advertisers - Leadsmax Network | Vietnam's Premier Affiliate Marketing Platform",
  meta: [
    {
      name: "description",
      content: "Join Leadsmax Network as an advertiser and acquire high-quality leads at scale. Connect with 1000+ publishers across 50+ countries. Specialize in CPA, CPL campaigns with real-time tracking and competitive ROI.",
    },
    {
      name: "keywords",
      content: "advertiser affiliate network, CPA marketing, CPL campaigns, lead generation Vietnam, performance marketing, affiliate advertising, digital marketing Vietnam, ROI optimization",
    },
    {
      name: "robots",
      content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    },
    {
      name: "author",
      content: "Leadsmax Network",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
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
      content: "Leadsmax Network - Advertisers",
    },
    {
      name: "application-name",
      content: "Leadsmax Network",
    },
    {
      name: "geo.region",
      content: "VN",
    },
    {
      name: "geo.placename",
      content: "Da Nang, Vietnam",
    },
    {
      name: "geo.position",
      content: "16.0544;108.2022",
    },
    {
      name: "ICBM",
      content: "16.0544, 108.2022",
    },
    {
      property: "og:title",
      content: "Advertisers - Leadsmax Network | Vietnam's Premier Affiliate Marketing Platform",
    },
    {
      property: "og:description",
      content: "Join Leadsmax Network as an advertiser and acquire high-quality leads at scale. Connect with 1000+ publishers across 50+ countries. Specialize in CPA, CPL campaigns with real-time tracking and competitive ROI.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: `${config.public.SITE_URL || "https://leadswise.network"}/advertisers`,
    },
    {
      property: "og:image",
      content: config.public.SITE_OG_IMAGE || `${config.public.SITE_URL || "https://leadswise.network"}/og-image.jpg`,
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
      content: "Leadsmax Network",
    },
    {
      property: "og:locale",
      content: "en_US",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Advertisers - Leadsmax Network | Vietnam's Premier Affiliate Platform",
    },
    {
      name: "twitter:description",
      content: "Join Leadsmax Network as an advertiser and acquire high-quality leads at scale. Connect with 1000+ publishers across 50+ countries. Specialize in CPA, CPL campaigns.",
    },
    {
      name: "twitter:image",
      content: config.public.SITE_TWITTER_IMAGE || `${config.public.SITE_URL || "https://leadswise.network"}/twitter-image.jpg`,
    },
    {
      name: "twitter:site",
      content: "@leadswise",
    },
    {
      name: "twitter:creator",
      content: "@leadswise",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `${config.public.SITE_URL || "https://leadswise.network"}/advertisers`,
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
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Advertisers - Leadsmax Network",
        url: `${config.public.SITE_URL || "https://leadswise.network"}/advertisers`,
        description: "Join Leadsmax Network as an advertiser and acquire high-quality leads at scale. Connect with 1000+ publishers across 50+ countries.",
        mainEntity: {
          "@type": "Organization",
          name: "Leadsmax Network",
          url: config.public.SITE_URL || "https://leadswise.network",
          logo: config.public.SITE_LOGO || `${config.public.SITE_URL || "https://leadswise.network"}/logo.png`,
          description: "Vietnam's premier affiliate marketing platform connecting advertisers and publishers for maximum performance.",
          sameAs: [
            config.public.SITE_FACEBOOK || "https://facebook.com/leadswise",
            config.public.SITE_TWITTER || "https://twitter.com/leadswise",
            config.public.SITE_LINKEDIN || "https://linkedin.com/company/leadswise",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: config.public.SITE_PHONE || "+84 372 571 498",
            contactType: "customer service",
            areaServed: config.public.SITE_AREA_SERVED || "VN",
            availableLanguage: config.public.SITE_LANGUAGES
              ? config.public.SITE_LANGUAGES.split(",")
              : ["English", "Vietnamese"],
          },
          address: {
            "@type": "PostalAddress",
            addressCountry: "VN",
            addressRegion: "Da Nang",
            addressLocality: "Da Nang",
            streetAddress: "84 Ho Tung Mau, Hoa Minh, Lien Chieu",
          },
          foundingDate: "2024",
          numberOfEmployees: "50-100",
          industry: "Affiliate Marketing",
          keywords: "affiliate marketing, CPA, CPL, lead generation, Vietnam, advertisers",
        },
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
          {
            "@type": "ListItem",
            position: 2,
            name: "Advertisers",
            item: `${config.public.SITE_URL || "https://leadswise.network"}/advertisers`,
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
            name: "How can I join Leadsmax Network as an advertiser?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "To join Leadsmax Network as an advertiser, simply click on 'ADVERTISER SIGN UP' button and fill out our application form. Our team will review your application and get back to you within 24 hours.",
            },
          },
          {
            "@type": "Question",
            name: "What types of campaigns do you support?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We support CPA (Cost Per Action) and CPL (Cost Per Lead) campaigns across various industries including finance, insurance, education, e-commerce, and more. Our network specializes in high-converting offers.",
            },
          },
          {
            "@type": "Question",
            name: "What is the minimum budget requirement?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We work with advertisers of all sizes. Our minimum budget requirements are flexible and depend on your campaign goals. Contact our team to discuss your specific needs and budget requirements.",
            },
          },
          {
            "@type": "Question",
            name: "Do you provide real-time tracking and reporting?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, we provide comprehensive real-time tracking and detailed reporting through our advanced dashboard. You can monitor campaign performance, track conversions, and optimize your campaigns in real-time.",
            },
          },
          {
            "@type": "Question",
            name: "What countries do you operate in?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We operate in 50+ countries worldwide, with strong presence in Vietnam and Southeast Asia. Our global network allows you to reach diverse audiences and scale your campaigns internationally.",
            },
          },
        ],
      }),
    },
  ],
});
</script>

<style scoped>
/* Page-specific styles can be added here */
</style> 