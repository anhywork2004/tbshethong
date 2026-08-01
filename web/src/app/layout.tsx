import type { Metadata } from "next";
import { Outfit, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import DevToolsShield from "@/components/DevToolsShield";

const playfair = Outfit({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const vietnamPro = Be_Vietnam_Pro({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tổ Hợp Giày TBS Group — Thoại Sơn Digital Factory II",
  description: "Hệ thống số hóa sản xuất toàn diện và quản trị quy trình doanh nghiệp TBS II. Giải pháp thay thế hoàn toàn giấy tờ truyền thống.",
  keywords: "TBS Group, Thoại Sơn Shoes, Da giày Thoại Sơn, Chuyển đổi số, TBS II, Quản lý sản xuất, Bảo trì máy móc",
  openGraph: {
    title: "Tổ Hợp Giày TBS Group — Thoại Sơn Digital Factory II",
    description: "Hệ thống quản trị quy trình số hóa toàn diện nhà máy TBS Thoại Sơn.",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${vietnamPro.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#f9fdfb] text-[#1c2e27]">
        {/* Anti-F12, Anti-Copy, Anti-Right Click Shield */}
        <DevToolsShield />
        {children}
      </body>
    </html>
  );
}
