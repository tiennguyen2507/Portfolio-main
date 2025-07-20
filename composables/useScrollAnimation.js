export const useScrollAnimation = () => {
  const isVisible = ref(false)
  const elementRef = ref(null)

  const startAnimation = () => {
    isVisible.value = true
  }

  const stopAnimation = () => {
    isVisible.value = false
  }

  onMounted(() => {
    if (!elementRef.value) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation()
            // Stop observing after animation starts
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    observer.observe(elementRef.value)

    // Cleanup on unmount
    onUnmounted(() => {
      if (elementRef.value) {
        observer.unobserve(elementRef.value)
      }
    })
  })

  return {
    isVisible,
    elementRef,
    startAnimation,
    stopAnimation
  }
} 