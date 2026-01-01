"use client";

import React, { useState } from "react";
import RoomEntryForm from "./RoomEntryForm";
import DuplicateNotice from "./DuplicateNotice";
import { checkDuplicates, saveRoomEntry } from "@/lib/roomsService";

export default function RoomEntryWizard({
  projectId,
  floorNumber,
  roomNumber,
}: {
  projectId: string;
  floorNumber: string;
  roomNumber: string;
}) {
  const [step, setStep] = useState(1);
  const [entry, setEntry] = useState<any>({
    floor: Number(floorNumber),
    roomNumber,
    roomType: "",
    length: "",
    width: "",
  });

  const [conflicts, setConflicts] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);

  async function handleCheckDuplicates() {
    let res = await checkDuplicates(projectId, [entry]);
    setConflicts(res.filter((r) => r.exists));
    setStep(3);
  }

  async function handleSave(resolution: "skip" | "replace" | "merge") {
    setSubmitting(true);
    await saveRoomEntry(projectId, entry, resolution);
    setSubmitting(false);
    setStep(4);
  }

  return (
    <div className="p-4 space-y-4">
      {/* STEP HEADERS */}
      <h1 className="text-xl font-bold">
        Room {roomNumber} • Floor {floorNumber}
      </h1>

      {/* STEP 1: ENTRY FORM */}
      {step === 1 && (
        <div className="space-y-2">
          <RoomEntryForm value={entry} onChange={setEntry} />
          <button
            onClick={() => setStep(2)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Next
          </button>
        </div>
      )}

      {/* STEP 2: DUPLICATE CHECK */}
      {step === 2 && (
        <div className="space-y-2">
          <div className="text-gray-700">
            Check if this room already has entries before saving.
          </div>
          <button
            onClick={handleCheckDuplicates}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Check duplicates
          </button>
        </div>
      )}

      {/* STEP 3: DUPLICATE RESULT */}
      {step === 3 && (
        <div>
          {conflicts.length > 0 ? (
            <DuplicateNotice
              conflicts={conflicts}
              onResolve={handleSave}
              submitting={submitting}
            />
          ) : (
            <div className="space-y-3">
              <div className="text-green-600">No duplicates found!</div>
              <button
                onClick={() => handleSave("replace")}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save entry
              </button>
            </div>
          )}
        </div>
      )}

      {/* STEP 4: DONE */}
      {step === 4 && (
        <div className="text-green-700 font-semibold">
          Entry saved successfully! 🎉
        </div>
      )}
    </div>
  );
}
