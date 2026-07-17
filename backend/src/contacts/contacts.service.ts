import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto, UpdateContactDto } from './dto/contact.dto';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateContactDto) {
    const contact = await this.prisma.contact.create({
      data: {
        name: dto.name,
        email: dto.email,
        message: dto.message,
        status: false,
      },
    });
    return this.mapContact(contact);
  }

  async findAll(page = 1, limit = 10, search = '') {
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [total, items] = await Promise.all([
      this.prisma.contact.count({ where }),
      this.prisma.contact.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const nextPage = page * limit < total;
    const prePage = page > 1;

    return {
      data: items.map((item) => this.mapContact(item)),
      total,
      page,
      limit,
      nextPage,
      prePage,
    };
  }

  async findOne(id: number) {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
    });
    if (!contact) {
      throw new NotFoundException('Không tìm thấy tin nhắn liên hệ');
    }
    return this.mapContact(contact);
  }

  async update(id: number, dto: UpdateContactDto) {
    await this.findOne(id);

    const updated = await this.prisma.contact.update({
      where: { id },
      data: {
        status: dto.status,
      },
    });

    return this.mapContact(updated);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.contact.delete({
      where: { id },
    });
    return { success: true, message: 'Xóa tin nhắn liên hệ thành công' };
  }

  private mapContact(contact: any) {
    return {
      ...contact,
      _id: String(contact.id),
    };
  }
}
