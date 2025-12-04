"use client";

import { motion } from "framer-motion";
import { Element } from "react-scroll";

const CTASection = () => {
  return (
    <Element name="contact">
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="gradient-border-animate rounded-3xl p-12 md:p-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              AI Agent 도입,
              <br />
              지금 시작하세요
            </h2>
            <p className="text-dark-300 text-lg max-w-2xl mx-auto mb-10">
              무료 상담을 통해 귀사에 맞는 AI Agent 도입 전략을 제안받으세요.
              <br />
              전문 컨설턴트가 친절하게 안내해 드립니다.
            </p>

            <motion.a
              href="mailto:wabs@wabs.io"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glow-button px-10 py-4 rounded-xl text-white font-semibold text-lg inline-flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              무료 상담 신청
            </motion.a>
          </motion.div>
        </div>
      </section>
    </Element>
  );
};

export default CTASection;
