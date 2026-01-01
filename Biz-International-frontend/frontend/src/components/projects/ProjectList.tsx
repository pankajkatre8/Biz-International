// src/components/projects/ProjectList.tsx
"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function ProjectList() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects", "recent"],
    queryFn: () => api.fetchRecentProjects(6),
    staleTime: 1000 * 30,
  });

  if (isLoading) return <div>Loading projects…</div>;

  return (
    <div className="bg-white border rounded-lg p-4">
      <h3 className="font-semibold mb-3">Recent Projects</h3>
      <div className="space-y-2">
        {projects!.length === 0 && <div className="text-sm text-muted-foreground">No projects yet.</div>}
        {projects!.map((p: any) => (
          <Link key={p.id} href={`/projects/${p.id}`} className="block p-2 rounded hover:bg-neutral-50">
            <div className="font-medium">{p.name}</div>
            <div className="text-sm text-muted-foreground">{p.location}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
