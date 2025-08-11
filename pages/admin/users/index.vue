<template>
  <div>
    <!-- Page Header -->
    <HeaderContent
      title="Quản lý Users"
      subtitle="Quản lý và theo dõi tất cả users trong hệ thống"
    >
      <template #action>
        <NuxtLink
          to="/admin/users/new"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Thêm User mới
        </NuxtLink>
      </template>
    </HeaderContent>

    <!-- Loading State -->
    <Loading v-if="loading" size="lg" />

    <!-- Error State -->
    <div
      v-else-if="error"
      class="bg-red-50 border border-red-200 rounded-lg p-6 mb-6"
    >
      <div class="flex items-center">
        <svg
          class="w-6 h-6 text-red-600 mr-3"
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
        <div>
          <h3 class="text-lg font-medium text-red-800">Lỗi khi tải dữ liệu</h3>
          <p class="text-red-600 mt-1">{{ error }}</p>
        </div>
      </div>
      <button
        @click="fetchUsers"
        class="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
      >
        Thử lại
      </button>
    </div>

    <!-- Content -->
    <div v-else>
      <!-- Filters -->
      <div
        class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Tìm kiếm</label
            >
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Tìm theo tên, email..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Trạng thái</label
            >
            <select
              v-model="selectedStatus"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="1">Hoạt động</option>
              <option value="0">Không hoạt động</option>
            </select>
          </div>
          <div class="flex items-end">
            <button
              @click="applyFilters"
              class="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Lọc
            </button>
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div
        class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      >
        <!-- Table Header with Bulk Actions -->
        <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-500">
                {{ selectedUsers.length }} users được chọn
              </span>
            </div>
            <div v-if="selectedUsers.length > 0" class="flex space-x-2">
              <button
                @click="bulkActivate"
                class="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                title="Kích hoạt tất cả"
              >
                <img
                  src="/assets/icons/bulk-activate.svg"
                  alt="Kích hoạt"
                  class="w-4 h-4"
                />
              </button>
              <button
                @click="bulkDeactivate"
                class="p-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
                title="Vô hiệu tất cả"
              >
                <img
                  src="/assets/icons/bulk-deactivate.svg"
                  alt="Vô hiệu"
                  class="w-4 h-4"
                />
              </button>
              <button
                @click="bulkDelete"
                class="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                title="Xóa tất cả"
              >
                <img
                  src="/assets/icons/bulk-delete.svg"
                  alt="Xóa"
                  class="w-4 h-4"
                />
              </button>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      v-model="selectAll"
                      @change="toggleSelectAll"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                    />
                    <span
                      >LEAD
                      <span class="text-red-600 font-bold">user</span></span
                    >
                  </div>
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  NGUỒN
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  TRẠNG THÁI
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  NGÀY TẠO
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="user in paginatedUsers"
                :key="user._id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      v-model="selectedUsers"
                      :value="user._id"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                    />
                    <div class="flex items-center">
                      <div
                        v-if="user.avatar"
                        class="w-10 h-10 rounded-full overflow-hidden mr-3"
                      >
                        <img
                          :src="user.avatar"
                          :alt="user.fullName"
                          class="w-full h-full object-cover"
                        />
                      </div>
                      <div
                        v-else
                        class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3"
                      >
                        <span class="text-sm font-medium text-gray-600">{{
                          user.fullName
                            ? user.fullName.charAt(0).toUpperCase()
                            : "U"
                        }}</span>
                      </div>
                      <div>
                        <div class="text-sm font-bold text-gray-900">
                          {{ user.fullName || "N/A" }}
                        </div>
                        <div class="text-sm text-gray-500">
                          {{ user.email }}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
                  >
                    Website
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex px-3 py-1 text-xs font-semibold rounded-full"
                    :class="{
                      'bg-green-100 text-green-800': user.status === 1,
                      'bg-gray-100 text-gray-800': user.status === 0,
                    }"
                  >
                    {{ user.status === 1 ? "Hoạt động" : "Mới" }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(user.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex items-center space-x-2">
                    <button
                      @click="editUser(user._id)"
                      class="p-1.5 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded transition-colors"
                      title="Sửa user"
                    >
                      <img
                        src="/assets/icons/edit.svg"
                        alt="Sửa"
                        class="w-4 h-4"
                      />
                    </button>

                    <button
                      @click="deleteUser(user._id)"
                      class="p-1.5 text-red-600 hover:text-red-900 hover:bg-red-50 rounded transition-colors"
                      title="Xóa user"
                    >
                      <img
                        src="/assets/icons/delete.svg"
                        alt="Xóa"
                        class="w-4 h-4"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div
          v-if="filteredUsers.length === 0 && !loading"
          class="text-center py-12"
        >
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
            ></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">Không có users</h3>
          <p class="mt-1 text-sm text-gray-500">
            Không tìm thấy users nào phù hợp với bộ lọc.
          </p>
        </div>

        <!-- Pagination -->
        <div
          v-if="filteredUsers.length > 0"
          class="bg-white px-6 py-3 border-t border-gray-200"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1 flex justify-between sm:hidden">
              <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Trước
              </button>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Sau
              </button>
            </div>
            <div
              class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
            >
              <div>
                <p class="text-sm text-gray-700">
                  Hiển thị
                  <span class="font-medium">{{ startIndex + 1 }}</span> đến
                  <span class="font-medium">{{ endIndex }}</span> trong tổng số
                  <span class="font-medium">{{ filteredUsers.length }}</span>
                  users
                </p>
              </div>
              <div>
                <nav
                  class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                >
                  <button
                    @click="previousPage"
                    :disabled="currentPage === 1"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span class="sr-only">Trước</span>
                    <svg
                      class="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    v-for="page in visiblePages"
                    :key="page"
                    @click="goToPage(page)"
                    :class="[
                      'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                      page === currentPage
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                    ]"
                  >
                    {{ page }}
                  </button>
                  <button
                    @click="nextPage"
                    :disabled="currentPage === totalPages"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span class="sr-only">Sau</span>
                    <svg
                      class="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { httpRequest } from "~/utils/httpRequest";
import HeaderContent from "~/components/admin/HeaderContent.vue";
import Loading from "~/components/ui/Loading.vue";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

// Reactive data
const searchQuery = ref("");
const selectedStatus = ref("");
const currentPage = ref(1);
const itemsPerPage = 10;
const loading = ref(false);
const error = ref(null);
const users = ref([]);
const selectedUsers = ref([]);
const selectAll = ref(false);

// Computed properties
const filteredUsers = computed(() => {
  let filtered = users.value;

  if (searchQuery.value) {
    filtered = filtered.filter(
      (user) =>
        (user.fullName &&
          user.fullName
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())) ||
        (user.email &&
          user.email.toLowerCase().includes(searchQuery.value.toLowerCase()))
    );
  }

  if (selectedStatus.value !== "") {
    filtered = filtered.filter(
      (user) => user.status === parseInt(selectedStatus.value)
    );
  }

  return filtered;
});

const totalPages = computed(() =>
  Math.ceil(filteredUsers.value.length / itemsPerPage)
);
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
const endIndex = computed(() =>
  Math.min(startIndex.value + itemsPerPage, filteredUsers.value.length)
);

const paginatedUsers = computed(() => {
  return filteredUsers.value.slice(startIndex.value, endIndex.value);
});

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

// Methods
const fetchUsers = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await httpRequest.get("/users");
    // API trả về array trực tiếp, không có data wrapper
    users.value = Array.isArray(response) ? response : [];
  } catch (err) {
    console.error("Error fetching users:", err);
    error.value = err.message || "Có lỗi xảy ra khi tải danh sách users";
  } finally {
    loading.value = false;
  }
};

const applyFilters = () => {
  currentPage.value = 1;
  selectedUsers.value = [];
  selectAll.value = false;
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};

const editUser = (id) => {
  // Navigate to edit page
  navigateTo(`/admin/users/${id}/edit`);
};

const toggleUserStatus = async (id, currentStatus) => {
  try {
    await httpRequest.put(`/users/${id}`, {
      status: currentStatus === 1 ? 0 : 1,
    });

    // Update local state
    const userIndex = users.value.findIndex((user) => user._id === id);
    if (userIndex !== -1) {
      users.value[userIndex].status = currentStatus === 1 ? 0 : 1;
    }
  } catch (err) {
    console.error("Error toggling user status:", err);
    alert("Có lỗi xảy ra khi cập nhật trạng thái user");
  }
};

const deleteUser = async (id) => {
  if (confirm("Bạn có chắc chắn muốn xóa user này?")) {
    try {
      await httpRequest.delete(`/users/${id}`);

      // Remove from local state
      users.value = users.value.filter((user) => user._id !== id);
      selectedUsers.value = selectedUsers.value.filter(
        (userId) => userId !== id
      );
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Có lỗi xảy ra khi xóa user");
    }
  }
};

// Bulk actions
const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedUsers.value = paginatedUsers.value.map((user) => user._id);
  } else {
    selectedUsers.value = [];
  }
};

const bulkActivate = async () => {
  if (selectedUsers.value.length === 0) return;

  try {
    await Promise.all(
      selectedUsers.value.map((id) =>
        httpRequest.put(`/users/${id}`, { status: 1 })
      )
    );

    // Update local state
    users.value.forEach((user) => {
      if (selectedUsers.value.includes(user._id)) {
        user.status = 1;
      }
    });

    selectedUsers.value = [];
    selectAll.value = false;
  } catch (err) {
    console.error("Error bulk activating users:", err);
    alert("Có lỗi xảy ra khi kích hoạt users");
  }
};

const bulkDeactivate = async () => {
  if (selectedUsers.value.length === 0) return;

  try {
    await Promise.all(
      selectedUsers.value.map((id) =>
        httpRequest.put(`/users/${id}`, { status: 0 })
      )
    );

    // Update local state
    users.value.forEach((user) => {
      if (selectedUsers.value.includes(user._id)) {
        user.status = 0;
      }
    });

    selectedUsers.value = [];
    selectAll.value = false;
  } catch (err) {
    console.error("Error bulk deactivating users:", err);
    alert("Có lỗi xảy ra khi vô hiệu users");
  }
};

const bulkDelete = async () => {
  if (selectedUsers.value.length === 0) return;

  if (
    confirm(
      `Bạn có chắc chắn muốn xóa ${selectedUsers.value.length} users này?`
    )
  ) {
    try {
      await Promise.all(
        selectedUsers.value.map((id) => httpRequest.delete(`/users/${id}`))
      );

      // Remove from local state
      users.value = users.value.filter(
        (user) => !selectedUsers.value.includes(user._id)
      );
      selectedUsers.value = [];
      selectAll.value = false;
    } catch (err) {
      console.error("Error bulk deleting users:", err);
      alert("Có lỗi xảy ra khi xóa users");
    }
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToPage = (page) => {
  currentPage.value = page;
};

// Lifecycle
onMounted(() => {
  fetchUsers();
});
</script>
