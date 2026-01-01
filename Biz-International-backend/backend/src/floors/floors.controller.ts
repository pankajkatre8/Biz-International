import { Controller, Post, Body, Param, UseGuards, Get } from '@nestjs/common';
import { FloorsService } from './floors.service';
import { CreateFloorDto } from './dto/create-floor.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('projects/:projectId/floors')
export class FloorsController {
  constructor(private svc: FloorsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('MANAGER', 'SUPERVISOR')
  @Post()
  create(@Param('projectId') projectId: string, @Body() dto: CreateFloorDto) {
    return this.svc.create(projectId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  list(@Param('projectId') projectId: string) {
    return this.svc.listByProject(projectId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':floorId')
  get(@Param('floorId') floorId: string) {
    return this.svc.findOne(floorId);
  }
}
