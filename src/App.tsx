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
      <section id="hero" className="relative z-20 h-[calc(100vh-84px)] flex items-center justify-center overflow-clip font-poppins mx-3 mt-[68px] mb-3 rounded-[28px] bg-[#0A0A0A]">

        {/* Silk Motion Background */}
        <div className="absolute inset-0 z-0">
          <Silk
            speed={0.1}
            scale={0.6}
            color="#c8d8ff"
            noiseIntensity={3}
            rotation={4.8}
          />
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
        <section id="use-cases" className="py-16 md:py-24 relative" style={{ backgroundColor: '#0A0A0A' }}>
          <div className="max-w-[1280px] mx-auto container-responsive">
            {/* Header */}
            <div className="text-center mb-16 md:mb-24">
              <span className="text-body-sm text-[#999999] mb-3 block font-medium">고객 사례</span>
              <h1 className="text-heading-md md:text-display-sm lg:text-display-md font-bold text-white tracking-tight leading-tight font-poppins">
                Use Cases
              </h1>
            </div>

            {/* Testimonial Quote */}
            <div className="flex flex-col items-center text-center gap-5 mb-10 md:mb-14">
              <svg width="28" height="22" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30">
                <path d="M0 32V19.2C0 14.9333 1.06667 11.2 3.2 8C5.38667 4.74667 8.69333 2.13333 13.12 0.16L15.68 4C13.0133 5.28 11.04 6.82667 9.76 8.64C8.53333 10.4533 7.92 12.5333 7.92 14.88H15.68V32H0ZM24.32 32V19.2C24.32 14.9333 25.3867 11.2 27.52 8C29.7067 4.74667 33.0133 2.13333 37.44 0.16L40 4C37.3333 5.28 35.36 6.82667 34.08 8.64C32.8533 10.4533 32.24 12.5333 32.24 14.88H40V32H24.32Z" fill="white"/>
              </svg>
              <p className="text-[28px] font-normal italic text-white/70 leading-snug tracking-tight max-w-3xl" style={{ fontFamily: 'var(--font-nanum)' }}>
                질문만으로 원하는 데이터(문서, 통계)를 바로 찾고,<br />
                3개월 안에 업무에 적용한 AI 구축 사례
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-6 h-px bg-brand-primary/60" />
                <span className="text-[16px] text-brand-primary font-medium tracking-wide">한국기계산업진흥원</span>
                <div className="w-6 h-px bg-brand-primary/60" />
              </div>
            </div>

            {/* Image */}
            <div className="w-full mb-10 md:mb-14 rounded-[20px] overflow-hidden">
              <img src="/works.png" alt="Use Cases" loading="lazy" className="w-full h-auto object-cover" />
            </div>

            {/* Content: 좌측 타이틀+칩 / 우측 설명 */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-[120px]">
              <div className="md:w-1/3 flex flex-col gap-4">
                <h2 className="text-[32px] md:text-[40px] font-bold text-white leading-tight">
                  AI:ON-U · AI Works · SQL Agents
                </h2>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1.5 rounded-full bg-white/8 text-white text-[14px] font-medium">구축 기간 3개월</span>
                  <span className="px-2 py-1.5 rounded-full bg-white/8 text-white text-[14px] font-medium">데이터 접근성과 활용도 향상</span>
                </div>
              </div>
              <div className="md:w-2/3 flex flex-col gap-6">
                <p className="text-[#CCCCCC] text-[16px] leading-relaxed font-normal">
                  수많은 문서와 통계 데이터 속에서 원하는 정보를 찾기 어려운 환경에서,<br className="hidden md:block" />
                  Works AI와 SQL Agent를 통해 질문만으로 필요한 데이터를 바로 확인할 수 있는 환경 구축하였습니다.<br className="hidden md:block" />
                  AI:ON-U를 활용해 맞춤형 AI Agent를 빠르게 생성하여, 단기간 내 업무에 적용했습니다.<br /><br />
                  그 결과, 복잡한 데이터 탐색 과정 없이도 원하는 결과를 즉시 확인할 수 있게 되었고 약 3개월 내에 실제 업무에 활용 가능한 AI 기반 업무 환경을 구현했습니다.
                </p>
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
          </div>
        </section>

        {/* Why kt ds - 프로세스 섹션 */}
        <ProcessSection />

        {/* 고객사 로고 섹션 */}
        <section id="logos" className="relative pt-10 pb-3 overflow-hidden" style={{ backgroundColor: isDark ? '#0A0A0A' : '#F6F6F6' }}>
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
        <section id="faq" className="py-12 md:py-24 relative overflow-hidden" style={{ backgroundColor: isDark ? '#0A0A0A' : '#F6F6F6' }}>
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
                src="/meeting-bg.jpg"
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
