<template>
    <div>
      <!-- Hero Section -->
      <AboutHeroSection />
      <!-- Performance Purpose Section -->
      <PerformancePurposeSection />
      
      <!-- Mission Vision Section -->
      <MissionVisionSection />

      <!-- Seamless Connections Section -->
      <SeamlessConnectionsSection />
      
      <!-- Stats Section -->
      <StatsSection isBlack/>
      
      <!-- Contact Section (reuse from home) -->
      <ContactSection />
    </div>
  </template>
  
  <script setup>
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