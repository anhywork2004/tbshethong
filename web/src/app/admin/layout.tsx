import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#f9fdfb]">
      {/* ADMIN SIDEBAR */}
      <aside className="w-64 bg-[#08221a] text-white p-6 border-r border-[#158a63]/20 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#158a63] to-[#2fd39a] flex items-center justify-center font-bold text-[#08221a]">
              TBS
            </div>
            <div>
              <div className="font-bold text-sm text-[#f2dc9a]">ADMIN PANEL</div>
              <div className="text-[11px] text-gray-400">Quản Trị RBAC & Hệ Thống</div>
            </div>
          </div>

          <nav className="space-y-1 text-sm font-medium">
            <Link
              href="/admin/users"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#0f4133] transition text-gray-200 hover:text-white"
            >
              <span>👥</span> Quản Lý Nhân Viên
            </Link>
            <Link
              href="/admin/roles"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#0f4133] transition text-gray-200 hover:text-white"
            >
              <span>🛡️</span> Vai Trò (Roles)
            </Link>
            <Link
              href="/admin/departments"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#0f4133] transition text-gray-200 hover:text-white"
            >
              <span>🏢</span> Phòng Ban
            </Link>

            <div className="pt-4 mt-4 border-t border-gray-800 text-xs text-gray-400 font-semibold uppercase tracking-wider px-4">
              Phân Hệ Khác
            </div>
            <Link
              href="/documents/templates"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#0f4133] transition text-gray-200 hover:text-white"
            >
              <span>📄</span> Số Hóa Giấy Tờ
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#0f4133] transition text-gray-200 hover:text-white"
            >
              <span>📊</span> BI Dashboard
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
          <span>TBS Group v1.0</span>
          <Link href="/login" className="text-red-400 hover:underline">
            Đăng xuất
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
