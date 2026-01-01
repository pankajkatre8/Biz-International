"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getStoredUser } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  LogOut,
  DoorOpen,
} from "lucide-react";

/* ---------- Types ---------- */
type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

/* ---------- Role Menus ---------- */
const SUPERVISOR_SECTIONS: NavSection[] = [
  {
    title: "Work",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard/supervisor",
        icon: LayoutDashboard,
      },
      {
        label: "Projects",
        href: "/projects",
        icon: Building2,
      },
    ],
  },
];

const ADMIN_SECTIONS: NavSection[] = [
  {
    title: "Management",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Projects",
        href: "/projects",
        icon: Building2,
      },
    ],
  },
];

/* ---------- Sidebar ---------- */
export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const user = getStoredUser();
  const role = user?.role;

  const sections =
    role === "SUPERVISOR" ? SUPERVISOR_SECTIONS : ADMIN_SECTIONS;

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  return (
    <aside className="w-64 bg-sidebar-bg min-h-screen p-4 flex flex-col border-r border-wood-800">
      {/* Brand */}
      <div className="mb-6 px-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-wood-400 to-wood-600 rounded-wood flex items-center justify-center">
            <DoorOpen size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-text">
              Biz International
            </h1>
            <p className="text-xs text-sidebar-muted">
              Door & Frame ERP
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="px-3 mb-2 text-[10px] uppercase tracking-wider text-sidebar-muted">
              {section.title}
            </p>

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-wood text-sm transition ${
                      active
                        ? "bg-gradient-to-r from-wood-500 to-wood-600 text-white"
                        : "text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-text"
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User / Logout */}
      <div className="border-t border-wood-800 pt-4 mt-4">
        <div className="px-3 py-2 mb-2">
          <p className="text-sm font-medium text-sidebar-text truncate">
            {user?.email || "Supervisor"}
          </p>
          <p className="text-xs text-sidebar-muted">
            {role}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-sidebar-muted hover:text-red-500 hover:bg-red-500/10 rounded-wood transition"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
