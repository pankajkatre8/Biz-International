import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectsController {
  constructor(private readonly svc: ProjectsService) {}

  @Roles('OWNER', 'MANAGER', 'SUPERVISOR', 'ACCOUNTS', 'DISPATCHER')
  @Get()
  list(@Req() req) {
    return this.svc.findAll(req.user);
  }

  @Roles('OWNER', 'MANAGER')
  @Post()
  create(@Body() dto: CreateProjectDto, @Req() req) {
    return this.svc.create(dto, req.user.id);
  }

  @Roles('OWNER', 'MANAGER', 'SUPERVISOR')
  @Get(':id')
  get(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Roles('OWNER', 'MANAGER', 'SUPERVISOR')
  @Get(':id/floors')
  floors(@Param('id') id: string) {
    return this.svc.findFloors(id);
  }
}
