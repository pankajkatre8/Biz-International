// src/components/dashboard/StatsCards.tsx
'use client';

import React from 'react';
import { FolderKanban, Users, CreditCard, AlertCircle, TrendingUp, CheckCircle, ArrowUp, ArrowDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const generateSparklineData = () => 
  Array.from({ length: 7 }, () => ({ value: Math.floor(Math.random() * 100) + 20 }));

const stats = [
  { label: 'Total Projects', value: '24', icon: FolderKanban, change: '+3', trend: 'up', color: 'wood', data: generateSparklineData() },
  { label: 'Active Projects', value: '8', icon: TrendingUp, change: '+2', trend: 'up', color: 'info', data: generateSparklineData() },
  { label: 'Carpenters', value: '45', icon: Users, change: '38 available', trend: 'neutral', color: 'walnut', data: generateSparklineData() },
  { label: 'Pending Payments', value: '₹2.4L', icon: CreditCard, change: '-₹30k', trend: 'down', color: 'warning', data: generateSparklineData() },
  { label: 'Completed Tasks', value: '156', icon: CheckCircle, change: '+23', trend: 'up', color: 'success', data: generateSparklineData() },
  { label: 'Open Issues', value: '7', icon: AlertCircle, change: '-2', trend: 'down', color: 'error', data: generateSparklineData() },
];

const colorStyles: Record<string, { bg: string; iconBg: string; icon: string; sparkline: string }> = {
  wood: { bg: 'bg-white', iconBg: 'bg-wood-100', icon: 'text-wood-600', sparkline: '#b8860b' },
  info: { bg: 'bg-white', iconBg: 'bg-info-light', icon: 'text-info', sparkline: '#1565c0' },
  walnut: { bg: 'bg-white', iconBg: 'bg-wood-100', icon: 'text-walnut', sparkline: '#5c4033' },
  warning: { bg: 'bg-white', iconBg: 'bg-warning-light', icon: 'text-warning-dark', sparkline: '#f9a825' },
  success: { bg: 'bg-white', iconBg: 'bg-success-light', icon: 'text-success', sparkline: '#2e7d32' },
  error: { bg: 'bg-white', iconBg: 'bg-error-light', icon: 'text-error', sparkline: '#c62828' },
};

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat) => {
        const styles = colorStyles[stat.color];
        return (
          <div
            key={stat.label}
            className={`${styles.bg} p-4 rounded-lg border border-border-light shadow-sm hover:shadow-wood transition-all`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className={`w-10 h-10 ${styles.iconBg} rounded-lg flex items-center justify-center`}>
                <stat.icon size={20} className={styles.icon} />
              </div>
              <div className="w-16 h-8">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stat.data}>
                    <Line type="monotone" dataKey="value" stroke={styles.sparkline} strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
            <p className="text-sm text-text-muted">{stat.label}</p>
            <div className="flex items-center gap-1 mt-1">
              {stat.trend === 'up' && <ArrowUp size={12} className="text-success" />}
              {stat.trend === 'down' && <ArrowDown size={12} className={stat.color === 'error' ? 'text-success' : 'text-error'} />}
              <span className={`text-xs ${stat.trend === 'up' ? 'text-success' : stat.trend === 'down' ? (stat.color === 'error' ? 'text-success' : 'text-error') : 'text-text-muted'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
