'use client';

import { useState } from 'react';

export default function MaintenanceTicketsPage() {
  const [tickets] = useState([
    {
      id: 1,
      ticketCode: 'TK-8892',
      machineCode: 'MC-MAY-04',
      machineName: 'Máy May Tự Động A4',
      reporter: 'Hoàng Văn Công Nhân (Line 2)',
      mechanic: 'Phạm Văn Bảo Trì',
      errorType: 'Đứt chỉ liên tục & kẹt ổ chao',
      status: 'IN_PROGRESS',
      reportedAt: '14:20 - 01/08',
      acceptedAt: '14:24 - 01/08',
      startedAt: '14:26 - 01/08',
    },
    {
      id: 2,
      ticketCode: 'TK-8891',
      machineCode: 'MC-CAT-02',
      machineName: 'Máy Cắt Laser B2',
      reporter: 'Lê Văn Công Nhân (Line 1)',
      mechanic: 'Trần Văn Kỹ Thuật',
      errorType: 'Lệch thấu kính laser',
      status: 'RESOLVED',
      reportedAt: '10:15 - 01/08',
      acceptedAt: '10:18 - 01/08',
      startedAt: '10:20 - 01/08',
    },
  ]);

  return (
    <div className="min-h-screen bg-[#f9fdfb] p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#08221a]">Danh Sách Ticket Sự Cố Bảo Trì</h1>
        <p className="text-xs text-gray-500 mt-1">Theo dõi tiến độ từ lúc Công nhân quét mã hỏng đến khi Bảo trì sửa xong</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#eef7f2] text-xs font-semibold text-[#08221a] uppercase border-b border-emerald-100">
              <th className="p-4">Mã Ticket</th>
              <th className="p-4">Thiết Bị</th>
              <th className="p-4">Công Nhân Báo</th>
              <th className="p-4">Bảo Trì Phụ Trách</th>
              <th className="p-4">Loại Lỗi</th>
              <th className="p-4">Trạng Thái Ticket</th>
              <th className="p-4">Thời Gian Báo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
            {tickets.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50/80 transition">
                <td className="p-4 font-mono font-bold text-[#158a63]">{t.ticketCode}</td>
                <td className="p-4">
                  <div className="font-bold text-[#08221a]">{t.machineName}</div>
                  <div className="font-mono text-[10px] text-gray-400">{t.machineCode}</div>
                </td>
                <td className="p-4">{t.reporter}</td>
                <td className="p-4 font-semibold text-[#08221a]">{t.mechanic}</td>
                <td className="p-4 text-red-600 font-medium">{t.errorType}</td>
                <td className="p-4">
                  {t.status === 'IN_PROGRESS' && <span className="px-2.5 py-1 bg-amber-500/20 text-amber-700 font-bold rounded">Đang Sửa</span>}
                  {t.status === 'RESOLVED' && <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-700 font-bold rounded">Đã Xong</span>}
                </td>
                <td className="p-4 font-mono text-gray-500">{t.reportedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
