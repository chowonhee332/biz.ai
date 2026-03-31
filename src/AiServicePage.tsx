import { useState, useEffect } from 'react';
import { useScroll } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import { PlatformProduct } from './context/types';
import Layout from './components/Layout';
import ServiceHero from './components/service-page/ServiceHero';
import { ServiceMobileTabs, ServiceDesktopSidebar } from './components/service-page/ServiceNav';
import ServiceContent from './components/service-page/ServiceContent';

interface PageConfig {
    hero: { title: string; description: string };
    sidebarItems: string[];
    products: Record<string, PlatformProduct>;
}

interface AiServicePageProps {
    config: PageConfig;
    activePage: 'ai-agents' | 'ai-solutions';
    silkColor?: string;
    silkScale?: number;
}

export default function AiServicePage({ config, activePage, silkColor = '#c8d8ff', silkScale = 0.6 }: AiServicePageProps) {
    const { scrollYProgress } = useScroll();
    const [searchParams] = useSearchParams();
    const tabParam = searchParams.get('tab');
    const initialTab = (tabParam && config.sidebarItems.includes(tabParam)) ? tabParam : config.sidebarItems[0];
    const [activeTab, setActiveTab] = useState(initialTab);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [activeTab]);

    const currentContent = config.products[activeTab];

    return (
        <Layout activePage={activePage} scrollLineProgress={scrollYProgress}>
            <section className="pb-32 flex-1 relative">
                <ServiceHero
                    title={config.hero.title}
                    description={config.hero.description}
                    activeTab={activeTab}
                    silkColor={silkColor}
                    silkScale={silkScale}
                />

                <ServiceMobileTabs
                    items={config.sidebarItems}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                <div className="max-w-[1280px] mx-auto container-responsive relative z-10 pt-[24px]">
                    <div className="flex flex-col lg:flex-row gap-[100px]">
                        <ServiceDesktopSidebar
                            items={config.sidebarItems}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                        />

                        <main className="flex-1 min-w-0 pt-8">
                            {currentContent && (
                                <ServiceContent activeTab={activeTab} content={currentContent} />
                            )}
                        </main>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
