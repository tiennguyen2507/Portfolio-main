<template>
  <!-- Technologies Section -->
  <section
    class="py-8 sm:py-12 md:py-16 bg-white dark:bg-black relative overflow-hidden transition-colors duration-300"
  >
    <!-- Background Tech Pattern -->
    <div class="absolute inset-0 opacity-5 pointer-events-none">
      <div
        class="absolute top-10 left-1/4 text-orange-500 text-2xl animate-pulse"
      >
        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>
      <div
        class="absolute bottom-10 right-1/4 text-orange-500 text-2xl animate-bounce"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
          />
        </svg>
      </div>
      <div
        class="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5"
      ></div>
    </div>

    <div class="relative z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="flex flex-wrap justify-center gap-8">
          <Typography as="span" :size="{sp: 'md', pc: 'lg'}" color="muted" class="hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer">HTML</Typography>
          <Typography as="span" :size="{sp: 'md', pc: 'lg'}" color="muted" class="hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer">CSS</Typography>
          <Typography as="span" :size="{sp: 'md', pc: 'lg'}" color="muted" class="hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer">Javascript</Typography>
          <Typography as="span" :size="{sp: 'md', pc: 'lg'}" color="muted" class="hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer">Nest JS</Typography>
          <Typography as="span" :size="{sp: 'md', pc: 'lg'}" color="muted" class="hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer">React</Typography>
          <Typography as="span" :size="{sp: 'md', pc: 'lg'}" color="muted" class="hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer">Next</Typography>
          <Typography as="span" :size="{sp: 'md', pc: 'lg'}" color="muted" class="hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer">Vue</Typography>
          <Typography as="span" :size="{sp: 'md', pc: 'lg'}" color="muted" class="hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer">Nuxt</Typography>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  // Component logic can be added here if needed
</script>
