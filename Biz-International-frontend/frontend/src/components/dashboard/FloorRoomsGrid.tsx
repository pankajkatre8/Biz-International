"use client";

import React, { useEffect, useState } from "react";
import { getRoomsByFloor } from "@/lib/roomsService";
import Link from "next/link";

export default function FloorRoomsGrid({
  projectId,
  floorNumber,
}: {
  projectId: string;
  floorNumber: string;
}) {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRoomsByFloor(projectId, floorNumber)
      .then(setRooms)
      .finally(() => setLoading(false));
  }, [projectId, floorNumber]);

  if (loading) return <div className="p-4">Loading rooms...</div>;

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Rooms on Floor {floorNumber}</h1>

        <Link
          href={`/${projectId}/dashboard/bulk-entry?floor=${floorNumber}`}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Bulk Entry
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {rooms.map((room) => (
          <Link
            key={room.roomNumber}
            href={`/${projectId}/dashboard/floor/${floorNumber}/room/${room.roomNumber}`}
            className="border rounded-lg p-4 hover:bg-gray-50 shadow-sm"
          >
            <div className="font-semibold">{room.roomNumber}</div>
            <div className="text-xs text-gray-500">
              Status:{" "}
              <span
                className={
                  room.status === "filled"
                    ? "text-green-600"
                    : room.status === "partial"
                    ? "text-yellow-600"
                    : "text-gray-600"
                }
              >
                {room.status}
              </span>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Last updated: {room.lastUpdated || "—"}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
