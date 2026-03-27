export interface HomeCard {
  image: string;
  title: string;
  desc: string;
  highlight: string;
}

export const AGENT_CARDS: HomeCard[] = [
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
];

export const SOLUTION_CARDS: HomeCard[] = [
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
];
