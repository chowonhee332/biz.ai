import { motion } from 'motion/react';
import { HOME_WHY_KTDS } from '@/context/home/home-data';

export default function ProcessSection() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  return (
    <div className="relative w-full py-10">
      <div className="bg-white relative z-20 overflow-hidden smooth-gpu rounded-[28px] mx-3">
        <section id="process" className="py-16 md:py-32 relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 relative z-10">
            <div className="text-left md:text-center mb-12 md:mb-24 container-responsive">
              <span className="text-body-sm md:text-body text-[var(--color-fixed-text-dim)] mb-3 block font-medium">{HOME_WHY_KTDS.sectionLabel}</span>
              <h1 className="text-heading-md md:text-display-sm lg:text-display-md font-bold text-[var(--color-fixed-text-primary)] mb-4 md:mb-6 tracking-tight leading-tight font-poppins">
                {HOME_WHY_KTDS.sectionTitle}
              </h1>
              <p className="text-[var(--color-fixed-text-secondary)] text-body-sm md:text-body-sm lg:text-body max-w-2xl mx-0 md:mx-auto font-medium">
                {HOME_WHY_KTDS.description.split('\n').map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br className="hidden md:block" />}</span>
                ))}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
              {HOME_WHY_KTDS.steps.map((step, i) => (
                <motion.div
                  key={i}
                  className="relative bg-[var(--color-fixed-surface)] rounded-[20px] p-6 md:p-10 flex flex-col min-h-[320px] md:min-h-[420px] overflow-hidden"
                  initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={isMobile ? { duration: 0 } : { duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
                >
                  <div className="relative min-h-[100px] md:min-h-[130px]">
                    <span className="text-brand-primary text-body-sm md:text-body-md font-bold mb-2 block">{step.num}</span>
                    <h3 className="text-[24px] md:text-heading-md font-bold text-[var(--color-fixed-text-primary)] leading-tight whitespace-pre-line">{step.subtitle}</h3>
                  </div>
                  <div className="relative flex-1" />
                  <div className="relative min-h-[160px]">
                    <h4 className="text-body-sm font-semibold text-[var(--color-fixed-text-primary)] mb-3">{step.title}</h4>
                    <ul className="space-y-2">
                      {step.bullets.map((bullet, j) => (
                        <li key={j} className="flex items-start gap-2 text-[var(--color-fixed-text-secondary)] text-label-lg leading-relaxed font-normal">
                          <span className="mt-[9px] w-1 h-1 rounded-full bg-[var(--color-fixed-text-dim)]/25 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
