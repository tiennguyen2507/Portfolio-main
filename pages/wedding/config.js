// ============================================
// WEDDING CONFIGURATION
// ============================================
// File này chứa tất cả thông tin và ảnh cho trang wedding
// Chỉ cần thay đổi các giá trị trong file này để cập nhật trang
//
// HƯỚNG DẪN THAY ĐỔI ẢNH:
// 1. Upload ảnh của bạn lên thư mục assets/images/wedding/ (tạo thư mục nếu chưa có)
// 2. Thay đổi đường dẫn ảnh từ URL Unsplash sang đường dẫn local:
//    Ví dụ: image: '~/assets/images/wedding/bride.jpg'
// 3. Hoặc giữ nguyên URL từ Unsplash/Pexels nếu muốn dùng ảnh online
// 4. Định dạng ảnh khuyến nghị: WebP, JPG, PNG
// 5. Kích thước ảnh khuyến nghị:
//    - Hero image: 1920x1080px
//    - Avatar (cô dâu/chú rể): 800x800px
//    - Gallery: 800x800px
// ============================================

export const weddingConfig = {
  // Thông tin cô dâu chú rể
  couple: {
    bride: {
      name: 'Phan Thị Hạnh',
      nameEn: 'Hanh Phan',
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
      description: 'Cô gái xinh đẹp và dịu dàng',
      social: {
        facebook: '#',
        instagram: '#',
      },
    },
    groom: {
      name: 'Nguyễn Lê Đình Tiên',
      nameEn: 'Tien Nguyen',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      description: 'Chàng trai ấm áp và chân thành',
      social: {
        facebook: '#',
        instagram: '#',
      },
    },
  },

  // Ngày cưới
  weddingDate: {
    ceremony: {
      date: '2026-01-11',
      time: '09:00',
      name: 'Lễ Thành Hôn',
      nameEn: 'Wedding Ceremony',
      location: 'Nhà thờ Đức Bà',
      address: '01 Công xã Paris, Bến Nghé, Quận 1, TP.HCM',
      mapUrl: 'https://goo.gl/maps/example',
    },
    reception: {
      date: '2026-01-11',
      time: '18:00',
      name: 'Tiệc Cưới',
      nameEn: 'Reception',
      location: 'Khách sạn Grand',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      mapUrl: 'https://goo.gl/maps/example',
    },
  },

  // Ảnh Hero
  heroImage:
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80',

  // Gallery ảnh
  gallery: [
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
  ],

  // Thông tin liên hệ
  contact: {
    phone: '+84 123 456 789',
    email: 'wedding@example.com',
    message:
      'Chúng tôi rất vui được chia sẻ ngày trọng đại này cùng bạn. Hãy đến chung vui với chúng tôi nhé!',
  },

  // Màu sắc chủ đạo (optional)
  theme: {
    primary: '#f97316', // Orange-500 (màu chủ đạo)
    secondary: '#1f2937', // Gray-800 (nền tối)
    accent: '#ea580c', // Orange-600 (accent đậm)
  },
}
