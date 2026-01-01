// src/components/layouts/Header.tsx
"use client";

import React, { useState } from "react";
import { Bell, Search, ChevronDown, Menu, User } from "lucide-react";

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-border-light px-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      {/* Left: Search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button className="lg:hidden p-2 text-text-muted hover:text-text-primary hover:bg-surface-hover rounded-wood transition-all">
          <Menu size={20} />
        </button>
        
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" size={18} />
          <input
            placeholder="Search projects, carpenters, doors..."
            className="w-full pl-10 pr-4 py-2 bg-surface-secondary border border-border-light rounded-wood text-text-primary placeholder-text-light focus:outline-none focus:border-wood-500 focus:ring-2 focus:ring-wood-500/20 transition-all text-sm"
          />
        </div>
      </div>

      {/* Right: Notifications & User */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-text-muted hover:text-wood-600 hover:bg-wood-50 rounded-wood transition-all"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full animate-pulse" />
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-border-light rounded-lg shadow-wood-lg overflow-hidden">
              <div className="p-4 border-b border-border-light">
                <h3 className="text-sm font-semibold text-text-primary">Notifications</h3>
                <p className="text-xs text-text-muted">You have 3 unread notifications</p>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <NotificationItem
                  title="New project assigned"
                  message="You've been assigned to Skyline Apartments"
                  time="5 min ago"
                  unread
                />
                <NotificationItem
                  title="Payment approved"
                  message="₹25,000 payment for carpenter Rajesh approved"
                  time="1 hour ago"
                  unread
                />
                <NotificationItem
                  title="Issue reported"
                  message="Wrong frame dimension at Green Valley, Floor 3"
                  time="2 hours ago"
                  unread
                />
                <NotificationItem
                  title="Task completed"
                  message="Door installation completed at Tech Park"
                  time="1 day ago"
                />
              </div>
              <div className="p-3 border-t border-border-light text-center">
                <button className="text-sm text-wood-600 hover:text-wood-700 font-medium">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative pl-3 border-l border-border-light">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 hover:bg-surface-hover px-3 py-2 rounded-wood transition-all"
          >
            <div className="text-right hidden md:block">
              <p className="text-sm text-text-primary font-medium">Admin User</p>
              <p className="text-xs text-text-muted">Manager</p>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-wood-400 to-wood-600 rounded-full flex items-center justify-center text-white font-medium shadow-sm">
              AD
            </div>
            <ChevronDown size={16} className="text-text-muted" />
          </button>

          {/* User Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-border-light rounded-lg shadow-wood-lg overflow-hidden">
              <div className="p-4 border-b border-border-light">
                <p className="text-sm font-semibold text-text-primary">Admin User</p>
                <p className="text-xs text-text-muted">admin@bizintl.com</p>
                <span className="inline-block mt-2 px-2 py-0.5 bg-wood-100 text-wood-700 text-xs rounded-full">
                  Manager Role
                </span>
              </div>
              <div className="py-2">
                <MenuLink icon={User} label="Profile Settings" href="/profile" />
                <MenuLink icon={Bell} label="Notifications" href="/notifications" />
                <MenuLink icon={ChevronDown} label="Switch Role" href="/switch-role" />
              </div>
              <div className="border-t border-border-light p-2">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-error hover:bg-error-light rounded-wood transition-all text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// Helper Components
function NotificationItem({
  title,
  message,
  time,
  unread = false,
}: {
  title: string;
  message: string;
  time: string;
  unread?: boolean;
}) {
  return (
    <div className={`p-4 border-b border-border-light hover:bg-surface-hover transition-all cursor-pointer ${unread ? 'bg-wood-50/30' : ''}`}>
      <div className="flex items-start gap-3">
        {unread && <div className="w-2 h-2 bg-wood-500 rounded-full mt-1.5 flex-shrink-0" />}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-text-primary">{title}</p>
          <p className="text-xs text-text-muted mt-0.5">{message}</p>
          <p className="text-xs text-text-light mt-1">{time}</p>
        </div>
      </div>
    </div>
  );
}

function MenuLink({
  icon: Icon,
  label,
  href,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 px-4 py-2 text-sm text-text-primary hover:bg-surface-hover transition-all"
    >
      <Icon size={16} className="text-text-muted" />
      {label}
    </a>
  );
}
