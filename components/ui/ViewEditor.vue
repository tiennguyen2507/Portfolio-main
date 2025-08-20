<template>
  <div
    :class="[
      'view-editor',
      customClass,
      {
        'text-gray-700 leading-relaxed': variant === 'default',
        'text-gray-900': variant === 'dark',
        'text-gray-200': variant === 'light',
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
