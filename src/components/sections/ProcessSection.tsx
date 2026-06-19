"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Element } from "react-scroll";
import { useRef } from "react";

const processSteps = [
  {
    title: "상담 & 분석",
    description:
      "귀사의 업무 프로세스를 분석하고 AI Agent 도입 전략을 수립합니다.",
    icon: "💬",
  },
  {
    title: "맞춤 설계",
    description:
      "기업 환경에 최적화된 AI Agent를 설계하고 프로토타입을 제작합니다.",
    icon: "✏️",
  },
  {
    title: "개발 & 통합",
    description:
      "기존 시스템과의 연동을 포함한 완전한 AI Agent 솔루션을 개발합니다.",
    icon: "⚙️",
  },
  {
    title: "배포 & 지원",
    description:
      "안정적인 배포와 함께 지속적인 모니터링 및 기술 지원을 제공합니다.",
    icon: "🚀",
  },
];

const ProcessStep = ({
  number,
  title,
  description,
  icon,
  isLast,
  index,
}: {
  number: number;
  title: string;
  description: string;
  icon: string;
  isLast: boolean;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <motion.div
      ref={ref}
      className="flex gap-6 relative"
      style={{ opacity, scale }}
    >
      <div className="flex flex-col items-center">
        {/* Animated number circle */}
        <motion.div
          className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-lg relative z-10 cursor-pointer"
          whileHover={{ scale: 1.15, rotate: 360 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <motion.span
            initial={{ opacity: 1 }}
            whileHover={{ opacity: 0 }}
            className="absolute"
          >
            {number}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute text-xl"
          >
            {icon}
          </motion.span>
        </motion.div>

        {/* Animated connecting line */}
        {!isLast && (
          <div className="w-0.5 h-full bg-dark-700 mt-2 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary-500 to-secondary-500"
              style={{ height: lineHeight }}
            />
          </div>
        )}
      </div>

      <motion.div
        className="pb-12 flex-1"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.15 }}
      >
        <motion.div
          className="glass-card rounded-xl p-6 relative overflow-hidden group cursor-pointer"
          whileHover={{ x: 10, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Shimmer effect on hover */}
          <motion.div
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
            }}
          />

          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">
            {title}
          </h3>
          <p className="text-dark-400 group-hover:text-dark-300 transition-colors">
            {description}
          </p>

          {/* Arrow indicator */}
          <motion.div
            className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ProcessSection = () => {
  return (
    <Element name="process">
      <section id="process" className="py-24 relative overflow-hidden scroll-mt-20">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary-950/10 to-transparent" />

        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-500/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.span
              className="inline-block px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Process
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              도입 <span className="gradient-text">프로세스</span>
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
                icon={step.icon}
                isLast={idx === processSteps.length - 1}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>
    </Element>
  );
};

export default ProcessSection;
