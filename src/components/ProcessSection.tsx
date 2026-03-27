export default function ProcessSection() {
  return (
    <div className="relative w-full py-10">
      <div className="bg-white relative z-20 overflow-hidden smooth-gpu rounded-[28px] mx-3">
        <section id="process" className="py-16 md:py-32 relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-10 relative z-10">
            <div className="text-left md:text-center mb-12 md:mb-24 container-responsive">
              <span className="text-body-sm md:text-body text-[#999999] mb-3 block font-medium">왜 kt ds와 함께 해야 할까요?</span>
              <h1 className="text-heading-md md:text-display-sm lg:text-display-md font-bold text-black mb-4 md:mb-6 tracking-tight leading-tight font-poppins">
                Why kt ds
              </h1>
              <p className="text-black/80 text-body-sm md:text-body-sm lg:text-body max-w-2xl mx-0 md:mx-auto font-medium">
                기업의 복잡한 요구사항을 기획부터 구축, 검증, 운영까지<br className="hidden md:block" />
                표준화된 프로세스로 완성합니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                {
                  num: "01", title: "분석/설계", subtitle: "Retriever,\nAnalyst", color: "text-brand-primary",
                  bullets: [
                    "데이터 협의체 기반 분석 및 선별",
                    "이를 기반으로 RAG 및 Agent 구현에 최적화된 체계 구축",
                    "원인 분석, 옵션 비교, 리스크/영향 평가, 계획 수립"
                  ]
                },
                {
                  num: "02", title: "구축", subtitle: "Writer,\nExecutor", color: "text-brand-primary",
                  bullets: [
                    "17년 업력으로 안정성 및 보안성을 갖춘 시스템 구축",
                    "답변/문서/코드/보고서 작성",
                    "유연한 워크플로우 생성 기능으로 다양한 비즈니스에 최적화"
                  ]
                },
                {
                  num: "03", title: "테스트 및 이행", subtitle: "Validator,\nQuality", color: "text-brand-primary",
                  bullets: [
                    "단계적인 성능 검증 및 최적화",
                    "검증, 규정/정책/보안/품질 체크, 근거 링크",
                    "피드백 반영, 프롬프트/룰/플레이북/지식 업데이트"
                  ]
                },
                {
                  num: "04", title: "안정화", subtitle: "Maintainer,\nSRE", color: "text-brand-primary",
                  bullets: [
                    "KPI/SLA/SLO 모니터링, 이상탐지, 알림/에스컬레이션",
                    "의사결정 근거·승인·변경 이력 기록(감사 대응)",
                    "사용자/관리자 매뉴얼 제공 및 교육"
                  ]
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="relative bg-[#F6F6F6] rounded-[20px] p-6 md:p-10 flex flex-col min-h-[320px] md:min-h-[420px] overflow-hidden"
                >
                  <div className="relative min-h-[100px] md:min-h-[130px]">
                    <span className={`${step.color} text-body-sm md:text-body-md font-bold mb-2 block`}>{step.num}</span>
                    <h3 className="text-[24px] md:text-heading-md font-bold text-gray-900 leading-tight whitespace-pre-line">{step.subtitle}</h3>
                  </div>
                  <div className="relative flex-1" />
                  <div className="relative min-h-[160px]">
                    <h4 className="text-body-sm font-semibold text-gray-900 mb-3">{step.title}</h4>
                    <ul className="space-y-2">
                      {step.bullets.map((bullet, j) => (
                        <li key={j} className="flex items-start gap-2 text-black/80 text-label-lg leading-relaxed font-normal">
                          <span className="mt-[9px] w-1 h-1 rounded-full bg-black/25 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
