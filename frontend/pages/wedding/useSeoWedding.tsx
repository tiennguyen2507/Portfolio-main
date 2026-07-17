/**
 * Hook SEO cho trang Wedding
 * Tạo các meta tags, Open Graph, Twitter Cards và Structured Data (JSON-LD)
 *
 * @param config - Wedding configuration từ config.js
 * @param baseUrl - Base URL của website (mặc định lấy từ runtime config)
 */
export const useSeoWedding = (config: any, baseUrl?: string) => {
  const configRuntime = useRuntimeConfig()
  const route = useRoute()

  // Lấy base URL từ runtime config hoặc từ parameter
  const siteUrl =
    baseUrl || configRuntime.public.SITE_URL || 'https://nguyenledinhtien.io.vn'
  const weddingUrl = `${siteUrl}${route.path}`

  // Format date helper
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return date.toLocaleDateString('vi-VN', options)
  }

  // Format date time cho structured data (ISO 8601)
  const formatDateTime = (dateString: string, time: string): string => {
    const date = new Date(dateString)
    const [hours, minutes] = time.split(':')
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0)
    return date.toISOString()
  }

  // Tạo title
  const title = `${config.couple.groom.name} & ${config.couple.bride.name} - Đám Cưới`

  // Tạo description
  const description = `Đám cưới của ${config.couple.groom.name} và ${config.couple.bride.name}. Lễ thành hôn vào ngày ${formatDate(config.weddingDate.ceremony.date)} tại ${config.weddingDate.ceremony.location}. Hãy đến chung vui với chúng tôi trong ngày trọng đại này!`

  // Lấy image (ưu tiên hero image, sau đó là ảnh cô dâu/chú rể)
  const image =
    config.heroImage || config.couple.bride.image || config.couple.groom.image

  // Keywords
  const keywords = `đám cưới, wedding, ${config.couple.groom.name}, ${config.couple.bride.name}, lễ thành hôn, tiệc cưới, ${config.weddingDate.ceremony.location}`

  // Tạo Structured Data cho Event (Schema.org)
  const createEventStructuredData = () => {
    const ceremonyDate = formatDateTime(
      config.weddingDate.ceremony.date,
      config.weddingDate.ceremony.time
    )
    const receptionDate = formatDateTime(
      config.weddingDate.reception.date,
      config.weddingDate.reception.time
    )

    // Event chính (Lễ thành hôn)
    const ceremonyEvent = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: `${config.couple.groom.name} & ${config.couple.bride.name} - ${config.weddingDate.ceremony.name}`,
      description: `Lễ thành hôn của ${config.couple.groom.name} và ${config.couple.bride.name}`,
      startDate: ceremonyDate,
      endDate: ceremonyDate,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: config.weddingDate.ceremony.location,
        address: {
          '@type': 'PostalAddress',
          addressLocality: config.weddingDate.ceremony.address,
          addressCountry: 'VN',
        },
        ...(config.weddingDate.ceremony.mapUrl && {
          url: config.weddingDate.ceremony.mapUrl,
        }),
      },
      organizer: {
        '@type': 'Person',
        name: `${config.couple.groom.name} & ${config.couple.bride.name}`,
      },
      ...(image && { image: [image] }),
      url: weddingUrl,
      inLanguage: 'vi-VN',
    }

    // Event phụ (Tiệc cưới)
    const receptionEvent = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: `${config.couple.groom.name} & ${config.couple.bride.name} - ${config.weddingDate.reception.name}`,
      description: `Tiệc cưới của ${config.couple.groom.name} và ${config.couple.bride.name}`,
      startDate: receptionDate,
      endDate: receptionDate,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: config.weddingDate.reception.location,
        address: {
          '@type': 'PostalAddress',
          addressLocality: config.weddingDate.reception.address,
          addressCountry: 'VN',
        },
        ...(config.weddingDate.reception.mapUrl && {
          url: config.weddingDate.reception.mapUrl,
        }),
      },
      organizer: {
        '@type': 'Person',
        name: `${config.couple.groom.name} & ${config.couple.bride.name}`,
      },
      ...(image && { image: [image] }),
      url: weddingUrl,
      inLanguage: 'vi-VN',
    }

    return [ceremonyEvent, receptionEvent]
  }

  // Tạo Person structured data cho cô dâu và chú rể
  const createPersonStructuredData = () => {
    const groomSocial = config.couple.groom.social
      ? [
          config.couple.groom.social.facebook,
          config.couple.groom.social.instagram,
        ].filter(Boolean)
      : []

    const brideSocial = config.couple.bride.social
      ? [
          config.couple.bride.social.facebook,
          config.couple.bride.social.instagram,
        ].filter(Boolean)
      : []

    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: config.couple.groom.name,
        ...(config.couple.groom.nameEn && {
          alternateName: config.couple.groom.nameEn,
        }),
        ...(config.couple.groom.description && {
          description: config.couple.groom.description,
        }),
        ...(config.couple.groom.image && { image: config.couple.groom.image }),
        ...(groomSocial.length > 0 && { sameAs: groomSocial }),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: config.couple.bride.name,
        ...(config.couple.bride.nameEn && {
          alternateName: config.couple.bride.nameEn,
        }),
        ...(config.couple.bride.description && {
          description: config.couple.bride.description,
        }),
        ...(config.couple.bride.image && { image: config.couple.bride.image }),
        ...(brideSocial.length > 0 && { sameAs: brideSocial }),
      },
    ]
  }

  // Áp dụng SEO
  useHead({
    title,
    meta: [
      // Basic meta tags
      {
        name: 'description',
        content: description,
      },
      {
        name: 'keywords',
        content: keywords,
      },
      {
        name: 'author',
        content: `${config.couple.groom.name} & ${config.couple.bride.name}`,
      },
      {
        name: 'robots',
        content: 'index, follow',
      },

      // Open Graph tags
      {
        property: 'og:title',
        content: title,
      },
      {
        property: 'og:description',
        content: description,
      },
      {
        property: 'og:image',
        content: image,
      },
      {
        property: 'og:url',
        content: weddingUrl,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:site_name',
        content:
          configRuntime.public.SITE_NAME || 'Nguyễn Lê Đình Tiên Portfolio',
      },
      {
        property: 'og:locale',
        content: 'vi_VN',
      },

      // Twitter Card tags
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: title,
      },
      {
        name: 'twitter:description',
        content: description,
      },
      {
        name: 'twitter:image',
        content: image,
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: weddingUrl,
      },
    ],
    script: [
      // Structured Data cho Events
      ...createEventStructuredData().map(event => ({
        type: 'application/ld+json',
        children: JSON.stringify(event),
      })),
      // Structured Data cho Persons
      ...createPersonStructuredData().map(person => ({
        type: 'application/ld+json',
        children: JSON.stringify(person),
      })),
    ],
  })

  return {
    title,
    description,
    image,
    keywords,
    url: weddingUrl,
  }
}
