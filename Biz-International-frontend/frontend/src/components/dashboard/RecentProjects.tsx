// src/components/dashboard/RecentProjects.tsx
"use client";

import React from "react";
import Link from "next/link";

type Project = {
  id: string;
  name: string;
  location?: string;
  lastUpdated?: string;
};

export default function RecentProjects({ projects = [] as Project[] }) {
  if (!projects || projects.length === 0) {
    // Example placeholder data if none passed
    projects = [
      { id: "project-1", name: "Site A", location: "Mumbai", lastUpdated: "2025-11-30" },
      { id: "project-2", name: "Site B", location: "Delhi", lastUpdated: "2025-11-25" }
    ];
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Recent Projects</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {projects.map((p) => (
          <div key={p.id} className="border rounded p-3 flex justify-between items-center">
            <div>
              <div className="font-semibold">{p.name}</div>
              <div className="text-xs text-gray-500">{p.location} · Updated {p.lastUpdated}</div>
            </div>

            <div className="flex flex-col gap-2">
              <Link href={`/projects/${p.id}`} className="text-sm underline">Open Project</Link>
              <Link href={`/projects/${p.id}/dashboard`} className="px-3 py-1 bg-blue-600 text-white rounded text-sm text-center">
                Start Audit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
