"use client";

import React, { useState, useEffect } from "react";
import RoomEntryForm from "./RoomEntryForm";
import { checkDuplicates, bulkCreateRooms } from "@/lib/roomsService";
import DuplicateNotice from "./DuplicateNotice";

export default function BulkRoomEntry({ projectId, floorNumber }: any) {
  const [rooms, setRooms] = useState<string[]>([]);
  const [template, setTemplate] = useState<any>({});
  const [conflicts, setConflicts] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  function handleRoomAdd() {
    setRooms((prev) => [...prev, ""]);
  }

  async function handleCheck() {
    const entries = rooms.map((r) => ({
      ...template,
      roomNumber: r,
      floor: Number(floorNumber),
    }));
    const dup = await checkDuplicates(projectId, entries);
    setConflicts(dup.filter((d: any) => d.exists));
    setStep(3);
  }

  async function handleSave(resolution: "skip" | "replace" | "merge") {
    setSubmitting(true);
    const entries = rooms.map((r) => ({
      ...template,
      roomNumber: r,
      floor: Number(floorNumber),
    }));
    await bulkCreateRooms(projectId, entries, resolution);
    setSubmitting(false);
    setStep(4);
  }

  return (
    <div className="p-4 space-y-4">
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold">Select Rooms</h2>
          {rooms.map((r, idx) => (
            <input
              key={idx}
              className="border p-2 rounded block mt-2"
              value={r}
              onChange={(e) =>
                setRooms((prev) => {
                  const newVal = [...prev];
                  newVal[idx] = e.target.value;
                  return newVal;
                })
              }
              placeholder="Room Number"
            />
          ))}
          <button className="mt-3 px-4 py-2 bg-gray-700 text-white rounded" onClick={handleRoomAdd}>
            Add Room
          </button>
          <button className="ml-2 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setStep(2)}>
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold">Template / Entry Details</h2>
          <RoomEntryForm value={template} onChange={setTemplate} />
          <button
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleCheck}
          >
            Check Duplicates
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <DuplicateNotice conflicts={conflicts} onResolve={handleSave} submitting={submitting} />
        </div>
      )}

      {step === 4 && <div className="text-green-600">Bulk entry saved! 🎉</div>}
    </div>
  );
}
