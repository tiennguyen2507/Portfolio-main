export const useLocalStorage = (key, defaultValue = null) => {
  const stored = ref(defaultValue)

  // Load from localStorage on mount
  onMounted(() => {
    try {
      const item = localStorage.getItem(key)
      if (item) {
        stored.value = JSON.parse(item)
      }
    } catch {
      // Silent error handling for localStorage loading
    }
  })

  // Watch for changes and save to localStorage
  watch(
    stored,
    newValue => {
      try {
        localStorage.setItem(key, JSON.stringify(newValue))
      } catch {
        // Silent error handling for localStorage saving
      }
    },
    { deep: true }
  )

  return stored
}
