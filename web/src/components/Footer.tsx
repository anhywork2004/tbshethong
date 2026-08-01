export default function Footer() {
  return (
    <footer className="bg-[#08221a] text-gray-400 py-12 border-t border-[#158a63]/20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#158a63] flex items-center justify-center font-bold text-white text-sm">
              TBS
            </div>
            <span className="font-bold text-white text-lg tracking-wide">TBS GROUP</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Hệ thống số hóa giấy tờ & quản lý vận hành nhà máy thông minh TBS Group.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Hệ Thống</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/login" className="hover:text-[#2fd39a] transition">Số hóa giấy tờ</a></li>
            <li><a href="/login" className="hover:text-[#2fd39a] transition">Quản lý bảo trì máy</a></li>
            <li><a href="/login" className="hover:text-[#2fd39a] transition">BI Dashboard 24/7</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Khám Phá</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-[#2fd39a] transition">Lịch sử & Tầm nhìn</a></li>
            <li><a href="/careers" className="hover:text-[#2fd39a] transition">Cơ hội nghề nghiệp</a></li>
            <li><a href="/contact" className="hover:text-[#2fd39a] transition">Thông tin liên hệ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Liên Hệ</h4>
          <p className="text-sm leading-relaxed mb-2">Thoại Sơn, An Giang & Các chi nhánh TBS Group trên toàn quốc</p>
          <p className="text-sm text-[#2fd39a]">contact@tbsgroup.vn</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-gray-800 text-xs text-center text-gray-500">
        © 2026 TBS Group. Tất cả quyền được bảo lưu. Đã tối ưu hóa cho Web, Android & iOS Native.
      </div>
    </footer>
  );
}
