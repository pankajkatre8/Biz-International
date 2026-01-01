import { Module } from '@nestjs/common';
import { DoorFramesController } from './doorframes.controller';
import { DoorFramesService } from './doorframes.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DoorFramesController],
  providers: [DoorFramesService],
})
export class DoorFramesModule {}
