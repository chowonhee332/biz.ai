import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const HERO_SLIDES: { main: [string, string]; sub: string }[] = [
  { main: ['All-Round AI for', 'Every Enterprise.'], sub: '기업 전반에 적용 가능한 All-Round AI 솔루션을 제공합니다.\n부서와 업무 영역을 구분하지 않고 활용 가능한 통합 AI 환경을 지원합니다.' },
  { main: ['From Data to', 'Action. Instantly'], sub: '빠른 데이터 수집, 분석을 통해 데이터 활용 극대화를 실현합니다.\n정확하고 신속한 의사결정을 지원하는 AI 기반 분석 체계를 제공합니다.' },
  { main: ['Smarter Operations', 'Through Automation.'], sub: 'AI 자동화를 기반으로 업무 및 운용 효율성을 개선합니다.\n반복 업무를 최소화하고, 핵심 업무에 집중할 수 있는 환경을 제공합니다.' },
  { main: ['Secure AI,', 'Built for Enterprise.'], sub: '엔터프라이즈 환경에 적합한 보안 체계를 통해 안정성을 강화합니다.\n데이터 보호와 접근 통제를 기반으로 신뢰할 수 있는 AI 운영 환경을 지원합니다.' },
];

const ROTATE_INTERVAL_MS = 4800;
const TYPING_SPEED_MS = 65;

interface HeroContentProps {
  onSubmit?: (e: React.FormEvent, data: { prompt: string; platform: 'app' | 'web' }) => void;
  isAnalyzing?: boolean;
  align?: 'left' | 'center';
}

function useTypingEffect(text: string, speed: number) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    indexRef.current = 0;

    if (!text) return;

    const timer = setInterval(() => {
      indexRef.current++;
      if (indexRef.current >= text.length) {
        setDisplayed(text);
        setDone(true);
        clearInterval(timer);
      } else {
        setDisplayed(text.slice(0, indexRef.current));
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayed, done };
}

export default function HeroContent({ onSubmit, isAnalyzing = false, align = 'center' }: HeroContentProps) {
  const [index, setIndex] = useState(0);
  const slide = HERO_SLIDES[index];
  const fullTitle = `${slide.main[0]}\n${slide.main[1]}`;
  const { displayed, done } = useTypingEffect(fullTitle, TYPING_SPEED_MS);

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

  useEffect(() => {
    if (done) {
      startRotation();
    }
  }, [done, startRotation]);

  const lines = displayed.split('\n');

  const isLeft = align === 'left';

  return (
    <div className={`relative z-10 w-full max-w-6xl mx-auto px-6 py-20 md:py-24 min-h-[300px] flex flex-col ${isLeft ? 'items-center text-center md:items-start md:text-left' : 'items-center justify-center text-center'}`}>
      {/* 히어로 뱃지 - 타이틀 위 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`flex mb-6 ${isLeft ? 'justify-center md:justify-start' : 'justify-center'} w-full`}
      >
        <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 overflow-hidden">
          <motion.span
            className="relative font-normal text-[13px] tracking-[0.05em] font-pretendard bg-clip-text text-transparent bg-[length:200%_100%]"
            style={{
              backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.4) 100%)',
            }}
            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            kt ds Enterprise AI Platform
          </motion.span>
        </div>
      </motion.div>

      <div className="relative h-[220px] md:h-[260px] w-full flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 flex flex-col ${isLeft ? 'items-center text-center md:items-start md:text-left' : 'items-center justify-center text-center'}`}
          >
            <h1
              className={`text-[44px] md:text-5xl lg:text-[64px] font-[600] mb-4 md:mb-6 leading-[1.1] tracking-tight w-full max-w-5xl flex flex-col ${isLeft ? 'items-center md:items-start' : 'items-center'}`}
            >
              <span className={`block whitespace-nowrap ${isLeft ? 'text-center md:text-left' : 'text-center'}`}>
                <span className="bg-gradient-to-br from-brand-secondary via-white to-white bg-clip-text text-transparent">
                  {lines[0]}
                </span>
                {!done && lines.length === 1 && <span className="inline-block w-[3px] h-[0.85em] bg-brand-primary ml-1 align-middle animate-pulse" />}
              </span>
              <span className={`block whitespace-nowrap ${isLeft ? 'text-center md:text-left' : 'text-center'}`}>
                <span className="bg-gradient-to-br from-brand-secondary via-white to-white bg-clip-text text-transparent">
                  {lines[1] ?? ''}
                </span>
                {!done && lines.length === 2 && <span className="inline-block w-[3px] h-[0.85em] bg-brand-primary ml-1 align-middle animate-pulse" />}
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: done ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className={`text-[15px] md:text-[15px] lg:text-[16px] font-normal text-white/60 max-w-[85vw] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl w-full leading-relaxed whitespace-pre-line ${isLeft ? 'text-center md:text-left' : 'text-center'} px-1`}
            >
              {slide.sub}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={`flex gap-2.5 ${isLeft ? 'justify-center md:justify-start' : 'justify-center'} mt-8 mb-2`}>
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setIndex(i);
              startRotation();
            }}
            className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${i === index ? "bg-white" : "bg-white/20 hover:bg-white/40"
              }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0 }}
        className={`flex flex-row gap-3 ${isLeft ? 'justify-center md:justify-start' : 'justify-center'} mt-8 md:mt-12`}
      >
        <Button
          variant="premium"
          size="cta"
          rounded="xl"
          className="w-[110px] md:w-[130px] h-10 md:h-12 text-[15px] relative group transition-all duration-300"
          disabled={isAnalyzing}
        >
          <span className="group-hover:-translate-x-2 transition-transform duration-300">무료체험 신청</span>
          <ChevronRight size={16} className="absolute right-3 max-w-0 opacity-0 group-hover:max-w-[20px] group-hover:opacity-100 transition-all duration-300 overflow-hidden" />
        </Button>
        <Button
          variant="glass"
          size="cta"
          rounded="xl"
          className="w-[110px] md:w-[130px] h-10 md:h-12 text-[15px] relative group transition-all duration-300"
        >
          <span className="group-hover:-translate-x-2 transition-transform duration-300">솔루션 문의</span>
          <ChevronRight size={16} className="absolute right-3 max-w-0 opacity-0 group-hover:max-w-[20px] group-hover:opacity-100 transition-all duration-300 overflow-hidden" />
        </Button>
      </motion.div>


    </div>
  );
}
