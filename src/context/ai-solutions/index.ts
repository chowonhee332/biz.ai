import { PlatformProduct } from '../types';
import { aionU } from './details/aion-u';
import { autoBuilder } from './details/auto-builder';
import { beastGateway } from './details/beast-gateway';
import { cloudwiz } from './details/cloudwiz';
import { codebox } from './details/codebox';

export const AI_SOLUTIONS_CONFIG = {
    hero: {
        title: "AI Solutions",
        description: "엔터프라이즈 AI 도입·운영·거버넌스를 위한 플랫폼 솔루션"
    },
    sidebarItems: [
        "AI:ON-U",
        "Auto Builder",
        "Beast AI Gateway",
        "CloudWiz",
        "Codebox"
    ],
    products: {
        "AI:ON-U": aionU,
        "Auto Builder": autoBuilder,
        "Beast AI Gateway": beastGateway,
        "CloudWiz": cloudwiz,
        "Codebox": codebox
    } as Record<string, PlatformProduct>
};
