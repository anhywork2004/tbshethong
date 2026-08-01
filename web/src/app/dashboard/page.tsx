'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [departmentScope, setDepartmentScope] = useState('ALL');

  const rankingMachines = [
    { rank: 1, machineCode: 'MC-MAY-04', name: 'Máy May Tự Động A4', line: 'Line 2 - Xưởng 1', count: 18, totalDowntime: '4h 12m', status: 'DOWN' },
    { rank: 2, machineCode: 'MC-CAT-02', name: 'Máy Cắt Laser B2', line: 'Line 1 - Xưởng 2', count: 14, totalDowntime: '3h 45m', status: 'OPERATING' },
    { rank: 3, machineCode: 'MC-DONG-09', name: 'Máy Đóng Gói C1', line: 'Line 3 - Xưởng 1', count: 11, totalDowntime: '2h 30m', status: 'OPERATING' },
    { rank: 4, machineCode: 'MC-[#34]', name: 'Máy Ép Keo E5', line: 'Line 4 - Xưởng 3', count: 9, totalDowntime: '1h 50m', status: 'WARNING' },
  ];

  const mechanicKPIs = [
    { id: 1, name: 'Phạm Văn Bảo Trì', empCode: 'EMP-004', resolved: 42, avgTime: '24 phút', rating: '98.5%' },
    { id: 2, name: 'Trần Văn Kỹ Thuật', empCode: 'EMP-019', resolved: 38, avgTime: '28 phút', rating: '96.0%' },
    { id: 3, name: 'Nguyễn Văn Sửa Chữa', empCode: 'EMP-025', resolved: 35, avgTime: '31 phút', rating: '94.2%' },
  ];

  return (
    <div className="min-h-screen bg-[#f9fdfb] p-8 space-y-8">
      {/* HEADER & SCOPE SELECTOR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-[#158a63] text-white">LIVE 24/7</span>
            <h1 className="text-2xl font-extrabold text-[#08221a]">BI Dashboard Vận Hành TBS Group</h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">Hệ thống đo lường hiệu suất nhà máy thời gian thực</p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-gray-700">Scope Phòng Ban:</label>
          <select
            value={departmentScope}
            onChange={(e) => setDepartmentScope(e.target.value)}
            className="p-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#158a63]"
          >
            <option value="ALL">Toàn Công Ty (Sếp Lớn)</option>
            <option value="PROD">Phòng Sản Xuất</option>
            <option value="MAINT">Phòng Bảo Trì - Kỹ Thuật</option>
            <option value="QC">Phòng QC</option>
          </select>
        </div>
      </div>

      {/* TOP STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-[#08221a] to-[#0f4133] p-6 rounded-2xl text-white shadow-xl border border-[#2fd39a]/30">
          <div className="text-xs text-gray-300 font-medium">Doanh Số Sản Xuất (Tháng)</div>
          <div className="text-3xl font-extrabold text-[#f2dc9a] mt-2">48.5 Tỷ VNĐ</div>
          <div className="text-xs text-[#2fd39a] mt-2 font-semibold">↑ 8.4% so với tháng trước</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl">
          <div className="text-xs text-gray-500 font-semibold">Tổng Số Lượng Sản Phẩm</div>
          <div className="text-3xl font-extrabold text-[#08221a] mt-2">1,245,000</div>
          <div className="flex gap-4 mt-2 text-xs">
            <span className="text-emerald-700 font-bold">Đạt: 98.6%</span>
            <span className="text-red-500 font-bold">Lỗi: 1.4%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl">
          <div className="text-xs text-gray-500 font-semibold">Tỷ Lệ Máy Hoạt Động (OEE)</div>
          <div className="text-3xl font-extrabold text-[#158a63] mt-2">97.8%</div>
          <div className="text-xs text-gray-500 mt-2">Tổng downtime: 14h 20m</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl">
          <div className="text-xs text-gray-500 font-semibold">Thời Gian Sửa Máy Trung Bình</div>
          <div className="text-3xl font-extrabold text-[#d9b96a] mt-2">26.4 Phút</div>
          <div className="text-xs text-emerald-700 font-bold mt-2">↓ 4.2 phút so với tuần trước</div>
        </div>
      </div>

      {/* CHARTS & RANKING GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* RANKING: TOP MACHINES WITH MOST INCIDENTS */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#08221a]">Bảng Xếp Hạng Máy Hư Nhiều Nhất</h2>
            <Link href="/maintenance/machines" className="text-xs text-[#158a63] font-bold hover:underline">
              Xem tất cả máy →
            </Link>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#eef7f2] text-xs font-semibold text-[#08221a] border-b border-emerald-100">
                <th className="p-3">Hạng</th>
                <th className="p-3">Mã Máy</th>
                <th className="p-3">Tên Thiết Bị</th>
                <th className="p-3">Số Lần Hỏng</th>
                <th className="p-3">Tổng Downtime</th>
                <th className="p-3">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
              {rankingMachines.map((m) => (
                <tr key={m.rank} className="hover:bg-gray-50 transition">
                  <td className="p-3 font-bold text-center w-8">{m.rank}</td>
                  <td className="p-3 font-mono font-bold text-[#158a63]">{m.machineCode}</td>
                  <td className="p-3 font-semibold text-[#08221a]">{m.name}</td>
                  <td className="p-3 font-bold text-red-500">{m.count} lần</td>
                  <td className="p-3 text-gray-600">{m.totalDowntime}</td>
                  <td className="p-3">
                    {m.status === 'DOWN' && <span className="px-2 py-0.5 bg-red-500/20 text-red-700 font-bold rounded">Dừng Máy</span>}
                    {m.status === 'OPERATING' && <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-700 font-bold rounded">Hoạt Động</span>}
                    {m.status === 'WARNING' && <span className="px-2 py-0.5 bg-amber-500/20 text-amber-700 font-bold rounded">Cảnh Báo</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MECHANIC PERFORMANCE KPIs */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-[#08221a]">Hiệu Suất Nhân Viên Bảo Trì</h2>
          <div className="space-y-4">
            {mechanicKPIs.map((mech) => (
              <div key={mech.id} className="p-4 rounded-xl bg-[#eef7f2] border border-emerald-100 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-[#08221a]">{mech.name}</span>
                  <span className="text-xs font-mono text-[#158a63]">{mech.empCode}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Ticket đã xong: <strong className="text-[#08221a]">{mech.resolved}</strong></span>
                  <span>TB xử lý: <strong className="text-[#158a63]">{mech.avgTime}</strong></span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-[#158a63] h-2 rounded-full" style={{ width: mech.rating }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
