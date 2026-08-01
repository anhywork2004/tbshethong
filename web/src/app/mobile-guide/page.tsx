import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MobileGuidePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f9fdfb]">
      <Header />
      <main className="flex-1 py-16 max-w-3xl mx-auto px-6 text-center">
        <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-2xl space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 text-[#158a63] flex items-center justify-center font-bold text-3xl">
            📲
          </div>
          <h1 className="text-3xl font-extrabold text-[#08221a]">Tải Ứng Dụng Mobile Native TBS Group</h1>
          <p className="text-gray-600 text-sm leading-relaxed max-w-lg mx-auto">
            Tài khoản của bạn thuộc vai trò **Công nhân** hoặc **Nhân viên bảo trì**. Vui lòng sử dụng app Native chính thức trên thiết bị di động để thực hiện thao tác quét mã QR máy hỏng & cập nhật tiến độ sửa chữa.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-6 rounded-2xl bg-[#08221a] text-white border border-[#2fd39a]/30 text-left space-y-2">
              <div className="font-bold text-lg text-[#2fd39a]">🤖 Android App</div>
              <p className="text-xs text-gray-300">Viết bằng Kotlin + Jetpack Compose, quét mã bằng Google ML Kit.</p>
              <div className="pt-2">
                <span className="inline-block px-3 py-1 bg-emerald-500/20 text-[#2fd39a] text-xs font-mono rounded">
                  TBS_Group_v1.0.aab
                </span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#08221a] text-white border border-[#2fd39a]/30 text-left space-y-2">
              <div className="font-bold text-lg text-[#2fd39a]">🍎 iOS App</div>
              <p className="text-xs text-gray-300">Viết bằng Swift + SwiftUI, quét mã bằng AVFoundation & Vision.</p>
              <div className="pt-2">
                <span className="inline-block px-3 py-1 bg-emerald-500/20 text-[#2fd39a] text-xs font-mono rounded">
                  TBS_Group_v1.0.ipa
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 text-xs text-gray-400">
            Cả 2 ứng dụng mobile đều dùng chung bộ lõi **C++ Shared Core (`core-cpp/`)** giúp đồng bộ dữ liệu offline tức thì khi nhà xưởng chập chờn wifi.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
