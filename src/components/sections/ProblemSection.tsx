"use client";

import { motion } from "framer-motion";
import { Element } from "react-scroll";

const problems = [
  {
    emoji: "😩",
    title: "반복 업무에 지친 팀",
    description:
      "매일 같은 데이터 입력, 보고서 작성, 이메일 응대에 시간을 빼앗기고 있진 않나요?",
  },
  {
    emoji: "🤔",
    title: "AI 도입의 막막함",
    description:
      "ChatGPT는 써봤는데... 우리 회사에 맞는 AI는 어떻게 만들어야 할지 모르겠다면?",
  },
  {
    emoji: "💸",
    title: "높은 개발 비용 우려",
    description:
      "AI 개발에 수억원이 든다고? 합리적인 비용으로 시작할 수 있는 방법이 필요하시다면.",
  },
];

const ProblemSection = () => {
  return (
    <Element name="problem">
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              이런 고민이 있으신가요?
            </h2>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              많은 기업들이 AI 도입의 필요성은 느끼지만, 어디서부터 시작해야
              할지 막막해합니다.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass-card rounded-2xl p-8 text-center hover-lift"
              >
                <span className="text-5xl mb-4 block">{item.emoji}</span>
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-dark-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Element>
  );
};

export default ProblemSection;
