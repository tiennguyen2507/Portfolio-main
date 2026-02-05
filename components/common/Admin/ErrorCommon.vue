<template>
  <div class="flex justify-center items-center py-12 mb-6">
    <div
      class="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-lg p-6"
    >
      <div class="flex items-center">
        <svg
          class="w-6 h-6 text-red-600 dark:text-red-400 mr-3"
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
          <Typography as="h3" size="md" weight="semibold" color="error">
            {{ title }}
          </Typography>
          <Typography as="p" size="sm" color="error" class="mt-1">
            {{ message }}
          </Typography>
        </div>
      </div>
      <button
        v-if="showRetry"
        @click="$emit('retry')"
        class="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors dark:bg-red-500 dark:hover:bg-red-600"
      >
        {{ retryText }}
      </button>
    </div>
  </div>
</template>

<script setup>
  import Typography from '~/components/ui/Typography.vue'

  defineProps({
    title: {
      type: String,
      default: 'Lỗi khi tải dữ liệu',
    },
    message: {
      type: String,
      required: true,
    },
    showRetry: {
      type: Boolean,
      default: true,
    },
    retryText: {
      type: String,
      default: 'Thử lại',
    },
  })

  defineEmits(['retry'])
</script>


