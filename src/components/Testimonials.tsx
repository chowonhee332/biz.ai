import { Building2, Map } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 bg-[var(--color-surface-variant)]/30">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-3 mb-6 px-4">
            <div className="p-2 bg-[var(--color-surface)] rounded-xl shadow-sm border border-[var(--color-outline)]/10 text-[var(--color-primary)]">
              <Building2 size={32} />
            </div>
            <span className="text-xl font-bold text-[var(--color-on-surface)]">한국기계산업진흥회</span>
          </div>
          <div className="w-full bg-[var(--color-surface)] rounded-[2rem] p-10 md:p-14 shadow-sm border border-[var(--color-outline)]/10 relative text-center">
             <p className="text-lg md:text-2xl font-medium text-[var(--color-on-surface-variant)] leading-relaxed relative z-10">“ 정책 의사결정과 실무자의 분석. 예측 업무를 지원하는 정책 지원형 AI 서비스 구축으로 업무 생산성 강화에 도움이 되었습니다. ”</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-3 mb-6 px-4">
            <span className="text-xl font-bold text-[var(--color-on-surface)]">경기도</span>
            <div className="p-2 bg-[var(--color-tertiary-container)] rounded-xl shadow-sm border border-[var(--color-outline)]/10 text-[var(--color-on-tertiary-container)]">
              <Map size={32} />
            </div>
          </div>
          <div className="w-full bg-[var(--color-surface)] rounded-[2rem] p-10 md:p-14 shadow-sm border border-[var(--color-outline)]/10 relative text-center">
             <p className="text-lg md:text-2xl font-medium text-[var(--color-on-surface-variant)] leading-relaxed relative z-10">“ 경기도가 보유한 공공데이터를 체계화하고 통합/개방 데이터 플랫폼을 안정적으로 구축하여, 도민들이 손쉽게 공공데이터에 접근/활용할 수 있는 기반을 마련해 주었습니다. ”</p>
          </div>
        </div>
      </div>
    </section>
  );
}
