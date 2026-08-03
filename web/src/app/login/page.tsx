"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconAlertTriangle, IconLock, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";

function getBaseUrl(): string {
  if (typeof window === "undefined") return "";
  const host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1") {
    return "http://localhost:8000";
  }
  return `https://${host}`;
}

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
      const baseUrl = getBaseUrl();
      const isLocalDev =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

      let res: Response;

      if (isLocalDev) {
        res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ empCode, password }),
        });

        if (res.status === 404 || res.status === 405) {
          res = await fetch(`${baseUrl}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: empCode, password }),
          });
        }
      } else {
        res = await fetch(`${baseUrl}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: empCode, password }),
        });
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Đăng nhập thất bại");
      }

      document.cookie = `tbs_token=${data.token}; path=/; max-age=86400`;

      const redirectUrl =
        data.redirectUrl ||
        (data.user?.role === "SUPER_ADMIN" ? "/admin/users" : "/dashboard");

      router.push(redirectUrl);
    } catch (err: unknown) {
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        setError(
          "Không thể kết nối đến máy chủ. Vui lòng đảm bảo backend đang chạy trên cổng 8000."
        );
      } else {
        const message =
          err instanceof Error ? err.message : "Có lỗi xảy ra khi đăng nhập";
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#08221a] via-[#0f4133] to-[#08221a] px-4 sm:px-6 relative overflow-hidden font-sans antialiased">
      {/* Background ambient radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-emerald-500/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />

      {/* DOPPELRAND (DOUBLE-BEZEL) OUTER CONTAINER */}
      <div className="relative w-full max-w-md p-2 rounded-[2.2rem] bg-white/5 border border-[#2fd39a]/30 shadow-2xl shadow-emerald-950/90 backdrop-blur-2xl">
        {/* INNER CORE CONTAINER */}
        <div className="rounded-[calc(2.2rem-0.5rem)] bg-[#08221a]/90 p-8 sm:p-10 border border-white/10 shadow-inner text-white space-y-6">
          
          {/* Brand & Title Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-[#158a63] via-[#1fae7d] to-[#2fd39a] p-0.5 shadow-xl shadow-emerald-950/80">
              <div className="w-full h-full bg-[#08221a] rounded-[calc(1rem-2px)] flex items-center justify-center">
                <IconLock size={30} className="text-[#2fd39a]" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Cổng Đăng Nhập TBS II
              </h1>
              <p className="text-xs text-gray-300 mt-1 max-w-xs mx-auto">
                Số hóa biểu mẫu & Quản lý vận hành nhà máy 24/7
              </p>
            </div>
          </div>

          {/* Error Message Alert */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs text-center font-semibold flex items-center justify-center gap-2 animate-in fade-in duration-200">
              <IconAlertTriangle size={18} className="shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-[#f2dc9a] mb-1.5 uppercase tracking-widest">
                Mã nhân viên / Email
              </label>
              <input
                type="text"
                required
                value={empCode}
                onChange={(e) => setEmpCode(e.target.value)}
                placeholder="VD: EMP-001 hoặc admin@tbsgroup.vn"
                className="w-full px-4 py-3 rounded-xl bg-[#0f4133]/60 border border-emerald-500/25 text-white placeholder-gray-400 focus:outline-none focus:border-[#2fd39a] focus:ring-2 focus:ring-[#2fd39a]/20 text-sm transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#f2dc9a] mb-1.5 uppercase tracking-widest">
                Mật khẩu
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-[#0f4133]/60 border border-emerald-500/25 text-white placeholder-gray-400 focus:outline-none focus:border-[#2fd39a] focus:ring-2 focus:ring-[#2fd39a]/20 text-sm transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full py-3.5 rounded-full bg-gradient-to-r from-[#d9b96a] via-[#f2dc9a] to-[#d9b96a] text-[#08221a] font-extrabold text-sm shadow-xl shadow-amber-500/20 hover:brightness-110 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>{loading ? "Đang xác thực..." : "Đăng Nhập Hệ Thống"}</span>
              <div className="w-6 h-6 rounded-full bg-[#08221a]/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-200">
                <IconArrowRight size={14} className="text-[#08221a]" />
              </div>
            </button>
          </form>

          {/* Dev Hint Box */}
          <div className="p-3 rounded-xl bg-[#0f4133]/40 border border-white/5 text-[10px] text-gray-400 text-center font-mono">
            🔑 Dev Pass: admin@tbsgroup.vn / Admin@123456
          </div>

          {/* Footer Back Link */}
          <div className="pt-2 text-center text-xs text-gray-400 border-t border-white/10 flex items-center justify-between">
            <span>Dành riêng cho CBCNV TBS Group</span>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-[#2fd39a] hover:underline font-bold transition-colors"
            >
              <IconArrowLeft size={14} /> Trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
