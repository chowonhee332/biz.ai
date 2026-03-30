/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
import { throttle, debounce } from './lib/utils';
import { AGENT_CARDS, SOLUTION_CARDS } from './context/home/home-cards';
import { useTheme } from './context/ThemeContext';
const HeroSpline = lazy(() => import('./components/HeroSpline'));
import Silk from './components/Silk';
import { motion, AnimatePresence, useScroll, useInView } from 'motion/react';
import { Button } from '@/components/ui/button';
import HeroContent from './components/HeroContent';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ChevronRight, ArrowUp } from 'lucide-react';
import SolutionCard from './components/SolutionCard';
import ProcessSection from './components/ProcessSection';
import FAQList from './components/FAQList';

const App = () => {
  const { isDark } = useTheme();
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 1024 : false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const isLogoInView = useInView(logoRef, { once: false, amount: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const isHeroInView = useInView(heroRef, { once: false, amount: 0 });

  useEffect(() => {
    const handleResize = debounce(() => {
      setIsMobile(window.innerWidth < 1024);
    }, 150);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setShowScrollTop(window.scrollY > 400);
    }, 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-text-primary font-sans transition-colors duration-500" style={{ backgroundColor: isDark ? '#0A0A0A' : '#FFFFFF' }}>
      {/* GNB - Global Navigation Bar */}
      <Navbar activePage="home" scrollLineProgress={scrollYProgress} />

      {/* Hero Section */}
      <section ref={heroRef} id="hero" className="relative z-20 h-[calc(100vh-84px)] flex items-center justify-center overflow-clip font-poppins mx-3 mt-[68px] mb-3 rounded-[28px] bg-[#0A0A0A]">

        {/* Silk Motion Background - 뷰포트 진입 시만 렌더링 */}
        <div className="absolute inset-0 z-0">
          {isHeroInView && <Silk
            speed={0}
            scale={0.6}
            color="#c8d8ff"
            noiseIntensity={3}
            rotation={4.8}
          />}
        </div>
        {/* Fade-out gradient overlay */}
        <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.6) 30%, rgba(10,10,10,1) 60%)' }} />

        <div className="absolute inset-0 z-[2]">
          <Suspense fallback={null}>
            <HeroSpline />
          </Suspense>
        </div>

        <div className="relative z-10 w-full max-w-[1280px] mx-auto container-responsive flex items-center h-full pointer-events-none -mt-[160px] md:mt-0">
          <div className="w-full h-full flex flex-col justify-center lg:flex-row lg:justify-center items-center relative">
            {/* Left Content */}
            <div className="w-full lg:max-w-[800px] relative z-20 pointer-events-auto">
              <HeroContent align="center" />
            </div>
          </div>
        </div>

      </section>

      {/* Main Content Area */}
      <div className="relative z-20" style={{ backgroundColor: isDark ? '#0A0A0A' : '#FFFFFF' }}>
        <div className="relative w-full pt-10">

          {/* AI Services 섹션 */}
          <div className="relative z-20 overflow-hidden mb-20 smooth-gpu rounded-[28px] mx-3 transition-colors duration-500 bg-white">
            <section id="solution" className="py-16 md:py-32">
              <div className="max-w-[1280px] mx-auto px-10 relative">
                <div className="text-left md:text-center mb-10 md:mb-20 font-pretendard flex flex-col items-start md:items-center relative z-10">
                  <span className="text-body-sm md:text-body text-[#999999] mb-3 block font-medium">AI 서비스</span>
                  <h1 className="text-heading-md md:text-display-sm lg:text-display-md font-bold mb-4 md:mb-6 tracking-tight leading-tight font-poppins text-black">
                    AI Services
                  </h1>
                </div>

                {/* 그룹 1: Agents */}
                <div className="mb-16 md:mb-32 max-w-[1280px] mx-auto">
                  <div className="flex items-center gap-2 mb-5 ml-4">
                    <span className="text-body font-normal text-gray-800">Agents</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {AGENT_CARDS.map((card, i) => (
                      <div key={i}>
                        <SolutionCard {...card} idx={i} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 그룹 2: Solutions */}
                <div className="mb-14 max-w-[1280px] mx-auto">
                  <div className="flex items-center gap-2 mb-5 ml-4">
                    <span className="text-body font-normal text-gray-800">Solutions</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {SOLUTION_CARDS.map((card, i) => (
                      <div key={i}>
                        <SolutionCard {...card} idx={i} />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>
          </div>
        </div>

        {/* Use Cases 섹션 */}
        <section id="use-cases" className="py-16 md:py-32 relative" style={{ backgroundColor: '#0A0A0A' }}>
          <div className="max-w-[1280px] mx-auto container-responsive">
            {/* Header */}
            <div className="text-center mb-16 md:mb-24">
              <span className="text-body-sm text-[#999999] mb-3 block font-medium">고객 사례</span>
              <h1 className="text-heading-md md:text-display-sm lg:text-display-md font-bold text-white tracking-tight leading-tight font-poppins">
                Use Cases
              </h1>
            </div>


            {/* Image + 텍스트: 최대 1000px */}
            <div className="max-w-[1000px] mx-auto">
            {/* Image */}
            <div className="w-full mb-10 md:mb-14 rounded-[20px] overflow-hidden">
              <img src="/images/works.png" alt="Use Cases" loading="lazy" className="w-full h-auto object-cover" />
            </div>

            {/* 좌측 타이틀 + 우측 설명 */}
            <div className="flex flex-col md:flex-row items-start gap-10 md:gap-[180px] mb-14 md:mb-40">
              {/* 좌측: 타이틀 */}
              <div className="md:w-2/5 flex flex-col gap-5">
                <span className="text-[16px] text-brand-primary font-medium">한국기계산업진흥원</span>
                <h2 className="text-[28px] md:text-[32px] font-bold text-white leading-snug">
                  질문만으로 원하는 데이터<br />
                  (문서, 통계)를 바로 찾고,<br />
                  3개월 안에 업무에 적용한<br />
                  AI 구축 사례
                </h2>
              </div>
              {/* 우측: 설명 */}
              <div className="md:w-3/5 flex flex-col gap-5 md:pt-[44px]">
                <p className="text-[#CCCCCC] text-[16px] leading-relaxed font-normal">
                  수많은 문서와 통계 데이터 속에서 원하는 정보를 찾기 어려운 환경에서,
                  Works AI와 SQL Agent를 통해 질문만으로 필요한 데이터를 바로 확인할 수 있는 환경 구축하였습니다.
                  AI:ON-U를 활용해 맞춤형 AI Agent를 빠르게 생성하여, 단기간 내 업무에 적용했습니다.<br /><br />
                  그 결과, 복잡한 데이터 탐색 과정 없이도 원하는 결과를 즉시 확인할 수 있게 되었고 약 3개월 내에 실제 업무에 활용 가능한 AI 기반 업무 환경을 구현했습니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1.5 rounded-full bg-white/8 text-white text-[14px] font-medium">구축 기간 3개월</span>
                  <span className="px-2 py-1.5 rounded-full bg-white/8 text-white text-[14px] font-medium">데이터 접근성과 활용도 향상</span>
                </div>
                <div className="rounded-[16px] border border-white/10 bg-white/5 px-6 py-5 flex flex-col gap-3">
                  {[
                    "자연어로 질문하면 관련 데이터와 결과를 바로 제공",
                    "문서, 통계, 데이터베이스를 한 번에 통합 검색",
                    "결과뿐만 아니라 출처 문서와 데이터 함께 제시",
                    "단순 조회가 아닌 실제 업무 흐름에 맞춘 Agent 제공",
                    "단계별 구축 없이도 단기간 내 적용 가능",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#CCCCCC]">
                      <span className="shrink-0 text-brand-primary font-bold w-6">{String(i + 1).padStart(2, '0')}</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Circle Diagram */}
            {(() => {
              const items = [
                { title: 'AI:ON-U', desc: '코딩 없이 간단한 설정만으로\n기업 맞춤형 AI Agent를\n빠르게 구축하고 운영', color: '#3b82f6', grad: 'linear-gradient(135deg, #60a5fa, #818cf8)', dur: '4s', dir: 'normal' as const },
                { title: 'AI Works', desc: '자연어로 질문하면\n문서와 통계 데이터를\n즉시 검색하고 처리', color: '#22d3ee', grad: 'linear-gradient(135deg, #22d3ee, #34d399)', dur: '7s', dir: 'reverse' as const },
                { title: 'SQL Agent', desc: '복잡한 쿼리 없이\n질문만으로 DB 결과를\n즉시 확인하고 활용', color: '#34d399', grad: 'linear-gradient(135deg, #34d399, #10b981)', dur: '5.5s', dir: 'normal' as const },
              ];
              return (
                <>
                  {/* Desktop - Venn Diagram (SVG) */}
                  <div className="hidden md:block w-full mb-10 md:mb-14" style={{ overflow: 'visible' }}>
                    <svg
                      width="100%"
                      viewBox="0 0 1080 360"
                      style={{ overflow: 'visible', display: 'block' }}
                    >
                      <defs>
                        {/* Static dim stroke gradient */}
                        <linearGradient id="staticStroke" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1080" y2="0">
                          <stop offset="0%" stopColor="white" stopOpacity="0.10" />
                          <stop offset="100%" stopColor="white" stopOpacity="0.10" />
                        </linearGradient>
                        {/* Animated sweep gradient */}
                        <linearGradient id="sweep" gradientUnits="userSpaceOnUse" x1="-150" y1="0" x2="150" y2="0">
                          <stop offset="0%" stopColor="white" stopOpacity="0" />
                          <stop offset="50%" stopColor="white" stopOpacity="0.85" />
                          <stop offset="100%" stopColor="white" stopOpacity="0" />
                          <animateTransform
                            attributeName="gradientTransform"
                            type="translate"
                            from="-800 0"
                            to="1880 0"
                            dur="5s"
                            repeatCount="indefinite"
                            begin="0s"
                          />
                        </linearGradient>
                      </defs>

                      {/* Full-width horizontal line (static + sweep) - drawn first */}
                      <line x1="-600" y1="180" x2="1680" y2="180" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                      <line x1="-600" y1="180" x2="1680" y2="180" stroke="url(#sweep)" strokeWidth="1" />

                      {/* Dark fill covers line inside circles - drawn after lines */}
                      {[180, 540, 900].map((cx, i) => (
                        <circle key={i} cx={cx} cy={180} r={179} fill="#0A0A0A" />
                      ))}

                      {/* Circle borders (static + sweep) - drawn on top of fill */}
                      {[180, 540, 900].map((cx, i) => (
                        <circle key={i} cx={cx} cy={180} r={179} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
                      ))}
                      {[180, 540, 900].map((cx, i) => (
                        <circle key={i} cx={cx} cy={180} r={179} fill="none" stroke="url(#sweep)" strokeWidth="1.5" />
                      ))}

                      {/* Labels */}
                      {items.map((item, i) => (
                        <text
                          key={i}
                          x={180 + i * 360}
                          y={188}
                          textAnchor="middle"
                          fill="white"
                          fontSize="22"
                          fontWeight="bold"
                          fontFamily="Pretendard, sans-serif"
                        >
                          {item.title}
                        </text>
                      ))}
                    </svg>
                  </div>

                  {/* Mobile */}
                  <div className="md:hidden flex flex-col gap-3 mb-10">
                    {items.map((item, i) => (
                      <div key={i} className="rounded-2xl p-6 border border-white/10" style={{ backgroundColor: '#111', borderColor: item.color + '40' }}>
                        <h3 className="text-[20px] font-bold mb-1 text-white">{item.title}</h3>
                        <p className="text-[13px] leading-relaxed text-white/40">{item.desc.replace(/\n/g, ' ')}</p>
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}

            </div>{/* max-w-[1000px] */}
          </div>
        </section>

        {/* Why kt ds - 프로세스 섹션 */}
        <ProcessSection />

        {/* 고객사 로고 섹션 */}
        <section id="logos" className="relative py-10 md:py-32 overflow-hidden" style={{ backgroundColor: isDark ? '#0A0A0A' : '#F6F6F6' }}>
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          <div className="relative z-10 w-full text-center">
            <div ref={logoRef} className="relative overflow-hidden w-full py-4">
              <motion.div
                className="flex items-center gap-x-12 whitespace-nowrap"
                animate={isLogoInView ? { x: ["0%", "-50%"] } : false}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 60,
                  ease: "linear"
                }}
              >
                {[...Array(2)].map((_, i) => (
                  <React.Fragment key={i}>
                    {[
                      { name: "KT", logo: "/logos/kt.png", scale: 1 },
                      { name: "경기도", logo: "/logos/gyeonggido.png", scale: 1 },
                      { name: "현대그린푸드", logo: "/logos/hwell.png", scale: 1.2 },
                      { name: "한국철도공사", logo: "/logos/kr.png", scale: 1.2 },
                      { name: "건국대학교 미래지식교육원", logo: "/logos/konmi.png", scale: 1.2 },
                      { name: "트루엔", logo: "/logos/true.png", scale: 1.2 }
                    ].map((brand, idx) => (
                      <div key={`${i}-${idx}`} className="flex items-center justify-center shrink-0 w-[180px] h-[80px]">
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          loading="lazy"
                          style={{ transform: `scale(${brand.scale})` }}
                          className={`max-h-[38px] max-w-[140px] w-auto h-auto object-contain opacity-100 transition-all duration-300 pointer-events-auto brightness-0 ${isDark ? 'invert' : ''}`}
                        />
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ 섹션 */}
        <section id="faq" className="py-12 md:py-32 relative overflow-hidden" style={{ backgroundColor: isDark ? '#0A0A0A' : '#F6F6F6' }}>
          <div className="max-w-[1280px] mx-auto container-responsive">
            <div className="flex flex-col lg:flex-row gap-10 md:gap-20">
              <div className="lg:w-1/3">
                <h1 className="text-heading-md md:text-display-sm lg:text-display-md font-bold mb-6 md:mb-8 tracking-tight leading-tight font-poppins text-text-primary">
                  FAQ
                </h1>
              </div>
              <div className="lg:w-2/3">
                <div className="space-y-4">
                  <FAQList />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 배너 */}
        <div className="w-full py-0">
          <section className="relative h-[500px] w-full overflow-hidden flex items-center justify-center bg-black">
            <div className="absolute inset-0 z-0">
              <img
                src="/images/meeting-bg.jpg"
                alt="회의"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70" />
            </div>
            <div className="relative z-10 w-full max-w-[1280px] mx-auto text-center font-pretendard px-6 py-20">
              <motion.div
                initial={isMobile ? false : { opacity: 0, scale: 0.95 }}
                whileInView={isMobile ? {} : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <h2 className="text-white text-heading-sm md:text-display-sm font-bold mb-6 md:mb-10 tracking-tighter leading-[1.2] drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                  Biz.AI와 함께<br />
                  AI 혁신을 지금 실행하세요.
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    variant="default"
                    size="lg"
                    className="w-[110px] md:w-[130px] h-10 md:h-12 text-[15px] relative group transition-all duration-300 !bg-brand-primary !text-white hover:!bg-brand-primary/90 !border-0 !rounded-full"
                  >
                    <span className="group-hover:-translate-x-2 transition-transform duration-300">무료체험 신청</span>
                    <ChevronRight size={18} className="absolute right-4 max-w-0 opacity-0 group-hover:max-w-[24px] group-hover:opacity-100 transition-all duration-300 overflow-hidden" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-[110px] md:w-[130px] h-10 md:h-12 text-[15px] mt-3 sm:mt-0 relative group transition-all duration-300 !bg-transparent !text-white !border-white/10 hover:!bg-white/10 !rounded-full"
                  >
                    <span className="group-hover:-translate-x-2 transition-transform duration-300">솔루션 문의</span>
                    <ChevronRight size={18} className="absolute right-4 max-w-0 opacity-0 group-hover:max-w-[24px] group-hover:opacity-100 transition-all duration-300 overflow-hidden" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </div>

        {/* Go to Top 버튼 */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-8 right-8 z-[100] w-11 h-11 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white flex items-center justify-center shadow-lg shadow-brand-primary/30 transition-colors cursor-pointer"
              aria-label="맨 위로 가기"
            >
              <ArrowUp size={20} strokeWidth={2.5} />
            </motion.button>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </div>
  );
};

export default App;
