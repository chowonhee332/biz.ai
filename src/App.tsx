/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useScroll, useTransform, useMotionTemplate, motion, useInView, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ParticleEngine from './components/ParticleEngine';
import HeroContent from './components/HeroContent';
import {
  Menu,
  X,
  ExternalLink,
  Store,
  Utensils,
  Monitor,
  Car,
  HeartPulse,
  ShoppingBag,
  ChevronRight,
  Building2,
  Map,
  Settings,
  Box,
  Rocket,
  BookOpen,
  Linkedin,
  Youtube,
  Mail,
  Search,
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: contentScrollProgress } = useScroll({
    target: contentRef,
    offset: ['start end', 'start 0.05'],
  });

  const [activeCase, setActiveCase] = useState(0);
  const caseRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  const scrollToCase = (index: number) => {
    caseRefs[index].current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  const clipInset = useTransform(contentScrollProgress, [0, 1], [20, 1.5]);
  const clipRadius = useTransform(contentScrollProgress, [0, 1], [48, 20]);
  const contentClipPath = useMotionTemplate`inset(${clipInset}% round ${clipRadius}px)`;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* GNB - Global Navigation Bar */}
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-xl py-4 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
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
            <Button size="sm" className="hidden md:flex bg-white text-black hover:bg-white/90 px-4 py-2 rounded-md font-semibold">
              AI Agent 스튜디오 <ExternalLink size={14} />
            </Button>
            <button className="lg:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="메뉴">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black/80 backdrop-blur-xl py-4 px-6">
            <div className="flex flex-col gap-4">
              <a href="#solution" className="text-white/90 hover:text-white font-medium py-1" onClick={() => setIsMenuOpen(false)}>AI Agent 제품군</a>
              <a href="#domain" className="text-white/90 hover:text-white font-medium py-1" onClick={() => setIsMenuOpen(false)}>AI 솔루션</a>
              <a href="#use-cases" className="text-white/90 hover:text-white font-medium py-1" onClick={() => setIsMenuOpen(false)}>고객 사례</a>
              <a href="#about" className="text-white/90 hover:text-white font-medium py-1" onClick={() => setIsMenuOpen(false)}>회사 소개</a>
              <div className="pt-2 mt-2 border-t border-white/10 flex flex-col gap-2">
                <Button variant="ghost" size="sm" className="text-white/90 hover:text-white justify-start">
                  kt ds <ExternalLink size={14} />
                </Button>
                <Button size="sm" className="bg-white text-black hover:bg-white/90 w-full justify-center">
                  AI Agent 스튜디오 <ExternalLink size={14} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - sticky behind content */}
      <section className="sticky top-0 z-0 h-screen flex items-center justify-center overflow-clip bg-black">

        {/* Dot grid pattern */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Particle Engine */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <ParticleEngine scrollYProgress={scrollYProgress} />
        </div>

        {/* Hero 텍스트 & 버튼 */}
        <div className="relative z-10 flex items-center justify-center w-full">
          <HeroContent />
        </div>
      </section>

      {/* Content sections scroll over the hero */}
      <div className="relative z-10 bg-black">

        {/* Solution Section - White card with clip reveal */}
        <motion.div
          ref={contentRef}
          className="bg-background will-change-[clip-path]"
          style={{ clipPath: contentClipPath }}
        >
          <section id="solution" className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-24">
                <h2 className="text-3xl md:text-4xl font-bold text-brand mb-4">KT DS의 AI 솔루션</h2>
                <p className="text-muted-foreground text-lg">기업의 AI 도입부터 클라우드 인프라 관리까지 전 과정을 표준화하고 안정적으로 지원합니다</p>
              </div>
              <div className="relative mt-20">
                <div className="flex flex-col gap-24 lg:pl-32">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-y-32 gap-x-8 relative">
                    <SolutionItem type="top" tag="업무에 필요한 Agent를 3분만에 만들고 싶다면" title="AI:ON-U" desc="엔터프라이즈 맞춤형 AI Agent를 빠르게 구축하는 No-Code 기반 Agent Builder (비개발자 생성 가능)" icon={<Store className="text-chart-1" />} />
                    <SolutionItem type="top" tag="전사 AI Agent 도입을 고려하고 있다면" title="Works AI" desc="AI Agent 기반으로 다양한 업무처리를 지원하는 사내 AI Agent Portal" icon={<Utensils className="text-chart-1" />} />
                    <SolutionItem type="top" tag="회의록 작성을 1분 만에 하고 싶다면" title="AI 회의록" desc="음성 기반 회의 자동 기록 · 요약 · 업무 추출 AI 서비스" icon={<Monitor className="text-chart-1" />} />
                    <SolutionItem type="bottom" tag="멀티 클라우드 환경에 AI를 도입해서 비용을 30% 줄이고 싶다면" title="CloudWiz" desc="클라우드 운영 효율화와 자동화를 지원하는 관리 서비스" icon={<Car className="text-chart-1" />} />
                    <SolutionItem type="bottom" tag="기업 내부 시스템과 AI 기능을 효율적으로 표준화하고 싶다면" title="Beast AI Gateway" desc="엔터프라이즈용 AI 기술, API를 통합 관리하는 서비스" icon={<HeartPulse className="text-chart-1" />} />
                    <SolutionItem type="bottom" tag="보안이 중요한 폐쇄형 환경에서도 AI를 개발하고 싶다면" title="Codebox" desc="폐쇄형 설치형 AI 코드 개발 어플라이언스" icon={<ShoppingBag className="text-chart-1" />} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </motion.div>

        {/* Domain Multi-Agent Section - Black bg */}
        <section id="domain" className="py-24 px-6 relative overflow-hidden bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">도메인별 Multi-Agent</h2>
              <p className="text-white/60 text-lg">공공/금융 등 도메인별로 KTDS의 Multi-Agent를 활용해 보세요.</p>
            </div>
            <div className="relative max-w-5xl mx-auto flex justify-center">
              <Card className="relative rounded-full aspect-square w-[min(90vw,600px)] flex items-center justify-center bg-white/5 backdrop-blur border-white/10 overflow-visible">
                <div className="absolute inset-0">
                  <DomainNodeCircle title="금융" agents={['Audit Agent', 'SQL Agent', 'RFP Agent']} angle={-90} />
                  <DomainNodeCircle title="공공기관" agents={['Audit Agent', 'RFP Agent', 'SQL Agent']} angle={-18} />
                  <DomainNodeCircle title="미디어" agents={['SQL Agent', 'TA Agent']} angle={54} />
                  <DomainNodeCircle title="일반기업" agents={['SQL Agent', 'RFP Agent', 'Codebox', 'beast AI Gateway']} angle={126} />
                  <DomainNodeCircle title="통신/네트워크" agents={['SQL Agent', 'beast AI Gateway', 'Codebox']} angle={198} />
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Use Cases Section - Framer Style Sticky Scroll */}
        <section id="use-cases" className="py-32 px-6 bg-black border-b border-white/10 overflow-visible relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-20 items-start">
              {/* Left Column (Sticky Sidebar) */}
              <div className="hidden lg:block">
                <div className="sticky top-48 h-fit">
                  <div className="mb-24">
                    <h2 className="text-4xl font-bold text-white mb-4 tracking-tight leading-tight">
                      Solution, <br />
                      <span className="text-white/30">Multi Agent Use Cases</span>
                    </h2>
                  </div>

                  <nav className="flex flex-col border-t border-white/10">
                    <StickyNavCase
                      id="case-1"
                      title="Works AI"
                      subtitle="AI Portal"
                      desc="AI 챗봇 기반으로 다양한 업무 처리를 지원하는 AI Agent 포털 서비스로 기업 전체 AI 서비스를 통합 관리하고 접근할 수 있는 중앙 플랫폼입니다."
                      tags={["AI 비서+그룹웨어", "맞춤형", "사내 데이터 연동"]}
                      isActive={activeCase === 0}
                      onClick={() => scrollToCase(0)}
                    />
                    <StickyNavCase
                      id="case-2"
                      title="Audit Agent"
                      subtitle="Compliance"
                      desc="복잡한 법규와 컴플라이언스를 자동 분석하는 규제 대응 에이전트. 대량 문서를 요약하고 핵심 리스크를 추출합니다."
                      tags={["컴플라이언스", "법규 분석", "AI 감사"]}
                      isActive={activeCase === 1}
                      onClick={() => scrollToCase(1)}
                    />
                    <StickyNavCase
                      id="case-3"
                      title="지능형 회의록 Agent"
                      subtitle="Productivity"
                      desc="음성 인식부터 요약, 액션 아이템 추출까지 자동화한 회의 솔루션으로 업무 효율을 극대화합니다."
                      tags={["STT / NLP", "업무 생산성", "회의 자동화"]}
                      isActive={activeCase === 2}
                      onClick={() => scrollToCase(2)}
                    />
                  </nav>
                </div>
              </div>

              {/* Right Scrolling Column */}
              <div className="space-y-[60vh] pb-[60vh] pt-[20vh]">
                <UseCaseVisual
                  index={0}
                  innerRef={caseRefs[0]}
                  onInView={() => setActiveCase(0)}
                  icon={<Utensils size={60} className="text-white/10" />}
                />
                <UseCaseVisual
                  index={1}
                  innerRef={caseRefs[1]}
                  onInView={() => setActiveCase(1)}
                  icon={<Search size={60} className="text-white/10" />}
                />
                <UseCaseVisual
                  index={2}
                  innerRef={caseRefs[2]}
                  onInView={() => setActiveCase(2)}
                  icon={<Monitor size={60} className="text-white/10" />}
                />
              </div>
            </div>

            <div className="mt-20 flex justify-center border-t border-white/5 pt-20">
              <Button variant="outline" size="lg" className="px-12 py-3.5 text-lg font-bold border-white/20 text-white hover:bg-white/10 rounded-full">
                AI Agent 활용 사례 더보기
              </Button>
            </div>
          </div>
        </section>

        {/* Customer Testimonials - Black bg */}
        <section id="testimonials" className="py-24 px-6 bg-black border-b border-white/10">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-3 mb-6 px-4">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10 shadow-sm"><Building2 className="text-white/80" size={32} /></div>
                <span className="text-xl font-bold text-white">한국기계산업진흥회</span>
              </div>
              <Card className="w-full rounded-2xl p-10 md:p-14 bg-white/5 border-white/10 shadow-xl">
                <CardContent className="p-0 text-center">
                  <p className="text-lg md:text-2xl font-medium text-white/70 leading-relaxed">&quot; 정책 의사결정과 실무자의 분석. 예측 업무를 지원하는 정책 지원형 AI 서비스 구축으로 업무 생산성 강화에 도움이 되었습니다. &quot;</p>
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-3 mb-6 px-4">
                <span className="text-xl font-bold text-white">경기도</span>
                <div className="p-2 bg-white/5 rounded-lg border border-white/10 shadow-sm"><Map className="text-white/80" size={32} /></div>
              </div>
              <Card className="w-full rounded-2xl p-10 md:p-14 bg-white/5 border-white/10 shadow-xl">
                <CardContent className="p-0 text-center">
                  <p className="text-lg md:text-2xl font-medium text-white/70 leading-relaxed">&quot; 경기도가 보유한 공공데이터를 체계화하고 통합/개방 데이터 플랫폼을 안정적으로 구축하여, 도민들이 손쉽게 공공데이터에 접근/활용할 수 있는 기반을 마련해 주었습니다. &quot;</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why KT DS & Stats - Black bg */}
        <section id="why" className="py-24 px-6 bg-black border-b border-white/10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-20 text-white">왜 KT DS와 함께 해야 할까요?</h2>
            <div className="flex flex-col gap-6 mb-32">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
                <div className="w-full md:w-64 h-20 rounded-full flex items-center justify-center shrink-0 bg-white/10 text-white border border-white/20 shadow-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold">Retriever / Analyst</div>
                    <div className="text-xs opacity-70 font-medium">분석 · 설계</div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 pt-2">
                  <h4 className="font-bold text-white">데이터 협의체를 통해 데이터 분석 및 선별</h4>
                  <p className="text-sm text-white/50 leading-relaxed">이를 기반으로 RAG 및 Agent 구현에 최적화된 체계 구축<br />원인 분석, 옵션 비교, 리스크/영향 평가, 계획 수립</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 md:ml-24">
                <div className="w-full md:w-64 h-20 rounded-full flex items-center justify-center shrink-0 bg-white/10 text-white border border-white/20 shadow-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold">Writer/Executor</div>
                    <div className="text-xs opacity-70 font-medium">구축</div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 pt-2">
                  <h4 className="font-bold text-white"><span className="text-brand">17년 업력</span>으로 안정성 및 보안성을 갖춘 시스템 구축</h4>
                  <p className="text-sm text-white/50 leading-relaxed">답변/문서/코드/보고서 작성<br /><span className="font-bold text-white/80">유연한 워크플로우</span> 생성 기능으로 다양한 비즈니스에 최적화</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center border-t border-white/10 pt-24">
              <div className="flex flex-col items-center">
                <span className="text-white/40 text-sm font-medium mb-4 italic">IT Engineer</span>
                <div className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">1700</div>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">IT 신화의 주역<br />Cloud와 AI 기술의 리더</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-white/40 text-sm font-medium mb-4 italic">Client</span>
                <div className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">150</div>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">다양한 분야의<br />글로벌 고객사</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-white/40 text-sm font-medium mb-4 italic">Solution</span>
                <div className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">18</div>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">AX를 리딩할<br />자체 개발 솔루션</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-white/40 text-sm font-medium mb-4 italic">AI Agent</span>
                <div className="text-5xl md:text-7xl font-black text-white mb-6 font-mono tracking-tighter">600+</div>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">분야별 최적화된<br />자체 개발 에이전트</p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Agent Studio - Black bg */}
        <section id="studio" className="py-24 px-6 bg-black">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-10">AI Agent 스튜디오</h2>
            <p className="text-lg md:text-xl text-white/50 mb-10 max-w-3xl mx-auto leading-relaxed">
              필요한 Agent, Tool, MCP를 빠르게 확인하고 시작하세요.<br className="hidden md:block" />
              쉽게 개발 가능한 AI 아키텍처와 Delivery 가이드를 제공합니다.
            </p>
            <Button variant="outline" size="lg" className="mb-20 border-white/20 text-white hover:bg-white/10">
              더보기 <ChevronRight size={18} />
            </Button>

            <div className="grid md:grid-cols-4 gap-8">
              <StudioCard icon={<Settings className="text-white/60" />} title="Agent 개발" desc="AI Agent 개발을 위한 통합 개발 환경과 도구를 제공합니다." />
              <StudioCard icon={<Box className="text-white/60" />} title="Core Agent" desc="사전 개발된 Core Agent를 활용하여 빠른 프로토타이핑이 가능합니다." />
              <StudioCard icon={<Rocket className="text-white/60" />} title="Use Case 패키징" desc="Use case 단위로 패키징된 솔루션을 통해 즉시 배포할 수 있습니다." />
              <StudioCard icon={<BookOpen className="text-white/60" />} title="Delivery 가이드" desc="AI 아키텍처 소개 및 배포 가이드를 통해 안정적인 운영을 지원합니다." />
            </div>
          </div>
        </section>

        {/* Call To Action (Bottom) */}
        <section className="relative overflow-hidden bg-black py-40 flex items-center justify-center border-t border-white/10">
          {/* Dot grid pattern */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

          {/* Particle Engine */}
          <div className="absolute inset-0 top-20 z-0 opacity-60 pointer-events-none">
            <ParticleEngine mode="logo" />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-[60px] font-black text-white mb-10 tracking-tight leading-tight">
              Intelligence. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">In Action.</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button className="group bg-white text-[#0a0a0f] hover:bg-white/90 w-[140px] h-[37px] py-0 text-[14px] font-semibold rounded-full transition-all flex items-center justify-center gap-0">
                무료체험 신청
                <ChevronRight size={16} className="max-w-0 opacity-0 group-hover:max-w-[24px] group-hover:opacity-100 group-hover:ml-1 transition-all duration-300 overflow-hidden" />
              </Button>
              <Button className="group bg-white/10 text-white border border-white/10 backdrop-blur-md hover:bg-white/20 w-[140px] h-[37px] py-0 text-[14px] font-semibold rounded-full transition-all flex items-center justify-center gap-0">
                솔루션 문의
                <ChevronRight size={16} className="max-w-0 opacity-0 group-hover:max-w-[24px] group-hover:opacity-100 group-hover:ml-1 transition-all duration-300 overflow-hidden" />
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-20 px-6 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-5 gap-12 mb-20">
              <div className="col-span-2">
                <div className="flex items-center gap-2 mb-8"><span className="text-3xl font-black text-white tracking-tighter uppercase">kt ds</span></div>
                <p className="text-sm text-white/80 leading-relaxed mb-8 max-w-xs">비즈니스를 위한 엔터프라이즈급 AI Agent 플랫폼<br />Biz.AI와 함께 데이터 혁신을 시작하세요.</p>
                <div className="flex gap-4">
                  <a href="#" className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><Linkedin size={18} /></a>
                  <a href="#" className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><Youtube size={18} /></a>
                  <a href="#" className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><Mail size={18} /></a>
                </div>
              </div>
              <div>
                <h5 className="text-white font-bold mb-8 uppercase text-xs tracking-widest">AI 솔루션</h5>
                <ul className="space-y-4 text-sm font-medium text-white/80">
                  <li><a href="#" className="hover:text-white transition-colors">고객지원·VOC 자동화</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">데이터 기반 의사결정</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">내부 운영·업무 자동화</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">기획·보고·문서 업무</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">리스크·품질 관리</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-white font-bold mb-8 uppercase text-xs tracking-widest">제품</h5>
                <ul className="space-y-4 text-sm font-medium text-white/80">
                  <li><a href="#" className="hover:text-white transition-colors">데이터 Agent</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">분류·분석 Agent</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">리포트·문서 Agent</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">운영·지원 Agent</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">AI Agent 스튜디오</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-white font-bold mb-8 uppercase text-xs tracking-widest">회사</h5>
                <ul className="space-y-4 text-sm font-medium text-white/80">
                  <li><a href="#" className="hover:text-white transition-colors">우수 사례</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">가격 안내</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">문서</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">고객 지원</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">파트너십</a></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-bold uppercase tracking-wider text-white/70">
              <p>© 2026 AI Biz Portal. All rights reserved.</p>
              <div className="flex gap-8">
                <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
                <a href="#" className="hover:text-white transition-colors">이용약관</a>
                <a href="#" className="hover:text-white transition-colors">보안정책</a>
              </div>
            </div>
          </div>
        </footer>
      </div >
    </div >
  );
};

// Studio Card Component
const StudioCard = ({ icon, title, desc }: { icon: React.ReactElement; title: string; desc: string }) => (
  <Card className="p-10 rounded-xl bg-white/5 border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center md:items-start text-center md:text-left shadow-lg">
    <div className="size-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <h4 className="text-xl font-bold text-white mb-4">{title}</h4>
    <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
  </Card>
);

const SolutionItem = ({ type, tag, title, desc, icon }: { type: 'top' | 'bottom'; tag: string; title: string; desc: string; icon: React.ReactElement }) => (
  <div className={`flex flex-col items-center relative ${type === 'bottom' ? 'md:mt-12' : ''}`}>
    {type === 'top' && (
      <div className="text-center mb-10 min-h-[120px] flex flex-col justify-end">
        <p className="text-chart-1 text-xs md:text-sm font-medium mb-2 px-4">{tag}</p>
        <h4 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h4>
        <p className="text-[11px] md:text-[13px] text-muted-foreground mt-2 px-6 leading-relaxed max-w-[280px] mx-auto">{desc}</p>
      </div>
    )}
    <div className="relative group">
      <div className="w-24 h-28 bg-card shadow-md flex items-center justify-center relative transition-transform duration-300 group-hover:scale-110 border-2 border-border rounded-lg" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
        <div className="w-20 h-24 bg-card flex items-center justify-center border-4 border-chart-1" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>{icon}</div>
      </div>
    </div>
    {type === 'bottom' && (
      <div className="text-center mt-10 min-h-[120px] flex flex-col justify-start">
        <p className="text-chart-1 text-xs md:text-sm font-medium mb-2 px-4">{tag}</p>
        <h4 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h4>
        <p className="text-[11px] md:text-[13px] text-muted-foreground mt-2 px-6 leading-relaxed max-w-[280px] mx-auto">{desc}</p>
      </div>
    )}
  </div>
);

/** Sticky Nav Case Component */
const StickyNavCase = ({ id, title, subtitle, desc, tags, isActive, onClick, className }: { id: string; title: string; subtitle?: string; desc: string; tags: string[]; isActive: boolean; onClick: () => void; className?: string }) => (
  <button
    onClick={onClick}
    className={`w-full text-left py-10 border-b border-white/10 transition-all duration-700 outline-none group ${isActive ? 'opacity-100' : 'opacity-30 hover:opacity-100'} ${className}`}
  >
    <div className="flex flex-col gap-4">
      <div className={`text-3xl font-bold tracking-tight transition-all duration-700 ${isActive ? 'text-white' : 'text-white/60'}`}>
        {title} {subtitle && <span className={`font-light ml-2 ${isActive ? 'text-white/40' : 'text-white/20'}`}>{subtitle}</span>}
      </div>

      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-8">
              <p className="text-lg text-white/50 leading-relaxed font-light max-w-md">
                {desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] font-medium text-white/40 whitespace-nowrap">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-4">
                <span className="text-white font-medium flex items-center gap-2 group/link cursor-pointer">
                  더보기
                  <span className="text-white/40 group-hover/link:translate-x-1 transition-transform inline-block"> &gt; </span>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </button>
);

/** Use Case Visual Card Component - Simplified for Images Only */
const UseCaseVisual = ({ index, onInView, icon, innerRef }: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(scrollRef, { amount: 0.5, margin: "-10% 0px -10% 0px" });

  useEffect(() => {
    if (isInView) {
      onInView(index);
    }
  }, [isInView, index, onInView]);

  return (
    <div
      ref={(node) => {
        if (node) {
          (scrollRef as any).current = node;
          if (innerRef) innerRef.current = node;
        }
      }}
      className="w-full scroll-mt-[50vh]"
    >
      <Card className="bg-white/[0.03] border-white/10 overflow-hidden group/card aspect-video flex items-center justify-center relative rounded-3xl border border-white/10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />

        {/* Placeholder for Screen Image */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            {icon}
          </div>
          <div className="text-white/20 font-mono tracking-widest text-[10px] uppercase">
            Service UI Visualization
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
      </Card>
    </div>
  );
};
/** 원형 배치용 Domain 노드 - angle: 0=오른쪽, 90=아래, -90=위 (도) */
const DomainNodeCircle = ({ title, agents, angle }: { title: string; agents: string[]; angle: number }) => {
  const radius = 0.38; // 원의 반지름 (컨테이너 대비 비율)
  const rad = (angle * Math.PI) / 180;
  const x = 50 + radius * 100 * Math.cos(rad);
  const y = 50 + radius * 100 * Math.sin(rad);
  const badgeDist = 72;
  const badgeX = Math.cos(rad) * badgeDist;
  const badgeY = Math.sin(rad) * badgeDist;

  return (
    <div
      className="absolute size-32 md:size-40 -ml-16 md:-ml-20 -mt-16 md:-mt-20 flex items-center justify-center transition-all duration-700 hover:scale-110 group z-20"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className="absolute inset-0 bg-brand/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative size-24 md:size-32 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-center p-4">
        <span className="text-white text-xs md:text-sm font-bold leading-tight">{title}</span>
      </div>

      <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none whitespace-nowrap"
        style={{ transform: `translate(${badgeX}px, ${badgeY}px)` }}>
        <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-black/80 backdrop-blur border border-white/10 shadow-2xl">
          {agents.map((agent, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="size-1 rounded-full bg-brand" />
              <span className="text-white/80 text-[10px] md:text-xs font-medium uppercase tracking-wider">{agent}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Tag = ({ text }: { text: string }) => (
  <Badge variant="outline" className="border-brand text-brand rounded-full px-4 py-1.5 font-medium whitespace-nowrap">
    {text}
  </Badge>
);

export default App;
