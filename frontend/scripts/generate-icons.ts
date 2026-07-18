/**
 * Script để generate PWA icons từ favicon.webp sử dụng Sharp
 *
 * Yêu cầu: npm install -D sharp tsx @types/node
 * Chạy: npm run generate:icons
 */

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Icon sizes cần thiết cho PWA
interface IconConfig {
  size: number
  name: string
}

const iconSizes: IconConfig[] = [
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 152, name: 'apple-touch-icon-152x152.png' },
  { size: 120, name: 'apple-touch-icon-120x120.png' },
  { size: 192, name: 'pwa-192x192.png' },
  { size: 512, name: 'pwa-512x512.png' },
]

const iconsDir = path.join(__dirname, '../public/icons')
const faviconPath = path.join(__dirname, '../public/favicon.webp')

async function generateIcons(): Promise<void> {
  try {
    // Kiểm tra favicon có tồn tại không
    if (!fs.existsSync(faviconPath)) {
      console.error('❌ Không tìm thấy favicon.webp tại:', faviconPath)
      console.log(
        '💡 Vui lòng đảm bảo file favicon.webp tồn tại trong thư mục public/'
      )
      process.exit(1)
    }

    // Tạo thư mục icons nếu chưa có
    if (!fs.existsSync(iconsDir)) {
      fs.mkdirSync(iconsDir, { recursive: true })
      console.log('✅ Đã tạo thư mục icons')
    }

    console.log('📱 Đang generate PWA icons...')
    console.log('')

    // Generate từng icon
    for (const { size, name } of iconSizes) {
      const outputPath = path.join(iconsDir, name)

      await sharp(faviconPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }, // Transparent background
        })
        .png()
        .toFile(outputPath)

      console.log(`✅ Đã tạo: ${name} (${size}x${size}px)`)
    }

    console.log('')
    console.log('🎉 Hoàn thành! Tất cả icons đã được tạo trong public/icons/')
    console.log('')
    console.log(
      '💡 Lưu ý: Nếu icon bị cắt hoặc không đẹp, hãy chỉnh sửa thủ công'
    )
    console.log(
      '   hoặc sử dụng tool online: https://realfavicongenerator.net/'
    )
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('sharp')) {
        console.error('❌ Chưa cài đặt sharp!')
        console.log('')
        console.log('💡 Chạy lệnh sau để cài đặt:')
        console.log('   npm install -D sharp')
        console.log('')
      } else {
        console.error('❌ Lỗi khi generate icons:', error.message)
      }
    } else {
      console.error('❌ Lỗi không xác định:', error)
    }
    process.exit(1)
  }
}

// Chạy function
generateIcons()
