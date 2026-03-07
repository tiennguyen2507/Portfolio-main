# Fonts Directory (Public)

## Trạng thái font (đã kiểm tra)

| Font | File cần có | Dùng cho | Trạng thái |
|------|--------------|----------|------------|
| **UNI Chu truyen thong** | `UNI_Chu_truyen_thong.ttf` | Wedding – tên cô dâu chú rể | ✅ Có trong thư mục |
| **UTM Hanzel** | `UTM-Hanzel.ttf` | Logo, font phụ (_fonts.scss, app.vue) | ✅ Có trong thư mục |

**Font khác (không cần file local):** Inter, Pattaya load từ Google Fonts; Times New Roman, Baskerville là font hệ thống.

---

## UTM Hanzel Font

Để sử dụng font UTM Hanzel cho logo:

1. Copy file `UTM-Hanzel.ttf` vào thư mục này (`public/fonts/`)
2. Đảm bảo tên file là chính xác: `UTM-Hanzel.ttf`
3. Font sẽ được load từ `/fonts/UTM-Hanzel.ttf`

### Cách test:
- Mở browser console (F12)
- Kiểm tra Network tab xem font có load không
- Nếu font không load, kiểm tra đường dẫn file

### Fallback:
- Nếu font không load được, sẽ sử dụng Times New Roman
- Inline style đã được thêm để đảm bảo font được áp dụng

## Wedding (Mẫu thiệp Long Phụng Lam)

Để tên cô dâu chú rể hiển thị đúng font chữ thư pháp **UNI Chu truyen thong**:

1. **Tải font** (nếu chưa có): ví dụ [wfonts.com – UNI Chu truyen thong](https://www.wfonts.com/font/uni-chu-truyen-thong) — tải file .ttf.
2. **Đặt file** vào thư mục này: `public/fonts/`
3. **Tên file bắt buộc đúng:** `UNI_Chu_truyen_thong.ttf` (có dấu gạch dưới, đuôi .ttf)
4. Nếu không có file, trang vẫn chạy với font fallback: **Times New Roman**
5. Kiểm tra: F12 → Network → reload trang, tìm request `/fonts/UNI_Chu_truyen_thong.ttf` (status 200 = đã load)