import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDoorFrameDto } from '../doorframe/dto/create-doorframe.dto';

@Injectable()
export class DoorFramesService {
  constructor(private prisma: PrismaService) {}

  create(roomId: string, dto: CreateDoorFrameDto) {
    return this.prisma.doorFrame.create({
      data: { roomId, notes: dto.notes || '', status: dto.status || 'PENDING' },
    });
  }

  listByRoom(roomId: string) {
    return this.prisma.doorFrame.findMany({ where: { roomId }, include: { tasks: true } });
  }

  update(id: string, patch: { status?: string; notes?: string }) {
    return this.prisma.doorFrame.update({ where: { id }, data: patch });
  }

  findOne(id: string) {
    return this.prisma.doorFrame.findUnique({ where: { id }, include: { tasks: true } });
  }
}
