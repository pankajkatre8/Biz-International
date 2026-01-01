import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  location?: string;

  // Number of floors (used for auto-creation)
  @IsOptional()
  @IsInt()
  @Min(1)
  floors?: number;
}
