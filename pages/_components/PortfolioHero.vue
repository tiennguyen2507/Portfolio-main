<template>
  <!-- Hero Section -->
  <section
    id="home"
    class="pt-24 pb-16 min-h-screen flex items-center relative overflow-hidden"
  >
    <!-- Background Technology Icons -->
    <div class="absolute inset-0 opacity-5 pointer-events-none">
      <!-- Floating Tech Icons -->
      <div
        class="absolute top-20 left-10 text-orange-500 text-4xl animate-pulse"
      >
        <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>
      <div
        class="absolute top-40 right-20 text-orange-500 text-4xl animate-bounce"
      >
        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
          />
        </svg>
      </div>
      <div
        class="absolute bottom-40 left-20 text-orange-500 text-4xl animate-pulse"
      >
        <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"
          />
        </svg>
      </div>
      <div
        class="absolute bottom-20 right-10 text-orange-500 text-4xl animate-bounce"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          />
        </svg>
      </div>
      <div
        class="absolute top-1/2 left-1/4 text-orange-500 text-4xl animate-pulse"
      >
        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
          />
        </svg>
      </div>
      <div
        class="absolute top-1/3 right-1/3 text-orange-500 text-4xl animate-bounce"
      >
        <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>

      <!-- Code-like Elements -->
      <div
        class="absolute top-1/4 left-1/2 text-gray-600 text-xs font-mono opacity-20"
      >
        &lt;div class="developer"&gt;
      </div>
      <div
        class="absolute top-1/3 left-1/2 text-gray-600 text-xs font-mono opacity-20"
      >
        &lt;/div&gt;
      </div>
      <div
        class="absolute bottom-1/3 right-1/4 text-gray-600 text-xs font-mono opacity-20"
      >
        function create() {
      </div>
      <div
        class="absolute bottom-1/4 right-1/4 text-gray-600 text-xs font-mono opacity-20"
      >
        }
      </div>

      <!-- Grid Pattern -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent"
      ></div>
      <div
        class="absolute inset-0"
        style="
          background-image:
            radial-gradient(
              circle at 25% 25%,
              rgba(249, 115, 22, 0.1) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 75% 75%,
              rgba(249, 115, 22, 0.1) 0%,
              transparent 50%
            );
        "
      ></div>

      <!-- Animated Lines -->
      <div class="absolute inset-0 overflow-hidden">
        <!-- Horizontal Lines -->
        <div
          class="absolute top-1/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/60 to-transparent animate-slide-left"
        ></div>
        <div
          class="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/55 to-transparent animate-slide-left"
          style="animation-delay: 1s"
        ></div>
        <div
          class="absolute top-3/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent animate-slide-left"
          style="animation-delay: 2s"
        ></div>

        <!-- Vertical Lines -->
        <div
          class="absolute top-0 left-1/4 h-full w-1 bg-gradient-to-b from-transparent via-orange-500/60 to-transparent animate-slide-top"
        ></div>
        <div
          class="absolute top-0 left-1/2 h-full w-1 bg-gradient-to-b from-transparent via-orange-500/55 to-transparent animate-slide-top"
          style="animation-delay: 1.5s"
        ></div>
        <div
          class="absolute top-0 left-3/4 h-full w-1 bg-gradient-to-b from-transparent via-orange-500/50 to-transparent animate-slide-top"
          style="animation-delay: 2.5s"
        ></div>

        <!-- Diagonal Lines -->
        <div class="absolute top-0 left-0 w-full h-full">
          <div
            class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-orange-500/20 to-transparent animate-pulse"
            style="animation-delay: 0.3s"
          ></div>
          <div
            class="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-transparent via-orange-500/20 to-transparent animate-pulse"
            style="animation-delay: 1.3s"
          ></div>
        </div>

        <!-- Moving Dots -->
        <div
          class="absolute top-1/3 left-1/4 w-4 h-4 bg-orange-500/70 rounded-full animate-float"
          style="animation-delay: 0.7s"
        ></div>
        <div
          class="absolute top-2/3 right-1/4 w-3 h-3 bg-orange-500/80 rounded-full animate-float"
          style="animation-delay: 1.7s"
        ></div>
        <div
          class="absolute bottom-1/3 left-1/2 w-3.5 h-3.5 bg-orange-500/65 rounded-full animate-float"
          style="animation-delay: 2.7s"
        ></div>

        <!-- Additional Static Lines for Visibility -->
        <div
          class="absolute top-1/6 left-0 w-full h-1 bg-orange-500/50 animate-glow"
        ></div>
        <div
          class="absolute top-5/6 left-0 w-full h-1 bg-orange-500/50 animate-glow"
          style="animation-delay: 1s"
        ></div>
        <div
          class="absolute top-0 left-1/6 h-full w-1 bg-orange-500/50 animate-glow"
          style="animation-delay: 0.5s"
        ></div>
        <div
          class="absolute top-0 left-5/6 h-full w-1 bg-orange-500/50 animate-glow"
          style="animation-delay: 1.5s"
        ></div>

        <!-- More Visible Lines -->
        <div
          class="absolute top-1/3 left-0 w-full h-1.5 bg-orange-500/70"
        ></div>
        <div
          class="absolute top-2/3 left-0 w-full h-1.5 bg-orange-500/70"
        ></div>
        <div
          class="absolute top-0 left-1/3 h-full w-1.5 bg-orange-500/70"
        ></div>
        <div
          class="absolute top-0 left-2/3 h-full w-1.5 bg-orange-500/70"
        ></div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Left Side - Introduction -->
        <div class="space-y-8">
          <div class="space-y-4">
            <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              <span class="text-white">Hello.</span>
              <span class="text-orange-500 ml-2">●</span>
            </h1>
            <div class="flex items-center space-x-4">
              <span
                class="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white"
                >I'm Nguyễn Lê Đình Tiên</span
              >
              <div class="w-8 sm:w-12 md:w-16 h-0.5 bg-orange-500"></div>
            </div>
            <h2
              class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white"
            >
              Software Developer
            </h2>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <NuxtLink
              to="/blogs"
              class="bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 inline-block"
            >
              Explore my blogs
            </NuxtLink>
            <button
              class="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105"
            >
              My resume
            </button>
          </div>
        </div>

        <!-- Right Side - Profile Picture -->
        <div class="relative flex justify-center lg:justify-end">
          <div class="relative">
            <!-- Background decorative elements -->
            <div
              class="absolute -top-8 -left-8 sm:-top-10 sm:-left-10 lg:-top-12 lg:-left-12 w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 border-2 border-orange-500/30 rounded-full"
            ></div>
            <div
              class="absolute -bottom-8 -right-8 sm:-bottom-10 sm:-right-10 lg:-bottom-12 lg:-right-12 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 border-2 border-orange-500/20 rounded-full"
            ></div>

            <!-- Chevron shapes -->
            <div
              class="absolute -left-12 sm:-left-16 lg:-left-20 top-1/2 transform -translate-y-1/2 text-orange-500/30 text-4xl sm:text-5xl lg:text-7xl font-bold"
            >
              &lt;
            </div>
            <div
              class="absolute -right-12 sm:-right-16 lg:-right-20 top-1/2 transform -translate-y-1/2 text-orange-500/30 text-4xl sm:text-5xl lg:text-7xl font-bold"
            >
              &gt;
            </div>

            <!-- Profile Image -->
            <div class="relative z-10">
              <div
                class="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-4 border-orange-500/20 shadow-2xl overflow-hidden"
              >
                <img
                  src="~/assets/images/IMG_6220.webp"
                  alt="Nguyễn Lê Đình Tiên - Software Developer"
                  class="w-full h-full object-cover scale-110 hover:scale-125 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  // Component logic can be added here if needed
</script>

<style scoped>
  /* Custom animations for background lines */
  @keyframes slideInFromLeft {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  @keyframes slideInFromTop {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      transform: translateY(100%);
      opacity: 0;
    }
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes glow {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.8;
    }
  }

  /* Apply custom animations */
  .animate-slide-left {
    animation: slideInFromLeft 4s ease-in-out infinite;
  }

  .animate-slide-top {
    animation: slideInFromTop 4s ease-in-out infinite;
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }
</style>
