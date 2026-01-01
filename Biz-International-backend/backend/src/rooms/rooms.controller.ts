import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Get,
  Query,
  Req,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('projects/:projectId/rooms')
@UseGuards(JwtAuthGuard)
export class RoomsController {
  constructor(private svc: RoomsService) {}

  @Post()
  create(
    @Param('projectId') projectId: string,
    @Body() body: { entry: CreateRoomDto },
    @Req() req,
  ) {
    return this.svc.create(projectId, body.entry, req.user);
  }

  @Post('bulk')
  bulk(
    @Param('projectId') projectId: string,
    @Body() body: { entries: CreateRoomDto[] },
    @Req() req,
  ) {
    return this.svc.bulkCreate(projectId, body.entries, req.user);
  }

  @Post('check-duplicates')
  checkDuplicates(
    @Param('projectId') projectId: string,
    @Body() body: { entries: CreateRoomDto[] },
  ) {
    return this.svc.checkDuplicates(projectId, body.entries);
  }

  @Get()
  list(
    @Param('projectId') projectId: string,
    @Query('floor') floor?: string,
  ) {
    return this.svc.listByProject(projectId, floor);
  }
}
