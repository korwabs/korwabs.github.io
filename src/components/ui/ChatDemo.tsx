"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ChatDemo = () => {
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "agent"; text: string }>
  >([]);
  const [isTyping, setIsTyping] = useState(false);

  const demoConversation = [
    { role: "user" as const, text: "이번 분기 매출 보고서 작성해줘" },
    {
      role: "agent" as const,
      text: "네, 이번 분기 매출 데이터를 분석하고 있습니다. 전분기 대비 23% 성장했으며, 주요 성장 동력은 신규 고객 유치입니다. 보고서를 생성할까요?",
    },
    { role: "user" as const, text: "응, PDF로 만들어줘" },
    {
      role: "agent" as const,
      text: "완료했습니다! Q4 매출 보고서.pdf 파일이 생성되었습니다. 경영진 미팅 전에 검토하실 수 있도록 이메일로도 전송해드릴까요?",
    },
  ];

  const simulateChat = () => {
    if (messages.length >= demoConversation.length) {
      setMessages([]);
      return;
    }

    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, demoConversation[prev.length]]);
      setIsTyping(false);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (messages.length < demoConversation.length) {
        simulateChat();
      } else {
        setTimeout(() => setMessages([]), 3000);
      }
    }, 2500);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length]);

  return (
    <div className="glass-card rounded-2xl p-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div>
          <h4 className="text-white font-semibold">WABS AI Agent</h4>
          <p className="text-xs text-green-400 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            온라인
          </p>
        </div>
      </div>

      <div className="h-64 overflow-y-auto space-y-3 mb-4">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                msg.role === "user"
                  ? "bg-primary-500 text-white rounded-br-md"
                  : "bg-dark-700 text-white rounded-bl-md"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-dark-700 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-dark-400 rounded-full animate-bounce" />
                <span
                  className="w-2 h-2 bg-dark-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <span
                  className="w-2 h-2 bg-dark-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="메시지를 입력하세요..."
          className="flex-1 bg-dark-800 border border-dark-600 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-primary-500 transition-colors"
        />
        <button className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center hover:scale-105 transition-transform">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatDemo;
