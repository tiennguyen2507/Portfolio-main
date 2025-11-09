<template>
  <section class="py-20 md:py-32 bg-gray-900">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Title -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-light text-white mb-4">
          Lịch Trình
        </h2>
        <div class="flex items-center justify-center gap-4">
          <div class="h-px w-16 bg-gray-700"></div>
          <span class="text-2xl">📅</span>
          <div class="h-px w-16 bg-gray-700"></div>
        </div>
      </div>

      <!-- Timeline -->
      <div class="max-w-3xl mx-auto space-y-12">
        <!-- Ceremony -->
        <div
          class="flex flex-col md:flex-row gap-6 items-center md:items-start"
        >
          <div class="flex-shrink-0 w-full md:w-1/2 text-center md:text-right">
            <div
              class="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-6 shadow-lg"
            >
              <div class="text-2xl mb-2">💒</div>
              <h3 class="text-2xl font-light mb-2">
                {{ config.weddingDate.ceremony.name }}
              </h3>
              <p class="text-lg opacity-90 mb-4">
                {{
                  formatDateTime(
                    config.weddingDate.ceremony.date,
                    config.weddingDate.ceremony.time
                  )
                }}
              </p>
              <p class="text-sm opacity-80 mb-2">
                {{ config.weddingDate.ceremony.location }}
              </p>
              <p class="text-xs opacity-70">
                {{ config.weddingDate.ceremony.address }}
              </p>
              <a
                :href="config.weddingDate.ceremony.mapUrl"
                target="_blank"
                class="inline-block mt-4 text-sm underline opacity-90 hover:opacity-100"
              >
                Xem bản đồ →
              </a>
            </div>
          </div>

          <!-- Timeline connector (hidden on mobile) -->
          <div
            class="hidden md:flex flex-col items-center justify-center flex-shrink-0 w-12"
          >
            <div
              class="w-1 h-24 bg-gradient-to-b from-orange-500 to-orange-600"
            ></div>
            <div
              class="w-4 h-4 rounded-full bg-orange-500 border-4 border-gray-900 shadow-lg"
            ></div>
            <div
              class="w-1 h-24 bg-gradient-to-b from-orange-500 to-orange-600"
            ></div>
          </div>

          <!-- Empty space for alignment -->
          <div class="hidden md:block w-1/2"></div>
        </div>

        <!-- Reception -->
        <div
          class="flex flex-col md:flex-row gap-6 items-center md:items-start"
        >
          <!-- Empty space for alignment -->
          <div class="hidden md:block w-1/2"></div>

          <!-- Timeline connector (hidden on mobile) -->
          <div
            class="hidden md:flex flex-col items-center justify-center flex-shrink-0 w-12"
          >
            <div
              class="w-1 h-24 bg-gradient-to-b from-orange-500 to-orange-600"
            ></div>
            <div
              class="w-4 h-4 rounded-full bg-orange-500 border-4 border-gray-900 shadow-lg"
            ></div>
            <div
              class="w-1 h-24 bg-gradient-to-b from-orange-500 to-orange-600"
            ></div>
          </div>

          <div class="flex-shrink-0 w-full md:w-1/2 text-center md:text-left">
            <div
              class="bg-gradient-to-br from-orange-600 to-orange-500 text-white rounded-lg p-6 shadow-lg"
            >
              <div class="text-2xl mb-2">🍾</div>
              <h3 class="text-2xl font-light mb-2">
                {{ config.weddingDate.reception.name }}
              </h3>
              <p class="text-lg opacity-90 mb-4">
                {{
                  formatDateTime(
                    config.weddingDate.reception.date,
                    config.weddingDate.reception.time
                  )
                }}
              </p>
              <p class="text-sm opacity-80 mb-2">
                {{ config.weddingDate.reception.location }}
              </p>
              <p class="text-xs opacity-70">
                {{ config.weddingDate.reception.address }}
              </p>
              <a
                :href="config.weddingDate.reception.mapUrl"
                target="_blank"
                class="inline-block mt-4 text-sm underline opacity-90 hover:opacity-100"
              >
                Xem bản đồ →
              </a>
            </div>
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
