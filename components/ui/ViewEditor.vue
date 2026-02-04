<template>
  <div
    :class="[
      'view-editor leading-relaxed',
      customClass,
      {
        // Default: nội dung bài viết thông thường
        'text-gray-700 dark:text-gray-200': variant === 'default',
        // Đậm hơn, dùng cho section cần nhấn mạnh
        'text-gray-900 dark:text-gray-100': variant === 'dark',
        // Nhạt hơn, dùng cho mô tả phụ / meta
        'text-gray-500 dark:text-gray-400': variant === 'light',
      },
    ]"
    :itemprop="itemprop"
    v-html="processedContent"
  ></div>
</template>

<script setup>
  // Props
  const props = defineProps({
    content: {
      type: String,
      required: true,
      default: '',
    },
    variant: {
      type: String,
      default: 'default',
      validator: value => ['default', 'dark', 'light'].includes(value),
    },
    customClass: {
      type: String,
      default: '',
    },
    itemprop: {
      type: String,
      default: '',
    },
    truncate: {
      type: Boolean,
      default: false,
    },
    maxLength: {
      type: Number,
      default: 150,
    },
    stripHtml: {
      type: Boolean,
      default: false,
    },
  })

  // Computed
  const processedContent = computed(() => {
    let content = props.content

    // Strip HTML if requested
    if (props.stripHtml) {
      content = content
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim()
    }

    // Truncate if requested
    if (props.truncate && content.length > props.maxLength) {
      content = content.substring(0, props.maxLength) + '...'
    }

    return content
  })
</script>
