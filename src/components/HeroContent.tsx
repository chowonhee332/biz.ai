import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const HERO_SLIDES: { main: [string, string]; sub: string }[] = [
  { main: ['Run your business', 'with AI Agents.'], sub: 'Biz.AI는 기업을 대신해 일하는 AI Agent 플랫폼입니다.\n데이터 분석부터 의사결정, 업무 실행까지 하나의 AI 팀으로 연결합니다.' },
  { main: ['AI that works', 'for your business.'], sub: 'Biz.AI는 데이터를 이해하고 판단하며 실행하는\nEnterprise AI Agent 생태계를 제공합니다.' },
  { main: ['From data to', 'action. Instantly.'], sub: 'Biz.AI는 기업의 모든 데이터를 실행력으로 전환합니다.\n빠른 판단, 자동화된 업무, 확장 가능한 AI 체계를 구축합니다.' },
  { main: ['Build smarter', 'operations. Faster.'], sub: 'Biz.AI는 AI Agent 기반 자동화로\n조직의 의사결정과 업무 효율을 혁신합니다.' },
];

const ROTATE_INTERVAL_MS = 4800;
const TYPING_SPEED_MS = 65;

interface HeroContentProps {
  onSubmit?: (e: React.FormEvent, data: { prompt: string; platform: 'app' | 'web' }) => void;
  isAnalyzing?: boolean;
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

export default function HeroContent({ onSubmit, isAnalyzing = false }: HeroContentProps) {
  const [index, setIndex] = useState(0);
  const slide = HERO_SLIDES[index];
  const fullTitle = `${slide.main[0]}\n${slide.main[1]}`;
  const { displayed, done } = useTypingEffect(fullTitle, TYPING_SPEED_MS);

  const rotateTimer = useRef<ReturnType<typeof setInterval>>();
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

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto text-center px-6 py-32 md:py-40 min-h-[420px] flex flex-col items-center justify-center">
      <div className="relative h-[280px] md:h-[320px] w-full flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <h1
              className="text-3xl md:text-5xl lg:text-[72px] font-bold mb-6 leading-[1.1] tracking-tight w-full max-w-5xl px-2 flex flex-col items-center bg-gradient-to-r from-white via-white to-sky-400 bg-clip-text text-transparent"
            >
              <span className="block whitespace-nowrap text-center">{lines[0]}</span>
              <span className="block whitespace-nowrap text-center">
                {lines[1] ?? ''}
                {!done && <span className="inline-block w-[3px] h-[0.85em] bg-sky-400 ml-1 align-middle animate-pulse" />}
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: done ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-white/75 max-w-[85vw] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl w-full mx-auto leading-relaxed whitespace-pre-line text-center px-1"
            >
              {slide.sub}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
      >
        <Button
          className="group bg-white text-[#0a0a0f] hover:bg-white/90 w-[140px] h-[37px] py-0 text-[14px] font-semibold rounded-full transition-all flex items-center justify-center gap-0"
          disabled={isAnalyzing}
        >
          무료체험 신청
          <ChevronRight size={16} className="max-w-0 opacity-0 group-hover:max-w-[24px] group-hover:opacity-100 group-hover:ml-1 transition-all duration-300 overflow-hidden" />
        </Button>
        <Button
          className="group bg-white/10 text-white border-none hover:bg-white/20 w-[140px] h-[37px] py-0 text-[14px] font-semibold rounded-full transition-all flex items-center justify-center gap-0"
        >
          솔루션 문의
          <ChevronRight size={16} className="max-w-0 opacity-0 group-hover:max-w-[24px] group-hover:opacity-100 group-hover:ml-1 transition-all duration-300 overflow-hidden" />
        </Button>
      </motion.div>

      {/* 롤링 인디케이터 */}
      <div className="flex gap-2 mt-12">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="p-1 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label={`슬라이드 ${i + 1}로 이동`}
          >
            <span
              className={`block w-2 h-2 rounded-full transition-all duration-300 ${i === index ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'
                }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
