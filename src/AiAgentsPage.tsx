import AiServicePage from './AiServicePage';
import { AI_AGENTS_CONFIG } from './context/ai-agents/index';

export default function AiAgentsPage() {
    return <AiServicePage config={AI_AGENTS_CONFIG} activePage="ai-agents" />;
}
