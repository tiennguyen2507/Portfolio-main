import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const faviconSizes = [16, 32, 96, 192]
const publicDir = path.join(__dirname, '../public')
const faviconPath = path.join(__dirname, '../public/favicon.webp')

async function generateFavicons() {
  if (!fs.existsSync(faviconPath)) {
    throw new Error('Không tìm thấy favicon.webp')
  }

  for (const size of faviconSizes) {
    await sharp(faviconPath)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .webp({ quality: 90 })
      .toFile(path.join(publicDir, `favicon-${size}x${size}.webp`))
  }

  await sharp(faviconPath)
    .resize(32, 32, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'))
}

generateFavicons()
