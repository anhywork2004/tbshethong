import { COMPANY_INFO } from '@/lib/companyData';

export default function Footer() {
  return (
    <footer className="bg-[#08221a] text-gray-400 py-16 border-t border-[#158a63]/20 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#158a63] to-[#2fd39a] flex items-center justify-center font-black text-white text-base shadow-lg shadow-emerald-900/50">
              TBS
            </div>
            <div>
              <span className="font-extrabold text-white text-lg tracking-wider block">TBS GROUP</span>
              <span className="text-[10px] text-[#f2dc9a] font-bold uppercase tracking-widest block">Thoại Sơn Shoes</span>
            </div>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            {COMPANY_INFO.intro}
          </p>
          <p className="text-xs text-[#d9b96a] italic font-serif">
            &ldquo;{COMPANY_INFO.slogan}&rdquo;
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-widest border-b border-gray-800 pb-2">6 Lĩnh Vực Trụ Cột</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Sản Xuất Da Giày (25M đôi/năm)</li>
            <li>Sản Xuất Túi Xách (10M sp/năm)</li>
            <li>Đầu Tư BĐS & Hạ Tầng CN</li>
            <li>Cảng & Logistics (ICD Tân Vạn)</li>
            <li>Du Lịch Khách Sạn (Mai House)</li>
            <li>Thương Mại & Dịch Vụ (ECCO)</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-widest border-b border-gray-800 pb-2">Hệ Thống Nội Bộ TBS II</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/login" className="hover:text-[#2fd39a] transition">Cổng Đăng Nhập Hệ Thống</a></li>
            <li><a href="/documents/templates" className="hover:text-[#2fd39a] transition">Thư Viện Số Hóa Biểu Mẫu</a></li>
            <li><a href="/maintenance/machines" className="hover:text-[#2fd39a] transition">Quản Lý Bảo Trì & QR Code</a></li>
            <li><a href="/dashboard" className="hover:text-[#2fd39a] transition">BI Dashboard 24/7</a></li>
            <li><a href="/admin/users" className="hover:text-[#2fd39a] transition">Quản Trị Phân Quyền Staff</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-widest border-b border-gray-800 pb-2">Liên Hệ Trực Tiếp</h4>
          <div className="space-y-3 text-sm">
            <p className="leading-relaxed">
              <strong className="text-white block mb-0.5">Tổ Hợp Giày Thoại Sơn:</strong>
              {COMPANY_INFO.contact.address}
            </p>
            <p className="leading-relaxed">
              <strong className="text-white block mb-0.5">Trụ Sở Tập Đoàn:</strong>
              {COMPANY_INFO.contact.headquarter}
            </p>
            <p className="text-[#2fd39a] font-mono">
              📞 {COMPANY_INFO.contact.phone} | ✉️ {COMPANY_INFO.contact.email}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-gray-800/80 text-xs text-center text-gray-500">
        © 2026 TBS Group & Tổ Hợp Giày Thoại Sơn. Tất cả quyền được bảo lưu. Tích hợp Cloudflare D1/R2 & Mobile Native.
      </div>
    </footer>
  );
}
