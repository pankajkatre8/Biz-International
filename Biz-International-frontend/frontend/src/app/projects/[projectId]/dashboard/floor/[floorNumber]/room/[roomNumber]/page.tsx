// src/app/projects/[projectId]/dashboard/floor/[floorNumber]/room/[roomNumber]/page.tsx
import React from "react";
import RoomEntryWizard from "@/components/dashboard/RoomEntryWizard";

type Props = { params: { projectId: string; floorNumber: string; roomNumber: string } };

export default function RoomPage({ params }: Props) {
  const { projectId, floorNumber, roomNumber } = params;
  return (
    <main className="min-h-screen p-6 max-w-3xl mx-auto">
      <RoomEntryWizard projectId={projectId} floorNumber={floorNumber} roomNumber={roomNumber} />
    </main>
  );
}
