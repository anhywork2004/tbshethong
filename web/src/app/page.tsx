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
        {/* ═══════ HERO — Asymmetric Split Screen ═══════ */}
        <section className="relative min-h-[100dvh] flex items-center bg-accent-deep text-white overflow-hidden">
          {/* Background layers */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent-soft/15 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px]" />
          <div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gold/5 blur-[100px]"
            style={{ animationDelay: "1.5s" }}
          />

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-28 pb-16 lg:pt-32 lg:pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left: Content */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-light/15 text-accent-soft text-xs font-bold uppercase tracking-widest border border-accent-soft/20 backdrop-blur">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-soft opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-soft" />
                  </span>
                  {COMPANY_INFO.subTitle}
                </div>

                <h1 className="text-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08]">
                  {COMPANY_INFO.shortName}
                  <span className="block mt-3 font-sans font-normal text-xl sm:text-2xl lg:text-3xl bg-gradient-to-r from-gold-light via-gold to-gold-wash bg-clip-text text-transparent italic">
                    &ldquo;{COMPANY_INFO.slogan}&rdquo;
                  </span>
                </h1>

                <p className="text-white/55 text-base sm:text-lg leading-relaxed max-w-[60ch]">
                  {COMPANY_INFO.intro}
                </p>

                {/* Single primary CTA */}
                <div className="pt-2">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2.5 bg-gradient-to-r from-gold to-gold-light text-accent-deep font-extrabold px-8 py-4 rounded-full text-sm tracking-wider uppercase shadow-xl shadow-amber-500/10 hover:brightness-110 active:scale-[0.97] transition-all duration-200"
                  >
                    Truy cập hệ thống nội bộ
                    <IconArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>

              {/* Right: Live Dashboard Widget */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl bg-accent-deep/80 p-6 sm:p-8 border border-accent-soft/25 shadow-2xl shadow-accent-deep/90 backdrop-blur-2xl">
                  {/* Window chrome */}
                  <div className="flex items-center justify-between border-b border-white/8 pb-4 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                      <div className="w-3 h-3 rounded-full bg-accent-soft/80" />
                      <span className="text-xs text-white/30 font-mono ml-2">
                        tbshethong.workers.dev
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest bg-accent-soft text-white uppercase shadow-md shadow-accent-soft/20">
                      Live 24/7
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-accent-mid/70 p-4 rounded-2xl border border-accent-soft/15">
                      <div className="text-xs text-white/50 font-medium">
                        Sản lượng Nhà máy Thoại Sơn hôm nay
                      </div>
                      <div className="text-3xl font-extrabold text-accent-soft mt-1 font-mono tabular-nums">
                        32,840
                      </div>
                      <div className="text-[11px] text-accent-soft/70 mt-0.5">
                        +14.2% so với tiến độ kế hoạch
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-accent-mid/50 p-4 rounded-2xl border border-accent-soft/10">
                        <div className="text-xs text-white/40">
                          Tỷ lệ máy hoạt động
                        </div>
                        <div className="text-2xl font-bold text-gold-light mt-1 font-mono tabular-nums">
                          98.7%
                        </div>
                        <div className="text-[10px] text-amber-300/70">
                          2 máy đang sửa chữa
                        </div>
                      </div>
                      <div className="bg-accent-mid/50 p-4 rounded-2xl border border-accent-soft/10">
                        <div className="text-xs text-white/40">
                          Chuyền đang vận hành
                        </div>
                        <div className="text-2xl font-bold text-accent-soft mt-1 font-mono tabular-nums">
                          33
                        </div>
                        <div className="text-[10px] text-accent-soft/70">
                          Toàn bộ công suất
                        </div>
                      </div>
                    </div>

                    <div className="bg-accent-mid/35 p-4 rounded-2xl border border-white/5">
                      <div className="text-xs font-bold text-white/60 mb-2">
                        Nhật ký bảo trì gần đây
                      </div>
                      <div className="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
                        <span className="text-accent-soft font-mono">
                          #TK-8895 (Máy May Lập Trình TS-01)
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/15 text-amber-300">
                          Đang xử lý
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs py-1.5">
                        <span className="text-accent-soft font-mono">
                          #TK-8894 (Máy Cắt Chuyền B2)
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-accent-soft/15 text-accent-soft">
                          Hoàn thành
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats bar */}
            <div className="mt-16 lg:mt-20">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-6 rounded-3xl bg-accent-deep/60 border border-accent-soft/15 backdrop-blur-xl">
                {COMPANY_STATS.map((stat, idx) => (
                  <div key={idx} className="text-center p-3">
                    <div className="text-2xl lg:text-3xl font-black text-accent-soft font-mono tabular-nums">
                      {stat.value}
                    </div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                    <div className="text-[11px] text-white/35 mt-1 line-clamp-2 leading-tight">
                      {stat.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ SECTORS — Asymmetric Zig-Zag ═══════ */}
        <section id="sectors" className="py-24 lg:py-32 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-wash text-accent text-xs font-bold uppercase tracking-wider">
              Lĩnh vực trụ cột
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight text-display">
              6 ngành kinh doanh cốt lõi của TBS Group
            </h2>
            <p className="text-steel text-base leading-relaxed max-w-[55ch]">
              Tập trung đầu tư và phát triển chuyên sâu vào các ngành sản xuất
              công nghiệp giá trị cao và dịch vụ chuỗi cung ứng quốc tế.
            </p>
          </div>

          {/* Zig-zag cards — 2 columns alternating */}
          <div className="space-y-8">
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
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-accent-deep/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-2xl bg-surface/90 backdrop-blur flex items-center justify-center shadow-lg">
                      <Icon size={24} className="text-accent" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-xs font-bold text-gold-light bg-accent-deep/80 backdrop-blur px-3 py-1.5 rounded-full border border-accent-soft/20">
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
            <div className="max-w-2xl mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider">
                Nền tảng công nghệ TBS II
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-ink tracking-tight text-display">
                Hệ thống vận hành số hóa toàn diện
              </h2>
              <p className="text-steel text-base leading-relaxed max-w-[50ch]">
                Tích hợp từ văn phòng điều hành đến nhà xưởng sản xuất, thay thế
                hoàn toàn quy trình giấy tờ truyền thống.
              </p>
            </div>

            {/* Bento: Row 1 = 3 cols, Row 2 = 2 cols (70/30) */}
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
                    <div className="flex items-center gap-3 mb-4">
                      <IconActivity size={24} className="text-accent-soft" />
                      <span className="text-xs font-bold uppercase tracking-widest text-accent-soft">
                        Vận hành thời gian thực
                      </span>
                    </div>
                    <p className="text-white/55 text-sm leading-relaxed">
                      Hệ thống giám sát OEE, downtime máy móc và tốc độ xử lý sự
                      cố theo thời gian thực. Mọi số liệu được cập nhật tức thì
                      lên BI Dashboard cho ban điều hành.
                    </p>
                  </div>
                  <div className="flex items-center gap-6 mt-6">
                    <div>
                      <div className="text-2xl font-black text-accent-soft font-mono tabular-nums">
                        97.8%
                      </div>
                      <div className="text-[10px] text-white/35 uppercase tracking-wider">
                        OEE trung bình
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-gold-light font-mono tabular-nums">
                        26.4
                      </div>
                      <div className="text-[10px] text-white/35 uppercase tracking-wider">
                        Phút xử lý TB
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 bg-surface rounded-3xl p-8 border border-border flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <IconTool size={24} className="text-accent" />
                      <span className="text-xs font-bold uppercase tracking-widest text-accent">
                        Bảo trì & QR Code
                      </span>
                    </div>
                    <p className="text-steel text-sm leading-relaxed">
                      Mỗi máy móc được gắn QR code định danh. Công nhân quét mã,
                      chụp ảnh sự cố — ticket tự động tạo và phân công kỹ thuật
                      viên trong vòng vài giây.
                    </p>
                  </div>
                  <div className="mt-4">
                    <div className="text-2xl font-black text-ink font-mono tabular-nums">
                      842
                    </div>
                    <div className="text-[10px] text-muted uppercase tracking-wider">
                      Máy đã gắn QR code
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ CAREERS CTA — Split Screen ═══════ */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-accent-deep" />
          <div
            className="absolute inset-0 bg-cover bg-center opacity-8"
            style={{
              backgroundImage:
                "url('https://www.tbsgroup.vn/wp-content/uploads/2014/12/TBS-GROUP_team_1836-x-765-2.jpg')",
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-accent/8 blur-[120px]" />

          <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/25 bg-gold/8 text-gold-light text-xs font-bold uppercase tracking-widest">
                  Cơ hội sự nghiệp
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight text-display">
                  Gia nhập{" "}
                  <span className="bg-gradient-to-r from-gold-light to-gold bg-clip-text text-transparent">
                    TBS Group
                  </span>
                </h2>
                <p className="text-white/50 text-base lg:text-lg leading-relaxed max-w-[55ch]">
                  Trở thành một phần của tập đoàn đa ngành hàng đầu Việt Nam. Làm
                  việc tại nhà máy thông minh Thoại Sơn với công nghệ 4.0, môi
                  trường chuyên nghiệp và lộ trình phát triển bền vững.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {[
                    {
                      icon: IconUsers,
                      title: "51,200 nhân sự",
                      desc: "Môi trường chuyên nghiệp, đa dạng và hòa nhập",
                    },
                    {
                      icon: IconChartBar,
                      title: "Đào tạo & Phát triển",
                      desc: "Lộ trình thăng tiến rõ ràng, đào tạo kỹ năng",
                    },
                    {
                      icon: IconBuildingStore,
                      title: "Phúc lợi toàn diện",
                      desc: "Living Wage, bảo hiểm, học bổng cho con em CBCNV",
                    },
                  ].map((b, i) => (
                    <div
                      key={i}
                      className="bg-white/5 backdrop-blur rounded-2xl p-5 border border-white/8 hover:bg-white/8 transition-colors duration-200"
                    >
                      <b.icon size={28} className="text-gold-light mb-3" />
                      <h4 className="font-bold text-white text-sm mb-1">
                        {b.title}
                      </h4>
                      <p className="text-xs text-white/35 leading-relaxed">
                        {b.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    href="/careers"
                    className="inline-flex items-center gap-2.5 bg-gradient-to-r from-gold to-gold-light text-accent-deep font-extrabold px-8 py-4 rounded-full text-sm tracking-wider uppercase shadow-xl shadow-amber-500/10 hover:brightness-110 active:scale-[0.97] transition-all duration-200"
                  >
                    Xem vị trí tuyển dụng
                    <IconArrowRight size={18} />
                  </Link>
                </div>
              </div>

              {/* Stats visual */}
              <div className="lg:col-span-5">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "5,000+", label: "Nhân sự Thoại Sơn" },
                    { value: "9,749", label: "Suất học bổng 2025" },
                    { value: "24.7M", label: "Đôi giày mỗi năm" },
                    { value: "70M€", label: "Đầu tư năng lượng sạch" },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="bg-white/5 backdrop-blur rounded-3xl p-6 border border-white/8 text-center hover:bg-white/8 transition-colors duration-200"
                    >
                      <span className="block text-2xl sm:text-3xl font-black text-accent-soft font-mono tabular-nums mb-1">
                        {s.value}
                      </span>
                      <span className="text-[11px] text-white/35 font-medium">
                        {s.label}
                      </span>
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
