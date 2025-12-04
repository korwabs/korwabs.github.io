"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Element } from "react-scroll";
import { useRef, useState } from "react";

const problems = [
  {
    emoji: "😩",
    title: "반복 업무에 지친 팀",
    description:
      "매일 같은 데이터 입력, 보고서 작성, 이메일 응대에 시간을 빼앗기고 있진 않나요?",
    gradient: "from-red-500 to-orange-500",
  },
  {
    emoji: "🤔",
    title: "AI 도입의 막막함",
    description:
      "ChatGPT는 써봤는데... 우리 회사에 맞는 AI는 어떻게 만들어야 할지 모르겠다면?",
    gradient: "from-yellow-500 to-amber-500",
  },
  {
    emoji: "💸",
    title: "높은 개발 비용 우려",
    description:
      "AI 개발에 수억원이 든다고? 합리적인 비용으로 시작할 수 있는 방법이 필요하시다면.",
    gradient: "from-green-500 to-emerald-500",
  },
];

interface ProblemCardProps {
  emoji: string;
  title: string;
  description: string;
  gradient: string;
  index: number;
}

const ProblemCard = ({ emoji, title, description, gradient, index }: ProblemCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15, type: "spring" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="glass-card rounded-2xl p-8 text-center relative overflow-hidden cursor-pointer group"
    >
      {/* Animated gradient background on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%, rgba(20, 145, 155, 0.1), transparent 50%)`,
        }}
      />

      {/* Emoji with bounce animation */}
      <motion.span
        className="text-5xl mb-4 block relative z-10"
        style={{ transform: "translateZ(30px)" }}
        animate={isHovered ? { scale: 1.2, rotate: [0, -10, 10, 0] } : { scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {emoji}
      </motion.span>

      <motion.h3
        className="text-xl font-bold text-white mb-3 relative z-10"
        style={{ transform: "translateZ(20px)" }}
      >
        {title}
      </motion.h3>

      <motion.p
        className="text-dark-400 relative z-10 group-hover:text-dark-300 transition-colors duration-300"
        style={{ transform: "translateZ(10px)" }}
      >
        {description}
      </motion.p>

      {/* Bottom gradient line */}
      <motion.div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const ProblemSection = () => {
  return (
    <Element name="problem">
      <section className="py-24 relative overflow-hidden">
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(20, 145, 155, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(64, 196, 206, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(20, 145, 155, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              이런 <span className="gradient-text">고민</span>이 있으신가요?
            </motion.h2>
            <motion.p
              className="text-dark-400 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              많은 기업들이 AI 도입의 필요성은 느끼지만, 어디서부터 시작해야
              할지 막막해합니다.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
            {problems.map((item, idx) => (
              <ProblemCard key={idx} {...item} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </Element>
  );
};

export default ProblemSection;
