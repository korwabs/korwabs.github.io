"use client";

import { motion } from "framer-motion";

const projects = [
  {
    category: "물류/ESG",
    title: "CXP SaaS",
    summary:
      "LCA 운송 경로 분석 플랫폼 — CSV 업로드부터 AI 경로 분석, 탄소 배출량 계산, 시각화 리포트까지 연결했습니다.",
    proof: ["90%+ 분석 시간 단축", "도로·항공·해상 지원", "Excel/PDF 리포트"],
    stack: ["Next.js", "Supabase", "Google Gemini 2.5 Flash"],
  },
  {
    category: "업무자동화",
    title: "Meeting Assistant",
    summary:
      "GPU 기반 AI 회의록 자동화 솔루션 — 음성 업로드, 화자 분리, STT, AI 요약, 이메일 전달까지 6단계 파이프라인으로 구성했습니다.",
    proof: ["6단계 AI 파이프라인", "Private/Hybrid/Cloud 배포 옵션", "Triton Server GPU 가속"],
    stack: ["FastAPI", "NVIDIA Triton", "Whisper v3", "GPT-4.1"],
  },
  {
    category: "AI Agent",
    title: "Multi-AI Agent System",
    summary:
      "LangGraph 기반 멀티스테이지 엔터프라이즈 AI 에이전트 시스템 — 복합 도메인 질의를 3단계 파이프라인과 6개 서브에이전트로 처리합니다.",
    proof: ["6개 도메인 서브에이전트", "3단계 파이프라인", "3계층 메모리 계층"],
    stack: ["LangGraph", "LangChain", "FAISS", "FastAPI"],
  },
];

const ProofSection = () => {
  return (
    <section id="proof" className="py-24 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-800/40 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
            Proof
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            말이 아니라 <span className="gradient-text">작동한 시스템</span>으로 증명합니다
          </h2>
          <p className="text-dark-400 text-lg max-w-3xl mx-auto leading-relaxed">
            WABS는 단순 챗봇이 아니라 데이터, 워크플로, 배포 환경까지 연결되는
            조직 맞춤 AI Agent 시스템을 실제 프로젝트로 구현해 왔습니다.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: idx * 0.12 }}
              className="glass-card rounded-2xl p-6 relative overflow-hidden group flex flex-col"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10" />

              <div className="relative z-10 flex flex-col h-full">
                <span className="text-sm font-semibold text-secondary-400 mb-4">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-dark-300 leading-relaxed mb-6">
                  {project.summary}
                </p>

                <div className="space-y-3 mb-6">
                  {project.proof.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-dark-300">
                      <span className="mt-1 w-5 h-5 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shrink-0">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full bg-dark-800/70 border border-white/10 text-dark-300 text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-10 text-center"
        >
          <a
            href="/portfolio/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 transition-colors"
          >
            전체 포트폴리오 보기
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProofSection;
