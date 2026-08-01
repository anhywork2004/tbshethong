import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  IconBuildingFactory,
  IconDeviceMobile,
  IconChartBar,
} from "@tabler/icons-react";

const HIGHLIGHTS = [
  {
    icon: IconBuildingFactory,
    title: "Số hóa doanh nghiệp 4.0",
    description:
      "Tất cả quy trình từ đề xuất, kế toán, quản lý nhân sự đến bảo trì thiết bị đều được tự động hóa trên nền tảng Cloudflare Workers, Next.js và Mobile Native.",
  },
  {
    icon: IconDeviceMobile,
    title: "Vận hành nhà máy thời gian thực",
    description:
      "Đo lường OEE, thời gian máy dừng (downtime), tốc độ xử lý sự cố của đội ngũ bảo trì kỹ thuật thông qua mã QR và ticket số hóa.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <Header />

      <main className="flex-1 pt-28 pb-16">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Page header — asymmetric, left-aligned */}
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-wash text-accent text-xs font-bold uppercase tracking-wider">
              Về TBS Group
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight text-display">
              Giới thiệu tập đoàn TBS Group
            </h1>
            <p className="text-steel text-lg leading-relaxed max-w-[60ch]">
              Tiên phong trong sản xuất công nghiệp và số hóa quy trình quản trị
              doanh nghiệp tại Việt Nam.
            </p>
          </div>

          {/* Vision & Mission card */}
          <div className="bg-surface rounded-3xl p-8 lg:p-12 border border-border shadow-sm mb-12">
            <h2 className="text-2xl font-black text-ink text-display mb-4">
              Tầm nhìn & Sứ mệnh
            </h2>
            <p className="text-steel leading-relaxed max-w-[65ch]">
              TBS Group hướng tới xây dựng một hệ sinh thái sản xuất đạt chuẩn
              quốc tế, tích hợp công nghệ số hiện đại nhằm tối ưu hóa năng suất
              lao động, giảm thiểu rủi ro vận hành và đem lại giá trị bền vững
              cho đối tác và người lao động.
            </p>
          </div>

          {/* Highlights — 2-column asymmetric */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {HIGHLIGHTS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-surface rounded-3xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-accent-wash text-accent flex items-center justify-center mb-5">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-ink mb-2 text-display">
                    {item.title}
                  </h3>
                  <p className="text-steel text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
