
'use client';

import React from 'react';
import Link from 'next/link';
import { AlertTriangle, AlertCircle, Info, ArrowRight } from 'lucide-react';

const issues = [
  { id: 1, title: 'Wrong frame dimension', project: 'Skyline Apt', priority: 'high', time: '2h ago' },
  { id: 2, title: 'Material shortage', project: 'Green Valley', priority: 'medium', time: '4h ago' },
  { id: 3, title: 'Installation delay', project: 'Tech Park', priority: 'low', time: '1d ago' },
];

const priorityConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  high: { icon: AlertCircle, color: 'text-error', bg: 'bg-error-light' },
  medium: { icon: AlertTriangle, color: 'text-warning-dark', bg: 'bg-warning-light' },
  low: { icon: Info, color: 'text-info', bg: 'bg-info-light' },
};

export default function IssuesOverview() {
  return (
    <div className="bg-white rounded-lg border border-border-light shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Open Issues</h2>
          <p className="text-sm text-text-muted">Requires attention</p>
        </div>
        <span className="px-2 py-1 bg-error-light text-error text-xs font-semibold rounded-full">
          {issues.length} Open
        </span>
      </div>
      
      <div className="space-y-3">
        {issues.map((issue) => {
          const config = priorityConfig[issue.priority];
          const Icon = config.icon;
          return (
            <div key={issue.id} className="flex items-start gap-3 p-3 bg-surface-secondary rounded-lg">
              <div className={`w-8 h-8 ${config.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <Icon size={16} className={config.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary">{issue.title}</p>
                <p className="text-xs text-text-muted">{issue.project} • {issue.time}</p>
              </div>
            </div>
          );
        })}
      </div>

      <Link href="/issues" className="flex items-center justify-center gap-1 mt-4 pt-4 border-t border-border-light text-sm text-wood-600 hover:text-wood-700 font-medium">
        View All Issues
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
