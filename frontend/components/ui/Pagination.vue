<template>
  <div
    :class="containerClass"
    role="navigation"
    aria-label="Pagination"
    tabindex="0"
    @keydown.left.prevent="goPrev"
    @keydown.right.prevent="goNext"
  >
    <div
      v-if="showInfo && hasItemInfo"
      class="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap"
    >
      Hiển thị
      <span class="font-medium">{{ startItem }}</span>
      -
      <span class="font-medium">{{ endItem }}</span>
      /
      <span class="font-medium">{{ total }}</span>
    </div>

    <div class="inline-flex items-center gap-3">
      <button
        type="button"
        class="h-8 w-8 inline-flex items-center justify-center rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus-visible:outline-none focus:ring-0"
        :disabled="isPrevDisabled"
        aria-label="Trang trước"
        @click="goPrev"
      >
        <svg
          class="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L8.414 10l4.293 4.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <div class="inline-flex items-center gap-2">
        <span
          class="px-2.5 py-1 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm font-medium shadow-sm min-w-[2rem] text-center"
          >{{ page }}</span
        >
        <span class="text-gray-400 dark:text-gray-500">/</span>
        <span class="text-gray-700 dark:text-gray-200 text-sm">{{
          totalPages
        }}</span>
      </div>

      <button
        type="button"
        class="h-8 w-8 inline-flex items-center justify-center rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus-visible:outline-none focus:ring-0"
        :disabled="isNextDisabled"
        aria-label="Trang sau"
        @click="goNext"
      >
        <svg
          class="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L10.586 10 7.293 6.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    page: { type: Number, default: 1 },
    total: { type: Number, default: 0 },
    limit: { type: Number, default: 10 },
    pageCount: { type: Number, default: 0 }, // ưu tiên nếu truyền
    disabled: { type: Boolean, default: false },
    showInfo: { type: Boolean, default: false },
    split: { type: Boolean, default: false },
  })

  const emit = defineEmits(['update:page', 'change'])

  const containerClass = computed(
    () =>
      (props.split
        ? 'w-full flex items-center justify-between gap-4 select-none'
        : 'inline-flex items-center gap-4 select-none') +
      ' focus:outline-none focus-visible:outline-none focus:ring-0'
  )

  const totalPages = computed(() => {
    if (props.pageCount && props.pageCount > 0) return props.pageCount
    if (props.limit <= 0) return 1
    const calc = Math.ceil(props.total / props.limit)
    return Math.max(1, isFinite(calc) ? calc : 1)
  })

  const isPrevDisabled = computed(() => props.disabled || props.page <= 1)
  const isNextDisabled = computed(
    () => props.disabled || props.page >= totalPages.value
  )

  const hasItemInfo = computed(() => props.limit > 0 && props.total > 0)
  const startItem = computed(() =>
    props.total === 0 ? 0 : (props.page - 1) * props.limit + 1
  )
  const endItem = computed(() =>
    Math.min(props.page * props.limit, props.total)
  )

  function setPage(newPage) {
    const clamped = Math.min(Math.max(1, newPage), totalPages.value)
    if (clamped === props.page) return
    emit('update:page', clamped)
    emit('change', clamped)
  }

  function goPrev() {
    if (isPrevDisabled.value) return
    setPage(props.page - 1)
  }

  function goNext() {
    if (isNextDisabled.value) return
    setPage(props.page + 1)
  }
</script>
