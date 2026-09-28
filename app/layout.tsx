import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header, MobileBuyBar } from "@/components/site-shell";
import { siteUrl } from "@/data/config";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "원복송어 | 평창 미탄면 송어 양식 브랜드",
    template: "%s | 원복송어",
  },
  description:
    "평창 미탄면에서 기른 송어회·송어포와 무지개송어액젓·차가버섯 송어액젓을 소개합니다.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <a className="skip-link" href="#main-content">본문 바로가기</a>
        <Header />
        {children}
        <Footer />
        <MobileBuyBar />
      </body>
    </html>
  );
}
