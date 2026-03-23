import { PlatformProduct } from './types';
import { aiPortal } from './details/ai-portal';
import { meetingNotes } from './details/meeting-notes';
import { aionU } from './details/aion-u';
import { auditAgent } from './details/audit-agent';
import { autoBuilder } from './details/auto-builder';
import { beastGateway } from './details/beast-gateway';
import { cloudwiz } from './details/cloudwiz';
import { codebox } from './details/codebox';
import { rfpAgent } from './details/rfp-agent';

export const PLATFORM_PAGE_CONFIG = {
    hero: {
        title: "AI Products / Service",
        description: "Biz.AI의 멀티 에이전트 플랫폼은 각 산업 분야에 최적화된 전문 AI 에이전트들을 통해 비즈니스 혁신을 지원합니다."
    },
    sidebarItems: [
        "AI Portal",
        "AI 회의록",
        "AI:ON-U",
        "Audit Agent",
        "Auto Builder",
        "Beast AI Gateway",
        "CloudWiz",
        "Codebox",
        "RFP Agent"
    ],
    products: {
        "AI Portal": aiPortal,
        "AI 회의록": meetingNotes,
        "AI:ON-U": aionU,
        "Audit Agent": auditAgent,
        "Auto Builder": autoBuilder,
        "Beast AI Gateway": beastGateway,
        "CloudWiz": cloudwiz,
        "Codebox": codebox,
        "RFP Agent": rfpAgent
    } as Record<string, PlatformProduct>
};