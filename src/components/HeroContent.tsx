import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const HERO_SLIDES: { category: string; main: [string, string]; sub: string; highlight?: number }[] = [
  { category: 'Biz.AI', main: ['kt ds의 기업용 AI 서비스로', '비즈니스를 성장시키세요'], sub: '귀사에 필요한 AI Agents만 쏙쏙 모아, 기업 환경에 최적화된 솔루션을 만들어요.\n실제 성과로 이어지는 변화를 경험하세요.', highlight: 1 },
  { category: '국정감사 Agent', main: ['빠른 준비, 정확한 대응', '국정감사 AI Agent로 끝!'], sub: '국정감사 담당자의 성향을 파악하여 AI가 필요한 내용을 정리하고,\n많은 자료를 일일이 찾지 않아도, 중요한 내용만 빠르게 확인할 수 있도록 도와줍니다.', highlight: 1 },
  { category: 'Works AI', main: ['내 일을 대신하는 개인 비서', 'AI 사내 업무 포털'], sub: '여러 시스템 이동 없이, 필요한 정보 제공부터 업무 처리까지,\nAI 사내 업무 포털로 복잡한 업무와 흩어진 정보를 한 곳에 모아\n더 쉽고 빠르게 일할 수 있도록 도와줍니다.', highlight: 1 },
  { category: 'AI:ON-U', main: ['비즈니스 맞춤형 AI Agent 구축', '노코딩 Agent Builder'], sub: 'Agent Builder로 코딩 없이 간단한 설정만으로 필요한 기능만 선택해\n기업 업무에 필요한 AI Agent를 바로 만들고 빠르게 구축/운영할 수 있습니다.', highlight: 1 },
];

const ROTATE_INTERVAL_MS = 6000;

interface HeroContentProps {
  isAnalyzing?: boolean;
  align?: 'left' | 'center';
}

export default function HeroContent({ isAnalyzing = false, align = 'center' }: HeroContentProps) {
  const [index, setIndex] = useState(0);
  const slide = HERO_SLIDES[index];

  const rotateTimer = useRef<ReturnType<typeof setInterval>>(undefined);
  const startRotation = useCallback(() => {
    clearInterval(rotateTimer.current);
    rotateTimer.current = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, ROTATE_INTERVAL_MS);
  }, []);

  useEffect(() => {
    startRotation();
    return () => clearInterval(rotateTimer.current);
  }, [startRotation]);

  const isLeft = align === 'left';

  return (
    <div className="relative z-10 w-full mt-[0px] md:-mt-[200px]">

      {/* 콘텐츠 영역 */}
      <div className={`max-w-6xl mx-auto px-0 pt-10 pb-20 md:pt-14 md:pb-24 min-h-[300px] flex flex-col ${isLeft ? 'items-center text-center md:items-start md:text-left' : 'items-center justify-center text-center'}`}>

      <div className="relative h-[290px] md:h-[340px] w-full flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`absolute inset-0 flex flex-col ${isLeft ? 'items-center text-center md:items-start md:text-left' : 'items-center justify-center text-center'}`}
          >
            {/* 히어로 뱃지 - 타이틀 위 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[16px] font-medium mb-4"
            >
              <span className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" />
              {slide.category}
            </motion.div>
            <h1
              className={`text-[40px] md:text-[56px] lg:text-[68px] font-[600] font-pretendard mb-4 md:mb-6 leading-[1.25] tracking-tight w-full max-w-5xl flex flex-col ${isLeft ? 'items-center md:items-start' : 'items-center'}`}
              style={{ textShadow: '0px 2px 1px rgba(0,0,0,0.06)' }}
            >
              {slide.main.map((line, i) => (
                <span key={i} className={`block whitespace-nowrap ${slide.highlight === i ? 'text-white font-[800]' : 'text-white font-[400]'} ${isLeft ? 'text-center md:text-left' : 'text-center'}`}>
                  {line}
                </span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`text-[15px] md:text-[15px] lg:text-[16px] font-normal text-white/60 max-w-[500px] md:max-w-[600px] w-full leading-relaxed line-clamp-2 ${isLeft ? 'text-center md:text-left' : 'text-center'} px-1`}
            >
              {slide.sub}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`flex flex-row gap-3 ${isLeft ? 'justify-center md:justify-start' : 'justify-center'} mt-7 md:mt-7`}
      >
        <Button
          variant="default"
          size="lg"
          className="w-[110px] md:w-[130px] h-10 md:h-12 text-[15px] relative group transition-all duration-300 !bg-white !text-black hover:!bg-white/90 !border-0 !rounded-[12px]"
          disabled={isAnalyzing}
        >
          <span className="group-hover:-translate-x-2 transition-transform duration-300">무료체험 신청</span>
          <ChevronRight size={16} className="absolute right-3 max-w-0 opacity-0 group-hover:max-w-[20px] group-hover:opacity-100 transition-all duration-300 overflow-hidden" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-[110px] md:w-[130px] h-10 md:h-12 text-[15px] relative group transition-all duration-300 !bg-transparent !text-white !border-white/10 hover:!bg-white/10 !rounded-[12px]"
        >
          <span className="group-hover:-translate-x-2 transition-transform duration-300">솔루션 문의</span>
          <ChevronRight size={16} className="absolute right-3 max-w-0 opacity-0 group-hover:max-w-[20px] group-hover:opacity-100 transition-all duration-300 overflow-hidden" />
        </Button>
      </motion.div>
      </div>
    </div>
  );
}
