"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/lib/api";
import { Eye, EyeOff, Loader2 } from "lucide-react";

type Form = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<Form>();
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(data: Form) {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/auth/login", data);

      /**
       * Expected backend response
       * {
       *   access_token,
       *   user: { id, name, email, role }
       * }
       */
      const { access_token, user } = res.data;

      if (!access_token || !user) {
        throw new Error("Invalid login response");
      }

      // 🔐 Persist session
      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("activeRole", user.role);

      // 🚦 Role-based routing
      switch (user.role) {
        case "SUPERVISOR":
          router.replace("/dashboard/supervisor");
          break;
        case "ACCOUNTS":
          router.replace("/dashboard/accounts");
          break;
        case "DISPATCHER":
          router.replace("/dashboard/dispatcher");
          break;
        case "MANAGER":
        case "OWNER":
        default:
          router.replace("/dashboard");
      }
    } catch (e: any) {
      setError(e?.response?.data?.message ?? "Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-neutral-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Logo / Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-amber-700">
            Biz International
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Door & Frame ERP
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="admin@bizintl.com"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative mt-1">
              <input
                {...register("password", { required: true })}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-2.5 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-2.5 rounded-lg font-medium transition disabled:opacity-60"
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            Sign In
          </button>
        </form>

        {/* Role hint */}
        <div className="mt-6 text-xs text-center text-muted-foreground">
          Access is role-based: Supervisor, Manager, Accounts, Dispatcher, Owner
        </div>
      </div>
    </div>
  );
}
