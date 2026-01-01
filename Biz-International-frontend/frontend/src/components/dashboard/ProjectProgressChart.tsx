// src/components/dashboard/ProjectProgressChart.tsx
'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Skyline Apt', progress: 75, status: 'active' },
  { name: 'Green Valley', progress: 45, status: 'active' },
  { name: 'Tech Park', progress: 90, status: 'active' },
  { name: 'Royal Heights', progress: 20, status: 'hold' },
  { name: 'Sunset Res.', progress: 100, status: 'completed' },
];

const getColor = (status: string) => {
  switch (status) {
    case 'completed': return '#2e7d32';
    case 'hold': return '#f9a825';
    default: return '#b8860b';
  }
};

export default function ProjectProgressChart() {
  return (
    <div className="bg-white rounded-lg border border-border-light shadow-sm p-5">
      <h2 className="text-lg font-semibold text-text-primary mb-1">Project Progress</h2>
      <p className="text-sm text-text-muted mb-4">Completion status of active projects</p>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
            <XAxis type="number" domain={[0, 100]} tick={{ fill: '#6b5f50', fontSize: 12 }} />
            <YAxis dataKey="name" type="category" tick={{ fill: '#6b5f50', fontSize: 12 }} width={80} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #d4c4b0',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [`${value}%`, 'Progress']}
            />
            <Bar dataKey="progress" radius={[0, 4, 4, 0]} barSize={20}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.status)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border-light">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-wood-500" />
          <span className="text-xs text-text-muted">Active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-warning" />
          <span className="text-xs text-text-muted">On Hold</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="text-xs text-text-muted">Completed</span>
        </div>
      </div>
    </div>
  );
}
