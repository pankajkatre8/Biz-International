"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import AssignedProjects from "@/components/supervisor/AssignedProjects";
import SupervisorStats from "@/components/supervisor/SupervisorStats";

export default function SupervisorDashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Supervisor Dashboard</h1>

      <AssignedProjects />
      <SupervisorStats />

      <div className="flex gap-4">
        <Link href="/dashboard/supervisor/excel">
          <Button>Upload Excel</Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline">Manual Entry</Button>
        </Link>
      </div>
    </div>
  );
}
