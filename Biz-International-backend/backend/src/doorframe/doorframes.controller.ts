import { Controller, Post, Body, Param, UseGuards, Get, Patch } from '@nestjs/common';
import { DoorFramesService } from './doorframes.service';
import { CreateDoorFrameDto } from './dto/create-doorframe.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('api/rooms/:roomId/doorframes')
export class DoorFramesController {
  constructor(private svc: DoorFramesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('MANAGER','SUPERVISOR')
  @Post()
  create(@Param('roomId') roomId: string, @Body() dto: CreateDoorFrameDto) {
    return this.svc.create(roomId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  list(@Param('roomId') roomId: string) {
    return this.svc.listByRoom(roomId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('MANAGER','SUPERVISOR')
  @Patch(':doorFrameId')
  update(@Param('doorFrameId') doorFrameId: string, @Body() patch: { status?: string; notes?: string }) {
    return this.svc.update(doorFrameId, patch);
  }
}
