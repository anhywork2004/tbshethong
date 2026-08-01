'use client';

import { useState } from 'react';

export default function MachinesPage() {
  const [machines, setMachines] = useState([
    { id: 1, code: 'MC-MAY-01', name: 'Máy May Tự Động 1 kim A1', serial: 'SN-99812', zone: 'Khu A - Chuyền 1', status: 'OPERATING', qrData: 'TBS_MC_MAY_01' },
    { id: 2, code: 'MC-MAY-04', name: 'Máy May Tự Động 1 kim A4', serial: 'SN-99815', zone: 'Khu A - Chuyền 2', status: 'DOWN', qrData: 'TBS_MC_MAY_04' },
    { id: 3, code: 'MC-CAT-02', name: 'Máy Cắt Laser Công Nghiệp B2', serial: 'SN-44310', zone: 'Khu B - Chuyền 1', status: 'OPERATING', qrData: 'TBS_MC_CAT_02' },
    { id: 4, code: 'MC-EP-05', name: 'Máy Ép Keo Nhiệt E5', serial: 'SN-77219', zone: 'Khu C - Chuyền 4', status: 'WARNING', qrData: 'TBS_MC_EP_05' },
  ]);

  const [selectedQR, setSelectedQR] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-tbs-light p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-tbs-dark">Danh Mục Máy Móc & Mã QR/Barcode</h1>
          <p className="text-xs text-gray-500 mt-1">Quản lý danh sách máy móc, vị trí lắp đặt và mã QR in dán bảo trì</p>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-tbs-dark hover:bg-gray-50 shadow-sm">
            Import từ Excel
          </button>
          <button className="px-4 py-2.5 rounded-xl bg-accent text-white text-xs font-bold hover:bg-accent-light transition shadow-md">
            + Thêm Thiết Bị Mới
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#eef7f2] text-xs font-semibold text-tbs-dark uppercase border-b border-emerald-100">
              <th className="p-4">Mã Máy</th>
              <th className="p-4">Tên Máy</th>
              <th className="p-4">Serial Number</th>
              <th className="p-4">Khu Vực / Chuyền</th>
              <th className="p-4">Trạng Thái</th>
              <th className="p-4 text-center">In Mã QR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
            {machines.map((m) => (
              <tr key={m.id} className="hover:bg-gray-50/80 transition">
                <td className="p-4 font-mono font-bold text-accent">{m.code}</td>
                <td className="p-4 font-semibold text-tbs-dark">{m.name}</td>
                <td className="p-4 font-mono text-gray-500">{m.serial}</td>
                <td className="p-4">{m.zone}</td>
                <td className="p-4">
                  {m.status === 'OPERATING' && <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-700 font-bold rounded">Hoạt Động</span>}
                  {m.status === 'DOWN' && <span className="px-2.5 py-1 bg-red-500/20 text-red-700 font-bold rounded">Máy Hỏng</span>}
                  {m.status === 'WARNING' && <span className="px-2.5 py-1 bg-amber-500/20 text-amber-700 font-bold rounded">Cảnh Báo</span>}
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => setSelectedQR(m.qrData)}
                    className="px-3 py-1 bg-emerald-100 text-accent font-bold rounded-lg hover:bg-emerald-200"
                  >
                    Xem mã QR
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* QR MODAL */}
      {selectedQR && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl space-y-4">
            <h3 className="font-bold text-lg text-tbs-dark">Mã QR Dán Trên Máy</h3>
            <div className="w-48 h-48 mx-auto bg-gray-100 border-2 border-dashed border-accent rounded-2xl flex flex-col items-center justify-center p-4 shadow-inner">
              <div className="font-mono text-xs font-bold text-accent mb-2">{selectedQR}</div>
              <div className="text-[10px] text-gray-500">Quét bằng App Mobile Native</div>
            </div>
            <button
              onClick={() => setSelectedQR(null)}
              className="w-full py-2.5 bg-tbs-dark text-white rounded-xl font-bold text-xs"
            >
              Đóng Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
