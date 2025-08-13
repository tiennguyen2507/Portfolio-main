<template>
  <div class="mb-8">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">{{ title }}</h1>
        <p class="text-gray-600 mt-2">{{ subtitle }}</p>
      </div>
      <div class="flex items-center">
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
