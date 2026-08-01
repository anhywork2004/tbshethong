import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f9fdfb]">
      <Header />
      <main className="flex-1 py-16 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#08221a]">Liên Hệ Với TBS Group</h1>
          <p className="text-gray-600 mt-2 text-base">Chúng tôi luôn sẵn sàng hỗ trợ và giải đáp thắc mắc của bạn</p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-bold text-[#158a63] mb-4">Trụ Sở & Chi Nhánh</h2>
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <strong className="block text-[#08221a]">Nhà Máy TBS Thoại Sơn:</strong>
                <span>Cụm Công Nghiệp Thoại Sơn, Huyện Thoại Sơn, Tỉnh An Giang</span>
              </div>
              <div>
                <strong className="block text-[#08221a]">Văn Phòng Điều Hành:</strong>
                <span>TP. Hồ Chí Minh & Bình Dương</span>
              </div>
              <div>
                <strong className="block text-[#08221a]">Hotline Hỗ Trợ Kỹ Thuật:</strong>
                <span className="text-[#158a63] font-bold">1900 888 999</span>
              </div>
              <div>
                <strong className="block text-[#08221a]">Email Liên Hệ:</strong>
                <span>contact@tbsgroup.vn</span>
              </div>
            </div>
          </div>

          <div className="bg-[#eef7f2] p-6 rounded-xl border border-emerald-100 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-[#08221a] mb-2">Truy Cập Nhanh Hệ Thống Nội Bộ</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-6">
                Đối với cán bộ công nhân viên TBS Group, vui lòng đăng nhập tài khoản nội bộ để số hóa biểu mẫu hoặc tải app mobile sửa chữa máy hỏng.
              </p>
            </div>
            <a
              href="/login"
              className="w-full py-3 rounded-lg bg-[#158a63] text-white font-bold text-center text-sm hover:bg-[#1fae7d] transition block"
            >
              Đăng Nhập Cổng Nội Bộ
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
