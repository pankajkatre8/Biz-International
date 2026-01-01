// src/components/dashboard/WoodMaterialUsage.tsx
'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Teak', value: 35, color: '#c19a6b' },
  { name: 'Oak', value: 25, color: '#d4a574' },
  { name: 'Walnut', value: 20, color: '#5c4033' },
  { name: 'Mahogany', value: 12, color: '#8b4513' },
  { name: 'Pine', value: 8, color: '#deb887' },
];

export default function WoodMaterialUsage() {
  return (
    <div className="bg-white rounded-lg border border-border-light shadow-sm p-5">
      <h2 className="text-lg font-semibold text-text-primary mb-1">Material Usage</h2>
      <p className="text-sm text-text-muted mb-4">Wood types used this month</p>
      
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={70}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
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
      </div>

      <div className="space-y-2 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-text-primary">{item.name}</span>
            </div>
            <span className="text-sm font-semibold text-text-primary">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
