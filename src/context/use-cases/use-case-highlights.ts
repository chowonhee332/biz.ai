import { Utensils, Search, Monitor } from 'lucide-react';
import React from 'react';

export interface UseCaseHighlight {
    id: string;
    titlePrefix: string;
    titleSuffix?: string;
    question: string;
    desc: string;
    tags: string[];
    themeColor: 'blue' | 'sky' | 'emerald';
    highlightIndex: number;
    features: string[];
    iconName: 'Utensils' | 'Search' | 'Monitor';
    image: string;
    cursorName: string;
}

export const USE_CASE_HIGHLIGHTS: UseCaseHighlight[] = [
    {
        id: "works-ai",
        titlePrefix: "AI Portal",
        titleSuffix: "WorksAI",
        question: "회사에서 사용하는\n많은 메뉴를\n사내 최적화하여\n한 곳에서 모아 볼 수는\n없나요?",
        desc: "AI 챗봇 기반 업무 처리를 지원하는 AI Agent 포털 서비스로 기업 전체 AI 서비스를 통합 관리하고 접근할 수 있는 중앙 플랫폼입니다.",
        tags: ["AI 비서+그룹웨어", "맞춤형"],
        themeColor: "blue",
        highlightIndex: 3,
        features: [
            "기본적인 업무 기반에 최적화된 AI Agent 제공",
            "업무에 필요한 에이전트를 직접 만들어 사내 공유/ 활용",
            "그룹웨어 위젯 및 메뉴 커스텀을 통해 개인 맞춤 컨텐츠 제공"
        ],
        iconName: 'Utensils',
        image: "/works.png",
        cursorName: "WorksAI"
    },
    {
        id: "audit-agent",
        titlePrefix: "Audit Agent",
        question: "국정 감사에 필요한\n방대한 자료를\n한 번에 분석해서\n보고 싶어요!",
        desc: "방대한 기업 규제 및 감사 문서를 AI가 신속히 분석하여, 법적 리스크를 사전에 파악하고 완벽한 컴플라이언스 대응을 지원합니다.",
        tags: ["자료검색", "감사/리스크"],
        themeColor: "sky",
        highlightIndex: 2,
        features: [
            "사내 규정 및 가이드라인 기반의 AI 감사 수행",
            "키워드/의미 기반의 빠른 법령 및 판례 검색",
            "감사 보고서 자동 초안 작성 및 리스크 등급 분류"
        ],
        iconName: 'Search',
        image: "/works.png",
        cursorName: "Audit"
    },
    {
        id: "meeting-agent",
        titlePrefix: "지능형 회의록 Agent",
        question: "너무나 긴 회의시간....\n핵심 내용만 쏙쏙\n뽑아볼 순 없나요?",
        desc: "음성 인식(STT)과 NLP를 결합하여 회의 중 나오는 화자를 구분하고, 자동으로 액션 아이템을 추출합니다.",
        tags: ["음성인식", "업무추출"],
        themeColor: "emerald",
        highlightIndex: 1,
        features: [
            "실시간 음성 인식 및 화자 분리 기록",
            "회의 내용 자동 요약 및 주요 의사결정 사항 추출",
            "참석자 대상 회의록 자동 메일/메신저 발송 연동"
        ],
        iconName: 'Monitor',
        image: "/works.png",
        cursorName: "Meeting"
    }
];
