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
  subtitle: "UNLOCK EXCLUSIVE OPPORTUNITIES BY JOINING OUR ELITE, RENOWNED AFFILIATE NETWORK",
  description: "Leadswise offers a comprehensive range of advertising services to fit any specific set of KPIs for publishers, advertisers, and agencies worldwide.",
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

// Seamless Connections data for advertisers page
const seamlessData = {
  backgroundClass: 'bg-white',
  titleFirst: 'SEAMLESS CONNECTIONS',
  titleFirstColor: 'text-black',
  titleSecond: 'POWERFUL RESULTS',
  titleSecondColor: 'text-orange-500',
  description: 'For advertisers, we provide seamless connections to diverse traffic sources, allowing you to widely promote your products to consumers through different advertising formats and achieve your desired ROI.',
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
  titleFirst: 'PERSONALIZED STRATEGIES FOR',
  titleFirstColor: 'text-black',
  titleSecond: 'OPTIMAL PERFORMANCE',
  titleSecondColor: 'text-orange-500',
  description: 'Our priority is to foster a fair and efficient marketplace that supports advertisers and publishers in achieving their revenue goals and business objectives. Through relentless innovation focused on shared growth and prosperity, LeadsWise proudly stands as one of Singapore\'s leading performance marketing networks.',
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
      title: 'Innovation Focus',
      description: 'Cutting-edge marketing solutions'
    },
    {
      title: 'Shared Growth',
      description: 'Mutual success partnerships'
    },
    {
      title: 'Fair Marketplace',
      description: 'Transparent and ethical practices'
    },
    {
      title: 'Leading Network',
      description: 'Singapore\'s top performance network'
    }
  ]
}

// Global Growth data for advertisers page
const globalGrowthData = {
  isBack: false,
  titleFirst: 'ASSURED',
  titleFirstColor: 'text-white',
  titleSecond: 'WORLDWIDE',
  titleSecondColor: 'text-orange-500',
  titleThird: 'GROWTH',
  titleThirdColor: 'text-orange-500',
  description: 'As an advertiser, you play a crucial role in our mission. Whether you\'re an established brand, a growing business, or a startup looking to expand your reach, our platform is designed to provide you with seamless access to diverse traffic sources and high-performing publishers. By joining our network, you\'ll gain access to targeted audiences that can help you maximize your ROI and achieve sustainable growth. Together, let\'s achieve worldwide success!',
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
    src: '/images/pub-global.webp',
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
  title: 'Why Choose',
  titleColor: 'text-gray-900',
  titleAccent: 'Leadswise',
  titleAccentColor: 'text-orange-500',
  subtitle: 'Experience the advantages of partnering with Singapore\'s leading performance network',
  subtitleColor: 'text-gray-600',
  features: [
    {
      title: 'DIVERSE TRAFFIC TYPES',
      description: 'Access multiple traffic sources including social media, search engines, display networks, and native advertising platforms for maximum reach and performance.',
      iconBgClass: 'bg-gradient-to-br from-blue-500 to-blue-600',
      titleColor: 'text-gray-900',
      titleHoverColor: 'group-hover:text-orange-600',
      descriptionColor: 'text-gray-600',
      floatingElement1: 'bg-orange-400',
      floatingElement2: 'bg-yellow-400'
    },
    {
      title: 'VARIOUS VERTICALS',
      description: 'Partner across diverse industries including e-commerce, finance, gaming, health, education, and more to expand your market reach and revenue potential.',
              iconBgClass: 'bg-gradient-to-br from-orange-500 to-orange-600',
      titleColor: 'text-gray-900',
      titleHoverColor: 'group-hover:text-orange-600',
      descriptionColor: 'text-gray-600',
      floatingElement1: 'bg-pink-400',
      floatingElement2: 'bg-blue-400'
    },
    {
      title: 'DEDICATED SUPPORT TEAM',
      description: 'Get personalized assistance from our experienced team of affiliate managers, optimization specialists, and technical support to maximize your campaign success.',
      iconBgClass: 'bg-gradient-to-br from-purple-500 to-purple-600',
      titleColor: 'text-gray-900',
      titleHoverColor: 'group-hover:text-purple-600',
      descriptionColor: 'text-gray-600',
      floatingElement1: 'bg-red-400',
      floatingElement2: 'bg-yellow-400'
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