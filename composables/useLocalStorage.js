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

    // Listen to native storage events (cross-tab)
    const handleStorage = e => {
      try {
        if (e && e.key === key && typeof e.newValue !== 'undefined') {
          stored.value = e.newValue ? JSON.parse(e.newValue) : defaultValue
        }
      } catch {
        // ignore
      }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorage)
    }

    // Listen to custom events from within the same tab
    const handleCustom = e => {
      try {
        if (e?.detail?.key === key) {
          stored.value = e.detail.value
        }
      } catch {
        // ignore
      }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('th:storage', handleCustom)
    }

    onBeforeUnmount(() => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', handleStorage)
        window.removeEventListener('th:storage', handleCustom)
      }
    })
  })

  // Watch for changes and save to localStorage
  watch(
    stored,
    newValue => {
      try {
        localStorage.setItem(key, JSON.stringify(newValue))
        // Broadcast custom event so other refs update immediately in same tab
        if (typeof window !== 'undefined' && 'dispatchEvent' in window) {
          const ev =
            'CustomEvent' in window
              ? new window.CustomEvent('th:storage', {
                  detail: { key, value: newValue },
                })
              : null
          if (ev) window.dispatchEvent(ev)
        }
      } catch {
        // Silent error handling for localStorage saving
      }
    },
    { deep: true }
  )

  return stored
}
