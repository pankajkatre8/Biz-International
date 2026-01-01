import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreatePaymentDto) {
    // ensure status matches Prisma PaymentStatus enum
const status = (dto.status as any) ?? "PENDING";
return this.prisma.payment.create({
  data: {
    amount: dto.amount,
    status,
    taskId: dto.taskId,
  },
});

  }

  findForTask(taskId: string) {
    return this.prisma.payment.findMany({ where: { taskId }, orderBy: { createdAt: 'desc' } });
  }
}
