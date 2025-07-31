<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "default",
    validator: (value) =>
      ["default", "primary", "success", "warning", "error", "info"].includes(
        value
      ),
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
  rounded: {
    type: Boolean,
    default: true,
  },
});

const badgeClasses = computed(() => {
  const baseClasses = "inline-flex items-center font-medium";

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const variantClasses = {
    default: "bg-gray-700 text-gray-300",
    primary: "bg-orange-500/20 text-orange-500",
    success: "bg-green-500/20 text-green-500",
    warning: "bg-yellow-500/20 text-yellow-500",
    error: "bg-red-500/20 text-red-500",
    info: "bg-blue-500/20 text-blue-500",
  };

  const roundedClass = props.rounded ? "rounded-full" : "rounded-md";

  return [
    baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant],
    roundedClass,
  ].join(" ");
});
</script>
