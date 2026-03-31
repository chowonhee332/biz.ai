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
import { ChevronRight, ArrowUp, Quote } from 'lucide-react';
import SolutionCard from './components/SolutionCard';
import ProcessSection from './components/ProcessSection';
import FAQList from './components/FAQList';
import { useNavigate } from 'react-router-dom';

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
            <div className="text-center pt-32 pb-24 font-pretendard max-w-[1200px] mx-auto px-6">
              <span className="text-body-sm md:text-body text-[#999999] mb-3 block font-medium">AI 서비스</span>
              <h1 className="text-heading-md md:text-display-sm lg:text-display-md font-bold tracking-tight leading-tight font-poppins text-black">
                AI Services
              </h1>
            </div>

            {/* 카드 영역 - 4열 그리드 */}
            <div className="max-w-[1200px] mx-auto w-full pb-32 flex flex-col gap-20">
              <div className="flex flex-col gap-4">
                <h2 className="text-black text-[18px] font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
                  Agent
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {AGENT_CARDS.map((card, i) => (
                    <SolutionCard key={i} {...card} idx={i} hideNumber />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-black text-[18px] font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
                  Solution
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {SOLUTION_CARDS.map((card, i) => (
                    <SolutionCard key={i} {...card} idx={i} />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Use Cases 섹션 */}
        <section id="use-cases" className="py-[160px] relative" style={{ backgroundColor: '#0A0A0A' }}>
          <div className="max-w-[1280px] mx-auto container-responsive">
            {/* Header */}
            <div className="text-center mb-0">
              <span className="text-body-sm text-[#999999] mb-3 block font-medium">고객 사례</span>
              <h1 className="text-heading-md md:text-display-sm lg:text-display-md font-bold text-white tracking-tight leading-tight font-poppins">
                Use Cases
              </h1>
            </div>

            {/* 연결 라인 */}
            <div className="flex justify-center my-12">
              <div className="w-px h-16 bg-white/20" />
            </div>

            {/* Image + 텍스트: 최대 1000px */}
            <div className="max-w-[1200px] mx-auto">

            {/* 가운데 타이틀 */}
            <div className="text-center mb-12">
              <Quote size={32} className="mx-auto mb-4 fill-white text-white" strokeWidth={0} />
              <h2 className="text-[24px] md:text-[36px] font-bold text-white leading-snug mb-4">
                질문만으로 원하는 데이터(문서, 통계)를 바로 찾고,<br />
                3개월 안에 업무에 적용한 AI 구축 사례
              </h2>
              <span className="text-[16px] md:text-[18px] text-brand-primary font-medium">-한국기계산업진흥원</span>
            </div>

            {/* 연결 라인 */}
            <div className="hidden md:flex justify-center mb-12">
              <div className="w-px h-16 bg-white/20" />
            </div>

            {/* Venn Diagram - 데스크탑 (가로) */}
            <motion.div
              className="hidden md:block w-full max-w-[700px] mx-auto mb-[128px]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "200px" }}
            >
              <svg width="100%" viewBox="-60 0 820 750" style={{ display: 'block' }}>
                <defs>
                  <radialGradient id="rg1" gradientUnits="userSpaceOnUse" cx="350" cy="420" r="460">
                    <stop offset="0%" stopColor="#0073FF" stopOpacity="0.7" />
                    <stop offset="90%" stopColor="#0073FF" stopOpacity="0" />
                    <stop offset="100%" stopColor="#0073FF" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="rg2" gradientUnits="userSpaceOnUse" cx="350" cy="420" r="460">
                    <stop offset="0%" stopColor="#0073FF" stopOpacity="0.7" />
                    <stop offset="90%" stopColor="#0073FF" stopOpacity="0" />
                    <stop offset="100%" stopColor="#0073FF" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="rg3" gradientUnits="userSpaceOnUse" cx="350" cy="420" r="460">
                    <stop offset="0%" stopColor="#0073FF" stopOpacity="0.7" />
                    <stop offset="90%" stopColor="#0073FF" stopOpacity="0" />
                    <stop offset="100%" stopColor="#0073FF" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="sweep" gradientUnits="userSpaceOnUse" x1="-150" y1="0" x2="150" y2="0">
                    <stop offset="0%" stopColor="#7DD4FC" stopOpacity="0" />
                    <stop offset="50%" stopColor="#7DD4FC" stopOpacity="1" />
                    <stop offset="100%" stopColor="#7DD4FC" stopOpacity="0" />
                    <animateTransform attributeName="gradientTransform" type="translate" from="-800 0" to="1500 0" dur="5s" repeatCount="indefinite" begin="0s" />
                  </linearGradient>
                </defs>
                {/* 삼각형 대형: 상단 중앙, 하단 좌우 */}
                <circle cx="350" cy="210" r="210" fill="url(#rg1)" style={{ filter: 'blur(1px)' }} />
                <circle cx="170" cy="522" r="210" fill="url(#rg2)" style={{ filter: 'blur(1px)' }} />
                <circle cx="530" cy="522" r="210" fill="url(#rg3)" style={{ filter: 'blur(1px)' }} />
                {/* 스윕 모션만 */}
                <circle cx="350" cy="210" r="210" fill="none" stroke="url(#sweep)" strokeWidth="1.5" />
                <circle cx="170" cy="522" r="210" fill="none" stroke="url(#sweep)" strokeWidth="1.5" />
                <circle cx="530" cy="522" r="210" fill="none" stroke="url(#sweep)" strokeWidth="1.5" />
                {/* 텍스트 */}
                <text x="350" y="210" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="26" fontWeight="bold" fontFamily="Poppins, sans-serif">AI:ON-U</text>
                <text x="170" y="522" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="26" fontWeight="bold" fontFamily="Poppins, sans-serif">AI Works</text>
                <text x="530" y="522" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="26" fontWeight="bold" fontFamily="Poppins, sans-serif">SQL Agent</text>
              </svg>
            </motion.div>

            {/* Venn Diagram - 모바일 (삼각형) */}
            <div className="md:hidden w-full max-w-[320px] mx-auto mb-16">
              <svg width="100%" viewBox="-20 0 640 590" style={{ display: 'block' }}>
                <defs>
                  <radialGradient id="mrg1" gradientUnits="userSpaceOnUse" cx="300" cy="330" r="350">
                    <stop offset="0%" stopColor="#0073FF" stopOpacity="0.7" />
                    <stop offset="90%" stopColor="#0073FF" stopOpacity="0" />
                    <stop offset="100%" stopColor="#0073FF" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="mrg2" gradientUnits="userSpaceOnUse" cx="300" cy="330" r="350">
                    <stop offset="0%" stopColor="#0073FF" stopOpacity="0.7" />
                    <stop offset="90%" stopColor="#0073FF" stopOpacity="0" />
                    <stop offset="100%" stopColor="#0073FF" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="mrg3" gradientUnits="userSpaceOnUse" cx="300" cy="330" r="350">
                    <stop offset="0%" stopColor="#0073FF" stopOpacity="0.7" />
                    <stop offset="90%" stopColor="#0073FF" stopOpacity="0" />
                    <stop offset="100%" stopColor="#0073FF" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="sweep-mobile" gradientUnits="userSpaceOnUse" x1="-150" y1="0" x2="150" y2="0">
                    <stop offset="0%" stopColor="#7DD4FC" stopOpacity="0" />
                    <stop offset="50%" stopColor="#7DD4FC" stopOpacity="1" />
                    <stop offset="100%" stopColor="#7DD4FC" stopOpacity="0" />
                    <animateTransform attributeName="gradientTransform" type="translate" from="-600 0" to="1200 0" dur="5s" repeatCount="indefinite" begin="0s" />
                  </linearGradient>
                </defs>
                <circle cx="300" cy="150" r="149" fill="url(#mrg1)" />
                <circle cx="150" cy="410" r="149" fill="url(#mrg2)" />
                <circle cx="450" cy="410" r="149" fill="url(#mrg3)" />
                <circle cx="300" cy="150" r="149" fill="none" stroke="url(#sweep-mobile)" strokeWidth="1.5" />
                <circle cx="150" cy="410" r="149" fill="none" stroke="url(#sweep-mobile)" strokeWidth="1.5" />
                <circle cx="450" cy="410" r="149" fill="none" stroke="url(#sweep-mobile)" strokeWidth="1.5" />
                <text x="300" y="150" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="22" fontWeight="bold" fontFamily="Poppins, sans-serif">AI:ON-U</text>
                <text x="150" y="410" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="22" fontWeight="bold" fontFamily="Poppins, sans-serif">AI Works</text>
                <text x="450" y="410" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="22" fontWeight="bold" fontFamily="Poppins, sans-serif">SQL Agent</text>
              </svg>
            </div>

            {/* 이미지(좌) + 설명(우) */}
            <div className="flex flex-col md:flex-row items-stretch gap-10 md:gap-[60px] mb-10 md:mb-16">
              {/* 좌측: 이미지 */}
              <div className="w-full md:w-1/2 shrink-0 rounded-[20px] overflow-hidden">
                <img src="/images/img.png" alt="Use Cases" loading="lazy" className="w-full h-auto object-cover" />
              </div>
              {/* 우측: 설명 */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex flex-col gap-5">
                  <p className="text-[#CCCCCC] text-[16px] leading-relaxed font-normal">
                    수많은 문서와 통계 데이터 속에서 원하는 정보를 찾기 어려운 환경에서, Works AI와 SQL Agent를 통해 질문만으로 필요한 데이터를 바로 확인할 수 있는 환경 구축하였습니다. AI:ON-U를 활용해 맞춤형 AI Agent를 빠르게 생성하여, 단기간 내 업무에 적용했습니다.
                    <br /><br />
                    그 결과, 복잡한 데이터 탐색 과정 없이도 원하는 결과를 즉시 확인할 수 있게 되었고 약 3개월 내에 실제 업무에 활용 가능한 AI 기반 업무 환경을 구현했습니다.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1.5 rounded-full bg-white/8 text-white text-[14px] font-medium">#구축 기간 3개월</span>
                    <span className="px-2 py-1.5 rounded-full bg-white/8 text-white text-[14px] font-medium">#데이터 접근성과 활용도 향상</span>
                  </div>
                  <div className="rounded-[16px] border border-white/10 px-6 py-5 flex flex-col gap-3">
                    {[
                      "자연어로 질문하면 관련 데이터와 결과를 바로 제공",
                      "문서, 통계, 데이터베이스를 한 번에 통합 검색",
                      "결과뿐만 아니라 출처 문서와 데이터 함께 제시",
                      "단순 조회가 아닌 실제 업무 흐름에 맞춘 Agent 제공",
                      "단계별 구축 없이도 단기간 내 적용 가능",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-[15px] leading-relaxed text-[#CCCCCC]">
                        <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-brand-primary" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-start">
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
              </div>
            </div>

            </div>{/* max-w-[1200px] */}
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
                    variant="outline"
                    size="lg"
                    className="w-[110px] md:w-[130px] h-10 md:h-12 text-[15px] mt-3 sm:mt-0 relative group transition-all duration-300 !bg-transparent !text-white !border-white/10 hover:!bg-white/10 !rounded-full"
                    onClick={() => window.location.href = 'mailto:bizai@kt.com'}
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
