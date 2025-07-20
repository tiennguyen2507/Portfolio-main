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
  </div>
</template>

<script setup>
// Get runtime config for environment variables
const config = useRuntimeConfig()

// SEO meta tags with structured data
useHead({
  title: config.public.SITE_TITLE || 'LeadsWise Network - Empowering Affiliate Journey',
  meta: [
    {
      name: 'description',
      content: config.public.SITE_DESCRIPTION || 'LeadsWise Network specializes in affiliate marketing, connecting consumers with brands and helping advertisers and publishers achieve their goals. Join our network of +300 advertisers and +1000 publishers.'
    },
    {
      name: 'keywords',
      content: config.public.SITE_KEYWORDS || 'affiliate marketing, leads management, digital marketing, publishers, advertisers, performance marketing, Vietnam, CPA, CPL, lead generation'
    },
    {
      name: 'robots',
      content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    },
    {
      name: 'author',
      content: config.public.SITE_AUTHOR || 'LeadsWise Network'
    },
    {
      property: 'og:title',
      content: config.public.SITE_TITLE || 'LeadsWise Network - Empowering Affiliate Journey'
    },
    {
      property: 'og:description',
      content: config.public.SITE_DESCRIPTION || 'Specialized affiliate marketing platform connecting advertisers and publishers for maximum performance. Join +300 advertisers and +1000 publishers.'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: config.public.SITE_URL || 'https://leadswise.network'
    },
    {
      property: 'og:image',
      content: config.public.SITE_OG_IMAGE || `${config.public.SITE_URL || 'https://leadswise.network'}/og-image.jpg`
    },
    {
      property: 'og:image:width',
      content: '1200'
    },
    {
      property: 'og:image:height',
      content: '630'
    },
    {
      property: 'og:site_name',
      content: config.public.SITE_NAME || 'LeadsWise Network'
    },
    {
      property: 'og:locale',
      content: config.public.SITE_LOCALE || 'en_US'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: config.public.SITE_TITLE || 'LeadsWise Network - Empowering Affiliate Journey'
    },
    {
      name: 'twitter:description',
      content: config.public.SITE_DESCRIPTION || 'Specialized affiliate marketing platform connecting advertisers and publishers for maximum performance.'
    },
    {
      name: 'twitter:image',
      content: config.public.SITE_TWITTER_IMAGE || `${config.public.SITE_URL || 'https://leadswise.network'}/twitter-image.jpg`
    },
    {
      name: 'twitter:site',
      content: config.public.SITE_TWITTER_SITE || '@leadswise'
    },
    {
      name: 'twitter:creator',
      content: config.public.SITE_TWITTER_CREATOR || '@leadswise'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: config.public.SITE_URL || 'https://leadswise.network'
    },
    {
      rel: 'alternate',
      hreflang: 'en',
      href: config.public.SITE_URL || 'https://leadswise.network'
    },
    {
      rel: 'alternate',
      hreflang: 'vi',
      href: `${config.public.SITE_URL || 'https://leadswise.network'}/vi`
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: config.public.SITE_NAME || 'LeadsWise Network',
        url: config.public.SITE_URL || 'https://leadswise.network',
        logo: config.public.SITE_LOGO || `${config.public.SITE_URL || 'https://leadswise.network'}/logo.png`,
        description: config.public.SITE_DESCRIPTION || 'Specialized affiliate marketing platform connecting advertisers and publishers for maximum performance.',
        sameAs: [
          config.public.SITE_FACEBOOK || 'https://facebook.com/leadswise',
          config.public.SITE_TWITTER || 'https://twitter.com/leadswise',
          config.public.SITE_LINKEDIN || 'https://linkedin.com/company/leadswise'
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: config.public.SITE_PHONE || '+84-xxx-xxx-xxxx',
          contactType: 'customer service',
          areaServed: config.public.SITE_AREA_SERVED || 'VN',
          availableLanguage: config.public.SITE_LANGUAGES ? config.public.SITE_LANGUAGES.split(',') : ['English', 'Vietnamese']
        }
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: config.public.SITE_NAME || 'LeadsWise Network',
        url: config.public.SITE_URL || 'https://leadswise.network',
        description: config.public.SITE_DESCRIPTION || 'Empowering Affiliate Journey - Specialized affiliate marketing platform',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${config.public.SITE_URL || 'https://leadswise.network'}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      })
    }
  ]
})

definePageMeta({
  layout: 'default'
})
</script> 