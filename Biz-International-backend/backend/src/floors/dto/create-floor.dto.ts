import { IsInt, IsOptional } from 'class-validator';

export class CreateFloorDto {
  @IsInt()
  number: number;

  @IsOptional()
  projectId?: string;
}
