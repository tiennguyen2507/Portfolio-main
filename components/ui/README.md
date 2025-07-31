# UI Components Library

Bộ thư viện UI components được thiết kế cho portfolio website với theme tối và màu cam làm chủ đạo.

## Components

### Button

Component button với nhiều variants và sizes khác nhau.

```vue
<Button variant="primary" size="lg" fullWidth @click="handleClick">
  Click me
</Button>
```

**Props:**

- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `disabled`: Boolean (default: false)
- `type`: String (default: 'button')
- `fullWidth`: Boolean (default: false)

### Input

Component input field với validation states.

```vue
<Input
  v-model="email"
  type="email"
  placeholder="Enter your email"
  variant="success"
  size="lg"
/>
```

**Props:**

- `modelValue`: String | Number
- `type`: String (default: 'text')
- `placeholder`: String
- `disabled`: Boolean (default: false)
- `required`: Boolean (default: false)
- `variant`: 'default' | 'error' | 'success' (default: 'default')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')

### Textarea

Component textarea với các tính năng tương tự Input.

```vue
<Textarea
  v-model="message"
  placeholder="Enter your message"
  rows="4"
  size="lg"
/>
```

**Props:**

- `modelValue`: String
- `placeholder`: String
- `disabled`: Boolean (default: false)
- `required`: Boolean (default: false)
- `rows`: Number (default: 4)
- `cols`: Number
- `variant`: 'default' | 'error' | 'success' (default: 'default')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')

### Card

Component card để hiển thị nội dung trong container.

```vue
<Card variant="elevated" hover padding="lg">
  <template #header>
    <h3>Card Title</h3>
  </template>
  
  <p>Card content goes here</p>
  
  <template #footer>
    <Button variant="primary">Action</Button>
  </template>
</Card>
```

**Props:**

- `variant`: 'default' | 'elevated' | 'outlined' (default: 'default')
- `padding`: 'none' | 'sm' | 'md' | 'lg' (default: 'md')
- `hover`: Boolean (default: false)

**Slots:**

- `header`: Header content
- `default`: Main content
- `footer`: Footer content

### Badge

Component badge để hiển thị tags, status, hoặc labels.

```vue
<Badge variant="primary" size="md" rounded>
  React
</Badge>
```

**Props:**

- `variant`: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' (default: 'default')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `rounded`: Boolean (default: true)

## Color Palette

### Primary Colors

- Orange: `#f97316` (orange-500)
- Orange Dark: `#ea580c` (orange-600)
- Orange Light: `#f97316` with opacity

### Background Colors

- Dark Gray: `#1f2937` (gray-800)
- Medium Gray: `#374151` (gray-700)
- Light Gray: `#6b7280` (gray-500)

### Text Colors

- White: `#ffffff`
- Light Gray: `#d1d5db` (gray-300)
- Medium Gray: `#9ca3af` (gray-400)

## Usage Examples

### Form Example

```vue
<template>
  <Card variant="elevated" padding="lg">
    <template #header>
      <h2 class="text-2xl font-bold text-white">Contact Form</h2>
    </template>

    <div class="space-y-4">
      <Input v-model="form.name" placeholder="Your Name" size="lg" />
      <Input
        v-model="form.email"
        type="email"
        placeholder="Your Email"
        size="lg"
      />
      <Textarea
        v-model="form.message"
        placeholder="Your Message"
        rows="4"
        size="lg"
      />
      <Button @click="submitForm" variant="primary" size="lg" fullWidth>
        Send Message
      </Button>
    </div>
  </Card>
</template>
```

### Project Card Example

```vue
<template>
  <Card variant="elevated" hover>
    <img
      src="/project-image.jpg"
      alt="Project"
      class="w-full h-48 object-cover rounded-t-lg"
    />
    <div class="p-6">
      <h3 class="text-xl font-semibold text-white mb-2">Project Title</h3>
      <p class="text-gray-400 mb-4">Project description goes here</p>
      <div class="flex flex-wrap gap-2">
        <Badge variant="primary">React</Badge>
        <Badge variant="success">Node.js</Badge>
        <Badge variant="info">MongoDB</Badge>
      </div>
    </div>
  </Card>
</template>
```

## Best Practices

1. **Consistent Sizing**: Sử dụng cùng size cho các elements trong cùng một section
2. **Color Consistency**: Sử dụng variants có sẵn thay vì custom colors
3. **Accessibility**: Luôn đảm bảo contrast ratio phù hợp
4. **Responsive**: Components đã được thiết kế responsive, không cần thêm CSS
5. **Performance**: Sử dụng v-model thay vì manual event handling khi có thể
