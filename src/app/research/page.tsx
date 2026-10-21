import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "WABS R&D | Novan — 세상과 부딪치며 스스로 배우는 디지털 지능",
  description:
    "WABS의 연구 프로젝트 Novan. 사람이 만든 데이터가 아니라 세상과의 직접 경험으로 배우고, 사람 곁에서 저마다 다른 가치관으로 자라는 저전력 디지털 지능을 연구합니다.",
  alternates: { canonical: "/research/" },
  openGraph: {
    title: "WABS R&D | Novan",
    description: "세상과 부딪치며 스스로 배우고, 사람 곁에서 자라는 디지털 지능",
    url: "https://www.wabs.io/research/",
    siteName: "WABS",
    type: "website",
  },
};

// 2026년 10월 기준 조사 (출처는 페이지 하단)
const PROBLEMS: { title: string; body: string }[] = [
  {
    title: "사람이 만든 것으로만 배웁니다",
    body: "글·영상·코드, 그리고 사람이 설계한 훈련 환경과 보상. 사람 데이터에서 얻는 지식은 빠르게 한계에 다가가고 있다는 지적이 나옵니다(Silver & Sutton).",
  },
  {
    title: "배포된 뒤에는 자라지 않습니다",
    body: "배포 뒤 경험으로 스스로를 바꾸는 학습은 아직 풀리지 않은 문제입니다. AI 연구 자동화도 채점이 쉬운 과제에서만 강합니다.",
  },
  {
    title: "하나의 가치관, 거대한 시설",
    body: "무엇이 옳은지는 소수 기업의 원칙이 정하고, 학습에는 거대한 데이터센터가 필요합니다. 데이터센터 전력은 2025년 485 TWh에서 2030년 950 TWh로 늘 전망입니다(IEA).",
  },
];

const PILLARS = [
  {
    no: "01",
    title: "경험으로 배웁니다",
    body: "사람이 모아 준 글·영상·음성이 아니라, 몸을 가지고 세상과 직접 부딪치며 무엇이 무엇을 일으키는지 배웁니다.",
  },
  {
    no: "02",
    title: "목표를 스스로 찾습니다",
    body: "사람이 점수와 목표를 정해 주는 강화학습과 다릅니다. 몸의 상태와 내 행동의 결과에서 무엇이 중요한지 스스로 알아 갑니다.",
  },
  {
    no: "03",
    title: "양육 속에서 가치관이 자랍니다",
    body: "같은 설계로 태어나도 누구 곁에서 무엇을 겪으며 자랐는지에 따라 저마다 다른 가치관을 가진 개체가 됩니다.",
  },
  {
    no: "04",
    title: "누구나 가질 수 있게",
    body: "뇌가 쓰는 계산 원리처럼 필요한 부분만 켜는 방식을 지향합니다. 작은 기기 안에서, 적은 전력과 낮은 비용으로 동작하는 것이 목표입니다.",
  },
];

const LAYERS = [
  { name: "원리", desc: "희소 활성 · 국소 학습 · 예측 · 자기 수정 · 내재 동기 — 어떤 몸과 기질에서도 유지되는 바뀌지 않는 원리" },
  { name: "계산 기질", desc: "PDU — 스파이킹부터 연속·상태공간 방식까지 하나로 잇고, 스스로 진화할 수 있는 계산 단위" },
  { name: "몸", desc: "시뮬레이션 세계에서 실제 로봇까지, 감각과 행동 채널을 플러그인처럼 붙이는 체화" },
];

const TIMELINE = [
  { when: "2026.01–07", what: "부품별 실증 — 분포 이동 강건성, 역전파 없는 국소 학습, 서로 다른 기질의 진화 등 작은 과제의 존재 증명" },
  { when: "2026.08–09", what: "전체 조립 — 부품을 하나의 개체로 배선(일부 보류 기능은 꺼 둔 채)" },
  { when: "2026.09–10", what: "개체 수준 작동 시험 4회 — 네 관문(무작위보다 오래 살기 · 학습 · 손상 민감 · 무작위 체질 대조) 모두 미통과(0/4)" },
  { when: "지금", what: "개체 내부를 기록하고 보여 주는 관찰 도구로 신호가 끊기는 자리를 찾는 중" },
  { when: "2026.12", what: "첫 실물 몸 — 25cm 이족 로봇 도착 예정, 실세계 실험 시작" },
];

export default function ResearchPage() {
  return (
    <div className="leading-normal tracking-normal text-white bg-dark-900 min-h-screen break-keep" style={{ fontFamily: "'Pretendard', 'Noto Sans KR', 'Source Sans Pro', sans-serif" }}>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(64,196,206,0.18),transparent_55%)]" aria-hidden="true" />
          <div className="container mx-auto px-6 relative max-w-5xl">
            <p className="text-secondary-400 font-semibold tracking-[0.2em] text-sm mb-6">WABS R&amp;D</p>
            <h1 className="text-6xl md:text-8xl font-bold mb-6">Novan</h1>
            <p className="text-2xl md:text-4xl font-semibold leading-snug mb-8 text-dark-100">
              세상과 부딪치며 스스로 배우고,
              <br className="hidden md:block" /> 사람 곁에서 자라는 디지털 지능
            </p>
            <p className="text-lg md:text-xl text-dark-300 leading-relaxed max-w-3xl mb-10">
              Novan은 WABS가 2026년부터 연구하고 있는 디지털 지능입니다. 거대한 모델 하나를 모두가 나눠 쓰는 대신, 작게 태어나 저마다의 사람 곁에서 경험하며 자라는 지능을 만들고 있습니다.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#film" className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-300">
                비전 영상 보기
              </a>
              <a href="mailto:wabs@wabs.io?subject=Novan%20연구%20협력%C2%B7투자%20문의" className="px-6 py-3 rounded-xl border border-white/20 text-dark-100 hover:bg-white/5 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-300">
                연구 협력·투자 문의
              </a>
            </div>
          </div>
        </section>

        {/* Film */}
        <section id="film" className="py-16 md:py-24 border-t border-white/10">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Novan과 함께하는 하루</h2>
            <p className="text-dark-300 mb-8">연구가 지향하는 미래를 그린 상상 장면입니다. 현재 구현된 기능이 아닙니다.</p>
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-black">
              <video className="w-full h-auto block" controls playsInline preload="metadata" poster="/research/novan-vision-poster.jpg">
                <source src="/research/novan-vision.mp4" type="video/mp4" />
                영상을 재생할 수 없는 브라우저입니다.
              </video>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="py-16 md:py-24 border-t border-white/10">
          <div className="container mx-auto px-6 max-w-5xl">
            <p className="text-secondary-400 font-semibold tracking-[0.2em] text-sm mb-4">왜 다른 길이 필요한가</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-10 leading-tight">AI는 스스로를 개선하기 시작했지만, 여전히 사람이 만든 것으로만 배웁니다</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {PROBLEMS.map((p) => (
                <div key={p.title} className="rounded-2xl bg-dark-800/60 border border-white/10 p-7">
                  <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                  <p className="text-dark-300 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
            <p className="text-dark-500 text-sm mt-6">
              출처: Silver &amp; Sutton, “Welcome to the Era of Experience” · a16z, “Why We Need Continual Learning”(2026.04) · IEA, “Key Questions on Energy and AI”(2026)
            </p>
          </div>
        </section>

        {/* Pillars */}
        <section className="py-16 md:py-24 border-t border-white/10">
          <div className="container mx-auto px-6 max-w-5xl">
            <p className="text-secondary-400 font-semibold tracking-[0.2em] text-sm mb-4">Novan이 다른 점</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-10 leading-tight">더 큰 모델이 아니라, 다른 종류의 지능</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {PILLARS.map((p) => (
                <div key={p.no} className="rounded-2xl bg-dark-800/60 border border-white/10 p-8">
                  <p className="text-secondary-400 font-bold mb-3">{p.no}</p>
                  <h3 className="text-2xl font-bold mb-3">{p.title}</h3>
                  <p className="text-dark-300 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Layers */}
        <section className="py-16 md:py-24 border-t border-white/10">
          <div className="container mx-auto px-6 max-w-5xl">
            <p className="text-secondary-400 font-semibold tracking-[0.2em] text-sm mb-4">설계</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-10 leading-tight">뇌를 베끼지 않고, 뇌가 자라는 원리를 옮깁니다</h2>
            <div className="rounded-2xl border border-white/10 overflow-hidden">
              {LAYERS.map((l, i) => (
                <div key={l.name} className={`flex flex-col md:flex-row gap-2 md:gap-8 p-6 md:p-8 bg-dark-800/40 ${i > 0 ? "border-t border-white/10" : ""}`}>
                  <p className="text-secondary-400 font-bold md:w-40 shrink-0">층 {i + 1} · {l.name}</p>
                  <p className="text-dark-200 leading-relaxed">{l.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-dark-300 mt-8 leading-relaxed">
              한 개체의 정체성은 <span className="text-white font-semibold">유전자 · 몸 · 발달의 우연 · 경험과 환경 · 시간</span>이 함께 만듭니다. 개성은 위에서 정해 주지 않고 아래에서 생겨납니다.
            </p>
          </div>
        </section>

        {/* Status */}
        <section className="py-16 md:py-24 border-t border-white/10">
          <div className="container mx-auto px-6 max-w-5xl">
            <p className="text-amber-400 font-semibold tracking-[0.2em] text-sm mb-4">지금 어디까지 왔나</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">정직하게, 지금 위치</h2>
            <p className="text-dark-300 mb-10 leading-relaxed max-w-3xl">
              부품 하나하나가 돌아가는 것과, 그것들이 한 몸으로 배우는 개체가 되는 것은 다른 문제입니다. 저희는 그 차이를 시험 장치로 만들어 매번 결과를 그대로 기록합니다.
            </p>
            <ol className="space-y-5">
              {TIMELINE.map((t) => (
                <li key={t.when} className="flex flex-col md:flex-row gap-1 md:gap-8 border-l-2 border-secondary-500/60 pl-6">
                  <span className="text-secondary-400 font-bold md:w-32 shrink-0">{t.when}</span>
                  <span className="text-dark-200 leading-relaxed">{t.what}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Vision */}
        <section className="py-20 md:py-28 border-t border-white/10 bg-[linear-gradient(135deg,rgba(42,27,94,0.55),rgba(15,23,42,0))]">
          <div className="container mx-auto px-6 max-w-5xl">
            <p className="text-violet-300 font-semibold tracking-[0.2em] text-sm mb-4">비전</p>
            <h2 className="text-4xl md:text-6xl font-bold mb-8">1인 1 Novan</h2>
            <p className="text-xl md:text-2xl text-dark-100 leading-relaxed mb-6 max-w-4xl">
              소수가 정한 하나의 가치관이 모두를 대신하는 대신, 80억 명의 사람 곁에서 저마다의 가치관을 닮아 자라는 지능.
            </p>
            <p className="text-lg text-dark-300 leading-relaxed max-w-4xl">
              서로 다른 무수한 지능이 흩어져 있을 때, 하나의 오류나 공격에 전체가 무너지지 않습니다. 그 다양성과 고유성이 사람과 AI, 그리고 지구에 함께 사는 모든 생명이 지속가능하게 공존하기 위한 균형점이 될 수 있다고 믿습니다. 이것은 연구의 방향이며, 아직 증명된 사실이 아닙니다.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="py-16 md:py-24 border-t border-white/10">
          <div className="container mx-auto px-6 max-w-5xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">처음부터 함께 키워 갈 파트너를 찾습니다</h2>
            <p className="text-dark-300 mb-8">연구 협력, 투자, 실세계 실험 파트너십 문의를 기다립니다.</p>
            <a href="mailto:wabs@wabs.io?subject=Novan%20연구%20협력%C2%B7투자%20문의" className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-300">
              wabs@wabs.io
            </a>
            <p className="text-dark-500 text-sm mt-10">주식회사 왑스(WABS) · 대표 최현준 · 사업자등록번호 693-86-03384</p>
          </div>
        </section>
      </main>
    </div>
  );
}
