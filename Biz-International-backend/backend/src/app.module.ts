// src/app.module.ts
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { ProjectsModule } from './projects/projects.module';
import { FloorsModule } from './floors/floors.module';
import { RoomsModule } from './rooms/rooms.module';
import { FlatsModule } from './flats/flats.module'; // <-- added

import { DoorFramesModule } from './doorframe/doorframes.module';
import { TasksModule } from './tasks/tasks.module';
import { PaymentsModule } from './payments/payments.module';
import { AdminModule } from './admin/admin.module';

import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    ProjectsModule,
    FloorsModule,
    RoomsModule,
    FlatsModule,           // <-- register FlatsModule here
    DoorFramesModule,
    TasksModule,
    PaymentsModule,
    AdminModule,
  ],
  controllers: [],
  providers: [
    // Make RolesGuard global so @Roles(...) is respected across controllers.
    // If you prefer to attach RolesGuard per-route, remove this provider.
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
