// src/tasks/tasks.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Prisma, TaskStatus } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTaskDto) {
    // doorFrameId is required in your schema — ensure it's present
    if (!dto.doorFrameId) {
      throw new BadRequestException('doorFrameId is required');
    }

    // Normalize/cast status to Prisma's TaskStatus
    const status = (dto.status as TaskStatus) ?? TaskStatus.PENDING;

    const data: Prisma.TaskCreateInput = {
      title: dto.title,
      status,
      // required relation — connect to existing DoorFrame
      doorFrame: { connect: { id: dto.doorFrameId } },
      // optional relation — only connect if provided
      ...(dto.assignedToId ? { assignedTo: { connect: { id: dto.assignedToId } } } : {}),
    };

    return this.prisma.task.create({ data });
  }

  findForDoorFrame(doorFrameId: string) {
    return this.prisma.task.findMany({
      where: { doorFrameId },
      include: { payments: true, assignedTo: true },
    });
  }

  update(id: string, patch: Partial<{ title: string; status: string; assignedToId: string }>) {
    const { assignedToId, ...rest } = patch as any;
    const data: any = { ...rest };

    // If status present, cast to TaskStatus so Prisma typing is satisfied
    if (rest.status !== undefined) {
      data.status = rest.status as TaskStatus;
    }

    if ('assignedToId' in patch) {
      if (assignedToId) data.assignedTo = { connect: { id: assignedToId } };
      else data.assignedTo = { disconnect: true };
    }

    return this.prisma.task.update({ where: { id }, data });
  }

  findOne(id: string) {
    return this.prisma.task.findUnique({
      where: { id },
      include: { payments: true, assignedTo: true },
    });
  }
}
