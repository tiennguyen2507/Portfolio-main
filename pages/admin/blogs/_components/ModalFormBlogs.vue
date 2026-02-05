<template>
  <Modal :isOpen="isOpen" width="2xl" maxHeight="90vh" @close="$emit('close')">
    <template #header>
      <Typography as="h3" size="lg" weight="semibold" color="default">
        {{ isEditing ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới' }}
      </Typography>
    </template>

    <!-- Error Display -->
    <div
      v-if="error"
      class="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md"
    >
      <div class="flex items-center">
        <svg
          class="w-5 h-5 text-red-600 dark:text-red-400 mr-2"
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
        <Typography as="span" size="sm" color="error">{{ error }}</Typography>
      </div>
    </div>

    <!-- Form Content -->
    <div class="space-y-6">
      <!-- Title -->
      <Input
        v-model="form.title"
        label="Tiêu đề bài viết"
        type="text"
        placeholder="Nhập tiêu đề bài viết..."
        required
        :maxlength="120"
      />

      <!-- Category -->
      <div>
        <Select
          v-model="form.category"
          label="Danh mục"
          :options="categoryOptions"
          placeholder="Chọn danh mục"
        />
      </div>

      <!-- Thumbnail Upload -->
      <div>
        <Typography as="label" size="sm" weight="medium" color="default" class="block mb-2"
          >Thumbnail</Typography
        >
        <UploadFile :value="form.thumbnail" :onChange="handleThumbnailChange" />
        <div v-if="thumbnailFile" class="mt-2">
          <Typography as="p" size="sm" color="muted">
            File đã chọn: {{ thumbnailFile.name }}
          </Typography>
        </div>
      </div>

      <!-- Content Editor -->
      <div>
        <Typography as="label" size="sm" weight="medium" color="default" class="block mb-2"
          >Nội dung bài viết</Typography
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
      <Button variant="outline" size="md" :disabled="submitting" @click="$emit('close')">
        Hủy
      </Button>
      <Button
        variant="primary"
        size="md"
        :loading="submitting"
        :disabled="submitting"
        @click="handleSubmit"
      >
        {{ isEditing ? 'Cập nhật' : 'Tạo mới' }}
      </Button>
    </template>
  </Modal>
</template>

<script setup>
  import Modal from '~/components/ui/Modal.vue'
  import Editor from '~/components/ui/Editor.vue'
  import UploadFile from '~/components/ui/UploadFile.vue'
  import Select from '~/components/ui/Select.vue'
  import Button from '~/components/ui/Button.vue'
  import Typography from '~/components/ui/Typography.vue'
  import Input from '~/components/ui/Input/Input.vue'
  import { ref } from 'vue'

  // Category options
  const categoryOptions = [
    { label: 'Blog AI', value: 'ai-blog' },
    { label: 'My Blog', value: 'my-blog' },
  ]

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
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Ensure Quill editor is visible */
  .quill-editor {
    display: block !important;
    visibility: visible !important;
  }
</style>
