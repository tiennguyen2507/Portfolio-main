<template>
  <component :is="asTag" :class="typographyClasses">
    <slot />
  </component>
</template>

<script setup>
  const props = defineProps({
    /**
     * HTML tag được render
     * Ví dụ: h1, h2, p, span, label,...
     */
    as: {
      type: String,
      default: 'p',
      validator: value =>
        [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'p',
          'span',
          'label',
          'div',
          'small',
        ].includes(value),
    },
    /**
     * Kích thước chữ (map sang Tailwind text-*)
     * Có thể truyền string để áp dụng cho cả mobile và desktop
     * Hoặc object {sp: 'xx', pc: 'xx'} để set size khác nhau cho mobile (sp) và desktop (pc)
     */
    size: {
      type: [String, Object],
      default: 'md',
      validator: value => {
        const validSizes = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']
        // Nếu là string, validate như cũ
        if (typeof value === 'string') {
          return validSizes.includes(value)
        }
        // Nếu là object, validate sp và pc
        if (typeof value === 'object' && value !== null) {
          return (
            ('sp' in value && validSizes.includes(value.sp)) &&
            ('pc' in value && validSizes.includes(value.pc))
          )
        }
        return false
      },
    },
    /**
     * Độ đậm font
     */
    weight: {
      type: String,
      default: 'normal',
      validator: value => ['light', 'normal', 'medium', 'semibold', 'bold'].includes(value),
    },
    /**
     * Màu chữ theo semantic
     */
    color: {
      type: String,
      default: 'default',
        validator: value =>
          ['default', 'muted', 'tertiary', 'primary', 'secondary', 'success', 'warning', 'error', 'white'].includes(
            value
          ),
    },
    /**
     * Canh lề văn bản
     */
    align: {
      type: String,
      default: 'left',
      validator: value => ['left', 'center', 'right', 'justify'].includes(value),
    },
    /**
     * Viết hoa toàn bộ
     */
    uppercase: {
      type: Boolean,
      default: false,
    },
    /**
     * Không cho xuống dòng (giữ trên một dòng)
     */
    noWrap: {
      type: Boolean,
      default: false,
    },
    /**
     * Cắt text với ellipsis nếu tràn
     */
    truncate: {
      type: Boolean,
      default: false,
    },
  })

  const asTag = computed(() => props.as || 'p')

  const typographyClasses = computed(() => {
    const baseClasses = 'leading-relaxed'

    const sizeClasses = {
      xxs: 'text-[10px]',
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
    }

    const weightClasses = {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    }

    // Màu chữ theo iOS system colors
    const colorClasses = {
      // Primary label - iOS system label color
      // Light: #000000, Dark: #FFFFFF
      default: 'text-black dark:text-white',
      // Secondary label - iOS secondaryLabel color
      // Light: #3C3C43, Dark: #EBEBF5
      muted: 'text-[#3C3C43] dark:text-[#EBEBF5]',
      // Tertiary label - iOS tertiaryLabel color
      // Light: #3C3C4399, Dark: #EBEBF599
      tertiary: 'text-[#3C3C43]/60 dark:text-[#EBEBF5]/60',
      // Primary accent color (orange)
      primary: 'text-orange-500 dark:text-orange-400',
      // Secondary text
      secondary: 'text-[#3C3C43] dark:text-[#EBEBF5]',
      // Semantic colors
      success: 'text-green-500 dark:text-green-400',
      warning: 'text-amber-500 dark:text-amber-400',
      error: 'text-red-500 dark:text-red-400',
      // Luôn trắng (dùng trên background tối)
      white: 'text-white',
    }

    const alignClasses = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    }

    // Xử lý size: string hoặc object {sp, pc}
    let sizeClass = ''
    if (typeof props.size === 'string') {
      // Nếu là string, áp dụng cho cả mobile và desktop
      sizeClass = sizeClasses[props.size]
    } else if (typeof props.size === 'object' && props.size !== null) {
      // Nếu là object, sp cho mobile, pc cho desktop (md: breakpoint)
      const spClass = sizeClasses[props.size.sp] || ''
      const pcClass = sizeClasses[props.size.pc] || ''
      // Format: "text-sm md:text-lg" (sp cho mobile, pc cho desktop từ md: trở lên)
      sizeClass = `${spClass} ${pcClass ? `md:${pcClass}` : ''}`.trim()
    }

    const transformClass = props.uppercase ? 'uppercase tracking-wide' : ''
    const noWrapClass = props.noWrap ? 'whitespace-nowrap' : ''
    const truncateClass = props.truncate ? 'truncate' : ''

    return [
      baseClasses,
      sizeClass,
      weightClasses[props.weight],
      colorClasses[props.color],
      alignClasses[props.align],
      transformClass,
      noWrapClass,
      truncateClass,
    ]
      .filter(Boolean)
      .join(' ')
  })
</script>


