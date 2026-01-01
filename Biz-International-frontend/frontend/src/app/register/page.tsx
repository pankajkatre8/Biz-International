"use client";

import { useForm } from "react-hook-form";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

const ROLES = [
  "OWNER",
  "MANAGER",
  "SUPERVISOR",
  "ACCOUNTS",
  "DISPATCHER",
];

export default function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  async function onSubmit(data: any) {
    await api.post("/auth/register", data);
    router.replace("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-6 bg-white shadow rounded space-y-4"
      >
        <h1 className="text-xl font-bold">Create Account</h1>

        <input {...register("name")} placeholder="Name" className="input" />
        <input {...register("email")} placeholder="Email" className="input" />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="input"
        />

        <select {...register("role")} className="input">
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <button className="btn-primary w-full">Register</button>
      </form>
    </div>
  );
}
