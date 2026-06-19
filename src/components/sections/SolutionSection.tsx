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
    title: "워크플로 자동화",
    description:
      "반복 업무뿐 아니라 승인, 보고, 알림처럼 여러 도구를 오가는 업무 흐름을 AI Agent로 연결합니다.",
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
    title: "지식 연결과 분석",
    description:
      "내부 문서, 데이터, 운영 로그를 연결해 조직 맥락에 맞는 근거와 인사이트를 제공합니다.",
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
    title: "조직 맞춤 Agent 개발",
    description:
      "기업 환경에 맞는 커스텀 AI Agent를 개발하고 기존 시스템·권한·배포 환경과 통합합니다.",
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
    title: "피드백 기반 운영",
    description:
      "사람의 검토와 피드백을 운영 루프에 반영해 Agent가 실제 업무에 맞게 개선되도록 지원합니다.",
  },
];

const SolutionSection = () => {
  return (
    <Element name="solution">
      <section id="solution" className="py-24 relative scroll-mt-20">
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
              WABS는 <span className="gradient-text">AI 운영 루프</span>를 만듭니다
            </h2>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              AI 모델 자체보다 중요한 것은 귀사의 지식, 업무 흐름, 도구, 사람의 피드백이
              <br />
              함께 개선되는 구조입니다. WABS는 이 구조를 실제 시스템으로 구현합니다.
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
