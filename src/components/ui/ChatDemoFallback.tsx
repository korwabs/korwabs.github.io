import { demoConversation } from "./chatDemoState";

/**
 * ChatDemo 가 오류로 그려지지 못할 때 ErrorBoundary 가 대신 보여 주는 정적 대화 카드.
 * 상태·타이머·애니메이션 없이 대화 전체를 그대로 보여 준다
 * (ChatDemo 를 재사용하면 같은 오류로 대체 화면까지 깨질 수 있어 따로 둔다).
 */
const ChatDemoFallback = () => (
  <div className="glass-card rounded-2xl p-6 max-w-md mx-auto">
    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500" />
      <h4 className="text-white font-semibold">WABS AI Agent</h4>
    </div>
    <div className="space-y-3">
      {demoConversation.map((msg, idx) => (
        <div
          key={idx}
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
        </div>
      ))}
    </div>
  </div>
);

export default ChatDemoFallback;
