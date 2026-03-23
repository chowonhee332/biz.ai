import { useEffect } from 'react';

import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { HIGHLIGHT_NEWS, REGULAR_NEWS } from './context/news/news-data';
import { useTheme } from './context/ThemeContext';

export default function NewsDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { isDark } = useTheme();

    const allNews = [...HIGHLIGHT_NEWS, ...REGULAR_NEWS];
    const newsIndex = id ? parseInt(id) - 1 : 0;
    const news = location.state?.news || allNews[newsIndex] || allNews[0];

    const getTagColor = (tag: string) => {
        if (tag === "기술 이야기") return "text-emerald-500";
        return "text-brand-primary";
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen text-text-primary font-pretendard flex flex-col" style={{ backgroundColor: isDark ? '#0A0A0A' : '#FFFFFF' }}>
            <Navbar activePage="news" />

            {/* Header */}
            <section className="pt-48 pb-16">
                <div className="max-w-[1280px] mx-auto container-responsive text-center flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-[900px] flex flex-col items-center"
                    >
                        {/* 카테고리 */}
                        <div className="mb-6">
                            <span className={`${getTagColor(news.태그)} text-[20px] font-medium`}>{news.태그}</span>
                        </div>

                        {/* 타이틀 */}
                        <h1 className="text-[36px] md:text-[50px] font-bold text-text-primary mb-6 leading-snug break-keep tracking-tight">
                            {news.타이틀}
                        </h1>

                        {/* 날짜 & 언론사 & 링크 */}
                        <div className="flex items-center gap-2 mb-8 flex-wrap justify-center">
                            <span className="text-[16px] font-medium px-4 h-9 inline-flex items-center rounded-full" style={{ backgroundColor: isDark ? '#222222' : '#f6f6f6', color: isDark ? '#FFFFFF' : undefined }}>{news.날짜}</span>
                            {news.언론사 && (
                                <span className="text-[16px] font-medium px-4 h-9 inline-flex items-center rounded-full" style={{ backgroundColor: isDark ? '#222222' : '#f6f6f6', color: isDark ? '#FFFFFF' : undefined }}>{news.언론사}</span>
                            )}
                            {news.링크 && (
                                <a href={news.링크} target="_blank" rel="noopener noreferrer" className="text-[16px] font-medium text-text-secondary hover:text-text-primary transition-colors inline-flex items-center gap-1 h-9 px-4 rounded-full border border-border-light">
                                    기사 바로가기 <ArrowUpRight size={16} />
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Hero Image */}
            <div className="w-full mb-16 max-w-[1280px] mx-auto container-responsive">
                <div className="w-full aspect-[21/9] sm:aspect-[24/9] md:aspect-[2.5/1] overflow-hidden rounded-[20px] bg-bg-surface border border-border-light">
                    <img
                        src={news.이미지}
                        alt="News Detail"
                        className="w-full h-full object-cover brightness-90"
                    />
                </div>
            </div>

            {/* 본문 */}
            <main className="max-w-[1280px] mx-auto container-responsive pb-32 flex-1 flex flex-col items-center">
                <article className="max-w-[780px] w-full">
                    {news.내용 ? (
                        <p className="text-body-base leading-[1.9] font-normal whitespace-pre-wrap break-keep mb-8" style={{ color: isDark ? '#CCCCCC' : '#333333' }}>
                            {news.내용}
                        </p>
                    ) : (
                        <p className="text-text-dim text-body-base font-medium italic">상세 내용이 준비 중입니다.</p>
                    )}
                </article>

                {/* 목록보기 */}
                <div className="mt-16 pt-10 border-t border-border-light/30 w-full max-w-[800px] flex justify-center">
                    <Button
                        variant="outline"
                        className="w-[120px] h-12 text-[15px] font-bold rounded-lg"
                        onClick={() => navigate('/news')}
                    >
                        목록보기
                    </Button>
                </div>
            </main>

            <Footer />
        </div>
    );
}
