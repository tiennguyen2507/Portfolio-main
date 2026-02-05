<template>
  <Modal :isOpen="isOpen" @close="$emit('close')">
    <div class="p-6">
      <Typography as="h2" size="2xl" weight="bold" color="default" class="mb-6">
        {{ isEditing ? 'Chỉnh sửa Dự án' : 'Thêm Dự án Mới' }}
      </Typography>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Title -->
        <div>
          <Typography
            as="label"
            for="title"
            size="sm"
            weight="medium"
            color="default"
            class="block mb-2"
          >
            Tiêu đề dự án *
          </Typography>
          <Input
            id="title"
            v-model="localForm.title"
            type="text"
            placeholder="Nhập tiêu đề dự án..."
            required
            class="w-full"
          />
        </div>

        <!-- Description -->
        <div>
          <Typography
            as="label"
            for="description"
            size="sm"
            weight="medium"
            color="default"
            class="block mb-2"
          >
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
            <!-- Skills Input -->
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
                @click="addSkill"
                :disabled="!newSkill.trim()"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                Thêm
              </Button>
            </div>

            <!-- Skills List -->
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
                    ></path>
                  </svg>
                </button>
              </span>
            </div>

            <!-- Common Skills Suggestions -->
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
                  class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline text-xs"
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
        <div>
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

        <!-- Error Message -->
        <div
          v-if="error"
          class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4"
        >
          <Typography as="p" size="sm" color="error">{{ error }}</Typography>
        </div>

        <!-- Form Actions -->
        <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-800">
          <Button
            type="button"
            @click="$emit('close')"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Hủy
          </Button>
          <Button
            type="submit"
            :disabled="
              submitting ||
              !localForm.title.trim() ||
              !localForm.description.trim()
            "
            class="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 disabled:opacity-50"
          >
            <span v-if="submitting" class="flex items-center">
              <svg
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
              Đang lưu...
            </span>
            <span v-else>{{ isEditing ? 'Cập nhật' : 'Tạo dự án' }}</span>
          </Button>
        </div>
      </form>
    </div>
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
