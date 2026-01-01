// src/app/api/projects/[projectId]/rooms/bulk/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: any) {
  const { entries, resolution } = await req.json();
  // naive accept all
  return NextResponse.json({ success: true, inserted: entries.length });
}
