"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconAlertTriangle, IconLock } from "@tabler/icons-react";

export default function LoginPage() {
  const router = useRouter();
  const [empCode, setEmpCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ empCode, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Đăng nhập thất bại");
      }

      document.cookie = `tbs_token=${data.token}; path=/; max-age=86400`;
      router.push(data.redirectUrl);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Có lỗi xảy ra khi đăng nhập";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent-deep px-4">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-md bg-accent-deep/85 backdrop-blur-xl p-8 rounded-3xl border border-accent-soft/20 shadow-2xl text-white">
        {/* Logo & title */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-accent-light/20 border border-accent-soft/20 flex items-center justify-center">
            <IconLock size={28} className="text-accent-soft" />
          </div>
          <h1 className="text-2xl font-black text-gold-light text-display">
            Đăng nhập hệ thống TBS
          </h1>
          <p className="text-xs text-white/35 mt-1">
            Cổng số hóa giấy tờ & điều hành vận hành nhà máy
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-300 text-xs text-center font-medium flex items-center justify-center gap-1.5">
            <IconAlertTriangle size={16} className="shrink-0" />
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-white/45 mb-1.5 uppercase tracking-wider">
              Mã nhân viên / Email
            </label>
            <input
              type="text"
              required
              value={empCode}
              onChange={(e) => setEmpCode(e.target.value)}
              placeholder="VD: EMP-001 hoặc admin@tbsgroup.vn"
              className="w-full px-4 py-3 rounded-xl bg-accent-mid/60 border border-accent-soft/20 text-white placeholder-white/25 focus:outline-none focus:border-accent-soft focus:ring-2 focus:ring-accent/15 text-sm transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/45 mb-1.5 uppercase tracking-wider">
              Mật khẩu
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-accent-mid/60 border border-accent-soft/20 text-white placeholder-white/25 focus:outline-none focus:border-accent-soft focus:ring-2 focus:ring-accent/15 text-sm transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-accent-light hover:bg-accent-soft text-white font-bold text-sm shadow-lg shadow-accent/20 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Đang xác thực..." : "Đăng nhập hệ thống"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/8 text-center text-xs text-white/25 space-y-2">
          <p>Dành riêng cho Cán bộ Công nhân viên TBS Group</p>
          <Link
            href="/"
            className="text-accent-soft hover:text-accent-soft/80 transition-colors inline-block"
          >
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
