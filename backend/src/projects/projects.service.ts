import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProjectDto, creatorEmail: string) {
    const project = await this.prisma.project.create({
      data: {
        title: dto.title,
        description: dto.description,
        thumbnail: dto.thumbnail,
        skill: dto.skill || [],
        status: dto.status !== undefined ? dto.status : true,
        createdBy: creatorEmail,
      },
    });
    return this.mapProject(project);
  }

  async findAll(page = 1, limit = 6, search = '') {
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [total, items] = await Promise.all([
      this.prisma.project.count({ where }),
      this.prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const nextPage = page * limit < total;
    const prePage = page > 1;

    return {
      data: items.map((item) => this.mapProject(item)),
      total,
      page,
      limit,
      nextPage,
      prePage,
    };
  }

  async findOne(id: number) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });
    if (!project) {
      throw new NotFoundException('Không tìm thấy dự án');
    }
    return this.mapProject(project);
  }

  async update(id: number, dto: UpdateProjectDto) {
    await this.findOne(id);

    const updated = await this.prisma.project.update({
      where: { id },
      data: {
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.thumbnail !== undefined && { thumbnail: dto.thumbnail }),
        ...(dto.skill !== undefined && { skill: dto.skill }),
        ...(dto.status !== undefined && { status: dto.status }),
      },
    });

    return this.mapProject(updated);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.project.delete({
      where: { id },
    });
    return { success: true, message: 'Xóa dự án thành công' };
  }

  private mapProject(project: any) {
    return {
      ...project,
      _id: String(project.id),
    };
  }
}
