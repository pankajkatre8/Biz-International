"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getStoredUser } from "@/lib/utils";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const user = getStoredUser();

    // Not logged in → login
    if (!user && pathname !== "/login") {
      router.replace("/login");
      return;
    }

    // Supervisor should never see admin dashboard
    if (user?.role === "SUPERVISOR" && pathname === "/dashboard") {
      router.replace("/dashboard/supervisor");
    }
  }, [pathname, router]);

  return <>{children}</>;
}
