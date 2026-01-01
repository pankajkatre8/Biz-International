// src/components/dashboard/CarpenterPerformance.tsx
'use client';

import React from 'react';
import { Star } from 'lucide-react';

const carpenters = [
  { name: 'Rajesh Kumar', tasks: 45, rating: 4.8, efficiency: 95 },
  { name: 'Amit Singh', tasks: 38, rating: 4.6, efficiency: 88 },
  { name: 'Suresh Yadav', tasks: 42, rating: 4.9, efficiency: 92 },
  { name: 'Vikram Patel', tasks: 35, rating: 4.5, efficiency: 85 },
];

export default function CarpenterPerformance() {
  return (
    <div className="bg-white rounded-lg border border-border-light shadow-sm p-5">
      <h2 className="text-lg font-semibold text-text-primary mb-1">Top Carpenters</h2>
      <p className="text-sm text-text-muted mb-4">Based on performance this month</p>
      
      <div className="space-y-3">
        {carpenters.map((carpenter, index) => (
          <div key={carpenter.name} className="flex items-center gap-3 p-3 bg-surface-secondary rounded-lg">
            <div className="w-8 h-8 bg-wood-100 rounded-full flex items-center justify-center text-wood-700 font-bold text-sm">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">{carpenter.name}</p>
              <p className="text-xs text-text-muted">{carpenter.tasks} tasks completed</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-warning fill-warning" />
                <span className="text-sm font-semibold text-text-primary">{carpenter.rating}</span>
              </div>
              <p className="text-xs text-success">{carpenter.efficiency}% efficient</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
