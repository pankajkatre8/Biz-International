import {
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  // 🔹 Resolve floorId
  private async getFloorId(projectId: string, floor: number) {
    const f = await this.prisma.floor.findFirst({
      where: { projectId, number: floor },
    });
    if (!f) throw new Error(`Floor ${floor} not found`);
    return f.id;
  }

  // 🔹 CREATE SINGLE ROOM
  async create(projectId: string, entry: CreateRoomDto, user: any) {
    const floorId = await this.getFloorId(projectId, entry.floor);

    return this.prisma.room.create({
      data: {
        floorId,
        roomNumber: entry.roomNumber,
        roomType: entry.roomType,
        length: entry.length ? Number(entry.length) : null,
        width: entry.width ? Number(entry.width) : null,
        doors: entry.doors,
        windows: entry.windows,
        notes: entry.notes,
        name: entry.roomNumber,
        createdById: user.id,
        editableUntil: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });
  }

  // 🔹 BULK CREATE (Excel / Manual)
  async bulkCreate(projectId: string, entries: CreateRoomDto[], user: any) {
    const resolved = await Promise.all(
      entries.map(async (e) => ({
        floorId: await this.getFloorId(projectId, e.floor),
        entry: e,
      })),
    );

    const ops = resolved.map(({ floorId, entry }) =>
      this.prisma.room.create({
        data: {
          floorId,
          roomNumber: entry.roomNumber,
          roomType: entry.roomType,
          length: entry.length ? Number(entry.length) : null,
          width: entry.width ? Number(entry.width) : null,
          doors: entry.doors,
          windows: entry.windows,
          notes: entry.notes,
          name: entry.roomNumber,
          createdById: user.id,
          editableUntil: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      }),
    );

    return this.prisma.$transaction(ops);
  }

  // 🔹 CHECK DUPLICATES (USED BY UI)
  async checkDuplicates(projectId: string, entries: CreateRoomDto[]) {
    const results: { roomNumber: string; exists: boolean }[] = [];

    for (const e of entries) {
      const floorId = await this.getFloorId(projectId, e.floor);
      const exists = await this.prisma.room.findFirst({
        where: { floorId, roomNumber: e.roomNumber },
      });
      results.push({ roomNumber: e.roomNumber, exists: !!exists });
    }

    return results;
  }

  // 🔹 LIST ROOMS BY PROJECT
  async listByProject(projectId: string, floor?: string) {
    return this.prisma.room.findMany({
      where: {
        floor: {
          projectId,
          ...(floor ? { number: Number(floor) } : {}),
        },
      },
      orderBy: { roomNumber: 'asc' },
    });
  }

  // 🔹 UPDATE (24H RULE)
async updateRoom(roomId: string, patch: any, user: any) {
  const room = await this.prisma.room.findUnique({
    where: { id: roomId },
  });

  if (!room) {
    throw new ForbiddenException('Room not found');
  }

  if (user.role === 'SUPERVISOR') {
    if (new Date() > room.editableUntil) {
      throw new ForbiddenException('Edit window expired');
    }
    if (room.createdById !== user.id) {
      throw new ForbiddenException('Not your entry');
    }
  }

  return this.prisma.room.update({
    where: { id: roomId },
    data: patch,
  });
}


  // 🔹 OWNER OVERRIDE
  async reopenEdit(roomId: string) {
    return this.prisma.room.update({
      where: { id: roomId },
      data: {
        editableUntil: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });
  }
}
