<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
  // Global SEO and performance optimizations
  useHead({
    htmlAttrs: {
      lang: 'vi',
    },
    bodyAttrs: {
      class: 'antialiased',
    },
    link: [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: '',
      },
      {
        rel: 'dns-prefetch',
        href: 'https://fonts.googleapis.com',
      },
      // Preload critical resources
      {
        rel: 'preload',
        href: '/fonts/UTM-Hanzel.ttf',
        as: 'font',
        type: 'font/ttf',
        crossorigin: 'anonymous',
      },
    ],
    // Inline critical CSS
    style: [
      {
        children: `
        /* Critical CSS - Inline for above-the-fold content */
        html { scroll-behavior: smooth; }
        body { 
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6; 
          color: #1f2937; 
          background-color: #ffffff; 
          margin: 0; 
          padding: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .container { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        header { 
          position: fixed; top: 0; left: 0; right: 0; z-index: 50; 
          backdrop-filter: blur(8px); border-bottom: 1px solid rgba(31, 41, 55, 0.1); 
          transition: all 0.3s ease; 
        }
        .hero-section { 
          min-height: 100vh; display: flex; align-items: center; justify-content: center; 
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); 
          color: white; text-align: center; padding: 2rem 1rem; 
        }
        .btn { 
          display: inline-flex; align-items: center; justify-content: center; 
          font-weight: 500; border-radius: 0.5rem; transition: all 0.2s ease; 
          text-decoration: none; cursor: pointer; border: none; outline: none; 
        }
        .btn-primary { background-color: #f97316; color: white; }
        .btn-primary:hover { background-color: #ea580c; }
        img { max-width: 100%; height: auto; }
        *:focus { outline: 2px solid #10b981; outline-offset: 2px; }
        @media (max-width: 768px) { 
          .container { padding: 0 0.75rem; } 
          .hero-section { padding: 1rem 0.75rem; } 
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { 
            animation-duration: 0.01ms !important; 
            animation-iteration-count: 1 !important; 
            transition-duration: 0.01ms !important; 
          }
        }
      `,
      },
    ],
  })
</script>

<style>
  /* Global styles for better performance */
  html {
    scroll-behavior: smooth;
  }

  body {
    font-family:
      'Inter',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      sans-serif;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Optimize images */
  img {
    max-width: 100%;
    height: auto;
  }

  /* Improve focus accessibility */
  *:focus {
    outline: 2px solid #10b981;
    outline-offset: 2px;
  }

  /* Reduce motion for users who prefer it */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>
