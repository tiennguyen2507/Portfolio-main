<template>
  <section
    class="relative min-h-[120vh] flex flex-col overflow-hidden"
  >
    <!-- Background with hero image -->
    <div class="fixed inset-0" style="z-index: -1">
      <img
        src="/assets/images/pricing-bg.webp"
        alt="Hero Background"
        class="w-full h-full object-cover"
      />
      <!-- Dark overlay for better text readability -->
      <div class="absolute inset-0 bg-black/50"></div>
    </div>

    <!-- Overlay to hide background after hero section -->
    <div
      class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"
      style="z-index: 1"
    ></div>

    <!-- Hero Content -->
    <div
      class="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-16"
    >
      <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mt-20">
        <span class="text-orange-500 relative">
          LEADSWISE
          <div
            class="absolute -inset-2 bg-gradient-to-r from-orange-500/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          ></div>
        </span>
        <span class="text-white"> NETWORK</span>
      </h1>

      <div class="mb-12 flex flex-col">
        <img
            src="/assets/images/2.png"
            alt="Global Growth Background"
          />
        <img
          src="/assets/images/1.png"
          alt="Global Growth Background"
        />
      </div>

    </div>
  </section>
</template>

<script setup>
const leadsCounter = ref(null);
const advertisersCounter = ref(null);
const publishersCounter = ref(null);
const offersCounter = ref(null);

// Animation function
const animateCounter = (element, target, duration = 3500) => {
  if (!element) return;

  let start = 0;
  const increment = target / (duration / 16); // 60fps

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
};

// Intersection Observer to trigger animation when section is visible
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Start animations
          animateCounter(leadsCounter.value, 1); // 1M
          animateCounter(advertisersCounter.value, 300);
          animateCounter(publishersCounter.value, 1000);
          animateCounter(offersCounter.value, 500);

          // Stop observing after animation starts
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  // Observe the section
  const section = document.querySelector("section");
  if (section) {
    observer.observe(section);
  }
});
</script>

<style scoped>
/* Hover effects for stats */
.group:hover .text-orange-500 {
  text-shadow: 0 0 20px rgba(249, 115, 22, 0.5);
}
</style>
