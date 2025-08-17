<template>
  <div
    :class="[
      'prose prose-lg max-w-none',
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

<style scoped>
  /* Custom prose styles for better typography */
  :deep(.prose) {
    line-height: 1.75;
  }

  :deep(.prose h1) {
    font-size: 2.25rem;
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: inherit;
  }

  :deep(.prose h2) {
    font-size: 1.875rem;
    font-weight: 600;
    margin-top: 1.75rem;
    margin-bottom: 0.75rem;
    color: inherit;
  }

  :deep(.prose h3) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    color: inherit;
  }

  :deep(.prose h4) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
    color: inherit;
  }

  :deep(.prose p) {
    margin-top: 1rem;
    margin-bottom: 1rem;
    line-height: 1.75;
  }

  :deep(.prose ul) {
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }

  :deep(.prose ol) {
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }

  :deep(.prose li) {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }

  :deep(.prose blockquote) {
    border-left: 4px solid #f97316;
    padding-left: 1rem;
    margin: 1.5rem 0;
    font-style: italic;
    background-color: #fef7f0;
    padding: 1rem;
    border-radius: 0.375rem;
  }

  :deep(.prose code) {
    background-color: #f3f4f6;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  }

  :deep(.prose pre) {
    background-color: #1f2937;
    color: #f9fafb;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  :deep(.prose pre code) {
    background-color: transparent;
    padding: 0;
    color: inherit;
  }

  :deep(.prose a) {
    color: #f97316;
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 2px;
  }

  :deep(.prose a:hover) {
    color: #ea580c;
  }

  :deep(.prose img) {
    border-radius: 0.5rem;
    margin: 1.5rem auto;
    max-width: 100%;
    height: auto;
  }

  :deep(.prose table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
  }

  :deep(.prose th) {
    background-color: #f9fafb;
    padding: 0.75rem;
    text-align: left;
    font-weight: 600;
    border: 1px solid #e5e7eb;
  }

  :deep(.prose td) {
    padding: 0.75rem;
    border: 1px solid #e5e7eb;
  }

  :deep(.prose hr) {
    border: none;
    border-top: 1px solid #e5e7eb;
    margin: 2rem 0;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    :deep(.prose h1) {
      font-size: 1.875rem;
    }

    :deep(.prose h2) {
      font-size: 1.5rem;
    }

    :deep(.prose h3) {
      font-size: 1.25rem;
    }

    :deep(.prose h4) {
      font-size: 1.125rem;
    }
  }
</style>
