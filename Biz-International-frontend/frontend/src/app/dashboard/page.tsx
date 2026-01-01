"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import AssignedProjects from "./supervisor/AssignedProjects";
import SupervisorStats from "./supervisor/SupervisorStats";

export default function SupervisorDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["supervisor-projects"],
    queryFn: async () => {
      const res = await api.get("/projects");

      // normalize response shape
      if (Array.isArray(res.data)) return res.data;
      if (Array.isArray(res.data?.data)) return res.data.data;

      return [];
    },
  });

  // ✅ DEFINE projects HERE
  const projects = Array.isArray(data) ? data : [];

  if (isLoading) {
    return <p className="p-6">Loading dashboard…</p>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
      <header>
        <h1 className="text-3xl font-bold">Supervisor Dashboard</h1>
        <p className="text-sm text-text-muted">
          Assigned projects and site execution overview
        </p>
      </header>

      <SupervisorStats projects={projects} />
      <AssignedProjects projects={projects} />
    </div>
  );
}
