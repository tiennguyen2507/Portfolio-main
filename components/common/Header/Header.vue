<template>
  <!-- Header/Navigation -->
  <header
    class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-gray-300 dark:border-gray-700 transition-all duration-300"
    :class="isScrolled ? 'bg-white/80 dark:bg-black/80' : 'bg-white/60 dark:bg-black/60'"
  >
    <div class="max-w-7xl mx-auto px-6 py-4">
      <div class="flex justify-between items-center">
        <Logo />
        <div class="flex items-center gap-4">
          <!-- Dark Mode Toggle Button -->
          <button
            @click="toggleDarkMode"
            class="p-2 rounded-lg text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <Icon
              :name="isDark ? 'sun' : 'moon'"
              size="md"
            />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
  // Dark mode
  const { isDark, toggleDarkMode } = useDarkMode()

  // Scroll state
  const isScrolled = ref(false)

  // Handle scroll event
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 50
  }

  // Add scroll event listener on mount
  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  // Remove scroll event listener on unmount
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
</script>

