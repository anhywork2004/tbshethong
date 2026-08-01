"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  IconLogin,
  IconNews,
  IconBuildingFactory,
  IconBriefcase,
  IconPhone,
  IconInfoCircle,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";

const NAV_ITEMS = [
  { label: "Giới thiệu", href: "/about", icon: IconInfoCircle },
  { label: "Lĩnh vực", href: "/#sectors", icon: IconBuildingFactory },
  { label: "Tin tức", href: "/news", icon: IconNews },
  { label: "Tuyển dụng", href: "/careers", icon: IconBriefcase },
  { label: "Liên hệ", href: "/contact", icon: IconPhone },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-accent-deep/97 backdrop-blur-xl shadow-2xl shadow-black/15 border-b border-accent/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-11 h-11 rounded-xl bg-white/10 backdrop-blur border border-white/15 flex items-center justify-center overflow-hidden group-hover:border-accent-soft/40 transition-all duration-300">
              <img
                src="/images/crawled/logo.png"
                alt="TBS"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <span className="block text-white font-bold text-sm tracking-wide leading-tight">
                TBS GROUP
              </span>
              <span className="block text-accent-soft text-[9px] tracking-[0.2em] uppercase font-semibold">
                Digital Factory II
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-white/65 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
              >
                <span className="flex items-center gap-1.5">
                  <item.icon
                    size={16}
                    className="opacity-50 group-hover:opacity-100 transition-opacity"
                  />
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center gap-2 bg-accent-light hover:bg-accent-soft text-white font-bold px-5 py-2.5 rounded-full text-xs tracking-wider uppercase shadow-lg shadow-accent/15 hover:shadow-accent/25 active:scale-[0.97] transition-all duration-200"
            >
              <IconLogin size={15} />
              Đăng nhập
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 text-white/75 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Menu"
            >
              {mobileOpen ? <IconX size={26} /> : <IconMenu2 size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-[72px] bg-accent-deep/98 backdrop-blur-xl transition-all duration-400 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <nav className="flex flex-col p-6 gap-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-5 py-4 text-white text-base font-medium rounded-2xl hover:bg-white/5 active:bg-white/10 transition-colors"
            >
              <item.icon size={20} className="text-accent-soft" />
              {item.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="mt-4 w-full flex justify-center items-center gap-2 bg-accent-light text-white font-bold py-4 rounded-2xl text-sm tracking-wider uppercase active:scale-[0.98] transition-all"
          >
            <IconLogin size={18} />
            Đăng nhập hệ thống
          </Link>
        </nav>
      </div>
    </header>
  );
}
