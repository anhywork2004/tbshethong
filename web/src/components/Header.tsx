"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { IconArrowRight, IconMenu2, IconX, IconLogout, IconUserCheck } from '@tabler/icons-react';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<{ empCode?: string; name?: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);

      if (currentY > lastScrollY.current && currentY > 80) {
        // Cuộn xuống → ẩn header
        setHidden(true);
        setMobileOpen(false);
      } else {
        // Cuộn lên → hiện header
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll);

    const checkAuth = () => {
      const cookies = document.cookie.split('; ');
      const tokenCookie = cookies.find((row) => row.startsWith('tbs_token='));
      const token = tokenCookie ? tokenCookie.split('=')[1] : null;

      if (token) {
        setIsLoggedIn(true);
        try {
          const payloadBase64 = token.split('.')[1];
          if (payloadBase64) {
            const decoded = JSON.parse(atob(payloadBase64));
            setUserInfo({ empCode: decoded.empCode, name: decoded.name });
          }
        } catch {
          setUserInfo({ name: 'CBCNV TBS' });
        }
      } else {
        setIsLoggedIn(false);
        setUserInfo(null);
      }
    };

    checkAuth();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleLogout = () => {
    document.cookie = 'tbs_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setIsLoggedIn(false);
    setUserInfo(null);
    setMobileOpen(false);
    router.push('/');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3 transition-all duration-500 pointer-events-none ${hidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
      <div className={`max-w-6xl mx-auto pointer-events-auto transition-all duration-500 rounded-full px-5 py-2.5 flex items-center justify-between border ${
        scrolled
          ? 'bg-[#08221a]/90 border-[#2fd39a]/35 shadow-2xl shadow-emerald-950/80 backdrop-blur-2xl py-2'
          : 'bg-[#08221a]/75 border-[#2fd39a]/20 backdrop-blur-xl shadow-xl shadow-emerald-950/40'
      }`}>
        {/* Brand Logo */}
        <Link href="/" className="flex items-center group">
          <img
            src="/images/tbs-logo.png"
            alt="TBS Group"
            className="h-9 w-auto object-contain brightness-0 invert group-hover:opacity-90 transition-opacity duration-200"
          />
          {isLoggedIn && (
            <span className="ml-3 text-[9.5px] text-[#f2dc9a] font-bold uppercase tracking-widest hidden sm:block border-l border-white/20 pl-3">
              Nội Bộ II
            </span>
          )}
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-gray-300 uppercase tracking-widest">
          {/* PUBLIC LINKS — Always visible */}
          <Link href="/" className="hover:text-[#2fd39a] transition-colors py-1">
            Trang Chủ
          </Link>
          <Link href="/#sectors" className="hover:text-[#2fd39a] transition-colors py-1">
            Ngành Trụ Cột
          </Link>
          <Link href="/about" className="hover:text-[#2fd39a] transition-colors py-1">
            Về TBS
          </Link>
          <Link href="/careers" className="hover:text-[#2fd39a] transition-colors py-1">
            Tuyển Dụng
          </Link>

          {/* INTERNAL OPERATIONAL TABS — ONLY VISIBLE AFTER LOGIN */}
          {isLoggedIn && (
            <>
              <Link href="/documents/templates" className="hover:text-[#2fd39a] transition-colors py-1 text-[#2fd39a]">
                Số Hóa Biểu Mẫu
              </Link>
              <Link href="/maintenance/machines" className="hover:text-[#2fd39a] transition-colors py-1 text-[#2fd39a]">
                Bảo Trì Máy
              </Link>
              <Link href="/dashboard" className="hover:text-[#2fd39a] transition-colors py-1 text-[#2fd39a]">
                BI Dashboard
              </Link>
            </>
          )}

          <Link href="/news" className="hover:text-[#2fd39a] transition-colors py-1">
            Tin Tức
          </Link>
        </nav>

        {/* Right Action Button (Login vs User Profile / Logout) */}
        <div className="hidden sm:flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#f2dc9a] flex items-center gap-1 bg-[#0f4133]/60 px-3 py-1.5 rounded-full border border-emerald-500/30">
                <IconUserCheck size={14} className="text-[#2fd39a]" />
                {userInfo?.empCode || userInfo?.name || 'CBCNV TBS'}
              </span>
              <button
                onClick={handleLogout}
                className="group relative inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 font-bold text-xs hover:bg-red-500/30 transition-all duration-200"
              >
                <IconLogout size={14} />
                <span>Đăng Xuất</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="group relative inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-r from-[#d9b96a] via-[#f2dc9a] to-[#d9b96a] text-[#08221a] font-extrabold text-xs tracking-wide shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-[0.98] transition-all duration-200"
            >
              <span>Đăng Nhập</span>
              <div className="w-6 h-6 rounded-full bg-[#08221a]/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-200">
                <IconArrowRight size={13} className="text-[#08221a]" />
              </div>
            </Link>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <IconX size={18} /> : <IconMenu2 size={18} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-x-4 top-20 p-6 rounded-3xl bg-[#08221a]/95 border border-[#2fd39a]/30 backdrop-blur-2xl shadow-2xl shadow-emerald-950/90 pointer-events-auto space-y-3 text-center animate-in fade-in slide-in-from-top-4 duration-300">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-sm font-bold text-gray-200 hover:text-[#2fd39a] border-b border-white/10"
          >
            Trang Chủ
          </Link>
          <Link
            href="/#sectors"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-sm font-bold text-gray-200 hover:text-[#2fd39a] border-b border-white/10"
          >
            Ngành Trụ Cột
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-sm font-bold text-gray-200 hover:text-[#2fd39a] border-b border-white/10"
          >
            Về TBS Group
          </Link>
          <Link
            href="/careers"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-sm font-bold text-gray-200 hover:text-[#2fd39a] border-b border-white/10"
          >
            Tuyển Dụng
          </Link>

          {/* INTERNAL OPERATIONAL TABS — ONLY VISIBLE AFTER LOGIN */}
          {isLoggedIn && (
            <>
              <Link
                href="/documents/templates"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-bold text-[#2fd39a] border-b border-white/10"
              >
                Số Hóa Biểu Mẫu
              </Link>
              <Link
                href="/maintenance/machines"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-bold text-[#2fd39a] border-b border-white/10"
              >
                Bảo Trì Máy Móc
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-bold text-[#2fd39a] border-b border-white/10"
              >
                BI Dashboard 24/7
              </Link>
            </>
          )}

          <Link
            href="/news"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-sm font-bold text-gray-200 hover:text-[#2fd39a] border-b border-white/10"
          >
            Tin Tức & Truyền Thông
          </Link>

          <div className="pt-2">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 font-bold text-sm"
              >
                <IconLogout size={16} />
                Đăng Xuất ({userInfo?.empCode || 'CBCNV'})
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-gradient-to-r from-[#d9b96a] to-[#f2dc9a] text-[#08221a] font-extrabold text-sm shadow-xl"
              >
                Đăng Nhập Hệ Thống
                <IconArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
