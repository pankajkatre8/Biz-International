// backend/src/flats/flats.service.ts
import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateFlatDto } from "./dto/create-flat.dto";

@Injectable()
export class FlatsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(projectId: string, dto: CreateFlatDto) {
    // validate project existence
    const project = await this.prisma.project.findUnique({ where: { id: projectId } });
    if (!project) throw new BadRequestException("Project not found");

    const flat = await this.prisma.flat.create({
      data: {
        projectId,
        floorNumber: dto.floorNumber,
        flatNumber: dto.flatNumber,
        flatType: dto.flatType,
        isRefuge: dto.isRefuge ?? false,
      },
    });

    return flat;
  }

  async bulkCreate(projectId: string, dtos: CreateFlatDto[]) {
    const project = await this.prisma.project.findUnique({ where: { id: projectId } });
    if (!project) throw new BadRequestException("Project not found");

    const payload = dtos.map((d) => ({
      projectId,
      floorNumber: d.floorNumber,
      flatNumber: d.flatNumber,
      flatType: d.flatType,
      isRefuge: d.isRefuge ?? false,
    }));

    // use createMany for speed (note: createMany doesn't return created records)
    await this.prisma.flat.createMany({
      data: payload,
      skipDuplicates: true,
    });

    // return the newly created flats for response (fetch by project and floorNumbers/flatNumbers)
    const flatNumbers = payload.map((p) => p.flatNumber);
    const flats = await this.prisma.flat.findMany({
      where: {
        projectId,
        flatNumber: { in: flatNumbers },
      },
    });

    return flats;
  }

  async findAll(projectId: string) {
    const project = await this.prisma.project.findUnique({ where: { id: projectId } });
    if (!project) throw new BadRequestException("Project not found");

    const flats = await this.prisma.flat.findMany({
      where: { projectId },
      include: {
        doors: true,
        frames: true,
        installationStatuses: true,
        installationErrors: true,
      },
      orderBy: { floorNumber: "asc" },
    });

    return flats;
  }

  async findOne(flatId: string) {
    const flat = await this.prisma.flat.findUnique({
      where: { id: flatId },
      include: {
        doors: true,
        frames: true,
        installationStatuses: true,
        installationErrors: true,
      },
    });

    if (!flat) throw new NotFoundException("Flat not found");
    return flat;
  }
}
