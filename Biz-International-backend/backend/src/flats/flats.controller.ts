// backend/src/flats/flats.controller.ts
import { Controller, Get, Post, Param, Body, UseGuards } from "@nestjs/common";
import { FlatsService } from "./flats.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller()
export class FlatsController {
  constructor(private readonly flatsService: FlatsService) {}

  @Post("projects/:projectId/flats")
  create(@Param("projectId") projectId: string, @Body() createFlatDto: any) {
    return this.flatsService.create(projectId, createFlatDto);
  }


}
