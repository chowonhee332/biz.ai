import { useEffect } from 'react';
import { Mail, Phone, FileText } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { USE_CASES, USE_CASE_CATEGORY_COLORS } from '@/context/use-cases/use-case-data';
import { useTheme } from './context/ThemeContext';

export default function UseCaseDetailPage() {
    const { isDark } = useTheme();
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

    // ── 색상 변수 ──────────────────────────────────
    const pageBg       = isDark ? '#0A0A0A' : '#FFFFFF';
    const bodyText     = isDark ? '#CCCCCC' : '#333333';
    const titleText    = isDark ? '#FFFFFF' : '#111111';
    const cardBg       = isDark ? 'rgba(255,255,255,0.04)' : '#f6f6f6';
    const sidebarBg    = isDark ? '#222222' : '#f6f6f6';
    const accentColor  = '#00ABFF';
    const accentBg     = '#00ABFF0D';
    const accentBorder = '#00ABFF33';
    // ───────────────────────────────────────────────

    return (
        <div className="min-h-screen text-text-primary font-pretendard flex flex-col" style={{ backgroundColor: pageBg }}>
            <Navbar activePage="use-cases" />

            {/* Header */}
            <section className="pt-48 pb-16 relative">
                <div className="max-w-[1280px] mx-auto container-responsive text-center flex flex-col items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center gap-4 mb-8"
                    >
                        <span className={`text-[16px] font-bold ${USE_CASE_CATEGORY_COLORS[item.카테고리]?.text || 'text-brand-primary'}`}>
                            {item.카테고리}
                        </span>
                        <h1 className="text-[36px] md:text-[50px] font-bold text-text-primary leading-snug break-keep tracking-tight">
                            {detail?.title || item.타이틀}
                        </h1>
                        <p className="text-body-base md:text-body break-keep" style={{ color: bodyText }}>
                            {item.설명}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Hero Image */}
            <div className="w-full mb-24 max-w-[1280px] mx-auto container-responsive">
                <div className="w-full aspect-[21/9] sm:aspect-[24/9] md:aspect-[2.5/1] overflow-hidden rounded-[12px] bg-bg-surface border border-border-light">
                    <img src={item.이미지} alt="Case Study Hero" className="w-full h-full object-cover brightness-90" />
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-[1280px] mx-auto container-responsive pb-48">
                <div className="flex items-start">
                <div className="w-full max-w-[820px]">
                    <article className="flex flex-col font-pretendard">
                        {sections.map((section: any, sIdx: number) => (
                            <section key={section.id} id={section.id} className="flex flex-col scroll-mt-32 pb-[52px]">

                                {/* 섹션 제목 */}
                                {section.title && (
                                    <h2 className={`${section.subtitle_level === 1 ? 'text-[20px] text-text-secondary' : 'text-[24px] text-text-primary'} font-bold ${sIdx > 0 ? 'pt-[52px]' : ''} mb-4`}>
                                        {section.title.replace(/^\d+[\)\.]\s*/, '')}
                                    </h2>
                                )}

                                {/* 소헤더 */}
                                {section.header && (
                                    <div className="text-[18px] font-bold text-text-primary/90 mb-6 pl-4 border-l-2 border-brand-primary/50">
                                        {section.header}
                                    </div>
                                )}

                                {/* 본문 */}
                                {section.id === 'summary' ? (
                                    <div className="p-6 rounded-[12px] flex gap-4" style={{ backgroundColor: accentBg, border: `1px solid ${accentBorder}` }}>
                                        <FileText className="size-5 shrink-0 mt-0.5" style={{ color: accentColor }} />
                                        <div className="leading-relaxed break-keep font-medium text-[16px]" style={{ color: accentColor }}>
                                            {section.content}
                                        </div>
                                    </div>
                                ) : section.content && (
                                    <div className="leading-relaxed mb-6 break-keep whitespace-pre-line font-medium text-[16px]" style={{ color: bodyText }}>
                                        {section.content}
                                    </div>
                                )}

                                {/* 리스트 */}
                                {section.list && (
                                    <div className="rounded-[12px] p-6 mb-6" style={{ backgroundColor: cardBg }}>
                                        <ul className="flex flex-col gap-4">
                                            {section.list.map((li: string, idx: number) => {
                                                const colonIdx = li.indexOf(':');
                                                const hasColon = colonIdx !== -1;
                                                const title = hasColon ? li.slice(0, colonIdx) : null;
                                                const desc = hasColon ? li.slice(colonIdx + 1).trimStart() : li;
                                                return (
                                                    <li key={idx} className="flex items-start gap-3" style={{ color: bodyText }}>
                                                        <div className="w-0.5 h-4 rounded-full bg-brand-primary/60 shrink-0 mt-1" />
                                                        <div className="text-[16px] font-medium leading-relaxed break-keep">
                                                            {hasColon && <span className="font-bold" style={{ color: titleText }}>{title}: </span>}{desc}
                                                        </div>
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
                                            <div key={gi} className="rounded-[12px] p-6" style={{ backgroundColor: cardBg }}>
                                                <div className="text-[14px] font-bold text-text-secondary mb-4">{group.label}</div>
                                                <ul className="flex flex-col gap-4">
                                                    {group.items.map((it: any, idx: number) => (
                                                        <li key={idx} className="flex items-start gap-3">
                                                            {group.numbered ? (
                                                                <span className="text-brand-primary text-[14px] font-bold shrink-0 mt-0.5 w-4">{idx + 1}.</span>
                                                            ) : (
                                                                <div className="w-0.5 h-4 rounded-full bg-brand-primary/60 shrink-0 mt-1.5" />
                                                            )}
                                                            <div className="flex flex-col gap-1 break-keep">
                                                                <span className="text-[18px] font-bold leading-snug" style={{ color: titleText }}>{it.타이틀}</span>
                                                                {it.설명 && <span className="text-[16px] font-medium leading-relaxed" style={{ color: bodyText }}>{it.설명}</span>}
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* 아이템 */}
                                {section.items && (
                                    section.id === 'solution' ? (
                                        <div className="rounded-[12px] p-6 mb-6" style={{ backgroundColor: cardBg }}>
                                            <ul className="flex flex-col gap-4">
                                                {section.items.map((it: any, idx: number) => (
                                                    <li key={idx} className="flex items-start gap-3">
                                                        <div className="w-0.5 h-4 rounded-full bg-brand-primary/60 shrink-0 mt-1.5" />
                                                        <div className="flex flex-col gap-1 break-keep">
                                                            <span className="text-[16px] font-bold leading-snug" style={{ color: titleText }}>{it.타이틀}</span>
                                                            {it.설명 && <span className="text-[14px] font-medium leading-relaxed" style={{ color: bodyText }}>{it.설명}</span>}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                            {section.items.map((it: any, idx: number) => (
                                                <div key={idx} className="p-5 rounded-[16px] flex flex-col gap-3" style={{ backgroundColor: cardBg }}>
                                                    {section.id !== 'results' && (
                                                        <span className="text-brand-primary text-[16px] font-bold shrink-0 leading-none mt-0.5">{(idx + 1).toString().padStart(2, '0')}</span>
                                                    )}
                                                    <div className="font-bold leading-tight text-body-base" style={{ color: titleText }}>{it.타이틀}</div>
                                                    <p className="text-[14px] leading-relaxed break-keep font-medium" style={{ color: bodyText }}>{it.설명}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                )}

                                {/* 인용 */}
                                {section.quotes && (
                                    <div className="flex flex-col gap-4 mt-4">
                                        {section.quotes.map((q: any, idx: number) => (
                                            <div key={idx} className="p-6 rounded-[12px] flex flex-col gap-4" style={{ backgroundColor: cardBg }}>
                                                <div className="text-body-base font-medium leading-relaxed break-keep" style={{ color: bodyText }}>
                                                    {q.text}
                                                </div>
                                                <div className="text-brand-primary text-[14px] font-bold">— {q.author}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* 하단 강조 블록 */}
                                {section.footer && (
                                    <div className="mt-6 p-6 rounded-[12px] flex gap-4" style={{ backgroundColor: accentBg, border: `1px solid ${accentBorder}` }}>
                                        <FileText className="size-5 shrink-0 mt-0.5" style={{ color: accentColor }} />
                                        <div className="leading-relaxed break-keep font-medium text-[16px]" style={{ color: accentColor }}>
                                            {section.footer}
                                        </div>
                                    </div>
                                )}
                            </section>
                        ))}
                    </article>
                </div>

                {/* 우측 Sticky 상담 문의 */}
                <div className="ml-auto w-[260px] shrink-0 hidden lg:block sticky top-[100px]">
                    <div className="p-6 rounded-[16px] flex flex-col gap-5" style={{ backgroundColor: sidebarBg }}>
                        <h4 className="text-[16px] font-bold text-text-primary break-keep">비슷한 과제를 겪고 계신가요?</h4>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-text-secondary">
                                <Mail className="size-4 text-text-dim shrink-0" />
                                <span className="text-[14px] font-medium">ktdspr@kt.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-text-secondary">
                                <Phone className="size-4 text-text-dim shrink-0" />
                                <span className="text-[14px] font-medium">02-523-7029</span>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
