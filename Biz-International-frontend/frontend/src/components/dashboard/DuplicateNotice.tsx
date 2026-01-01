"use client";

import React from "react";

export default function DuplicateNotice({
  conflicts,
  onResolve,
  submitting,
}: {
  conflicts: any[];
  onResolve: (type: "skip" | "replace" | "merge") => void;
  submitting: boolean;
}) {
  return (
    <div className="p-4 border rounded bg-yellow-50">
      <h2 className="text-lg font-bold text-yellow-700">
        Duplicate entries detected
      </h2>

      <ul className="mt-2 space-y-1 text-sm">
        {conflicts.map((c, i) => (
          <li key={i}>
            Floor {c.entry.floor} — Room {c.entry.roomNumber} already exists.
          </li>
        ))}
      </ul>

      <div className="mt-4 space-x-2">
        <button
          className="px-4 py-2 bg-gray-600 text-white rounded"
          disabled={submitting}
          onClick={() => onResolve("skip")}
        >
          Skip
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          disabled={submitting}
          onClick={() => onResolve("replace")}
        >
          Replace
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
          disabled={submitting}
          onClick={() => onResolve("merge")}
        >
          Merge
        </button>
      </div>
    </div>
  );
}
