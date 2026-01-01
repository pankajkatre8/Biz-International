// src/app/api/projects/[projectId]/templates/route.ts
import { NextResponse } from "next/server";

let templates = [];

export async function GET(req: Request, { params }: any) {
  return NextResponse.json(templates);
}

export async function POST(req: Request, { params }: any) {
  const body = await req.json();
  templates.push({ id: String(templates.length + 1), ...body });
  return NextResponse.json({ success: true });
}
