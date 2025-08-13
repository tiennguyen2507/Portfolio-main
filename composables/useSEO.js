// SEO optimization utilities
export const useSEO = () => {
  const setPageSEO = (options = {}) => {
    const {
      title,
      description,
      keywords,
      image,
      url,
      type = 'website',
    } = options

    useHead({
      title: title || 'Nguyễn Lê Đình Tiên - Fullstack Web Developer',
      meta: [
        {
          name: 'description',
          content:
            description ||
            'Lập trình viên web với 6 năm kinh nghiệm trong Frontend và Backend Development',
        },
        {
          name: 'keywords',
          content:
            keywords ||
            'web developer, fullstack developer, frontend developer, backend developer, React, Vue.js, Node.js, Da Nang',
        },
        // Open Graph
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: image },
        { property: 'og:url', content: url },
        { property: 'og:type', content: type },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: image },
      ],
      link: [{ rel: 'canonical', href: url }],
    })
  }

  const addStructuredData = data => {
    useHead({
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(data),
        },
      ],
    })
  }

  const trackPageView = pageName => {
    if (process.client && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: pageName,
        page_location: window.location.href,
      })
    }
  }

  return {
    setPageSEO,
    addStructuredData,
    trackPageView,
  }
}
