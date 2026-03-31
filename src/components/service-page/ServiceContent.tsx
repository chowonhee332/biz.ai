import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Play, Download, Mail, Phone, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlatformProduct } from '@/context/types';

function EmptyPlaceholder({ label }: { label: string }) {
    return (
        <div className="rounded-[20px] border border-dashed border-border-light/20 bg-bg-surface/20 flex items-center justify-center py-12">
            <p className="text-text-dim/40 text-label-lg font-medium">{label} 준비 중입니다</p>
        </div>
    );
}

interface ServiceContentProps {
    activeTab: string;
    content: PlatformProduct;
}

export default function ServiceContent({ activeTab, content }: ServiceContentProps) {
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

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.4 }}
            >
                {/* 1. 개요 */}
                <div id="section-overview" className="mb-[32px] scroll-mt-32">
                    <p className="text-brand-primary text-body-sm font-bold mb-2 tracking-wide">{activeTab}</p>
                    <h2 className="text-heading-md font-bold text-text-primary mb-4 break-keep">{content.타이틀}</h2>
                    <p className="text-text-secondary text-body-sm leading-relaxed break-keep font-normal">{content.설명}</p>
                </div>

                {/* 2. 주요 고객군 */}
                <div id="section-target" className="pt-[32px] mb-[32px] scroll-mt-32">
                    <h3 className="text-body-xl font-bold text-text-primary mb-3">주요 고객군</h3>
                    {content.주요고객군 ? (
                        <div className="rounded-[20px] p-7 bg-bg-surface">
                            <p className="text-body-sm font-normal leading-relaxed text-text-secondary">{content.주요고객군}</p>
                        </div>
                    ) : (
                        <EmptyPlaceholder label="주요 고객군" />
                    )}
                </div>

                {/* 3. 주요 기능 */}
                <div id="section-features" className="pt-[32px] mb-[32px] scroll-mt-32">
                    <h3 className="text-body-xl font-bold text-text-primary mb-3">주요기능</h3>
                    {content.주요기능 && content.주요기능.length > 0 ? (
                        <div className="rounded-[20px] p-7 bg-bg-surface flex flex-col gap-7">
                            {content.주요기능.map((feature, i) => {
                                const [title, ...descParts] = feature.split(':');
                                const description = descParts.join(':').trim();
                                return (
                                    <div key={i} className="flex flex-col gap-1 break-keep">
                                        <div className="flex items-center gap-3">
                                            <span className="w-6 shrink-0 flex items-center justify-start">
                                                <span className="text-brand-primary text-body-sm font-bold">{(i + 1).toString().padStart(2, '0')}.</span>
                                            </span>
                                            <div className="text-body font-bold text-text-primary leading-snug">{title.trim()}</div>
                                        </div>
                                        {description && (
                                            <div className="text-body-sm leading-relaxed font-normal break-keep text-text-secondary pl-9">
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

                    {/* 주요 특징 이미지 캐러셀 */}
                    <div id="section-screenshots" className="mt-6 scroll-mt-32">
                        {content.주요특징이미지 && content.주요특징이미지.length > 0 ? (
                            <div className="relative">
                                <div
                                    ref={scrollRef}
                                    className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden"
                                    style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
                                >
                                    {content.주요특징이미지.map((item, i) => (
                                        <div
                                            key={i}
                                            className="rounded-[20px] overflow-hidden bg-bg-surface shrink-0 w-[calc(50%-8px)]"
                                            style={{ scrollSnapAlign: 'start' }}
                                        >
                                            <div className="p-4">
                                                <img
                                                    src={item.이미지URL}
                                                    alt={item.타이틀}
                                                    loading="lazy"
                                                    className="w-full aspect-video object-cover block rounded-[20px]"
                                                />
                                            </div>
                                            <div className="pt-2 pb-8 px-8">
                                                <h4 className="text-body font-bold text-text-primary mb-2">{item.타이틀}</h4>
                                                <p className="text-body-xs leading-relaxed break-keep font-normal text-text-secondary">{item.설명}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => scrollRef.current?.scrollBy({ left: -(scrollRef.current.clientWidth / 2 + 8), behavior: 'smooth' })}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 size-9 rounded-full bg-white dark:bg-bg-surface border border-border-light flex items-center justify-center shadow-sm hover:bg-gray-50 dark:hover:bg-bg-main transition-colors"
                                >
                                    <ChevronLeft className="size-4 text-gray-700 dark:text-text-secondary" strokeWidth={2.5} />
                                </button>
                                <button
                                    onClick={() => scrollRef.current?.scrollBy({ left: scrollRef.current.clientWidth / 2 + 8, behavior: 'smooth' })}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 size-9 rounded-full bg-white dark:bg-bg-surface border border-border-light flex items-center justify-center shadow-sm hover:bg-gray-50 dark:hover:bg-bg-main transition-colors"
                                >
                                    <ChevronRight className="size-4 text-gray-700 dark:text-text-secondary" strokeWidth={2.5} />
                                </button>
                            </div>
                        ) : (
                            <EmptyPlaceholder label="주요 특징" />
                        )}
                    </div>
                </div>

                {/* 4. 특장점 */}
                <div id="section-advantages" className="pt-[32px] mb-[32px] scroll-mt-32">
                    <h3 className="text-body-xl font-bold text-text-primary mb-3">특장점</h3>
                    {content.특장점 && content.특장점.length > 0 ? (
                        <div className="rounded-[20px] p-7 bg-bg-surface flex flex-col gap-7">
                            {content.특장점.map((item, i) => (
                                <div key={i} className="flex flex-col gap-1 break-keep">
                                    <div className="flex items-center gap-3">
                                        <span className="w-6 shrink-0 flex items-center justify-start">
                                            <span className="text-brand-primary text-body-sm font-bold">{(i + 1).toString().padStart(2, '0')}.</span>
                                        </span>
                                        <div className="text-body font-bold text-text-primary leading-snug">
                                            {item.타이틀.replace(/^\d+\.\s*/, '')}
                                        </div>
                                    </div>
                                    <div className="text-body-sm leading-relaxed font-normal break-keep text-text-secondary pl-9">
                                        {item.설명}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyPlaceholder label="특장점" />
                    )}
                </div>

                {/* 5. 활용 시나리오 */}
                <div id="section-scenarios" className="pt-[32px] mb-[32px] scroll-mt-32">
                    <h3 className="text-body-xl font-bold text-text-primary mb-3">이렇게 활용하세요</h3>
                    {content.주요활용시나리오 && content.주요활용시나리오.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            {content.주요활용시나리오.map((item, i) => (
                                <div key={i} className="rounded-[20px] p-7 bg-bg-surface flex flex-col gap-5">
                                    {item.항목 ? (
                                        <>
                                            <h4 className="text-body font-bold text-text-primary leading-tight">{item.타이틀}</h4>
                                            {item.설명 && (
                                                <div className="text-label-lg leading-relaxed text-text-secondary">{item.설명}</div>
                                            )}
                                            <div className="flex flex-col gap-3">
                                                {item.항목.filter(h => h.중타이틀 || h.설명).map((h, hi) => {
                                                    const isAsIs = /^As-Is/i.test(h.중타이틀);
                                                    const isEffect = /^기대/.test(h.중타이틀);
                                                    const isToBe = /^To-Be/i.test(h.중타이틀);
                                                    const labelColor = isAsIs
                                                        ? 'text-text-secondary/60'
                                                        : isEffect
                                                        ? 'text-emerald-400'
                                                        : isToBe
                                                        ? 'text-brand-primary'
                                                        : 'text-text-secondary';
                                                    return (
                                                        <div key={hi}>
                                                            {hi > 0 && <div className="border-t border-border-light/50 my-3" />}
                                                            <div className="flex flex-col gap-1.5">
                                                                <div className={`text-body-sm font-bold flex items-center gap-1 ${labelColor}`}>
                                                                    <span className="w-6 shrink-0 flex items-center justify-start font-bold leading-none" style={{ fontSize: '32px' }}>·</span>
                                                                    {h.중타이틀}
                                                                </div>
                                                                <div className="text-body-sm leading-relaxed pl-7 text-text-secondary">{h.설명}</div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-1">
                                                <span className="w-6 shrink-0 flex items-center justify-start">
                                                    <span className="text-brand-primary font-bold leading-none" style={{ fontSize: '32px' }}>·</span>
                                                </span>
                                                <h4 className="text-body font-bold text-text-primary leading-snug">{item.타이틀}</h4>
                                            </div>
                                            {item.설명 && (
                                                <div className="text-body-sm font-normal leading-relaxed pl-7 text-text-secondary">{item.설명}</div>
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

                {/* 6. 고객사례 */}
                <div id="section-cases" className="pt-[32px] mb-[32px] scroll-mt-32">
                    <h3 className="text-body-xl font-bold text-text-primary mb-3">고객사례</h3>
                    {content.고객사례 && content.고객사례.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            {content.고객사례.map((item, i) => (
                                <div key={i} className="rounded-[20px] bg-bg-surface flex flex-col">
                                    <div className="p-7 flex flex-col gap-3 flex-1">
                                        <div className="flex flex-col gap-3 mb-1">
                                            <h4 className="text-body font-bold text-text-primary leading-tight">
                                                {item.기업명 || item.고객조직 || '고객 사례'}
                                            </h4>
                                            {item.핵심적용기능 && (
                                                <div className="flex flex-wrap gap-1.5">
                                                    {Array.isArray(item.핵심적용기능)
                                                        ? item.핵심적용기능.map((tech: string, ti: number) => (
                                                              <span key={ti} className="px-2.5 py-1 bg-bg-main text-text-secondary text-label-lg font-medium rounded-full">{tech}</span>
                                                          ))
                                                        : <span className="text-text-secondary text-label-lg">{item.핵심적용기능}</span>}
                                                </div>
                                            )}
                                        </div>

                                        {(item.산업분야 || item.적용범위) && (
                                            <>
                                                <div className="border-t border-border-light/50" />
                                                <div className="flex flex-col gap-1.5">
                                                    <div className="text-body-sm font-bold flex items-center gap-1 text-text-secondary">
                                                        <span className="w-6 shrink-0 flex items-center justify-start font-bold leading-none" style={{ fontSize: '32px' }}>·</span>
                                                        적용범위
                                                    </div>
                                                    <div className="text-body-sm leading-relaxed pl-7 break-keep text-text-secondary">
                                                        {item.산업분야 || item.적용범위}
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {item.적용기간 && (
                                            <>
                                                <div className="border-t border-border-light/50" />
                                                <div className="flex flex-col gap-1.5">
                                                    <div className="text-body-sm font-bold flex items-center gap-1 text-text-secondary">
                                                        <span className="w-6 shrink-0 flex items-center justify-start font-bold leading-none" style={{ fontSize: '32px' }}>·</span>
                                                        적용기간
                                                    </div>
                                                    <div className="text-body-sm leading-relaxed pl-7 text-text-secondary">{item.적용기간}</div>
                                                </div>
                                            </>
                                        )}

                                        {(item.성과정량 || item.성과정성) && (
                                            <>
                                                <div className="border-t border-border-light/50" />
                                                <div className="flex flex-col gap-1.5">
                                                    <div className="text-body-sm font-bold flex items-center gap-1 text-emerald-400">
                                                        <span className="w-6 shrink-0 flex items-center justify-start font-bold leading-none" style={{ fontSize: '32px' }}>·</span>
                                                        성과
                                                    </div>
                                                    <div className="pl-7 flex flex-col gap-1">
                                                        {item.성과정량 && <p className="text-body-sm font-bold leading-snug break-keep" style={{ color: '#34d399' }}>{item.성과정량}</p>}
                                                        {item.성과정성 && <p className="text-body-sm leading-[1.6] break-keep text-text-secondary">{item.성과정성}</p>}
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {item.담당자코멘트 && (
                                            <>
                                                <div className="border-t border-border-light/50" />
                                                <div className="flex flex-col gap-1.5">
                                                    <div className="text-body-sm font-bold flex items-center gap-1 text-text-secondary">
                                                        <span className="w-6 shrink-0 flex items-center justify-start font-bold leading-none" style={{ fontSize: '32px' }}>·</span>
                                                        코멘트
                                                    </div>
                                                    <div className="flex flex-col gap-2 pl-7">
                                                        <Quote className="fill-brand-primary" style={{ width: 20, height: 20, stroke: 'none' }} />
                                                        <div className="italic text-body-sm font-normal leading-relaxed text-text-secondary">
                                                            {item.담당자코멘트}
                                                        </div>
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
                                                <span>자세히 보기</span>
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

                {/* 7. 기대효과 */}
                <div id="section-values" className="pt-[32px] mb-[32px] scroll-mt-32">
                    <h3 className="text-body-xl font-bold text-text-primary mb-3">기대효과</h3>
                    {content.핵심가치 && content.핵심가치.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {content.핵심가치.map((item, i) => (
                                <div key={i} className="rounded-[20px] p-7 bg-bg-surface flex flex-col gap-2">
                                    <span className="text-brand-primary text-body-sm font-bold leading-none">{(i + 1).toString().padStart(2, '0')}.</span>
                                    <h4 className="text-body font-bold text-text-primary leading-snug">{item.타이틀}</h4>
                                    <p className="text-body-sm leading-relaxed font-normal text-text-secondary">{item.설명}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyPlaceholder label="기대효과" />
                    )}
                </div>

                {/* 8. 소개영상 */}
                {content.소개영상 && content.소개영상.length > 0 && (
                <div id="section-videos" className="pt-[32px] mb-[32px] scroll-mt-32">
                    <h3 className="text-body-xl font-bold text-text-primary mb-3">소개영상</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {content.소개영상.map((video, i) => {
                            const getYoutubeThumbnail = (url: string) => {
                                const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
                                return match && match[2].length === 11
                                    ? `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg`
                                    : null;
                            };
                            const thumbnail = getYoutubeThumbnail(video.URL);
                            return (
                                <a key={i} href={video.URL} target="_blank" rel="noopener noreferrer" className="block group">
                                    <div className="aspect-video bg-bg-surface rounded-[20px] border border-border-light/50 flex items-center justify-center relative overflow-hidden transition-all hover:border-brand-primary/40 mb-4">
                                        {thumbnail ? (
                                            <>
                                                <img src={thumbnail} alt={video.타이틀} className="absolute inset-0 w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
                                            </>
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent" />
                                        )}
                                        <div className="size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 z-10 border border-white/30 shadow-2xl">
                                            <Play className="size-5 text-white fill-white ml-0.5" />
                                        </div>
                                    </div>
                                    <h4 className="text-body-base font-bold text-text-primary group-hover:text-text-secondary transition-colors break-keep leading-snug pl-1">
                                        {video.타이틀}
                                    </h4>
                                </a>
                            );
                        })}
                    </div>
                </div>
                )}

                {/* 9. 오퍼링 */}
                {content.오퍼링 && content.오퍼링.length > 0 && (
                <div id="section-offerings" className="pt-[32px] mb-[32px] scroll-mt-32">
                    <h3 className="text-body-xl font-bold text-text-primary mb-3">오퍼링</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {content.오퍼링.map((offering, i) => (
                            <div key={i} className="bg-bg-surface rounded-[20px] p-7 flex flex-col justify-between group">
                                <div>
                                    <h4 className="text-body font-bold text-text-primary leading-snug mb-3">{offering.타이틀}</h4>
                                    <p className="text-body-sm mb-7 leading-relaxed font-normal text-text-secondary">{offering.설명}</p>
                                </div>
                                {offering.상세링크 && (
                                    <Link to={offering.상세링크} className="flex">
                                        <Button
                                            variant="ghost"
                                            className="h-auto !p-0 text-label-md font-normal relative transition-all duration-300 hover:bg-transparent hover:text-white flex items-center gap-0"
                                        >
                                            <span>자세히 보기</span>
                                            <ChevronRight size={14} className="max-w-0 opacity-0 group-hover:max-w-[14px] group-hover:opacity-100 transition-all duration-300 overflow-hidden" />
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                )}

                {/* 10. 문의/리소스 */}
                <div id="section-contact" className="pt-[32px] border-t border-border-light mb-12 scroll-mt-32">
                    <h3 className="text-body-xl font-bold text-text-primary mb-3">문의 / 리소스</h3>
                    {(content.제품상세문의?.이메일 || content.제품상세문의?.전화번호 || (content.관련리소스 && content.관련리소스.length > 0)) ? (
                        <div className="flex flex-col gap-5">
                            {content.관련리소스 && content.관련리소스.length > 0 && (
                                <div>
                                    <h4 className="text-label-md font-bold text-text-dim mb-3 tracking-wider uppercase">관련 리소스</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {content.관련리소스.map((resource, i) => {
                                            const isAvailable = resource.URL && resource.URL !== '#';
                                            const inner = (
                                                <Button
                                                    variant="outline"
                                                    className="w-full flex justify-between items-center bg-bg-surface !rounded-[20px] border-0 hover:bg-bg-surface/80 transition-all group text-left h-[66px] cursor-pointer"
                                                    style={{ padding: '20px' }}
                                                >
                                                    <div className="flex items-center gap-4 min-w-0 mr-4">
                                                        <div className="size-8 flex-shrink-0 bg-brand-primary/10 rounded-lg flex items-center justify-center text-label-xs font-bold text-brand-primary">
                                                            {resource.파일타입}
                                                        </div>
                                                        <h4 className="text-body-sm text-text-primary/90 font-medium truncate">{resource.타이틀}</h4>
                                                    </div>
                                                    <Download className="size-5 flex-shrink-0 text-text-dim group-hover:text-brand-primary transition-colors" />
                                                </Button>
                                            );
                                            return isAvailable ? (
                                                <a key={i} href={resource.URL} target="_blank" rel="noopener noreferrer" download={resource.URL.endsWith('.pdf') || resource.URL.endsWith('.docx')} className="block">
                                                    {inner}
                                                </a>
                                            ) : (
                                                <div key={i} className="block cursor-not-allowed pointer-events-none opacity-60">{inner}</div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                            {content.제품상세문의 && (content.제품상세문의.이메일 || content.제품상세문의.전화번호) && (
                                <div>
                                    <h4 className="text-label-md font-bold text-text-dim mb-3 tracking-wider uppercase">제품 상세 문의</h4>
                                    <div className="bg-bg-surface rounded-[20px] py-5 px-5 flex flex-row items-center justify-between gap-4 flex-wrap">
                                        <span className="text-body-sm font-bold text-text-primary">도입이 궁금하신가요?</span>
                                        <div className="flex flex-row gap-6 items-center flex-wrap">
                                            {content.제품상세문의.이메일 && (
                                                <div className="flex items-center gap-2 text-text-secondary">
                                                    <Mail className="size-4 text-text-dim" />
                                                    <span className="text-body-xs font-medium">{content.제품상세문의.이메일}</span>
                                                </div>
                                            )}
                                            {content.제품상세문의.전화번호 && (
                                                <div className="flex items-center gap-2 text-text-secondary">
                                                    <Phone className="size-4 text-text-dim" />
                                                    <span className="text-body-xs font-medium">{content.제품상세문의.전화번호}</span>
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
    );
}
