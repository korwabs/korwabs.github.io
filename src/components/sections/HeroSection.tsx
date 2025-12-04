"use client";

import { motion, MotionValue } from "framer-motion";
import { Element } from "react-scroll";
import { ParticleBackground, TypewriterText } from "@/components/ui";

interface HeroSectionProps {
  heroOpacity: MotionValue<number>;
  heroScale: MotionValue<number>;
}

const HeroSection = ({ heroOpacity, heroScale }: HeroSectionProps) => {
  return (
    <Element name="hero">
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center"
      >
        <ParticleBackground />

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/30 rounded-full filter blur-[100px] animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/20 rounded-full filter blur-[120px] animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-500/10 rounded-full filter blur-[150px]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
              AI Agent 도입 & 솔루션 개발 전문
            </span>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              비즈니스의 미래를
              <br />
              <TypewriterText
                texts={["자동화하세요", "혁신하세요", "가속화하세요"]}
              />
            </h1>

            <p className="text-xl text-dark-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              WABS는 기업 맞춤형 AI Agent를 설계, 개발, 운영합니다.
              <br />
              반복 업무 자동화부터 의사결정 지원까지, AI로 업무 효율을
              극대화하세요.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="mailto:wabs@wabs.io"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glow-button px-8 py-4 rounded-xl text-white font-semibold text-lg"
              >
                무료 상담 신청
              </motion.a>
              <motion.a
                href="#demo"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-colors"
              >
                데모 체험하기
              </motion.a>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="scroll-indicator flex flex-col items-center gap-2 text-dark-400">
              <span className="text-sm">스크롤하여 더 알아보기</span>
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </Element>
  );
};

export default HeroSection;
