export default function Stats() {
  return (
    <section id="why" className="py-24 px-6 bg-[var(--color-surface)]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-20 text-[var(--color-on-surface)]">왜 KT DS와 함께 해야 할까요?</h2>
        <div className="flex flex-col gap-6 mb-32">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
             <div className="w-full md:w-64 h-20 bg-[var(--color-secondary)] rounded-full flex items-center justify-center shrink-0 shadow-sm border-2 border-[var(--color-outline)]/20">
                <div className="text-center text-[var(--color-on-secondary)]"><div className="text-lg font-bold">Retriever / Analyst</div><div className="text-xs opacity-90 font-medium">분석 · 설계</div></div>
             </div>
             <div className="flex flex-col gap-1 pt-2 text-center md:text-left">
                <h4 className="font-bold text-[var(--color-on-surface)]">데이터 협의체를 통해 데이터 분석 및 선별</h4>
                <p className="text-sm text-[var(--color-on-surface-variant)] leading-relaxed">이를 기반으로 RAG 및 Agent 구현에 최적화된 체계 구축<br />원인 분석, 옵션 비교, 리스크/영향 평가, 계획 수립</p>
             </div>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 md:ml-24">
             <div className="w-full md:w-64 h-20 bg-[var(--color-secondary)] rounded-full flex items-center justify-center shrink-0 shadow-sm border-2 border-[var(--color-outline)]/20">
                <div className="text-center text-[var(--color-on-secondary)]"><div className="text-lg font-bold">Writer/Executor</div><div className="text-xs opacity-90 font-medium">구축</div></div>
             </div>
             <div className="flex flex-col gap-1 pt-2 text-center md:text-left">
                <h4 className="font-bold text-[var(--color-on-surface)]"><span className="text-[var(--color-primary)]">17년 업력</span>으로 안정성 및 보안성을 갖춘 시스템 구축</h4>
                <p className="text-sm text-[var(--color-on-surface-variant)] leading-relaxed">답변/문서/코드/보고서 작성<br /><span className="font-bold text-[var(--color-on-surface)]">유연한 워크플로우</span> 생성 기능으로 다양한 비즈니스에 최적화</p>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center border-t border-[var(--color-outline)]/10 pt-24">
          <div className="flex flex-col items-center">
              <span className="text-[var(--color-on-surface-variant)] text-sm font-medium mb-4 italic">IT Engineer</span>
              <div className="text-5xl md:text-7xl font-black text-[var(--color-on-surface)] mb-6">1700</div>
              <p className="text-[var(--color-on-surface-variant)] text-xs md:text-sm leading-relaxed">IT 신화의 주역<br />Cloud와 AI 기술의 리더</p>
          </div>
          <div className="flex flex-col items-center">
              <span className="text-[var(--color-on-surface-variant)] text-sm font-medium mb-4 italic">Client</span>
              <div className="text-5xl md:text-7xl font-black text-[var(--color-on-surface)] mb-6">150</div>
              <p className="text-[var(--color-on-surface-variant)] text-xs md:text-sm leading-relaxed">다양한 분야의<br />글로벌 고객사</p>
          </div>
          <div className="flex flex-col items-center">
              <span className="text-[var(--color-on-surface-variant)] text-sm font-medium mb-4 italic">Solution</span>
              <div className="text-5xl md:text-7xl font-black text-[var(--color-on-surface)] mb-6">18</div>
              <p className="text-[var(--color-on-surface-variant)] text-xs md:text-sm leading-relaxed">AX를 리딩할<br />자체 개발 솔루션</p>
          </div>
          <div className="flex flex-col items-center">
              <span className="text-[var(--color-on-surface-variant)] text-sm font-medium mb-4 italic">AI Agent</span>
              <div className="text-5xl md:text-7xl font-black text-[var(--color-on-surface)] mb-6 font-mono">600+</div>
              <p className="text-[var(--color-on-surface-variant)] text-xs md:text-sm leading-relaxed">분야별 최적화된<br />자체 개발 에이전트</p>
          </div>
        </div>
      </div>
    </section>
  );
}
