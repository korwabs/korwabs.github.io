"use client";

import { motion, MotionValue, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Element } from "react-scroll";
import { ParticleBackground, TypewriterText } from "@/components/ui";
import { useRef } from "react";

interface HeroSectionProps {
  heroOpacity: MotionValue<number>;
  heroScale: MotionValue<number>;
}

const MagneticButton = ({
  children,
  href,
  className,
  isPrimary = false,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  isPrimary?: boolean;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: xSpring, y: ySpring }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${className} relative overflow-hidden group`}
    >
      {/* Shine effect for primary button */}
      {isPrimary && (
        <motion.div
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.a>
  );
};

const HeroSection = ({ heroOpacity, heroScale }: HeroSectionProps) => {
  // Mouse parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX - innerWidth / 2) / 50);
    mouseY.set((clientY - innerHeight / 2) / 50);
  };

  const orbX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const orbY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  // Transform for parallax layers
  const orb1X = useTransform(orbX, (v) => v * 2);
  const orb1Y = useTransform(orbY, (v) => v * 2);
  const orb2X = useTransform(orbX, (v) => v * -1.5);
  const orb2Y = useTransform(orbY, (v) => v * -1.5);

  return (
    <Element name="hero">
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <ParticleBackground />

        {/* Animated Gradient Orbs with parallax */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary-500/30 rounded-full filter blur-[100px]"
          style={{ x: orb1X, y: orb1Y }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/20 rounded-full filter blur-[120px]"
          style={{ x: orb2X, y: orb2Y }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-500/10 rounded-full filter blur-[150px]"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated badge */}
            <motion.span
              className="inline-block px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6 cursor-default"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
              }}
            >
              <motion.span
                className="inline-block"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                AI Agent 도입 & 솔루션 개발 전문
              </motion.span>
            </motion.span>

            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                비즈니스의 미래를
              </motion.span>
              <br />
              <TypewriterText
                texts={["자동화하세요", "혁신하세요", "가속화하세요"]}
              />
            </motion.h1>

            <motion.p
              className="text-xl text-dark-300 max-w-2xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              WABS는 기업 맞춤형 AI Agent를 설계, 개발, 운영합니다.
              <br />
              반복 업무 자동화부터 의사결정 지원까지, AI로 업무 효율을
              극대화하세요.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <MagneticButton
                href="mailto:wabs@wabs.io"
                isPrimary
                className="glow-button px-8 py-4 rounded-xl text-white font-semibold text-lg"
              >
                무료 상담 신청
              </MagneticButton>
              <MagneticButton
                href="#demo"
                className="px-8 py-4 rounded-xl border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-colors"
              >
                더 알아보기
              </MagneticButton>
            </motion.div>

            {/* Animated Scroll Indicator - Below buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-16"
            >
              <motion.div
                className="flex flex-col items-center gap-2 text-dark-400 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-sm">스크롤하여 더 알아보기</span>
                <motion.div
                  className="w-6 h-10 rounded-full border-2 border-dark-400 flex justify-center pt-2"
                >
                  <motion.div
                    className="w-1.5 h-1.5 bg-primary-400 rounded-full"
                    animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </Element>
  );
};

export default HeroSection;
