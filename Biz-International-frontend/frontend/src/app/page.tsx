// src/app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  // simple redirect to dashboard
  redirect("/dashboard");
}
