// src/components/dashboard/MonthlyTrends.tsx
'use client';

import React from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', projects: 4, doors: 120, revenue: 2.4 },
  { month: 'Feb', projects: 3, doors: 98, revenue: 1.8 },
  { month: 'Mar', projects: 5, doors: 156, revenue: 3.2 },
  { month: 'Apr', projects: 6, doors: 189, revenue: 4.1 },
  { month: 'May', projects: 4, doors: 134, revenue: 2.9 },
  { month: 'Jun', projects: 7, doors: 210, revenue: 4.8 },
  { month: 'Jul', projects: 5, doors: 167, revenue: 3.6 },
  { month: 'Aug', projects: 8, doors: 245, revenue: 5.2 },
  { month: 'Sep', projects: 6, doors: 198, revenue: 4.3 },
  { month: 'Oct', projects: 7, doors: 223, revenue: 4.9 },
  { month: 'Nov', projects: 9, doors: 267, revenue: 5.8 },
  { month: 'Dec', projects: 5, doors: 156, revenue: 3.4 },
];

export default function MonthlyTrends() {
  return (
    <div className="bg-white rounded-lg border border-border-light shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Monthly Performance</h2>
          <p className="text-sm text-text-muted">Projects, doors installed & revenue trends</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-wood-500 rounded" />
            <span className="text-text-muted">Projects</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-teak rounded" />
            <span className="text-text-muted">Doors</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success rounded-full" />
            <span className="text-text-muted">Revenue (₹L)</span>
          </div>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8ddd0" />
            <XAxis dataKey="month" tick={{ fill: '#6b5f50', fontSize: 12 }} />
            <YAxis yAxisId="left" tick={{ fill: '#6b5f50', fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: '#6b5f50', fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #d4c4b0',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(45, 30, 20, 0.08)',
              }}
            />
            <Bar yAxisId="left" dataKey="projects" fill="#b8860b" radius={[4, 4, 0, 0]} name="Projects" />
            <Bar yAxisId="left" dataKey="doors" fill="#a68b5b" radius={[4, 4, 0, 0]} name="Doors Installed" />
            <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#2e7d32" strokeWidth={3} dot={{ fill: '#2e7d32', strokeWidth: 2 }} name="Revenue (₹L)" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
