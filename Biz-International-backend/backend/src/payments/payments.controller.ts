import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('api/tasks/:taskId/payments')
export class PaymentsController {
  constructor(private svc: PaymentsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('MANAGER','SUPERVISOR')
  @Post()
  create(@Param('taskId') taskId: string, @Body() dto: CreatePaymentDto) {
    dto.taskId = taskId;
    return this.svc.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  list(@Param('taskId') taskId: string) {
    return this.svc.findForTask(taskId);
  }
}
