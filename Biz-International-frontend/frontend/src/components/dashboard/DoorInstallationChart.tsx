// src/components/dashboard/DoorInstallationChart.tsx
'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Pending', value: 45, color: '#8b7d6b' },
  { name: 'Frame Installed', value: 32, color: '#f9a825' },
  { name: 'Door Installed', value: 28, color: '#1565c0' },
  { name: 'Completed', value: 156, color: '#2e7d32' },
];

const total = data.reduce((sum, item) => sum + item.value, 0);

export default function DoorInstallationChart() {
  return (
    <div className="bg-white rounded-lg border border-border-light shadow-sm p-5">
      <h2 className="text-lg font-semibold text-text-primary mb-1">Installation Status</h2>
      <p className="text-sm text-text-muted mb-4">Current door installation progress</p>
      
      <div className="h-48 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #d4c4b0',
                borderRadius: '8px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold text-text-primary">{total}</p>
            <p className="text-xs text-text-muted">Total Doors</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-text-muted">{item.name}</span>
            <span className="text-xs font-semibold text-text-primary ml-auto">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
