import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFloorDto } from './dto/create-floor.dto';

@Injectable()
export class FloorsService {
  constructor(private prisma: PrismaService) {}

  async create(projectId: string, dto: CreateFloorDto) {
    return this.prisma.floor.create({ data: { number: dto.number, projectId } });
  }

  listByProject(projectId: string) {
    return this.prisma.floor.findMany({ where: { projectId }, orderBy: { number: 'asc' } });
  }

  findOne(id: string) {
    return this.prisma.floor.findUnique({ where: { id }, include: { rooms: true } });
  }
}
