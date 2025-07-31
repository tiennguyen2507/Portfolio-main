<template>
  <div class="relative">
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :rows="rows"
      :cols="cols"
      :class="textareaClasses"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />
    <slot name="icon" />
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  rows: {
    type: Number,
    default: 4,
  },
  cols: {
    type: Number,
    default: undefined,
  },
  variant: {
    type: String,
    default: "default",
    validator: (value) => ["default", "error", "success"].includes(value),
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
});

const emit = defineEmits(["update:modelValue", "focus", "blur"]);

const textareaClasses = computed(() => {
  const baseClasses =
    "w-full bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-all duration-200 resize-none";

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };

  const variantClasses = {
    default: "border-gray-700 focus:border-orange-500",
    error: "border-red-500 focus:border-red-500",
    success: "border-green-500 focus:border-green-500",
  };

  const disabledClass = props.disabled ? "opacity-50 cursor-not-allowed" : "";

  return [
    baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant],
    disabledClass,
  ].join(" ");
});
</script>
