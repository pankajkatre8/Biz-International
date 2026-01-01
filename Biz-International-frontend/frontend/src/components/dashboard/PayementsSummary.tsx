// src/components/dashboard/PaymentsSummary.tsx
"use client";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import Link from "next/link";

export default function PaymentsSummary() {
  const { data: pending, isLoading } = useQuery({
    queryKey: ["payments", "pending"],
    queryFn: () => api.fetchPendingPayments(6),
    staleTime: 1000 * 30,
  });

  if (isLoading) return <div>Loading payments…</div>;

  return (
    <div className="bg-white border rounded-lg p-4">
      <h3 className="font-semibold mb-3">Pending Payments</h3>
      {pending!.length === 0 ? (
        <div className="text-sm text-muted-foreground">No pending approvals</div>
      ) : (
        <ul className="space-y-2">
          {pending!.map((p: any) => (
            <li key={p.id} className="p-2 rounded hover:bg-neutral-50">
              <div className="text-sm">{p.amount} INR</div>
              <div className="text-xs text-muted-foreground">Task: {p.taskId}</div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-3">
        <Link href="/payments" className="text-sm text-blue-600">
          View all payments
        </Link>
      </div>
    </div>
  );
}
