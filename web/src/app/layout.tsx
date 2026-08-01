import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import DevToolsShield from "@/components/DevToolsShield";

const vietnamPro = Be_Vietnam_Pro({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TBS Group — Thoại Sơn Digital Factory",
  description:
    "Hệ thống số hóa sản xuất toàn diện và quản trị quy trình doanh nghiệp TBS II. Thay thế hoàn toàn giấy tờ truyền thống.",
  keywords:
    "TBS Group, Thoại Sơn Shoes, Da giày Thoại Sơn, Chuyển đổi số, TBS II, Quản lý sản xuất, Bảo trì máy móc",
  openGraph: {
    title: "TBS Group — Thoại Sơn Digital Factory",
    description:
      "Hệ thống quản trị quy trình số hóa toàn diện nhà máy TBS Thoại Sơn.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${vietnamPro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-canvas text-ink">
        <DevToolsShield />
        {children}
      </body>
    </html>
  );
}
