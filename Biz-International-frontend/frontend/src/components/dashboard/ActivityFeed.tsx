// src/components/dashboard/ActivityFeed.tsx
'use client';

import React from 'react';
import { CheckCircle, AlertTriangle, User, CreditCard, DoorOpen, FileText } from 'lucide-react';

const activities = [
  { icon: CheckCircle, text: 'Door installation completed at Skyline Apt, Floor 5', user: 'Rajesh K.', time: '2 hours ago', type: 'success' },
  { icon: CreditCard, text: 'Payment of ₹25,000 approved for Royal Heights project', user: 'Admin', time: '3 hours ago', type: 'info' },
  { icon: AlertTriangle, text: 'Issue reported: Wrong frame size at Green Valley, Flat 4B', user: 'Amit S.', time: '4 hours ago', type: 'warning' },
  { icon: User, text: 'Carpenter Suresh assigned to Tech Park Tower, Floor 3-5', user: 'Admin', time: '5 hours ago', type: 'default' },
  { icon: DoorOpen, text: '24 new door specifications added for Sunset Residency', user: 'System', time: '6 hours ago', type: 'default' },
  { icon: FileText, text: 'Monthly report generated for October 2025', user: 'System', time: '1 day ago', type: 'info' },
];

const typeStyles: Record<string, { iconBg: string; iconColor: string; line: string }> = {
  success: { iconBg: 'bg-success-light', iconColor: 'text-success', line: 'bg-success' },
  warning: { iconBg: 'bg-warning-light', iconColor: 'text-warning-dark', line: 'bg-warning' },
  info: { iconBg: 'bg-info-light', iconColor: 'text-info', line: 'bg-info' },
  default: { iconBg: 'bg-wood-100', iconColor: 'text-wood-600', line: 'bg-wood-300' },
};

export default function ActivityFeed() {
  return (
    <div className="bg-white rounded-lg border border-border-light shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Recent Activity</h2>
        <button className="text-sm text-wood-600 hover:text-wood-700 font-medium">View All</button>
      </div>
      
      <div className="relative">
        {activities.map((activity, index) => {
          const styles = typeStyles[activity.type];
          return (
            <div key={index} className="flex gap-4 pb-6 last:pb-0">
              {/* Timeline line */}
              <div className="relative flex flex-col items-center">
                <div className={`w-10 h-10 ${styles.iconBg} rounded-full flex items-center justify-center z-10`}>
                  <activity.icon size={18} className={styles.iconColor} />
                </div>
                {index < activities.length - 1 && (
                  <div className={`w-0.5 flex-1 ${styles.line} opacity-30 mt-2`} />
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 pt-1">
                <p className="text-sm text-text-primary">{activity.text}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-text-muted">{activity.user}</span>
                  <span className="text-xs text-text-light">•</span>
                  <span className="text-xs text-text-light">{activity.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
