<template>
  <div class="sm:mb-10">
    <div
      class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4"
    >
      <div class="flex-1">
        <h1 class="text-xl sm:text-2xl font-bold">
          {{ title }}
        </h1>
        <p class="text-gray-600 text-sm sm:text-base mt-1 ml-15">
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
