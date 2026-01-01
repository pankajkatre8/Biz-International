"use client";

import React, { useState, useEffect } from "react";

export default function RoomEntryForm({
  value,
  onChange,
}: {
  value: any;
  onChange: (v: any) => void;
}) {
  const [local, setLocal] = useState(value);

  useEffect(() => {
    onChange(local);
  }, [local]);

  function update(field: string, val: any) {
    setLocal((prev: any) => ({ ...prev, [field]: val }));
  }

  return (
    <div className="space-y-3 border p-4 rounded-md">
      <div className="grid grid-cols-2 gap-3">
        <input
          className="border p-2 rounded"
          placeholder="Room Type"
          value={local.roomType}
          onChange={(e) => update("roomType", e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Length (m)"
          value={local.length}
          onChange={(e) => update("length", e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Width (m)"
          value={local.width}
          onChange={(e) => update("width", e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="No. of Doors"
          value={local.doors || ""}
          onChange={(e) => update("doors", Number(e.target.value))}
        />
        <input
          className="border p-2 rounded"
          placeholder="No. of Windows"
          value={local.windows || ""}
          onChange={(e) => update("windows", Number(e.target.value))}
        />
      </div>

      <textarea
        className="border p-2 rounded w-full"
        rows={3}
        placeholder="Notes"
        value={local.notes || ""}
        onChange={(e) => update("notes", e.target.value)}
      />
    </div>
  );
}
