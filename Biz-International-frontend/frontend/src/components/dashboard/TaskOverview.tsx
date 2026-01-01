// src/components/dashboard/TaskOverview.tsx
'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

const tasks = [
  { stage: 'Pending', count: 45, color: 'bg-slate-500' },
  { stage: 'Frame Installed', count: 32, color: 'bg-yellow-500' },
  { stage: 'Door Installed', count: 28, color: 'bg-blue-500' },
  { stage: 'Finishing Done', count: 156, color: 'bg-green-500' },
];

export default function TaskOverview() {
  const total = tasks.reduce((sum, t) => sum + t.count, 0);

  return (
    <Card className="p-6 bg-slate-800/50 border-slate-700">
      <h2 className="text-lg font-semibold text-white mb-4">Task Overview</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.stage}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-400">{task.stage}</span>
              <span className="text-white">{task.count}</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full ${task.color} rounded-full`}
                style={{ width: `${(task.count / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-slate-700">
        <div className="flex justify-between">
          <span className="text-slate-400">Total Tasks</span>
          <span className="text-white font-semibold">{total}</span>
        </div>
      </div>
    </Card>
  );
}
