export const useLocalStorage = (key, defaultValue = null) => {
  const stored = ref(defaultValue)
  
  // Load from localStorage on mount
  onMounted(() => {
    try {
      const item = localStorage.getItem(key)
      if (item) {
        stored.value = JSON.parse(item)
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error)
    }
  })
  
  // Watch for changes and save to localStorage
  watch(stored, (newValue) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }, { deep: true })
  
  return stored
} 