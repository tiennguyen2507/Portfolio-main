# 📱 Hướng dẫn PWA Setup cho iOS

## 🎯 Tổng quan về PWA

### PWA là gì?

**Progressive Web App (PWA)** là ứng dụng web có thể:

- ✅ Cài đặt như app native trên iOS/Android
- ✅ Chạy offline (không cần internet)
- ✅ Có icon trên màn hình chính
- ✅ Mở fullscreen (không có thanh địa chỉ trình duyệt)
- ✅ Hoạt động nhanh như app native

### Các thành phần chính của PWA

#### 1. **Web App Manifest** (`manifest.json`)

**Mục đích**: Mô tả app cho browser và OS

**Chứa thông tin gì?**

- Tên app, mô tả
- Icons (các kích thước khác nhau)
- Theme color (màu chủ đạo)
- Display mode (standalone, fullscreen, etc.)
- Start URL (trang mở đầu khi mở app)

**Ví dụ trong code:**

```typescript
manifest: {
  name: 'Nguyễn Lê Đình Tiên Portfolio',
  short_name: 'Tiên Portfolio',
  theme_color: '#f97316',
  display: 'standalone', // Mở như app, không có browser UI
  icons: [
    { src: '/icons/pwa-192x192.png', sizes: '192x192' },
    { src: '/icons/pwa-512x512.png', sizes: '512x512' },
  ]
}
```

**Tại sao cần?**

- iOS/Android đọc file này để biết cách hiển thị app
- Quyết định icon nào dùng, màu gì, mở như thế nào

---

#### 2. **Service Worker**

**Mục đích**: Chạy nền, quản lý cache và offline

**Service Worker là gì?**

- JavaScript chạy **độc lập** với trang web
- Chạy trong **background** (ngay cả khi đóng tab)
- Có thể **intercept** (chặn) network requests

**Chức năng chính:**

**a) Caching (Lưu trữ)**

```javascript
// Khi user truy cập lần đầu
1. Service Worker tải HTML, CSS, JS, images
2. Lưu vào Cache Storage (bộ nhớ trình duyệt)
3. Lần sau truy cập → lấy từ cache → nhanh hơn
```

**b) Offline Support**

```javascript
// Khi mất internet
1. Service Worker intercept request
2. Kiểm tra cache có dữ liệu không?
3. Nếu có → trả về từ cache
4. Nếu không → hiển thị offline page
```

**c) Caching Strategies (Chiến lược cache)**

Trong code đã setup 4 strategies:

**1. CacheFirst** (cho Fonts, Images)

```
Request → Kiểm tra cache → Có? → Trả cache
                          → Không? → Fetch network → Lưu cache
```

- **Dùng khi**: Tài nguyên ít thay đổi (fonts, images)
- **Ưu điểm**: Nhanh, tiết kiệm bandwidth

**2. StaleWhileRevalidate** (cho JS, CSS)

```
Request → Trả cache ngay (nếu có)
        → Đồng thời fetch network để update cache
```

- **Dùng khi**: Cần hiển thị nhanh nhưng vẫn update
- **Ưu điểm**: Cân bằng giữa tốc độ và tính mới

**3. NetworkFirst** (cho API calls)

```
Request → Thử network trước
        → Thành công? → Trả kết quả + lưu cache
        → Thất bại? → Trả cache (nếu có)
```

- **Dùng khi**: Cần dữ liệu mới nhất (API)
- **Ưu điểm**: Luôn có dữ liệu mới, nhưng vẫn offline được

**4. NetworkOnly** (không dùng trong config này)

```
Request → Chỉ dùng network, không cache
```

- **Dùng khi**: Dữ liệu nhạy cảm, không muốn cache

**Ví dụ trong code:**

```typescript
workbox: {
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
      handler: 'CacheFirst', // Images dùng CacheFirst
      options: {
        cacheName: 'images-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 ngày
        },
      },
    },
  ]
}
```

---

#### 3. **Meta Tags cho iOS**

**Mục đích**: Hướng dẫn iOS cách hiển thị app

**Các meta tags quan trọng:**

**a) `apple-mobile-web-app-capable`**

```html
<meta name="apple-mobile-web-app-capable" content="yes" />
```

- **Ý nghĩa**: Cho phép app chạy fullscreen (không có Safari UI)
- **Không có**: App mở trong Safari bình thường
- **Có**: App mở như native app, không có thanh địa chỉ

**b) `apple-mobile-web-app-status-bar-style`**

```html
<meta
  name="apple-mobile-web-app-status-bar-style"
  content="black-translucent"
/>
```

- **Ý nghĩa**: Màu thanh trạng thái (status bar) trên iOS
- **Options**:
  - `default`: Trắng
  - `black`: Đen
  - `black-translucent`: Đen trong suốt (overlay lên content)

**c) `apple-mobile-web-app-title`**

```html
<meta name="apple-mobile-web-app-title" content="Nguyễn Lê Đình Tiên" />
```

- **Ý nghĩa**: Tên hiển thị dưới icon trên màn hình chính
- **Lưu ý**: Nên ngắn gọn (tối đa 12 ký tự)

**d) `apple-touch-icon`**

```html
<link
  rel="apple-touch-icon"
  sizes="180x180"
  href="/icons/apple-touch-icon.png"
/>
```

- **Ý nghĩa**: Icon hiển thị trên màn hình chính iOS
- **Kích thước**: 180x180px (bắt buộc)
- **Lưu ý**: iOS tự động thêm hiệu ứng (rounded corners, shadow)

---

## 🔧 Cấu hình đã setup

### 1. Module `@vite-pwa/nuxt`

- ✅ Đã cài đặt và thêm vào `modules`
- ✅ Tự động tạo manifest.json và service worker khi build

### 2. Manifest Configuration

```typescript
manifest: {
  name: 'Nguyễn Lê Đình Tiên Portfolio',
  short_name: 'Tiên Portfolio',
  theme_color: '#f97316',
  display: 'standalone', // Mở như app
  icons: [
    { src: '/icons/pwa-192x192.png', sizes: '192x192' },
    { src: '/icons/pwa-512x512.png', sizes: '512x512' },
  ]
}
```

### 3. Service Worker với Workbox

- ✅ Cache fonts (1 năm)
- ✅ Cache images (30 ngày)
- ✅ Cache static resources (JS, CSS)
- ✅ Network-first cho API calls

### 4. Meta Tags cho iOS

- ✅ `apple-mobile-web-app-capable`
- ✅ `apple-mobile-web-app-status-bar-style`
- ✅ `apple-mobile-web-app-title`
- ✅ `apple-touch-icon` links

---

## 📋 Checklist để PWA hoạt động

### ✅ Đã hoàn thành

- [x] Cài đặt `@vite-pwa/nuxt`
- [x] Cấu hình manifest
- [x] Cấu hình service worker
- [x] Thêm meta tags cho iOS
- [x] Tạo thư mục icons

### ⏳ Cần làm tiếp

#### 1. Tạo Icons

**Các icon cần tạo:**

- `public/icons/apple-touch-icon.png` (180x180px)
- `public/icons/apple-touch-icon-152x152.png` (152x152px)
- `public/icons/apple-touch-icon-120x120.png` (120x120px)
- `public/icons/pwa-192x192.png` (192x192px)
- `public/icons/pwa-512x512.png` (512x512px)

**Cách tạo:**

**Option 1: Sử dụng Sharp (Tự động)**

```bash
# Cài đặt sharp
yarn add -D sharp

# Generate icons
yarn generate:icons
```

**Option 2: Sử dụng Online Tool (Khuyến nghị)**

1. Truy cập: https://realfavicongenerator.net/
2. Upload `public/favicon.webp` hoặc logo của bạn
3. Download và đặt vào `public/icons/`

**Option 3: Sử dụng ImageMagick**

```bash
brew install imagemagick
convert public/favicon.webp -resize 180x180 public/icons/apple-touch-icon.png
# ... (tương tự cho các sizes khác)
```

#### 2. Deploy lên HTTPS

**⚠️ QUAN TRỌNG**: PWA chỉ hoạt động trên HTTPS (hoặc localhost)

**Lý do:**

- Service Worker yêu cầu secure context
- iOS/Android không cho phép PWA trên HTTP

**Cách deploy:**

- Sử dụng hosting có HTTPS (Vercel, Netlify, Cloudflare Pages)
- Hoặc setup SSL certificate cho server

#### 3. Test trên iOS

**Cách test:**

1. Deploy lên HTTPS
2. Mở Safari trên iPhone/iPad
3. Truy cập website
4. Tap nút Share → "Thêm vào Màn hình chính"
5. Mở app từ màn hình chính

**Kiểm tra:**

- ✅ Icon hiển thị đúng
- ✅ App mở fullscreen (không có Safari UI)
- ✅ Status bar có màu đúng
- ✅ Tên app hiển thị đúng

---

## 🧪 Testing PWA

### Test trên Development (localhost)

```bash
yarn dev
```

- PWA hoạt động trên localhost (không cần HTTPS)
- Service Worker sẽ được register
- Có thể test offline mode

### Test trên Production

1. Build project:

```bash
yarn build
```

2. Preview:

```bash
yarn preview
```

3. Deploy lên HTTPS server

4. Test trên iOS:
   - Mở Safari
   - Truy cập website
   - Thêm vào màn hình chính
   - Test offline mode (tắt WiFi)

---

## 🐛 Troubleshooting

### Icon không hiển thị

- ✅ Kiểm tra file có tồn tại trong `public/icons/`
- ✅ Kiểm tra kích thước chính xác
- ✅ Clear cache và reload

### Service Worker không register

- ✅ Kiểm tra console có lỗi không
- ✅ Đảm bảo đang dùng HTTPS (hoặc localhost)
- ✅ Kiểm tra `devOptions.enabled: true` trong config

### App không mở fullscreen trên iOS

- ✅ Kiểm tra meta tag `apple-mobile-web-app-capable`
- ✅ Đảm bảo đã thêm vào màn hình chính (không phải bookmark)
- ✅ Xóa và thêm lại vào màn hình chính

### Offline không hoạt động

- ✅ Kiểm tra service worker đã register chưa
- ✅ Kiểm tra cache strategy trong workbox config
- ✅ Test với DevTools → Application → Service Workers

---

## 📚 Tài liệu tham khảo

- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [iOS PWA Guide](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox)
- [@vite-pwa/nuxt](https://vite-pwa-org.netlify.app/frameworks/nuxt.html)

---

## 🎉 Kết luận

Sau khi hoàn thành các bước trên, PWA sẽ:

- ✅ Có thể cài đặt trên iOS
- ✅ Chạy offline
- ✅ Có icon đẹp trên màn hình chính
- ✅ Mở fullscreen như app native
- ✅ Tải nhanh nhờ caching

**Lưu ý cuối**: Nhớ deploy lên HTTPS để PWA hoạt động đầy đủ!
