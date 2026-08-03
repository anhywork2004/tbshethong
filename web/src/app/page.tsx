import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  COMPANY_INFO,
  COMPANY_STATS,
  COMPANY_SECTORS,
} from "@/lib/companyData";
import {
  IconBuildingFactory,
  IconBackpack,
  IconShip,
  IconBuildingSkyscraper,
  IconBuildingStore,
  IconShoppingBag,
  IconFileText,
  IconDeviceMobile,
  IconChartBar,
  IconArrowRight,
  IconActivity,
  IconTool,
  IconUsers,
} from "@tabler/icons-react";

/* Map icon names from companyData to actual Tabler components */
const SECTOR_ICONS: Record<string, React.ElementType> = {
  IconShoe: IconBuildingFactory,
  IconBackpack: IconBackpack,
  IconShip: IconShip,
  IconBuildingSkyscraper: IconBuildingSkyscraper,
  IconBuildingStore: IconBuildingStore,
  IconShoppingBag: IconShoppingBag,
};

const FEATURES = [
  {
    icon: IconFileText,
    title: "Số hóa giấy tờ biểu mẫu",
    description:
      "Tự động nhận diện placeholder từ file Word/PDF mẫu, sinh form nhập liệu thông minh và xuất tài liệu phê duyệt chuẩn xác tuyệt đối.",
  },
  {
    icon: IconDeviceMobile,
    title: "App mobile native sửa máy",
    description:
      "Công nhân quét QR báo hỏng sự cố máy móc, nhân viên kỹ thuật nhận ticket tức thì trên App Native Android (Kotlin) & iOS (Swift) dùng chung C++ Shared Core.",
  },
  {
    icon: IconChartBar,
    title: "BI Dashboard vận hành 24/7",
    description:
      "Báo cáo doanh số, tiến độ sản xuất, xếp hạng thiết bị hư hỏng và đo lường thời gian xử lý sự cố của nhân viên bảo trì theo thời gian thực.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas font-sans antialiased text-ink">
      <Header />

      <main className="flex-1">
        {/* HERO — Split with real factory photo */}
        <section className="relative min-h-[100dvh] flex items-center bg-accent-deep text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent-soft/10 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-28 pb-16 lg:pt-32 lg:pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left: Content */}
              <div className="lg:col-span-6 space-y-6">
                <h1 className="text-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08]">
                  {COMPANY_INFO.shortName}
                  <span className="block mt-3 text-2xl sm:text-3xl lg:text-4xl text-white/60 font-light italic leading-tight">
                    &ldquo;{COMPANY_INFO.slogan}&rdquo;
                  </span>
                </h1>

                <p className="text-white/50 text-base sm:text-lg leading-relaxed max-w-[60ch]">
                  {COMPANY_INFO.intro}
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2.5 bg-white text-accent-deep font-bold px-7 py-3.5 rounded-xl text-sm tracking-wide hover:bg-accent-soft hover:text-white active:scale-[0.98] transition-all duration-200"
                  >
                    Truy cập hệ thống nội bộ
                    <IconArrowRight size={18} />
                  </Link>
                  <a
                    href="#sectors"
                    className="inline-flex items-center gap-2.5 text-white/60 font-semibold px-7 py-3.5 rounded-xl text-sm hover:text-white hover:bg-white/5 transition-all duration-200"
                  >
                    Khám phá TBS Group
                  </a>
                </div>
              </div>

              {/* Right: Real factory photo */}
              <div className="lg:col-span-6">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-accent-mid border border-white/10 shadow-2xl">
                  <img
                    src="https://www.tbsgroup.vn/wp-content/uploads/2014/12/TBS-GROUP_team_1836-x-765-2.jpg"
                    alt="TBS Group — Tổ hợp nhà máy Thoại Sơn"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-accent-deep/50 via-transparent to-transparent" />
                </div>
              </div>
            </div>

            {/* Stats bar — clean typography */}
            <div className="mt-16 lg:mt-20 border-t border-white/10 pt-10">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {COMPANY_STATS.map((stat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-2xl lg:text-3xl font-black text-white font-mono tabular-nums">
                      {stat.value}
                    </div>
                    <div className="text-xs font-semibold text-white/70">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ SECTORS — Clean Editorial Layout ═══════ */}
        <section id="sectors" className="py-24 lg:py-32 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight text-display">
              6 ngành kinh doanh cốt lõi của TBS Group
            </h2>
            <p className="text-steel text-base leading-relaxed max-w-[55ch]">
              Tập trung đầu tư và phát triển chuyên sâu vào các ngành sản xuất
              công nghiệp giá trị cao và dịch vụ chuỗi cung ứng quốc tế.
            </p>
          </div>

          {/* Zig-zag cards — 2 columns alternating */}
          <div className="space-y-12">
            {COMPANY_SECTORS.map((sector, idx) => {
              const Icon = SECTOR_ICONS[sector.icon] || IconBuildingFactory;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={sector.id}
                  className={`group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                    !isEven ? "lg:direction-rtl" : ""
                  }`}
                >
                  {/* Image side */}
                  <div
                    className={`lg:col-span-5 relative h-72 lg:h-80 rounded-3xl overflow-hidden bg-accent-deep ${
                      !isEven ? "lg:order-2" : ""
                    }`}
                  >
                    <img
                      src={sector.image}
                      alt={sector.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-accent-deep/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-2xl bg-surface/90 backdrop-blur flex items-center justify-center shadow-lg">
                      <Icon size={24} className="text-accent" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-xs font-bold text-gold-light bg-accent-deep/90 backdrop-blur px-3.5 py-1.5 rounded-xl border border-accent-soft/20">
                        {sector.highlight}
                      </span>
                    </div>
                  </div>

                  {/* Text side */}
                  <div
                    className={`lg:col-span-7 space-y-4 ${
                      !isEven ? "lg:order-1 lg:text-right" : ""
                    }`}
                  >
                    <h3 className="text-2xl lg:text-3xl font-black text-ink text-display group-hover:text-accent transition-colors duration-200">
                      {sector.title}
                    </h3>
                    <p className="text-steel text-base leading-relaxed max-w-[55ch]">
                      {sector.description}
                    </p>
                    <div
                      className={`inline-flex items-center gap-1.5 text-sm font-bold text-accent cursor-pointer ${
                        !isEven ? "lg:flex-row-reverse" : ""
                      }`}
                    >
                      <span>Xem chi tiết</span>
                      <IconArrowRight size={16} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════ CORE FEATURES — Bento Grid ═══════ */}
        <section className="py-24 lg:py-32 bg-accent-wash border-y border-accent/8">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="max-w-2xl mb-16 space-y-3">
              <h2 className="text-3xl sm:text-4xl font-black text-ink tracking-tight text-display">
                Hệ thống vận hành số hóa toàn diện
              </h2>
              <p className="text-steel text-base leading-relaxed max-w-[50ch]">
                Tích hợp từ văn phòng điều hành đến nhà xưởng sản xuất, thay thế
                hoàn toàn quy trình giấy tờ truyền thống.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {FEATURES.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={idx}
                      className="group bg-surface rounded-3xl p-8 border border-border shadow-sm hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-accent-wash text-accent flex items-center justify-center mb-6">
                        <Icon size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-ink mb-3 text-display">
                        {feature.title}
                      </h3>
                      <p className="text-steel text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Stats row — asymmetric 2-col */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="md:col-span-3 bg-accent-deep rounded-3xl p-8 text-white flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">
                      Vận hành thời gian thực
                    </h4>
                    <p className="text-white/55 text-sm leading-relaxed">
                      Hệ thống giám sát OEE, downtime máy móc và tốc độ xử lý sự
                      cố theo thời gian thực. Mọi số liệu được cập nhật tức thì
                      lên BI Dashboard cho ban điều hành.
                    </p>
                  </div>
                  <div className="flex items-center gap-8 mt-6 pt-6 border-t border-white/10">
                    <div>
                      <div className="text-3xl font-black text-accent-soft font-mono tabular-nums">
                        97.8%
                      </div>
                      <div className="text-xs text-white/50 font-medium">
                        OEE trung bình
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-gold-light font-mono tabular-nums">
                        26.4
                      </div>
                      <div className="text-xs text-white/50 font-medium">
                        Phút xử lý TB
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 bg-surface rounded-3xl p-8 border border-border flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-ink mb-2">
                      Bảo trì & Mã QR
                    </h4>
                    <p className="text-steel text-sm leading-relaxed">
                      Mỗi máy móc được gắn QR code định danh. Công nhân quét mã,
                      chụp ảnh sự cố — ticket tự động tạo và phân công kỹ thuật
                      viên trong vòng vài giây.
                    </p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="text-3xl font-black text-ink font-mono tabular-nums">
                      842
                    </div>
                    <div className="text-xs text-muted font-medium">
                      Máy đã gắn QR code
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CAREERS CTA */}
        <section className="relative py-24 lg:py-32 bg-accent-deep text-white overflow-hidden">
          <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-7 space-y-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight text-display">
                  Gia nhập TBS Group
                </h2>
                <p className="text-white/60 text-base lg:text-lg leading-relaxed max-w-[55ch]">
                  Trở thành một phần của tập đoàn đa ngành hàng đầu Việt Nam. Làm
                  việc tại nhà máy thông minh Thoại Sơn với công nghệ 4.0, môi
                  trường chuyên nghiệp và lộ trình phát triển bền vững.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {[
                    { icon: IconUsers, title: "51,200 nhân sự", desc: "Môi trường chuyên nghiệp, đa dạng" },
                    { icon: IconChartBar, title: "Đào tạo & Phát triển", desc: "Lộ trình thăng tiến rõ ràng" },
                    { icon: IconBuildingStore, title: "Phúc lợi toàn diện", desc: "Living Wage, bảo hiểm, học bổng" },
                  ].map((b, i) => (
                    <div key={i} className="bg-white/[0.04] rounded-2xl p-5 border border-white/5 hover:bg-white/[0.08] transition-colors duration-200">
                      <b.icon size={24} strokeWidth={1.5} className="text-accent-soft mb-3" />
                      <h4 className="font-bold text-white text-sm mb-1">{b.title}</h4>
                      <p className="text-xs text-white/40 leading-relaxed">{b.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    href="/careers"
                    className="inline-flex items-center gap-2.5 bg-white text-accent-deep font-bold px-7 py-3.5 rounded-xl text-sm hover:bg-accent-soft hover:text-white active:scale-[0.98] transition-all duration-200"
                  >
                    Xem vị trí tuyển dụng
                    <IconArrowRight size={18} />
                  </Link>
                </div>
              </div>

              {/* Stats */}
              <div className="lg:col-span-5">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "5,000+", label: "Nhân sự Thoại Sơn" },
                    { value: "9,749", label: "Suất học bổng 2025" },
                    { value: "24.7M", label: "Đôi giày mỗi năm" },
                    { value: "70M€", label: "Đầu tư năng lượng sạch" },
                  ].map((s, i) => (
                    <div key={i} className="bg-white/[0.04] rounded-2xl p-6 text-center border border-white/5">
                      <span className="block text-2xl sm:text-3xl font-black text-white font-mono tabular-nums mb-1">
                        {s.value}
                      </span>
                      <span className="text-xs text-white/50 font-medium">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
