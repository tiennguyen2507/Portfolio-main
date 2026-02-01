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
          <nav v-if="isHomePage" class="hidden md:flex space-x-8">
            <a
              v-for="item in navigationItems"
              :key="item.path"
              :href="item.path"
              class="transition-colors"
            >
              <Typography as="span" :size="{sp: 'sm', pc: 'md'}" color="default" class="hover:text-orange-500 dark:hover:text-orange-400">
                {{ item.label }}
              </Typography>
            </a>
          </nav>
          
          <!-- Dark Mode Toggle Button -->
          <button
            @click="toggleDarkMode"
            class="p-2 rounded-lg text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <!-- Sun icon (light mode) -->
            <svg
              v-if="isDark"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <!-- Moon icon (dark mode) -->
            <svg
              v-else
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>

          <!-- Mobile menu button -->
          <button
            v-if="isHomePage"
            @click="toggleMobileMenu"
            class="md:hidden text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div
        v-if="isHomePage && showMobileMenu"
        class="md:hidden mt-4 pb-4 border-t border-gray-300 dark:border-gray-700"
      >
        <ul class="flex flex-col space-y-2 pt-4">
          <li v-for="item in navigationItems" :key="`mobile-${item.path}`">
            <a
              :href="item.path"
              class="block px-4 py-3 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-300 text-right"
              @click="showMobileMenu = false"
            >
              <Typography as="span" size="md" color="default">
                {{ item.label }}
              </Typography>
            </a>
          </li>
        </ul>
      </div>
      </div>
  </header>
</template>

<script setup>
  // Dark mode
  const { isDark, toggleDarkMode } = useDarkMode()

  // Get current route
  const route = useRoute()

  // Check if current page is home page
  const isHomePage = computed(() => route.path === '/')

  // Navigation items for portfolio
  const navigationItems = ref([
    {
      label: 'Home',
      path: '#home',
    },
    {
      label: 'About',
      path: '#about',
    },
    {
      label: 'Projects',
      path: '#projects',
    },
    {
      label: 'Blogs',
      path: '#blogs',
    },
    {
      label: 'Wedding',
      path: '#wedding',
    },
    {
      label: 'Shop',
      path: '/shop',
    },
    {
      label: 'Contact',
      path: '#contact',
    },
  ])

  // Mobile menu state
  const showMobileMenu = ref(false)

  // Scroll state
  const isScrolled = ref(false)

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    showMobileMenu.value = !showMobileMenu.value
  }

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
