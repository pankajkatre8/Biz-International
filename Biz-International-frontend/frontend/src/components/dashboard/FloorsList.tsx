"use client";

import React, { useEffect, useState } from "react";
import { getFloors } from "@/lib/roomsService";
import Link from "next/link";

export default function FloorsList({ projectId }: { projectId: string }) {
  const [floors, setFloors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFloors(projectId)
      .then(setFloors)
      .finally(() => setLoading(false));
  }, [projectId]);

  if (loading) return <div className="p-4">Loading floors...</div>;

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">Floors</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {floors.map((floor) => (
          <Link
            href={`/${projectId}/dashboard/floor/${floor.floorNumber}`}
            key={floor.floorNumber}
            className="block border rounded-lg p-4 hover:bg-gray-50 shadow-sm"
          >
            <div className="text-xl font-semibold">Floor {floor.floorNumber}</div>
            <div className="text-sm text-gray-600">
              Rooms filled: {floor.filledRooms} / {floor.totalRooms}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Last updated: {floor.lastUpdated || "—"}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
