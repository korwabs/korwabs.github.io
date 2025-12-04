"use client";

import { motion } from "framer-motion";
import { Element } from "react-scroll";
import { ProcessStep } from "@/components/ui";

const processSteps = [
  {
    title: "상담 & 분석",
    description:
      "귀사의 업무 프로세스를 분석하고 AI Agent 도입 전략을 수립합니다.",
  },
  {
    title: "맞춤 설계",
    description:
      "기업 환경에 최적화된 AI Agent를 설계하고 프로토타입을 제작합니다.",
  },
  {
    title: "개발 & 통합",
    description:
      "기존 시스템과의 연동을 포함한 완전한 AI Agent 솔루션을 개발합니다.",
  },
  {
    title: "배포 & 지원",
    description:
      "안정적인 배포와 함께 지속적인 모니터링 및 기술 지원을 제공합니다.",
  },
];

const ProcessSection = () => {
  return (
    <Element name="process">
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary-950/10 to-transparent" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
              Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              도입 프로세스
            </h2>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              체계적인 프로세스로 안정적인 AI Agent 도입을 보장합니다.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {processSteps.map((step, idx) => (
              <ProcessStep
                key={idx}
                number={idx + 1}
                title={step.title}
                description={step.description}
                isLast={idx === processSteps.length - 1}
                delay={idx * 0.15}
              />
            ))}
          </div>
        </div>
      </section>
    </Element>
  );
};

export default ProcessSection;
