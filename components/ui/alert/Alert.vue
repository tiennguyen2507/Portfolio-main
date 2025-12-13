<template>
  <Teleport to="body">
    <TransitionGroup :name="transitionName" tag="div" :class="containerClass">
      <div
        v-for="alert in alerts"
        :key="alert.id"
        :class="[
          'alert-item',
          `alert-${alert.type}`,
          alert.dismissible && 'alert-dismissible',
        ]"
        @click="alert.dismissible && dismissAlert(alert.id)"
      >
        <div class="alert-content">
          <div class="alert-icon">
            <svg
              v-if="alert.type === 'success'"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              v-else-if="alert.type === 'error'"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              v-else-if="alert.type === 'warning'"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              v-else-if="alert.type === 'info'"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="alert-message">
            {{ alert.message }}
          </div>
          <button
            v-if="alert.dismissible"
            type="button"
            class="alert-close"
            @click.stop="dismissAlert(alert.id)"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script setup>
  const alerts = ref([])
  let alertIdCounter = 0
  const timers = new Map()

  const props = defineProps({
    position: {
      type: String,
      default: 'bottom',
      validator: value =>
        [
          'top',
          'top-left',
          'top-right',
          'bottom',
          'bottom-left',
          'bottom-right',
        ].includes(value),
    },
    queue: {
      type: Boolean,
      default: false,
    },
  })

  const containerClass = computed(() => {
    const positionMap = {
      top: 'fixed top-4 left-1/2 -translate-x-1/2 z-50',
      'top-left': 'fixed top-4 left-4 z-50',
      'top-right': 'fixed top-4 right-4 z-50',
      bottom: 'fixed bottom-4 left-1/2 -translate-x-1/2 z-50',
      'bottom-left': 'fixed bottom-4 left-4 z-50',
      'bottom-right': 'fixed bottom-4 right-4 z-50',
    }
    return positionMap[props.position] || positionMap.bottom
  })

  const transitionName = computed(() => {
    if (props.position.includes('top')) {
      return 'alert-slide-down'
    }
    return 'alert-slide-up'
  })

  const showAlert = alert => {
    const id = ++alertIdCounter
    const newAlert = {
      id,
      message: alert.message || 'Notification',
      type: alert.type || 'default',
      duration: alert.duration ?? 5000,
      dismissible: alert.dismissible !== false,
      position: alert.position || props.position,
    }

    if (props.queue && alerts.value.length > 0) {
      // Wait for previous alert to dismiss
      return
    }

    alerts.value.push(newAlert)

    // Auto dismiss after duration
    if (newAlert.duration > 0) {
      const timer = setTimeout(() => {
        dismissAlert(id)
      }, newAlert.duration)
      timers.set(id, timer)
    }
  }

  const dismissAlert = id => {
    const alert = alerts.value.find(a => a.id === id)
    if (alert) {
      const timer = timers.get(id)
      if (timer) {
        clearTimeout(timer)
        timers.delete(id)
      }
      alerts.value = alerts.value.filter(a => a.id !== id)
    }
  }

  const hideAll = () => {
    alerts.value.forEach(alert => {
      const timer = timers.get(alert.id)
      if (timer) {
        clearTimeout(timer)
        timers.delete(alert.id)
      }
    })
    alerts.value = []
  }

  // Expose methods to parent
  defineExpose({
    showAlert,
    dismissAlert,
    hideAll,
  })

  // Provide methods globally via composable
  provide('alert', {
    showAlert,
    dismissAlert,
    hideAll,
  })

  // Also expose to global state for useAlert composable
  onMounted(() => {
    if (process.client) {
      // Update alertState for fallback (dynamic import to avoid circular dependency)
      import('~/composables/useAlertState').then(({ alertState }) => {
        alertState.showAlert = showAlert
        alertState.dismissAlert = dismissAlert
        alertState.hideAll = hideAll
      })
    }
  })
</script>

<style scoped>
  .alert-item {
    @apply min-w-[300px] max-w-md mb-3 rounded-lg shadow-lg px-4 py-3 flex items-start;
    @apply bg-gray-800 text-white;
    @apply cursor-pointer transition-all duration-300;
  }

  .alert-item:hover {
    @apply shadow-xl;
  }

  .alert-success {
    @apply bg-green-600 text-white;
  }

  .alert-error {
    @apply bg-red-600 text-white;
  }

  .alert-warning {
    @apply bg-yellow-500 text-white;
  }

  .alert-info {
    @apply bg-blue-600 text-white;
  }

  .alert-default {
    @apply bg-gray-800 text-white;
  }

  .alert-content {
    @apply flex items-start gap-3 w-full;
  }

  .alert-icon {
    @apply flex-shrink-0 mt-0.5;
  }

  .alert-message {
    @apply flex-1 text-sm leading-relaxed;
  }

  .alert-close {
    @apply flex-shrink-0 ml-2 text-white/70 hover:text-white transition-colors;
    @apply focus:outline-none focus:ring-2 focus:ring-white/50 rounded;
  }

  .alert-dismissible {
    @apply cursor-pointer;
  }

  /* Transitions */
  .alert-slide-up-enter-active,
  .alert-slide-up-leave-active {
    @apply transition-all duration-300 ease-out;
  }

  .alert-slide-up-enter-from {
    @apply opacity-0 translate-y-4;
  }

  .alert-slide-up-leave-to {
    @apply opacity-0 translate-y-4;
  }

  .alert-slide-down-enter-active,
  .alert-slide-down-leave-active {
    @apply transition-all duration-300 ease-out;
  }

  .alert-slide-down-enter-from {
    @apply opacity-0 -translate-y-4;
  }

  .alert-slide-down-leave-to {
    @apply opacity-0 -translate-y-4;
  }
</style>
