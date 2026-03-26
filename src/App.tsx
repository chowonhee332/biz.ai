/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from './context/ThemeContext';
import HeroSpline from './components/HeroSpline';
import Silk from './components/Silk';
import { useTransform, motion, useInView, AnimatePresence, animate, useMotionValue, useSpring, useScroll } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ParticleEngine from './components/ParticleEngine';
import HeroContent from './components/HeroContent';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Aurora from './components/Aurora';
import Antigravity from './components/Antigravity';
import { BackgroundGradientAnimation } from './components/ui/background-gradient-animation';
import {
  Zap,
  Layout,
  Globe,
  Database,
  Shield,
  Clock,
  ChevronRight,
  ChevronDown,
  ArrowUp,
  Youtube,
  Linkedin,
  Mail,
  Smartphone,
  Info,
  Menu,
  X,
} from 'lucide-react';

// Sub-components (Moved to top for hoisting/scoping clarity)

const StudioCard = ({ icon, title, desc }: { icon: React.ReactElement; title: string; desc: string }) => (
  <Card className="p-10 rounded-[20px] bg-bg-surface border-border-light hover:bg-bg-active hover:border-border-active transition-all duration-500 group flex flex-col items-center md:items-start text-center md:text-left shadow-2xl relative overflow-hidden text-left break-keep">
    <div className="absolute top-0 right-0 w-32 h-32 bg-bg-surface/50 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-brand-primary/20 transition-colors duration-500" />
    <div className="size-16 bg-bg-surface/50 rounded-[20px] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border border-border-light relative z-10 text-text-primary/80 group-hover:text-brand-primary">
      {React.cloneElement(icon as any, { size: 32 })}
    </div>
    <h4 className="text-2xl font-bold text-text-primary mb-4 relative z-10">{title}</h4>
    <p className="text-text-dim leading-relaxed font-medium relative z-10">{desc}</p>
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

const SolutionCard = ({ image, title, desc, highlight, category }: { image: string; title: string; desc: string; highlight: string; category?: string; index?: number }) => (
  <div className="bg-[#F6F6F6] rounded-[20px] p-6 md:p-8 flex flex-col w-full min-w-[280px] h-[340px] md:h-[380px] cursor-pointer font-pretendard">

        {/* Logo - 좌상단 */}
        <div className="w-[60px] h-[60px] md:w-[120px] md:h-[60px] shrink-0">
          <img src={image} alt={title} className="w-full h-full object-contain" />
        </div>

        {/* Title, Description, Tags - 하단 고정 */}
        <div className="flex flex-col gap-3 mt-auto">
          <h4 className="text-black text-[22px] md:text-[28px] font-bold tracking-tight leading-tight">{title}</h4>
          <p className="text-[#444444] text-[15px] leading-relaxed font-normal break-keep min-h-[80px] md:min-h-[96px]">{desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {category && (
              <span className={`px-3 h-7 rounded-full text-white text-[14px] font-medium leading-none inline-flex items-center ${category === 'Solution' ? 'bg-[#22C55E]' : 'bg-brand-primary'}`}>{category}</span>
            )}
            <span className="px-3 h-7 rounded-full bg-[#E8E8E8] text-[#555555] text-[14px] font-medium leading-none inline-flex items-center">
              {highlight.replace(/^#\s*/, '')}
            </span>
          </div>
        </div>
  </div>
);



const Char = ({ children, progress, range, isHighlight }: { children: string; progress: any; range: [number, number]; isHighlight?: boolean }) => {
  const opacity = useTransform(progress, range, [0.4, 1]);
  return (
    <motion.span
      style={{ opacity, color: isHighlight ? '#33ADFF' : undefined }}
      className="whitespace-pre"
    >
      {children}
    </motion.span>
  );
};

const CharacterReveal = ({ text, className, scrollProgress, range, highlightIndex }: { text: string; className?: string; scrollProgress: any, range: [number, number], highlightIndex?: number }) => {
  const lines = text.split('\n');
  const totalChars = text.length;
  let charCounter = 0;

  return (
    <div className={`flex flex-col gap-1 md:gap-2 font-pretendard ${className}`}>
      {lines.map((line, lineIdx) => {
        // Line-based color scheme:
        // Blue highlight from the specified highlightIndex to the end.
        // If no index is provided, only the last line is highlighted.
        const isHighlight = lineIdx >= (highlightIndex ?? lines.length - 1);
        const colorClass = isHighlight ? "" : "text-text-primary";

        return (
          <div
            key={lineIdx}
            className={`flex flex-wrap text-heading-md md:text-heading-xl font-bold tracking-tight leading-[1.3] ${colorClass}`}
          >
            {line.split('').map((char, charIdx) => {
              const charStart = range[0] + (charCounter / totalChars) * (range[1] - range[0]);
              const charEnd = range[0] + ((charCounter + 1) / totalChars) * (range[1] - range[0]);
              charCounter++;
              return (
                <Char key={charIdx} progress={scrollProgress} range={[charStart, charEnd]} isHighlight={isHighlight}>
                  {char}
                </Char>
              );
            })}
            {lineIdx < lines.length - 1 && (() => { charCounter++; return null; })()}
          </div>
        );
      })}
    </div>
  );
};

const InteractiveMockup = ({ image, frameImage, initialMouseX = -0.75, cursorColor = "var(--color-brand-primary)", cursorName = "Biz.AI" }: { image: string; frameImage: string; initialMouseX?: number; cursorColor?: string; cursorName?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(initialMouseX);
  const mouseY = useMotionValue(0.3);

  // 커스텀 커서를 위한 실제 픽셀 좌표 (딜레이 없는 트래킹용)
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  // 마우스 위치에 따라 이미지가 따라오는 효과 (실시간 반응성을 위해 stiffness를 250으로 대폭 강화)
  const imgX = useSpring(useTransform(mouseX, [-1, 1], [-400, 400]), { stiffness: 250, damping: 30 });
  const imgY = useSpring(useTransform(mouseY, [-1, 1], [-200, 200]), { stiffness: 250, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    // 커스텀 커서 위치 업데이트
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
    if (!isHovered) setIsHovered(true);

    // -1 ~ 1 사이 정규화
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(nx);
    mouseY.set(ny);
  };

  const handleMouseLeave = () => {
    // 마우스가 떠나면 다시 설정된 초기 오프셋 지점으로 즉시 복귀
    mouseX.set(initialMouseX);
    mouseY.set(0.3);
    setIsHovered(false);
  };

  return (
    <div className="w-full h-full flex items-center justify-center lg:justify-end relative group/frame shrink-0 bg-transparent">
      {/* 겉 프레임: 원래의 널찍한 사이즈로 복원 */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-full rounded-[28px] overflow-hidden cursor-none bg-bg-main"
      >
        {/* 배경 이미지 (프레임) */}
        <img
          src={frameImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* 안의 이미지: 마우스 커서에 따라 움직임 */}
        <motion.div
          style={{ x: imgX, y: imgY }}
          className="absolute inset-[-40%] flex items-center justify-center p-16"
        >
          <img
            src={image}
            alt="Use Case Screenshot"
            className="w-[180%] h-auto rounded-[12px] object-contain pointer-events-none transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </motion.div>

        {/* 커스텀 커서 (협업 스타일) */}
        <motion.div
          style={{
            x: cursorX,
            y: cursorY,
            opacity: isHovered ? 1 : 0
          }}
          className="absolute top-0 left-0 z-50 pointer-events-none select-none"
        >
          {/* 포인터 화살표 */}
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4L11 20L14 14L20 11L4 4Z" fill={cursorColor} stroke="white" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          {/* 이름표 */}
          <div
            className="ml-6 -mt-1 px-3 py-1 text-text-primary text-label-sm font-bold rounded-lg shadow-lg border border-border-light whitespace-nowrap"
            style={{ backgroundColor: cursorColor }}
          >
            {cursorName}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const UseCaseVisual = ({ image, frameImage, initialMouseX, cursorColor, cursorName, index, setActive, isActive }: { image: string; frameImage: string; initialMouseX: number; cursorColor: string; cursorName: string; index: number; setActive: (idx: number) => void; isActive: boolean }) => {
  const ref = useRef(null);
  // The isInView logic is now handled by the parent component's scroll progress
  // and activeUseCase state. This component will just render based on isActive prop.
  // const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", amount: 0.5 });

  // useEffect(() => {
  //   if (isInView) setActive(index);
  // }, [isInView, index, setActive]);

  return (
    <motion.div
      ref={ref}
      // initial={{ opacity: 0, y: 40 }} // Initial state is now handled by parent motion.div
      // animate={(isInView || isActive) ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} // Animation is now handled by parent motion.div
      // transition={{
      //   type: "spring",
      //   stiffness: 100,
      //   damping: 30,
      //   mass: 1,
      //   restDelta: 0.001,
      //   delay: 0.1
      // }}
      className="w-full h-full smooth-gpu"
    >
      <InteractiveMockup image={image} frameImage={frameImage} initialMouseX={initialMouseX} cursorColor={cursorColor} cursorName={cursorName} />
    </motion.div>
  );
};


const CTAParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.parentElement.clientHeight * window.devicePixelRatio;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 1000; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    resize();
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40 translate-z-0" />;
};

const DomainAccordionItem = ({
  title,
  agents,
  image,
  isActive,
  forceExpanded,
  onMouseEnter,
  onClick
}: {
  title: string;
  agents: string[];
  image: string;
  isActive: boolean;
  forceExpanded?: boolean;
  onMouseEnter: () => void;
  onClick: () => void;
}) => {
  const expanded = isActive || forceExpanded;

  const agentListVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: forceExpanded ? 0 : 0.15,
      }
    }
  };

  const agentItemVariants = {
    hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring' as const, stiffness: 200, damping: 24 }
    }
  };

  return (
    <motion.div
      layout
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className="relative overflow-hidden cursor-pointer rounded-2xl smooth-gpu w-full lg:w-auto h-[380px] lg:h-auto"
      style={{ willChange: 'flex, width' }}
      {...(!forceExpanded && {
        animate: { flex: isActive ? 780 : 122 },
        transition: { type: 'spring', stiffness: 80, damping: 22, mass: 1 },
      })}
    >
      <div className="absolute inset-0">
        <motion.img
          src={image}
          alt={title}
          loading="eager"
          className="w-full h-full object-cover"
          animate={{
            filter: expanded ? 'grayscale(0) brightness(0.85) contrast(1.1)' : 'grayscale(1) brightness(0.4)',
            scale: expanded ? 1.06 : 1
          }}
          transition={{ type: 'spring', stiffness: 80, damping: 22 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/70" />
      </div>

      <div className={`absolute inset-x-0 top-0 p-5 lg:p-8 flex flex-col justify-start h-full ${expanded ? 'items-start text-left' : 'items-center'}`}>
        <p className="text-white/60 font-medium text-body-sm tracking-wide mb-3 whitespace-nowrap uppercase">
          {title}
        </p>

        <AnimatePresence>
          {(expanded || window.innerWidth < 1024) && (
            <motion.div
              key="agents"
              variants={agentListVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col gap-1.5 md:gap-2"
            >
              {agents.map((agent, i) => (
                <motion.div key={i} variants={agentItemVariants}>
                  <span className="text-white text-body-md md:text-body-lg lg:text-heading-xs font-bold leading-tight">{agent}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Tag = ({ text }: { text: string }) => (
  <Badge variant="outline" className="border-brand-primary text-brand-primary rounded-full px-4 py-1.5 font-medium whitespace-nowrap">
    {text}
  </Badge>
);

const ProcessSection = () => {
  return (
    <div className="relative w-full py-10">
      <div
        className="bg-white relative z-20 overflow-hidden smooth-gpu rounded-[28px] mx-3"
      >
        <section id="process" className="py-16 md:py-32 relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-10 relative z-10">
            <div className="text-left md:text-center mb-12 md:mb-24 container-responsive">
              <span className="text-body-sm md:text-body text-[#999999] mb-3 block font-medium">왜 kt ds와 함께 해야 할까요?</span>
              <h1 className="text-heading-md md:text-heading-lg lg:text-display-md font-bold text-black mb-4 md:mb-6 tracking-tight leading-tight font-poppins">
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
                  className="group relative bg-[#F6F6F6] rounded-[20px] p-6 md:p-10 hover:-translate-y-2 hover:shadow-[0_20px_48px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col min-h-[320px] md:min-h-[420px] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[20px] pointer-events-none" />
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
};

const App = () => {
  const { isDark } = useTheme();
  const { scrollYProgress } = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 1024 : false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 400);
    };
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
            speed={2}
            scale={0.8}
            color="#c8d8ff"
            noiseIntensity={6}
            rotation={4.8}
          />
        </div>
        {/* Fade-out gradient overlay */}
        <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,1) 100%), linear-gradient(to right, rgba(10,10,10,0.2) 0%, rgba(10,10,10,1) 60%)' }} />

        <div className="absolute inset-0 z-[2]">
          <HeroSpline />
        </div>

        <div className="relative z-10 w-full max-w-[1280px] mx-auto container-responsive flex items-center h-full pointer-events-none -mt-[160px] md:mt-0">
          <div className="w-full h-full flex flex-col justify-center lg:flex-row lg:justify-start items-center relative">
            {/* Left Content */}
            <div className="w-full lg:max-w-[800px] relative z-20 pointer-events-auto">
              <HeroContent align="left" />
            </div>
          </div>
        </div>

        {/* 스크롤 다운 인디케이터 */}
        <motion.div
          className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          onClick={() => document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={28} className="text-white/80" strokeWidth={1.5} />
            <ChevronDown size={28} className="text-white/40 -mt-5" strokeWidth={1.5} />
          </motion.div>
          <span className="text-white/60 text-sm font-medium tracking-wider">Scroll down</span>
        </motion.div>
      </section>

      {/* Main Content Area */}
      <div className="relative z-20" style={{ backgroundColor: isDark ? '#0A0A0A' : '#FFFFFF' }}>
        <div className="relative w-full pt-10">
          {/* Continuous gradient from the Hero section into the gap */}

          <div
            className="relative z-20 overflow-hidden mb-20 smooth-gpu rounded-[28px] mx-3 transition-colors duration-500 bg-white"
          >
            <section id="solution" className="py-16 md:py-32">
              <div className="max-w-[1280px] mx-auto px-10 relative">
                <div className="text-left md:text-center mb-10 md:mb-20 font-pretendard flex flex-col items-start md:items-center relative z-10">
                  <span className="text-body-sm md:text-body text-[#999999] mb-3 block font-medium">AI 서비스</span>
                  <h1 className="text-heading-md md:text-heading-lg lg:text-display-md font-bold mb-4 md:mb-6 tracking-tight leading-tight font-poppins text-black">
                    AI Services by kt ds
                  </h1>
                </div>


                {/* 그룹 1: 전사 공통 */}
                <div className="mb-16 md:mb-32 max-w-[1280px] mx-auto">
                  <div className="flex items-center gap-2 mb-5 ml-4">
                    <span className="text-body font-normal text-gray-800">Agents</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {[
                      {
                        image: "/ai-service-logos/logo_1.png",
                        title: "WorksAI",
                        desc: "AI Agent 기반으로 다양한 업무처리를 지원하는 사내 AI Agent Portal",
                        highlight: "#효율 200% 향상"
                      },
                      {
                        image: "/ai-service-logos/logo_2.png",
                        title: "AI 회의록",
                        desc: "음성 기반 회의 자동 기록 · 요약 · 업무 추출 AI 서비스",
                        highlight: "#1분 회의록"
                      },
                      {
                        image: "/ai-service-logos/logo_3.png",
                        title: "국정감사 Agent",
                        desc: "국정감사 자료 분석부터 핵심 이슈 도출까지 지원하는 AI 서비스",
                        highlight: "#준비시간 70% 단축"
                      },
                      {
                        image: "/ai-service-logos/logo_4.png",
                        title: "RFP Agent",
                        desc: "제안요청서(RFP) 분석, 요구사항 정리, 제안서 초안 작성을 지원하는 AI 서비스",
                        highlight: "#작성시간 60% 절감"
                      }
                    ]
                      .map((card, i) => (
                        <div key={i}>
                          <SolutionCard {...card} category="Agent" index={i} />
                        </div>
                      ))}
                  </div>
                </div>

                {/* 그룹 2: IT 서비스/개발 직군 */}
                <div className="mb-14 max-w-[1280px] mx-auto">
                  <div className="flex items-center gap-2 mb-5 ml-4">
                    <span className="text-body font-normal text-gray-800">Solutions</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {[
                      {
                        image: "/ai-service-logos/logo_5.png",
                        title: "AI:ON-U",
                        desc: "엔터프라이즈 맞춤형 AI Agent를 빠르게 구축하는 No-Code 기반 Agent Builder",
                        highlight: "#3분 완성"
                      },
                      {
                        image: "/ai-service-logos/logo_6.png",
                        title: "Beast AI Gateway",
                        desc: "엔터프라이즈용 AI 기술, API를 통합 관리하는 솔루션",
                        highlight: "#AI 기능 표준화"
                      },
                      {
                        image: "/ai-service-logos/logo_7.png",
                        title: "Codebox",
                        desc: "폐쇄형 설치형 AI 코드 개발 어플라이언스",
                        highlight: "#보안 특화 개발"
                      },
                      {
                        image: "/ai-service-logos/logo_8.png",
                        title: "CloudWiz",
                        desc: "클라우드 운영 효율화와 자동화를 지원하는 관리 서비스",
                        highlight: "#비용 30% 절감"
                      }
                    ].map((card, i) => (
                      <div key={i}>
                        <SolutionCard {...card} category="Solution" index={i} />
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
              <h1 className="text-heading-md md:text-heading-lg lg:text-display-md font-bold text-white tracking-tight leading-tight font-poppins">
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
              <img src="/works.png" alt="Use Cases" className="w-full h-auto object-cover" />
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

        <section id="logos" className="relative pt-10 pb-3 overflow-hidden" style={{ backgroundColor: isDark ? '#0A0A0A' : '#F6F6F6' }}>
          {/* Hero와 동일한 그리드 배경 추가 */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          
          <div className="relative z-10 w-full text-center">
            <div className="relative overflow-hidden w-full py-4">
              <motion.div
                className="flex items-center gap-x-12 whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
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
        <section id="faq" className="py-12 md:py-24 relative overflow-hidden" style={{ backgroundColor: isDark ? '#0A0A0A' : '#F6F6F6' }} >
          <div className="max-w-[1280px] mx-auto container-responsive">
            <div className="flex flex-col lg:flex-row gap-10 md:gap-20">
              {/* 왼쪽: 헤더 */}
              <div className="lg:w-1/3">
                <h1 className="text-heading-md md:text-heading-lg lg:text-display-md font-bold mb-6 md:mb-8 tracking-tight leading-tight font-poppins text-text-primary">
                  FAQ
                </h1>
              </div>

              {/* 오른쪽: 아코디언 리스트 */}
              <div className="lg:w-2/3">
                <div className="space-y-4">
                  {/* self-invoking function을 사용하여 지역 상태(openFaqIndex)를 FAQ 목록 전체에서 관리합니다. */}
                  {(() => {
                    const FAQList = () => {
                      const [openIndex, setOpenIndex] = useState<number | null>(null);

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
                                    {/* Horizontal line (always visible) */}
                                    <motion.div
                                      className="absolute w-5 h-[2px] bg-brand-primary"
                                      animate={{ rotate: 0 }}
                                    />
                                    {/* Vertical line (rotates to become horizontal to make '-') */}
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
                    };
                    return <FAQList />;
                  })()}
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* CTA 배너 - Full Width (Premium Aurora Style) 복구 */}
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
                viewport={{ once: false }}
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
