import { PlatformProduct } from './types';
import { aiPortal } from './details/ai-portal';
import { meetingNotes } from './details/meeting-notes';
import { auditAgent } from './details/audit-agent';
import { rfpAgent } from './details/rfp-agent';

export const AGENT_PAGE_CONFIG = {
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
