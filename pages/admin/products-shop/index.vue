<template>
  <div>
    <!-- Page Header -->
    <HeaderContent
      title="Quản lý Sản phẩm Shop"
      subtitle="Quản lý và theo dõi tất cả sản phẩm trong shop"
    >
      <template #action>
        <Button variant="secondary" size="md" @click="openCreateModal">
          <span class="inline-flex items-center gap-2">
            <span>Thêm Sản phẩm mới</span>
            <Icon name="plus" size="md" color="text-white" />
          </span>
        </Button>
      </template>
    </HeaderContent>

    <!-- Create/Edit Product Modal -->
    <ModalFormProducts
      v-if="showModal"
      :isOpen="showModal"
      :isEditing="isEditing"
      :form="form"
      :submitting="submitting"
      :error="error"
      @close="closeModal"
      @submit="handleFormSubmit"
      @thumbnailChange="f => (thumbnailFile = f)"
    />

    <!-- Loading State -->
    <div
      v-if="loading"
      class="bg-white dark:bg-[#050505] rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-8"
    >
      <Loading size="lg" />
    </div>

    <!-- Content -->
    <div v-else>
      <!-- Filters -->
      <div
        class="bg-white dark:bg-[#050505] p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 mb-6"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Input
              v-model="searchQuery"
              label="Tìm kiếm"
              type="text"
              placeholder="Tìm theo tên sản phẩm..."
              size="md"
            />
          </div>
          <div>
            <Select
              v-model="selectedCategory"
              label="Danh mục"
              placeholder="Tất cả danh mục"
              :options="[
                { label: 'Đồ ăn sáng', value: 'breakfast' },
                { label: 'Đồ uống', value: 'drink' },
              ]"
            />
          </div>
          <div class="flex items-end">
            <Button fullWidth size="md" @click="applyFilters"> Lọc </Button>
          </div>
        </div>
      </div>

      <!-- Products Table -->
      <TableAdminProducts
        :products="paginatedProducts"
        :loading="loading"
        @edit="editProduct"
        @delete="deleteProduct"
      />
      <!-- Pagination -->
      <div class="bg-white dark:bg-[#050505] px-6 py-3 border-t border-gray-200 dark:border-gray-800">
        <Pagination
          :page="currentPage"
          :total="filteredProducts.length"
          :limit="itemsPerPage"
          :show-info="true"
          :split="true"
          @update:page="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { httpRequest } from '~/utils/httpRequest'
  import HeaderContent from '~/components/common/Admin/HeaderContent.vue'
  import Loading from '~/components/ui/Loading.vue'
  import Pagination from '~/components/ui/Pagination.vue'
  import Input from '~/components/ui/Input/Input.vue'
  import Select from '~/components/ui/Select.vue'
  import Button from '~/components/ui/Button.vue'
  import Icon from '~/components/ui/Icon/Icon.vue'
  import TableAdminProducts from './_components/TableAdminProducts.vue'
  import ModalFormProducts from './_components/ModalFormProducts.vue'

  definePageMeta({
    layout: 'admin',
    middleware: 'auth',
  })

  // Route and Router for query params
  const route = useRoute()
  const router = useRouter()

  // Reactive data
  const searchQuery = ref('')
  const selectedCategory = ref('')
  const currentPage = ref(parseInt(route.query.page) || 1)
  const itemsPerPage = 10
  const loading = ref(true)
  const error = ref(null)
  const products = ref([])

  // Modal state
  const showModal = ref(false)
  const isEditing = ref(false)
  const submitting = ref(false)
  const editingProductId = ref(null)
  const form = ref({
    title: '',
    description: '',
    price: '',
    sales: '',
    category: '',
    quantity: '',
    thumbnail: '',
  })
  let thumbnailFile = null
  // Removed multi-select state

  // Computed properties
  const filteredProducts = computed(() => {
    let filtered = products.value

    if (searchQuery.value) {
      filtered = filtered.filter(
        product =>
          (product.title &&
            product.title
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase())) ||
          (product.description &&
            product.description
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase()))
      )
    }

    if (selectedCategory.value !== '') {
      filtered = filtered.filter(
        product => product.category === selectedCategory.value
      )
    }

    return filtered
  })

  const totalPages = computed(() =>
    Math.ceil(filteredProducts.value.length / itemsPerPage)
  )
  const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
  const endIndex = computed(() =>
    Math.min(startIndex.value + itemsPerPage, filteredProducts.value.length)
  )

  const paginatedProducts = computed(() => {
    return filteredProducts.value.slice(startIndex.value, endIndex.value)
  })

  // Methods
  const fetchProducts = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await httpRequest.get('/products?page=1&limit=100')
      // API trả về object với data property
      products.value = response && response.data ? response.data : []
    } catch (err) {
      console.error('Error fetching products:', err)
      error.value = err.message || 'Có lỗi xảy ra khi tải danh sách sản phẩm'
      products.value = []
    } finally {
      loading.value = false
    }
  }

  const applyFilters = () => {
    currentPage.value = 1
    updateQueryParams()
  }

  const handlePageChange = page => {
    currentPage.value = page
    updateQueryParams()
  }

  const updateQueryParams = () => {
    router.push({
      query: {
        ...route.query,
        page: currentPage.value > 1 ? currentPage.value : undefined,
      },
    })
  }

  // Modal functions
  const openCreateModal = () => {
    showModal.value = true
    isEditing.value = false
    error.value = ''
    form.value = {
      title: '',
      description: '',
      price: '',
      sales: '',
      category: '',
      quantity: '',
      thumbnail: '',
    }
    thumbnailFile = null
  }

  const closeModal = () => {
    showModal.value = false
    isEditing.value = false
    error.value = ''
    editingProductId.value = null // Reset editingProductId
    form.value = {
      title: '',
      description: '',
      price: '',
      sales: '',
      category: '',
      quantity: '',
      thumbnail: '',
    }
    thumbnailFile = null
  }

  const startEdit = product => {
    isEditing.value = true
    showModal.value = true
    error.value = ''
    editingProductId.value = product._id // Lưu trữ ID để edit
    form.value = {
      title: product.title || '',
      description: product.description || '',
      price: product.price || '',
      sales: product.sales || '',
      category: product.category || '',
      quantity: product.quantity || '',
      thumbnail: product.thumbnail || '',
    }
    thumbnailFile = null
  }

  const formatDate = dateString => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = date.toLocaleDateString('en-US', { month: 'short' })
    const year = date.getFullYear()
    return `${day} ${month}, ${year}`
  }

  const editProduct = id => {
    const product = products.value.find(p => p._id === id)
    if (product) {
      startEdit(product)
    }
  }

  const toggleProductStatus = async (id, currentStatus) => {
    try {
      await httpRequest.patch(`/products/${id}`, {
        status: currentStatus === 1 ? 0 : 1,
      })

      // Update local state
      const productIndex = products.value.findIndex(
        product => product._id === id
      )
      if (productIndex !== -1) {
        products.value[productIndex].status = currentStatus === 1 ? 0 : 1
      }
    } catch (err) {
      console.error('Error toggling product status:', err)
      alert('Có lỗi xảy ra khi cập nhật trạng thái sản phẩm')
    }
  }

  const deleteProduct = async id => {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        await httpRequest.delete(`/products/${id}`)

        // Remove from local state
        products.value = products.value.filter(product => product._id !== id)
      } catch (err) {
        console.error('Error deleting product:', err)
        error.value = 'Có lỗi xảy ra khi xóa sản phẩm'
      }
    }
  }

  // Handle form submit
  const handleFormSubmit = async result => {
    if (!result.success) {
      error.value = result.error
      return
    }

    submitting.value = true
    try {
      let thumbnailUrl = result.data.thumbnail

      // Upload thumbnail if there's a new file
      if (result.thumbnailFile && result.thumbnailFile instanceof File) {
        const { handleUpdateImage } = await import('~/utils/handleUpdateImage')
        const uploadedUrl = await handleUpdateImage(
          result.thumbnailFile,
          'tien-hanh-shop'
        )
        if (uploadedUrl) {
          thumbnailUrl = uploadedUrl
        } else {
          error.value = 'Không thể upload hình ảnh. Vui lòng thử lại.'
          submitting.value = false
          return
        }
      }

      if (isEditing.value) {
        // Update existing product - cần lưu trữ productId khi edit
        if (!editingProductId.value) {
          error.value = 'Không tìm thấy ID sản phẩm để cập nhật'
          submitting.value = false
          return
        }

        await httpRequest.patch(`/products/${editingProductId.value}`, {
          title: result.data.title.trim(),
          description: result.data.description.trim(),
          price: parseInt(result.data.price),
          sales: parseInt(result.data.sales),
          category: result.data.category,
          quantity: parseInt(result.data.quantity),
          thumbnail: thumbnailUrl,
        })
      } else {
        // Create new product
        await httpRequest.post('/products', {
          title: result.data.title.trim(),
          description: result.data.description.trim(),
          price: parseInt(result.data.price),
          sales: parseInt(result.data.sales),
          category: result.data.category,
          quantity: parseInt(result.data.quantity),
          thumbnail: thumbnailUrl,
        })
      }

      await fetchProducts()
      closeModal()
      error.value = ''
    } catch (err) {
      error.value = err?.message || 'Không thể lưu dữ liệu.'
    } finally {
      submitting.value = false
    }
  }

  // Lifecycle
  onMounted(() => {
    fetchProducts()
  })
</script>
