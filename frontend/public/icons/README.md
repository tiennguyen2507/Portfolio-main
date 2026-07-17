# PWA Icons Directory

Thư mục này chứa các icon cần thiết cho PWA (Progressive Web App).

## Icons cần thiết

Bạn cần tạo các icon sau với kích thước chính xác:

### iOS Icons

- `apple-touch-icon.png` - 180x180px (cho iOS)
- `apple-touch-icon-152x152.png` - 152x152px (cho iPad)
- `apple-touch-icon-120x120.png` - 120x120px (cho iPhone nhỏ)

### PWA Icons

- `pwa-192x192.png` - 192x192px (cho Android và PWA)
- `pwa-512x512.png` - 512x512px (cho Android và PWA)

## Cách tạo icons

### Option 1: Sử dụng Online Tool (Khuyến nghị)

1. Truy cập: https://realfavicongenerator.net/
2. Upload file `favicon.webp` hoặc logo của bạn
3. Chọn các options cho iOS và Android
4. Download và đặt tất cả icons vào thư mục này

### Option 2: Sử dụng ImageMagick

```bash
# Cài đặt ImageMagick (macOS)
brew install imagemagick

# Convert favicon.webp thành các sizes
convert public/favicon.webp -resize 180x180 public/icons/apple-touch-icon.png
convert public/favicon.webp -resize 152x152 public/icons/apple-touch-icon-152x152.png
convert public/favicon.webp -resize 120x120 public/icons/apple-touch-icon-120x120.png
convert public/favicon.webp -resize 192x192 public/icons/pwa-192x192.png
convert public/favicon.webp -resize 512x512 public/icons/pwa-512x512.png
```

### Option 3: Sử dụng Sharp (Node.js)

```bash
yarn add -D sharp
node scripts/generate-icons-sharp.js
```

## Lưu ý

- Icons phải là file PNG
- Nền nên là transparent hoặc solid color
- Icon nên có padding để tránh bị cắt khi iOS thêm hiệu ứng
- Kích thước phải chính xác như yêu cầu
