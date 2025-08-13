// Lazy load non-critical CSS
export const useLazyCSS = () => {
  const loadCSS = href => {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href
      link.onload = resolve
      link.onerror = reject
      document.head.appendChild(link)
    })
  }

  const loadNonCriticalCSS = () => {
    // Load non-critical CSS after page load
    if (process.client) {
      // Use requestIdleCallback for better performance
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          loadCSS('/_nuxt/entry.css').catch(console.error)
        })
      } else {
        // Fallback for older browsers
        setTimeout(() => {
          loadCSS('/_nuxt/entry.css').catch(console.error)
        }, 1000)
      }
    }
  }

  return {
    loadCSS,
    loadNonCriticalCSS,
  }
}
