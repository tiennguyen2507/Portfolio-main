<template>
  <Modal :isOpen="isOpen" width="2xl" maxHeight="90vh" @close="$emit('close')">
    <template #header>
      <h3 class="text-lg font-semibold text-gray-900">
        {{ isEditing ? 'Chỉnh sửa sản phẩm' : 'Tạo sản phẩm mới' }}
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
      <AdminUiInput
        v-model="form.title"
        label="Tên sản phẩm"
        placeholder="Nhập tên sản phẩm..."
        required
        maxlength="120"
        variant="primary"
        size="md"
      />

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Mô tả sản phẩm</label
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
      <AdminUiInput
        v-model="form.price"
        label="Giá sản phẩm (VND)"
        type="number"
        placeholder="Nhập giá sản phẩm..."
        required
        variant="primary"
        size="md"
      />

      <!-- Sales Price -->
      <AdminUiInput
        v-model="form.sales"
        label="Giá bán (VND)"
        type="number"
        placeholder="Nhập giá bán..."
        required
        variant="primary"
        size="md"
      />

      <!-- Category -->
      <AdminUiSelect
        v-model="form.category"
        label="Danh mục"
        placeholder="Chọn danh mục"
        required
        variant="primary"
        size="md"
        :options="[
          { label: 'Breakfast', value: 'breakfast' },
          { label: 'Lunch', value: 'lunch' },
          { label: 'Dinner', value: 'dinner' },
          { label: 'Snack', value: 'snack' },
        ]"
      />

      <!-- Quantity -->
      <AdminUiInput
        v-model="form.quantity"
        label="Số lượng tồn kho"
        type="number"
        placeholder="Nhập số lượng..."
        required
        variant="primary"
        size="md"
      />

      <!-- Thumbnail Upload -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Hình ảnh sản phẩm</label
        >
        <UploadFile :onChange="handleThumbnailChange" />
        <div v-if="thumbnailFile" class="mt-2">
          <p class="text-sm text-gray-600">
            File đã chọn: {{ thumbnailFile.name }}
          </p>
        </div>
        <div v-else-if="form.thumbnail" class="mt-2">
          <p class="text-sm text-gray-600">
            Hình ảnh hiện tại: {{ form.thumbnail }}
          </p>
        </div>
      </div>
    </div>

    <template #footer>
      <AdminUiButton
        variant="outline"
        size="md"
        :disabled="submitting"
        @click="$emit('close')"
      >
        Hủy
      </AdminUiButton>
      <AdminUiButton
        variant="primary"
        size="md"
        :loading="submitting"
        :disabled="submitting"
        @click="handleSubmit"
      >
        {{ isEditing ? 'Cập nhật' : 'Tạo mới' }}
      </AdminUiButton>
    </template>
  </Modal>
</template>

<script setup>
  import Modal from '~/components/ui/Modal.vue'
  import UploadFile from '~/components/ui/UploadFile.vue'
  import Editor from '~/components/ui/Editor.vue'
  import AdminUiInput from '~/components/admin/ui/AdminUiInput.vue'
  import AdminUiSelect from '~/components/admin/ui/AdminUiSelect.vue'
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
