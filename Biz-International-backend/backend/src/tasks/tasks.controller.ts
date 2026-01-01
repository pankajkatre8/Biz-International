import { Controller, Post, Body, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('api/tasks')
export class TasksController {
  constructor(private svc: TasksService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('MANAGER','SUPERVISOR')
  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.svc.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  get(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('doorframe/:doorFrameId')
  listForDoorFrame(@Param('doorFrameId') doorFrameId: string) {
    return this.svc.findForDoorFrame(doorFrameId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('MANAGER','SUPERVISOR')
  @Patch(':id')
  update(@Param('id') id: string, @Body() patch: Partial<{ title: string; status: string; assignedToId: string }>) {
    return this.svc.update(id, patch);
  }
}
