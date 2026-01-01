// src/app/api/projects/[projectId]/rooms/route.ts
import { NextResponse } from "next/server";

let sampleRooms = [
  { floor: 1, roomNumber: "101", status: "filled", lastUpdated: "2025-11-30" },
  { floor: 1, roomNumber: "102", status: "empty" },
  { floor: 2, roomNumber: "201", status: "partial" }
];

export async function GET(req: Request, { params }: any) {
  const url = new URL(req.url);
  const floor = url.searchParams.get("floor");
  if (!floor) return NextResponse.json(sampleRooms);
  const filtered = sampleRooms.filter(r => String(r.floor) === String(floor));
  return NextResponse.json(filtered);
}

export async function POST(req: Request, { params }: any) {
  const body = await req.json();
  const { entry, resolution } = body;
  // naive save: push or replace
  const idx = sampleRooms.findIndex(r => r.floor === entry.floor && r.roomNumber === entry.roomNumber);
  if (idx >= 0) {
    if (resolution === "replace") sampleRooms[idx] = { ...sampleRooms[idx], ...entry, status: "filled", lastUpdated: new Date().toISOString() };
  } else {
    sampleRooms.push({ ...entry, status: "filled", lastUpdated: new Date().toISOString() });
  }
  return NextResponse.json({ success: true });
}
