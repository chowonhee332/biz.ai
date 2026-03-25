import AiServicePage from './AiServicePage';
import { AI_SOLUTIONS_CONFIG } from './context/ai-solutions/index';

export default function AiSolutionsPage() {
    return <AiServicePage config={AI_SOLUTIONS_CONFIG} activePage="ai-solutions" silkColor="#c8f0e8" silkScale={0.6} />;
}
