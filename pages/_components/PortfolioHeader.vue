<template>
  <!-- Header/Navigation -->
  <header
    class="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-gray-800 transition-all duration-300"
    :class="isScrolled ? 'bg-gray-900' : 'bg-gray-900/90'"
  >
    <div class="max-w-7xl mx-auto px-6 py-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <NuxtLink to="/" class="hover:opacity-80 transition-opacity">
            <img
              src="~/assets/images/logo-main.webp"
              alt="Nguyễn Lê Đình Tiên Logo"
              class="h-8 w-auto"
            />
          </NuxtLink>
        </div>
        <nav v-if="isHomePage" class="hidden md:flex space-x-8">
          <a
            v-for="item in navigationItems"
            :key="item.path"
            :href="item.path"
            class="text-white hover:text-orange-500 transition-colors"
          >
            {{ item.label }}
          </a>
        </nav>
        <button
          v-if="isHomePage"
          @click="toggleMobileMenu"
          class="md:hidden text-white hover:text-orange-500 transition-colors"
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

      <!-- Mobile menu -->
      <div
        v-if="isHomePage && showMobileMenu"
        class="md:hidden mt-4 pb-4 border-t border-gray-700"
      >
        <ul class="flex flex-col space-y-2 pt-4">
          <li v-for="item in navigationItems" :key="`mobile-${item.path}`">
            <a
              :href="item.path"
              class="block px-4 py-3 text-white hover:text-orange-500 hover:bg-white/5 rounded-lg transition-all duration-300 text-right"
              @click="showMobileMenu = false"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
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
