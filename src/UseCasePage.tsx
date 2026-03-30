import { useState } from 'react';
import { useScrollToTop } from './lib/useScrollToTop';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import { USE_CASES, USE_CASE_CATEGORIES, USE_CASE_CATEGORY_COLORS } from '@/context/use-cases/use-case-data';
import Layout from './components/Layout';
import { useTheme } from './context/ThemeContext';
import Silk from './components/Silk';

export default function UseCasePage() {
    const { isDark } = useTheme();
    const [activeCategory, setActiveCategory] = useState(USE_CASE_CATEGORIES[0]);
    const navigate = useNavigate();

    useScrollToTop();

    return (
        <Layout activePage="use-cases">

            {/* Content Body */}
            <section className="pb-32 flex-1 relative">
                {/* Hero Banner with Silk */}
                <div className="relative overflow-hidden bg-[#3a3a3a] mx-3 mt-[68px] mb-3 rounded-[28px] h-[300px] flex items-center justify-center">
                    <div className="absolute inset-0 z-0">
                        <Silk speed={1} scale={0.6} color="#b8e4ff" noiseIntensity={1.2} rotation={5} />
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative z-10 text-center px-6"
                    >
                        <h1 className="text-heading-lg md:text-display-sm lg:text-display-md font-extrabold tracking-tight leading-tight font-display text-white">
                            Use Cases
                        </h1>
                        <p className="mt-4 text-[16px] text-white font-normal">다양한 산업과 업무 영역에서 검증된 AI 혁신 사례를 만나보세요</p>
                    </motion.div>
                </div>

                {/* 카테고리 탭 - Sticky 적용 (풀 너비 라인) */}
                <div id="tab-sentinel" />
                <div className="z-40 border-b border-border-light mb-12">
                    <div className="max-w-[1280px] mx-auto container-responsive flex items-center gap-8 h-[66px] overflow-x-auto no-scrollbar whitespace-nowrap">
                        {USE_CASE_CATEGORIES.map((category) => (
                            <Button
                                key={category}
                                variant="ghost"
                                rounded="none"
                                onClick={() => setActiveCategory(category)}
                                className={`relative h-full !text-[18px] transition-colors flex items-center px-1 cursor-pointer hover:!bg-transparent focus-visible:ring-0 focus-visible:outline-none ${activeCategory === category
                                    ? "text-text-primary font-bold"
                                    : "text-[#666666] font-bold hover:text-text-secondary"
                                    }`}
                            >
                                {category}
                                {activeCategory === category && (
                                    <motion.div
                                        layoutId="activeCategoryUseCase"
                                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-primary rounded-full"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="max-w-[1280px] mx-auto container-responsive">

                    {/* Card Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-[60px]">
                        {
                            USE_CASES.filter(item => activeCategory === "전체" || item.카테고리 === activeCategory).map((item, i) => (
                                <div
                                    key={i}
                                    onClick={() => navigate(`/use-cases/${i + 1}`, { state: { news: item } })}
                                    className="group cursor-pointer flex flex-col"
                                >
                                    <div className="relative aspect-video rounded-[20px] overflow-hidden mb-5 bg-bg-surface">
                                        <img
                                            src={item.이미지}
                                            alt={item.타이틀}
                                            loading="lazy"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="pt-2 px-1 flex flex-col gap-2.5">
                                        <span className={`text-[16px] font-medium ${USE_CASE_CATEGORY_COLORS[item.카테고리]?.text || 'text-brand-primary'}`}>
                                            {item.카테고리}
                                        </span>
                                        <h3 className="text-text-primary text-[22px] font-bold leading-snug whitespace-pre-line">
                                            {item.상세내용?.title || item.타이틀}
                                        </h3>
                                        <p className="text-[#888888] text-[16px] leading-relaxed line-clamp-2 font-normal">
                                            {item.상세내용?.header || item.설명}
                                        </p>
                                        <span className="text-[14px] font-medium px-3 py-1 rounded-full mt-0.5 self-start" style={{ backgroundColor: isDark ? '#222222' : '#f6f6f6', color: isDark ? '#FFFFFF' : undefined }}>
                                            #{item.태그}
                                        </span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

        </Layout>
    );
}

