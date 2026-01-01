// src/app/projects/[projectId]/dashboard/floor/[floorNumber]/page.tsx
import React from "react";
import FloorRoomsGrid from "@/components/dashboard/FloorRoomsGrid";

type Props = { params: { projectId: string; floorNumber: string } };

export default function FloorPage({ params }: Props) {
  const { projectId, floorNumber } = params;
  return (
    <main className="min-h-screen p-6 max-w-6xl mx-auto">
      <FloorRoomsGrid projectId={projectId} floorNumber={floorNumber} />
    </main>
  );
}
