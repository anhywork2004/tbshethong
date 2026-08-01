"use client";

import React, { useState, useEffect } from "react";
import {
  IconSettings,
  IconClock,
  IconAlertTriangle,
  IconTrendingUp,
  IconBolt,
  IconShieldLock,
  IconRefresh,
  IconBuildingFactory,
  IconTruck,
  IconLayoutGrid,
  IconBuildingSkyscraper,
  IconGolf,
  IconShoppingCart,
  IconWorld,
  IconActivity,
  IconAccessPoint
} from "@tabler/icons-react";

// Mock Fallback Data matching structure from GET /api/machines/stats
const MOCK_BI_STATS: Record<string, any> = {
  "overview": {
    operationalSummary: { total: 658, active: 633, repair: 17, offline: 8 },
    kpi: { averageResponseSeconds: 280, averageResolutionSeconds: 1540 },
    topFailingMachines: [
      { name: "Máy May Điện Tử Juki #01", qrCode: "MCH-JUKI-01", failureCount: 14 },
      { name: "Máy Dập Chữ Brother #03", qrCode: "MCH-BRO-03", failureCount: 9 },
      { name: "Xe Nâng Kalmar #01", qrCode: "FL-KALMAR-01", failureCount: 4 }
    ],
    activeTickets: [
      { id: "1", machine: { name: "Máy May Juki #01", qrCode: "MCH-JUKI-01", area: "Chuyền may A" }, reporter: { fullName: "N.V. Hùng" }, status: "IN_PROGRESS", time: "10 phút trước" },
      { id: "2", machine: { name: "Máy Lạng Fortuna #04", qrCode: "MCH-FORT-04", area: "Khu cắt chặt C" }, reporter: { fullName: "T.T. Mai" }, status: "PENDING", time: "4 phút trước" },
      { id: "3", machine: { name: "Xe Nâng Kalmar #01", qrCode: "FL-KALMAR-01", area: "Bãi ICD Tân Vạn" }, reporter: { fullName: "L.M. Tuấn" }, status: "IN_PROGRESS", time: "15 phút trước" }
    ],
    financials: {
      orderOnTimePercentage: 99.3,
      monthlyVolumeLabel: "TỔNG ĐẦU RA SẢN LƯỢNG HỆ THỐNG",
      monthlyProductionVolume: "1.08M+ sản phẩm / tháng",
      targetCompletionRate: 98.9,
      energyEfficiency: "Hiệu quả chung: 95.8%"
    },
    lines: [
      { code: "Y10013", score: 98.4, status: "RUNNING" },
      { code: "B10091", score: 96.5, status: "RUNNING" },
      { code: "GATE-01", score: 99.5, status: "OPTIMAL" },
      { code: "POWER-STN", score: 99.9, status: "OPTIMAL" },
      { code: "GOLF-HUB", score: 99.5, status: "OPTIMAL" }
    ]
  },
  "da-giay": {
    operationalSummary: { total: 350, active: 338, repair: 8, offline: 4 },
    kpi: { averageResponseSeconds: 310, averageResolutionSeconds: 1620 },
    topFailingMachines: [
      { name: "Máy May Điện Tử Juki #01", qrCode: "MCH-JUKI-01", failureCount: 14 },
      { name: "Máy Dập Chữ Brother #03", qrCode: "MCH-BRO-03", failureCount: 9 },
      { name: "Máy Cắt Da Laser #02", qrCode: "MCH-LASER-02", failureCount: 8 }
    ],
    activeTickets: [
      { id: "1", machine: { name: "Máy May Juki #01", qrCode: "MCH-JUKI-01", area: "Chuyền may A" }, reporter: { fullName: "N.V. Hùng" }, status: "IN_PROGRESS", time: "10 phút trước" },
      { id: "2", machine: { name: "Máy Lạng Fortuna #04", qrCode: "MCH-FORT-04", area: "Khu cắt chặt C" }, reporter: { fullName: "T.T. Mai" }, status: "PENDING", time: "4 phút trước" }
    ],
    financials: {
      orderOnTimePercentage: 99.4,
      monthlyVolumeLabel: "SẢN LƯỢNG GIÀY THÁNG NÀY",
      monthlyProductionVolume: "842,500 đôi",
      targetCompletionRate: 98.7,
      energyEfficiency: "94.2%"
    },
    lines: [
      { code: "Y10013", score: 98.4, status: "RUNNING" },
      { code: "Y10112", score: 97.2, status: "RUNNING" },
      { code: "Y20001", score: 95.8, status: "OPTIMAL" },
      { code: "Y10168", score: 94.2, status: "OPTIMAL" },
      { code: "Y10167", score: 92.5, status: "WARNING" }
    ]
  },
  "tui-xach": {
    operationalSummary: { total: 180, active: 172, repair: 5, offline: 3 },
    kpi: { averageResponseSeconds: 285, averageResolutionSeconds: 1350 },
    topFailingMachines: [
      { name: "Máy Khâu Da Juki H1", qrCode: "MCH-JK-H1", failureCount: 8 },
      { name: "Máy Dập Logo Golden #02", qrCode: "MCH-GLD-02", failureCount: 5 }
    ],
    activeTickets: [
      { id: "tui-1", machine: { name: "Máy Khâu Juki H1", qrCode: "MCH-JK-H1", area: "Chuyền ráp túi B" }, reporter: { fullName: "P.V. Lực" }, status: "PENDING", time: "8 phút trước" }
    ],
    financials: {
      orderOnTimePercentage: 98.9,
      monthlyVolumeLabel: "SẢN LƯỢNG TÚI XÁCH THÁNG NÀY",
      monthlyProductionVolume: "245,000 sản phẩm",
      targetCompletionRate: 97.5,
      energyEfficiency: "95.0%"
    },
    lines: [
      { code: "B10091", score: 96.5, status: "RUNNING" },
      { code: "B10123", score: 95.4, status: "OPTIMAL" },
      { code: "B20032", score: 94.1, status: "RUNNING" }
    ]
  },
  "logistics": {
    operationalSummary: { total: 60, active: 56, repair: 3, offline: 1 },
    kpi: { averageResponseSeconds: 372, averageResolutionSeconds: 2055 },
    topFailingMachines: [
      { name: "Xe Nâng Kalmar #01", qrCode: "FL-KALMAR-01", failureCount: 4 },
      { name: "Cẩu Giàn RTG Mitsui #03", qrCode: "CR-MITSUI-03", failureCount: 3 }
    ],
    activeTickets: [
      { id: "log-1", machine: { name: "Xe Nâng Kalmar #01", qrCode: "FL-KALMAR-01", area: "Bãi ICD Tân Vạn" }, reporter: { fullName: "L.M. Tuấn" }, status: "IN_PROGRESS", time: "15 phút trước" }
    ],
    financials: {
      orderOnTimePercentage: 99.8,
      monthlyVolumeLabel: "SỨC CHỨA BÃI CONTAINER",
      monthlyProductionVolume: "48,200 / 60,000 TEUs",
      targetCompletionRate: 99.2,
      energyEfficiency: "Diện Tích Kho: 220.000m²"
    },
    lines: [
      { code: "GATE-01", score: 99.5, status: "OPTIMAL" },
      { code: "CRANE-03", score: 97.8, status: "RUNNING" },
      { code: "YARD-B4", score: 92.4, status: "WARNING" }
    ]
  },
  "bds-ha-tang": {
    operationalSummary: { total: 12, active: 11, repair: 1, offline: 0 },
    kpi: { averageResponseSeconds: 480, averageResolutionSeconds: 2700 },
    topFailingMachines: [
      { name: "Trạm Phát Điện KCN #01", qrCode: "GEN-KCN-01", failureCount: 2 }
    ],
    activeTickets: [],
    financials: {
      orderOnTimePercentage: 99.9,
      monthlyVolumeLabel: "TỶ LỆ LẤP ĐẦY KCN",
      monthlyProductionVolume: "94.5%",
      targetCompletionRate: 100,
      energyEfficiency: "Doanh Nghiệp KCN: 142 DN"
    },
    lines: [
      { code: "POWER-STN", score: 99.9, status: "OPTIMAL" },
      { code: "WATER-SYS", score: 98.4, status: "OPTIMAL" }
    ]
  },
  "du-lich": {
    operationalSummary: { total: 8, active: 8, repair: 0, offline: 0 },
    kpi: { averageResponseSeconds: 135, averageResolutionSeconds: 765 },
    topFailingMachines: [],
    activeTickets: [],
    financials: {
      orderOnTimePercentage: 100,
      monthlyVolumeLabel: "TẦN SUẤT ĐẶT SÂN GOLF",
      monthlyProductionVolume: "142 / 180 slots ngày",
      targetCompletionRate: 99.5,
      energyEfficiency: "Đánh Giá Khách Hàng: 4.85/5.0"
    },
    lines: [
      { code: "GOLF-HUB", score: 99.5, status: "OPTIMAL" },
      { code: "RESORT-01", score: 98.2, status: "OPTIMAL" }
    ]
  },
  "thuong-mai": {
    operationalSummary: { total: 48, active: 48, repair: 0, offline: 0 },
    kpi: { averageResponseSeconds: 165, averageResolutionSeconds: 980 },
    topFailingMachines: [],
    activeTickets: [],
    financials: {
      orderOnTimePercentage: 99.5,
      monthlyVolumeLabel: "ĐẠT CHỈ TIÊU DOANH SỐ",
      monthlyProductionVolume: "102.4% mục tiêu",
      targetCompletionRate: 98.9,
      energyEfficiency: "Thương Hiệu: ECCO, Cole Haan"
    },
    lines: [
      { code: "ECCO-HCM", score: 98.4, status: "OPTIMAL" },
      { code: "COLE-HN", score: 97.5, status: "OPTIMAL" }
    ]
  }
};

const DIVISIONS = [
  { id: "da-giay", name: "Sản Xuất Da Giày", icon: IconBuildingFactory },
  { id: "tui-xach", name: "Sản Xuất Túi Xách", icon: IconLayoutGrid },
  { id: "logistics", name: "Cảng & Logistics", icon: IconTruck },
  { id: "bds-ha-tang", name: "BĐS & Hạ Tầng", icon: IconBuildingSkyscraper },
  { id: "du-lich", name: "Du Lịch & Sân Golf", icon: IconGolf },
  { id: "thuong-mai", name: "Thương Mại & Dịch Vụ", icon: IconShoppingCart }
];

const MAP_LOCATIONS: Record<string, { lat: number; lng: number; label: string }> = {
  "da-giay": { lat: 10.2731, lng: 105.2828, label: "TBS Thoai Son Shoes" },
  "tui-xach": { lat: 10.9317, lng: 106.7122, label: "TBS Bags Factory" },
  "logistics": { lat: 10.9160, lng: 106.8200, label: "ICD Tan Van Logistics" },
  "bds-ha-tang": { lat: 11.0020, lng: 106.6970, label: "KCN Song Than 3" },
  "du-lich": { lat: 11.0450, lng: 106.6980, label: "Harmonie Golf Park" },
  "thuong-mai": { lat: 10.9790, lng: 106.6660, label: "ECCO Becamex Store" }
};

export default function BIScreen() {
  const [activeDivision, setActiveDivision] = useState<string>("overview");
  const [stats, setStats] = useState<any>(MOCK_BI_STATS["overview"]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      if (activeDivision === "da-giay" || activeDivision === "overview") {
        const response = await fetch("http://localhost:8000/api/machines/stats");
        if (response.ok) {
          const data = await response.json();
          setStats({
            ...MOCK_BI_STATS["da-giay"],
            operationalSummary: data.operationalSummary || MOCK_BI_STATS["da-giay"].operationalSummary,
            kpi: data.kpi || MOCK_BI_STATS["da-giay"].kpi,
            topFailingMachines: data.topFailingMachines || MOCK_BI_STATS["da-giay"].topFailingMachines,
            activeTickets: data.activeTickets || MOCK_BI_STATS["da-giay"].activeTickets
          });
        } else {
          setStats(MOCK_BI_STATS[activeDivision]);
        }
      } else {
        setStats(MOCK_BI_STATS[activeDivision]);
      }
    } catch (error) {
      setStats(MOCK_BI_STATS[activeDivision]);
    } finally {
      setLoading(false);
      setLastUpdated(new Date());
    }
  };

  useEffect(() => {
    fetchStats();
  }, [activeDivision]);

  useEffect(() => {
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [activeDivision]);

  const formatDuration = (seconds: number) => {
    if (!seconds) return "0m";
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ${seconds % 60}s`;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden flex flex-col" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>

      {/* ── Ambient radial glow orbs (fixed, GPU-safe) ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#2fd39a]/[0.04] blur-[120px]" />
        <div className="absolute top-1/2 -right-60 w-[500px] h-[500px] rounded-full bg-[#2fd39a]/[0.03] blur-[100px]" />
        <div className="absolute -bottom-32 left-1/3 w-[400px] h-[400px] rounded-full bg-emerald-900/[0.08] blur-[90px]" />
        {/* Fine grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:48px_48px]" />
        {/* Top edge accent */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#2fd39a]/30 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col flex-1 p-4 sm:p-6 lg:p-8 gap-5">

        {/* ══ HEADER ══ */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left: wordmark + eyebrow */}
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2fd39a]/10 border border-[#2fd39a]/20 text-[#2fd39a] text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2fd39a] animate-pulse" />
              Live Operational Intelligence
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-none">
              Digital<span className="text-[#2fd39a]"> Cockpit</span>
            </h1>
            <p className="text-[11px] text-white/40 tracking-[0.15em] uppercase mt-1">TBS Group — Phòng Điều Hành Số Hoá</p>
          </div>

          {/* Right: live clock + status */}
          <div className="flex items-center gap-3 shrink-0">
            {loading && (
              <div className="w-4 h-4 rounded-full border border-[#2fd39a]/40 border-t-[#2fd39a] animate-spin" />
            )}
            <div className="px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-[10px] text-white/50 font-mono">
              <span className="text-[#2fd39a] font-bold">SYS</span> · {mounted ? lastUpdated.toLocaleTimeString("vi-VN") : "--:--:--"}
            </div>
            <button
              onClick={fetchStats}
              className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-[#2fd39a] hover:border-[#2fd39a]/30 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.95]"
            >
              <IconRefresh size={14} />
            </button>
          </div>
        </header>

        {/* ══ DIVISION TABS ══ */}
        <div className="flex flex-wrap gap-2">
          {DIVISIONS.map((div) => {
            const isActive = activeDivision === div.id;
            return (
              <button
                key={div.id}
                onClick={() => setActiveDivision(isActive ? "overview" : div.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold tracking-wide transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  isActive
                    ? "bg-[#2fd39a]/15 text-[#2fd39a] border border-[#2fd39a]/40 shadow-[0_0_16px_rgba(47,211,154,0.1)]"
                    : "bg-white/[0.03] text-white/30 border border-white/[0.06] hover:text-white/60 hover:bg-white/[0.06]"
                }`}
              >
                {React.createElement(div.icon, { size: 13 })}
                <span className="hidden sm:inline">{div.name}</span>
              </button>
            );
          })}
        </div>

        {/* ══ BENTO GRID ══ */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">

          {/* ─ TOP KPI ROW (spans full 12 cols on large) ─ */}
          {/* Active Stations */}
          <div className="lg:col-span-3 p-[1px] rounded-[1.75rem] bg-gradient-to-br from-white/[0.08] to-white/[0.02]">
            <div className="rounded-[calc(1.75rem-1px)] bg-[#0a0f0d] p-5 h-full flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/30">Trạm Hoạt Động</span>
                <div className="mt-3 flex items-end gap-2">
                  <span className="text-5xl font-black text-[#2fd39a] leading-none tabular-nums">{stats.operationalSummary?.active}</span>
                  <span className="text-white/30 text-sm pb-1 font-medium">/ {stats.operationalSummary?.total}</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-[9px] text-white/25 mb-1.5">
                  <span>Online</span>
                  <span>{stats.operationalSummary?.total > 0 ? ((stats.operationalSummary?.active / stats.operationalSummary?.total) * 100).toFixed(1) : 100}%</span>
                </div>
                <div className="h-0.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#2fd39a] to-emerald-400 rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                    style={{ width: `${stats.operationalSummary?.total > 0 ? (stats.operationalSummary?.active / stats.operationalSummary?.total) * 100 : 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Maintenance Requests */}
          <div className="lg:col-span-3 p-[1px] rounded-[1.75rem] bg-gradient-to-br from-white/[0.08] to-white/[0.02]">
            <div className="rounded-[calc(1.75rem-1px)] bg-[#0a0f0d] p-5 h-full flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/30">Yêu Cầu Bảo Trì</span>
                <div className="mt-3 flex items-end gap-2">
                  <span className="text-5xl font-black text-red-400 leading-none tabular-nums">{stats.operationalSummary?.repair}</span>
                  <span className="text-white/30 text-sm pb-1 font-medium">sự cố mở</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-[9px] text-white/25 mb-1.5">
                  <span>Tỷ lệ cố</span>
                  <span>{stats.operationalSummary?.total > 0 ? ((stats.operationalSummary?.repair / stats.operationalSummary?.total) * 100).toFixed(1) : 0}%</span>
                </div>
                <div className="h-0.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-500 to-rose-400 rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]" style={{ width: `${stats.operationalSummary?.total > 0 ? (stats.operationalSummary?.repair / stats.operationalSummary?.total) * 100 : 0}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* OTD Performance */}
          <div className="lg:col-span-3 p-[1px] rounded-[1.75rem] bg-gradient-to-br from-white/[0.08] to-white/[0.02]">
            <div className="rounded-[calc(1.75rem-1px)] bg-[#0a0f0d] p-5 h-full flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/30">OTD Performance</span>
                <div className="mt-3 flex items-end gap-2">
                  <span className="text-5xl font-black text-amber-400 leading-none tabular-nums">{stats.financials?.orderOnTimePercentage}%</span>
                </div>
                <p className="text-[9px] text-white/25 mt-2 leading-relaxed">{stats.financials?.monthlyVolumeLabel}</p>
              </div>
              <div className="mt-4 text-[10px] font-bold text-white/40 border-t border-white/[0.04] pt-3">
                {stats.financials?.monthlyProductionVolume}
              </div>
            </div>
          </div>

          {/* Response KPI */}
          <div className="lg:col-span-3 p-[1px] rounded-[1.75rem] bg-gradient-to-br from-white/[0.08] to-white/[0.02]">
            <div className="rounded-[calc(1.75rem-1px)] bg-[#0a0f0d] p-5 h-full flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/30">Phản Hồi Sự Cố</span>
                <div className="mt-3 flex items-end gap-2">
                  <span className="text-5xl font-black text-blue-400 leading-none tabular-nums">{formatDuration(stats.kpi?.averageResponseSeconds)}</span>
                </div>
                <p className="text-[9px] text-white/25 mt-2">Thời gian phản hồi trung bình</p>
              </div>
              <div className="mt-4 text-[10px] text-white/30 border-t border-white/[0.04] pt-3 font-mono">
                Xử lý avg: {formatDuration(stats.kpi?.averageResolutionSeconds)}
              </div>
            </div>
          </div>

          {/* ─ BOTTOM SECTION: Left sidebar + Map + Right sidebar ─ */}

          {/* LEFT: Radial gauge + line log */}
          <div className="lg:col-span-3 flex flex-col gap-4">

            {/* Radial Gauge — Double-Bezel */}
            <div className="p-[1px] rounded-[1.75rem] bg-gradient-to-br from-[#2fd39a]/20 to-white/[0.04] flex-shrink-0">
              <div className="rounded-[calc(1.75rem-1px)] bg-[#0a0f0d] p-5">
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 block mb-4">Hiệu Suất Chuyền</span>
                <div className="flex items-center justify-center relative my-2">
                  <svg className="w-32 h-32 -rotate-90" viewBox="0 0 128 128">
                    <circle cx="64" cy="64" r="52" stroke="#ffffff08" strokeWidth="8" fill="none" />
                    <circle
                      cx="64" cy="64" r="52" stroke="url(#gaugeGrad)" strokeWidth="8" fill="none"
                      strokeLinecap="round"
                      strokeDasharray={327}
                      strokeDashoffset={327 - (327 * (stats.financials?.orderOnTimePercentage || 98)) / 100}
                      className="transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                    />
                    <defs>
                      <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#2fd39a" />
                        <stop offset="100%" stopColor="#6ee7b7" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-3xl font-black text-white block leading-none">{stats.financials?.orderOnTimePercentage}%</span>
                    <span className="text-[8px] text-[#2fd39a] tracking-widest uppercase">OTD</span>
                  </div>
                </div>
                <p className="text-[9px] text-white/25 text-center mt-2 leading-relaxed">Cam kết giao hàng đúng hạn</p>
              </div>
            </div>

            {/* Line Log — Double-Bezel */}
            <div className="p-[1px] rounded-[1.75rem] bg-gradient-to-br from-white/[0.08] to-white/[0.02] flex-1">
              <div className="rounded-[calc(1.75rem-1px)] bg-[#0a0f0d] p-5 h-full">
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 block mb-4">Nhật Ký Tuyến Vận Hành</span>
                <div className="space-y-2">
                  {stats.lines?.map((line: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-[#2fd39a]/20 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${line.status === "WARNING" ? "bg-amber-400" : "bg-[#2fd39a]"}`} />
                        <span className="text-[11px] text-white font-bold font-mono">{line.code}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-white/40 font-mono">{line.score}%</span>
                        <span className={`text-[8px] px-1.5 py-0.5 rounded-md font-bold ${line.status === "WARNING" ? "bg-amber-500/10 text-amber-400" : line.status === "OPTIMAL" ? "bg-emerald-500/10 text-[#2fd39a]" : "bg-blue-500/10 text-blue-400"}`}>
                          {line.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* CENTER: Map — spans 6 cols */}
          <div className="lg:col-span-6 p-[1px] rounded-[1.75rem] bg-gradient-to-br from-[#2fd39a]/15 to-white/[0.03]">
            <div className="rounded-[calc(1.75rem-1px)] bg-[#080d0b] h-full flex flex-col overflow-hidden" style={{ minHeight: "400px" }}>
              {/* Map header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#2fd39a]/10 border border-[#2fd39a]/20 flex items-center justify-center">
                    <IconWorld size={14} className="text-[#2fd39a]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-white block">Asset Location Map</span>
                    <span className="text-[9px] text-white/30">
                      {activeDivision === "overview" ? "Tổng quan hành lang vận hành — Bình Dương" : `${MAP_LOCATIONS[activeDivision]?.label}`}
                    </span>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-[9px] text-[#2fd39a] font-mono">
                  <span className="w-1 h-1 rounded-full bg-[#2fd39a] animate-pulse" />
                  LIVE
                </span>
              </div>

              {/* Map iframe — Double-Bezel inner */}
              <div className="flex-1 p-3">
                <div className="w-full h-full rounded-[1.25rem] overflow-hidden border border-white/[0.04] bg-black" style={{ minHeight: "340px" }}>
                  {mounted && (
                    <iframe
                      src={
                        activeDivision === "overview"
                          ? "https://maps.google.com/maps?q=TBS%20Group,%20Binh%20Duong,%20Vietnam&t=k&z=10&ie=UTF8&iwloc=&output=embed"
                          : `https://maps.google.com/maps?q=${MAP_LOCATIONS[activeDivision]?.lat || 10.9790},${MAP_LOCATIONS[activeDivision]?.lng || 106.6660}(${encodeURIComponent(
                              MAP_LOCATIONS[activeDivision]?.label || "TBS Group"
                            )})&t=k&z=17&ie=UTF8&iwloc=&output=embed`
                      }
                      className="w-full h-full border-0"
                      allowFullScreen
                      loading="lazy"
                    />
                  )}
                </div>
              </div>

              {/* Map footer */}
              <div className="flex justify-between items-center px-5 py-3 border-t border-white/[0.05] text-[9px] text-white/25 font-mono">
                <span>TRỤ SỞ: BÌNH DƯƠNG, VIỆT NAM</span>
                <span>USA · EU · JAPAN · KOREA</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Warehouse grid + Incident feed */}
          <div className="lg:col-span-3 flex flex-col gap-4">

            {/* Warehouse Bento Grid */}
            <div className="p-[1px] rounded-[1.75rem] bg-gradient-to-br from-white/[0.08] to-white/[0.02]">
              <div className="rounded-[calc(1.75rem-1px)] bg-[#0a0f0d] p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/30">Kho ICD Tân Vạn</span>
                  <span className="text-[10px] font-black text-[#2fd39a] font-mono">82.4%</span>
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {Array.from({ length: 24 }).map((_, idx) => {
                    const isFull = idx % 3 === 0;
                    const isWarning = idx % 7 === 0;
                    return (
                      <div
                        key={idx}
                        className={`h-5 rounded-lg transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                          isFull
                            ? "bg-[#2fd39a]/30 border border-[#2fd39a]/40"
                            : isWarning
                            ? "bg-amber-500/20 border border-amber-500/30"
                            : "bg-white/[0.04] border border-white/[0.06]"
                        }`}
                        title={`Slot ${idx + 1}`}
                      />
                    );
                  })}
                </div>
                <p className="text-[8px] text-white/20 text-center mt-3 leading-relaxed">Mô phỏng slot container real-time</p>
              </div>
            </div>

            {/* Active Incidents — Double-Bezel, flex-1 */}
            <div className="p-[1px] rounded-[1.75rem] bg-gradient-to-br from-red-500/10 to-white/[0.02] flex-1">
              <div className="rounded-[calc(1.75rem-1px)] bg-[#0a0f0d] p-5 h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/30">Sự Cố Đang Mở</span>
                  {Array.isArray(stats.activeTickets) && stats.activeTickets.length > 0 && (
                    <span className="flex items-center gap-1 text-[9px] text-red-400 font-mono font-bold">
                      <span className="w-1 h-1 rounded-full bg-red-400 animate-pulse" />
                      {stats.activeTickets.length}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  {!Array.isArray(stats.activeTickets) || stats.activeTickets.length === 0 ? (
                    <div className="py-8 text-center text-white/20 text-[10px]">
                      <IconActivity size={24} className="mx-auto mb-2 opacity-20" />
                      Không có sự cố nào đang mở
                    </div>
                  ) : (
                    stats.activeTickets.map((t: any) => (
                      <div key={t.id} className="p-3 rounded-xl bg-red-500/[0.04] border border-red-500/[0.12] hover:border-red-500/30 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
                        <div className="flex justify-between items-start gap-2 mb-1.5">
                          <strong className="text-[11px] text-white font-bold leading-tight truncate max-w-[110px]">{t.machine?.name}</strong>
                          <span className="text-[8px] text-white/30 font-mono shrink-0">{t.time || "Vừa xong"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] text-white/30 truncate">{t.machine?.area}</span>
                          <span className={`text-[8px] px-1.5 py-0.5 rounded-md font-black ${t.status === "IN_PROGRESS" ? "bg-red-500/15 text-red-400" : "bg-amber-500/15 text-amber-400"}`}>
                            {t.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

          </div>

        </main>

        {/* ══ FOOTER ══ */}
        <footer className="flex flex-col sm:flex-row justify-between items-center text-[9px] text-white/20 font-mono border-t border-white/[0.04] pt-4 gap-2">
          <p>© {new Date().getFullYear()} TBS Group Corp. — Digital Intelligence Platform</p>
          <p className="flex items-center gap-1.5">
            <IconShieldLock size={10} className="text-[#2fd39a]/50" />
            Console Mode · Security Shields Active
          </p>
        </footer>

      </div>
    </div>
  );
}
