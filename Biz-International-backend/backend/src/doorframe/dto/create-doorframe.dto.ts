import { IsString, IsOptional } from 'class-validator';

export class CreateDoorFrameDto {
  @IsString()
  roomId!: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
