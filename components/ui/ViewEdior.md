# ViewEditor Component

A reusable Vue component for displaying HTML content with responsive typography and accessibility features.

## Features

- **Responsive Typography**: Built-in prose styling with Tailwind CSS
- **Multiple Variants**: Support for different text color variants
- **SEO Friendly**: Supports schema.org markup
- **Accessibility**: Proper semantic HTML structure
- **Clean & Simple**: No external dependencies

## Props

| Prop          | Type    | Default   | Description                                    |
| ------------- | ------- | --------- | ---------------------------------------------- |
| `content`     | String  | required  | The HTML content to display                    |
| `variant`     | String  | 'default' | Text color variant: 'default', 'dark', 'light' |
| `customClass` | String  | ''        | Additional CSS classes                         |
| `itemprop`    | String  | ''        | Schema.org itemprop attribute                  |
| `truncate`    | Boolean | false     | Whether to truncate content                    |
| `maxLength`   | Number  | 150       | Maximum length when truncating                 |
| `stripHtml`   | Boolean | false     | Whether to strip HTML tags                     |

## Usage Examples

### Basic Usage

```vue
<template>
  <ViewEdior :content="htmlContent" />
</template>
```

### With Schema.org Markup

```vue
<template>
  <ViewEdior
    :content="blogData.description"
    itemprop="articleBody"
    custom-class="mb-8"
  />
</template>
```

### Different Variants

```vue
<template>
  <!-- Default variant -->
  <ViewEdior :content="content" variant="default" />

  <!-- Dark variant -->
  <ViewEdior :content="content" variant="dark" />

  <!-- Light variant -->
  <ViewEdior :content="content" variant="light" />
</template>
```

### Truncated Content for Lists

```vue
<template>
  <!-- Truncated content with HTML stripped -->
  <ViewEdior
    :content="post.description"
    :strip-html="true"
    :truncate="true"
    :max-length="120"
    custom-class="text-gray-400 mb-4 line-clamp-3 text-sm"
  />
</template>
```

## Styling

The component uses Tailwind CSS prose classes with custom styling for:

- Headings (h1-h6)
- Paragraphs and lists
- Blockquotes with orange accent
- Code blocks with syntax highlighting
- Links with hover effects
- Images with rounded corners
- Tables with proper borders
- Responsive typography

## Browser Support

- Modern browsers with ES6+ support
- Works with both client-side and server-side rendering
