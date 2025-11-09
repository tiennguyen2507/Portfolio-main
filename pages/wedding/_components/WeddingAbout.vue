<template>
  <section class="py-20 md:py-32 bg-gray-900">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Title -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-light text-white mb-4">
          Chúng Tôi
        </h2>
        <div class="flex items-center justify-center gap-4">
          <div class="h-px w-16 bg-gray-700"></div>
          <span class="text-2xl">💑</span>
          <div class="h-px w-16 bg-gray-700"></div>
        </div>
      </div>

      <!-- Couple Info -->
      <div class="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <!-- Groom -->
        <div class="text-center">
          <div
            class="relative w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-orange-500/30 shadow-xl"
          >
            <img
              :src="config.couple.groom.image"
              :alt="config.couple.groom.name"
              class="w-full h-full object-cover"
            />
          </div>
          <h3 class="text-3xl font-light text-white mb-2">
            {{ config.couple.groom.name }}
          </h3>
          <p class="text-lg text-gray-400 mb-4 italic">
            {{ config.couple.groom.nameEn }}
          </p>
          <p class="text-gray-400 max-w-md mx-auto">
            {{ config.couple.groom.description }}
          </p>
        </div>

        <!-- Bride -->
        <div class="text-center">
          <div
            class="relative w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-orange-500/30 shadow-xl"
          >
            <img
              :src="config.couple.bride.image"
              :alt="config.couple.bride.name"
              class="w-full h-full object-cover"
            />
          </div>
          <h3 class="text-3xl font-light text-white mb-2">
            {{ config.couple.bride.name }}
          </h3>
          <p class="text-lg text-gray-400 mb-4 italic">
            {{ config.couple.bride.nameEn }}
          </p>
          <p class="text-gray-400 max-w-md mx-auto">
            {{ config.couple.bride.description }}
          </p>
        </div>
      </div>

      <!-- Story Section -->
      <div class="mt-20 text-center max-w-3xl mx-auto">
        <p class="text-lg md:text-xl text-gray-300 leading-relaxed italic">
          "Tình yêu không phải là nhìn chằm chằm vào nhau, mà là cùng nhìn về
          một hướng."
        </p>
        <p class="text-gray-400 mt-4">- Antoine de Saint-Exupéry</p>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { weddingConfig } from '../config.js'

  const config = weddingConfig
</script>
