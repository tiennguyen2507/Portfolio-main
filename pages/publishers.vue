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
  title: "PUBLISHERS",
  subtitle: "EARN MORE. SCALE FASTER. JOIN A NETWORK THAT WORKS FOR YOU.",
  description: "Leadsmax is where top-performing affiliates thrive. Whether you're a solo media buyer, a seasoned team, or a content-driven traffic source — we offer high-paying offers, on-time payouts, and real support to help you win bigger.",
  primaryButton: {
    text: "PUBLISHER SIGN UP",
    link: "https://leadswise.affise.com/v2/sign/up"
  },
  secondaryButton: {
    text: "PUBLISHER LOGIN",
    link: "https://leadswise.affise.com/v2/sign/in"
  },
  backgroundImage: "/images/pub-bg.webp",
  theme: {
    primaryColor: "orange",
    textColor: "white",
    overlayOpacity: 80,
    classWidth: 'max-w-7xl',
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

// Seamless Connections data for publishers page
const seamlessData = {
  backgroundClass: 'bg-white',
  titleFirst: 'Traffic In. Revenue Out.',
  titleFirstColor: 'text-black',
  titleSecond: ' Support Always',
  titleSecondColor: 'text-orange-500',
  description: `Leadsmax helps publishers unlock more value from their traffic — with smart offers, fast payouts, and hands-on support.
With global demand and local expertise, we help you grow smarter — not just bigger.`,
  descriptionColor: 'text-gray-700',
  image: {
    src: '/images/adv1.webp',
    alt: 'Publisher Success - Traffic monetization partnership'
  },
  statsCard: {
    value: '+150%',
    label: 'Average Publisher Earnings'
  }
}

// Personalized Strategies data for publishers page
const personalizedData = {
  backgroundClass: 'bg-gray-50',
  titleFirst: 'Campaigns That Convert.',
  titleFirstColor: 'text-black',
  titleSecond: 'Support That Scales.',
  titleSecondColor: 'text-orange-500',
  description: `We match publishers with high-quality campaigns — backed by real support, flexible payouts, and data that drives results.`,
  descriptionColor: 'text-gray-700',
  image: {
    src: '/images/adv2.webp',
    alt: 'Publisher Success - Team celebrating revenue growth'
  },
  achievementCard: {
    title: 'Award-Winning',
    subtitle: 'Publisher Network'
  },
  // features: [
  //   {
  //     title: 'Traffic Monetization',
  //     description: 'Maximum revenue from your traffic'
  //   },
  //   {
  //     title: 'Fast Payouts',
  //     description: 'Quick and reliable payments'
  //   },
  //   {
  //     title: 'Fair Marketplace',
  //     description: 'Transparent and ethical practices'
  //   },
  //   {
  //     title: 'Leading Network',
  //     description: 'Vietnam\'s top publisher network'
  //   }
  // ]
}

// Global Growth data for publishers page
const globalGrowthData = {
  isBack: false,
  titleFirst: 'GROW BEYOND TRAFFIC.',
  titleFirstColor: 'text-white',
  titleSecond: 'BUILD',
  titleSecondColor: 'text-orange-500',
  titleThird: 'REAL REVENUE',
  titleThirdColor: 'text-orange-500',
  description: `Whether you're a media buyer, influencer, or content creator — your role in the ecosystem is pivotal.
At Leadsmax, we collaborate with publishers who think long-term, build quality traffic, and seek more than just payouts: sustainable growth, transparency, and strategic partnership.`,
  descriptionColor: 'text-gray-200',
  primaryButton: {
    text: 'BECOME A PUBLISHER',
    link: '/login'
  },
  secondaryButton: {
    text: 'PUBLISHER ACCESS',
    link: '/contact'
  },
  backgroundImage: {
    src: '/images/pub-global.webp',
    alt: 'Global Publisher Growth Background'
  },
  overlayClass: 'bg-black/70',
  statsCards: {
    countries: {
      value: '50+',
      label: 'Countries'
    },
    publishers: {
      value: '1000+',
      label: 'Active Publishers'
    }
  }
}

// Key Features data for advertisers page
const keyFeaturesData = {
  backgroundClass: 'bg-gradient-to-br from-gray-50 to-white',
  title: 'Why Publishers Choose',
  titleColor: 'text-gray-900',
  titleAccent: 'Leadsmax',
  titleAccentColor: 'text-orange-500',
  subtitle: 'Experience the advantages of partnering with Vietnam\'s leading performance network for publishers',
  subtitleColor: 'text-gray-600',
  features: [
    {
      title: 'TOP-CONVERTING OFFERS',
      description: 'Promote offers that actually convert — across verticals like loans, sweepstakes, insurance, and more.',
      iconBgClass: 'bg-gradient-to-br from-green-500 to-green-600',
      titleColor: 'text-gray-900',
      titleHoverColor: 'group-hover:text-green-600',
      descriptionColor: 'text-gray-600',
      floatingElement1: 'bg-green-400',
      floatingElement2: 'bg-blue-400'
    },
    {
      title: 'FAST & RELIABLE PAYOUTS',
      description: 'We pay on time. Every time. Weekly, bi-weekly or custom terms available for top partners.',
      iconBgClass: 'bg-gradient-to-br from-orange-500 to-orange-600',
      titleColor: 'text-gray-900',
      titleHoverColor: 'group-hover:text-orange-600',
      descriptionColor: 'text-gray-600',
      floatingElement1: 'bg-orange-400',
      floatingElement2: 'bg-yellow-400'
    },
    {
      title: 'REAL-TIME TRACKING',
      description: 'Get instant access to performance data via our tracking dashboard — detailed, transparent, and mobile-friendly.',
      iconBgClass: 'bg-gradient-to-br from-blue-500 to-blue-600',
      titleColor: 'text-gray-900',
      titleHoverColor: 'group-hover:text-blue-600',
      descriptionColor: 'text-gray-600',
      floatingElement1: 'bg-blue-400',
      floatingElement2: 'bg-purple-400'
    },
    {
      title: 'SMART OPTIMIZATION SUPPORT',
      description: 'Our team helps you test creatives, optimize traffic sources, and scale without the guesswork.',
      iconBgClass: 'bg-gradient-to-br from-purple-500 to-purple-600',
      titleColor: 'text-gray-900',
      titleHoverColor: 'group-hover:text-purple-600',
      descriptionColor: 'text-gray-600',
      floatingElement1: 'bg-purple-400',
      floatingElement2: 'bg-pink-400'
    },
    {
      title: 'CLEAN NETWORK REPUTATION',
      description: 'We maintain strict compliance. No scrubbing games. No shady practices.',
      iconBgClass: 'bg-gradient-to-br from-teal-500 to-teal-600',
      titleColor: 'text-gray-900',
      titleHoverColor: 'group-hover:text-teal-600',
      descriptionColor: 'text-gray-600',
      floatingElement1: 'bg-teal-400',
      floatingElement2: 'bg-green-400'
    }
  ]
}

// Set page meta
useHead({
  title: 'Advertisers - LEADSWISE Network',
  meta: [
    {
      name: 'description',
      content: 'Join our prestigious affiliate network as an advertiser. Enjoy seamless connections to diverse traffic sources and achieve your desired ROI with our award-winning team.'
    }
  ]
})
</script>

<style scoped>
/* Page-specific styles can be added here */
</style> 