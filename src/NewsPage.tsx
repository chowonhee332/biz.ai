import { useState } from 'react';
import { useScrollToTop } from './lib/useScrollToTop';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import { HIGHLIGHT_NEWS, REGULAR_NEWS, NEWS_CATEGORIES, type NewsItem } from '@/context/news/news-data';
import { getTagColor } from '@/lib/utils';
import Layout from './components/Layout';
import { useTheme } from './context/ThemeContext';
import Silk from './components/Silk';

export default function NewsPage() {
    const { isDark } = useTheme();
    const [activeCategory, setActiveCategory] = useState("전체");
    const navigate = useNavigate();

    useScrollToTop();

    return (
        <Layout activePage="news">

            <section className="pb-32 flex-1 relative">
                {/* Hero Banner with Silk */}
                <div className="relative overflow-hidden bg-[#3a3a3a] mx-3 mt-[68px] mb-3 rounded-[28px] h-[300px] flex items-center justify-center">
                    <div className="absolute inset-0 z-0">
                        <Silk speed={1} scale={0.6} color="#ffffff" noiseIntensity={1.2} rotation={5} />
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative z-10 text-center px-6"
                    >
                        <h1 className="text-heading-lg lg:text-display-md font-extrabold tracking-tight leading-tight font-display text-white">
                            News
                        </h1>
                        <p className="mt-4 text-[16px] text-white font-normal">kt ds의 핵심기술과 다양한 소식들을 소개합니다</p>
                    </motion.div>
                </div>


                {/* 카테고리 탭 */}
                <div id="tab-sentinel-news" />
                <div className="z-40 border-b border-border-light mb-12">
                    <div className="max-w-[1280px] mx-auto container-responsive flex items-center gap-8 h-[66px]">
                        {NEWS_CATEGORIES.map((category) => (
                            <Button
                                key={category}
                                variant="ghost"
                                onClick={() => setActiveCategory(category)}
                                className={`relative h-full !text-[18px] transition-colors flex items-center px-1 cursor-pointer hover:!bg-transparent active:!bg-transparent focus:!bg-transparent active:!text-current focus:!text-current focus-visible:ring-0 focus-visible:outline-none rounded-none ${activeCategory === category
                                    ? "text-text-primary font-bold"
                                    : "text-[#666666] font-bold hover:text-text-secondary"
                                    }`}
                            >
                                {category}
                                {activeCategory === category && (
                                    <motion.div
                                        layoutId="activeNewsCategory"
                                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-primary rounded-full"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* 뉴스 목록 */}
                <div className="max-w-[1280px] mx-auto container-responsive">
                    <div className="flex flex-col divide-y divide-border-light/30">
                        {[...HIGHLIGHT_NEWS, ...REGULAR_NEWS].filter(news => activeCategory === "전체" || news.태그 === activeCategory).map((news: NewsItem, i) => (
                            <motion.div
                                key={i}
                                onClick={() => navigate(`/news/${i + 1}`, { state: { news } })}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05, duration: 0.4 }}
                                className="group flex flex-col sm:flex-row gap-[50px] items-center py-8 cursor-pointer border-b border-border-light last:border-0"
                            >
                                {/* 썸네일: 고정 높이 186px */}
                                <div className="w-full sm:w-[280px] h-[186px] shrink-0 rounded-[20px] overflow-hidden bg-bg-surface border border-border-light">
                                    <img
                                        src={news.이미지}
                                        alt={news.타이틀}
                                        loading="lazy"
                                        className="w-full h-full object-cover brightness-90 transition-all duration-700 group-hover:brightness-100 group-hover:scale-105"
                                    />
                                </div>

                                <div className="flex-1 w-full flex flex-col justify-center py-1">
                                    <span className={`${getTagColor(news.태그)} text-[16px] font-medium mb-2`}>{news.태그}</span>
                                    <h3 className="text-text-primary text-[24px] font-bold leading-snug mb-3 group-hover:text-text-secondary transition-colors line-clamp-2">{news.타이틀}</h3>
                                    <p className="text-[#888888] text-[16px] leading-relaxed line-clamp-2 mb-4 font-normal max-w-[700px]">{news.설명}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[14px] font-medium px-3 py-1 rounded-full" style={{ backgroundColor: isDark ? '#222222' : '#f6f6f6', color: isDark ? '#FFFFFF' : undefined }} >{news.언론사 || news.솔루션}</span>
                                        <span className="text-[14px] font-medium px-3 py-1 rounded-full" style={{ backgroundColor: isDark ? '#222222' : '#f6f6f6', color: isDark ? '#FFFFFF' : undefined }}>{news.날짜}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </Layout>
    );
}
