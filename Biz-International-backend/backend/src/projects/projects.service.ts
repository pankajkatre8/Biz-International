import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll(user: { id: string; role: string }) {
    if (user.role === 'SUPERVISOR') {
      return this.prisma.project.findMany({
        where: {
          projectSupervisors: {
            some: { supervisorId: user.id },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    return this.prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(dto: CreateProjectDto, userId: string) {
    return this.prisma.project.create({
      data: {
        name: dto.name,
        location: dto.location,
        managerId: userId,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.project.findUnique({
      where: { id },
      include: {
        floors: true,
        projectSupervisors: {
          include: { supervisor: true },
        },
      },
    });
  }

  async findFloors(projectId: string) {
    return this.prisma.floor.findMany({
      where: { projectId },
      orderBy: { number: 'asc' },
    });
  }

  async assignSupervisor(projectId: string, supervisorId: string) {
    return this.prisma.projectSupervisor.create({
      data: { projectId, supervisorId },
    });
  }

  async isSupervisorAssigned(projectId: string, supervisorId: string) {
    return !!(await this.prisma.projectSupervisor.findFirst({
      where: { projectId, supervisorId },
    }));
  }
}
