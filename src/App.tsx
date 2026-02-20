/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-extrabold text-foreground tracking-tight">Biz.AI</span>
          </div>

          <div className="hidden md:flex items-center gap-10 text-muted-foreground text-[15px] font-medium">
            <a href="#solution" className="hover:text-foreground transition-colors">AI Agent 제품군</a>
            <a href="#domain" className="hover:text-foreground transition-colors">AI 솔루션</a>
            <a href="#use-cases" className="hover:text-foreground transition-colors">고객 사례</a>
            <a href="#about" className="hover:text-foreground transition-colors">회사 소개</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="default" size="sm">
              kt ds <ExternalLink size={14} />
            </Button>
            <Button variant="default" size="sm">
              AI Agent 스튜디오 <ExternalLink size={14} />
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-primary pt-52 pb-44 px-6 flex items-center justify-center min-h-[600px]">
        <div className="max-w-7xl mx-auto text-center text-primary-foreground relative z-10">
          <h2 className="text-2xl md:text-3xl font-medium mb-6 opacity-95">KT DS의 AI 솔루션은</h2>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">[데이터 활용 극대화]를 이끌어</h1>
          <p className="text-xl md:text-3xl font-medium mb-14 opacity-90">기업의 모든 데이터를 경쟁력으로 만듭니다.</p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button variant="secondary" className="border-2 border-primary-foreground/80 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary px-10 py-3.5 text-lg">
              무료 체험 신청하기 &gt;
            </Button>
            <Button variant="secondary" className="border-2 border-primary-foreground/80 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary px-10 py-3.5 text-lg">
              솔루션 문의하기 &gt;
            </Button>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-24 px-6 bg-background border-b border-border">
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

      {/* Domain Multi-Agent Section */}
      <section id="domain" className="py-24 px-6 bg-muted/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-brand mb-4">도메인별 Multi-Agent</h2>
            <p className="text-muted-foreground text-lg">공공/금융 등 도메인별로 KTDS의 Multi-Agent를 활용해 보세요.</p>
          </div>
          <div className="relative max-w-5xl mx-auto">
            <Card className="rounded-3xl md:rounded-[100px] p-12 md:p-24 min-h-[700px] flex flex-col items-center justify-center bg-card/80 backdrop-blur border-border">
              <div className="relative w-full h-full flex flex-col items-center justify-center gap-16 md:gap-32 mt-12">
                <div className="flex flex-wrap justify-center gap-24 md:gap-48 relative z-10">
                  <DomainNode title="금융" agents={['Audit Agent', 'SQL Agent', 'RFP Agent']} pos="top" />
                  <DomainNode title="공공기관" agents={['Audit Agent', 'RFP Agent', 'SQL Agent']} pos="top" />
                </div>
                <div className="flex flex-wrap justify-center gap-12 md:gap-32 relative z-10">
                  <DomainNode title="일반기업" agents={['SQL Agent', 'RFP Agent', 'Codebox', 'beast AI Gateway']} pos="bottom" />
                  <DomainNode title="미디어" agents={['SQL Agent', 'TA Agent']} pos="bottom" />
                  <DomainNode title="통신/네트워크" agents={['SQL Agent', 'beast AI Gateway', 'Codebox']} pos="bottom" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-24 px-6 bg-background border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-brand mb-4">솔루션/멀티 에이전트 Use Cases</h2>
          </div>

          <div className="space-y-40">
            {/* Case 01: Works AI */}
            <div className="flex flex-col items-center">
              <p className="text-lg md:text-xl font-medium mb-12 text-center text-foreground">🧐 &quot;회사에서 사용하는 수많은 메뉴를 사내 최적화하여, 한 곳에서 모아 볼 수는 없나요?&quot;</p>
              <div className="grid md:grid-cols-2 gap-12 items-center w-full">
                <div className="order-2 md:order-1">
                  <Badge variant="destructive" className="mb-2">기업의 모든 것을 한 곳에서</Badge>
                  <div className="flex items-center gap-2 mb-6">
                    <h3 className="text-3xl font-bold text-foreground">AI Portal</h3>
                    <span className="text-3xl font-light text-muted-foreground ml-1">Works AI</span>
                    <ChevronRight className="text-muted-foreground ml-1" size={24} />
                  </div>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    AI 챗봇 기반으로 다양한 업무 처리를 지원하는 AI Agent 포털 서비스로 기업 전체 AI 서비스를 통합 관리하고 접근할 수 있는 중앙 플랫폼입니다.
                  </p>
                  <ul className="space-y-4 mb-10 text-foreground">
                    <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" /><span>기본적인 업무 기반에 최적화된 AI Agent 제공</span></li>
                    <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" /><span>업무에 필요한 에이전트를 직접 만들어 사내 공유/활용</span></li>
                    <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" /><span>그룹웨어 위젯 및 메뉴 커스텀을 통해 개인 맞춤형 컨텐츠 제공</span></li>
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    <Tag text="AI 비서+그룹웨어" />
                    <Tag text="맞춤형" />
                    <Tag text="사내 데이터 연동" />
                  </div>
                </div>
                <Card className="order-1 md:order-2 h-64 md:h-96 flex items-center justify-center bg-muted/50">
                  <CardContent className="p-0 flex items-center justify-center h-full" />
                </Card>
              </div>
            </div>

            {/* Case 02: Audit Agent */}
            <div className="flex flex-col items-center">
              <p className="text-lg md:text-xl font-medium mb-12 text-center text-foreground italic">😭 &quot;(국정)감사에 필요한 방대한 자료를 한 번에 분석해서 보고 싶어요&quot;</p>
              <div className="grid md:grid-cols-2 gap-12 items-center w-full">
                <Card className="order-1 md:order-1 h-64 md:h-96 flex items-center justify-center bg-muted/50">
                  <CardContent className="p-0 flex items-center justify-center h-full" />
                </Card>
                <div className="pl-4 order-2 md:order-2">
                  <Badge variant="destructive" className="mb-2">복잡한 국정감사 / 컴플라이언스(Compliance)를 최단 기간에</Badge>
                  <div className="flex items-center gap-2 mb-6">
                    <h3 className="text-4xl font-bold text-foreground tracking-tight">Audit Agent</h3>
                    <ChevronRight className="text-muted-foreground ml-1" size={24} />
                  </div>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    국정감사 / 컴플라이언스 관련 방대한 자료를 분석하고 필요한 정보를 빠르게 찾아냅니다.
                  </p>
                  <ul className="space-y-4 text-foreground">
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" /><span>대량 문서 자동 분석</span></li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" /><span>주요 이슈 및 키워드 추출</span></li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" /><span>관련 자료 연결 및 검색</span></li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" /><span>답변 자료 자동 생성</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Case 03: 지능형 회의록 Agent */}
            <div className="flex flex-col items-center">
              <div className="grid md:grid-cols-2 gap-12 items-center w-full mt-12">
                <div className="pr-4">
                  <Badge variant="destructive" className="mb-2">성능, 편의성, 보안을 모두 갖춘</Badge>
                  <div className="flex items-center gap-2 mb-6">
                    <h3 className="text-4xl font-bold text-foreground tracking-tight">지능형 회의록 Agent</h3>
                    <ChevronRight className="text-muted-foreground ml-1" size={24} />
                  </div>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    회의의 시작부터 끝까지, AI가 알아서 기록하고 정리하는 통합 회의 솔루션입니다.
                  </p>
                  <ul className="space-y-4 text-foreground mb-10">
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" /><span>실시간 음성 인식 및 텍스트 변환</span></li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" /><span>자동 요약 및 액션 아이템 추출</span></li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" /><span>참석자별 발언 구분</span></li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" /><span>다국어 회의 지원</span></li>
                  </ul>
                </div>
                <Card className="w-full h-64 md:h-96 flex flex-col items-center justify-center bg-muted/50">
                  <CardContent className="flex flex-col items-center justify-center">
                    <Monitor size={80} className="text-muted-foreground/50 mb-4" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="mt-28 flex justify-center">
            <Button variant="outline" size="lg" className="px-12 py-3.5 text-lg font-bold">
              AI Agent / Solution 더보기 &gt;
            </Button>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section id="testimonials" className="py-24 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6 px-4">
              <div className="p-2 bg-card rounded-lg border border-border shadow-sm"><Building2 className="text-chart-1" size={32} /></div>
              <span className="text-xl font-bold text-foreground">한국기계산업진흥회</span>
            </div>
            <Card className="w-full rounded-2xl p-10 md:p-14">
              <CardContent className="p-0 text-center">
                <p className="text-lg md:text-2xl font-medium text-muted-foreground leading-relaxed">&quot; 정책 의사결정과 실무자의 분석. 예측 업무를 지원하는 정책 지원형 AI 서비스 구축으로 업무 생산성 강화에 도움이 되었습니다. &quot;</p>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-3 mb-6 px-4">
              <span className="text-xl font-bold text-foreground">경기도</span>
              <div className="p-2 bg-chart-2/10 rounded-lg border border-chart-2/20 shadow-sm"><Map className="text-chart-2" size={32} /></div>
            </div>
            <Card className="w-full rounded-2xl p-10 md:p-14">
              <CardContent className="p-0 text-center">
                <p className="text-lg md:text-2xl font-medium text-muted-foreground leading-relaxed">&quot; 경기도가 보유한 공공데이터를 체계화하고 통합/개방 데이터 플랫폼을 안정적으로 구축하여, 도민들이 손쉽게 공공데이터에 접근/활용할 수 있는 기반을 마련해 주었습니다. &quot;</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why KT DS & Stats */}
      <section id="why" className="py-24 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-20 text-foreground">왜 KT DS와 함께 해야 할까요?</h2>
          <div className="flex flex-col gap-6 mb-32">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
              <div className="w-full md:w-64 h-20 rounded-full flex items-center justify-center shrink-0 bg-primary text-primary-foreground border-2 border-border shadow-sm">
                <div className="text-center">
                  <div className="text-lg font-bold">Retriever / Analyst</div>
                  <div className="text-xs opacity-90 font-medium">분석 · 설계</div>
                </div>
              </div>
              <div className="flex flex-col gap-1 pt-2">
                <h4 className="font-bold text-foreground">데이터 협의체를 통해 데이터 분석 및 선별</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">이를 기반으로 RAG 및 Agent 구현에 최적화된 체계 구축<br />원인 분석, 옵션 비교, 리스크/영향 평가, 계획 수립</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 md:ml-24">
              <div className="w-full md:w-64 h-20 rounded-full flex items-center justify-center shrink-0 bg-primary text-primary-foreground border-2 border-border shadow-sm">
                <div className="text-center">
                  <div className="text-lg font-bold">Writer/Executor</div>
                  <div className="text-xs opacity-90 font-medium">구축</div>
                </div>
              </div>
              <div className="flex flex-col gap-1 pt-2">
                <h4 className="font-bold text-foreground"><span className="text-brand">17년 업력</span>으로 안정성 및 보안성을 갖춘 시스템 구축</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">답변/문서/코드/보고서 작성<br /><span className="font-bold text-foreground">유연한 워크플로우</span> 생성 기능으로 다양한 비즈니스에 최적화</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center border-t border-border pt-24">
            <div className="flex flex-col items-center">
              <span className="text-muted-foreground text-sm font-medium mb-4 italic">IT Engineer</span>
              <div className="text-5xl md:text-7xl font-black text-foreground mb-6">1700</div>
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">IT 신화의 주역<br />Cloud와 AI 기술의 리더</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-muted-foreground text-sm font-medium mb-4 italic">Client</span>
              <div className="text-5xl md:text-7xl font-black text-foreground mb-6">150</div>
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">다양한 분야의<br />글로벌 고객사</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-muted-foreground text-sm font-medium mb-4 italic">Solution</span>
              <div className="text-5xl md:text-7xl font-black text-foreground mb-6">18</div>
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">AX를 리딩할<br />자체 개발 솔루션</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-muted-foreground text-sm font-medium mb-4 italic">AI Agent</span>
              <div className="text-5xl md:text-7xl font-black text-foreground mb-6 font-mono">600+</div>
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">분야별 최적화된<br />자체 개발 에이전트</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Agent Studio */}
      <section id="studio" className="py-24 px-6 bg-muted/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-10">AI Agent 스튜디오</h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            필요한 Agent, Tool, MCP를 빠르게 확인하고 시작하세요.<br className="hidden md:block" />
            쉽게 개발 가능한 AI 아키텍처와 Delivery 가이드를 제공합니다.
          </p>
          <Button variant="outline" size="lg" className="mb-20">
            더보기 <ChevronRight size={18} />
          </Button>

          <div className="grid md:grid-cols-4 gap-8">
            <StudioCard icon={<Settings className="text-chart-1" />} title="Agent 개발" desc="AI Agent 개발을 위한 통합 개발 환경과 도구를 제공합니다." />
            <StudioCard icon={<Box className="text-chart-2" />} title="Core Agent" desc="사전 개발된 Core Agent를 활용하여 빠른 프로토타이핑이 가능합니다." />
            <StudioCard icon={<Rocket className="text-chart-4" />} title="Use Case 패키징" desc="Use case 단위로 패키징된 솔루션을 통해 즉시 배포할 수 있습니다." />
            <StudioCard icon={<BookOpen className="text-chart-2" />} title="Delivery 가이드" desc="AI 아키텍처 소개 및 배포 가이드를 통해 안정적인 운영을 지원합니다." />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-20 px-6 border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-8"><span className="text-3xl font-black text-primary-foreground tracking-tighter uppercase">kt ds</span></div>
              <p className="text-sm text-primary-foreground/80 leading-relaxed mb-8 max-w-xs">비즈니스를 위한 엔터프라이즈급 AI Agent 플랫폼<br />Biz.AI와 함께 데이터 혁신을 시작하세요.</p>
              <div className="flex gap-4">
                <a href="#" className="size-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"><Linkedin size={18} /></a>
                <a href="#" className="size-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"><Youtube size={18} /></a>
                <a href="#" className="size-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"><Mail size={18} /></a>
              </div>
            </div>
            <div>
              <h5 className="text-primary-foreground font-bold mb-8 uppercase text-xs tracking-widest">AI 솔루션</h5>
              <ul className="space-y-4 text-sm font-medium text-primary-foreground/80">
                <li><a href="#" className="hover:text-primary-foreground transition-colors">고객지원·VOC 자동화</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">데이터 기반 의사결정</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">내부 운영·업무 자동화</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">기획·보고·문서 업무</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">리스크·품질 관리</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-primary-foreground font-bold mb-8 uppercase text-xs tracking-widest">제품</h5>
              <ul className="space-y-4 text-sm font-medium text-primary-foreground/80">
                <li><a href="#" className="hover:text-primary-foreground transition-colors">데이터 Agent</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">분류·분석 Agent</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">리포트·문서 Agent</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">운영·지원 Agent</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">AI Agent 스튜디오</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-primary-foreground font-bold mb-8 uppercase text-xs tracking-widest">회사</h5>
              <ul className="space-y-4 text-sm font-medium text-primary-foreground/80">
                <li><a href="#" className="hover:text-primary-foreground transition-colors">우수 사례</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">가격 안내</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">문서</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">고객 지원</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">파트너십</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-bold uppercase tracking-wider text-primary-foreground/70">
            <p>© 2026 AI Biz Portal. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-primary-foreground transition-colors">개인정보처리방침</a>
              <a href="#" className="hover:text-primary-foreground transition-colors">이용약관</a>
              <a href="#" className="hover:text-primary-foreground transition-colors">보안정책</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Studio Card Component
const StudioCard = ({ icon, title, desc }: { icon: React.ReactElement; title: string; desc: string }) => (
  <Card className="p-10 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center md:items-start text-center md:text-left">
    <div className="size-14 bg-muted rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <h4 className="text-xl font-bold text-foreground mb-4">{title}</h4>
    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
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

const DomainNode = ({ title, agents, pos }: { title: string; agents: string[]; pos: 'top' | 'bottom' }) => (
  <div className="flex flex-col items-center relative group">
    {pos === 'top' && (<div className="absolute -top-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 w-max">{agents.map((agent, i) => (<Badge key={i} variant="secondary" className="text-[11px] md:text-xs">{agent}</Badge>))}</div>)}
    <div className="size-24 md:size-32 bg-card rounded-full flex items-center justify-center relative shadow-sm border border-border group-hover:shadow-md transition-all duration-300 ring-4 ring-chart-1/20">
      <span className="text-lg md:text-xl font-bold text-foreground z-10">{title}</span>
    </div>
    {pos === 'bottom' && (<div className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 w-max">{agents.map((agent, i) => (<Badge key={i} variant="secondary" className="text-[11px] md:text-xs">{agent}</Badge>))}</div>)}
  </div>
);

const Tag = ({ text }: { text: string }) => (<Badge variant="outline" className="border-brand text-brand rounded-full px-4 py-1.5 font-medium">{text}</Badge>);

export default App;
