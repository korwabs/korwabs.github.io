"use client";

import { motion } from "framer-motion";
import { Element } from "react-scroll";
import { FeatureCard } from "@/components/ui";

const features = [
  {
    icon: (
      <svg
        className="w-7 h-7 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "업무 자동화",
    description:
      "반복적인 업무를 AI가 대신 처리합니다. 데이터 입력, 보고서 작성, 이메일 응대까지 자동으로.",
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    title: "실시간 분석",
    description:
      "비즈니스 데이터를 실시간으로 분석하고 인사이트를 제공합니다. 의사결정을 더 빠르게.",
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "맞춤형 개발",
    description:
      "기업 환경에 맞는 커스텀 AI Agent를 개발합니다. 기존 시스템과 완벽하게 통합.",
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    title: "안정적인 운영",
    description:
      "체계적인 모니터링과 유지보수로 안정적인 서비스 운영을 지원합니다.",
  },
];

const SolutionSection = () => {
  return (
    <Element name="solution">
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-950/20 to-transparent" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-medium mb-6">
              Solution
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              WABS가 <span className="gradient-text">해결</span>해 드립니다
            </h2>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              풍부한 엔터프라이즈 개발 경험과 최신 AI 기술을 결합하여
              <br />
              귀사에 딱 맞는 AI Agent 솔루션을 제공합니다.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} delay={idx * 0.1} />
            ))}
          </div>
        </div>
      </section>
    </Element>
  );
};

export default SolutionSection;
