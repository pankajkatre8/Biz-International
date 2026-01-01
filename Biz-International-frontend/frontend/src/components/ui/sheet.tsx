// src/components/ui/sheet.tsx
import React from "react";
import cn from "clsx";

export function Sheet({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-96 bg-white p-4 shadow-xl">
        {children}
      </div>
    </div>
  );
}
export default Sheet;
