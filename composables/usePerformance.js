// Performance monitoring utilities
export const usePerformance = () => {
  const measurePageLoad = () => {
    if (process.client) {
      window.addEventListener("load", () => {
        // Measure Core Web Vitals
        if ("PerformanceObserver" in window) {
          // LCP (Largest Contentful Paint)
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log("LCP:", lastEntry.startTime);
          });
          lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

          // FID (First Input Delay)
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              console.log("FID:", entry.processingStart - entry.startTime);
            });
          });
          fidObserver.observe({ entryTypes: ["first-input"] });

          // CLS (Cumulative Layout Shift)
          const clsObserver = new PerformanceObserver((list) => {
            let cls = 0;
            const entries = list.getEntries();
            entries.forEach((entry) => {
              if (!entry.hadRecentInput) {
                cls += entry.value;
              }
            });
            console.log("CLS:", cls);
          });
          clsObserver.observe({ entryTypes: ["layout-shift"] });
        }

        // Traditional metrics
        const navigation = performance.getEntriesByType("navigation")[0];
        if (navigation) {
          console.log(
            "DOM Content Loaded:",
            navigation.domContentLoadedEventEnd -
              navigation.domContentLoadedEventStart
          );
          console.log(
            "Load Complete:",
            navigation.loadEventEnd - navigation.loadEventStart
          );
        }
      });
    }
  };

  const measureResourceTiming = () => {
    if (process.client) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (
            entry.initiatorType === "css" ||
            entry.initiatorType === "script"
          ) {
            console.log(`${entry.initiatorType}:`, entry.name, entry.duration);
          }
        });
      });
      observer.observe({ entryTypes: ["resource"] });
    }
  };

  const optimizeImages = () => {
    if (process.client) {
      const images = document.querySelectorAll("img[data-src]");
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove("lazy");
            imageObserver.unobserve(img);
          }
        });
      });
      images.forEach((img) => imageObserver.observe(img));
    }
  };

  return {
    measurePageLoad,
    measureResourceTiming,
    optimizeImages,
  };
};
