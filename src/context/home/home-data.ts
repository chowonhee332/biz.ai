// ─── GNB ─────────────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { name: 'AI 에이전트', path: '/ai-agents', id: 'ai-agents' },
  { name: 'AI 솔루션', path: '/ai-solutions', id: 'ai-solutions' },
  { name: '고객 사례', path: '/use-cases', id: 'use-cases' },
  { name: '새로운 소식', path: '/news', id: 'news' },
] as const;

export const NAV_CTA_LINKS = [
  { label: 'kt ds 홈페이지', href: 'https://www.ktds.com/' },
  { label: 'AI Agent 스튜디오', href: 'https://studio.abclab.ktds.com/auth/login' },
] as const;

// ─── Hero 슬라이드 ────────────────────────────────────────────────────────────

export const HERO_SLIDES = [
  {
    category: 'Biz.AI',
    main: ['kt ds의 기업용 AI 서비스로', '비즈니스를 성장시키세요'] as [string, string],
    sub: '귀사에 필요한 AI Agents만 쏙쏙 모아, 기업 환경에 최적화된 솔루션을 만들어요.\n실제 성과로 이어지는 변화를 경험하세요.',
    highlight: 1,
    link: '/ai-agents',
  },
  {
    category: '국정감사 Agent',
    main: ['빠른 준비, 정확한 대응', '국정감사 AI Agent로 끝!'] as [string, string],
    sub: '국정감사 담당자의 성향을 파악하여 AI가 필요한 내용을 정리하고,\n많은 자료를 일일이 찾지 않아도, 중요한 내용만 빠르게 확인할 수 있도록 도와줍니다.',
    highlight: 1,
    link: '/ai-agents?tab=Audit Agent',
  },
  {
    category: 'Works AI',
    main: ['내 일을 대신하는 개인 비서', 'AI 사내 업무 포털'] as [string, string],
    sub: '여러 시스템 이동 없이, 필요한 정보 제공부터 업무 처리까지,\nAI 사내 업무 포털로 복잡한 업무와 흩어진 정보를 한 곳에 모아\n더 쉽고 빠르게 일할 수 있도록 도와줍니다.',
    highlight: 1,
    link: '/ai-agents?tab=AI 포털',
  },
  {
    category: 'AI:ON-U',
    main: ['비즈니스 맞춤형 AI Agent 구축', '노코딩 Agent Builder'] as [string, string],
    sub: 'Agent Builder로 코딩 없이 간단한 설정만으로 필요한 기능만 선택해\n기업 업무에 필요한 AI Agent를 바로 만들고 빠르게 구축/운영할 수 있습니다.',
    highlight: 1,
    link: '/ai-solutions?tab=AI:ON-U',
  },
];

// ─── Use Cases 섹션 ───────────────────────────────────────────────────────────

export const HOME_USE_CASE = {
  sectionLabel: '고객 사례',
  sectionTitle: 'Use Cases',
  quote: '질문만으로 원하는 데이터(문서, 통계)를 바로 찾고,\n3개월 안에 업무에 적용한 AI 구축 사례',
  company: '한국기계산업진흥원',
  image: '/images/autobuilder.jpeg',
  description: [
    '수많은 문서와 통계 데이터 속에서 원하는 정보를 찾기 어려운 환경에서, Works AI와 SQL Agent를 통해 질문만으로 필요한 데이터를 바로 확인할 수 있는 환경 구축하였습니다. AI:ON-U를 활용해 맞춤형 AI Agent를 빠르게 생성하여, 단기간 내 업무에 적용했습니다.',
    '그 결과, 복잡한 데이터 탐색 과정 없이도 원하는 결과를 즉시 확인할 수 있게 되었고 약 3개월 내에 실제 업무에 활용 가능한 AI 기반 업무 환경을 구현했습니다.',
  ],
  tags: ['#구축 기간 3개월', '#데이터 접근성과 활용도 향상'],
  bullets: [
    '자연어로 질문하면 관련 데이터와 결과를 바로 제공',
    '문서, 통계, 데이터베이스를 한 번에 통합 검색',
    '결과뿐만 아니라 출처 문서와 데이터 함께 제시',
    '단순 조회가 아닌 실제 업무 흐름에 맞춘 Agent 제공',
    '단계별 구축 없이도 단기간 내 적용 가능',
  ],
  venn: {
    desktop: [
      { cx: 350, cy: 210, label: 'AI:ON-U' },
      { cx: 170, cy: 522, label: 'AI Works' },
      { cx: 530, cy: 522, label: 'SQL Agent' },
    ],
    mobile: [
      { cx: 300, cy: 150, label: 'AI:ON-U' },
      { cx: 150, cy: 410, label: 'AI Works' },
      { cx: 450, cy: 410, label: 'SQL Agent' },
    ],
  },
};

// ─── Why kt ds 섹션 ───────────────────────────────────────────────────────────

export const HOME_WHY_KTDS = {
  sectionLabel: '왜 kt ds와 함께 해야 할까요?',
  sectionTitle: 'Why kt ds',
  description: '기업의 복잡한 요구사항을 기획부터 구축, 검증, 운영까지\n표준화된 프로세스로 완성합니다.',
  steps: [
    {
      num: '01',
      title: '분석/설계',
      subtitle: 'Retriever,\nAnalyst',
      bullets: [
        '데이터 협의체 기반 분석 및 선별',
        '이를 기반으로 RAG 및 Agent 구현에 최적화된 체계 구축',
        '원인 분석, 옵션 비교, 리스크/영향 평가, 계획 수립',
      ],
    },
    {
      num: '02',
      title: '구축',
      subtitle: 'Writer,\nExecutor',
      bullets: [
        '17년 업력으로 안정성 및 보안성을 갖춘 시스템 구축',
        '답변/문서/코드/보고서 작성',
        '유연한 워크플로우 생성 기능으로 다양한 비즈니스에 최적화',
      ],
    },
    {
      num: '03',
      title: '테스트 및 이행',
      subtitle: 'Validator,\nQuality',
      bullets: [
        '단계적인 성능 검증 및 최적화',
        '검증, 규정/정책/보안/품질 체크, 근거 링크',
        '피드백 반영, 프롬프트/룰/플레이북/지식 업데이트',
      ],
    },
    {
      num: '04',
      title: '안정화',
      subtitle: 'Maintainer,\nSRE',
      bullets: [
        'KPI/SLA/SLO 모니터링, 이상탐지, 알림/에스컬레이션',
        '의사결정 근거·승인·변경 이력 기록(감사 대응)',
        '사용자/관리자 매뉴얼 제공 및 교육',
      ],
    },
  ],
};

// ─── 고객사 로고 ──────────────────────────────────────────────────────────────

export const HOME_LOGOS: { name: string; logo: string; scale: number }[] = [
  { name: 'KT', logo: '/logos/kt.png', scale: 1 },
  { name: '경기도', logo: '/logos/gyeonggido.png', scale: 1 },
  { name: '현대그린푸드', logo: '/logos/hwell.png', scale: 1.2 },
  { name: '한국철도공사', logo: '/logos/kr.png', scale: 1.2 },
  { name: '건국대학교 미래지식교육원', logo: '/logos/konmi.png', scale: 1.2 },
  { name: '트루엔', logo: '/logos/true.png', scale: 1.2 },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export const HOME_FAQ: { q: string; a: string }[] = [
  {
    q: '기존 시스템과의 연계는 어떻게 지원하나요?',
    a: 'REST API, DB 커넥터, 파일 기반 연계 등 표준 인터페이스를 지원합니다. ERP, 그룹웨어, 데이터 웨어하우스 등 기존 시스템과의 통합 구성이 가능합니다.',
  },
  {
    q: '온프레미스 환경에서도 구축이 가능한가요?',
    a: '네. 온프레미스, 프라이빗 클라우드, 퍼블릭 클라우드 환경 모두 지원합니다. 기업 보안 정책에 따라 망분리 환경 구성도 가능합니다.',
  },
  {
    q: '데이터는 외부 전송이 가능한가요?',
    a: '데이터 처리 방식은 구축 형태에 따라 달라집니다. 기업 내부 처리 구조 설계가 가능하며, 데이터 저장·전송·로그 정책은 고객사 기준에 맞춰 설정됩니다.',
  },
  {
    q: 'LLM 및 모델 구조는 어떻게 구성되나요?',
    a: '멀티에이전트 기반 아키텍처로 구성되며, 업무 목적에 따라 다양한 모델을 선택·조합할 수 있습니다. 사내 전용 모델 연계 또는 외부 API 연동도 지원합니다.',
  },
  {
    q: '확장성과 운영 관리는 어떻게 이루어지나요?',
    a: '모듈형 구조로 설계되어 기능 단위 확장이 가능하며, 관리 콘솔을 통해 사용자 권한, 사용 이력, Agent 운영 현황을 통합 관리할 수 있습니다.',
  },
];

// ─── CTA 섹션 ─────────────────────────────────────────────────────────────────

export const HOME_CTA = {
  image: '/images/meeting-bg.jpg',
  heading: 'Biz.AI와 함께\nAI 혁신을 지금 실행하세요.',
  buttonLabel: '솔루션 문의',
  buttonHref: 'mailto:bizai@kt.com',
};

// ─── 카드 ─────────────────────────────────────────────────────────────────────

export interface HomeCard {
  image: string;
  title: string;
  desc: string;
  highlight: string;
  link?: string;
}

export const AGENT_CARDS: HomeCard[] = [
  {
    image: "/ai-service-logos/logo_1.png",
    title: "WorksAI",
    desc: "AI Agent 기반으로 다양한 업무처리를 지원하는 사내 AI Agent Portal",
    highlight: "#효율 200% 향상",
    link: "/ai-agents?tab=AI 포털"
  },
  {
    image: "/ai-service-logos/logo_2.png",
    title: "AI 회의록",
    desc: "음성 기반 회의 자동 기록 · 요약 · 업무 추출 AI 서비스",
    highlight: "#1분 회의록",
    link: "/ai-agents?tab=AI 회의록"
  },
  {
    image: "/ai-service-logos/logo_3.png",
    title: "국정감사 Agent",
    desc: "국정감사 자료 분석부터 핵심 이슈 도출까지 지원하는 AI 서비스",
    highlight: "#준비시간 70% 단축",
    link: "/ai-agents?tab=Audit Agent"
  },
  {
    image: "/ai-service-logos/logo_4.png",
    title: "RFP Agent",
    desc: "제안요청서(RFP) 분석, 요구사항 정리, 제안서 초안 작성을 지원하는 AI 서비스",
    highlight: "#작성시간 60% 절감",
    link: "/ai-agents?tab=RFP Agent"
  }
];

export const SOLUTION_CARDS: HomeCard[] = [
  {
    image: "/ai-service-logos/logo_5.png",
    title: "AI:ON-U",
    desc: "엔터프라이즈 맞춤형 AI Agent를 빠르게 구축하는 No-Code 기반 Agent Builder",
    highlight: "#3분 완성",
    link: "/ai-solutions?tab=AI:ON-U"
  },
  {
    image: "/ai-service-logos/logo_6.png",
    title: "Beast AI Gateway",
    desc: "엔터프라이즈용 AI 기술, API를 통합 관리하는 솔루션",
    highlight: "#AI 기능 표준화",
    link: "/ai-solutions?tab=Beast AI Gateway"
  },
  {
    image: "/ai-service-logos/logo_7.png",
    title: "Codebox",
    desc: "폐쇄형 설치형 AI 코드 개발 어플라이언스",
    highlight: "#보안 특화 개발",
    link: "/ai-solutions?tab=Codebox"
  },
  {
    image: "/ai-service-logos/logo_8.png",
    title: "CloudWiz",
    desc: "클라우드 운영 효율화와 자동화를 지원하는 관리 서비스",
    highlight: "#비용 30% 절감",
    link: "/ai-solutions?tab=CloudWiz"
  }
];
