// src/app/api/projects/[projectId]/rooms/check-duplicates/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: any) {
  const body = await req.json();
  const { entries } = body;
  // For demo, pretend any roomNumber ending with '1' exists
  const result = entries.map((e: any) => ({
    entry: e,
    exists: String(e.roomNumber).endsWith("1"),
    existingRecord: String(e.roomNumber).endsWith("1") ? { floor: e.floor, roomNumber: e.roomNumber, roomType: "master", lastUpdated: "2025-11-01" } : null
  }));
  return NextResponse.json(result);
}
