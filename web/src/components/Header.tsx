"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { IconArrowRight, IconMenu2, IconX } from '@tabler/icons-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3 transition-all duration-300 pointer-events-none">
      <div className={`max-w-6xl mx-auto pointer-events-auto transition-all duration-500 rounded-full px-5 py-2.5 flex items-center justify-between border ${
        scrolled
          ? 'bg-[#08221a]/90 border-[#2fd39a]/35 shadow-2xl shadow-emerald-950/80 backdrop-blur-2xl py-2'
          : 'bg-[#08221a]/75 border-[#2fd39a]/20 backdrop-blur-xl shadow-xl shadow-emerald-950/40'
      }`}>
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#158a63] via-[#1fae7d] to-[#2fd39a] p-0.5 shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#08221a] rounded-[calc(1rem-2px)] flex items-center justify-center font-black text-white text-sm">
              TBS
            </div>
          </div>
          <div>
            <div className="font-extrabold text-white text-base tracking-wider leading-none flex items-center gap-1.5">
              TBS GROUP
              <span className="w-1.5 h-1.5 rounded-full bg-[#2fd39a] animate-pulse" />
            </div>
            <span className="text-[9.5px] text-[#f2dc9a] font-bold uppercase tracking-widest block mt-0.5">
              Hệ Thống Vận Hành II
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-bold text-gray-300 uppercase tracking-widest">
          <Link href="#sectors" className="hover:text-[#2fd39a] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#2fd39a] after:scale-x-0 hover:after:scale-x-100 after:transition-transform">
            Ngành Trụ Cột
          </Link>
          <Link href="/documents/templates" className="hover:text-[#2fd39a] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#2fd39a] after:scale-x-0 hover:after:scale-x-100 after:transition-transform">
            Số Hóa Biểu Mẫu
          </Link>
          <Link href="/maintenance/machines" className="hover:text-[#2fd39a] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#2fd39a] after:scale-x-0 hover:after:scale-x-100 after:transition-transform">
            Bảo Trì Máy
          </Link>
          <Link href="/dashboard" className="hover:text-[#2fd39a] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#2fd39a] after:scale-x-0 hover:after:scale-x-100 after:transition-transform">
            BI Dashboard
          </Link>
        </nav>

        {/* Right CTA Button with Trailing Icon */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/login"
            className="group relative inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-r from-[#d9b96a] via-[#f2dc9a] to-[#d9b96a] text-[#08221a] font-extrabold text-xs tracking-wide shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-[0.98] transition-all duration-200"
          >
            <span>Đăng Nhập</span>
            <div className="w-6 h-6 rounded-full bg-[#08221a]/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-200">
              <IconArrowRight size={13} className="text-[#08221a]" />
            </div>
          </Link>
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
        <div className="md:hidden fixed inset-x-4 top-20 p-6 rounded-3xl bg-[#08221a]/95 border border-[#2fd39a]/30 backdrop-blur-2xl shadow-2xl shadow-emerald-950/90 pointer-events-auto space-y-4 text-center animate-in fade-in slide-in-from-top-4 duration-300">
          <Link
            href="#sectors"
            onClick={() => setMobileOpen(false)}
            className="block py-2.5 text-sm font-bold text-gray-200 hover:text-[#2fd39a] border-b border-white/10"
          >
            Ngành Trụ Cột
          </Link>
          <Link
            href="/documents/templates"
            onClick={() => setMobileOpen(false)}
            className="block py-2.5 text-sm font-bold text-gray-200 hover:text-[#2fd39a] border-b border-white/10"
          >
            Số Hóa Biểu Mẫu
          </Link>
          <Link
            href="/maintenance/machines"
            onClick={() => setMobileOpen(false)}
            className="block py-2.5 text-sm font-bold text-gray-200 hover:text-[#2fd39a] border-b border-white/10"
          >
            Bảo Trì Máy Móc
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileOpen(false)}
            className="block py-2.5 text-sm font-bold text-gray-200 hover:text-[#2fd39a] border-b border-white/10"
          >
            BI Dashboard 24/7
          </Link>
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-gradient-to-r from-[#d9b96a] to-[#f2dc9a] text-[#08221a] font-extrabold text-sm shadow-xl"
          >
            Truy Cập Đăng Nhập
            <IconArrowRight size={16} />
          </Link>
        </div>
      )}
    </header>
  );
}
