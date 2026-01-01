// src/components/dashboard/QuickActions.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Users, 
  FileText, 
  CreditCard, 
  AlertCircle, 
  DoorOpen,
  ClipboardList,
  TrendingUp
} from 'lucide-react';

const actions = [
  { icon: Plus, label: 'New Project', href: '/projects/create', color: 'bg-wood-500 hover:bg-wood-600' },
  { icon: DoorOpen, label: 'Add Door Spec', href: '/doors/create', color: 'bg-walnut hover:bg-walnut-dark' },
  { icon: Users, label: 'Assign Carpenter', href: '/carpenters/assign', color: 'bg-teak hover:bg-teak-dark' },
  { icon: CreditCard, label: 'Process Payment', href: '/payments/new', color: 'bg-success hover:bg-success-dark' },
  { icon: AlertCircle, label: 'Report Issue', href: '/issues/create', color: 'bg-warning hover:bg-warning-dark' },
  { icon: FileText, label: 'Generate Report', href: '/reports', color: 'bg-info hover:bg-info-dark' },
  { icon: ClipboardList, label: 'View Tasks', href: '/tasks', color: 'bg-mahogany hover:bg-mahogany-dark' },
  { icon: TrendingUp, label: 'Analytics', href: '/analytics', color: 'bg-oak-dark hover:bg-wood-700' },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-lg border border-border-light shadow-sm p-5">
      <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">Quick Actions</h2>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-surface-hover transition-all group"
          >
            <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center text-white shadow-sm group-hover:shadow-md transition-all group-hover:scale-105`}>
              <action.icon size={22} />
            </div>
            <span className="text-xs text-text-muted text-center font-medium">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
