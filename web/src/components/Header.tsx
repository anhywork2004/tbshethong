'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#08221a]/95 backdrop-blur-md border-b border-[#158a63]/20 text-white">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#158a63] to-[#2fd39a] flex items-center justify-center font-bold text-xl shadow-lg shadow-[#158a63]/30">
            TBS
          </div>
          <div>
            <div className="font-bold text-lg leading-tight tracking-wide text-[#f2dc9a]">TBS GROUP</div>
            <div className="text-xs text-gray-300">Hệ Thống Số Hóa & Vận Hành</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-200">
          <Link href="/" className="hover:text-[#2fd39a] transition-colors">Trang chủ</Link>
          <Link href="/about" className="hover:text-[#2fd39a] transition-colors">Giới thiệu</Link>
          <Link href="/careers" className="hover:text-[#2fd39a] transition-colors">Tuyển dụng</Link>
          <Link href="/contact" className="hover:text-[#2fd39a] transition-colors">Liên hệ</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#158a63] to-[#1fae7d] hover:from-[#1fae7d] hover:to-[#2fd39a] text-white font-medium text-sm transition-all shadow-md shadow-[#158a63]/30"
          >
            Đăng nhập hệ thống
          </Link>
        </div>
      </div>
    </header>
  );
}
