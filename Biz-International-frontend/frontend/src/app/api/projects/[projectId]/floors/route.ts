// src/app/api/projects/[projectId]/floors/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: any) {
  const floors = [
    { floorNumber: 1, filledRooms: 5, totalRooms: 10, lastUpdated: "2025-11-30" },
    { floorNumber: 2, filledRooms: 2, totalRooms: 12, lastUpdated: "2025-11-29" }
  ];
  return NextResponse.json(floors);
}
