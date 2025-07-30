<template>
  <section class="py-16 bg-orange-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row items-center justify-between">
        <!-- Section Title -->
        <div class="text-center lg:text-left mb-8 lg:mb-0">
          <h2
            class="text-4xl sm:text-5xl font-bold text-orange-500 leading-tight"
          >
            <span class="block">WHAT OUR</span>
            <span class="block">TEAM SAYS</span>
          </h2>
        </div>
        <div class="min-h-[200px] flex flex-col lg:flex-row items-center justify-between lg:items-start relative">
          <!-- Testimonials Slider -->
          <div class="testimonials-container">
            <div
              class="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-12"
            >
              <!-- Profile Picture -->
              <div class="flex-shrink-0">
                <div
                  class="w-24 h-24 rounded-full overflow-hidden bg-white shadow-lg flex items-center justify-center"
                >
                  <img
                    :src="testimonials[currentSlide].avatar"
                    :alt="testimonials[currentSlide].name"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>

              <!-- Testimonial Content -->
              <div class="flex-1 text-center lg:text-left max-w-2xl">
                <blockquote
                  class="text-lg md:text-xl text-gray-800 leading-relaxed mb-6"
                >
                  "{{ testimonials[currentSlide].quote }}"
                </blockquote>

                <div class="space-y-1">
                  <h4 class="font-bold text-xl text-gray-900">
                    {{ testimonials[currentSlide].name }}
                  </h4>
                  <p class="text-gray-600 font-medium">
                    {{ testimonials[currentSlide].position }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex space-x-4  lg:absolute bottom-0  lg:right-0">
            <button
              @click="
                currentSlide =
                  currentSlide > 0 ? currentSlide - 1 : testimonials.length - 1
              "
              class="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors duration-300"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
            <button
              @click="
                currentSlide =
                  currentSlide < testimonials.length - 1 ? currentSlide + 1 : 0
              "
              class="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors duration-300"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <!-- Navigation Controls -->
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// Current slide index
const currentSlide = ref(0);

// Auto-play functionality
let autoplayInterval = null;

onMounted(() => {
  // Start autoplay
  autoplayInterval = setInterval(() => {
    currentSlide.value =
      currentSlide.value < testimonials.value.length - 1
        ? currentSlide.value + 1
        : 0;
  }, 5000);
});

onUnmounted(() => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
  }
});

// Testimonials data
const testimonials = ref([
  {
    id: 1,
    name: "JAMIE",
    position: "AFFILIATE MANAGER",
    quote:
      "Working here has been a game-changer for my career. The supportive environment, challenging projects, and growth opportunities have exceeded my expectations.",
    avatar: "/assets/images/avatar-default.jpg",
  },
  {
    id: 2,
    name: "MARK",
    position: "DEVELOPER",
    quote:
      "I appreciate the flexibility here. Remote work options allow me to balance my professional and personal life effectively.",
    avatar: "/assets/images/avatar-default.jpg",
  },
  {
    id: 3,
    name: "SARAH",
    position: "SENIOR DEVELOPER",
    quote:
      "The collaborative culture at Leadsmax is incredible. Every day brings new challenges and learning opportunities. I've grown both professionally and personally.",
    avatar: "/assets/images/avatar-default.jpg",
  },
  {
    id: 4,
    name: "MIKE",
    position: "MARKETING DIRECTOR",
    quote:
      "What sets Leadsmax apart is the genuine care for employee development. The mentorship programs and skill-building initiatives are truly outstanding.",
    avatar: "/assets/images/avatar-default.jpg",
  },
  {
    id: 5,
    name: "EMMA",
    position: "DATA ANALYST",
    quote:
      "The work-life balance here is perfect. Management truly understands the importance of personal time while maintaining high performance standards.",
    avatar: "/assets/images/avatar-default.jpg",
  },
]);
</script>

<style scoped>
.testimonials-container {
  padding-bottom: 2rem;
}

/* Custom orange accent for hover effects */
.bg-orange-50 {
  background-color: #fff7ed;
}

.text-orange-500 {
  color: #f97316;
}

/* Orange accent for interactive elements */
button:hover {
  transform: scale(1.05);
}

.testimonials-container {
  transition: transform 0.3s ease;
}

.testimonials-container:hover {
  transform: translateY(-5px);
}
</style>
