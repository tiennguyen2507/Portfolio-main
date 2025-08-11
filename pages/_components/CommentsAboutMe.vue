<template>
  <section class="py-12 sm:py-16 md:py-20 bg-gray-800/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-center mb-8 gap-2">
        <h2 class="text-3xl md:text-4xl font-bold text-white text-center mb-0">
          Nhận xét về tôi
        </h2>
        <button
          @click="showForm = !showForm"
          class="ml-2 flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow transition focus:outline-none focus:ring-2 focus:ring-orange-400"
          :aria-label="showForm ? 'Đóng form' : 'Thêm nhận xét'"
        >
          <svg
            v-if="!showForm"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Add Comment Form -->
      <form
        v-if="showForm"
        @submit.prevent="handleSubmit"
        class="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-start gap-3 mb-8 bg-gray-900/80 p-4 rounded-xl border border-gray-700 shadow"
      >
        <!-- Avatar selector with error -->
        <div class="flex flex-col w-full sm:w-auto">
          <div class="flex items-center gap-3">
            <Avatar
              v-model="avatarPreviewUrl"
              :size="40"
              :ring="true"
              :ringColorClass="
                errors.avatar ? 'ring-red-500' : 'ring-orange-500'
              "
              @change="handleAvatarChange"
            />
            <span class="text-sm text-gray-300">Ảnh đại diện</span>
          </div>
          <p v-if="errors.avatar" class="mt-1 text-xs text-red-400">
            {{ errors.avatar }}
          </p>
        </div>

        <!-- Name -->
        <div class="flex flex-col w-full sm:flex-1 sm:min-w-[160px]">
          <input
            v-model="form.name"
            @input="validateField('name')"
            type="text"
            placeholder="Tên"
            :class="[
              'px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2',
              errors.name
                ? 'border border-red-500 focus:ring-red-500'
                : 'border border-gray-600 focus:ring-orange-400',
            ]"
            required
          />
          <p
            v-if="errors.name"
            class="mt-1 text-xs text-red-400 whitespace-nowrap"
          >
            {{ errors.name }}
          </p>
        </div>

        <!-- Relationship -->
        <div class="flex flex-col w-full sm:flex-1 sm:min-w-[160px]">
          <input
            v-model="form.relationship"
            @input="validateField('relationship')"
            type="text"
            placeholder="Mối quan hệ"
            :class="[
              'px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2',
              errors.relationship
                ? 'border border-red-500 focus:ring-red-500'
                : 'border border-gray-600 focus:ring-orange-400',
            ]"
            required
          />
          <p
            v-if="errors.relationship"
            class="mt-1 text-xs text-red-400 whitespace-nowrap"
          >
            {{ errors.relationship }}
          </p>
        </div>

        <!-- Comment -->
        <div class="flex flex-col w-full sm:flex-[2] sm:min-w-[240px]">
          <textarea
            v-model="form.comment"
            @input="validateField('comment')"
            placeholder="Nhận xét (ít nhất 20 ký tự)"
            :class="[
              'px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 resize-y h-11 overflow-y-auto',
              errors.comment
                ? 'border border-red-500 focus:ring-red-500'
                : 'border border-gray-600 focus:ring-orange-400',
            ]"
            required
          ></textarea>
          <p v-if="errors.comment" class="mt-1 text-xs text-red-400">
            {{ errors.comment }}
          </p>
        </div>

        <button
          type="submit"
          :disabled="isUploadingAvatar || loading"
          class="shrink-0 w-full sm:w-auto px-5 py-2 rounded bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow transition disabled:opacity-60 whitespace-nowrap"
        >
          {{ isUploadingAvatar ? "Đang tải ảnh..." : "Xác nhận" }}
        </button>
      </form>

      <div v-if="loading" class="">
        <div class="grid gap-6 md:grid-cols-2">
          <div
            v-for="n in limit"
            :key="n"
            class="bg-gray-900/80 rounded-xl p-6 border border-gray-700"
          >
            <div class="flex items-center mb-4">
              <div
                class="w-14 h-14 rounded-full bg-gray-700 animate-pulse"
              ></div>
              <div class="ml-4 flex-1 min-w-0">
                <div
                  class="h-4 bg-gray-700 rounded w-1/2 mb-2 animate-pulse"
                ></div>
                <div class="h-3 bg-gray-700 rounded w-1/3 animate-pulse"></div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-700 rounded animate-pulse"></div>
              <div class="h-4 bg-gray-700 rounded w-5/6 animate-pulse"></div>
            </div>
            <div
              class="mt-4 h-3 bg-gray-700 rounded w-1/4 ml-auto animate-pulse"
            ></div>
          </div>
        </div>
      </div>
      <div v-else>
        <div
          v-if="comments.length === 0"
          class="text-center text-gray-400 py-8"
        >
          Chưa có nhận xét nào.
        </div>
        <div v-else>
          <div class="grid gap-6 md:grid-cols-2">
            <div
              v-for="comment in comments"
              :key="comment._id"
              class="bg-gray-900/80 rounded-xl p-6 flex flex-col shadow-lg border border-gray-700 hover:shadow-xl transition-shadow"
            >
              <div class="flex items-center mb-4">
                <Avatar :src="comment.avatar" :readOnly="true" :size="56" />
                <div class="ml-4 flex-1 min-w-0">
                  <div class="text-lg font-semibold text-white line-clamp-1">
                    {{ comment.name }}
                  </div>
                  <div class="text-sm text-orange-400 line-clamp-1">
                    {{ comment.relationship }}
                  </div>
                </div>
              </div>
              <div
                class="text-gray-200 text-base mb-3 italic break-words break-all line-clamp-2"
              >
                "{{ comment.comment }}"
              </div>
              <div class="text-xs text-gray-500 mt-auto text-right">
                {{ formatDate(comment.createdAt) }}
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div
            v-if="pagination.total > limit"
            class="flex justify-center items-center gap-4 mt-8"
          >
            <button
              @click="prevPage"
              :disabled="pagination.page === 1 || loading"
              class="px-4 py-2 rounded bg-gray-700 text-white font-medium hover:bg-orange-500 disabled:opacity-50 transition"
            >
              Trước
            </button>
            <span class="text-gray-300 text-sm">
              Trang {{ pagination.page }} / {{ totalPages }}
            </span>
            <button
              @click="nextPage"
              :disabled="!pagination.nextPage || loading"
              class="px-4 py-2 rounded bg-gray-700 text-white font-medium hover:bg-orange-500 disabled:opacity-50 transition"
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { httpRequest } from "~/utils/httpRequest";
import Avatar from "~/components/ui/Avatar.vue";
import handleUpdateImage from "~/utils/handleUpdateImage";

const comments = ref([]);
const loading = ref(true);
const showForm = ref(false);
const avatarPreviewUrl = ref("");
const isUploadingAvatar = ref(false);
const form = ref({
  avatar: "",
  name: "",
  relationship: "",
  comment: "",
});
const errors = ref({ avatar: "", name: "", relationship: "", comment: "" });
const hasAnyError = computed(() =>
  Boolean(
    errors.value.avatar ||
      errors.value.name ||
      errors.value.relationship ||
      errors.value.comment
  )
);

const pagination = ref({
  total: 0,
  page: 1,
  limit: 4,
  nextPage: false,
  prePage: false,
});
const limit = 4;

const totalPages = computed(() => Math.ceil(pagination.value.total / limit));

const fetchComments = async (page = 1) => {
  loading.value = true;
  try {
    const res = await httpRequest.get(
      `/comments-about-me?page=${page}&limit=${limit}`
    );
    comments.value = res.data || [];
    pagination.value = {
      total: res.total,
      page: res.page,
      limit: res.limit,
      nextPage: res.nextPage,
      prePage: res.prePage,
    };
  } catch (e) {
    comments.value = [];
    pagination.value = {
      total: 0,
      page: 1,
      limit,
      nextPage: false,
      prePage: false,
    };
  } finally {
    loading.value = false;
  }
};

const prevPage = () => {
  if (pagination.value.page > 1) {
    fetchComments(pagination.value.page - 1);
  }
};

const nextPage = () => {
  if (pagination.value.nextPage) {
    fetchComments(pagination.value.page + 1);
  }
};

const handleAvatarChange = async (file) => {
  if (!file) return;
  isUploadingAvatar.value = true;
  try {
    const url = await handleUpdateImage(file, "comments-about-me");
    form.value.avatar = url || "";
    errors.value.avatar = form.value.avatar ? "" : "Vui lòng chọn ảnh đại diện";
  } catch (e) {
    form.value.avatar = "";
    errors.value.avatar = "Tải ảnh thất bại, vui lòng thử lại";
  } finally {
    isUploadingAvatar.value = false;
  }
};

const validateField = (field) => {
  const value = (form.value[field] || "").trim();
  switch (field) {
    case "avatar":
      errors.value.avatar = value ? "" : "Vui lòng chọn ảnh đại diện";
      break;
    case "name":
      errors.value.name = value.length > 50 ? "Tên tối đa 50 ký tự" : "";
      break;
    case "relationship":
      errors.value.relationship =
        value.length > 50 ? "Mối quan hệ tối đa 50 ký tự" : "";
      break;
    case "comment":
      errors.value.comment =
        value.length < 20 ? "Mô tả/nhận xét cần ít nhất 20 ký tự" : "";
      break;
  }
};

const validateForm = () => {
  validateField("avatar");
  validateField("name");
  validateField("relationship");
  validateField("comment");
  return (
    !hasAnyError.value &&
    !!form.value.avatar &&
    !!form.value.name &&
    !!form.value.relationship &&
    !!form.value.comment
  );
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  loading.value = true;
  try {
    await httpRequest.post("/comments-about-me", {
      avatar: form.value.avatar,
      name: form.value.name,
      relationship: form.value.relationship,
      comment: form.value.comment,
      status: true,
    });
    showForm.value = false;
    avatarPreviewUrl.value = "";
    form.value = { avatar: "", name: "", relationship: "", comment: "" };
    errors.value = { name: "", relationship: "", comment: "" };
    fetchComments(1);
  } catch (e) {
    // handle error toast if needed
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  const d = new Date(dateString);
  return d.toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

onMounted(() => fetchComments(1));
</script>

<style scoped>
.bg-gray-900\/80 {
  background: rgba(17, 24, 39, 0.8);
}
</style>
