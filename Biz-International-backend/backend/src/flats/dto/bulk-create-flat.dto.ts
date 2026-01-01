// backend/src/flats/dto/bulk-create-flat.dto.ts
import { Type } from "class-transformer";
import { ArrayNotEmpty, ValidateNested } from "class-validator";
import { CreateFlatDto } from "./create-flat.dto";

export class BulkCreateFlatsDto {
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateFlatDto)
  flats!: CreateFlatDto[];
}
