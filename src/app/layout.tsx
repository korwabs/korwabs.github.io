import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WABS - AI Agent 도입 & 솔루션 개발 전문",
  description: "WABS는 기업 맞춤형 AI Agent를 설계, 개발, 운영합니다. 반복 업무 자동화부터 의사결정 지원까지, AI로 업무 효율을 극대화하세요.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
