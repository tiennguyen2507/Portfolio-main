<template>
  <Modal :isOpen="isOpen" width="2xl" max-height="90vh" @close="$emit('close')">
    <template #header>
      <Typography as="h3" size="lg" weight="semibold" color="default">
        {{ isEditing ? 'Chỉnh sửa Dự án' : 'Thêm Dự án Mới' }}
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
          />
        </svg>
        <Typography as="span" size="sm" color="error">{{ error }}</Typography>
      </div>
    </div>

    <!-- Form Content -->
    <div class="space-y-6">
      <!-- Title -->
      <Input
        v-model="localForm.title"
        label="Tiêu đề dự án"
        type="text"
        placeholder="Nhập tiêu đề dự án..."
        required
      />

      <!-- Description -->
      <div>
        <Typography as="label" size="sm" weight="medium" color="default" class="block mb-2">
          Mô tả dự án *
        </Typography>
        <Editor
          v-model="localForm.description"
          :options="editorOptions"
          class="min-h-[200px]"
        />
      </div>

      <!-- Skills -->
      <div>
        <Typography as="label" size="sm" weight="medium" color="default" class="block mb-2">
          Công nghệ sử dụng
        </Typography>
        <div class="space-y-3">
          <div class="flex gap-2">
            <Input
              v-model="newSkill"
              type="text"
              placeholder="Nhập công nghệ (VD: React, Node.js)..."
              class="flex-1"
              @keyup.enter="addSkill"
            />
            <Button
              type="button"
              variant="primary"
              size="sm"
              :disabled="!newSkill.trim()"
              @click="addSkill"
            >
              Thêm
            </Button>
          </div>
          <div v-if="localForm.skill.length > 0" class="flex flex-wrap gap-2">
            <span
              v-for="(skill, index) in localForm.skill"
              :key="index"
              class="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
            >
              {{ skill }}
              <button
                type="button"
                @click="removeSkill(index)"
                class="text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-200"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </span>
          </div>
          <div>
            <Typography as="p" size="sm" color="muted" class="mb-2">
              Gợi ý công nghệ phổ biến:
            </Typography>
            <div class="flex flex-wrap gap-1">
              <button
                v-for="suggestion in commonSkills"
                :key="suggestion"
                type="button"
                @click="addSkillFromSuggestion(suggestion)"
                class="text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 underline text-xs"
              >
                {{ suggestion }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Thumbnail -->
      <div>
        <Typography as="label" size="sm" weight="medium" color="default" class="block mb-2">
          Hình ảnh dự án
        </Typography>
        <UploadFile
          :value="localForm.thumbnail"
          @change="handleThumbnailChange"
          accept="image/*"
          class="w-full"
        />
      </div>

      <!-- Status -->
      <label class="flex items-center">
        <input
          v-model="localForm.status"
          type="checkbox"
          class="rounded border-gray-300 dark:border-gray-700 text-orange-600 dark:text-orange-400 shadow-sm focus:border-orange-300 dark:focus:border-orange-500 focus:ring focus:ring-orange-200 dark:focus:ring-orange-800 focus:ring-opacity-50"
        />
        <Typography as="span" size="sm" color="default" class="ml-2">
          Dự án hoàn thành
        </Typography>
      </label>
    </div>

    <template #footer>
      <Button variant="outline" size="xs" :disabled="submitting" @click="$emit('close')">
        Hủy
      </Button>
      <Button
        variant="primary"
        size="xs"
        :loading="submitting"
        :disabled="submitting || !localForm.title.trim() || !localForm.description.trim()"
        @click="handleSubmit"
      >
        {{ isEditing ? 'Cập nhật' : 'Tạo mới' }}
      </Button>
    </template>
  </Modal>
</template>

<script setup>
  import { ref, watch, computed } from 'vue'
  import Modal from '~/components/ui/Modal.vue'
  import Input from '~/components/ui/Input/Input.vue'
  import Button from '~/components/ui/Button.vue'
  import Editor from '~/components/ui/Editor.vue'
  import UploadFile from '~/components/ui/UploadFile.vue'
  import Typography from '~/components/ui/Typography.vue'

  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false,
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
    form: {
      type: Object,
      default: () => ({
        title: '',
        description: '',
        thumbnail: '',
        skill: [],
        status: true,
      }),
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

  // Local form data
  const localForm = ref({
    title: '',
    description: '',
    thumbnail: '',
    skill: [],
    status: true,
  })

  // New skill input
  const newSkill = ref('')

  // Common skills suggestions
  const commonSkills = [
    'React',
    'Vue.js',
    'Angular',
    'Node.js',
    'Express.js',
    'Next.js',
    'Nuxt.js',
    'TypeScript',
    'JavaScript',
    'HTML',
    'CSS',
    'Tailwind CSS',
    'Bootstrap',
    'MongoDB',
    'PostgreSQL',
    'MySQL',
    'Firebase',
    'AWS',
    'Docker',
    'Git',
    'REST API',
    'GraphQL',
    'Redux',
    'Vuex',
    'Pinia',
  ]

  // Watch for form changes
  watch(
    () => props.form,
    newForm => {
      localForm.value = {
        title: newForm.title || '',
        description: newForm.description || '',
        thumbnail: newForm.thumbnail || '',
        skill: [...(newForm.skill || [])],
        status: newForm.status !== undefined ? newForm.status : true,
      }
    },
    { immediate: true, deep: true }
  )

  // Add skill
  const addSkill = () => {
    const skill = newSkill.value.trim()
    if (skill && !localForm.value.skill.includes(skill)) {
      localForm.value.skill.push(skill)
      newSkill.value = ''
    }
  }

  // Add skill from suggestion
  const addSkillFromSuggestion = skill => {
    if (!localForm.value.skill.includes(skill)) {
      localForm.value.skill.push(skill)
    }
  }

  // Remove skill
  const removeSkill = index => {
    localForm.value.skill.splice(index, 1)
  }

  // Handle thumbnail change
  const handleThumbnailChange = file => {
    emit('thumbnailChange', file)
  }

  // Handle form submit
  const handleSubmit = () => {
    if (!localForm.value.title.trim() || !localForm.value.description.trim()) {
      return
    }

    emit('submit', {
      title: localForm.value.title.trim(),
      description: localForm.value.description.trim(),
      thumbnail: localForm.value.thumbnail,
      skill: localForm.value.skill,
      status: localForm.value.status,
    })
  }
</script>
