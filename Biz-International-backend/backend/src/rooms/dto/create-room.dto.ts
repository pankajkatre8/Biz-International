import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateRoomDto {
  @IsNumber()
  floor: number;

  @IsString()
  roomNumber: string;

  @IsOptional()
  @IsString()
  roomType?: string;

  @IsOptional()
  length?: number | string;

  @IsOptional()
  width?: number | string;

  @IsOptional()
  @IsNumber()
  doors?: number;

  @IsOptional()
  @IsNumber()
  windows?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
