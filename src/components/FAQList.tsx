import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';

const faqs = [
  {
    q: "기존 시스템과의 연계는 어떻게 지원하나요?",
    a: "REST API, DB 커넥터, 파일 기반 연계 등 표준 인터페이스를 지원합니다. ERP, 그룹웨어, 데이터 웨어하우스 등 기존 시스템과의 통합 구성이 가능합니다."
  },
  {
    q: "온프레미스 환경에서도 구축이 가능한가요?",
    a: "네. 온프레미스, 프라이빗 클라우드, 퍼블릭 클라우드 환경 모두 지원합니다. 기업 보안 정책에 따라 망분리 환경 구성도 가능합니다."
  },
  {
    q: "데이터는 외부 전송이 가능한가요?",
    a: "데이터 처리 방식은 구축 형태에 따라 달라집니다. 기업 내부 처리 구조 설계가 가능하며, 데이터 저장·전송·로그 정책은 고객사 기준에 맞춰 설정됩니다."
  },
  {
    q: "LLM 및 모델 구조는 어떻게 구성되나요?",
    a: "멀티에이전트 기반 아키텍처로 구성되며, 업무 목적에 따라 다양한 모델을 선택·조합할 수 있습니다. 사내 전용 모델 연계 또는 외부 API 연동도 지원합니다."
  },
  {
    q: "확장성과 운영 관리는 어떻게 이루어지나요?",
    a: "모듈형 구조로 설계되어 기능 단위 확장이 가능하며, 관리 콘솔을 통해 사용자 권한, 사용 이력, Agent 운영 현황을 통합 관리할 수 있습니다."
  }
];

const FAQList = memo(function FAQList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {faqs.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <motion.div
            key={i}
            className="border-b border-border-light"
            initial={false}
          >
            <Button
              variant="ghost"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full py-8 flex items-center justify-between text-left group cursor-pointer h-auto px-0 hover:bg-transparent dark:hover:bg-transparent"
            >
              <span className={`text-body-xs md:text-body-md font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>
                {item.q}
              </span>
              <div className="relative w-6 h-6 flex items-center justify-center">
                <motion.div
                  className="absolute w-5 h-[2px] bg-brand-primary"
                  animate={{ rotate: 0 }}
                />
                <motion.div
                  className="absolute w-5 h-[2px] bg-brand-primary"
                  animate={{ rotate: isOpen ? 0 : 90 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </div>
            </Button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="pb-8 text-body-sm leading-relaxed font-normal break-keep max-w-2xl text-text-secondary">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </>
  );
});

export default FAQList;
