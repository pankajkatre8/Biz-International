"use client";

import React from "react";

export default function RecentEntries({ entries }: { entries: any[] }) {
  if (!entries || !entries.length)
    return <div className="p-2 text-gray-500">No recent entries</div>;

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Recent Entries</h2>
      {entries.map((e, i) => (
        <div key={i} className="border p-2 rounded text-sm">
          Floor {e.floor}, Room {e.roomNumber} — {e.roomType}
          <div className="text-xs text-gray-500">{e.timestamp}</div>
        </div>
      ))}
    </div>
  );
}
