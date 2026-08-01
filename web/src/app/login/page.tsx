'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [empCode, setEmpCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ empCode, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Đăng nhập thất bại');
      }

      // Save token in cookie & redirect
      document.cookie = `tbs_token=${data.token}; path=/; max-age=86400`;
      router.push(data.redirectUrl);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Có lỗi xảy ra khi đăng nhập';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#08221a] via-[#0f4133] to-[#158a63] px-4">
      <div className="w-full max-w-md bg-[#08221a]/90 backdrop-blur-xl p-8 rounded-3xl border border-[#2fd39a]/30 shadow-2xl text-white">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#158a63] to-[#2fd39a] flex items-center justify-center font-extrabold text-2xl text-white shadow-lg shadow-[#158a63]/40">
            TBS
          </div>
          <h1 className="text-2xl font-bold text-[#f2dc9a]">Đăng Nhập Hệ Thống TBS</h1>
          <p className="text-xs text-gray-300 mt-1">Cổng Số Hóa Giấy Tờ & Điều Hành Vận Hành Nhà Máy</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs text-center font-medium">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
              Mã Nhân Viên / Email *
            </label>
            <input
              type="text"
              required
              value={empCode}
              onChange={(e) => setEmpCode(e.target.value)}
              placeholder="VD: EMP-001 hoặc admin@tbsgroup.vn"
              className="w-full px-4 py-3 rounded-xl bg-[#0f4133]/80 border border-emerald-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-[#2fd39a] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
              Mật Khẩu *
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-[#0f4133]/80 border border-emerald-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-[#2fd39a] text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#158a63] to-[#2fd39a] hover:from-[#1fae7d] hover:to-[#2fd39a] text-white font-bold text-sm shadow-lg shadow-emerald-900/50 transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Đang xác thực...' : 'Đăng Nhập Hệ Thống'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-700/60 text-center text-xs text-gray-400 space-y-2">
          <p>Dành riêng cho Cán bộ Công nhân viên TBS Group</p>
          <Link href="/" className="text-[#2fd39a] hover:underline inline-block">
            ← Quay lại trang chủ công khai
          </Link>
        </div>
      </div>
    </div>
  );
}
