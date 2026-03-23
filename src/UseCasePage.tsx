import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import { USE_CASES, USE_CASE_CATEGORIES, USE_CASE_CATEGORY_COLORS } from '@/context/use-cases/use-case-data';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Silk from '@/components/Silk';

export default function UseCasePage() {
    const [activeCategory, setActiveCategory] = useState(USE_CASE_CATEGORIES[0]);
    const [tabSticky, setTabSticky] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const sentinel = document.getElementById('tab-sentinel');
        if (!sentinel) return;
        const observer = new IntersectionObserver(
            ([entry]) => setTabSticky(!entry.isIntersecting),
            { threshold: 0, rootMargin: '-72px 0px 0px 0px' }
        );
        observer.observe(sentinel);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen text-text-primary font-pretendard flex flex-col" style={{ backgroundColor: '#0A0A0A' }}>
            {/* GNB */}
            <Navbar activePage="use-cases" />

            {/* Content Body */}
            <section className="pt-48 pb-32 flex-1 relative">
                <div className="absolute inset-0 z-0" style={{ height: '400px' }}>
                    <Silk
                        speed={3.5}
                        scale={0.8}
                        color="#d4f0e8"
                        noiseIntensity={2.7}
                        rotation={4.8}
                    />
                </div>
                <div className="absolute inset-0 z-[1]" style={{ height: '400px', background: 'linear-gradient(to bottom, rgba(10,10,10,0.1) 0%, rgba(10,10,10,1) 100%)' }} />
                {/* Header Section */}
                <div className="max-w-[1280px] mx-auto container-responsive mb-20 relative z-10">
                    <div className="flex justify-between items-end">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <span className="text-body text-[#999999] mb-3 block font-medium">고객 사례</span>
                            <h1 className="text-heading-lg lg:text-display-md font-bold text-white tracking-tight leading-tight">
                                Use Cases
                            </h1>
                        </motion.div>
                    </div>
                </div>

                {/* 카테고리 탭 - Sticky 적용 (풀 너비 라인) */}
                <div id="tab-sentinel" />
                <div className={`sticky top-[72px] lg:top-[64px] backdrop-blur-sm z-40 border-b mb-12 transition-all duration-300 ${tabSticky ? 'border-border-light' : 'border-transparent'}`} style={{ backgroundColor: tabSticky ? 'rgba(10, 10, 10, 0.95)' : 'transparent' }}>
                    <div className="max-w-[1280px] mx-auto container-responsive flex items-center gap-8 h-[66px] overflow-x-auto no-scrollbar whitespace-nowrap">
                        {USE_CASE_CATEGORIES.map((category) => (
                            <Button
                                key={category}
                                variant="ghost"
                                rounded="none"
                                onClick={() => setActiveCategory(category)}
                                className={`relative h-full !text-body-xs transition-colors flex items-center px-1 cursor-pointer hover:bg-transparent focus-visible:ring-0 focus-visible:outline-none ${activeCategory === category
                                    ? "text-text-primary font-bold"
                                    : "text-text-dim font-medium hover:text-text-primary"
                                    }`}
                            >
                                {category}
                                {activeCategory === category && (
                                    <motion.div
                                        layoutId="activeCategoryUseCase"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="max-w-[1280px] mx-auto container-responsive">

                    {/* Card Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {
                            USE_CASES.filter(item => activeCategory === "전체" || item.카테고리 === activeCategory).map((item, i) => (
                                <motion.div
                                    key={i}
                                    onClick={() => navigate(`/use-cases/${i + 1}`, { state: { news: item } })}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05, duration: 0.5 }}
                                    className="group cursor-pointer flex flex-col"
                                >
                                    <div className="relative aspect-video rounded-[20px] overflow-hidden mb-5 bg-bg-surface">
                                        <img
                                            src={item.이미지}
                                            alt={item.타이틀}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="pt-2 px-1 flex flex-col gap-2.5">
                                        <span className={`text-label-lg font-bold ${USE_CASE_CATEGORY_COLORS[item.카테고리]?.text || 'text-brand-primary'}`}>
                                            {item.카테고리}
                                        </span>
                                        <h3 className="text-text-primary text-body-title font-bold leading-snug whitespace-pre-line">
                                            {item.상세내용?.title || item.타이틀}
                                        </h3>
                                        <p className="text-[#888888] text-body-sm leading-relaxed line-clamp-2 font-medium">
                                            {item.상세내용?.header || item.설명}
                                        </p>
                                        <span className="text-text-dim text-label-lg font-medium mt-0.5">
                                            #{item.태그}
                                        </span>
                                    </div>
                                </motion.div>
                            ))
                        }
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}

