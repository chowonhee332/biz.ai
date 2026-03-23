import { MEETING_MINUTES_DETAIL } from './details/meeting-minutes';
import { AION_PUBLIC_SECTOR_DETAIL } from './details/aion-public-sector';
import { AION_FINANCE_DETAIL } from './details/aion-finance';
import { AUTOBUILDER_DETAIL } from './details/autobuilder';
import { BEAST_GATEWAY_DETAIL } from './details/beast-gateway';
import { CLOUDWIZ_DETAIL } from './details/cloudwiz';
import { WORKS_AI_HANWHA_DETAIL } from './details/works-ai-hanwha';
import { NATIONAL_ASSEMBLY_AGENT_DETAIL } from './details/national-assembly-agent';

export interface UseCaseItem {
    타이틀: string;
    산업군: string;
    태그: string;
    카테고리: string;
    이미지: string;
    설명: string;
    상세내용: any; // PDF 원문 전체 내용을 담은 객체
}

export const USE_CASES: UseCaseItem[] = [
    {
        타이틀: "AI 회의록 고객사례",
        산업군: "서비스/기업",
        태그: "AI 회의록",
        카테고리: "내부 업무 처리 향상",
        이미지: "/usecase/meet.jpg",
        설명: "겹침 발화까지 놓치지 않는 화자 분리와 온프레미스 보안으로, 회의 생산성의 기준을 바꾸다",
        상세내용: MEETING_MINUTES_DETAIL
    },
    {
        타이틀: "AI:ON-U 공공기관 데이터 분석 챗봇 구축 사례",
        산업군: "공공기관",
        태그: "AI:ON-U",
        카테고리: "데이터 분석",
        이미지: "/usecase/aionu_1.jpg",
        설명: "데이터 기반 정책 의사결정과 민원 대응 혁신을 동시에 잡다",
        상세내용: AION_PUBLIC_SECTOR_DETAIL
    },
    {
        타이틀: "AI:ON-U 금융사 지능형 검색 챗봇 구축 사례",
        산업군: "금융",
        태그: "AI:ON-U",
        카테고리: "데이터 분석",
        이미지: "/usecase/aionu_2.jpg",
        설명: '상품·약관·리서치·민원 응답까지, "한 번에 찾고 바로 답한다"',
        상세내용: AION_FINANCE_DETAIL
    },
    {
        타이틀: "AutoBuilder",
        산업군: "통신/ICT",
        태그: "Codebox",
        카테고리: "내부 업무 처리 향상",
        이미지: "/usecase/code.jpg",
        설명: "대규모 레거시 전환 공수 절감과 Cloud 전환 경쟁력 강화를 동시에 실현하다",
        상세내용: AUTOBUILDER_DETAIL
    },
    {
        타이틀: "Beast AI 공공·기업용 AI Gateway 구축 사례",
        산업군: "공공/기업",
        태그: "Beast AI Gateway",
        카테고리: "강력한 보안",
        이미지: "/usecase/beast.jpg",
        설명: "엔터프라이즈 전역의 AI 활용을 표준화하고, 보안·규제 환경에서도 확장 가능한 AI 운영 체계를 확보하다",
        상세내용: BEAST_GATEWAY_DETAIL
    },
    {
        타이틀: "CloudWiz",
        산업군: "제조",
        태그: "Cloudwiz",
        카테고리: "리스크 관리 효율화",
        이미지: "/usecase/CloudWiz.jpg",
        설명: "비용·보안·운영 자동화를 한 번에 잡은 멀티/하이브리드 클라우드 통합관리",
        상세내용: CLOUDWIZ_DETAIL
    },
    {
        타이틀: "Works AI",
        산업군: "기업",
        태그: "Works AI",
        카테고리: "내부 업무 처리 향상",
        이미지: "/usecase/works_ai.png",
        설명: "사내 AI Agent Portal로 전사 업무 혁신을 현실로 만들다",
        상세내용: WORKS_AI_HANWHA_DETAIL
    },
    {
        타이틀: "K사 국회업무 AI Agent 구축 사례",
        산업군: "공공",
        태그: "국회업무 Agent",
        카테고리: "내부 업무 처리 향상",
        이미지: "/usecase/aiagent.jpg",
        설명: "국회업무 대응의 속도·정확도·품질을 한 번에 끌어올린 디지털 혁신 사례",
        상세내용: NATIONAL_ASSEMBLY_AGENT_DETAIL
    }
];



export const USE_CASE_CATEGORIES = ["전체", "데이터 분석", "보고 / 의사결정 향상", "리스크 관리 효율화", "강력한 보안", "내부 업무 처리 향상"];

export const USE_CASE_CATEGORY_COLORS: Record<string, { text: string; bg: string; border: string }> = {
    "데이터 분석": { text: "text-emerald", bg: "bg-emerald/10", border: "border-emerald/20" },
    "보고 / 의사결정 향상": { text: "text-brand-secondary", bg: "bg-brand-primary/10", border: "border-brand-primary/20" },
    "리스크 관리 효율화": { text: "text-sky", bg: "bg-sky/10", border: "border-sky/20" },
    "강력한 보안": { text: "text-purple", bg: "bg-purple/10", border: "border-purple/20" },
    "내부 업무 처리 향상": { text: "text-brand-primary", bg: "bg-brand-primary/10", border: "border-brand-primary/20" }
};
