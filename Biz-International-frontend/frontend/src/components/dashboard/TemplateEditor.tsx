"use client";

import React, { useState } from "react";
import RoomEntryForm from "./RoomEntryForm";
import { saveTemplate } from "@/lib/roomsService";

export default function TemplateEditor({ projectId }: { projectId: string }) {
  const [template, setTemplate] = useState<any>({});
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    await saveTemplate(projectId, { name, data: template });
    setSaving(false);
    alert("Template saved!");
  }

  return (
    <div className="space-y-3 p-4">
      <h2 className="text-xl font-bold">Create Template</h2>

      <input
        className="border p-2 rounded w-full"
        placeholder="Template name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <RoomEntryForm value={template} onChange={setTemplate} />

      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={saving}
      >
        Save Template
      </button>
    </div>
  );
}
