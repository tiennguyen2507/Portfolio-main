<template>
  <div>
    <!-- Page Header -->
    <HeaderContent
      title="Quản lý Sản phẩm Shop"
      subtitle="Quản lý và theo dõi tất cả sản phẩm trong shop"
    >
      <template #action>
        <Button
          variant="primary"
          size="sm"
          @click="openCreateModal"
          class="rounded-full px-3"
        >
          <Icon name="plus" size="sm" color="white" />
        </Button>
      </template>
    </HeaderContent>

    <ErrorCommon v-if="error" :message="error" @retry="fetchProducts" />

    <Loading v-if="loading" size="md" color="orange" />

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

    <!-- Content -->
    <div v-if="!loading">
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

      <!-- Products Card Grid -->
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <li v-for="product in paginatedProducts" :key="product._id" class="list-none">
          <Card variant="default" padding="md" hover class="h-full flex flex-col">
            <div class="flex gap-3">
              <div class="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  :src="product.thumbnail"
                  :alt="product.title"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="flex-1 min-w-0">
                <Typography as="h3" size="sm" weight="semibold" class="line-clamp-1">
                  {{ product.title || 'N/A' }}
                </Typography>
                <Typography as="p" size="xs" color="muted" class="line-clamp-2 mt-0.5">
                  {{ product.description }}
                </Typography>
              </div>
            </div>
            <div class="mt-3 flex flex-wrap gap-2 items-center">
              <Tag variant="info" size="xs">{{ product.category || 'N/A' }}</Tag>
              <Typography as="span" size="xs" color="tertiary">
                {{ formatProductDate(product.createdAt) }}
              </Typography>
            </div>
            <div class="mt-2 flex flex-wrap gap-2 text-xs">
              <span class="font-semibold text-green-600 dark:text-green-400">{{ formatProductPrice(product.price) }}</span>
              <span class="text-gray-500 dark:text-gray-400">SL: {{ product.quantity || 0 }}</span>
              <span class="text-orange-600 dark:text-orange-400">DT: {{ formatProductPrice(product.sales) }}</span>
            </div>
            <div class="mt-3 flex gap-2">
              <Button size="xs" variant="primary" @click="editProduct(product._id)">
                <Icon name="edit" size="sm" />
              </Button>
              <Button size="xs" variant="ghost" class="text-red-600 dark:text-red-400" @click="deleteProduct(product._id)">
                <Icon name="delete" size="sm" />
              </Button>
            </div>
          </Card>
        </li>
      </ul>
      <!-- Pagination -->
      <div
        v-if="!error && filteredProducts.length > 0"
        class="mt-8 bg-white dark:bg-[#050505] rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 px-6 py-4 hover:shadow-lg transition-shadow duration-300"
      >
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
  import Card from '~/components/ui/Card.vue'
  import Tag from '~/components/ui/Tag.vue'
  import Typography from '~/components/ui/Typography.vue'
  import ModalFormProducts from './_components/ModalFormProducts.vue'
  import ErrorCommon from '~/components/common/Admin/ErrorCommon.vue'
  import { useNotification } from '~/composables/useNotification'

  definePageMeta({
    layout: 'admin',
    middleware: 'auth',
  })

  const { showNotification, showError } = useNotification()

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
      error.value = err?.message || 'Có lỗi xảy ra khi tải danh sách sản phẩm'
      showError(error.value)
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

  const formatProductDate = dateString => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatProductPrice = price => {
    if (price == null) return '0 ₫'
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(price)
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
      showError(err?.message || 'Có lỗi xảy ra khi cập nhật trạng thái sản phẩm')
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
        error.value = err?.message || 'Có lỗi xảy ra khi xóa sản phẩm'
        showError(error.value)
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
      showNotification(
        isEditing.value ? 'Cập nhật sản phẩm thành công!' : 'Tạo sản phẩm thành công!'
      )
    } catch (err) {
      error.value = err?.message || 'Không thể lưu dữ liệu.'
      showError(error.value)
    } finally {
      submitting.value = false
    }
  }

  // Lifecycle
  onMounted(() => {
    fetchProducts()
  })
</script>
