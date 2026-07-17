import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCommentDto) {
    const comment = await this.prisma.comment.create({
      data: {
        avatar: dto.avatar,
        name: dto.name,
        relationship: dto.relationship,
        comment: dto.comment,
        status: dto.status !== undefined ? dto.status : true,
      },
    });
    return this.mapComment(comment);
  }

  async findAll(page = 1, limit = 4, search = '') {
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { relationship: { contains: search, mode: 'insensitive' } },
        { comment: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [total, items] = await Promise.all([
      this.prisma.comment.count({ where }),
      this.prisma.comment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const nextPage = page * limit < total;
    const prePage = page > 1;

    return {
      data: items.map((item) => this.mapComment(item)),
      total,
      page,
      limit,
      nextPage,
      prePage,
    };
  }

  async findOne(id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });
    if (!comment) {
      throw new NotFoundException('Không tìm thấy nhận xét');
    }
    return this.mapComment(comment);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.comment.delete({
      where: { id },
    });
    return { success: true, message: 'Xóa nhận xét thành công' };
  }

  private mapComment(comment: any) {
    return {
      ...comment,
      _id: String(comment.id),
    };
  }
}
