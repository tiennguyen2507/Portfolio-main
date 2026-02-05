<template>
  <Modal :isOpen="isOpen" width="2xl" maxHeight="90vh" @close="$emit('close')">
    <template #header>
      <Typography as="h3" size="lg" weight="semibold" color="default">
        {{ isEditing ? 'Chỉnh sửa sản phẩm' : 'Tạo sản phẩm mới' }}
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
        label="Tên sản phẩm"
        placeholder="Nhập tên sản phẩm..."
        required
        maxlength="120"
        variant="default"
        size="md"
      />

      <!-- Description -->
      <div>
        <Typography as="label" size="sm" weight="medium" color="default" class="block mb-2"
          >Mô tả sản phẩm</Typography
        >
        <Editor
          v-model="form.description"
          height="200px"
          contentType="html"
          theme="snow"
          :options="editorOptions"
          placeholder="Nhập mô tả sản phẩm..."
        />
      </div>

      <!-- Price -->
      <Input
        v-model="form.price"
        label="Giá sản phẩm (VND)"
        type="number"
        placeholder="Nhập giá sản phẩm..."
        required
        variant="default"
        size="md"
      />

      <!-- Sales Price -->
      <Input
        v-model="form.sales"
        label="Giá bán (VND)"
        type="number"
        placeholder="Nhập giá bán..."
        required
        variant="default"
        size="md"
      />

      <!-- Category -->
      <Select
        v-model="form.category"
        label="Danh mục"
        placeholder="Chọn danh mục"
        required
        :options="[
          { label: 'Breakfast', value: 'breakfast' },
          { label: 'Lunch', value: 'lunch' },
          { label: 'Dinner', value: 'dinner' },
          { label: 'Snack', value: 'snack' },
        ]"
      />

      <!-- Quantity -->
      <Input
        v-model="form.quantity"
        label="Số lượng tồn kho"
        type="number"
        placeholder="Nhập số lượng..."
        required
        variant="default"
        size="md"
      />

      <!-- Thumbnail Upload -->
      <div>
        <Typography as="label" size="sm" weight="medium" color="default" class="block mb-2"
          >Hình ảnh sản phẩm</Typography
        >
        <UploadFile :onChange="handleThumbnailChange" />
        <div v-if="thumbnailFile" class="mt-2">
          <Typography as="p" size="sm" color="muted">
            File đã chọn: {{ thumbnailFile.name }}
          </Typography>
        </div>
        <div v-else-if="form.thumbnail" class="mt-2">
          <Typography as="p" size="sm" color="muted">
            Hình ảnh hiện tại: {{ form.thumbnail }}
          </Typography>
        </div>
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
  import UploadFile from '~/components/ui/UploadFile.vue'
  import Editor from '~/components/ui/Editor.vue'
  import Input from '~/components/ui/Input/Input.vue'
  import Select from '~/components/ui/Select.vue'
  import Button from '~/components/ui/Button.vue'
  import Typography from '~/components/ui/Typography.vue'
  import { ref } from 'vue'

  // Editor options
  const editorOptions = {
    placeholder: 'Nhập mô tả sản phẩm...',
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        ['link', 'image'],
        ['clean'],
      ],
    },
  }

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
      emit('submit', {
        success: false,
        error: 'Tên sản phẩm không được để trống',
      })
      return
    }
    if (
      !props.form.description?.trim() ||
      props.form.description === '<p><br></p>'
    ) {
      emit('submit', { success: false, error: 'Mô tả không được để trống' })
      return
    }
    if (!props.form.price || props.form.price <= 0) {
      emit('submit', { success: false, error: 'Giá sản phẩm phải lớn hơn 0' })
      return
    }
    if (!props.form.sales || props.form.sales <= 0) {
      emit('submit', { success: false, error: 'Giá bán phải lớn hơn 0' })
      return
    }
    if (!props.form.category) {
      emit('submit', { success: false, error: 'Vui lòng chọn danh mục' })
      return
    }
    if (!props.form.quantity || props.form.quantity < 0) {
      emit('submit', { success: false, error: 'Số lượng không được âm' })
      return
    }

    emit('submit', {
      success: true,
      data: props.form,
      thumbnailFile: thumbnailFile.value,
    })
  }
</script>
