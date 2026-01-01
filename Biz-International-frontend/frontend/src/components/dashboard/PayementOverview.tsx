// src/components/dashboard/PaymentOverview.tsx
'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { month: 'Aug', paid: 180000, pending: 45000, approved: 30000 },
  { month: 'Sep', paid: 220000, pending: 60000, approved: 25000 },
  { month: 'Oct', paid: 195000, pending: 35000, approved: 40000 },
  { month: 'Nov', paid: 240000, pending: 55000, approved: 35000 },
];

export default function PaymentOverview() {
  return (
    <div className="bg-white rounded-lg border border-border-light shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Payment Overview</h2>
          <p className="text-sm text-text-muted">Last 4 months</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-text-primary">₹3.3L</p>
          <p className="text-xs text-success">+12% from last month</p>
        </div>
      </div>
      
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" tick={{ fill: '#6b5f50', fontSize: 12 }} />
            <YAxis tick={{ fill: '#6b5f50', fontSize: 12 }} tickFormatter={(value) => `₹${value / 1000}k`} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #d4c4b0',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
            />
            <Bar dataKey="paid" stackId="a" fill="#2e7d32" radius={[0, 0, 0, 0]} name="Paid" />
            <Bar dataKey="approved" stackId="a" fill="#1565c0" radius={[0, 0, 0, 0]} name="Approved" />
            <Bar dataKey="pending" stackId="a" fill="#f9a825" radius={[4, 4, 0, 0]} name="Pending" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-border-light">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-success" />
          <span className="text-xs text-text-muted">Paid</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-info" />
          <span className="text-xs text-text-muted">Approved</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-warning" />
          <span className="text-xs text-text-muted">Pending</span>
        </div>
      </div>
    </div>
  );
}
