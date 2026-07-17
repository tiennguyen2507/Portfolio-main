<template>
  <ClientOnly>
    <Suspense>
      <template #default>
        <QuillEditorAsync
          v-model:content="content"
          :contentType="contentType"
          :theme="mergedOptions.theme"
          :options="mergedOptions"
          :placeholder="mergedOptions.placeholder"
          class="quill-editor"
          :style="{ minHeight: height }"
          @update:content="onUpdate"
        />
      </template>
      <template #fallback>
        <div class="p-4 text-gray-500 text-center">Đang tải editor...</div>
      </template>
    </Suspense>
  </ClientOnly>
</template>

<script setup>
  import { ref, watch, onMounted, defineAsyncComponent, computed } from 'vue'
  const props = defineProps({
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: 'Nhập nội dung...' },
    height: { type: String, default: '200px' },
    contentType: { type: String, default: 'html' },
    theme: { type: String, default: 'snow' },
    options: { type: Object, default: () => ({}) },
  })
  const emit = defineEmits(['update:modelValue'])

  const content = ref(props.modelValue)

  // Default editor options with common configuration
  const defaultOptions = {
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        [{ indent: '-1' }, { indent: '+1' }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean'],
      ],
      clipboard: {
        matchVisual: false,
      },
    },
    placeholder: props.placeholder,
    theme: props.theme,
    readOnly: false,
    scrollingContainer: null,
    bounds: null,
    debug: false,
    formats: [
      'header',
      'font',
      'size',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'link',
      'image',
      'video',
      'color',
      'background',
      'align',
      'direction',
      'code-block',
      'script',
    ],
  }

  // Merge default options with custom options
  const mergedOptions = computed(() => {
    return {
      ...defaultOptions,
      ...props.options,
      modules: {
        ...defaultOptions.modules,
        ...props.options.modules,
        toolbar:
          props.options.modules?.toolbar || defaultOptions.modules.toolbar,
      },
      placeholder: props.options.placeholder || props.placeholder,
    }
  })

  const QuillEditorAsync = defineAsyncComponent(async () => {
    if (process.client) {
      try {
        const { QuillEditor } = await import('@vueup/vue-quill')
        await import('@vueup/vue-quill/dist/vue-quill.snow.css')
        return QuillEditor
      } catch (e) {
        console.error('Không thể load QuillEditor:', e)
        return {
          template: '<div class="text-red-500">Không thể tải editor</div>',
        }
      }
    }
    return {
      template: '<div class="text-gray-500">Chỉ hỗ trợ trên client</div>',
    }
  })

  watch(
    () => props.modelValue,
    val => {
      if (val !== content.value) content.value = val
    }
  )

  function onUpdate(val) {
    emit('update:modelValue', val)
  }
</script>

<style scoped>
/* Quill Editor Dark Mode Styles */
:deep(.quill-editor) {
  display: block;
}

/* Quill Container - Dark Mode */
:deep(.ql-container) {
  background-color: #ffffff;
  border-color: rgb(209, 213, 219); /* gray-300 */
}

.dark :deep(.ql-container) {
  background-color: #050505;
  border-color: rgb(55, 65, 81); /* gray-700 */
}

:deep(.ql-container.ql-snow) {
  border-color: rgb(209, 213, 219); /* gray-300 */
}

.dark :deep(.ql-container.ql-snow) {
  border-color: rgb(55, 65, 81); /* gray-700 */
}

/* Quill Editor Content Area - Dark Mode */
:deep(.ql-editor) {
  color: rgb(17, 24, 39); /* gray-900 */
  background-color: #ffffff;
  min-height: 200px;
}

.dark :deep(.ql-editor) {
  color: rgb(243, 244, 246); /* gray-100 */
  background-color: #050505;
}

/* Placeholder styles */
:deep(.ql-editor.ql-blank::before) {
  color: rgb(156, 163, 175) !important; /* gray-400 */
  font-style: normal;
  opacity: 1;
}

.dark :deep(.ql-editor.ql-blank::before) {
  color: rgb(209, 213, 219) !important; /* gray-300 - sáng hơn để dễ nhìn trên nền tối */
  opacity: 1;
}

/* Đảm bảo placeholder không bị override bởi các style khác */
:deep(.ql-editor.ql-blank) {
  color: inherit;
}

.dark :deep(.ql-editor.ql-blank) {
  color: inherit;
}

/* Quill Toolbar - Dark Mode */
:deep(.ql-toolbar) {
  background-color: rgb(249, 250, 251); /* gray-50 */
  border-color: rgb(209, 213, 219); /* gray-300 */
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
}

.dark :deep(.ql-toolbar) {
  background-color: rgb(17, 24, 39); /* gray-900 */
  border-color: rgb(55, 65, 81); /* gray-700 */
}

:deep(.ql-toolbar.ql-snow) {
  border-color: rgb(209, 213, 219); /* gray-300 */
}

.dark :deep(.ql-toolbar.ql-snow) {
  border-color: rgb(55, 65, 81); /* gray-700 */
}

/* Toolbar Buttons - Dark Mode */
:deep(.ql-toolbar .ql-stroke) {
  stroke: rgb(55, 65, 81); /* gray-700 */
}

.dark :deep(.ql-toolbar .ql-stroke) {
  stroke: rgb(209, 213, 219); /* gray-300 */
}

:deep(.ql-toolbar .ql-fill) {
  fill: rgb(55, 65, 81); /* gray-700 */
}

.dark :deep(.ql-toolbar .ql-fill) {
  fill: rgb(209, 213, 219); /* gray-300 */
}

:deep(.ql-toolbar button:hover),
:deep(.ql-toolbar button:focus),
:deep(.ql-toolbar button.ql-active) {
  background-color: rgb(243, 244, 246); /* gray-100 */
}

.dark :deep(.ql-toolbar button:hover),
.dark :deep(.ql-toolbar button:focus),
.dark :deep(.ql-toolbar button.ql-active) {
  background-color: rgb(31, 41, 55); /* gray-800 */
}

:deep(.ql-toolbar button:hover .ql-stroke),
:deep(.ql-toolbar button:focus .ql-stroke),
:deep(.ql-toolbar button.ql-active .ql-stroke) {
  stroke: rgb(17, 24, 39); /* gray-900 */
}

.dark :deep(.ql-toolbar button:hover .ql-stroke),
.dark :deep(.ql-toolbar button:focus .ql-stroke),
.dark :deep(.ql-toolbar button.ql-active .ql-stroke) {
  stroke: rgb(243, 244, 246); /* gray-100 */
}

:deep(.ql-toolbar button:hover .ql-fill),
:deep(.ql-toolbar button:focus .ql-fill),
:deep(.ql-toolbar button.ql-active .ql-fill) {
  fill: rgb(17, 24, 39); /* gray-900 */
}

.dark :deep(.ql-toolbar button:hover .ql-fill),
.dark :deep(.ql-toolbar button:focus .ql-fill),
.dark :deep(.ql-toolbar button.ql-active .ql-fill) {
  fill: rgb(243, 244, 246); /* gray-100 */
}

/* Toolbar Dropdowns - Dark Mode */
:deep(.ql-toolbar .ql-picker) {
  color: rgb(55, 65, 81); /* gray-700 */
}

.dark :deep(.ql-toolbar .ql-picker) {
  color: rgb(209, 213, 219); /* gray-300 */
}

:deep(.ql-toolbar .ql-picker-label) {
  color: rgb(55, 65, 81); /* gray-700 */
}

.dark :deep(.ql-toolbar .ql-picker-label) {
  color: rgb(209, 213, 219); /* gray-300 */
}

:deep(.ql-toolbar .ql-picker-label:hover),
:deep(.ql-toolbar .ql-picker-label:focus) {
  color: rgb(17, 24, 39); /* gray-900 */
}

.dark :deep(.ql-toolbar .ql-picker-label:hover),
.dark :deep(.ql-toolbar .ql-picker-label:focus) {
  color: rgb(243, 244, 246); /* gray-100 */
}

:deep(.ql-toolbar .ql-picker-options) {
  background-color: #ffffff;
  border-color: rgb(209, 213, 219); /* gray-300 */
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.dark :deep(.ql-toolbar .ql-picker-options) {
  background-color: rgb(31, 41, 55); /* gray-800 */
  border-color: rgb(55, 65, 81); /* gray-700 */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
}

:deep(.ql-toolbar .ql-picker-item) {
  color: rgb(55, 65, 81); /* gray-700 */
}

.dark :deep(.ql-toolbar .ql-picker-item) {
  color: rgb(209, 213, 219); /* gray-300 */
}

:deep(.ql-toolbar .ql-picker-item:hover),
:deep(.ql-toolbar .ql-picker-item.ql-selected) {
  background-color: rgb(243, 244, 246); /* gray-100 */
  color: rgb(17, 24, 39); /* gray-900 */
}

.dark :deep(.ql-toolbar .ql-picker-item:hover),
.dark :deep(.ql-toolbar .ql-picker-item.ql-selected) {
  background-color: rgb(55, 65, 81); /* gray-700 */
  color: rgb(243, 244, 246); /* gray-100 */
}

/* Color Picker - Dark Mode */
:deep(.ql-toolbar .ql-color-picker .ql-picker-label),
:deep(.ql-toolbar .ql-background .ql-picker-label) {
  color: rgb(55, 65, 81); /* gray-700 */
}

.dark :deep(.ql-toolbar .ql-color-picker .ql-picker-label),
.dark :deep(.ql-toolbar .ql-background .ql-picker-label) {
  color: rgb(209, 213, 219); /* gray-300 */
}

/* Link Input - Dark Mode */
:deep(.ql-toolbar .ql-formats input[type='text']) {
  background-color: #ffffff;
  color: rgb(17, 24, 39); /* gray-900 */
  border-color: rgb(209, 213, 219); /* gray-300 */
}

.dark :deep(.ql-toolbar .ql-formats input[type='text']) {
  background-color: rgb(31, 41, 55); /* gray-800 */
  color: rgb(243, 244, 246); /* gray-100 */
  border-color: rgb(75, 85, 99); /* gray-600 */
}

:deep(.ql-toolbar .ql-formats input[type='text']:focus) {
  border-color: rgb(249, 115, 22); /* orange-500 */
  outline: 2px solid rgb(249, 115, 22);
  outline-offset: 2px;
}

.dark :deep(.ql-toolbar .ql-formats input[type='text']:focus) {
  border-color: rgb(251, 146, 60); /* orange-400 */
  outline-color: rgb(251, 146, 60);
}

/* Image Upload Tooltip - Dark Mode */
:deep(.ql-toolbar .ql-image) {
  color: rgb(55, 65, 81); /* gray-700 */
}

.dark :deep(.ql-toolbar .ql-image) {
  color: rgb(209, 213, 219); /* gray-300 */
}

/* Video Tooltip - Dark Mode */
:deep(.ql-toolbar .ql-video) {
  color: rgb(55, 65, 81); /* gray-700 */
}

.dark :deep(.ql-toolbar .ql-video) {
  color: rgb(209, 213, 219); /* gray-300 */
}

/* Snow Theme Border Radius */
:deep(.ql-container.ql-snow) {
  border-bottom-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}

/* Selection Color - Dark Mode */
:deep(.ql-editor ::selection) {
  background-color: rgb(254, 243, 199); /* orange-200 */
}

.dark :deep(.ql-editor ::selection) {
  background-color: rgba(154, 52, 18, 0.5); /* orange-900/50 */
}

/* Focus State - Dark Mode */
:deep(.ql-container:focus-within) {
  border-color: rgb(249, 115, 22); /* orange-500 */
  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.5);
}

.dark :deep(.ql-container:focus-within) {
  border-color: rgb(251, 146, 60); /* orange-400 */
  box-shadow: 0 0 0 2px rgba(251, 146, 60, 0.5);
}
</style>
