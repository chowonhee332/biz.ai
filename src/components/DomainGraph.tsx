import { motion } from 'motion/react';

const DomainNode = ({ title, agents, pos }: { title: string, agents: string[], pos: 'top' | 'bottom' }) => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center relative group"
    >
        {pos === 'top' && (<div className="absolute -top-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 w-max">{agents.map((agent, i) => (<span key={i} className="text-[11px] md:text-xs text-[var(--color-on-surface-variant)] font-medium bg-[var(--color-surface)] px-2 py-1 rounded-full border border-[var(--color-outline)]/20 shadow-sm">{agent}</span>))}</div>)}
        <div className="w-24 h-24 md:w-32 md:h-32 bg-[var(--color-surface)] rounded-full flex items-center justify-center relative shadow-sm group-hover:shadow-lg transition-all duration-300 border border-[var(--color-outline)]/10">
            <div className="absolute inset-0 rounded-full border-4 border-[var(--color-primary)]/20 shadow-[0_0_20px_rgba(103,80,164,0.1)]"></div>
            <span className="text-lg md:text-xl font-bold text-[var(--color-on-surface)] z-10">{title}</span>
        </div>
        {pos === 'bottom' && (<div className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 w-max">{agents.map((agent, i) => (<span key={i} className="text-[11px] md:text-xs text-[var(--color-on-surface-variant)] font-medium bg-[var(--color-surface)] px-2 py-1 rounded-full border border-[var(--color-outline)]/20 shadow-sm">{agent}</span>))}</div>)}
    </motion.div>
);

export default function DomainGraph() {
  return (
    <section id="domain" className="py-24 px-6 bg-[var(--color-surface-variant)]/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">도메인별 Multi-Agent</h2>
          <p className="text-[var(--color-on-surface-variant)] text-lg">공공/금융 등 도메인별로 KTDS의 Multi-Agent를 활용해 보세요.</p>
        </div>
        <div className="relative max-w-5xl mx-auto bg-[var(--color-surface)]/60 rounded-[100px] md:rounded-[200px] p-12 md:p-24 border border-[var(--color-outline)]/10 shadow-sm min-h-[700px] flex flex-col items-center justify-center backdrop-blur-sm">
          <div className="relative w-full h-full flex flex-col items-center justify-center gap-16 md:gap-32 mt-12">
              <div className="flex flex-wrap justify-center gap-24 md:gap-48 relative z-10">
                  <DomainNode title="금융" agents={["Audit Agent", "SQL Agent", "RFP Agent"]} pos="top" />
                  <DomainNode title="공공기관" agents={["Audit Agent", "RFP Agent", "SQL Agent"]} pos="top" />
              </div>
              <div className="flex flex-wrap justify-center gap-12 md:gap-32 relative z-10">
                  <DomainNode title="일반기업" agents={["SQL Agent", "RFP Agent", "Codebox", "beast AI Gateway"]} pos="bottom" />
                  <DomainNode title="미디어" agents={["SQL Agent", "TA Agent"]} pos="bottom" />
                  <DomainNode title="통신/네트워크" agents={["SQL Agent", "beast AI Gateway", "Codebox"]} pos="bottom" />
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
