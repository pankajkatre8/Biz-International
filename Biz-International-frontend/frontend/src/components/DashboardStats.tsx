// src/components/DashboardStats.tsx
import React from 'react';

export default function DashboardStats({ data }: { data: any }) {
  if (!data) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Stat title="Projects" value={data.projectsCount ?? 0} />
      <Stat title="Open Tasks" value={data.openTasks ?? 0} />
      <Stat title="Pending Payments" value={data.pendingPayments ?? 0} />
      <Stat title="Avg. Rating" value={data.avgRating?.toFixed?.(2) ?? '—'} />
    </div>
  );
}

function Stat({ title, value }: { title: string; value: React.ReactNode }) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
