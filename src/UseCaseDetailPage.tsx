import { useEffect } from 'react';
import { Mail, Phone, FileText, Quote } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { motion, useScroll } from 'motion/react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { USE_CASES, USE_CASE_CATEGORY_COLORS } from '@/context/use-cases/use-case-data';
const accentColor  = '#00ABFF';
const accentBg     = '#00ABFF0D';
const accentBorder = '#00ABFF33';

export default function UseCaseDetailPage() {
    const { scrollYProgress } = useScroll();
    const { id } = useParams();

    const caseIndex = id ? parseInt(id) - 1 : 0;
    const item = USE_CASES[caseIndex] || USE_CASES[0];

    const detail = item.상세내용 || null;
    const sections = detail?.sections || [
        { id: "introduction", title: "1. 고객사 소개 및 배경" },
        { id: "objective", title: "2. 도입 목표" },
        { id: "solution", title: "3. 솔루션 구조" },
        { id: "results", title: "4. 기대 효과 및 결과" }
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [item]);

    return (
        <div className="min-h-screen text-text-primary font-pretendard flex flex-col bg-bg-main">
            <Navbar activePage="use-cases" scrollLineProgress={scrollYProgress} />

            {/* Header */}
            <section className="pt-48 pb-16 relative">
                <div className="max-w-[1280px] mx-auto container-responsive text-center flex flex-col items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center gap-4 mb-8"
                    >
                        <span className={`text-body-sm font-bold ${USE_CASE_CATEGORY_COLORS[item.카테고리]?.text || 'text-brand-primary'}`}>
                            {item.카테고리}
                        </span>
                        <h1 className="text-heading-lg md:text-display-sm font-extrabold text-text-primary leading-tight break-keep tracking-tight font-display">
                            {detail?.title || item.타이틀}
                        </h1>
                        <p className="text-body-sm md:text-body text-text-secondary break-keep">
                            {item.설명}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Hero Image */}
            <div className="w-full mb-14 max-w-[1280px] mx-auto container-responsive">
                <div className="w-full aspect-[21/9] sm:aspect-[24/9] md:aspect-[2.5/1] overflow-hidden rounded-[20px] bg-bg-surface border border-border-light">
                    <img src={item.이미지} alt="Case Study Hero" className="w-full h-full object-cover brightness-90" />
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-[1280px] mx-auto container-responsive pb-24">
                <div className="flex items-start">
                <div className="w-full max-w-[820px]">
                    <article className="flex flex-col font-pretendard">
                        {sections.map((section: any, sIdx: number) => (
                            <section key={section.id} id={section.id} className="flex flex-col scroll-mt-32 pb-[32px]">

                                {/* 섹션 제목 */}
                                {section.title && (
                                    <h2 className={`${section.subtitle_level === 1 ? 'text-body-md text-text-secondary' : 'text-body-xl text-text-primary'} font-bold ${sIdx > 0 ? 'pt-[32px]' : ''} mb-4`}>
                                        {section.title.replace(/^\d+[\)\.]\s*/, '')}
                                    </h2>
                                )}

                                {/* 소헤더 */}
                                {section.header && (
                                    <div className="text-body font-bold text-text-primary/90 mb-6 pl-4 border-l-2 border-brand-primary/50">
                                        {section.header}
                                    </div>
                                )}

                                {/* 본문 */}
                                {section.id === 'summary' ? (
                                    <div className="p-7 rounded-[20px] flex gap-4" style={{ backgroundColor: accentBg, border: `1px solid ${accentBorder}` }}>
                                        <FileText className="size-5 shrink-0 mt-0.5" style={{ color: accentColor }} />
                                        <div className="leading-relaxed break-keep font-medium text-body-sm" style={{ color: accentColor }}>
                                            {section.content}
                                        </div>
                                    </div>
                                ) : section.content && (
                                    <div className="leading-relaxed mb-6 break-keep whitespace-pre-line font-medium text-body-sm text-text-secondary">
                                        {section.content}
                                    </div>
                                )}

                                {/* 리스트 */}
                                {section.list && (
                                    <div className="rounded-[20px] p-7 mb-6 bg-bg-surface">
                                        <ul className="flex flex-col gap-6">
                                            {section.list.map((li: string, idx: number) => {
                                                const colonIdx = li.indexOf(':');
                                                const hasColon = colonIdx !== -1;
                                                const title = hasColon ? li.slice(0, colonIdx) : null;
                                                const desc = hasColon ? li.slice(colonIdx + 1).trimStart() : li;
                                                return (
                                                    <li key={idx} className="flex flex-col gap-1 break-keep">
                                                        <div className="flex items-center gap-3">
                                                            <span className="w-4 shrink-0 flex items-center justify-start">
                                                                {section.id === 'objective' ? (
                                                                    <span className="text-brand-primary text-body-sm font-bold">{(idx + 1).toString().padStart(2, '0')}.</span>
                                                                ) : section.id === 'best_practices' ? (
                                                                    <span className="text-brand-primary font-bold leading-none" style={{ fontSize: "28px" }}>·</span>
                                                                ) : (
                                                                    <div className="w-0.5 h-4 rounded-full bg-brand-primary/60" />
                                                                )}
                                                            </span>
                                                            {hasColon ? (
                                                                <span className="text-body font-bold text-text-primary leading-snug">{title}</span>
                                                            ) : (
                                                                <span className="text-body-sm font-normal leading-relaxed text-text-secondary">{desc}</span>
                                                            )}
                                                        </div>
                                                        {hasColon && (
                                                            <span className="text-body-sm font-normal leading-relaxed text-text-secondary pl-7">{desc}</span>
                                                        )}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}

                                {/* 그룹 */}
                                {section.groups && (
                                    <div className="flex flex-col gap-4 mb-6">
                                        {section.groups.map((group: any, gi: number) => (
                                            <div key={gi} className="flex flex-col gap-3">
                                                {group.label && (
                                                    <div className="text-body-sm font-medium text-text-secondary px-1">{group.label}</div>
                                                )}
                                                <div className="rounded-[20px] p-7 bg-bg-surface">
                                                    <ul className="flex flex-col gap-6">
                                                        {group.items.map((it: any, idx: number) => (
                                                            <li key={idx} className="flex flex-col gap-1 break-keep">
                                                                <div className="flex items-center gap-3">
                                                                    <span className="w-6 shrink-0 flex items-center justify-start">
                                                                        {group.numbered ? (
                                                                            <span className="text-brand-primary text-body-sm font-bold">{(idx + 1).toString().padStart(2, '0')}.</span>
                                                                        ) : (
                                                                            <span className="text-brand-primary font-bold leading-none" style={{ fontSize: "28px" }}>·</span>
                                                                        )}
                                                                    </span>
                                                                    <span className="text-body font-bold leading-snug text-text-primary">{it.타이틀}</span>
                                                                </div>
                                                                {it.설명 && <span className="text-body-sm font-normal leading-relaxed text-text-secondary pl-9">{it.설명}</span>}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* 아이템 */}
                                {section.items && (
                                    section.id === 'solution' ? (
                                        <div className="rounded-[20px] p-7 mb-6 bg-bg-surface">
                                            <ul className="flex flex-col gap-4">
                                                {section.items.map((it: any, idx: number) => (
                                                    <li key={idx} className="flex items-start gap-3">
                                                        <div className="w-0.5 h-4 rounded-full bg-brand-primary/60 shrink-0 mt-1.5" />
                                                        <div className="flex flex-col gap-1 break-keep">
                                                            <span className="text-body-sm font-bold leading-snug text-text-primary">{it.타이틀}</span>
                                                            {it.설명 && <span className="text-body-sm font-medium leading-relaxed text-text-secondary">{it.설명}</span>}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                            {section.items.map((it: any, idx: number) => (
                                                <div key={idx} className="p-7 rounded-[20px] flex flex-col gap-3 bg-bg-surface">
                                                    <span className="text-brand-primary text-body-sm font-bold shrink-0 leading-none mt-0.5">{(idx + 1).toString().padStart(2, '0')}</span>
                                                    <div className="font-bold leading-tight text-body text-text-primary">{it.타이틀}</div>
                                                    <p className="text-body-sm leading-relaxed break-keep font-normal text-text-secondary">{it.설명}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                )}

                                {/* 인용 */}
                                {section.quotes && (
                                    <div className="flex flex-col gap-4 mt-4">
                                        {section.quotes.map((q: any, idx: number) => (
                                            <div key={idx} className="p-7 rounded-[20px] flex flex-col gap-4 bg-bg-surface">
                                                <Quote className="fill-brand-primary" style={{ width: 28, height: 28, stroke: 'none' }} />
                                                <div className="text-body-sm font-medium leading-relaxed break-keep text-text-secondary">
                                                    {q.text}
                                                </div>
                                                <div className="text-brand-primary text-label-lg font-bold">— {q.author}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* 하단 강조 블록 */}
                                {section.footer && (
                                    <div className="mt-6 p-7 rounded-[20px] flex gap-4" style={{ backgroundColor: accentBg, border: `1px solid ${accentBorder}` }}>
                                        <FileText className="size-5 shrink-0 mt-0.5" style={{ color: accentColor }} />
                                        <div className="leading-relaxed break-keep font-medium text-body-sm" style={{ color: accentColor }}>
                                            {section.footer}
                                        </div>
                                    </div>
                                )}
                            </section>
                        ))}
                    </article>
                </div>

                {/* 우측 Sticky 상담 문의 - 데스크탑 */}
                <div className="ml-auto w-[260px] shrink-0 hidden lg:block sticky top-[100px]">
                    <div className="p-7 rounded-[20px] flex flex-col gap-5 bg-bg-section">
                        <h4 className="text-body-sm font-bold text-text-primary break-keep">비슷한 과제를 겪고 계신가요?</h4>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-text-secondary">
                                <Mail className="size-4 text-text-dim shrink-0" />
                                <span className="text-label-lg font-medium">ktdspr@kt.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-text-secondary">
                                <Phone className="size-4 text-text-dim shrink-0" />
                                <span className="text-label-lg font-medium">02-523-7029</span>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

                {/* 상담 문의 - 모바일/태블릿 최하단 */}
                <div className="lg:hidden mt-12 mb-4">
                    <div className="p-7 rounded-[20px] flex flex-col gap-5 bg-bg-section">
                        <h4 className="text-body-sm font-bold text-text-primary break-keep">비슷한 과제를 겪고 계신가요?</h4>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-text-secondary">
                                <Mail className="size-4 text-text-dim shrink-0" />
                                <span className="text-label-lg font-medium">ktdspr@kt.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-text-secondary">
                                <Phone className="size-4 text-text-dim shrink-0" />
                                <span className="text-label-lg font-medium">02-523-7029</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
