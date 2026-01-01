// backend/src/flats/dto/create-flat.dto.ts
import { IsInt, IsOptional, IsString, IsBoolean, Min } from "class-validator";

export class CreateFlatDto {
  @IsInt()
  @Min(0)
  floorNumber!: number;

  @IsString()
  flatNumber!: string;

  @IsOptional()
  @IsString()
  flatType?: string;

  @IsOptional()
  @IsBoolean()
  isRefuge?: boolean = false;
}
