export type ChatMessage = {
  role: "user" | "agent";
  text: string;
};

export const demoConversation: ChatMessage[] = [
  { role: "user", text: "이번 분기 매출 보고서 작성해줘" },
  {
    role: "agent",
    text: "네, 이번 분기 매출 데이터를 분석하고 있습니다. 전분기 대비 23% 성장했으며, 주요 성장 동력은 신규 고객 유치입니다. 보고서를 생성할까요?",
  },
  { role: "user", text: "응, PDF로 만들어줘" },
  {
    role: "agent",
    text: "완료했습니다! Q4 매출 보고서.pdf 파일이 생성되었습니다. 경영진 미팅 전에 검토하실 수 있도록 이메일로도 전송해드릴까요?",
  },
];

export const appendNextMessage = (
  currentMessages: ChatMessage[],
  conversation: ChatMessage[] = demoConversation,
): ChatMessage[] => {
  const nextMessage = conversation[currentMessages.length];

  if (!nextMessage) {
    return currentMessages;
  }

  return [...currentMessages, nextMessage];
};
