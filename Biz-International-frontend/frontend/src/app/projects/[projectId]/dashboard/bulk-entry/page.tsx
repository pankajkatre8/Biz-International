// src/app/projects/[projectId]/dashboard/bulk-entry/page.tsx
import React from "react";
import BulkRoomEntry from "@/components/dashboard/BulkRoomEntry";

type Props = { params: { projectId: string }; searchParams?: Record<string,string|string[]|undefined> };

export default function BulkEntryPage({ params, searchParams }: Props) {
  const { projectId } = params;
  const floor = Array.isArray(searchParams?.floor) ? searchParams?.floor[0] : searchParams?.floor;

  return (
    <main className="min-h-screen p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Bulk Entry — Project {projectId}</h1>
      <BulkRoomEntry projectId={projectId} floorNumber={floor} />
    </main>
  );
}
