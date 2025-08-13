<template>
  <Modal :isOpen="isOpen" width="2xl" maxHeight="90vh" @close="$emit('close')">
    <template #header>
      <h3 class="text-lg font-semibold text-gray-900">
        {{ isEditing ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới' }}
      </h3>
    </template>

    <!-- Error Display -->
    <div
      v-if="error"
      class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md"
    >
      <div class="flex items-center">
        <svg
          class="w-5 h-5 text-red-600 mr-2"
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
        <span class="text-sm text-red-800">{{ error }}</span>
      </div>
    </div>

    <!-- Form Content -->
    <div class="space-y-6">
      <!-- Title -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Tiêu đề bài viết</label
        >
        <input
          v-model="form.title"
          type="text"
          required
          class="w-full px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="Nhập tiêu đề bài viết..."
          maxlength="120"
        />
      </div>

      <!-- Thumbnail Upload -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Thumbnail</label
        >
        <UploadFile :onChange="handleThumbnailChange" />
        <div v-if="thumbnailFile" class="mt-2">
          <p class="text-sm text-gray-600">
            File đã chọn: {{ thumbnailFile.name }}
          </p>
        </div>
      </div>

      <!-- Content Editor -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Nội dung bài viết</label
        >
        <Editor
          v-model="form.description"
          height="300px"
          contentType="html"
          theme="snow"
          :options="editorOptions"
          placeholder="Nhập nội dung bài viết..."
        />
      </div>
    </div>

    <template #footer>
      <button
        @click="$emit('close')"
        :disabled="submitting"
        class="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Hủy
      </button>
      <button
        @click="handleSubmit"
        :disabled="submitting"
        class="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
      >
        <svg
          v-if="submitting"
          class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        {{ submitting ? 'Đang xử lý...' : isEditing ? 'Cập nhật' : 'Tạo mới' }}
      </button>
    </template>
  </Modal>
</template>

<script setup>
  import Modal from '~/components/ui/Modal.vue'
  import Editor from '~/components/ui/Editor.vue'
  import UploadFile from '~/components/ui/UploadFile.vue'
  import { ref } from 'vue'

  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true,
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
    form: {
      type: Object,
      required: true,
    },
    submitting: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: '',
    },
    editorOptions: {
      type: Object,
      default: () => ({}),
    },
  })

  const emit = defineEmits(['close', 'submit', 'thumbnailChange'])

  const thumbnailFile = ref(null)

  const handleThumbnailChange = file => {
    thumbnailFile.value = file
    emit('thumbnailChange', file)
  }

  const handleSubmit = () => {
    // Validation
    if (!props.form.title?.trim()) {
      emit('submit', { success: false, error: 'Tiêu đề không được để trống' })
      return
    }
    if (!props.form.description?.trim()) {
      emit('submit', { success: false, error: 'Nội dung không được để trống' })
      return
    }

    emit('submit', {
      success: true,
      data: props.form,
      thumbnailFile: thumbnailFile.value,
    })
  }
</script>

<style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Ensure Quill editor is visible */
  .quill-editor {
    display: block !important;
    visibility: visible !important;
  }
</style>
