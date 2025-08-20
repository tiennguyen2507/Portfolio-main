<template>
  <div class="flex items-center gap-2" :class="wrapperClass">
    <button class="qty-btn" @click="decrease" aria-label="Giảm">-</button>
    <input
      :class="[
        baseInputClass,
        inputClass,
        invalid ? 'input-error' : 'border-[#e5d6c3]',
      ]"
      type="number"
      :min="min"
      :max="max"
      v-model.number="localValue"
      :aria-invalid="invalid ? 'true' : 'false'"
    />
    <button class="qty-btn" @click="increase" aria-label="Tăng">+</button>
  </div>
</template>

<script setup>
  const props = defineProps({
    modelValue: { type: Number, default: 0 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 99 },
    invalid: { type: Boolean, default: false },
    inputClass: { type: String, default: 'w-12 sm:w-14' },
    wrapperClass: { type: String, default: '' },
  })
  const emit = defineEmits(['update:modelValue'])

  const localValue = ref(props.modelValue)
  const baseInputClass =
    'text-center rounded-lg border bg-white/70 py-1.5 sm:py-2 text-[#3b2b23] text-sm focus:outline-none'

  watch(
    () => props.modelValue,
    v => {
      if (v !== localValue.value) localValue.value = v
    }
  )

  const sanitize = v => {
    const n = Number.isFinite(v) ? v : 0
    return Math.min(props.max, Math.max(props.min, n))
  }

  watch(localValue, v => emit('update:modelValue', sanitize(v)))

  const decrease = () => (localValue.value = sanitize(localValue.value - 1))
  const increase = () => (localValue.value = sanitize(localValue.value + 1))
</script>

<style scoped>
  .qty-btn {
    @apply h-9 w-9 inline-flex items-center justify-center rounded-lg bg-white/70 border border-[#e5d6c3] text-[#3b2b23] hover:bg-white;
  }
  .input-error {
    @apply border-red-500 ring-1 ring-red-300;
  }
</style>
