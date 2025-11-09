<template>
  <section class="py-20 md:py-32 bg-gray-900">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Title -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-light text-white mb-4">
          Địa Điểm
        </h2>
        <div class="flex items-center justify-center gap-4">
          <div class="h-px w-16 bg-gray-700"></div>
          <span class="text-2xl">📍</span>
          <div class="h-px w-16 bg-gray-700"></div>
        </div>
      </div>

      <!-- Locations -->
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Ceremony Location -->
        <div
          class="bg-gray-800/50 border border-gray-700 rounded-2xl shadow-xl overflow-hidden"
        >
          <div
            class="h-64 bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center"
          >
            <span class="text-6xl">💒</span>
          </div>
          <div class="p-8">
            <h3 class="text-2xl font-light text-white mb-4">
              {{ config.weddingDate.ceremony.name }}
            </h3>
            <p class="text-gray-400 mb-2">
              <strong class="text-gray-300">Địa điểm:</strong>
              {{ config.weddingDate.ceremony.location }}
            </p>
            <p class="text-gray-400 mb-4">
              {{ config.weddingDate.ceremony.address }}
            </p>
            <p class="text-gray-400 mb-4">
              <strong class="text-gray-300">Thời gian:</strong>
              {{
                formatDateTime(
                  config.weddingDate.ceremony.date,
                  config.weddingDate.ceremony.time
                )
              }}
            </p>
            <a
              :href="config.weddingDate.ceremony.mapUrl"
              target="_blank"
              class="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Xem trên Google Maps →
            </a>
          </div>
        </div>

        <!-- Reception Location -->
        <div
          class="bg-gray-800/50 border border-gray-700 rounded-2xl shadow-xl overflow-hidden"
        >
          <div
            class="h-64 bg-gradient-to-br from-orange-600 to-orange-500 flex items-center justify-center"
          >
            <span class="text-6xl">🍾</span>
          </div>
          <div class="p-8">
            <h3 class="text-2xl font-light text-white mb-4">
              {{ config.weddingDate.reception.name }}
            </h3>
            <p class="text-gray-400 mb-2">
              <strong class="text-gray-300">Địa điểm:</strong>
              {{ config.weddingDate.reception.location }}
            </p>
            <p class="text-gray-400 mb-4">
              {{ config.weddingDate.reception.address }}
            </p>
            <p class="text-gray-400 mb-4">
              <strong class="text-gray-300">Thời gian:</strong>
              {{
                formatDateTime(
                  config.weddingDate.reception.date,
                  config.weddingDate.reception.time
                )
              }}
            </p>
            <a
              :href="config.weddingDate.reception.mapUrl"
              target="_blank"
              class="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Xem trên Google Maps →
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { weddingConfig } from '../config.js'

  const config = weddingConfig

  const formatDateTime = (dateString, timeString) => {
    const date = new Date(dateString)
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    const dateFormatted = date.toLocaleDateString('vi-VN', options)
    return `${dateFormatted} - ${timeString}`
  }
</script>
