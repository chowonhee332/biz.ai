import { useEffect } from 'react';

import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { HIGHLIGHT_NEWS, REGULAR_NEWS } from './context/news/news-data';

export default function NewsDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const allNews = [...HIGHLIGHT_NEWS, ...REGULAR_NEWS];
    const newsIndex = id ? parseInt(id) - 1 : 0;
    const news = location.state?.news || allNews[newsIndex] || allNews[0];

    const getTagColor = (tag: string) => {
        if (tag === "기술 이야기") return "text-emerald-400";
        return "text-brand-primary";
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen text-text-primary font-pretendard flex flex-col" style={{ backgroundColor: '#0A0A0A' }}>
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
                            <span className={`${getTagColor(news.태그)} text-[16px] font-bold`}>{news.태그}</span>
                        </div>

                        {/* 타이틀 */}
                        <h1 className="text-[36px] md:text-[50px] font-bold text-text-primary mb-6 leading-snug break-keep tracking-tight">
                            {news.타이틀}
                        </h1>

                        {/* 날짜 & 언론사 & 링크 */}
                        <div className="flex items-center gap-3 mb-8 text-[16px] font-medium flex-wrap justify-center">
                            <span className="text-text-dim">{news.날짜}</span>
                            {news.언론사 && <>
                                <span className="text-text-dim/30">|</span>
                                <span className="text-text-dim">{news.언론사}</span>
                            </>}
                            {news.링크 && <>
                                <span className="text-text-dim/30">|</span>
                                <a href={news.링크} target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" size="sm" className="gap-1.5 text-[15px]">
                                        기사 바로가기 <ExternalLink size={14} />
                                    </Button>
                                </a>
                            </>}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Hero Image */}
            <div className="w-full mb-16 max-w-[1280px] mx-auto container-responsive">
                <div className="w-full aspect-[21/9] sm:aspect-[24/9] md:aspect-[2.5/1] overflow-hidden rounded-[20px] bg-bg-surface border border-border-light shadow-2xl">
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
                        <p className="text-body-base leading-[1.9] font-normal whitespace-pre-wrap break-keep mb-8" style={{ color: '#CCCCCC' }}>
                            {news.내용}
                        </p>
                    ) : (
                        <p className="text-white/30 text-body-base font-medium italic">상세 내용이 준비 중입니다.</p>
                    )}
                </article>

                {/* 목록보기 */}
                <div className="mt-16 pt-10 border-t border-border-light/30 w-full max-w-[800px] flex justify-center">
                    <Button
                        variant="outline"
                        rounded="lg"
                        className="w-[120px] h-12 text-[15px] font-bold"
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
