<template>
  <div class="mb-8 sm:mb-10">
    <div
      class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4"
    >
      <div class="flex-1">
        <div class="flex items-center gap-3 mb-2">
          <div
            class="h-1 w-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
          ></div>
          <h1
            class="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent"
          >
            {{ title }}
          </h1>
        </div>
        <p class="text-gray-600 text-base sm:text-lg mt-1 ml-15">
          {{ subtitle }}
        </p>
      </div>
      <div class="flex items-center justify-end sm:justify-start">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
  })
</script>
