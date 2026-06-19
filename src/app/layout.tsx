import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://www.wabs.io";
const title = "WABS | 조직 맞춤 AI Agent 시스템과 Human-AI Learning Loop";
const description =
  "WABS는 기업의 내부 지식, 업무 흐름, 도구, 사람의 피드백을 연결해 조직 고유의 AI Agent 시스템과 human-AI learning loop를 설계·구축·운영합니다.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "WABS | 조직 맞춤 AI Agent 시스템",
    description:
      "기업의 지식과 워크플로, 도구, 사람의 피드백을 연결해 실제 운영에 쓰이는 AI Agent 시스템을 구축합니다.",
    url: siteUrl,
    siteName: "WABS",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "WABS - AI Agent systems for organization-specific human-AI learning loops",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WABS | 조직 맞춤 AI Agent 시스템",
    description:
      "조직의 지식, 워크플로, 도구, 피드백을 연결하는 AI Agent 시스템을 설계·구축·운영합니다.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5EJE6T0G6V"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5EJE6T0G6V');
          `}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
