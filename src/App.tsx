/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useScroll, useTransform, useMotionTemplate, motion, useInView, AnimatePresence, animate, useAnimation, useMotionValueEvent } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ParticleEngine from './components/ParticleEngine';
import HeroContent from './components/HeroContent';
import {
  ArrowUp,
  Search,
  Zap,
  Target,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Code,
  Brain,
  Cpu,
  Rocket,
  Settings,
  Box,
  BookOpen,
  Globe,
  Youtube,
  Linkedin,
  Mail,
  Smartphone,
  Info,
  Menu,
  X,
  ExternalLink,
  Utensils,
  Monitor,
} from 'lucide-react';

// Sub-components (Moved to top for hoisting/scoping clarity)

const StudioCard = ({ icon, title, desc }: { icon: React.ReactElement; title: string; desc: string }) => (
  <Card className="p-10 rounded-3xl bg-[#111] border-white/5 hover:bg-[#1a1a1a] hover:border-white/20 transition-all duration-500 group flex flex-col items-center md:items-start text-center md:text-left shadow-2xl relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-blue-500/20 transition-colors duration-500" />
    <div className="size-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border border-white/10 relative z-10 text-white/80 group-hover:text-blue-400">
      {React.cloneElement(icon, { size: 32 })}
    </div>
    <h4 className="text-2xl font-bold text-white mb-4 relative z-10">{title}</h4>
    <p className="text-white/50 leading-relaxed font-medium relative z-10">{desc}</p>
  </Card>
);

const AnimatedCounter = ({ from, to }: { from: number; to: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: false, margin: "-100px" });

  useEffect(() => {
    if (!isInView || !nodeRef.current) return;

    const controls = animate(from, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate(value) {
        if (nodeRef.current) {
          nodeRef.current.textContent = Intl.NumberFormat("en-US").format(Math.floor(value));
        }
      }
    });

    return () => controls.stop();
  }, [isInView, from, to]);

  return <span ref={nodeRef}>{Intl.NumberFormat("en-US").format(from)}</span>;
};

const SolutionCard = ({ image, title, desc, tag }: { image: string; title: string; desc: string; tag: string }) => (
  <div className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col h-full border border-gray-100">
    <div className="aspect-[4/3] overflow-hidden bg-gray-50 relative p-4 flex items-center justify-center">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 rounded-2xl"
      />
    </div>
    <div className="p-8 flex flex-col flex-grow text-left">
      <h4 className="text-2xl font-bold text-gray-900 mb-3">{title}</h4>
      <p className="text-gray-500 text-[14px] leading-relaxed mb-6 font-medium break-keep">{desc}</p>
      <div className="mt-auto">
        <span className="text-blue-600 font-bold text-sm tracking-tight">{tag}</span>
      </div>
    </div>
  </div>
);

const InteractiveMockup = ({ image }: { image: string }) => {
  return (
    <div className="w-full flex items-center justify-center lg:justify-end relative group/frame shrink-0 bg-transparent">
      <img
        src={image}
        alt="Dashboard Content"
        className="w-full max-w-[800px] h-auto rounded-[12px] pointer-events-none block"
      />
    </div>
  );
};

const UseCaseVisual = ({ image, index, setActive }: { key?: React.Key; image: string; index: number; setActive: (idx: number) => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (isInView) setActive(index);
  }, [isInView, index, setActive]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 20,
        mass: 1
      }}
      className="w-full h-full"
    >
      <InteractiveMockup image={image} />
    </motion.div>
  );
};

const DomainAccordionItem = ({
  title,
  agents,
  image,
  isActive,
  onMouseEnter
}: {
  title: string;
  agents: string[];
  image: string;
  isActive: boolean;
  onMouseEnter: () => void
}) => {
  return (
    <motion.div
      layout
      onMouseEnter={onMouseEnter}
      className="relative h-[600px] overflow-hidden cursor-pointer rounded-2xl"
      style={{ willChange: 'flex, width' }}
      animate={{
        flex: isActive ? 3 : 0.5,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1
      }}
    >
      <div className="absolute inset-0">
        <motion.img
          src={image}
          alt={title}
          loading="eager"
          className="w-full h-full object-cover"
          animate={{
            filter: isActive ? 'grayscale(0) brightness(0.9) contrast(1.1)' : 'grayscale(1) brightness(0.5)',
            scale: isActive ? 1.05 : 1
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      <div className={`absolute inset-x-0 top-0 p-8 flex flex-col justify-start h-full ${isActive ? 'text-left' : 'text-center'}`}>
        <div className={`flex flex-col gap-4 ${isActive ? 'items-start' : 'items-center'}`}>
          <motion.div
            layout
            initial={false}
          >
            <h4 className={`text-white font-medium transition-colors duration-500 whitespace-nowrap ${isActive ? 'text-3xl mb-4' : 'text-xl'}`}>
              {title}
            </h4>
          </motion.div>

          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-2"
            >
              {agents.map((agent, i) => (
                <div key={i} className="flex items-center">
                  <span className="text-gray-100 text-[16px] font-medium">{agent}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Tag = ({ text }: { text: string }) => (
  <Badge variant="outline" className="border-blue-500 text-blue-500 rounded-full px-4 py-1.5 font-medium whitespace-nowrap">
    {text}
  </Badge>
);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [activeDomain, setActiveDomain] = useState<number>(0);
  const { scrollY, scrollYProgress } = useScroll();


  const contentRef = useRef<HTMLDivElement>(null);
  const contentControls = useAnimation();
  const contentInView = useInView(contentRef, { once: false, margin: "0px 0px -20% 0px" });

  // 프로세스 섹션용 clip-path 애니메이션
  const processRef = useRef<HTMLDivElement>(null);
  const processControls = useAnimation();
  const processInView = useInView(processRef, { once: false, margin: "0px 0px -20% 0px" });

  useEffect(() => {
    if (contentInView) {
      contentControls.start({
        clipPath: "inset(0% 1% round 28px)",
        transition: { duration: 0.8, ease: "easeOut" }
      });
    } else {
      contentControls.start({
        clipPath: "inset(15% 15% round 60px)",
        transition: { duration: 0.8, ease: "easeOut" }
      });
    }
  }, [contentInView, contentControls]);

  useEffect(() => {
    if (processInView) {
      processControls.start({
        clipPath: "inset(0% 1% round 28px)",
        transition: { duration: 0.8, ease: "easeOut" }
      });
    } else {
      processControls.start({
        clipPath: "inset(15% 15% round 60px)",
        transition: { duration: 0.8, ease: "easeOut" }
      });
    }
  }, [processInView, processControls]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const [activeUseCase, setActiveUseCase] = useState(0);
  const useCaseItems = [
    {
      id: "works-ai",
      titlePrefix: "AI Portal",
      titleSuffix: "Works AI",
      desc: "AI 챗봇 기반으로 다양한 업무 처리를 지원하는 AI Agent 포털 서비스로\n기업 전체 AI 서비스를 통합 관리하고 접근할 수 있는 중앙 플랫폼입니다.",
      tags: ["AI 비서+그룹웨어", "맞춤형"],
      themeColor: "blue",
      features: [
        "기본적인 업무 기반에 최적화된 AI Agent 제공",
        "업무에 필요한 에이전트를 직접 만들어 사내 공유/ 활용",
        "그룹웨어 위젯 및 메뉴 커스텀을 통해 개인 맞춤형 컨텐츠 제공"
      ],
      icon: <Utensils className="w-8 h-8" />,
      image: "/test.png"
    },
    {
      id: "audit-agent",
      titlePrefix: "Audit Agent",
      desc: "방대한 기업 규제 및 감사 문서를 AI가 신속히 분석하여, 법적 리스크를 사전에 파악하고 완벽한 컴플라이언스 대응을 지원합니다.",
      tags: ["자료검색", "감사/리스크"],
      themeColor: "sky",
      features: [
        "사내 규정 및 가이드라인 기반의 AI 감사 수행",
        "키워드/의미 기반의 빠른 법령 및 판례 검색",
        "감사 보고서 자동 초안 작성 및 리스크 등급 분류"
      ],
      icon: <Search className="w-8 h-8" />,
      image: "/test.png"
    },
    {
      id: "meeting-agent",
      titlePrefix: "지능형 회의록 Agent",
      desc: "음성 인식(STT)과 NLP를 결합하여 회의 중 나오는 화자를 구분하고, 자동으로 액션 아이템을 추출합니다.",
      tags: ["음성인식", "업무추출"],
      themeColor: "emerald",
      features: [
        "실시간 음성 인식 및 화자 분리 기록",
        "회의 내용 자동 요약 및 주요 의사결정 사항 추출",
        "참석자 대상 회의록 자동 메일/메신저 발송 연동"
      ],
      icon: <Monitor className="w-8 h-8" />,
      image: "/test.png"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* GNB - Global Navigation Bar */}
      <nav
        className="fixed w-full z-50 bg-black/80 backdrop-blur-xl py-4 px-6 md:px-10 border-b border-white/5"
      >
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0">
            <img src="/bizai_logo.png" alt="Biz.AI Logo" className="h-7 w-auto" />
            <span className="text-xl font-bold text-white tracking-tight hidden sm:inline">Biz.AI</span>
          </a>

          {/* Center Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 text-white/90 text-[14px] font-medium">
            <a href="#solution" className="hover:text-white transition-colors">AI Agent 제품군</a>
            <a href="#domain" className="hover:text-white transition-colors">AI 솔루션</a>
            <a href="#use-cases" className="hover:text-white transition-colors">고객 사례</a>
            <a href="#about" className="hover:text-white transition-colors">회사 소개</a>
          </div>

          {/* Right: CTA Buttons */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden md:flex text-white/90 hover:text-white hover:bg-white/10">
              kt ds <ExternalLink size={14} />
            </Button>
            <Button size="sm" className="hidden md:flex bg-white text-black hover:bg-white/90 px-4 py-2 rounded-md font-semibold font-pretendard">
              AI Agent 스튜디오 <ExternalLink size={14} />
            </Button>
            <button className="lg:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="메뉴">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden absolute top-full left-0 right-0 bg-black/80 backdrop-blur-xl py-4 px-6 overflow-hidden border-b border-white/10"
            >
              <div className="flex flex-col gap-4">
                <a href="#solution" className="text-white/90 hover:text-white font-medium py-1" onClick={() => setIsMenuOpen(false)}>AI Agent 제품군</a>
                <a href="#domain" className="text-white/90 hover:text-white font-medium py-1" onClick={() => setIsMenuOpen(false)}>AI 솔루션</a>
                <a href="#use-cases" className="text-white/90 hover:text-white font-medium py-1" onClick={() => setIsMenuOpen(false)}>고객 사례</a>
                <a href="#about" className="text-white/90 hover:text-white font-medium py-1" onClick={() => setIsMenuOpen(false)}>회사 소개</a>
                <div className="pt-2 mt-2 border-t border-white/10 flex flex-col gap-2">
                  <Button variant="ghost" size="sm" className="text-white/90 hover:text-white justify-start">
                    kt ds <ExternalLink size={14} />
                  </Button>
                  <Button size="sm" className="bg-white text-black hover:bg-white/90 w-full justify-center font-semibold">
                    AI Agent 스튜디오 <ExternalLink size={14} />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative z-20 h-screen flex items-center justify-center overflow-clip bg-black">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <ParticleEngine scrollYProgress={scrollYProgress} />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[800px] bg-[radial-gradient(circle_at_50%_100%,rgba(37,99,235,0.2)_0%,transparent_70%)] pointer-events-none z-0" />
        <div className="relative z-10 flex items-center justify-center w-full">
          <HeroContent />
        </div>

        {/* 스크롤 다운 인디케이터 */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          onClick={() => document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={28} className="text-white/60" strokeWidth={1.5} />
            <ChevronDown size={28} className="text-white/30 -mt-4" strokeWidth={1.5} />
          </motion.div>
          <span className="text-white/40 text-sm font-medium tracking-wider">Scroll down</span>
        </motion.div>
      </section>

      {/* Main Content Area */}
      <div className="relative z-20 bg-black">
        <div ref={contentRef} className="relative w-full pt-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[800px] bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.2)_0%,transparent_70%)] pointer-events-none z-10" />

          <motion.div
            className="bg-white relative z-20 origin-bottom overflow-hidden"
            animate={contentControls}
          >
            <section id="solution" className="py-20 px-6">
              <div className="max-w-[1240px] mx-auto">
                <div className="text-center mb-14">
                  <h2 className="text-[52px] font-black bg-gradient-to-r from-black to-slate-300 bg-clip-text text-transparent mb-4 tracking-tight leading-tight" style={{ fontFamily: '"Pretendard Variable", Pretendard, sans-serif' }}>
                    kt ds의 AI 솔루션
                  </h2>
                  <p className="text-gray-500 text-[15px] max-w-2xl mx-auto font-medium">
                    기업의 AI 도입부터 클라우드 인프라 관리까지 전 과정을 표준화하고 안정적으로 지원합니다
                  </p>
                </div>

                <div className="mb-14">
                  <h3 className="text-[18px] font-bold bg-gradient-to-r from-black to-slate-400 bg-clip-text text-transparent mb-6 text-left">
                    전사 공통 (General Business)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[
                      {
                        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600",
                        title: "AI:ON-U",
                        desc: "엔터프라이즈 맞춤형 AI Agent를 빠르게 구축하는 No-Code 기반 Agent Builder",
                        tag: "#3분 완성 Agent"
                      },
                      {
                        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
                        title: "Works AI",
                        desc: "AI Agent 기반으로 다양한 업무처리를 지원하는 사내 AI Agent Portal",
                        tag: "#업무 자동화"
                      },
                      {
                        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
                        title: "D-Ant",
                        desc: "데이터 분석부터 예측까지, 데이터 기반의 현명한 의사결정을 돕는 분석 솔루션",
                        tag: "#데이터 사이언스"
                      }
                    ].map((card, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                      >
                        <SolutionCard {...card} />
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[18px] font-bold bg-gradient-to-r from-black to-slate-400 bg-clip-text text-transparent mb-6 text-left">
                    IT 서비스/개발 직군 (IT Service & Dev)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <SolutionCard
                      image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600"
                      title="CloudWiz"
                      desc="클라우드 운영 효율화와 자동화를 지원하는 관리 서비스"
                      tag="지원하는 관리 서비스"
                    />
                    <SolutionCard
                      image="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600"
                      title="Beast AI Gateway"
                      desc="엔터프라이즈용 AI 기술, API를 통합 관리하는 서비스"
                      tag="통합 관리하는 서비스"
                    />
                    <SolutionCard
                      image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600"
                      title="CodeBox"
                      desc="폐쇄형 설치형 AI 코드 개발 어플라이언스"
                      tag="어플라이언스"
                    />
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        </div>

        <section id="domain" className="py-32 px-6 relative overflow-hidden bg-black pb-16">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-left mb-16">
              <h2 className="text-[52px] font-black text-white mb-4 tracking-tight" style={{ fontFamily: '"Pretendard Variable", Pretendard, sans-serif' }}>도메인별<br />Multi Agent</h2>
              <p className="text-gray-400 text-sm font-medium">공공/금융 등 도메인별로 KTDS의 Multi-Agent를 활용해 보세요.</p>
            </div>

            <div className="flex gap-2 w-full">
              <DomainAccordionItem
                title="금융"
                agents={['Audit Agent', 'SQL Agent', 'RFP Agent']}
                image="https://images.unsplash.com/photo-1643258367012-1e1a983489e5?auto=format&fit=crop&q=80&w=1200"
                isActive={activeDomain === 0}
                onMouseEnter={() => setActiveDomain(0)}
              />
              <DomainAccordionItem
                title="공공기관"
                agents={['Audit Agent', 'RFP Agent', 'SQL Agent']}
                image="https://images.unsplash.com/photo-1665865298238-ec7a85eb3f9a?auto=format&fit=crop&q=80&w=1200"
                isActive={activeDomain === 1}
                onMouseEnter={() => setActiveDomain(1)}
              />
              <DomainAccordionItem
                title="일반기업"
                agents={['SQL Agent', 'RFP Agent', 'Codebox', 'beast AI Gateway']}
                image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                isActive={activeDomain === 2}
                onMouseEnter={() => setActiveDomain(2)}
              />
              <DomainAccordionItem
                title="미디어"
                agents={['SQL Agent', 'TA Agent']}
                image="https://images.unsplash.com/photo-1652166553819-f892e61fc12c?auto=format&fit=crop&q=80&w=1200"
                isActive={activeDomain === 3}
                onMouseEnter={() => setActiveDomain(3)}
              />
              <DomainAccordionItem
                title="통신/네트워크"
                agents={['SQL Agent', 'beast AI Gateway', 'Codebox']}
                image="https://images.unsplash.com/photo-1680992044138-ce4864c2b962?auto=format&fit=crop&q=80&w=1200"
                isActive={activeDomain === 4}
                onMouseEnter={() => setActiveDomain(4)}
              />
            </div>
          </div>
        </section>

        <section id="use-cases" className="py-32 bg-black relative">
          <div className="max-w-[1200px] mx-auto w-full min-h-[150vh] relative flex flex-col items-start">
            <div className="w-full mb-4 pt-[40px]">
              <h2 className="text-[56px] font-black bg-gradient-to-r from-white to-[#ABBBE7] bg-clip-text text-transparent tracking-tight leading-tight">
                Solution, <br />
                Multi Agent <br />
                Use Cases
              </h2>
            </div>

            <div className="w-full flex flex-col lg:flex-row items-start relative gap-0">
              <div className="w-full lg:w-1/2 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-start pt-[60px] z-20 pr-12 lg:pr-16">
                <div className="flex flex-col">
                  {useCaseItems.map((item, index) => {
                    const isActive = index === activeUseCase;
                    return (
                      <div key={item.id} className="group py-[23px] border-b border-white/10">
                        <h3
                          className={`text-[28px] tracking-tight transition-all duration-500 cursor-pointer flex items-center gap-4 ${isActive ? 'text-white' : 'text-white/30 hover:text-white/50'}`}
                          onClick={() => setActiveUseCase(index)}
                        >
                          <span className="font-bold">{item.titlePrefix}</span>
                          {item.titleSuffix && <span className="font-light">{item.titleSuffix}</span>}
                        </h3>

                        <AnimatePresence mode="wait">
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="mt-2.5">
                                <motion.p
                                  initial={{ y: 10, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  transition={{ duration: 0.3 }}
                                  className="text-[16px] text-white/70 leading-relaxed max-w-lg mb-6 whitespace-pre-line"
                                >
                                  {item.desc}
                                </motion.p>

                                {item.tags && (
                                  <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex flex-wrap gap-2 mb-8"
                                  >
                                    {item.tags.map((tag: string, i: number) => {
                                      const colorClass = item.themeColor === 'blue' ? 'text-blue-400 bg-blue-400/10' :
                                        item.themeColor === 'sky' ? 'text-sky-400 bg-sky-400/10' :
                                          'text-emerald-400 bg-emerald-400/10';
                                      return (
                                        <span key={i} className={`px-4 py-1.5 rounded-full text-[14px] font-medium ${colorClass}`}>
                                          {tag}
                                        </span>
                                      );
                                    })}
                                  </motion.div>
                                )}

                                {item.features && (
                                  <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="border border-white/10 rounded-[16px] p-6 mb-4"
                                  >
                                    <ul className="space-y-3">
                                      {item.features.map((feature: string, i: number) => (
                                        <motion.li
                                          key={i}
                                          initial={{ x: -10, opacity: 0 }}
                                          animate={{ x: 0, opacity: 1 }}
                                          transition={{ delay: 0.4 + i * 0.1 }}
                                          className="flex items-start gap-3 text-white/90 text-[16px] leading-snug font-light"
                                        >
                                          <div className="w-1 h-1 rounded-full bg-white/50 mt-2.5 shrink-0" />
                                          <span>{feature}</span>
                                        </motion.li>
                                      ))}
                                    </ul>
                                  </motion.div>
                                )}

                                <motion.a
                                  href="#"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.6 }}
                                  className="text-white/80 text-[15px] font-normal hover:text-white transition-colors flex items-center gap-1 mt-4"
                                >
                                  더보기 &gt;
                                </motion.a>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="w-full lg:w-1/2 flex flex-col gap-[70vh] pb-[50vh] pt-[140px] items-center lg:items-end overflow-visible">
                {useCaseItems.map((item, index) => (
                  <UseCaseVisual key={index} image={item.image} index={index} setActive={setActiveUseCase} />
                ))}
              </div>
            </div>

            <div className="w-full flex justify-center -mt-16 relative z-30">
              <Button
                className="h-12 w-[240px] text-[16px] font-normal bg-white/5 backdrop-blur-md text-white hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 group flex items-center justify-center relative overflow-hidden"
              >
                <span className="transition-transform duration-300 group-hover:-translate-x-2">
                  AI Agent / Solution 더보기
                </span>
                <ArrowUp
                  size={16}
                  className="absolute right-8 opacity-0 group-hover:opacity-100 group-hover:right-6 transition-all duration-300 rotate-45"
                />
              </Button>
            </div>
          </div>
        </section>

        <div ref={processRef} className="relative w-full pt-10">
          <motion.div
            className="bg-[#f0f2f7] relative z-20 origin-bottom overflow-hidden"
            initial={{ clipPath: "inset(15% 15% round 60px)" }}
            animate={processControls}
          >
            <section id="process" className="py-32 px-6 relative overflow-hidden">
              <div className="max-w-[1200px] mx-auto relative z-10">
                <div className="text-center mb-24">
                  <h2 className="text-[52px] font-black bg-gradient-to-r from-black to-slate-300 bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
                    왜 KT DS와 함께 해야 할까요?
                  </h2>
                  <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                    기업의 복잡한 요구사항을 분석부터 안정화까지,<br className="hidden md:block" />
                    표준화된 프로세스로 완벽하게 해결합니다.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { num: "01", title: "분석/설계", subtitle: "Retriever,\nAnalyst", desc: "데이터 협의체를 통해 데이터 분석 및 선별 이를 기반으로 RAG 및 Agent 구현에 최적화된 체계 구축\n원인 분석, 옵션 비교, 리스크/영향 평가, 계획 수립", color: "text-red-500" },
                    { num: "02", title: "개발/구현", subtitle: "Writer,\nExecutor", desc: "Enterprise 맞춤형 워크플로우 생성 및 RAG 엔진 기반 지식 증강 최적화\n원인 분석, 옵션 비교, 리스크/영향 평가, 계획 수립", color: "text-red-500" },
                    { num: "03", title: "검증/테스트", subtitle: "Validator,\nQuality", desc: "답변 정확도 및 안정성 검증을 위한 자동화 테스트와 멀티 레벨 QA 수행\n원인 분석, 옵션 비교, 리스크/영향 평가, 계획 수립", color: "text-red-500" },
                    { num: "04", title: "운영/안정화", subtitle: "Maintainer,\nSRE", desc: "실시간 모니터링 및 성능 최적화를 통해 멈춤 없는 엔터프라이즈 AI 환경 제공\n원인 분석, 옵션 비교, 리스크/영향 평가, 계획 수립", color: "text-red-500" }
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 60, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                      viewport={{ once: false, margin: "-50px" }}
                      className="bg-white rounded-[20px] p-10 hover:shadow-lg transition-all duration-500 group flex flex-col min-h-[420px]"
                    >
                      {/* 상단: 번호 + 영문 타이틀 (고정 높이로 하단 정렬 맞춤) */}
                      <div className="min-h-[130px]">
                        <span className={`${step.color} text-lg font-black mb-4 block`}>{step.num}</span>
                        <h3 className="text-[32px] font-black text-gray-900 leading-tight whitespace-pre-line">{step.subtitle}</h3>
                      </div>

                      {/* 여백 */}
                      <div className="flex-1" />

                      {/* 하단: 한글 타이틀 + 설명 (고정 높이로 라인 통일) */}
                      <div className="min-h-[160px]">
                        <h4 className="text-[18px] font-medium text-gray-900 mb-3">{step.title}</h4>
                        <p className="text-gray-400 text-[14px] leading-[1.8] whitespace-pre-line">
                          {step.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>


          </motion.div>
        </div>

        <section id="stats" className="py-32 px-6 bg-black">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
              {[
                { label: "Clients", value: 150, suffix: "+", sub: "금융·공공·유통·미디어 등 다양한 산업 고객" },
                { label: "Solution", value: 18, suffix: "", sub: "AX를 리딩하는 자체 개발 솔루션" },
                { label: "AI Agent", value: 600, suffix: "+", sub: "도메인별 특화 AI 에이전트" },
                { label: "IT Engineers", value: 1700, suffix: "+", sub: "Cloud & AI 기술을 선도하는 전문 인력" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-start group">
                  <div className="text-[72px] font-bold text-white tracking-tighter leading-none mb-4">
                    <AnimatedCounter from={0} to={stat.value} />
                    <span className="text-white">{stat.suffix}</span>
                  </div>
                  <span className="text-white text-[18px] font-bold mb-2">{stat.label}</span>
                  <p className="text-white/40 text-[13px] leading-relaxed">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="logos" className="py-24 bg-black relative overflow-hidden border-y border-white/5 flex items-center">
          <div className="flex overflow-hidden relative group">
            <motion.div
              className="flex items-center gap-24 py-4 px-12 shrink-0"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 40,
                ease: "linear",
                repeat: Infinity
              }}
            >
              {[
                { name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
                { name: "AWS", url: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
                { name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
                { name: "Nvidia", url: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg" },
                { name: "OpenAI", url: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
                { name: "Meta", url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
                { name: "kt ds", url: "https://www.ktds.com/images/common/logo.png" },
                { name: "Samsung", url: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" }
              ].concat([
                { name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
                { name: "AWS", url: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
                { name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
                { name: "Nvidia", url: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg" },
                { name: "OpenAI", url: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
                { name: "Meta", url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
                { name: "kt ds", url: "https://www.ktds.com/images/common/logo.png" },
                { name: "Samsung", url: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" }
              ]).map((logo, i) => (
                <div key={i} className="flex items-center justify-center h-8 w-auto px-4 group/logo">
                  <img
                    src={logo.url}
                    alt={logo.name}
                    className="h-full object-contain filter brightness-0 invert opacity-40 group-hover/logo:opacity-100 transition-all duration-500"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="testimonials" className="py-24 px-6 bg-black relative">
          <div className="max-w-[1240px] mx-auto relative group">
            <div className="relative h-[600px] overflow-hidden">
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {[
                  { user: "Conor", handle: "@cnrstvns", quote: "KT DS의 AI 포털은 우리가 사용해 본 최고의 솔루션 중 하나입니다. 단 15분 만에 업무 환경에 완전히 녹아들었습니다. 놀랍네요! 인프라 구축부터 데브옵스 환경까지 한번에 해결되어 만족도가 매우 높습니다.", avatar: "https://i.pravatar.cc/150?u=a1" },
                  { user: "경기도청", handle: "@gg_korea", quote: "방대한 공공데이터를 체계화하고 통합 개방 플랫폼을 완벽하게 구축하여, 도민들의 데이터 접근성을 혁신적으로 끌어올리는 데 성공했습니다. 데이터 기반 행정의 새로운 표준을 제시했다는 평가를 받고 있습니다.", avatar: "https://i.pravatar.cc/150?u=a2" },
                  { user: "한기산", handle: "@kamea_org", quote: "정책 의사결정과 실무자의 분석, 예측 업무를 지원하는 정책 지원형 AI 서비스 구축으로 업무 생산성 타파에 압도적인 도움이 되었습니다.", avatar: "https://i.pravatar.cc/150?u=a3" },
                  { user: "John", handle: "@johncjago", quote: "원인 분석부터 리스크 평가까지 설계의 빈틈을 완벽히 메워주는 모습이 인상적이었습니다. UI/UX 역시 사용성 면에서 훌륭합니다. 단순한 툴을 넘어 파트너 같은 느낌을 받았습니다.", avatar: "https://i.pravatar.cc/150?u=a4" },
                  { user: "Darren Pinder", handle: "@dmpinder", quote: "놀라울 정도로 효율적입니다! 이제 모든 엔터프라이즈 업무를 AI가 미리 감지하고 알림을 보내주어 위험 대응이 가능해졌습니다. 😍", avatar: "https://i.pravatar.cc/150?u=a5" },
                  { user: "금융권 A사", handle: "@bank_a", quote: "RAG 엔진 기반 지식 증강 최적화 덕분에 고객 응대 효율이 200% 이상 향상되었습니다. 보안이 중요한 금융권 환경에서도 안정적인 성능을 보여주어 신뢰가 갑니다.", avatar: "https://i.pravatar.cc/150?u=a6" },
                  { user: "Samsung Electrics", handle: "@samsung_ai", quote: "복잡한 반도체 공정 데이터를 실시간으로 분석하여 수율 예측 정확도를 획기적으로 높였습니다. Biz.AI의 커스터마이징 능력에 놀랐습니다.", avatar: "https://i.pravatar.cc/150?u=a7" },
                  { user: "Quentin", handle: "@q_dev", quote: "I tested Biz.AI for our enterprise cloud! So much easier to configure and the interface is better than any other options. The integration with Slack notifications is a game changer.", avatar: "https://i.pravatar.cc/150?u=a8" },
                  { user: "NeverLand", handle: "@neverlandoff", quote: "Perfect support, answered my dms in a couple of minutes, and it's the first actual cool looking status page which allows custom domains.", avatar: "https://i.pravatar.cc/150?u=a9" },
                ].map((post, i) => (
                  <div key={i} className="break-inside-avoid bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[24px] p-8 hover:border-white/20 transition-all duration-300 group/card">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <img src={post.avatar} className="w-10 h-10 rounded-full border border-white/10" alt="" />
                        <div>
                          <div className="text-white font-bold text-[15px]">{post.user}</div>
                          <div className="text-white/30 text-[13px]">{post.handle}</div>
                        </div>
                      </div>
                      <div className="text-blue-500/30 group-hover/card:text-blue-500/60 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-white/80 text-[15px] leading-[1.6] font-light">{post.quote}</p>
                  </div>
                ))}
              </div>

              {/* 바닥 그라데이션 페이드 아웃 */}
              <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />
            </div>
          </div>
        </section>

        {/* 새로운 소식 섹션 */}
        <section id="news" className="py-32 px-6 bg-black relative">
          <div className="max-w-[1200px] mx-auto">
            {/* 헤더: 타이틀 + 버튼 */}
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-[40px] font-bold text-white tracking-tight" style={{ fontFamily: '"Pretendard Variable", Pretendard, sans-serif' }}>
                새로운 소식
              </h2>
              <button className="px-6 py-2.5 rounded-full border border-white/20 text-white text-[14px] font-medium hover:bg-white/10 transition-all">
                View blog
              </button>
            </div>

            {/* 뉴스 카드 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {[
                { title: "AI Agent Builder\nAI:ON-U 정식 출시", date: "Feb 20, 2026", tag: "Product", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" },
                { title: "Enterprise RAG\n엔진 2.0 업데이트", date: "Jan 15, 2026", tag: "Product", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800" },
                { title: "KT DS, AI Agent\n도입 사례 공개", date: "Dec 22, 2025", tag: "Case Study", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" },
                { title: "2025 AI Trends\nReport 발간", date: "Nov 30, 2025", tag: "Insight", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" }
              ].map((news, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: false }}
                  className="group cursor-pointer"
                >
                  {/* 썸네일 */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-zinc-900 border border-white/5 shadow-2xl">
                    <motion.img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover transition-all duration-700"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
                  </div>

                  {/* 텍스트 */}
                  <h3 className="text-white text-[18px] font-bold leading-snug mb-3 whitespace-pre-line group-hover:text-blue-400 transition-colors">{news.title}</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-white/40 text-[13px]">{news.date}</span>
                    <span className="text-white/40 text-[13px]">·</span>
                    <span className="text-white/40 text-[13px]">{news.tag}</span>
                  </div>
                  <span className="text-white/60 text-[14px] font-medium group-hover:text-white transition-colors">
                    Read more →
                  </span>
                </motion.div>
              ))}
            </div>

            {/* 네비게이션 화살표 */}
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all">
                <ChevronDown size={16} className="rotate-90" />
              </button>
              <button className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all">
                <ChevronDown size={16} className="-rotate-90" />
              </button>
            </div>
          </div>
        </section>


        {/* AI Agent 스튜디오 섹션 */}
        <section id="studio-v2" className="py-32 px-6 bg-black">
          <div className="max-w-[1240px] mx-auto">
            {/* 메인 CTA 카드 - 파티클 배경 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="relative rounded-[40px] overflow-hidden bg-[#0A0A0A] border border-white/5 mb-8 h-[500px] flex items-center group"
            >
              <img
                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1400"
                alt="AI Agent Studio"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-[1]" />

              <div className="relative z-10 pl-16 md:pl-24 max-w-2xl">
                <h2 className="text-[52px] font-black text-white mb-6 tracking-tight leading-tight">
                  AI Agent 스튜디오
                </h2>
                <p className="text-white/60 text-lg mb-4 leading-relaxed break-keep font-medium">
                  필요한 Agent, Tool, MCP를 빠르게 확인하고 시작하세요.<br />
                  쉽게 개발 가능한 AI 아키텍처와 Delivery 가이드를 제공합니다.
                </p>

                <button className="mt-8 flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 text-white/90 font-bold text-sm hover:bg-white/5 transition-all group/btn">
                  더보기 &gt;
                </button>
              </div>
            </motion.div>

            {/* 3개 기능 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Agent 개발",
                  desc: "AI Agent 개발을 위한 통합 개발 환경과 도구를 제공합니다.",
                  icon: <Code className="text-white/80" strokeWidth={1.5} size={20} />
                },
                {
                  title: "Core Agent",
                  desc: "사전 개발된 Core Agent를 활용하여 빠른 프로토타이핑이 가능합니다.",
                  icon: <Cpu className="text-white/80" strokeWidth={1.5} size={20} />
                },
                {
                  title: "Core Agent",
                  desc: "사전 개발된 Core Agent를 활용하여 빠른 프로토타이핑이 가능합니다.",
                  icon: <Cpu className="text-white/80" strokeWidth={1.5} size={20} />
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-[#0A0A0A] border border-white/5 rounded-[32px] p-10 hover:border-white/10 transition-all duration-300"
                >
                  <div className="size-10 rounded-full bg-white/5 flex items-center justify-center mb-8">
                    {item.icon}
                  </div>
                  <h3 className="text-white text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-white/40 text-[15px] leading-relaxed break-keep font-medium">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA 배너 - 파티클 배경 */}
        <section className="relative py-32 px-6 bg-black overflow-hidden">
          <img
            src="/banner.png"
            alt="CTA Background"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />
          <div className="relative z-10 max-w-[1200px] mx-auto text-center">
            <h2 className="text-[48px] font-black text-white mb-10 tracking-tight">
              Biz.AI와 함께 시작해보세요.
            </h2>
            <div className="flex items-center justify-center gap-4">
              <button className="px-8 py-3.5 rounded-full border border-white/30 text-white font-bold text-sm hover:bg-white/10 transition-all">
                무료체험 신청
              </button>
              <button className="px-8 py-3.5 rounded-full bg-white/10 backdrop-blur-md text-white font-bold text-sm hover:bg-white/20 transition-all">
                솔루션 문의
              </button>
            </div>
          </div>
        </section>

        {/* 풋터 */}
        <footer className="bg-black pt-32 pb-16 px-6 border-t border-white/5">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-24">
              <div className="flex flex-col">
                <div className="mb-8">
                  <h4 className="text-[22px] font-bold text-white tracking-tight">kt ds</h4>
                </div>
                <p className="text-white/60 text-[14px] leading-relaxed mb-10 break-keep font-medium">
                  비즈니스를 위한 엔터프라이즈급<br />
                  AI Agent 플랫폼
                </p>
                <div className="flex gap-4 mt-auto">
                  <a href="#" className="text-white/40 hover:text-white transition-all">
                    <Linkedin size={22} strokeWidth={1.5} />
                  </a>
                  <a href="#" className="text-white/40 hover:text-white transition-all">
                    <Youtube size={22} strokeWidth={1.5} />
                  </a>
                  <a href="#" className="text-white/40 hover:text-white transition-all">
                    <Mail size={22} strokeWidth={1.5} />
                  </a>
                </div>
              </div>

              <div>
                <h5 className="text-white font-bold mb-8 text-[15px]">AI 솔루션</h5>
                <ul className="space-y-4 text-[14px] font-medium text-white/40">
                  <li><a href="#" className="hover:text-white transition-colors">고객지원·VOC 자동화</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">데이터 기반 의사결정</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">내부 운영·업무 자동화</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">기획·보고·문서 업무</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">리스크·품질 관리</a></li>
                </ul>
              </div>

              <div>
                <h5 className="text-white font-bold mb-8 text-[15px]">제품</h5>
                <ul className="space-y-4 text-[14px] font-medium text-white/40">
                  <li><a href="#" className="hover:text-white transition-colors">데이터 Agent</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">분류·분석 Agent</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">리포트·문서 Agent</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">운영·지원 Agent</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">AI Agent 스튜디오</a></li>
                </ul>
              </div>

              <div>
                <h5 className="text-white font-bold mb-8 text-[15px]">회사</h5>
                <ul className="space-y-4 text-[14px] font-medium text-white/40">
                  <li><a href="#" className="hover:text-white transition-colors">우수 사례</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">가격 안내</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">문서</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">고객 지원</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">파트너십</a></li>
                </ul>
              </div>
            </div>

            <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[13px] text-white/30 font-medium">
              <p>© 2026 AI Biz Portal. All rights reserved.</p>
              <div className="flex gap-8">
                <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
                <a href="#" className="hover:text-white transition-colors">이용약관</a>
                <a href="#" className="hover:text-white transition-colors">보안정책</a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-[100] w-[40px] h-[40px] flex items-center justify-center bg-black/60 text-white hover:bg-black/80 rounded-full transition-all border border-white/20"
            aria-label="맨 위로 가기"
          >
            <ArrowUp size={16} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
