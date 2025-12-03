import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; email: string; password: string; role: string }) {
    const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new BadRequestException('Email already in use');
    const hashed = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: { name: data.name, email: data.email, password: hashed, role: data.role },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({ select: { id: true, name: true, email: true, role: true, createdAt: true }});
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email }});
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id }});
  }
}
