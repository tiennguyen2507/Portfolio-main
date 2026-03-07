# Fonts Directory (Public)

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

Để tên cô dâu chú rể hiển thị đúng font chữ thư pháp như template:

1. Copy file `UNI_Chu_truyen_thong.ttf` vào thư mục này (`public/fonts/`)
2. Tên file phải chính xác: `UNI_Chu_truyen_thong.ttf`
3. Nếu không có file, trang vẫn chạy với font fallback: Baskerville, Times New Roman