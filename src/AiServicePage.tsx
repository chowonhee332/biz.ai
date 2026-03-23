import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Play, Download, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PLATFORM_PAGE_CONFIG } from '@/context/ai-service/ai-service-data';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Silk from '@/components/Silk';


function EmptyPlaceholder({ label }: { label: string }) {
    return (
        <div className="rounded-[16px] border border-dashed border-border-light/20 bg-bg-surface/20 flex items-center justify-center py-12">
            <p className="text-text-dim/40 text-label-lg font-medium">{label} 준비 중입니다</p>
        </div>
    );
}

export default function AiServicePage() {
    const [activeTab, setActiveTab] = useState(PLATFORM_PAGE_CONFIG.sidebarItems[0]);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activeTab]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const interval = setInterval(() => {
            const maxScroll = el.scrollWidth - el.clientWidth;
            if (el.scrollLeft >= maxScroll - 1) {
                el.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                el.scrollBy({ left: el.clientWidth / 2 + 8, behavior: 'smooth' });
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [activeTab]);

    const sidebarItems = PLATFORM_PAGE_CONFIG.sidebarItems;
    const currentContent = PLATFORM_PAGE_CONFIG.products[activeTab];
    const heroText = PLATFORM_PAGE_CONFIG.hero;


    return (
        <div className="min-h-screen text-text-primary font-pretendard flex flex-col" style={{ backgroundColor: '#0A0A0A' }}>
            <Navbar activePage="platform" />

            <section className="pt-48 pb-32 flex-1 relative">
                <div className="absolute inset-0 z-0" style={{ height: '400px' }}>
                    <Silk speed={3.5} scale={0.8} color="#c8d8ff" noiseIntensity={2.7} rotation={4.8} />
                </div>
                <div className="absolute inset-0 z-[1]" style={{ height: '400px', background: 'linear-gradient(to bottom, rgba(10,10,10,0.1) 0%, rgba(10,10,10,1) 100%)' }} />
                <div className="max-w-[1280px] mx-auto container-responsive mb-20 pb-4 relative z-10">
                    <motion.div
                        key={activeTab + "header"}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-body text-[#999999] mb-3 block font-medium">AI 제품 / 서비스</span>
                        <h1 className="text-heading-lg lg:text-display-md font-bold bg-gradient-to-r from-white via-white via-[40%] to-brand-secondary bg-clip-text text-transparent tracking-tight leading-tight">
                            AI Products/Service
                        </h1>
                    </motion.div>
                </div>

                {/* 모바일 탭 */}
                <div className="lg:hidden sticky top-[72px] backdrop-blur-sm z-40 border-b border-border-light mb-12 relative" style={{ backgroundColor: 'rgba(10, 10, 10, 0.95)' }}>
                    <div className="max-w-[1280px] mx-auto container-responsive flex items-center gap-8 h-[66px] overflow-x-auto no-scrollbar whitespace-nowrap">
                        {sidebarItems.map((item) => (
                            <Button
                                key={item}
                                variant="ghost"
                                rounded="none"
                                onClick={() => setActiveTab(item)}
                                className={`relative h-full text-label-lg font-medium transition-all shrink-0 flex items-center px-1 cursor-pointer hover:bg-transparent focus-visible:ring-0 focus-visible:outline-none ${activeTab === item ? "text-text-primary font-bold" : "text-text-dim hover:text-text-primary/60"}`}
                            >
                                {item}
                                {activeTab === item && (
                                    <motion.div layoutId="activePlatformTab" className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-primary rounded-full" />
                                )}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="max-w-[1280px] mx-auto container-responsive relative z-10">
                    <div className="flex flex-col lg:flex-row gap-[60px]">

                        {/* 왼쪽 사이드바 (데스크탑) */}
                        <aside className="hidden lg:block lg:w-[220px] shrink-0 pt-10 mt-5">
                            <div className="flex flex-col gap-2 sticky top-[100px]">
                                {sidebarItems.map((item) => (
                                    <Button
                                        key={item}
                                        variant={activeTab === item ? "default" : "ghost"}
                                        rounded="lg"
                                        onClick={() => setActiveTab(item)}
                                        className={`w-full justify-start px-5 h-[48px] !text-body font-semibold transition-all cursor-pointer ${activeTab === item
                                            ? "bg-brand-primary text-text-primary shadow-lg shadow-brand-primary/20"
                                            : "text-text-secondary/40 hover:text-text-primary/70 hover:bg-bg-surface"
                                            }`}
                                    >
                                        {item}
                                    </Button>
                                ))}
                            </div>
                        </aside>

                        {/* 메인 콘텐츠 */}
                        <main className="flex-1 min-w-0 pt-10 mt-5">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {/* 1. 개요 */}
                                    <div id="section-overview" className="mb-[52px] scroll-mt-32 pt-8">
                                        <div className="max-w-[75%]">
                                            <p className="text-brand-primary text-body-sm font-bold mb-2 tracking-wide">{activeTab}</p>
                                            <h2 className="text-heading-md font-bold text-white mb-4 break-keep">{currentContent.타이틀}</h2>
                                            <div className="text-text-secondary text-body-sm leading-relaxed break-keep font-normal">
                                                <p>{currentContent.설명}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 2. 주요 고객군 */}
                                    <div id="section-target" className="pt-[52px] mb-[52px] border-t border-white/10 scroll-mt-32">
                                        <h3 className="text-body-xl font-bold text-white mb-4">주요 고객군</h3>
                                        {currentContent.주요고객군 ? (
                                            <p className="text-body-sm font-normal leading-relaxed" style={{ color: '#CCCCCC' }}>{currentContent.주요고객군}</p>
                                        ) : (
                                            <EmptyPlaceholder label="주요 고객군" />
                                        )}
                                    </div>

                                    {/* 4. 주요 기능 */}
                                    <div id="section-features" className="pt-[52px] mb-[52px] border-t border-white/10 scroll-mt-32">
                                        <h3 className="text-body-xl font-bold text-white mb-4">주요기능</h3>
                                        {currentContent.주요기능 && currentContent.주요기능.length > 0 ? (
                                            <div className="flex flex-col">
                                                {currentContent.주요기능.map((feature, i) => {
                                                    const [title, ...descParts] = feature.split(':');
                                                    const description = descParts.join(':').trim();
                                                    return (
                                                        <div key={i} className="flex items-start gap-12 py-[18px]">
                                                            <div className="flex items-start gap-3 w-[240px] shrink-0">
                                                                <span className="text-label-lg font-normal shrink-0 w-6" style={{ color: '#00ABFF' }}>{(i + 1).toString().padStart(2, '0')}</span>
                                                                <div className="text-body font-medium" style={{ color: '#FFFFFF', lineHeight: '1.4' }}>
                                                                    {title.trim()}
                                                                </div>
                                                            </div>
                                                            {description && (
                                                                <div className="text-body-xs leading-[1.6] font-normal break-keep pt-0.5" style={{ color: '#BBBBBB' }}>
                                                                    {description}
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <EmptyPlaceholder label="주요 기능" />
                                        )}

                                        {/* 주요 특징 이미지 (주요기능 섹션 내 포함) */}
                                        <div id="section-screenshots" className="mt-6 scroll-mt-32">
                                        {currentContent.주요특징이미지 && currentContent.주요특징이미지.length > 0 ? (
                                            <div className="relative">
                                                <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden" style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}>
                                                    {currentContent.주요특징이미지.map((item, i) => (
                                                        <div key={i} className="rounded-[16px] overflow-hidden border border-white/10 bg-white/[0.03] shrink-0 w-[calc(50%-8px)]" style={{ scrollSnapAlign: 'start' }}>
                                                            <div className="p-4">
                                                                <img
                                                                    src={item.이미지URL}
                                                                    alt={item.타이틀}
                                                                    className="w-full aspect-video object-cover block rounded-[8px]"
                                                                />
                                                            </div>
                                                            <div className="pt-2 pb-8 px-8">
                                                                <h4 className="text-body font-bold text-white mb-2">{item.타이틀}</h4>
                                                                <p className="leading-relaxed break-keep font-normal" style={{ fontSize: '15px', color: '#BBBBBB' }}>{item.설명}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <Button
                                                    variant="glass"
                                                    size="icon-xl"
                                                    rounded="full"
                                                    onClick={() => scrollRef.current?.scrollBy({ left: -(scrollRef.current.clientWidth / 2 + 8), behavior: 'smooth' })}
                                                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2"
                                                >
                                                    <ChevronLeft className="size-5" strokeWidth={3} />
                                                </Button>
                                                <Button
                                                    variant="glass"
                                                    size="icon-xl"
                                                    rounded="full"
                                                    onClick={() => scrollRef.current?.scrollBy({ left: scrollRef.current.clientWidth / 2 + 8, behavior: 'smooth' })}
                                                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2"
                                                >
                                                    <ChevronRight className="size-5" strokeWidth={3} />
                                                </Button>
                                            </div>
                                        ) : (
                                            <EmptyPlaceholder label="주요 특징" />
                                        )}
                                        </div>
                                    </div>

                                    {/* 6. 특장점 */}
                                    <div id="section-advantages" className="pt-[52px] mb-[52px] border-t border-white/10 scroll-mt-32">
                                        <h3 className="text-body-xl font-bold text-white mb-4">특장점</h3>
                                        {currentContent.특장점 && currentContent.특장점.length > 0 ? (
                                            <div className="flex flex-col">
                                                {currentContent.특장점.map((item, i) => (
                                                    <div key={i} className="flex items-start gap-12 py-[18px]">
                                                        <div className="flex items-start gap-3 w-[240px] shrink-0">
                                                            <span className="text-label-lg font-normal shrink-0 w-6" style={{ color: '#00ABFF' }}>{(i + 1).toString().padStart(2, '0')}</span>
                                                            <div className="text-body font-medium" style={{ color: '#FFFFFF', lineHeight: '1.4' }}>
                                                                {item.타이틀.replace(/^\d+\.\s*/, '')}
                                                            </div>
                                                        </div>
                                                        <div className="text-body-xs leading-[1.6] font-normal break-keep pt-0.5" style={{ color: '#BBBBBB' }}>
                                                            {item.설명}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <EmptyPlaceholder label="특장점" />
                                        )}
                                    </div>

                                    {/* 7. 활용 시나리오 */}
                                    <div id="section-scenarios" className="pt-[52px] mb-[52px] border-t border-white/10 scroll-mt-32">
                                        <h3 className="text-body-xl font-bold text-white mb-4">이렇게 활용하세요</h3>
                                        {currentContent.주요활용시나리오 && currentContent.주요활용시나리오.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {currentContent.주요활용시나리오.map((item, i) => (
                                                    <div key={i} className="rounded-[12px] p-6 border border-border-light flex flex-col gap-5">
                                                        {item.항목 ? (
                                                            <>
                                                                <h4 className="text-body font-bold text-text-primary leading-tight">{item.타이틀}</h4>
                                                                {item.설명 && (
                                                                    <div className="leading-relaxed" style={{ fontSize: '14px', color: '#CCCCCC' }}>{item.설명}</div>
                                                                )}
                                                                <div className="flex flex-col gap-3">
                                                                    {item.항목.filter(h => h.중타이틀 || h.설명).map((h, hi) => {
                                                                        const isAsIs = /^As-Is/i.test(h.중타이틀);
                                                                        const isEffect = /^기대/.test(h.중타이틀);
                                                                        const isToBe = /^To-Be/i.test(h.중타이틀);
                                                                        const labelColor = isAsIs ? 'text-text-secondary/60' : isEffect ? 'text-emerald-400' : isToBe ? 'text-brand-primary' : 'text-text-secondary';
                                                                        return (
                                                                            <div key={hi}>
                                                                                {hi > 0 && <div className="border-t border-white/5 my-3" />}
                                                                                {isEffect ? (
                                                                                    <div className="flex flex-col gap-1.5 p-3">
                                                                                        <div className={`font-bold flex items-center gap-2 ${labelColor}`} style={{ fontSize: '14px' }}>
                                                                                            <span className={`shrink-0 ${labelColor}`}>–</span>
                                                                                            {h.중타이틀}
                                                                                        </div>
                                                                                        <div className="leading-relaxed pl-3.5" style={{ fontSize: '14px', color: '#CCCCCC' }}>
                                                                                            {h.설명}
                                                                                        </div>
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className="flex flex-col gap-1.5">
                                                                                        <div className={`font-bold flex items-center gap-2 ${labelColor}`} style={{ fontSize: '14px' }}>
                                                                                            <span className={`shrink-0 ${labelColor}`}>–</span>
                                                                                            {h.중타이틀}
                                                                                        </div>
                                                                                        <div className="leading-relaxed pl-3.5" style={{ fontSize: '14px', color: '#CCCCCC' }}>
                                                                                            {h.설명}
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-0.5 h-5 bg-brand-primary rounded-full shrink-0" />
                                                                    <h4 className="text-body font-bold text-text-primary leading-tight">{item.타이틀}</h4>
                                                                </div>
                                                                {item.설명 && (
                                                                    <div className="leading-relaxed pl-4" style={{ fontSize: '14px', color: '#CCCCCC' }}>
                                                                        {item.설명}
                                                                    </div>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <EmptyPlaceholder label="활용 시나리오" />
                                        )}
                                    </div>

                                    {/* 8. 고객사례 */}
                                    <div id="section-cases" className="pt-[52px] mb-[52px] border-t border-white/10 scroll-mt-32">
                                        <h3 className="text-body-xl font-bold text-white mb-4">고객사례</h3>
                                        {currentContent.고객사례 && currentContent.고객사례.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {currentContent.고객사례.map((item, i) => (
                                                    <div key={i} className="rounded-[12px] border border-border-light flex flex-col">
                                                        <div className="p-6 flex flex-col gap-3 flex-1">
                                                            {/* 기업명 + 핵심기능 */}
                                                            <div className="flex flex-col gap-3 mb-1">
                                                                <h4 className="text-body font-bold text-white leading-tight">
                                                                    {item.기업명 || item.고객조직 || "고객 사례"}
                                                                </h4>
                                                                {item.핵심적용기능 && (
                                                                    <div className="flex flex-wrap gap-1.5">
                                                                        {Array.isArray(item.핵심적용기능) ? item.핵심적용기능.map((tech: string, ti: number) => (
                                                                            <span key={ti} className="px-2.5 py-1 bg-white/5 font-medium" style={{ fontSize: '14px', borderRadius: '100px', color: '#CCCCCC' }}>{tech}</span>
                                                                        )) : <span className="text-text-secondary" style={{ fontSize: '14px' }}>{item.핵심적용기능}</span>}
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {/* 적용범위 */}
                                                            {(item.산업분야 || item.적용범위) && (
                                                                <>
                                                                    <div className="border-t border-white/5" />
                                                                    <div className="flex flex-col gap-1.5">
                                                                        <div className="font-bold flex items-center gap-2 text-text-secondary" style={{ fontSize: '14px' }}>
                                                                            <span className="shrink-0 text-text-secondary">–</span>
                                                                            적용범위
                                                                        </div>
                                                                        <div className="leading-relaxed pl-3.5 break-keep" style={{ fontSize: '14px', color: '#CCCCCC' }}>
                                                                            {item.산업분야 || item.적용범위}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}

                                                            {/* 적용기간 */}
                                                            {item.적용기간 && (
                                                                <>
                                                                    <div className="border-t border-white/5" />
                                                                    <div className="flex flex-col gap-1.5">
                                                                        <div className="font-bold flex items-center gap-2 text-text-secondary" style={{ fontSize: '14px' }}>
                                                                            <span className="shrink-0 text-text-secondary">–</span>
                                                                            적용기간
                                                                        </div>
                                                                        <div className="leading-relaxed pl-3.5" style={{ fontSize: '14px', color: '#CCCCCC' }}>
                                                                            {item.적용기간}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}

                                                            {/* 성과 */}
                                                            {(item.성과정량 || item.성과정성) && (
                                                                <>
                                                                    <div className="border-t border-white/5" />
                                                                    <div className="flex flex-col gap-1.5">
                                                                        <div className="font-bold flex items-center gap-2 text-emerald-400" style={{ fontSize: '14px' }}>
                                                                            <span className="shrink-0 text-emerald-400">–</span>
                                                                            성과
                                                                        </div>
                                                                        <div className="pl-3.5 flex flex-col gap-1">
                                                                            {item.성과정량 && <p className="font-bold leading-snug break-keep" style={{ fontSize: '14px', color: '#34d399' }}>{item.성과정량}</p>}
                                                                            {item.성과정성 && <p className="leading-[1.6] break-keep" style={{ fontSize: '14px', color: '#CCCCCC' }}>{item.성과정성}</p>}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}

                                                            {/* 담당자 코멘트 */}
                                                            {item.담당자코멘트 && (
                                                                <>
                                                                    <div className="border-t border-white/5" />
                                                                    <div className="flex flex-col gap-1.5">
                                                                        <div className="font-bold flex items-center gap-2 text-text-secondary" style={{ fontSize: '14px' }}>
                                                                            <span className="shrink-0 text-text-secondary">–</span>
                                                                            코멘트
                                                                        </div>
                                                                        <div className="italic leading-relaxed pl-3.5" style={{ fontSize: '14px', color: '#CCCCCC' }}>
                                                                            "{item.담당자코멘트}"
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>

                                                        {item.상세링크 && (
                                                            <Link to={item.상세링크}>
                                                                <Button
                                                                    variant="ghost"
                                                                    className="h-auto p-0 text-label-md font-bold relative transition-all duration-300 hover:bg-transparent hover:text-white"
                                                                >
                                                                    <span className="group-hover:-translate-x-1.5 transition-transform duration-300">자세히 보기</span>
                                                                    <ChevronRight size={14} className="max-w-0 opacity-0 group-hover:max-w-[14px] group-hover:opacity-100 group-hover:ml-1 transition-all duration-300 overflow-hidden" />
                                                                </Button>
                                                            </Link>
                                                            )}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <EmptyPlaceholder label="고객사례" />
                                        )}
                                    </div>

                                    {/* 기대효과 */}
                                    <div id="section-values" className="pt-[52px] mb-[52px] border-t border-white/10 scroll-mt-32">
                                        <h3 className="text-body-xl font-bold text-white mb-4">기대효과</h3>
                                        {currentContent.핵심가치 && currentContent.핵심가치.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {currentContent.핵심가치.map((item, i) => (
                                                    <div key={i} className="rounded-[12px] p-6 border border-border-light">
                                                        <h4 className="text-body font-bold text-white mb-3"><span className="font-normal" style={{ color: '#00ABFF' }}>{i + 1}.&nbsp;&nbsp;</span>{item.타이틀}</h4>
                                                        <p className="leading-[1.6]" style={{ fontSize: '14px', color: '#CCCCCC' }}>{item.설명}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <EmptyPlaceholder label="기대효과" />
                                        )}
                                    </div>

                                    {/* 9. 소개영상 */}
                                    <div id="section-videos" className="pt-[52px] mb-[52px] border-t border-white/10 scroll-mt-32">
                                        <h3 className="text-body-xl font-bold text-white mb-4">소개영상</h3>
                                        {currentContent.소개영상 && currentContent.소개영상.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                {currentContent.소개영상.map((video, i) => {
                                                    const youtubeThumbnail = (url: string) => {
                                                        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                                                        const match = url.match(regExp);
                                                        if (match && match[2].length === 11) {
                                                            return `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg`;
                                                        }
                                                        return null;
                                                    };
                                                    const thumbnail = youtubeThumbnail(video.URL);
                                                    return (
                                                        <a
                                                            key={i}
                                                            href={video.URL}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="block group"
                                                        >
                                                            <div className="aspect-video bg-white/5 rounded-[12px] border border-white/5 flex items-center justify-center relative overflow-hidden transition-all hover:border-brand-primary/40 mb-4">
                                                                {thumbnail ? (
                                                                    <>
                                                                        <img src={thumbnail} alt={video.타이틀} className="absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-500" />
                                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
                                                                    </>
                                                                ) : (
                                                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent" />
                                                                )}
                                                                <div className="size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 z-10 border border-white/30 shadow-2xl">
                                                                    <Play className="size-5 text-white fill-white ml-0.5" />
                                                                </div>
                                                            </div>
                                                            <h4 className="text-body-base font-bold text-white/80 group-hover:text-white transition-colors break-keep leading-snug pl-1">
                                                                {video.타이틀}
                                                            </h4>
                                                        </a>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <EmptyPlaceholder label="소개영상" />
                                        )}
                                    </div>

                                    {/* 10. 오퍼링 */}
                                    <div id="section-offerings" className="pt-[52px] mb-[52px] border-t border-white/10 scroll-mt-32">
                                        <h3 className="text-body-xl font-bold text-white mb-4">오퍼링</h3>
                                        {currentContent.오퍼링 && currentContent.오퍼링.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {currentContent.오퍼링.map((offering, i) => (
                                                    <div key={i} className="bg-bg-surface backdrop-blur-sm rounded-[12px] p-6 border border-border-light hover:border-brand-primary transition-all flex flex-col justify-between group">
                                                        <div>
                                                            <div className="flex items-center gap-3 mb-4">
                                                                <div className="w-0.5 h-5 bg-brand-primary rounded-full shrink-0" />
                                                                <h4 className="text-body font-bold text-text-primary">{offering.타이틀}</h4>
                                                            </div>
                                                            <p className="text-body-xs mb-7 leading-[1.6]" style={{ color: '#CCCCCC' }}>{offering.설명}</p>
                                                        </div>
                                                        {offering.상세링크 && (
                                                            <Link to={offering.상세링크}>
                                                                <Button
                                                                    variant="ghost"
                                                                    className="h-auto p-0 text-label-md font-bold relative transition-all duration-300 hover:bg-transparent hover:text-white"
                                                                >
                                                                    <span className="group-hover:-translate-x-1.5 transition-transform duration-300">자세히 보기</span>
                                                                    <ChevronRight size={14} className="max-w-0 opacity-0 group-hover:max-w-[14px] group-hover:opacity-100 transition-all duration-300 overflow-hidden" />
                                                                </Button>
                                                            </Link>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <EmptyPlaceholder label="오퍼링" />
                                        )}
                                    </div>

                                    {/* 11. 문의/리소스 */}
                                    <div id="section-contact" className="pt-10 border-t border-white/10 mb-12 scroll-mt-32">
                                        <h3 className="text-body-xl font-bold text-white mb-4">문의 / 리소스</h3>
                                        {(currentContent.제품상세문의?.이메일 || currentContent.제품상세문의?.전화번호 || (currentContent.관련리소스 && currentContent.관련리소스.length > 0)) ? (
                                            <div className="flex flex-col gap-5">
                                                {/* 관련 리소스: 좌우 배치 */}
                                                {currentContent.관련리소스 && currentContent.관련리소스.length > 0 && (
                                                    <div>
                                                        <h4 className="text-label-md font-bold text-text-dim mb-3 tracking-wider uppercase">관련 리소스</h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                    {currentContent.관련리소스.map((resource, i) => {
                                                                        const isAvailable = resource.URL && resource.URL !== '#';
                                                                        return isAvailable ? (
                                                                            <a
                                                                                key={i}
                                                                                href={resource.URL}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                download={resource.URL.endsWith('.pdf') || resource.URL.endsWith('.docx')}
                                                                                className="block"
                                                                            >
                                                                                <Button
                                                                                    variant="outline"
                                                                                    rounded="xl"
                                                                                    className="w-full flex justify-between items-center bg-bg-surface border border-border-light hover:border-brand-primary transition-all group text-left h-[66px] cursor-pointer" style={{ padding: '20px' }}
                                                                                >
                                                                                    <div className="flex items-center gap-4 min-w-0 mr-4">
                                                                                        <div className="size-8 flex-shrink-0 bg-brand-primary/10 rounded-lg flex items-center justify-center text-label-xs font-bold text-brand-primary">
                                                                                            {resource.파일타입}
                                                                                        </div>
                                                                                        <h4 className="text-body-sm text-text-primary/90 font-medium truncate">{resource.타이틀}</h4>
                                                                                    </div>
                                                                                    <Download className="size-5 flex-shrink-0 text-text-dim group-hover:text-brand-primary transition-colors" />
                                                                                </Button>
                                                                            </a>
                                                                        ) : (
                                                                            <div key={i} className="block cursor-not-allowed">
                                                                                <Button
                                                                                    variant="outline"
                                                                                    rounded="xl"
                                                                                    className="w-full flex justify-between items-center bg-bg-surface border border-border-light text-left h-[66px] pointer-events-none" style={{ padding: '20px' }}
                                                                                >
                                                                                    <div className="flex items-center gap-4 min-w-0 mr-4">
                                                                                        <div className="size-8 flex-shrink-0 bg-brand-primary/10 rounded-lg flex items-center justify-center text-label-xs font-bold text-brand-primary">
                                                                                            {resource.파일타입}
                                                                                        </div>
                                                                                        <h4 className="text-body-sm text-text-primary/90 font-medium truncate">{resource.타이틀}</h4>
                                                                                    </div>
                                                                                    <Download className="size-5 flex-shrink-0 text-text-dim" />
                                                                                </Button>
                                                                            </div>
                                                                        );
                                                                    })}
                                                        </div>
                                                    </div>
                                                )}
                                                {/* 제품 상세 문의: 리소스 아래 */}
                                                {currentContent.제품상세문의 && (currentContent.제품상세문의.이메일 || currentContent.제품상세문의.전화번호) && (
                                                    <div>
                                                        <h4 className="text-label-md font-bold text-text-dim mb-3 tracking-wider uppercase">제품 상세 문의</h4>
                                                    <div className="bg-bg-surface backdrop-blur-sm rounded-[12px] py-5 px-5 border border-border-light flex flex-row items-center justify-between gap-4 flex-wrap">
                                                        <span className="text-body-sm font-bold text-text-primary">도입이 궁금하신가요?</span>
                                                        <div className="flex flex-row gap-6 items-center flex-wrap">
                                                            {currentContent.제품상세문의.이메일 && (
                                                                <div className="flex items-center gap-2 text-text-secondary">
                                                                    <Mail className="size-4 text-text-dim" />
                                                                    <span className="text-body-xs font-medium">{currentContent.제품상세문의.이메일}</span>
                                                                </div>
                                                            )}
                                                            {currentContent.제품상세문의.전화번호 && (
                                                                <div className="flex items-center gap-2 text-text-secondary">
                                                                    <Phone className="size-4 text-text-dim" />
                                                                    <span className="text-body-xs font-medium">{currentContent.제품상세문의.전화번호}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <EmptyPlaceholder label="문의/리소스" />
                                        )}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </main>

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
