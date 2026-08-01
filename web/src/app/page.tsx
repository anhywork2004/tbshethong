import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f9fdfb]">
      <Header />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative py-24 bg-gradient-to-b from-[#08221a] via-[#0f4133] to-[#158a63] text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-[#2fd39a] text-xs font-semibold uppercase tracking-wider mb-6 border border-emerald-500/30">
                Chuyển Đổi Số Doanh Nghiệp TBS Group
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
                Hệ Thống Số Hóa Giấy Tờ & <span className="bg-gradient-to-r from-[#f2dc9a] to-[#d9b96a] bg-clip-text text-transparent">Vận Hành Nhà Máy</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Số hóa 100% quy trình giấy tờ thủ công, quản lý bảo trì sự cố máy móc thời gian thực qua app Native (Android/iOS) và theo dõi hiệu suất nhà máy 24/7.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/login"
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#d9b96a] to-[#f2dc9a] text-[#08221a] font-bold text-base shadow-xl shadow-amber-500/20 hover:brightness-105 transition"
                >
                  Truy Cập Hệ Thống Nội Bộ
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base backdrop-blur-md border border-white/20 transition"
                >
                  Tìm Hiểu Thêm
                </Link>
              </div>
            </div>

            <div className="relative rounded-2xl bg-[#08221a]/80 p-6 border border-[#2fd39a]/30 shadow-2xl shadow-emerald-950/80 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-gray-700/60 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-gray-400 ml-2 font-mono">dashboard.tbsgroup.vn</span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#158a63] text-white">LIVE 24/7</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-[#0f4133]/60 p-4 rounded-xl border border-emerald-500/20">
                  <div className="text-xs text-gray-400">Số Lượng Sản Xuất</div>
                  <div className="text-2xl font-bold text-[#2fd39a]">128,450 pcs</div>
                  <div className="text-[11px] text-emerald-400">↑ 12.4% so với hôm qua</div>
                </div>
                <div className="bg-[#0f4133]/60 p-4 rounded-xl border border-emerald-500/20">
                  <div className="text-xs text-gray-400">Tỷ Lệ Máy Hoạt Động</div>
                  <div className="text-2xl font-bold text-[#f2dc9a]">98.2%</div>
                  <div className="text-[11px] text-amber-300">2 máy đang bảo trì</div>
                </div>
              </div>
              <div className="bg-[#0f4133]/40 p-4 rounded-xl border border-white/5">
                <div className="text-xs font-semibold text-gray-300 mb-2">Ticket Sự Cố Máy Mới Nhất</div>
                <div className="flex items-center justify-between text-xs py-2 border-b border-gray-700/50">
                  <span className="text-[#2fd39a] font-mono">#TK-8892 (Máy May A4)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300">Đang Sửa Chữa</span>
                </div>
                <div className="flex items-center justify-between text-xs py-2">
                  <span className="text-[#2fd39a] font-mono">#TK-8891 (Máy Cắt B2)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300">Đã Hoàn Thành</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-[#08221a]">Các Thước Đo Vận Hành Cốt Lõi</h2>
            <p className="text-gray-600 mt-3 text-sm">Hệ thống tích hợp toàn diện từ văn phòng đến nhà xưởng sản xuất.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:-translate-y-1 transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#158a63] flex items-center justify-center font-bold text-xl mb-6">
                📄
              </div>
              <h3 className="text-xl font-bold text-[#08221a] mb-3">Số Hóa Giấy Tờ Biểu Mẫu</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Tự động nhận diện placeholder từ file Word/PDF mẫu, sinh form nhập liệu và xuất tài liệu đã điền chuẩn xác.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:-translate-y-1 transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#158a63] flex items-center justify-center font-bold text-xl mb-6">
                📱
              </div>
              <h3 className="text-xl font-bold text-[#08221a] mb-3">App Mobile Native Sửa Máy</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Công nhân quét QR báo hư, bảo trì nhận ticket tức thì trên app Android (Kotlin) & iOS (Swift) dùng chung C++ Core.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:-translate-y-1 transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#158a63] flex items-center justify-center font-bold text-xl mb-6">
                📊
              </div>
              <h3 className="text-xl font-bold text-[#08221a] mb-3">BI Dashboard Vận Hành 24/7</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Báo cáo doanh số, tiến độ sản xuất, xếp hạng máy hư hỏng và đo lường thời gian xử lý sự cố của nhân viên bảo trì.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
