import { PlatformProduct } from '../types';
import { aiPortal } from './details/ai-portal';
import { meetingNotes } from './details/meeting-notes';
import { auditAgent } from './details/audit-agent';
import { rfpAgent } from './details/rfp-agent';

export const AI_AGENTS_CONFIG = {
    hero: {
        title: "AI Agents",
        description: "비즈니스 현장에 바로 투입되는 목적형 AI 에이전트"
    },
    sidebarItems: [
        "AI 회의록",
        "AI 포털",
        "Audit Agent",
        "RFP Agent"
    ],
    products: {
        "AI 회의록": meetingNotes,
        "AI 포털": aiPortal,
        "Audit Agent": auditAgent,
        "RFP Agent": rfpAgent
    } as Record<string, PlatformProduct>
};
