<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="buttonClasses"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value) =>
      ["primary", "secondary", "outline", "ghost"].includes(value),
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "button",
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

const buttonClasses = computed(() => {
  const baseClasses =
    "font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-md",
    md: "px-6 py-3 text-base rounded-lg",
    lg: "px-8 py-4 text-lg rounded-lg",
  };

  const variantClasses = {
    primary:
      "bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-500",
    secondary: "bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500",
    outline:
      "border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white focus:ring-orange-500",
    ghost: "text-orange-500 hover:bg-orange-500/10 focus:ring-orange-500",
  };

  const widthClass = props.fullWidth ? "w-full" : "";

  return [
    baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant],
    widthClass,
  ].join(" ");
});
</script>
