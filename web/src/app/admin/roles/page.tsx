'use client';

import { useState } from 'react';

export default function RolesAdminPage() {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Super Admin', code: 'SUPER_ADMIN', level: 1, desc: 'Toàn quyền quản trị toàn bộ hệ thống' },
    { id: 2, name: 'Ban Giám đốc (Sếp lớn)', code: 'EXECUTIVE', level: 2, desc: 'Xem dashboard tổng & drill-down tất cả phòng ban' },
    { id: 3, name: 'Trưởng phòng ban', code: 'DEPT_HEAD', level: 3, desc: 'Duyệt giấy tờ, xem hiệu suất phòng ban' },
    { id: 4, name: 'Nhân viên văn phòng', code: 'OFFICE_STAFF', level: 4, desc: 'Tạo và xử lý biểu mẫu số hóa phòng ban' },
    { id: 5, name: 'Nhân viên bảo trì', code: 'MAINTENANCE', level: 5, desc: 'Sử dụng App Mobile Native để nhận & sửa sự cố máy' },
    { id: 6, name: 'Công nhân', code: 'WORKER', level: 6, desc: 'Sử dụng App Mobile Native để quét mã QR báo hỏng máy' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', code: '', level: 4, desc: '' });

  const handleAddRole = (e: React.FormEvent) => {
    e.preventDefault();
    setRoles([...roles, { id: roles.length + 1, ...newRole }]);
    setShowAddModal(false);
    setNewRole({ name: '', code: '', level: 4, desc: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#08221a]">Quản Lý Vai Trò (Roles) Động</h1>
          <p className="text-xs text-gray-500 mt-1">
            Thêm / sửa / xóa các vai trò trong hệ thống trực tiếp trên DB mà không cần sửa code
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#158a63] text-white text-xs font-bold hover:bg-[#1fae7d] transition shadow-md"
        >
          + Thêm Vai Trò Mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((r) => (
          <div key={r.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#08221a] text-[#2fd39a]">
                {r.code}
              </span>
              <span className="text-xs text-gray-400 font-semibold">Cấp bậc: Level {r.level}</span>
            </div>
            <h3 className="text-lg font-bold text-[#08221a]">{r.name}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{r.desc}</p>
            <div className="pt-2 border-t border-gray-100 flex justify-end gap-3 text-xs">
              <button className="text-emerald-700 font-semibold hover:underline">Sửa quyền</button>
              {r.level > 2 && <button className="text-red-500 font-semibold hover:underline">Xóa</button>}
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h2 className="text-lg font-bold text-[#08221a]">Thêm Vai Trò Mới (Role Dynamic)</h2>
            <form onSubmit={handleAddRole} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Tên Vai Trò *</label>
                <input
                  required
                  type="text"
                  placeholder="VD: Quản Lý Kho Phụ Tùng"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#158a63]"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Mã Code (In HOA) *</label>
                <input
                  required
                  type="text"
                  placeholder="VD: SPARE_PARTS_MGR"
                  value={newRole.code}
                  onChange={(e) => setNewRole({ ...newRole, code: e.target.value.toUpperCase() })}
                  className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#158a63]"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Mô Tả Chức Năng</label>
                <textarea
                  rows={2}
                  placeholder="Mô tả quyền hạn vai trò này..."
                  value={newRole.desc}
                  onChange={(e) => setNewRole({ ...newRole, desc: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#158a63]"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#158a63] text-white font-bold hover:bg-[#1fae7d]"
                >
                  Thêm Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
