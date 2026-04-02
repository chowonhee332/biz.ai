/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
import { throttle, debounce } from './lib/utils';
import { HOME_USE_CASE, HOME_LOGOS, HOME_CTA, AGENT_CARDS, SOLUTION_CARDS } from './context/home/home-data';
import { useTheme } from './context/ThemeContext';
const HeroSpline = lazy(() => import('./components/HeroSpline'));
import Silk from './components/Silk';
import { motion, AnimatePresence, useScroll, useInView } from 'motion/react';
import { Button } from '@/components/ui/button';
import HeroContent from './components/HeroContent';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ChevronRight, ArrowUp, Quote } from 'lucide-react';
import SolutionCard from './components/SolutionCard';
import ProcessSection from './components/ProcessSection';
import FAQList from './components/FAQList';
import { useNavigate } from 'react-router-dom';

function UseCaseImageCarousel() {
  const [imgIdx, setImgIdx] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => {
      setImgIdx(i => (i + 1) % HOME_USE_CASE.images.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const goTo = (i: number) => {
    setImgIdx(i);
  };

  return (
    <div className="w-full mb-10 md:mb-16 relative">
      <div className="overflow-hidden rounded-[20px]">
        <motion.div
          className="flex gap-4"
          animate={{ x: `calc(-${imgIdx * 100}% - ${imgIdx * 16}px)` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {HOME_USE_CASE.images.map((src, i) => (
            <div key={i} className="aspect-[16/8] rounded-[20px] overflow-hidden shrink-0 w-full">
              <img src={src} alt={`slide-${i}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </motion.div>
      </div>
      <div className="flex justify-center gap-2 mt-5">
        {HOME_USE_CASE.images.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === imgIdx ? 'bg-white w-6' : 'bg-white/40 w-1.5'}`} />
        ))}
      </div>
    </div>
  );
}

const App = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
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
      <section ref={heroRef} id="hero" className="relative z-20 h-[calc(100vh-84px)] flex items-center justify-center overflow-clip font-poppins mx-3 mt-[68px] mb-4 rounded-[28px] bg-[#0A0A0A]">

        {/* Silk Motion Background - 뷰포트 진입 시만 렌더링 & 하드웨어 가속 강제 */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ transform: 'translateZ(0)', willChange: 'transform' }}
        >
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

        {/* 3D 렌더링 컨테이너 - 하드웨어 가속 강제 및 Interaction 제거로 스크롤 성능 대폭 개선 */}
        <div 
          className="absolute inset-0 z-[2] opacity-100 pointer-events-none"
          style={{ transform: 'translateZ(0)' }}
        >
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
        <div className="relative w-full">

          {/* AI Services 섹션 - 흰 배경으로 전체 감싸기 */}
          <div className="rounded-[28px] mx-3 mb-3 bg-white">

            {/* 타이틀 - 일반 플로우 */}
            <div className="text-center pt-16 pb-12 md:pt-32 md:pb-24 font-pretendard max-w-[1280px] mx-auto px-6 md:px-10">
              <span className="text-body-sm md:text-body text-[var(--color-fixed-text-dim)] mb-3 block font-medium">AI 서비스</span>
              <h1 className="text-heading-md md:text-display-sm lg:text-display-md font-bold tracking-tight leading-tight font-poppins text-[var(--color-fixed-text-primary)]">
                AI Services
              </h1>
            </div>

            {/* 카드 영역 - 4열 그리드 */}
            <div className="max-w-[1280px] mx-auto w-full pb-16 md:pb-32 px-6 md:px-10 flex flex-col gap-12 md:gap-20">
              <div className="flex flex-col gap-4">
                <h2 className="text-[var(--color-fixed-text-primary)] text-[18px] font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-fixed-text-primary)] inline-block" />
                  Agent
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {AGENT_CARDS.map((card, i) => (
                    <SolutionCard key={i} {...card} idx={i} hideNumber />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-[var(--color-fixed-text-primary)] text-[18px] font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-fixed-text-primary)] inline-block" />
                  Solution
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {SOLUTION_CARDS.map((card, i) => (
                    <SolutionCard key={i} {...card} idx={i} hideNumber />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Use Cases 섹션 */}
        <section id="use-cases" className="py-20 md:py-[160px] relative" style={{ backgroundColor: '#0A0A0A' }}>
          <div className="max-w-[1280px] mx-auto container-responsive">
            {/* Header */}
            <div className="text-center mb-0">
              <span className="text-body-sm text-text-hint mb-3 block font-medium">{HOME_USE_CASE.sectionLabel}</span>
              <h1 className="text-heading-md md:text-display-sm lg:text-display-md font-bold text-white tracking-tight leading-tight font-poppins">
                {HOME_USE_CASE.sectionTitle}
              </h1>
            </div>

            {/* 연결 라인 */}
            <div className="flex justify-center my-12">
              <div className="w-px h-16 bg-white/20" />
            </div>

            {/* Image + 텍스트: 최대 1000px */}
            <div className="max-w-[1200px] mx-auto">

            {/* 가운데 타이틀 */}
            <div className="text-center mb-[60px]">
              <Quote size={32} className="mx-auto mb-4 fill-white text-white" strokeWidth={0} />
              <h2 className="text-[24px] md:text-[36px] font-bold text-white leading-snug mb-4">
                {HOME_USE_CASE.quote.split('\n').map((line, i, arr) => (
                  <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
                ))}
              </h2>
              <span className="text-[16px] md:text-[18px] text-brand-primary font-medium">-{HOME_USE_CASE.company}</span>
            </div>

            {/* UI 이미지 롤링 */}
            <UseCaseImageCarousel />

            {/* 다이어그램(좌) + 설명(우) */}
            <div className="flex flex-col md:flex-row items-stretch gap-10 md:gap-[60px] mb-10 md:mb-16">
              {/* 좌측: 벤다이어그램 */}
              <div className="w-full md:w-1/2 shrink-0 relative">
                <svg width="auto" height={560} viewBox="0 0 500 560" style={{ display: 'block' }}>
                  <defs>
                    <linearGradient id="sweep3b" gradientUnits="userSpaceOnUse" x1="-150" y1="0" x2="150" y2="0">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                      <stop offset="50%" stopColor="#ffffff" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                      <animateTransform attributeName="gradientTransform" type="translate" from="-600 0" to="1100 0" dur="5s" repeatCount="indefinite" begin="0s" />
                    </linearGradient>
                    <marker id="arrow-cw" markerWidth="14" markerHeight="14" refX="0" refY="5" orient="auto">
                      <path d="M0,10 L0,5 L9,5" stroke="rgba(255,255,255,0.75)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6,2 L9,5 L6,8" stroke="rgba(255,255,255,0.75)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </marker>
                  </defs>
                  {/* 큰 외부 원 */}
                  <circle cx="250" cy="280" r="246" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 4" />
                  {/* 시계방향 회전 화살표 x3 */}
                  <g>
                    <animateTransform attributeName="transform" type="rotate" from="0 250 280" to="360 250 280" dur="50s" repeatCount="indefinite" />
                    <path d="M247,29 L252,34 L247,39" stroke="rgba(255,255,255,0.7)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    <g transform="rotate(120 250 280)">
                      <path d="M247,29 L252,34 L247,39" stroke="rgba(255,255,255,0.7)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <g transform="rotate(240 250 280)">
                      <path d="M247,29 L252,34 L247,39" stroke="rgba(255,255,255,0.7)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                  </g>
                  {/* 타이틀 (큰 원 안 상단) */}
                  <text x="250" y="90" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="22" fontWeight="700" fontFamily="Pretendard, sans-serif">활용 Agent</text>
                  {/* 상단 좌: AI:ON-U */}
                  <circle cx="142" cy="230" r="118" fill="rgba(10,10,10,0.7)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="142" cy="230" r="118" fill="none" stroke="url(#sweep3b)" strokeWidth="1" />
                  <text x="142" y="230" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="18" fontWeight="400" fontFamily="Poppins, sans-serif">{HOME_USE_CASE.venn.desktop[0]?.label}</text>
                  {/* 상단 우: SQL Agents */}
                  <circle cx="358" cy="230" r="118" fill="rgba(10,10,10,0.7)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="358" cy="230" r="118" fill="none" stroke="url(#sweep3b)" strokeWidth="1" />
                  <text x="358" y="230" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="18" fontWeight="400" fontFamily="Poppins, sans-serif">{HOME_USE_CASE.venn.desktop[2]?.label}</text>
                  {/* 하단 중앙: AI Works */}
                  <circle cx="250" cy="408" r="118" fill="rgba(10,10,10,0.7)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="250" cy="408" r="118" fill="none" stroke="url(#sweep3b)" strokeWidth="1" />
                  <text x="250" y="408" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="18" fontWeight="400" fontFamily="Poppins, sans-serif">{HOME_USE_CASE.venn.desktop[1]?.label}</text>
                </svg>
              </div>
              {/* 우측: 설명 */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-wrap gap-2">
                    {HOME_USE_CASE.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1.5 rounded-full bg-white/8 text-white text-[14px] font-medium">{tag}</span>
                    ))}
                  </div>
                  <p className="text-[#CCCCCC] text-[16px] leading-relaxed font-normal">
                    {HOME_USE_CASE.description[0]}
                    <br /><br />
                    {HOME_USE_CASE.description[1]}
                  </p>
                  <div className="rounded-[16px] border border-white/10 px-6 py-5 flex flex-col gap-3 mt-5">
                    {HOME_USE_CASE.bullets.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-[15px] leading-relaxed text-[#CCCCCC]">
                        <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-brand-primary" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 전체보기 버튼 */}
            <div className="flex justify-center mt-12">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/use-cases')}
                className="w-[130px] h-12 text-[16px] relative group transition-all duration-300 !bg-transparent !text-white !border-white/10 hover:!bg-white/10 !rounded-[12px]"
              >
                <span className="transition-transform duration-300 group-hover:-translate-x-2">전체보기</span>
                <ChevronRight size={16} className="absolute right-3 max-w-0 opacity-0 group-hover:max-w-[20px] group-hover:opacity-100 transition-all duration-300 overflow-hidden" />
              </Button>
            </div>

            </div>{/* max-w-[1200px] */}
          </div>
        </section>

        {/* Why kt ds - 프로세스 섹션 */}
        <ProcessSection />

        {/* 고객사 로고 섹션 */}
        <section id="logos" className="relative py-10 md:py-32 overflow-hidden bg-bg-section">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          <div className="relative z-10 w-full text-center">
            <div ref={logoRef} className="relative overflow-hidden w-full py-4">
              <motion.div
                className="flex items-center gap-x-6 md:gap-x-12 whitespace-nowrap"
                animate={isLogoInView ? { x: ["0%", "-50%"] } : { x: "0%" }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 60,
                  ease: "linear",
                  type: "tween"
                }}
              >
                {[...Array(2)].map((_, i) => (
                  <React.Fragment key={i}>
                    {HOME_LOGOS.map((brand, idx) => (
                      <div key={`${i}-${idx}`} className="flex items-center justify-center shrink-0 w-[120px] h-[56px] md:w-[180px] md:h-[80px]">
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          loading="lazy"
                          style={{ transform: `scale(${brand.scale})` }}
                          className={`max-h-[24px] max-w-[100px] md:max-h-[38px] md:max-w-[140px] w-auto h-auto object-contain opacity-100 transition-all duration-300 pointer-events-auto brightness-0 ${isDark ? 'invert' : ''}`}
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
        <section id="faq" className="py-12 md:py-32 relative overflow-hidden bg-bg-section">
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
          <section className="relative h-[320px] md:h-[500px] w-full overflow-hidden flex items-center justify-center bg-black">
            <div className="absolute inset-0 z-0">
              <img
                src={HOME_CTA.image}
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
                  {HOME_CTA.heading.split('\n').map((line, i, arr) => (
                    <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
                  ))}
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-[110px] md:w-[130px] h-10 md:h-12 text-[15px] mt-3 sm:mt-0 relative group transition-all duration-300 !bg-transparent !text-white !border-white/10 hover:!bg-white/10 !rounded-full"
                    onClick={() => window.location.href = HOME_CTA.buttonHref}
                  >
                    <span className="group-hover:-translate-x-2 transition-transform duration-300">{HOME_CTA.buttonLabel}</span>
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
