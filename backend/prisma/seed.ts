import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
if (!connectionString) {
  console.error('❌ Lỗi: Không tìm thấy DIRECT_URL hoặc DATABASE_URL trong file .env');
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Seed Default User (Admin)
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const existingUser = await prisma.user.findUnique({
    where: { email: 'admin@gmail.com' },
  });

  if (!existingUser) {
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@gmail.com',
        password: hashedPassword,
        name: 'Nguyễn Lê Đình Tiên',
      },
    });
    console.log(`✅ Seeded admin user: ${adminUser.email}`);
  } else {
    console.log('ℹ️ Admin user already exists, skipping.');
  }

  // 2. Seed Projects if empty
  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    const projects = [
      {
        title: 'Nguyễn Lê Đình Tiên - Portfolio Website',
        description: 'Trang web portfolio giới thiệu bản thân được xây dựng bằng Nuxt 3, Vue.js, Tailwind CSS ở frontend và NestJS, Prisma, PostgreSQL ở backend.',
        thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800',
        skill: ['Nuxt 3', 'Vue.js', 'Tailwind CSS', 'NestJS', 'Prisma', 'PostgreSQL'],
        status: true,
        createdBy: 'admin@gmail.com',
      },
      {
        title: 'Hệ thống Quản lý Bán hàng E-Commerce',
        description: 'Hệ thống website bán hàng điện tử hoàn chỉnh tích hợp thanh toán trực tuyến, quản lý giỏ hàng, quản lý đơn hàng cho admin.',
        thumbnail: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
        skill: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux Toolkit'],
        status: true,
        createdBy: 'admin@gmail.com',
      },
      {
        title: 'Ứng dụng Trò chuyện Real-time Chat',
        description: 'Ứng dụng chat trực tuyến đa phòng, hỗ trợ gửi tin nhắn thời gian thực, cập nhật trạng thái online/offline của thành viên.',
        thumbnail: 'https://images.unsplash.com/photo-1611605698335-8b15d27e03f2?w=800',
        skill: ['Vue 3', 'Socket.io', 'Express', 'Redis', 'Tailwind CSS'],
        status: true,
        createdBy: 'admin@gmail.com',
      }
    ];

    for (const project of projects) {
      await prisma.project.create({ data: project });
    }
    console.log(`✅ Seeded ${projects.length} projects`);
  } else {
    console.log('ℹ️ Projects already exist in database, skipping.');
  }

  // 3. Seed Posts (Blogs) if empty
  const postCount = await prisma.post.count();
  if (postCount === 0) {
    const posts = [
      {
        title: 'Hướng dẫn tối ưu hóa hiệu năng Nuxt 3 và Vite',
        description: 'Tìm hiểu cách tối ưu hóa bundle size, sử dụng dynamic imports và cấu hình tối ưu cho Nuxt 3 giúp tăng điểm lighthouse đáng kể.',
        thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
        category: 'my-blog',
        status: true,
      },
      {
        title: 'Tại sao nên sử dụng NestJS làm backend cho dự án lớn?',
        description: 'NestJS cung cấp một kiến trúc chuẩn hóa (Modules, Providers, Controllers), hỗ trợ TypeScript mạnh mẽ và giúp việc làm việc nhóm trở nên đồng bộ.',
        thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
        category: 'my-blog',
        status: true,
      }
    ];

    for (const post of posts) {
      await prisma.post.create({ data: post });
    }
    console.log(`✅ Seeded ${posts.length} posts`);
  } else {
    console.log('ℹ️ Posts already exist in database, skipping.');
  }

  // 4. Seed Comments if empty
  const commentCount = await prisma.comment.count();
  if (commentCount === 0) {
    const comments = [
      {
        name: 'Nguyễn Văn A',
        relationship: 'Khách hàng cũ',
        comment: 'Anh Tiên làm việc rất chuyên nghiệp, code sạch sẽ và bàn giao đúng hẹn. Rất hài lòng!',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
        status: true,
      },
      {
        name: 'Trần Thị B',
        relationship: 'Tech Lead tại Company X',
        comment: 'Một lập trình viên Fullstack có tư duy tốt, chủ động đề xuất các giải pháp kỹ thuật tối ưu cho dự án.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
        status: true,
      }
    ];

    for (const comment of comments) {
      await prisma.comment.create({ data: comment });
    }
    console.log(`✅ Seeded ${comments.length} comments`);
  } else {
    console.log('ℹ️ Comments already exist in database, skipping.');
  }

  console.log('🌱 Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
