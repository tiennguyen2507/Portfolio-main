<template>
  <div class="flex justify-center items-center py-12 mb-6">
    <div class="bg-red-50 border border-red-200 rounded-lg p-6">
      <div class="flex items-center">
        <svg
          class="w-6 h-6 text-red-600 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div>
          <h3 class="text-lg font-medium text-red-800">{{ title }}</h3>
          <p class="text-red-600 mt-1">{{ message }}</p>
        </div>
      </div>
      <button
        v-if="showRetry"
        @click="$emit('retry')"
        class="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
      >
        {{ retryText }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Lỗi khi tải dữ liệu'
  },
  message: {
    type: String,
    required: true
  },
  showRetry: {
    type: Boolean,
    default: true
  },
  retryText: {
    type: String,
    default: 'Thử lại'
  }
});

const emit = defineEmits(['retry']);
</script>
