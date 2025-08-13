// Image optimization utilities
export const useImageOptimization = () => {
  const optimizeImage = (src, options = {}) => {
    const {
      width = 800,
      quality = 80,
      format = 'webp',
      loading = 'lazy',
    } = options

    // Use Nuxt Image for optimization
    return {
      src,
      width,
      height: options.height,
      quality,
      format,
      loading,
      alt: options.alt || '',
      class: options.class || '',
      sizes: options.sizes || '(max-width: 768px) 100vw, 800px',
    }
  }

  const preloadImage = src => {
    if (process.client) {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    }
  }

  const lazyLoadImage = imgElement => {
    if (process.client && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target
            img.src = img.dataset.src
            img.classList.remove('lazy')
            observer.unobserve(img)
          }
        })
      })

      observer.observe(imgElement)
    }
  }

  return {
    optimizeImage,
    preloadImage,
    lazyLoadImage,
  }
}
