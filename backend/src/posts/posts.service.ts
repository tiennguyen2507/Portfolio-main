import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePostDto) {
    const post = await this.prisma.post.create({
      data: {
        title: dto.title,
        description: dto.description,
        thumbnail: dto.thumbnail,
        category: dto.category,
        status: dto.status !== undefined ? dto.status : true,
      },
    });
    return this.mapPost(post);
  }

  async findAll(page = 1, limit = 10, search = '', category = '') {
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.category = category;
    }

    const [total, items] = await Promise.all([
      this.prisma.post.count({ where }),
      this.prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const nextPage = page * limit < total;
    const prePage = page > 1;

    return {
      data: items.map((item) => this.mapPost(item)),
      total,
      page,
      limit,
      nextPage,
      prePage,
    };
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });
    if (!post) {
      throw new NotFoundException('Không tìm thấy bài viết');
    }
    return this.mapPost(post);
  }

  async update(id: number, dto: UpdatePostDto) {
    await this.findOne(id);

    const updated = await this.prisma.post.update({
      where: { id },
      data: {
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.thumbnail !== undefined && { thumbnail: dto.thumbnail }),
        ...(dto.category !== undefined && { category: dto.category }),
        ...(dto.status !== undefined && { status: dto.status }),
      },
    });

    return this.mapPost(updated);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.post.delete({
      where: { id },
    });
    return { success: true, message: 'Xóa bài viết thành công' };
  }

  private mapPost(post: any) {
    return {
      ...post,
      _id: String(post.id),
    };
  }
}
