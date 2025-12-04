"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Element } from "react-scroll";
import { useRef, useState } from "react";

const CTASection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const spotlightX = useTransform(mouseXSpring, (val) => `${val}%`);
  const spotlightY = useTransform(mouseYSpring, (val) => `${val}%`);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100;
    x.set(mouseX);
    y.set(mouseY);
  };

  return (
    <Element name="contact">
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative rounded-3xl p-12 md:p-16 text-center overflow-hidden"
            style={{
              background: "#0f172a",
            }}
          >
            {/* Static gradient border */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                padding: "2px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4, #8b5cf6, #6366f1)",
                backgroundSize: "400% 400%",
                animation: "gradient-rotate 8s linear infinite",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />

            {/* Interactive spotlight effect */}
            <motion.div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
              style={{
                opacity: isHovered ? 0.6 : 0,
                background: `radial-gradient(600px circle at ${spotlightX.get()} ${spotlightY.get()}, rgba(99, 102, 241, 0.15), transparent 40%)`,
              }}
            />

            {/* Content */}
            <div className="relative z-10">
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                AI Agent 도입,
                <br />
                <span className="gradient-text">지금 시작하세요</span>
              </motion.h2>

              <motion.p
                className="text-dark-300 text-lg max-w-2xl mx-auto mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                무료 상담을 통해 귀사에 맞는 AI Agent 도입 전략을 제안받으세요.
                <br />
                전문 컨설턴트가 친절하게 안내해 드립니다.
              </motion.p>

              <motion.a
                href="mailto:wabs@wabs.io"
                className="glow-button px-10 py-4 rounded-xl text-white font-semibold text-lg inline-flex items-center justify-center gap-2 relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {/* Button shine effect */}
                <motion.div
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  }}
                />

                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </motion.svg>
                <span className="relative z-10">무료 상담 신청</span>
              </motion.a>
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            />
          </motion.div>
        </div>
      </section>
    </Element>
  );
};

export default CTASection;
