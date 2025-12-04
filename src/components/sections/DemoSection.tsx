"use client";

import { motion } from "framer-motion";
import { Element } from "react-scroll";
import { ChatDemo } from "@/components/ui";

const useCases = [
  "반복적인 데이터 입력 및 정리 작업",
  "정기 보고서 자동 생성 및 발송",
  "고객 문의 초기 응대 및 분류",
  "일정 관리 및 미팅 스케줄링",
];

const DemoSection = () => {
  return (
    <Element name="demo">
      <section id="demo" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-secondary-500/10 border border-secondary-500/20 text-secondary-400 text-sm font-medium mb-6">
                Use Case
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                이런 업무를
                <br />
                <span className="gradient-text">자동화</span>할 수 있어요
              </h2>
              <p className="text-dark-400 text-lg mb-8 leading-relaxed">
                AI Agent는 자연어 명령만으로 다양한 업무를 처리합니다.
                <br />
                복잡한 워크플로우도 대화하듯 간단하게 자동화하세요.
              </p>

              <ul className="space-y-4">
                {useCases.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="flex items-center gap-3 text-dark-300"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ChatDemo />
            </motion.div>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default DemoSection;
