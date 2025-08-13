# SEO Optimization Guide for Blog

## 🎯 Tối ưu SEO cho Google Search

### ✅ Đã được cấu hình:

#### 1. **Meta Tags tối ưu**

- **Title**: 50-60 ký tự, format: `[Tên bài viết] - Nguyễn Lê Đình Tiên`
- **Description**: 150-160 ký tự, tự động cắt và thêm "..." nếu quá dài
- **Keywords**: Bao gồm từ khóa chính và các từ khóa liên quan

#### 2. **Open Graph Tags**

- `og:title`, `og:description`, `og:image` cho Facebook/LinkedIn
- `og:site_name`: nguyenledinhtien.io.vn
- `og:locale`: vi_VN

#### 3. **Twitter Card Tags**

- `twitter:card`: summary_large_image
- `twitter:title`, `twitter:description`, `twitter:image`

#### 4. **Structured Data (JSON-LD)**

- BlogPosting schema với đầy đủ thông tin
- BreadcrumbList schema cho navigation
- Author và Publisher information

#### 5. **Technical SEO**

- Sitemap.xml với priority cao cho blogs
- Robots.txt đã cấu hình
- Canonical URLs
- Meta robots: index, follow

### 🔧 Cần làm thêm:

#### 1. **Google Search Console**

```bash
# Thêm vào useHead() trong pages/blogs/[id].vue
{
  name: 'google-site-verification',
  content: 'YOUR_VERIFICATION_CODE', // Lấy từ Google Search Console
}
```

#### 2. **Google Analytics**

```bash
# Thêm vào nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID',
          async: true
        },
        {
          children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `
        }
      ]
    }
  }
})
```

#### 3. **Performance Optimization**

- Lazy loading cho images
- Preload critical resources
- Optimize images (WebP format)
- Minify CSS/JS

### 📊 Kiểm tra SEO:

#### 1. **Google Search Console**

- Submit sitemap: `https://nguyenledinhtien.io.vn/sitemap.xml`
- Monitor indexing status
- Check for errors

#### 2. **Google PageSpeed Insights**

- Test performance
- Optimize Core Web Vitals

#### 3. **Schema.org Validator**

- Validate JSON-LD structured data
- Check for errors

#### 4. **Social Media Testing**

- Facebook Sharing Debugger
- Twitter Card Validator
- LinkedIn Post Inspector

### 🎨 Rich Snippets Optimization:

#### 1. **Article Schema**

```json
{
  "@type": "Article",
  "headline": "Tên bài viết",
  "description": "Mô tả ngắn",
  "image": "URL hình ảnh",
  "author": {
    "@type": "Person",
    "name": "Nguyễn Lê Đình Tiên"
  },
  "publisher": {
    "@type": "Organization",
    "name": "nguyenledinhtien.io.vn"
  },
  "datePublished": "2024-01-01T00:00:00Z",
  "dateModified": "2024-01-01T00:00:00Z"
}
```

#### 2. **Breadcrumb Schema**

```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Trang chủ",
      "item": "https://nguyenledinhtien.io.vn"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://nguyenledinhtien.io.vn/blogs"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Tên bài viết",
      "item": "https://nguyenledinhtien.io.vn/blogs/id"
    }
  ]
}
```

### 📈 Monitoring:

#### 1. **Google Analytics Events**

```javascript
// Track blog views
gtag('event', 'blog_view', {
  blog_title: blogData.value.title,
  blog_id: blogData.value._id,
})
```

#### 2. **Search Performance**

- Monitor click-through rate (CTR)
- Track average position
- Analyze search queries

### 🚀 Best Practices:

1. **Content Quality**
   - Viết nội dung chất lượng, độc đáo
   - Sử dụng heading tags (H1, H2, H3) hợp lý
   - Thêm internal links
   - Optimize images với alt text

2. **Technical SEO**
   - Fast loading speed
   - Mobile-friendly design
   - Secure HTTPS
   - Clean URL structure

3. **User Experience**
   - Easy navigation
   - Clear call-to-actions
   - Readable typography
   - Fast search functionality

### 🔍 Testing Tools:

- **Google Search Console**: Monitor indexing
- **Google PageSpeed Insights**: Performance
- **Schema.org Validator**: Structured data
- **Facebook Sharing Debugger**: Social media
- **Twitter Card Validator**: Twitter preview
- **LinkedIn Post Inspector**: LinkedIn preview
- **GTmetrix**: Performance analysis
- **Screaming Frog**: Technical SEO audit

### 📝 Checklist trước khi publish:

- [ ] Title tag tối ưu (50-60 ký tự)
- [ ] Meta description tối ưu (150-160 ký tự)
- [ ] Images có alt text
- [ ] Internal links
- [ ] Structured data valid
- [ ] Mobile responsive
- [ ] Fast loading (< 3s)
- [ ] Social media preview đẹp
- [ ] Canonical URL
- [ ] Robots meta tag
