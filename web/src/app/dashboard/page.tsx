"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

export default function DashboardPage() {
  const [departmentScope, setDepartmentScope] = useState("ALL");

  const rankingMachines = [
    {
      rank: 1,
      machineCode: "MC-MAY-04",
      name: "Máy May Tự Động A4",
      line: "Line 2 - Xưởng 1",
      count: 18,
      totalDowntime: "4h 12m",
      status: "DOWN",
    },
    {
      rank: 2,
      machineCode: "MC-CAT-02",
      name: "Máy Cắt Laser B2",
      line: "Line 1 - Xưởng 2",
      count: 14,
      totalDowntime: "3h 45m",
      status: "OPERATING",
    },
    {
      rank: 3,
      machineCode: "MC-DONG-09",
      name: "Máy Đóng Gói C1",
      line: "Line 3 - Xưởng 1",
      count: 11,
      totalDowntime: "2h 30m",
      status: "OPERATING",
    },
    {
      rank: 4,
      machineCode: "MC-EP-05",
      name: "Máy Ép Keo E5",
      line: "Line 4 - Xưởng 3",
      count: 9,
      totalDowntime: "1h 50m",
      status: "WARNING",
    },
  ];

  const mechanicKPIs = [
    {
      id: 1,
      name: "Phạm Văn Bảo Trì",
      empCode: "EMP-004",
      resolved: 42,
      avgTime: "24 phút",
      rating: "98.5%",
    },
    {
      id: 2,
      name: "Trần Văn Kỹ Thuật",
      empCode: "EMP-019",
      resolved: 38,
      avgTime: "28 phút",
      rating: "96.0%",
    },
    {
      id: 3,
      name: "Nguyễn Văn Sửa Chữa",
      empCode: "EMP-025",
      resolved: 35,
      avgTime: "31 phút",
      rating: "94.2%",
    },
  ];

  return (
    <div className="min-h-screen bg-canvas">
      <Header />

      <main className="pt-28 pb-16 px-5 sm:px-8 lg:px-12 max-w-[1400px] mx-auto space-y-8">
        {/* Header & scope selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-soft opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-soft" />
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-accent text-white">
                Live 24/7
              </span>
              <h1 className="text-2xl font-extrabold text-ink text-display">
                BI Dashboard Vận hành
              </h1>
            </div>
            <p className="text-xs text-muted mt-1">
              Hệ thống đo lường hiệu suất nhà máy thời gian thực
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs font-bold text-steel">
              Phạm vi:
            </label>
            <select
              value={departmentScope}
              onChange={(e) => setDepartmentScope(e.target.value)}
              className="p-2 rounded-xl bg-surface border border-border text-xs font-semibold focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
            >
              <option value="ALL">Toàn công ty</option>
              <option value="PROD">Phòng Sản xuất</option>
              <option value="MAINT">Phòng Bảo trì — Kỹ thuật</option>
              <option value="QC">Phòng QC</option>
            </select>
          </div>
        </div>

        {/* Top stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-accent-deep p-6 rounded-2xl text-white shadow-sm border border-accent-soft/15">
            <div className="text-xs text-white/40 font-medium">
              Doanh số sản xuất (tháng)
            </div>
            <div className="text-3xl font-extrabold text-gold-light mt-2 font-mono tabular-nums">
              48.5 tỷ VNĐ
            </div>
            <div className="text-xs text-accent-soft mt-2 font-semibold">
              +8.4% so với tháng trước
            </div>
          </div>

          <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm">
            <div className="text-xs text-muted font-semibold">
              Tổng sản lượng
            </div>
            <div className="text-3xl font-extrabold text-ink mt-2 font-mono tabular-nums">
              1,245,000
            </div>
            <div className="flex gap-4 mt-2 text-xs">
              <span className="text-accent font-bold">Đạt: 98.6%</span>
              <span className="text-red-500 font-bold">Lỗi: 1.4%</span>
            </div>
          </div>

          <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm">
            <div className="text-xs text-muted font-semibold">
              Tỷ lệ máy hoạt động (OEE)
            </div>
            <div className="text-3xl font-extrabold text-accent mt-2 font-mono tabular-nums">
              97.8%
            </div>
            <div className="text-xs text-steel mt-2">Tổng downtime: 14h 20m</div>
          </div>

          <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm">
            <div className="text-xs text-muted font-semibold">
              Thời gian sửa máy trung bình
            </div>
            <div className="text-3xl font-extrabold text-gold mt-2 font-mono tabular-nums">
              26.4 phút
            </div>
            <div className="text-xs text-accent font-bold mt-2">
              -4.2 phút so với tuần trước
            </div>
          </div>
        </div>

        {/* Charts & ranking grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Machine ranking table */}
          <div className="lg:col-span-2 bg-surface p-6 rounded-2xl border border-border shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-ink text-display">
                Xếp hạng máy hư nhiều nhất
              </h2>
              <Link
                href="/maintenance/machines"
                className="text-xs text-accent font-bold hover:underline"
              >
                Xem tất cả
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-accent-wash text-xs font-semibold text-ink border-b border-accent/10">
                    <th className="p-3">Hạng</th>
                    <th className="p-3">Mã máy</th>
                    <th className="p-3">Tên thiết bị</th>
                    <th className="p-3">Số lần hỏng</th>
                    <th className="p-3">Tổng downtime</th>
                    <th className="p-3">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-xs text-steel">
                  {rankingMachines.map((m) => (
                    <tr key={m.rank} className="hover:bg-accent-wash/50 transition-colors">
                      <td className="p-3 font-bold text-center">{m.rank}</td>
                      <td className="p-3 font-mono font-bold text-accent">
                        {m.machineCode}
                      </td>
                      <td className="p-3 font-semibold text-ink">{m.name}</td>
                      <td className="p-3 font-bold text-red-500">{m.count} lần</td>
                      <td className="p-3">{m.totalDowntime}</td>
                      <td className="p-3">
                        {m.status === "DOWN" && (
                          <span className="px-2 py-0.5 bg-red-500/10 text-red-600 font-bold rounded-full text-[10px]">
                            Dừng máy
                          </span>
                        )}
                        {m.status === "OPERATING" && (
                          <span className="px-2 py-0.5 bg-accent/10 text-accent font-bold rounded-full text-[10px]">
                            Hoạt động
                          </span>
                        )}
                        {m.status === "WARNING" && (
                          <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 font-bold rounded-full text-[10px]">
                            Cảnh báo
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mechanic KPIs */}
          <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-ink text-display">
              Hiệu suất nhân viên bảo trì
            </h2>
            <div className="space-y-4">
              {mechanicKPIs.map((mech) => (
                <div
                  key={mech.id}
                  className="p-4 rounded-xl bg-accent-wash border border-accent/10 space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-ink">
                      {mech.name}
                    </span>
                    <span className="text-xs font-mono text-accent">
                      {mech.empCode}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-steel">
                    <span>
                      Ticket đã xong:{" "}
                      <strong className="text-ink">{mech.resolved}</strong>
                    </span>
                    <span>
                      TB xử lý:{" "}
                      <strong className="text-accent">{mech.avgTime}</strong>
                    </span>
                  </div>
                  <div className="w-full bg-accent/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-accent h-2 rounded-full transition-all"
                      style={{ width: mech.rating }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
