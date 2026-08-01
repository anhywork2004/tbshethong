import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { COMPANY_INFO, COMPANY_STATS, COMPANY_SECTORS, COMPANY_TIMELINE } from '@/lib/companyData';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f9fdfb] font-sans antialiased text-[#1c2e27]">
      <Header />

      <main className="flex-1">
        {/* HERO SECTION WITH REAL TBS GROUP SLOGAN & STATS */}
        <section className="relative py-24 lg:py-32 bg-gradient-to-b from-[#08221a] via-[#0f4133] to-[#158a63] text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-400/20 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1fae7d]/20 text-[#2fd39a] text-xs font-bold uppercase tracking-widest border border-[#2fd39a]/30 backdrop-blur-md">
                <span>🏛️</span> {COMPANY_INFO.subTitle}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                {COMPANY_INFO.shortName}
                <span className="block mt-2 font-serif italic font-normal text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-[#f2dc9a] via-[#d9b96a] to-[#faf0d0] bg-clip-text text-transparent">
                  &ldquo;{COMPANY_INFO.slogan}&rdquo;
                </span>
              </h1>

              <p className="text-gray-200 text-base sm:text-lg leading-relaxed max-w-2xl">
                {COMPANY_INFO.intro}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/login"
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#d9b96a] to-[#f2dc9a] text-[#08221a] font-extrabold text-base shadow-xl shadow-amber-500/20 hover:brightness-110 hover:-translate-y-0.5 transition duration-200"
                >
                  Truy Cập Hệ Thống Nội Bộ
                </Link>
                <a
                  href="#sectors"
                  className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-base backdrop-blur-md border border-white/20 hover:border-emerald-400/40 transition duration-200"
                >
                  Khám Phá 6 Lĩnh Vực Trụ Cột
                </a>
              </div>
            </div>

            {/* Right Live Dashboard Widget */}
            <div className="lg:col-span-5 relative rounded-3xl bg-[#08221a]/85 p-6 sm:p-8 border border-[#2fd39a]/30 shadow-2xl shadow-emerald-950/90 backdrop-blur-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs text-gray-400 font-mono ml-2">tbshethong.workers.dev</span>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest bg-emerald-500 text-white uppercase shadow-md shadow-emerald-500/30">
                  LIVE 24/7
                </span>
              </div>

              <div className="space-y-4">
                <div className="bg-[#0f4133]/80 p-4 rounded-2xl border border-emerald-500/20">
                  <div className="text-xs text-gray-300 font-medium">Sản Lượng Nhà Máy Thoại Sơn Hôm Nay</div>
                  <div className="text-3xl font-extrabold text-[#2fd39a] mt-1 font-mono">32,840 đôi</div>
                  <div className="text-[11px] text-emerald-400 mt-0.5">↑ 14.2% so với tiến độ kế hoạch</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0f4133]/60 p-4 rounded-2xl border border-emerald-500/20">
                    <div className="text-xs text-gray-300">Tỷ Lệ Máy Hoạt Động</div>
                    <div className="text-2xl font-bold text-[#f2dc9a] mt-1 font-mono">98.5%</div>
                    <div className="text-[10px] text-amber-300">2 máy đang sửa chữa</div>
                  </div>
                  <div className="bg-[#0f4133]/60 p-4 rounded-2xl border border-emerald-500/20">
                    <div className="text-xs text-gray-300">Chuyền Đang Vận Hành</div>
                    <div className="text-2xl font-bold text-[#2fd39a] mt-1 font-mono">33 Chuyền</div>
                    <div className="text-[10px] text-emerald-300">100% công suất</div>
                  </div>
                </div>

                <div className="bg-[#0f4133]/40 p-4 rounded-2xl border border-white/5">
                  <div className="text-xs font-bold text-gray-200 mb-2">Nhật Ký Bảo Trì Sự Cố Mới Nhất</div>
                  <div className="flex items-center justify-between text-xs py-1.5 border-b border-gray-700/50">
                    <span className="text-[#2fd39a] font-mono">#TK-8895 (Máy May Lập Trình TS-01)</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300">Đang Xử Lý</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1.5">
                    <span className="text-[#2fd39a] font-mono">#TK-8894 (Máy Cắt Chuyền B2)</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300">Đã Hoàn Thành</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* HIGHLIGHT STATS BAR */}
          <div className="max-w-7xl mx-auto px-6 mt-16 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-6 rounded-3xl bg-[#08221a]/70 border border-[#2fd39a]/20 backdrop-blur-xl">
              {COMPANY_STATS.map((stat, idx) => (
                <div key={idx} className="text-center p-3">
                  <div className={`text-2xl lg:text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1 line-clamp-2 leading-tight">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 1: 6 LĨNH VỰC HOẠT ĐỘNG TRỤ CỘT */}
        <section id="sectors" className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#158a63] text-xs font-bold uppercase tracking-wider">
              Lĩnh Vực Trụ Cột
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#08221a]">
              6 Ngành Kinh Doanh Trụ Cột Của TBS Group
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Tập trung đầu tư và phát triển chuyên sâu vào các ngành sản xuất công nghiệp gia trị cao và dịch vụ chuỗi cung ứng quốc tế.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COMPANY_SECTORS.map((sector) => (
              <div
                key={sector.id}
                className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/50 hover:-translate-y-2 transition duration-300 flex flex-col"
              >
                <div className="relative h-52 overflow-hidden bg-gray-900">
                  <img
                    src={sector.image}
                    alt={sector.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08221a] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center text-2xl shadow-lg">
                    {sector.icon}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-xs font-bold text-[#f2dc9a] bg-[#08221a]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-500/30">
                    {sector.highlight}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#08221a] group-hover:text-[#158a63] transition duration-200">
                      {sector.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mt-2">
                      {sector.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: HÀNH TRÌNH PHÁT TRIỂN & CỘT MỐC LỊCH SỬ */}
        <section className="py-24 bg-gradient-to-b from-[#eef7f2] to-[#f9fdfb] border-y border-emerald-500/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#158a63] text-xs font-bold uppercase tracking-wider">
                Hành Trình Lịch Sử
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#08221a]">
                Hành Trình Phát Triển Tổ Hợp Giày Thoại Sơn & Tập Đoàn
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                Các mốc thời gian quan trọng khẳng định quy mô, uy tín và năng lực sản xuất chuyên nghiệp.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {COMPANY_TIMELINE.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-lg shadow-emerald-900/5 relative flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3.5 py-1 rounded-full bg-[#158a63] text-white font-mono font-extrabold text-sm shadow-md shadow-emerald-600/20">
                        {item.year}
                      </span>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                        Mốc Phát Triển
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#08221a] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs font-bold text-amber-700 italic">
                      {item.subtitle}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: CÁC THƯỚC ĐO VẬN HÀNH CỐT LÕI (CHỨC NĂNG PHẦN MỀM TBS II — GIỮ NGUYÊN 100%) */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#158a63] text-xs font-bold uppercase tracking-wider">
              Nền Tảng Công Nghệ TBS II
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08221a]">
              Các Thước Đo Vận Hành Cốt Lõi
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Hệ thống quản lý số hóa tích hợp toàn diện từ văn phòng điều hành đến nhà xưởng sản xuất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:-translate-y-1 transition duration-300">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#158a63] flex items-center justify-center font-extrabold text-2xl mb-6 shadow-inner">
                📄
              </div>
              <h3 className="text-xl font-bold text-[#08221a] mb-3">Số Hóa Giấy Tờ Biểu Mẫu</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Tự động nhận diện placeholder từ file Word/PDF mẫu, sinh form nhập liệu thông minh và xuất tài liệu phê duyệt chuẩn xác 100%.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:-translate-y-1 transition duration-300">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#158a63] flex items-center justify-center font-extrabold text-2xl mb-6 shadow-inner">
                📱
              </div>
              <h3 className="text-xl font-bold text-[#08221a] mb-3">App Mobile Native Sửa Máy</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Công nhân quét QR báo hỏng sự cố máy móc, nhân viên kỹ thuật nhận ticket tức thì trên App Native Android (Kotlin) & iOS (Swift) dùng chung C++ Shared Core.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:-translate-y-1 transition duration-300">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#158a63] flex items-center justify-center font-extrabold text-2xl mb-6 shadow-inner">
                📊
              </div>
              <h3 className="text-xl font-bold text-[#08221a] mb-3">BI Dashboard Vận Hành 24/7</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Báo cáo doanh số, tiến độ sản xuất, xếp hạng thiết bị hư hỏng và đo lường thời gian xử lý sự cố của nhân viên bảo trì thời gian thực.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
