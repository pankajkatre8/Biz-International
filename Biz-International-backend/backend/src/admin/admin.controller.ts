import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('api/admin')
export class AdminController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('MANAGER','SUPERVISOR')
  @Get('overview')
  async overview() {
    const totalProjects = await this.prisma.project.count();
    const totalFloors = await this.prisma.floor.count();
    const totalRooms = await this.prisma.room.count();
    const totalDoorFrames = await this.prisma.doorFrame.count();
    const openTasks = await this.prisma.task.count({ where: { status: 'PENDING' } });
    const paymentsSummary = await this.prisma.payment.aggregate({
      _sum: { amount: true },
      _count: { id: true },
    });

    // Fallback approach: fetch tasks and sort in JS by whichever timestamp exists
    const tasks = await this.prisma.task.findMany({
      take: 20,
      include: { assignedTo: true },
    });

    const recentTasks = tasks
      .sort((a: any, b: any) => {
        const aTime = a.createdAt ?? a.created_at ?? null;
        const bTime = b.createdAt ?? b.created_at ?? null;
        if (!aTime || !bTime) return 0;
        return new Date(bTime).getTime() - new Date(aTime).getTime();
      })
      .slice(0, 10);

    return {
      totals: { totalProjects, totalFloors, totalRooms, totalDoorFrames, openTasks },
      paymentsSummary,
      recentTasks,
    };
  }
}
