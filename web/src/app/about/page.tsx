import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f9fdfb]">
      <Header />
      <main className="flex-1 py-16 max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#08221a]">Giới Thiệu Tập Đoàn TBS Group</h1>
          <p className="text-gray-600 mt-3 text-lg">Tiên phong trong sản xuất công nghiệp & Số hóa quy trình quản trị doanh nghiệp</p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-[#158a63] mb-3">Tầm Nhìn & Sứ Mệnh</h2>
            <p className="text-gray-700 leading-relaxed">
              TBS Group hướng tới xây dựng một hệ sinh thái sản xuất đạt chuẩn quốc tế, tích hợp công nghệ số hiện đại nhằm tối ưu hóa năng suất lao động, giảm thiểu rủi ro vận hành và đem lại giá trị bền vững cho đối tác và người lao động.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            <div className="bg-[#eef7f2] p-6 rounded-xl border border-emerald-200">
              <h3 className="font-bold text-[#08221a] text-lg mb-2">Số Hóa Doanh Nghiệp 4.0</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Tất cả quy trình từ đề xuất, kế toán, quản lý nhân sự đến bảo trì thiết bị đều được tự động hóa trên nền tảng Cloudflare Workers, Next.js và Mobile Native.
              </p>
            </div>
            <div className="bg-[#faf0d0]/50 p-6 rounded-xl border border-amber-200">
              <h3 className="font-bold text-[#08221a] text-lg mb-2">Vận Hành Nhà Máy Thời Gian Thực</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Đo lường OEE, thời gian máy dừng (Downtime), tốc độ xử lý sự cố của đội ngũ bảo trì kỹ thuật thông qua mã QR và ticket số hóa.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
