// src/components/ui/navbar.tsx
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="w-full border-b bg-white px-4 py-2 flex items-center justify-between">
      <div className="font-semibold">Biz Intl</div>
      <nav className="space-x-4">
        <Link href="/dashboard" className="text-sm">Dashboard</Link>
        <Link href="/projects" className="text-sm">Projects</Link>
      </nav>
    </div>
  );
}
