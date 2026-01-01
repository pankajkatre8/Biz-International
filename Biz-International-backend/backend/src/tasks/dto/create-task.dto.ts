// src/tasks/dto/create-task.dto.ts
import { IsOptional, IsString, IsEnum } from "class-validator";
import { TaskStatus } from "@prisma/client";

export class CreateTaskDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsEnum(TaskStatus)         // validates incoming value is one of the enum strings
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  doorFrameId?: string;

  @IsOptional()
  @IsString()
  assignedToId?: string;
}
