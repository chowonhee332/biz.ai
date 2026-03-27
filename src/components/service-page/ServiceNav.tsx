import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';

interface ServiceNavProps {
    items: string[];
    activeTab: string;
    onTabChange: (tab: string) => void;
}

/** 모바일용 가로 탭 (lg 이상에서 숨김) */
export function ServiceMobileTabs({ items, activeTab, onTabChange }: ServiceNavProps) {
    return (
        <div className="lg:hidden z-40 border-b border-border-light mb-12 relative">
            <div className="max-w-[1280px] mx-auto container-responsive flex items-center gap-8 h-[66px] overflow-x-auto no-scrollbar whitespace-nowrap">
                {items.map((item) => (
                    <Button
                        key={item}
                        variant="ghost"
                        onClick={() => onTabChange(item)}
                        className={`relative h-full !text-[18px] transition-colors flex items-center px-1 cursor-pointer hover:!bg-transparent focus-visible:ring-0 focus-visible:outline-none ${
                            activeTab === item
                                ? 'text-text-primary font-bold'
                                : 'text-text-dim/60 font-bold hover:text-text-secondary'
                        }`}
                    >
                        {item}
                        {activeTab === item && (
                            <motion.div
                                layoutId="activePlatformTab"
                                className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-primary rounded-full"
                            />
                        )}
                    </Button>
                ))}
            </div>
        </div>
    );
}

/** 데스크탑용 sticky 사이드바 (lg 미만에서 숨김) */
export function ServiceDesktopSidebar({ items, activeTab, onTabChange }: ServiceNavProps) {
    return (
        <aside className="hidden lg:block lg:w-[240px] shrink-0">
            <div className="flex flex-col gap-2 sticky top-[100px]">
                {items.map((item) => (
                    <Button
                        key={item}
                        variant={activeTab === item ? 'default' : 'ghost'}
                        onClick={() => onTabChange(item)}
                        className={`w-full justify-start px-5 h-[48px] !text-body font-bold transition-all cursor-pointer rounded-lg ${
                            activeTab === item
                                ? 'bg-brand-primary text-white'
                                : 'text-text-dim/60 hover:text-text-secondary hover:bg-bg-surface'
                        }`}
                    >
                        {item}
                    </Button>
                ))}
            </div>
        </aside>
    );
}
