// src/components/ui/WoodSelector.tsx
'use client';

import React from 'react';
import { woodTypes } from '@/lib/theme';
import { cn } from '@/lib/utils';

interface WoodSelectorProps {
  selected: string;
  onSelect: (woodId: string) => void;
}

export default function WoodSelector({ selected, onSelect }: WoodSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm text-cream-300 font-medium">Select Wood Type</label>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {woodTypes.map((wood) => (
          <button
            key={wood.id}
            onClick={() => onSelect(wood.id)}
            className={cn(
              'p-3 rounded-wood border-2 transition-all duration-200 text-left',
              selected === wood.id
                ? 'border-wood-400 bg-surface-elevated shadow-glow'
                : 'border-wood-900/50 bg-surface-tertiary hover:border-wood-700'
            )}
          >
            <div
              className="w-full h-8 rounded mb-2"
              style={{ backgroundColor: wood.color }}
            />
            <p className="text-sm font-medium text-cream-100">{wood.name}</p>
            <p className="text-xs text-cream-500">{wood.price}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
