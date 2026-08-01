'use client';

import { useState } from 'react';

export default function UsersAdminPage() {
  const [users, setUsers] = useState([
    { id: 1, empCode: 'EMP-001', name: 'Nguyễn Văn Admin', role: 'Super Admin', dept: 'Công Nghệ Thông Tin (IT)', status: 'ACTIVE' },
    { id: 2, empCode: 'EMP-002', name: 'Trần Thị Giám Đốc', role: 'Ban Giám Đốc', dept: 'Ban Giám Đốc', status: 'ACTIVE' },
    { id: 3, empCode: 'EMP-003', name: 'Lê Văn Trưởng Phòng', role: 'Trưởng Phòng Ban', dept: 'Sản Xuất (Production)', status: 'ACTIVE' },
    { id: 4, empCode: 'EMP-004', name: 'Phạm Văn Bảo Trì', role: 'Nhân Viên Bảo Trì', dept: 'Bảo Trì - Kỹ Thuật', status: 'ACTIVE' },
    { id: 5, empCode: 'EMP-005', name: 'Hoàng Văn Công Nhân', role: 'Công Nhân', dept: 'Sản Xuất (Production)', status: 'ACTIVE' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ empCode: '', name: '', role: 'Nhân Viên Văn Phòng', dept: 'Sản Xuất (Production)' });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    setUsers([...users, { id: users.length + 1, ...newUser, status: 'ACTIVE' }]);
    setShowModal(false);
    setNewUser({ empCode: '', name: '', role: 'Nhân Viên Văn Phòng', dept: 'Sản Xuất (Production)' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#08221a]">Quản Lý Nhân Viên & Phân Quyền</h1>
          <p className="text-xs text-gray-500 mt-1">Danh sách tài khoản cán bộ công nhân viên TBS Group</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#158a63] text-white text-xs font-bold hover:bg-[#1fae7d] transition shadow-md"
        >
          + Thêm Tài Khoản Mới
        </button>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#eef7f2] text-xs font-semibold text-[#08221a] uppercase border-b border-emerald-100">
              <th className="p-4">Mã NV</th>
              <th className="p-4">Họ và Tên</th>
              <th className="p-4">Vai Trò (Role)</th>
              <th className="p-4">Phòng Ban</th>
              <th className="p-4">Trạng Thái</th>
              <th className="p-4 text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50/80 transition">
                <td className="p-4 font-mono font-bold text-[#158a63]">{u.empCode}</td>
                <td className="p-4 font-semibold text-[#08221a]">{u.name}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-100 text-[#08221a]">
                    {u.role}
                  </span>
                </td>
                <td className="p-4">{u.dept}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-700 font-bold">
                    {u.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button className="text-emerald-700 hover:underline">Sửa role</button>
                  <button className="text-red-500 hover:underline">Khóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD USER MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h2 className="text-lg font-bold text-[#08221a]">Thêm Tài Khoản Mới</h2>
            <form onSubmit={handleAddUser} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Mã Nhân Viên *</label>
                <input
                  required
                  type="text"
                  placeholder="EMP-100"
                  value={newUser.empCode}
                  onChange={(e) => setNewUser({ ...newUser, empCode: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#158a63]"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Họ và Tên *</label>
                <input
                  required
                  type="text"
                  placeholder="Nguyễn Văn B"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#158a63]"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Vai Trò (Role)</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#158a63]"
                >
                  <option value="Trưởng Phòng Ban">Trưởng Phòng Ban</option>
                  <option value="Nhân Viên Văn Phòng">Nhân Viên Văn Phòng</option>
                  <option value="Nhân Viên Bảo Trì">Nhân Viên Bảo Trì (App Mobile)</option>
                  <option value="Công Nhân">Công Nhân (App Mobile)</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#158a63] text-white font-bold hover:bg-[#1fae7d]"
                >
                  Tạo Mới
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
