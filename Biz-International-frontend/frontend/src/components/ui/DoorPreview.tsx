// src/components/ui/DoorPreview.tsx
'use client';

import React from 'react';
import { woodTypes, doorTypes, frameTypes } from '@/lib/theme';

interface DoorPreviewProps {
  woodType: string;
  doorType: string;
  frameType: string;
  width: number;
  height: number;
}

export default function DoorPreview({ woodType, doorType, frameType, width, height }: DoorPreviewProps) {
  const wood = woodTypes.find((w) => w.id === woodType);
  const door = doorTypes.find((d) => d.id === doorType);
  const frame = frameTypes.find((f) => f.id === frameType);

  const aspectRatio = height / width;
  const previewHeight = 200;
  const previewWidth = previewHeight / aspectRatio;

  return (
    <div className="p-6 bg-surface-secondary rounded-wood border border-wood-900/50">
      <h3 className="text-sm font-medium text-cream-300 mb-4">Door Preview</h3>
      
      <div className="flex justify-center mb-4">
        {/* Door Frame */}
        <div
          className="relative rounded-sm"
          style={{
            width: previewWidth + 20,
            height: previewHeight + 10,
            backgroundColor: wood?.color || '#5c4033',
            padding: '10px 10px 0 10px',
          }}
        >
          {/* Door Panel */}
          <div
            className="w-full h-full rounded-sm relative overflow-hidden"
            style={{
              backgroundColor: wood?.color || '#5c4033',
              filter: 'brightness(0.9)',
            }}
          >
            {/* Door Type Decorations */}
            {doorType === 'panel' && (
              <div className="absolute inset-4 grid grid-rows-2 gap-2">
                <div className="border-2 rounded-sm" style={{ borderColor: 'rgba(0,0,0,0.2)' }} />
                <div className="border-2 rounded-sm" style={{ borderColor: 'rgba(0,0,0,0.2)' }} />
              </div>
            )}
            {doorType === 'glass' && (
              <div className="absolute inset-4 top-6 bottom-20 bg-blue-200/20 rounded-sm border-2" style={{ borderColor: 'rgba(0,0,0,0.2)' }} />
            )}
            
            {/* Door Handle */}
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-6 rounded-full"
              style={{ backgroundColor: '#d4af37' }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-cream-400">
          <span>Wood:</span>
          <span className="text-cream-100">{wood?.name || 'Not selected'}</span>
        </div>
        <div className="flex justify-between text-cream-400">
          <span>Style:</span>
          <span className="text-cream-100">{door?.name || 'Not selected'}</span>
        </div>
        <div className="flex justify-between text-cream-400">
          <span>Frame:</span>
          <span className="text-cream-100">{frame?.name || 'Not selected'}</span>
        </div>
        <div className="flex justify-between text-cream-400">
          <span>Dimensions:</span>
          <span className="text-cream-100">{width}" × {height}"</span>
        </div>
      </div>
    </div>
  );
}
